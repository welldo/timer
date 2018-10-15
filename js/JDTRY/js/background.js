var tab;
var on = false;
var page=1;
var runMsg ={};
var getPageUrl = function(){
	var url = 'http://try.jd.com/activity/getActivityList?page='+page+"&cids="+runMsg.cids+"&activityType="+runMsg.activityType;
	return url;
}

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	if( request.cmd === 'askBgRunMsg'){
		sendResponse({
			on:on,
			price:runMsg.price,
		});
	}
	if(request.cmd =='done'){
		on = false;
	}
});

function dedupe(array) {
	return Array.from(new Set(array));
  }

  
function recievMsgFromPopup(request) {
	if( request.cmd === 'openLinkOnNewTab' ){
		if(!on){
			on = true;
			page =1;
			runMsg.activityType= request.activityType;
			runMsg.cids = request.cids;
			runMsg.price = request.price;
			page = request.page;

			tab = chrome.tabs.create({
				url: getPageUrl()
			});
		}
	}
	if( request.cmd === 'stop' ){
		on = false
	}
}
