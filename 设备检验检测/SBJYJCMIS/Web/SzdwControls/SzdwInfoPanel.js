/// <reference path="domCommon.js" />
/// <reference path="../jquery-1.11.1.js" />
//引用颜色转换JS
//document.write("<script language=javascript src='domCommon.js'></script>");

//#region 消息面板：SzdwInfoPanel
function SzdwInfoPanel(position, x, y, width, height) {
    //#region 通用属性
    this.namingContainer = document.body; //命名容器即父容器
    this.position = position ? position : "absolute";
    this.zIndex = 0;
    this.x = x ? x : 0; //坐标x
    this.y = y ? y : 0; //坐标x
    this.width = width ? width : 0; //宽度
    this.height = height ? height : 0; //高度
    this.backColor = "Red";
    this.backOpacity = 0.5;
    this.hasTitle = false;
    this.movable = true;
    this.targetControl = null; //目标对象
    this.hasImage = true;//是否有指示性的图片
    this.showing = false;//当前显示状态
    this.showMode = 0; //显隐模式,0:淡入淡出；1:右滑显示、左滑隐藏;2:左滑显示、右滑隐藏;3：下滑显示、上滑隐藏;4：上滑显示、下滑隐藏;
    this.showSpeed = 300; //显隐速度：毫秒
    this.positionMode = 1; //相对于targetControl的位置模式：-1/自由控制;0/leftInside:内部左边；1/rightInside:内部右边；2/above:上面；3/below:下面；4/left:左面；5/right:右面；
    this.hideDelayTime = 800;
    this.fnHideCallBack = null;
    //#endregion 通用属性

    //#region 外框
    this.panel = document.createElement("div");
    this.panelCssName = null;
    this.panelCssJson = { "font-family": "微软雅黑", "font-size": "small", "display": "none", "color": "White"};
    //#endregion 外框

    //#region 标题
    this.title = null;
    this.titleWidth = 0;
    this.titleHeight = 32;
    this.titleColor = "White";
    this.titleText = "";
    this.titleCssName = null;
    this.titleCssJson = { "font-family": "微软雅黑", "fontSize": "11pt", "cursor": "default", "padding": "0px 5px 0px 5px" };
    //#endregion 标题

    //#region 关闭按钮
    this.btnClose = null;
    this.btnCloseWidth = this.titleHeight;
    this.btnCloseHeight = this.titleHeight;
    this.btnCloseImage = "/SzdwControls/image/infoPanel/cross16.png";
    this.btnCloseMouseOverBackColor = "RGB(220,0,0)"; //"Red";
    this.btnCloseMouseLeaveBackColor = "transparent";
    this.fnClose = null;
    //#endregion 关闭按钮

    //#region 图片
    this.image = null;
    this.imageUrl = "SzdwControls/image/infoPanel/warnning21w2.png"; 
    this.imageWidth = 25;
    this.imageHeight = this.height;
    this.imageCssName = null;
    this.imageCssJson = { "margin-left": 5 };
    //#endregion 图片

    //#region 内容层
    this.content = null;
    this.contentText = "";
    this.contentWidth = 0;
    this.contentHeight = 0;
    this.contentCssName = null;
    this.contentCssJson = { "font-family": "微软雅黑", "fontSize": "10pt", "padding": "0px 5px 0px 5px", "cursor": "default" };
    //#endregion 图片
    
    //#region 初始化函数
    this.fnInitial=null;
    //#endregion 初始化函数
}
//#endregion 消息面板：SzdwInfoPanel

//#region 加载
SzdwInfoPanel.prototype.Load = function () {   
    this.Create();
    this.Show();
}

//刷新
SzdwInfoPanel.prototype.Refresh = function () {
    $(this.panel).hide();

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
    this.SetPosition(this.x, this.y);
    this.SetSize(this.width, this.height);

    if (this.hasTitle) {
        this.SetTitle();
        this.UpdateTitle();
    }
    
    if (this.image) { this.SetImage(); }
    //this.SetContent();
    this.UpdateContent();
    this.Show();
}

//将SzdwInfoPanel加入父容器
SzdwInfoPanel.prototype.AppendToNamingContainer = function () {
    var p = this.panel;
    var nc = this.namingContainer;
    if (nc != null && $(p).parent().length == 0) {
        $(p).appendTo(nc);
    }
}

//创建
SzdwInfoPanel.prototype.Create = function () {   
    this.SetPanel();
    this.CreateTitle();
    this.CreateBtnClose();
    this.CreateImage();
    this.CreateContent();

    //载入父容器
    this.AppendToNamingContainer();
}

//#endregion 加载

//#region 获取ZIndex
SzdwInfoPanel.prototype.GetZIndex = function () {
    var c = this.namingContainer;
    var zIndex = domCommon.getMaxZIndex(c);
    if (this.zIndex <= 0) {
        this.zIndex = zIndex < 1 ? 1 : zIndex;
    }
}

//#endregion 获取ZIndex

//#region 显示隐藏

//显示消息面板
SzdwInfoPanel.prototype.Show = function () {
    var m = this.showMode;
    var s = this.showSpeed;
    var p = this.panel;
    if (!this.showing) {
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
                $(p).css({ "display": "block", "top": this.y + this.height }).outerHeight(0);
                $(p).find("div").css({ "display": "block" });
                $(p).animate({ top: this.y, height: this.height }, s);
                break;
            default:
                $(p).fadeIn(s);
                break;
        }
        this.showing = true;
    }
}

//隐藏消息面板
SzdwInfoPanel.prototype.Hide = function () {
    var m = this.showMode;
    var s = this.showSpeed;
    var p = this.panel;
    if (this.showing) {
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
        this.showing = false;
    }
}

//快速淡入
SzdwInfoPanel.prototype.FastShow = function () {
    var p = this.panel;
    $(p).css("display", "block");
}

//延迟淡出
SzdwInfoPanel.prototype.DelayFadeOut = function () {
    var p = this.panel;
    var s = this.showSpeed;
    var fn = this.fnHideCallBack;
    $(p).css({ "background-image": "" });
    $(p).delay(this.hideDelayTime).fadeOut(s,null,fn);
}
//#endregion 显示隐藏

//#region 容器面板

//设置容器面板
SzdwInfoPanel.prototype.SetPanel = function () {
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
SzdwInfoPanel.prototype.GetX = function () {
    var t = this.targetControl;
    var m = this.positionMode;
    var tx = $(t).offset().left;
    var tw = $(t).outerWidth();
    var w = this.GetWidth();
    var x = 0;
    m = m.constructor == String ? m.toUpperCase() : m;
    switch (m) {
        case -1:
            x = this.x;
            break;
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
SzdwInfoPanel.prototype.GetY = function () {
    var t = this.targetControl;
    var m = this.positionMode;
    var ty = $(t).offset().top;
    var th = $(t).outerHeight();
    var h = this.GetHeight();
    var y = 0;
    m = m.constructor == String ? m.toUpperCase() : m;
    switch (m) {
        case -1:
            y = this.y;
            break;
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

    return this.y ? this.y : y;
}

//获取高度 0/leftInside:内部左边；1/rightInside:内部右边；2/above:上面；3/below:下面；4/left:左面；5/right:右面；
SzdwInfoPanel.prototype.GetWidth = function () {
    var t = this.targetControl;
    var m = this.positionMode;
    var tw = $(t).outerWidth();
    var w = this.width ? this.width : Math.round(tw / 2);

    m = m.constructor == String ? m.toUpperCase() : m;
    switch (m) {
        case 2: case "ABOVE": case 3: case "BELOW":
            w = tw;
            break
    }

    return w;
}
//获取高度 0/leftInside:内部左边；1/rightInside:内部右边；2/above:上面；3/below:下面；4/left:左面；5/right:右面；
SzdwInfoPanel.prototype.GetHeight = function () {
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
SzdwInfoPanel.prototype.SetPosition = function (x, y) {
    var p = this.panel;
    var position = this.position;
    $(p).css({ "position": position, "left": x, "top": y });
}

//尺寸
SzdwInfoPanel.prototype.SetSize = function (width,height) {
    var p = this.panel;
    $(p).outerWidth(width).outerHeight(height);
}
//#endregion 容器面板

//#region 标题层
SzdwInfoPanel.prototype.CreateTitle = function () {
    if (this.hasTitle) {
        //创建标题层
        var e = document.createElement("div");
        e.style.color = this.titleColor;
        e.style.position = "relative";

        //设置标题文字( 自动省略）
        e.style.lineHeight = this.titleHeight + "px";
        e.style.textOverflow = "ellipsis";
        e.style.whiteSpace = "nowrap";
        e.style.overflow = "hidden";

        //拖动
        if (this.movable) {
            e.onmousemove = function () { MoveSzdwCtrl(this); };
        }
        $(e).appendTo(this.panel);

        this.title = e;

        //设置
        this.SetTitle();
    }
}

//设置标题
SzdwInfoPanel.prototype.SetTitle = function () {    
    var pw = $(this.panel).width();
    var x = 0;
    var y = 0;
    var w = this.GetTitleWidth();
    var h = this.titleHeight;
    var text = this.titleText;
    var cssName = this.titleCssName;
    var cssJson = this.titleCssJson;

    var e = this.title;
    e.title = text;
    this.SetStyleByCssName(e, cssName);
    this.SetStyleByCssJson(e, cssJson);
    $(e).outerWidth(w).outerHeight(h).css({ "left": x, "top": y}).text(text);
}

//获取Title宽度
SzdwInfoPanel.prototype.GetTitleWidth = function () {
    var w = $(this.panel).width() - this.btnCloseWidth;
    this.titleWidth = w;
    return w;
}

//更新载入新标题文字
SzdwInfoPanel.prototype.UpdateTitle = function () {
    $(this.title).text(this.titleText);
}
//#endregion 标题层

//#region 关闭按钮
SzdwInfoPanel.prototype.CreateBtnClose = function () {
    if (this.hasTitle) {
        var img = this.btnCloseImage;
        var overBc = this.btnCloseMouseOverBackColor;
        var leaveBc = this.btnCloseMouseLeaveBackColor;

        var e = document.createElement("div");
        e.style.position = "absolute";
        e.style.overflow = "hidden";
        e.style.cursor = "hand";

        $(e).css("background", "url(" + img + ") no-repeat center");
        e.onmouseover = function () { this.style.backgroundColor = overBc; };
        e.onmouseout = function () { this.style.backgroundColor = leaveBc; };

        var pw = this;
        e.onclick = function () { pw.Hide(); if (typeof (fnColse) == "function") fnColse(); };

        $(e).appendTo(this.panel);
        this.btnClose = e;

        //设置
        this.SetBtnClose();
    }
}

//设置关闭按钮
SzdwInfoPanel.prototype.SetBtnClose = function () {    
    var w = this.btnCloseWidth;
    var h = this.btnCloseHeight;
    var x = this.width - w;
    var y = 0;

    var e = this.btnClose;
    $(e).outerWidth(w).outerHeight(h).css({ "position": "absolute", "left": x, "top": y});
}
//#endregion 关闭按钮

//#region 图片层
SzdwInfoPanel.prototype.CreateImage = function () {
    if (this.hasImage) {
        var imgUrl = this.imageUrl;
        if (imgUrl) {
            //创建标题层
            var e = document.createElement("div");
            e.style.position = "absolute";
            $(e).appendTo(this.panel);
            this.image = e;

            //设置
            this.SetImage();
        }
    }
}

//设置标题
SzdwInfoPanel.prototype.SetImage = function () {
    var e = this.image;
    if (this.hasImage) {
        $(e).show();
        var x = 0;
        var y = this.hasTitle ? this.titleHeight : 0;
        var w = this.imageWidth ? this.imageWidth : this.GetHeight();
        var h = this.imageHeight ? this.imageHeight : this.GetHeight();
        var cssName = this.imageCssName;
        var cssJson = this.imageCssJson;
        this.SetStyleByCssName(e, cssName);
        this.SetStyleByCssJson(e, cssJson);
        $(e).outerWidth(w).outerHeight(h).css({ "left": x, "top": y });

        var img = this.imageUrl;
        var backImg = "url(" + img + ") no-repeat center";
        $(e).css({ "background": backImg });
    } else {
        $(e).hide();
    }
}
//#endregion 图片层

//#region 创建内容页面层
SzdwInfoPanel.prototype.CreateContent = function () {
    //创建iframe
    var e = document.createElement("div");
    e.style.position = "absolute";

    //设置文字( 自动省略）
    e.style.textOverflow = "ellipsis";
    e.style.whiteSpace = "nowrap";
    e.style.overflow = "hidden";

    $(e).appendTo(this.panel);
    this.content = e;

    //设置
    this.SetContent();
}

//设置内容页面层
SzdwInfoPanel.prototype.SetContent = function () {
    var iw = this.image ? $(this.image).outerWidth() : 0;
    var x = iw;
    var y = this.hasTitle ? this.titleHeight : 0;
    var w = this.GetContentWidth();
    var h = this.GetContentHeight();
    var text = this.contentText;
    var cssName = this.contentCssName;
    var cssJson = this.contentCssJson;

    var e = this.content;
    e.title = text;
    this.SetStyleByCssName(e, cssName);
    this.SetStyleByCssJson(e, cssJson);
    $(e).outerWidth(w).outerHeight(h).css({ "left": x, "top": y, "line-height": h + "px" }).text(text);
}

//获取Content宽度
SzdwInfoPanel.prototype.GetContentWidth = function () {
    var iw = this.image ? this.imageWidth : 0;
    var w = $(this.panel).width() - iw;
    this.contentWidth = w;
    return w;
}

//获取Content宽度
SzdwInfoPanel.prototype.GetContentHeight = function () {
    var th = this.hasTitle ? this.titleHeight : 0;
    var h = $(this.panel).height() - th;
    this.contentHeight = h;
    return h;
}

//更新Content文字
SzdwInfoPanel.prototype.UpdateContent = function () {
    $(this.content).text(this.contentText);
}
//#endregion 创建内容层

////#region 拖动
////设置弹窗的移动事件（通过标题栏）
//function MoveSzdwCtrl(dragObj) {
//    if (dragObj[0]) dragObj = $(dragObj)[0]; //兼容Js和jQuery
//    if (dragObj) {
//        dragObj.onmousedown = function () { mousedown(event, this) };
//        dragObj.onmouseup = function () { mouseup(this) };
//    }
//}

//////====================以下为弹窗拖曳代码====================////
//var posX;
//var posY;
//var ppDiv;
//var curDragObj;
////按下鼠标
//function mousedown(e, obj) {
//    e = e ? e : window.event ? event : null;
//    if (obj[0]) obj = $(obj)[0];
//    if (obj) {
//        curDragObj = obj;
//        obj.style.cursor = "move";
//        ppDiv = obj.parentNode;
//        posX = e.clientX - parseInt(ppDiv.style.left);
//        posY = e.clientY - parseInt(ppDiv.style.top);
//        document.onmousemove = mousemove;
//    }
//}

//function mouseup(obj) {
//    if (obj[0]) obj = $(obj)[0];
//    if (obj) obj.style.cursor = "default";
//}

////鼠标拖曳
//function mousemove(e) {
//    e = e ? e : window.event ? event : null;
//    ppDiv.style.left = (e.clientX - posX) + "px";
//    ppDiv.style.top = (e.clientY - posY) + "px";
//    var ppBox = document.getElementById("ppBox");
//    if (ppBox) {
//        ppBox.style.left = (e.clientX - posX) + "px";
//        ppBox.style.top = (e.clientY - posY) + "px";
//    }
//}

////松开鼠标
//document.onmouseup = function () {
//    document.onmousemove = null;
//    if (curDragObj) curDragObj.style.cursor = "default";
//}

////#endregion 拖动

//#region 设置样式
//根据CssName设置样式
SzdwInfoPanel.prototype.SetStyleByCssName = function (element, cssName) {
    if (cssName) { $(element).addClass(cssName); }
}

//根据CssJson设置样式
SzdwInfoPanel.prototype.SetStyleByCssJson = function (element, cssJson) {
    if (cssJson) { $(element).css(cssJson); }
}
//#endregion 设置样式

//#region 扩展函数加载到目标对象

//paramJson:json格式参数:{x:x,y:y,width:width;height:height;imageUrl:imageUrl,contentText:contentText,positionMode:positionMode,showMode:showMode,showSpeed:showSpeed,
//                        backColor:backColor,backOpacity:backOpacity,fnInitial:fnInitial}
$.fn.extend({
    attachInfoPanel: function (paramJson) {
        //创建实例
        var c = this;
        //$(c).focus(function () {
            if (!c.infoPanel) {
                c.infoPanel = new SzdwInfoPanel();
                c.infoPanel.targetControl = c;

                //#region 获取参数
                if (paramJson) {
                    if (paramJson.x) {
                        c.infoPanel.x = paramJson.x;
                    }

                    if (paramJson.y) {
                        c.infoPanel.y = paramJson.y;
                    }

                    if (paramJson.width) {
                        c.infoPanel.width = paramJson.width;
                    }

                    if (paramJson.height) {
                        c.infoPanel.height = paramJson.height;
                    }

                    if (paramJson.imageUrl) {
                        c.infoPanel.imageUrl = paramJson.imageUrl;
                    }

                    if (paramJson.contentText) {
                        c.infoPanel.contentText = paramJson.contentText;
                    }

                    if (paramJson.positionMode) {
                        c.infoPanel.positionMode = paramJson.positionMode;
                    }

                    if (paramJson.showMode) {
                        c.infoPanel.showMode = paramJson.showMode;
                    }

                    if (paramJson.showSpeed) {
                        c.infoPanel.showSpeed = paramJson.showSpeed;
                    }

                    if (paramJson.backColor) {
                        c.infoPanel.backColor = paramJson.backColor;
                    }
                    if (paramJson.backOpacity) {
                        c.infoPanel.backOpacity = paramJson.backOpacity;
                    }

                    if (paramJson.fnInitial) {
                        c.infoPanel.fnInitial = paramJson.fnInitial(c.infoPanel);
                    }
                }
                //#endregion 获取参数

                c.infoPanel.Create();               
                $(c).data("infoPanel", c.infoPanel);
            }
        //});
    }
});
//#endregion 扩展函数加载到目标对象
