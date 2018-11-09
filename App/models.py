from django.db import models

# Create your models here.



class User(models.Model):
	phone = models.CharField(max_length=100,unique= True)
	password = models.CharField(max_length=256)
	password_ck = models.CharField(max_length=256)
	token = models.CharField(max_length=256)

	def __str__(self):
		return self.phone


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



class Cart(models.Model):
	# 用户
	user = models.ForeignKey(User)
	# 商品
	shop = models.ForeignKey(Shop)
	# 选择数量
	number = models.CharField(max_length=50)
	# 是否选中
	isselect = models.BooleanField(default=False)




# 订单 模型类
# 一个 用户 对应 多个表单
# 主 用户
# 从 订单 【声明关系】
class Order(models.Model):
    # 用户
    user = models.ForeignKey(User)
    # 订单号 (时间+字符串)
    number = models.CharField(max_length=256)
    # 状态
    # 1 未付款
    # 2 已付款，未发货
    # 3 已发货，未收货
    # 4 已收货，未评级
    # 5 已评价
    # 6 退款....
    status = models.IntegerField(default=1)
    # 创建时间
    createtime = models.DateTimeField(auto_now=True)


# 订单 商品
# 一个 订单 对应 多个商品
# 主 订单
# 从 订单商品 【声明关系】
class OrderGoods(models.Model):
    # 订单
    order = models.ForeignKey(Order)
    # 商品
    shop = models.ForeignKey(Shop)
    # 数量
    number = models.IntegerField(default=1)

