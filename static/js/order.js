$(function () {
	f()

    $('#alipay').click(function () {
        var orderid = $(this).attr('orderid')
        $.get('/changeorderstatus/', {'orderid':orderid, 'status': 2}, function (response) {
            console.log(response)
        })
    })



	function f() {
    		 	    var sum = 0

		 $('.main-b').each(function () {
        	// console.log('total1')

            var $that = $(this)

            // 选中，才计算



            var price = $that.find('.price').html()

            var num = $that.find('.number').html()

            sum += num * price
		 console.log(price)
		 console.log(num)

            console.log(sum)

             $('#total').html(sum)

        })
	}
})