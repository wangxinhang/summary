//日期拾取器对象SzdwDatePicker
/// <reference path="domCommon.js" />
/// <reference path="../Scripts/jquery-1.11.1.js" />
//#region 日期拾取器对象SzdwDatePicker
function SzdwDatePicker(position, x, y, width, height) {
    //#region 一般设置
    this.namingContainer = document.body; //命名容器，即父容器
    this.targetControl = null; //目标控件：一般为日期输入框控件
    this.relateControl = null;//关联控件：一般为日期图片控件
    this.position = position ? position : "absolute";
    this.x = x ? x : 0;
    this.y = y ? y : 0;
    this.width = width ? width : 174;
    this.height = height ? height : 0;
    this.margin = 0;
    this.visible = false;//可见性
    this.arrWeek = new Array("日", "一", "二", "三", "四", "五", "六");
    this.date = new Date();
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth() + 1;
    this.allowDateWeekEndCssAdding = false;//是否允许叠加周末日期的样式
    this.hasValidator = false;//是否使用自带的验证器
    this.hasDateRangeButton = true;
    this.isRelateControlEvent = false;
    //#endregion 一般设置

    //#region 对象面板
    this.panel = document.createElement("div");
    this.panel.style.overflow = "hidden";
    this.panel.style.display = "none";
    this.panel.style.padding = "0";
    this.panel.style.margin = "0";
    this.panel.style.position = (position == null) ? "absolute" : position;    
    //this.panel.style.left = parseInt(x) + "px";
    //this.panel.style.top = parseInt(y) + "px";
    this.panelCssName = null; //"background-color": "#EEEEEE",
    this.panelCssJson = { "font-family": "微软雅黑", "font-size": "small", "border": "1px solid silver", "min-width": "100px", "background-color": "#FFFFFF" };
    //#endregion 对象面板

    //#region 年月面板
    this.yearMonthPanel = null;
    this.yearMonthPanelWidth = this.width;
    this.yearMonthPanelHeight = 24;
    this.yearMonthPanelCssName = null;
    this.yearMonthPanelCssJson = { "margin": this.margin };
    this.yearButton = null;
    this.monthButton = null;
    this.yearMonthButtonHeight = 24;
    this.yearMonthButtonJsonData = {
        "LastYear": { "Image": "../SzdwControls/image/datepicker/leftDoubleTriangle.png", "Title": "上年" },
        "ThisYear": { "Text":this.year+"年", "Title": "当前年度" },
        "NextYear": { "Image": "../SzdwControls/image/datepicker/rightDoubleTriangle.png", "Title": "下年" },
        "LastMonth": { "Image": "../SzdwControls/image/datepicker/leftTriangle.png", "Title": "上月" },
        "ThisMonth": { "Text": this.month + "月" },
        "NextMonth": { "Image": "../SzdwControls/image/datepicker/rightTriangle.png", "Title": "下月" }
    };

    //#region 年份列表
    this.yearListTable = null;
    this.yearListRowCount = 3;
    this.yearListColCount = 4;
    this.yearCellCssName = null;
    this.yearCellCssJson = { "text-align": "center", "cursor": "pointer", "background-color": "transparent", "color": "" };
    this.yearCellMouseOverCssJson = { "background-color": "#EEEEEE", "color": "#1B60C3" };
    this.yearCellSelected = null;
    this.yearCellSelectedCssName = null;
    this.yearCellSelectedCssJson = { "background-color": "#1B60C3", "color": "White" };
    this.yearJsonList = null;
    //#endregion 年份列表

    //#region 月份列表
    this.monthListTable = null;
    this.monthListRowCount = 3;
    this.monthListColCount = 4; 
    this.monthCellCssName = null;
    this.monthCellCssJson = { "text-align": "center", "cursor": "pointer", "background-color": "transparent", "color": "" };
    this.monthCellMouseOverCssJson = { "background-color": "#EEEEEE", "color": "#1B60C3" };
    this.monthCellSelected = null;
    this.monthCellSelectedCssName = null;
    this.monthCellSelectedCssJson = { "background-color": "#1B60C3", "color": "White" };
    this.monthJsonList = [
        { text: "1月", value: 1 }, { text: "2月", value: 2 }, { text: "3月", value: 3 }, { text: "4月", value: 4 },
        { text: "5月", value: 5 }, { text: "6月", value: 6 }, { text: "7月", value: 7 }, { text: "8月", value: 8 },
        { text: "9月", value: 9 }, { text: "10月", value: 10 }, { text: "11月", value: 11 }, { text: "12月", value: 12 }
     ];
    //#endregion 月份列表

    //#endregion 年月面板

    //#region 星期面板
    this.weekPanel = null;
    this.weekPanelWidth = this.width;
    this.weekPanelHeight = 24;
    this.weekPanelCssName = null; //"background-color": "#EEEEEE",
    this.weekPanelCssJson = { "background-color": "#DDDDDD", "margin": this.margin, "padding": "0px 2px 0px 2px"};
    this.weekCellCssJson = { "font-family": "微软雅黑", "font-size": "small", "width": 24, "text-align": "center","background-color": "transparent"};
    this.weekEndCssJson = { "color": "red" };
    //#endregion 星期面板

    //#region 日期面板
    this.datePanel = null;
    this.datePanelCssName = null; //"background-color": "#EEEEEE",
    this.datePanelCssJson = { "padding":2 };

    this.dateTable = null;
    this.dateRows = new Array();
    this.dateCellWidth = 24;
    this.dateCellHeight = 20;
    this.dateCellCssName = null;
    this.dateCellCssJson = { "font-family": "Times New Roman", "font-size": "small","text-align":"center","background-color": "transparent", "color": "" };
    this.dateCellMouseOverCssJson = { "background-color": "#DDDDDD", "color": "#1B60C3", "cursor": "pointer" };
    this.dateCellSelected = null;
    this.dateCellSelectedCssName = null;
    this.dateCellSelectedCssJson = { "background-color": "#1B60C3", "color": "White" };
    this.dateCellFnClick = null;
    //#endregion 日期面板

    //#region 通用面板
    this.generalPanel = null;
    this.generalPanelVisible = false;
    this.generalPanelWidth = this.width;
    this.generalPanelHeight = 0;
    this.generalPanelCssName = null; //"background-color": "#EEEEEE",
    this.generalPanelCssJson = { "position": "absolute","display":"none", "background-color": "White","border-top":"1px solid #EEEEEE", "margin": this.margin };
    //#endregion 通用面板

    //#region 功能按钮面板
    this.buttonPanel = null;    
    this.buttonPanelCssName = null; //"background-color": "#EEEEEE",
    this.buttonPanelCssJson = {"border-top": "1px solid #EEEEEE", "font-size": "9pt", "margin": "0px 0px 2px 0px", "padding": "1px 1px 1px 1px" };
    this.buttonJsonData = {
        "Shortcut": { "Text": "日期区间", "Title": "快速设置起始和结束日期" }, //"Image": "../SzdwControls/Image/leftDoubleTriangle.png",
        "Today": { "Text": "今天", "Title": "今天日期：" + new Date().format("yyyy年MM月dd日") }
    };
    //#endregion 功能按钮面板

    //#region 日期区间面板
    this.dateRangePanel = null;
    this.dateRangeTable = null;
    this.dateRangeVisible = false;
    this.beginDateControl = null;
    this.endDateControl = null;
    this.beginDate = null;
    this.endDate = null;
    this.dateRangeCellCssName = null;
    this.dateRangeCellCssJson = { "text-align": "center", "cursor": "pointer","background-color": "transparent", "color": "" };
    this.dateRangeCellMouseOverCssJson = { "background-color": "#EEEEEE", "color": "#1B60C3" };
    this.dateRangeCellSelected = null;
    this.dateRangeCellSelectedCssJson = { "background-color": "#1B60C3", "color": "White" }; //#1B60C3
    this.dateRangeCellFn = null;
    this.dateRangeJsonList = [
        { text: "当月", value: 0 }, { text: "当季", value: 1 }, { text: "当年", value: 2 }, { text: "上月", value: 3 },
        { text: "上季", value: 4 }, { text: "上年", value: 5 }, { text: "近两年", value: 6}, { text: "近三年", value: 7 },
        { text: "近五年", value: 8}
     ];
    //#endregion 日期区间面板

    //#region 按钮
    this.buttonCssName = null;
    this.buttonCssJson = { "background-color": "transparent", "color": "", "cursor": "pointer", "text-align": "center"};
    this.buttonOverCssName = null;
    this.buttonOverCssJson = { "background-color": "transparent", "color": "#1B60C3", "text-align": "center" };
    this.buttonHeight = 22;
    //#endregion 按钮

    //#region 错误面板
    this.erroPanel = null;
    this.erroPanelCssName = null;
    this.erroPanelCssJson = { "font-family": "微软雅黑", "font-size": "small", "padding": "5px", "background-color": "Orange", "max-width": "190px", "color": "White","cursor":"default" };
    this.erroText = "日期格式不正确。";
    //#endregion 错误面板

    //#region 关闭按钮
    this.btnClose = null;
    this.btnCloseWidth = 30;
    this.btnCloseHeight = 30;
    this.btnCloseImage = "../SzdwControls/image/datepicker/cross16.png";
    this.btnCloseMouseOverBackColor = "RGB(220,0,0)"; //"Red";
    this.btnCloseMouseLeaveBackColor = "transparent";
    //#endregion 关闭按钮

    //#region 初始化函数
    this.fnInitial = null; 
    //#endregion 初始化函数

}
//#endregion 对象SzdwDatePicker

//#region 载入
SzdwDatePicker.prototype.Load = function () {
    //载入父容器
    this.AppendToNamingContainer();

    //设置相关属性
    this.SetPanel();
    this.CreateYearMonthPanel();
    this.CreateWeekPanel();
    this.CreateDatePanel();
    this.CreateButtonPanel();

    //绑定目标控件失焦事件：验证日期
    this.TargetControlBlur();
}

//将SzdwDatePicker加入父容器
SzdwDatePicker.prototype.AppendToNamingContainer = function () {
    var p = this.panel;
    var nc = this.namingContainer;
    if (nc != null && $(p).parent().length == 0) {
        $(p).appendTo(nc);
    }
}

//目标控件失焦时进行日期检查
SzdwDatePicker.prototype.TargetControlBlur = function () {
    var t = this.targetControl;
    if (t) {
        var szdwDp = this;
        $(t).blur(function (e) {
            //日期格式验证
            var isValid = szdwDp.ValidateDate();
            if (!isValid) { 
                szdwDp.ShowErroPanel();               
                szdwDp.Hide();
                $(t).focus();
                return false;
            }
        });
    }
}   
//#endregion 载入

//#region 设置Panel
SzdwDatePicker.prototype.SetPanel = function () {
    var panel = this.panel;
    if (this.panelCssName != null) { this.SetStyleByCssName(panel, this.panelCssName); }
    if (this.panelCssJson != null) { this.SetStyleByCssJson(panel, this.panelCssJson); }

    this.SetPosition();
    var w = this.width;
    var h = this.height;
    if (w > 0) {
        $(panel).width(w);
    }

    if (h > 0) {
        $(panel).height(h);
    }

    //单击页面或其他控件时，隐藏控件
    var szdwDp = this;
    $(document).click(function () {
        $(panel).fadeOut(200);
        szdwDp.visible = false;
        szdwDp.HideGeneralPanel();

        if (szdwDp.erroPanel) {
            var isValid = szdwDp.ValidateDate();
            if (isValid) {
                szdwDp.HideErroPanel();
            }
        }
    });
}
//#endregion 设置Panel

//#region 定位
SzdwDatePicker.prototype.SetPosition = function () {
    var nc = this.namingContainer;
    var ncSl = $(nc).scrollLeft();
    var ncSt = $(nc).scrollTop();
    var t = this.targetControl;
    var th = $(t).outerHeight();
    this.x = $(t).offset().left;
    this.y = $(t).offset().top + th - 1;

    var x = this.x + ncSl;
    var y = this.y + ncSt;
    var p = this.position;
    $(this.panel).css({ "position": p, "left": x, "top": y });
}
//#endregion 定位

//#region 显示隐藏
SzdwDatePicker.prototype.ShowToggle = function (e) {
    //关闭其他控件
    if (!this.visible) {
        $(document).trigger("click");
    }

    //定位
    this.SetPosition();

    //日期格式验证
    var isValid = this.ValidateDate() || this.isRelateControlEvent;
    if (isValid) {
        //显示隐藏日期拾取器
        var panel = this.panel;
        this.SetCurrentDate();
        if (this.generalPanel) { $(this.generalPanel).hide(); }

        var szdwCtrl = this;
        $(panel).fadeToggle(200, null, function () { szdwCtrl.ScrollToView(); });
        this.visible = !this.visible;

        //关联控件单击时，隐藏错误信息
        if (this.isRelateControlEvent) {
            this.HideErroPanel();
        }
    } else {
        this.Hide();
        this.ShowErroPanel();
    }
    e.stopPropagation();
}

//显示SzdwDatePicker
SzdwDatePicker.prototype.Show = function (e) {
    if (!this.visible) {
        $(document).trigger("click");
    }

    //定位
    this.SetPosition();

    var szdwCtrl = this;
    $(this.panel).fadeIn(300, null, function () { szdwCtrl.ScrollToView(); });
    this.visible = true;
    e.stopPropagation();
}

//隐藏SzdwDatePicker
SzdwDatePicker.prototype.Hide = function () {
    $(this.panel).fadeOut();
    this.visible = false;
}

//滚动到完全可视位置
SzdwDatePicker.prototype.ScrollToView = function () {    
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

//#region 设置当前日期

//设置当前日期样式
SzdwDatePicker.prototype.SetCurrentDate = function () {
    if (!this.visible) {
        this.GetCurrentDate();
        this.UpdateDate();
        this.SetCurrentDateStyle();
    }
}

//获取当前日期
SzdwDatePicker.prototype.GetCurrentDate = function () {
    var t = this.targetControl;
    var val = $(t).val().replace("-", "/");
    
    //设置当前年月
    if (!val || $.trim(val).length == 0) {
        this.date = new Date();
    } else {
        this.date = new Date(val);
    }
    
    this.date = isNaN(this.date)? new Date() : this.date;

    this.year = this.date.getFullYear();
    this.month = this.date.getMonth() + 1;
}

//设置当前日期样式
SzdwDatePicker.prototype.SetCurrentDateStyle = function () {
    //恢复之前选中日期的样式
    this.SetSelectedDateCellStyle(false);

    //设置选中日期样式
    if (this.year == this.date.getFullYear() && this.month == this.date.getMonth() + 1) {
        this.dateCellSelected = this.GetDateCell(this.date);
        this.SetSelectedDateCellStyle(true);
    }
}

//获取日期单元格
SzdwDatePicker.prototype.GetDateCell = function (date) {
    var d = new Date(date);
    var dateNumber = d.getDate();
    var startDateNumber = this.GetStartDateNumber(0);
    var rowIndex = Math.floor((dateNumber - startDateNumber) / 7);
    var cellIndex = d.getDay();
    return this.dateRows[rowIndex].cells[cellIndex];
}
//#endregion 设置当前日期

//#region 错误信息面板
SzdwDatePicker.prototype.CreateErroPanel = function () {
    var e = document.createElement("div");
    var cssName = this.erroPanelCssName;
    var cssJson = this.erroPanelCssJson;
    if (cssName) { this.SetStyleByCssName(e, cssName); }
    if (cssJson) { this.SetStyleByCssJson(e, cssJson); }
    var p = this.position;
    var x = this.x;
    var y = this.y;
    var tw = $(this.targetControl).outerWidth();
    var iw = this.relateControl ? $(this.relateControl).outerWidth() : 0;
    var w = tw + iw;

    $(e).css({ "position": p, "display": "none", "left": x, "top": y }).outerWidth(w);
    var backColor = cssJson["background-color"];
    if (backColor) { domCommon.SetOpacity(e, backColor, 0.9);}

    //设置文字( 自动省略）
    e.style.textOverflow = "ellipsis";
    e.style.whiteSpace = "nowrap";
    e.style.overflow = "hidden";

    var text = this.erroText;
    e.title = text;
    $(e).text(text);

    this.erroPanel = e;
    var c = this.namingContainer;
    if (c) { $(c).append(e); }
    return e;
}

//显示错误信息面板
SzdwDatePicker.prototype.ShowErroPanel = function () {
    var e = this.erroPanel ? this.erroPanel : this.CreateErroPanel();
    $(e).fadeIn();
 }

 //显示错误信息面板
 SzdwDatePicker.prototype.HideErroPanel = function () {
     var e = this.erroPanel;
     if (e) {
         $(e).hide();
     }
 }

//日期格式验证
 SzdwDatePicker.prototype.ValidateDate = function () {
     if (this.hasValidator) {
         var t = this.targetControl;
         var date = $(t).val() || $(t).text();
         if (!date || $.trim(date).length == 0) {
             return true;
         } else {
             var dateformat = "yyyy-mm-dd";
             var separator = "-";
             return $.fn.dateValidate(date, dateformat, separator);
         }
     } else {
         return true;
     }
 }
//#endregion 错误信息面板

//#region 创建关闭按钮
SzdwDatePicker.prototype.CreateBtnClose = function () {
    var img = this.btnCloseImage;
    var overBc = this.btnCloseMouseOverBackColor;
    var leaveBc = this.btnCloseMouseLeaveBackColor;

    var e = document.createElement("div");
    e.style.position = "absolute";
    e.style.overflow = "hidden";
    e.style.cursor = "hand";

    $(e).css("background", "url(" + img + ") no-repeat center");
    e.onmouseover = function () { this.style.backgroundColor = overBc; };
    e.onmouseout = function () { this.style.backgroundColor = leaveBc; };

    var pw = this;
    e.onclick = function () { pw.Hide(); if (typeof (fnColse) == "function") fnColse(); };

    $(e).appendTo(this.panel);
    this.btnClose = e;
}

//设置关闭按钮
SzdwDatePicker.prototype.SetBtnClose = function () {
    var bw = this.borderWidth;
    var w = this.btnCloseWidth;
    var h = this.btnCloseHeight;
    var x = this.x + this.width;
    var y = this.y;

    var e = this.btnClose;
    $(e).css({ "position": "absolute", "left": x, "top": y, "width": w, "height": h });
}
//#endregion 创建关闭按钮

//#region 传递日期数据给目标控件
SzdwDatePicker.prototype.SetTargetControlValue = function () {
    var t = this.targetControl;
    if (t) {
        $(t).val(this.date).focus();
    }
}
//#endregion 传递日期数据给目标控件

//#region 创建年月选择面板
//创建年月选择面板
SzdwDatePicker.prototype.CreateYearMonthPanel = function () {
    var p = document.createElement("div");
    var h = this.yearMonthPanelHeight;
    var cssName = this.yearMonthPanelCssName;
    var cssJson = this.yearMonthPanelCssJson;
    $(p).outerWidth(this.yearMonthPanelWidth);
    if (cssName != null) { this.SetStyleByCssName(p, cssName); }
    if (cssJson != null) { this.SetStyleByCssJson(p, cssJson); }
    if (h && h > 0) {
        $(p).css({ "height": h, "line-height": h + "px" });
    }

    //年月前翻后翻按钮   
    var bh = h; //this.yearMonthButtonHeight;
    var bw = h;
    var btnJsonData = this.yearMonthButtonJsonData;
    var btnLastYear = this.CreateButton(btnJsonData.LastYear, bw, bh);
    var btnNextYear = this.CreateButton(btnJsonData.NextYear, bw, bh);
    var btnLastMonth = this.CreateButton(btnJsonData.LastMonth, bw, bh);
    var btnNextMonth = this.CreateButton(btnJsonData.NextMonth, bw, bh);

    var btnThisYear = this.CreateButton(btnJsonData.ThisYear, 0, bh);
    var btnThisMonth = this.CreateButton(btnJsonData.ThisMonth, 0, bh);
    this.yearButton = btnThisYear;
    this.monthButton = btnThisMonth;

    var ymBox = document.createElement("div");
    var ymw = $(p).innerWidth() - bw * 4;
    $(ymBox).css({ "position": "relative", "float": "left", "border-bottom": "0px solid red", "height": h, "line-height": h + "px", "text-align": "center" });
    $(ymBox).outerWidth(ymw);
    $(ymBox).append(btnThisYear).append(btnThisMonth);
    $(btnThisYear).css({ "margin-left": "4px" });

    //#region 年份月份前翻后翻事件
    var szdwDp = this;
    //年份前翻按钮单击事件
    $(btnLastYear).click(function (e) {
        if (szdwDp.generalPanelVisible) {
            szdwDp.HideGeneralPanel();
        }

        var year = szdwDp.year - 1;
        szdwDp.year = year;
        szdwDp.UpdateDate();
        szdwDp.SetCurrentDateStyle();
        e.stopPropagation();
    });

    //年份后翻按钮单击事件
    $(btnNextYear).click(function (e) {
        if (szdwDp.generalPanelVisible) {
            szdwDp.HideGeneralPanel();
        }

        var year = szdwDp.year + 1;
        szdwDp.year = year;
        szdwDp.UpdateDate();
        szdwDp.SetCurrentDateStyle();
        e.stopPropagation();
    });

    //月份前翻按钮单击事件
    $(btnLastMonth).click(function (e) {
        if (szdwDp.generalPanelVisible) {
            szdwDp.HideGeneralPanel();
        }

        var month = szdwDp.month == 1 ? 12 : szdwDp.month - 1;
        if (szdwDp.month == 1) {
            var year = szdwDp.year - 1;
            szdwDp.year = year;
        }

        szdwDp.month = month;
        szdwDp.UpdateDate();
        szdwDp.SetCurrentDateStyle();
        e.stopPropagation();
    });

    //月份后翻按钮单击事件
    $(btnNextMonth).click(function (e) {
        if (szdwDp.generalPanelVisible) {
            szdwDp.HideGeneralPanel();
        }

        var month = szdwDp.month == 12 ? 1 : szdwDp.month + 1;
        if (szdwDp.month == 12) {
            var year = szdwDp.year + 1;
            szdwDp.year = year;
        }

        szdwDp.month = month;
        szdwDp.UpdateDate();
        szdwDp.SetCurrentDateStyle();
        e.stopPropagation();
    });
    //#endregion 年份月份前翻后翻事件

    //#region 年份按钮单击事件
    $(btnThisYear).click(function (e) {
        szdwDp.ShowYearList();
        e.stopPropagation();
    });
    //#endregion 年份按钮单击事件

    //#region 月份按钮单击事件
    $(btnThisMonth).click(function (e) {
        szdwDp.ShowMonthList();
        e.stopPropagation();
    });
    //#endregion 月份按钮单击事件

    $(p).outerHeight(h);
    $(p).append(btnLastYear).append(btnLastMonth).append(ymBox).append(btnNextMonth).append(btnNextYear).appendTo(this.panel);

    this.yearMonthPanel = p;

}

//#region 创建年份列表
//创建年份列表
SzdwDatePicker.prototype.CreateYearListTable = function () {
    var rLen = this.yearListRowCount;
    var cLen = this.yearListColCount;
    var cellCssJson = this.yearCellCssJson;
    var tb = this.CreateTable(rLen, cLen, cellCssJson);
    var jsonList = this.GetYearJsonList(rLen,cLen);
    this.TableDataBind(tb, jsonList);
    this.yearListTable = tb;
    this.YearListCellAddEvent();
    return tb;
}

//获取年份列表
SzdwDatePicker.prototype.GetYearJsonList = function (rowCount, colCount) {
    var c = rowCount * colCount;
    var curYear = new Date().getFullYear();
    var beginYear = curYear - Math.ceil(c/ 2);
    var endYear = beginYear + c;
    var yl = new Array();
    for (var i = beginYear; i < endYear; i++) {
        var jd = { text: i , value: i };
        yl.push(jd);
    }

    return yl;
}

//显隐
SzdwDatePicker.prototype.ShowYearList = function () {    
    var gp = this.generalPanel ? this.generalPanel : this.CreateGeneralPanel();
    var tb = this.yearListTable ? this.yearListTable : this.CreateYearListTable();
    this.ShowGeneralPanelChild(gp, tb);
}

//单击事件
SzdwDatePicker.prototype.YearListCellAddEvent = function () {
    var szdwDp = this;
    var btnYear = this.yearButton;
    var cells = $(this.yearListTable).find("td");

    //#region 鼠标悬停和离开事件
    var cssName = this.yearCellCssName;
    var cssJson = this.yearCellCssJson;
    var moCssJson = this.yearCellMouseOverCssJson;
    $(cells).mouseover(function () {
        if ($(this).text().length > 0) {
            $(this).css(moCssJson);
        }
    }).mouseleave(function () {
        if ($(this).text().length > 0) {
            if (cssName) { szdwDp.SetStyleByCssName(this, cssName); }
            if (cssJson) { szdwDp.SetStyleByCssJson(this, cssJson); }
        }
    });
    //#endregion 鼠标悬停和离开事件

    //#region 单击事件
    //恢复之前选中日期的样式
    $(cells).click(function (e) {
        //重设选中年份为普通样式
        szdwDp.SetSelectedYearCellStyle(false);

        //存储当前选中年份单元格
        szdwDp.yearCellSelected = this;

        //设置当前选中年份的样式
        szdwDp.SetSelectedYearCellStyle(true);

        //传递年份给年份控件
        var text = $(this).text();
        $(btnYear).text(text);

        //更新
        szdwDp.year = $(this).data("value");
        szdwDp.UpdateDate();
        szdwDp.SetCurrentDateStyle();

        //关闭
        $(szdwDp.yearListTable).hide();
        szdwDp.ShowMonthList();
        //szdwDp.GeneralPanelSlideToggle();

        e.stopPropagation();
    });
    //#endregion 单击事件
}

//设置或恢复选中年份样式
SzdwDatePicker.prototype.SetSelectedYearCellStyle = function (isSelected) {
    var cellSelected = this.yearCellSelected;
    var cssName = isSelected ? this.yearCellSelectedCssName : this.yearCellCssName;
    var cssJson = isSelected ? this.yearCellSelectedCssJson : this.yearCellCssJson;
    if (cellSelected) {
        if (cssName) { this.SetStyleByCssName(cellSelected, cssName); }
        if (cssJson) { this.SetStyleByCssJson(cellSelected, cssJson); }
        $(cellSelected).data("Selected", isSelected);
    }
}

//#endregion 创建年份列表

//#region 创建月份列表
//创建月份列表
SzdwDatePicker.prototype.CreateMonthListTable = function () {
    var rLen = this.monthListRowCount;
    var cLen = this.monthListColCount;
    var cellCssJson = this.monthCellCssJson;
    var tb = this.CreateTable(rLen, cLen, cellCssJson);
    var jsonList = this.monthJsonList;
    this.TableDataBind(tb, jsonList);
    this.monthListTable = tb;
    this.MonthListCellAddEvent();
    return tb;
}

//显隐
SzdwDatePicker.prototype.ShowMonthList = function () {
    var gp = this.generalPanel ? this.generalPanel : this.CreateGeneralPanel();
    var tb = this.monthListTable ? this.monthListTable : this.CreateMonthListTable();
    this.ShowGeneralPanelChild(gp, tb);
}

//单击事件
SzdwDatePicker.prototype.MonthListCellAddEvent = function () {
    var szdwDp = this;
    var btnMonth = this.monthButton;
    var cells = $(this.monthListTable).find("td");

    //#region 鼠标悬停和离开事件
    var cssName = this.monthCellCssName;
    var cssJson = this.monthCellCssJson;
    var moCssJson = this.monthCellMouseOverCssJson;
    $(cells).mouseover(function () {
        if ($(this).text().length > 0) {
            $(this).css(moCssJson);
        }
    }).mouseleave(function () {
        if ($(this).text().length > 0) {
            if (cssName) { szdwDp.SetStyleByCssName(this, cssName); }
            if (cssJson) { szdwDp.SetStyleByCssJson(this, cssJson); }
        }
    });
    //#endregion 鼠标悬停和离开事件

    //#region 单击事件
    //恢复之前选中日期的样式
    $(cells).click(function (e) {
        //重设选中月份为普通样式
        szdwDp.SetSelectedYearCellStyle(false);

        //存储当前选中月份单元格
        szdwDp.yearCellSelected = this;

        //设置当前选中月份的样式
        szdwDp.SetSelectedYearCellStyle(true);

        //传递月份给月份控件
        var text = $(this).text();
        $(btnMonth).text(text);
        
        //关闭
        szdwDp.GeneralPanelSlideToggle();
        $(szdwDp.monthListTable).hide();

        //更新
        szdwDp.month = $(this).data("value");
        szdwDp.UpdateDate();
        szdwDp.SetCurrentDateStyle();

        e.stopPropagation();
    });
    //#endregion 单击事件
}

//设置或恢复选中年份样式
SzdwDatePicker.prototype.SetSelectedMonthCellStyle = function (isSelected) {
    var cellSelected = this.monthCellSelected;
    var cssName = isSelected ? this.monthCellSelectedCssName : this.monthCellCssName;
    var cssJson = isSelected ? this.monthCellSelectedCssJson : this.monthCellCssJson;
    if (cellSelected) {
        if (cssName) { this.SetStyleByCssName(cellSelected, cssName); }
        if (cssJson) { this.SetStyleByCssJson(cellSelected, cssJson); }
        $(cellSelected).data("Selected", isSelected);
    }
}

//#endregion 创建年份列表

//#endregion 创建年月选择面板

//#region 创建星期面板
//创建星期面板：日期标题即星期几
SzdwDatePicker.prototype.CreateWeekPanel = function () {
    //创建面板并设置样式
    var p = document.createElement("div");
    var w = this.weekPanelWidth;
    var h = this.weekPanelHeight;
    var cssName = this.weekPanelCssName;
    var cssJson = this.weekPanelCssJson;
    if (cssName != null) { this.SetStyleByCssName(p, cssName); }
    if (cssJson != null) { this.SetStyleByCssJson(p, cssJson); }    
    if (h > 0) {
        $(p).outerHeight(h);
    }

    //创建星期名称单元格
    var cellCssJson = this.weekCellCssJson;
    var arrWeek = this.arrWeek;
    var weekEndCssJson = this.weekEndCssJson;
    for (var i = 0; i < 7; i++) {
        var cell = document.createElement("div");
        if (cellCssJson != null) { this.SetStyleByCssJson(cell, cellCssJson); }
        $(cell).css({ "height": h, "line-height": h + "px", "float": "left" });
        if (i == 0 || i == 6) {
            if (weekEndCssJson) {
                $(cell).css(weekEndCssJson);
            }
        }
        $(cell).text(arrWeek[i]);
        $(p).append(cell);
    }

    this.weekPanel = p;
    $(p).appendTo(this.panel);
}
//#endregion 创建星期面板

//#region 创建日期面板

//创建日期面板
SzdwDatePicker.prototype.CreateDatePanel = function () {
    //创建面板并设置样式
    var p = document.createElement("div");
    var w = this.width;
    //var h = 120;
    var cssName = this.datePanelCssName;
    var cssJson = this.datePanelCssJson;
    if (cssName) { this.SetStyleByCssName(p, cssName); }
    if (cssJson) { this.SetStyleByCssJson(p, cssJson); }

    //创建日期行列
    var tb = document.createElement("table");
    $(tb).css({ "border-collapse": "collapse", "border-spacing": "0px", "margin": this.margin });
    var year = this.year;
    var month = this.month;
    var c = this.GetWeeks(year, month);
    for (var i = 0; i < c; i++) {
        var tr = this.CreateDateRow();
        $(tr).appendTo(tb);
        this.dateRows.push(tr);
    }

    this.DateDataBind();
    $(p).append(tb).appendTo(this.panel);
    this.dateTable = tb;
    this.datePanel = p;
}

//创建日期行
SzdwDatePicker.prototype.CreateDateRow = function () {
    var weekEndCssJson = this.weekEndCssJson;
    var tr = document.createElement("tr");
    for (var i = 0; i < 7; i++) {
        var td = this.CreateDateCell();
        //加载周末样式
        if (this.allowDateWeekEndCssAdding) {
            if (i == 0 || i == 6) {
                $(td).css(weekEndCssJson);
            }
        }
        $(td).appendTo(tr);
    }
    return tr;
}

//创建日期单元格
SzdwDatePicker.prototype.CreateDateCell = function () {
    var szdwDp = this;
    var td = document.createElement("td");
    var w = this.dateCellWidth;
    var h = this.dateCellHeight;
    var cssName = this.dateCellCssName;
    var cssJson = this.dateCellCssJson;
    if (cssName) { this.SetStyleByCssName(td, cssName); }
    if (cssJson) { this.SetStyleByCssJson(td, cssJson); }
    $(td).outerWidth(w);
    $(td).outerHeight(h);

    //#region 鼠标悬停和离开事件
    var moCssJson = this.dateCellMouseOverCssJson;
    $(td).mouseover(function () {
        if ($(this).text().length > 0 && !$(this).data("Selected")) {
            $(this).css(moCssJson);
        }

    }).mouseleave(function () {
        if ($(this).text().length > 0 && !$(this).data("Selected")) {
            if (cssName != null) { szdwDp.SetStyleByCssName(this, cssName); }
            if (cssJson != null) { szdwDp.SetStyleByCssJson(this, cssJson); }
        }
    });
    //#endregion 鼠标悬停和离开事件

    //#region 单击事件
    $(td).click(function (e) {
        //重设选中日期为普通样式
        szdwDp.SetSelectedDateCellStyle(false);

        //存储当前选中日期单元格
        szdwDp.dataCellSelected = this;

        //设置当前选中日期的样式
        szdwDp.SetSelectedDateCellStyle(true);

        //设置当前选中日期
        szdwDp.date = new Date(szdwDp.year + "/" + szdwDp.month + "/" + $(this).text()).format("yyyy-MM-dd");

        //传递日期给目标控件
        //szdwDp.SetTargetControlValue();
        var fnClick = szdwDp.dateCellFnClick;
        if (fnClick) {
        	if (fnClick(szdwDp)) {
        		//传递日期给目标控件
        		szdwDp.SetTargetControlValue();
        	}
        }
        else {
        	//传递日期给目标控件
        	szdwDp.SetTargetControlValue();
        }
        //if (szdwDp.dateCellFnClick) {
        //    szdwDp.dateCellFnClick();
        //}
    });
    //#endregion  单击事件
    
    return td;
}

//设置或恢复选中日期样式
SzdwDatePicker.prototype.SetSelectedDateCellStyle = function (isSelected) {
    var cellSelected = this.dateCellSelected;
    var cssName = isSelected ? this.dateCellSelectedCssName : this.dateCellCssName;
    var cssJson = isSelected ? this.dateCellSelectedCssJson : this.dateCellCssJson;
    if (cellSelected) {
        if (cssName) { this.SetStyleByCssName(cellSelected, cssName); }
        if (cssJson) { this.SetStyleByCssJson(cellSelected, cssJson); }
        $(cellSelected).data("Selected", isSelected);
    }
}

//绑定日期数据
SzdwDatePicker.prototype.DateDataBind = function () {
    var year = this.year;
    var month = this.month;
    var rows = this.dateRows;
    var rc = rows.length;
    var days = this.GetDays(year, month);
    for (var i = 0; i < rc; i++) {
        var dateNumber = this.GetStartDateNumber(i);
        for (var j = 0; j < 7; j++) {
            var cell = rows[i].cells[j];
            if (dateNumber > 0 && dateNumber <= days) {
                var cellDate = new Date(year + "/" + month + "/" + dateNumber);
                var day = cellDate.getDay();
                if (j == day) {
                    $(cell).text(dateNumber);
                }
            }
            dateNumber++;
        }
    }
}

//创建每周的第一个日期
SzdwDatePicker.prototype.GetStartDateNumber = function (rowIndex) {
    var startDay = new Date(this.year + "/" + this.month + "/1").getDay();
    var startDate = 1 - startDay;
    return startDate + rowIndex * 7;
}
//#endregion 创建日期面板

//#region 创建通用面板
//创建通用面板
SzdwDatePicker.prototype.CreateGeneralPanel = function () {
    //创建面板并设置样式
    var p = document.createElement("div");
    var cssName = this.generalPanelCssName;
    var cssJson = this.generalPanelCssJson;
    if (cssName) { this.SetStyleByCssName(p, cssName); }
    if (cssJson) { this.SetStyleByCssJson(p, cssJson); }
    this.generalPanel = p;
    this.SetGeneralPanel();
    $(p).appendTo(this.panel);
    return p;
}

//设置通用面板位置尺寸
SzdwDatePicker.prototype.SetGeneralPanel = function () {
    var p = this.generalPanel;
    var x = $(this.weekPanel).position().left;
    var y = $(this.weekPanel).position().top;
    var w = this.width;
    var h = $(this.weekPanel).outerHeight(true) + $(this.datePanel).outerHeight(true);
    if (w) { $(p).outerWidth(w); }
    if (h) { $(p).outerHeight(h); }
    $(p).css({ "left": x, "top": y });
    $(p).css({ "display": "none" });
}

//显隐通用面板
SzdwDatePicker.prototype.GeneralPanelSlideToggle = function () {
    var p = this.generalPanel ? this.generalPanel : this.CreateGeneralPanel();
    $(p).slideToggle(200);
    this.generalPanelVisible = !this.generalPanelVisible;
}
//隐藏通用面板
SzdwDatePicker.prototype.HideGeneralPanel = function () {
    var p = this.generalPanel;
    if (p) {
        $(p).fadeOut(200);
        this.generalPanelVisible = false;
    }
}
//显隐通用面板的子面板
SzdwDatePicker.prototype.ShowGeneralPanelChild = function (generalPanel, child) {
    var gp = generalPanel;
    var h = $(this.weekPanel).outerHeight(true) + $(this.datePanel).outerHeight(true);
    if (h) { $(gp).outerHeight(h); }

    var tb = child;
    this.ResizeTable(tb);
    var c = $(gp).children();
    var visible = $(tb).data("visible");
    if (this.generalPanelVisible) {
        if (visible) {
            this.GeneralPanelSlideToggle();
            $(tb).hide();
        } else {
            $(c).hide();
            $(c).data("visible", false);
            $(tb).fadeToggle(200);
            $(tb).appendTo(gp);
        }
    } else {
        $(c).hide();
        $(c).data("visible", false);
        $(tb).fadeToggle(200);
        $(tb).appendTo(gp);
        this.GeneralPanelSlideToggle();
    }
    $(tb).data("visible", !visible);
}
//#endregion 创建通用面板

//#region 日期区间
//创建日期区间
SzdwDatePicker.prototype.CreateDateRangeTable = function () {
    var rLen = 3;
    var cLen = 3;
    var cellCssJson = this.dateRangeCellCssJson;
    var tb = this.CreateTable(rLen, cLen, cellCssJson);
    var jsonList = this.dateRangeJsonList;
    this.TableDataBind(tb, jsonList);
    this.dateRangeTable = tb;
    this.DateRangCellAddEvent();
    return tb;
}

//显隐
SzdwDatePicker.prototype.ShowDateRange = function () {
    var gp = this.generalPanel ? this.generalPanel : this.CreateGeneralPanel();
    var tb = this.dateRangeTable ? this.dateRangeTable : this.CreateDateRangeTable();
    this.ShowGeneralPanelChild(gp,tb);
}

//单击事件
SzdwDatePicker.prototype.DateRangCellAddEvent = function () {
    var szdwDp = this;
    var bdc = this.beginDateControl;
    var edc = this.endDateControl;
    var cells = $(this.dateRangeTable).find("td");

    //#region 鼠标悬停和离开事件
    var cssName = this.dateRangeCellCssName;
    var cssJson = this.dateRangeCellCssJson;
    var moCssJson = this.dateRangeCellMouseOverCssJson;
    $(cells).mouseover(function () {
        if ($(this).text().length > 0) {
            $(this).css(moCssJson);
        }
    }).mouseleave(function () {
        if ($(this).text().length > 0) {
            if (cssName) { szdwDp.SetStyleByCssName(this, cssName); }
            if (cssJson) { szdwDp.SetStyleByCssJson(this, cssJson); }
        }
    });

    //&& !$(this).data("Selected")
    //#endregion 鼠标悬停和离开事件

    //#region 单击事件
    //恢复之前选中日期的样式
    $(cells).click(function (e) {
        //传递日期给目标控件
        var i = $(this).data("value");
        szdwDp.GetDateRange(i);
        $(bdc).val(new Date(szdwDp.beginDate).format("yyyy-MM-dd"));
        $(edc).val(new Date(szdwDp.endDate).format("yyyy-MM-dd"));
     
        //关闭
        szdwDp.GeneralPanelSlideToggle();
    });
    //#endregion 单击事件
}

//获取区间日期
SzdwDatePicker.prototype.GetDateRange= function (index) {
    var myDate = new Date();
    var curYear = myDate.getFullYear();
    var curMonth = myDate.getMonth() + 1;
    var curQuarter = myDate.getQuarter(curMonth);
    switch (index) {
        case 0: //当月
            this.beginDate = myDate.getMonthFirstDay(curYear, curMonth).toLocaleString();
            this.endDate = myDate.getMonthLastDay(curYear, curMonth).toLocaleString();
            break;
        case 1: //当季
            this.beginDate = myDate.getQuarterFirstDay(curYear, curQuarter);
            this.endDate = myDate.getQuarterLastDay(curYear, curQuarter);
            break;
        case 2: //当年
            this.beginDate = curYear + "/01/01";
            this.endDate = curYear + "/12/31";
            break;
        case 3: //上月
            this.beginDate = myDate.getMonthFirstDay(curYear, curMonth - 1);
            this.endDate = myDate.getMonthLastDay(curYear, curMonth - 1);
            break;
        case 4: //上季
            this.beginDate = myDate.getQuarterFirstDay(curYear, curQuarter - 1);
            this.endDate = myDate.getQuarterLastDay(curYear, curQuarter - 1);
            break;
        case 5: //上年
            this.beginDate = curYear - 1 + "/01/01";
            this.endDate = curYear - 1 + "/12/31";
            break;
        case 6: //近两年
            this.beginDate = curYear - 1 + "/01/01";
            this.endDate = curYear + "/12/31";
            break;
        case 7: //近三年
            this.beginDate = curYear - 2 + "/01/01";
            this.endDate = curYear  + "/12/31";
            break;
        case 8: //近五年
            this.beginDate = curYear - 4 + "/01/01";
            this.endDate = curYear  + "/12/31";
            break;
    }
}
//#endregion 日期区间

//#region 创建表
//创建表
SzdwDatePicker.prototype.CreateTable = function (rowLength, cellLength, cellCssJson) {
    var m = 2;
    var w = Math.floor(($(this.generalPanel).width() - m * 2) / cellLength);
    var h = Math.floor(($(this.generalPanel).height() - m * 2) / rowLength);
    var tb = document.createElement("table");
    $(tb).css({ "border-collapse": "collapse", "border-spacing": "0px", "margin": m });
    if (rowLength && cellLength) {
        for (var i = 0; i < rowLength; i++) {
            var row = document.createElement("tr");
            for (var j = 0; j < cellLength; j++) {
                var cell = document.createElement("td");
                if (cellCssJson) { $(cell).css(cellCssJson); }
                $(cell).outerWidth(w);
                $(cell).outerHeight(h);
                $(cell).appendTo(row);
            }
            $(row).appendTo(tb);
        }
    }
    return tb;
}

//
SzdwDatePicker.prototype.ResizeTable = function (tb) {
    var m = 2;
    var rowLength = tb.rows.length;
    var cellLength = tb.rows[0].cells.length;
    var w = Math.floor(($(this.generalPanel).width() - m * 2) / cellLength);
    var h = Math.floor(($(this.generalPanel).height() - m * 2) / rowLength);
    var cells = $(tb).find("td");
    $(cells).outerWidth(w);
    $(cells).outerHeight(h);

}

//绑定表数据
SzdwDatePicker.prototype.TableDataBind = function (table,jsonList) {
    if (!jsonList || !table) return false;
    var tb = table;
    var rows = tb.rows;
    var rLen = rows.length;
    var jLen = jsonList.length;
    for (var i = 0; i < rLen; i++) {
        var row = rows[i];
        var cells = row.cells;
        var cLen = cells.length;
        for (var j = 0; j < cLen; j++) {
            var cell = cells[j];
            var index = i * cLen + j;
            var text = jsonList[index].text;
            var value = jsonList[index].value;
            $(cell).text(text);
            $(cell).data("value", value);            
        }
    }
}
//#endregion 创建表

//#region 创建功能按钮面板
//创建日期标题即星期几
SzdwDatePicker.prototype.CreateButtonPanel = function () {
    var szdwDp = this;
    var p = document.createElement("div");
    var cssName = this.buttonPanelCssName;
    var cssJson = this.buttonPanelCssJson;
    if (cssName) { this.SetStyleByCssName(p, cssName); }
    if (cssJson) { this.SetStyleByCssJson(p, cssJson); }
    $(p).innerHeight(bh);

    var btnJsonData = this.buttonJsonData;
    var bh = this.buttonHeight;
    var mg = parseInt($(p).css("marginLeft")) + parseInt($(p).css("marginRight"));
    var pd = parseInt($(p).css("paddingLeft")) + parseInt($(p).css("paddingRight"));
    var bw = ($(this.panel).width() - mg - pd - 1) / 2;

    if (this.beginDateControl == null || this.beginDateControl == null) {
        this.hasDateRangeButton = false;
    }

    //#region 快捷区间按钮
    if (this.hasDateRangeButton) {
        var btnShortcut = this.CreateButton(btnJsonData.Shortcut, bw, bh);
        $(btnShortcut).click(function (e) {
            szdwDp.ShowDateRange();
            e.stopPropagation();
        });
        $(p).append(btnShortcut);
    }

    //#endregion 快捷区间按钮

    //#region 今天按钮
    var tdBw = this.hasDateRangeButton ? bw : bw * 2;
    var btnToday = this.CreateButton(btnJsonData.Today, tdBw, bh);
    $(btnToday).css({ "border-left": "1px solid #EEEEEE", "text-align": "center" });
    $(p).append(btnToday).appendTo(this.panel);
    if (!this.hasDateRangeButton) {
        $(btnToday).text($(btnToday).text() + "：" + new Date().format("yyyy年MM月dd日"));
    }

    //单击事件
    $(btnToday).click(function () {
        szdwDp.date = new Date().format("yyyy-MM-dd");
        szdwDp.SetTargetControlValue();
        szdwDp.HideGeneralPanel();
    });
    //#endregion 今天按钮

    $(p).appendTo(this.panel);
    this.buttonPanel = p;
}
//#endregion 创建功能按钮面板

//#region 创建按钮
//创建按钮：jsonData格式：{Image:"",Text:"",Title:""}
SzdwDatePicker.prototype.CreateButton = function (jsonData, width, height) {
    //按钮外框
    var btn = document.createElement("div");
    var cssName = this.buttonCssName;
    var cssJson = this.buttonCssJson;
    if (cssName) { this.SetStyleByCssName(btn, cssName); }
    if (cssJson) { this.SetStyleByCssJson(btn, cssJson); }
    $(btn).css({ "position": "relative", "float": "left" });

    if (width) {
        $(btn).outerWidth(width);
    }

    if (height) {
        $(btn).outerHeight(height);
        $(btn).css({ "line-height": height + "px" });
    }

    //按钮悬停提示文字
    var title = jsonData.Title;
    if (title) {
        btn.title = title;
    }

    //按钮图标
    var image = jsonData.Image;
    if (image) {       
        var btnImage = document.createElement("div");
        btnImage.id = "btnImage";
        var backImg = "url(" + image + ") no-repeat center";
        var imageCssJson = { "float": "left", "background": backImg, "border-left": "0px solid blue" };
        $(btnImage).css(imageCssJson).outerWidth(height).outerHeight(height);
        $(btn).append(btnImage);
    }

    //按钮文字
    var text = jsonData.Text;
    if (text) {
        var txt = document.createElement("div");
        $(txt).text(text);
        $(txt).css({ "float": "left" });
        $(txt).css({ "position": "relative", "padding": "0px", "text-align": "center", "width": "100%", "height": $(btn).height(), "line-height": $(btn).height() + "px" });
        $(btn).append(txt);
    }

    //鼠标悬停和离开事件
    var szdwDp = this;
    var btnCssName = this.buttonCssName;
    var btnCssJson = this.buttonCssJson;
    var moCssJson = this.buttonOverCssJson;
    $(btn).mouseover(function () {
        $(this).css(moCssJson);
    }).mouseleave(function () {
        if (btnCssName) { szdwDp.SetStyleByCssName(this, btnCssName); }
        if (btnCssJson) { szdwDp.SetStyleByCssJson(this, btnCssJson); }
    });

    return btn;
}
//#endregion 创建按钮

//#region 设置样式

//设置样式
//根据CssName设置样式
SzdwDatePicker.prototype.SetStyleByCssName = function (element, cssName) {
    if (cssName != null) { $(element).addClass(cssName); }
}

//根据CssJson设置样式
SzdwDatePicker.prototype.SetStyleByCssJson = function (element, cssJson) {
    if (cssJson != null) { $(element).css(cssJson); }
}
//#endregion 设置样式

//#region 获取日期数据
//获取某年月的天数
SzdwDatePicker.prototype.GetDays = function (year, month) {
    return new Date(year, month, 0).getDate();
}

//获取日期对应的星期
SzdwDatePicker.prototype.GetWeekDay = function (date) {  
    return this.arrWeek[date.getDay()];
}

//获取日期对应的星期
SzdwDatePicker.prototype.GetWeeks = function (year, month) {
    var totalDays = this.GetDays(year, month);
    var startDay = new Date(year + "/" + month + "/1").getDay();
    if (startDay == 0) {
        return Math.ceil(totalDays / 7);
    } else {
        var firstWeekDays = 7 - startDay;
        var restDays = totalDays - firstWeekDays;
        var count = Math.ceil(restDays / 7);
        return count + 1;
    }
}

//#endregion 获取日期数据

//#region 更新日期
//根据当前年月更新日期
SzdwDatePicker.prototype.UpdateDate = function () {
    var year = this.year;
    var month = this.month;

    //#region 同步年月按钮
    var yBtn = this.yearButton;
    var mBtn = this.monthButton;
    if (yBtn) { $(yBtn).text(year + "年"); }
    if (mBtn) { $(mBtn).text(month + "月"); }
    //#endregion 同步年月按钮

    //#region 更新日期列表
    var c = this.GetWeeks(year, month);
    var rows = this.dateRows;
    var rLen = rows.length;
    var diff = c - rLen;
    var tb = this.dateTable;
    $(rows).find("td").text("");

    //实际日期行数大于已有日期行数时，增加行
    if (diff > 0) {
        for (var i = 0; i < diff; i++) {
            var tr = this.CreateDateRow();
            $(tb).append(tr);
            this.dateRows.push(tr);
        }
    }

    //实际日期行数小于已有日期行数时，减少行
    if (diff < 0) {
        var d = Math.abs(diff);
        for (var i = rLen - 1; i >= c; i--) {
            tb.deleteRow(i);
            this.dateRows.pop(tr);
        }
    }

    //绑定日期数据
    this.DateDataBind();
    //#endregion 更新日期列表
}
//#endregion 更新

//#region JS日期增强
//获取月的第一天
Date.prototype.getMonthFirstDay =function (year, month) {
    return year + "/" + month + "/01";
}

//获取月的最后一天
Date.prototype.getMonthLastDay =function (year, month) {
    var day = new Date(year, month, 0);
    return year + "/" + month + "/" + day.getDate();
}

//获取季度
Date.prototype.getQuarter =function (month) {
    switch (month) {
        case 1:
        case 2:
        case 3:
            return 1;
            break;
        case 4:
        case 5:
        case 6:
            return 2;
            break;
        case 7:
        case 8:
        case 9:
            return 3;
            break;
        case 10:
        case 11:
        case 12:
            return 4;
            break;
    }
}

//获取季度的第一天
Date.prototype.getQuarterFirstDay = function(year, quarter) {
    switch (quarter) {
        case 1:
            return year + "/" + 01 + "/01";
            break;
        case 2:
            return year + "/" + 04 + "/01";
            break;
        case 3:
            return year + "/" + 07 + "/01";
            break;
        case 4:
            return year + "/" + 10 + "/01";
            break;
        case 0:
            return year - 1 + "/" + 10 + "/01";
            break;
    }
}

//获取季度的最后一天
Date.prototype.getQuarterLastDay = function (year, quarter) {
    switch (quarter) {
        case 1:
            var day = new Date(year, 3, 0);
            return year + "/03/" + day.getDate(); //获取第一季度最后一天日期
            break;
        case 2:
            var day = new Date(year, 6, 0);
            return year + "/06/" + day.getDate(); //获取第二季度最后一天日期   
            break;
        case 3:
            var day = new Date(year, 9, 0);
            return year + "/09/" + day.getDate(); //获取第三季度最后一天日期
            break;
        case 4:
            var day = new Date(year, 12, 0);
            return year + "/12/" + day.getDate(); //获取第四季度最后一天日期
            break;
        case 0:
            var day = new Date(year - 1, 12, 0);
            return year - 1 + "/12/" + day.getDate(); //获取第四季度最后一天日期
            break;
    }
}

//日期格式化
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//#endregion JS日期增强

//#region jQueryk函数扩展：日期格式验证
$.fn.extend({    
    dateValidate: function (date, dateformat, separator) {
        if (date == null || date == "")
            return false;
        var date_part_index = $.fn.datePartIndex(dateformat, separator);
        var date_array = date.split(separator);
        var yearstr = date_array[date_part_index.y];
        var monthstr = date_array[date_part_index.m];
        var daystr = date_array[date_part_index.d];
        if (isNaN(yearstr))
            return false;
        if (isNaN(monthstr))
            return false;
        if (isNaN(daystr))
            return false;
        var year = parseInt(yearstr);
        var month = parseInt(monthstr) - 1;
        var day = parseInt(daystr);
        var date = new Date(year, month, day);
        var y = date.getFullYear();
        var m = date.getMonth();
        var d = date.getDate();
        if (y != year || m != month || d != day) {
            return false;
        }
        return true;
    },
    datePartIndex: function (dateformat, separator) {
        var partIndex = {};
        var part_array = dateformat.split(separator);
        for (var i = 0; i < part_array.length; i++) {
            switch (part_array[i].toUpperCase()) {
                case "YYYY":
                    partIndex.y = i;
                    break;
                case "MM":
                    partIndex.m = i;
                    break;
                case "DD":
                    partIndex.d = i;
                    break;
            }
        }
        return partIndex;
    }
});

//#endregion jQueryk函数扩展：日期格式验证

//#region 扩展函数加载到目标对象
//paramJson:json格式参数:{namingContainer:"",beginDateControl:"",endDateControl:"",fnInitial:""}
$.fn.extend({
    datePicker: function (paramJson) {
        var c = this;

        //#region 目标控件单击事件
        $(c).click(function (e) {
            if (!c.szdwDp) {
                var ch = $(c).outerHeight();
                var position = "absolute";
                var x = $(c).offset().left;
                var y = $(c).offset().top + ch - 1;

                //创建实例
                c.szdwDp = new SzdwDatePicker(position, x, y);
                c.szdwDp.targetControl = c;

                //#region 传入参数
                if (paramJson) {
                    if (paramJson.namingContainer) {
                        c.szdwDp.namingContainer = paramJson.namingContainer;
                    }

                    if (paramJson.beginDateControl) {
                        c.szdwDp.beginDateControl = paramJson.beginDateControl;
                    }

                    if (paramJson.endDateControl) {
                        c.szdwDp.endDateControl = paramJson.endDateControl;
                    }

                    if (paramJson.relateControl) {
                        c.szdwDp.relateControl = paramJson.relateControl;
                    }

                    if (paramJson.fnInitial) {
                    	c.szdwDp.fnInitial = paramJson.fnInitial(c.szdwDp);
                    }

                    if (paramJson.dateCellFnClick) {
                    	c.szdwDp.dateCellFnClick = paramJson.dateCellFnClick;
                    }
                }
                //#endregion 传入参数

                //加载
                c.szdwDp.Load();
            }

            //显隐
            c.szdwDp.ShowToggle(e);
        });
        //#endregion 目标控件单击事件

        //#region 相关控件单击事件
        if (paramJson.relateControl) {
            $(paramJson.relateControl).click(function (e) {
                if (c.szdwDp) { c.szdwDp.isRelateControlEvent = true; }
                $(c).trigger("click");
                e.stopPropagation();
                if (c.szdwDp) { c.szdwDp.isRelateControlEvent = false; }
            });
        }
        //#endregion 相关控件单击事件
    }
});
//#endregion 扩展函数加载到目标对象