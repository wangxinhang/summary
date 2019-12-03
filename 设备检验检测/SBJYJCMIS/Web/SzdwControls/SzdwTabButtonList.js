//数据表扩展按钮组对象SzdwTabButtonList
/// <reference path="../jquery-1.11.1.js" />
/// <reference path="../EventUtil.js" />
/// <reference path="SzdwCommon.js" />

//#region 按钮组对象SzdwTabButtonList
function SzdwTabButtonList(position, x, y,height) {
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
    this.panel.style.padding = "0";
    this.panel.style.margin = "0";
    this.panel.style.position = (position == null) ? "absolute" : position;  

    this.panelCssName = null;
    this.panelCssJson = { "font-family": "微软雅黑", "font-size": "small"}; //, "width": 100
    if (height && height > 0) { $(this.panel).innerHeight(height); }

    //数据
    this.btnJsonList = null;//按钮的相关数据:比如[{Text:"编辑",Value:0,Image:"../Image/Modify.png",Title:"编辑",FnClick:ModifyClick,FnParams:params,CssJson:cssJson}]
    this.selectedText = "";
    this.selectedValue = 0;

    //按钮
    this.arrButton = new Array();//创建后的按钮对象列表
    this.seperateLineColor = "#888888"; //按钮间的分割线颜色
    this.btnWidth = 0; //按钮宽度
    this.btnMinWidth = 70; //按钮宽度
    this.btnHeight = 25; //按钮高度
    this.btnCssName = null;
    this.btnCssJson = { "position": "relative", "float": "left", "text-align": "center", "margin-left": "10px", "padding": "0px 5px 0px 5px", "border": "1px solid #D0D0D0", "background-color": "transparent", "color": "black", "cursor": "pointer" };
    this.btnHoverCssName = null;
    this.btnHoverCssJson = { "background-color": "#E0E0E0","border": "1px solid #D0D0D0","color": "black"};
    this.btnSelectedCssName = null;
    this.btnSelectedCssJson = { "position": "relative", "float": "left", "margin-left": "10px", "border": "1px solid #017BBA", "background-color": "#017BBA", "color": "white", "cursor": "pointer" };
    this.btnSelectedHoverCssName = null;
    this.btnSelectedHoverCssJson = { "border": "1px solid #017BBA", "background-color": "#017BBA", "color": "white" };

    this.btnImageWidth = this.btnHeight;
    this.btnImageHeight = this.btnHeight;    
    this.btnImageCssName = null;
    this.btnImageCssJson = null;

    this.btnTextCssName = null;
    this.btnTextCssJson = { "text-align": "center"};

    this.selectedButton = null;

    //事件
    this.fnInitial = null; //初始化函数
}
//#endregion 对象SzdwTabButtonList

//#region 载入
SzdwTabButtonList.prototype.Load = function () {
    //载入父容器
    this.AppendToNamingContainer();

    //设置相关属性
    this.CreateButtonList();
    this.SetPanel();
    this.SetPosition(this.x,this.y);
}

//将SzdwTabButtonList加入父容器
SzdwTabButtonList.prototype.AppendToNamingContainer = function () {
    var p = this.panel;
    var nc = this.namingContainer;
    if (nc != null && $(p).parent().length == 0) {
        $(p).appendTo(nc);
    }
}

//显示SzdwTabButtonList
SzdwTabButtonList.prototype.Show = function () {
    $(this.panel).fadeIn();
}

//隐藏SzdwTabButtonList
SzdwTabButtonList.prototype.Hide = function () {
    $(this.panel).fadeOut();
}

//隐藏SzdwTabButtonList
SzdwTabButtonList.prototype.SetPosition = function (x, y) {
    var nc = this.namingContainer;    
    var p = this.panel;
    $(p).css({ "left": x, "top": y });
}
//#endregion 载入

//#region 创建
//创建按钮
SzdwTabButtonList.prototype.CreateButtonList = function () {
    var data = this.btnJsonList;
    var minWidth = this.btnWidth > 0 ? 0 : this.btnMinWidth;
        
    //创建文字及图标组合按钮
    if (data != null) {
        var len = data.length;
        for (var i = 0; i < len; i++) {
            var jd = data[i];
            var btn = this.CreateButton(jd);
            $(btn).data("index", i);
            $(this.panel).append(btn);

            var btnImg = $(btn).find("#btnImg");
            var btnTxt = $(btn).find("#btnTxt");
            var iw = $(btnImg).outerWidth() ? $(btnImg).outerWidth() : 0;
            if (btnTxt) {
                var tw = $(btnTxt).outerWidth();
                var bw = iw + tw;
                if (bw < minWidth) {
                    $(btnTxt).outerWidth(minWidth - iw);
                } else {
                    $(btnTxt).width(bw - iw);
                    $(btn).width(bw);
                }
            }

            //按钮对象写入对象数组
            this.arrButton.push(btn);
        }
    }
}

//创建按钮
SzdwTabButtonList.prototype.CreateButton = function (jsonData) {
    var width = this.btnWidth;
    var minWidth = this.btnMinWidth;
    var height = this.btnHeight;
    var imageWidth = this.btnImageWidth;
    var imageHeight = this.btnImageHeight;
    var cssName = this.btnCssName;
    var cssJson = this.btnCssJson;
    var hoverCssJson = this.btnHoverCssJson;
    var selectedCssJson = this.btnSelectedCssJson;
    var btnTextCssName = this.btnTextCssName;
    var btnTextCssJson = this.btnTextCssJson;
    var slc = this.seperateLineColor;
    var paramCssJson = jsonData.CssJson;

    //按钮外框
    var btn = document.createElement("div");
    if (jsonData.Title) { btn.title = jsonData.Title; }
    if (cssName) { this.SetStyleByCssName(btn, cssName); }
    if (cssJson) { this.SetStyleByCssJson(btn, cssJson); }
    $(btn).height(height);
    $(btn).css({ "line-height": height + "px" });

    if (this.direction == 0) {
        $(btn).css({ "float": "left" });
    }

    if (paramCssJson) { $(btn).css(paramCssJson); }

    //按钮值value
    var value = jsonData.Value;
    if (value) {
        $(btn).data("value", value);
    }

    //按钮图标
    var image = jsonData.Image;
    if (image) {
        var btnImg = document.createElement("div");
        btnImg.id = "btnImg";
        $(btnImg).outerWidth(imageWidth);
        $(btnImg).outerHeight(imageHeight);

        var img = image ? image.toString().replace("~", "..") : "";
        var backImg = "url(" + img + ") no-repeat center";
        $(btnImg).css({ "float": "left", "background": backImg, "border-left": "0px solid blue" });
        $(btn).append(btnImg);
    }

    //按钮文字
    var text = jsonData.Text;
    if (text) {
        var txt = document.createElement("div");
        txt.id = "btnTxt";
        $(txt).text(text);
        if (btnTextCssName) { this.SetStyleByCssName(txt, btnTextCssName); }
        if (btnTextCssJson) { this.SetStyleByCssJson(txt, btnTextCssJson); }
        $(txt).outerHeight(height);
        $(txt).css({ "line-height": height + "px" });

        var btnImg = $(btn).find("#btnImg");
        var iw = $(btnImg).outerWidth() ? $(btnImg).outerWidth() : 0;
        if (width > 0) { $(txt).outerWidth(width - iw); }

        if (this.imageTextMode == 0) {
            $(txt).css({ "float": "left" });
        }
        $(btn).append(txt);
    }

    //绑定单击事件
    var fn = jsonData.FnClick;
    var szdwCtrl = this;
    $(btn).mouseover(function () {
        if (hoverCssJson) { $(this).css(hoverCssJson); }
    }).mouseleave(function () {
        if ($(this).data("Selected") == "true") {
            if (selectedCssJson) { $(this).css(selectedCssJson); }
        } else {
            if (cssName) { szdwCtrl.SetStyleByCssName(this, cssName); }
            if (cssJson) { szdwCtrl.SetStyleByCssJson(this, cssJson); }
        }
    }).click(function () {
        szdwCtrl.selectedText = text;
        szdwCtrl.selectedValue = value;

        //设置选中样式
        var selectedButton = szdwCtrl.selectedButton;
        if (selectedButton) {
            $(selectedButton).data("Selected", "");
            var oldCssName = $(selectedButton).data("cssName");
            var oldCssJson = $(selectedButton).data("cssJson");

            if (oldCssName) { szdwCtrl.SetStyleByCssName(selectedButton, oldCssName); }
            if (oldCssJson) { szdwCtrl.SetStyleByCssJson(selectedButton, oldCssJson); }
        }

        //设置选中按钮
        $(this).data("text", text).data("value", value);
        szdwCtrl.SetSelectedButton(this);

        //回调函数
        if (typeof (fn) == "function") { fn(); }
    });

    return btn;
}

// 设置选中按钮
SzdwTabButtonList.prototype.SetSelectedButton = function (btn) {
    var cssName = this.btnCssName;
    var cssJson = this.btnCssJson;
    var selectedCssJson = this.btnSelectedCssJson;

    $(btn).data("Selected", "true");
    if (cssName) { $(btn).data("cssName", cssName); }
    if (cssJson) { $(btn).data("cssJson", cssJson); }
    if (selectedCssJson) { $(btn).css(selectedCssJson); }
    this.selectedButton = btn;
	//2017-7-31
    this.selectedValue = $(btn).data("value");
}

//#endregion 创建

//#region 设置样式
//设置Panel
SzdwTabButtonList.prototype.SetPanel = function () {
    var p = this.panel;
    if (this.panelCssName != null) { this.SetStyleByCssName(p, this.panelCssName); }
    if (this.panelCssJson != null) { this.SetStyleByCssJson(p, this.panelCssJson); }
}

//根据CssName设置样式
SzdwTabButtonList.prototype.SetStyleByCssName = function (element, cssName) {
    if (cssName) { $(element).addClass(cssName); }
}

//根据CssJson设置样式
SzdwTabButtonList.prototype.SetStyleByCssJson = function (element, cssJson) {
    if (cssJson ) { $(element).css(cssJson); }
}

//重置样式
SzdwTabButtonList.prototype.Reset = function () {
    var arrButton = this.arrButton;
    var len = arrButton.length;
    var cssName = this.btnCssName;
    var cssJson = this.btnCssJson;

    for (var i = 0; i < len; i++) {
        var btn = arrButton[i];
        if (cssName) { this.SetStyleByCssName(btn, cssName); }
        if (cssJson) { this.SetStyleByCssJson(btn, cssJson); }
    }

    var selectedButton = this.selectedButton;
    var selectedCssName = this.btnSelectedCssName;
    var selectedCssJson = this.btnSelectedCssJson;
    if (selectedCssName) { this.SetStyleByCssName(selectedButton, selectedCssName); }
    if (selectedCssJson) { this.SetStyleByCssJson(selectedButton, selectedCssJson); }
}
//#endregion 设置样式