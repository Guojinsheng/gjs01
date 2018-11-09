$(function () {
	click2()
	click1()
	error()







	//全选
	$('.allSelect').click(function () {
		var isall = $(this).attr('isall')
        isall = (isall == 'false') ? true : false
        $(this).attr('isall', isall)
        // 自身状态
        if (isall){ // 全选
			$(this).attr('checked','checked')
        } else {    // 取消全选
            $(this).removeAttr('checked')
        }
		// console.log('out')
        // 发起ajax请求
        $.get('/allselect/', {'isall':isall}, function (response) {
            // console.log(response)
	        // console.log('in')
            if (response['status'] == 1){
                // 遍历
                $('.main-t').each(function () {
                    $(this).find('.main-b .checkbox').attr('isselect',isall)
					var $that =  $(this).find('.main-b .checkbox')
	            // console.log('inside')
                    if (isall){ // 选中
                    	// console.log('chexked')
                        $that.attr('checked','checked')
	                    $that.attr('status','1')
	                    $('ul .checkbox').attr('status','1')

                    } else {    // 未选中
                        $that.removeAttr('checked')
	                    $that.attr('status','0')
                        $('ul .checkbox').attr('status','0')
                    }
                     click1()
                })
                // 总计

            }
        })
    })
	//单个商品的选择
	$('.main-b .checkbox').click(function () {
		var cartid = $(this).attr('cartid')
        var $that = $(this)

        $.get('/select/', {'cartid':cartid}, function (response) {


            if (response['status'] == '1'){

                var isselect = response['isselect']

                $that.attr('isselect', isselect)

                // 先清空

                if (isselect){  // 选中
                    $that.attr('checked','checked')
                    $that.attr('status','1')
                } else {    // 未选中
                    $that.removeAttr('checked')
	                 $that.attr('status','0')
                }
                // 总计
			    click1()
	            allSelect()
	            console.log('status',status)
            }
        })
	})
	//单个商品的删除操作
	$('.main-b').find('a').click(function () {
		console.log('del')

		var shopid = $(this).parent().parent().attr('shopid')
		console.log(shopid)
		var $that = $(this)
		$.get('/delshop/',{'shopid':shopid},function (response) {

			console.log('in')
			// console.log(response)
			if (response.status == 1 && response.number == '0'){
				$that.parent().parent().remove()
			}
			window.location.reload()
		})
	})

	//购物车的减操作
	$('.mius').click(function () {
		var $that = $(this)
		var shopid = $('.main-b').attr('shopid')
		console.log('id',shopid)
		var number = $(this).parent().find('.number').val()
		$.get('/subcart1/',{'shopid':shopid,'number':number},function (response) {
			if (response.status == 1){

				$that.parent().find('.number').val(response.number)
			}
			if (response.number == 0){
				$that.parent().parent().remove()

			}
			click1()
		})
	})
	//购物车的加操作
	$('.plus').click(function () {
		var $that = $(this)
		var shopid = $('.main-b').attr('shopid')
		var number = $(this).parent().find('.number').val()
		// console.log('add')
		$.get('/addcart1/',{'shopid':shopid,'number':number},function (response) {
			// console.log('addtocart')
			if (response.status == 1){
				$that.parent().find('.number').val(response.number)
			}
			click1()
		})
	})
		//清空购物车
	$('#delSelect').click(function () {

		$('.main-b').each(function (){
			var status = $(this).find('.checkbox').attr('status')
			var $that = $(this)
				console.log(status)

			if (status == '1') {
				var cartid = $that.find('.checkbox').attr('cartid')

				$.get('/delSelect/',{'cartid':cartid},function (response) {
					console.log(response)
					if (response.status == 1){
						$that.remove()
						console.log('success')
						$('#total').html(0)
					}
					error()
					window.location.reload()

				})
			}
			console.log('cartid',cartid)


		})

	})

	//计算总价
	function click1() {
		var sum = 0
		// console.log('total')
        // 遍历

        $('.main-b').each(function () {
        	// console.log('total1')

            var $shop = $(this).find('.checkbox')
            var $that = $(this)

            // 选中，才计算
			var status = $shop.attr('status')

	        console.log('status',status)
	        if ($shop.attr('status') == '0'){

            	$('#total').html(sum)

	        } else if ($shop.attr('status') == '1'){
        		console.log('total2')

                var price = $that.find('.price').html()

                var num = $that.find('.number').val()

                sum += num * price

	            console.log(sum)

	             $('#total').html(sum)

            }
        })
        // 修改总计 显示
	}
	//确定商品是否选中
	function click2() {
		var cartid = $('.main-b .checkbox').attr('cartid')
		var status =  $('.main-b').find('input').attr('status')
		console.log('status',status)
		console.log('cartid',cartid)
		$.get('/status/',{'cartid':cartid},function (response) {
			// console.log(response)
			$('.main-b').find('input').attr('status',response.num)
		})
	}





	function allSelect() {
		console.log(999)

		var num=0;
		$('.main-b .checkbox').each(function () {
			var s=$(this).attr('status');
			if (s=='1'){
				num++
			}
		})
		console.log(num)
		if (num==$('.main-b').length){
			console.log('AllSelect')
			$('.allSelect').attr('checked','checked')
			}
		}



	function error(){
		$('.main-b').each(function () {
			console.log('check_shop')

			if ($('.main-b').length > 0){
				console.log('购物车有商品')
			} else  {
				console.log('购物车无商品')
				$('#error').html('<p id="error" style="color: red;font-size: 20px;text-align: center"> 还没有商品加入购物车，请先购物！ </p>')
			}
		})

	}





	console.log('*************************')


	    $('#generate-order').click(function () {
	        $.get('/generateorder/', function (response) {
	            console.log(response)
	            if (response['status'] == '1'){ // 订单详情(付款)

	                var orderid = response['orderid']


		            window.open('/orderinfo/?orderid='+orderid, target='_self')
	            }
	        })
	})
})



	
				


















