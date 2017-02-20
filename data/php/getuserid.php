<?php
	include "DBHelper.php";

	session_start();
	if(isset($_SESSION["userId"])){
		$checkSql = "select * from users_list where account = '". $_SESSION["userId"] ."' or email = '". $_SESSION["userId"] ."' or phone = '". $_SESSION["userId"] ."';";
		$array = query($checkSql);
		$size = count($array);
		if($size > 0){
			//返回数据  
			$result = array(  
			    'data' => $array
			);  
			echo json_encode($result);
		}else{
			echo '{"state": false, "message": "获取用户信息失败！"}';
		}
	}else{
		echo '{"state": false, "message": "没有用户登录"}';
	}
?>