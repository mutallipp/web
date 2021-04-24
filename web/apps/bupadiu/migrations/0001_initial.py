# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BindMember',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('member_id', models.IntegerField()),
                ('token', models.CharField(max_length=10, blank=True, null=True)),
                ('openid', models.CharField(max_length=80)),
                ('mobile', models.CharField(max_length=11, blank=True, null=True)),
                ('updated_time', models.DateTimeField(default=datetime.datetime.now)),
                ('created_time', models.DateTimeField(default=datetime.datetime.now)),
            ],
        ),
        migrations.CreateModel(
            name='Member',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('nickname', models.CharField(max_length=100)),
                ('mobile', models.CharField(max_length=11, blank=True, null=True)),
                ('sex', models.CharField(max_length=5, blank=True, null=True, choices=[('nan', '男'), ('nv', '女'), ('weizhi', '未知')])),
                ('avatar', models.ImageField(max_length=200, upload_to='')),
                ('salt', models.CharField(max_length=32)),
                ('city', models.CharField(max_length=32)),
                ('country', models.CharField(max_length=32)),
                ('reg_ip', models.CharField(max_length=100, blank=True, null=True)),
                ('status', models.IntegerField(default=1)),
                ('name', models.CharField(max_length=100)),
                ('number', models.CharField(max_length=30, blank=True, null=True)),
                ('school', models.CharField(max_length=100)),
                ('openid', models.CharField(max_length=80)),
                ('updated_time', models.DateTimeField(default=datetime.datetime.now)),
                ('created_time', models.DateTimeField(default=datetime.datetime.now)),
            ],
        ),
    ]
