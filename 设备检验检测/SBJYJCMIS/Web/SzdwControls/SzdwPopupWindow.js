/// <reference path="domCommon.js" />
/// <reference path="../jquery-1.11.1.js" />
//引用颜色转换JS
//#region 弹出窗口：SzdwPopupWindow
function SzdwPopupWindow(position, x, y, width, height) {
    //#region 通用
    this.namingContainer = document.body; //命名容器即父容器
    this.targetControl = null;
    this.targetRowIndex = 0;
    this.targetCellIndex = 0;
    this.position = position;
    this.zIndex = 0;
    this.x = x; //坐标x
    this.y = y; //坐标x
    this.width = width; //宽度
    this.height = height; //高度
    this.maxWidth = width;
    this.maxHeight = height;
    this.borderWidth = 8;
    this.backColor = "Black";
    this.backOpacity = 0.5;
    this.movable = true;
    this.hasMask = true;
    this.hasLoadingAnimation = false;
    this.hasBtnMinimize = false
    this.hasBtnWinsize = false;
    this.restoreJson = { "x": x, "y": y, "width": width, "height": height };//存储上一位置尺寸数据
    this.winsizeMode=1;//弹窗尺寸样式，0：最小化；1：窗口；2：最大化
    //#endregion 通用

    this.isRefresh = false;
    //#region 遮罩层
    this.mask = null;
    this.maskOpacity = 0.1;
    this.maskBackColor = "Black";
    //#endregion 遮罩层

    //#region 窗体层（边框层）
    this.panel = null;
    this.panelCssName = null;
    this.panelCssJson = null;
    //#endregion 窗体层（边框层）

    //#region 窗体控制按钮面板
    this.btnPanel = null;
    this.btnPanelCssName = null;
    this.btnPanelCssJson = null;
    this.btnWidth = 32;
    this.btnHeight = 24;

    //最小化按钮
    this.btnMinimize = null;
    this.btnMinimizeImage = "/SzdwControls/image/popupWindow/minimize16w.png";
    this.btnMinimizeMouseOverBackColor = "#A6A6A6";
    this.btnMinimizeMouseLeaveBackColor = "transparent";
    this.fnMinimize = null;//关闭按钮

    //最大化或还原按钮
    this.btnWinsize = null;
    this.btnWinsizeImage = "/SzdwControls/image/popupwindow/maximize16w.png";
    this.btnWinsizeMouseOverBackColor = "#A6A6A6";
    this.btnWinsizeMouseLeaveBackColor = "transparent";
    this.fnWinsize = null;//关闭按钮

    //关闭按钮
    this.btnClose = null;
    this.btnCloseImage = "/SzdwControls/image/popupWindow/cross16.png";
    this.btnCloseMouseOverBackColor = "Red";
    this.btnCloseMouseLeaveBackColor = "transparent";
    this.fnClose = null;
    //#endregion 窗体控制按钮面板

    //#region 标题层
    this.titlePanel = null;
    this.titlePanelWidth = 0;
    this.titlePanelHeight = 32;
    this.titlePanelCssName = null;
    this.titlePanelCssJson = { "font-family": "微软雅黑", "fontSize": "11pt", "cursor": "default" };
    this.titleColor = "White";

    this.titleImage = null;//"../Image/Detail20W.PNG";
    this.titleImageWidth = 24;
    this.titleImageHeight = this.titlePanelHeight;
    this.titleImageCssName = null;
    this.titleImageCssJson = { "float": "left" };

    this.titleText = "";
    this.oldTitleText = "";
    this.titleTextWidth = 0;
    this.titleTextHeight = this.titlePanelHeight;
    this.titleTextCssName = null;
    this.titleTextCssJson = { "color": "white", "float": "left"};
    this.titleCssJson = {};
    //#endregion 标题层

    //#region 内容页面层
    this.pagePanel = null;
    this.pagePanelWidth = 0;
    this.pagePanelHeight = 0;
    this.pagePanelCssName = null;
    this.pagePanelCssJson = { "font-family": "微软雅黑", "fontSize": "11pt", "cursor": "default","overflow":"hidden","background-color":"transparent" };
    this.pageUrl = "";
    this.oldPageUrl = "";
    this.pageParamJson = null;
    this.oldPageParamJson = null;
    this.pagePanelBackColor = "transparent";
    this.pageDocument = null;
    //#endregion 内容页面层

    //#region 加载动画
    this.loadingPanel = null;
    this.loadingImg=null;
    this.loadingImgUrl = "/SzdwControls/image/loading/loading16w.gif"; //加载动画gif文件的URL
    this.loadingImgWidth = 0; //加载动画gif文件的宽度
    this.loadingImgHeight = 0; //加载动画gif文件的高度
    //#endregion 加载动画
}
//#endregion 弹出窗口：SzdwPopupWindow

//#region 加载
SzdwPopupWindow.prototype.Load = function () {
    if (this.targetControl == null) {
        this.Create();
    } else {
        this.Update();
    }
}

//创建
SzdwPopupWindow.prototype.Create = function () {
    this.GetZIndex();
    this.CreateMask();
    this.CreatePanel();
    this.SetPanel();
    this.CreateTitle();
    this.SetTitle();
    this.CreateBtnPanel();
    this.CreateLoadingPanel();
    this.SetLoadingPanel();
    this.CreatePagePanel();
    this.SetPagePanel();
    this.Show();
}

//创建
SzdwPopupWindow.prototype.SetPopupWindow = function () {
    this.SetPanel();
    this.SetTitle();
    this.SetBtnPanel();
    this.SetLoadingPanel();
    this.SetPagePanel();
}

//更新
SzdwPopupWindow.prototype.Update = function () {
    this.SetPopupWindow();
    this.Show();
    this.UpdateTitle();
    this.UpdatePage();
}

//更新载入新页面和参数
SzdwPopupWindow.prototype.UpdatePage = function () {
    var p = this.pagePanel;
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
SzdwPopupWindow.prototype.UpdateTitle = function () {
    var t = $(this.titlePanel).find("[id='titleText']");
    var nt = this.titleText;
    var ot = this.oldTitleText;
    if (nt != ot) {
        ot = nt;
        $(t).text(nt).attr("title",nt);
    }
}

//#endregion 加载

//#region 获取ZIndex
SzdwPopupWindow.prototype.GetZIndex = function () {
    var c = this.namingContainer;
	var zIndex = domCommon.getMaxZIndex(c);
    //var zIndex = getMaxZIndex(c);
    if (this.zIndex <= 0) {
        this.zIndex = zIndex < 1 ? 1 : zIndex;
    }
}

//#endregion 获取ZIndex

//#region 显示隐藏

//显示弹出窗口
SzdwPopupWindow.prototype.Show = function () {
    var m = this.mask;
        if (m != null) {
        $(m).fadeIn();
    }
    $(this.panel).fadeIn();
}

//隐藏弹出窗口
SzdwPopupWindow.prototype.Hide = function () {
    var m = this.mask;
    if (m != null) {
        $(m).fadeOut(300);
    }
    $(this.panel).fadeOut(300);
    this.pagePanel.src = "";
}
//#endregion 显示隐藏

//#region 创建遮罩层
SzdwPopupWindow.prototype.CreateMask = function () {
    if (this.hasMask) {
        var nc = this.namingContainer
        var e = document.createElement("div");
        e.style.position = "absolute";
        e.style.left = "0px";
        e.style.top = "0px";
        e.style.width = "100%";
        e.style.height = "100%";
        e.style.backgroundColor = this.maskBackColor;
        e.style.display = "none";
        $(nc).append(e);
        $(e).fadeTo(0, this.maskOpacity);

        this.mask = e;
    }
}
//#endregion 创建遮罩层

//#region 创建窗体层（视觉上显示为边框）
SzdwPopupWindow.prototype.CreatePanel = function () {
    var nc = this.namingContainer;
    var e = document.createElement("div");
    e.style.position = this.position;
    e.style.display = "none";
    domCommon.SetOpacity(e, this.backColor, this.backOpacity);
    //setOpacity(e, this.backColor, this.backOpacity);
    $(e).appendTo(nc);
    this.panel = e;

    if(!$(nc).data("minWindows")){
        $(nc).data("minWindows", new Array());
    }
}

//设置窗体层
SzdwPopupWindow.prototype.SetPanel = function () {
    var x = this.x;
    var y = this.y;
    var w = this.width;
    var h = this.height;
    var zIndex = this.zIndex;
    var cssName = this.panelCssName;
    var cssJson = this.panelCssJson;

    var p = this.panel;
    this.SetStyleByCssName(p, cssName);
    this.SetStyleByCssJson(p, cssJson);
    $(p).css({ "left": x, "top": y }).outerWidth(w).outerHeight(h);
}

//设置窗体层高宽
SzdwPopupWindow.prototype.SetPanelSize = function (width, height) {
    this.width = width;
    this.height = height;
    $(this.panel).css({ "width": width, "height": height });
}

//设置窗体层位置
SzdwPopupWindow.prototype.SetPanelPosition = function (x, y) {
    this.x = x;
    this.y = y;
    $(this.panel).css({ "left": x, "top": y });
}
//#endregion 创建窗体层（视觉上显示为边框）

//#region 创建标题层
SzdwPopupWindow.prototype.CreateTitle = function () {
    //创建标题层
    var cssName = this.titlePanelCssName;
    var cssJson = this.titlePanelCssJson;
    var panelWidth = this.btnWidth;
    if (this.hasBtnMinimize) { panelWidth += this.btnWidth; }
    if (this.hasBtnWinsize) { panelWidth += this.btnWidth; }
    var pw = this.width - this.borderWidth * 2 - panelWidth;
    var p = document.createElement("div");
    this.SetStyleByCssName(p, cssName);
    this.SetStyleByCssJson(p, cssJson);
    $(p).css({ "position": "relative", "color": this.titleColor }).outerWidth(pw);
    var h = this.titlePanelHeight;

    //图片
    var img = this.titleImage;
    var iw = this.titleImageWidth ? this.titleImageWidth : h;
    if (img) {
        var imgCssName = this.titleImageCssName;
        var imgCssJson = this.titleImageCssJson;
        var ih = this.titleImageHeight ? this.titleImageHeight : this.titleImageWidth;
        var bakImg = "url(" + img + ") left no-repeat";

        var pi = document.createElement("div");
        this.SetStyleByCssName(pi, imgCssName);
        this.SetStyleByCssJson(pi, imgCssJson);
        $(pi).outerWidth(iw).outerHeight(ih).css({ "background": bakImg });
        $(p).append(pi);
    }

    //文字
    var text = this.titleText;
    if (text) {
        var txtCssName = this.titleTextCssName;
        var txtCssJson = this.titleTextCssJson;
        var tw = this.titleTextWidth ? this.titleTextWidth : $(p).width() - iw;
        var th = this.titleTextHeight ? this.titleTextHeight : h;
        var bakImg = "url(" + img + ") center no-repeat";
        var pt = document.createElement("div");
        pt.id = "titleText";
        this.SetStyleByCssName(pt, txtCssName);
        this.SetStyleByCssJson(pt, txtCssJson);
        
        var cssPlus = { "line-height": th + "px", "text-overflow": "ellipsis", "white-space": "nowrap", "overflow": "hidden"};        
        $(pt).outerWidth(tw).outerHeight(th).text(text).css(cssPlus).text(text).attr("title", text);
        if (this.titleCssJson) { this.SetStyleByCssJson(pt, this.titleCssJson);}
        $(p).append(pt);
    }

    //拖动
    if (this.movable) {
        p.onmousemove = function () { MovePopupWindow(this); };
    }
    $(p).appendTo(this.panel);

    this.titlePanel = p;
    $(p).click(function () {
        if (!this.movable) {
            return false;
        }
    });
}

//设置标题层
SzdwPopupWindow.prototype.SetTitle = function () {
    var bw = this.borderWidth;
    var panelWidth = this.btnWidth;
    if (this.hasBtnMinimize) { panelWidth += this.btnWidth; }
    if (this.hasBtnWinsize) { panelWidth += this.btnWidth; }

    var x = bw;
    var y = 0;
    var w = this.width - panelWidth - bw * 2;
    var h = this.titlePanelHeight;

    var e = this.titlePanel;
    $(e).css({ "left": x, "top": y }).outerWidth(w).outerHeight(h);
}

//设置标题层高宽
SzdwPopupWindow.prototype.SetTitleSize = function () {
    var bw = this.borderWidth;
    var panelWidth = this.btnWidth;
    if (this.hasBtnMinimize) { panelWidth += this.btnWidth; }
    if (this.hasBtnWinsize) { panelWidth += this.btnWidth; }

    var w = this.width - panelWidth - bw * 2;
    var h = this.titlePanelHeight;
    $(this.titlePanel).outerWidth(w).outerHeight(h);
}
//#endregion 创建标题层

//#region 创建窗体按钮

//创建窗体按钮面板
SzdwPopupWindow.prototype.CreateBtnPanel = function () {
	var p = document.createElement("div");

    var cssName = this.btnPanelCssName;
    var cssJson = this.btnPanelCssJson;
    var w = this.btnWidth * 3;
    var h = this.btnHeight;
    this.SetStyleByCssName(p, cssName);
    this.SetStyleByCssJson(p, cssJson);
    $(p).outerWidth(w).outerHeight(h).appendTo(this.panel);
    
    this.btnClose = this.CreateBtnClose();
    $(p).append(this.btnClose);
    
    if (this.hasBtnWinsize) {
        this.btnWinsize = this.CreateBtnWinsize();
        $(p).append(this.btnWinsize);
    }

    if (this.hasBtnMinimize) {
        this.btnMinimize = this.CreateBtnMinimize();
        $(p).append(this.btnMinimize)
    }
    
    this.btnPanel = p;
    this.SetBtnPanel();
}

//设置弹窗按钮面板
SzdwPopupWindow.prototype.SetBtnPanel = function () {
    var bw = this.borderWidth;
    var w = this.btnWidth * 3;
    var h = this.btnHeight;
    var x = $(this.panel).width() - bw - w;
    var y = 0;

    $(this.btnPanel).css({ "position": "absolute", "left": x, "top": y }).outerWidth(w).outerHeight(h);
}

SzdwPopupWindow.prototype.SetBtnPanelPosition = function () {
    var bw = this.borderWidth;
    var w = this.btnWidth * 3;
    var x = this.width - bw - w;
    var y = 0;

    $(this.btnPanel).css({ "left": x, "top": y });
}

//创建最小化按钮
SzdwPopupWindow.prototype.CreateBtnMinimize = function () {
    var img = this.btnMinimizeImage;
    var overBc = this.btnMinimizeMouseOverBackColor;
    var leaveBc = this.btnMinimizeMouseLeaveBackColor;
    var opacity = this.backOpacity;
    var w = this.btnWidth;
    var h = this.btnHeight;

    var e = document.createElement("div");
    var cssJson = { "background": "url(" + img + ") no-repeat center", "cursor": "pointer", "float": "right" };
    $(e).css(cssJson).outerWidth(w).outerHeight(h);
    e.onmouseover = function () {
    	domCommon.SetOpacity(this, overBc, opacity);
    	//setOpacity(this, overBc, opacity);
    }
    e.onmouseleave = function () {
    	this.style.backgroundColor = leaveBc;
    }

    var pw = this;
    var nc = this.namingContainer;
    e.onclick = function () {
        pw.HideLoadingPanel();

        var m = pw.winsizeMode;
        if (m > 0) {
            var img = m == 1 ? "SzdwControls/image/popupWindow/restore16w.png" : "../SzdwControls/image/popupWindow/maximize16w.png";
            var titleInfo = m == 1 ? "还原窗口" : "最大化";
            var curMode = m == 1 ? 2 : 1;
            $(pw.btnWinsize).css({ "background": "url(" + img + ") no-repeat center" }).attr("title", titleInfo).data("mode", curMode);
            
            var w = 300;
            var h = pw.titlePanelHeight;
            pw.ReSize(w, h);

            if (typeof (pw.fnMinimize) == "function") pw.fnMinimize();
            pw.winsizeMode = 0;

            //关闭遮罩
            $(pw.mask).hide();

            //最小化窗体写入数组
            var mt = 12;
            var arrMinWin = $(nc).data("minWindows");
            var len = arrMinWin.length;
            var x = $(nc).width() - w - mt;
            var y = mt * (len + 1) + h * len;
            pw.RePosition(x, y);
            arrMinWin.push(pw.titleText);
        }
    };

    return e;
}

//创建最大化（还原）按钮
SzdwPopupWindow.prototype.CreateBtnWinsize = function () {
    var img = this.btnWinsizeImage;
    var overBc = this.btnWinsizeMouseOverBackColor;
    var leaveBc = this.btnWinsizeMouseLeaveBackColor;
    var opacity = this.backOpacity;
    var w = this.btnWidth;
    var h = this.btnHeight;

    var e = document.createElement("div");
    var cssJson = { "background": "url(" + img + ") no-repeat center", "overflow": "hidden", "cursor": "pointer", "float": "right" };
    $(e).css(cssJson).outerWidth(w).outerHeight(h).attr("title", "最大化").data("mode",1);
    e.onmouseover = function () {
    	domCommon.SetOpacity(this, overBc, opacity);
    	//setOpacity(this, overBc, opacity);
    }
    e.onmouseleave = function () { this.style.backgroundColor = leaveBc; }

    var pw = this;
    var nc = this.namingContainer;
    e.onclick = function () {
        var psJson = pw.restoreJson;
        var m = $(this).data("mode");
        var x = m == 1 ? 0 : psJson.x;
        var y = m == 1 ? 0 : psJson.y;
        var w = m == 1 ? $(nc).width() : psJson.width;
        var h = m == 1 ? $(nc).height() : psJson.height;
        
        var img = m == 1 ? "../szdwControls/image/popupWindow/restore16w.png" : "../SzdwControls/image/popupWindow/maximize16w.png";
        var titleInfo = m == 1 ? "还原窗口" : "最大化";
        var curMode = m == 1 ? 2 : 1; 
        $(this).css({ "background": "url(" + img + ") no-repeat center" }).attr("title", titleInfo).data("mode", curMode);

        //设置新的尺寸位置
        pw.RePosition(x, y);
        pw.ReSize(w, h);

        //调用外部函数
        if (typeof (pw.fnWinsize) == "function") pw.fnWinsize(m);

        pw.winsizeMode = m == 1 ? 2 : 1;

        //最小化窗体移出数组
        var arrMinWin = $(nc).data("minWindows");
        arrMinWin.splice($.inArray(pw.titleText, arrMinWin), 1);

        //打开遮罩
        if (pw.hasMask) {
            $(pw.mask).hide();
        }
    };

    return e;
}

//创建关闭按钮
SzdwPopupWindow.prototype.CreateBtnClose = function () {
    var img = this.btnCloseImage;
    var overBc = this.btnCloseMouseOverBackColor;
    var leaveBc = this.btnCloseMouseLeaveBackColor;
    var opacity = this.backOpacity;
    var w = this.btnWidth;
    var h = this.btnHeight;

    var e = document.createElement("div");
    var cssJson = { "background": "url(" + img + ") no-repeat center", "overflow": "hidden", "cursor": "pointer", "float": "right" };
    $(e).css(cssJson).outerWidth(w).outerHeight(h).attr("title", "关闭");
    e.onmouseover = function () {
    	domCommon.SetOpacity(this, overBc, opacity);
    	//setOpacity(this, overBc, opacity);
    }
    e.onmouseleave = function () { this.style.backgroundColor = leaveBc; }

    var pw = this;
    var nc = pw.namingContainer;
    $(e).click(function () {
        pw.Hide();
        
        //最小化窗体移出数组
        var arrMinWin = $(nc).data("minWindows");
        if (arrMinWin) {
            arrMinWin.splice($.inArray(pw.titleText, arrMinWin), 1);
        }

        if (typeof (pw.fnClose) == "function") {
            return pw.fnClose();
        }
        return false;            
    });

    return e;
}
//#endregion 创建弹窗按钮

//#region 创建内容页面层
SzdwPopupWindow.prototype.CreatePagePanel = function () {
    //创建iframe
    var e = document.createElement("iframe");
    e.style.position = "absolute";
    e.allowTransparency = true;
    e.frameBorder = "0";
    e.scrolling = "no";
    e.marginHeight = "0px";
    e.marginWidth = "0px";
    e.src = this.GetFullPageUrl();

    //页面加载完毕后，隐藏动画
    var pw = this;
    $(e).load(function () {
        pw.pageDocument = e.contentDocument || e.contentWindow.document;
        pw.HideLoadingPanel();
    });

    $(e).appendTo(this.panel);
    this.pagePanel = e;
}

//获取完整的待值参数的pageUrl
SzdwPopupWindow.prototype.GetFullPageUrl = function () {
    var pageUrl = this.pageUrl;
    var paramJson = this.pageParamJson;
    if (paramJson) {
        return pageUrl + "?paramJson=" + $.toJSONString(paramJson);
    } else {
        return pageUrl;
    }
}

//设置内容页面层
SzdwPopupWindow.prototype.SetPagePanel = function () {
    var bw = this.borderWidth;
    var th = this.titlePanelHeight;
    var x = bw;
    var y = th;
    var w = this.width - bw * 2;
    var h = this.height - bw - th;
    var e = this.pagePanel;
    this.SetStyleByCssName(e, this.pagePanelCssName);
    this.SetStyleByCssJson(e, this.pagePanelCssJson);
    $(e).css({ "left": x, "top": y, "background-color": this.pagePanelBackColor }).outerWidth(w).outerHeight(h);
    this.pagePanelWidth = w;
    this.pagePanelHeight = h;
}

//设置内容页面层尺寸
SzdwPopupWindow.prototype.SetPagePanelSize = function () {
    var bw = this.borderWidth;
    var th = this.titlePanelHeight;   
    var w = this.width - bw * 2;
    var h = this.height - bw - th;
    var e = this.pagePanel;
    $(e).css({ "width": w, "height": h });
    this.pagePanelWidth = w;
    this.pagePanelHeight = h;
}
//#endregion 创建内容页面层

//#region 定位尺寸

//定位
SzdwPopupWindow.prototype.RePosition = function (x, y) {
    this.SetPanelPosition(x, y);
    if ($(this.btnWinsize).data("mode") == 1) {
        this.restoreJson.x = x;
        this.restoreJson.y = y;
    }
    this.x = x;
    this.w = y;
}

//重设尺寸
SzdwPopupWindow.prototype.ReSize = function (width, height) {
    var w = width;
    var h = height;
    this.SetPanelSize(w, h);
    this.SetTitleSize();
    this.SetBtnPanelPosition();
    this.SetPagePanelSize();

    if ($(this.btnWinsize).data("mode") == 1) {
        this.restoreJson.width = width;
        this.restoreJson.height = height;
    }

    this.width = width;
    this.height = height;
}
//#endregion 定位尺寸

//#region 设置样式

//根据CssName设置样式
SzdwPopupWindow.prototype.SetStyleByCssName = function (element, cssName) {
    if (cssName) { $(element).addClass(cssName); }
}

//根据CssJson设置样式
SzdwPopupWindow.prototype.SetStyleByCssJson = function (element, cssJson) {
    if (cssJson) { $(element).css(cssJson); }
}
//#endregion 设置样式

//#region 加载动画
//加载动画
SzdwPopupWindow.prototype.CreateLoadingPanel = function () {
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

SzdwPopupWindow.prototype.SetLoadingPanel = function () {
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

        $(p).css({ "left": left, "top": top, "z-index": zIndex});
        this.ShowLoadingPanel();
    }
}

SzdwPopupWindow.prototype.ShowLoadingPanel = function () {
    $(this.loadingPanel).fadeIn();
}

SzdwPopupWindow.prototype.HideLoadingPanel = function () {
    $(this.loadingPanel).fadeOut();
}
//#endregion 加载动画