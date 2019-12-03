/// <reference path="SzdwCommon.js" />
/// <reference path="../jquery-1.11.1.js" />
//引用颜色转换JS
//document.write("<script language=javascript src='SzdwCommon.js'></script>");

//#region 关键指标（KPI）呈现控件：SzdwKPI
function SzdwKPI(position, x, y, width, height) {
    //#region 一般属性
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
    //#endregion 一般属性

    //#region 数据
    this.requestUrl = null;
    this.paramJson = null; //json格式{"Year":Year,"TargetTypeId":TargetTypeId}  
    this.jsonData = null; //json格式{"TargetAmount":TargetAmount,"TargetType":TargetType,"AchievedAmount":AchievedAmount,"AchievedRate":AchievedRate}
    //#endregion 数据

    //#region 对象面板
    this.panel = null;
    this.panelCssName = null;
    this.panelCssJson = { "color": "white","border":"0px solid white","background-color":"green","opacity":1};
    //#endregion 对象面板

    //#region head面板
    //head面板:显示标题名称，完成进度百分比
    this.head = null;
    this.headWidth = width;
    this.headHeight = 35;
    this.headCssName = null;
    this.headCssJson = { "font-family": "微软雅黑", "font-size":"10pt","border-bottom": "0px solid #999999", "margin": "0px 5px 0px 5px"};

    //标题
    this.title = null;
    this.titleWidth = 0;
    this.titleHeight = this.headHeight;
    this.titleCssName = null;
    this.titleCssJson = {  "line-height": this.titleHeight + "px","padding-left":"0px"};

    //百分比
    this.percentage = null;
    this.percentageWidth = 0;
    this.percentageHeight = this.headHeight;
    this.percentageCssName = null;
    this.percentageCssJson = {  "line-height": this.percentageHeight + "px", "padding-right": "0px" };
    //#endregion head面板

    //#region body面板
    //body面板：显示完成金额和目标金额
    this.body = null;
    this.bodyWidth = width;
    this.bodyHeight = height - this.headHeight;
    this.bodyCssName = null;
    this.bodyCssJson = { "position": "relative", "font-family": "Vijaya" };

    //实际完成值
    this.achievement = null;
    this.achievementWidth = 0;
    this.achievementHeight = this.bodyHeight;
    this.achievementCssName = null;
    this.achievementCssJson = { "position": "relative", "font-size": "38pt","margin": "0px 0px 0px 10px", "line-height": this.achievementHeight + "px" };

    //分隔器
    this.separator = null;
    this.separatorWidth = 0;
    this.separatorHeight = this.bodyHeight + 10;
    this.separatorCssName = null;
    this.separatorCssJson = { "position": "relative", "font-size": "60pt", "margin": "0px 0px 0px 0px", "line-height": this.separatorHeight + "px" };

    //目标值
    this.target = null;
    this.targetWidth = 0;
    this.targetHeight = this.bodyHeight;
    this.targetCssName = null;
    this.targetCssJson = { "position": "relative", "font-size": "20pt", "margin": "0px 15px 0px 0px", "padding-top": "10px", "line-height": this.targetHeight + "px" };
    //#endregion head面板

    //#region 加载动画
    this.loadingPanel = null;
    this.loadingImg=null;
    this.loadingImgUrl = "../Image/loading.gif"; //加载动画gif文件的URL
    this.loadingImgWidth = 0; //加载动画gif文件的宽度
    this.loadingImgHeight = 0; //加载动画gif文件的高度
    //#endregion 加载动画

    //#region 加载函数
    this.fnInitial = null;//初始化函数
    this.fnCallBack = null; //数据成功加载后执行的外部函数
    //#endregion 加载函数
}
//#endregion 关键指标（KPI）呈现控件：SzdwKPI

//#region 加载
SzdwKPI.prototype.Load = function () {
    if (this.jsonData) {
        this.Create();
    } else {
        this.DataBind();
    }
}

//加入命名容器
SzdwKPI.prototype.AppendToNamingContainer = function () {
    var p = this.panel;
    var nc = this.namingContainer;
    if (nc != null && $(p).parent().length == 0) {
        $(p).appendTo(nc);
    }
}

//创建
SzdwKPI.prototype.Create = function () {
    this.CreatePanel();
    this.CreateHead();
    this.CreateBody();

    //创建时加载的外部函数
    if (typeof (this.fnCallback) == "function") {
        this.fnCallBack();
    }
}
//#endregion 加载

//#region 数据绑定
SzdwKPI.prototype.DataBind = function () {
    //加载动画
    this.CreateLoadingPanel();

    //异步加载数据
    var szdwCtrl = this;
    var url = this.requestUrl;
    var paramJson = this.paramJson;
    $.ajax({ url: url, type: "post", data: paramJson, dataType: "json",
        success: function (jsData) {
            if (!$.isEmptyObject(jsData)) {
                if (szdwCtrl.jsonData == null) {
                    szdwCtrl.jsonData = jsData [0];                    
                    szdwCtrl.Create();
                }
            }
        },
        complete: function () {
            szdwCtrl.HideLoadingPanel();
        }
    });
}

//刷新
SzdwKPI.prototype.Refresh = function () {    
    //加载动画
    this.CreateLoadingPanel();

    //异步加载数据
    var url = this.requestUrl;
    var paramJson = this.paramJson;
    var szdwCtrl = this;
    $.ajax({ url: url, type: "post", data: paramJson, dataType: "json",
        success: function (jsData) {
            //if (!$.isEmptyObject(jsData)) {
                szdwCtrl.jsonData = jsData[0];
                szdwCtrl.Update();
            //}
        },
        complete: function () {
            szdwCtrl.HideLoadingPanel();
        }
    });
}

//更新数据
SzdwKPI.prototype.Update = function () {
    var jsonData = this.jsonData;
    var targetType = "无数据";
    var achievedRate = "完成：" + "-%";
    var achievedAmount = "-";
    var targetAmount = "-";

    if (jsonData) {
         targetType = jsonData.TargetType;
         achievedRate ="完成：" + (jsonData.AchievedRate * 100).toFixed(2) + "%";
         achievedAmount = jsonData.AchievedAmount.toFixed(2);
         targetAmount = jsonData.TargetAmount;
    }

    $(this.title).text(targetType);
    $(this.percentage).text(achievedRate);
    $(this.achievement).text(achievedAmount);
    $(this.target).text(targetAmount);
}
//#endregion 数据绑定

//#region 显示隐藏
//显示页面面板
SzdwKPI.prototype.Show = function () {
    $(this.panel).fadeIn(300);
}

//隐藏页面面板
SzdwKPI.prototype.Hide = function () {    
    $(this.panel).fadeOut(300);
}
//#endregion 显示隐藏

//#region 创建对象面板
SzdwKPI.prototype.CreatePanel = function () {
    //创建iframe
    var p = document.createElement("div");
    p = document.createElement("div"); //对象容器：根对象，控制对象的显示的坐标、宽高、显隐
    p.style.position = this.position;
    p.style.overflow = "hidden"; //对象容器默认没有滚动条

    this.panel = p;
    this.SetPanel();
    this.AppendToNamingContainer();
}

//#endregion 创建对象面板

//#region 创建head
//创建head
SzdwKPI.prototype.CreateHead = function () {
    var w = this.headWidth;
    var h = this.headHeight;

    //创建head
    var p = document.createElement("div");
    this.SetStyleByCssName(p, this.headCssName);
    this.SetStyleByCssJson(p, this.headCssJson);
    if (w > 0) { $(p).outerWidth(w,true); }
    if (h > 0) { $(p).outerHeight(h, true); }

    this.head = p;
    this.CreateTitle();
    this.CreatePercentage();
    $(this.panel).append(p);
}

//创建title
SzdwKPI.prototype.CreateTitle = function () {
    var w = this.titleWidth;
    var h = this.titleHeight;

    //创建title
    var p = document.createElement("div");
    this.SetStyleByCssName(p, this.titleCssName);
    this.SetStyleByCssJson(p, this.titleCssJson);
    if (w > 0) { $(p).outerWidth(w); }
    if (h > 0) { $(p).outerHeight(h); }
    $(p).css({ "float": "left" });

    var text = "-";
    if (this.jsonData) {
        text = this.jsonData.TargetType;
    }
    $(p).text(text);

    this.title = p;
    $(this.head).append(p);
}

//创建Percentage
SzdwKPI.prototype.CreatePercentage = function () {
    var w = this.percentageWidth;
    var h = this.percentageHeight;

    //创建percentage
    var p = document.createElement("div");
    this.SetStyleByCssName(p, this.percentageCssName);
    this.SetStyleByCssJson(p, this.percentageCssJson);
    if (w > 0) { $(p).outerWidth(w); }
    if (h > 0) { $(p).outerHeight(h); }
    $(p).css({ "float": "right" });

    var text = "完成：-%"
    if (this.jsonData) {
        text = "完成："+(this.jsonData.AchievedRate * 100).toFixed(2) + "%";
    }
    $(p).text(text);

    this.percentage = p;
    $(this.head).append(p);
}

//#endregion 创建head

//#region 创建Body
//创建Body
SzdwKPI.prototype.CreateBody = function () {
    var w = this.bodyWidth;
    var h = this.bodyHeight;

    //创建body
    var p = document.createElement("div");
    this.SetStyleByCssName(p, this.bodyCssName);
    this.SetStyleByCssJson(p, this.bodyCssJson);
    if (w > 0) { $(p).outerWidth(w); }
    if (h > 0) { $(p).outerHeight(h); }

    this.body = p;
    this.CreateTarget();
    this.CreateSeparator();
    this.CreateAchievement();
    $(this.panel).append(p);
}

//创建achievement
SzdwKPI.prototype.CreateAchievement = function () {
    var w = this.achievementWidth;
    var h = this.achievementHeight;

    //创建achievement
    var p = document.createElement("div");
    this.SetStyleByCssName(p, this.achievementCssName);
    this.SetStyleByCssJson(p, this.achievementCssJson);
    if (w > 0) { $(p).outerWidth(w); }
    if (h > 0) { $(p).outerHeight(h); }
    $(p).css({ "float": "right" });

    var text = "-";    
    if (this.jsonData) {
        text = this.jsonData.AchievedAmount.toFixed(2);
    }
    $(p).text(text);

    this.achievement = p;
    $(this.body).append(p);
}

//创建Separator
SzdwKPI.prototype.CreateSeparator = function () {
    var w = this.separatorWidth;
    var h = this.separatorHeight;

    //创建separator
    var p = document.createElement("div");
    this.SetStyleByCssName(p, this.separatorCssName);
    this.SetStyleByCssJson(p, this.separatorCssJson);
    if (w > 0) { $(p).outerWidth(w); }
    if (h > 0) { $(p).outerHeight(h); }
    $(p).css({ "float": "right" });
  
    var text = "/";
    $(p).text(text);

    this.separator = p;
    $(this.body).append(p);
}

//创建target
SzdwKPI.prototype.CreateTarget = function () {
    var w = this.targetWidth;
    var h = this.targetHeight;

    //创建target
    var p = document.createElement("div");
    this.SetStyleByCssName(p, this.targetCssName);
    this.SetStyleByCssJson(p, this.targetCssJson);
    if (w > 0) { $(p).outerWidth(w); }
    if (h > 0) { $(p).outerHeight(h); }
    $(p).css({ "float": "right" });

    var text = "-";
    if (this.jsonData) {
        text = this.jsonData.TargetAmount.toFixed(0);
    }
    $(p).text(text);

    this.target = p;
    $(this.body).append(p);
}

//#endregion 创建Body

//#region 设置样式
//设置页面面板
SzdwKPI.prototype.SetPanel = function () {
    var x = this.x;
    var y = this.y;
    var w = this.width;
    var h = this.height;
    var p = this.panel;
    this.SetStyleByCssName(p, this.panelCssName);
    this.SetStyleByCssJson(p, this.panelCssJson);
    $(p).css({ "left": x, "top": y });
    $(p).outerWidth(w,true).outerHeight(h,true);
}

//根据CssName设置Item样式
SzdwKPI.prototype.SetStyleByCssName = function (element, cssName) {
    if (cssName) { $(element).addClass(cssName); }
}

//根据CssJson设置Item样式
SzdwKPI.prototype.SetStyleByCssJson = function (element, cssJson) {
    if (cssJson) { $(element).css(cssJson); }
}

//重设尺寸
SzdwKPI.prototype.Resize = function () {
    var p = this.panel;
    var w = this.width;
    var h = this.height;
    if (w > 0) { $(p).innerWidth(w); }
    if (h > 0) { $(p).innerHeight(h); }
}
//#endregion 设置样式

//#region 加载动画
//加载动画
SzdwKPI.prototype.CreateLoadingPanel = function () {
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

SzdwKPI.prototype.SetLoadingPanel = function () {
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

SzdwKPI.prototype.ShowLoadingPanel = function () {
    $(this.loadingPanel).fadeIn();
}

SzdwKPI.prototype.HideLoadingPanel = function () {
    $(this.loadingPanel).fadeOut();
}
//#endregion 加载动画