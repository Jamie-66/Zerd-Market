
var App = angular.module('App',['commonApp']);
App.controller('Controller',['$scope', '$http',function($scope, $http){
	$http.get('cube_nav.php').success(function(response){
		if(typeof response == "object"){
			$.alert(response.msg)
		}else{
			var str = response.slice(0, response.length-1).replace(/,}/gi,'}') + "]";
			$scope.cubeNav = (JSON.parse(str));
		}
	})
}])

$(function(){
	$('.cube-left>:first-child').addClass('active');
	$('.cube-left').click(function(evt){
		if($(evt.target).is('div')){
			$(evt.target).siblings().removeClass('active');
			$(evt.target).addClass('active');
		}
	})
})