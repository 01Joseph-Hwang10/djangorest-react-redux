# Generated by Django 3.1.5 on 2021-01-14 07:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_auto_20210114_1654'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.ImageField(blank=True, default='/avatars/person-icon.png', null=True, upload_to='avatars'),
        ),
    ]
