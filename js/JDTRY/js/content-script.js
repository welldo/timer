
function sendMsgToBackground( msg, callback ) {
	chrome.runtime.sendMessage( msg, function(response) {
	    // console.log('收到来自后台的回复：', response)
        callback && callback(response)
	})
}



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
    console.log('我收到popup或bg发来的消息，消息体是', request, sender)
    if(request.cmd=='stop'){
        stop = true;
        alert("已停止");
    }
})

function sendMsgToBackground( msg, callback ) {
	chrome.runtime.sendMessage( msg, function(response) {
        console.log('收到来自后台的回复：', response)
        callback && callback(response)
	})
}

function askBgRunMsg() {
    
    return new Promise((resolve, reject)=>{

        sendMsgToBackground({
            cmd:'askBgRunMsg'
        }, response=>{
            if( response ){
                return resolve( response )
            }else{
                return reject()
            }
        })

    })
}

var index = 0;
var list =[];
var stop = false;
function makeOne(index, cb){
    if(stop){
        return;
    }
    showMsg(  '正在申请' + (index+1)+"/"+ list.length);
    console.log('makeOne=' + index);
    if(index>=list.length){
        console.log("done");
        if(cb){
            cb();
        }
        return;
    }
    var id = list[index];
    fetch("http://try.jd.com/migrate/apply?source=0&activityId="+id,{
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }, 
        credentials: 'include',
        method: 'get',
    }).then(function(response) {
        return response.json();
    }).then(function(json) {
        setTimeout(function(){
            makeOne(index+1, cb);
        },5000);
    });
}
function showMsg(msg) {
	let style=`
		 position:fixed;
		 background-color:black;
		 top:100px;
		 left:50%;
		 margin-left:-80px;
		 width:160px;
		 color:#FFF;
		 font-size:14px;
         text-align:center;
         z-index:10000;
		 padding:12px;
		 border-radius:4px;
	 `
 
	 let div = document.createElement('div')
	 div.innerHTML = `<div style="${style}" id="show_tips">
		 ${msg}
	 </div>`
	 document.body.appendChild(div)
 
	 setTimeout(()=>{
		 let el = document.getElementById('show_tips')
		 el&&el.remove&&el.remove()
	 }, 5000)
 }

document.addEventListener('DOMContentLoaded', ()=>
{
    askBgRunMsg().then( runMsg=>{
        console.log(runMsg);
        if(!runMsg.on){
            return;
        }
        var locationHref = document.location.href;
        if(locationHref.indexOf("http://try.jd.com/activity/getActivityList")>=0){
            // debugger;
            var c = setTimeout(function(){
                var nodes = document.querySelectorAll(".items .item");
                for(var i=0;i<nodes.length;i++){
                    var node = nodes[i]; 
                    if(node.className.indexOf("applied")>0){
                        
                    }else{
                        //var price = + node.querySelector(".p-price span").innerHTML.replace("￥","");
                        var yang=node.querySelector(".t1").innerHTML.indexOf("\<\/b\>份")-5;
                        var price = + node.querySelector(".t1").innerHTML.substr(5,yang);
                        if(price < runMsg.price){
                        }else{
                            list.push(node.attributes["activity_id"].value);
                            console.log(price);
                        }
                    }
                }
                console.log(list);
                makeOne(0,function(){
                    // debugger;
                    var currentPage = + locationHref.match(/page=(\d*)/)[1];
                    var d = document.querySelector(".fp-text i");
                    var maxPage = + d.innerHTML;

                    if(currentPage> maxPage){
                        sendMsgToBackground({
                            cmd:'done'
                        }, response=>{
                        });
                        alert("全部完成了");   
                    }else{
                        currentPage ++;
                        var url = locationHref.replace(/page=\d*/,function(a,b,c){
                            return 'page=' + currentPage;
                        });
                        console.log(url);
                        document.location.href = url;
                    }
                });
            },3000);
            
            
            
        }

    });
})