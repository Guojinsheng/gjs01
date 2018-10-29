# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-10-29 11:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0005_auto_20181029_0754'),
    ]

    operations = [
        migrations.CreateModel(
            name='Shop',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('img', models.CharField(max_length=100)),
                ('img1', models.CharField(max_length=100)),
                ('img2', models.CharField(max_length=100)),
                ('img3', models.CharField(max_length=100)),
                ('img4', models.CharField(max_length=100)),
                ('name', models.CharField(max_length=100)),
                ('introduce', models.CharField(max_length=150)),
                ('price', models.CharField(max_length=10)),
                ('purchased', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Wheel',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('img', models.CharField(max_length=100)),
            ],
        ),
    ]
