from django.db import models

# Create your models here.



class User(models.Model):
	phone = models.CharField(max_length=100,unique= True)
	password = models.CharField(max_length=256)
	password_ck = models.CharField(max_length=256)
	token = models.CharField(max_length=256)


class Wheel(models.Model):
	id = models.IntegerField(primary_key=True)
	img = models.CharField(max_length=100)


class Shop(models.Model):
	id = models.IntegerField(primary_key=True)
	img = models.CharField(max_length=100)
	img1 = models.CharField(max_length=100)
	img2 = models.CharField(max_length=100)
	img3 = models.CharField(max_length=100)
	img4 = models.CharField(max_length=100)
	name = models.CharField(max_length=100)
	introduce = models.CharField(max_length=150)
	price = models.CharField(max_length=10)
	purchased = models.CharField(max_length=50)



