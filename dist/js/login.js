
var App = angular.module('App',['commonApp']);
App.controller('Controller',['$scope', '$http',function($scope, $http){
	$scope.status = false;

	$scope.submit = function(){
		clearTimeout(timer);	
		if(!$scope.name){
			$('.msg').text('用户名不能为空');
		}else if(!$scope.password) {
			$('.msg').text('密码不能为空');
		}else{
			var d = new Date();
			var _lastLoginTime = d.toLocaleDateString() + d.toLocaleTimeString();
			$http.post('login.php', {name: $scope.name, password: $scope.password, lastLoginTime: _lastLoginTime}).success(function(response){
				$('.msg').text(response.message);
				if(response.state){
					$scope.status = true;
				}
			})
		}
		$('.msg').css({'left': '50%','margin-left': '-50px'});
		var timer = setTimeout(function(){
			$('.msg').css({'left': 0,'margin-left': '-100px'});
			if($scope.status){
				window.location.href = 'user.html';
			}
		},2500);
	}
}])
