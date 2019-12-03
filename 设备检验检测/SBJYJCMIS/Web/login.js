
//#region 全局变量
var permission = null; //用户权限：json格式
var panelWidth = 680; panelHeight = 400;
var IsIE8 = navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i) == "8.";
var IsIE78 = navigator.userAgent.indexOf("MSIE 8.0") > 0 || navigator.userAgent.indexOf("MSIE 7.0") > 0;
var xuserId, sysName = "设备检验检测平台";
var btnLoginEnabled = false; passValidator = null;

//#endregion 全局变量

//#region 网页加载 

//#region 初始加载
$(document).ready(function () {
    // $("#softName").html(sysName);
    $("#txtUser").val("");
    $("#txtPass").val("");

    //设置面板
    LoadPage();

    //窗口调整大小
    $(window).resize(function () {
        SetPanel();
        SetSupportInfo();
        SetQrCodePanel();
    });
});


function LoadPage() {
    //遮罩
    CreateMask();

    //设置面板
    SetPanel();

    //loginBox
    SetLoginBox();

    //加载验证器
    LoadValidaor();

    //支持信息
    SetSupportInfo();

    //事件
    $("#btnLogin").click(function () {
        LoginIn(this);
    });

    $("#txtUser").focus(function () {
        $("#btnLogin").text("登 录");
    });

    $("#txtPass").focus(function () {
        $("#btnLogin").text("登 录");
    });

    $("#txtUser").keyup(function (e) {
        if ($(this).val().length == 0) {
            SetBtnLogin(false);
        }
    });

    $("#txtPass").keypress(function (e) {
        var k = e.which;
        if (k == 13) {
            $("#btnLogin").trigger("click");
        }
    });
}

//背景遮罩
function CreateMask() {
    var nc = document.body;
    var m = document.createElement("div");
    var cssJson = { "position": "absolute", "left": 0, "top": 0, "width": "100%", "height": "100%", "background-color": "black", "display": "none", "z-index": -1 };
    $(m).attr("id", "mask").css(cssJson).appendTo(nc).fadeTo(300, 0.2);

    $(nc).click(function () {
        $(m).fadeTo(500, 0.2);
    });

    $(".textBox").focus(function () {
        $(m).fadeTo(500, 0.5);
    }).click(function (e) {
        e.stopPropagation();
    })
}

//#endregion 初始加载

//#endregion 网页加载        

//#region 面板设置

//#region 设置面板
function SetPanel() {
    //定位登陆面板
    var w = panelWidth;
    var h = panelHeight;
    var b = $(document.body);
    var bw = $(b).width();
    var bh = $(b).height();
    var p = $("#outPanel");
    var x = (bw - w) / 2;
    var mt = 10;
    var y = (bh - h) / 2 - mt;
    var pd = 15;
    $(p).css({ "position": "absolute", "left": x, "top": y, "padding": pd + "px" }).outerWidth(w).outerHeight(h);
    domCommon.SetOpacity(p, "#e2efef", 0.2);

    var lp = $("#loginPanel");
    var lpw = w - pd * 2;
    var lph = h - pd * 2;
    $(lp).outerWidth(lpw).outerHeight(lph).css({ "position": "absolute" });
    domCommon.SetOpacity(lp, "#fffffb", 1);
}
//#endregion 设置面板

//#region 设置LoginBox
function SetLoginBox() {
    var p = $("#loginPanel");
    var pw = $(p).outerWidth();
    var ph = $(p).outerHeight();
    var logo = $("#logoPanel");
    var logoH = $(logo).outerHeight();
    var b = $("#loginBox");
    var h = ph - logoH;

    $(b).outerHeight(h);
}

function SetBtnLogin(flag) {
    btnLoginEnabled = flag;
    var btnLogin = $("#btnLogin");
    var loginClass = btnLoginEnabled ? "btnLogin borderRadius4" : "btnLoginDisable borderRadius4";
    $(btnLogin).removeClass().addClass(loginClass);
}

//#endregion LoginBox

//#region 设置支持信息
function SetSupportInfo() {
    var p = $("#outPanel");
    var pw = $(p).outerWidth();
    var ph = $(p).outerHeight();
    var pt = $(p).offset().top;
    var pl = $(p).offset().left;

    var sp = $("#supportInfo");
    var mt = 20;
    var x = pl;
    var y = pt + ph + mt;
    var w = pw;
    var cssJson = { "position": "absolute", "left": x, "top": y };
    $(sp).css(cssJson).outerWidth(w);

    var startYear = 2017;
    var endYear = new Date().getFullYear();
    var year = startYear == endYear ? startYear : startYear + '-' + endYear;
    var info = "©" + year + " <a href='http://www.senzdowe.com' target='_blank' style='color:white;text-decoration:none;margin:0 10px;'>" +
                "郑州盛世多维网络有限公司<a/>提供技术支持<span style='margin:0 20px;'>支持热线：15738357216 , 18937636531</span>";
    $(sp).html(info).fadeIn(300);

}
//#endregion 设置支持信息

//#region 设置二维码
function SetQrCodePanel() {
    var p = $("#outPanel");
    var pw = $(p).outerWidth();
    var ph = $(p).outerHeight();
    var px = $(p).offset().left;
    var py = $(p).offset().top;

    var qp = $("#qrCodePanel");
    var mt = 15;
    var x = px + pw + mt;
    var y = py + mt;
    var cssJson = { "left": x, "top": y };
    $(qp).css(cssJson);

    var qc = $("#qrCode");
    domCommon.SetOpacity(qc, "#e2efef", 0.2);

}
//#endregion 设置二维码

//#endregion 面板设置 

//#region 验证

var loginValidators = []; //存储验证器对象的数组
function LoadValidaor() {
    var wt = 1;

    //#region 用户名验证
    var ncBsc = $("#userTextBox");
    $("#txtUser").szdwValidate({
        widthType: wt,
        fnInitial: function (szdwCtrl) {
            szdwCtrl.isValid = false;
            szdwCtrl.panelCssName = "validatorBorderRadius";
            szdwCtrl.namingContainer = ncBsc;
            szdwCtrl.positionControl = ncBsc;
            szdwCtrl.offsetMode = 0;
            szdwCtrl.backColor = "#ef473a"; //indianred
            szdwCtrl.ruleJson = { required: true, pinyinNumber: true, inexistence: true };
            szdwCtrl.inexistenceRequestUrl = "./Xuser/XuserProcess.ashx";
            szdwCtrl.inexistenceRequestMethodName = "XuserIsExisted";
            szdwCtrl.inexistenceParamName = "userName"; //要传到服务端的参数名称
            szdwCtrl.messageJson.required = "请输入用户名";
            szdwCtrl.messageJson.inexistence = "用户不存在";
            szdwCtrl.fnCallBackBeforeVadidate = fnCallBackBeforeVadidateUser;
            szdwCtrl.fnCallBackAfterVadidate = fnCallBackVadidateUser;
            loginValidators.push(szdwCtrl);
        }
    });

    //用户名验证验证后回调函数
    function fnCallBackBeforeVadidateUser(szdwCtrl) {
        var nc = szdwCtrl.namingContainer;
        var m = validMark;
        if (m) {
            var t = szdwCtrl.targetControl;
            if ($(t).val().length > 0) {
                var backImg = "url('/Styles/image/loginPhotos/refresh.gif') no-repeat center";
                cssJson = { "background": backImg };
                $(m).css(cssJson).show();
            }
        } else {
            validMark = CreateValidMark(nc);
        }
    }

    //用户名验证验证后回调函数
    function fnCallBackVadidateUser(szdwCtrl) {
        var isValid = szdwCtrl.isExisted;
        var nc = szdwCtrl.namingContainer;
        var m = validMark;
        if (m) {
            if (isValid) {
                var backImg = "url('/Styles/image/loginPhotos/correct21g3.png') no-repeat center";
                cssJson = { "background": backImg };
                $(m).css(cssJson).show();
            } else {
                $(m).hide();
            }
            SetBtnLogin(isValid);
        } else {
            validMark = CreateValidMark(nc);
        }

        var tc = szdwCtrl.targetControl;
        $(tc).focus(function () {
            $(m).hide();
            szdwCtrl.isExisted = false;
        });
    }

    //#endregion 用户名验证

    //#region 密码验证
    var ncBsc = $("#passTextBox");
    $("#txtPass").szdwValidate({
        widthType: wt,
        fnInitial: function (szdwCtrl) {
            szdwCtrl.panelCssName = "validatorBorderRadius";
            szdwCtrl.namingContainer = ncBsc;
            szdwCtrl.positionControl = ncBsc;
            szdwCtrl.offsetMode = 0;
            szdwCtrl.backColor = "#ef473a"; //indianred
            szdwCtrl.ruleJson = { required: true, unmatch: false };
            szdwCtrl.messageJson.required = "请输入密码";
            passValidator = szdwCtrl;
            loginValidators.push(szdwCtrl);
        }
    });

    //#endregion 密码验证
}

//验证中和成功后的标识（显示对号图片）
var validMark = null; //验证成功后的标识（显示对号图片）
function CreateValidMark(namingContainer) {
    var nc = namingContainer;
    var el = document.createElement("div");
    var nx = $(nc).position().left;
    var ny = $(nc).position().top;
    var nw = $(nc).outerWidth();
    var nh = $(nc).outerHeight();
    var x = nx + nw - nh;
    var y = ny;
    var cssJson = { "position": "absolute", "left": x, "top": y, "display": "none" };
    $(el).outerWidth(nh).outerHeight(nh).css(cssJson).appendTo(nc);
    return el;
}
//#endregion 验证 

//#region 登录
function LoginIn(btn) {
    if (btnLoginEnabled) {
        //触发密码必填验证
        $("#txtPass").trigger("blur");
        var isValid = passValidator.isValid;

        //登录
        if (isValid) {
            LoginAccess(btn);
        }
    }
}

//登录系统 
function LoginAccess(btn) {
    //登录状态设置
    $(btn).data("background", $(btn).css('background'));
    var backColor = $(btn).css("background-color");
    var ldImg = "url('/Styles/image/loginPhotos/refresh.gif') no-repeat 20px"; //loadingdot
    $(btn).text("正在登录，请稍候……").css({ "background": ldImg, "background-color": backColor });

    //登录到系统 
    var url = "Xuser/XuserProcess.ashx";
    var userName = $.trim($("#txtUser").val());
    var password = $.trim($("#txtPass").val());
    var paramJson = { userName: userName, password: password, MethodName: "XuserPasswordIsValid" };
    $.ajax({
        url: url, type: "post", data: paramJson, dataType: "json",
        success: function (jsData) {
            if (jsData.passValid) {
                GetAccessPermission(btn);
            } else {
                $(btn).text("登 录").css({ "background": "" });
                if (passValidator) {
                    passValidator.contentText = "密码不正确";
                    passValidator.SetContentText();
                    passValidator.Show();
                }
            }
        }
    });
}

//获取权限并登录系统
function GetAccessPermission(btn) {
    var url = "Xuser/XuserProcess.ashx";
    var userName = $.trim($("#txtUser").val());
    var paramJson = { userName: userName, MethodName: "XuserGetAccessPermission" };
    $.ajax({
        url: url, type: "post", data: paramJson, dataType: "json",
        success: function (jsData) {
            if (jsData.accessPermission) {
                var xuiMd5 = $.md5(jsData.xuserId.toString());
                var param = "?xui=" + xuiMd5 + '&sysName=' + sysName;
                xuserId = jsData.xuserId;
                var paramJson = { xuserId: xuserId, MethodName: "Login" };
                $.ajax({
                    url: "LogManagement/LoginLogProcess.ashx", type: "post", data: paramJson, async: false, dataType: "json"
                });
                location.href = "Main/Main.html" + param;
            } else {
                $(btn).css({ "background": $(btn).data("background") }).text("无权限，请联系管理员");
            }
        }
    });

}

//#endregion 登录   
