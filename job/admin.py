from django.contrib import admin
from .models import Job, CanidatesApplied

# Register your models here.

class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'email', 'address', 'jobtype', 'education', 'industry', 'experience', 'createdAt')
    list_filter = ('title', 'email', 'address', 'jobtype', 'education', 'industry', 'experience', 'createdAt')
    search_fields = ('title', 'email', 'address', 'jobtype', 'education', 'industry', 'experience', 'createdAt')
    list_per_page = 25

admin.site.register(Job, JobAdmin)


class CanidatesAppliedAdmin(admin.ModelAdmin):
    list_display = ('job','user','resume','appliedAt','status',)
    list_filter = ('job','user','status',)
    search_fields = ('job','user','status',)

admin.site.register(CanidatesApplied, CanidatesAppliedAdmin )