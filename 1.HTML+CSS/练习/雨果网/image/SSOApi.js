var SSOApi = {
    Config: {
        Boxid: "SSOBox",
        BoxHeight: $(window).height(),
        BoxWidth: '100%',
        Register: false,
        IsFirst: true,
        IsWXMPWithoutUserCheck: false,
        IsWxBaseFirst: false,
        IsAppWxOnly: false,
        Guest: false,
        wxLoginImg: "",
        checkWX: function () {//是否是微信
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/micromessenger/i)) {
                return true;
            } else {
                return false;
            }
        },
        checkApp: function () {//是否为app
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/cifnewsapp/i)) {
                return true;
            } else {
                return false;
            }
        },
        isLogin: function () {//是否已经登录
            var ck = document.cookie.toLowerCase();
            if (ck.match('passport_token')) {
                return true;
            }
            else {
                return false;
            }
        },
        checkAppDevice: function () {//判断设备 0：安卓 1：苹果 -1：未知
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid) {
                return 0;
            } else if (isiOS) {
                return 1;
            }
            else {
                return -1;
            }
        },
        url: location.protocol + "//passport.cifnews.com/"
    },
    ShowSSOBox: function (isReg, backurl) {//2018/07/17 修改 登录时跳转新页面
        //居中
        try {
            // if ($('#' + SSOApi.Config.Boxid).length == 0) {
            //     //SSOApi.Config.BoxHeight = $(window).height();
            //     var frame = "<div id = '" + SSOApi.Config.Boxid + "' style='top:0;left:0;bottom:0;right:0;z-index:9999;position:fixed;opacity:0.975;display:none;' >";
            //     frame += "<iframe style='border:none;opacity:0.975;width:100%;height:" + SSOApi.Config.BoxHeight + "px'scrolling='auto'  src=''></iframe></div>";
            //     $("body").append(frame);
            // }
            SSOApi.layer.showCover();
            // var box = $('#' + SSOApi.Config.Boxid);
            //backurl = backurl || encodeURI(document.location.protocol + "//" + document.location.host + "/SSO/LoginCallBack");
            backurl = backurl || encodeURI(document.location.href);
            if (SSOApi.Config.checkWX()) {
                var apiurl = "";
                if (SSOApi.Config.IsWxBaseFirst) {
                    apiurl += "&Other=base";
                }
                if (SSOApi.Config.IsWXMPWithoutUserCheck) {
                    apiurl += "&IsAutoSubmit=true";
                }
                apiurl = SSOApi.Config.url + "home/login?returnurl=" + encodeURI(document.location.href) + apiurl;
                apiurl = SSOApi.Config.url + "oauth/index?type=Weixinmp&ReturnUrl=" + apiurl;
                document.location.href = apiurl;
            }
            else if (SSOApi.Config.checkApp()) {
                // var apiurl = SSOApi.Config.url + "Home/Login?ReturnUrl=" + encodeURI(document.location.href);
                // apiurl += "&UsrOp=1";
                // document.location.href = apiurl;
                SSOApi.layer.hideCover();
                SSOApi.layer.appCoverInit();
                SSOApi.layer.appCoverShow();
                if (typeof app == "undefined") {
                    var url = "http://static.cifnews.com/common/js/app.js?v=" + SSOApi.getVersion();
                    head = document.getElementsByTagName('head')[0];
                    js = document.createElement('script');
                    js.type = "text/javascript";
                    js.src = url;
                    head.appendChild(js);
                    js.onload = function () {
                        SSOApi.AppReady();
                    }
                } else {
                    SSOApi.AppReady();
                }
            }
            else if (isReg) {
                if (!SSOApi.Config.Register) {
                    //box.find('iframe').attr('src', SSOApi.Config.url + "Home/Register?ReturnUrl=" + backurl);
                    window.location.href = (encodeURI(SSOApi.Config.url + "Home/Register?ReturnUrl=" + backurl));
                    SSOApi.Config.Register = true;
                }
            }
            else {
                if (SSOApi.Config.Register) {
                    //box.find('iframe').attr('src', SSOApi.Config.url + "Home/Login?ReturnUrl=" + backurl);
                    window.location.href = (encodeURI(SSOApi.Config.url + "Home/Login?ReturnUrl=" + backurl));
                    SSOApi.Config.Register = false;
                } else if (SSOApi.Config.IsFirst) {
                    //box.find('iframe').attr('src', SSOApi.Config.url + "Home/Login?ReturnUrl=" + backurl);
                    window.location.href = (encodeURI(SSOApi.Config.url + "Home/Login?ReturnUrl=" + backurl));
                    SSOApi.Config.IsFirst = false;
                }
            }
            //box.css({ display: 'block' });
        }
        catch (ex) {
            alert('cuowu:' + ex.message);
        }
    },
    CloseSSOBox: function () {
        document.location.reload();
    },
    InitSSOBox: function (flag) {
        //console.log("该方法已过期");
    },
    LogOutSSO: function () {
        if ($('#SSOLogOut').length == 0) {
            var frame2 = "<div id ='SSOLogOut' style='display:none;' ><iframe scrolling='auto'  src=''></iframe></div>";
            $("body").append(frame2);
        }
        var logouturl = SSOApi.Config.url + "Home/Logout?ReturnUrl=" + encodeURIComponent(document.location.protocol + "//" + document.location.host + "/SSO/LogoutCallBack");
        if (SSOApi.getPassPort()) {
            logouturl += "&token=" + SSOApi.getPassPort();
        }
        $("#SSOLogOut iframe").attr("src", logouturl);
        $('#SSOLogOut').css({ height: "1px", display: 'block' });
    },
    LogOutReturn: function () {
        document.location.reload();
    },
    HideSSOBox: function () {
        $('#' + SSOApi.Config.Boxid).hide();
        SSOApi.layer.hideCover();
        SSOApi.layer.appCoverHide();
    },
    layer: {
        showCover: function () {
            $('#layer_Cover').height($(window).height()).show();
        },
        initCover: function () {
            var div = "<div id='layer_Cover' style='top:0px;width: 100%;position: fixed;background: #fff;z-index: 9998;opacity: 0.97;display:none'></div>";
            $("body").append(div);
        },
        hideCover: function () {
            $('#layer_Cover').height($(window).height()).hide();
        },
        appCoverInit: function () {
            var div = '<div id="layer_app_cover" style="display:none;width:100%;z-index:9999;top:0;position:fixed;background:#fff;"><img style="width:100%;" src="http://static.cifnews.com/common/image/loading.gif?v=2333" /></div>';
            $("body").append(div);
        },
        appCoverShow: function () {
            $('#layer_app_cover').height($(window).height()).show();
        },
        appCoverHide: function () {
            $('#layer_app_cover').height($(window).height()).hide();
        }
    },
    AppReady: function () {
        app.addComplete(function () {
            try {
                var unionId = cifnewsApp.getUnionId();
                var deviceid = "";

                if (SSOApi.Config.checkAppDevice() == 1)//iOS特有  Android暂不需
                {
                    deviceid = cifnewsApp.getNeedId('device');
                }
                if (unionId != "")//不为空
                {
                    if (unionId.match(/0?(13|14|15|18|17)[0-9]{9}/g))//手机格式
                    {
                        if (SSOApi.Config.IsAppWxOnly)//只允许微信登录
                        {
                            SSOApi.jsLog("调用APP微信登录，unionId为：" + unionId);
                            SSOApi._wxLogin();
                            return;
                        }
                    }
                }
                else {
                    if (!SSOApi.Config.Guest)//不允许游客登录
                    {
                        if (SSOApi.Config.IsAppWxOnly)//只允许微信登录
                        {
                            SSOApi.jsLog("调用APP微信登录，unionId为空");
                            SSOApi._wxLogin();
                            return;
                        }
                        else {
                            cifnewsApp.noLogin();
                            app.addNotice(function (f) {
                                if (f.Type == "noLogin" && f.Data) {
                                    var deviceid = "";
                                    if (SSOApi.Config.checkAppDevice() == 1)//iOS特有  Android暂不需
                                    {
                                        deviceid = cifnewsApp.getNeedId('device');
                                    }
                                    SSOApi._ssoLogin(cifnewsApp.getUnionId(), deviceid);
                                } else {
                                    SSOApi.HideSSOBox();
                                }
                            });
                            return;
                        }
                    }
                }
                SSOApi._ssoLogin(unionId, deviceid);
            }
            catch (ex) {
                alert(ex.message);
            }
        });
    },
    _wxLogin: function () {
        var version = parseInt(window.navigator.userAgent.toLowerCase().match(/\d+.\d+.\d+/g).pop().replace(/\./g, ""));
        if (SSOApi.Config.checkAppDevice() == 1 && version < 350) {//iOS旧版轮询查看状态是否登录(无wxLogin且noLogin无回调）
            var _c = 0;
            var _t = setInterval(function () {
                try {
                    if (cifnewsApp.getNeedId("openid") != "" || cifnewsApp.getNeedId("loginToken") != "") {
                        clearInterval(_t);
                        SSOApi._ssoLogin(cifnewsApp.getUnionId(), "");//旧版不做deviceid
                    }
                    if (_c > 30) {
                        alert("登录超时" + version);
                        clearInterval(_t);
                    }
                }
                catch (ex) {
                    alert(ex.message);
                }
                _c++;
            }, 500);
            cifnewsApp.noLogin();
        }
        else {
            cifnewsApp.wxLogin(SSOApi.Config.wxLoginImg);
            app.addNotice(function (f) {
                if (f.Type == "wxLogin" && f.Data) {
                    var deviceid = "";
                    if (SSOApi.Config.checkAppDevice() == 1)//iOS特有  Android暂不需
                    {
                        deviceid = cifnewsApp.getNeedId('device');
                    }
                    SSOApi._ssoLogin(cifnewsApp.getUnionId(), deviceid);
                } else {
                    SSOApi.HideSSOBox();
                }
            });
        }
    },
    _ssoLogin: function (unionid, deviceid) {
        var userid = 0;
        if (typeof cifnewsApp !== "undefined" && typeof cifnewsApp.getVipId == "function") {
            userid = cifnewsApp.getVipId();
        }
        SSOApi.jsonp({
            url: SSOApi.Config.url + 'Home/AppLogin',
            data: { unionid: unionid, deviceid: deviceid, userid: userid },
            callback: "callback",
            success: function (data) {
                if (data && data.result_code == 1) {
                    SSOApi.AjaxSubSite(data.data.Sites, data.data.Token, location.href)
                }
            }
        });
    },
    AjaxSubSite: function (sites, token, rurl) {
        if (sites == null || token == null || token == "") {
            return;
        }
        if (sites.length == 0) {
            location.href = rurl;
            return;
        }
        for (var i = 0; i < sites.length; i++) {
            if (sites[i].Url) {
                (function (i) {
                    try {
                        SSOApi.jsonp({
                            callback: "callback",
                            data: { Token: token },
                            time: 3000,
                            url: sites[i].Url,
                            success: function (data) {
                                console.log(name + ":注册成功");
                            },
                            fail: function (data) {
                                console.log(name + ":接口异常," + data.message);
                            },
                            complete: function () {
                                SSOApi.HideSSOBox();
                                if (rurl) {
                                    location.href = rurl;
                                }
                            }
                        });
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                })(i)
            }
        }
    },
    jsonp: function (options) {
        options = options || {};
        if (!options.url || !options.callback) {
            throw new Error("参数不合法");
        }

        //创建 script 标签并加入到页面中
        var callbackName = ('jsonp_' + Math.random()).replace(".", "");
        var oHead = document.getElementsByTagName('head')[0];
        options.data[options.callback] = callbackName;
        var params = SSOApi.formatParams(options.data);
        var oS = document.createElement('script');
        oHead.appendChild(oS);

        //创建jsonp回调函数
        window[callbackName] = function (json) {
            oHead.removeChild(oS);
            clearTimeout(oS.timer);
            window[callbackName] = null;
            options.success && options.success(json);
            options.complete && options.complete();
        };

        options.beforeSend && options.beforeSend(options);
        if (!options.cancel) {
            //发送请求
            oS.src = options.url + '?' + params;
            //超时处理
            if (options.time) {
                oS.timer = setTimeout(function () {
                    window[callbackName] = null;
                    oHead.removeChild(oS);
                    options.fail && options.fail({ message: "超时" });
                    options.complete && options.complete();
                }, options.time);
            }
        }
    },
    formatParams: function (data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
        return arr.join('&');
    },
    getVersion: function () {
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
                                return ppps[1];
                            }
                        }
                    }
                }
            }
        }
        return "";
    },
    getPassPort: function () {
        var name = "PassPort_Token=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    },
    jsLog: function (msg) {
        if (msg && typeof cifnewsCounter !== "undefined" && typeof cifnewsCounter.infoLog === "function") {
            cifnewsCounter.infoLog(msg);
        }
    }
};
$(function () {
    SSOApi.layer.initCover();
});