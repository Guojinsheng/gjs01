from django.db import models

# Create your models here.



class User(models.Model):
	phone = models.CharField(max_length=100)
	password = models.CharField(max_length=256)
	password_ck = models.CharField(max_length=256)
	token = models.CharField(max_length=256)
