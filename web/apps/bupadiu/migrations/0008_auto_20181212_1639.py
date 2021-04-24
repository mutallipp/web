# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bupadiu', '0007_card'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card',
            name='image',
            field=models.FileField(blank=True, null=True, upload_to='card_image'),
        ),
    ]
