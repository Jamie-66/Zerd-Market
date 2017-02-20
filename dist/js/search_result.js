
var mainapp = angular.module('mainapp',['commonApp']);

//定义滚动指令 
mainapp.directive('whenScrolled', function() {  
    return function(scope, elm, attr) { 
        //body窗口的滚动加载--需要Jquery
        $(window).scroll(function () { 
            //滚动条距离顶部的距离 
            console.log($(window).scrollTop())
            var scrollTop = $(window).scrollTop();  
            //滚动条的高度  
            var scrollHeight = $(document).height();  
            //窗口的高度  
            var windowHeight = $(window).height();
            if (scrollTop + windowHeight >= scrollHeight) {  
                scope.$apply(attr.whenScrolled);  
            }  
        });  
    };  
});

mainapp.controller('maincontroller',['$scope','$http',function($scope, $http){
	var str = window.location.search;
	var array = str.split('&');
	var word = [];
	for (var i = 0; i < array.length; i++) {
		word.push(array[i].split('=')[1]);
	};
	
    $scope.url = common.imgUrl;
	$scope.currentPage = 0;  
    // 总页数  
    $scope.totalPages = 1;  
    // 防止重复加载  
    $scope.busy = false;  
    // 存放数据  
    $scope.results = [];  
    // 请求数据方法  
    $scope.loadMore = function() {  
        if ($scope.currentPage < $scope.totalPages) {  
            $scope.currentPage++;   
            if ($scope.busy) {   
                return false;   
            }   
            $scope.busy = true;  
            // 请求后台服务器  
            $http.post('search_result.php',{page: $scope.currentPage, state: word[0], keyWord: decodeURIComponent(word[1])})  
            .success(function(data) { 
                $scope.busy = false; 
                if(data.state == false){
                	$('<div class="empty">'+ data.msg +'</div>').appendTo($('.main-body'));
                }else{
                	//组织数据  
	                for (var i in data.data) {   
	                    $scope.results.push(data.data[i]);
	                }   
	                $scope.totalPages = data.countPage;  
                }   
            });  
        }  
    };  
    // 默认第一次加载数据  
    $scope.loadMore(); 
}])