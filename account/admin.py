from django.contrib import admin
from .models import UserProfile

# Register your models here.
class UserProfileAdminclass(admin.ModelAdmin):
    list_display = ('user', 'resume', 'is_recruiter', "companay", "designation", "is_approved" )

admin.site.register(UserProfile, UserProfileAdminclass)

