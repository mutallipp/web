# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bupadiu', '0017_auto_20181222_1054'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bindmember',
            name='created_time',
            field=models.DateTimeField(default='2018-12-26 10:54:58'),
        ),
        migrations.AlterField(
            model_name='card',
            name='created_time',
            field=models.DateTimeField(default='2018-12-26 10:54:58'),
        ),
        migrations.AlterField(
            model_name='member',
            name='created_time',
            field=models.DateTimeField(default='2018-12-26 10:54:58'),
        ),
    ]
