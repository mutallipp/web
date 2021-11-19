# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bupadiu', '0003_auto_20181212_1224'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='sex',
            field=models.CharField(max_length=5, blank=True, null=True),
        ),
    ]
