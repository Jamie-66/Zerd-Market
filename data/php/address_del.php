<?php
	include "DBHelper.php";

	$addressid = $_POST['addressid'];
	$account = $_POST['account'];

	$sql = "delete from address_list where account = '".$account."' and address_id = '".$addressid."';";
	$result = excute($sql);

	//主键重新排序
	$newIndexid1 = "ALTER TABLE  `address_list` DROP  `indexid` ;";
	$newIndexid2 = "ALTER TABLE `address_list` ADD `indexid` INT( 11 ) NOT NULL AUTO_INCREMENT FIRST, ADD PRIMARY KEY (`indexid`);";
	excute($newIndexid1);
	excute($newIndexid2);
	
	if ($result) {
		echo '{"state": true, "msg": "success to delete !!"}';
	}else{
		echo '{"state": false, "msg": "fail to delete !!"}';
	}
?>