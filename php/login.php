<?php
    // header('content-type:text/html;charset=utf-8');
    include('./conn.php');

    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];

    // sql语句 查询
    // $sql = "select * from twoproject where number='$username' and password='$password'";
    $result = $mysqli->query("select * from twoproject where number = '$username' and password ='$password'");
    // print_r($result->fetch_assoc());
    if($result->fetch_assoc()){//匹配成功
        echo true;
    }else{//匹配不成功
        echo false;
    }
    // 执行sql语句
    // $res = $mysqli->query($sql);

    // if($res->num_rows>0){
    //     // echo '<script>alert("登录成功"); </script>';
    //     // echo '<script>location.href="../src/html/index.html";</script>';
    //     echo true;
    // }else{
    //     // echo '<script>alert("用户名或密码不正确.");</script>';
    //     // echo '<script>location.href="../src/html/login.html";</script>';
    //     echo false;
    // }

    $mysqli->close();

?>
