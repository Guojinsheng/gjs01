import hashlib
import uuid

from django.contrib.auth import logout
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from App.models import User, Wheel, Shop, Cart


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
			return render(request,'login.html',context={'error':'用户名或密码错误'})


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

	shop_img = request.COOKIES.get('img')
	shop_price = request.COOKIES.get('price')
	shop_num = request.COOKIES.get('number')

	print(shop_img)
	print(shop_price)
	print(shop_num)

	shop_img = shop_img.replace('%2F','/')

	data = {
		'shop_img':shop_img,
		'shop_price':shop_price,
		'shop_num':shop_num,
	}

	return render(request,'cart.html',context=data)


def shop(request,page):

	shop = Shop.objects.all()[int(page)-1]

	return render(request,'shop.html',context={'shop':shop})


def addtocart(request):
	shop_id = request.GET.get('shop.id')
	token = request.session.get('token')

	responseData = {
		'msg':'',
		'status':'',
	}
	if token:
		user = User.objects.get(token = token)

		shops = Shop.objects.get(id = shop_id)

		carts = Cart.objects.filter(shop = shop).filter(user = user)


		print('能进来')
		if carts.exists():
			print(1)
			cart = carts.first()

			cart.number = cart.number + 1

			cart.save()

			responseData['msg'] = '添加购物车完成'
			responseData['status'] = 1
			responseData['number'] = cart.number

			return JsonResponse(responseData)
		else:
			print(2)
			cart = Cart()
			cart.user = user
			cart.shop = shops
			cart.number = 1
			cart.save()

			responseData['msg'] = '添加购物车完成'
			responseData['status'] = 1
			responseData['number'] = cart.number

			return JsonResponse(responseData)

	else:

		responseData['msg'] = '请登录之后再操作'
		responseData['status'] = -1

		return JsonResponse(responseData)


def subtocart(request):
	token = request.session.get('token')
	user = User.objects.get(token = token)

	shop_id = request.GET.get('shop_id')

	shops = Shop.objects.get(id = shop_id)


	carts = Cart.objects.filter(user=user).filter(shops = shops)
	cart = carts.first()
	cart.number = cart.number - 1
	cart.save()

	responseData = {
		'msg':'删减成功',
		'status':'1',
		'number':cart.number,
	}
	return JsonResponse(responseData)








	pass