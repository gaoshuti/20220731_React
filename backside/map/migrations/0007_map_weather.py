# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2022-11-03 02:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('map', '0006_regquery'),
    ]

    operations = [
        migrations.AddField(
            model_name='map',
            name='weather',
            field=models.CharField(default='', max_length=255),
        ),
    ]
