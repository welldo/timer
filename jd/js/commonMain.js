function getPathCM(){
    var curWwwPath = window.document.location.href;
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    var localhostPaht = curWwwPath.substring(0,pos);
    var projectName = pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return (localhostPaht + projectName);
}
var baseUrl=getPathCM();
var isMobile=false;
if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
    isMobile=true;
}
//document.write(unescape("%3Cspan id='cnzz_stat_icon_1279491579' style='display:none;' %3E%3C/span%3E%3Cscript src='https://s4.cnzz.com/z_stat.php%3Fid%3D1279491579' type='text/javascript'%3E%3C/script%3E"));
//var _hmt = _hmt || [];
//(function() {
//    var hm = document.createElement("script");
//    hm.src = "https://hm.baidu.com/hm.js?e77a7e1c2716f6d46b746816ea3ddca9";
//    var s = document.getElementsByTagName("script")[0];
//    s.parentNode.insertBefore(hm, s);
//})();
//document.write('<!-----------  公共js和css start----------->');
document.write('' +
    '<link rel="stylesheet" type="text/css" href="'+baseUrl+'/css/common.css?v=3"></link>        \n' +
    '<link rel="stylesheet" type="text/css" href="'+baseUrl+'/css/zdialog.css"></link>       \n' +
    '<link rel="stylesheet" type="text/css" href="'+baseUrl+'/css/index.css"></link>  \n' +
    '<script type="text/javascript" src="'+baseUrl+'/js/jquery-1.8.3.min.js"></script>       \n' +
    '<script type="text/javascript" src="'+baseUrl+'/js/vue.min.js?v=1"></script>            \n' +
    '<script type="text/javascript" src="'+baseUrl+'/js/Pops.js"></script>                   \n' +
    '<script type="text/javascript" src="'+baseUrl+'/js/jquery.cookie.js"></script>          \n' +
    '<script type="text/javascript" src="'+baseUrl+'/js/zdialog.js"></script>                \n' +
    '<script type="text/javascript" src="'+baseUrl+'/js/common.js?v=1"></script>                 \n' +
    '<script type="text/javascript" src="'+baseUrl+'/js/vant.min.js"></script>       \n' +
    //   '<script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>         \n' +
    '');
//document.write('<!-----------  公共js和css end----------->');
//改变字体大小
(function (doc, win) {//解决华为手机rem失效
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 640) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
            var html = document.getElementsByTagName('html')[0];
            var settedFs = settingFs = parseInt(100 * (clientWidth / 640));
            var whileCount = 0;
            while (true) {
                var realFs = parseInt(window.getComputedStyle(html).fontSize);
                var delta = realFs - settedFs;
                //不相等
                if (Math.abs(delta) >= 1) {
                    if (delta > 0)
                        settingFs--;
                    else
                        settingFs++;
                    html.setAttribute('style', 'font-size:' + settingFs + 'px!important');
                } else
                    break;
                if (whileCount++ > 100)
                    break
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
function changePhone(){
    if(!isMobile){//非手机端
        var docEl = document.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth=realWidth = docEl.clientWidth;
                var clientHeight = docEl.clientHeight;
                if (!clientWidth) return;
                var spWidth=clientHeight*0.65;
                if(clientWidth>spWidth){//宽度大于实际宽度
                    docEl.style.fontSize = 100 * (spWidth/ 640) + 'px';
                    realWidth=spWidth;
                    $("html,body,#wrap,.body-wrap").css("width",spWidth+"px");
                    $("#wrap").css("marginLeft",(clientWidth-spWidth)/2+"px");
                }else{
                    if (clientWidth >= 640) {
                        docEl.style.fontSize = '100px';
                    } else {
                        docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
                    }
                }

                var html = document.getElementsByTagName('html')[0];
                var settedFs = settingFs = parseInt(100 * (realWidth / 640));
                var whileCount = 0;
                while (true) {
                    var realFs = parseInt(window.getComputedStyle(html).fontSize);
                    var delta = realFs - settedFs;
                    //不相等
                    if (Math.abs(delta) >= 1) {
                        if (delta > 0)
                            settingFs--;
                        else
                            settingFs++;
                        html.setAttribute('style', 'font-size:' + settingFs + 'px!important');
                    } else
                        break;
                    if (whileCount++ > 100)
                        break
                }
            };
        if (!document.addEventListener) return;
        window.addEventListener(resizeEvt, recalc, false);
        document.addEventListener('DOMContentLoaded', recalc, false);
    }
}
