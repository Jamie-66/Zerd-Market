<?php
	include "DBHelper.php";

	$id = $_POST["id"];
	$sql_id = "select * from product_item where id = $id";
	$array_id = query($sql_id);
	$size_id = count($array_id);
	for($i = 0; $i < $size_id; $i ++){
		echo '{';
		foreach ($array_id[$i] as $key => $value) {
			echo '"'. $key .'":"'. $value .'",';
		}
		echo '},';
	}
?>