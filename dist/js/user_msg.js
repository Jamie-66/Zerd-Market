var App = angular.module('App',['commonApp']);
App.controller('Controller',['$scope', '$http',function($scope, $http){
	$http.get('getuserid.php').success(function(response){
		if (response.state != false) {
			$scope.userInfo = response.data[0];
        	if($scope.userInfo.logo != 'null' && $scope.userInfo.logo != ''){
        		$scope.logo = $scope.userInfo.logo;
        	}else{
        		$scope.logo = common.imgUrl + "logo.jpg";
        	}
		}
	})
}]);