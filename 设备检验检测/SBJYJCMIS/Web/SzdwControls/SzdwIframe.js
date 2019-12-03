/// <reference path="domCommon.js" />
/// <reference path="../jquery-1.11.1.js" />
//引用颜色转换JS
//document.write("<script language=javascript src='domCommon.js'></script>");

//#region 框架：SzdwIframe
function SzdwIframe(position, x, y, width, height) {
    this.namingContainer = document.body; //命名容器即父容器   
    this.isLoaded = false; //
    this.position = position;
    this.zIndex = 0;
    this.x = x; //坐标x
    this.y = y; //坐标x
    this.width = width; //宽度
    this.height = height; //高度   
    this.hasTitle = false;   
    this.hasLoadingAnimation = true;
    this.pageDocument = null;

    //窗体层（边框层）
    this.panel = null;
    this.panelCssName = null;
    this.panelCssJson = null;

    //标题
    this.title = null;
    this.titleHeight = 25;
    this.titleText = "";
    this.oldTitleText = "";
    this.titleCssName = null;
    this.titleCssJson = { "font-family": "微软雅黑", "fontSize": "11pt", "cursor": "default", "border-left": "0px solid #017BBA","margin":"0px 0px 10px 0px","padding-left" :"10px"};

    //内容页面层
    this.pageIframe = null;
    this.pageIframeCssName = null;
    this.pageIframeCssJson = { "background-color": "#EEEEEE"};
    this.pageUrl = "";
    this.pageParamJson = null;
    this.oldPageUrl = "";
    this.oldPageParamJson = null;

    //加载动画
    this.loadingPanel = null;
    this.loadingImg=null;
    this.loadingImgUrl = "/SzdwControls/image/loading/loading.gif"; //加载动画gif文件的URL
    this.loadingImgWidth = 32; //加载动画gif文件的宽度
    this.loadingImgHeight = 32; //加载动画gif文件的高度
}
//#endregion 框架：SzdwIframe

//#region 加载
SzdwIframe.prototype.Load = function () {
    if (this.isLoaded) {
        this.Update();
    } else {
        this.Create();
    }
}

//创建
SzdwIframe.prototype.Create = function () {
    this.GetZIndex();
    this.CreatePanel();
    this.SetPanel();
    this.CreateTitle();
    this.SetTitle();
    this.CreateLoadingPanel();
    this.SetLoadingPanel();
    this.CreatePageIframe();
    this.SetPageIframe();
    this.LoadPage();
    this.Show();
    this.isLoaded = true;
}

//创建
SzdwIframe.prototype.SetIframe = function () {
    this.SetPanel();
    this.SetTitle();
    this.SetLoadingPanel();
    this.SetPageIframe();
}

//更新
SzdwIframe.prototype.Update = function () {
    this.SetIframe();
    this.UpdateTitle();
    this.UpdatePage();
}

//更新载入新页面和参数
SzdwIframe.prototype.UpdatePage = function () {
    var p = this.pageIframe;
    $(p).hide();
    var npu = this.pageUrl;
    var opu = this.oldPageUrl;
    if (npu != opu) {
        p.src = this.GetFullPageUrl();
        opu = npu;
    }

    var pj = this.pageParamJson;
    var npj = this.pj;
    var opj = this.oldPageParamJson;
    if (npj != opj) {
        p.src = this.GetFullPageUrl();
        opj = npj;
    }
}

//更新载入新标题文字
SzdwIframe.prototype.UpdateTitle = function () {
    if (this.hasTitle) {
        var t = this.title;
        var nt = this.titleText;
        var ot = this.oldTitleText;
        if (nt != ot) {
            ot = nt;
            t.title = nt;
            $(t).text(nt);
        }
    }
}

//#endregion 加载

//#region 获取ZIndex
SzdwIframe.prototype.GetZIndex = function () {
    var c = this.namingContainer;
    var zIndex = domCommon.getMaxZIndex(c);
    if (this.zIndex <= 0) {
        this.zIndex = zIndex < 1 ? 1 : zIndex;
    }
}

//#endregion 获取ZIndex

//#region 显示隐藏
//显示框架
SzdwIframe.prototype.Show = function () {   
    $(this.panel).fadeIn();
}

//隐藏框架
SzdwIframe.prototype.Hide = function () {    
    $(this.panel).fadeOut(300);
    this.pageIframe.src = "";
}
//#endregion 显示隐藏

//#region 创建窗体层（视觉上显示为边框）
SzdwIframe.prototype.CreatePanel = function () {
    var nc = this.namingContainer;
    var e = document.createElement("div");
    e.style.position = "relative";
    e.style.display = "none"; 
    $(e).appendTo(nc);
    this.panel = e;  
}

//设置窗体层
SzdwIframe.prototype.SetPanel = function () {
    var p = this.position;
    var x = this.x;
    var y = this.y;
    var w = this.width;
    var h = this.height;
    var zIndex = this.zIndex;
    var cssName = this.panelCssName
    var cssJson = this.panelCssJson;
    var p = this.panel;
    this.SetStyleByCssName(p, cssName);
    this.SetStyleByCssJson(p, cssJson);

    //定位尺寸
    this.SetPanelPosition(x, y);
    this.SetPanelSize(w, h);
}

//定位窗体
SzdwIframe.prototype.SetPanelPosition = function (x, y) {
    var e = this.panel;
    if (e) { $(e).css({ "left": x, "top": y }); }
}

//设置窗体尺寸
SzdwIframe.prototype.SetPanelSize = function (width,height) {
    var e = this.panel;
    if (e) { $(e).outerWidth(width).outerHeight(height); }
}
//#endregion 创建窗体层（视觉上显示为边框）

//#region 创建标题层
SzdwIframe.prototype.CreateTitle = function () {
    if (this.hasTitle) {
        var text = this.titleText;
        var cssName = this.titleCssName;
        var cssJson = this.titleCssJson;

        //创建标题层
        var e = document.createElement("div");
        this.SetStyleByCssName(e, cssName);
        this.SetStyleByCssJson(e, cssJson);
        e.style.position = "relative";

        //设置标题文字( 自动省略）
        e.style.lineHeight = this.titleHeight + "px";
        e.style.textOverflow = "ellipsis";
        e.style.whiteSpace = "nowrap";
        e.style.overflow = "hidden";
        e.title = text;
        $(e).text(text);
        $(e).appendTo(this.panel);

        this.title = e;
    }
}

//设置标题
SzdwIframe.prototype.SetTitle = function () {
    if (this.hasTitle) {
        var x = 0;
        var y = 0;
        var w = this.width;
        var h = this.titleHeight;
        var e = this.title;
        $(e).css({ "left": x, "top": y });
        this.SetTitleSize(w, h);
    }
}

//设置标题层尺寸
SzdwIframe.prototype.SetTitleSize = function (width, height) {
    var e = this.title;
    if (e) { $(e).outerWidth(width).outerHeight(height); }
}
//#endregion 创建标题层

//#region 创建内容页面层
SzdwIframe.prototype.CreatePageIframe = function () {
    //创建iframe
    var e = document.createElement("iframe");
    e.style.position = "absolute";
    e.frameBorder = "0px";
    e.scrolling = "no";
    e.marginHeight = "0px";
    e.marginWidth = "0px";
    e.allowTransparency = "true";
    $(e).appendTo(this.panel);
    this.pageIframe = e;
}

//加载页面
SzdwIframe.prototype.LoadPage = function () {
    var e = this.pageIframe;
    $(e).hide();
    e.src = this.GetFullPageUrl();

    //页面加载完毕后，隐藏动画
    var si = this;
    $(e).load(function () {
        $(this).fadeIn();
        si.pageDocument = e.contentWindow.document;
        si.HideLoadingPanel();
    });
}

//获取完整的待值参数的pageUrl
SzdwIframe.prototype.GetFullPageUrl = function () {
    var pageUrl = this.pageUrl;
    var paramJson = this.pageParamJson;
    if (paramJson) {
        return pageUrl + "?paramJson=" + $.toJSONString(paramJson);
    } else {
        return pageUrl;
    }
}

//设置内容页面层
SzdwIframe.prototype.SetPageIframe = function () {
    var th = this.hasTitle ? $(this.title).outerHeight(true) : 0;
    var x = 0;
    var y = th;
    var w = this.width;
    var h = this.height - th;
    var e = this.pageIframe;
    var cssName = this.pageIframeCssName
    var cssJson = this.pageIframeCssJson;
    this.SetStyleByCssName(e, cssName);
    this.SetStyleByCssJson(e, cssJson);

    //定位尺寸
    this.SetPageIframePosition(x, y);
    this.SetPageIframeSize(w, h);    
}

//设置内容页面层定位
SzdwIframe.prototype.SetPageIframePosition = function (x, y) {
    var e = this.pageIframe;
    if (e) { $(e).css({ "left": x, "top": y });  }
}

//设置内容页面层尺寸
SzdwIframe.prototype.SetPageIframeSize = function (width, height) {
    var e = this.pageIframe;
    if (e) { $(e).outerWidth(width).outerHeight(height); }
}
//#endregion 创建内容页面层

//#region 定位
SzdwIframe.prototype.SetPosition = function (x, y) {
    //Panel定位
    var x = this.x;
    var y = this.y;
    this.SetPanelPosition(x, y);

    //Iframe定位
    var th = this.hasTitle ? $(this.title).outerHeight(true) : 0;
    var ifrX = 0;
    var ifrY = th;
    this.SetPageIframePosition(ifrX, ifrY);
}
//#endregion 定位

//#region 设置尺寸
SzdwIframe.prototype.SetSize = function (width, height) {
    this.width = width;
    this.height = height;
    var w = width;
    var h = height;

    //设置Panel尺寸
    this.SetPanelSize(w, h);

    //设置Title尺寸
    if (this.hasTitle) {
        this.SetTitleSize(w, this.titleHeight);
    }

    //设置Iframe尺寸
    var th = this.hasTitle ? $(this.title).outerHeight(true) : 0;
    var ifrH = h - th;
    this.SetPageIframeSize(w, h - th);
}

//设置Iframe中页面的尺寸
SzdwIframe.prototype.SetPageSize = function (width, height) {
    var e = this.pageIframe;
    var p = this.pageUrl;
    if (p) {
        var body = $(e).contents().find("document");
        $(body).width(width).height(height);
    }
}
//#endregion 尺寸

//#region 加载动画
//加载动画
SzdwIframe.prototype.CreateLoadingPanel = function () {
    var e = document.createElement("div");
    e.style.position = "absolute";
    e.style.display = "none"
    var img = document.createElement("img");
    img.src = this.loadingImgUrl;
    this.loadingImg = img;
    var pw = this;
    $(img).load(function () {
        pw.loadingImgWidth = $(this).width();
        pw.loadingImgHeight = $(this).height();
    });

    $(e).append(img).appendTo(this.panel);
    this.loadingPanel = e;
}

SzdwIframe.prototype.SetLoadingPanel = function () {
    if (this.hasLoadingAnimation) {
        var p = this.loadingPanel;
        var img = this.loadingImg;
        var imgWidth = this.loadingImgWidth;
        var imgHeight = this.loadingImgHeight;

        var left = (this.width - imgWidth) / 2;
        var top = (this.height - imgHeight) / 2;
        var zIndex = this.zIndex;

        $(p).css({ "left": left, "top": top, "z-index": zIndex});
        this.ShowLoadingPanel();
    }
}

SzdwIframe.prototype.ShowLoadingPanel = function () {
    $(this.loadingPanel).fadeIn();
}

SzdwIframe.prototype.HideLoadingPanel = function () {
    $(this.loadingPanel).fadeOut();
}
//#endregion 加载动画

//#region 设置元素样式
//根据CssName设置Item样式
SzdwIframe.prototype.SetStyleByCssName = function (element, cssName) {
    if (cssName) { $(element).addClass(cssName); }
}

//根据CssJson设置Item样式
SzdwIframe.prototype.SetStyleByCssJson = function (element, cssJson) {
    if (cssJson ) { $(element).css(cssJson); }
}
//#endregion 设置元素样式