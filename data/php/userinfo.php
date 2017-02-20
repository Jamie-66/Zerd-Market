<?php
	include "DBHelper.php";

	$nickname = $_POST['nickname'];
	$phonenum = $_POST['phonenum'];
	$provine = $_POST['provine'];
	$city = $_POST['city'];
	$area = $_POST['area'];
	$address = $_POST['address'];
	
	session_start();
	if(isset($_SESSION["userId"])){
		$sql = "update users_list set nickName='$nickname',phone='$phonenum',provine='$provine',city='$city',area='$area',address='".$provine.$city.$area.$address."' where account = '". $_SESSION["userId"] ."';";
		$result = excute($sql);
		if ($result) {
			echo '{"state": true, "message": "success to save !!"}';
		}else{
			echo '{"state": false, "message": "fail to save !!"}';
		}
	}else{
		echo '{"state": false, "message": "fail to find userid !!"}';
	}
?>