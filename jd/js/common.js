function getPath(){
	var curWwwPath = window.document.location.href;
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	var localhostPaht = curWwwPath.substring(0,pos);
	var projectName = pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	return (localhostPaht + projectName);
}
var isMobile=false;
if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
	isMobile=true;
}
//服务器地址1
var BASEURL =getPath();
//var IMAGEURL = getPath()+"file/img?path=";
var IMAGEURL = getPath()+"upload/";
//基本
var GID="ycbx";
window.alert=function(msg){
	if($.DialogByZ){
		dAlert(msg);
	}else if(typeof (mui)=="function"){
		mui.alert(msg);
	}else{
		alert(msg);
	}
};
function toast(msg){
	$.DialogByZ.Autofade({Content: msg});
}
function confirm(msg,callback){
	$.DialogByZ.Confirm({Title: "提示", Content: msg,BtnL:"确定",FunL:callback,FunR:alerts});
}
function dAlert(msg){
	$.DialogByZ.Alert({Title: "提示", Content: msg,BtnL:"确定",FunL:alerts});
}
function alertF(msg,callback){
	$.DialogByZ.Alert({Title: "提示", Content: msg,BtnL:"确定",FunL:function(){
		alerts(callback);
	}});
}
function alerts(callback){
	$.DialogByZ.Close();
 	if(callback){
 		callback();
 	}
}
function ajaxPost(url, bodyParam, callBack,async) {
	var param = bodyParam;
	if (typeof bodyParam == 'string') {
		param = JSON.parse(bodyParam);
	}
	//p(url);
	 $.ajax({
		  type: "POST",
	      url:url,
	     // contentType:"application/json",
	      data:param,
	      dataType: "json",
	      async:async||true,
	      success: function(ret){
	    	 if (typeof callBack === 'function') {
	  			callBack(ret);
	  		 }
	      }
	 })
}
function toError(obj){
	location.replace(BASEURL+"/h5/error.html?msg="+obj)
}
function toBuyVip(){
	alert("加微信“cxtwg22”回复激活码购买，转账自动发码2.4元30天/6.4元90天");
}
/**
 * 判断是否是微信环境
 */
function isWxClient () {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    }
    return false;
};
/**
 * 判断是否登录
 * @param openid
 * @param callback
 */
var loginCallback=null;
//onum控制页面跳转 url
function checkLogin(params,callBack,tzUrl) {
	loginCallback=callBack||null;
	islogin(params,function(flag,user){
		if(flag){
			if (typeof loginCallback == "function") {
				loginCallback(true,user);
			}else if (tzUrl) {
				location.replace(tzUrl);//登录成功跳转到指定url
			}else{
				//登录成功
			}
		}else{
			loginCallback(false);
		}
	})
}

/**
 * 用户登录
 */
function login(openid,callback) {
	ajaxPost(BASEURL + "html/login_m.do", {id:openid,code:randomNum(2)}, function(ret) {
		p(ret,"login_m");
		if (ret.success) {
			if ( typeof callback == "function") {
				callback(true, ret.obj);
			}
		} else {
			if ( typeof callback == "function") {
				callback(false);
			}
		}
	})
}
/**
 * 判断app用户是否登录
 */
function islogin(params,callback) {
	ajaxPost(BASEURL + "html/checkLogin_m.do", {code:randomNum(2),checkData:params}, function(ret) {
		p(ret,"checkLogin_m");
		if (ret.success) {
			if ( typeof callback == "function") {
				callback(true, ret.obj);
			}
		} else {
			if ( typeof callback == "function") {
				callback(false);
			}
		}
	})
}
//产生随机数函数
function randomNum(n){
    var rnd="";
    for(var i=0;i<n;i++)
        rnd+=Math.floor(Math.random()*10);
    return rnd;
}
/**
 *图片错误
 */
function errImg(obj){
	obj.onerror=null;
	obj.src=BASEURL+'/images/empty_photo.png';
}
function getArg(key){
	var src = location.search;
	var pattern = new RegExp("\\b" + key + "=" + "([^&]*)");
	var matcher = src.match(pattern);
	return matcher == null? null: decodeURIComponent(matcher[1]);
}
function call(phone){
	if(phone){
		window.open("tel:"+phone);
	}else{
		window.open("tel:4008298085");
	}
}
function p(msg,funName){
	if (typeof msg == 'string') {
		if(funName){
			console.log(msg+"||"+funName);
		}else{
			console.log(msg);
		}
	}else{
		if(funName){
			console.log(JSON.stringify(msg)+"||"+funName);
		}else{
			console.log(JSON.stringify(msg));
		}
		
	}
}
function loadMore(loadcallback){
	 $(window).scroll(function(){
		 var srollPos = $(window).scrollTop(); //滚动条距离顶部的高度
		 var windowHeight = $(window).height(); //窗口的高度
		 var bodyHeight=$(document).height();
		 //p(srollPos+","+windowHeight+","+bodyHeight);
		 setTimeout(function(){//滑动到底部
			 if((windowHeight + srollPos+2) >= (bodyHeight)){
				 if(typeof loadcallback =='function'){
					 loadcallback();
				 }
			 }
		 },200);

	});
}
var regExp = {
	isAdult : function(str) {//判断是否已成年
		var s = str;
		if (tit.regExp.isIdcard(s)) {
			var birthday = (new Date(s.slice(6, 10), s.slice(10, 12) - 1, s
					.slice(12, 14))), today = (new Date());
			return (today - birthday > 18 * 365 * 24 * 60 * 60 * 1000);
		} else {
			return false;
		}
	},
	isChinese : function(str) {//判断是否为中文 
		var reg = /^[\u4E00-\u9FFF]+$/;
		return reg.test(str);
	},
	isName : function(str){
		var reg = /^[\u4e00-\u9fa5\·]{2,20}$/;
		return reg.test(str);
	},
	isDate : function(str) {
		var reg = /^\d{4}-\d{1,2}-\d{1,2}$/;
		return reg.test(str);
	},
	isEmail : function(str) {
		// var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
		var reg = /^[A-Za-z0-9]+([._\\-]*[a-z0-9])*[A-Za-z0-9_]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}[a-z0-9]+$/;// 开始必须是一个或者多个单词字符或者是-，加上@，然后又是一个或者多个单词字符或者是-。然后是点“.”和单词字符和-的组合，可以有一个或者多个组合,邮箱不能以
		// - _
		// .以及其它特殊字符开头和结束,邮箱域名结尾为2~5个字母，比如cn、com、name
		return reg.test(str);
	},
	isIdcard : function(str) {
		var reg = /^(\d{14}|\d{17})(\d|[xX])$/;
		return reg.test(str);
	},
	isPlateNumber : function(str) {
		var reg = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
		var reg2 = /^LS[A-Z_0-9]{5}$/;
		return reg.test(str) || reg2.test(str);
	},
	isVehicleIdentification : function(str) {
		var reg = /^[A-Z_0-9]{17}$/;
		return reg.test(str);
	},
	isMobile : function(str) {
		var reg = /^0*(13|14|15|16|17|18|19)\d{9}$/;
		return reg.test(str);
	},
	isQQ : function(str) {
		var reg = /^[1-9][0-9]{4,}$/;
		return reg.test(str);
	},
	isTel : function(str) {
		var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
		return reg.test(str);
	},
	isURL : function(str) {
		var reg = /http:\/\/[A-Za-z0-9\.-]{3,}\.[A-Za-z]{3}/;
		return reg.test(str);
	},
	isPsd : function(str) {
		var reg = "^[\\w@\\-\\.]{6,16}$";
		return new RegExp(reg).test(str);
	},
	isPostalcode : function(str) {
		var reg = /^[1-9][0-9]{5}$/;
		return reg.test(str);
	},
	isCardNum : function(str) {
		var reg = /^[A-Za-z0-9]+$/;
		return reg.test(str);
	},
	isMoney : function(str) {
		var reg = /^(\-)?(([1-9]\d*)|[0-9])(\.\d+)?$/;
		return reg.test(str);
	},
	isNumber : function(str) {//判断是否只有数字
		var reg = /^[0-9]+$/;
		return reg.test(str);
	},
	isNumAndpoint : function(str) {
		var reg = /^[0-9]+\.*[0-9]*$/
		return reg.test(str);
	},
	isfloattwo : function(str) {//最多保留两位小数的字符串
		var reg = /^[0-9]+\.?[0-9]{0,2}$/
		return reg.test(str);
	},
	formatMPhone:function(mobilePhone){
		if(!mobilePhone||mobilePhone.length!=11){
			return mobilePhone;
		}
		return mobilePhone.substring(0,4)+"***"+mobilePhone.substring(8,11);
	},
	formatIdcard:function(idcard){
		if(!idcard||(idcard.length!=15&&idcard.length!=18)){
			return idcard;
		}
		if(idcard.length==15){
			return idcard.substring(0,6)+"****"+idcard.substring(10,15);
		}else{
			return idcard.substring(0,6)+"****"+idcard.substring(10,18);
		}
	}
};
function iosGetTime(temper){
	return new Date(temper.replace(/-/g,"/")).getTime();
}
//日期格式化
Date.prototype.Format = function(formatStr)   
{   
    var str = formatStr;   
    var Week = ['日','一','二','三','四','五','六'];  
  
    str=str.replace(/yyyy|YYYY/,this.getFullYear());   
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));   
  
    str=str.replace(/MM/,this.getMonth()>8?(this.getMonth()+1).toString():'0' + (this.getMonth()+1));   
    str=str.replace(/M/g,this.getMonth());   
  
    str=str.replace(/w|W/g,Week[this.getDay()]);   
  
    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());   
    str=str.replace(/d|D/g,this.getDate());   
  
    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());   
    str=str.replace(/h|H/g,this.getHours());   
    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());   
    str=str.replace(/m/g,this.getMinutes());   
  
    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());   
    str=str.replace(/s|S/g,this.getSeconds());   
  
    return str;   
};