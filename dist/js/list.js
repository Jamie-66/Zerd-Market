
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
var Controller = App.controller('Controller',['$scope','$http',function($scope,$http){
    $scope.url = common.imgUrl;
    $scope.currentPage = 0;  
    // 总页数  
    $scope.totalPages = 1;  
    // 防止重复加载  
    $scope.busy = false;  
    // 存放数据  
    $scope.products = [];  
    // 请求数据方法  
    $scope.loadMore = function() {  
        if ($scope.currentPage < $scope.totalPages) {  
            $scope.currentPage++;   
            if ($scope.busy) {   
                return false;   
            }   
            $scope.busy = true;  
            // 请求后台服务器  
            $http.post('list.php',{page: $scope.currentPage})  
            .success(function(data) {  
                $scope.busy = false; 
                if(data.state == "false"){
                    console.log(data.msg)
                }else{
                    //组织数据  
                    for (var i in data.data) {
                        //价格转换成number便于排序
                        console.log(i)
                        data.data[i].price = data.data[i].price *1;
                        $scope.products.push(data.data[i]); 
                    }   
                    $scope.totalPages = data.countPage;  
                }   
            });  
        }  
    };  
    // 默认第一次加载数据  
    $scope.loadMore();
    $scope.orderstate = false;
    // $http.get('list.php').success(function(response){
    //     if(response.state == false){
    //         console.log(response.msg)
    //     }else{
    //         $scope.products = response.data;
    //     }
            
    // });
}]);

$(function(){
	var obj = {
   		click: null
    };

    //二级菜单
    $('.category').click(function(evt){
   		if ($(evt.target).is('div')) {
   			if(!obj.click){
   				$('.'+$(evt.target).attr('click')).removeClass('item-hidden');
   				$(evt.target).addClass('active');
   				$(evt.target).find('i').toggleClass('fa-caret-down');
   				$(evt.target).find('i').toggleClass('fa-caret-up');
   			}else if(obj.click != $(evt.target).attr('click')){
				$.each($('[click]',$(evt.target).parent()),function(index,ele){
	   				$('.' + $(ele).attr('click')).addClass('item-hidden');
	   			});
	   			$('.'+$(evt.target).attr('click')).removeClass('item-hidden');
	   			$(evt.target).siblings().removeClass('active');
	   			$(evt.target).addClass('active');
	   			$(evt.target).siblings().find('i').removeClass('fa-caret-up');
	   			$(evt.target).siblings().find('i').addClass('fa-caret-down');
	   			$(evt.target).find('i').removeClass('fa-caret-down');
	   			$(evt.target).find('i').addClass('fa-caret-up');
   			}else{
   				$('.'+$(evt.target).attr('click')).toggleClass('item-hidden');
   				$(evt.target).toggleClass('active');
   				$(evt.target).find('i').toggleClass('fa-caret-down');
   				$(evt.target).find('i').toggleClass('fa-caret-up');
   			}
   			obj.click = $(evt.target).attr('click');
   		}
    })
	
	$('.level1').click(function(evt){
        if($(evt.target).is('a')){
            $(evt.target).parent().siblings().removeClass('active');
            $(evt.target).parent().addClass('active');
        }
    })

});

