# Generated by Django 4.1.4 on 2022-12-26 06:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("job", "0006_alter_job_experience"),
    ]

    operations = [
        migrations.AddField(
            model_name="canidatesapplied",
            name="status",
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]