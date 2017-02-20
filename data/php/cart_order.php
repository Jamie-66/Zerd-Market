<?php
	include "DBHelper.php";

	$arr = $_POST['msg'];
	$size = count($arr);
	$flag = true;
	$arr_id = array();
	$arr_count = array();

	session_start();
	if(isset($_SESSION["userId"])){
		for ($i = 0; $i < $size; $i++) {
			for($j = 0; $j < count($arr[$i]); $j++){

				$order_id = date("Y-m-dH-i-s");
				$order_id = str_replace("-","",$order_id);
				$order_id .= rand(1000,999999);
				$sql = "insert into order_list";
				$sql2 = "(order_id,";
				$sql3 = "('$order_id',";

				foreach ($arr[$i][$j] as $key => $value) {
					$sql2 = $sql2.$key.",";
					$sql3 = $sql3."'".$value."',";
					if($key == "pro_id"){
						$arr_id[] = $value;
					}else if($key == "count"){
						$arr_count[] = $value;
					}
				}

				$sql2 = $sql2.")";
				$sql3 = $sql3.")";
				$arr1 = explode(',)',$sql2);
				$arr2 = explode(',)',$sql3);
				$sql2 = $arr1[0].")";
				$sql3 = $arr2[0].")";
				$sql = $sql.$sql2." values".$sql3.";";
			
				$result = excute($sql);
				if(!$result){
					$flag = false;
				}
			}
		}  	
		// echo json_encode($arr_count, JSON_UNESCAPED_UNICODE);
		if($flag){
			$re_flag = true;
			for($k=0; $k<count($arr_count); $k++){
				$inventory_sql = "select inventory from product_item where id='".$arr_id[$k]."';";
				$inventoryarr = query($inventory_sql);
				
				$cart_del_sql = "delete from shop_cart where id='".$arr_id[$k]."' and account='".$_SESSION["userId"]."';";
				$del_result = excute($cart_del_sql);
				//主键重新排序
				$newIndexid1 = "ALTER TABLE  `shop_cart` DROP  `indexid` ;";
				$newIndexid2 = "ALTER TABLE `shop_cart` ADD `indexid` INT( 11 ) NOT NULL AUTO_INCREMENT FIRST, ADD PRIMARY KEY (`indexid`);";
				excute($newIndexid1);
				excute($newIndexid2);

				foreach ($inventoryarr[0] as $key => $value) {
					$inventory = $value - $arr_count[$k];
					$update_sql = "update product_item set inventory='".$inventory."' where id='".$arr_id[$k]."';";
					$inventory_result = excute($update_sql);
					if(!$inventory_result){
						$re_flag = false;
					}
				}
			}
			if($re_flag){
				echo '{"state": true, "message": "success to creat an order !!"}';
			}	
		}else{
			echo '{"state": false, "message": "fail to creat an order !!"}';
		}
	}else{
		echo '{"state": "nologin", "message": "亲，请先登录"}';
	}
?>