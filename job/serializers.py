
from rest_framework import serializers
from .models import Job, CanidatesApplied
from account import serializers as Account_Serializer

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'

class CandidateAppliedSerializer(serializers.ModelSerializer):

    job = JobSerializer()
    user = Account_Serializer.UserSerializer()

    class Meta:
        model = CanidatesApplied
        fields = ('user', 'job', 'resume', 'appliedAt', 'job', 'status')
