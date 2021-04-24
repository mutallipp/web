# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bupadiu', '0011_auto_20181213_1946'),
    ]

    operations = [
        migrations.RenameField(
            model_name='member',
            old_name='status',
            new_name='switch',
        ),
    ]
