/// <reference path="../jquery-1.11.1.js" />
//#region Szdw_BriefGrid控件
//Szdw_BriefGrid控件
function Szdw_BriefGrid(position, x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    //外框
    this.panel = document.createElement("div");
    $(this.panel).css({ "border": "1px solid silver", "overflow": "hidden", "padding": "0", "margin": "0", "font-family": "微软雅黑", "font-size": "small" });
    $(this.panel).css("position", position);
    $(this.panel).css("left", x);
    $(this.panel).css("top", y);
    $(this.panel).width(width);
    $(this.panel).height(height);

    //主体信息框
    this.main = null;
    this.mainClass = null;
    this.mainWidth = 0;
    this.mainHeight = 0;

    //明细信息框
    this.detail = null;
    this.detailClass = null;
    this.detailWidth = 0;
    this.detailHeight = 0;
    //            this.detailItemCount = 0;

    //数据
    this.jsonData = null;
    this.mainText = "";
    this.detailJsonData = null;

    //无数据信息
    this.emptyDataInfo = null;

    //加载动画
    this.loadingImgUrl = "Image/loading.gif";
    this.loadingImg = this.CreateLoadingImg(this.loadingImgUrl);
    this.panel.appendChild(this.loadingImg);
}
//#endregion Szdw_BriefGrid控件

//#region Szdw_BriefGrid主体Main
//主体信息
Szdw_BriefGrid.prototype.CreateMain = function () {
    var m = document.createElement("div");
    $(m).css({ "border-bottom": "1px solid silver", "padding": "0px 5px 0px 5px" });
    $(m).outerWidth(this.mainWidth);
    $(m).height(this.mainHeight);

    var table = document.createElement("table");
    $(table).css({ "border-collapse": "collapse" });
    var tr = document.createElement("tr");
    $(tr).css({ "vertical-align": "middle", "height": this.mainHeight + "px" });    
    var td = document.createElement("td");
    $(td).text(this.mainText);
    tr.appendChild(td);
    table.appendChild(tr);
    m.appendChild(table);

    return m;
}
//#endregion Szdw_BriefGrid主体Main

//#region Szdw_BriefGrid明细Detail
//明细信息
Szdw_BriefGrid.prototype.CreateDetail = function () {
    var d = document.createElement("div");
    $(d).width(this.detailWidth);
    $(d).height(this.detailHeight);
    var detailData = this.detailJsonData;
    if (detailData != null) {
        var c = getJsonCount(detailData);
        var w = this.detailWidth / c;
        var h = this.detailHeight;

        //循环创建明细item
        var grid = this;
        $.each(detailData, function (key, value) {
            var di = grid.CreateDetailItem(w, h, key, value);
            $(d).append(di);
        });
    }
    $(d).find("div")[0].style.borderLeft = "0px"; ;
    return d;
}

//明细子项
Szdw_BriefGrid.prototype.CreateDetailItem = function (width, height, field, value) {
    var di = document.createElement("div");
    $(di).css({ "line-height": height + "px", "float": "left", "border-left": "1px solid silver", "background-color": "#F5F5F5", "padding": "0px 5px 0px 5px" });
    $(di).outerWidth(width);
    $(di).height(height);
    $(di).text(value);
    di.field = field;
    return di;
}
//#endregion Szdw_BriefGrid明细Detail

//#region Szdw_BriefGrid数据方法
//更新Main内容
Szdw_BriefGrid.prototype.UpdateMain = function () {
    $(this.main).find("td").text(this.mainText);
    
    if ($.isEmptyObject(this.jsonData)) {
        $(this.main).hide();
        return false;
    } else {
        $(this.main).show();
    }
}

//更新Detail内容
Szdw_BriefGrid.prototype.UpdateDetail = function (jsonData) {
    var di = $(this.detail).find("div");
    for (var i = 0; i < di.length; i++) {
        $(di[i]).text(this.detailJsonData[di[i].field]);
    }

    if ($.isEmptyObject(this.jsonData)) {
        $(this.detail).hide();
        return false;
    } else {
        $(this.detail).show();
    }
}

//#endregion Szdw_BriefGrid数据方法

//#region 设置数据加载动画
Szdw_BriefGrid.prototype.CreateLoadingImg = function (imgGif) {
    var div = document.createElement("div");
    var img = document.createElement("img");
    img.src = imgGif;
    var left = (this.width - $(img).width()) / 2;
    var top = (this.height - $(img).height()) / 2;

    $(div).css({ "position": "absolute", "left": left, "top": top, "display": "none" });
    $(div).append(img);
    return div;
}

Szdw_BriefGrid.prototype.ShowLoadingImg = function () {
    $(this.loadingImg).show();
}

Szdw_BriefGrid.prototype.HideLoadingImg = function () {
    $(this.loadingImg).fadeOut(300);
}
//#endregion 设置数据加载动画

//#region 显示无数据信息
Szdw_BriefGrid.prototype.ShowEmptyDataInfo = function () {
    $(this.main).hide();
    $(this.detail).hide();
    if (this.emptyDataInfo == null) {
        var emp = document.createElement("div");
        $(emp).text("无数据记录");
        $(this.panel).append(emp);
        var top = ($(this.panel).innerHeight() - $(emp).height()) / 2;
        $(emp).css({ "position": "relative","font-family":"宋体", "color": "red", "top": top + "px", "text-align": "center", "display": "none" });
        this.emptyDataInfo = emp;
        $(emp).fadeIn();
    } else {
        $(this.emptyDataInfo).show();
    }
}
//#endregion 显示无数据信息

//#region Szdw_BriefGrid其他
//获取对象成员数量
function getJsonCount(json) {
    var c = 0;
    for (var i in json) {
        c++;
    }
    return c;
}
//#endregion Szdw_BriefGrid其他
