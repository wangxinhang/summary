//数据表扩展选择框组对象SzdwCheckBoxList
/// <reference path="../jquery-1.11.1.js" />
/// <reference path="../EventUtil.js" />
/// <reference path="SzdwCommon.js" />

//#region 选择框组对象SzdwCheckBoxList
function SzdwCheckBoxList(position, x, y, width, height) {
    //#region 通用属性
    this.position = position;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.namingContainer = null; //命名容器，即父容器
    this.targetControl = null; //与之关联的目标控件
    this.direction = 0; //选择框组排列方向,0：水平排列(默认），1：垂直方向
    this.hasTitle = false; //是否有标题
    this.hasButton = false; //是否有应用按钮
    this.showAll = true; //加载时是否一并显示列表项
    this.allowLeastOne = true;//是否限制至少选择一项
    this.allowMouseleave = true; //是否允许执行panel的mouseleave事件中的命令
    this.themeType = 1; //主体类别：1：黑色；2：浅色；默认：1
    this.backgroundColor = this.themeType == 1 ? "black" : "transparent";  //控件背景色
    this.opacity = this.themeType == 1 ? 0.5 : 1;  //控件背景色透明度
    this.hoverOpacity = this.themeType == 1 ? 0.7 : 1; //控件背景色透明度
    //#endregion 通用属性

    //#region 数据
    this.jsonList = null; //选择框的相关数据:比如[{Text:"编辑",Value:0,Title:"编辑",FnClick:ModifyClick,FnParams:params,CssJson:cssJson}]
    this.checkBoxArray = new Array(); //创建后的选择框对象列表
    this.fieldText = "Text";
    this.fieldValue = "Value";
    //#endregion 数据

    //#region 外框
    this.panel = document.createElement("div");
    this.panel.style.overflow = "hidden";
    this.panel.style.padding = "0";
    this.panel.style.margin = "0";
    this.panel.style.position = position == null ? "absolute" : position;  
    this.panelCssName = null;
    this.panelCssJson = { "font-family": "微软雅黑", "font-size": "small",  "color": "White" };
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
    this.itemHeight = 0;
    this.itemOffsetRight = 20;
    this.itemCssName = null;
    this.itemCssJson = { "position": "relative", "background-color": "transparent", "padding": "3px 10px 3px 10px", "cursor": "pointer" }; //relative
    this.itemCheckedCssName = null;
    this.itemCheckedCssJson = null;
    this.itemHoverCssName = null;
    this.itemHoverCssJson = { "background-color": "#333333", "color": "White" };
    this.checkBoxCssName = null;
    this.checkBoxCssJson = { "position": "relative", "float": "left", "margin": 0}; //relative
    this.checkBoxWidth = 15;
    this.checkLabelCssName = null;
    this.checkLabelCssJson = { "position": "relative", "float": "left", "padding-left": "10px" }; //relative
    this.checkLabelLineHeight = 18;
    this.checkBoxDisabled = false;
    //#endregion 选择框列表面板

    //#region 应用按钮
    //按钮
    this.button = null;
    this.btnWidth = 70;
    this.btnHeight = 26;
    this.btnCssName = null;
    this.btnCssJson = { "position": "relative", "background-color": "transparent", "border": "1px solid #666666", "margin-left": "5px", "padding": "0px 5px 0px 5px", "cursor": "pointer" }; //relative
    this.btnHoverCssName = null;
    this.btnHoverCssJson = { "background-color": "#333333",  "color": "White" };
    this.btnCallBack = null;

    //按钮图片
    this.btnImage = null;//按钮图片文件
    this.btnImageCssName = null;
    this.btnImageCssJson = null;

    //按钮文字
    this.btnText = "应用";
    this.btnTextCssName = null;
    this.btnTextCssJson = { "text-align": "center", "padding": "0px 1px 0px 1px"};

    //#endregion 应用按钮面板

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
SzdwCheckBoxList.prototype.Load = function () {
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

    //载入CheckBox列表
    this.CreateCheckBoxList();

    //载入应用按钮
    if (this.hasButton) {
        this.CreateSeparator();
        this.CreateButton();
    }
}

//将SzdwCheckBoxList加入父容器
SzdwCheckBoxList.prototype.AppendToNamingContainer = function () {
    var p = this.panel;
    var nc = this.namingContainer;
    if (nc != null && $(p).parent().length == 0) {
        $(p).appendTo(nc);
    }
}
//#endregion 载入

//#region 显隐
//显示SzdwCheckBoxList
SzdwCheckBoxList.prototype.Show = function () {
    $(this.panel).fadeIn();
}

//隐藏SzdwCheckBoxList
SzdwCheckBoxList.prototype.Hide = function () {
    $(this.panel).fadeOut();
}

//下展SzdwCheckBoxList
SzdwCheckBoxList.prototype.SlideDown = function () {
    $(this.panel).slideDown(300);
}

//上收SzdwCheckBoxList
SzdwCheckBoxList.prototype.SlideUp = function () {
    $(this.panel).slideUp();
}
//#endregion 显隐

//#region 容器面板
//设置Panel
SzdwCheckBoxList.prototype.SetPanel = function () {
    var p = this.panel;
    this.SetStyleByCssName(p, this.panelCssName);
    this.SetStyleByCssJson(p, this.panelCssJson);
    $(p).css({"background-color": this.backgroundColor, "opacity": this.opacity});

    var cssJsonPlus = this.direction == 0 ? { "padding": "0px 5px 0px 5px"} : { "padding": "0px" };
    $(p).css(cssJsonPlus);

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
SzdwCheckBoxList.prototype.Mouseover = function () {
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
SzdwCheckBoxList.prototype.Mouseleave = function () {
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
SzdwCheckBoxList.prototype.SetPosition = function (x, y) {
    $(this.panel).css({ "left": x });
    $(this.panel).css({ "top": y });
}

//设置尺寸
SzdwCheckBoxList.prototype.SetSize = function (width, height) {
    if (width > 0) { $(this.panel).outerWidth(width); }
    if (height > 0 & this.direction == 0) { $(this.panel).outerHeight(height); }
}
//#endregion 容器面板

//#region 创建标题
SzdwCheckBoxList.prototype.CreateTitle = function () {
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
SzdwCheckBoxList.prototype.CreateCheckBoxList = function () {
    var data = this.jsonList;
    //创建选择框列表
    if (data != null) {
        var lp = document.createElement("div");
        this.SetStyleByCssName(lp, this.listPanelCssName);
        this.SetStyleByCssJson(lp, this.listPanelCssJson);
        if (this.direction == 0) { $(lp).css({ "float": "left" }); }
        if (!this.showAll) { $(lp).css({ "display": "none" }); }

        var cssJsonPlus = this.direction == 0 ? { "padding": "0px 5px 0px 5px"} : { "padding": "5px 0px 5px 0px" };
        $(lp).css(cssJsonPlus);
        this.listPanel = lp;
        $(this.panel).append(lp);

        var len = data.length;
        for (var i = 0; i < len; i++) {
            var jd = data[i];
            var chkItem = this.CreateCheckBox(jd);
            if (this.direction == 0) { $(chkItem).css({ "float": "left" }); }
            $(lp).append(chkItem);
            if (this.direction == 1) {    
                var lbl = $(chkItem).data("label");
                var lblH = $(lbl).outerHeight(true);
                var itemH = $(chkItem).height();   
                if (lblH > itemH) {                 
                    $(lbl).css({ 'line-height': this.checkLabelLineHeight + "px" });
                    var h = $(lbl).outerHeight(true);
                    $(chkItem).height(h);   
                } else {
                    var chk = $(chkItem).data("checkBox");
                    $(chk).outerHeight(lblH, true);
                }
            }

            //选择框对象写入对象数组
            //this.checkBoxArray.push(chkItem);
        }

    }
}

//创建选择框
SzdwCheckBoxList.prototype.CreateCheckBox = function (jsonData) {
    var w = this.itemWidth ? this.itemWidth : $(this.panel).width() - this.itemOffsetRight;
    var h = this.height > 0 ? this.height : Math.max(this.titleHeight, this.titleImageHeight, this.itemHeight, this.btnHeight);
    var cssName = this.itemCssName;
    var cssJson = this.itemCssJson;
    var paramCssJson = jsonData.CssJson;
    var checkBoxCssName = this.checkBoxCssName;
    var checkBoxCssJson = this.checkBoxCssJson;
    var checkBoxWidth = this.checkBoxWidth;
    var checkLabelCssName = this.checkLabelCssName;
    var checkLabelCssJson = this.checkLabelCssJson;

    //#region 创建项

    //选择框外框
    var item = document.createElement("div");

    //设置提示文字
    if (jsonData.Title) { item.title = jsonData.Title; }

    //设置样式
    this.SetStyleByCssName(item, cssName);
    this.SetStyleByCssJson(item, cssJson);
    if (w > 0) { $(item).width(w); }
    if (h > 0) { $(item).height(h).css({ "line-height": h + "px" }); }
    if (paramCssJson) { $(item).css(paramCssJson); }

    //选择框
    var cb = document.createElement("div");
    var text = jsonData.Text ? jsonData.Text : jsonData[this.fieldText];
    var chk = document.createElement("input");
    chk.id = "chk" + text;
    $(chk).attr("type", "checkbox").attr("disabled", this.checkBoxDisabled).appendTo(cb);
    this.SetStyleByCssName(cb, checkBoxCssName);
    this.SetStyleByCssJson(cb, checkBoxCssJson);
    $(cb).outerWidth(this.checkBoxWidth).outerHeight(h);    

    //选择框文字  
    var lbl = document.createElement("div");
    this.SetStyleByCssName(lbl, checkLabelCssName);
    this.SetStyleByCssJson(lbl, checkLabelCssJson);
    $(lbl).text(text);//
    if (this.direction == 1) {
        var lblWidth = $(item).width() - this.checkBoxWidth;
        $(lbl).outerWidth(lblWidth);
    }
   
    //选择框值checked
    var value = jsonData.Value ? jsonData.Value : jsonData[this.fieldValue];
    if (value != null) {
        $(chk).prop("checked", value);
    }

    //选中状态项的样式
    if ($(chk).prop("checked")) {
        this.SetStyleByCssName(item, this.itemCheckedCssName);
        this.SetStyleByCssJson(item, this.itemCheckedCssJson); 
    }
    
    $(item).data('label',lbl).data('checkBox',chk);   

    //#endregion 创建项

    //#region 绑定事件
    //绑定单击事件
    var fn = jsonData.FnClick;
    var szdwCtrl = this;
    var itemHoverCssName = this.itemHoverCssName;
    var itemHoverCssJson = this.itemHoverCssJson;

    if (!this.checkBoxDisabled) {
        $(item).mouseover(function () {
            szdwCtrl.SetStyleByCssName(item, itemHoverCssName);
            szdwCtrl.SetStyleByCssJson(item, itemHoverCssJson);
        }).mouseleave(function () {
            szdwCtrl.SetStyleByCssName(item, cssName);
            szdwCtrl.SetStyleByCssJson(item, cssJson);
        }).click(function () {
            $(chk).trigger("click");
        });
        $(chk).click(function () {
            //是否允许至少选择一项
            if (szdwCtrl.allowLeastOne) {
                szdwCtrl.AllowLeastOneItemChecked(this);
            }

            //回调函数
            if (typeof (fn) == "function") { fn(); }
        });
    }

    //#endregion 绑定事件
    
    //选择框对象写入对象数组
    this.checkBoxArray.push(chk);

    $(item).append(cb).append(lbl);
    return item;
}

//至少选择一项
SzdwCheckBoxList.prototype.AllowLeastOneItemChecked = function (checkBox) {
    var chkList = this.checkBoxArray;
    var len = chkList.length;
    var flag = false;
    for (var i = 0; i < len; i++) {
//        var chk = $(chkList[i]).find("input")[0];
        var chk = chkList[i];
        flag = flag || chk.checked;
    }

    if (!flag) {
        this.allowMouseleave = false;
        $(this.panel).unbind("mouseleave");

        $(checkBox).prop("checked", true);
        //alert("必须至少选择一项！");
        return;
    }
}
//#endregion 创建选择框列表

//#region 创建应用按钮
//创建按钮
SzdwCheckBoxList.prototype.CreateButton = function () {
    var minH = 28;
    var pw = $(this.panel).width();
    var ph = $(this.panel).height();
    var m = this.direction == 0 && ph < minH ? 0 : this.separatorMargin;
    var width = this.direction == 0 ? this.btnWidth : pw - m * 2;
    var height = this.direction == 0 ? ph - m * 2 : this.btnHeight;

    var cssName = this.btnCssName;
    var cssJson = this.btnCssJson;
    var hoverCssJson = this.btnHoverCssJson;

    //#region 创建按钮
    var btn = document.createElement("div");
    if (cssName) { this.SetStyleByCssName(btn, cssName); }
    if (cssJson) { this.SetStyleByCssJson(btn, cssJson); }
    if (width > 0) { $(btn).outerWidth(width); }
    if (height > 0) { $(btn).outerHeight(height).css({ "line-height": height + "px" }); }
    if (this.direction == 0) {
        $(btn).css({ "float": "left", "top": m });
        if (ph < minH) { $(btn).css({ "border": "1px solid transparent" }); }
    } else {
        $(btn).css({ "margin": m });
    }

    if (!this.showAll) { $(btn).css({ "display": "none" }); }
    //#endregion 创建按钮

    //#region 按钮图标
    var image = this.btnImage;
    if (image) {
        var imageCssName = this.btnImageCssName;
        var imageCssJson = this.btnImageCssJson;
        var iw = $(btn).height();
        var ih = iw;

        var btnImage = document.createElement("div");
        btnImage.id = "btnImage";
        if (imageCssName) { this.SetStyleByCssName(btnImage, imageCssName); }
        if (imageCssJson) { this.SetStyleByCssJson(btnImage, imageCssJson); }
        $(btnImage).outerWidth(iw).outerHeight(ih);

        var img = image ? image.toString().replace("~", "..") : "";
        var backImg = "url(" + img + ") no-repeat center";
        $(btnImage).css({ "float": "left", "background": backImg });

        $(btn).append(btnImage);
    }
    //#endregion 按钮图标

    //#region 按钮文字
    var text = this.btnText;
    if (text && $.trim(text).length > 0) {
        var textCssName = this.btnTextCssName;
        var textCssJson = this.btnTextCssJson;

        var btnText = document.createElement("div");
        btnText.id = "btnText";
        $(btnText).text(text);
        if (textCssName) { this.SetStyleByCssName(btnText, textCssName); }
        if (textCssJson) { this.SetStyleByCssJson(btnText, textCssJson); }

        var iw = image ? $(btnImage).outerWidth() : 0;
        var w = $(btn).width();
        var bw = w - iw;
        var bh = $(btn).height();
        $(btnText).outerWidth(w - iw).outerHeight(bh).css({ "float": "left", "line-height": bh + "px" });

        this.btnText = btnText;
        $(btn).append(btnText);
    }
    //#endregion 按钮图标

    //#region 事件
    var szdwCtrl = this;
    $(btn).mouseover(function () {
        if (hoverCssJson) { $(this).css(hoverCssJson) };
        if (ph < minH) { $(btn).css({ "border": "1px solid transparent" }); }
    }).mouseleave(function () {
        if (cssName) { szdwCtrl.SetStyleByCssName(this, cssName); }
        if (cssJson) { szdwCtrl.SetStyleByCssJson(this, cssJson); }
        if (szdwCtrl.direction == 0) {
            $(btn).css({ "float": "left", "top": m });
            if (ph < minH) { $(btn).css({ "border": "1px solid transparent" }); }
        } else {
            $(btn).css({ "margin-left": m, "margin-top": m });
        }
    }).click(function () {        
        //回调函数
        var fn = szdwCtrl.btnCallBack;
        if (typeof (fn) == "function") { fn(); }
    });
    //#endregion 事件

    this.button = btn;
    $(this.panel).append(btn);
}
//#endregion 创建应用按钮

//#region 分割线
SzdwCheckBoxList.prototype.CreateSeparator = function () {
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
    if (!this.showAll) { $(e).css({ "display": "none" }); }

    $(this.panel).append(e);
}
//#endregion 分割线

//#region 设置样式
//根据CssName设置样式
SzdwCheckBoxList.prototype.SetStyleByCssName = function (element, cssName) {
    if (cssName) { $(element).addClass(cssName); }
}

//根据CssJson设置样式
SzdwCheckBoxList.prototype.SetStyleByCssJson = function (element, cssJson) {
    if (cssJson ) { $(element).css(cssJson); }
}

//重置样式
SzdwCheckBoxList.prototype.Reset = function () {
    var chkArray = this.checkBoxArray;
    var len = chkArray.length;
    var cssName = this.checkBoxCssName;
    var cssJson = this.checkBoxCssJson;

    for (var i = 0; i < len; i++) {
        var chk = chkArray[i];
        $(chk).prop("checked", false);
        if (cssName) { this.SetStyleByCssName(chk, cssName); }
        if (cssJson) { this.SetStyleByCssJson(chk, cssJson); }
    }
}
//#endregion 设置样式