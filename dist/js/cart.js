
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
//单选
App.directive('oneCheck',function(){
    return function(scope, element, attr){
        element.click(function(){
        	$(element).toggleClass('fa-check-circle');
        	$(element).toggleClass('fa-circle-o');
            var self = this;
            angular.forEach(scope.cartList,function(data,index,array){
                if(attr.items == data.indexid){
                    var isCheck = $(self).attr('check');
                    if(isCheck == "false"){
                    	$(self).attr('check','true');
                    }else{
                    	$(self).attr('check','false');
                    }
                    data.Bol = isCheck;
                    scope.allPrices();
                    scope.$apply();
                }
            })
        });
    }
})
//全选，全不选
App.directive('allOrcan',function(){
    return function(scope, element, attr){
        element.click(function(){
        	$(element).find('i').toggleClass('fa-check-circle');
        	$(element).find('i').toggleClass('fa-circle-o');
            var isCheck = $(this).find('i').attr('check');
            if(isCheck == "false"){
                $('i.select').attr('check',"true");
                $('i.select').addClass('fa-circle-o');
                $('i.select').removeClass('fa-check-circle');
            }else{
                $('i.select').attr('check',"false");
                $('i.select').removeClass('fa-circle-o');
                $('i.select').addClass('fa-check-circle');
            }
            angular.forEach(scope.cartList,function(data,index,array){
                data.Bol = isCheck;
            })
            scope.allPrices();
            scope.$apply();
        })
    }
})
//购物车  加
App.directive('myAdds',function(){
    return {
        link: function(scope, element, attr){
            element.click(function(){
                var self = this;
                angular.forEach(scope.cartList,function(data,index,array){
                    if(attr.items == data.indexid){
                    	if(data.count < parseInt(data.inventory)){
                    		data.count = parseInt(data.count) +1;
	                        scope.allPrices();
	                        scope.$apply() //刷新视图
	                        //修改后台
	                        $.post(common.baseUrl + 'cart_modify.php',{id: data.id, status: 'plus'}).success(function(response){
	                        	console.log(response)
	                        })
                    	}else{
                    		$.alert("已达库存上限","温馨提示")
                    	}
                    }
                });
            });
        } 
    }
})
//购物车  减
App.directive('myMinus',function(){
    return {
        link: function(scope, element, attr){
            element.click(function(){
                var self = this;
                angular.forEach(scope.cartList,function(data,index,array){
                    if(attr.items == data.indexid){
                        if(parseInt(data.count) > 1){
                            data.count = parseInt(data.count) -1;
                            //修改后台
	                        $.post(common.baseUrl + 'cart_modify.php',{id: data.id, status: 'minus'}).success(function(response){
	                        	console.log(response)
	                        })
                        }
                        scope.allPrices();
                        scope.$apply();
                    }
                });
            });
        } 
    }
})
//删除
App.directive('delClick',function(){
    return function(scope, element, attr){
        element.click(function(){
            $.confirm("确定删除商品?","温馨提示");
            $('.btn-default').click(function(evt){
                if($(evt.target).text() == "确定"){
                    angular.forEach(scope.cartList,function(data,index,array){
                        if(attr.items == data.indexid){
                            data.Bol = "false"
                            //修改后台
                            $.post(common.baseUrl + 'cart_del.php',{id: data.id}).success(function(response){
                                $.alert(JSON.parse(response).msg,"删除提示");
                                $(element).parents('.pro-group').remove();
                            })
                            scope.allPrices();
                            scope.$apply();
                        }
                    })
                }
            })      
        })
    }
})

var Controller = App.controller('Controller',['$scope','$http',function($scope,$http){
	$scope.url = common.imgUrl;
    //初始化
	$scope.currentPage = 0;  
    // 总页数  
    $scope.totalPages = 1;  
    // 防止重复加载  
    $scope.busy = false;  
    // 存放数据  
    $scope.cartList = [];  
    // 请求数据方法  
    $scope.loadMore = function() {  
        if ($scope.currentPage < $scope.totalPages) {  
            $scope.currentPage++;   
            if ($scope.busy) {   
                return false;   
            }   
            $scope.busy = true;  
            // 请求后台服务器  
            $http.post('cart.php',{page: $scope.currentPage})  
            .success(function(data) { 
                $scope.busy = false;
                if(data.state == "nologin"){
                	$('<div class="empty"><a href="login.html">'+ data.msg +'</a></div>').appendTo($('.shopcart-list'));
                }else if(data.state == false){
                	$('<div class="empty">'+ data.msg +'</div>').appendTo($('.shopcart-list'));
                }else{
                	//组织数据  
	                for (var i in data.data) {   
	                    $scope.cartList.push(data.data[i]);  
	                }   
	                $scope.totalPages = data.countPage; 
                }   
            });  
        }  
    };  
    // 默认第一次加载数据  
    $scope.loadMore(); 
	//生成订单
	$scope.addToOrder = function(){
		var arr = [];
        var hist = {};
        var msgArr = [];
		angular.forEach($scope.cartList, function(data,index,array){
            if(data.Bol == "true"){
                arr.push(data);
            }
        })
        if(arr.length > 0){
            arr.map(function (a){
                if (a.store_id in hist){
                    if(hist[a.store_id][0]){
                        hist[a.store_id][hist[a.store_id].length] = a;
                    }else{
                        hist[a.store_id] = [a];
                    }
                }else{
                    hist[a.store_id] = [a]; 
                }
            });
            angular.forEach(hist, function(data,index,array){
                msgArr.push(data);
            });
            // console.log(msgArr)
        	localStorage.setItem('orderMsg', JSON.stringify(msgArr));
        	window.location.href = "order_detail.html";
        }
	};
	//总价格的计算
    $scope.allPrices = function(){
        $scope.allprice = 0;
        angular.forEach($scope.cartList, function(data,index,array){
            data.totalprice = data.count * data.price;
            if(data.Bol == "true"){
                $scope.allprice += parseInt(data.totalprice);
            }
        })
        return $scope.allprice;
    };
	//支付方式
	$scope.payClick = function(event){
		$('.pay-mask').removeClass('item-hidden');
		$('.payfor').removeClass('item-hidden');
		$('.pay-mask').click(function(){
			$(this).addClass('item-hidden');
			$('.payfor').addClass('item-hidden');
		})
		$('.pay-item').click(function(_event){
			$('.payfor').addClass('item-hidden');
			$('.pay-mask').addClass('item-hidden');
			$('.payforway').text($(_event.target).text());
		})
	};
}]);