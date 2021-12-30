function showProgress(){
	if(typeof(vant) != "undefined"){
		vant.Toast.loading({
		  duration: 0,
		  message: '加载中...',
		  forbidClick: true,
		});
	}else{
		show("../image/loading.gif",32,32);
	}
	
}
function hideProgress(){
	if(typeof(vant) != "undefined"){
		vant.Toast.clear();
	}else{
		closeDiv();
	}
}
//弹出覆盖全屏
function show(addressImg, img_w, img_h,background) {
    //得到页面高度
    var h =document.documentElement.clientHeight; 
    	//(document.documentElement.scrollHeight > document.documentElement.clientHeight) ? document.documentElement.clientHeight : document.documentElement.scrollHeight;
   //alert(document.documentElement.scrollHeight+","+document.documentElement.clientHeight);
    //得到页面宽度
    var w = (document.documentElement.scrollWidth > document.documentElement.clientWidth) ? document.documentElement.clientWidth : document.documentElement.scrollWidth;
    var procbg = document.createElement("div");  //首先创建一个div
    procbg.setAttribute("id", "mybg");            //定义该div的id
    procbg.style.width = w+"px";
    procbg.style.height = h+"px";
    procbg.style.position = "fixed";
    procbg.style.top = "0";
    procbg.style.left = "0";
    procbg.style.zIndex = "999999";
    procbg.style.opacity = "0.9";
    procbg.style.filter = "Alpha(opacity=90)";
    if (typeof (background) != "undefined" && background != "") {
        procbg.style.background = background;
    } else {
       // procbg.style.background = "#ffffff";
        procbg.style.opacity = "0.9";
        procbg.style.filter = "Alpha(opacity=90)";
    }
    //取消滚动条
    document.body.appendChild(procbg);
    document.body.style.overflow = "hidden";

    var pimg = document.createElement("img");  //创建一个img
    pimg.setAttribute("id", "bg_img");         //定义该div的id
    pimg.setAttribute("src", addressImg);      //定义该div的id
    var img_w2 = (w - img_w) / 2;
    var img_h2 = (h - img_h) / 2-50;
    pimg.style.top = img_h2 + "px";
    pimg.style.left = img_w2 + "px";
    pimg.style.position = "fixed";
    pimg.style.opacity = "0.9";
    pimg.style.width = img_w;
    pimg.style.height = img_h;
    document.getElementById("mybg").appendChild(pimg);
}
function closeDiv()   //关闭弹出层
{
	try{
		var mybg = document.getElementById("mybg");
	    document.body.removeChild(mybg);
	    document.body.style.overflow = "auto";//恢复页面滚动条
	}catch(e){}
   
}
