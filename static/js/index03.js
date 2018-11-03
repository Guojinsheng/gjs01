/**
 * Created by Administrator on 2017/10/17 0017.
 */
// $(function () {
//     console.log(1)
//     var ainput = document.getElementsByTagName("input");
//
//
//
//
//     $('#login').click(function () {
//         var tel = ainput[0].val()
//         var password = ainput[1].val()
//
//         $.ajax({
//             url:'/app/login',
//             type:'GET',
//             data:{phone:'User.phone',password:'User.password'},
//             dataType:'text',
//             success:function () {
//                 if (phone == tel | password == password){
//                     window.open('/app/index/',target = '_self')
//                 } else{
//                     alert('手机号或密码错误')
//                 }
//             },
//             fail:function () {
//                 console.log(1)
//             }
//         })
//
//     })
// })


$(function () {
	// $('#phone').click(function () {
	// 	$('.error').hide()
	// })
	// $('#password').click(function () {
	// 	$('.error').hide()
	// })

	$(document).click(function () {
		$('.error').hide()
	})
})