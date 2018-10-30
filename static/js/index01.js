onload=function(){

		// var arr=[];
		// $.get("/static/json/lunbo.json",function(date){
		// 	    arr=date;
		// 		for(var i=0 ;i<arr.length;i++){
		// 			var obj=arr[i];
		// 		//	console.log(obj)
		// 		    $("<li><a href='#'><img src="+obj.img+"></a></li>").appendTo("#list1")
		// 		 //   console.log(obj.img)
	     //        }
		
			    $("#list1 li").eq(0).clone(true).appendTo("#list1");
					var list1 = $("#list1");
					var list2 = $("#list2");
					var li1 = $("#list1 li");
					var li2 = $("#list2 li");
					var size=$("#list1 li").size();
					var i=0;
					var timer=setInterval(function(){
						i++;
						move();
					},2000)
			
					function move(){
						if(i>=size){
							list1.css("left",0)
							i=1;
							
						}
						if(i<0){
							list1.css("left",-1423*(size-1));
							i=size-2;
							
						}
			            
						list1.stop().animate({left:-i*1423}, 500);
						
						li2.eq(i).addClass("active").siblings().removeClass("active");
						if( i == size-1){
							li2.eq(0).addClass("active").siblings().removeClass("active");
						}
					}
					
					//上一页
				$("#pre").click(function(){
					i--;
					move();
				})
				
				//下一页
				$("#next").click(function(){
					i++;
					move();
				})
				
				li2.mouseenter(function(){
					i = $(this).index();
					move();
				})
				
				$("#banner").hover(function(){
					console.log("mouseenter");
					$("#pre").css("display","block");
					$("#next").css("display","block");
					clearInterval(timer);
				}, 
				function(){
					console.log("mouseleave");
					$("#pre").css("display","none");
					$("#next").css("display","none");
					timer = setInterval(function(){
						i++;
						move();
					}, 2000);
				})
			
		// })
//       http://127.0.0.1:8020/1710html5二阶段/优品惠/优品惠/json/商品详情.json
        var arr1=[];
			// $.get("/static/json/shops.json",function(date){
			// 	console.log('11')
			// 	arr1=date;
			// 	for(var i=0 ;i<arr1.length;i++){
			// 	   var obj1=arr1[i];
	         //       var li=$("<li></li>").appendTo(".figure-j")
	         //       $("<img src="+obj1.img+"><h3>"+obj1.name+"</h3><h4>"+obj1.introduce+"</h4>").appendTo(li)
	         //       $("<div class='figure-c-l'><span class='f-left'>"+obj1.price+"</span><span class='f-right'>"+obj1.purchased+"</span></div>").appendTo(li)
	         //
			// 	}
			// })
	        
			// $(".figure-j").on("click", "li", function(){
			// 		//console.log("click");
			// 		var obj_id = $(this).index();
			// 		// var obj_id = arr1[index];
			// 		// console.log(obj1.id);
			//
			// 		//进入详情页， 且将当前点击的商品的id传入
			// 		location.href = "/App/shop/(\d+)/"  ;
			//
			// })
				
	
				
				
	
	var list3=document.getElementById("list3");
	var ali3=list3.getElementsByTagName("li");
	var list4=document.getElementById("list4");
	var ali4=list4.getElementsByTagName("li");
	ali3[0].style.opacity=1;
	ali3[0].alpha=100;
	var index=0;
	var timer1=setInterval(function(){
		index++;
		move1();
	},3000)
	
	function move1(){
			if(index >= ali3.length){
				for(var i=0;i<ali3.length;i++){
					ali3[i].style.opacity=0;
		            ali3[i].alpha=0;
				}
				ali3[0].style.opacity=1;
		        ali3[0].alpha=100;
				index=0;
			}
			
			for(var i=0;i<ali4.length;i++){
				if(i==index){
					
					animate(ali3[index],{opacity:100})
				}
				else{
					animate(ali3[i],{opacity:0})
					
				}
			}
	}
		for( var i=0;i<ali4.length;i++){
		 	ali4[i].index=i;
		 	ali4[i].onmouseenter=function(){
		 		index=this.index;
		 		move1();
		 	}
		}
		list4.onmouseenter=function(){
					clearInterval(timer1);
				}
		list4.onmouseleave=function(){
			timer1=setInterval(function(){
			index++;
			move1();
		    },3000)
		}
	var box=document.getElementById("box");
    var list5=document.getElementById("list5");
    var ali5=list5.getElementsByTagName("li");
    ali5[0].style.opacity=1;
	ali5[0].alpha=100;
	var index1=0;
	var timer2=setInterval(function(){
		index1++;
		move2();
	},3000)
	
	function move2(){
		if(index1 > ali5.length-1){
			for(var i=0;i<ali5.length;i++){
				ali5[i].style.opacity=0;
	            ali5[i].alpha=0;
			}
			ali5[0].style.opacity=1;
	        ali5[0].alpha=100;
			index1=0;
		}
		if(index1 < 0){
			for(var i=0;i<ali5.length;i++){
				ali5[i].style.opacity=0;
	            ali5[i].alpha=0;
			}
			ali5[ali5.length-1].style.opacity=1;
	        ali5[ali5.length-1].alpha=100;
			index1=ali5.length-1;
		}
		for(var i=0;i<ali5.length;i++){
			ali5[i].style.opacity=0;
	        ali5[i].alpha=0;
			animate(ali5[index1],{opacity:100})
		}
	}
	pre1.onclick=function(){
		index1--;
		move2();
	}
	next1.onclick=function(){
		index1++;
		move2();
	}
	
	$(function(){
		$(".menu-r").mouseenter(function(){
			$(".menu-r").css("background","#AA0000")
		    $(".fllist").css("display","block")
		})
		$(".fllist").mouseleave(function(){
			 $(".menu-r").css("background","")
			 $(".fllist").css("display","none")
		})
		
		$(".top-nav").eq(1).click(function(){
			location.href="register.html"
		})
	})

    $(".bar-t li").eq(0).mouseenter(function(){
    	$(".sidebar-a").css("display","block")
    })
    $(".bar-t li").eq(0).mouseleave(function(){
    	$(".sidebar-a").css("display","none")
    })
     
    $(".bar-t li").eq(1).mouseenter(function(){
    	$(".gwc").css("display","block")
    })
     $(".bar-t li").eq(1).mouseleave(function(){
    	$(".gwc").css("display","none")
    })
    
    $(".bar-t li").eq(2).mouseenter(function(){
    	$(".wdgz").css("display","block")
    })
    $(".bar-t li").eq(2).mouseleave(function(){
    	$(".wdgz").css("display","none")
    })
    
    $(".bar-t li").eq(3).mouseenter(function(){
    	$(".zxkf").css("display","block")
    })
    $(".bar-t li").eq(3).mouseleave(function(){
    	$(".zxkf").css("display","none")
    })
   
    $(".bar-b li").eq(0).mouseenter(function(){
    	$(".ewm").css("display","block")
    })
    $(".bar-b li").eq(0).mouseleave(function(){
    	$(".ewm").css("display","none")
    })
    
    $(".bar-b li").eq(1).mouseenter(function(){
    	$(".dcwj").css("display","block")
    })
    $(".bar-b li").eq(1).mouseleave(function(){
    	$(".dcwj").css("display","none")
    })
    
    $(".bar-b li").eq(2).mouseenter(function(){
    	$(".fhdb").css("display","block")
    })
    $(".bar-b li").eq(2).mouseleave(function(){
    	$(".fhdb").css("display","none")
    })
    
    $(".bar-b p").eq(1).click(function(){
    	var speed=150;//滑动的速度
        $('body,html').animate({ scrollTop: 0 }, speed);
        return false;
    })
    $(".bar-b i").eq(2).click(function(){
    	var speed=150;//滑动的速度
        $('body,html').animate({ scrollTop: 0 }, speed);
        return false;
    })
    
    $(".header-r p").html($.cookie("num"))
}










