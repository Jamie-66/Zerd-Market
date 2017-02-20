<?php
	include "DBHelper.php";

	$id = $_POST["id"];
	session_start();
	$sql = "delete from shop_cart where id = '$id' and account = '". $_SESSION["userId"]."';";

	$result = excute($sql);
	
	//主键重新排序
	$newIndexid1 = "ALTER TABLE  `shop_cart` DROP  `indexid` ;";
	$newIndexid2 = "ALTER TABLE `shop_cart` ADD `indexid` INT( 11 ) NOT NULL AUTO_INCREMENT FIRST, ADD PRIMARY KEY (`indexid`);";
	excute($newIndexid1);
	excute($newIndexid2);

	if ($result) {
		echo '{"state": true, "msg": "success to delete !!"}';
	}else{
		echo '{"state": false, "msg": "fail to delete !!"}';
	}
?>