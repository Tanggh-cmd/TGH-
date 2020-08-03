<?php
include('./conn.php');

$idList = $_REQUEST['id'];

// echo $idList;
$sql="select * from product where pro_id in ($idList)";

// echo $sql;

$res = $mysqli->query($sql);

$arr = array();

while($row = $res->fetch_assoc()){

    array_push($arr,$row);
};

$json = json_encode($arr);

echo $json;

$mysqli->close();
?>