# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bupadiu', '0009_auto_20181212_2321'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='openid',
            field=models.CharField(max_length=80, blank=True, null=True),
        ),
    ]
