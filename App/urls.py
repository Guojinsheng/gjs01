from django.conf.urls import url

from App import views


urlpatterns = [
	url(r'^$',views.index,name='index'),
	url(r'^index/$',views.index,name='index'),
	url(r'^register/$',views.register,name='register'),
	url(r'^login/$',views.login,name='login'),
	url(r'^quit/$',views.quit,name='quit'),


	url(r'^cart/$',views.cart,name='cart'),
	url(r'^addcart/$',views.addcart,name='addcart'),
	url(r'^addcart1/$',views.addcart1,name='addcart1'),
	url(r'^subcart/$',views.subcart,name='subcart'),
	url(r'^subcart1/$',views.subcart1,name='subcart1'),
	url(r'^shop/(\d+)/$',views.shop,name='shop'),
	url(r'^delshop/$',views.delshop,name='delshop'),
	url(r'^total/$',views.total,name='total'),
	url(r'^select/$',views.select,name='select'),
	url(r'^allselect/$',views.allselect,name='allselect'),
	url(r'^delSelect/$',views.delSelect,name='delSelect'),
	url(r'^status/$',views.status,name='status'),


    url(r'^generateorder/$', views.generateorder, name='generateorder'),    # 下单
    url(r'^orderinfo/$', views.orderinfo, name='orderinfo'),    # 订单详情
	url(r'^changeorderstatus/$', views.changeorderstatusm, name='changeorderstatus'), # 修改订单状态

	url(r'^pay/$', views.pay, name='pay'),  # 支付
	url(r'^notifyurl/$', views.notifyurl, name='notifyurl'),  # 支付完成后的通知
	url(r'^returnurl/$', views.returnurl, name='returnurl'),  # 支付完成后的跳转

]