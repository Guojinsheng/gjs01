import hashlib
import json
import random
import uuid

from django.contrib.auth import logout
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

from App.models import User, Wheel, Shop, Cart, Order, OrderGoods


def index(request):
	token = request.session.get('token')
	if token:
		user = User.objects.filter(token=token).first()
		carts = Cart.objects.filter(user=user)
		number = carts.count()

	else:

		user = None
		number = 0

	wheels = Wheel.objects.all()

	shops = Shop.objects.all()

	data = {
		'user': user,
		'number':number,
		'wheels': wheels,
		'shops': shops,
	}
	return render(request, 'index.html', context=data)


def register(request):
	if request.method == 'GET':
		return render(request, 'register.html')
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
		return render(request, 'login.html')
	elif request.method == 'POST':

		phone = request.POST.get('phone')
		password = generate_password(request.POST.get('password'))

		users = User.objects.filter(phone=phone, password=password)
		if users.exists():
			user = users.first()

			user.token = str(uuid.uuid5(uuid.uuid4(), 'login'))

			user.save()

			request.session['token'] = user.token

			return redirect('app:index')
		else:
			return render(request, 'login.html', context={'error': '用户名或密码错误'})


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


def addcart(request):
	shopid = request.GET.get('shopid')

	token = request.session.get('token')

	responseData = {

		'msg': '添加购物车成功',

		'status': 1  # 1标识添加成功，0标识添加失败，-1标识未登录

	}

	if token:  # 登录 [直接操作模型]

		# 获取用户

		user = User.objects.get(token=token)

		# 获取商品

		shop = Shop.objects.get(id=shopid)

		# 商品已经在购物车，只修改商品个数

		# 商品不存在购物车，新建对象（加入一条新的数据）

		carts = Cart.objects.filter(user=user).filter(shop=shop)

		if carts.exists():  # 修改数量

			cart = carts.first()
			number = request.GET.get('number')
			print(type(number))

			cart.isselect = 0

			cart.number = str(int(number) + 1)

			cart.save()

			responseData['number'] = cart.number

		else:  # 添加一条新记录

			cart = Cart()

			cart.user = user

			cart.shop = shop

			cart.number = 1

			cart.isselect = 0

			cart.save()

			responseData['number'] = cart.number

		return JsonResponse(responseData)

	else:  # 未登录 [跳转到登录页面]

		# 由于addcart这个是 用于 ajax操作， 所以这里是不能进行重定向!!


		responseData['msg'] = '未登录，请登录后操作'

		responseData['status'] = -1

		return JsonResponse(responseData)


def subcart(request):
	# 获取数据

	token = request.session.get('token')

	shopid = request.GET.get('shopid')

	# 对应用户 和 商品

	user = User.objects.get(token=token)

	shop = Shop.objects.get(id=shopid)

	# 删减操作

	cart = Cart.objects.filter(user=user).filter(shop=shop).first()

	number = request.GET.get('number')

	cart.number = str(int(number) - 1)

	cart.isselect = 0

	if int(cart.number) <= 0:
		cart.number = '0'
		cart.isselect = 0

	cart.save()

	responseData = {

		'msg': '购物车减操作成功',

		'status': 1,

		'number': cart.number

	}

	return JsonResponse(responseData)


def cart(request):
	token = request.session.get('token')

	if token:  # 显示该用户下 购物车信息
		print('cart')

		user = User.objects.filter(token=token).first()

		carts = Cart.objects.filter(user=user).exclude(number='0')
		print(carts)

		return render(request, 'cart.html', context={'carts': carts,'user':user})

	else:  # 跳转到登录页面

		return redirect('app:login')


def shop(request, page):
	token = request.session.get('token')
	if token:
		user = User.objects.filter(token=token).first()
		carts = Cart.objects.filter(user=user)
		number = carts.count()


	else:

		user = None
		number= 0

	token = request.session.get('token')

	shop = Shop.objects.all()[int(page) - 1]
	data = {
		'shop':shop,
		'token':token,
		'user':user,
		'number':number,
	}

	return render(request, 'shop.html', context=data)


def delshop(request):
	shopid = request.GET.get('shopid')
	token = request.session.get('token')
	user = User.objects.filter(token=token)
	shop = Shop.objects.filter(id=shopid)
	carts = Cart.objects.filter(user=user).filter(shop=shop)
	responsedata = {
		'msg': '删除成功',
		'status': 1
	}

	if carts.exists():
		carts.number = '0'
		carts.isselect = 0

		carts.delete()

		responsedata['number'] = carts.number

		return JsonResponse(responsedata)


def total(request):
	checked = request.GET.get('checked')
	shopid = request.GET.get('shopid')
	token = request.session.get('token')
	user = User.objects.filter(token=token)
	shop = Shop.objects.filter(id=shopid)

	total = request.GET.get('total')

	total = int(total)

	responsedata = {
		'msg': '计算总价',
		'status': 1
	}

	if checked == 'checked':

		cart = Cart.objects.filter(user=user).filter(shop=shop).first()
		cart.isselect = 1
		cart.save()

		number = cart.number
		price = cart.shop.price

		total += int(number) * int(price)
		print(int(number))
		print(int(price))

		responsedata['total'] = total

	elif checked == None:
		cart = Cart.objects.filter(user=user).filter(shop=shop).first()
		cart.isselect = 0
		cart.save()

		total = 0
		responsedata['total'] = total

	return JsonResponse(responsedata)


def addcart1(request):
	# 获取数据

	token = request.session.get('token')

	shopid = request.GET.get('shopid')

	# 对应用户 和 商品

	user = User.objects.get(token=token)

	shop = Shop.objects.get(id=shopid)

	# 删减操作

	cart = Cart.objects.filter(user=user).filter(shop=shop).first()

	number = request.GET.get('number')

	cart.number = str(int(number) + 1)

	cart.save()

	responseData = {

		'msg': '购物车家操作成功',

		'status': 1,

		'number': cart.number

	}

	return JsonResponse(responseData)


def subcart1(request):
	# 获取数据

	token = request.session.get('token')

	shopid = request.GET.get('shopid')

	# 对应用户 和 商品

	user = User.objects.get(token=token)

	shop = Shop.objects.get(id=shopid)

	# 删减操作

	cart = Cart.objects.filter(user=user).filter(shop=shop).first()

	number = request.GET.get('number')

	cart.number = str(int(number) - 1)
	if int(cart.number) <= 0:
		cart.number = '0'

	cart.save()

	responseData = {

		'msg': '购物车减操作成功',

		'status': 1,

		'number': cart.number

	}

	return JsonResponse(responseData)


def select(request):
	cartid = request.GET.get('cartid')

	cart = Cart.objects.get(id=cartid)

	cart.isselect = not cart.isselect

	cart.save()

	responseData = {

		'msg': '修改状态成功',

		'status': '1',

		'isselect': cart.isselect

	}

	return JsonResponse(responseData)


def allselect(request):
	isall = request.GET.get('isall')

	if isall == 'true':

		isall = True

	else:

		isall = False

	token = request.session.get('token')

	user = User.objects.get(token=token)

	carts = Cart.objects.filter(user=user)

	for cart in carts:
		cart.isselect = isall

		cart.save()

	responseData = {

		'status': '1',

		'msg': '全选/取消全选 操作成功',

	}

	return JsonResponse(responseData)


def status(request):
	cartid = request.GET.get('cartid')

	token = request.session.get('token')
	user = User.objects.filter(token=token)

	cart = Cart.objects.filter(id=cartid).filter(user=user).first()

	responsedata = {
		'msg': '修改成功',
		'status': 1
	}

	if cart.isselect:
		print('************')
		responsedata['num'] = '1'

	else:
		print('+++++++++++++++')
		responsedata['num'] = '0'

	return JsonResponse(responsedata)


def delSelect(request):
	cartid = request.GET.get('cartid')

	token = request.session.get('token')

	user = User.objects.get(token=token)

	carts = Cart.objects.filter(id=cartid).filter(user=user)

	responsedata = {
		'msg': '清空购物车',
		'status': 1
	}

	if carts.exists():
		for cart in carts:
			cart.delete()

	return JsonResponse(responsedata)


def changecartselect(request):
	isall = request.GET.get('isall')
	if isall == 'true':
		isall = True
	else:
		isall = False

	token = request.session.get('token')
	user = User.objects.get(token=token)
	carts = Cart.objects.filter(user=user)
	for cart in carts:
		cart.isselect = isall
		cart.save()

	responseData = {
		'status': '1',
		'msg': '全选/取消全选 操作成功'
	}

	return JsonResponse(responseData)


# 下单
def generateorder(request):
	token = request.session.get('token')
	if token:
		user = User.objects.get(token=token)
		# 生成订单
		order = Order()
		order.user = user
		order.number = str(uuid.uuid5(uuid.uuid4(), 'order'))
		order.save()

		carts = Cart.objects.filter(user=user).filter(isselect=True)
		for cart in carts:
			# 订单商品
			orderGoods = OrderGoods()
			orderGoods.order = order
			orderGoods.shop = cart.shop
			orderGoods.number = cart.number
			orderGoods.save()

			# 移除购物车
			cart.delete()

		responseData = {
			'status': '1',
			'msg': '订单生成成功(未付款)!',
			'orderid': order.id
		}
		print('###########')
		print(order.id)


		return JsonResponse(responseData)

	else:
		return JsonResponse({'msg': '用户登录后再操作'})


# 订单详情
def orderinfo(request):
	orderid = request.GET.get('orderid')
	print('************')
	print(orderid)
	order = Order.objects.get(id=orderid)
	token = request.session.get('token')
	if token:
		user = User.objects.filter(token=token).first()


	else:

		user = None

	data = {
		'title': '订单详情',
		'order': order,
		'user':user
	}

	return render(request, 'order.html', context=data)


# 订单处理
def changeorderstatusm(request):
	orderid = request.GET.get('orderid')
	status = request.GET.get('status')

	order = Order.objects.get(id=orderid)
	order.status = status
	order.save()

	responseData = {
		'msg': '付款成功',
		'status': 1
	}

	return JsonResponse(responseData)


# def notifyurl(request):
#
#     print(' xxx  订单支付成功，请发货')
#
#     print(request.GET.get('subject'))
#
#     return JsonResponse({'msg':'success'})
#
#
#
#
#
# def returnurl(request):
#
#     print('xxx 订单支付成功，进行页面跳转')
#
#     return HttpResponse('进行页面跳转，回到优品汇.....')
#
#
#
#
#
# def pay(request):
#
#     identifier = request.GET.get('identifier')
#     total = request.GET.get('total')
#
#
#
#     # 支付url
#
#     url = alipay_app.direct_pay(
#
#         subject='测试订单'+random.randrange(10000),    # 订单名称
#
#         out_trade_no=identifier,    # 订单号
#
#         total_amount=total,   # 付款金额
#
#         return_url='http://127.0.0.1/returnurl/'
#
#     )
#
#
#
#     # 拼接支付网关
#
#     alipay_url = 'https://openapi.alipaydev.com/gateway.do?{data}'.format(data=url)
#
#
#
#     return JsonResponse({'alipay_url':alipay_url})