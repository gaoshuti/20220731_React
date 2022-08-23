# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2022-08-22 05:06
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='map',
            fields=[
                ('id', models.AutoField(default='', primary_key=True, serialize=False)),
                ('city', models.CharField(max_length=255)),
                ('date', models.CharField(max_length=255)),
                ('max', models.FloatField(blank=True, null=True)),
                ('min', models.FloatField(blank=True, null=True)),
                ('wind', models.FloatField(blank=True, null=True)),
                ('lrad', models.FloatField(blank=True, null=True)),
                ('prec', models.FloatField(blank=True, null=True)),
                ('pres', models.FloatField(blank=True, null=True)),
                ('shum', models.FloatField(blank=True, null=True)),
                ('srad', models.FloatField(blank=True, null=True)),
                ('tempDiff1', models.FloatField(blank=True, null=True)),
                ('tempDiff7', models.FloatField(blank=True, null=True)),
                ('propertion', models.FloatField(blank=True, null=True)),
                ('MarCap', models.FloatField(blank=True, null=True)),
                ('ret', models.FloatField(blank=True, null=True)),
                ('tur', models.FloatField(blank=True, null=True)),
                ('snow', models.IntegerField(blank=True, null=True)),
                ('rain', models.IntegerField(blank=True, null=True)),
                ('sand', models.IntegerField(blank=True, null=True)),
                ('cloud', models.IntegerField(blank=True, null=True)),
                ('haze', models.IntegerField(blank=True, null=True)),
                ('fog', models.IntegerField(blank=True, null=True)),
                ('hail', models.IntegerField(blank=True, null=True)),
                ('sun', models.IntegerField(blank=True, null=True)),
                ('ris', models.FloatField(blank=True, null=True)),
                ('smb', models.FloatField(blank=True, null=True)),
                ('hml', models.FloatField(blank=True, null=True)),
                ('API', models.IntegerField(blank=True, null=True)),
                ('AQI', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='stock',
            fields=[
                ('id', models.AutoField(default='', primary_key=True, serialize=False)),
                ('stkcd', models.CharField(max_length=255)),
                ('date', models.CharField(max_length=255)),
                ('opnprc', models.FloatField(blank=True, null=True)),
                ('hiprc', models.FloatField(blank=True, null=True)),
                ('loprc', models.FloatField(blank=True, null=True)),
                ('clsprc', models.FloatField(blank=True, null=True)),
                ('dnshrtrd', models.FloatField(blank=True, null=True)),
                ('dnvaltrd', models.FloatField(blank=True, null=True)),
                ('dsmvosd', models.FloatField(blank=True, null=True)),
                ('dsmvtll', models.FloatField(blank=True, null=True)),
                ('dretwd', models.FloatField(blank=True, null=True)),
                ('changeRatio', models.FloatField(blank=True, null=True)),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='stock',
            unique_together=set([('stkcd', 'date')]),
        ),
        migrations.AlterUniqueTogether(
            name='map',
            unique_together=set([('city', 'date')]),
        ),
    ]
