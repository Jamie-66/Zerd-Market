<?php
	include "DBHelper.php";

	$id = $_POST['id'];
	$status = $_POST['status'];
	session_start();
	$checkSql = "select count from shop_cart where id='$id' and account = '". $_SESSION["userId"]."';";
	$inventory_sql = "select inventory from shop_cart where id='$id' and account = '". $_SESSION["userId"]."';";

	$array = query($checkSql);
	$inventory_array = query($inventory_sql);
	
	foreach ($array[0] as $key => $value) {
		$count = $value;
	}
	foreach ($inventory_array[0] as $key => $value) {
		$inventory = $value;
	}
	
	if($status == 'minus'){
		$count--;
		if($count < 1){
			$count = 1;
		}
		$sql = "update shop_cart set count='$count' where id='$id';";
		$result = excute($sql);
		echo "$count";
	}else{
		$count++;
		if($count > $inventory){
			$count = $inventory;
		}
		$sql = "update shop_cart set count='$count' where id='$id';";
		$result = excute($sql);
		echo "$count";
	}
?>