# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bupadiu', '0013_card_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bindmember',
            name='created_time',
            field=models.DateTimeField(default='2018-12-16 21:18:01'),
        ),
        migrations.AlterField(
            model_name='bindmember',
            name='updated_time',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='card',
            name='created_time',
            field=models.DateTimeField(default='2018-12-16 21:18:01'),
        ),
        migrations.AlterField(
            model_name='card',
            name='updated_time',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='member',
            name='created_time',
            field=models.DateTimeField(default='2018-12-16 21:18:01'),
        ),
        migrations.AlterField(
            model_name='member',
            name='updated_time',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
