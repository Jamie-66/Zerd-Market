
//angular
var App = angular.module('App',['commonApp']);
var Controller = App.controller('Controller',['$scope','$http',function($scope,$http){
	$scope.pro_item = null;
	$scope.count = 1;
	$scope.flag = 0;
	var _id = window.location.search.split('=')[1];
	$scope.url = common.imgUrl;
	
	//购物车商品数量
	$http.get('list_getCartNum.php').success(function(response){
		if(response > 0){
			$scope.num = response;
		}else{
			$('span','.cart-bar').addClass('item-hidden');
		}
	})
	//商品详情
	$http.post('list_detail.php',{id:_id}).success(function(response){
		var str = response.replace(/,},/gi,'}');
		$scope.pro_item = JSON.parse(str);
	});
	//商品评论
	$http.post('list_evaluate.php',{id:_id}).success(function(_response){
		if (typeof _response == "object"){
			$('.pro-comment').text(_response.msg);
			$('.pro-comment').css({"text-align":"center", "padding-top":"20px"});
			$('.main-body').css({"background":"#fff","position": "absolute"});
		}else{
			var str = _response.slice(0, _response.length-1).replace(/,}/gi,'}') + "]";
			$scope.contents = (JSON.parse(str));
		}
	});
	//加入购物车
	$scope.addToCart = function(){
		$scope.flag = 0;
		$('.shop_controll').css("bottom","46px");
	};
	//生成订单
	$scope.addToOrders = function(){
		$scope.flag = 1;
		$('.shop_controll').css("bottom","46px");
	};
	//减
	$scope.minusClick = function(){
		$scope.count--;
		if($scope.count < 1){
			$scope.count = 1;
		}
	};
	//加
	$scope.plusClick = function(){
		$scope.count++;
		if($scope.count > $scope.pro_item.inventory){
			$scope.count = $scope.pro_item.inventory;
		}
	};
	//取消加入购物车
	$scope.missClick = function(){
		$('.shop_controll').css("bottom","-64px");
		$scope.count = 1;
	};
	//修改数量，确定加入购物车、订单
	$scope.sureClick = function(){
		if($scope.flag){
			var obj = [[{
				id: $scope.pro_item.id,
				store_id: $scope.pro_item.store_id, 
				item_img: $scope.pro_item.main_img,
				price: $scope.pro_item.price,
				title: $scope.pro_item.title,
				count: $scope.count
			}]];
			$http.get('getuserid.php').success(function(response){
				obj[0][0].account = response.data[0].account
			});
			console.log(obj)
			var strmsg = JSON.stringify(obj);
			localStorage.setItem("orderMsg",strmsg);
			window.location.href = "order_detail.html";
		}else{
			$http.post('list_cart.php',{
				id: $scope.pro_item.id,
				store_id: $scope.pro_item.store_id, 
				inventory: $scope.pro_item.inventory,
				main_img: $scope.pro_item.main_img,
				price: $scope.pro_item.price,
				title: $scope.pro_item.title,
				count: $scope.count
			}).success(function(response){
				$('.shop_controll').css("bottom","-64px");
				$scope.count = 1;
				if(response.state){
					$scope.num = response.num;
				}
				$.alert(response.message,"购物车提示");
			});
		}
			
	};
}]);

App.filter('range', function () {
    return function (array, range) {
        for (var i = 1 ; i <= range; i++) {
            array.push(i);
        }
        return array;
    }
})

$(function(){
	//轮播
	TouchSlide({ 
		slideCell:"#focus",
		titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
		mainCell:".bd ul", 
		effect:"left", 
		autoPlay:true,//自动播放
		autoPage:true, //自动分页
		switchLoad:"_src" //切换加载，真实图片路径为"_src" 
	});
	
	//详情、评论切换
	$('.search-bar>div>a').click(function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		$('.item').addClass('item-hidden');
		$('.item').eq($(this).index()).removeClass('item-hidden');
	});
})