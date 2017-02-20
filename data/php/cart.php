<?php
	include "DBHelper.php";
	 
	session_start();
	if(isset($_SESSION["userId"])){
		//前端页数 
		$page = $_POST['page'];  
		$limit = 8;  
		$start = ($page - 1) * $limit;  
		$end = $page * $limit;  
		$allSql = "select * from shop_cart where account = '". $_SESSION["userId"]."';";
		$allArray = query($allSql);
		$allSize = count($allArray);
		if($allSize > 0){
			//组织数据  
			$arr = array();  
			for ($i = $start; $i < $end; $i++) { 
				if($i < $allSize){
					$arr[] = $allArray[$i];
				}
			}  
			//返回数据  
			$result = array(  
			    'data' => $arr, //数据源  
			    'countPage' => ceil($allSize / $limit) //总分页  
			);  
			echo json_encode($result);
		}else{
			echo '{"state": false, "msg": "购物车空空如也"}';
		}	
	}else{
		echo '{"state": "nologin", "msg": "亲，请先点击登录"}';
	}
		
?>