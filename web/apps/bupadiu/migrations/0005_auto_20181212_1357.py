# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bupadiu', '0004_auto_20181212_1249'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bindmember',
            name='token',
            field=models.CharField(max_length=150, blank=True, null=True),
        ),
    ]
