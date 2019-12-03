//流程对象SzdwFlowList
/// <reference path="../jquery-1.11.1.js" />
/// <reference path="../EventUtil.js" />
/// <reference path="SzdwCommon.js" />

//jsonList格式：{"Id":2,"FlowTypeId":1,"SubmitterId":1,"Submitter":"监理部资料员,"ApproverId":2,"Approver":"监理部领导"}
//#region 流程对象SzdwFlowList
function SzdwFlowList(position, x, y, width, height) {
    //#region 一般设置
    this.position = position;
    this.x = x; //坐标x
    this.y = y; //坐标x
    this.width = width; //初始加载时宽度，加载后根据内容自动调整宽度
    this.height = height; //初始加载时高度，加载后根据内容自动调整高度
    this.minWidth = width; //最小宽度
    this.minHeight = 0; //最小高度
    this.maxWidth = 0; //最大宽度
    this.maxHeight = 400; //对象的最大高度：默认400；
    this.listStyle = 0; //0:默认：普通下拉列表；1：行列矩阵
    this.childListStyle = 0; //0:默认：普通下拉列表；1：行列矩阵;2:左列表(child)，右矩阵(grandchild)
    this.targetControl = null; //与之关联的目标控件
    this.visible = false;
    //#endregion 一般设置

    //#region Ajax访问文件和参数
    this.requestUrl = null; //请求文件（含路径）
    this.paramJson = null; //Json格式参数
    //#endregion Ajax访问文件和参数

    //#region 外框：对象容器
    this.panel = document.createElement("div"); //对象容器：根对象，控制对象的显示的坐标、宽高、显隐
    this.panel.style.overflow = "hidden"; //对象容器默认没有滚动条
    this.panel.style.display = "none"; //对象容器默认隐藏：由函数控制显隐
    this.panel.style.padding = "0"; //对象容器对象内留白
    this.panel.style.margin = "0"; //对象容器对象外留白
    $(this.panel).css({ "position": position, "left": x, "top": y }); //对象容器定位方式、坐标、宽高
    this.panelCssName = null; //对象容器css样式表名称
    this.panelCssJson = {"z-index":"100","text-align": "left", "font-size": "10pt", "font-family": "宋体", "border": "2px solid silver", "background-color": "White" }; //对象容器Json格式css数据
    $(document.body).append(this.panel);
    //#endregion 外框：对象容器

    //#region 数据容器面板
    this.dataPanel = document.createElement("div");//
    this.dataPanel.style.overflow = "auto";
    this.dataPanel.style.padding = "0";
    this.dataPanel.style.margin = "0";
    this.dataPanelWidth = 0;
    this.dataPanelHeight = 0;
    this.dataPanelCssName = null;
    this.dataPanelCssJson = null;
    this.dataPanelScrollTop = 0;
    this.panel.appendChild(this.dataPanel);
    //#endregion 数据容器面板

    //#region 字段和数据
    this.fieldId = "Id";
    this.fieldName = "Name";
    this.fieldParentId = "ParentId";
    this.jsonList = null;
    this.text = "";
    this.value = 0;
    //#endregion 字段和数据

    //#region 节点项item相关
    this.itemWidth = 60;
    this.itemHeight = 30;
    this.itemCssName = null;
    this.itemCssJson = {"position":"relqtive","float":"left","padding": "0px 5px 0px 5px", "cursor": "pointer", "background-color": "#F6F6F6","border":"1px solid transparent" };
    this.itemMouseOverCssJson = { "position": "relqtive", "float": "left", "padding": "0px 5px 0px 5px", "cursor": "pointer", "border": "1px solid brown" };
    this.itemSelectedCssJson = { "position": "relqtive", "float": "left", "padding": "0px 5px 0px 5px", "cursor": "pointer", "background-color": "#DDDDDD", "border": "1px solid brown" };
    this.itemOldBackColor = null;
    this.defaultItem = null;
    this.selectedItem=null;
    this.selectedItemBackColor = "#D0D0D0"; //;"#ff7e0c"
    this.selectedItemOldBackColor=null;

    this.itemMouseClick = null
    this.itemMouseDbClick = null;
    this.itemMouseOver = null;
    this.itemMouseOut = null;
    this.itemMouseOverBackColor = "#E0E0E0";

    //#endregion 节点项item相关

    //#region 新增节点项
    this.itemNew = null;
    this.itemNewWidth = 60;
    this.itemNewHeight = 30;
    this.itemNewCssName = null;
    this.itemNewCssJson = { "padding": "0px 5px 0px 5px", "cursor": "pointer", "background-color": "#F6F6F6" };
    this.itemNewMouseOverCssJson = { "padding": "0px 5px 0px 5px", "cursor": "pointer", "background-color": "#F6F6F6" };
    //#endregion 新增节点项

    //#region 加载动画
    this.loadingImgUrl = "../Image/loading.gif";
    this.loadingImg = this.CreateLoadingImg(this.loadingImgUrl);
    //#endregion 加载动画

    //#region 初始化函数
    this.fnInitial = null;
    //#endregion 初始化函数
}
//#endregion 对象SzdwFlowList

//#region 显示隐藏
//mode:0:淡入淡出，默认；1：滑动
SzdwFlowList.prototype.ShowToggle = function (mode, e) {
    //关闭其他控件
    if (!this.visible) {
        $(document).trigger("click");
    }

    //不同模式的显隐
    if (this.jsonData == null) {
        return false;
    } else {
        var panel = this.panel;
        var m = typeof (mode) == "undefined" ? 0 : mode;
        switch (m) {
            case 0:
                $(panel).fadeToggle(200);
                break;
            case 1:
                if (this.visible) {
                    $(panel).slideToggle(200);
                } else {
                    $(panel).fadeIn(200);
                }
                break;
        }

        //还原滚动位置
        this.SetDataPanelScroll();
    }
    this.visible = !this.visible;

    //取消事件冒泡
    e.stopPropagation();
}

//设置DataPanel滚动位置
SzdwFlowList.prototype.SetDataPanelScroll = function () {
    if (this.dataPanelScrollTop > 0) {
        $(this.dataPanel).scrollTop(this.dataPanelScrollTop);
    } else {
        var item = this.selectedItem;
        if (item) {
            var scrollTop = $(item).offset().top - $(this.panel).offset().top - 5;
            $(this.dataPanel).scrollTop(scrollTop);
        }
    }
}

//淡入显示
SzdwFlowList.prototype.Show = function () {
    $(this.panel).fadeIn(200);
    this.visible = true;
}

//淡出隐藏
SzdwFlowList.prototype.Hide = function () {
    $(this.panel).fadeOut(200);
    this.visible = false;
}

//目标控件的失焦事件
SzdwFlowList.prototype.Blur = function () {
    var t = this.targetControl;
    var p = this.panel;
    $(t).blur(function (e) {
        $(p).fadeOut(200);
        this.visible = false;
        e.stopPropagation();
    });

}
//#endregion 显示隐藏

//#region 数据绑定
SzdwFlowList.prototype.DataBind = function () {
    //异步加载数据
    this.ShowLoadingImg(this.x, this.y, this.width, this.height);
    var szdwFl = this;
    var url = this.requestUrl;
    var paramJson = this.paramJson;
    $.ajax({ url: url, type: "post", data: paramJson, dataType: "json",
        success: function (jsData) {
            if (!$.isEmptyObject(jsData)) {
                if (szdwFl.jsonData == null) {
                    szdwFl.GetJsonData(jsData);
                    szdwFl.Load();
                }
            }
        },
        complete: function () {
            szdwFl.HideLoadingImg();
        }
    });
}

//数据绑定
SzdwFlowList.prototype.Load = function () {
    //this.TargetControlStopPropagation();
    this.Show();
    //this.Blur();
    this.SetPanelStyle();
    this.CreateDropDownNestList();
    //        this.CreateDropDownList();
    this.GetWidthHeight();
    this.SetDataPanelStyle();
    this.ResetPosition();
    this.SetDefaultItem();

    //单击页面或其他控件时，隐藏控件
    var szdwFl = this;
    $(document).click(function () {
        $(szdwFl.panel).fadeOut(200);
        szdwFl.visible = false;
    });
}

//目标控件阻止事件冒泡
SzdwFlowList.prototype.Refresh = function () {
    var szdwFl = this;
    var url = this.requestUrl;
    var paramJson = this.paramJson;
    var dp = this.dataPanel;
    $.ajax({ url: url, type: "post", data: paramJson, dataType: "json",
        success: function (jsData) {
            if (!$.isEmptyObject(jsData)) {
                szdwFl.GetJsonData(jsData);
                $(dp).empty();
                szdwFl.CreateDropDownNestList();
                szdwFl.SetDefaultItem();
            }
        }
    });
}

//目标控件阻止事件冒泡
SzdwFlowList.prototype.TargetControlStopPropagation = function () {
    var tc = this.targetControl;
    var szdwFl = this;
    $(tc).click(function () {
        var e = event ? event : window.event;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }

        szdwFl.ShowToggle(1,e);
    });
}
//#endregion 数据绑定

//#region 获取数据
//获取控件的数据
SzdwFlowList.prototype.GetJsonList = function (jsonList) {
    this.jsonList = jsonList;

    //添加“全部”列表项
    var jsonItemAll = this.jsonItemAll;    
    if (jsonItemAll != null) {
        jsonItemAll[this.fieldId] = 0;
        jsonItemAll[this.fieldParentId] = -1;
        this.jsonList.unshift(jsonItemAll);
    }
}

//根据Text(fieldName的值）获取Value(fieldId的值)
SzdwFlowList.prototype.GetItemValueByText = function (text) {
    if (this.jsonData == null) {
        return -1;
    } else {
        var jsonList = this.jsonData;
        var fId = this.fieldId;
        var fName = this.fieldName;
        $.each(jsonList, function (item, index) {
            if (item[fName] == text) {
                return item[fId];
            }
        });
    }
}

//根据Value(fieldId的值)获取Text(fieldName的值）
SzdwFlowList.prototype.GetTextValueByValue = function (value) {
    if (this.jsonData == null) {
        return null;
    } else {
        var jsonList = this.jsonData;
        var fId = this.fieldId;
        var fName = this.fieldName;
        $.each(jsonList, function (item, index) {
            if (item[fId] == value) {
                return item[fName];
            }
        });
    }
}

//获取和设置默认选项
SzdwFlowList.prototype.SetDefaultItem = function () {
    var item = this.defaultItem;
    if (item != null) {
        this.itemOldBackColor = $(item).css("background-color");
        var scrollTop = $(item).offset().top - $(this.panel).offset().top - 5;        
        $(this.dataPanel).scrollTop(scrollTop);

        //设置选中项
        this.SetSelectedItem(item);
    }
}
//#endregion 获取数据

//创建行样式的项列表
SzdwFlowList.prototype.CreateFlowList = function (jsonList) {
    if (jsonList) {   
        for (var i = 0; i < jsonList.length; i++) {
            var jd = jsonList[i];
            var text = jd[this.fieldName];
            var value = jd[this.fieldId];
            var item = this.CreateItem(text, value);
            $(this.panel).append(item);
        }
    }
}

//#endregion 普通下拉列表

//#region 创建流程节点项
//创建下拉项
SzdwFlowList.prototype.CreateItem = function (text, value) {
    var szdwFl = this;

    //创建项
    var item = document.createElement("div");
    var w = this.itemWidth;
    var h = this.itemHeight;
    var cssName = this.itemCssName;
    var cssJson = this.itemCssJson;
    this.SetStyleByCssName(item, cssName)
    this.SetStyleByCssJson(item, cssJson)
    $(item).outerWidth(w);
    $(item).outerHeight(h);

    var itemPropJson = { "text": text, "value": value };
    $(item).prop("propJson", itemPropJson);
    $(item).text(text);

    //#region 鼠标悬停和离开事件
    var moCssJson = this.itemMouseOverCssJson;
    $(item).mouseover(function () {
        szdwFl.SetStyleByCssJson(this, moCssJson);
    }).mouseleave(function () {
        szdwFl.SetStyleByCssName(this, cssName);
        szdwFl.SetStyleByCssJson(this, cssJson);
    });
    //#endregion 鼠标悬停和离开事件

    //#region 单击事件
    $(item).click(function (e) {
        szdwFl.SetStyleByCssJson(this, szdwFl.itemSelectedCssJson);

        //设置选中样式
        /*
        if (szdwFl.selectedItem != null) {
            $(szdwFl.selectedItem).css("background-color", szdwFl.selectedItemOldBackColor);
            $(szdwFl.selectedItem).prop("Selected", "");
        }

        szdwFl.SetSelectedItem(this);*/
    });
    //#endregion 单击事件

    return item;
}

//获取载入数据后的尺寸
SzdwFlowList.prototype.SetSelectedItem = function (item) {
    this.selectedItemOldBackColor = this.itemOldBackColor;
    this.selectedItem = item;
    $(item).prop("Selected", "true");
    $(item).css("background-color", this.selectedItemBackColor);

    //设置控件和目标控件的当前值
    this.text = $(item).prop("propJson").text; //Same 
    this.value = $(item).prop("propJson").value; //Same 
    var tc = this.targetControl;
    if (tc != null) {
        $(tc).prop("propJson", $(item).prop("propJson")); //Same 
    }

    //记录滚动位置
    this.dataPanelScrollTop = $(this.dataPanel).scrollTop();

}

//#endregion 创建下拉项

//#region 新增流程节点按钮
//新增流程节点按钮
SzdwFlowList.prototype.CreateItemNew = function () {
    var szdwFl = this;

    //创建项
    var item = document.createElement("div");
    var w = this.itemNewWidth;
    var h = this.itemNewHeight;
    var cssName = this.itemNewCssName;
    var cssJson = this.itemNewCssJson;
    this.SetStyleByCssName(item, cssName)
    this.SetStyleByCssJson(item, cssJson)
    $(item).outerWidth(w);
    $(item).outerHeight(h);

    //#region 鼠标悬停和离开事件
    var moCssJson = this.itemNewMouseOverCssJson;
    $(item).mouseover(function () {
        szdwFl.SetStyleByCssJson(this, moCssJson);
    }).mouseleave(function () {
        szdwFl.SetStyleByCssName(this, cssName);
        szdwFl.SetStyleByCssJson(this, cssJson);
    });
    //#endregion 鼠标悬停和离开事件

    //#region 单击事件
    $(item).click(function (e) {

    });
    //#endregion 单击事件

    return item;
}
//#endregion 新增流程节点按钮

//#region 设置样式

//获取载入数据后的尺寸
SzdwFlowList.prototype.GetWidthHeight = function () {
    this.width = $(this.panel).outerWidth();
    this.height = $(this.panel).outerHeight();
}

//重设位置信息
SzdwFlowList.prototype.ResetPosition = function () {
    var panel = this.panel;
    var x = this.x;
    var y = this.y;
    var w = this.width;
    var h = this.height;
    var dw = $(document.body).width();
    var dh = $(document.body).height();
    var ow = dw - x - w - 1;
    var oh = dh - y - h;
    var newX = Math.max(0, x + ow);
    var newY = Math.max(0, y + oh);

    if (dw > 0 && ow < 0) {
        panel.style.left = parseInt(newX) + "px";
        this.x = newX;
    }

//    if (dh > 0 && oh < 0) {
//        panel.style.top = parseInt(newY) + "px";
//        this.y = newY;
//    }
}

//设置样式
SzdwFlowList.prototype.SetPanelStyle = function () {
    var t = this.targetControl;
    var panel = this.panel;
    if (this.panelCssName != null) { $(panel).addClass(this.panelCssName); }
    if (this.panelCssJson != null) { $(panel).css(this.panelCssJson); }

    var tbw = $(t).outerWidth() - $(t).innerWidth();
    var pbw = $(panel).outerWidth() - $(panel).innerWidth();
    var obw = tbw - pbw; ;

    if (this.minWidth > 0) $(panel).css("min-width", this.minWidth + obw);
    if (this.maxWidth > 0) $(panel).css("max-width", this.maxWidth);
    if (this.minHeight > 0) $(panel).css("min-height", this.minHeight);
    if (this.maxHeight > 0) $(panel).css("max-height", this.maxHeight);
}

//设置样式
SzdwFlowList.prototype.SetDataPanelStyle = function () {
    var t = this.targetControl;
    var panel = this.panel;
    var dataPanel = this.dataPanel;

    if (this.dataPanelCssName != null) { $(dataPanel).addClass(this.dataPanelCssName); }
    if (this.dataPanelCssJson != null) { $(dataPanel).css(this.dataPanelCssJson); }
    var w = $(panel).width();   

    if (this.minHeight > 0) $(dataPanel).css("min-height", this.minHeight);
    if (this.maxHeight > 0) $(dataPanel).css("max-height", $(panel).height() - $(this.searchPanel).outerHeight(true) - $(this.operationPanel).outerHeight(true));

    var srollBarWidth = dataPanel.scrollHeight > $(dataPanel).height() ? 19 : 0;

    $(dataPanel).outerWidth(w + srollBarWidth);
    this.width = $(panel).outerWidth();
}

//根据CssName设置Item样式
SzdwFlowList.prototype.SetStyleByCssName = function (element, cssName) {
    if (cssName != null) { $(element).addClass(cssName); }
}

//根据CssJson设置Item样式
SzdwFlowList.prototype.SetStyleByCssJson = function (element, cssJson) {
    if (cssJson != null) { $(element).css(cssJson); }
}
//#endregion 设置样式

//#region 设置数据加载动画
SzdwFlowList.prototype.CreateLoadingImg = function (imgGif) {
    var div = document.createElement("div");
    var img = document.createElement("img");
    $(img).css({ "height": "90%"});
    img.src = imgGif;

    $(div).css({ "position": "absolute", "background-color": "White", "display": "block", "text-align": "center", "border": "1px solid silver", "padding": "2px 0px 2px 0px" });
    $(div).append(img);
    return div;
}

SzdwFlowList.prototype.ShowLoadingImg = function (x, y, width, height) {
    var imgBox = this.loadingImg;
    imgBox.style.left = parseInt(x) + "px";
    imgBox.style.top = parseInt(y) + "px";   
    $(imgBox).width(width)
    $(imgBox).height(height);
    $(imgBox).appendTo($(document.body)).show();
}

SzdwFlowList.prototype.HideLoadingImg = function () {
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

    //创建目标控件框
    var box = document.createElement("div");
    $(box).css({ "position": "relative", "left": tx, "top": ty, "border": "1px solid silver" });
    $(box).width(tw);
    $(box).height(th);

    //创建目标控件图标
    var iw = th - 2 * bw;
    var ih = th;
    var ix = tw - iw;
    var iy = 0;
    var bgUrl = "url(" + iconUrl + ")";
    var icon = document.createElement("div");
    $(icon).css({ "position": "relative", "left": ix, "top": iy });
    $(icon).width(iw);
    $(icon).height(ih);
    $(icon).css({ "position": "relative", "cursor": "pointer", "background-image": bgUrl, "background-repeat": "no-repeat", "background-position": "center", "line-height": th + "px" });
    $(icon).appendTo(box);

    //重设目标控件
    var nw = tw - iw;
    var nh = th;
    var nx = 0;
    var ny = 0;
    $(t).css({ "cursor": "pointer", "left": nx, "top": ny, "border": "0px" });
    $(t).width(nw);
    $(t).appendTo(box);

    $(box).appendTo(tp);
}

function CreateDropDownListBackImage(targetControl,imgUrl) {
    var t = targetControl;
    if ($(t).val()) { $(t).val(""); }
    if ($(t).text()) { $(t).text(""); }

    //设置图片
    var pr = 20;
    $(t).outerWidth($(t).outerWidth() - pr);
    $(t).css({ "padding-right": pr});

    var bgImg = "url(" + imgUrl + ")";
    var bgRpt = "no-repeat";
    var tw = $(t).outerWidth();
    var bgPos = "98% 50%";
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
    $(p).css({ "position": "absolute", "left": x, "top": y, "cursor": "pointer", "background-color": "#FFFFFF", "border-left": "0px solid #CCCCCC"});
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
//paramJson:json格式参数:{relateControl:"",requestUrl:"",paramJson:"",fnInitial:""}
$.fn.extend({
    dropDownList: function (paramJson) {
        var c = this;

        //创建下拉框图标
        var iconUrl = "../SzdwControls/Image/triangle.png";
        CreateDropDownListIcon(c, iconUrl);

        //#region 目标控件单击事件
        $(c).click(function (e) {
            if (!c.szdwFl) {
                var position = "absolute";
                var cw = $(c).innerWidth();
                var ch = $(c).outerHeight();
                var x = $(c).offset().left;
                var y = $(c).offset().top + ch - 1;
                var width = cw;
                var height = 30;

                //创建实例
                c.szdwFl = new SzdwFlowList(position, x, y, width, height);
                c.szdwFl.targetControl = this

                //#region 传入参数
                if (paramJson) {
                    if (paramJson.requestUrl) {
                        c.szdwFl.requestUrl = paramJson.requestUrl;
                    }

                    if (paramJson.paramJson) {
                        c.szdwFl.paramJson = paramJson.paramJson;
                    }

                    if (paramJson.fnInitial) {
                        c.szdwFl.fnInitial = paramJson.fnInitial(c.szdwFl);
                    }
                }
                //#endregion 传入参数

                //异步加载数据                
                c.szdwFl.DataBind();

                //存储下拉款框对象到目标控件
                $(c).data("szdwFl", c.szdwFl);
            }

            c.szdwFl.ShowToggle(1, e);

        });
        //#endregion 目标控件单击事件
    }
});
//#endregion 扩展函数加载到目标对象