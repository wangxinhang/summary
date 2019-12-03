//数据表扩展按钮组对象SzdwButtonGroup
/// <reference path="../jquery-1.11.1.js" />
/// <reference path="../EventUtil.js" />
/// <reference path="SzdwCommon.js" />

//#region 按钮组对象SzdwButtonGroup
function SzdwButtonGroup(position, x, y,height) {
    this.position = position;
    this.x = x;
    this.y = y;
    this.height = height;
    this.namingContainer = null; //命名容器，即父容器
    this.targetControl = null; //与之关联的目标控件
    this.btnMode = 0; //按钮模式,0：纯文字，1：纯图标，2：图文混排
    this.direction = 0; //按钮组排列方向,0：水平排列(默认），1：垂直方向
    this.imageTextMode = 0; //按钮中图和文字的组合模式,0：水平排列(默认），1：垂直方向
    this.backgroundColor = "black";//控件背景色
    this.opacity = 0.7; //控件背景色透明度   
    
    //外框
    this.panel = document.createElement("div");
    this.panel.style.overflow = "hidden";
    this.panel.style.display = "none";
    this.panel.style.padding = "0";
    this.panel.style.margin = "0";
    this.panel.style.position = (position == null) ? "absolute" : position;  

    this.panelCssName = null;
    this.panelCssJson = { "font-family": "微软雅黑", "font-size": "small"}; //, "width": 100
    $(this.panel).innerHeight(height);

    //数据
    this.arrBtn = new Array();
    this.arrBtnImage = new Array(); //按钮图标
    this.arrBtnText = new Array(); //按钮文字
    this.arrBtnFnClick = new Array(); //按钮对应函数
    this.btnJsonList = null; //按钮的相关数据:比如[{Text:"编辑",Image:"../Image/Modify.png",Title:"编辑",FnClick:ModifyClick,FnSetting:FnSetting}]

    //按钮样式
    this.seperateLineColor = "#888888"; //按钮间的分割线颜色
    this.btnHeight =this.height;//25按钮高度
    this.btnBoxCssName = null;
    this.btnBoxCssJson = null;
    this.btnTextCssName = null;
    this.btnTextCssJson = { "color": "black" };
    this.btnImageCssName = null;
    this.btnImageCssJson = null;
    this.btnImageWidth = 20;
    this.btnImageHeight = this.height;
    this.btnOpacity = 0.8;
    this.btnMouseOverOpacity = 1;

    //事件
    this.fnInitial = null; //初始化函数
}
//#endregion 对象SzdwButtonGroup

//#region 载入
SzdwButtonGroup.prototype.Load = function () {
    //载入父容器
    this.AppendToNamingContainer();

    //设置相关属性
    this.CreateButtonGroup();
    this.SetPanel();
    this.SetPosition(this.x,this.y);
    $(this.panel).fadeIn();
}

//将SzdwButtonGroup加入父容器
SzdwButtonGroup.prototype.AppendToNamingContainer = function () {
    var p = this.panel;
    var nc = this.namingContainer;
    if (nc != null && $(p).parent().length == 0) {
        $(p).appendTo(nc);
    }
}

//显示SzdwButtonGroup
SzdwButtonGroup.prototype.Show = function () {
    $(this.panel).fadeIn();
}

//隐藏SzdwButtonGroup
SzdwButtonGroup.prototype.Hide = function () {
    $(this.panel).fadeOut();
}

//隐藏SzdwButtonGroup
SzdwButtonGroup.prototype.SetPosition = function (x, y) {
    var nc = this.namingContainer;
    var t = this.targetControl;
    var p = this.panel;

    var ncw = $(nc).width();
    var tx = Math.floor($(t).position().left);
    var tw = Math.floor($(t).innerWidth());
    var w = $(p).innerWidth();

    var ox = ncw - x;
    var left = ox < w ? x - tw - w : x;
    $(p).css({ "left": left, "top": y });
}
//#endregion 载入

//#region 创建
//创建按钮
SzdwButtonGroup.prototype.CreateButtonGroup = function () {
    var data = this.btnJsonList;
    //创建文字及图标组合按钮
    if (data != null) {
        var len = data.length;
        for (var i = 0; i < len; i++) {
            var jd = data[i];
            var btn = this.CreateButton(jd);
            if (i == 0) {
                $(btn).css("border-width", "0");
            }
            this.arrBtn.push(btn);
            $(this.panel).append(btn);
        }
    }
}

//创建按钮
SzdwButtonGroup.prototype.CreateButton = function (jsonData) {
    var bh = this.btnHeight;
    var slc = this.seperateLineColor;
    //按钮外框
    var btn = document.createElement("div");
    btn.title = jsonData.Title ? jsonData.Title : jsonData.Text;
    $(btn).css({ "position": "relative", "height": bh, "line-height": bh + "px", "padding": "0px 3px 0px 3px" });
    if (this.direction == 0) {
        $(btn).css({ "float": "left", "border": "0px solid silver", "border-left": "1px solid " + slc });
    }

    //按钮图标
    var image = jsonData.Image;
    if (image) {
        var imageCssName = this.btnImageCssName;
        var imageCssJson = this.btnImageCssJson;
        var iw = this.btnImageWidth;
        var ih = this.btnImageHeight;

        var btnImage = document.createElement("div");
        btnImage.id = "btnImage";
        if (imageCssName) { this.SetStyleByCssName(btnImage, imageCssName); }
        if (imageCssJson) { this.SetStyleByCssJson(btnImage, imageCssJson); }
        $(btnImage).outerWidth(iw).outerHeight(ih);

        var img = image ? image.toString().replace("~", "..") : "";
        var backImg = "url(" + img + ") no-repeat center";
        $(btnImage).css({ "float": "left", "background": backImg, "border-left": "0px solid blue" });

        this.arrBtnImage.push(btnImage);
        $(btn).append(btnImage);
    }

    //按钮文字
    var text = jsonData.Text;
    if (text) {
        var txt = document.createElement("div");
        $(txt).text(text);
        if (this.btnTextCssName != null) { this.SetStyleByCssName(txt, this.btnTextCssName); }
        if (this.btnTextCssJson != null) { this.SetStyleByCssJson(txt, this.btnTextCssJson); }
        if (this.imageTextMode == 0) {
            $(txt).css({ "float": "left" });
        }
        $(txt).css({ "position": "relative" });

        this.arrBtnText.push(txt);
        $(btn).append(txt);
    }

    //设置坐标和透明度
    var top = Math.floor((this.height - bh) / 2);
    var op = this.btnOpacity;
    var moOp = this.btnMouseOverOpacity;
    $(btn).css({ "top": top, "opacity": op });


    //绑定单击事件
    var fn = jsonData.FnClick;
    var bg = this;
    $(btn).click(function () {
        if (fn) { fn(); }
    }).mouseover(function () {
        $(this).css({ "opacity": moOp });
    }).mouseleave(function () {
        $(this).css({ "opacity": op });
    });

    return btn;
}
//#endregion 创建

//#region 设置样式
//设置Panel
SzdwButtonGroup.prototype.SetPanel = function () {
    var p = this.panel;
    if (this.panelCssName != null) { this.SetStyleByCssName(p, this.panelCssName); }
    if (this.panelCssJson != null) { this.SetStyleByCssJson(p, this.panelCssJson); }
    domCommon.SetOpacity(p, this.backgroundColor, this.opacity);
}

//根据CssName设置样式
SzdwButtonGroup.prototype.SetStyleByCssName = function (element, cssName) {
    if (cssName != null) { $(element).addClass(cssName); }
}

//根据CssJson设置样式
SzdwButtonGroup.prototype.SetStyleByCssJson = function (element, cssJson) {
    if (cssJson != null) { $(element).css(cssJson); }
}
//#endregion 设置样式