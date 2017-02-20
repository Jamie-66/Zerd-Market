<?php
	include "DBHelper.php";

	$id = $_POST["id"];
	$sql_con = "select * from evaluate where id = $id";
	$array_con = query($sql_con);
	$size_con = count($array_con);
	if($size_con == "0"){
		echo '{"state": false, "msg": "没有评论内容"}';
	}else{
		echo '[';
		for($i = 0; $i < $size_con; $i ++){
			echo '{';
			foreach ($array_con[$i] as $key => $value) {
				echo '"'. $key .'":"'. $value .'",';
			}
			echo '},';
		}
	}
?>