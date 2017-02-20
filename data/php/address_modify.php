<?php
	include "DBHelper.php";

	$account = $_POST['account'];
	$addressid = $_POST['addressid'];
	$state = $_POST['state'];

	$sql1 = "update address_list set defaultstate = 'false' where account = '".$account."' and defaultstate = 'true';";
	$sql2 = "update address_list set defaultstate = 'true' where account = '".$account."' and address_id = '".$addressid."';";

	if($state == "true"){
		$result1 = excute($sql1);
		$result2 = excute($sql2);
		if($result1 && $result2){
			echo '{"state": true, "msg": "success to modify !!"}';
		}else{
			echo '{"state": false, "msg": "fail to modify !!"}';
		}
	}else{
		$result1 = excute($sql1);
		if($result1){
			echo '{"state": true, "msg": "success to modify !!"}';
		}else{
			echo '{"state": false, "msg": "fail to modify !!"}';
		}
	}
?>