# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('uyvideo', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='uyvideo',
            name='views',
            field=models.PositiveIntegerField(verbose_name='浏览量', default=0),
        ),
    ]
