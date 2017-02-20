<?php
	include "DBHelper.php";

	$account = $_POST["account"];
	$psw = $_POST["password"];
	$phone = $_POST["phone"];
	$email = $_POST["email"];
	session_start();
	$sql = "update users_list set account='$account',password='$psw',phone='$phone',email='$email' where email = '". $_SESSION["email"] ."';";
	$result = excute($sql);
	$_SESSION["email"] = $email;
	echo '{"state": true, "message": "success to save"}';
?>