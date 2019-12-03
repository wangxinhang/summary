/// <reference path="SzdwCommon.js" />
/// <reference path="../jquery-1.11.1.js" />
//引用颜色转换JS
//document.write("<script language=javascript src='SzdwCommon.js'></script>");

//#region 页面面板：SzdwPagePanel
function SzdwPagePanel(position, x, y, width, height) {
    this.namingContainer = document.body; //命名容器即父容器    
    this.position = position;    
    this.x = x; //坐标x
    this.y = y; //坐标x
    this.width = width; //宽度
    this.height = height; //高度
    this.minWidth = width;
    this.minHeight = height;
    this.maxWidth = width;
    this.maxHeight = height;
    this.hasLoadingAnimation = false;

    //页面面板
    this.panel = null;
    this.pageUrl = "";
    this.oldPageUrl = "";
    this.pageParamJson = null;
    this.oldPageParamJson = null;
    this.panelCssName = null;
    this.panelCssJson = {"border":"0px solid red"};
    this.pageDocument = null;
    this.fnPageDocument = null;

    //加载动画
    this.loadingPanel = null;
    this.loadingImg=null;
    this.loadingImgUrl = "../SzdwControls/image/loading/loading.gif"; //加载动画gif文件的URL
    this.loadingImgWidth = 0; //加载动画gif文件的宽度
    this.loadingImgHeight = 0; //加载动画gif文件的高度

    //#region 初始化函数
    this.fnInitial = null;
    //#endregion 初始化函数


}
//#endregion 页面面板：SzdwPagePanel

//#region 加载
SzdwPagePanel.prototype.Load = function () {
    this.Create();
}

//加入命名容器
SzdwPagePanel.prototype.AppendToNamingContainer = function () {
    var p = this.panel;
    var nc = this.namingContainer;
    if (nc != null && $(p).parent().length == 0) {
        $(p).appendTo(nc);
    }
}

//创建
SzdwPagePanel.prototype.Create = function () {
    this.CreateLoadingPanel();
    this.SetLoadingPanel();
    this.CreatePanel();
    this.SetPanel();
}

//更新
SzdwPagePanel.prototype.Update = function () {
    this.SetPanel();
    this.UpdatePage();
}

//更新载入新页面和参数
SzdwPagePanel.prototype.UpdatePage = function () {
    var p = this.panel;
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
//#endregion 加载

//#region 显示隐藏
//显示页面面板
SzdwPagePanel.prototype.Show = function () {   
    $(this.panel).fadeIn();
}

//隐藏页面面板
SzdwPagePanel.prototype.Hide = function () {    
    $(this.panel).fadeOut(300);
    this.pagePanel.src = "";
}
//#endregion 显示隐藏

//#region 创建页面面板
SzdwPagePanel.prototype.CreatePanel = function () {
    //创建iframe
    var e = document.createElement("iframe");
    e.style.position = "absolute";
    e.frameBorder = "0";
    e.scrolling = "no";
    e.marginHeight = "0px";
    e.marginWidth = "0px";
    e.src = this.GetFullPageUrl();

    //页面加载完毕后，隐藏动画
    var p = this;
    var fnPageDocument = this.fnPageDocument;
    $(e).load(function () {
        p.HideLoadingPanel();
        p.pageDocument = e.contentWindow.document;
        if (p.pageDocument) {
            $(p.pageDocument).click(function () {
                if (typeof (fnPageDocument) == "function") {
                    fnPageDocument();
                }
            });
        }
    });

    this.panel = e;
    this.AppendToNamingContainer();
}

//获取完整的待值参数的pageUrl
SzdwPagePanel.prototype.GetFullPageUrl = function () {
    var pageUrl = this.pageUrl;
    var paramJson = this.pageParamJson;
    if (paramJson) {
    	return pageUrl + ((pageUrl.indexOf("?") > 0) ? "&" : "?") + "paramJson=" + $.toJSONString(paramJson);
    } else {
        return pageUrl;
    }
}

//#endregion 创建页面面板

//#region 设置样式
//设置页面面板
SzdwPagePanel.prototype.SetPanel = function () {
    var x = this.x;
    var y = this.y;
    var w = this.width;
    var h = this.height;
    var p = this.panel;
    this.SetStyleByCssName(p, this.panelCssName);
    this.SetStyleByCssJson(p, this.panelCssJson);
    $(p).css({ "left": x, "top": y });
    $(p).innerWidth(w).innerHeight(h);
}

//根据CssName设置Item样式
SzdwPagePanel.prototype.SetStyleByCssName = function (element, cssName) {
    if (cssName != null) { $(element).addClass(cssName); }
}

//根据CssJson设置Item样式
SzdwPagePanel.prototype.SetStyleByCssJson = function (element, cssJson) {
    if (cssJson != null) { $(element).css(cssJson); }
}

//重设尺寸
SzdwPagePanel.prototype.Resize = function () {
    var p = this.panel;
    var w = this.width;
    var h = this.height;
    if (w > 0) { $(p).innerWidth(w); }
    if (h > 0) { $(p).innerHeight(h); }
}

//重设尺寸
SzdwPagePanel.prototype.RePosition = function (x,y) {
    var p = this.panel;
    $(p).css({ "left": x, "top": y });
}

//#endregion 设置样式

//#region 加载动画
//加载动画
SzdwPagePanel.prototype.CreateLoadingPanel = function () {
    var e = document.createElement("div");
    e.style.position = "absolute";
    e.style.display = "none"
    var img = document.createElement("img");
    img.src = this.loadingImgUrl;
    this.loadingImg = img;
    var p = this;
    $(img).load(function () {
        p.loadingImgWidth = $(this).width();
        p.loadingImgHeight = $(this).height();
    });

    $(e).append(img).appendTo(this.panel);
    this.loadingPanel = e;
}

SzdwPagePanel.prototype.SetLoadingPanel = function () {
    if (this.hasLoadingAnimation) {
        var p = this.loadingPanel;
        var img = this.loadingImg;
        this.loadingImgWidth = $(img).width();
        this.loadingImgHeight = $(img).height();

        var imgWidth = this.loadingImgWidth;
        var imgHeight = this.loadingImgHeight;

        var left = (this.width - imgWidth) / 2;
        var top = (this.height - imgHeight) / 2;
        var zIndex = this.zIndex;

        $(p).css({ "left": left, "top": top});
        this.ShowLoadingPanel();
    }
}

SzdwPagePanel.prototype.ShowLoadingPanel = function () {
    $(this.loadingPanel).fadeIn();
}

SzdwPagePanel.prototype.HideLoadingPanel = function () {
    $(this.loadingPanel).fadeOut();
}
//#endregion 加载动画