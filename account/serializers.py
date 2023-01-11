from django.contrib.auth.models import User
from rest_framework import serializers

class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password')

        #extra_kwargs = extra keyword arguments
        extra_kwargs = {
            'first_name': {'required': True, 'allow_blank': False},
            'last_name': {'required': True, 'allow_blank': False},
            'email': {'required': True, 'allow_blank': False},
            'password': {'required': True, 'allow_blank': False, 'min_length': 6},
        }

class UserSerializer(serializers.ModelSerializer):

    resume = serializers.CharField(source='userprofile.resume', read_only=True)
    companay = serializers.CharField(source='userprofile.companay', read_only=True)
    designation = serializers.CharField(source='userprofile.designation', read_only=True)
    is_recruiter = serializers.CharField(source='userprofile.is_recruiter', read_only=True)
    is_approved = serializers.CharField(source='userprofile.is_approved', read_only=True)  

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'username', 'resume', 'is_recruiter', 'is_approved', 'companay', 'designation' )