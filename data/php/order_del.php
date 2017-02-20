<?php
	include "DBHelper.php";

	$store_id = $_POST["store_id"];
	session_start();
	if(isset($_SESSION["userId"])){
		$sql = "delete from order_list where store_id = '$store_id' and account = '".$_SESSION["userId"]."';";
		$result = excute($sql);
		
		//主键重新排序
		$newIndexid1 = "ALTER TABLE  `order_list` DROP  `indexid` ;";
		$newIndexid2 = "ALTER TABLE `order_list` ADD `indexid` INT( 11 ) NOT NULL AUTO_INCREMENT FIRST, ADD PRIMARY KEY (`indexid`);";
		excute($newIndexid1);
		excute($newIndexid2);
		
		if ($result) {
			echo '{"state": true, "msg": "success to delete !!"}';
		}else{
			echo '{"state": false, "msg": "fail to delete !!"}';
		}
	}else{
		echo '{"state": false, "message": "没有用户登录"}';
	}
?>