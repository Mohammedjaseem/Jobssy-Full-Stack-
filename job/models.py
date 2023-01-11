from django.db import models

#import giocoder 
import geocoder
#import os
import os

#import validators
from django.core.validators import MaxValueValidator, MinValueValidator
#import gis library models as gismode
from django.contrib.gis.db import models as gismodels
#import point from gis library
from django.contrib.gis.geos import Point 
#import all modeuls from  datetime
import datetime
#import user model
from django.contrib.auth.models import User



# Create your models here.
class JobType(models.TextChoices):
    Permanent = 'Permanent'
    Temporary = 'Temporary'
    Intenrship = 'Intenrship'

class Education(models.TextChoices):
    HighSchool = 'HighSchool'
    Bachelor   = 'Bachelor'
    Master     = 'Master'
    Doctorate  = 'Doctorate'
    Phd        = 'Phd'

class Indstry(models.TextChoices):
    Busienss          = 'Busienss'
    IT                = 'Information Technology'
    Banking           = 'Banking'
    Education         = 'Education/Training'
    Telecommunication = 'Telecommunication'
    Engineering       = 'Engineering'
    Health            = 'Health'
    Media             = 'Media'
    Others            = 'Others'

class Experience(models.TextChoices):
    No_Experince = 'No Experience'
    One_Year     = '1 Year'
    Two_Years    = '2 Years'
    Three_Year_Plus = '3 Years Plus'

def return_date_time():
    now = datetime.datetime.now()
    return now + datetime.timedelta(days=10)

#Job models for database
class Job(models.Model):
    title       = models.CharField(max_length=200, null=True)
    description = models.TextField(null=True)
    email       = models.EmailField(max_length=200, null=True)
    address     = models.CharField(max_length=200, null=True)
    jobtype     = models.CharField(
                    max_length=200, 
                    choices=JobType.choices,
                    default=JobType.Permanent
                   )
    education   = models.CharField(
                    max_length=200, 
                    choices=Education.choices,
                    default=Education.HighSchool
                   )
    industry    = models.CharField(
                    max_length=200, 
                    choices=Indstry.choices,
                    default=Indstry.Busienss
                   )
    experience  = models.CharField(
                    max_length=200, 
                    choices=Experience.choices,
                    default=Experience.No_Experince
                   )
    salary      = models.IntegerField( default=1, validators=[MinValueValidator(1), MaxValueValidator(1000000)])    
    positions   = models.IntegerField( default=1)
    company     = models.CharField(max_length=200, null=True)

    google_map = models.CharField(max_length=5000, null=True)

    # point       = gismodels.PointField(default=Point(0.0, 0.0)) 
    lastDate    = models.DateTimeField(default=return_date_time)
    user        = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    createdAt   = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        if self.title:
            return self.title
        return self.id

#canidate that applied for the job
class CanidatesApplied(models.Model):
    job     = models.ForeignKey(Job, on_delete=models.CASCADE)
    user    = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    resume  = models.CharField(max_length=200)
    appliedAt = models.DateTimeField(auto_now_add=True)
    status  = models.BooleanField(null=True, blank=True)

    def __str__(self):
        return self.user.username


