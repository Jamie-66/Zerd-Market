<?php
	include "DBHelper.php";

	$psw = $_POST["password"];
	$name = $_POST["name"];
	$lastLoginTime = $_POST['lastLoginTime'];

	$checkSql1 = "select * from users_list where account = '$name' or nickName = '$name' or email = '$name' or phone = '$name';";
	$array1 = query($checkSql1);
	if(count($array1) > 0){
		$checkSql2 = "select * from users_list where password = '$psw';";
		$array2 = query($checkSql2);
		if(count($array2) > 0){
			$sql = "update users_list set lastLoginTime ='$lastLoginTime' where account = '$name' or nickName = '$name' or email = '$name' or phone = '$name' and password = '$psw';";
			excute($sql);
			echo '{"state": true, "message": "登录成功！"}';
			session_start();
			$_SESSION["userId"] = $name;
		}	
	}else{
		echo '{"state": false, "message": "登录失败！"}';
	}
?>