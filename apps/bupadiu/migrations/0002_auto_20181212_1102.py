# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bupadiu', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='city',
            field=models.CharField(max_length=32, blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='member',
            name='country',
            field=models.CharField(max_length=32, blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='member',
            name='salt',
            field=models.CharField(max_length=32, blank=True, null=True),
        ),
    ]
