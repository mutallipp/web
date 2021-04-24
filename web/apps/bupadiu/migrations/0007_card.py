# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('bupadiu', '0006_auto_20181212_1412'),
    ]

    operations = [
        migrations.CreateModel(
            name='Card',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('user_id', models.CharField(max_length=32, blank=True, null=True)),
                ('card_number', models.CharField(max_length=32, blank=True, null=True)),
                ('image', models.CharField(max_length=32, blank=True, null=True)),
                ('updated_time', models.DateTimeField(default=datetime.datetime.now)),
                ('created_time', models.DateTimeField(default=datetime.datetime.now)),
            ],
        ),
    ]
