# Generated by Django 4.1.4 on 2022-12-10 15:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("job", "0002_canidatesapplied"),
    ]

    operations = [
        migrations.AddField(
            model_name="job",
            name="google_map",
            field=models.CharField(max_length=200, null=True),
        ),
    ]
