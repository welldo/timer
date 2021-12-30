var nowTime=new Date().getTime();//默认为当前时间
function timeAdd()
{
    nowTime=nowTime+500;
    postMessage(nowTime);
    setTimeout("timeAdd()",500);
}
this.onmessage = function(event){
    if(event.data){
        nowTime = event.data;
    }
    //console.log('接收到主线程发送的数据' + nowTime)
    /* 调用时间 */
    setTimeout("timeAdd()",300);//考虑到延迟
}