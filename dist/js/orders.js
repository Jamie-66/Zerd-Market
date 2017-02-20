
var mainapp = angular.module('mainapp',['commonApp']);

//定义滚动指令 
mainapp.directive('whenScrolled', function() {  
    return function(scope, elm, attr) { 
        //body窗口的滚动加载--需要Jquery 
        $(window).scroll(function () { 
            //滚动条距离顶部的距离  
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
	if (str == '') {
		$scope.state = 0;
	}else{
		$scope.state = str.split('=')[1];
	}

    $scope.url = common.imgUrl;
	//初始化
	$scope.currentPage = 0;  
    // 总页数  
    $scope.totalPages = 1;  
    // 防止重复加载  
    $scope.busy = false;  
    // 存放数据  
    $scope.orderItems = [];  
    // 请求数据方法  
    $scope.loadMore = function() {  
        if ($scope.currentPage < $scope.totalPages) {  
            $scope.currentPage++;   
            if ($scope.busy) {   
                return false;   
            }   
            $scope.busy = true;  
            
            $http.post('orders.php',{state: $scope.state, page: $scope.currentPage})  
            .success(function(data) { 
                $scope.busy = false;
                if(data.state == "nologin"){
					$('<div class="empty"><a href="login.html">'+ data.msg +'</a></div>').appendTo($('.main-body'));
				}else if(data.state == false){
					$('<div class="empty">'+ data.msg +'</div>').appendTo($('.main-body'));
				}else{
					//组织数据  
	                for (var i in data.data) {   
	                    $scope.orderItems.push(data.data[i]);  
	                }   
	                $scope.totalPages = data.countPage; 
				}  
            });  
        }  
    };  
    // 默认第一次加载数据  
    $scope.loadMore(); 

	//删除订单
	$scope.orderDel = function(storeid, evt){
		$http.post('order_del.php',{store_id: storeid}).success(function(response){
			$.alert(response.msg,"订单提示");
            $(evt.target).parents('.order-item').remove();
		})
	};
	//订单状态
	$scope.statement = function(_state){
		switch (_state) {
			case '1': return "待付款";
				break;
			case '2': return "待发货";
				break;
			case '3': return "待收货";
				break;
			case '4': return "交易成功";
				break;
		}
	};
}]);

//相同店铺订单计算数量
mainapp.filter('addCount',function(){
    return function(obj){
    	var count = 0;
        for(var i=0; i<obj.length; i++){
            count += (obj[i].count * 1);
        }
        return count;
    }
})

//相同店铺订单计算总价
mainapp.filter('addPrice',function(){
    return function(obj){
    	var total = 0;
        for(var i=0; i<obj.length; i++){
            total += (obj[i].price * obj[i].count * 1);
        }
        return total;
    }
})