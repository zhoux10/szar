# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-04-03 09:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rsvp', '0010_rsvp_expected_attendees'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rsvp',
            name='attending',
            field=models.NullBooleanField(),
        ),
    ]
