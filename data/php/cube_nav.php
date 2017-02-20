<?php
	include "DBHelper.php";

	$sql = "select * from cube_nav where 1";
	$array = query($sql);
	$size = count($array);
	if($size > 0){
		echo '[';
		for($i = 0; $i < $size; $i ++){
			echo '{';
			foreach ($array[$i] as $key => $value) {
				echo '"'. $key .'":"'. $value .'",';
			}
			echo '},';
		}
	}else{
		echo '{"state": false, "msg": "导航栏空空如也"}';
	}	
?>