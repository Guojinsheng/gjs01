	$(function(){
				
				//获取购物车的cookie数据,并用节点显示
				refresh();
				
				function refresh() {
					
					var arr = $.cookie("cart");
					if (arr) {
						arr = JSON.parse(arr);
						
						//先清除旧节点
						$(".main-b").remove();
						
						//再添加新节点
						var totalPrice = 0; //总价
						var num=0;
						//遍历数组
						for (var i=0; i<arr.length; i++) {
							var obj = arr[i];
							var hh=(obj.num)*obj.price;
							//创建li节点
						var ul=$("<ul class='main-b'></ul>").appendTo(".main-t")
							
							var li1 = $("<li></li>").appendTo(ul);
							var li2 = $("<li></li>").appendTo(ul);
							var li3 = $("<li></li>").appendTo(ul);
							var li4 = $("<li></li>").appendTo(ul);
							var li5 = $("<li></li>").appendTo(ul);
							var li6 = $("<li></li>").appendTo(ul);
							//是否选中
							if (obj.checked) {
								$('<input class="ckbox" type="checkbox" checked="checked" />全选').appendTo(li1);
							}
							else {
								$('<input class="ckbox" type="checkbox" />全选').appendTo(li1);
							} 
                            
                    
							$('<img class="img" src="'+ obj.img +'" >').appendTo(li2);
			
							$('<span class="price">'+obj.price +'</span>').appendTo(li3);
							$('<input class="reduce" type="button" value="-" /><input class="num" type="text" value="'+ obj.num +'" /><input class="add" type="button" value="+" />').appendTo(li4);
							$('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'+hh +'</span>').appendTo(li5);
							$('<i class="iconfont">&#xe60d;</i>').appendTo(li6);
							$(".main-b-b").css("display","block")

                                                              
							//计算总价
							if (obj.checked) {
								totalPrice += obj.price * obj.num; 
								num+=obj.num;
							} 
						
                          
						}
						
						//显示总价
						$("#total").html(totalPrice);
					}
					else {
						console.log("购物车还没有商品， 请先购买！");
						$(".main-b-b").css("display","none")
						console.log(1)
						$("<h1>购物车还没有商品， 请先购买！</h1>").appendTo(".main-t")
					}
					
					
                    $.cookie("num",num,{expires:30,path:"/"});
                    
					$(".main-b li:nth-child(4)").find("input:eq(2)").click(function(){
						var index = $(this).parent().parent().index(".main-t ul")-1;
						console.log(index)
						
						//获取cookie并修改
						var arr = JSON.parse($.cookie("cart"));
						console.log(arr)
						arr[index].num++;
						//覆盖原来的cookie
						$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
						
						//刷新节点数据
						refresh();
						
					})
					
					$(".main-b li:nth-child(4)").find("input:eq(0)").click(function(){
						var index = $(this).parent().parent().index(".main-t ul")-1;
						
						//获取cookie并修改
						var arr = JSON.parse($.cookie("cart"));
						arr[index].num--;
						if (arr[index].num < 1) {
							arr[index].num = 1;
						}
						
						//覆盖原来的cookie
						$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
						
						//刷新节点数据
						refresh();
						
					})
					
					$(".main-b").on("click", ".iconfont", function(){
						var index = $(this).index(".main-b .iconfont");
						
						//获取cookie并修改
						var arr = JSON.parse($.cookie("cart"));
						arr[index].num--;
						if(arr[index].num<=0){
							arr.splice(index, 1); //删除数组arr的第index个
						}
						
						//覆盖原来的cookie
						$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
						
						isAllSelect();
						
						//刷新节点数据
						refresh();
					})
					
					$(".main-b").on("click", ".ckbox", function(){
						var index = $(this).index(".main-b .ckbox");
						
						//获取cookie并修改
						var arr = JSON.parse($.cookie("cart"));
						arr[index].checked = !arr[index].checked;
						
						//覆盖原来的cookie
						$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
						
						//判断是否全选了
						isAllSelect();
						
						//刷新节点数据
						refresh();
					})
					
					//判断是否全部勾选了
					isAllSelect();
					function isAllSelect(){
						
						//判断是否为undefined
						var arr = $.cookie("cart");
						if (!arr) {
							return;
						}
						
						var arr = JSON.parse($.cookie("cart"));
						
						var sum = 0;
						for (var i=0; i<arr.length; i++) {
							sum += arr[i].checked;
						}
						
						//全选了
						if (arr.length!=0 && sum==arr.length) {
							$("#allSelect").prop("checked", true);
						}
						//未全选
						else {
							$("#allSelect").prop("checked", false);
						}
					}
					
					//全选
					$("#allSelect").click(function(){
						//判断是否为undefined
						var arr = $.cookie("cart");
						if (!arr) {
							return;
						}
						
						var arr = JSON.parse($.cookie("cart"));
						for (var i=0; i<arr.length; i++) {
							//全选
							if ($(this).prop("checked")){
								arr[i].checked = true;
							}
							//全不选
							else {
								arr[i].checked = false;
							}
						}
						$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
						
						//刷新
						refresh();
					})
					
					//删除选中
					$("#delSelect").click(function(){
						
						//获取cookie并修改
						var arr = JSON.parse($.cookie("cart"));
						
						//将未选中的商品添加到新数组newArr中，再将newArr保存到cookie
						var newArr = [];
						for (var i=0; i<arr.length; i++) {
							if (!arr[i].checked) {
								newArr.push(arr[i]);
							}
						}
						
						//覆盖原来的cookie
						$.cookie("cart", JSON.stringify(newArr), {expires:30, path:"/"});
						
						isAllSelect();
						
						//刷新节点数据
						refresh();
					})
				}

				
			
				
			})


					
	
				


















