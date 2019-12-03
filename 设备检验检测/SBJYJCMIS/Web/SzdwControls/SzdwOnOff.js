///<reference path="domCommon.js" />
///<reference path="../jquery-1.11.1.js" />
//引用颜色转换JS

//#region 开关面板：SzdwOnOff
function SzdwOnOff(position, x, y, width, height) {
    //#region 通用属性
    this.namingContainer = document.body; //命名容器即父容器
    this.position = position ? position : "absolute";
    this.x = x ? x : 0; //坐标x
    this.y = y ? y : 0; //坐标x
    this.width = width ? width : 0; //宽度
    this.height = height ? height : 0; //高度
    this.backColorOn = "Green";
    this.backColorOff = "#666666";
    this.backOpacity = 1;
    this.onOff = true;//当前显示状态
    this.visible = true;
    this.showMode = 0; //显隐模式,0:淡入淡出；1:右滑显示、左滑隐藏;2:左滑显示、右滑隐藏;3：下滑显示、上滑隐藏;4：上滑显示、下滑隐藏;
    this.showSpeed = 300; //显隐速度：毫秒
    this.onText = "开";//为on时显示的文字
    this.offText = "关";//为off时显示的文字
    this.value = false;
    this.fnClickCallBack = null;//单击时执行的外部函数
    this.allowClickEvent = true;//是否允许本对象控件的单击事件
    this.allowSwitchOnClicking = true;//是否允许本对象控件单击时切换当前的开关状态
    //#endregion 通用属性

    //#region 外框
    this.panel = document.createElement("div");
    this.panelCssName = null;
    this.panelCssJson = { "font-family": "微软雅黑", "font-size": "small", "color": "White", "cursor": "pointer", "padding": "3px","display":"none"};
    this.panelText = null;
    //#endregion 外框    

    //#region 关闭按钮
    this.slider = null;
    this.sliderWidth = 0;
    this.sliderHeight = 0;
    this.sliderCssName = null;
    this.sliderCssJson = { "background-color": "#AAAAAA" };
    //#endregion 关闭按钮
    
    //#region 初始化函数
    this.fnInitial=null;
    //#endregion 初始化函数
}
//#endregion 开关面板：SzdwOnOff

//#region 控件的click事件
SzdwOnOff.prototype.Click = function () {
    $(this.panel).trigger("click");
}
//#endregion 控件的click事件

//#region 加载
SzdwOnOff.prototype.Load = function () { 
    this.value = this.onOff;  
    this.Create();
    if (this.visible) this.Show();
}

//将SzdwOnOff加入父容器
SzdwOnOff.prototype.AppendToNamingContainer = function () {
    var p = this.panel;
    var nc = this.namingContainer;
    if (nc != null && $(p).parent().length == 0) {
        $(p).appendTo(nc);
    }
}

//创建
SzdwOnOff.prototype.Create = function () {   
    this.SetPanel();
    this.CreatePanelText();
    this.CreateSlider();

    //载入父容器
    this.AppendToNamingContainer();
}

//#endregion 加载

//#region 显隐

//显示
SzdwOnOff.prototype.Show = function () {
    $(this.panel).fadeIn(this.showSpeed);
    this.visible = true;
}

//隐藏
SzdwOnOff.prototype.Hide = function () {
    $(this.panel).fadeOut(this.showSpeed);
    this.visible = false;
}

//右滑显示(尚未完善）
SzdwOnOff.prototype.SlideLeft = function () {    
    if (!this.visible) {
        var p = this.panel;
        var x = this.x;
        var w = this.width;
        var s = this.showSpeed;

        $(p).css({ "display": "block", "left": x + w }).outerWidth(0);
        $(p).find("div").css({ "display": "block" });
        $(p).animate({ left: x, width: w }, s);
    }
    this.visible = true;
}

//左滑隐藏(尚未完善）
SzdwOnOff.prototype.SlideRight = function () {
    if (this.visible) {
        var p = this.panel;
        var x = this.x;
        var w = this.width;
        var s = this.showSpeed;
        var fnCallBack = function () {
            $(p).find("div").css({ "display": "none", "left": x, "width": w });
            $(p).css({ "display": "none", "left": x }).outerWidth(w);
        }

        $(p).animate({ left: x + w, width: 0 }, s, null, fnCallBack);
    }
    this.visible = false;
}
//#endregion 显隐

//#region 容器面板

//设置容器面板
SzdwOnOff.prototype.SetPanel = function () {
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
    this.SetPosition(x, y);
    this.SetSize(w, h);

    //底色与透明度
    var backColor = this.value ? this.backColorOn : this.backColorOff;
    domCommon.SetOpacity(p, backColor, this.backOpacity);

    //事件
    var szdwCtrl = this;
    var fn = this.fnClickCallBack;    
    $(p).click(function (e) {
        if (szdwCtrl.allowClickEvent) {
            szdwCtrl.value = !szdwCtrl.value;
            szdwCtrl.onOff = !szdwCtrl.onOff;
            if (szdwCtrl.allowSwitchOnClicking) { szdwCtrl.MoveSlider(); }
            if (fn) fn();
            e.stopPropagation();
        }
    });    
}

//定位
SzdwOnOff.prototype.SetPosition = function (x, y) {
    var p = this.panel;
    var position = this.position;
    $(p).css({ "position": position, "left": x, "top": y });
}

//尺寸
SzdwOnOff.prototype.SetSize = function (width,height) {
    var p = this.panel;
    $(p).outerWidth(width).outerHeight(height);
}
//#endregion 容器面板

//#region 开关文字显示面板
SzdwOnOff.prototype.CreatePanelText = function () {
    var p = this.panel;
    var val = this.value;
    var text = val ? this.onText : this.offText;
    var pd = parseInt($(this.panel).css("padding"));
    var w = $(p).width() / 2 - pd;
    var h = $(p).height();
    var cssJson = {  "float": "right","text-align":"center"};
    if (val) {
        cssJson["float"] = "left";
    }
    if (h) cssJson["line-height"] = h + "px";

    var e = document.createElement("div");
    $(e).css(cssJson).text(text).outerWidth(w).outerHeight(h);
    $(e).bind("selectstart", function () { return false; });

    $(p).append(e)
    this.panelText = e;
}
//#endregion 开关文字显示面板

//#region 滑块
SzdwOnOff.prototype.CreateSlider = function () {
    var cssName = this.sliderCssName;
    var cssJson = this.sliderCssJson;
    var pw = $(this.panel).width();
    var ph = $(this.panel).height();
    var sw = this.sliderWidth;
    var sh = this.sliderHeight;

    var w = sw > 0 ? sw : pw / 2;
    var h = sh > 0 ? sh : ph;

    var pdl = parseInt($(this.panel).css("padding-left"));
    var pdr = parseInt($(this.panel).css("padding-right"));
    var x = this.value ? pw - w + pdl : pdl;   

    var e = document.createElement("div");
    this.SetStyleByCssName(e, cssName);
    this.SetStyleByCssJson(e, cssJson);
    $(e).outerWidth(w).outerHeight(h).css({ "position": "absolute", "left": x, "font-size": "9pt", "text-align": "center", "line-height": h + "px" }).text("III");
    
    $(e).bind("selectstart", function () { return false; });
    $(this.panel).append(e);

    this.sliderWidth = w;
    this.sliderHeight = h;
    this.slider = e;
}

//滑块移动
SzdwOnOff.prototype.MoveSlider = function () {
    var val = this.value;
    var p = this.panel;
    var pt = this.panelText;
    var pw = $(p).width();
    var sw = this.sliderWidth;
    var pdl = parseInt($(p).css("padding-left"));
    var pdr = parseInt($(p).css("padding-right"));
    var w = sw > 0 ? sw : pw / 2;
    var x = val ? pw - sw + pdr : pdl;
    var s = this.showSpeed;
    var fldText = val ? "left" : "right";
    var text = val ? this.onText : this.offText;
    var fldS = val ? "right" : "left";

    $(pt).fadeOut(s);
    var szdwCtrl = this;
    var backColor = val ? this.backColorOn : this.backColorOff;
    $(this.slider).animate( { left: x }, s, null, function () {
            $(pt).css({ "float": fldText }).text(text).fadeIn(s);
            $(p).css({ "background-color": backColor });
        }
    );
}
//#endregion 滑块

//#region 设置样式

//根据CssName设置样式
SzdwOnOff.prototype.SetStyleByCssName = function (element, cssName) {
    if (cssName) { $(element).addClass(cssName); }
}

//根据CssJson设置样式
SzdwOnOff.prototype.SetStyleByCssJson = function (element, cssJson) {
    if (cssJson) { $(element).css(cssJson); }
}

//#endregion 设置样式