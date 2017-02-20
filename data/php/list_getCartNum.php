<?php
	include "DBHelper.php";

	session_start();
	if(isset($_SESSION["userId"])){
		$sql_num = "select id from shop_cart where account = '". $_SESSION["userId"] ."';";
		$num_array = query($sql_num);
		$num = count($num_array);
		echo "$num";
	}	
?>