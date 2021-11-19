# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bupadiu', '0014_auto_20181216_2118'),
    ]

    operations = [
        migrations.CreateModel(
            name='AccessToken',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('expires_in', models.IntegerField()),
                ('access_token', models.CharField(max_length=800)),
            ],
        ),
        migrations.AlterField(
            model_name='bindmember',
            name='created_time',
            field=models.DateTimeField(default='2018-12-21 17:45:19'),
        ),
        migrations.AlterField(
            model_name='card',
            name='created_time',
            field=models.DateTimeField(default='2018-12-21 17:45:19'),
        ),
        migrations.AlterField(
            model_name='member',
            name='created_time',
            field=models.DateTimeField(default='2018-12-21 17:45:19'),
        ),
    ]
