<?php
	include "DBHelper.php";

	//前端页数 
	$page = $_POST['page'];
	$account = $_POST['account'];  
	$limit = 8;  
	$start = ($page - 1) * $limit;  
	$end = $page * $limit;
	
	$sql = "select * from address_list where account = '".$account."';";
	$address_arr = query($sql);
	$size = count($address_arr);

	if($size > 0){
		//组织数据  
		$arr = array();  
		for ($i = $start; $i < $end; $i++) { 
			if($i < $size){
				$arr[] = $address_arr[$i];
			}
		}  
		//返回数据  
		$result = array(  
		    'data' => $arr, //数据源  
		    'countPage' => ceil($size / $limit) //总分页  
		);  
		echo json_encode($result);
	}else{
		echo '{"state": false, "msg": "还没有添加地址"}';
	}
	
?>