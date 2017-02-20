//字母数字组合验证码（四位） (如: 4YT8)
//ACSII码
//0-9  
//A-Z  65-90
//a-z  97-122

function checkCode(){
	var arr = [];
	for(i=0; i<4; i++){
		var num1 = parseInt(Math.random()*2);   //生成0,1 选择生成字母还是数字
		if(num1){
			arr[arr.length] = numCreat();
		}else{
			arr[arr.length] = alpCreat();
		}
	}
	var newArr = arr.join("");
	return newArr;
}

function numCreat(){   //生成任意数字
	var num = parseInt(Math.random()*10);
	return num;
}

function alpCreat(){   //生成任意大写字母
	var alp = parseInt(Math.random()*26)+65;
	var str = String.fromCharCode(alp);
	return str;
}