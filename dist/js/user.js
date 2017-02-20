
var App = angular.module('App',['commonApp']);
App.controller('Controller',['$scope', '$http',function($scope, $http){
	$http.get('getuserid.php').success(function(response){
		if (response.state == false) {
			var html = "<a href='login.html'>登录</a><a href='register.html'>新用户注册</a><span><i class='fa fa-angle-right'></i></span>";
			$(html).appendTo('.signUp');
			$('.signUp').removeClass('item-hidden');
			$('.user-head').addClass('item-hidden');
			$('a>div:first-child','.user-money').text(0);
			$('a>.item-count','.user-menu').addClass('item-hidden');
			$('.signOut').addClass('item-hidden');
			$('.userinfo').addClass('item-hidden');
			// $.alert(response.message, "用户提示");
		}else{
        	$scope.userInfo = response.data[0];
        	if($scope.userInfo.logo != 'null' && $scope.userInfo.logo != ''){
        		$scope.logo = $scope.userInfo.logo;
        	}else{
        		$scope.logo = "dist/images/logo.jpg";
        	}
		}
	})
	$scope.signOut = function(){
		$http.get('logout.php').success(function(response){
			window.location.reload();
		})
	}
}])