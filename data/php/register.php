<?php
	include "DBHelper.php";

	$account = $_POST["account"];
	$psw = $_POST["password"];
	$phone = $_POST["phone"];
	$email = $_POST["email"];
	$logo = $_POST['logo'];
	$level = $_POST['level'];
	$registerTime = $_POST['registerTime'];

	$sql = "insert into users_list(account,password,phone,email,logo,level,registerTime) values('$account','$psw','$phone','$email','$logo','$level','$registerTime');";
	$checkSql = "select account from users_list where account = '$account'";
	$array = query($checkSql);
	if(count($array) > 0){
		echo '{"state": false, "message": "this account existed !!"}';
	}else{
		$result = excute($sql);
		if($result){
			echo '{"state": true, "message": "success to registr !!"}';
		}else{
			echo '{"state": false, "message": "fail to registr !!"}';
		}
	}	
?>