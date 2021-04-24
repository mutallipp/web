# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bupadiu', '0016_auto_20181222_1053'),
    ]

    operations = [
        migrations.RenameField(
            model_name='member',
            old_name='formId',
            new_name='formid',
        ),
        migrations.AlterField(
            model_name='bindmember',
            name='created_time',
            field=models.DateTimeField(default='2018-12-22 10:54:17'),
        ),
        migrations.AlterField(
            model_name='card',
            name='created_time',
            field=models.DateTimeField(default='2018-12-22 10:54:17'),
        ),
        migrations.AlterField(
            model_name='member',
            name='created_time',
            field=models.DateTimeField(default='2018-12-22 10:54:17'),
        ),
    ]
