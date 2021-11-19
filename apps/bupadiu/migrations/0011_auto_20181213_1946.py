# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bupadiu', '0010_auto_20181213_1512'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='status',
            field=models.BooleanField(default=False),
        ),
    ]
