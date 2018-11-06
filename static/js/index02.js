$(function () {

	clickab()

	$('#register').attr('disabled', 'disabled')
	var a, b, c, d  = 0
	$(".aa").find("input").click(function () {

		$(".aa .dd").css("display", "block")

	})
	$(".aa").find("input").keyup(function () {

		var str = $(this).val();

		var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;

		if (reg.test(str)) {
			$(".aa .iconfont").css("display", "block")
			$(".aa .dd").css("display", "none")
			a = 1

		}
		else {
			$(".aa .iconfont").css("display", "none")
			$(".aa .dd").html("手机格式不正确，请核对后输入")
			a = 0
		}
	})

	$('.ab').find('a').click(function () {
		clickab()
	})





	$(".ab").find("b").click(function () {
				clickab()

	})



	function clickab() {

		var code = '0123456789QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm'

		$(".ab").find("b").html(code[parseInt(Math.random() * code.length)] + "" + code[parseInt(Math.random() * code.length)] + "" + code[parseInt(Math.random() * code.length)] + "" +code[parseInt(Math.random() * code.length)])
		var str1 = $(".ab").find("b").html();

		$(".ab").find("input").keyup(function () {
			var str2 = $(this).val()



			var str3 = str1.toLowerCase()
			var str4 = str2.toLowerCase()


			// var str3 = str4;



			if (str3 == str4) {

				$(".ab .iconfont").css("display", "block")
				$(".ab .dd").css("display", "none")
				b = 1

			}
			else {
				$(".ab .dd").css("display", "block")
				$(".ab .dd").html("验证码不正确！")
				b = 0
			}
		})
	}

	$(".ac").find("input").click(function () {

		$(".ac .dd").css("display", "block")

	})
	$(".ac").find("input").keyup(function () {

		var str = $(".ac").find("input").val();
		var reg = /^\w{6,257}$/;

		if (reg.test(str)) {
			$(".ac .iconfont").css("display", "block")
			$(".ac .dd").css("display", "none")
			c = 1

		}
		else {
			$(".ac .iconfont").css("display", "none")
			$(".ac .dd").html("密码格式不正确，请核对后输入")
			c = 0
		}
	})
	$(".ad").find("input").click(function () {

		$(".ad .dd").css("display", "block")

	})
	$(".ad").find("input").keyup(function () {

		var str = $(".ad").find("input").val();
		var str1 = $(".ac").find("input").val();


		console.log(str)
		console.log(str1)

		if (str == str1) {
			$(".ad .iconfont").css("display", "block")
			$(".ad .dd").css("display", "none")
			d = 1

		}
		else {
			$(".ad .iconfont").css("display", "none")
			$(".ad .dd").html("密码格式不正确，请核对后输入")
			d = 0
		}
	})



	$('#register').mouseenter(function () {
		console.log(a)
		console.log(b)
		console.log(c)
		console.log(d)

		if (a * b * c * d) {
			$('#register').removeAttr('disabled')
		}
		else {
			$('#register').attr('disabled', 'disabled')
		}


	})


	//   //注册
	//   $('.sub').click(function(){
	//   	 //ajax http://127.0.0.1:8020/1710html5二阶段/优品惠2/json/注册01.php
	// 	  var xhr = new XMLHttpRequest();
	// 	  xhr.open("post", " http://127.0.0.1:8066//youpinhui2/json/zhuche01.php", true);
	//
	// 	  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	// 	  var str = "tel="+$(".aa").find("input").val() + "&pwd="+$(".ac").find("input").val();
	// 	  //console.log(str);
	// 	    console.log(str)
	// 	  xhr.send(str);
	// 	  xhr.onreadystatechange = function () {
	// 		  if (xhr.readyState==4 && xhr.status==200) {
	// 			  console.log(xhr.responseText);
	//
	// 			  //json解析
	// 			  //如果注册成功则进入登录页面
	// 			  //如果失败则弹出提示信息
	// 			  var obj=JSON.parse(xhr.responseText);
	//
	//
	// 	      	   if(  $(".bb").find("input").prop("checked") ){
	// 	      	   	   if(flag1&&flag2&&flag3&&flag4){
	// 	      	   	   	 if(obj.status==1){
	// 									  	alert(obj.msg)
	// 									  	console.log(1)
	// 									  	location.href="{% url 'app:index' %}"
	// 									  }
	// 									  else{
	// 									  	alert(obj.msg)
	// 									  }
	//
	// 	      	   	   }
	// 	      	   }
	//
	//
	//
	//
	// 		  }
	// 	  }
	//
	// })


})
    
			  
 















