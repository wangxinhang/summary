/// <reference path="../Scripts/jquery-1.11.1.js" />
//引用颜色转换JS
document.write("<script language=javascript src='../SzdwControls/Drag.js'></script>");
document.write("<script language=javascript src='../Scripts/ColorConverter.js'></script>");
document.write("<script language=javascript src='../SzdwControls/SzdwPopupWindow.js'></script>");
document.write("<script language=javascript src='../SzdwControls/domCommon.js'></script>");
document.write("<script language=javascript src='../SzdwControls/SzdwInfoPanel.js'></script>");
var SzdwCommon = {
    //#region 获取URL中参数值（QueryString）
    getQueryString: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }
        return null;
    },
    //#endregion 获取URL中参数值（QueryString）

    //#region 获取Permission：json格式
    getPermission: function (jsonList) {
        var permission = { accessPermission: false, insertPermission: false, deletePermission: false, modifyPermission: false, exportPrintPermission: false };
        if (jsonList) {
            var len = jsonList.length;
            for (var i = 0; i < len; i++) {
                var jd = jsonList[i];
                switch (jd.OperationId) {
                    case 1:
                        permission.accessPermission = true;
                        break;
                    case 2:
                        permission.insertPermission = true;
                        break;
                    case 3:
                        permission.deletePermission = true;
                        break;
                    case 4:
                        permission.modifyPermission = true;
                        break;
                    case 5:
                        permission.exportPrintPermission = true;
                        break;
                }
            }
        }
        return permission;
    },
    //#endregion 获取Permission：json格式

    //#region 显示测试信息，替代alert，避免出现程序中断
    showTestInfo: function (text) {
        var ti = document.getElementById("ti");
        if (!ti) {
            var e = document.createElement("div");
            e.id = "ti";
            $(e).css({ "position": "absolute", "border": "0px", "left": 0, "top": 0, "height": 30, "line-height": "30px", "display": "block", "color": "white", "padding": "0px 5px 0px 5px" });
            $(document.body).append(e);
            //setOpacity(e, "Black", "0.6");
        	SzdwCommon.SetOpacity(e, "Black", "0.6");
        }
        $("#ti").text(text);
    },
    //#endregion 显示测试信息，替代alert，避免出现程序中断

    //#region 设置元素背景透明度

    getUrlParam: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }
        return null;
    },
    getJsonParm:function(){
        return $.parseJSON(SzdwCommon.getUrlParam("paramJson"));
    },
    //#endregion 设置元素背景透明度

    //#region 获取页面元素的最大z-index

    //#endregion 获取页面元素的最大z-index

    //#region 设置RDLC报表

    //设置RDLC报表
    setReport: function (reportPanel, container, showWaiting) {
        var p = reportPanel;
        if (p != null) {
            var c = container == null ? document.body : container;
            var h = $(c).height();

            //报表标签下报表框的样式
            if (h > 0) {
                $(p).height(h);
            }
            $(p).css({ "padding": 0, "overflow": "hidden" });

            //#region 设置加载动画
            var waitingDiv = $(p).find("div[id$='AsyncWait_Wait']");
            if (waitingDiv) {
                if (showWaiting) {
                    $(waitingDiv).css({ "border": "1px solid Silver" });
                    $(waitingDiv).find("span").css("font-size", "11pt");
                    $(waitingDiv).find("a").css("font-size", "11pt");
                }
                else {
                    $(waitingDiv).css({ "border": "0px", "background-color": "transparent" });
                    $(waitingDiv).find("table").hide();
                }
            }
            //#endregion 设置加载动画

            //#region 设置报表高度
            //获取报表外框、报表内容框
            var reportAreaDiv = $(p).find("div[id$='ReportArea']");
            var reportContentDiv = $(reportAreaDiv).parent();

            //获取工具条的高度  
            var fixedTable = $(p).find("[id$='fixedTable']")[0];
            var rows = fixedTable.rows;

            var toolBarHeight = 0;
            for (var i = 0; i < (rows.length - 1); i++) {
                if (rows[i].style.display != "none")
                    toolBarHeight += rows[i].offsetHeight;
            }
            $(reportContentDiv).outerHeight(h - toolBarHeight);
            //#endregion 设置报表高度
        }
    },
    //重设RDLC报表尺寸
    reSizeReport: function (reportPanel, container, height) {
        var p = reportPanel;
        var h = height;
        var c = container ? container : document.body;
        if (p != null) {
            //报表标签下报表框的样式
            if (h > 0) {
                $(p).height(h);
                $(c).height(h);
            }

            //#region 设置报表高度
            //获取报表外框、报表内容框
            var reportAreaDiv = $(p).find("div[id$='ReportArea']");
            var reportContentDiv = $(reportAreaDiv).parent();

            //获取工具条的高度  
            var fixedTable = $(p).find("[id$='fixedTable']")[0];
            var rows = fixedTable.rows;

            var toolBarHeight = 0;
            for (var i = 0; i < (rows.length - 1); i++) {
                if (rows[i].style.display != "none")
                    toolBarHeight += rows[i].offsetHeight;
            }
            $(reportContentDiv).outerHeight(h - toolBarHeight);
            //#endregion 设置报表高度
        }
    },
    //显示RDLC报表工具栏
    showReportExportBar: function (reportPanel, menuContrainer, image, text) {
        var rp = reportPanel;
        if (rp) {
            //获取报表单位控件  
            var reportAreaDiv = $(rp).find("div[id$='ReportArea']");
            var reportContentDiv = $(reportAreaDiv).parent();

            //#region 隐藏原有工具栏
            var bar = $(rp).find("[style*='toolbar']");
            if (bar) {
                $(bar).hide();
            }
            //#endregion 隐藏原有工具栏

            //#region 显示自定义导出 
            //鼠标进出时的透明度
            var opacity = 0.5;
            var overOpacity = 0.7;

            //#region 创建导出的菜单指示器
            //菜单外面的容器  
            var mc = menuContrainer ? menuContrainer : reportContentDiv;
            var width = 35;
            var height = 25;

            //创建按钮
            //按钮及菜单Box           
            //#region 菜单Box 
            $(mc).find("[id='menuBox']").remove();
            var m = document.createElement("div");
            m.id = "menuBox";
            $(m).appendTo(mc);
            //#endregion 菜单Box 

            //#region 指示器按钮
            var btn = document.createElement("div");
            var btnCssJson = { "position": "absolute", "display": "none", "left": 1, "top": 1, "height": height, "line-height": height + "px", "background-color": "black", "opacity": opacity,
                "text-align": "center", "color": "white", "font-family": "微软雅黑", "font-size": "10pt", "cursor": "pointer"
            };
            $(btn).css(btnCssJson);

            //按钮图标
            var img = image ? image : "/SzdwControls/image/export20w.png";
            if (img) {
                var btnImage = document.createElement("div");
                btnImage.id = "btnImage";
                var backImg = "url(" + img + ") no-repeat center";
                var imageCssJson = { "float": "left", "background": backImg, "border-left": "0px solid blue" };
                $(btnImage).css(imageCssJson).outerWidth(height).outerHeight(height);
                $(btn).append(btnImage);
            }

            //按钮文字
            var btnText = document.createElement("div");
            btnText.id = "btnText";
            var text = text ? text : "导出";
            var textCssJson = { "float": "left", "line-height": height + "px", "min-width": width, "text-align": "center", "padding": "0px 3px 0px 0px" };
            $(btnText).css(textCssJson).outerHeight(height).text(text);
            if (!img) { $(btnText).css({ "padding": "0px 3px 0px 3px" }); }
            $(btn).append(btnText).appendTo(m);
            //#endregion 指示器按钮

            //#endregion 创建导出的菜单指示器

            //#region 获取RDLC的导出菜单
            //var exportToExcel = $(rp).find("a[title='Excel']");
            var exportMenu = $(rp).find("div[id$='Menu']");
            var em = $(exportMenu).clone(true);
            var y = $(btn).outerHeight() + 1;
            var emCssJson = { "position": "absolute", "left": 1, "top": y, "background-color": "black", "opacity": overOpacity, "padding": "0px",
                "text-align": "center", "color": "white", "font-family": "微软雅黑", "font-size": "10pt", "cursor": "pointer", "border": 0
            }
            //#endregion 获取RDLC的导出菜单

            //#region 设置导出菜单项
            var menuItem = $(em).find("a");
            var menuItemCssJson = { "position": "relative", "color": "white", "background-color": "black", "margin": 0, "padding": "3px 0px 3px 0px" };
            $(menuItem).css(menuItemCssJson);
            $(menuItem).parent().css({ "padding": 0, "margin": 0, "border": 0 });
            $(menuItem).mouseover(function () {
                $(this).css({ "background-color": "#303030" });
            }).mouseleave(function () {
                $(this).css({ "background-color": "black" });
            }).removeAttr("onclick");

            //绑定click事件
            var msEm = $(exportMenu).find("a");
            $(menuItem).each(function (i, item) {
                $(item).click(function () {
                    $(msEm[i]).trigger("click");
                });
            });

            $(em).css(emCssJson).appendTo(m);

            //#endregion 设置导出菜单项

            //#endregion 显示自定义导出

            //#region 显隐菜单
            //显隐导出按钮
            $(mc).mouseover(function () {
                $(btn).fadeIn();
            }).mouseleave(function () {
                $(btn).fadeOut();
            });

            //显隐导出菜单 
            $(m).mouseover(function () {
                $(btn).css({ "opacity": overOpacity });
                $(em).css({ "opacity": overOpacity });
                $(em).outerWidth($(btn).outerWidth());
                $(em).slideDown();
            }).mouseleave(function () {
                $(btn).css({ "opacity": opacity });
                $(em).css({ "opacity": opacity });
                $(em).slideUp();
            });
            //#endregion 显隐菜单
        }
    },
    //获取RDLC报表导出菜单
    getReportExportMenu: function (reportPanel, targetControl, cssJson, menuItemCssJson, menuItemOverCssJson) {
        var rp = reportPanel;
        if (rp) {
            var t = targetControl;
            var tw = $(t).outerWidth();
            var th = $(t).outerHeight()
            var nc = $(t).parent();

            //#region 获取RDLC的导出菜单 
            var opacity = 0.5;
            var overOpacity = 0.7;
            var p = "relative";
            var x = $(t).offset().left;
            var y = $(t).offset().top + th;
            var w = $(t).outerWidth();
            var emBaseCssJson = { "position": p, "left": x, "top": y };
            var emCssJson = cssJson ? cssJson : { "background-color": "black", "opacity": overOpacity, "padding": "0px", "border": 0,
                "text-align": "center", "color": "white", "font-family": "微软雅黑", "font-size": "10pt", "cursor": "pointer", "z-index": 1
            }

            var exportMenu = $(rp).find("div[id$='Menu']")[0];
            var em = $(exportMenu).clone(true);
            var menuItem = $(em).find("a");
            var itemCssJson = menuItemCssJson ? menuItemCssJson : { "position": "relative", "color": "white", "background-color": "black", "margin": 0, "padding": "3px 0px 3px 0px" };
            var itemOverCssJson = menuItemOverCssJson ? menuItemOverCssJson : { "position": "relative", "color": "white", "background-color": "#303030", "margin": 0, "padding": "3px 0px 3px 0px" };
            $(menuItem).css(itemCssJson);
            $(menuItem).parent().css({ "padding": 0, "margin": 0, "border": 0 });
            $(menuItem).mouseover(function () {
                $(this).css(itemOverCssJson);
            }).mouseleave(function () {
                $(this).css(itemCssJson);
            }).removeAttr("onclick");

            //绑定click事件
            var msEm = $(exportMenu).find("a");
            $(menuItem).each(function (i, item) {
                $(item).click(function () {
                    $(msEm[i]).trigger("click");
                });
            });

            $(em).css(emCssJson).outerWidth(w).css(emBaseCssJson);

            return em;
            //#endregion 获取RDLC的导出菜单
        }
    },
    //隐藏RDLC报表自带工具栏
    hideReportToolBar: function (reportPanel) {
        var rp = reportPanel;
        if (rp) {
            //隐藏原有工具栏
            var bar = $(rp).find("[style*='toolbar']");
            if (bar) {
                $(bar).hide();
            }
        }
    },
    //#endregion 设置RDLC报表

    //#region 服务器端报表
    showReportingServicesExportBar: function (reportPanel) {
        var rp = reportPanel;
        if (rp) {
            //获取报表单位控件  
            var reportAreaDiv = $(rp).find("div[id$='ReportArea']");
            var reportContentDiv = $(reportAreaDiv).parent();

            //#region 隐藏原有工具栏
            var bar = $(rp).find("[style*='toolbar']");
            var exportMenu = $(rp).find("div[id$='Menu']");
            var menuItem = $(exportMenu).find("a");
            var len = menuItem.length;
            for (var i = 0; i < len; i++) {
                var txt = menuItem[i].innerHTML;
                var flag1 = txt.indexOf('Word');
                var flag2 = txt.indexOf('Excel');
                var flag3 = txt.indexOf('PDF');

                if (flag1 > -1 || flag2 > -1 || flag3 > -1) {
                    menuItem[i].style.display = "block";
                }
                else {
                    menuItem[i].style.display = "none";
                }
            }
            //if (bar) {
            //$(bar).hide();
            //}
            //#endregion 隐藏原有工具栏
        }
    },
    //#endregion
    //#region 重定位数据操作弹窗按钮面板
    rePositionButtonPanel: function (objPw,objBtnPanel) {
        var pw = objPw;
        if (pw) {
            var p = objBtnPanel;
            var ph = pw.pagePanelHeight;
            var h = $(p).outerHeight();
            var x = 0;
            var y = ph - h - 2;
            $(p).css({ "left": x, "top": y });
        }
    },
    //#endregion 重定位数据操作弹窗按钮面板

    //#region 重设数据操作弹窗操作面板尺寸
    reSizeOperatePanel: function (objPw, objOperatePanel, objBtnPanel) {
        var pw = objPw;
        if (pw) {
            var ph = pw.pagePanelHeight;
            var bph = $(objBtnPanel).outerHeight();
            var h = ph - bph;          
            $(objOperatePanel).outerHeight(h);
        }
    },
    //#endregion 重设数据操作弹窗操作面板尺寸

    //#region 操作信息显示面板
    //显示操作信息面板
    showOperateInfoPanel: function (objInfoPanel, fnCreateInfoPanel,infoText) {
        var p = objInfoPanel ? objInfoPanel : fnCreateInfoPanel();        
        if (p) {
            p.contentText = infoText;
            p.UpdateContent();
            p.FastShow();
        }
    },

    //隐藏操作信息面板
    hideOperateInfoPanel: function (objInfoPanel, infoText, fnCallBack) {
        var p = objInfoPanel;
        if (p) {
            p.contentText = infoText;
            p.fnHideCallBack = fnCallBack;
            p.UpdateContent();
            p.DelayFadeOut();
        }
    },

    //写入后刷新数据
    refreshDataAfterInsert: function (objGridView) {
        var szdwGv = objGridView;
        if (szdwGv) {
            var oldFnCallBack = szdwGv.fnDataBindCallBack;
            szdwGv.fnDataBindCallBack = function () { 
                var pb = szdwGv.pagination;
                if ((pb)&&(pb.pageNumber < pb.totalPageNumber)) {
                    $(pb.btnLast).trigger("click");
                }

                //var len = szdwGv.recordSetJson.length;
                //var row = len == 1 ? szdwGv.bodyRows[0] : szdwGv.bodyRows[len - 1];
                //szdwGv.SetSelectedRow(row);
                szdwGv.fnDataBindCallBack = oldFnCallBack;
            };
            szdwGv.DataBind();
        }
    },
    //#endregion 操作信息显示面板
    
    //#region 向上平滑滚动对象到容器的完全可视位置
    scrollToView: function (obj, namingContainer) {
        var g = obj;
        if (!$(g).is(":hidden")) {
            var nc = namingContainer;
            var nch = $(nc).innerHeight();
            var y = $(g).offset().top;
            var h = $(g).outerHeight();
            var oh = y + h - nch;
            if (oh > 0) {
                var st = $(nc).scrollTop() + oh;
                $(nc).animate({ scrollTop: st }, 300);
            }
        }
    },
    //#endregion 向上平滑滚动对象到容器的完全可视位置

    //#region 带显隐开关控件的分组标题点击事件
    infoGroupTitleClick:function (objSzdwOnOff, arrGroupValidators) {
        if (objSzdwOnOff.onOff) {
            //收起
            var isValid = SzdwCommon.getGroupValidation(arrGroupValidators);
            objSzdwOnOff.allowClickEvent = isValid;
            if (isValid) {
                objSzdwOnOff.Click();
            }
        } else {
            //展开
            objSzdwOnOff.Click();
        }
    },
    //#endregion 带显隐开关控件的分组标题点击事件

    //#region 录入或更新时的分组验证

    //重设组内验证器位置:arrGroupValidators为存储组内验证器对象的数组
    setGroupValidatorsPosition: function (arrGroupValidators) {       
        $.each(arrGroupValidators, function (i, item) {
                var t = item.targetControl;
                $(t).trigger("blur");
                var isValid = $(t).data("isValid");
                if (!isValid) {
                    item.SetPosition();
                    item.Show();
                }
            });
    },

    //获取组验证结果:arrGroupValidators为存储组内验证器对象的数组
    getGroupValidation: function (arrGroupValidators) {
    	var isValid = true;
        $.each(arrGroupValidators, function (i, item) {
        	var t = item.targetControl;
            $(t).trigger("blur");
            isValid = isValid && $(t).data("isValid");
         });

        return isValid;
    },
    hideWin:function(win){
        if (win) {
            win.Hide();
        }
    },
    //#endregion 录入或更新是的分组验证
    //打开弹窗并将弹窗赋给对象变量
    openPopupWindowAssignObj: function (objPw, pageUrl, paramJson, titleText, x, y, width, height, oJson) {
    var t = document.body;
    if (objPw == null || typeof (objPw) == "undefined") {
        objPw = new SzdwPopupWindow("absolute", x, y, width, height);
    }
    objPw.isRefresh = false;
    objPw.titleTextCssJson["padding-left"] = "10px";
    objPw.titleText = titleText;
    objPw.pageUrl = pageUrl;
    objPw.pageParamJson = paramJson;
    objPw.x = x;
    objPw.y = y;
    objPw.width = width;
    objPw.height = height;
    if (oJson == undefined) {
        oJson = {};
    }
    objPw.loadingImgUrl = oJson.loadingImgUrl == undefined ? "/SzdwControls/image/loading/loading16w.gif" : oJson.loadingImgUrl;
    objPw.movable = oJson.movable == undefined ? false : oJson.movable;
    objPw.hasMask = oJson.hasMask == undefined ? false : oJson.hasMask;
    objPw.backColor = oJson.backColor == undefined ? "Black" : oJson.backColor;
    objPw.backOpacity = oJson.backOpacity == undefined ? 0.8 : oJson.backOpacity;
    objPw.titleColor = oJson.titleColor == undefined ? "White" : oJson.titleColor;
    objPw.pagePanelBackColor = oJson.pagePanelBackColor == undefined ? "transparent" : oJson.pagePanelBackColor;
    objPw.borderWidth = oJson.borderWidth == undefined ? 0 : oJson.borderWidth;
    objPw.hasLoadingAnimation = oJson.hasLoadingAnimation == undefined ? true : oJson.hasLoadingAnimation;
    objPw.hasBtnMinimize = oJson.hasBtnMinimize == undefined ? false : oJson.hasBtnMinimize;;
    objPw.hasBtnWinsize = oJson.hasBtnWinsize == undefined ? false : oJson.hasBtnWinsize;
    if (oJson.fnCloseCallBack) { objPw.fnClose = oJson.fnCloseCallBack; }
    if (oJson.fnMinimizeCallBack) { objPw.fnMinimize = oJson.fnMinimizeCallBack; }
    if (oJson.fnWinsizeCallBack) { objPw.fnWinsize = oJson.fnWinsizeCallBack; }
    objPw.Load();
    objPw.targetControl = t;
    return objPw;
},
openExcelWindowAssignObj: function (objPw, pageUrl, paramJson, titleText, x, y, width, height, oJson) {
    var oJson0 = {
        backColor: "Black",
        backOpacity: 0.5,
        borderWidth: 8,
        movable:false,
        pagePanelBackColor: "White",
        hasLoadingAnimation: true,
        hasBtnMinimize: false,
        hasBtnWinsize: false
    }
    var oJson1 = $.extend({}, oJson0, oJson);
    return this.openPopupWindowAssignObj(objPw, pageUrl, paramJson, titleText, x, y, width, height, oJson1);
},
openExportWindowAssignObj: function (objPw, pageUrl, paramJson, titleText, x, y, width, height, oJson) {
    var oJson0 = {
        backColor: "Black",
        backOpacity: 0.5,
        borderWidth: 8,
        movable:true,
        pagePanelBackColor: "White",
        hasLoadingAnimation: true,
        hasBtnMinimize: true,
        hasBtnWinsize: true
    }
    var oJson1 = $.extend({}, oJson0, oJson);
    return this.openPopupWindowAssignObj(objPw, pageUrl, paramJson, titleText, x, y, width, height, oJson1);
},
openEditWindowAssignObj: function (objPw, pageUrl, paramJson, titleText, x, y, width, height, oJson) {
    var oJson0 = {
        backColor: "Black",
        backOpacity: 0.8,
        borderWidth: 0,
        movable:true,
        hasBtnMinimize: false,
        hasBtnWinsize: false
    }
    var oJson1 = $.extend({}, oJson0, oJson);
    return this.openPopupWindowAssignObj(objPw, pageUrl, paramJson, titleText, x, y, width, height, oJson1);
},
openTipsWindowAssignObj: function (objPw, pageUrl, paramJson, titleText, x, y, width, height, oJson) {
    var oJson0 = {
        backColor: "Black",
        backOpacity: 0.8,
        borderWidth: 2,
        hasBtnMinimize: false,
        hasBtnWinsize: false
    }
    var oJson1 = $.extend({}, oJson0, oJson);
    return this.openPopupWindowAssignObj(objPw, pageUrl, paramJson, titleText, x, y, width, height, oJson1);
},
openViewWindowAssignObj: function (objPw, pageUrl, paramJson, titleText, x, y, width, height, oJson) {
    var oJson0 = {
        backColor: "Black",
        backOpacity: 0.5,
        borderWidth: 8,
        hasBtnMinimize: true,
        hasBtnWinsize: true
    }
    var oJson1 = $.extend({}, oJson0, oJson);
    return this.openPopupWindowAssignObj(objPw, pageUrl, paramJson, titleText, x, y, width, height, oJson1);
},
//黑色背景弹窗
openPopupWindow: function (titleText, pageUrl, paramJson, x, y, width, height, oJson) {
    var t = document.body;
    var pw = t.popupWindow;
    if (pw == null || typeof (pw) == "undefined") {
        pw = new SzdwPopupWindow("absolute", x, y, width, height);
    }
    pw.titlePanelCssJson["padding-left"] = "10px";
    pw.titleText = titleText;
    pw.pageUrl = pageUrl;
    pw.pageParamJson = paramJson;
    pw.x = x;
    pw.y = y;
    pw.width = width;
    pw.height = height;
    pw.loadingImgUrl = "/SzdwControls/image/loading/loading16w.gif";
    if (oJson == undefined) {
        oJson = {};
    }
    pw.hasMask = oJson.hasMask == undefined ? false : oJson.hasMask;
    pw.backColor = oJson.backColor == undefined ? "Black" : oJson.backColor;
    pw.backOpacity = oJson.backOpacity == undefined ? 0.8 : oJson.backOpacity;
    pw.titleColor = oJson.titleColor == undefined ? "White" : oJson.titleColor;
    pw.pagePanelBackColor = oJson.pagePanelBackColor == undefined ? "transparent" : oJson.pagePanelBackColor;
    pw.borderWidth = oJson.borderWidth == undefined ? 0 : oJson.borderWidth;
    pw.hasLoadingAnimation = oJson.hasLoadingAnimation == undefined ? true : oJson.hasLoadingAnimation;
    pw.hasBtnMinimize = oJson.hasBtnMinimize == undefined ? false : oJson.hasBtnMinimize;;
    pw.hasBtnWinsize = oJson.hasBtnWinsize == undefined ? false : oJson.hasBtnWinsize;
    if (oJson.fnCloseCallBack) { pw.fnClose = oJson.fnCloseCallBack; }
    if (oJson.fnMinimizeCallBack) { pw.fnMinimize = oJson.fnMinimizeCallBack; }
    if (oJson.fnWinsizeCallBack) { pw.fnWinsize = oJson.fnWinsizeCallBack; }
    pw.Load();
    pw.targetControl = t;
    t.popupWindow = pw;
    return pw;
},
createOperateInfoPanel: function (paramJson) {
    if (!paramJson) var paramJson = {};
    var body = parent.document.body ? parent.document.body : document.body;
    var nc = paramJson.namingContainer == undefined ? body : paramJson.namingContainer;
    var t = paramJson.targetControl == undefined ? nc : paramJson.targetControl;
    var w = paramJson.width == undefined ? 130 : paramJson.width;
    var h = paramJson.height == undefined ? 36 : paramJson.height;
    var x = paramJson.x == undefined ? ($(t).width() - w) / 2 : paramJson.x;
    var y = paramJson.y == undefined ? ($(t).height() - h) / 2 : paramJson.y;

    var text = paramJson.text == undefined ? "" : paramJson.text;
    var img = paramJson.image == undefined ? null : paramJson.image;
    var color = paramJson.color == undefined ? "White" : paramJson.color;
    var backColor = paramJson.backColor == undefined ? "Black" : paramJson.backColor;
    var backOpacity = paramJson.backOpacity == undefined ? 0.8 : paramJson.backOpacity;
    var panelCssJson = paramJson.panelCssJson == undefined ? null : paramJson.panelCssJson;
    var contentCssJson = paramJson.contentCssJson == undefined ? null : paramJson.contentCssJson;
    var hideDelayTime = paramJson.hideDelayTime == undefined ? 800 : paramJson.hideDelayTime;
    var positionMode = paramJson.positionMode == undefined ? -1 : paramJson.positionMode;
    var showMode = paramJson.showMode == undefined ? 0 : paramJson.showMode;
    var themeColor = paramJson.themeColor == undefined ? "Orange" : paramJson.themeColor;
    var processingImg = paramJson.processingImg == undefined ? "/SzdwControls/image/loading/loadingdot.gif" : paramJson.processingImg;
    var fnHideCallBack = paramJson.fnHideCallBack == undefined ? null : paramJson.fnHideCallBack;

    //创建实例并配置
    var p = t.operateInfoPanel;
    if (p == null || typeof (p) == "undefined") {
        p = new SzdwInfoPanel("absolute", x, y, w, h);
        p.namingContainer = nc;
        p.targetControl = t;
        p.imageUrl = img;
        p.backColor = backColor;
        p.backOpacity = backOpacity;
        p.positionMode = positionMode;
        p.showMode = showMode;
        p.hideDelayTime = hideDelayTime;
        p.fnHideCallBack = fnHideCallBack;

        if (panelCssJson) p.panelCssJson = panelCssJson;
        if (processingImg) p.panelCssJson["background-image"] = "url(" + processingImg + ")";
        if (processingImg) p.panelCssJson["background-position"] = "bottom";
        if (processingImg) p.panelCssJson["background-repeat"] = "no-repeat";
        p.panelCssJson["border-left"] = "5px solid " + themeColor;
        p.panelCssJson["opacity"] = backOpacity;

        if (contentCssJson) p.contentCssJson = contentCssJson;
        p.contentCssJson["line-height"] = h + "px";
        p.contentCssJson["text-align"] = "center";

        p.Create();
    }

    p.contentText = text;
    p.UpdateContent();
    return p;
}
}