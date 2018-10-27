/**
 * Created by Administrator on 2017/10/17 0017.
 */
onload = function () {
    console.log(1)
    var ainput = document.getElementsByTagName("input");
    var abtn = document.getElementsByTagName("button")[0];
    //注册
   abtn.onclick = function () {
        //ajax http://127.0.0.1:8066//youpinhui2/json/zhuche01.php http://localhost/sz1710/31-35/day32/code/04_login.php
        var xhr = new XMLHttpRequest();
        xhr.open("post", "http://127.0.0.1:8066//youpinhui2/json/denglu.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var str = "tel="+ainput[0].value   + "&pwd="+ainput[1].value;
        xhr.send(str);
        xhr.onreadystatechange = function () {
            if (xhr.readyState==4 && xhr.status==200) {
                console.log(xhr.responseText);
                //json解析
                //如果登录成功直接进入首页
                //如果失败则弹出提示信息
                console.log(xhr.responseText)
                var obj=JSON.parse(xhr.responseText);
                if(obj.status==1){
                	alert(obj.msg)
                	location.href="首页.html"
                }
                else{
                	alert(obj.msg)
                }
            }
        }
    }

}