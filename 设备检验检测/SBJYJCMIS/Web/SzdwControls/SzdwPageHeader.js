//菜单对象SzdwPageHeader
/// <reference path="../jquery-1.11.1.js" />
/// <reference path="../EventUtil.js" />
/// <reference path="domCommon.js" />

//jsonList格式：
//#region 菜单对象SzdwPageHeader
function SzdwPageHeader(position, x, y, width, height) {
    //#region 一般属性
    this.namingContainer = document.body;
    this.targetControl = null; //与之关联的目标控件
    this.position = position;
    this.x = x; //坐标x
    this.y = y; //坐标x
    this.width = width; //初始加载时宽度，加载后根据内容自动调整宽度
    this.height = height; //初始加载时高度，加载后根据内容自动调整高度
    this.minWidth = width; //最小宽度
    this.minHeight = 0; //最小高度
    this.maxWidth = 0; //最大宽度
    this.maxHeight = 0; //对象的最大高度：默认400；

    //#endregion 一般属性

    //#region Ajax访问文件和参数

    this.requestUrl = null; //请求文件（含路径）
    this.paramJson = null; //Json格式参数

    //#endregion Ajax访问文件和参数

    //#region 字段和数据
    this.hasWarn = false;
    this.hasNotice = false;
    this.warnItemCount = 0;
    this.userId = 0;
    this.userName = "";
    this.userDepartment = "";
    this.userPosition = "";
    //#endregion 字段和数据

    //#region 外框：对象容器
    this.panel = document.createElement("div"); //对象容器：根对象，控制对象的显示的坐标、宽高、显隐
    this.panel.style.overflow = "hidden"; //对象容器默认没有滚动条    
    this.panel.style.padding = "0"; //对象容器对象内留白
    this.panel.style.margin = "0"; //对象容器对象外留白
    $(this.panel).css({ "position": position, "left": x, "top": y}); //对象容器定位方式、坐标、宽高RGB(55,179,224) "background-color": "#017BBA"
    this.panelCssName = null; //对象容器css样式表名称
    this.panelCssJson = { "font-family": "微软雅黑", "font-size": "10pt", "background-color": "#017BBA", "opacity": 1 }; //对象容器Json格式css数据;RGB(55,179,224)
    
    //#endregion 外框：对象容器

    //#region Logo面板
    this.logoPanel = null;    
    this.logoPanelWidth = 160;
    this.logoPanelHeight = height;
    this.logoPanelCssName = null;
    this.logoPanelCssJson = { "position": "relative", "font-family": "微软雅黑", "font-size": "18pt", "color": "White", "opacity": 0.8 };
    this.logoImage = null;//软件Logo
    this.logoCorpImage = null;//公司Logo
    this.logoImageWidth = 48;
    this.logoImageHeight = height;
    this.logoImageCssName = null;
    this.logoImageCssJson = { "position": "relative", "float": "left",  "padding": "0px 40px 0px 40px" };
    this.logoText = "";
    this.logoTextWidth = 0;
    this.logoTextHeight = height;
    this.logoTextCssName = null;
    this.logoTextCssJson = { "position": "relative", "float": "left" };

    //#endregion Logo面板

    //#region 数据面板

    this.dataPanel =null;
    this.dataPanelWidth = 0;
    this.dataPanelHeight = height;
    this.dataPanelCssName = null;
    this.dataPanelCssJson = { "position":"relative","padding":"0px 0px 0px 0px"};

    //#endregion Logo面板

    //#region 用户面板
    this.warnItemWidth = 70;
    this.noticeItemWidth = 70;
    this.fnWarnItem = null;

    this.userPanel = null;
    this.userPanelWidth = 160;
    this.userPanelHeight = height;
    this.userPanelCssName = null;
    this.userPanelCssJson = { "position": "relative" };
    this.noticeItemCssName = "notice";
    this.userItem = null;
    this.userItemImage = "/SzdwControls/image/pageHeader/user20W.png";
    this.userItemImageWidth = 32;
    this.userItemImageHeight = height;
    this.userItemSignImage = "/SzdwControls/image/pageHeader/triangle16W.png";
    this.userItemSignImageWidth = 16;
    this.userItemSignImageHeight = height;
    this.warnItemImage = "/SzdwControls/image/pageHeader/alert.png";
    this.warnListImage = "/SzdwControls/image/pageHeader/detail16.png";
    this.exitItemImage = "/SzdwControls/image/pageHeader/exit20W2.png";

    this.userItemWidth = 90;
    this.userItemHeight = height;
    this.userItemCssName = null;
    this.userItemCssJson = { "cursor": "pointer","background-color": "transparent", "color": "White", "opacity": 0.7 }; //"padding": "0px 5px 0px 5px", 
    this.userItemMouseOverCssName = null;
    this.userItemMouseOverCssJson = { "color": "White", "opacity": 1 }; //"background-color": "#333333",
    this.fnUserItem = null;
    this.fnExitItem = null;
	//#endregion 用户面板
    this.warnJsonList = [];
    this.warnInfoPanel = null;
    this.warnInfoPanelVisible = false;
    //#region 用户信息面板
    this.userInfoPanel = null;
    this.userInfoPanelOpacity = 0.7;
    this.userInfoPanelBackColor = "Black";
    this.userInfoPanelCssName = null;
    this.userInfoPanelCssJson = { "position": "absolute", "font-family": "微软雅黑", "font-size": "10pt", "color": "White"};
    //{ "position": "absolute", "font-family": "微软雅黑", "font-size": "10pt", "border": "1px solid silver","border-top": "0px","background-color": "white" };
    this.userInfoPanelVisible = false;

    this.userInfoItemWidth = 240;
    this.userInfoItemHeight = 32;
    this.userInfoItemIconWidth = 32
    this.userInfoItemIconHeight = 32;
    this.userInfoItemOverBackColor = "#666666";
    this.userInfoItemOverOpacity = 0.7;
    this.userInfoItemCssName = null;
    this.userInfoItemCssJson = { "background-color": "transparent", "padding": "0px 10px 0px 0px", "cursor": "pointer", "color": "White"};
    this.userInfoItemMouseOverCssName = null;
    this.userInfoItemMouseOverCssJson = null;//{ "background-color": "black", "opacity": this.userInfoItemOverOpacity };
    this.departmentItemImage = "/SzdwControls/image/pageHeader/department21w.png";
    this.positionItemImage = "/SzdwControls/image/pageHeader/user20W.png";
    this.logoutItemImage = "/SzdwControls/image/pageHeader/logout21w.png";
    this.passItemImage = "/SzdwControls/image/pageHeader/lock21w.png";
    this.infoItemImage = "/SzdwControls/image/pageHeader/user20W.png";
    this.signItemImage = "/SzdwControls/image/pageHeader/sign20w.png";
    this.signPassItemImage = "/SzdwControls/image/pageHeader/mima20w.png";
    this.fnLogout = null;
    this.fnPass = null;
    this.fnInfo = null;
    this.fnWarn = null;
    this.fnSignPass = null;
    this.fnSignSet = null;
    //#endregion 用户信息面板

    //#region 初始化函数
    this.fnInitial = null;
    //#endregion 初始化函数

    //#region 加载动画
    this.loadingImg = null;
    this.loadingImgUrl = "/SzdwControls/image/loading/loading.gif";
    this.loadingImgWidth = 0; //加载动画gif文件的宽度
    this.loadingImgHeight = 0; //加载动画gif文件的高度
    //#endregion 加载动画
}
//#endregion 菜单对象SzdwPageHeader

//#region 加载
//加载
SzdwPageHeader.prototype.Load = function () {
    //载入父容器
    this.AppendToNamingContainer();

    //创建
    this.SetPanelStyle();
    this.CreateLogoPanel();
    this.CreateDataPanel();
    this.CreateUserPanel();
    this.CreateUserInfoPanel();

    //单击页面或其他控件时，隐藏控件
    var szdwCtrl = this;
    $(document).click(function () {
    	szdwCtrl.HideUserInfoPanel();
    });
}

//加入命名容器
SzdwPageHeader.prototype.AppendToNamingContainer = function () {
    var p = this.panel;
    var nc = this.namingContainer;
    if (nc != null && $(p).parent().length == 0) {
        $(p).appendTo(nc);
    }
}
//#endregion 加载

//#region Logo面板
SzdwPageHeader.prototype.CreateLogoPanel = function () {
    //创建
    var p = document.createElement("div");
    $(p).css({ "float": "left" });
    var cssName = this.logoPanelCssName;
    var cssJson = this.logoPanelCssJson;
    var w = this.logoPanelWidth;
    var h = this.logoPanelHeight;

    //设置样式属性
    this.SetStyleByCssName(p, cssName);
    this.SetStyleByCssJson(p, cssJson);
    if (w > 0) { $(p).innerWidth(w); }
    $(p).innerHeight(h);

    //Logo项
    var logo = this.CreateLogoItem();

    $(p).append(logo);
    this.logoPanel = p;
    $(this.panel).append(p);
}

//创建Logo项
SzdwPageHeader.prototype.CreateLogoItem = function () {
    var w = this.logoPanelWidth;
    var h = this.logoPanelHeight;
    var imageCssName = this.logoImageCssName;
    var imageCssJson = this.logoImageCssJson;
    var logoWidth = this.logoImageWidth;
    var logoHeight = this.logoImageHeight;

    //#region Logo项
    var item = document.createElement("div");
    $(item).width(w);
    $(item).height(h);

    //软件Logo图片
    var itemImg = document.createElement("div");
    this.SetStyleByCssName(itemImg, imageCssName); 
    this.SetStyleByCssJson(itemImg, imageCssJson); 
    var image = this.logoImage;
    var img = image ? image.toString().replace("~", "..") : "";
    var backImg = "url(" + img + ") no-repeat center";

    $(itemImg).outerWidth(logoWidth).outerHeight(logoHeight).css({ "background": backImg }).appendTo(item);

    //软件Logo图片
    var imageCorp = this.logoCorpImage;
    if (imageCorp) {
        var itemCorpImg = document.createElement("div");
        this.SetStyleByCssName(itemCorpImg, imageCssName);
        this.SetStyleByCssJson(itemCorpImg, imageCssJson);
        var imgCorp = imageCorp ? imageCorp.toString().replace("~", "..") : "";
        var backCorpImg = "url(" + imgCorp + ") no-repeat center";

        $(itemCorpImg).outerWidth(logoWidth).outerHeight(logoHeight).css({ "background": backCorpImg,"border-left":"1px solid #888888"}).appendTo(item);
    }

    //Logo文字
    var itemText = document.createElement("div");
    var textCssName = this.logoTextCssName;
    var textCssJson = this.logoTextCssJson;
    if (textCssName) { this.SetStyleByCssName(itemText, textCssName); }
    if (textCssJson) { this.SetStyleByCssJson(itemText, textCssJson); }

    var w_Txt = this.logoTextWidth;
    if (w_Txt > 0) { $(itemText).outerWidth(w_Txt); }
    $(itemText).height(this.logoTextHeight).css({ "line-height": this.logoTextHeight + "px" }).text(this.logoText).appendTo(item);

    //#endregion 创建菜单项

    return item;
}

//#endregion Logo面板

//#region 数据面板
SzdwPageHeader.prototype.CreateDataPanel = function () {
    //创建
    var p = document.createElement("div");
    $(p).css({ "position":"relative","float": "left" });
    var cssName = this.dataPanelCssName;
    var cssJson = this.dataPanelCssJson;
    var w = this.dataPanelWidth;
    var h = this.dataPanelHeight;

    //设置样式属性
    if (cssName) { this.SetStyleByCssName(p, cssName); }
    if (cssJson) { this.SetStyleByCssJson(p, cssJson); }
    if (w > 0) { $(p).innerWidth(w); }
    $(p).innerHeight(h);
    
    this.dataPanel = p;
    $(this.panel).append(p);
}
//#endregion 数据面板

//#region 用户面板
SzdwPageHeader.prototype.CreateUserPanel = function () {
    //创建
    var p = document.createElement("div");
    $(p).css({ "float": "right" });
    var cssName = this.userPanelCssName;
    var cssJson = this.userPanelCssJson;
    var w = this.userPanelWidth;
    var h = this.userPanelHeight;
    var x, y;

    //设置样式属性
    if (cssName) { this.SetStyleByCssName(p, cssName); }
    if (cssJson) { this.SetStyleByCssJson(p, cssJson); }
    if (w > 0) { $(p).innerWidth(w); }
    $(p).innerHeight(h);
    var szdwCtrl = this;

    //用户按钮
    var userItem = this.CreateUserItem();
    $(userItem).css({ "float": "left","width":90 });
    $(userItem).attr("id", "userItem");
    var fnUserItem = this.fnUserItem;
    $(userItem).click(function (e) {
        if (szdwCtrl.userInfoPanelVisible) {
            szdwCtrl.HideUserInfoPanel();
        } else {
            x = $(this).offset().left - 100;
            y = $(this).offset().top + $(this).innerHeight();
            szdwCtrl.ShowUserInfoPanel(x, y);
            e.stopPropagation();
        }
      
        if (typeof (fnUserItem) == "function") {
            fnUserItem();
        }
    });
    $(p).append(userItem);

    //退出按钮
    var exitItem = this.CreateExitItem();
    $(exitItem).css({ "float": "left", "width": 70 });
    var fnExitItem = this.fnExitItem;
    $(exitItem).click(function () {
    	//if (typeof (fnExitItem) == "function") {
    	//	///fnExitItem(function() {
    	//	///	window.close();
    	//	///});
    	//}
    	//else {
    	//	window.close();
    	//}
        window.close();
    });
    $(p).append(exitItem);

    this.userPanel = p;
    $(this.panel).append(p);
}
//创建Warn项
SzdwPageHeader.prototype.CreateWarnItem = function () {
	var itemJson = {
		item: {
			width: this.warnItemWidth, height: this.userItemHeight, text: "预警",//this.warnJsonList.length,
			cssName: this.userItemCssName, cssJson: this.userItemCssJson,
			mouseOverCssJson: this.userItemMouseOverCssJson
		},
		icon: { width: this.userItemImageWidth, height: this.userItemImageHeight, image: this.warnItemImage }
		//,
		//sign: { width: this.userItemSignImageWidth, height: this.userItemSignImageHeight, image: this.userItemSignImage }
	};
	var item = this.CreateItem(itemJson);
	//this.userItem = item;
	return item;
}

SzdwPageHeader.prototype.CreateNoticeItem = function () {
    var itemJson = {
        item: {
            width: this.noticeItemWidth, height: this.userItemHeight, text: "(0)",//this.warnJsonList.length,
            cssName: this.userItemCssName, cssJson: this.userItemCssJson,
            mouseOverCssJson: this.userItemMouseOverCssJson
        },
        icon: { width: this.userItemImageWidth, height: this.userItemImageHeight, image: this.noticeItemImage }
        //,
        //sign: { width: this.userItemSignImageWidth, height: this.userItemSignImageHeight, image: this.userItemSignImage }
    };
    var item = this.CreateItem(itemJson);
    //this.userItem = item;
    return item;
}
//创建user项
SzdwPageHeader.prototype.CreateUserItem = function () {
    var itemJson = {
        item: {
            width: this.userItemWidth, height: this.userItemHeight, text: this.userName,
            cssName: this.userItemCssName, cssJson: this.userItemCssJson,
            mouseOverCssJson: this.userItemMouseOverCssJson
        },
        icon: { width: this.userItemImageWidth, height: this.userItemImageHeight, image: this.userItemImage },
        sign: { width: this.userItemSignImageWidth, height: this.userItemSignImageHeight, image: this.userItemSignImage }
    };
    var item = this.CreateItem(itemJson);
    this.userItem = item;
    return item;
}
//创建退出项
SzdwPageHeader.prototype.CreateExitItem = function () {
    var itemJson = {
        item: {
            width: this.userItemWidth, height: this.userItemHeight, text: "退出",
            cssName: this.userItemCssName, cssJson: this.userItemCssJson,
            mouseOverCssJson: this.userItemMouseOverCssJson
        },
        icon: { width: this.userItemImageWidth, height: this.userItemImageHeight, image: this.exitItemImage }
    };

    var item = this.CreateItem(itemJson);
    return item;
}

//用户Info面板
SzdwPageHeader.prototype.CreateUserInfoPanel = function () {
    var width = this.userInfoItemWidth;
    var height = this.userInfoItemHeight;
    var cssName = this.userInfoItemCssName;
    var cssJson = this.userInfoItemCssJson;
    var mouseOverCssJson = this.userInfoItemMouseOverCssJson;
    var itemOverBackColor = this.userInfoItemOverBackColor;
    var itemOverOpacity = this.userInfoItemOverOpacity;

    //创建Panel
    var p = document.createElement("div");
    this.SetStyleByCssName(p, this.userInfoPanelCssName);
    this.SetStyleByCssJson(p, this.userInfoPanelCssJson);
    if (width > 0) { $(p).width(width); }
    //$(p).height(height);
    $(p).css({ "position": "absolute", "display": "none", "padding": "5px 0px 5px 0px", "z-index": 10 });
    domCommon.SetOpacity(p, this.userInfoPanelBackColor, this.userInfoPanelOpacity);

    //#region 用户职位
    if (this.userPosition.length > 0) {
        var itemJsonPosition = {
            item: {
                width: width, height: height, text: this.userPosition,
                cssName: cssName, cssJson: cssJson, mouseOverCssJson: cssJson
            },
            icon: { width: this.userInfoItemIconWidth, height: height, image: this.positionItemImage }
        };
        var itemPosition = this.CreateItem(itemJsonPosition);
        $(p).append(itemPosition);
    }
    //#endregion 用户职位

    //#region 用户部门
    if (this.userDepartment.length > 0) {
        var showDepartment = "";
        if (this.userDepartment.length > 15) {
             showDepartment = this.userDepartment.substring(0, 15);
        }
        else {
            showDepartment = this.userDepartment;
        }
        var itemJsonDepartment = {
            item: {
                width: width, height: height, text: showDepartment,
                cssName: cssName, cssJson: cssJson, mouseOverCssJson: cssJson
            },
            icon: { width: this.userInfoItemIconWidth, height: height, image: this.departmentItemImage }
        };
        var itemDepartment = this.CreateItem(itemJsonDepartment);
        itemDepartment.title = this.userDepartment;
        $(p).append(itemDepartment);
    }
    //#endregion 用户部门

    if (this.userDepartment.length > 0 || this.userPosition.length > 0) {
    //分隔线
    var spLine = document.createElement("div");
    $(spLine).css({ "height": "2px", "border-bottom": "1px solid White", "margin": "5px 2px 5px 2px", "opacity": 0.1 });
    $(p).append(spLine);
    }

    //分隔线
    var spLine2 = document.createElement("div");
    $(spLine2).css({ "height": "2px", "border-bottom": "1px solid White", "margin": "5px 2px 5px 2px", "opacity": 0.1 });
    //$(p).append(spLine2);

    //#region 用户修改密码
    var itemJsonPass = {
        item: {
            width: width - 10, height: height, text: "修改密码",
            cssName: cssName, cssJson: cssJson, mouseOverCssJson: mouseOverCssJson
        },
        icon: { width: this.userInfoItemIconWidth, height: height, image: this.passItemImage }
    };

    var itemPass = this.CreateItem(itemJsonPass);
    var fnPass = this.fnPass;
    $(itemPass).click(function () {
        fnPass();
    }).mouseover(function () {
        domCommon.SetOpacity(this, itemOverBackColor, itemOverOpacity);
    }).mouseleave(function () {
        domCommon.SetOpacity(this, "transparent", 1);
    });
    $(p).append(itemPass);
    //#endregion 用户修改密码

	//分隔线
    var spLine = document.createElement("div");
    $(spLine).css({ "height": "2px", "border-bottom": "1px solid White", "margin": "5px 2px 5px 2px", "opacity": 0.1 });
    $(p).append(spLine);

    //#region 注销登录
    var itemJsonLogout = {
        item: {
            width: width-10, height: height, text: "注销登录",
            cssName: cssName, cssJson: cssJson, mouseOverCssJson: mouseOverCssJson
        },
        icon: { width: this.userInfoItemIconWidth, height: height, image: this.logoutItemImage }
    };

    var itemLogout = this.CreateItem(itemJsonLogout);
    var fnLogout = this.fnLogout;
    $(itemLogout).click(function () {
        fnLogout();
    }).mouseover(function () {
        domCommon.SetOpacity(this, itemOverBackColor, itemOverOpacity); //itemOverOpacity
    }).mouseleave(function () {
        domCommon.SetOpacity(this, "transparent", 1);
    });
    $(p).append(itemLogout);
    //#endregion 注销登录
    
    this.userInfoPanel = p;
    $(document.body).append(p);
}
//显示用户信息面板
SzdwPageHeader.prototype.ShowUserInfoPanel = function (x, y) {
    var p = this.userInfoPanel;
    $(p).css({ "position":"absolute","left": x, "top": y });
    $(p).fadeIn(300);
    this.userInfoPanelVisible = true;
}
//隐藏用户信息面板
SzdwPageHeader.prototype.HideUserInfoPanel = function () {
    $(this.userInfoPanel).fadeOut(300);
    this.userInfoPanelVisible = false;
}
//#endregion 用户面板

//#region 创建通用项

//创建通用项
//itemJson:{item:{width:width,height:height,text:text,cssName:cssName,cssJson:cssJson,mouseOverCssJson:mouseOverCssJson},
//          icon:{width:width,height:height,image:image},
//          sign:{width:width,height:height,image:image}
//         }
SzdwPageHeader.prototype.CreateItem = function (itemJson) {
    var w = itemJson.item.width;
    var h = itemJson.item.height;
    var cssName = itemJson.item.cssName;
    var cssJson = itemJson.item.cssJson;
    var mouseOverCssJson = itemJson.item.mouseOverCssJson;

    //#region 创建项
    var item = document.createElement("div");
    this.SetStyleByCssName(item, cssName);
    this.SetStyleByCssJson(item, cssJson);
    if (w > 0) { $(item).width(w); }
    $(item).height(h);
    if (itemJson.item.Id)
    {
    	$(item).data("Id",itemJson.item.Id);
    }
    
    //图标  
    var itemImg = document.createElement("div");
    $(itemImg).outerWidth(itemJson.icon.width);
    $(itemImg).outerHeight(itemJson.icon.height);
    var icon = itemJson.icon;
    var iconImg = "";
    if (icon) {
        iconImg = icon.image ? icon.image : "";
    }
    var backImg = "url(" + iconImg + ") no-repeat center";
    $(itemImg).css({ "float": "left", "background": backImg });
    $(item).append(itemImg);


    //文字
    var text = itemJson.item.text;
    if (text) {
        var itemText = document.createElement("div");
        $(itemText).height(h);
        $(itemText).css({ "float": "left", "line-height": h + "px"});
        $(itemText).text(text);
        $(item).append(itemText);
    }

    //指示器（比如下拉箭头、左箭头、选中标识等）    
    var sign = itemJson.sign;
    if (sign) {
        var signImage = sign.image ? sign.image : "";
        var itemSign = document.createElement("div");
        $(itemSign).outerWidth(itemJson.sign.width);
        $(itemSign).outerHeight(itemJson.sign.height);
        var backSign = "url(" + signImage + ") no-repeat left";
        $(itemSign).css({ "float": "right", "background": backSign });
        $(item).append(itemSign);
    }
    //#endregion 创建菜单项

    //#region 绑定事件
    var szdwCtrl = this;
    $(item).mouseover(function () {
        szdwCtrl.SetStyleByCssJson(this, mouseOverCssJson);
    }).mouseleave(function () {
        szdwCtrl.SetStyleByCssJson(this, cssJson);
    });
    //#endregion 绑定事件

    return item;
}
//#endregion 创建通用项

//#region 设置样式
//设置样式
SzdwPageHeader.prototype.SetPanelStyle = function () {
    var t = this.targetControl;
    var p = this.panel;    
    this.SetStyleByCssName(p,this.panelCssName);
    this.SetStyleByCssJson(p, this.panelCssJson);    
    $(p).innerWidth(this.width);
    $(p).innerHeight(this.height);
}

//根据CssName设置Item样式
SzdwPageHeader.prototype.SetStyleByCssName = function (element, cssName) {
    if (cssName != null) { $(element).addClass(cssName); }
}

//根据CssJson设置Item样式
SzdwPageHeader.prototype.SetStyleByCssJson = function (element, cssJson) {
    if (cssJson != null) { $(element).css(cssJson); }
}

//重设尺寸
SzdwPageHeader.prototype.Resize = function () {
    var p = this.panel;
    var w = this.width;
    var h = this.height;
    if (w > 0) { $(p).innerWidth(w); }
    if (h > 0) { $(p).innerHeight(h); }

    var dp = this.dataPanel;
    var lpw = $(this.logoPanel).outerWidth();
    var upw = $(this.userPanel).outerWidth();
    var dpw = w - lpw - upw;
    $(dp).outerWidth(dpw);
}
//#endregion 设置样式