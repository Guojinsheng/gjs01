<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/10/17 0017
 * Time: 下午 7:25
 */
header('Access-Control-Allow-Origin: *');

//接收到前端提交过来的参数
$tel = $_POST["tel"];
$pwd = $_POST["pwd"];

//连接数据库MySql
$conn = new mysqli("127.0.0.1", "root", "", "mydb9") or die("连接失败");

//判断用户名是否已经存在
$sql = "select * from users where tel='$tel'";
$result = $conn->query($sql);
if ($result && $result->num_rows>0) {
    $arr = array("status"=>0, "msg"=>"用户名已经存在");
    echo  json_encode($arr);
}
else {
    //插入数据， 注册
    $sql = "insert into users(tel, pwd) values('$tel', '$pwd')";
    $result = $conn->query($sql);
    if ($result) {
        $arr = array("status"=>1, "msg"=>"注册成功");
        echo  json_encode($arr);
    } else {
        $arr = array("status"=>0, "msg"=>"注册失败");
        echo  json_encode($arr);
    }
}
$conn->close();
