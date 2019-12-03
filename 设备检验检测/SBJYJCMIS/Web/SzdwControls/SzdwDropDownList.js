//对象SzdwDropDownList
/// <reference path="../Scripts/jquery-1.11.1.js" />
/// <reference path="SzdwCommon.js" />

//jsonList格式：[{Id:1,Name:"XXXX",ParentId:0,Pinyin:xxxxx,Jianpin:Jianpin}]

//#region 对象SzdwDropDownList
function SzdwDropDownList(position, x, y, width, height) {
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
    this.maxHeight = 400; //对象的最大高度：默认400；
    this.onlyLowestItemHasClickEvent = false;//是否只有最小层级项目(即没有父级的项目)点击事件有效；默认false，无效
    this.fnDataBindCallback = null;
    this.fnItemClick = null; //项单击时调用的外部方法
    this.expandorPosition = 1; //0:左边；1：右边.默认：0
    this.expandorShowMode = 0; //0:项悬停显示；1：始终显示.默认：0
    this.hasCheckBox = 0; //项是否有选择框，0或false:无；1或true：有.默认：0或false
    this.hasSearchBox = 0; //是否有搜索框，0或false:无；1或true：有.默认：0或false
    this.hasInsertButton = 0; //项是否有新增按钮，0或false:无；t1或rue：有.默认：0或false
    this.visible = false;
    this.opacity = 0.9;
    this.hasBorder = true;
    this.nonCascadeItemLength = 20;//不分层级联（树状父子关系）的数据项数量。默认：20
    //#endregion 一般属性

    //#region Ajax访问文件和参数

    this.requestUrl = null; //请求文件（含路径）
    this.paramJson = null; //Json格式参数

    //#endregion Ajax访问文件和参数

    //#region 字段和数据
    this.fieldId = "Id";
    this.fieldName = "Name";
    this.fieldPinyin = "Pinyin";
    this.fieldParentId = "ParentId";
    this.fieldJianpin = "Jianpin";
    this.jsonList = null;
    this.jsonItemAll = null;
    this.topParentJsonList=null;
    this.text = "";
    this.value = 0;
    this.dataIndex = 0;
    //#endregion 字段和数据
      
    //#region 主题样式
    this.themeType = 1; //0：浅灰色；1：黑色，默认：1
    this.themeJsonList = [
    {
        loadingImgUrl: "/SzdwControls/image/loading/loading16b.gif",
        panel: { "color": "black", "background-color": "#E6E6E6", "border-color": "#D0D0D0" },
        searchPanel: { "color": "black", "background-color": "transparent" },
        searchBox: { "color": "black", "background-color": "#F6F6F6", "border-color": "#E0E0E0", "clearButtonImage": "../SzdwControls/image/dropdown/1/cancel21b.png" },
        searchResultPanel: { "color": "black", "background-color": "#F6F6F6", "border-color": "#E0E0E0" },
        listPanel: { "color": "black", "background-color": "White" },
        item: { "color": "black" },
        itemHover: { "color": "black", "background-color": "#DDDDDD" },
        itemSelected: { "color": "black", "background-color": "#CCCCCC" },//
        itemExpandor: { "color": "black", "itemExpandorImage": "/SzdwControls/image/dropdown/1/right20b4.png", "itemExpandorImageToggle": "/SzdwControls/image/dropdown/1/down20b4.png" },
        itemExpandorHover: { "color": "black", "background-color": "#E9E9E9" },
        insertPanel: { "color": "black", "background-color": "transparent" },
        insertButton: { "color": "black", "background-color": "transparent", "insertButtonImage": "/SzdwControls/image/dropdown/1/insert21b.png" },
        insertButtonHover : { "background-color":"#F6F6F6" }
    },
    {
        loadingImgUrl: "/SzdwControls/image/loading/loading16w.gif",
        panel: { "color": "white", "background-color": "#060606", "border-color": "#060606" },
        searchPanel: { "color": "white", "background-color": "transparent" },
        searchBox: { "color": "white", "background-color": "#333333", "border-color": "#333333", "clearButtonImage": "/SzdwControls/image/dropdown/2/cancel21w.png" },
        searchResultPanel: { "color": "white", "background-color": "#222222", "border-color": "#333333" },
        listPanel: { "color": "white", "background-color": "#111111" },
        item: { "color": "white" },
        itemHover: { "color": "white", "background-color": "#333333" },
        itemSelected: { "color": "white", "background-color": "#333333" },//darkOrange
        itemExpandor: { "color": "white", "background-color": "transparent", "itemExpandorImage": "/SzdwControls/image/dropdown/2/right20w.png", "itemExpandorImageToggle": "/SzdwControls/image/dropdown/2/down20w.png" },
        itemExpandorHover: { "color": "White", "background-color": "#505050" },
        insertPanel: { "color": "White", "background-color": "transparent" },
        insertButton: { "color": "White", "background-color": "transparent", "insertButtonImage": "/SzdwControls/image/dropdown/2/insert21w.png" },
        insertButtonHover: { "background-color": "#333333" }
    }];

    //#endregion 主题样式

    //#region 外框：对象容器
    this.panel = document.createElement("div"); //对象容器：根对象，控制对象的显示的坐标、宽高、显隐
    this.panel.style.overflow = "hidden"; //对象容器默认没有滚动条
    this.panel.style.display = "none"; //对象容器默认隐藏：由函数控制显隐
    this.panel.style.padding = "0"; //对象容器对象内留白
    this.panel.style.margin = "0"; //对象容器对象外留白
    //$(this.panel).css({ "position": position, "left": x, "top": y }); //对象容器定位方式、坐标、宽高
    this.panelCssName = null; //对象容器css样式表名称
    this.panelCssJson = { "font-family": "微软雅黑", "background-color": "red", "border": "1px solid silver", "opacity": this.opacity }; //对象容器Json格式css数据

    //#endregion 外框：对象容器
    
    //#region 搜索面板
    this.searchPanel = null;
    this.searchPanelWidth = 0;
    this.searchPanelHeight = 35;
    this.searchPanelCssName = null;
    this.searchPanelCssJson = { "padding": "5px" };

    this.searchImage = "/SzdwControls/image/dropdown/search20ds.png";
    this.searchBox = null;
    this.searchBoxWidth = 0;
    this.searchBoxHeight = 0;//22
    this.searchBoxCssName = null;
    this.searchBoxCssJson = { "border": "1px solid transparent"};
    this.searchBoxDefaultText = "搜索";

    this.searchResultPanel = null;
    this.searchResultPanelWidth = width;
    this.searchResultPanelHeight = 0;
    this.searchResultPanelCssName = null;
    this.searchResultPanelCssJson = { "position": "absolute", "display": "none", "overflow": "hidden", opacity: 1, "border": "1px solid silver" };

    this.clearButton = null;
    this.clearButtonImage = "/SzdwControls/image/dropdown/cancel21b.png";
    //#endregion 搜索面板

    //#region 列表面板
    this.listPanel = null;
    this.listPanelWidth = 0;
    this.listPanelHeight = 0;
    this.listPanelCssName = null;
    this.listPanelCssJson = { "overflow": "hidden", "border": "0px" };
    this.listPanelScrollTop = 0;
    this.listBox = null;
    //#endregion 列表面板

    //#region 项Item
    this.itemWidth = 0;// width;
    this.itemHeight = 24;  
    this.itemCssName = null;
    this.itemCssJson = { "font-size": "10pt","white-space": "nowrap", "padding": "0px 5px 0px 5px", "cursor": "default", "background-color": "transparent", "color": "White" };
    this.itemHoverCssName = null;
    this.itemHoverCssJson = { };
    this.itemSelectedCssName = null;
    this.itemSelectedCssJson = {}; //#1B60C3,RGB(55,179,224) 
     
    this.itemTitle = null;
    this.itemText = null;

    this.itemImage = null;
    this.itemImageWidth = 25;
    this.itemImageHeight = this.itemHeight;    

    this.itemExpandorImage = "/SzdwControls/image/dropdown/right20w.png";
    this.itemExpandorImageToggle =  "/SzdwControls/image/dropdown/down20w.png";
    this.itemExpandorImageWidth = 20;
    this.itemExpandorImageHeight = this.itemHeight;
    this.itemExpandorCssName = null;
    this.itemExpandorCssJson = { "cursor": "pointer"};
    this.itemExpandorHoverCssName = null;
    this.itemExpandorHoverCssJson = { "cursor": "pointer" };

    this.childItemOffsetLeft =13;    
    //#endregion 项Item
    
    //#region 默认项及当前项
    this.defaultText = "";
    this.defaultItem =null;
    this.selectedItem = null;
    //#endregion 默认项及当前项

    //#region 新增面板
    this.insertPanel = null;
    this.insertPanelWidth = 0;
    this.insertPanelHeight = 35;
    this.insertPanelCssName = null;
    this.insertPanelCssJson = { "padding": "5px"};

    this.insertButton = null;
    this.insertButtonWidth = 0;
    this.insertButtonHeight = 0;//25
    this.insertButtonCssName = null;
    this.insertButtonCssJson = { "font-family": "微软雅黑", "font-size": "10pt"};
    this.insertButtonHoverCssName = null;
    this.insertButtonHoverCssJson = {"cursor": "pointer" };
    this.fnInsert = null;

    this.insertButtonText = "添加新项…";
    this.insertButtonImage = "/SzdwControls/image/dropdown/insert21b.png";
    this.insertButtonImageWidth = 22;
    this.insertButtonImageHeight = 0;
    //#endregion 新增面板

    //#region 初始化函数
    this.fnInitial = null;
    //#endregion 初始化函数

    //#region 加载动画
    this.loadingImgUrl = null;
    this.loadingImgWidth = 0; //加载动画gif文件的宽度
    this.loadingImgHeight = 0; //加载动画gif文件的高度
    this.loadingImg = null;
    //#endregion 加载动画
}
    //#endregion 对象SzdwDropDownList

//#region 显示隐藏

//mode:0:淡入淡出，默认；1：滑动
SzdwDropDownList.prototype.ShowToggle = function (mode, e) {
    //关闭其他控件
    if (!this.visible) {
        $(document).trigger("click");
    }

    //定位
    this.SetPosition();

    var szdwCtrl = this;
    if (this.jsonList == null) {
        return false;
    } else {
        var p = this.panel;
        var m = typeof (mode) == "undefined" ? 0 : mode;
        switch (m) {
            case 0:
                $(p).fadeToggle(200, null, function () { szdwCtrl.ScrollToView(); });
                break;
            case 1:
                if ($(p).css("display") == "none") {
                    $(p).slideDown(200, null, function () { szdwCtrl.ScrollToView(); });
                } else {
                    $(p).slideToggle(200, null, function () { szdwCtrl.ScrollToView(); });
                }
                break;
        }

        //还原滚动位置
        if (this.listPanelScrollTop > 0) {
            $(this.listPanel).scrollTop(this.listPanelScrollTop);
        }
    }

    this.visible = !this.visible;

    //取消事件冒泡
    e.stopPropagation();
}

//SzdwDropDownList显示
SzdwDropDownList.prototype.Show = function () {
    //定位
    this.SetPosition();

    var szdwCtrl = this;
    $(this.panel).fadeIn(300, null, function () { szdwCtrl.ScrollToView(); });
    this.visible = true;
}

//SzdwDropDownList隐藏
SzdwDropDownList.prototype.Hide = function () {
    var szdwCtrl = this;
    $(this.panel).fadeOut(300, null, function () { szdwCtrl.ScrollToView(); });
    this.visible = false;
}

//SzdwDropDownList显示
SzdwDropDownList.prototype.SlideDown = function () {
    //定位
    this.SetPosition();
    var szdwCtrl = this;
    $(this.panel).slideDown(200, null, function () { szdwCtrl.ScrollToView(); });
    this.visible = true;
}

//SzdwDropDownList隐藏
SzdwDropDownList.prototype.SlideUp = function () {
    var szdwCtrl = this;
    $(this.panel).slideUp(200, null, function () { szdwCtrl.ScrollToView(); });
    this.visible = false;
}

//滚动到完全可视位置
SzdwDropDownList.prototype.ScrollToView = function () {
    var p = this.panel;
    if (!$(p).is(":hidden")) {
        var nc = this.namingContainer;
        var nch = $(nc).innerHeight();
        var y = $(p).offset().top;
        var h = $(p).outerHeight();
        var oh = y + h - nch; 
        if (oh > 0) {
            var st = $(nc).scrollTop() + oh;
            $(nc).animate({ scrollTop: st }, 300);
        }
    }
}
//#endregion 显示隐藏

//#region 数据绑定
SzdwDropDownList.prototype.DataBind = function () {
    //加载本地数据或异步从数据库获取数据
    var jsonList = this.jsonList;
    this.SetPanel();
    if (jsonList) {
        this.GetJsonList(jsonList);
        this.Load();
    } else {
        this.AjaxData();
    }
}

//异步从数据库获服务器取数据
SzdwDropDownList.prototype.AjaxData = function () {
    //异步从数据库获服务器取数据   
    this.loadingImg = this.CreateLoadingImg();
    var x = this.GetOffsetX();
    var y = this.GetOffsetY();
    var w = $(this.targetControl).outerWidth();
    var h = this.height;
    this.ShowLoadingImg(x, y, w, h);

    //绑定数据
    var szdwCtrl = this;
    var url = this.requestUrl;
    var paramJson = this.paramJson;
    $.ajax({
        url: url, type: "post", data: paramJson, dataType: "json",
        success: function (jsonData) {
            if (!$.isEmptyObject(jsonData)) {
                szdwCtrl.AjaxSuccess(jsonData);
            }
        },
        complete: function () {
            szdwCtrl.HideLoadingImg();
        }
    });
}

//ajax异步加载数据成功后执行的函数
SzdwDropDownList.prototype.AjaxSuccess = function (jsonList) {
    if (this.jsonList == null) {
        this.GetJsonList(jsonList);
        this.Load();

        if (typeof (this.fnDataBindCallback) == "function") {
            this.fnDataBindCallback();
        }
    }
}
//#endregion 数据绑定

//#region 加载

//设置
SzdwDropDownList.prototype.SetPanel = function () {
    //载入父容器
    this.AppendToNamingContainer();

    //设置主题样式
    this.SetThemeStyle();

    //设置面板
    this.SetPanelStyle();
}

//加载
SzdwDropDownList.prototype.Load = function () {
    //创建   
    //if (event) {
    //    event.stopPropagation();
    //}
       
    if (arguments[0]) {
        var e = arguments[0];
        e.stopPropagation();
    }

    if (window.event) {
        window.event.cancelBubble = true;
    } 

    //var e = event ? event : window.event;
    //if (e.stopPropagation) {
    //    e.stopPropagation();
    //} else {
    //    e.cancelBubble = true;
    //}

    this.Show();
    this.CreateDropDownList();
    this.GetWidthHeight();
    this.SetListPanelStyle();
    this.SetDefaultItem();

    //单击页面或其他控件时，隐藏控件
    var szdwCtrl = this;
    $(document).click(function () {
        $(szdwCtrl.panel).fadeOut(200);
        szdwCtrl.visible = false;
    });
}

//加至命名控件
SzdwDropDownList.prototype.AppendToNamingContainer = function () {
    var p = this.panel;
    var nc = this.namingContainer;
    if (nc != null && $(p).parent().length == 0) {
        $(p).appendTo(nc);
    }
}

//目标控件阻止事件冒泡
SzdwDropDownList.prototype.TargetControlStopPropagation = function () {
    var tc = this.targetControl;
    var szdwCtrl = this;
    $(tc).click(function () {
        if (event) {
            event.stopPropagation();
        }

        if (window.event) {
            window.event.cancelBubble = true;
        }


        //szdwCtrl.ShowToggle(1, e);
    });
}
//#endregion 加载

//#region 获取数据

//获取控件的数据
SzdwDropDownList.prototype.GetJsonList = function (jsonList) {
    if (jsonList) {
        var fieldId = this.fieldId;
        var fieldParentId = this.fieldParentId;

        //添加“全部”列表项
        var jsonItemAll = this.jsonItemAll;
        if (jsonItemAll != null) {
            jsonItemAll[fieldParentId] = -1;
            jsonList.unshift(jsonItemAll);
        }

        //添加HasChild属性字段
        var len = jsonList.length;
        for (var i = 0; i < len; i++) {
            var id = jsonList[i][fieldId];
            for (var j = 0; j < len; j++) {
                var pId = jsonList[j][fieldParentId];
                if (id === pId) {
                    jsonList[i]["HasChild"] = true;
                    break;
                }
            }
        }

        this.jsonList = jsonList;

        //获取所有顶级父数据 
        this.topParentJsonList = this.GetTopParentJsonList();
    }
}

//获取所有顶级父数据
SzdwDropDownList.prototype.GetTopParentJsonList = function () {
    if (this.jsonList == null) {
        return null;
    } else {
        var jsonList = this.jsonList;
        var len = jsonList.length;

        var fieldId = this.fieldId;
        var fieldParentId = this.fieldParentId;

        //获取所有顶级父数据
        var topParentJsonList = $.grep(jsonList, function (item, i) {
            var pId = item[fieldParentId];
            for (var j = 0; j < len; j++) {
                var jd = jsonList[j];
                var id = jd[fieldId];
                if (pId === id) {
                    return true;
                }
            }
        }, true);

        return topParentJsonList;
    }
}

//获取基于parentItemValue的childJsonList
SzdwDropDownList.prototype.GetChildJsonList = function (parentItemValue) {
    //获取parentItemValue下的子项jsonData
    var jsonList = this.jsonList;
    var cJsonList = new Array();
    for (var i = 0; i < jsonList.length; i++) {
        var jd = jsonList[i];
        var parentValue = jd[this.fieldParentId];
        if (parentValue === parentItemValue) {
            cJsonList.push(jd);
        }
    }

    return cJsonList;
}
    
//根据id获取所有的父级数据
SzdwDropDownList.prototype.GetParentJsonList = function (id) {
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
    
//获取搜索结果数据
SzdwDropDownList.prototype.GetSearchJsonList = function (searchText) {
    if (this.jsonList == null) {
        return null;
    } else {
        var jsonList = this.jsonList;
        var len = jsonList.length;
        var fieldName = this.fieldName;
        var fieldPinyin = this.fieldPinyin;
        var fieldJianpin = this.fieldJianpin;

        //获取搜索匹配数据
        var len = searchText.length;
        var searchJsonList = $.grep(jsonList, function (item, i) {
            var name = item[fieldName];
            var hasName = name.substr(0, len) == searchText;
            
            var pinyin = item[fieldPinyin] ? item[fieldPinyin].toUpperCase() : null;
            var hasPinyin = pinyin ? pinyin.substr(0, len) == searchText.toUpperCase() : false;

            var jianpin = item[fieldJianpin] ? item[fieldJianpin].toUpperCase() : null;
            var hasJianpin = jianpin ? jianpin.substr(0, len) == searchText.toUpperCase() : false;

            return hasName || hasPinyin || hasJianpin;
        });

        return searchJsonList;
    }
}
    
//获取父Id
SzdwDropDownList.prototype.GetParentId = function (id) {
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
SzdwDropDownList.prototype.GetValueByText = function (text) {
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
SzdwDropDownList.prototype.GetTextByValue = function (value) {
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
SzdwDropDownList.prototype.GetDataIndexByValue = function (value) {
    var jsonList = this.jsonList;
    var index = null;
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
//#endregion 获取数据

//#region 创建控件
SzdwDropDownList.prototype.CreateDropDownList = function () {
    var len = this.jsonList.length;
    var nonCascadeItemLength = this.nonCascadeItemLength;
    var onlyLowestItemHasClickEvent=this.onlyLowestItemHasClickEvent;
    var jsonList = len <= nonCascadeItemLength && !onlyLowestItemHasClickEvent ? this.jsonList : this.topParentJsonList; //顶级父数据
    var jsonItemAll = this.jsonItemAll;

    if (jsonItemAll && (len > nonCascadeItemLength || onlyLowestItemHasClickEvent)) {
        var cJsonList = this.GetChildJsonList(jsonItemAll[this.fieldId]);
        $.merge(jsonList, cJsonList);
    }

    if (jsonList == null) {
        return null;
    } else {
        //创建搜索面板
        if (this.hasSearchBox) {
            this.searchPanel = this.CreateSearchPanel();
            $(this.panel).append(this.searchPanel)

            this.searchBox = this.CreateSearchBox();
            $(this.searchPanel).append(this.searchBox);

            this.clearButton = this.CreateClearButton();
            $(this.searchPanel).append(this.clearButton);
        }

        //创建列表面板:开始只创建顶级父项
        this.listPanel = this.CreateListPanel();
        var itemList = this.CreateItemList(jsonList, 1);
        this.listBox = itemList;
        $(this.listPanel).append(itemList);
        $(this.panel).append(this.listPanel);
        //创建搜索面板
        if (this.hasInsertButton) {
            this.insertPanel = this.CreateInsertPanel();
            $(this.panel).append(this.insertPanel)

            this.insertButton = this.CreateInsertButton();
            $(this.insertPanel).append(this.insertButton);
        }

        //面板事件
        var szdwCtrl = this;
        $(this.panel).click(function () {
            $(szdwCtrl.searchResultPanel).fadeOut(100);
        });

        $(this.listPanel).click(function () {
            $(szdwCtrl.searchResultPanel).fadeOut(100);
        });

        $(document.body).click(function () {
            $(szdwCtrl.searchResultPanel).fadeOut(100);
        });
    }
}
//#endregion 创建控件

//#region 搜索面板

//创建搜索面板
SzdwDropDownList.prototype.CreateSearchPanel = function () {
    var p = document.createElement("div");
    var cssName = this.searchPanelCssName;
    var cssJson = this.searchPanelCssJson;
    var w = this.searchPanelWidth > 0 ? this.searchPanelWidth : $(this.panel).width();
    var h = this.searchPanelHeight;
    this.SetStyleByCssName(p, cssName);
    this.SetStyleByCssJson(p, cssJson);
    if (w > 0) { $(p).outerWidth(w, true); }
    if (h > 0) { $(p).outerHeight(h, true); }    

    return p;
}

//创建搜索框
SzdwDropDownList.prototype.CreateSearchBox = function () {
    var defaultText = this.searchBoxDefaultText;
    var cssName = this.searchBoxCssName;
    var cssJson = this.searchBoxCssJson;
    var w = this.searchBoxWidth > 0 ? this.searchBoxWidth : $(this.searchPanel).width();
    var h = this.searchBoxHeight > 0 ? this.searchBoxHeight : $(this.searchPanel).height();

    var e = document.createElement("input");
    $(e).attr("type", "text");
    this.SetStyleByCssName(e, cssName);
    this.SetStyleByCssJson(e, cssJson);

    var img = this.searchImage;
    var backColor = cssJson["background-color"];
    var backImg = "url(" + img + ") no-repeat 3px " + backColor;
    $(e).css({ "position": "absolute", "background": backImg, "padding-left": "24px" });

    $(e).outerWidth(w, true).outerHeight(h).css({ "line-height": $(e).height()+ "px" }).val(defaultText);

    var szdwCtrl = this;
    var bindEventName = "input";
    if (navigator.userAgent.indexOf("MSIE") != -1) {
        bindEventName = "propertychange";
    }

    $(e).click(function (e) {
        var text = $.trim($(this).val());
        if (text == defaultText) {
            $(this).val("");
        } else {
            szdwCtrl.ShowSearchResultPanel(text);
        }
        e.stopPropagation();
    }).bind(bindEventName,function () {
        var text = $.trim($(this).val());
        szdwCtrl.ShowSearchResultPanel(text);

        var btnClear = szdwCtrl.clearButton;
        if (text.length > 0) {
            $(btnClear).fadeIn(200);
        } else {
            $(btnClear).fadeOut(200);
        }
    }).blur(function () {
        var text = $.trim($(this).val());
        if (text.length == 0) {
            $(this).val(defaultText);
        }
    });
    return e;
}

//创建搜索框
SzdwDropDownList.prototype.CreateClearButton = function () {
    var e = document.createElement("div");
    e.style.overflow = "hidden";

    var img = this.clearButtonImage;
    var backimg = "url(" + img + ") no-repeat center";
    var s = this.searchBox;
    var sx = $(s).position().left;
    var sy = $(s).position().top;
    var sw = $(s).outerWidth();
    var sh = $(s).outerHeight();
    var w = sh;
    var h = sh;
    var x = sx + sw - w;
    var y = 0; //"left": x, "top": y,
    $(e).outerWidth(w).outerHeight(h).css({ "position": "relative", "float": "right", "display": "none", "background": backimg, "cursor": "pointer" });

    //绑定事件
    var szdwCtrl = this;
    $(e).click(function (e) {
        $(s).val(szdwCtrl.searchBoxDefaultText);
        $(this).fadeOut(200);
        $(szdwCtrl.searchResultPanel).fadeOut(200);
        e.stopPropagation();
    });
    return e;
}

//创建搜索结果列表
SzdwDropDownList.prototype.ShowSearchResultPanel = function (searchText) {
    var sp = this.searchBox;
    var p = this.searchResultPanel;
    if (p) {
        $(p).empty();
    } else {
        var x = $(sp).position().left;
        var y = $(sp).position().top + $(sp).innerHeight();
        p = this.CreateSearchResultPanel(x, y);
        $(this.panel).append(p);
        this.searchResultPanel = p;
    }
    //创建搜索列表
    var text = $.trim(searchText);
    if (text && text.length > 0) {
        var jsonList = this.GetSearchJsonList(text);
        if (jsonList.length > 0) {
            var itemList = this.CreateItemList(jsonList, 2);
            if (this.onlyLowestItemHasClickEvent) {
                //如果只有最底层(也就是没有父级)的节点响应单击事件，
                //则节点调用下拉列表中的节点相应事件
                var items = $(itemList).children().children();
                var szdwCtrl = this;
                $(items).unbind("click").click(function (e) {
                    var value = $(this).data('dataJson').value;
                    var item = $(szdwCtrl.listPanel).find("[id=" + value + "]");
                    if (item[0]) {
                        $(item).trigger('click');
                    } else {
                        var dataIndex = $(this).data('dataJson').dataIndex;
                        var text = $(this).data('dataJson').text;

                        //存储选中值 
                        szdwCtrl.dataIndex = dataIndex;
                        szdwCtrl.text = text;
                        szdwCtrl.value = value;

                        //文本框中显示选中项的文字和值
                        var t = szdwCtrl.targetControl;
                        $(t).focus().data("value", value);
                        t.title = text;

                        if ($(t).is("input")) {
                            $(t).val(text);
                        } else {
                            $(t).text(text);
                        }

                        //调用外部方法
                        var fnClick = szdwCtrl.fnItemClick;
                        if (fnClick) {                            
                            fnClick(dataIndex);
                        }

                        //隐藏搜索面板
                        $(szdwCtrl.searchResultPanel).fadeOut(100);

                        //显示控件
                        szdwCtrl.ShowToggle(0, e);
                    }
                    e.stopPropagation();
                });
            }
            $(p).append(itemList);
            $(p).slideDown(300);
        } else {
            $(p).fadeOut(100);
        }
    } else {
        $(p).fadeOut(100);
    }
}

//创建搜索结果列表面板
SzdwDropDownList.prototype.CreateSearchResultPanel = function (x, y) {
    var p = document.createElement("div");
    var cssName = this.searchResultPanelCssName;
    var cssJson = this.searchResultPanelCssJson;
    var w = $(this.searchBox).outerWidth();
    this.searchResultPanelWidth = w;
    var h = this.searchResultPanelHeight > 0 ? this.searchResultPanelHeight : $(this.panel).height() * 2 / 3;

    this.SetStyleByCssName(p, cssName);
    this.SetStyleByCssJson(p, cssJson);
    $(p).css({ "left": x, "top": y });
    if (w > 0) { $(p).outerWidth(w); }
    if (h > 0) { $(p).css({ "max-height": h + "px" }); }

    //动态显示纵向滚动条
    if (this.themeType == 1) {
        $(p).addClass("scrollBar");
    }
    $(p).mouseover(function () {
        $(this).css({ "overflow-y": "auto" });
    }).mouseleave(function () {
        $(this).css({ "overflow-y": "hidden" });
    });

    return p;
}
//#endregion 搜索面板

//#region 创建列表

//创建listPanel
SzdwDropDownList.prototype.CreateListPanel = function () {
    var p = document.createElement("div");
    var cssName = this.listPanelCssName;
    var cssJson = this.listPanelCssJson;
    var w = this.listPanelWidth > 0 ? this.listPanelWidth : $(this.panel).width();
    var h = this.listPanelHeight;
    this.SetStyleByCssName(p, cssName);
    this.SetStyleByCssJson(p, cssJson);
    if (w > 0) { $(p).outerWidth(w); }
    if (h > 0) { $(p).outerHeight(h); }

    //动态显示纵向滚动条
    if (this.themeType == 1) {
        $(p).addClass("scrollBar");
    }
    $(p).mouseover(function () {
        $(this).css({ "overflow-y": "auto" });
    }).mouseleave(function () {
        $(this).css({ "overflow-y": "hidden" });
    });

    return p;
}

//创建某一级别的Item列表:itemType,1:普通列表模式，2：搜索结果列表模式
SzdwDropDownList.prototype.CreateItemList = function (jsonList, itemType) {
    if (jsonList == null) {
        return null;
    } else {
        var itemList = document.createElement("div");
        for (var i = 0; i < jsonList.length; i++) {
            var jd = jsonList[i];
            var text = jd[this.fieldName];
            var value = jd[this.fieldId];
            var parentId = jd[this.fieldParentId];
            var itemJsonParams = { itemType: itemType, text: text, value: value, parentId: parentId};

            //如果itemType为1:普通列表模式，判断是否该项是否有子项
            if (itemType == 1) {
                var hasChild = jd["HasChild"] ? jd["HasChild"] : false;
                itemJsonParams["hasChild"] = hasChild;
            }
            //创建项
            var item = this.CreateItem(itemJsonParams);
            var itemBox = document.createElement("div");
            $(itemBox).append(item).appendTo(itemList);
        }
        
        return itemList;
    }
}

//#endregion 创建列表

//#region 创建项

//创建项
//itemType:0:顶级列表项,1：子列表项模式，2：搜索列表项
/*itemJsonParams = { itemType:itemType,text: text, value: value, parentId: parentId, hasChild: hasChild,isTopLevel: isTopLevel}*/
SzdwDropDownList.prototype.CreateItem = function (itemJsonParams) {
    //#region 相关变量
    var itemType = itemJsonParams.itemType;
    var text = itemJsonParams.text;
    var value = itemJsonParams.value;
    var image = itemJsonParams.image;
    var parentId = itemJsonParams.parentId;
    var hasChild = itemJsonParams.hasChild;
    var isTopLevel = itemJsonParams.isTopLevel;

    var width = this.itemWidth > 0 ? this.itemWidth : $(this.listPanel).width();
    var height = this.itemHeight;
    var imageWidth = this.itemImageWidth;
    var imageHeight = this.itemImageHeight;
    var cssName = this.itemCssName;
    var cssJson = this.itemCssJson;
    var itemHoverCssJson = this.itemHoverCssJson;
    var itemSelectedCssJson = this.itemSelectedCssJson;
    var dataIndex = this.GetDataIndexByValue(value);
    var childItemOffsetLeft = itemType == 1 ? this.childItemOffsetLeft : 0;

    var hasCheckBox = this.hasCheckBox;
    var expandorPosition = this.expandorPosition;
    var expandorImage = this.itemExpandorImage;
    var expandorImageToggle = this.itemExpandorImageToggle;
    var expCssName = this.itemExpandorCssName;
    var expCssJson = this.itemExpandorCssJson;
    var expHoverCssName = this.itemExpandorHoverCssName;
    var expHoverCssJson = this.itemExpandorHoverCssJson;
    var itemExpandorImageWidth = this.itemExpandorImageWidth;
    var onlyLowestItemHasClickEvent = this.onlyLowestItemHasClickEvent;
    var nonCascadeItemLength = this.nonCascadeItemLength;
    //#endregion 相关变量

    //#region 创建项
    var len = this.jsonList.length;
    //项
    var item = document.createElement("div");
    if (itemType == 1) {
        item.id = value;
    }
    item.title = text;
    var dataJson = itemJsonParams;
    dataJson["cssName"] = cssName;
    dataJson["cssJson"] = cssJson;
    dataJson["dataIndex"] = dataIndex;
    this.SetStyleByCssName(item, cssName);
    this.SetStyleByCssJson(item, cssJson);
    $(item).data("dataJson", dataJson);
 
    //如果是子项，错位显示
    if (itemType == 1 && (len > nonCascadeItemLength || onlyLowestItemHasClickEvent)) {
        var paddingLeft = parseInt($("#" + parentId).css("padding-left")) + childItemOffsetLeft;
        $(item).css({ "padding-left": paddingLeft }).data("cssPaddingLeft", paddingLeft);
    }

    //如果是搜索项，不错位显示
    if (itemType == 2) {
        var tpItem = $(this.listPanel).find("[id='" + this.topParentJsonList[0].Id + "']");
        var paddingLeft = $(tpItem).css("padding-left");
        $(item).css({ "padding-left": paddingLeft });
    }

    //普通列项模式下
    if (itemType == 1 && (len > nonCascadeItemLength || onlyLowestItemHasClickEvent)) {
        //左展开器
        var itemExpandor = null;
        if (expandorImage && (value != "0")) {//
            itemExpandor = document.createElement("div");
            itemExpandor.id = "exp" + value;
            this.SetStyleByCssName(itemExpandor, expCssName);
            this.SetStyleByCssJson(itemExpandor, expCssJson);

            var display = this.expandorShowMode == 0 ? "none" : "block";
            if (expandorPosition == 0) { display = "block"; }
            var ew = itemExpandorImageWidth ? itemExpandorImageWidth : 0;
            $(itemExpandor).outerWidth(ew).outerHeight(height).css({ "float": "left", "display": display });
            if (hasChild) {
                var backExpandor = "url(" + expandorImage + ") no-repeat center";
                $(itemExpandor).css({ "background": backExpandor });
            }
            if (expandorPosition == 0) { $(item).append(itemExpandor); }
        }

        //复选框
        if (hasCheckBox) {
            var chk = document.createElement("input");
            $(chk).attr("type", "checkbox").css({ "float": "left", "margin": "0px 3px 0px 3px" }).outerHeight(height);
            $(item).append(chk);
        }
    }

    //图标
    if (image) {
        var itemImg = document.createElement("div");
        itemImg.id = "itemImg";
        $(itemImg).outerWidth(imageWidth).outerHeight(imageHeight);
        var img = image ? image.toString().replace("~", "..") : "";

        var backImg = "url(" + img + ") no-repeat center";
        $(itemImg).css({ "float": "left", "background": backImg });
        $(item).append(itemImg);
    }

    //文字
    var itemText = null;
    if (text) {
        itemText = document.createElement("div");
        $(itemText).css({ "float": "left", "line-height": height + "px" });
        $(itemText).height(height).text(text);
        $(item).append(itemText);
    }

    //普通列项模式下
    if (itemType == 1 && (len > nonCascadeItemLength || onlyLowestItemHasClickEvent)) {
        //右展开器
        if (itemExpandor && expandorPosition == 1) {
            $(itemExpandor).css({ "float": "right", "margin-right": childItemOffsetLeft + "px" });
            $(item).append(itemExpandor);
        }
    }

    //设置item高度宽度及itemText宽度
    $(item).outerWidth(width, true).outerHeight(height);
    if (itemText) {
        var iw = itemImg ? $(itemImg).outerWidth(true) : 0;
        var ew = itemExpandor ? $(itemExpandor).outerWidth(true) : 0;
        var tw = $(item).width() - iw - ew;
        $(itemText).outerWidth(tw);
    }
    
    //#endregion 创建项

    //#region 绑定事件
    var szdwCtrl = this;
    //#region 项事件绑定
    $(item).mouseover(function () {
        $(this).css(itemHoverCssJson);

        //普通列项模式下
        if (itemType == 1) {
            //展开器显隐
            if (itemExpandor && expandorPosition == 1) {
                if (szdwCtrl.expandorShowMode == 0) {
                    $(itemExpandor).show();
                }
            }
        }
    }).mouseleave(function () {
        if ($(this).data("selected")) {
            $(this).css(itemSelectedCssJson);
        } else {
            var paddingLeft = $(this).css("padding-left");
            cssJson["padding-left"] = paddingLeft;
            szdwCtrl.SetStyleByCssName(item, cssName);
            szdwCtrl.SetStyleByCssJson(item, cssJson);
        }

        //普通列项模式下
        if (itemType == 1) {
            //展开器显隐
            if (itemExpandor && expandorPosition == 1) {
                if (szdwCtrl.expandorShowMode == 0) {
                    $(itemExpandor).hide();
                }
            }
        }
    }).click(function (e) {
        if (szdwCtrl.onlyLowestItemHasClickEvent && hasChild && (value!="0")) {
            $(itemExpandor).trigger("click");
        } else {
            //恢复选中项未选中前样式
            szdwCtrl.RecoverSelectedItem();
            //存储选中值 
            szdwCtrl.dataIndex = dataIndex;
            szdwCtrl.text = text;
            szdwCtrl.value = value;
            //szdwCtrl.defaultText = text;

            //文本框中显示选中项的文字和值
            var t = szdwCtrl.targetControl;
            $(t).focus().data("value", value);
            t.title = text;

            if ($(t).is("input")) {
                $(t).val(text);
            } else {
                $(t).text(text);
            }

            //设置当前项为选中项
            szdwCtrl.SetSelectedItem(this);
            //调用外部方法
            var fnClick = szdwCtrl.fnItemClick;
            if (fnClick) {
                fnClick(dataIndex);
            }

            //隐藏搜索面板
            $(szdwCtrl.searchResultPanel).fadeOut(100);

            //显示控件
            szdwCtrl.ShowToggle(0, e);
        }
        //取消事件冒泡
        e.stopPropagation();

    });
    //#endregion 项事件绑定

    //#region 展开器事件绑定 
    if (itemExpandor && hasChild) {
        $(itemExpandor).mouseover(function () {
            szdwCtrl.SetStyleByCssName(this, expHoverCssName);
            szdwCtrl.SetStyleByCssJson(this, expHoverCssJson);
        }).mouseleave(function () {
            szdwCtrl.SetStyleByCssName(this, expCssName);
            szdwCtrl.SetStyleByCssJson(this, expCssJson);
        }).click(function (e) {
            $(szdwCtrl.searchResultPanel).fadeOut(100);

            var listPanelIsMaxHeight = parseInt($(szdwCtrl.listPanel).css("max-height"), 10) == $(szdwCtrl.listPanel).outerHeight();
            
            var childList = $(item).data("childList");            
            if (childList) {
                var isExpanded = $(this).data("isExpanded");
                var bckImg = isExpanded ? expandorImage : expandorImageToggle;
                var backExpandor = "url(" + bckImg + ") no-repeat center";
                $(this).css({ "background": backExpandor });

                if (listPanelIsMaxHeight) {
                    $(childList).slideToggle(200,null,function(){
                        if (isExpanded) { szdwCtrl.SetListPanelHeight(); }
                    });
                } else {
                    var display = isExpanded ? "none" : "block";
                    $(childList).css({ "display": display });
                }
                $(this).data("isExpanded", !isExpanded);
            } else {
                var cJsonList = szdwCtrl.GetChildJsonList(value);
                var cItemList = szdwCtrl.CreateItemList(cJsonList, 1);
                                
                if (listPanelIsMaxHeight) { $(cItemList).css({ "display": "none" }); }
                
                $(item).data("childList", cItemList);
                var itemBox = $(item).parent();
                $(itemBox).append(cItemList);                

                var backExpandor = "url(" + expandorImageToggle + ") no-repeat center";
                $(this).css({ "background": backExpandor });                
                $(cItemList).slideDown(200);
                $(this).data("isExpanded", true);                
            }            
            
            if (!listPanelIsMaxHeight) { szdwCtrl.SetListPanelHeight();  }  

            szdwCtrl.SetStyleByCssName(this, expHoverCssName);
            szdwCtrl.SetStyleByCssJson(this, expHoverCssJson);

            //取消事件冒泡
            e.stopPropagation();
        });
    }

    //#endregion 展开器事件绑定

    //#endregion 绑定事件

    return item;
}

//恢复选中项未选中前样式
SzdwDropDownList.prototype.RecoverSelectedItem = function () {
    var selectedItem = this.selectedItem;
    if (selectedItem) {
        $(selectedItem).data("selected", false);
        var oldCssName = $(selectedItem).data("dataJson").cssName;
        var oldCssJson = $(selectedItem).data("dataJson").cssJson;
        var paddingLeft = $(selectedItem).css("padding-left");
        oldCssJson["padding-left"] = paddingLeft;

        this.SetStyleByCssName(selectedItem, oldCssName);
        this.SetStyleByCssJson(selectedItem, oldCssJson);
    }
}

//设置列表高度
SzdwDropDownList.prototype.SetListPanelHeight = function () {
    var lb = this.listBox;
    var lbh = $(lb).outerHeight(true);
    var mh = this.maxHeight;
    var sh = this.searchPanel ? $(this.searchPanel).outerHeight(true) : 0;
    var ih = this.insertPanel ? $(this.insertPanel).outerHeight(true) : 0;
    var lpmh = mh - sh - ih;
    var lph = Math.min(lpmh, lbh);

    $(this.listPanel).outerHeight(lph);
}

//#endregion 创建下拉项

//#region 设置默认选项和选中项

//设置默认选项
SzdwDropDownList.prototype.SetDefaultItem = function () {
    var text = this.defaultText;
    var value = this.GetValueByText(text);    
    
    if (value) {
        var lp = this.listPanel;
        var item = $(lp).find("[id='" + value + "']")[0]; //this.defaultItem; 
        if (!item) {
            var dataJson = { itemType: 0, text: text, value: value }
            item = this.CreateItem(dataJson);
        }

        //设置选中项
        this.SetSelectedItem(item);
        var selectedItem = this.selectedItem;
        var scrollTop = $(selectedItem).offset().top - $(lp).offset().top - $(selectedItem).outerHeight();
        $(lp).scrollTop(scrollTop);
        this.listPanelScrollTop = scrollTop;

    }
}

//设置选中项
SzdwDropDownList.prototype.SetSelectedItem = function (item) {
    var lp = this.listPanel;
    var dataJson = $(item).data("dataJson");
    var itemType = dataJson.itemType;
    var value = dataJson.value;
    var cssJson = this.itemSelectedCssJson;

    //获取搜索结果对应的条目并定位
    item = $(lp).find("[id='" + value + "']")[0];
    var parentJson = this.GetParentJsonList(value);
    var len = parentJson.length;

    if (len > 0) {
        for (var i = len - 1; i >= 0; i--) {
            var exp = $(lp).find("[id='exp" + parentJson[i].Id + "']");
            var isExpanded = $(exp).data("isExpanded");            
            if (!isExpanded) { $(exp).trigger("click");}            
        }
        if (!item) {
            item = $(lp).find("[id='" + value + "']");
        }
    }

    if (itemType == 1) {
        //列表面板定位:普通列项模式下
        this.listPanelScrollTop = $(lp).scrollTop();
    } else{
        var scrollTop = $(item).offset().top - $(lp).offset().top - $(item).outerHeight(); //Y
        this.listPanelScrollTop = $(lp).scrollTop() + scrollTop; //Y
    }
    $(item).css(cssJson).data("selected", "true");

    //存储选中项
    this.selectedItem = item;
}

//#endregion 设置默认选项和选中项

//#region 新增数据面板
//创建新增数据面板
SzdwDropDownList.prototype.CreateInsertPanel = function () {
    var p = document.createElement("div");
    var cssName = this.insertPanelCssName;
    var cssJson = this.insertPanelCssJson;
    var w = this.insertPanelWidth > 0 ? this.insertPanelWidth : $(this.panel).width();
    var h = this.insertPanelHeight;
    this.SetStyleByCssName(p, cssName);
    this.SetStyleByCssJson(p, cssJson);
    if (w > 0) { $(p).outerWidth(w, true); }
    if (h > 0) { $(p).outerHeight(h, true); }
    
    return p;
}

//创建新增数据面板
SzdwDropDownList.prototype.CreateInsertButton = function () {
    var text = this.insertButtonText;
    var image = this.insertButtonImage;
    var width = this.insertButtonWidth > 0 ? this.insertButtonWidth : $(this.insertPanel).width();
    var height = this.insertButtonHeight > 0 ? this.insertButtonHeight : $(this.insertPanel).height();
    var imageWidth = this.insertButtonImageHeight;
    var imageHeight = this.insertButtonImageHeight;
    var cssName = this.insertButtonCssName;
    var cssJson = this.insertButtonCssJson;
    var hoverCssName = this.insertButtonHoverCssName;
    var hoverCssJson = this.insertButtonHoverCssJson;

    //#region 创建项
    //项
    var btn = document.createElement("div");
    this.SetStyleByCssName(btn, cssName);
    this.SetStyleByCssJson(btn, cssJson);

    //图标
    if (image) {
        var btnImg = document.createElement("div");
        var iw = imageWidth > 0 ? imageWidth : height;
        var ih = imageHeight > 0 ? imageHeight : height;
        $(btnImg).outerWidth(iw).outerHeight(ih);
        var img = image ? image.toString().replace("~", "..") : "";

        var backImg = "url(" + img + ") no-repeat center";
        $(btnImg).css({ "float": "left", "background": backImg });
        $(btn).append(btnImg);
    }

    //文字
    if (text) {
        var btnText = document.createElement("div");
        var tw = btnImg ? width - $(btnImg).outerWidth() : width;
        $(btnText).css({ "float": "left", "line-height": height + "px" });
        $(btnText).width(tw).height(height).text(text);
        $(btn).append(btnText);
    }
    $(btn).outerWidth(width).outerHeight(height);
    //#endregion 创建项

    //#region 绑定事件
    var szdwCtrl = this;
    //#region 项事件绑定
    $(btn).mouseover(function () {
        szdwCtrl.SetStyleByCssName(btn, hoverCssName);
        szdwCtrl.SetStyleByCssJson(btn, hoverCssJson);
    }).mouseleave(function () {
        szdwCtrl.SetStyleByCssName(btn, cssName);
        szdwCtrl.SetStyleByCssJson(btn, cssJson);
    }).click(function () {
        $(szdwCtrl.searchResultPanel).fadeOut(100);

        //调用外部方法
        var fnClick = szdwCtrl.fnInsert;
        if (fnClick) {
            fnClick(szdwCtrl);
        }
    });
    //#endregion 项事件绑定

    //#endregion 绑定事件

    return btn;
}

//#endregion 新增数据面板

//#region 定位尺寸

//定位
SzdwDropDownList.prototype.SetPosition = function () {  
    var x = this.GetOffsetX();
    var y = this.GetOffsetY();
    var p = this.position;

    $(this.panel).css({ "position": p, "left": x, "top": y });
}

//获得偏移X（含滚动）
SzdwDropDownList.prototype.GetOffsetX = function () {
    var nc = this.namingContainer;
    var ncSl = $(nc).scrollLeft();
    var t = this.targetControl;
    var x = $(t).offset().left;
    this.x = x;

    return x + ncSl;
}

//获得偏移Y（含滚动）
SzdwDropDownList.prototype.GetOffsetY = function () {
    var nc = this.namingContainer;
    var ncSt = $(nc).scrollTop();
    var t = this.targetControl;
    var th = $(t).outerHeight();
    var y = $(t).offset().top + th - 1 ;
    this.y = y;

    return y + ncSt;
}

//重设尺寸
SzdwDropDownList.prototype.Resize = function () {
    var p = this.panel;
    var w = this.width;
    var h = this.height;
    if (w > 0) { $(p).innerWidth(w); }
    if (h > 0) { $(p).innerHeight(h); }
}

//获取载入数据后的尺寸
SzdwDropDownList.prototype.GetWidthHeight = function () {
    this.width = this.width > 0 ? this.width : $(this.panel).outerWidth();
    this.height = this.height > 0 ? this.height : $(this.panel).outerHeight();
}
//#endregion 定位尺寸

//#region 设置样式

//设置样式
SzdwDropDownList.prototype.SetPanelStyle = function () {
    var nc = this.namingContainer;
    var ncSl = $(nc).scrollLeft();
    var ncSt = $(nc).scrollTop();
    this.x = this.x + ncSl;
    this.y = this.y + ncSt;

    var t = this.targetControl;
    var p = this.panel;
    this.SetStyleByCssName(p, this.panelCssName);
    this.SetStyleByCssJson(p, this.panelCssJson);

    var tbw = $(t).outerWidth() - $(t).innerWidth();
    var pbw = $(p).outerWidth() - $(p).innerWidth();
    var obw = tbw - pbw; ;
    if (this.minWidth > 0) $(p).css("min-width", this.minWidth + obw);
    if (this.maxWidth > 0) $(p).css("max-width", this.maxWidth);
    if (this.minHeight > 0) $(p).css("min-height", this.minHeight);
    if (this.maxHeight > 0) $(p).css("max-height", this.maxHeight);
    
    var w = this.width;
    if (w > 0) { $(p).outerWidth(this.width); }

    this.SetPosition();
}

//设置样式
SzdwDropDownList.prototype.SetListPanelStyle = function () {
    var t = this.targetControl;
    var panel = this.panel;
    var searchPanel = this.searchPanel;
    var searchBox = this.searchBox;
    var listPanel = this.listPanel;
    var insertPanel = this.insertPanel;
    var pw = $(panel).innerWidth();
    var ph = $(panel).height();
    var sh = searchPanel ? $(searchPanel).outerHeight(true) : 0;
    var ih = insertPanel ? $(insertPanel).outerHeight(true) : 0;

    this.SetStyleByCssName(listPanel, this.listPanelCssName);
    this.SetStyleByCssJson(listPanel, this.listPanelCssJson);

    if (this.minHeight > 0) $(listPanel).css("min-height", this.minHeight);
    if (this.maxHeight > 0) $(listPanel).css("max-height", this.maxHeight - sh - ih);
    //if (this.maxHeight > 0) $(listPanel).css("max-height", $(panel).height() - $(searchPanel).outerHeight(true) - $(insertPanel).outerHeight(true));

    var srollBarWidth = listPanel.scrollHeight > $(listPanel).height() ? 19 : 0;

    //$(listPanel).outerWidth(pw + srollBarWidth);
    $(listPanel).outerWidth(pw);
    var h = ph - sh - ih;
    if (h > 0) { $(listPanel).outerHeight(h); }
    this.width = $(panel).outerWidth();
}

//根据CssName设置Item样式
SzdwDropDownList.prototype.SetStyleByCssName = function (element, cssName) {
    if (cssName) { $(element).addClass(cssName); }
}
//根据CssJson设置Item样式
SzdwDropDownList.prototype.SetStyleByCssJson = function (element, cssJson) {
    if (cssJson) { $(element).css(cssJson); }
}
//#endregion 设置样式

//#region 设置主题样式
SzdwDropDownList.prototype.SetThemeStyle = function () {
    var i = this.themeType;
    var jlTheme = this.themeJsonList;
    var hasBorder = this.hasBorder;
    var opacity = i == 0 ? 1 : 0.9;
    if (this.opacity > 0) { opacity = this.opacity; }
    
    //#region 加载动画
    this.loadingImgUrl = jlTheme[i].loadingImgUrl;
    //#endregion 加载动画

    //#region 对象面板
    var panelTheme = jlTheme[i].panel;

    if (panelTheme.color) { this.panelCssJson["color"] = panelTheme.color; }
    if (panelTheme["background-color"]) { this.panelCssJson["background-color"] = panelTheme["background-color"]; }
    if (panelTheme["border-color"]) { this.panelCssJson["border-color"] = panelTheme["border-color"]; }
    this.panelCssJson["opacity"] = opacity;
    if (!hasBorder) { this.panelCssJson["border"] = "0px"; }
    
    //#endregion 对象面板

    //#region 搜索面板
    var searchPanelTheme = jlTheme[i].searchPanel;
    var searchBoxTheme = jlTheme[i].searchBox;
    var searchResultPanelTheme = jlTheme[i].searchResultPanel;

    if (searchPanelTheme.color) { this.searchPanelCssJson["color"] = searchPanelTheme.color; }
    if (searchPanelTheme["background-color"]) { this.searchPanelCssJson["background-color"] = searchPanelTheme["background-color"]; }

    if (searchBoxTheme.color) { this.searchBoxCssJson["color"] = searchBoxTheme.color; }
    if (searchBoxTheme["background-color"]) { this.searchBoxCssJson["background-color"] = searchBoxTheme["background-color"]; }
    if (searchBoxTheme["border-color"]) { this.searchBoxCssJson["border-color"] = searchBoxTheme["border-color"]; }
    if (searchBoxTheme["clearButtonImage"]) { this.clearButtonImage = searchBoxTheme["clearButtonImage"]; }

    if (searchResultPanelTheme.color) { this.searchResultPanelCssJson["color"] = searchResultPanelTheme.color; }
    if (searchResultPanelTheme["background-color"]) { this.searchResultPanelCssJson["background-color"] = searchResultPanelTheme["background-color"]; }
    if (searchResultPanelTheme["border-color"]) { this.searchResultPanelCssJson["border-color"] = searchResultPanelTheme["border-color"]; }


    //#endregion 搜索面板

    //#region 列表面板
    var listPanelTheme = jlTheme[i].listPanel;
    var itemTheme = jlTheme[i].item;
    var itemHoverTheme = jlTheme[i].itemHover;
    var itemSelectedTheme = jlTheme[i].itemSelected;
    var itemExpandorTheme = jlTheme[i].itemExpandor;
    var itemExpandorHoverTheme = jlTheme[i].itemExpandorHover;

    if (listPanelTheme.color) { this.listPanelCssJson["color"] = listPanelTheme.color; }
    if (listPanelTheme["background-color"]) { this.listPanelCssJson["background-color"] = listPanelTheme["background-color"]; }
    if (listPanelTheme["border-color"]) { this.listPanelCssJson["border-color"] = listPanelTheme["border-color"]; }

    if (itemTheme.color) { this.itemCssJson["color"] = itemTheme.color; }
    if (itemTheme["background-color"]) { this.itemCssJson["background-color"] = itemTheme["background-color"]; }

    if (itemHoverTheme.color) { this.itemHoverCssJson["color"] = itemHoverTheme.color; }
    if (itemHoverTheme["background-color"]) { this.itemHoverCssJson["background-color"] = itemHoverTheme["background-color"]; }

    if (itemSelectedTheme.color) { this.itemSelectedCssJson["color"] = itemSelectedTheme.color; }
    if (itemSelectedTheme["background-color"]) { this.itemSelectedCssJson["background-color"] = itemSelectedTheme["background-color"]; }

    if (itemExpandorTheme.color) { this.itemExpandorCssJson["color"] = itemExpandorTheme.color; }
    if (itemExpandorTheme["background-color"]) { this.itemExpandorCssJson["background-color"] = itemExpandorTheme["background-color"]; }

    if (itemExpandorTheme.itemExpandorImage) { this.itemExpandorImage = itemExpandorTheme.itemExpandorImage; }
    if (itemExpandorTheme.itemExpandorImageToggle) { this.itemExpandorImageToggle = itemExpandorTheme.itemExpandorImageToggle; }

    if (itemExpandorHoverTheme.color) { this.itemExpandorHoverCssJson["color"] = itemExpandorHoverTheme.color; }
    if (itemExpandorHoverTheme["background-color"]) { this.itemExpandorHoverCssJson["background-color"] = itemExpandorHoverTheme["background-color"]; }

    //#endregion 列表面板

    //#region 新增项面板
    var insertPanelTheme = jlTheme[i].insertPanel;
    var insertButtonTheme = jlTheme[i].insertButton;
    var insertButtonHoverTheme = jlTheme[i].insertButtonHover;

    if (insertPanelTheme.color) { this.insertPanelCssJson["color"] = insertPanelTheme.color; }
    if (insertPanelTheme["background-color"]) { this.insertPanelCssJson["background-color"] = insertPanelTheme["background-color"]; }

    if (insertButtonTheme.color) { this.insertButtonCssJson["color"] = insertButtonTheme.color; }
    if (insertButtonTheme["background-color"]) { this.insertButtonCssJson["background-color"] = insertButtonTheme["background-color"]; }
    if (insertButtonTheme.insertButtonImage) { this.insertButtonImage = insertButtonTheme.insertButtonImage; }

    if (insertButtonHoverTheme.color) { this.insertButtonHoverCssJson["color"] = insertButtonHoverTheme.color; }
    if (insertButtonHoverTheme["background-color"]) { this.insertButtonHoverCssJson["background-color"] = insertButtonHoverTheme["background-color"]; }
    //#endregion 新增项面板
}
//#endregion 设置主题样式

//#region 设置数据加载动画
SzdwDropDownList.prototype.CreateLoadingImg = function () {
    var e = document.createElement("div");
    var i = this.themeType;
    var backColor = this.themeJsonList[i].panel["background-color"];
    var imgGif = this.loadingImgUrl ? this.loadingImgUrl : this.themeJsonList[i].loadingImgUrl;
    var backImg = "url(" + imgGif + ") no-repeat center " + backColor;
    $(e).css({ "position": "absolute", "background": backImg, "border": "1px solid silver" });
    if (i == 1) { $(e).css({ "border": "1px solid black" }); }
    return e;
}

SzdwDropDownList.prototype.ShowLoadingImg = function (x, y, width, height) {  
    var imgBox = this.loadingImg;
    $(imgBox).css({ "left": x, "top": y });
    $(imgBox).outerWidth(width).outerHeight(height);
    $(imgBox).appendTo(this.namingContainer).show();
}

SzdwDropDownList.prototype.HideLoadingImg = function () {
    $(this.loadingImg).fadeOut(100);
}
//#endregion 设置数据加载动画

//#region 创建下拉框图标

//创建下拉框图标
function CreateDropDownListIconNew(targetControl, iconUrl) {
    //获取目标控件及其位置尺寸属性
    var t = targetControl;
    var th = $(t).height();
    var tw = $(t).innerWidth();
    var tx = $(t).position().left;
    var ty = $(t).position().top;
    var bw = ($(t).outerWidth() - $(t).innerWidth()) / 2;
    var bc = $(t).css("background-color");
    $(t).css({ "line-height": th + "px" });
    var tp = $(t).parent();

    //创建目标控件图标
    var iw = th - 2 * bw;
    var ih = th;
    var ix = tx + tw;
    var iy = 0;
    var bgUrl = "url(" + iconUrl + ")";
    var icon = document.createElement("div");
    $(icon).css({ "position": "relative", "left": ix, "top": iy });
    $(icon).width(iw);
    $(icon).height(ih);
    $(icon).css({ "position": "relative", "cursor": "pointer", "background-image": bgUrl, "background-repeat": "no-repeat", "background-position": "center", "line-height": th + "px" });
    $(tp).append(icon);

    //重设目标控件
    var nw = tw - iw;
    var nh = th;
    var nx = 0;
    var ny = 0;
    $(t).css({ "cursor": "pointer", "left": nx, "top": ny, "border": "0px" });
    $(t).width(nw);
}

function CreateDropDownListBackImage(targetControl, imgUrl) {
    var t = targetControl;
//    if ($(t).val()) { $(t).val(""); }
//    if ($(t).text()) { $(t).text(""); }

    //设置图片
    var pr = 20;
    var pdr = parseInt($(t).css("padding-right"));
    if (pdr < pr) {
        $(t).outerWidth($(t).outerWidth() - pr);
        $(t).css({ "padding-right": pr });
    }

    var bgImg = "url(" + imgUrl + ")";
    var bgRpt = "no-repeat";
    var tw = $(t).innerWidth();
    var ix = tw - pr;
    var bgPos = ix + "px 50%";
    var th = $(t).height();
    $(t).css({ "cursor": "pointer", "background-image": bgImg, "background-repeat": bgRpt, "background-position": bgPos, "line-height": th + "px" });
}

//为目标控件(Input)下拉框图标:目前在用的函数
function CreateDropDownListIcon(targetControl, iconUrl) {
    var t = targetControl;
    if ($(t).val()) { $(t).val(""); }
    if ($(t).text()) { $(t).text(""); }

    var th = $(t).height();
    var tw = $(t).innerWidth();
    var tx = $(t).position().left;
    var ty = $(t).position().top;
    var bw = ($(t).outerWidth() - $(t).innerWidth()) / 2;
    var w = th - 2;
    var h = th;
    var x = tx + tw - w + bw;
    var y = ty + bw;
    var bc = $(t).css("background-color");
    $(t).css({ "line-height": th + "px" });

    var p = document.createElement("div");
    var img = document.createElement("image");
    img.src = iconUrl;
    $(p).append(img);
    $(p).css({ "position": "absolute", "left": x, "top": y, "cursor": "pointer", "background-color": "#FFFFFF", "border-left": "0px solid #CCCCCC" });
    $(p).outerWidth(w);
    $(p).outerHeight(h);
    $(img).load(function () {
        $(this).css({ "position": "relative", "left": (w - $(img).innerWidth()) / 2, "top": (h - $(img).innerHeight()) / 2 });
    });

    $(p).click(function (e) {
        $(t).trigger("click");
        e.stopPropagation();
    });

    $(t).parent().append(p);
}
//#endregion 创建下拉框图标

//#region 扩展函数加载到目标对象

//paramJson:json格式参数:{relateControl:"",requestUrl:"",paramJson:"",fnInitial:"",jsonList:jsonList,defaultText:defaultText,fnItemClick:fnItemClick}
$.fn.extend({
    dropDownList: function (paramJson) {
        var c = this;
        $(c).css("cursor", "pointer").attr('readonly',true);

        //创建下拉框图标
        var iconUrl = "../SzdwControls/image/dropdown/triangle.png";
        //CreateDropDownListIcon(c, iconUrl);
        CreateDropDownListBackImage(c, iconUrl);

        //#region 目标控件单击事件
        $(c).unbind("click").click(function (e) {
            if (!c.szdwCtrl) {
                var position = "absolute";
                var cw = $(c).innerWidth();
                var ch = $(c).outerHeight();
                var x = $(c).offset().left;
                var y = $(c).offset().top + ch - 1;
                var w = cw;
                var h = 40;

                //加载时的长宽
                if (paramJson) {
                    if (paramJson.width) {
                        w = paramJson.width;
                    }

                    if (paramJson.height) {
                        h = paramJson.height;
                    }
                }

                //创建实例
                c.szdwCtrl = new SzdwDropDownList(position, x, y, w, h);
                c.szdwCtrl.targetControl = this;

                //#region 传入参数
                if (paramJson) {
                    if (paramJson.requestUrl) {
                        c.szdwCtrl.requestUrl = paramJson.requestUrl;
                    }

                    if (paramJson.paramJson) {
                        c.szdwCtrl.paramJson = paramJson.paramJson;
                    }

                    if (paramJson.fnInitial) {
                        c.szdwCtrl.fnInitial = paramJson.fnInitial(c.szdwCtrl);
                    }

                    if (paramJson.maxHeight) {
                        var mh = paramJson.maxHeight;
                        if (mh > 0) { c.szdwCtrl.maxHeight = mh; }
                    }

                    if (paramJson.maxWidth) {
                        var mw = paramJson.maxWidth;
                        if (mw > 0) { c.szdwCtrl.maxWidth = mw; }
                    }

                    if (paramJson.themeType) {
                        c.szdwCtrl.themeType = paramJson.themeType;
                    }

                    if (paramJson.opacity) {
                        c.szdwCtrl.opacity = paramJson.opacity;
                    }

                    if (paramJson.jsonList) {
                        c.szdwCtrl.jsonList = paramJson.jsonList;
                    }

                    if (paramJson.defaultText) {
                        c.szdwCtrl.defaultText = paramJson.defaultText;
                    } else {
                        c.szdwCtrl.defaultText = $(c).is("input") ? $(c).val() : $(c).text();
                    }

                    if (paramJson.fnItemClick) {
                        c.szdwCtrl.fnItemClick = paramJson.fnItemClick;
                    }
                }
                //#endregion 传入参数

                //异步加载数据
                c.szdwCtrl.DataBind();

                //存储下拉款框对象到目标控件
                //$(c).data("szdwDdl", c.szdwCtrl);
            } else {
                c.szdwCtrl.ShowToggle(1, e);

                var curText = $(c).is("input") ? $(c).val() : $(c).text();
                var selectedItem = c.szdwCtrl.selectedItem;
                if (selectedItem && $(selectedItem).data('dataJson').text != curText) {
                    c.szdwCtrl.RecoverSelectedItem();
                    c.szdwCtrl.defaultText = curText;
                    c.szdwCtrl.SetDefaultItem();
                }
            }
        });
        //#endregion 目标控件单击事件
    }
});
//#endregion 扩展函数加载到目标对象