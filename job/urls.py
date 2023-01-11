from django.urls import path
from . import views

urlpatterns = [
    path('jobs/', views.getAllJobs, name='jobs'),
    path('jobs/new/', views.createJob, name='new_job'),
    path('jobs/<str:pk>/', views.getJob, name='job'),
    path('jobs/<str:pk>/update/', views.updateJob, name='update_job'),
    path('jobs/<str:pk>/delete/', views.deleteJob, name='delete_job'),
    path('jobs/<str:pk>/apply/', views.applyToJob, name='apply_to_job'), 
    path('job/<str:pk>/check/', views.isApplied, name='is_applied_to_job'),
    path('job/<str:pk>/candidates/', views.candidatesApplyedToJob, name='candidatesApplyedToJob'),
    path('stats/<str:topic>/', views.getTopicStats, name='get_topic_stats'),
    path('me/jobs/applied/', views.getCurrentUserAppliedJobs, name='current_user_applied_jobs'),
    path('me/jobs/', views.getCurrentUserJobs, name='Current_user_jobs'),

    # call for interview
    path('me/jobs/callForinterview/<str:email>/<str:status>/<str:job>', views.callForinterview, name="callForinterview")

]