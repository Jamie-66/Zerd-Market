<?php
	include "DBHelper.php";

	session_start();
	if(isset($_SESSION["userId"])){
		$checkSql = "select address from users_list where account = '". $_SESSION["userId"] ."' or email = '". $_SESSION["userId"] ."' or phone = '". $_SESSION["userId"] ."';";
		$phoneSql = "select phone from users_list where account = '". $_SESSION["userId"] ."' or email = '". $_SESSION["userId"] ."' or phone = '". $_SESSION["userId"] ."';";
		$array = query($checkSql);
		$phoneArray = query($phoneSql);
		$size = count($array);
		if($size > 0){
			//返回数据  
			foreach ($phoneArray[0] as $key1 => $value1) {
				foreach ($array[0] as $key2 => $value2) {
					$result = array( 
						'user_id' => $_SESSION["userId"],
						'phone' => $value1,
					    'address' => $value2
					);
				}
			}
			echo json_encode($result);
		}else{
			echo '{"state": false, "message": "获取用户信息失败！"}';
		}
	}else{
		echo '{"state": false, "message": "没有用户登录"}';
	}
?>