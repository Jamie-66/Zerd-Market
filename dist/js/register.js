
var logo_val = null;

var App = angular.module('App',['commonApp']);
App.controller('Controller',['$scope','$http',function($scope,$http){
	$scope.status = false;
	
	$scope.codeClick = function(){
		$('.addon1>span').text(checkCode());
	};
	$scope.upload = function(){
		$('.crop').css('left','0');
	};
	$scope.close = function(){
		$('.crop').css('left','100%');
	}
	$scope.submit = function(){
		clearTimeout(timer);
		$scope.number = $('.addon1>span').text();
		if(!$scope.account){
			$('.msg').text('用户名不能为空');
		}else if(!(/^[1-3]\d{10}$/.test($scope.phone))){
			$('.msg').text('手机号格式不正确');
		}else if(!(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test($scope.email))){
			$('.msg').text('邮箱格式不正确');
		}else if(!(/[a-z0-9_\.-]+/.test($scope.number))){
			$('.msg').text('请先获取验证码');
		}else if (!$scope.code) {
			$('.msg').text('验证码不能为空');
		}else if($scope.code != $scope.number){
			$('.msg').text('验证码不正确');
		}else if(!$scope.password || !$scope.repassword){
			$('.msg').text('密码不能为空');
		}else if($scope.password != $scope.repassword){
			$('.msg').text('密码不一致');
		}else{
			var d = new Date();
			var _registerTime = d.toLocaleDateString() + d.toLocaleTimeString();
			var _level = "普通会员";
			$http.post('register.php', {account: $scope.account, password: $scope.password, phone: $scope.phone, email: $scope.email, logo: logo_val, level: _level, registerTime: _registerTime}).success(function(response){
				$('.msg').text(response.message);
				if(response.state){
					$scope.status = true;
				}
			});
		}
		$('.msg').css({'left': '50%','margin-left': '-75px'});
		var timer = setTimeout(function(){
			$('.msg').css({'left': 0,'margin-left': '-150px'});
			if($scope.status){
				window.location.href = 'login.html';
			}
		},2500);
	}
}])

$(function(){
	//头像配置
	var $uploadCrop;
	function readFile(input) {
			if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
            	$uploadCrop.croppie('bind', {
            		url: e.target.result
            	});
            	$('.upload-demo').addClass('ready');
                // $('#blah').attr('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
        }
        else {
	        alert("Sorry - you're browser doesn't support the FileReader API");
	    }
	}

	$uploadCrop = $('#upload-demo').croppie({
		viewport: {
			width: 170,
			height: 170,
			type: 'circle'
		},
		boundary: {
			width: 220,
			height: 220
		}
	});

	$('#upload').on('change', function () { 
		$(".crop").show();
		readFile(this); 
	});
	$('.upload-result').on('click', function (ev) {
		$uploadCrop.croppie('result', 'canvas').then(function (resp) {
			popupResult({
				src: resp
			});
		});
	});
		
	function popupResult(result) {
		var html;
		if (result.html) {
			html = result.html;
		}
		if (result.src) {
			// html = '<img src="' + result.src + '" />';
			$('.file-btn').css('background-image','url("'+ result.src +'")');
			logo_val = result.src;
		}
		// $("#result").html(html);
	}
})