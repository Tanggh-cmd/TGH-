<?php

include "conn.php";
//获取前端传入的sid
if(isset($_GET['id'])){
    $sid = $_GET['id'];
    //利用sid查找对应的数据，返回给前端。
    $result=$mysqli->query("select * from product where pro_id = $sid");
    echo json_encode($result->fetch_assoc());
}

?>
