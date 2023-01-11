from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from .serializers import SignUpSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
#import custom validation for resume
from .validators import validate_file_extension, profile_pic_validator
#emails
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
#random string 
from django.utils.crypto import get_random_string
#to get 404 error and handle
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from google.oauth2 import id_token
from google.auth.transport.requests import Request as GoogleRequest
from .authentication import createAccessToken, createRefreshToken
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@api_view(['POST'])
def register(request):
    data = request.data
    user = SignUpSerializer(data=data)
    if user.is_valid():
        if not User.objects.filter(username=data['email']).exists():
            user = User.objects.create(
                first_name = data['first_name'],
                last_name = data['last_name'],
                email = data['email'],
                username = data['email'],
                password = make_password(data['password']),    
            ) 
            user.save()
            profile_pic = request.FILES.get('profile_pic')
            user.userprofile.profile_pic = profile_pic
            user.userprofile.uniqueCode = "User_" + get_random_string(length=25) + get_random_string(length=15)
            user.userprofile.save()

            if len(data) > 5: #this will work when rec is registering 
                user.userprofile.companay = data['companay']
                user.userprofile.designation = data['designation']
                user.userprofile.uniqueCode = "Rec_" + get_random_string(length=25) + get_random_string(length=15)
                user.userprofile.is_recruiter = True
                user.userprofile.save()

                #mail data to admin for approval
                approval_link = "-"+str(user.userprofile.uniqueCode)
                mail_subject = (f"{{0}} {{1}} Registered as Recruiter").format(data['first_name'],data['last_name'])
                message = render_to_string('email/approvalrequest.html', {
                'job_url' : approval_link,
                'Name' : data['first_name'],
                'Companny' : user.userprofile.companay,
                'Designation' : user.userprofile.designation,
                })
                to_email = "mail@jassy.in"
                send_mail = EmailMessage(mail_subject, message, to=[to_email])
                send_mail.content_subtype = "html"
                send_mail.send()
                return Response({
                'success': 'You Account has been created please wait for admin approvals',
                'username': user.username,
                }, status=status.HTTP_201_CREATED)

            return Response({
                'success': 'User created successfully',
                'username': user.username,
                }, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def currentUser(request):

    user = UserSerializer(request.user, many=False)

    return Response(user.data)



@api_view(['PUT'])
@permission_classes((IsAuthenticated, ))
def updateUser(request):
    user = request.user
    
    data = request.data

    user.first_name = data['first_name']
    user.last_name = data['last_name']
    user.email = data['email']
    user.username = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT']) # put used to update user profile with resume
@permission_classes((IsAuthenticated, ))
def uploadResume(request):
    user = request.user
    resume = request.FILES['resume']

    if resume == '':
        return Response({'error': 'Please upload your resume'}, status=status.HTTP_400_BAD_REQUEST)

    isValidFile = validate_file_extension(resume.name)

    if not isValidFile:
        return Response({'error': 'Please upload only pdf files'}, status=status.HTTP_400_BAD_REQUEST)

    
    user.userprofile.resume = resume   # userprofile is related name of userprofile model of user
    user.userprofile.save()

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)



@api_view(['POST'])
def VerifyRec(request, id):

    rec= get_object_or_404(User, userprofile__uniqueCode=id)
    rec.userprofile.is_approved = True
    rec.userprofile.save()  

    #mail data to admin for approval
    mail_subject = (f"{{0}} {{1}},Your Recruiter application has been approved").format(rec.first_name, rec.last_name)
    message = render_to_string('email/adminapproveREc.html', {
                "Name" : str(rec.first_name + " " + rec.last_name),
                'Companny' : rec.userprofile.companay,
                'Designation' : rec.userprofile.designation,
        })
    to_email = rec.email
    send_mail = EmailMessage(mail_subject, message, to=[to_email])
    send_mail.content_subtype = "html"
    send_mail.send()

    rec = UserSerializer(rec, many=False)
 
    return Response(rec.data)

#google auth
class GoogleAuthAPIView(APIView):
    def post(self, request):
        
        token = request.data['token']
        
        googleUser = id_token.verify_token(token, GoogleRequest())
        
        
        if not googleUser:
            raise exceptions.AuthenticationFailed('unauthenticated')
        
        user = User.objects.filter(email = googleUser['email']).first()
        
        if not user:
            email = googleUser['email']
            username = email[0].split('@')[0]
        
            user = User.objects.create(
                first_name = googleUser['given_name'],
                # last_name = googleUser['family_name'],
                email = googleUser['email'],
                username = username
            )
            
            user.set_password(token)
            user.save()

        token = get_tokens_for_user(user)
        return Response(token)


    
  


