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
		
		var param = location.search.substring(1);
				var pid = getParams(param, "id");
				console.log(pid);
			    
			    	
			    $(".header-r p").html(parseInt($.cookie("num")))
				$(".bar-t span").html(parseInt($.cookie("num")))
			   
			   
				//获取json中的数据
				$.get("/static/json/shops.json", function(data){
					var arr = data;
					
					for (var i=0; i<arr.length; i++) {
						var obj = arr[i]; //每个商品数据
						
						//找到id相同的商品后，就可以使用obj了
						if (obj.id == pid) {
							loadUI(obj);
						}
					}
				})
				
				function loadUI(obj){
					$(".cc").attr("src", obj.img);
					$(".img01").attr("src",obj.img1);
					$(".img02").attr("src",obj.img2);
					$(".img03").attr("src",obj.img3);
					$(".img04").attr("src",obj.img4);
					$("#bigImg").attr("src",obj.img);
					$(".price").html( obj.price );
					 
				
					
				
				}
				
				
				
				//查找参数对应的值
				function getParams(str, name){
					var arr = str.split("&");
					for (var i=0; i<arr.length; i++) {
						var str1 = arr[i]; // id=1002 
						var arr1 = str1.split("=");
						if (arr1[0] == name) {
							return arr1[1];
						}
					}
					return "";
				}
				
	
				
			
				
			//等比公式
				//小图width/大图width == 小区域width/大区域width
				$("#smallArea").width( $("#smallImg").width() * $("#bigArea").width() / $("#bigImg").width() );
				$("#smallArea").height( $("#smallImg").height() * $("#bigArea").height() / $("#bigImg").height() );
				
				//放大系数
				var scale = $("#bigImg").width() / $("#smallImg").width();
				
				//在小图中移动
				$("#smallImg").mousemove(function(e){
					$("#smallArea").show(); //显示小区域
					$("#bigArea").show(); //显示大区域
					
					
					var x = e.pageX - $("#smallImg").offset().left - $("#smallArea").width()/2;
					var y = e.pageY - $("#smallImg").offset().top - $("#smallArea").height()/2;
					
					//控制不超出左右边界
					if (x < 0){
						x = 0;
					}
					else if (x > $("#smallImg").width()-$("#smallArea").width()){
						x = $("#smallImg").width()-$("#smallArea").width();
					}
					//控制不超出上下边界
					if (y < 0){
						y = 0
					}
					else if (y > $("#smallImg").height()-$("#smallArea").height()) {
						y = $("#smallImg").height()-$("#smallArea").height();
					}
					
					//小区域移动
					$("#smallArea").css({left:x, top:y});
					
					//大图移动
					$("#bigImg").css({left: -scale*x,top: -scale*y});
				})
				
				//移除小图
				$("#smallImg").mouseleave(function(){
					$("#smallArea").hide(); //隐藏小区域
					$("#bigArea").hide(); //隐藏大区域
				})
				

				
				$("#list li").click(function(){
					
					$(".cc").attr("src",$(this).find("img").attr("src") );
					$("#bigImg").attr("src",$(this).find("img").attr("src"));
					
				})
				
			
			    
			    var j=0;
			    $(".main-r").find("h4").click( function(){
							//将当前点击的商品数据加入购物车（cookie）
//							if($.cookie("newnum")){
//								$(".header-r p").html(parseInt($.cookie("num"))+parseInt($.cookie("newnum")))
//							    $(".bar-t span").html(parseInt($.cookie("num"))+parseInt($.cookie("newnum")))
//							}
						    j++;	
							$.get("/static/json/shops.json", function(data){
									var arr = data;
									
								for (var i=0; i<arr.length; i++) {
										var obj = arr[i]; //每个商品数据
										
										//找到id相同的商品后，就可以使用obj了
									if (obj.id == pid) {
										loadUI(obj);
										var arr2 = $.cookie("cart") ? JSON.parse($.cookie("cart")) : []; 
										console.log(arr2)
											
										//判断原来的购物车中是否有相同商品
										var isExist = false;
										
										for (var i=0; i<arr2.length; i++) {
											if (arr2[i].id == obj.id) {
												arr2[i].num++;
												console.log(arr2[i].num)
												isExist = true;
												
												break;
											}
										}
                                        
										if (isExist ==  false) {
											obj.num = 1;
											obj.hh=obj.price;
											obj.checked = true; //是否选中， 默认选中 
											arr2.push(obj);
										}
										
//										$(".header-r p").html($.cookie("num"))
//									    $(".bar-t span").html($.cookie("num"))
										
										
									
											console.log(j)
											$(".header-r p").html(parseInt($.cookie("num"))+j)
										    
											$(".bar-t span").html(parseInt($.cookie("num"))+j)
										
											$.cookie("newnum",j,{expires:30, path:"/"});

										//将arr2添加到cookie中
										$.cookie("cart", JSON.stringify(arr2), {expires:30, path:"/"});
//										console.log( $.cookie("cart") );
									
								        break;
											
									}
										
								}
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
			 
			    
			    var offset = $("#end").offset();  //结束的地方的元素
				 $(".main-r").find("h4").click(function(event){   //是$(".addcar")这个元素点击促发的 开始动画的位置就是这个元素的位置为起点
					var addcar = $(this); 
					var img = addcar.parent().parent().find("#bigImg").attr('src');
					
					console.log(addcar.parent().parent().find("#bigImg").attr('src'))
					var flyer = $('<img class="u-flyer" src="'+img+'">');
					flyer.fly({
						//开始位置
						start: {
							left: event.clientX,
							top: event.clientY
						},
						//结束位置
						end: {
							left: offset.left,
							top: offset.top,
							width: 0,
							height: 0
						},
						//结束后
						onEnd: function(){
							console.log("结束");
							$("#msg").show().animate({width: '250px'}, 200).fadeOut(1000);
							flyer.remove();
						}
					});
				});
  
	})