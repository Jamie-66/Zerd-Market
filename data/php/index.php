<?php  
	include "DBHelper.php";
	//前端页数  
	$page = $_POST['page'];  
	$limit = 8;  
	$start = ($page - 1) * $limit;  
	$end = $page * $limit;  
	$allSql = "select * from product_list where 1;";
	$allArray = query($allSql);
	$allSize = count($allArray);
	if($allSize > 0){
		//组织数据  
		$arr = array();  
		for ($i = $start; $i < $end; $i++) { 
			$j = $i + 1;
			$sql = "select * from product_list where indexid = '$j';";
			$array = query($sql);
			if($i < $allSize){
				$arr[] = $array;
			}
		}  
		//返回数据  
		$result = array(  
		    'data' => $arr, //数据源  
		    'countPage' => ceil($allSize / $limit) //总分页  
		);  
		echo json_encode($result);
	}else{
		echo '{"state": false, "msg": "没有找到任何数据"}';
	}  
?>