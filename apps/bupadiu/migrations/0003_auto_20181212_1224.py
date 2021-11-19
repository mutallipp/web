# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bupadiu', '0002_auto_20181212_1102'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bindmember',
            old_name='mobile',
            new_name='phone',
        ),
        migrations.RenameField(
            model_name='member',
            old_name='mobile',
            new_name='phone',
        ),
    ]
