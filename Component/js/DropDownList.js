/**
 * 下拉框组件
 * @param {json} json 
 */
function DropDownList(json) {

    //定义各种属性,目的：暴露属性接口，方便实例化后进行属性更改
    // 定义通用属性
    this.width = json.basicSetting.width || 150;
    this.height = json.basicSetting.height || 150;
    this.x = json.basicSetting.x || 0;
    this.y = json.basicSetting.y || 0;
    this.parentContainer = json.basicSetting.parentContainer || "body"; //定义默认父容器
    this.relatedInput = json.basicSetting.relatedInput; //外部相关联的input输入框
    // 定义数据
    this.jsonList = null;
    this.localData = json.data.localData; //定义本地数据
    this.ajaxData = json.data.ajaxData; //定义远程数据
    //定义顶级父数据
    this.parentJsonList = null;
    //定义“全部”列表项
    this.jsonItemAll = null;

    //定义整个下拉框容器属性
    this.box = document.createElement("div"); //定义下拉框容器

    //定义搜索面板属性
    this.searchPanel = document.createElement("div"); //定义搜索面板
    this.searchPanelClassName = json.searchPanelSetting.searchPanel.className; //定义搜索面板类名
    this.searchPanelCssJson = json.searchPanelSetting.searchPanel.cssJson; //定义搜索面板样式
    //定义搜索框属性
    this.searchBox = document.createElement("input"); //定义搜索框
    this.searchBoxClassName = json.searchPanelSetting.searchBox.className; //定义按钮类名
    this.searchBoxCssJson = json.searchPanelSetting.searchBox.cssJson; //定义按钮样式
    //定义搜索框关闭按钮属性
    this.clearBox = document.createElement("div"); //定义搜索框
    this.clearBoxClassName = json.searchPanelSetting.clearBox.className; //定义按钮类名
    this.clearBoxCssJson = json.searchPanelSetting.clearBox.cssJson; //定义按钮样式

    //定义数据面板属性
    this.dataPanel = document.createElement("div"); //定义数据面板
    this.dataPanelClassName = json.dataPanelSetting.dataPanel.className; //定义按钮类名
    this.dataPanelCssJson = json.dataPanelSetting.dataPanel.cssJson; //定义按钮样式
    //定义数据项属性
    this.itemClassName = json.dataPanelSetting.item.className; //定义按钮类名
    this.itemCssJson = json.dataPanelSetting.item.cssJson; //定义按钮样式
    //定义展开按钮属性
    this.iconBoxClassName = json.dataPanelSetting.iconBox.className; //定义按钮类名
    this.iconBoxCssJson = json.dataPanelSetting.iconBox.cssJson; //定义按钮样式

    this.load(); //初始化加载下拉框组件
};
//获取数据列表
{
    //绑定数据
    DropDownList.prototype.dataBind = function () {
        //加载本地数据或异步从数据库获取数据
        var localData = this.localData;
        var ajaxData = this.ajaxData;
        var url = ajaxData.url;
        var type = ajaxData.type;
        var data = ajaxData.data;
        var dataType = ajaxData.dataType;
        if (localData) {
            this.jsonList = localData;
        } else {
            $.ajax({
                url:url,type:type,data:data,dataType:dataType,
                success: function (jsonData) {
                    if (!$.isEmptyObject(jsonData)) {
                        this.jsonList = jsonData;
                    }
                }
                // complete:function () {  
                // }
            })
        }
    }
    //获取新的jsonList数据
    DropDownList.prototype.getJsonList = function () {
        var jsonList = this.jsonList;
        var jsonItemAll = this.jsonItemAll;
        if (jsonItemAll) { //如果“全部”列表项存在，则添加到jsonlist的最前面
            jsonItemAll["ParentId"] = -1;
            jsonList.unshift(jsonItemAll);
        };
        for (var i = 0; i < jsonList.length; i++) {
            var id = jsonList[i]["Id"];
            for (var j = 0; j < jsonList.length; j++) {
                var parentId = jsonList[j]["ParentId"];
                if (id === parentId) { //获取每一项的Id与所有项的parentId进行比较，如果相等，说明该项存在子项，添加属性HasChild
                    jsonList[i]["HasChild"] = true;
                    break;
                }
            }
        };
        this.jsonList = jsonList; //返回新的jsonlist
        // this.parentJsonList = this.getParentJsonList(); //获取所有的顶级父数据
    }
    //获取所有顶级父数据列表
    DropDownList.prototype.getParentJsonList = function () {
        var jsonList = this.jsonList;
        var parentJsonList = $.grep(jsonList, function (item, i) {
            var parentId = item["ParentId"]; //逐个获取每一条item的ParentId
            for (var i = 0; i < jsonList.length; i++) {
                if (jsonList[i]["Id"] === parentId) { //获取每一条数据的Id，与item的parentId判断是否相等，如果相等，说明该item不是顶级父数据，返回false
                    return true;
                }
            }
        }, true);
        this.parentJsonList = parentJsonList;
    }
    //获取基于列表项Id的的子项数据列表
    DropDownList.prototype.getChildJsonList = function (id) {
        var jsonList = this.jsonList;
        var childJsonList = [];
        for (var i = 0; i < jsonList.length; i++) {
            var panentId = jsonList[i]["ParentId"];
            if (panentId === id) { //获取所有的parentId与指定的id进行判断，如果相等，则表示该项是指定id项的子项，将每一个子项添加到新的数组中并返回
                childJsonList.push(jsonList[i]);
            }
        }
        return childJsonList;
    }
    //获取基于搜索内容searchText的搜索结果数据列表
    DropDownList.prototype.getSearchJsonList = function (searchText) {
        var jsonList = this.jsonList;
        var len = searchText.length;
        var searchJsonList = $.grep(jsonList, function (item, i) {
            //将搜索内容与每一条数据对应的值相比较，判断该项数据是否是所搜的数据
            //判断所搜名称是否存在
            var hasName = item["Name"].substr(0, len) == searchText;
            //先判断PinYin该属性是否存在，然后判断所搜拼音是否存在
            var hasPinYin = item["PinYin"] ? item["PinYin"].substr(0, len) == searchText.toLowerCase() : false;
            //先判断JianPin该属性是否存在，然后判断所搜简拼是否存在
            var hasJianPin = item["JianPin"] ? item["JianPin"].substr(0, len) == searchText.toLowerCase() : false;
            //只要有一项满足条件，则该项数据便是所搜数据，并添加到新数组searchJsonList
            return hasName || hasPinYin || hasJianPin;
        });
        return searchJsonList;
    }
}
//创建数据面板
{
    //基于itemType创建数据容器 itemType值分为, 1:创建普通列表子数据容器 2:创建搜索列表数据容器
    // itemJsonParams = {itemType:itemType, text:text, value:value, parentId:parentId, hasChild:hasChild}
    DropDownList.prototype.createItemBox = function (itemJsonParams) {
        var itemType = itemJsonParams.itemType;
        var txt = itemJsonParams.text;
        var value = itemJsonParams.value;
        var hasChild = itemJsonParams.hasChild;
        var width = this.width;
        var relatedInput = this.relatedInput;
        var itemClassName = this.itemClassName;
        var itemCssJson = this.itemCssJson;
        var itemBox = document.createElement("div"); //创建包含数据项及按钮的容器
        var item = document.createElement("div"); //创建数据项
        var iBCssJson = { //设置数据容器的基础样式
            "width": width - 10 + "px",
            "position": "relative"
        };
        var iCssJson = { //设置数据项的基础样式
            "width": width - 10 + "px",
            "height": "30px",
            "paddingLeft": "10px",
            "lineHeight": "30px",
            "boxSizing": "border-box",
            "color": "white"
        };
        $(itemBox).css(iBCssJson).append(item); //加载数据容器基础css样式       
        $(item).text(txt);
        $(item).data("Id", value);
        $(item).css(iCssJson); //加载数据项基础css样式
        this.setStyleByClassName(item, itemClassName); //加载由类名添加的css样式
        this.setStyleByCssJson(item, itemCssJson); //加载由类名添加的css样式
        //如果是创建子列表数据项，需要判断是否添加展开按钮
        if (itemType == 1) {
            if (hasChild) { // 如果子数据项存在子项，则添加展开按钮              
                var iconBox = document.createElement("div");
                var iconCssJson = { //设置图标按钮基础样式
                    "width": $(item).outerHeight(false) + "px",
                    "height": $(item).outerHeight(false) + "px",
                    "position": "absolute",
                    "right": "0px",
                    "top": "0px",
                    "fontSize": "14px",
                    "lineHeight": "30px",
                    "textAlign": "center",
                    "color": "white",
                    "transform": "rotate(0deg)"
                };
                var iconBoxClassName = this.iconBoxClassName;
                var iconBoxCssJson = this.iconBoxCssJson;
                $(iconBox).css(iconCssJson);
                this.setStyleByClassName(iconBox, iconBoxClassName);
                this.setStyleByCssJson(iconBox, iconBoxCssJson);
                $(itemBox).append(iconBox); //将按钮添加到数据容器中              
            }
        }
        //数据项点击、移入移出事件
        $(item).click(function (e) {
            //文本框内显示该项的文字和值
            $(relatedInput).val($(this).text());
            $(relatedInput).data("Id", $(this).data("Id"));
            console.log($(this).data("Id"));
            e.stopPropagation();
        }).hover(function () {
            $(this).css({
                "backgroundColor": "rgb(100, 100, 100)"
            });
        }, function () {
            $(this).css({
                "backgroundColor": "transparent"
            });
        });
        var DropDownList = this; //切换对象
        //展开按钮点击事件
        if (iconBox) {
            var val = true; //设置一个bool值，用于切换图标旋转方向
            $(iconBox).click(function (e) {
                var pm = val ? "+" : "-";
                $(this).animate({
                    "-webkit-transform": "rotate(" + pm + "90deg)"
                }, 200); //点击图标旋转
                val = !val; //bool值反转
                var childList = $(item).data("childList");
                if (childList) { //判断子项列表是否已经创建出来
                    $(childList).slideToggle(200); //子项列表下拉显示
                } else {
                    var childJsonList = DropDownList.getChildJsonList(value); //获取当前项的的子项数据列表
                    var childItemList = DropDownList.createItemPanel(childJsonList, 1); //创建子项列表
                    $(itemBox).append(childItemList); //将子项列表添加到该项内
                    $(childItemList).css({
                        "paddingLeft": "10px",
                        "width": $(itemBox).width() - 10 + "px",
                        "display": "none"
                    }); //子项列表初始化隐藏
                    $(childItemList).children().css({
                        "width": $(itemBox).width() - 10 + "px"
                    }); //子项列表中数据容器初始化样式
                    $(childItemList).children().eq(0).css({
                        "width": $(itemBox).width() - 10 + "px",
                        "whiteSpace": "nowrap"
                    }); //子项列表中数据容器中数据项的初始化样式
                    $(childItemList).slideDown(200); //子项列表下拉显示
                    $(item).data("childList", childItemList) //将子项列表存起来
                }
                e.stopPropagation(); //阻止事件冒泡
            })
        }
        return itemBox;
    }
    //基于itemType创建数据面板 itemType值分为, 1:创建普通数据面板 2:创建搜索数据面板
    DropDownList.prototype.createItemPanel = function (jsonList, itemType) {
        var ItemPanel = document.createElement("div");
        for (var i = 0; i < jsonList.length; i++) {
            var text = jsonList[i]["Name"];
            var value = jsonList[i]["Id"];
            var parentId = jsonList[i]["ParentId"];
            var itemJsonParams = {
                itemType: itemType,
                text: text,
                value: value,
                parentId: parentId
            }
            if (itemType == 1) { //创建普通数据面板时，判断该项是否还有子项 
                var hasChild = jsonList[i]["HasChild"] ? jsonList[i]["HasChild"] : false; //如果该项有子项，则不变；如果没有子项，则添加一个hasChild属性，值为false;
                itemJsonParams["hasChild"] = hasChild;
            }
            var itemBox = this.createItemBox(itemJsonParams); //创建数据容器
            $(ItemPanel).append(itemBox); //将一个个数据容器放入数据面板中
        }
        return ItemPanel;
    }
    //创建数据面板
    DropDownList.prototype.createDataPanel = function () {
        var dataPanel = this.dataPanel;
        var parentJsonList = this.parentJsonList;
        var dataPanelClassName = this.dataPanelClassName;
        var dataPanelCssJson = this.dataPanelCssJson;
        var height = this.height;
        var cssJson = {
            "overflow-y": "auto",
            "overflow-x": "hidden",
            "height": height - $(this.searchBox).height() + "px"
        }
        $(dataPanel).css(cssJson);
        this.setStyleByClassName(dataPanel, dataPanelClassName); //加载由类名添加的css样式
        this.setStyleByCssJson(dataPanel, dataPanelCssJson); //加载由类名添加的css样式
        var itemBox = this.createItemPanel(parentJsonList, 1);
        $(dataPanel).append(itemBox);
    }
}
//创建搜索面板
{
    //创建搜索框
    DropDownList.prototype.createSearchBox = function () {
        var width = this.width;
        var searchBox = this.searchBox;
        var searchBoxClassName = this.searchBoxClassName;
        var searchBoxCssJson = this.searchBoxCssJson;
        var cssJson = { //加载搜索框基础css样式
            "width": width - 10 + "px",
            "height": "27px",
            "padding": "0 0 0 24px",
            "backgroundColor": "rgb(100,100,100)",
            "color": "white",
            "border": "none",
            "boxSizing": "border-box"
        };
        $(searchBox).css(cssJson).val("搜索");
        this.setStyleByClassName(searchBox, searchBoxClassName); //加载由类名添加的css样式
        this.setStyleByCssJson(searchBox, searchBoxCssJson); //加载由类名添加的css样式    
    }
    //创建搜索框中的清空按钮
    DropDownList.prototype.createClearBox = function () {
        var clearBox = this.clearBox;
        var clearBoxClassName = this.clearBoxClassName;
        var clearBoxCssJson = this.clearBoxCssJson;
        var cssJson = { //加载搜索框基础css样式
            "float": "right",
            "width": "27px",
            "height": "27px",
            "fontSize": "14px",
            "textAlign": "center",
            "lineHeight": "27px",
            "color": "white",
            "position": "absolute",
            "top": "5px",
            "right": "5px",
            "display": "none"
        };
        $(clearBox).css(cssJson);
        this.setStyleByClassName(clearBox, clearBoxClassName); //加载由类名添加的css样式
        this.setStyleByCssJson(clearBox, clearBoxCssJson); //加载由类名添加的css样式  
    }
    //创建搜索面板
    DropDownList.prototype.createSearchPanel = function () {
        var box = this.box;
        var dataPanel = this.dataPanel;
        var searchPanel = this.searchPanel;
        var searchBox = this.searchBox;
        var clearBox = this.clearBox;
        var searchPanelClassName = this.searchPanelClassName;
        var searchPanelCssJson = this.searchPanelCssJson;
        var resultPanel = document.createElement("div"); //创建搜索结果面板
        var SPcssJson = { //加载搜索面板基础css样式
            "padding": "5px",
            "position": "relative"
        };
        var RPcssJson = { //加载搜索结果面板基础css样式
            "width": $(searchBox).outerWidth(true) + "px",
            "position": "absolute",
            "top": "32px",
            "left": "5px",
            "background": "rgb(70,70,70)",
            "display": "none"
        };
        $(searchPanel).css(SPcssJson);
        $(resultPanel).css(RPcssJson);
        this.setStyleByClassName(searchPanel, searchPanelClassName); //加载由类名添加的css样式
        this.setStyleByCssJson(searchPanel, searchPanelCssJson); //加载由类名添加的css样式   
        $(searchPanel).append(searchBox).append(clearBox); //将搜索框及清空按钮添加到搜索面板中
        //添加输入框事件
        var DropDownList = this; //切换对象
        $(searchBox).click(function (e) { //输入框获取焦点时的事件
            if ($(this).val() == "搜索") {
                $(this).val("");
                e.stopPropagation();
            }
        }).on("input", function () { //输入框内容发生变化时的事件
            $(resultPanel).empty(); //每次搜索前，清空搜索结果面板中的上次搜索内容
            var text = $.trim($(searchBox).val());
            if (text.length > 0) {
                $(clearBox).fadeIn();
                var searchJsonList = DropDownList.getSearchJsonList(text); //获取搜索结果数据列表
                if (searchJsonList.length > 0) { //判断是否有数据
                    var itemPanel = DropDownList.createItemPanel(searchJsonList, 2);
                    $(resultPanel).append(itemPanel); //将数据面板添加到搜索结果面板中
                    if ($(resultPanel).outerHeight() > $(dataPanel).outerHeight()) { //判断搜索数据列表面板高度是否超出数据面板高度
                        $(resultPanel).css({
                            "height": $(dataPanel).outerHeight() + "px"
                        });
                    }
                }
                $(box).append(resultPanel); //搜索结果面板添加到box中
                $(resultPanel).slideDown(200);
                //搜索结果面板中的数据项的鼠标移入移出事件
                $(resultPanel).children().children().hover(function () {
                    $(this).css({
                        "background": "red"
                    });
                }, function () {
                    $(this).css({
                        "background": "transparent"
                    });
                })
            } else {
                $(clearBox).fadeOut();
                $(resultPanel).fadeOut();
            }
        }).blur(function () { //输入框失去焦点时的事件
            var text = $.trim($(searchBox).val());
            if (text.length == 0) {
                $(this).val("搜索");
            }
        });
        //清空按钮的点击事件
        $(clearBox).click(function (e) {
            $(searchBox).val("搜索");
            $(this).fadeOut();
            $(resultPanel).empty(); //清空搜索结果面板中的所有内容
            e.stopPropagation();
        });
    }
}
//创建整个下拉框容器
DropDownList.prototype.createBox = function () {
    var box = this.box;
    var boxClassName = this.boxClassName;
    var boxCssJson = this.boxCssJson;
    var cssJson = {
        "position": "relative",
        "backgroundColor": "rgba(0, 0, 0, 0.8)",
        "display": "none"
    }
    $(box).css(cssJson);
    this.setStyleByClassName(box, boxClassName); //加载由类名添加的css样式
    this.setStyleByCssJson(box, boxCssJson); //加载由类名添加的css样式

}
//创建下拉框组件
DropDownList.prototype.create = function () {
    var box = this.box;
    var searchPanel = this.searchPanel;
    var dataPanel = this.dataPanel;
    $(box).append(searchPanel).append(dataPanel);
}
//将下拉框组件添加到父容器中
DropDownList.prototype.appendToParentContainer = function () {
    var box = this.box;
    var x = this.x;
    var y = this.y;
    var parentContainer = this.parentContainer;
    $(parentContainer).append(box); //将按钮添加到父容器中
    $(box).css({
        "position": "absolute",
        "left": x + "px",
        "top": y + "px"
    });
}
//初始化加载下拉框组件
DropDownList.prototype.load = function () {
    //加载数据
    this.dataBind();
    this.getJsonList();
    this.getParentJsonList();
    //加载数据面板
    this.createDataPanel();
    //加载搜索面板
    this.createSearchBox();
    this.createClearBox();
    this.createSearchPanel();

    this.createBox();
    this.create();
    //方法执行顺序很重要，create方法要先于appendToParentContainer()方法执行。
    //此后，appendToParentContainer()方法里面的box对象才是整个组件对象而不是单个box对象  
    this.appendToParentContainer();
    //绑定外部input事件
    var relatedInput = this.relatedInput;
    var box = this.box;
    $(relatedInput).click(function (e) {
        $(box).slideToggle();
        e.stopPropagation();
    });    
    $(document).click(function () {
        $(box).slideUp();
    });
};
//创建垂直滚动条
DropDownList.prototype.createScrollBar = function (width,height,box,contentBox) {  
    var scrollBar = document.createElement("div");//创建滚动条
    var mask = document.createElement("div");//创建滚动条按钮
    var scrollBarCssJson = {
        "width":width+"px",
        "height":height+"px",
        "position":"absolute",
        "right":"0px",
        "top":"0px"
    };
    var maskCssJson = {
        "width":width+"px",
        "height":($(box).height()/$(contentBox).height())*height+"px",
        "backgroundColor":"red",
        "position":"absolute",
        "left":"0px",
        "top":"0px"
    };
    $(scrollBar).css(scrollBarCssJson);
    $(mask).css(maskCssJson);
    $(scrollBar).append(mask);
    //监听鼠标按下操作
    $(mask).mousedown(function (event) { 
        var e = event || window.event;
        var beginY = e.clientY - $(this).position().top;//获取移动前滚动条按钮的Y起始值
        $(document).mousemove(function (event) { 
            var e = event || window.event;
            var endY = e.clientY - beginY;//获取移动后滚动条按钮的Y终点值
            if (endY<0) {//判断是否移动超出了边界
                endY = 0;
            }else if(endY>$(scrollBar).height()-$(mask).height()){
                endY = $(scrollBar).height()-$(mask).height();
            }
            $(mask).css({"top":endY+"px"});//滚动条按钮移动的距离
            var contentEndY = ($(contentBox).height()-$(box).height())/($(box).height()-$(mask).height())*endY; 
            $(contentBox).css({"top":-contentEndY+"px"});//内容容器移动的距离
            return false;
        });
        $(document).mouseup(function () { 
            $(document).mousemove(null);
        });

    });
};
//通过className进行设置元素样式
DropDownList.prototype.setStyleByClassName = function (element, className) {
    if (className) {
        $(element).addClass(className);
    }
};
//通过cssJson进行设置元素样式
DropDownList.prototype.setStyleByCssJson = function (element, cssJson) {
    if (cssJson) {
        $(element).css(cssJson);
    }
};