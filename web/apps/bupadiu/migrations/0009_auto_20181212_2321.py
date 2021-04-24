# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bupadiu', '0008_auto_20181212_1639'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='status',
            field=models.IntegerField(default=0),
        ),
    ]
