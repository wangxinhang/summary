//数据表扩展选择框组对象SzdwCheckBoxList
/// <reference path="../jquery-1.11.1.js" />
/// <reference path="../EventUtil.js" />
/// <reference path="SzdwCommon.js" />

//#region 选择框组对象SzdwCheckBoxList
function SzdwSubtotalPanelList(position, x, y, width, height) {
    //#region 通用属性
    this.position = position;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.namingContainer = null; //命名容器，即父容器
    this.targetControl = null; //与之关联的目标控件
    this.direction = 0; //选择框组排列方向,0：水平排列(默认），1：垂直方向
    this.backgroundColor = "black";//控件背景色
    this.opacity = 0.5; //控件背景色透明度
    this.hoverOpacity = 0.7; //控件背景色透明度
    this.hasTitle = false; //是否有标题
    this.showAll = true; //加载时是否一并显示列表项
    this.allowMouseleave = true; //是否允许执行panel的mouseleave事件中的命令
    //#endregion 通用属性

    //#region 数据
    this.jsonList = null; //选择框的相关数据:比如[{Text:"编辑",Value:0,Title:"编辑",FnClick:ModifyClick,FnParams:params,CssJson:cssJson}]
    //#endregion 数据

    //#region 外框
    this.panel = document.createElement("div");
    this.panel.style.overflow = "hidden";
    this.panel.style.padding = "0";
    this.panel.style.margin = "0";
    this.panel.style.position = position == null ? "absolute" : position;  
    this.panelCssName = null;
    this.panelCssJson = { "font-family": "微软雅黑", "font-size": "small",  "background-color": this.backgroundColor, "opacity": this.opacity, "color": "White" };    
    //#endregion 外框

    //#region 标题
    //标题
    this.title = null;
    this.titleWidth = 0;
    this.titleHeight = 28;
    this.titleCssName = null;
    this.titleCssJson = { "position": "relative", "text-align": "center", "padding": "0px 10px 0px 2px", "background-color": "transparent", "cursor": "default" };

    //标题图片
    this.titleImage = null;
    this.titleImageWidth = this.titleHeight;
    this.titleImageHeight = this.titleHeight;
    this.titleImageCssName = null;
    this.titleImageCssJson = null;

    //标题文字
    this.titleText = "标题";
    this.titleTextCssName = null;
    this.titleTextCssJson = { "text-align": "center", "padding": "0px 1px 0px 1px" };
    //#endregion 标题

    //#region 选择框列表
    //选择框列表面板
    this.listPanel = null;
    this.listPanelCssName = null;
    this.listPanelCssJson = { "position": "relative"};

    //选择框组合条目
    this.itemWidth = 0;
    this.itemHeight = 30;
    this.itemCssName = null;
    this.itemCssJson = { "position": "relative", "background-color": "transparent", "padding": "0px 10px 0px 10px", "cursor": "pointer" }; //relative
    this.itemHoverCssName = null;
    this.itemHoverCssJson = { "background-color": "#333333", "color": "White" };
    this.checkBoxCssName = null;
    this.checkBoxCssJson = { "float": "left", "margin": 0, "border": "1px solid silver" }; //relative
    //#endregion 选择框列表面板

    //#region 分割线
    this.separatorWidth = 0;
    this.separatorHeight = 0;
    this.separatorCssName = null;
    this.separatorCssJson = { "opacity": 0.3 };
    this.separatorColor = "White";
    this.separatorMargin = 5;

    //#endregion 分割线

    //事件
    this.fnInitial = null; //初始化函数
}
//#endregion 对象SzdwCheckBoxList

//#region 载入
SzdwSubtotalPanelList.prototype.Load = function () {
    //载入父容器
    this.AppendToNamingContainer();

    //设置相关属性
    this.SetPanel();
    this.SetPosition(this.x, this.y);
    var width = this.direction == 0 ? 0 : Math.max(this.width, this.itemWidth);
    this.SetSize(width, this.height);

    //载入标题
    if (this.hasTitle) {
        this.CreateTitle();
        this.CreateSeparator();
    }

    //载入div列表
    this.CreateDivList();
}

//SzdwSubtotalPanelList
SzdwSubtotalPanelList.prototype.AppendToNamingContainer = function () {
    var p = this.panel;
    var nc = this.namingContainer;
    if (nc != null && $(p).parent().length == 0) {
        $(p).appendTo(nc);
    }
}
//#endregion 载入

//#region 显隐
//SzdwSubtotalPanelList
SzdwSubtotalPanelList.prototype.Show = function () {
    $(this.panel).fadeIn();
}

//隐藏SzdwSubtotalPanelList
SzdwSubtotalPanelList.prototype.Hide = function () {
    $(this.panel).fadeOut();
}

//下展SzdwSubtotalPanelList
SzdwSubtotalPanelList.prototype.SlideDown = function () {
    $(this.panel).slideDown(300);
}

//上收SzdwSubtotalPanelList
SzdwSubtotalPanelList.prototype.SlideUp = function () {
    $(this.panel).slideUp();
}
//#endregion 显隐

//#region 容器面板
//设置Panel
SzdwSubtotalPanelList.prototype.SetPanel = function () {
    var p = this.panel;
    this.SetStyleByCssName(p, this.panelCssName);
    this.SetStyleByCssJson(p, this.panelCssJson);

    var cssJsonPlus = this.direction == 0 ? { "padding": "0px 5px 0px 5px"} : { "padding": "0px" };
    $(p).css(cssJsonPlus);
    //#endregion 事件

    //#region 事件
    var szdwCtrl = this;
    if (!this.showAll) {
        $(p).mouseover(function () {
            if (szdwCtrl.allowMouseleave) {
                $(p).mouseleave(function () {
                    szdwCtrl.Mouseleave();
                });
            }
            szdwCtrl.Mouseover();
        });
    }
    //#endregion 事件
}

//mouseover
SzdwSubtotalPanelList.prototype.Mouseover = function () {
    $(this.panel).css({ "opacity": this.hoverOpacity });
    var sp = $(this.panel).find("[id='separator']");
    if (this.direction == 0) {
        $(this.listPanel).fadeIn(300);
        $(this.button).fadeIn(300);
        $(sp).fadeIn(300);
    } else {
        $(sp).slideDown(300);
        $(this.listPanel).slideDown(300);
        $(this.button).slideDown(300);
    }
    this.allowMouseleave = true;
}

//mouseleave
SzdwSubtotalPanelList.prototype.Mouseleave = function () {
    if (this.allowMouseleave) {
        $(this.panel).css({ "opacity": this.opacity });
        var sp = $(this.panel).find("[id='separator']");
        if (this.direction == 0) {
            $(this.listPanel).fadeOut(100);
            $(this.button).fadeOut(100);
            $(sp).fadeOut(100);
        } else {
            $(sp).slideUp(300);
            $(this.listPanel).slideUp(300);
            $(this.button).slideUp(300);
        }
    }
}

//定位
SzdwSubtotalPanelList.prototype.SetPosition = function (x, y) {
    $(this.panel).css({ "left": x });
    $(this.panel).css({ "top": y });
}

//设置尺寸
SzdwSubtotalPanelList.prototype.SetSize = function (width, height) {
    if (width > 0) { $(this.panel).outerWidth(width); }
    if (height > 0 & this.direction == 0) { $(this.panel).outerHeight(height); }
}
//#endregion 容器面板

//#region 创建标题
SzdwSubtotalPanelList.prototype.CreateTitle = function () {
    var width = this.titleWidth;
    var height = this.height > 0 ? this.height : Math.max(this.titleHeight, this.titleImageHeight, this.itemHeight, this.btnHeight);

    var cssName = this.titleCssName;
    var cssJson = this.titleCssJson;

    //#region 创建
    //标题
    var t = document.createElement("div");
    if (cssName) { this.SetStyleByCssName(t, cssName); }
    if (cssJson) { this.SetStyleByCssJson(t, cssJson); }
    if (width > 0) { $(t).width(width); }
    if (height > 0) { $(t).height(height).css({ "line-height": height + "px" }); }
    if (this.direction == 0) { $(t).css({ "float": "left" }); }

    //标题图标
    var image = this.titleImage;
    if (image) {
        var imageCssName = this.titleImageCssName;
        var imageCssJson = this.titleImageCssJson;
        var iw = this.titleImageWidth;
        var ih = height;

        var ti = document.createElement("div");
        ti.id = "titleImage";
        if (imageCssName) { this.SetStyleByCssName(ti, imageCssName); }
        if (imageCssJson) { this.SetStyleByCssJson(ti, imageCssJson); }
        $(ti).outerWidth(iw).outerHeight(ih);

        var img = image ? image.toString().replace("~", "..") : "";
        var backImg = "url(" + img + ") no-repeat center";
        $(ti).css({ "float": "left", "background": backImg, "border-left": "0px solid blue" });

        $(t).append(ti);
    }

    //标题文字
    var text = this.titleText;
    if (text && $.trim(text).length > 0) {
        var textCssName = this.titleTextCssName;
        var textCssJson = this.titleTextCssJson;

        var txt = document.createElement("div");
        txt.id = "titleText";
        $(txt).text(text);
        if (textCssName) { this.SetStyleByCssName(txt, textCssName); }
        if (textCssJson) { this.SetStyleByCssJson(txt, textCssJson); }
        $(txt).outerHeight(height).css({ "float": "left", "line-height": height + "px" });

        $(t).append(txt);
    }
    //#endregion 创建    

    this.title = t;
    $(this.panel).append(t);
}
//#endregion 创建

//#region 创建选择框列表
//创建选择框列表
SzdwSubtotalPanelList.prototype.CreateDivList = function () {
    var data = this.jsonList;
    //创建选择框列表
    if (data != null) {
        var lp = document.createElement("div");
        this.SetStyleByCssName(lp, this.listPanelCssName);
        this.SetStyleByCssJson(lp, this.listPanelCssJson);
        if (this.direction == 0) { $(lp).css({ "float": "left" }); }

        var cssJsonPlus = this.direction == 0 ? { "padding": "0px 5px 0px 5px"} : { "padding": "5px 0px 5px 0px" };
        $(lp).css(cssJsonPlus);

        var len = data.length;
        for (var i = 0; i < len; i++) {
            var jd = data[i];
            var div = this.CreateDiv(jd);
            if (this.direction == 0) { $(chk).css({ "float": "left" }); }
            $(lp).append(div);
        }

        this.listPanel = lp;
        $(this.panel).append(lp);
    }
}

//创建选择框
SzdwSubtotalPanelList.prototype.CreateDiv = function (jsonData) {
    var w = this.itemWidth;
    var h = this.height > 0 ? this.height : Math.max(this.titleHeight, this.titleImageHeight, this.itemHeight, this.btnHeight);
    var cssName = this.itemCssName;
    var cssJson = this.itemCssJson;
    var paramCssJson = jsonData.CssJson;

    //#region 创建项
    //选择框外框
    var item = document.createElement("div");

    //设置提示文字
    if (jsonData.Title) { item.title = jsonData.Title; }

    //设置样式
    if (cssName) { this.SetStyleByCssName(item, cssName); }
    if (cssJson) { this.SetStyleByCssJson(item, cssJson); }
    if (w > 0) { $(item).width(w); }
    if (h > 0) { $(item).height(h).css({ "line-height": h + "px" }); }
    if (paramCssJson) { $(item).css(paramCssJson); }

    //选择框
    var text = jsonData.Text;
    $(item).html(text);
    

    //#endregion 创建项

    //#region 绑定事件
    //绑定单击事件
    var fn = jsonData.FnClick;
    var szdwCtrl = this;
    var itemHoverCssName = this.itemHoverCssName;
    var itemHoverCssJson = this.itemHoverCssJson;
    $(item).mouseover(function () {
        szdwCtrl.SetStyleByCssName(item, itemHoverCssName);
        szdwCtrl.SetStyleByCssJson(item, itemHoverCssJson);
    }).mouseleave(function () {
        szdwCtrl.SetStyleByCssName(item, cssName);
        szdwCtrl.SetStyleByCssJson(item, cssJson);
    }).click(function () {
        //回调函数
        if (typeof (fn) == "function") { fn(); }
    });
    //#endregion 绑定事件
    return item;
}

//#region 分割线
SzdwSubtotalPanelList.prototype.CreateSeparator = function () {
    var m = this.separatorMargin;
    if (this.direction == 0) {
        this.separatorWidth = 1;
        this.separatorHeight = this.separatorHeight == 0 ? $(this.panel).height() - m * 2 : this.separatorHeight;
    } else {
        this.separatorWidth = this.separatorWidth == 0 ? $(this.panel).width() - m * 2 : this.separatorWidth;
        this.separatorHeight = 1;
    }

    var width = this.separatorWidth;
    var height = this.separatorHeight;
    var cssName = this.separatorCssName;
    var cssJson = this.separatorCssJson;

    //创建风格显
    var e = document.createElement("div");
    if (cssName) { this.SetStyleByCssName(e, cssName); }
    if (cssJson) { this.SetStyleByCssJson(e, cssJson); }
    $(e).width(width).height(height).attr("id","separator");
    if (this.direction == 0) {
        $(e).css({ "float": "left", "border-right": "1px solid " + this.separatorColor, "margin-top": m });
    } else {
        $(e).css({ "border-bottom": "1px solid " + this.separatorColor, "margin-left": m });
    }
   

    $(this.panel).append(e);
}
//#endregion 分割线

//#region 设置样式
//根据CssName设置样式
SzdwSubtotalPanelList.prototype.SetStyleByCssName = function (element, cssName) {
    if (cssName) { $(element).addClass(cssName); }
}

//根据CssJson设置样式
SzdwSubtotalPanelList.prototype.SetStyleByCssJson = function (element, cssJson) {
    if (cssJson ) { $(element).css(cssJson); }
}

//重置样式
SzdwSubtotalPanelList.prototype.Reset = function () {
    var cssName = this.checkBoxCssName;
    var cssJson = this.checkBoxCssJson;
}
//#endregion 设置样式