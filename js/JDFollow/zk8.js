var index = 0,
    tabId = 0,
    started = 0,
    stopRequest = 0,
    followTime = 4000,
    urlPrefix = '/jd.php?search_kw=';
    urlbackfix = '?cu=';
var links;

var start = function() {
    links = document.querySelectorAll('.pcb a');
    if (links.length == 0) {
        alert('当前页面没有发现相关链接。');
    } else {
        started = 1;
        follow();
    }
};

var stop = function() {
    started = 0;
    stopRequest = 0;
    console.log('领取完毕。');
};

var follow = function() {
    var link = links[index++].href;
    if (link.indexOf(urlPrefix) >0) link = window.decodeURIComponent(link.substr(urlPrefix.length+link.indexOf(urlPrefix)),link.indexOf(urlbackfix));
    if (stopRequest) {
        stop();
    } else if (link.match(/http[s]?:\/\/[a-z0-9-]{3,12}.jd.com/)) {
        console.log(link);
        chrome.runtime.sendMessage({cmd: "follow", url: link, tabId: tabId}, function(response) {
            tabId = response.tabId;
            if (index == links.length) stop();
            else setTimeout(follow, followTime);
        });
    } else {
        if (index == links.length) stop();
        else follow();
    }
};

var btn = document.querySelector('#nv a[data-tmplid="30"]');
if (btn != null) btn.onclick = function(e) {
    e.preventDefault();
    if (started) {
        if (window.confirm('停止领取？')) stopRequest = 1;
    } else {
        if (window.confirm('开始领取？')) start();
    }
};