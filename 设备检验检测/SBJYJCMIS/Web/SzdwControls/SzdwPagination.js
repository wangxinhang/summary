//数据表分页对象SzdwPagination
/// <reference path="../jquery-1.11.1.js" />
/// <reference path="../EventUtil.js" />
//#region 分页对象SzdwPagination
function SzdwPagination(position, x, y, width, height) {
    //#region 通用
    this.position = position;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.namingContainer = null; //命名容器，即父容器
    this.targetControl = null; //与之关联的目标控件：一般为GridView等数据表控件
    this.visible = true;
    this.rowCount = 1;//行数：1;1行显示或2行显示；默认1；
    //#endregion 通用

    //#region 数据
    this.recordCount = 0;
    this.pageNumber = 1;
    this.pageSize = 15;
    this.totalPageNumber = 0;
    this.pageSizeArray = [10, 15, 20, 30, 50];
    //#endregion 数据

    //#region 外框
    this.panel = document.createElement("div");
    this.panel.style.overflow = "hidden";
    this.panel.style.display = "none";
    this.panel.style.padding = "0";
    this.panel.style.margin = "0";
    this.panel.style.position = (position == null) ? "absolute" : position;
    this.panel.style.left = parseInt(x) + "px";
    this.panel.style.top = parseInt(y) + "px";
    this.panelCssName = null; //"background-color": "#EEEEEE",
    this.panelCssJson = { "font-family": "微软雅黑", "font-size": "small", "border": "1px solid silver", "min-width": "550px", "background-color": "red", "padding": "10px" };
    //#endregion 外框

    //#region 相关对象
    this.ddlPageSize = null;
    this.txtPageNumber = null;
    this.totalPageNumberBox = null;
    this.btnFirst = null;
    this.btnPrev = null;
    this.btnNext = null;
    this.btnLast = null;
    this.recordRangeBar = null;
    //#endregion 相关对象

    //#region 相关对象样式
    this.separateLineCssName = null;
    this.separateLineCssJson = { "border-left": "1px solid silver", "height": 22, "margin": "0px 8px 0px 8px" };
    this.pageSizeDropDownListCssName = null;
    this.pageSizeDropDownListCssJson = { "border": "1px solid silver", "height": 22, "width": "45px","margin-right":"5px"};
    this.pageNumberTextBoxCssName = null;
    this.pageNumberTextBoxCssJson = { "border": "1px solid silver", "min-width": "30px", "width": "30px", "height": 18, "text-align": "center", "margin": "0px 2px 0px 2px" };
    this.pageTurningButtonCssName = null;
    this.pageTurningButtonCssJson = { "border": "1px solid silver", "height": 23, "min-width": "23px", "cursor": "pointer" };
    this.pageTurningButtonOverCssName = null;
    this.pageTurningButtonOverCssJson = { "background-color": "#DEDEDE", "color": "blue" };
    this.pageTurningButtonOutCssJson = { "background-color": "", "color": "" };
    this.separateLineColor = "silver";
    this.pageTurningButtonImage = {
        First: "../SzdwControls/image/pagination/first21B.png",
        Prev: "../SzdwControls/image/pagination/prev21B.png",
        Next: "../SzdwControls/image/pagination/next21B.png",
        Last: "../SzdwControls/image/pagination/last21B.png"
    };
    //this.pageTurningButtonImage = {
    //    First: "../SzdwControls/Image/leftDoubleTriangle.png", Prev: "../SzdwControls/Image/leftTriangle.png",
    //    Next: "../SzdwControls/Image/rightTriangle.png", Last: "../SzdwControls/Image/rightDoubleTriangle.png"
    //};
    //#endregion 相关对象样式

    //#region 初始化函数
    this.fnInitial = null; //
    //#endregion 初始化函数
}
//#endregion 对象SzdwPagination

//#region 载入
SzdwPagination.prototype.Load = function () {
    //载入父容器
    this.AppendToNamingContainer();

    //设置相关属性
    this.SetPanel();
    this.Show();

}

//将SzdwPagination加入父容器
SzdwPagination.prototype.AppendToNamingContainer = function () {
    var p = this.panel;
    var nc = this.namingContainer;
    if (nc != null && $(p).parent().length == 0) {
        $(p).appendTo(nc);
    }
}

//显示SzdwPagination
SzdwPagination.prototype.Show = function () {
    $(this.panel).fadeIn();
    this.visible = true;
}

//隐藏SzdwPagination
SzdwPagination.prototype.Hide = function () {
    $(this.panel).fadeOut();
    this.visible = false;
}
//#endregion 载入

//#region 创建各栏

//设置Panel
SzdwPagination.prototype.SetPanel = function () {
    this.rowCount = this.width > 560 ? this.rowCount : 2;
    var pb = this.CreatePageBar();

    var p = this.panel;
    $(p).append(pb);
    this.SetStyleByCssName(p, this.panelCssName); 
    this.SetStyleByCssJson(p, this.panelCssJson);

    var minHeight = this.rowCount == 1 ? 25 : 52;
    $(p).css({ "min-height": minHeight + "px", "padding": "3px 5px 1px 5px" }).outerWidth(this.width).outerHeight(this.height);
}

//创建分页栏：一行的样式
SzdwPagination.prototype.CreatePageBar = function () {
    var rowCount=this.rowCount;
    var w = this.width;
    var h = this.height / 2;
    h = h < 25 ? 25 : h;


    //#region 翻页和页码栏
    var pu = this.CreatePageUpBar();
    var sl1 = this.CreateSeparateLine();

    var bh = $(this.btnFirst).innerHeight();
    var pn = this.CreatePageGoingBar(bh);

    var sl2 = this.CreateSeparateLine();
    var pd = this.CreatePageDownBar();

    $(this.btnPrev).css({ "margin-left": "3px" });
    $(this.btnLast).css({ "margin-left": "3px" });

    var tr1 = document.createElement("div");
    $(tr1).append(pu).append(sl1).append(pn).append(sl2).append(pd).outerHeight(h);
    if (rowCount > 1) { $(tr1).css({ "margin": "0px 0px 3px 0px ", "border-bottom": "1px solid #E9E9E9" }); }
    $(tr1).children().css({ "float": "left" });

    //#endregion 翻页和页码栏

    //#region 页尺寸栏
    var psh = $(this.btnFirst).innerHeight();
    var ps = this.CreatePageSizeBar(psh);
    var sl3 = this.CreateSeparateLine();
    var tr2 = document.createElement("div");
    $(tr2).outerHeight(h).append(ps).append(sl3);
    $(tr2).children().css({ "float": "left" });
    //#endregion 页尺寸栏

    //#region 记录数栏
    var rh = $(this.btnFirst).innerHeight();
    var rr = this.CreateRecordRangeBar();
    var sl4 = this.CreateSeparateLine();

    var tr3 = document.createElement("div");
    $(tr3).outerHeight(h);
    if (rowCount > 1) {
        $(tr3).append(rr);
    } else {
        $(tr3).append(sl4).append(rr);
    }
    $(tr3).children().css({ "float": "left" });
    $(rr).css({ "line-height": rh + "px" });

    //#endregion 记录数栏

    //分页对象栏
    var bar = document.createElement("div");

    if (this.rowCount >1) {
        $(bar).append(tr1);
        $(bar).append(tr2).append(tr3);
        $(tr2).css({ "float": "left" });
        $(tr3).css({ "float": "left" });
    } else {
        $(bar).append(tr2).append(tr1).append(tr3).children().css({ "float": "left" });
    }

    return bar;
}

//创建分割线
SzdwPagination.prototype.CreateSeparateLine = function () {
    var sl = document.createElement("div");
    this.SetStyleByCssName(sl, this.separateLineCssName);
    this.SetStyleByCssJson(sl, this.separateLineCssJson); 

    return sl;
}

//创建向上翻页栏
SzdwPagination.prototype.CreatePageSizeBar = function (height) {
    var ddl = this.CreatePageSizeDropDownList();
    var t = document.createElement("div");
    $(t).css({ "line-height": height + "px" });
    t.innerText = "条/页";

    var bar = document.createElement("div");
    $(bar).append(ddl).append(t);
    $(bar).children().css("float", "left");
   
    return bar;
}

//创建每页数据条数下拉框
SzdwPagination.prototype.CreatePageSizeDropDownList = function () {
    var arrPS = this.pageSizeArray;
    var ddl = document.createElement("select");
    for (var i = 0; i < arrPS.length; i++) {
        ddl.options.add(new Option(arrPS[i]));
        if (arrPS[i] == this.pageSize) {
            ddl.selectedIndex = i;
        }
    }

    //绑定事件
    var p = this;
    $(ddl).change(function () {
        p.pageSize = this.options[this.selectedIndex].value;
        p.pageNumber = 1;
        $(p.totalPageNumberBox).text(p.GetTotalPageNumberInfo());
        p.Update();
    });

    this.SetStyleByCssName(ddl, this.pageSizeDropDownListCssName); 
    this.SetStyleByCssJson(ddl, this.pageSizeDropDownListCssJson);

    this.ddlPageSize = ddl;
    return ddl;
}

//创建向上翻页栏
SzdwPagination.prototype.CreatePageUpBar = function () {
    var ptImage = this.pageTurningButtonImage;

    //创建“首页”按钮
    var btnFirst = this.CreatePageTurningButton();
    var imgFir = ptImage.First;
    if (imgFir) {
        var backImgFir = "url(" + imgFir + ") no-repeat center";
        $(btnFirst).css({ "background": backImgFir });
        btnFirst.title = "首页";
    } else {
        btnFirst.value = "首页";
        $(btnFirst).css({ "padding": "0px 5px 0px 5px" });
    }

    $(btnFirst).data("mode", 0);
    this.btnFirst = btnFirst;

    //创建“上页”按钮
    var btnPrev = this.CreatePageTurningButton();
    var imgPrev = ptImage.Prev;
    if (imgPrev) {
        var backImgPrev = "url(" + imgPrev + ") no-repeat center";
        $(btnPrev).css({ "background": backImgPrev });
        btnPrev.title = "上页";
    } else {
        btnPrev.value = "上页";
        $(btnPrev).css({ "padding": "0px 5px 0px 5px" });
    }
    $(btnPrev).data("mode", 1);
    this.btnPrev = btnPrev;

    //创建向上翻页组
    var bar = document.createElement("div");
    $(bar).append(btnFirst).append(btnPrev);
    $(bar).children().css("float", "left");

    return bar;
}

//创建向下翻页栏
SzdwPagination.prototype.CreatePageDownBar = function () {
    var ptImage = this.pageTurningButtonImage;

    //------------向下翻页-----------
    //创建“下页”按钮
    var btnNext = this.CreatePageTurningButton();
    var imgNext = ptImage.Next;
    if (imgNext) {
        var backImgNext = "url(" + imgNext + ") no-repeat center";
        $(btnNext).css({ "background": backImgNext });
        btnNext.title = "下页";
    } else {
        btnNext.value = "下页";
        $(btnNext).css({ "padding": "0px 5px 0px 5px" });
    }

    $(btnNext).data("mode", 2);
    this.btnNext = btnNext;

    //创建“末页”按钮
    var btnLast = this.CreatePageTurningButton();
    var imgLast = ptImage.Last;
    if (imgLast) {
        var backImgLast = "url(" + imgLast + ") no-repeat center";
        $(btnLast).css({ "background": backImgLast });
        btnLast.title = "末页";
    } else {
        btnLast.value = "末页";
        $(btnLast).css({ "padding": "0px 5px 0px 5px" });
    }

    $(btnLast).data("mode", 3);
    this.btnLast = btnLast;

    //创建向下翻页组
    var bar = document.createElement("div");
    $(bar).append(btnNext).append(btnLast);
    $(bar).children().css("float", "left");

    return bar;
}

//创建定位页码栏
SzdwPagination.prototype.CreatePageGoingBar = function (height) {    
    var di = document.createElement("div");
    $(di).css("line-height", height + "px");
    di.innerText = "第";

    var txtPN = this.CreatePageNumberTextBox();
    txtPN.value = this.pageNumber;    
    var top = (height - $(txtPN).outerHeight()) / 2;
    $(txtPN).css({ "position": "relative", "top": top + "px" });

    var tp = this.CreateTotalPageNumberBox();
    $(tp).css("line-height", height + "px");

    //创建定位页码组
    var bar = document.createElement("div");
    $(bar).append(di).append(txtPN).append(tp);
    $(bar).children().css("float", "left");

    return bar;
}

//创建当前页数据记录数范围信息栏
SzdwPagination.prototype.CreateRecordRangeBar = function () {
    var bar = document.createElement("div");
    $(bar).text(this.GetRecordRangeInfo());
    this.recordRangeBar = bar;
    return bar;
}

//创建当前页数据记录数范围信息栏
SzdwPagination.prototype.GetRecordRangeInfo = function () {
    var pn = this.pageNumber;
    var ps = this.pageSize;
    var total = this.recordCount;
    var min = ps * (pn - 1) + 1;
    var max = Math.min(ps * pn, total);

    return min + "~" + max + "条/共" + total + "条";
}

//创建Button按钮
SzdwPagination.prototype.CreatePageTurningButton = function () {
    var b = document.createElement("input");
    $(b).attr("type", "button");
    this.SetStyleByCssName(b, this.pageTurningButtonCssName);
    this.SetStyleByCssJson(b, this.pageTurningButtonCssJson);

    var cssName = this.pageTurningButtonCssName;
    var cssJson = this.pageTurningButtonCssJson;
    var overCssName = this.pageTurningButtonOverCssName;
    var overCssJson = this.pageTurningButtonOverCssJson;
    var outCssJson = this.pageTurningButtonOutCssJson;

    //绑定事件
    var p = this;
    $(b).mouseenter(function () {
        p.SetStyleByCssName(b, overCssName);
        p.SetStyleByCssJson(b, overCssJson); 
    }).mouseout(function () {
        p.SetStyleByCssJson(b, outCssJson); 
    }).click(function () {
        var mode = $(this).data("mode");
        var oldPN = p.pageNumber;
        if (oldPN == 1 && mode < 2) { alert("已经是第一页了。"); return false; }
        if (oldPN == p.totalPageNumber && mode > 1) { alert("已经是最后一页了。"); return false; }

        //更新
        p.pageNumber = p.GetCurrentPageNumber(mode);
        p.Update();

    });

    return b;
}

//创建页码显示文本框
SzdwPagination.prototype.CreatePageNumberTextBox = function () {
    //创建
    var t = document.createElement("input");
    $(t).attr("type", "text");

    //绑定事件
    var p = this;
    $(t).keypress(function (e) {
        var k = e.which;
        if (k == 13) {
            var pn = this.value;

            //容错
            //如果输入的页码和当前页一致
            var oldPN = p.pageNumber;
            if (oldPN == pn) {
                alert("当前就是第" + oldPN + "页。");
                return false;
            }
            //如果输入的页码超出范围
            var tpn = p.totalPageNumber;
            if (pn < 1 || pn > tpn) {
                $(this).val(oldPN);
                return false;
            }

            //更新
            p.pageNumber = this.value;
            p.Update();
        }
    });

    //载入样式
    this.SetStyleByCssName(t, this.pageNumberTextBoxCssName);
    this.SetStyleByCssJson(t, this.pageNumberTextBoxCssJson); 

    this.txtPageNumber = t;
    return t;
}

//创建页码总数信息框
SzdwPagination.prototype.CreateTotalPageNumberBox = function () {
    var tp = document.createElement("div");
    $(tp).text(this.GetTotalPageNumberInfo());
    this.totalPageNumberBox = tp;
    return tp;
}

//组合显示页码总数信息
SzdwPagination.prototype.GetTotalPageNumberInfo = function () {
    return "页/共" + this.GetTotalPageNumber() + "页"; 
} 

//获取页码总数
SzdwPagination.prototype.GetTotalPageNumber = function () {
    var ps = this.pageSize;
    var tr = this.recordCount;
    var n = Math.ceil(tr / ps);

    this.totalPageNumber = n;
    return n;
}
//#endregion 创建各栏

//#region 设置样式
//设置样式
//根据CssName设置样式
SzdwPagination.prototype.SetStyleByCssName = function (element, cssName) {
    if (cssName != null) { $(element).addClass(cssName); }
}

//根据CssJson设置样式
SzdwPagination.prototype.SetStyleByCssJson = function (element, cssJson) {
    if (cssJson != null) { $(element).css(cssJson); }
}
//#endregion 设置样式

//#region 更新

//更新关联数据列表控件数据
SzdwPagination.prototype.Update = function () {
    //更新当前页码信息
    $(this.txtPageNumber).val(this.pageNumber);

    //更新记录范围信息
    $(this.recordRangeBar).text(this.GetRecordRangeInfo());

    //更新关联数据列表控件
    var t = this.targetControl;
    if (t != null) {
        t.DataBind();
        t.RecoverSelectedRow();
    }
}

//更新当前页、总页数、当前页记录范围和总记录数显示信息
SzdwPagination.prototype.UpdateInfo = function () {
    //更新记录总数
    this.recordCount = this.targetControl.recordCount;

    //更新当前页码信息
    $(this.txtPageNumber).val(this.pageNumber);

    //更新总页数信息
    $(this.totalPageNumberBox).text(this.GetTotalPageNumberInfo());

    //更新记录范围信息
    $(this.recordRangeBar).text(this.GetRecordRangeInfo());
}

//获取翻页后的当前页
//mode取值|0:首页，1：上页，2：下页，3：末页
SzdwPagination.prototype.GetCurrentPageNumber = function (mode) {
    var pn = this.pageNumber;
    var tpn = this.GetTotalPageNumber();
    switch (mode) {
        case 0:
            return 1;
            break;
        case 1:
            return pn == 1 ? pn : pn - 1;
            break;
        case 2:
            return pn == tpn ? pn : parseInt(pn) + 1;
            break;
        case 3:
            return tpn;
            break;
    }
}
//#endregion 更新

//#region 重置相关属性
SzdwPagination.prototype.Resize = function (width) {
    $(this.panel).outerWidth(width);
}

//重置页尺寸、当前页码、总页码、当前页记录范围和总记录数显示信息
SzdwPagination.prototype.ResetBar = function () {
    //重置页尺寸信息
//    this.pageSize = 10;
//    if (this.ddlPageSize != null) {
//        this.ddlPageSize.selectedIndex = 0;
//    }

    //重置当前页码信息
    this.pageNumber = 1;
    $(this.txtPageNumber).val(this.pageNumber);

    //重置总页码信息
    $(this.totalPageNumberBox).text(this.GetTotalPageNumberInfo());

    //重置记录范围信息
    $(this.recordRangeBar).text(this.GetRecordRangeInfo());
}

//#endregion 重置相关属性
