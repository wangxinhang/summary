//数据表扩展按钮对象SzdwButton
/// <reference path="../jquery-1.11.1.js" />
/// <reference path="../EventUtil.js" />
/// <reference path="SzdwCommon.js" />

//#region 按钮对象SzdwButton
function SzdwButton(position, x, y,width,height) {
    this.position = position;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.minWidth = 60;
    this.namingContainer = null; //命名容器，即父容器
    this.btnMode = 0; //按钮模式,0：纯文字，1：纯图标，2：图文混排
    this.imageTextMode = 0; //按钮中图和文字的组合模式,0：水平排列(默认），1：垂直方向
    this.opacity = 0.7; //控件背景色透明度
    this.hasSign = false;
    this.isToggle = false;
    this.toggleFlag = false;
    this.isDisplay = true;

    //按钮
    this.button = null;
    this.btnCssName = null;
    this.btnCssJson = { "position": "relative", "font-family": "微软雅黑", "font-size": "small","float": "left", "text-align": "center", "padding": "0px 2px 0px 2px", "border": "1px solid #D0D0D0", "background-color": "transparent", "color": "black", "cursor": "pointer" };
    this.btnHoverCssName = null;
    this.btnHoverCssJson = { "background-color": "#E0E0E0","border": "1px solid #D0D0D0","color": "black"};

    //按钮图片
    this.btnImage = null;
    this.image = null;
    this.imageWidth = this.height;
    this.imageHeight = this.height; 
    this.imageCssName = null;
    this.imageCssJson = null;
    this.imageToggle = null;

    //按钮文字
    this.btnText = null;
    this.text = "";
    this.textCssName = null;
    this.textCssJson = { "text-align": "center", "padding": "0px 1px 0px 1px" };
    this.textToggle = "";
    this.title = "";

    //按钮标识
    this.btnSign = null;
    this.signImage = "/SzdwControls/image/button/triangle.png";
    this.signWidth = 20;
    this.signHeight = this.height; 
    this.signCssName = null;
    this.signCssJson = { "text-align": "center" };
    this.signImageToggle =null;
    
    //事件
    this.fnInitial = null; //初始化函数
    this.fnClick = null;
}
//#endregion 按钮对象SzdwButton

//#region 载入
SzdwButton.prototype.Load = function () {
    //创建按钮
    this.CreateButton();

    //载入父容器
    this.AppendToNamingContainer();

    //设置相关属性
    this.SetPosition(this.x, this.y);

    //调整宽度
    this.ReviseWidth();
}

//将SzdwButton加入父容器
SzdwButton.prototype.AppendToNamingContainer = function () {
    var btn = this.button;
    var nc = this.namingContainer;
    if (nc != null && $(btn).parent().length == 0) {
        $(btn).appendTo(nc);
    }
}

//定位SzdwButton
SzdwButton.prototype.SetPosition = function (x, y) {
    var btn = this.button;
    $(btn).css({ "left": x, "top": y });
}

//修正SzdwButton宽度
SzdwButton.prototype.ReviseWidth = function () {
    var text = this.text;
    if (text && $.trim(text).length > 0) {
        if (this.minWidth > 0) { $(this.button).css({ "min-width": this.minWidth }); }

        var iw = $(this.btnImage).outerWidth(true);
        var sw = this.btnSign ? $(this.btnSign).outerWidth(true) : 0;
        var w = $(this.button).width() - iw - sw;
        if (this.width == 0) {
            $(this.btnText).css("min-width", w);
        } else {
            $(this.btnText).outerWidth(w);
        }
    } else {
        $(this.button).css({ "min-width": 0 });
    }
}
//#endregion 载入

//#region 显隐
//显示SzdwButton
SzdwButton.prototype.Show = function () {
    $(this.button).fadeIn();
}

//隐藏SzdwButton
SzdwButton.prototype.Hide = function () {
    $(this.button).fadeOut();
}

//#endregion 显隐

//#region 创建

//创建按钮
SzdwButton.prototype.CreateButton = function () {
    var width = this.width;
    var minWidth = this.minWidth;
    var height = this.height;
    var cssName = this.btnCssName;
    var cssJson = this.btnCssJson;
    var hoverCssJson = this.btnHoverCssJson;

    //按钮
    var btn = document.createElement("div");
    if (cssName) { this.SetStyleByCssName(btn, cssName); }
    if (cssJson) { this.SetStyleByCssJson(btn, cssJson); }
    if (width > 0) { $(btn).outerWidth(width); }
    if (height > 0) { $(btn).outerHeight(height); }
    $(btn).css({ "line-height": height + "px" });

    //鼠标悬停时提示信息
    if (this.title) {
        btn.title = this.title;
    }

    //按钮图标
    var image = this.image;
    if (image) {
        var imageCssName = this.imageCssName;
        var imageCssJson = this.imageCssJson;

        var btnImage = document.createElement("div");
        btnImage.id = "btnImage";
        if (imageCssName) { this.SetStyleByCssName(btnImage, imageCssName); }
        if (imageCssJson) { this.SetStyleByCssJson(btnImage, imageCssJson); }
        $(btnImage).outerWidth(this.imageWidth);
        var ih = $(btn).height();
        $(btnImage).outerHeight(ih);

        var img = image ? image.toString().replace("~", "..") : "";
        var backImg = "url(" + img + ") no-repeat center";
        $(btnImage).css({ "float": "left", "background": backImg, "border-left": "0px solid blue" });

        this.btnImage = btnImage;
        $(btn).append(btnImage);
    }

    //按钮文字
    var text = this.text;
    if (text && $.trim(text).length > 0) {
        var textCssName = this.textCssName;
        var textCssJson = this.textCssJson;

        var btnText = document.createElement("div");
        btnText.id = "btnText";
        $(btnText).text(text);
        if (textCssName) { this.SetStyleByCssName(btnText, textCssName); }
        if (textCssJson) { this.SetStyleByCssJson(btnText, textCssJson); }
        $(btnText).outerHeight(height);
        var lh = $(btn).height();
        $(btnText).css({ "float": "left", "line-height": lh + "px" });

        this.btnText = btnText;
        $(btn).append(btnText);
    }

    //按钮标识：比如向下箭头之类的
    if (this.hasSign) {
        var signImage = this.signImage;
        if (signImage) {
            var signCssName = this.signCssName;
            var signCssJson = this.signCssJson;

            var btnSign = document.createElement("div");
            btnSign.id = "btnSign";
            if (signCssName) { this.SetStyleByCssName(btnSign, signCssName); }
            if (signCssJson) { this.SetStyleByCssJson(btnSign, signCssJson); }
            $(btnSign).outerWidth(this.signWidth);
            $(btnSign).outerHeight(this.signHeight);

            var imgSign = signImage ? signImage.toString().replace("~", "..") : "";
            var backImgSign = "url(" + imgSign + ") no-repeat center";
            $(btnSign).css({ "float": "right", "background": backImgSign });

            this.btnSign = btnSign;
            $(btn).append(btnSign);
        }
    }

    //绑定单击事件
    var szdwCtrl = this;
    $(btn).mouseover(function () {
        szdwCtrl.SetStyleByCssJson(this, hoverCssJson);
    }).mouseleave(function () {
        if (cssName) { szdwCtrl.SetStyleByCssName(this, cssName); }
        if (cssJson) { szdwCtrl.SetStyleByCssJson(this, cssJson); }
    }).click(function () {
        if (szdwCtrl.isToggle) { szdwCtrl.Toggle(); }
    });

    if (this.isDisplay) {
    	$(btn).show();
    }
    else {
    	$(btn).hide();
    }

    this.button = btn;
}
//#endregion 创建

//#region 按钮切换
SzdwButton.prototype.Toggle = function () {
    //切换图标
    if (this.btnImage) {
        var image = this.image;
        var imageToggle = this.imageToggle;
        if (image && imageToggle) {
            var img = this.toggleFlag ? image.toString().replace("~", "..") : imageToggle.toString().replace("~", "..");
            var backImg = "url(" + img + ") no-repeat center";
            $(this.btnImage).css({ "float": "left", "background": backImg, "border-left": "0px solid blue" });
        }
    }

    //切换文字
    if (this.btnText) {
        var text = this.text;
        var textToggle = this.textToggle;
        if (text && textToggle) {
            var txt = this.toggleFlag ? text : textToggle;
            $(this.btnText).text(txt);
        }
    }

    //切换标记
    if (this.btnSign) {
        var signImage = this.signImage;
        var signImageToggle = this.signImageToggle;
        if (signImage && signImageToggle) {
            var imgSign = this.toggleFlag ? signImage.toString().replace("~", "..") : signImageToggle.toString().replace("~", "..");
            var backImgSign = "url(" + imgSign + ") no-repeat center";
            $(this.btnSign).css({ "float": "right", "background": backImgSign });
        }
    }

    this.toggleFlag = !this.toggleFlag;
}
//#endregion 按钮切换

//#region 设置样式
//根据CssName设置样式
SzdwButton.prototype.SetStyleByCssName = function (element, cssName) {
    if (cssName) { $(element).addClass(cssName); }
}

//根据CssJson设置样式
SzdwButton.prototype.SetStyleByCssJson = function (element, cssJson) {
    if (cssJson ) { $(element).css(cssJson); }
}
//#endregion 设置样式