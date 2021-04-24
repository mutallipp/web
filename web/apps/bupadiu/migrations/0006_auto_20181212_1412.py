# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bupadiu', '0005_auto_20181212_1357'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bindmember',
            name='phone',
        ),
        migrations.AddField(
            model_name='member',
            name='token',
            field=models.CharField(max_length=150, blank=True, null=True),
        ),
    ]
