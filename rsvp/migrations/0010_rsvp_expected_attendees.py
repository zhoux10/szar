# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-04-03 09:21
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rsvp', '0009_rsvp_formal_prefix'),
    ]

    operations = [
        migrations.AddField(
            model_name='rsvp',
            name='expected_attendees',
            field=models.IntegerField(default=1),
        ),
    ]
