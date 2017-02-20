
var App = angular.module('App',['commonApp']);

App.controller('Controller',['$scope','$http',function($scope, $http){
	$scope.provine = "选择省";
	$scope.city = "选择市";
	$scope.area = "选择区/县";
	$scope.submit = function(){
		if (!$scope.nickname || !$scope.phonenum || !$scope.provine || !$scope.city || !$scope.area || !$scope.address) {
			$.alert("请先完善信息","信息提示");
		}else{
			// $http.post('userinfo.php',{
			// 	nickname: $scope.nickname, 
			// 	phonenum: $scope.phonenum,
			// 	provine: $scope.provine, 
			// 	city: $scope.city, 
			// 	area: $scope.area, 
			// 	address: $scope.address
			// }).success(function(response){
			// 	if(response.state){
			// 		$.alert(response.message,"温馨提示")
			// 		$('.btn-default').click(function(){
			// 			window.location.href = "user.html";
			// 		})
			// 	}else{
			// 		$.alert(response.message,"温馨提示");
			// 	}
			// })
		}
	};	
}])