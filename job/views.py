from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q, Avg, Count, Min, Sum, Max
from rest_framework.pagination import PageNumberPagination

from rest_framework.permissions import IsAuthenticated

from .serializers import JobSerializer, CandidateAppliedSerializer
from account import serializers as accountserializers
from .models import Job, CanidatesApplied

from django.contrib.auth.models import User
#to get 404 error and handle
from django.shortcuts import get_object_or_404
#import job filters
from .filters import JobsFilter

#import timezone
from django.utils import timezone
import json

#emails
from django.core.mail import EmailMessage
from django.template.loader import render_to_string

# Create your views here.

@api_view(['GET'])
def getAllJobs(request):

    filterset = JobsFilter(request.GET, queryset=Job.objects.all().order_by('-id'))

    count = filterset.qs.count() #to get total count of jobs # qs = queryset

    #pagnaition
    resPerPage = 3
    paginator = PageNumberPagination()
    paginator.page_size = resPerPage

    queryset = paginator.paginate_queryset(filterset.qs, request)

    serializer = JobSerializer(queryset, many=True) # qs = queryset
    return Response({
        'count' : count,
        'resPerPage' : resPerPage,
        'jobs' : serializer.data
        })

@api_view(['GET'])
def getJob(request, pk):
    job = get_object_or_404(Job,id=pk) #to get 404 error and handle if not found else return job

    candidateApplied = CanidatesApplied.objects.filter(job=job).count() #to get total count of candidates applied

    candidates = CanidatesApplied.objects.filter(job=job).count() #to get total count of candidates applied

    serializer = JobSerializer(job, many=False) # many = False because we have single object / one job

    return Response({ "job" : serializer.data, "candidateApplied" : candidateApplied, "candidates" : candidates,})

@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def createJob(request):

    request.data['user'] = request.user # will save user id in job model

    data = request.data
    job = Job.objects.create(
        title = data['title'],
        description = data['description'],
        email = data['email'],
        address = data['address'],
        google_map = request.data['google_map'],
        jobtype = data['jobtype'],
        education = data['education'],
        industry = data['industry'],
        experience = data['experience'],
        salary = data['salary'],    
        positions = data['positions'],
        company = data['company'],
        user = request.user
    )
    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes((IsAuthenticated, ))
def updateJob(request, pk):
    job = get_object_or_404(Job,id=pk)

    if job.user != request.user: # to check if user is owner of job
        return Response({'message': 'You are not authorized to update this job'}, status=status.HTTP_403_FORBIDDEN)

    job.title = request.data['title']
    job.description = request.data['description']
    job.email = request.data['email']
    job.address = request.data['address']
    job.google_map = request.data['google_map']
    job.jobtype = request.data['jobtype']
    job.education = request.data['education']
    job.industry = request.data['industry']
    job.experience = request.data['experience']
    job.salary = request.data['salary']
    job.positions = request.data['positions']
    job.company = request.data['company']
    job.save()

    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes((IsAuthenticated, ))
def deleteJob(request, pk):
    job = get_object_or_404(Job,id=pk)

    if job.user != request.user: # to check if user is owner of job
        return Response({'message': 'You are not authorized to delete this job'}, status=status.HTTP_403_FORBIDDEN)

    job.delete()
    return Response({'message': 'Job deleted successfully'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def getTopicStats(request, topic):

    args = { 'title__icontains': topic }
    jobs = Job.objects.filter(**args)

    if len(jobs) == 0:
        return Response({'message': 'No Stats found for this {topic}'.format(topic=topic)})

    status = jobs.aggregate(
        total_jobs = Count('title'),
        avg_positions = Avg('positions'),
        avg_salary = Avg('salary'),
        min_salary = Min('salary'),
        max_salary = Max('salary'),
        )
    
    return Response(status)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def applyToJob(request, pk):

    user = request.user
 
    job = get_object_or_404(Job,id=pk)

    if user.userprofile.resume == '':
        return Response({'message': 'Please upload resume first'}, status=status.HTTP_400_BAD_REQUEST)
    
    if job.lastDate < timezone.now():
        return Response({'message': 'Last date to apply is over'}, status=status.HTTP_400_BAD_REQUEST)

    alreadyApplied = CanidatesApplied.objects.filter(user=user, job=job).exists()

    if alreadyApplied:
        return Response({'message': 'You have already applied'}, status=status.HTTP_400_BAD_REQUEST)

    jobApplied = CanidatesApplied.objects.create(
        user = user,
        job = job,
        resume = user.userprofile.resume,
    )

    jobApplied.save()

    return Response({
        'applied': True,
        'job_id': jobApplied.id,
        'message': 'You have successfully applied to this job'
    }, status=status.HTTP_200_OK)



@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def getCurrentUserAppliedJobs(request):

    args = { 'user_id': request.user.id }
    jobs = CanidatesApplied.objects.filter(**args)

    serializer = CandidateAppliedSerializer(jobs, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def isApplied(request, pk):

    user = request.user
 
    job = get_object_or_404(Job,id=pk)

    applied = CanidatesApplied.objects.filter(user=user, job=job).exists()

    return Response(applied)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def getCurrentUserJobs(request):

    args = { 'user_id': request.user.id }
    jobs = Job.objects.filter(**args)

    serializer = JobSerializer(jobs, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def candidatesApplyedToJob(request, pk):

    job = get_object_or_404(Job,id=pk)
    
    canidates = CanidatesApplied.objects.filter(job=job)
    
    serializer = CandidateAppliedSerializer(canidates, many=True)
    

    return Response(serializer.data)



@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def callForinterview(request, email, status, job):

    user = User.objects.get(email=email)
    job = get_object_or_404(Job,id=job)

    #mail data to the person choosed
    if status == "selected":
        mail_subject = (f"Your application for {{0}} has been seleted").format(job.title)
        message = render_to_string('email/selectedCandiate.html', {
                'job_url' : "http://localhost:3000/jobs/"+str(job.id),
        })
        candidate_status = CanidatesApplied.objects.get(user=user, job=job)
        candidate_status.status = True
        candidate_status.save()
        
    else:
        mail_subject = (f"Your application for {{0}} has bee rejected").format(job.title)
        message = render_to_string('email/rejectedcanidate.html', {
                'job_url' : "http://localhost:3000/jobs/"+str(job.id),
        })
        candidate_status = CanidatesApplied.objects.get(user=user, job=job)
        candidate_status.status = False
        candidate_status.save()

    
    to_email = user.email
    send_mail = EmailMessage(mail_subject, message, to=[to_email])
    send_mail.content_subtype = "html"
    send_mail.send()
    return Response({"userNotified": True})









    






