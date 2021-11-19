# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UyVideo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('title', models.CharField(max_length=100, blank=True, null=True)),
                ('type', models.CharField(max_length=20, blank=True, null=True)),
                ('director', models.CharField(max_length=70, blank=True, null=True)),
                ('actors', models.CharField(max_length=150, blank=True, null=True)),
                ('area', models.CharField(max_length=150, blank=True, null=True)),
                ('suzuk', models.CharField(max_length=10, blank=True, null=True)),
                ('content', models.TextField(blank=True, null=True)),
                ('image_url', models.URLField(blank=True, null=True)),
                ('video_url', models.URLField(blank=True, null=True)),
                ('cover', models.FileField(blank=True, null=True, upload_to='cover_image')),
                ('update_time', models.DateTimeField(auto_now=True)),
                ('create_time', models.DateTimeField(default=datetime.datetime.now)),
            ],
            options={
                'verbose_name': '维语电影电影',
                'verbose_name_plural': '维语电影电影',
            },
        ),
    ]
