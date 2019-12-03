//菜单对象SzdwMenu
/// <reference path="../jquery-1.11.1.js" />
/// <reference path="../EventUtil.js" />
/// <reference path="SzdwCommon.js" />

//jsonList格式：[{"Id":2,"Name":"我的首页","ParentId":0,"PageUrl":"../Main/Navigation.html","IconUrl":"../Image/home20w.png","Sequence":1,"XpageId":70}]

//#region 菜单对象SzdwMenu
function SzdwMenu(position, x, y, width, height) {
    //#region 一般属性
    this.namingContainer = document.body;
    this.targetControl = null; //与之关联的目标控件    
    this.position = position;
    this.x = x; //坐标x
    this.y = y; //坐标x
    this.width = width; //初始加载时宽度，加载后根据内容自动调整宽度
    this.height = height; //初始加载时高度，加载后根据内容自动调整高度
    this.minWidth = 46; //最小宽度,图标形状时候的宽度
    this.minHeight = 0; //最小高度
    this.maxWidth = 0; //最大宽度
    this.maxHeight = 0; //对象的最大高度：默认400；
    this.hasTitlePanel = false;//是否有菜单标题面板
    this.allowSwitchingVisualMode = true;//是否允许切换菜单宽窄的视觉模式
    this.fnSwitchCallBack = null;//是否允许切换菜单宽窄的视觉模式
    this.visualMode  = 0;//视觉模式，0：普通模式，宽模式，有图标和文字；1:窄模式，只有图标
    this.fnCallback = null;
    this.fnLoadPage = null;
    this.fnItemClick = null; //菜单项单击时调用的外部方法
    this.haveItemDeleteButton = false;
    this.fnItemDelete = null; //菜单项单击时调用的外部方法
    this.hasLoadingImg = true;
    //#endregion 一般属性

    //#region Ajax访问文件和参数

    this.requestUrl = null; //请求文件（含路径）
    this.paramJson = null; //Json格式参数

    //#endregion Ajax访问文件和参数

    //#region 字段和数据
    this.fieldId = "Id";
    this.fieldName = "Name";
    this.fieldImage = "IconUrl";
    this.fieldParentId = "ParentId";
    this.fieldPage = "PageUrl";
    this.fieldPageId = "XpageId";
    this.fieldResourceId = "ResourceId";
    this.jsonList = null;
    this.topParentJsonList = null;
    this.permissionJsonList = null;//用户的页面权限列表
    this.curPermissionJsonList = null;//用户的当前页面权限列表
    this.text = "";
    this.value = 0;
    this.arrMenuNavi = new Array();
    this.dataIndex = 0;
    //#endregion 字段和数据

    //#region 外框：对象容器
    this.panel = document.createElement("div"); //对象容器：根对象，控制对象的显示的坐标、宽高、显隐
    this.panelCssName = null; //对象容器css样式表名称
    this.panelCssJson = {
        "position": position, "left": x, "top": y,"font-family": "微软雅黑", "padding": "10px 0px 10px 0px", "background-color": "#222222",
        "margin": "0px", "display": "none", "overflow": "hidden"
    }; //对象容器Json格式css数据

    //#endregion 外框：对象容器

    //#region 菜单标题面板
    this.titlePanel = null;
    this.titlePanelWidth = 0;
    this.titlePanelHeight = 45;
    this.titlePanelCssName = null;
    this.titlePanelCssJson = {
        "padding": "0px px 0px px", "border-left": "4px solid transparent", "margin": "0px 0px 10px 0px",
        "border-bottom":"1px solid #393939","cursor":"pointer","opacity":0.7
    };

    this.titleImage = "/SzdwControls/image/menu/detail20W.PNG";
    this.titleImageWidth = 36;
    this.titleImageHeight = this.titlePanelHeight;
    this.titleImageCssName = null;
    this.titleImageCssJson = { "padding": "0px 0px 0px 0px", "float": "left"};

    this.titleText = "我的菜单";
    this.titleTextWidth = 0;
    this.titleTextHeight = this.titlePanelHeight;
    this.titleTextCssName = null;
    this.titleTextCssJson = { "color":"white","padding": "0px 0px 0px 0px", "float": "left" };

    //this.CreateTitlePanel();
    //#endregion 外框：对象容器

    //#region 菜单列表面板
    this.listPanel = null;
    this.listPanelWidth = 0;
    this.listPanelHeight = 0;
    this.listPanelCssName = null;
    this.listPanelCssJson = {"padding":"0px","margin":"0px","overflow":"hidden"};
    this.listPanelScrollTop = 0;

    //this.CreateListPanel();
    //#endregion 菜单列表面板

    //#region 菜单项Item
    this.itemWidth = width;
    this.itemHeight = 42;    
    this.itemTitle = null;
    this.itemText = null;
    this.itemImage = null;// "../SzdwControls/Image/report20w6.png";
    this.itemImageWidth = 36;
    this.itemImageHeight = this.itemHeight;
    this.itemSelectedBorderColor = "#406406"; //#017BBA
    this.itemBackColorJson = { 0: "#393939", 1: "#406406" };

    this.itemCssName = null;
    this.itemCssJson = {
        "font-size": "11pt", "border-left": "4px solid transparent", "border-bottom": "0px solid #303030",
        "padding": "0px 0px 0px 0px", "cursor": "pointer", "background-color": "", "color": "White", "opacity": 0.7
    };
    this.itemMouseOverCssName = null;
    this.itemMouseOverCssJson = { "background-color": "#333333", "color": "White", "opacity": 1 };
    this.itemSelectedCssName = null;
    this.itemSelectedCssJson = {
        "border-left": "4px solid " + this.itemSelectedBorderColor, "background-color": this.itemBackColorJson["0"], //"#393939",
        "color": "White", "opacity": 1
    }; //#1B60C3,RGB(55,179,224)  
    //#endregion 菜单项Item

    //#region 子菜单项Item
    this.childItemWidth = width;
    this.childItemHeight = 32;
    this.childItemTitle = null;
    this.childItemText = null;
    this.childItemImage = null; // "../SzdwControls/Image/report20w6.png";
    this.childItemImageWidth = 32;
    this.childItemImageHeight = this.childItemHeight;

    this.childItemCssName = null;
    this.childItemCssJson = {
        "font-size": "9pt", "border-left": "4px solid transparent", "padding": "0px 5px 0px 8px",
        "cursor": "pointer","background-color": "transparent", "color": "White", "opacity": 0.7
    };
    this.childItemMouseOverCssName = null;
    this.childItemMouseOverCssJson = { "background-color": "#3333333", "color": "White", "opacity": 1 };
    this.childItemMouseOverBackColorJson = { 0: "#333333", 1: "#494949" };
    this.childItemSelectedCssName = null;
    this.childItemSelectedCssJson = { "background-color": "#393939", "color": "white", "opacity": 1 }; //#1B60C3
    this.childItemSelectedBackColorJson = { 0: "#393939", 1: "#606060" };
    this.oldChildItemList = null;
    //#endregion 子菜单项Item

    //#region 浮动子菜单项
    this.floatItem = null;//浮动菜单项(菜单);
    this.floatChildItemPanel = null;//浮动子菜单面板：用于菜单为窄模式（收起）时浮动显示子菜单
    this.floatChildItemList = null;//浮动子菜单列表
    this.floatChildItemPanelOpacity = 0.8;
    //#endregion 浮动子菜单项

    //#region 菜单删除按钮
    this.btnDeleteImage = "/SzdwControls/image/menu/delete16w.png";
    this.btnDeleteCssName = null;
    this.btnDeleteCssJson = { "float": "right", "display": "none","margin-right":"10px" };
    this.btnDeleteOverCssName = null;
    this.btnDeleteOverCssJson = null;
    //#endregion 菜单删除按钮

    //#region 默认项及当前项
    this.defaultItemText = "";
    this.defaultItem = null;
    this.selectedItem = null;
    this.defaultChildItem = null;
    this.selectedChildItem = null;
    //#endregion 默认项及当前项

    //#region 初始化函数
    this.fnInitial = null;
    //#endregion 初始化函数

    //#region 加载动画
    this.loadingImg = null;
    this.loadingImgUrl = "/SzdwControls/image/loading/loading16w.gif";
    this.loadingImgWidth = 0; //加载动画gif文件的宽度
    this.loadingImgHeight = 0; //加载动画gif文件的高度
    //#endregion 加载动画
}
//#endregion 菜单对象SzdwMenu

//#region 显示隐藏

//mode:0:淡入淡出，默认；1：滑动
SzdwMenu.prototype.ShowToggle = function (mode) {
    if (this.jsonList == null) {
        return false;
    } else {
        var panel = this.panel;
        var m = typeof (mode) == "undefined" ? 0 : mode;
        switch (m) {
            case 0:
                $(panel).fadeToggle(200);
                break;
            case 1:
                if (panel.style.display == "none") {
                    $(panel).fadeIn(200);
                } else {
                    $(panel).slideToggle(200);
                }
                break;
        }

        //还原滚动位置
//        if (this.listPanelScrollTop > 0) {
//            $(this.listPanel).scrollTop(this.listPanelScrollTop);
//        }

        //单击页面或其他控件时，隐藏控件
//        $(document).click(function () {
//            $(panel).fadeOut(200);
//        });
    }
}

//SzdwMenu显示
SzdwMenu.prototype.Show = function () {
    $(this.panel).fadeIn();
}

//SzdwMenu隐藏
SzdwMenu.prototype.Hide = function () {
    $(this.panel).fadeOut();
}

//#endregion 显示隐藏

//#region 数据绑定

SzdwMenu.prototype.DataBind = function () {
    //载入父容器
    this.AppendToNamingContainer();

    //设置菜单面板
    this.SetPanelStyle();
    this.CreateTitlePanel();
    this.CreateListPanel();

    //异步加载指示器
    this.CreateLoadingImg();
    this.ShowLoadingImg();

    //绑定数据
        var szdwMenu = this;
        var url = this.requestUrl;
        var paramJson = this.paramJson;
        $.ajax({ url: url, type: "post", data: paramJson, dataType: "json",
            success: function (jsonData) {
                if (!$.isEmptyObject(jsonData)) {
                    szdwMenu.AjaxSuccess(jsonData);
                }
            },
            complete: function () {
                szdwMenu.HideLoadingImg();
            }
        });
}

//ajax异步加载数据成功后执行的函数
SzdwMenu.prototype.AjaxSuccess = function (jsonList) {
    if (this.jsonList == null) {
        this.GetJsonList(jsonList);
        this.Load();
        if (typeof (this.fnCallback) == "function") {
            this.fnCallback();
        }

        //设置菜单默认项
        this.SetDefaultItem();
    }
}

//SzdwMenu
SzdwMenu.prototype.AppendToNamingContainer = function () {
    var p = this.panel;
    var nc = this.namingContainer;
    if (nc != null && $(p).parent().length == 0) {
        $(p).appendTo(nc);
    }
}

//加载
SzdwMenu.prototype.Load = function () {
    this.Show();
    this.CreateMenu();
    this.GetWidthHeight();
    this.SetListPanelStyle();
}

//目标控件阻止事件冒泡
SzdwMenu.prototype.TargetControlStopPropagation = function () {
    var tc = this.targetControl;
    var szdwMenu = this;
    $(tc).click(function () {
        var e = event ? event : window.event;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }

        szdwMenu.ShowToggle(1);
    });
}
//#endregion 数据绑定

//#region 获取数据

//获取控件的数据
SzdwMenu.prototype.GetJsonList = function (jsonList) {
    this.jsonList = jsonList;

    //获取所有顶级父数据 
    this.GetTopParentJsonList();
}

//获取所有顶级父数据
SzdwMenu.prototype.GetTopParentJsonList = function () {
    if (this.jsonList == null) {
        return false;
    } else {
        var jsonData = this.jsonList;
        var len = jsonData.length;

        var fieldId = this.fieldId;
        var fieldParentId = this.fieldParentId;

        //获取所有顶级父数据
        this.topParentJsonList = $.grep(jsonData, function (item, i) {
            var pId = item[fieldParentId];
            for (var j = 0; j < len; j++) {
                var id = jsonData[j][fieldId];
                if (pId == id) {
                    return true;
                }
            }
        }, true);
    }
}

//获取基于parentItemValue的childJsonList
SzdwMenu.prototype.GetChildJsonList = function (parentItemValue) {
    //获取parentItemValue下的子项jsonData
    var jsonList = this.jsonList;
    var cJsonList = new Array();
    for (var i = 0; i < jsonList.length; i++) {
        var jd = jsonList[i];
        var parentValue = jd[this.fieldParentId];
        if (parentValue == parentItemValue) {
            cJsonList.push(jd);
        }
    }

    return cJsonList;
}

//根据id获取所有的父级数据
SzdwMenu.prototype.GetParentJsonList = function (id) {
    var jsonList = this.jsonList;
    var parentJsonList = new Array();
    if (jsonList) {
        var pId = this.GetParentId(id);
        var text = this.GetTextByValue(pId);
        while (text) {
            for (var i = 0; i < jsonList.length; i++) {
                var jd = jsonList[i];
                var itemId = jd[this.fieldId];
                if (itemId == pId) {
                    parentJsonList.push(jd);
                    pId = this.GetParentId(itemId);
                    text = this.GetTextByValue(pId);
                    break;
                }
            }
        }
    }
    return parentJsonList;
}

//获取菜单父Id
SzdwMenu.prototype.GetParentId = function (id) {
    var jsonList = this.jsonList;
    var parentId = null;
    if (jsonList) {
        var fId = this.fieldId;
        var pId = this.fieldParentId;
        $.each(jsonList, function (index, item) {
            if (item[fId] == id) {
                parentId = item[pId];
            }
        });
    }

    return parentId;
}

//根据Text(fieldName的值）获取Value(fieldId的值)
SzdwMenu.prototype.GetValueByText = function (text) {
    var jsonList = this.jsonList;
    var value = null;
    if (jsonList) {        
        var fId = this.fieldId;
        var fName = this.fieldName;
        $.each(jsonList, function (index, item) {
            if (item[fName] == text) {
                value = item[fId];
            }
        });
    }
    return value;
}

//根据Value(fieldId的值)获取Text(fieldName的值）
SzdwMenu.prototype.GetTextByValue = function (value) {
    var jsonList = this.jsonList;
    var text = null;
    if (jsonList) {
        var fId = this.fieldId;
        var fName = this.fieldName;
        var text = null;
        $.each(jsonList, function (index, item) {
            if (item[fId] == value) {
                text = item[fName];
            }
        });
    }
    return text;
}

//根据Value(fieldId的值)获取Text(fieldName的值）
SzdwMenu.prototype.GetIndexByValue = function (value) {
    var jsonList = this.jsonList;
    var index = -1;
    if (jsonList) {
        var fId = this.fieldId;
        $.each(jsonList, function (i, item) {
            if (item[fId] == value) {
                index = i;
            }
        });
    }
    return index;
}

//根据Value(fieldId的值)获取PermissionList
SzdwMenu.prototype.GetPermissionListByValue = function (value) {
    var jsonList = this.jsonList;
    var i = this.GetIndexByValue(value);   
    if (i >= 0) {
        var pageId = jsonList[i].XpageId;
        return this.GetPagePermissionList(pageId);;
    } else {
        return null;
    }
}

//根据Text(fieldName的值）获取PermissionList
SzdwMenu.prototype.GetPermissionListByText = function (text) {
    var value = this.GetValueByText(text);
    var permissionList = this.GetPermissionListByValue(value);

    return permissionList;
}
//#endregion 获取数据

//根据XpageId获取PermissionList
SzdwMenu.prototype.GetPagePermissionList = function (pageId) {
    var jsonList = this.permissionJsonList;
    var permissionList = [];
    if (jsonList) {
        var fPageId = this.fieldResourceId;
        $.each(jsonList, function (index, item) {
            if (item[fPageId] == pageId) {
                permissionList.push(item);
            }
        });
    }

    return permissionList;
}
//#endregion 获取数据

//#region 菜单标题面板

//创建标题面板
SzdwMenu.prototype.CreateTitlePanel = function () {
    if (this.hasTitlePanel) {
        //标题面板
        var cssName = this.titlePanelCssName;
        var cssJson = this.titlePanelCssJson;
        var w = this.titlePanelWidth ? this.titlePanelWidth : $(this.panel).width();
        var h = this.titlePanelHeight;

        var p = document.createElement("div");
        this.SetStyleByCssName(p, cssName);
        this.SetStyleByCssJson(p, cssJson);
        $(p).outerWidth(w, true).outerHeight(h).attr("title", "点我可收起或展开");

        //图片
        var img = this.titleImage;
        var iw = this.titleImageWidth ? this.titleImageWidth : h;
        if (img) {
            var imgCssName = this.titleImageCssName;
            var imgCssJson = this.titleImageCssJson;
            var ih = this.titleImageHeight ? this.titleImageHeight : titlImageWidth;
            var bakImg = "url(" + img + ") center no-repeat";

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
            $(pt).outerWidth(tw).outerHeight(th).text(text).css({ "line-height": th + "px" });
            $(p).append(pt);
        }

        //绑定事件
        if (this.allowSwitchingVisualMode) {
            var szdwCtrl = this;
            $(p).click(function (e) {
                szdwCtrl.SwitchVisualMode();
                if (szdwMenu.visualMode == 1) { e.stopPropagation(); }
            });
        }

        this.titlePanel = p;
        $(this.panel).append(this.titlePanel);
    }
}

//展开或搜索面板
SzdwMenu.prototype.SwitchVisualMode = function () {
    var szdwCtrl = this;
    var p = this.panel;
    var m = this.visualMode;
    var fn = this.fnSwitchCallBack;
    var toWidth = m == 0 ? this.minWidth : this.width;
    $(p).animate({ width: toWidth }, 300, null, function () {
        if (m == 0) {
            var selectedChildItem = szdwCtrl.selectedChildItem;
            if (selectedChildItem) { szdwCtrl.SetSelectedItem(selectedChildItem); }
        }
    });
    if (fn) { fn(); }

    if (m == 0) {
        $(p).find("[id='itemText']").fadeOut();
        $(p).find("[id='titleText']").fadeOut();
    } else {
        $(p).find("[id='itemText']").fadeIn();
        $(p).find("[id='titleText']").fadeIn();
    }

    //当前菜单视觉模式及其菜单项样式
    this.visualMode = m == 0 ? 1 : 0;
    this.itemSelectedCssJson["background-color"] = this.itemBackColorJson[this.visualMode];
    this.itemSelectedCssJson["border-left-color"] = m == 0 ? "transparent" : this.itemBackColorJson[m];

    //设置选中菜单样式
    var selectedItem = this.selectedItem;
    if (selectedItem) { this.SetSelectedItem(selectedItem); }
    
    if (m == 0) {
        var oldChild = szdwMenu.oldChildItemList;
        if (oldChild) { $(oldChild).slideUp(); }

    } else {
        this.ShowChildItemList(selectedItem);

        var selectedChildItem = this.selectedChildItem;
        if (selectedChildItem) { this.SetSelectedItem(selectedChildItem); }
    }
}
//#endregion 菜单标题面板

//#region 菜单列表
SzdwMenu.prototype.CreateMenu = function () {
    if (this.jsonList == null) {
        return false;
    } else {     
        var itemList = this.CreateItemList();
        $(this.listPanel).empty().append(itemList);
    }
}

//创建菜单项列表面板
SzdwMenu.prototype.CreateListPanel = function () {
    if (this.listPanel == null) {
        var p = document.createElement("div");
        this.SetStyleByCssName(p, this.listPanelCssName);
        this.SetStyleByCssJson(p, this.listPanelCssJson);

        this.listPanel = p;
        $(this.panel).append(p);
    }
}

//创建菜单项列表
SzdwMenu.prototype.CreateItemList = function () {
    if (this.jsonList == null) {
        return null;
    } else {
        var width = this.itemWidth;
        var height = this.itemHeight;
        var imageWidth = this.itemImageWidth;
        var imageHeight = this.itemImageHeight;
        var cssName = this.itemCssName;
        var cssJson = this.itemCssJson;
        var itemMouseOverCssJson = this.itemMouseOverCssJson;
        var itemSelectedCssJson = this.itemSelectedCssJson;

        var jsonList = this.topParentJsonList; //顶级父数据
        var itemList = document.createElement("div");
        for (var i = 0; i < jsonList.length; i++) {
            var jd = jsonList[i];
            var text = jd[this.fieldName];
            var value = jd[this.fieldId];
            var image = jd[this.fieldImage];
            var parentId = jd[this.fieldParentId];
            var permissionList = jd.PermissionList;
            var page = jd[this.fieldPage];
            var pageId = jd[this.fieldPageId];
            var hasChild = !(page || page.length > 0);

            var itemJsonParams = {
                itemType: 1, text: text, value: value, image: image, parentId: parentId, width: width, height: height, imageWidth: imageWidth, imageHeight: imageHeight,
                hasChild: hasChild, cssName: cssName, cssJson: cssJson, itemMouseOverCssJson: itemMouseOverCssJson, itemSelectedCssJson: itemSelectedCssJson,
                pageId: pageId
            };
            var item = this.CreateItem(itemJsonParams);
            var itemBox = document.createElement("div");
            $(itemBox).append(item).appendTo(itemList);
            $(item).data("PageUrl", page).data("Id", jd[this.fieldId]);
        }
        return itemList;
    }
}

//创建子菜单项列表
SzdwMenu.prototype.CreateChildItemList = function (parentItemValue) {
    if (this.jsonList == null) {
        return null;
    } else {
        var jsonList = this.GetChildJsonList(parentItemValue);
        if (jsonList) {
            var width = this.childItemWidth;
            var height = this.childItemHeight;
            var imageWidth = this.childItemImageWidth;
            var imageHeight = this.childItemImageHeight;
            var cssName = this.childItemCssName;
            var cssJson = this.childItemCssJson;
            var itemMouseOverCssJson = this.childItemMouseOverCssJson;
            var itemSelectedCssJson = this.childItemSelectedCssJson;

            var itemList = document.createElement("div");
            $(itemList).css({ "padding": "5px 0px 5px 0px","background-color":"#292929" });
            for (var i = 0; i < jsonList.length; i++) {
                var jd = jsonList[i];
                var text = jd[this.fieldName];
                var value = jd[this.fieldId];
                var parentId = jd[this.fieldParentId];
                var permissionList = jd.PermissionList;
                var pageId = jd[this.fieldPageId];

                var itemJsonParams = { itemType: 2, text: text, value: value, image: null, parentId: parentId, width: width, height: height, imageWidth: imageWidth, imageHeight: imageHeight,
                    cssName: cssName, cssJson: cssJson, itemMouseOverCssJson: itemMouseOverCssJson, itemSelectedCssJson: itemSelectedCssJson, pageId: pageId
                };
                var item = this.CreateItem(itemJsonParams);
                var page = jd[this.fieldPage];
                $(item).data("PageUrl", page);
                $(itemList).append(item).hide();                
            }
            return itemList;
        } else {
            return null;
        }
    }
}

//#endregion 菜单列表

//#region 浮动子菜单项列表

//创建浮动子菜单项列表
SzdwMenu.prototype.CreateFloatChildItemPanel = function () {
    var p = document.createElement("div");
    var cssName = this.listPanelCssName;
    var cssJson = this.listPanelCssJson;
    this.SetStyleByCssName(p, cssName);
    this.SetStyleByCssJson(p, cssJson);    
    $(p).css({ "position": "absolute", "display": "none" });
    return p;
}

//显示浮动子菜单项列表
SzdwMenu.prototype.ShowFloatChildItemPanel = function (item) {
    var szdwCtrl = this;
    this.floatItem = item;
    var child = $(item).data("child");
    this.floatChildItemList = child;

    //创建
    var p = this.floatChildItemPanel;
    if (!p) {
        p = this.CreateFloatChildItemPanel();
        var w = $(this.listPanel).outerWidth();
        $(p).outerWidth(w).appendTo(this.namingContainer);
        this.floatChildItemPanel = p;
    }

    //设置样式

    var h_Item = $(item).outerHeight();
    var h_Child = $(child).outerHeight();
    var h = h_Item + h_Child;
    var x = $(item).offset().left + this.minWidth;
    var y = $(item).offset().top;
    var mh = this.y + this.height;
    var oh = h - (mh - y);
    y = oh > 0 ? y - oh : y;
    y = y < this.y ? this.y : y;
    $(p).outerHeight(h).css({ "left": x, "top": y, "overflow": "hidden" });

    if (h > this.height) {
        $(p).outerHeight(this.height).addClass("scrollBar3");
        $(p).mouseover(function () {
            $(this).css({ "overflow-y": "auto" });
        }).mouseleave(function () {
            $(this).css({ "overflow-y": "hidden" });
        });
    }

    //加载显示
    var fItem = $(item).clone();
    var fChild = child;
    var fItemImg = $(fItem).find("[id='itemImg']");
    var fItemText = $(fItem).find("[id='itemText']");
    var w_fItemImg = fItemImg.outerHeight();
    var w = $(this.listPanel).outerWidth();// + 30;

    $(fItemImg).remove();
    $(fItem).outerWidth(w);//.css({ "border": 0 });
    $(fItemText).css({ "text-align": "center", "display": "block", "padding-right": w_fItemImg }).outerWidth(w, true);

    var fChildItem = $(fChild).find("[id='itemText']").andSelf();
    $(fChildItem).css({ "display": "block" });    
    $(p).empty().append(fItem).append(fChild).outerWidth(0).css({ "display": "block"}).animate({width: w });

    $(item).data("childIsIn", false);
    this.SetOpacity(fItem, null, 0.9);
    this.SetOpacity(fChild, null, 0.9);

    //单击页面或其他控件时，隐藏控件

    $(document).click(function () {
        szdwCtrl.HideFloatChildItemPanel();
    });
}

//隐藏浮动子菜单项列表
SzdwMenu.prototype.HideFloatChildItemPanel = function () {
    var p = this.floatChildItemPanel;
    if (p) { $(p).fadeOut(300); }
}

//动画隐藏浮动子菜单项列表：向左滑动
SzdwMenu.prototype.SlideLeftFloatChildItemPanel = function () {
    var p = this.floatChildItemPanel;
    if (p) {
        $(p).animate({ width: 0 }, 300, null, function () {
            $(p).css({ "display": "none" });
        });
    }
}

//#endregion 浮动子菜单项列表

//#region 创建菜单项

//创建菜单项
//itemType:1：普通选中项模式：一般是当前选中项的父级，2：当前选中加载项，此时加载的是与之对应的页面
/*itemJsonParams = { itemType:itemType,text: text, value: value, image: image,parentId: parentId, width: width, height: height, imageWidth: imageWidth, imageHeight: imageHeight,
cssName: cssName, cssJson: cssJson, itemMouseOverCssJson: itemMouseOverCssJson, itemSelectedCssJson: itemSelectedCssJson
}*/
SzdwMenu.prototype.CreateItem = function (itemJsonParams) {
    //#region 参数变量
    var itemType = itemJsonParams.itemType;
    var text = itemJsonParams.text;
    var value = itemJsonParams.value;
    var image = itemJsonParams.image;
    var parentId = itemJsonParams.parentId;
    var width = itemJsonParams.width;
    var height = itemJsonParams.height;
    var imageWidth = itemJsonParams.imageWidth;
    var imageHeight = itemJsonParams.imageHeight;
    var cssName = itemJsonParams.cssName;
    var cssJson = itemJsonParams.cssJson;
    var itemMouseOverCssJson = itemJsonParams.itemMouseOverCssJson;
    var itemSelectedCssJson = itemJsonParams.itemSelectedCssJson;
    var permissionList = itemJsonParams.permissionList;
    var dataIndex = this.GetIndexByValue(value);
    //#endregion 参数变量

    //#region 创建项
    var item = document.createElement("div");
    item.id = value;
    var itemPropJson = { "text": text, "value": value, "parentId": parentId };
    $(item).data("propJson", itemPropJson);
    $(item).data("text", text).data("value", value).data("parentId", parentId).data("dataIndex", dataIndex);

    if (cssName) { this.SetStyleByCssName(item, cssName); }
    if (cssJson) { this.SetStyleByCssJson(item, cssJson); }
    $(item).outerWidth(width, true);
    $(item).outerHeight(height, true);
    $(item).data("itemType", itemType).data("cssName", cssName).data("cssJson", cssJson);

    //菜单图标
    var itemImg = document.createElement("div");
    itemImg.id = "itemImg";
    $(itemImg).outerWidth(imageWidth);
    $(itemImg).outerHeight(imageHeight);
    var img = image ? image.toString().replace("~", "..") : "";

    var backImg = "url(" + img + ") no-repeat center";
    $(itemImg).css({ "float": "left", "background": backImg });
    $(item).append(itemImg);

    //菜单文字
    var itemText = document.createElement("div");
    itemText.id = "itemText";
    $(itemText).height(height);
    $(itemText).css({ "float": "left", "line-height": height + "px","padding-left":"0px"});
    $(itemText).text(text);
    $(item).append(itemText);

    //菜单指示
    var itemSign = document.createElement("div");
    //    $(itemSign).outerWidth(32);
    //    $(itemSign).outerHeight(height);
    //    var signImg = "../Image/Delete16.png";
    //    var backSign = "url(" + signImg + ") no-repeat center";
    //    $(itemSign).css({ "float": "right", "background": backSign, "border-left": "0px solid blue" });
    //    $(item).append(itemSign);

    //菜单删除按钮
    if (this.haveItemDeleteButton) {
        var itemDelBtn = document.createElement("div");
        itemDelBtn.id = "itemDel" + value;
        itemDelBtn.title = "删除菜单";
        $(itemDelBtn).outerWidth(32).outerHeight(height);
        var delImg = this.btnDeleteImage;
        var backDelImg = "url(" + delImg + ") no-repeat center";
        $(itemDelBtn).css({ "float": "right", "background": backDelImg, "display": "none" });
        this.SetStyleByCssName(itemDelBtn, this.btnDeleteCssName);
        this.SetStyleByCssJson(itemDelBtn, this.btnDeleteCssJson);
        $(item).append(itemDelBtn);
    }

    //#endregion 创建菜单项

    //#region 绑定事件
    var szdwMenu = this;
    $(itemDelBtn).click(function (e) {
        if (szdwMenu.fnItemDelete) { szdwMenu.fnItemDelete(dataIndex); }
        e.stopPropagation();
    });

    $(item).mouseover(function () {
        var itemDelBtn = $(this).find("div[id=itemDel" + value + "]");
        if (itemDelBtn) { $(itemDelBtn).show(); }

        var visualMode = szdwMenu.visualMode;
        if (itemType == 1) {
            szdwMenu.SetOpacity(this, szdwMenu.itemBackColorJson[visualMode], 0.7);
            var t = szdwMenu.visualMode == 0 ? "" : text;
            $(this).attr("title", t);
        } else {            
            szdwMenu.SetOpacity(this, szdwMenu.childItemMouseOverBackColorJson[visualMode], 1);
        }
    }).mouseleave(function () {
        var itemDelBtn = $(this).find("div[id=itemDel" + value + "]");
        if (itemDelBtn) { $(itemDelBtn).hide(); }

        if ($(this).prop("Selected") == "true") {
            var visualMode = szdwMenu.visualMode;
            if (itemType == 1) {
                szdwMenu.SetOpacity(this, szdwMenu.itemBackColorJson[visualMode], 1);
            } else {
                szdwMenu.SetOpacity(this, szdwMenu.childItemSelectedBackColorJson [visualMode], 1);
            }
        } else {
            szdwMenu.SetStyleByCssName(this, cssName); 
            szdwMenu.SetStyleByCssJson(this, cssJson);
        }
    }).click(function (e) {
        if (szdwMenu.visualMode == 1) { e.stopPropagation(); }
        szdwMenu.ItemClickEvent(itemJsonParams, this);
    });
    //#endregion 绑定事件
    return item;
}

//菜单项单击事件(菜单项和子项的单击）
SzdwMenu.prototype.ItemClickEvent = function (itemJsonParams, item) {
    //#region 参数变量
    var text = itemJsonParams.text;
    var value = itemJsonParams.value;
    var permissionList = itemJsonParams.permissionList;
    var itemType = itemJsonParams.itemType;
    var dataIndex = this.GetIndexByValue(value);

    this.dataIndex = dataIndex;
    this.defaultItemText = text;
    this.text = text;
    this.value = value;

    //菜单对应页面权限数据
    var pageId = itemJsonParams.pageId;
    this.curPermissionJsonList = this.GetPagePermissionList(pageId);
    //#endregion 参数变量

    //#region 调用外部方法
    //var ret = true;
    var fnClick = this.fnItemClick;
    if (fnClick) {
        //ret =
        fnClick(dataIndex);
    }
    //#endregion 调用外部方法
    
    //#region 设置选中样式
    var selectedItem = itemType == 1 ? this.selectedItem : this.selectedChildItem;
    if (selectedItem) {
        $(selectedItem).prop("Selected", "");
        var oldCssName = $(selectedItem).data("cssName");
        var oldCssJson = $(selectedItem).data("cssJson");

        this.SetStyleByCssName(selectedItem, oldCssName);
        this.SetStyleByCssJson(selectedItem, oldCssJson);

        //如果是子菜单项(itemType:2)
        if (itemType == 2) {
            var itemImg = $(selectedItem).find("#itemImg");
            $(itemImg).css({ "background": "" });
        }
    }

    //设置选中项样式
    //$(item).data("itemType", itemType);
    this.SetSelectedItem(item);
    //#endregion 设置选中样式

    //#region 显示子项或载入页面

    //如果当前项类别为1即父项则显示子项列表,为子项时则载入页面
    if (itemType == 1) {
        //#region 菜单项
        var oldChild = this.oldChildItemList;
        var pageUrl = $(item).data("PageUrl");

        //无子项则载入关联页面
        if (pageUrl && pageUrl.length > 0) {
            //菜单导航数据
            //this.arrMenuNavi = this.GetMenuNaviData(this);

            //重新获取内嵌子菜单项列表
            this.RetrieveChildItemList();

            //快速隐藏其他子菜单                    
            if (oldChild) { $(oldChild).slideUp(); }
            if (this.floatChildItemPanel) { this.HideFloatChildItemPanel(); }

            //打开页面
            if (this.fnLoadPage) {
                pageUrl = "../" + pageUrl.replace("../", "").replace("/Web/", "").replace("Web/", "");
                this.fnLoadPage(pageUrl);
            }

            //恢复选中的子项样式为未选
            var selectedChild = this.selectedChildItem;
            if (selectedChild) {
                $(selectedChild).prop("Selected", "");
                var cssName = this.childItemCssName;
                var cssJson = this.childItemCssJson;
                this.SetStyleByCssName(selectedChild, cssName);
                this.SetStyleByCssJson(selectedChild, cssJson);

                var itemImg = $(selectedChild).find("#itemImg");
                $(itemImg).css({ "background": "" });
            }
        } else {
            var child = $(item).data("child");
            if (!child) {
                var itemBox = $(item).parent();
                var childItemList = this.CreateChildItemList(value);
                $(itemBox).append(childItemList);
                $(item).data("child", childItemList).data("childIsIn", true);              
            }
            //有子项则加载子项列表
            this.ShowChildItemList(item);
        }
        //#endregion 菜单项
    } else {
        //#region 子项:单击载入页面
        //菜单导航数据
        //szdwMenu.arrMenuNavi = szdwMenu.GetMenuNaviData(this);
        //if (ret) {
            if (this.fnLoadPage) {
                var pageUrl = $(item).data("PageUrl");
                pageUrl = "../" + pageUrl.replace("../", "").replace("/Web/", "").replace("Web/", "");
                this.fnLoadPage(pageUrl);
            }

            //如果是浮动菜单项，则单击后隐藏浮动菜单项
            if (this.floatChildItemPanel) {
                this.HideFloatChildItemPanel();
            }
        //}
        //打开页面

        //#endregion子项:单击载入页面
    }
    //#endregion 显示子项或载入页面
}

//显示子菜单项列表
SzdwMenu.prototype.ShowChildItemList = function (item) {
    //重新获取内嵌子菜单项列表
    this.RetrieveChildItemList();

    //显示或隐藏子菜单
    var szdwCtrl = this;
    var child = $(item).data("child");
    var m = this.visualMode;
    var oldChild = this.oldChildItemList;
    if (m == 0) {
        //滑动收起其他内嵌子菜单
        if (oldChild && oldChild != child) {
            $(oldChild).slideUp();
        }

        //收起浮动子菜单
        this.HideFloatChildItemPanel();

        //展开当前内嵌子菜单
        $(child).find("*").css({ "display": "block" }).find("[id^='itemDel']").css({ "display": "none" });
        //$(child).slideDown();
        $(child).slideToggle();
    } else {
        //收起当前内嵌子菜单
        $(child).slideUp();

        //展开浮动子菜单
        var isSelf = item == this.floatItem && $(this.floatChildItemPanel).css("display") == "block";
        if (isSelf) {
            this.SlideLeftFloatChildItemPanel();
        } else {
            var page = $(item).data("PageUrl");
            var hasChild = !(page || page.length > 0);
            if (hasChild) {
                this.ShowFloatChildItemPanel(item);
            }
        }

    }

    //存储当前打开的内嵌子菜单
    this.oldChildItemList = child;
}

//重新获取内嵌子菜单项列表
SzdwMenu.prototype.RetrieveChildItemList = function () {
    var fItem = this.floatItem;
    var childIsIn = $(fItem).data("childIsIn");
    if (!childIsIn && fItem) {
        var fChild = this.floatChildItemList;
        $(fChild).css({ "display": "none" });
        var itemBox = fItem.parentNode;
        $(itemBox).append(fChild);
        $(fItem).data("childIsIn", "true");
    }
}

//获取菜单导航数组
SzdwMenu.prototype.GetMenuNaviData = function (item) {
    var arrMenu = new Array();
    var id = $(item).data("propJson").value;
    var menu = $(item).data("propJson").text;
    var parentId = $(item).data("propJson").parentId;
    var parentMenu = this.GetTextByValue(parentId);
    var grandId = this.GetParentId(parentId);
    var grandMenu = this.GetTextByValue(grandId);
    if (grandMenu) { arrMenu.push(grandMenu); }
    if (parentMenu) { arrMenu.push(parentMenu); }
    if (menu) { arrMenu.push(menu); }

    return arrMenu;
}

//#endregion 创建下拉项

//#region 设置默认选项和选中项

//设置默认选项
SzdwMenu.prototype.SetDefaultItem = function () {
    var text = this.defaultItemText;
    if (text) {
        var lp = this.listPanel;
        var itemId = this.GetValueByText(text);
        var item = $(lp).find("div[id=" + itemId + "]");

        //设置为选中项及样式
        this.SetSelectedItem(item);
        //this.text = text;
        //this.value = itemId;

        //如果有父项，设置为父项的选中项及样式
        var parentJsonList = this.GetParentJsonList(itemId);
        var szdwCtrl = this;
        if (parentJsonList.length > 0) {
            $.each(parentJsonList, function (index, jd) {
                var pItemId = jd.Id;
                var pItem = $(lp).find("div[id=" + pItemId + "]");
                szdwCtrl.SetSelectedItem(pItem);

                //展开子菜单
                var child = $(pItem).data("child");
                //$(child).slideToggle();
                $(child).slideDown();
                szdwCtrl.oldChildItemList = child;
            });
        }

    }
}

//设置选中项
SzdwMenu.prototype.SetSelectedItem = function (item, itemSign) {    
    var itemType = $(item).data("itemType");
    if (itemType == 1) {
        this.selectedItem = item;
    } else {
        this.selectedChildItem = item;
        var img = "/SzdwControls/image/menu/arrow20w.png";
        var backImg = "url(" + img + ") no-repeat center";
        var itemImg = $(item).find("#itemImg");
        $(itemImg).css({ "background": backImg });
    }

    var cssJson = itemType == 1 ? this.itemSelectedCssJson : this.childItemSelectedCssJson;
    $(item).prop("Selected", "true").css(cssJson);

    if (itemType == 2) {
        var bcChild = this.childItemSelectedBackColorJson[this.visualMode];
        this.SetOpacity(item, bcChild, 0.9);
    }

    //itemSign
    //    if (itemSign) {
    //        $(item).append(itemSign);
    //        $(item).prop("ItemSign", itemSign);
    //    }

    //设置控件和目标控件的当前值
    //this.text = $(item).data("text");
    //this.value = $(item).data("value");

    //记录滚动位置
    this.listPanelScrollTop = $(this.listPanel).scrollTop();

}

//#endregion 设置默认选项和选中项

//#region 设置样式

//重设尺寸
SzdwMenu.prototype.Resize = function () {
    var p = this.panel;
    var w = this.width;
    var h = this.height;
    //if (w > 0) { $(p).innerWidth(w); }
    if (h > 0) { $(p).innerHeight(h); }

    this.SetListPanelHeight();
}

//获取载入数据后的尺寸
SzdwMenu.prototype.GetWidthHeight = function () {
    this.width = this.width > 0 ? this.width : $(this.panel).outerWidth();
    this.height = this.height > 0 ? this.height : $(this.panel).outerHeight();
}

//设置样式
SzdwMenu.prototype.SetPanelStyle = function () {
    var t = this.targetControl;
    var p = this.panel;
    this.SetStyleByCssName(p, this.panelCssName);
    this.SetStyleByCssJson(p, this.panelCssJson);
    $(p).outerWidth(this.width).outerHeight(this.height);

}

//设置样式
SzdwMenu.prototype.SetListPanelStyle = function () {
    var t = this.targetControl;
    var panel = this.panel;
    var listPanel = this.listPanel;
    var w = $(panel).width();

    this.SetStyleByCssName(listPanel, this.listPanelCssName);
    this.SetStyleByCssJson(listPanel, this.listPanelCssJson);
    this.SetListPanelHeight();

    var srollBarWidth = listPanel.scrollHeight > $(listPanel).height() ? 19 : 0;

    $(listPanel).outerWidth(w + srollBarWidth);
    this.width = $(panel).outerWidth();   
}

//设置ListPanel高度
SzdwMenu.prototype.SetListPanelHeight = function () {
    var ph = $(this.panel).height();
    var sph = $(this.searchPanel).outerHeight(true);
    var tph = $(this.titlePanel).outerHeight(true);
    var oph = $(this.operationPanel).outerHeight(true);
    var lpMaxH = ph - sph - tph - oph;
    var lpMinH = this.minHeight;

    var listPanel = this.listPanel;
    if (this.minHeight > 0) $(listPanel).css("min-height", lpMinH);
    if (this.maxHeight == 0) $(listPanel).css("max-height", lpMaxH).outerHeight(lpMaxH);
    
}

//根据CssName设置Item样式
SzdwMenu.prototype.SetStyleByCssName = function (element, cssName) {
    if (cssName != null) { $(element).addClass(cssName); }
}

//根据CssJson设置Item样式
SzdwMenu.prototype.SetStyleByCssJson = function (element, cssJson) {
    if (cssJson != null) { $(element).css(cssJson); }
}

//设置背景透明度
SzdwMenu.prototype.SetOpacity = function (element, backColor, opacity) {
    var e = element;
    var bc = backColor;
    if (bc) {
        $(e).css({ "background-color": bc });
    } else {
        bc = $(e).css("background-color");
    }
    var IsIE9 = navigator.userAgent.indexOf("MSIE 9.0") > 0;
    if (!bc || bc.toUpperCase() == "TRANSPARENT") {
        return false;
    } else {
        var bgc = bc.toUpperCase();
        if (bgc.indexOf("RGB") < 0 && bgc.indexOf("#") < 0) bgc = colorHash[bgc];
        if (bgc.indexOf("#") == 0) bgc = bgc.colorHexToRgb();

        var rgba = bgc.replace("RGB", "RGBA").replace(")", ",");
        var cssJson = { "-moz-opacity": opacity, "-khtml-opacity": opacity, "background-color": rgba + opacity + ")" };
        if (!IsIE9) { cssJson["filter"] = "Alpha(opacity = " + opacity * 100 + ")"; }
        $(e).css(cssJson);
    }
}
//#endregion 设置样式

//#region 设置数据加载动画
SzdwMenu.prototype.CreateLoadingImg = function () {
    if (this.hasLoadingImg) {
        var e = document.createElement("div");
        var img = this.loadingImgUrl;
        var w = this.loadingImgWidth > 0 ? this.loadingImgWidth : this.width;
        var h = this.loadingImgHeight > 0 ? this.loadingImgHeight : this.height;
        var x = (this.width - w) / 2;
        var y = (this.height - h) / 2;

        var backImg = "url(" + img + ") no-repeat center";
        $(e).css({ "position": "absolute", "left": x, "top": y, "background": backImg }).outerWidth(w).outerHeight(h);
        
        this.loadingImg = e;
    }
}

SzdwMenu.prototype.ShowLoadingImg = function () {
    var p = this.loadingImg;
    if (p) {
        $(this.namingContainer).append(p);
        $(p).show();
    }
}

SzdwMenu.prototype.HideLoadingImg = function () {
    var p = this.loadingImg;
    if (p) {
        $(p).fadeOut(300, null, function () {
            $(p).remove();
        });
    }
}
//#endregion 设置数据加载动画

//#region 调用菜单项单击事件

//oJson={text:text,value:value}
SzdwMenu.prototype.ExecItemClick = function (oJson) {    
    if (oJson) {
        var itemId = oJson.value ? oJson.value : this.GetValueByText(oJson.text);
        var parentId = this.GetParentId(itemId);
        var lp = this.listPanel;
        if (parentId) {
            var pItem = $(lp).find("div[id=" + parentId + "]");
            $(pItem).trigger("click");
        }

        var item = $(lp).find("div[id=" + itemId + "]");
        if (item) { 
            $(item).trigger("click");
        }
    }
}
//#endregion 调用菜单项单击事件