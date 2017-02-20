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
});

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
            if(scrollTop > 500){
                $('.scroll_top').removeClass('item-hidden');
            }else{
                $('.scroll_top').addClass('item-hidden');
            } 
        });  
    };  
});
App.controller('Controller',['$scope','$http',function($scope, $http){
    $scope.url = common.imgUrl;
	$scope.currentPage = 0;  
    // 总页数  
    $scope.totalPages = 1;  
    // 防止重复加载  
    $scope.busy = false;  
    // 存放数据  
    $scope.Source = [];  
    // 请求数据方法  
    $scope.loadMore = function() {  
        if ($scope.currentPage < $scope.totalPages) {  
            $scope.currentPage++;   
            if ($scope.busy) {   
                return false;   
            }   
            $scope.busy = true;  
            // 请求后台服务器  
            $http.post('index.php',{page: $scope.currentPage})  
            .success(function(data) {  
                $scope.busy = false; 
                if(data.state == "false"){
                	console.log(data.msg)
                }else{
                	//组织数据  
	                for (var i in data.data) {   
	                    $scope.Source.push(data.data[i]);  
	                }   
	                $scope.totalPages = data.countPage;  
                }   
            });  
        }  
    };  
    // 默认第一次加载数据  
    $scope.loadMore(); 

    $scope.close = function(){
        $('.search-content').css('left','100%');
    };
    $('.search-key').click(function(evt){
    	$(this).toggleClass('item-hidden');
    });

    $('.search-id>i').on('click',function(evt){
		$('.' + $(evt.target).attr('click')).toggleClass('item-hidden');
	});

    $('.search-key li').click(function(){
    	$('.search-id>i')[0].setAttribute("class",$(this).find('i')[0].className);
    	$scope.state = $(this).attr('state');
    });

    //搜索
    $scope.Search = function(){
    	var history_str = localStorage.getItem('history');
    	var array = [];
    	var flag = true;
        var obj = {};
    	if($scope.keyWord && $scope.state){
            obj = { state: $scope.state, keyword: $scope.keyWord};
    		if(!history_str){
	    		array.push(obj);
	    		localStorage.setItem('history',JSON.stringify(array));
	    	}else{
	    		array = JSON.parse(history_str);
	    		for(var i=0; i<array.length; i++){
	    			if(array[i] == $scope.keyWord){
	    				flag = false;
	    			}
	    		}
	    		if(flag){
	    			array.push(obj);
		    		localStorage.setItem('history',JSON.stringify(array));
	    		}	
	    	}
	    	window.location.href = "search_result.html?state="+ $scope.state +"&keyword="+ $scope.keyWord;
    	}
    };

    //搜索记录
    $scope.gethistory = function(){
        $('.search-content').css('left',0);
    	var strs = localStorage.getItem('history');
	    if(strs){
	    	$('.search-history').removeClass('item-hidden');
	    	$scope.History = JSON.parse(strs);
	    }else{
	    	$('.search-history').addClass('item-hidden');
	    }
    };

    //清除搜索记录
    $scope.cleanHistory = function(){
    	$('.search-history').remove();
    	$.alert("删除记录成功","删除提示")
    	localStorage.setItem('history','');
    };

    //点击搜索记录搜索
    $scope.searchAgain = function(_keyword, _state){
        window.location.href = "search_result.html?state="+ _state +"&keyword="+ _keyword;
    };

    //回到顶部
    $scope.backToTop = function(){
        $("html,body").animate({scrollTop:0},300);
    };
    //品牌滚动栏
    $scope.brands = function(){
        var _width = parseInt($('#scroller>ul>li').css('width'));
        var arr = [];
        for(var i=0; i<10; i++){
            arr.push(i+1);
        }
        $('#scroller').css({'width': arr.length * _width + 'px'});
        return arr;
    };
}]);