from django.db import models
from django.contrib.auth.models import User
#importing signals
from django.dispatch import receiver
from django.db.models.signals import post_save

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='userprofile') 
    #one to one relationship means one user can have one profile 
    #realted_name is used to access the userprofile from user model
    resume = models.FileField(upload_to='resume', null=True, blank=True)
    profile_pic = models.ImageField(upload_to='Profile_pic', null=True, blank=True)
    

    #recruiter
    companay = models.CharField(max_length=100, null=True, blank=True)
    designation = models.CharField(max_length=100, null=True, blank=True)
    is_recruiter = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)

    #unicode for both user and rec can be used in forgot password and reset password
    uniqueCode = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return self.user.first_name + self.user.last_name


@receiver(post_save, sender=User)
def save_profile(sender, instance, created, **kwargs):

    user = instance

    if created:
        profile = UserProfile(user=user)
        profile.save()