# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-24 19:10
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rsvp', '0004_auto_20151224_1109'),
    ]

    operations = [
        migrations.RenameField(
            model_name='rsvp',
            old_name='plus_one_guest',
            new_name='plus_one',
        ),
    ]
