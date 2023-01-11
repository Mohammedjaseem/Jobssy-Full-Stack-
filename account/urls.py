from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('me/', views.currentUser, name='current_user'),
    path('me/update/', views.updateUser, name='update_user'),
    path('upload/resume/', views.uploadResume, name='upload_resume'),
    path('VerifyRec/<str:id>', views.VerifyRec, name="VerifyRec"),
    path('google-auth/', views.GoogleAuthAPIView.as_view()),
]