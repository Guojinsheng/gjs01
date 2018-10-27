import uuid

from django.contrib.auth import logout
from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from App.models import User


def index(request):
	token = request.session.get('token')
	if token:
		user = User.objects.get(token=token)
	else:
		user = None


	data = {
		'user':user,
	}
	return render(request,'index.html',context=data)


def register(request):
	if request.method == 'GET':
		return render(request,'register.html')
	elif request.method == 'POST':
		phone = request.POST.get('phone')
		password = request.POST.get('password')
		password_ck = request.POST.get('password_ck')

		user = User()
		user.phone = phone
		user.password = password
		user.password_ck = password_ck
		user.token = str(uuid.uuid5(uuid.uuid4(), 'register'))
		request.session['token'] = user.token

		user.save()

		return redirect('app:index')







def login(request):
	if request.method == 'GET':
		return render(request,'login.html')
	elif request.method == 'POST':

		phone = request.POST.get('phone')
		password = request.POST.get('password')

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




def cart(request):
	return render(request,'cart.html')


def shop(request):
	return render(request,'shop.html')

