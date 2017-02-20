<?php
	include "DBHelper.php";

	$id = $_POST['state'];
	$keyWord = $_POST['keyWord'];
	//前端页数  
	$page = $_POST['page'];  
	$limit = 8;  
	$start = ($page - 1) * $limit;  
	$end = $page * $limit; 

	if($id == 1){
		$allSql = "select * from product_item where store_id like '%$keyWord%';";
	}else if($id == 2){
		$allSql = "select * from product_item where title like '%$keyWord%';";
	}else{
		$allSql = "select * from product_item where id like '%$keyWord%';";
	}

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
		echo '{"state": false, "msg": "没有找到任何数据"}';
	}  
	//搜索记录
	// $checkSql = "select keyword from history_list where keyword = '$keyWord';";
	// $historySql = "insert into history_list(keyword) values('$keyWord');";

	// $checkArray = query($checkSql);
	// $checkSize = count($checkArray);
	// if($checkSize <= 0){
	// 	excute($historySql);
	// }

	//搜索
	// if($id == 1){
	// 	$sql = "select * from product_item where store_id like '%$keyWord%';";
	// }else if($id == 2){
	// 	$sql = "select * from product_item where title like '%$keyWord%';";
	// }else{
	// 	$sql = "select * from product_item where id like '%$keyWord%';";
	// }
	// $array = query($sql);
	// $size = count($array);
	// if($size > 0){ 
	// 	//返回数据  
	// 	$result = array(  
	// 	    'data' => $array
	// 	);  
	// 	echo json_encode($result);
	// }else{
	// 	echo '{"state": false, "msg": "没有找到任何数据"}';
	// }	
?>