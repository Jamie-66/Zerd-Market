<?php
	include "DBHelper.php";

	//前端页数  
	$page = $_POST['page'];  
	$limit = 4;  
	$start = ($page - 1) * $limit;  
	$end = $page * $limit;  
	
	session_start();
	if(isset($_SESSION["userId"])){
		$state = $_POST['state'];
		if($state == 0){
			$id_sql = "select distinct store_id from order_list where account = '". $_SESSION["userId"]."';";
		}else{
			$id_sql = "select distinct store_id from order_list where state='$state' and account = '". $_SESSION["userId"]."';";
		}
		$id_array = query($id_sql);
		$id_size = count($id_array);

		if($id_size > 0){
			$allarr = array();
			for($i = $start; $i < $end; $i ++){
				if($i < $id_size){
					foreach ($id_array[$i] as $key => $value) {
						if($state == 0){
							$sql = "select * from order_list where store_id = '$value' and account = '". $_SESSION["userId"]."';";
						}else{
							$sql = "select * from order_list where state='$state' and  store_id = '$value' and account = '". $_SESSION["userId"]."';";
						}
						$array = query($sql);
						$size = count($array);
						$arr = array();

						for($j = 0; $j < $size; $j ++){
							//组织数据 
							if($j < $size){
								$arr[] = $array[$j];
							} 
						}
						//返回数据  
						$allarr[] = $arr;
					}
				}	
			}
			$result = array(  
			    'data' => $allarr, //数据源  
			    'countPage' => ceil($id_size / $limit) //总分页  
			);
			echo json_encode($result);
		}else{
			if($state == 0){
				echo '{"state": false, "msg": "没有订单"}';
			}else if($state == 1){
				echo '{"state": false, "msg": "没有待付款的订单"}';
			}else if($state == 2){
				echo '{"state": false, "msg": "没有待发货的订单"}';
			}else if($state == 3){
				echo '{"state": false, "msg": "没有待收货的订单"}';
			}else{
				echo '{"state": false, "msg": "没有待评价的订单"}';
			}
		}	
	}else{
		echo '{"state": "nologin", "msg": "亲，请先点击登录"}';
	}
?>