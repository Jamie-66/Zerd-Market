<?php
	include "DBHelper.php";

	$page = $_POST['page'];
	$size = $_POST['size'];
	$pageCount = $page * $size;

	$sql = "select * from product_list where 1 limit $pageCount , $size";
	$array = query($sql);
	$size = count($array);
	if ($size > 0) {
		echo '[';
		for($i = 0; $i < $size; $i ++){
			echo '{';
			foreach ($array[$i] as $key => $value) {
				echo '"'. $key .'":"'. $value .'",';
			}
			if($i == $size-1){
				echo '}]';
			}
			echo '},';
		}
	}else{
		echo '{"state": false, "msg": "没有找到任何数据"}';
	}	
?>