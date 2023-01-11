# Generated by Django 4.1.4 on 2022-12-21 10:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("account", "0003_userprofile_is_recruiter"),
    ]

    operations = [
        migrations.AddField(
            model_name="userprofile",
            name="companay",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="userprofile",
            name="designation",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="userprofile",
            name="is_approved",
            field=models.BooleanField(default=False),
        ),
    ]
