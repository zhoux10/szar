# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-24 19:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rsvp', '0006_auto_20151224_1126'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='rsvp',
            name='plus_one_n',
        ),
        migrations.AddField(
            model_name='rsvp',
            name='plus_one_name',
            field=models.CharField(default=None, max_length=200, null=True, unique=True),
        ),
    ]
