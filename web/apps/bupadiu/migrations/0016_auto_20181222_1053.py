# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bupadiu', '0015_auto_20181221_1745'),
    ]

    operations = [
        migrations.AddField(
            model_name='member',
            name='formId',
            field=models.CharField(max_length=150, blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='bindmember',
            name='created_time',
            field=models.DateTimeField(default='2018-12-22 10:53:11'),
        ),
        migrations.AlterField(
            model_name='card',
            name='created_time',
            field=models.DateTimeField(default='2018-12-22 10:53:11'),
        ),
        migrations.AlterField(
            model_name='member',
            name='created_time',
            field=models.DateTimeField(default='2018-12-22 10:53:11'),
        ),
    ]
