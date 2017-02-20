
var App = angular.module('App',['commonApp']);

//定义滚动指令 
App.directive('whenScrolled', function() {  
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

App.service('addressMange',['$http',function($http){
	this.del = function(event, scope){
		$.confirm("确定删除地址？","温馨提示");
		$('.btn.btn-default').click(function(evt){
			if($(evt.target).text() == "确定"){
				$http.post('address_del.php',{
					account: scope.account, 
					addressid: $(event.target).attr('items')
				}).success(function(response){
					if(response.state){
						$(event.target).parents('.address').remove();
					}
				})
			}
		})
	};
	this.setDefault = function(event, scope){
		if($(event.target).is('input')){
			if($(event.target).attr('checked')){
				scope.state = false;
				$(event.target).attr('checked',false);
			}else{
				scope.state = true;
				$('input','.address').not(event.target).attr('checked',false);
				$(event.target).attr('checked',true);
			}
			$http.post('address_modify.php',{
				account: scope.account,
				addressid: $(event.target).attr('items'),
				state: scope.state
			}).success(function(response){
				console.log(response)
				
			})
		}
	};
}])

App.controller('Controller',['$scope','$http','addressMange',function($scope, $http, addressMange){
	$scope.provine = "选择省";
	$scope.city = "选择市";
	$scope.area = "选择区/县";
	// $scope.defaultstate = "设为默认";
	$scope.account = window.location.search.split("=")[1];

	//初始化
	$scope.currentPage = 0;  
    // 总页数  
    $scope.totalPages = 1;  
    // 防止重复加载  
    $scope.busy = false;  
    // 存放数据  
    $scope.address = [];  
    // 请求数据方法  
    $scope.loadMore = function() { 
        if ($scope.currentPage < $scope.totalPages) {  
            $scope.currentPage++;   
            if ($scope.busy) {   
                return false;   
            }   
            $scope.busy = true;  
            // 请求后台服务器  
            $http.post('address.php',{account: $scope.account, page: $scope.currentPage})  
            .success(function(data) { 
                $scope.busy = false;
                if(data.state == false){
                	$('<div class="empty">'+ data.msg +'</div>').appendTo($('#scroller'));
                }else{
                	//组织数据  
	                for (var i in data.data) {   
	                    $scope.address.push(data.data[i]);  
	                }   
	                $scope.totalPages = data.countPage; 
                }   
            });  
        }  
    };  
    // 默认第一次加载数据  
    $scope.loadMore(); 

	$scope.submit = function(){
		if (!$scope.nickname || !$scope.phonenum || !$scope.provine || !$scope.city || !$scope.area || !$scope.address) {
			$.alert("请先完善信息","信息提示");
		}else{
			$http.post('userinfo.php',{
				nickname: $scope.nickname, 
				phonenum: $scope.phonenum,
				provine: $scope.provine, 
				city: $scope.city, 
				area: $scope.area, 
				address: $scope.address
			}).success(function(response){
				if(response.state){
					$.alert(response.message,"温馨提示");
					$('.btn-default').click(function(){
						window.location.href = "user.html";
					})
				}else{
					$.alert(response.message,"温馨提示");
				}
			})
		}
	};	
	$scope.del = function(event){
		addressMange.del(event, $scope);
	};
	$scope.setDefault = function(event){
		addressMange.setDefault(event, $scope);
	};
}])