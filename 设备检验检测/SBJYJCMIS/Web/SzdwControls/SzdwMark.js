/// <reference path="domCommon.js" />
/// <reference path="../jquery-1.11.1.js" />
//引用颜色转换JS
//document.write("<script language=javascript src='domCommon.js'></script>");

//#region 控件标记面板：SzdwMark
function SzdwMark(position, x, y, width, height) {
    //#region 通用属性
    this.namingContainer = document.body; //命名容器即父容器
    this.position = position ? position : "absolute";
    this.x = x ? x : 0; //坐标x
    this.y = y ? y : 0; //坐标x
    this.width = width ? width : 0; //宽度
    this.height = height ? height : 0; //高度
    this.backColor = "";
    this.backOpacity = 1;
    this.targetControl = null; //目标对象
    this.showMode = 0; //显隐模式,0:淡入淡出；1:右滑显示、左滑隐藏;2:左滑显示、右滑隐藏;3：下滑显示、上滑隐藏;4：上滑显示、下滑隐藏;
    this.showSpeed = 100; //显隐速度：毫秒
    this.positionMode = 1; //相对于targetControl的位置模式：0/leftInside:内部左边；1/rightInside:内部右边；2/above:上面；3/below:下面；4/left:左面；5/right:右面；
    this.status = 0; //参数status:0-loading,1-success
    //#endregion 通用属性
        
    //#region 标记
    this.panel = document.createElement("div");
    this.imageJson = { loadingImage: "SzdwControls/Image/refresh.gif", successImage: "SzdwControls/Image/correct21g3.png" };    
    this.panelCssName = null;
    this.panelCssJson = { "display": "none" };
    //#endregion 标记

    //#region 初始化函数
    this.fnInitial=null;
    //#endregion 初始化函数
}
//#endregion 控件标记面板：SzdwMark

//#region 加载
SzdwMark.prototype.Load = function () {   
    this.Create();
    this.Show();
}

//将SzdwMark加入父容器
SzdwMark.prototype.AppendToNamingContainer = function () {
    var p = this.panel;
    var nc = this.namingContainer;
    if (nc != null && $(p).parent().length == 0) {
        $(p).appendTo(nc);
    }
}

//创建
SzdwMark.prototype.Create = function () {   
    this.SetPanel();
    this.SetMark();

    //载入父容器
    this.AppendToNamingContainer();
}

//#endregion 加载

//#region 显示隐藏
//显示控件标记面板
SzdwMark.prototype.Show = function () {
    var m = this.showMode;
    var s = this.showSpeed;
    var p = this.panel;
    switch (m) {
        case 1:
            $(p).css({ "display": "block" }).outerWidth(0);
            $(p).find("div").css({ "display": "block" });
            $(p).animate({ left: this.x, width: this.width }, s);
            break;
        case 2:
            $(p).css({ "display": "block", "left": this.x + this.width }).outerWidth(0);
            $(p).find("div").css({ "display": "block" });
            $(p).animate({ left: this.x, width: this.width }, s);
            break;
        case 3:
            $(p).slideDown(s);
            break;
        case 4:
            $(p).css({ "display": "block", "top": this.y + this.height}).outerHeight(0);
            $(p).find("div").css({ "display": "block" });
            $(p).animate({ top: this.y, height: this.height }, s);
            break;
        default:
            $(p).fadeIn(s);
            break;
    }
}

//隐藏控件标记面板
SzdwMark.prototype.Hide = function () {
    var m = this.showMode;
    var s = this.showSpeed;
    var p = this.panel;
    var fnCallBack = function () { $(p).find("div").css({ "display": "none" }); }
    switch (m) {
        case 1:
            $(p).animate({ left: this.x, width: 0 }, s, null, fnCallBack);
            break;
        case 2:
            $(p).animate({ left: this.x + this.width, width: 0 }, s, null, fnCallBack);
            break;
        case 3:
            $(p).slideUp(s);
            break;
        case 4:
            $(p).animate({ top: this.y + this.height, height: 0 }, s, null, fnCallBack);
            break;
        default:
            $(p).fadeOut(s);
            break;
    }
}
//#endregion 显示隐藏

//#region 容器面板
//设置容器面板
SzdwMark.prototype.SetPanel = function () {
    var p = this.panel;
    var cssName = this.panelCssName;
    var cssJson = this.panelCssJson;

    //基本样式
    this.SetStyleByCssName(p, cssName);
    this.SetStyleByCssJson(p, cssJson);

    //位置尺寸
    var t = this.targetControl;
    if (t) {
        this.x = this.GetX();
        this.y = this.GetY();
        this.width = this.GetWidth();
        this.height = this.GetHeight();
    }
    var x = this.x;
    var y = this.y;
    var w = this.width;
    var h = this.height;
    this.SetPosition(x, y);
    this.SetSize(w, h);
//    domCommon.showTestInfo("x:" + x + ", y:" + y + ", w:" + w + ", h:" + h + ", nc:" + $(this.panel).parent()[0]);
    //底色与透明度
    domCommon.SetOpacity(p, this.backColor, this.backOpacity);
}

//获取x
SzdwMark.prototype.GetX = function () {
    var t = this.targetControl;
    var m = this.positionMode;
    var tx = $(t).offset().left;
    var tw = $(t).outerWidth();
    var w = this.GetWidth();
    var x = 0;
    m = m.constructor == String ? m.toUpperCase() : m;
    switch (m) {
        case 1: case "RIGHTINSIDE":
            x = tx + tw - w;
            break
        case 4: case "LEFT":
            x = tx - w;
            break;
        case 5: case "RIGHT":
            x = tx + tw;
            break;
        default:
            x = tx;
            break;
    }

    return x;
}

//获取y 
SzdwMark.prototype.GetY = function () {
    var t = this.targetControl;
    var m = this.positionMode;
    var ty = $(t).offset().top;
    var th = $(t).outerHeight();
    var h = this.GetHeight();
    var y = 0;
    m = m.constructor == String ? m.toUpperCase() : m;
    switch (m) {
        case 2: case "ABOVE":
            y = ty - h;
            break
        case 3: case "BELOW":
            y = ty + th;
            break;
        default:
            y = ty;
            break;
    }

    return y;
}

//获取高度 0/leftInside:内部左边；1/rightInside:内部右边；2/above:上面；3/below:下面；4/left:左面；5/right:右面；
SzdwMark.prototype.GetWidth = function () {
    var t = this.targetControl;
    var m = this.positionMode;
    var tw = $(t).outerWidth();
    var th = $(t).outerHeight();
    var w = this.width ? this.width : th;

    m = m.constructor == String ? m.toUpperCase() : m;
    switch (m) {
        case 2: case "ABOVE": case 3: case "BELOW":
            w = tw;
            break
    }

    return w;
}
//获取高度 0/leftInside:内部左边；1/rightInside:内部右边；2/above:上面；3/below:下面；4/left:左面；5/right:右面；
SzdwMark.prototype.GetHeight = function () {
    var t = this.targetControl;
    var m = this.positionMode;
    var th = $(t).outerHeight();
    var h = this.height ? this.height : th;

    m = m.constructor == String ? m.toUpperCase() : m;
    switch (m) {
        case 0: case "LEFTINSIDE": case 1: case "RIGHTINSIDE":
            h = th;
            break       
    }

    return h;
}

//定位
SzdwMark.prototype.SetPosition = function (x, y) {
    var p = this.panel;
    var position = this.position;
    $(p).css({ "position": position, "left": x, "top": y });
}

//尺寸
SzdwMark.prototype.SetSize = function (width,height) {
    var p = this.panel;
    $(p).outerWidth(width).outerHeight(height);
}

//设置Mark,参数status:0-loading,1-success
SzdwMark.prototype.SetMark = function () {
    var status = this.status;
    var p = this.panel;
    var img = status ? this.imageJson.successImage : this.imageJson.loadingImage;
    var backImg = "url(" + img + ") no-repeat center";
    $(p).css({ "background": "" }).css({ "background": backImg });
}
//#endregion 容器面板

//#region 设置样式
//根据CssName设置样式
SzdwMark.prototype.SetStyleByCssName = function (element, cssName) {
    if (cssName) { $(element).addClass(cssName); }
}

//根据CssJson设置样式
SzdwMark.prototype.SetStyleByCssJson = function (element, cssJson) {
    if (cssJson) { $(element).css(cssJson); }
}
//#endregion 设置样式

//#region 扩展函数加载到目标对象
//paramJson:json格式参数:{imageJson:imageJson,positionMode:positionMode,showMode:showMode,showSpeed:showSpeed,backColor:backColor,backOpacity:backOpacity,fnInitial:fnInitial,}
$.fn.extend({
    attachMark: function (paramJson) {
        //创建实例
        var c = this;
        $(c).focus(function () {
            if (!c.mark) {
                c.mark = new SzdwMark();
                c.mark.targetControl = c;

                //#region 获取参数
                if (paramJson) {
                    if (paramJson.imageJson) {
                        c.mark.imageJson = paramJson.imageJson;
                    }

                    if (paramJson.positionMode) {
                        c.mark.positionMode = paramJson.positionMode;
                    }

                    if (paramJson.showMode) {
                        c.mark.showMode = paramJson.showMode;
                    }

                    if (paramJson.showSpeed) {
                        c.mark.showSpeed = paramJson.showSpeed;
                    }

                    if (paramJson.backColor) {
                        c.mark.backColor = paramJson.backColor;
                    }
                    if (paramJson.backOpacity) {
                        c.mark.backOpacity = paramJson.backOpacity;
                    }

                    if (paramJson.fnInitial) {
                        c.mark.fnInitial = paramJson.fnInitial;
                    }
                }
                //#endregion 获取参数

                c.mark.Create();               
                $(c).data("mark", c.mark);
            }
        });
    }
});
//#endregion 扩展函数加载到目标对象
