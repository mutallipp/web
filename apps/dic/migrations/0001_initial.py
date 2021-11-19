# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Radio',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('name', models.CharField(max_length=100, blank=True, null=True)),
                ('radio_id', models.IntegerField(blank=True, null=True)),
                ('description', models.CharField(max_length=300, blank=True, null=True)),
                ('rType', models.CharField(max_length=20, blank=True, null=True)),
                ('image', models.CharField(max_length=100, blank=True, null=True)),
                ('last_program_title', models.CharField(max_length=100, blank=True, null=True)),
                ('subscribe_count', models.CharField(max_length=100, blank=True, null=True, default=0)),
                ('update_time', models.DateTimeField(auto_now=True)),
                ('create_time', models.DateTimeField(default=datetime.datetime.now)),
            ],
        ),
        migrations.CreateModel(
            name='RadioT',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('radio_id', models.IntegerField()),
                ('title', models.CharField(max_length=100, blank=True, null=True)),
                ('description', models.CharField(max_length=300, blank=True, null=True)),
                ('mp3', models.CharField(max_length=100, blank=True, null=True)),
                ('last_program_title', models.CharField(max_length=100, blank=True, null=True)),
                ('views', models.CharField(max_length=100, blank=True, null=True, default=0)),
                ('update_time', models.DateTimeField(auto_now=True)),
                ('create_time', models.DateTimeField(default=datetime.datetime.now)),
            ],
        ),
    ]
