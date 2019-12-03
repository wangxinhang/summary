//全局
var Environment = "";
var Version = "1.0";
var blackDomainList = "http://www.xumizuo.com,http://www.gr8shopper.com,http://www.kdvuinee.com,http://www.255820.com,https://www.ruixiangwl.com,http://www.shjlpx.com,http://www.uarrive.com,http://www.mcztc.cn,http://www.xpeedite.net,http://www.scsjwy.com";
if (blackDomainList.indexOf(location.origin) !== -1) {
    location.href = "http://www.cifnews.com";
}
//获取配置
//  环境
(function () {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i)) {
        Environment = "WeChat";//微信浏览器
    }
    else if (ua.match(/cifnewsapp/i)) {
        Environment = "CifnewsApp";
    }
    else if (ua.match(/(iphone|ipod|android|ios|symbianos)/i)) {
        Environment = "MBroswer";//手机浏览器
    }
    else {
        Environment = "PCBroswer"; //PC浏览器
    }
})();


//  版本
for (var i = 0; i < document.scripts.length; i++) {
    var src = document.scripts[i].src;
    if (src.indexOf("/a.js") > -1) {
        var ps = src.split('/a.js?');
        if (ps.length > 1) {
            ps = ps[1].split('&')
            for (var j = 0; j < ps.length; j++) {
                var pps = ps[j];
                if (pps.indexOf('v=') > -1) {
                    var ppps = pps.split('=');
                    if (ppps.length > 1) {
                        Version = ppps[1];
                    }
                }
            }
        }
    }
}
//移动端跳转
if (Environment == "MBroswer" || Environment == "WeChat" || Environment == "CifnewsApp") {
    if (location.href.indexOf("http://www") == 0 || location.href.indexOf("https://www") == 0) {
        var _c_url = location.href.replace("www", "m");
        location.href = _c_url;
    }
}

//加载JS
//  百度页面丢失统计
//if (Environment == "PCBroswer") {
//    var _hmt = _hmt || [];
//    (function () {
//        var hm = document.createElement("script");
//        hm.src = "//hm.baidu.com/hm.js?2d31ae989e20dcdf2390e77a5e9b7186";
//        var s = document.getElementsByTagName("script")[0];
//        s.parentNode.insertBefore(hm, s);
//    })();
//}

//  JQuery
if (typeof jQuery == 'undefined') {
    var url = "//static.cifnews.com/yuguo/js/jquery/jquery-1.11.3.min.js?v=" + Version,
        head = document.getElementsByTagName('head')[0];
    js = document.createElement('script');
    js.type = "text/javascript";
    js.src = url;
    head.appendChild(js);
    js.onload = function () {
        JqueryReady();
    }
}
else {
    JqueryReady();
}

var _hmt = _hmt || [];
//文档加载完后
function JqueryReady() {
    $(function () {
        //统计
        if (Environment == "PCBroswer") {
            (function () {
                var hm = document.createElement("script");
                hm.src = "//hm.baidu.com/h.js?5d4f3414e4bdce908042cc14a8d402b1";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
            /* (function () {
                 var hm = document.createElement("script");
                 hm.src = "https://s9.cnzz.com/z_stat.php?id=5402349&web_id=5402349";
                 var s = document.getElementsByTagName("script")[0];
                 s.parentNode.insertBefore(hm, s);
             })();
             */
            // (function () {
            //     var hm = document.createElement("script");
            //     hm.src = "//tajs.qq.com/stats?sId=59615321";
            //     var s = document.getElementsByTagName("script")[0];
            //     s.parentNode.insertBefore(hm, s);
            // })();
        }
        else if (Environment == "WeChat" || Environment == "MBroswer" || Environment == "CifnewsApp") {
            (function () {
                var hm = document.createElement("script");
                hm.src = "//hm.baidu.com/hm.js?057c9604c69d0185af89f098345092ef";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
			/*
            (function () {
                var hm = document.createElement("script");
                hm.src = "https://s11.cnzz.com/z_stat.php?id=1259314943&web_id=1259314943";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
			*/
            // (function () {
            //     var hm = document.createElement("script");
            //     hm.src = "//tajs.qq.com/stats?sId=59615356";
            //     var s = document.getElementsByTagName("script")[0];
            //     s.parentNode.insertBefore(hm, s);
            // })();
        }
        //阿里云
        (function () {
            !(function (c, b, d, a) {
                c[a] || (c[a] = {}); c[a].config = { pid: "dlhv35aj72@2c694a124934468" };
                with (b) with (body) with (insertBefore(createElement("script"), firstChild)) setAttribute("crossorigin", "", src = d)
            })(window, document, "https://retcode.alicdn.com/retcode/bl.js", "__bl");
        })();
        //微信分享
        if (Environment == "WeChat" && typeof (wxLoadedDelete) == 'undefined') {
            (function () {
                var hm = document.createElement("script");
                hm.src = "//static.cifnews.com/common/js/wxShare.js?v=" + Version;
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
        }
        //app接口未能解决加载顺序问题
        //if (Environment == "CifnewsApp") {
        //    (function () {
        //        var hm = document.createElement("script");
        //        hm.src = "http://static.cifnews.com/common/js/app.js?v=" + Version;
        //        var s = document.getElementsByTagName("script")[0];
        //        s.parentNode.insertBefore(hm, s);
        //    })();
        //}
    });
}

