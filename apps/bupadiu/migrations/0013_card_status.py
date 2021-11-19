# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bupadiu', '0012_auto_20181213_1950'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='status',
            field=models.BooleanField(default=True),
        ),
    ]
