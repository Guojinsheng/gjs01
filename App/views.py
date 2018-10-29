import hashlib
import uuid

from django.contrib.auth import logout
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from App.models import User, Wheel, Shop


def index(request):
	token = request.session.get('token')
	if token:
		user = User.objects.filter(token=token).first()

	else:

		user = None


	wheels = Wheel.objects.all()

	shops = Shop.objects.all()


	data = {
		'user':user,
		'wheels': wheels,
		'shops': shops,
	}
	return render(request,'index.html',context=data)


def register(request):
	if request.method == 'GET':
		return render(request,'register.html')
	elif request.method == 'POST':
		phone = request.POST.get('phone')
		password = request.POST.get('password')
		password_ck = request.POST.get('password_ck')

		print(1)

		try:
			user = User()
			user.phone = phone

			user.password = generate_password(password)

			user.password_ck = generate_password(password_ck)

			user.token = str(uuid.uuid5(uuid.uuid4(), 'register'))

			request.session['token'] = user.token

			user.save()

			print(user.password)
			print(user.password_ck)

			return redirect('app:index')

		except:
			print(2)
			return HttpResponse('手机号已被注册')








def login(request):
	if request.method == 'GET':
		return render(request,'login.html')
	elif request.method == 'POST':

		phone = request.POST.get('phone')
		password = generate_password(request.POST.get('password'))

		users = User.objects.filter(phone = phone,password=password)
		if users.exists():
			user = users.first()

			user.token = str(uuid.uuid5(uuid.uuid4(),'login'))

			user.save()

			request.session['token'] = user.token



			return redirect('app:index')
		else:
			return HttpResponse('用户名或密码错误')


def quit(request):

	logout(request)

	return redirect('app:index')

def generate_password(password):
	md5 = hashlib.md5()
	md5.update(password.encode('utf-8'))
	return md5.hexdigest()

def generate_password(password_ck):
	md5 = hashlib.md5()
	md5.update(password_ck.encode('utf-8'))
	return md5.hexdigest()

def cart(request):
	return render(request,'cart.html')


def shop(request):
	return render(request,'shop.html')

