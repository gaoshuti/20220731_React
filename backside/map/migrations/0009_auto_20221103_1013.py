# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2022-11-03 02:13
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('map', '0008_auto_20221103_1008'),
    ]

    operations = [
        migrations.RenameField(
            model_name='map',
            old_name='propertion',
            new_name='proportion',
        ),
    ]
