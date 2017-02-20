<?php
	include "DBHelper.php";

	session_start();
	if(isset($_SESSION["userId"])){
		$id = $_POST["id"];
		$storeId = $_POST["store_id"];
		$inventory = $_POST["inventory"];
		$item_img = $_POST["main_img"];
		$price = $_POST["price"];
		$title = $_POST["title"];
		$count = $_POST["count"];

		$sql = "insert into shop_cart(id,store_id,inventory,item_img,price,title,count,account) values('$id','$storeId','$inventory','$item_img','$price','$title','$count','".$_SESSION["userId"]."');";
		$sql_count = "select count from shop_cart where id = '$id' and account = '". $_SESSION["userId"]."';";
		$sql_num = "select id from shop_cart where account = '". $_SESSION["userId"]."';";
		// $sql_inventory = "update shop_cart set count='$inventory' where id='$id';";
		
		$array = query($sql_count);
		if(count($array) > 0){
			foreach ($array[0] as $key => $value) {
				$count += $value;
			}
			if($count > $inventory){
				// excute($sql_inventory);
				echo '{"state": false, "message": "Have reached the ceiling !!"}';;
			}else{
				$update = "update shop_cart set count='$count' where id = '$id';";
				$update_result = excute($update);
				$num_array = query($sql_num);
				$num = count($num_array);
				if($update_result){
					echo '{"state": true, "num": '.$num.', "message": "success to modify !!"}';
				}else{
					echo '{"state": false, "message": "fail to modify !!"}';
				}
			}
		}else{
	        $result = excute($sql);
	        $num_array = query($sql_num);
			$num = count($num_array);
			if($result){
				echo '{"state": true, "num": '.$num.', "message": "success to add to shop_cart !!"}';
			}else{
				echo '{"state": false, "message": "fail to add to shop_cart !!"}';
			}
		}
	}else{
		echo '{"state": "nologin", "message": "亲，请先登录"}';
	}
?>