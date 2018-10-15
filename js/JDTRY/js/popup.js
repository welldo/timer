
let startBtn = document.getElementById('startBtn')
let stopBtn = document.getElementById('stopBtn')

let tabId ;

chrome.tabs.query({active: true, currentWindow: true}, tabs=>tabId = tabs[0].id )

var msg ={
	cmd: 'openLinkOnNewTab',
};

$("#main").show();


startBtn.onclick = function(){
	
	var cids = '';
	$(".category").each(function(k,v){
		if(v.checked){
			console.log(v.checked);
			if(cids==''){
				cids +=  $(v).data("value")
			}else{
				cids +=  ',' + $(v).data("value")
			};
		}
	});
	msg.activityType = $("#activityType").val();
	msg.cids=cids;
	msg.price= +$("#price").val().trim();
	msg.page= +$("#page").val().trim();
	console.log(cids);
	
	tellBackgroundStart(msg);
}


stopBtn.onclick = function(){
	var msg = {
		cmd:'stop',
	}
	showMsg("已停止");
	tellBackgroundStart(msg);
	sendMsgToContentScript(msg);
}

function tellBackgroundStart(msg){
	let bg = chrome.extension.getBackgroundPage();
	console.log(bg);
	bg.recievMsgFromPopup(msg)
}

function tellContentScriptStart(msg){
	console.log("tellContentScriptStart");
	sendMsgToContentScript(msg)
}


function sendMsgToContentScript(msg, callback) {
	
    chrome.tabs.sendMessage(tabId, msg, function(response)
    {
		console.log("sendMsgToContentScript");
		console.log(response);
        if(callback) callback(response);
    })
}


function showMsg(msg) {
	let style=`
		 position:fixed;
		 background:red;
		 top:50px;
		 left:50%;
		 margin-left:-80px;
		 width:160px;
		 color:#FFF;
		 font-size:14px;
		 text-align:center;
		 padding:12px;
		 border-radius:4px;
	 `
 
	 let div = document.createElement('div')
	 div.innerHTML = `<div style="${style}" id="show_tips">
		 ${msg}
	 </div>`
	 document.body.appendChild(div)
 
	 setTimeout(function(){
		 let el = document.getElementById('show_tips')
		 el&&el.remove&&el.remove()
	 }, 2000)
 }