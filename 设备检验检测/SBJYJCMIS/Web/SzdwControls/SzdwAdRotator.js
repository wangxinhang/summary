/// <reference path="domCommon.js" />
/// <reference path="../jquery-1.11.1.js" />
//引用颜色转换JS

//#region 轮播器：SzdwAdRotator
function SzdwAdRotator(position, x, y, width, height) {
    //#region 通用属性
    this.namingContainer = document.body; //命名容器即父容器
    this.position = position ? position : "absolute";
    this.zIndex = 0;
    this.x = x ? x : 0; //坐标x
    this.y = y ? y : 0; //坐标x
    this.width = width ? width : 0; //宽度
    this.height = height ? height : 0; //高度
    this.showMode = 0; //显隐模式,0:淡入淡出；1:右滑显示、左滑隐藏;2:左滑显示、右滑隐藏;3：下滑显示、上滑隐藏;4：上滑显示、下滑隐藏;
    this.showSpeed = 600; //显隐速度：毫秒
    this.intervalTime = 5000;//显示间隔事件：毫秒
    this.intervalHandle = null;//自动播放SetInterval方法的句柄
    this.isAutoPlay = false;//是否自动播放
    this.currentIndex = 0;//轮播器当前轮播索引
    this.hasTitlePanel = true;//是否有标题面板
    this.showSwitchPanel = true;//是否显示切换按钮组
    this.hasPageButton = true;//是否有翻页按钮


    //#endregion 通用属性

    //#region 外框
    this.panel = document.createElement("div");
    this.panelCssName = null;
    this.panelCssJson = { "font-family": "微软雅黑", "font-size": "small", "background-color": "transparent" };
    //#endregion 外框

    //#region AdPanel层
    this.adPanel = null;
    this.adPanelCssName = null;
    this.adPanelCssJson = {
        "left": 0, "top": 0, "width": "100%", "height": "100%", "display": "none",
        'background-repeat': 'no-repeat', 'background-size': '100% 100%'        
        //'background-color':'','background-position':'','background-size':'','background-repeat':'',
        //'background-origin':'','background-clip': '', 'background-attachment': '
    };
    //#endregion AdPanel层

    //#region 标题
    this.titlePanel = null;
    this.titlePanelX = 256;
    this.titlePanelY = 84;
    this.titlePanelWidth = 800;
    this.titlePanelHeight = 64;
    this.titleText = "";
    this.titlePanelCssName = null;
    this.titlePanelCssJson = {"position":"absolute", "font-family": "微软雅黑", "fontSize": "32pt", "color": "White", "display": "none" };
    //#endregion 标题

    //#region 切换按钮组
    this.switchPanel = null;
    this.switchPanelX = 0;
    this.switchPanelY = 0;
    this.switchPanelWidth = 0;
    this.switchPanelHeight = 0;
    this.switchPanelCssName = null;
    this.switchPanelCssJson = { "position": "absolute" };

    this.switchButtonWidth = 16;
    this.switchButtonHeight = 16;
    this.switchButtonCssName = null;
    this.switchButtonCssJson = { "float": "left", "cursor": "pointer", "margin": "0px 10px 0px 10px", "border": "1px solid #999999", "background-color": "transparent" };
    this.switchButtonSelectedCssName = null;
    this.switchButtonSelectedCssJson = { "cursor": "pointer", "border": "1px solid #FFFFFF", "background-color": "#FFFFFF" };

    this.switchButtonList = new Array();
    this.switchButtonSelected = null;
    //#endregion 切换按钮组

    //#region 翻页按钮
    this.btnPageSizeAutoSetting = true;//自动判断设定翻页按钮大小，若为false，则btnPageSizeType设定无效
    this.btnPageSizeType = 1;//1:大（尺寸48px，图片32）；2：小（尺寸24px，图片16）
    this.btnPageOffsetX = 16;
    this.btnPageWidth = 48;
    this.btnPageHeight = 48;
    this.btnPageBackColor = "#222222";
    this.btnPageOpacity = 0.6;
    this.btnPageHoverOpacity = 0.8;
    this.btnPageBorderRadius = this.btnPageWidth / 2;
    this.btnPageCssName = null;
    this.btnPageCssJson = {
        "position": "absolute", "cursor": "pointer","display":"none"
    };

    this.btnPrev = null;
    this.btnPrevX = 0;
    this.btnPrevY = 0;
    this.btnPrevCssName = null;
    this.btnPrevCssJson = {
        "background": "url('/SzdwControls/image/adRatator/arrowLeft32W.png') no-repeat center"
    };
    this.btnPrevFnClick = null;

    this.btnNext = null;
    this.btnNextX = 0;
    this.btnNextY = 0;
    this.btnNextCssName = null;
    this.btnNextCssJson = {
        "background": "url('/SzdwControls/image/adRatator/arrowRight32W.png') no-repeat center"
    };
    this.btnNextFnClick = null;

    //#endregion 翻页按钮

    //#region 数据Json对象数组
    this.jsonList = new Array();
    //格式：[
    //    { text: "",image: "",href:"",fnClick:fnClick,
    //      textCss:{'left':0,'top':0,'width':0,'height':0,'color':'','font-family':'','font-size':'',''font-weight':'',……} ,
    //      backgroundCss:{'background-color':'','background-position':'','background-size':'','background-repeat':'','background-origin':'','background-clip': '', 'background-attachment': ''}
    //    },

    //    { text: "",image: "",href:"",fnClick:fnClick,
    //      textCss:{'left':0,'top':0,'width':0,'height':0,'color':'','font-family':'','font-size':'',''font-weight':'',……} ,
    //      backgroundCss:{'background-color':'','background-position':'','background-size':'','background-repeat':'','background-origin':'','background-clip': '', 'background-attachment': ''}
    //    },

    //     ……
    //]
    //#endregion Json对象数组
    
    //#region 事件
    this.fnSwitch = null;//切换时的事件
    //#endregion 事件
    
    //#region 初始化函数
    this.fnInitial = null;
    //#endregion 初始化函数
}
//#endregion 广告轮换器：SzdwAdRotator

//#region 加载

SzdwAdRotator.prototype.Load = function () {
    if (this.jsonList && this.currentIndex >= this.jsonList.length) {
        this.currentIndex = this.jsonList.length - 1;
    }

    if (this.currentIndex < 0) { this.currentIndex = 0; }
    this.SetPageButtonSize();
    this.Create();
    this.AutoShow();
}

//将SzdwAdRotator加入父容器
SzdwAdRotator.prototype.AppendToNamingContainer = function () {
    var p = this.panel;
    var nc = this.namingContainer;
    if (nc != null && $(p).parent().length == 0) {
        $(p).appendTo(nc);
    }
}

//创建
SzdwAdRotator.prototype.Create = function () {
    if (this.jsonList.length == 1) {
        this.hasPageButton = false;
    }

    this.SetPanel();
    this.CreateAdPanel();
    this.CreateTitlePanel();
    this.CreateSwitchPanel();
    this.Show();
    if (this.hasPageButton) {
        this.btnPrev = this.CreatePageButton(1);
        this.btnNext = this.CreatePageButton(2);
        $(this.panel).append(this.btnPrev).append(this.btnNext);
        var szdwCtrl = this;
        var s = 300;
        $(this.panel).mouseover(function () {
            $(szdwCtrl.btnPrev).fadeIn(s);
            $(szdwCtrl.btnNext).fadeIn(s);
        }).mouseleave(function () {
            $(szdwCtrl.btnPrev).fadeOut(s);
            $(szdwCtrl.btnNext).fadeOut(s);
        });
    }

    //载入父容器
    this.AppendToNamingContainer();
}

//#endregion 加载

//#region 显示隐藏

//显示
SzdwAdRotator.prototype.Show = function () {
    if (this.currentIndex == this.jsonList.length) { this.currentIndex = 0; }
    var i = this.currentIndex;
    var s = this.showSpeed;    


    //设置文字
    var szdwCtrl = this;
    var tp = this.titlePanel;
    if (this.hasTitlePanel) {
        $(tp).fadeOut(s, null, function () { szdwCtrl.UpdateTitleText(i); });
    }

    //设置图片
    var p = this.adPanel;
    var adPanelCss = this.adPanelCssJson;
    var backCss=this.GetAdPanelBackgroundCss(i);
    $(p).fadeOut(s, null, function () {
        szdwCtrl.SetAdPanelCss();
        $(this).css(backCss)
    });

    //显示
    $(p).fadeIn(s);
    $(tp).fadeIn(s);   

    //切换按钮组按钮切换
    var oldBtnSelected = this.switchButtonSelected;
    if (oldBtnSelected) {
        this.SetStyleByCssName(oldBtnSelected, this.switchButtonCssName);
        this.SetStyleByCssJson(oldBtnSelected, this.switchButtonCssJson);
    }

    var btnList = this.switchButtonList;
    var btnSelected = btnList[i];
    this.SetStyleByCssName(btnSelected, this.switchButtonSelectedCssName);
    this.SetStyleByCssJson(btnSelected, this.switchButtonSelectedCssJson);
    this.switchButtonSelected = btnSelected;

    //轮播索引自增
    this.currentIndex++;
}

//设置AdPanel的背景
SzdwAdRotator.prototype.GetAdPanelBackgroundCss = function (i) {
    var jd =  this.jsonList[i];
    var image = jd.image;
    var backCss = jd.backgroundCss ? jd.backgroundCss : {};
    backCss['background-image'] = 'url(' + image + ')';

    return backCss; 
}

//自动轮播
SzdwAdRotator.prototype.AutoShow = function () {
    var szdwCtrl = this;
    this.intervalHandle = setInterval(function () {
        szdwCtrl.Show();
    }, szdwCtrl.intervalTime);
}
//#endregion 显示隐藏

//#region 容器面板

//设置容器面板
SzdwAdRotator.prototype.SetPanel = function () {
    var p = this.panel;
    var cssName = this.panelCssName;
    var cssJson = this.panelCssJson;

    //基本样式
    this.SetStyleByCssName(p, cssName);
    this.SetStyleByCssJson(p, cssJson);

    //位置尺寸
    var x = this.x;
    var y = this.y;
    var w = this.width;
    var h = this.height;
    var position = this.position;
    $(p).outerWidth(w).outerHeight(h).css({ "position": position, "left": x, "top": y });

    //事件：触发和停止轮播
    var szdwCtrl = this;
    $(p).mouseover(function () {
        clearInterval(szdwCtrl.intervalHandle);
    }).mouseleave(function () {
        szdwCtrl.AutoShow();
    });
}
//#endregion 容器面板

//#region AdPanel层
SzdwAdRotator.prototype.CreateAdPanel = function () {
    //创建标题层
    var e = document.createElement("div");
    $(e).appendTo(this.panel);
    this.adPanel = e;

    //设置
    this.SetAdPanel();
}

//设置
SzdwAdRotator.prototype.SetAdPanel = function () {
    var jsonList = this.jsonList;
    var p = this.adPanel;   
    
    //事件
    var szdwCtrl = this;
    $(p).click(function (e) {
        var i = szdwCtrl.currentIndex - 1;
        var jd = jsonList[i];
        var href = jd.href;
        var fnClick = jd.fnClick;

        //执行外部方法
        if (fnClick) { fnClick(); }

        //转向页面
        if (href) {
            window.open(href);
        }

        //阻止冒泡
        e.stopPropagation();
    });
}

//设置AdPanel样式
SzdwAdRotator.prototype.SetAdPanelCss = function () {
    var cssName = this.adPanelCssName;
    var cssJson = this.adPanelCssJson;
    var p = this.adPanel;

    this.SetStyleByCssName(p, cssName);
    this.SetStyleByCssJson(p, cssJson);
}

//#endregion AdPanel层

//#region 标题层
SzdwAdRotator.prototype.CreateTitlePanel = function () {
    if (this.hasTitlePanel) {
        //创建标题层
        var e = document.createElement("div");
        $(e).appendTo(this.panel);
        this.titlePanel = e;

        //设置
        this.SetTitlePanel();
    }
}

//设置标题
SzdwAdRotator.prototype.SetTitlePanel = function () {      
    var p = this.titlePanel;

    //事件
    var szdwCtrl = this;
    $(p).click(function (e) {
        $(szdwCtrl.adPanel).trigger("click");

        //阻止冒泡
        e.stopPropagation();
    });
}

//设置TitlePanell样式
SzdwAdRotator.prototype.SetTitlePanelCss = function () {
    var cssName = this.titlePanelCssName;
    var cssJson = this.titlePanelCssJson;

    var p = this.titlePanel;
    this.SetStyleByCssName(p, cssName);
    this.SetStyleByCssJson(p, cssJson);
}

//更新载入新标题文字
SzdwAdRotator.prototype.UpdateTitleText = function (i) {
    var jd = this.jsonList[i]
    var x = this.titlePanelX;
    var y = this.titlePanelY;
    var w = this.titlePanelWidth;
    var h = this.titlePanelHeight;
    this.titleText = jd.text;
    $(this.titlePanel).text(this.titleText).outerWidth(w).outerHeight(h).css({ "left": x, "top": y });
    
    this.SetTitlePanelCss();
    var textCss = jd.textCss;
    if (textCss) {
        $(this.titlePanel).css(textCss);
    }
}
//#endregion 标题层

//#region 切换按钮组

//创建
SzdwAdRotator.prototype.CreateSwitchPanel = function () {
    var e = document.createElement("div");
    $(e).appendTo(this.panel);
    this.switchPanel = e;
   
    //设置
    this.SetSwitchPanel();
}

//设置
SzdwAdRotator.prototype.SetSwitchPanel = function () {    
    var cssName = this.switchPanelCssName;
    var cssJson = this.switchPanelCssJson;

    var e = this.switchPanel;
    this.SetStyleByCssName(e, cssName);
    this.SetStyleByCssJson(e, cssJson);

    //创建按钮组
    var len = this.jsonList.length;
    var spw = 0;
    var sph = 0;
    for (var i = 0; i < len; i++) {
        var btn = this.CreateSwitchButton();
        $(btn).data("index", i);
        if (i == this.currentIndex-1) {
            this.SetStyleByCssName(btn, this.switchButtonSelectedCssName);
            this.SetStyleByCssJson(btn, this.switchButtonSelectedCssJson);
            this.switchButtonSelected = btn;
        };

        $(e).append(btn);
        spw += $(btn).outerWidth(true);
        sph = $(btn).outerHeight(true);

        this.switchButtonList.push(btn);
    }
    
    //设置尺寸位置
    var pw = this.width;
    var ph = this.height;
    var w = this.switchPanelWidth ? this.switchPanelWidth : spw;
    var h = this.switchPanelHeight ? this.switchPanelHeight : sph;    
    var x = this.switchPanelX ? this.switchPanelX : (pw - w) / 2;
    var y = this.switchPanelY ? this.switchPanelY : ph - h * 4;    
    $(e).outerWidth(w + 2).outerHeight(h).css({ "left": x, "top": y });

    if (!this.showSwitchPanel) {
        $(e).hide();
    }
}

//创建切换按钮
SzdwAdRotator.prototype.CreateSwitchButton = function () {
    var w = this.switchButtonWidth;
    var h = this.switchButtonHeight;
    var cssName = this.switchButtonCssName;
    var cssJson = this.switchButtonCssJson;
    var selectedCssName = this.switchButtonSelectedCssName;
    var selectedCssJson = this.switchButtonSelectedCssJson;
    var fnClick = this.fnSwitch;

    //创建
    var btn = document.createElement("div");
    this.SetStyleByCssName(btn, cssName);
    this.SetStyleByCssJson(btn, cssJson);
    $(btn).outerWidth(w).outerHeight(h);

    //事件
    var szdwCtrl = this;
    $(btn).click(function () {
        var btnSelected = szdwCtrl.switchButtonSelected;
        if (btnSelected) {
            szdwCtrl.SetStyleByCssName(btnSelected, cssName);            
            szdwCtrl.SetStyleByCssJson(btnSelected, cssJson);
        }

        szdwCtrl.SetStyleByCssName(this, selectedCssName);
        szdwCtrl.SetStyleByCssJson(this, selectedCssJson);
        szdwCtrl.switchButtonSelected = this;
        szdwCtrl.currentIndex = $(this).data("index");
        szdwCtrl.Show();

        //执行外部事件
        if (fnClick) { fnClick();}
    });

    return btn;
}
//#endregion 切换按钮组

//#region 翻页按钮

//设置翻页按钮大小
SzdwAdRotator.prototype.SetPageButtonSize = function () {
    if (this.btnPageSizeAutoSetting) {
        var type = this.btnPageSizeType;
        this.btnPageWidth = this.btnPageWidth / type;
        this.btnPageHeight = this.btnPageHeight / type;;
        this.btnPageBorderRadius = this.btnPageWidth / 2;
        this.switchButtonWidth = this.switchButtonWidth / type;
        this.switchButtonHeight = this.switchButtonHeight / type;
        if (type == 2) {
            this.btnPrevCssJson = {
                "background": "url('/SzdwControls/image/adRatator/arrowLeft16W.png') no-repeat center"
            };
            this.btnNextCssJson = {
                "background": "url('/SzdwControls/image/adRatator/arrowRight16W.png') no-repeat center"
            };
        }
    }
}

//创建翻页按钮
//type:1,前翻，2后翻
SzdwAdRotator.prototype.CreatePageButton = function (type) {
    //共同属性设置
    var w = this.btnPageWidth;
    var h = this.btnPageHeight;
    var offsetX = this.btnPageOffsetX;
    var cssName = this.btnPageCssName;
    var cssJson = this.btnPageCssJson;
    var opacity = this.btnPageOpacity;
    var hoverOpacity = this.btnPageHoverOpacity;
    var backColor = this.btnPageBackColor;
    var borderRadius = this.btnPageBorderRadius;
    var borderRadiusCssJson = {
        "border-radius": borderRadius + "px", "moz-border-radius": borderRadius + "px", "-webkit-border-radius": borderRadius + "px"
    }

    //创建
    var btn = document.createElement("div");
    this.SetStyleByCssName(btn, cssName);
    this.SetStyleByCssJson(btn, cssJson);
    $(btn).outerWidth(w).outerHeight(h).css(borderRadiusCssJson).prop("type", type);
    
    //不同按钮的个性化设置
    var privateCssName = type == 1 ? this.btnPrevCssName : this.btnNextCssName;
    var privateCssJson = type == 1 ? this.btnPrevCssJson : this.btnNextCssJson;

    this.SetStyleByCssName(btn, privateCssName);
    this.SetStyleByCssJson(btn, privateCssJson);
    this.SetPageButtonXY(btn);

    //鼠标事件
    domCommon.SetOpacity(btn, backColor, opacity);
    var fnClick = type == 1 ? this.btnPrevFnClick : this.btnNextFnClick;

    var szdwCtrl = this;
    $(btn).mouseover(function () {
        domCommon.SetOpacity(btn, backColor, hoverOpacity);
    }).mouseout(function () {
        domCommon.SetOpacity(btn, backColor, opacity);
    }).click(function () {
        szdwCtrl.PageButtonClick(type);
        if (fnClick) {
            fnClick(szdwCtrl);
        }
    });
    
    return btn;
}

SzdwAdRotator.prototype.SetPageButtonXY = function (btn) {
    var p = this.panel;
    var pw = $(p).width();
    var ph = $(p).height();
    var w = this.btnPageWidth;
    var h = this.btnPageHeight;
    var offsetX = this.btnPageOffsetX;
    var type = $(btn).prop("type");
    if (type == 1) {//btnPrev       
        x = this.btnPrevX == 0 ? offsetX : this.btnPrevX;
        y = this.btnPrevY == 0 ? (ph - h) / 2 : this.btnPrevY;       
    }

    if (type == 2) {//btnNext     
        x = this.btnNextX == 0 ? pw - w - this.btnPageOffsetX : this.btnNextX;
        y = this.btnNextY == 0 ? (ph - h) / 2 : this.btnNextY;
    }

    var cssXY = { "left": x, "top": y };
    $(btn).css(cssXY);
}

SzdwAdRotator.prototype.PageButtonClick = function (type) {
    var sBtnList = this.switchButtonList;
    var len = sBtnList.length;
    var i;

    if (type == 1) {
        i = this.currentIndex - 2;
        i = i < 0 ? len - 1 : i;
    }
    if (type == 2) {
        i = this.currentIndex;
        i = i == len ? 0 : i;
    }
    var sbtn = sBtnList[i];
    $(sbtn).trigger("click");
}
//#endregion 翻页按钮

//#region 定位尺寸

//定位
SzdwAdRotator.prototype.RePosition = function (x, y) {
    var p = this.panel;
    var position = this.position;
    $(p).css({ "position": position, "left": x, "top": y });

}

//尺寸
SzdwAdRotator.prototype.ReSize = function (width, height) {
    var p = this.panel;
    $(p).outerWidth(width);
    if (height) {
        $(p).outerHeight(height);
    }

    //切换按钮组面板横坐标
    var sp = this.switchPanel;    
    var spw = $(sp).outerWidth(true);
    var spx = (width - spw) / 2;
    $(sp).css({ "left": spx });

    if (this.hasPageButton) {
        this.SetPageButtonXY(this.btnPrev);
        this.SetPageButtonXY(this.btnNext);
    }
}
//#endregion 定位尺寸

//#region 设置样式

//根据CssName设置样式
SzdwAdRotator.prototype.SetStyleByCssName = function (element, cssName) {
    if (cssName) { $(element).addClass(cssName); }
}

//根据CssJson设置样式
SzdwAdRotator.prototype.SetStyleByCssJson = function (element, cssJson) {
    if (cssJson) { $(element).css(cssJson); }
}
//#endregion 设置样式