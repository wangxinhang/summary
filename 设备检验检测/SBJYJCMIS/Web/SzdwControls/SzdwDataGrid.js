//数据表对象SZDW_DataGrid
/// <reference path="../jquery-1.11.1.js" />
//#region 对象SZDW_DataGrid
function SZDW_DataGrid(position, x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    //外框
    this.panel = document.createElement("div");
    this.panel.style.overflow = "hidden";
    this.panel.style.padding = "0";
    this.panel.style.margin = "0";
    this.panel.style.position = position;
    this.panel.style.left = parseInt(x) + "px";
    this.panel.style.top = parseInt(y) + "px";

    $(this.panel).width(width);
    $(this.panel).height(height);
    this.panelCssName = null;
    this.panelCssJson = null;
    //this.panel.style.border = "1px solid silver";

    //标题
    this.title = document.createElement("div");
    this.isTitled = false;
    this.title.style.display = "none";
    this.titleWidth = width;
    this.titleHeight = 0;
    this.titleCssName = null;
    this.titleCssJson = null;
    this.titleText = "";
    this.panel.appendChild(this.title);

    //数据框
    this.dataPanel = document.createElement("div");
    this.dataPanel.style.overflow = "hidden";
    this.dataPanel.style.padding = "0";
    this.dataPanel.style.margin = "0";
    this.dataPanelWidth = width;
    this.dataPanelHeight = height;
    this.dataPanelCssName = null;
    this.dataPanelCssJson = null;
    this.panel.appendChild(this.dataPanel);

    this.span = null;
    this.spanCssName = null;
    this.spanCssJson = null;

    //无数据信息
    this.emptyDataInfo = null;

    //加载动画
    this.loadingImgUrl = "Image/loading.gif";
    this.loadingImg = this.CreateLoadingImg(this.loadingImgUrl);
    this.dataPanel.appendChild(this.loadingImg);

    //字段数据
    this.fieldJsonData = null;
    this.fieldType = { Integer: "Integer", Decimal: "Decimal", Date: "Date", DateTime: "DateTime", String: "String" };    

    //表头
    this.head = null;
    this.headWidth = width;
    this.headHeight = 0;
    this.headCssName = null;
    this.headCssJson = null;

    //表体
    this.body = null;
    this.bodyTable = null;
    this.bodyWidth = width;
    this.bodyHeight = 0;
    this.bodyRows = null;
    this.bodyCssName = null;
    this.bodyCssJson = null;
    this.cellCssJson = null;
    this.bodyJsonData = null;
    this.alternateRowBackColor = null; // "#F4F4F4";
    this.rowOldBackColor = null;
    this.rowOverColor = null;
    this.rowHieght = 0;

    //表脚
    this.foot = null;

    //选择框
    this.isCheckBox = false;
    this.isCheckAll = false;
    this.checkBoxAll = null;
    this.checkBoxList = new Array();
    this.checkBoxMultiple = false;
    this.checkedRowIndex = new Array();//选择的行索引
    this.checkedRowBackColor = "#EFCF5F"; //"#EFCF5F";"#CEE2FC"
    this.checkBoxCellWidth = 0;

    //选择后的行值(json)
    this.checkedReturnJsonData = null;
}
//#endregion 对象SZDW_DataGrid

//#region 数据方法
//绑定数据
SZDW_DataGrid.prototype.DataBind = function () {
    this.checkBoxCellWidth = 35;

    this.SetTitle();
    this.SetDataPanelCss();
    this.CreateHead();
    this.CreateBody();
    this.SetHeadBodySameHeight();
    this.CreateLoadingImg(this.loadingImgUrl);
}
//#endregion 数据方法

//#region 设置标题Title
//设置数据表标题Title
SZDW_DataGrid.prototype.SetTitle = function () {
    if (this.isTitled) {
        var width = this.titleWidth;
        var height = this.titleHeight;
        var titleCssName = this.titleCssName;
        var titleCssJson = this.titleCssJson;
        var titleText = this.titleText;
        var spanCssName = this.spanCssName;
        var spanCssJson = this.spanCssJson;

        //创建Title并设置尺寸样式
        var t = this.title;
        $(t).show();
        $(t).outerWidth(width);
        $(t).outerHeight(height);
        if (titleCssName != null) { $(t).addClass(titleCssName); }
        if (titleCssJson != null) { $(t).css(titleCssJson); }

        var s = document.createElement("span");        
        if (spanCssName != null) { $(s).addClass(spanCssName); }
        if (spanCssJson != null) { $(s).css(spanCssJson); }
        this.span = s;

        $(s).text(titleText);
        $(t).append(s);
    } else {
        return false;
    }
}
//#endregion 设置标题Title

//#region 创建DataGrid表头标题行
//创建数据表表头
SZDW_DataGrid.prototype.CreateHead = function () {
    var jsonData = this.fieldJsonData;
    if (jsonData == null) { return false; }

    var width = this.headWidth;
    var height = this.headHeight;
    var headCssName = this.headCssName;
    var headCssJson = this.headCssJson;

    //创建Head并设置尺寸样式
    var gh = document.createElement("div");
    $(gh).width(width);
    $(gh).outerHeight(height);
    if (headCssName != null) { $(gh).addClass(headCssName); }
    if (headCssJson != null) { $(gh).css(headCssJson); }

    //绑定数据
    var tb = document.createElement("table");
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");

    //创建checkBox
    var checkTh = this.CreateHeadCheckBox();
    if (checkTh != null) {
        $(tr).append(checkTh);
    }

    //创建字段标题
    $.each(jsonData, function (i, item) {
        var th = document.createElement("th");
        if (item["Style"]) { $(th).css(item["Style"]); }
        $(th).css({ "padding-left": "3px", "padding-right": "3px" });
        $(th).innerWidth(item["Width"]);
        $(th).innerHeight(height);
        th.innerText = item["Text"];
        th.field = item["Field"];

        if (typeof (item["SortField"]) != "undefined") {
            th.sortField = item["SortField"];
            th.title = "单击排序";
            $(th).css("cursor", "pointer");
        }

        th.onclick = function () { if (typeof (this.sortField) != "undefined") { alert(this.sortField); } };
        tr.appendChild(th);
    })

    thead.appendChild(tr);
    tb.appendChild(thead);
    gh.appendChild(tb);
    this.head = gh;
    this.dataPanel.appendChild(gh);
}

//创建表头CheckBox列
SZDW_DataGrid.prototype.CreateHeadCheckBox = function () {
    if (this.isCheckBox) {
        var th = document.createElement("th");
        $(th).width(this.checkBoxCellWidth);
        if (this.isCheckAll) {
            var checkBox = document.createElement("input");
            $(checkBox).prop("type", "checkbox");
            $(th).append(checkBox);
            this.checkBoxAll = checkBox;
            var dataGrid = this;
            checkBox.onclick = function () { dataGrid.HeadCheckBoxMouseClick(this.checked); }
        } else {
            var text = this.checkBoxMultiple ? "复选" : "单选";
            $(th).text(text);
        }
        return th;
    }
    return null;
}

SZDW_DataGrid.prototype.HeadCheckBoxMouseClick = function (isChecked) {
    var cbList = $(this.bodyRows).find("input[type='checkbox']:enabled");
    $(cbList).prop("checked", isChecked);
    this.checkBoxList = cbList;

    //存储选中行索引
    if (isChecked) {               
        for (var i = 0; i < this.checkBoxList.length; i++) {
            this.checkedRowIndex.push($(this.checkBoxList[i]).parent().prop("rowIndex"));
        }
    } else {
        this.checkedRowIndex.length = 0;
    }
}

//更新Head
SZDW_DataGrid.prototype.UpdateHead = function () {
    var jsonData = this.fieldJsonData;
    if (jsonData == null) { return false; }

    //更新数据
    var th = $(this.head).find("th");
    $.each(jsonData, function (i, item) {
        th[i].innerText = item["Text"];
        th[i].field = item["Field"];
        if (typeof (item["SortField"]) != "undefined") {
            th[i].sortField = item["SortField"];
            $(th[i])[0].title = "单击排序";
            $(th[i]).css("cursor", "pointer");
        }
    })
}
//#endregion 创建DataGrid表头标题行

//#region 创建DataGrid表体数据行列
//创建数据表
SZDW_DataGrid.prototype.CreateBody = function () {
    var jsonData = this.bodyJsonData;
    if (jsonData == null) { return false; }

    var width = $(this.dataPanel).width();
    var height = $(this.dataPanel).innerHeight() - $(this.head).outerHeight();
    var rowHeight = this.rowHeight;
    var bodyCssName = this.bodyCssName;
    var bodyCssJson = this.bodyCssJson;

    //创建Body，并加载样式
    var gb = document.createElement("div");
    if (bodyCssName != null) { $(gb).addClass(bodyCssName); }
    if (bodyCssJson != null) { $(gb).css(bodyCssJson); }
    $(gb).outerWidth(width);
    $(gb).outerHeight(height);

    //创建数据表
    var tb = document.createElement("table");
    $(tb).css("border-bottom", "1px solid #EEEEEE");
    var th = $(this.head).find("th");

    //创建数据行，绑定数据
    for (var i = 0; i < jsonData.length; i++) {
        //创建数据行列
        var tr = this.CreateBodyRow(i);
        this.CreateBodyCell(i, tr);
        $(tb).append(tr);
    }

    gb.appendChild(tb);
    this.body = gb;
    this.bodyWidth = $(gb).outerWidth();
    this.bodyHeiht = $(gb).outerHeight();
    this.bodyTable = tb;
    this.bodyRows = $(tb).find("tr");

    this.dataPanel.appendChild(gb);
}

//创建表体数据行bodyRow
SZDW_DataGrid.prototype.CreateBodyRow = function (rowIndex) {
    var tr = document.createElement("tr");
    //tr.rowIndex = rowIndex;
    $(tr).attr("rowIndex", rowIndex);
    $(tr).innerHeight(this.rowHeight);
    if (rowIndex % 2 != 0) {
        $(tr).css("background-color", this.alternateRowBackColor);
    }
    this.SetRowMouseOverBackColor(tr, this.rowOverColor);
    return tr;
}

//创建表体数据行的单元格Cell
SZDW_DataGrid.prototype.CreateBodyCell = function (rowIndex, row) {
    var jsonData = this.bodyJsonData;
    var fieldJsonData = this.fieldJsonData;
    var cellCssJson = this.cellCssJson;

    //创建checkBox列
    var checkTd = this.CreateBodyCheckBox(rowIndex);
    if (checkTd != null) {
        $(row).append(checkTd);
    }

    //创建其他数据列    
    for (var i = 0; i < fieldJsonData.length; i++) {
        var td = document.createElement("td");
        var field = fieldJsonData[i].Field;

        //样式
        $(td).css(cellCssJson[field]);
        $(td).css({ "padding-left": "3px", "padding-right": "3px" });
        $(td).innerWidth(fieldJsonData[i].Width);
        if (i == fieldJsonData.length - 1) {
            $(td).css("border-right", "0px solid white");
        }

        //填充数据
        $(td).attr("rowIndex", rowIndex);
        $(td).attr("field", field);
//        td.rowIndex = rowIndex;
//        td.field = field;
        this.BodyCellDataBind(jsonData[rowIndex], fieldJsonData[i], td);
        $(row).append(td);
    }
}

//数据行的单元格Cell绑定数据
SZDW_DataGrid.prototype.BodyCellDataBind = function (rowJsonData, fieldJsonData, cell) {
    var fieldType = this.fieldType;
    //var field = cell.field;
    var field = $(cell).attr("field");
    switch (fieldJsonData.FieldType) {
        case fieldType.Decimal:
            cell.innerText = rowJsonData[field].toFixed(6);
            break;
        case fieldType.Date:
            var jsonDate = rowJsonData[field];
            var i = jsonDate.indexOf("T");
            cell.innerText = jsonDate.slice(0, i);
            //var date = new Date(jsonDate.slice(0, i));
            //cell.innerText = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            //date = null;
            break;
        default:
            cell.innerText = rowJsonData[field];
    }
}

//创建表体CheckBox数据列
SZDW_DataGrid.prototype.CreateBodyCheckBox = function (rowIndex) {
    //创建checkBox列
    if (this.isCheckBox) {
        var td = document.createElement("td");
        $(td).width(this.checkBoxCellWidth);
        $(td).css("text-align", "center");
        var checkBox = document.createElement("input");
        $(checkBox).attr("type", "checkbox");
        $(td).append(checkBox);
        //td.rowIndex = rowIndex;
        $(td).attr("rowIndex", rowIndex);
        var dataGrid = this;
        checkBox.onclick = function () { dataGrid.BodyCheckBoxMouseClick(rowIndex, this.checked); }
        this.checkBoxList.push(checkBox);
        return td;
    }
    return null;
}

SZDW_DataGrid.prototype.BodyCheckBoxMouseClick = function (i, isChecked) {
    //设置选中行背景
    if (isChecked) {
        //设置选中行背景
        $(this.bodyRows[i]).css("background-color", this.checkedRowBackColor);
        this.rowOldBackColor = this.checkedRowBackColor;
    } else {        
        var rowBackColor = (i % 2 == 0) ? "" : this.alternateRowBackColor;
        $(this.bodyRows[i]).css("background-color", rowBackColor);
        this.rowOldBackColor = rowBackColor;
    }

    //多选和单选的情况
    if (this.checkBoxMultiple) {
        if (isChecked) {
            //行索引添加至数组
            this.checkedRowIndex.push(i);
        } else {
            //行索引从数组中移除
            var index = this.checkedRowIndex.indexOf(i);
            this.checkedRowIndex.splice(index, 1);
        }
    } else {
        var ri = this.checkedRowIndex[0];
        $(this.bodyRows[ri]).css("background-color", (ri % 2 == 0) ? "" : this.alternateRowBackColor);

        if (isChecked) {
            //行索引添加至数组
            this.checkedRowIndex.length = 1;
            this.checkedRowIndex[0] = i;
            var cbList = $(this.bodyRows).find("input[type='checkbox']");
            cbList.splice(i, 1);
            $(cbList).attr("checked", false);
        } else {
            //清空数组
            this.checkedRowIndex.length = 0;
        }
    }
}
//#endregion 创建DataGrid表体数据行

//#region 更新数据
//更新数据表
SZDW_DataGrid.prototype.UpdateBodyData = function (jsonData) {
    this.bodyJsonData = jsonData;
    if ($.isEmptyObject(jsonData)) {
        $(this.bodyTable).hide();
        return false;
    } else {
        $(this.bodyTable).show();
    }

    var tb = this.bodyTable;
    var th = $(this.head).find("th");
    var tr = this.bodyRows;
    var trLen = tr.length;
    var jdLen = jsonData.length;
    var cellCssJson = this.cellCssJson;
    var fieldJsonData = this.fieldJsonData;
    var fieldType = this.fieldType;

    //更新数据
    var newLen = Math.min(trLen, jdLen);
    for (var i = 0; i < newLen; i++) {
        var td = $(tr[i]).find("td");
        var isCheckBox = this.isCheckBox;
        var rowJsonData = jsonData[i];
        for (var j = 0; j < fieldJsonData.length; j++) {
            var m = (isCheckBox) ? j + 1 : j;
            this.BodyCellDataBind(rowJsonData, fieldJsonData[j], td[m]);
        }
    }

    //新数据比原来行数少
    if (jdLen < trLen) {
        //删除多余的行和行中的CheckBox
        for (var i = trLen - 1; i >= jdLen; i--) {
            tb.deleteRow(i);
            this.checkBoxList.splice(i, 1)
        }
    }

    //新数据比原来行数多    
    if (jdLen > trLen) {
        for (var i = trLen; i < jdLen; i++) {
            //创建数据行
            var tr = this.CreateBodyRow(i);
            this.CreateBodyCell(i, tr);
            $(tb).append(tr);
        }
    }

    this.bodyRows = $(tb).find("tr");
    this.SetHeadBodySameHeight();
}
//#endregion 更新数据

//#region 设置DataGrid样式和滚动
//设置数据表容器样式
SZDW_DataGrid.prototype.SetDataPanelCss = function () {
    var p = this.dataPanel;
    var dataPanelCssName = this.dataPanelCssName;
    var dataPanelCssJson = this.dataPanelCssJson;
    var h = this.dataPanelHeight;
    if (dataPanelCssName != null) { $(p).addClass(dataPanelCssName); }
    if (dataPanelCssJson != null) { $(p).css(dataPanelCssJson); }

    $(p).outerHeight(h);
}

//设置数据行替换色
SZDW_DataGrid.prototype.SetRowMouseOverBackColor = function (row, color) {
    var dataGrid = this;
    $(row).mouseover(function () { dataGrid.rowOldBackColor = this.style.backgroundColor; this.style.backgroundColor = color; });
    $(row).mouseout(function () { this.style.backgroundColor = dataGrid.rowOldBackColor; });
}

//设置标题行和数据行滚动一致
SZDW_DataGrid.prototype.SetScroll = function () {
    var gh = this.head;
    var gb = this.body;
    
    if (gh == null || gb == null) {
        return false;
    } else {        
        $(gb).scroll(function () {
            $(gh).scrollLeft($(this).scrollLeft());
        });
    }
}

//设置标题行和数据行容器可视宽度一致，便于滚动一致
SZDW_DataGrid.prototype.SetHeadBodySameHeight = function () {
    var gh = this.head;
    var gb = this.body;
    if (gh == null || gb == null) {
        return false;
    } else {
        $(gh).innerWidth(gb.clientWidth);
    }
}

//#endregion 设置DataGrid样式和滚动

//#region 设置数据加载动画
SZDW_DataGrid.prototype.CreateLoadingImg = function (imgGif) {
    var div = document.createElement("div");
    var img = document.createElement("img");
    img.src = imgGif;
    var left = (this.width - $(img).width()) / 2;
    var top = (this.height - $(img).height()) / 2;

    $(div).css({ "position": "absolute", "left": left, "top": top, "display": "none" });
    $(div).append(img);
    return div;
}

SZDW_DataGrid.prototype.ShowLoadingImg = function () {
    $(this.loadingImg).show();
}

SZDW_DataGrid.prototype.HideLoadingImg = function () {
    $(this.loadingImg).fadeOut(300);
}
//#endregion 设置数据加载动画

//#region 显示无数据信息
SZDW_DataGrid.prototype.ShowEmptyDataInfo = function () {
    $(this.bodyTable).hide();
    if (this.emptyDataInfo == null) {
        var emp = document.createElement("div");
        $(emp).text("无数据记录");
        $(emp).css({ "position": "relative", "font-size": "10pt", "color": "red", "text-align": "center", "display": "none" });
        this.emptyDataInfo = emp;
    }

    var pDiv = this.body == null ? this.dataPanel : this.body;
    if (this.body == null) {
        $(this.dataPanel).outerHeight(this.height - $(this.title).outerHeight() - 2);
        $(this.dataPanel).css("border", "1px solid silver");
    }
    var top = ($(pDiv).innerHeight() - $(this.emptyDataInfo).height()) / 2;
    $(this.emptyDataInfo).css("top", top + "px");

    $(pDiv).append(this.emptyDataInfo);
    $(this.emptyDataInfo).fadeIn();
}
//#endregion 显示无数据信息