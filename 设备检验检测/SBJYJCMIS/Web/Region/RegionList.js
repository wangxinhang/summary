//#region 全局变量
var xuserId, xmenuId, permission = null; //用户及权限：json格式
var regionId = "", name = "";
//#endregion

$(document).ready(function () {
    var paramJson = SzdwCommon.getJsonParm();
    xuserId = paramJson.xuserId;
    xmenuId = paramJson.xmenuId;
    permission = SzdwCommon.getPermission(paramJson.permissionJsonList);
    bodyWidth = Math.max($(document.body).width(), minWidth);
    bodyHeight = Math.max($(document.body).height(), minHeight);
    //设置查询面板
    $("#ddlRegion").val("全部").data("value", "_");
	SetQueryPanel();
	//设置结果面板
	SetDataPanel();
	//窗口调整大小
	$(window).resize(function () {
	    bodyWidth = Math.max($(document.body).width(), minWidth);
	    bodyHeight = Math.max($(document.body).height(), minHeight);
	    ResizeControls();
	    RepositionControls();
	});
});

//#region 位置尺寸
function RepositionControls() {
    var qh = GetPanelX("queryPanel", "h");
    var qx = GetPanelX("queryPanel", "x");
    var qy = GetPanelX("queryPanel", "y");

    $("#dataPanel").css({ "left": qx, "top": qy + qh + mt });

    //重设弹窗位置
    var t = document.body;
    var pw = t.popupWindow;
    if (pw) {
        pw.RePosition(bodyWidth - pw.width - ml, qy + qh + mt);
    }
    var ew = t.exportWindow;
    if (ew) {
        var w = Math.min(exportWidth, bodyWidth * 4 / 5);
        var h = Math.min(exportHeight, bodyHeight * 4 / 5);
        var x = (bodyWidth - w) / 2;
        var y = (bodyHeight - h) / 2;
        ew.RePosition(x, y);
    }
}
function ResizeControls() {
    var qx = GetPanelX("queryPanel", "x");
    var qy = GetPanelX("queryPanel", "y");
    var qw = bodyWidth - 2 * ml;
    var qh = GetPanelX("queryPanel", "h");
    var dh = bodyHeight - qy - qh - 2 * mt;

    $("#queryPanel").outerWidth(bodyWidth - 2 * ml);

    if (szdwGv) {
        $("#dataPanel").outerWidth(qw).outerHeight(dh);
        szdwGv.Resize(qw, dh);
    }

    var t = document.body;
    var pw = t.popupWindow;
    if (pw) {
        pw.ReSize(pw.width, dh);
    }
    var ew = t.exportWindow;
    if (ew) {
        var w = Math.min(exportWidth, bodyWidth * 4 / 5);
        var h = Math.min(exportHeight, bodyHeight * 4 / 5);
        ew.ReSize(w, h);
    }
}
function SetQueryPanel() {
    $("#queryPanel").outerWidth(bodyWidth - ml * 2);
    BindDropDownLists();
    CreateButton();
}
function SetDataPanel() {
    var qx = GetPanelX("queryPanel", "x");
    var qy = GetPanelX("queryPanel", "y");
    var qw = GetPanelX("queryPanel", "w");
    var qh = GetPanelX("queryPanel", "h");
    $("#dataPanel")
        .css({ "position": "relative", "left": qx, "top": qy + qh + mt })
        .outerWidth(qw)
        .outerHeight(bodyHeight - qy - qh - 2 * mt);
    GetQueryResult();
}
//#endregion

//#region 绑定下拉框
function BindDropDownLists() {
	BindDdlRegion();
}

var szdwDdlRegion = null;
function BindDdlRegion() {
	$.ajax({
		url: "RegionHandler.ashx",
		type: "post",
		data: {
			MethodName: "GetTopNLevelRegionList"
		},
		dataType: "json",
		success: function (jsData) {
			if ((jsData) && (jsData.length)) {
				var jsonList = new Array();
				var len = jsData.length;
				for (var i = 0; i < len; i++) {
					jsonList.push({ Id: jsData[i].Id, Name: jsData[i].Name, ParentId: jsData[i].ParentId });
				}
				var paramDdl = { jsonList: jsonList, fnInitial: InitialDdlRegion };
                $("#ddlRegion").dropDownList(paramDdl);
				//$("#ddlRegion").val(jsonList[0].Name).data("value", jsonList[0].Id);
				
			}
		}
	});
}
function InitialDdlRegion(szdwDdl) {
    szdwDdl.nonCascadeItemLength = 1;
    szdwDdl.hasSearchBox = 1;
    szdwDdl.jsonItemAll = { Id: "_", Name: "全部" };
	szdwDdl.fnItemClick = function () {
		var btnPanel = szdwQueryButton.button;
		$(btnPanel).trigger("click");
	}
}

//#endregion

//#region 创建按钮
function CreateButton() {
	//创建按钮
	CreateQueryButton();
	if (permission.exportPrintPermission) { CreateExportButton(); }
	CreateResetButton();
	if (permission.insertPermission) { CreateInsertButton(); }
}

var szdwInsertButton = null;
function CreateInsertButton() {
	var nc = $("#btnPanel");
	var p = "relative";
	var x = 0;
	var y = 0;
	var w = 0; // btnWidth;
	var h = btnHeight;
	szdwInsertButton = new SzdwButton(p, x, y, w, h);
	szdwInsertButton.namingContainer = nc;
	szdwInsertButton.image = "../Image/new21b3.png";
	szdwInsertButton.text = "新增行政单位";
	szdwInsertButton.btnCssJson["border"] = "0px";
	szdwInsertButton.btnCssJson["margin-left"] = "5px";
	szdwInsertButton.btnCssJson["border-left"] = "1px solid #EEEEEE";
	szdwInsertButton.btnHoverCssJson = { "color": "#017BBA" };
	szdwInsertButton.imageWidth = btnImageWidth;
	szdwInsertButton.Load();

	//单击事件
	var btn = szdwInsertButton.button;
	$(btn).click(function () {
	    var titleText = "新增行政单位信息"
	    var pageUrl = "RegionInsert.html";
	    var regionId = $("#ddlRegion").data("value");
	    if (regionId == "_") {
	        regionId = "";
	    }
	    var regionName = $("#ddlRegion").val();
	    if (regionName == "全部") {
	        regionName = "";
	    }
	    var paramJson = { regionId: regionId, regionName: regionName };
	    var w = 350;
	    var h = GetPanelX("dataPanel", "h");
	    var x = bodyWidth - w - ml;
	    var y = GetPanelX("dataPanel", "y");
	    var oJson = {};
	    document.body.popupWindow = SzdwCommon.openEditWindowAssignObj(document.body.popupWindow, pageUrl, paramJson, titleText, x, y, w, h, oJson);
	});
}

var szdwQueryButton = null;
function CreateQueryButton() {
	var nc = $("#btnPanel");
	var p = "relative";
	var x = 0;
	var y = 0;
	var w = btnWidth;
	var h = btnHeight;
	szdwQueryButton = new SzdwButton(p, x, y, w, h);
	szdwQueryButton.namingContainer = nc;
	szdwQueryButton.image = "../Image/query20b.png";
	szdwQueryButton.text = "查询数据";
	szdwQueryButton.btnCssJson["border"] = "0px";
	szdwQueryButton.btnHoverCssJson = { "color": "#017BBA" };
	szdwQueryButton.imageWidth = btnImageWidth;
	szdwQueryButton.Load();

	//单击事件
	var btn = szdwQueryButton.button;
	$(btn).click(function (e) {
		e.stopPropagation();
		if (szdwGv) {
			var paramJson = GetParamJson();
			szdwGv.paramJson["regionId"] = regionId;
			szdwGv.DataBind();
		}
	});
}

var szdwResetButton = null;
function CreateResetButton() {
    var nc = $("#btnPanel");
    var p = "relative";
    var x = 0;
    var y = 0;
    var w = btnWidth;
    var h = btnHeight;
    szdwResetButton = new SzdwButton(p, x, y, w, h);
    szdwResetButton.namingContainer = nc;
    szdwResetButton.image = "../Image/Reset16B.png";
    szdwResetButton.text = "重置条件";
    szdwResetButton.btnCssJson["border"] = "0px";
    szdwResetButton.btnCssJson["margin-left"] = "5px";
    szdwResetButton.btnCssJson["border-left"] = "1px solid #EEEEEE";
    szdwResetButton.btnHoverCssJson = { "color": "#017BBA" };
    szdwResetButton.imageWidth = btnImageWidth;
    szdwResetButton.Load();

    var btn = szdwResetButton.button;
    $(btn).click(function () {
        $("#ddlRegion").data("value", "").val("全部");
        if (szdwGv) {
            szdwGv.paramJson["id"] = "";
            szdwGv.DataBind();
        }
    });
}

var szdwExportButton = null;
function CreateExportButton() {
	var nc = $("#btnPanel");
	var p = "relative";
	var x = 0;
	var y = 0;
	var w = btnWidth;
	var h = btnHeight;
	szdwExportButton = new SzdwButton(p, x, y, w, h);
	szdwExportButton.namingContainer = nc;
	szdwExportButton.image = "../SzdwControls/Image/export20ds.png";
	szdwExportButton.text = "导出打印";
	szdwExportButton.btnCssJson["border"] = "0px";
	szdwExportButton.btnCssJson["margin-left"] = "5px";
	szdwExportButton.btnCssJson["border-left"] = "1px solid #EEEEEE";
	szdwExportButton.btnHoverCssJson = { "color": "#017BBA" };
	szdwExportButton.imageWidth = btnImageWidth;
	szdwExportButton.Load();

	//单击事件
	var btn = szdwExportButton.button;
	$(btn).click(function () {
	    SzdwCommon.hideWin(document.body.popupWindow);
		var pageUrl = "RegionQueryReport.aspx";
		var paramJson = GetParamJson();
		var titleText = "数据导出打印";
		var w = Math.min(exportWidth, bodyWidth * 4 / 5);
		var h = Math.min(exportHeight, bodyHeight * 4 / 5);
		var x = (bodyWidth - w) / 2;
		var y = (bodyHeight - h) / 2;
		var oJson = {
		    hasLoadingAnimation: false
		};
		document.body.exportWindow = SzdwCommon.openExportWindowAssignObj(document.body.exportWindow, pageUrl, paramJson, titleText, x, y, w, h, oJson);
	});
}
//#endregion

function GetParamJson() {
    regionId = $("#ddlRegion").data("value");
    if (regionId == "_") {
        regionId = "";
    }
	//name = $("#txtName").val();
	var paramJson = { xuserId: xuserId };
	paramJson["regionId"] = regionId;
	paramJson["hasSelf"] = 0;
	return paramJson;
}

//#region 列表
function GetQueryResult() {
	//设置结果面板相关属性
	var body = document.body;
	var c = $("#dataPanel");
	var position = "absolute";
	var x = 0;
	var y = 0;
	var w = $(c).width();
	var h = $(c).height();

	//创建Gridview并绑定数据
	CreateGridView(c, position, x, y, w, h);
}

var szdwGv = null;
function CreateGridView(namingContainer, position, x, y, width, height) {
	if (szdwGv == null || typeof (szdwGv) == "undefined") {
		//创建SzdwGridViewt实例
		szdwGv = new SzdwGridView(position, x, y, width, height);
		szdwGv.namingContainer = namingContainer;
		szdwGv.fnInitial = InitialGridview(szdwGv);
		szdwGv.fnEditing = UpdateRegion;
		szdwGv.fnDeleting = DeleteRegion;
	}

	//异步加载数据
	if (szdwGv.pagination != null) {
		szdwGv.pagination.ResetBar();
	}

	var paramJson = GetParamJson();
	paramJson["pageSize"] = szdwGv.pageSize;
	paramJson["MethodName"] = "GetNextLevelRegionListForGV";
	szdwGv.requestUrl = "RegionHandler.ashx";
	szdwGv.paramJson = paramJson;
	szdwGv.DataBind();
}

function InitialGridview(szdwGv) {
	//个性样式设置
	szdwGv.dataPanelCssJson = { "background-color": "White", "border": "1px solid Silver" };
	szdwGv.paginationCssJson = { "background-color": "White", "font-family": "微软雅黑", "font-size": "small", "border": "1px solid Silver", "border-top": "0px" };

	//dataPanel设置
	szdwGv.orderField = "Id";
	szdwGv.orderType = "ASC";
	szdwGv.pageSize = 1000;
	szdwGv.hasPagination = false;
	szdwGv.hasSumRow = false;
	szdwGv.hasButtonPanel = true;
	szdwGv.hasOperationColumn = true;
	szdwGv.permission.modifyPermission = permission.modifyPermission;
	szdwGv.permission.deletePermission = permission.modifyPermission;

	//head设置
	szdwGv.headCssName = "gridHead2";
	szdwGv.headHeight = 30;
	szdwGv.fieldJsonData = [{ "Field": "RowNumber", "Text": "序号", "Width": 50 },
							{ "Field": "Id", "Text": "编号", "Width": 120 },
							{ "Field": "Name", "Text": "名称", "Width": 120 },
							{ "Field": "ShortName", "Text": "简称", "Width": 120 },
							{ "Field": "Pinyin", "Text": "拼音", "Width": 100 },
							{ "Field": "Longitude", "Text": "经度坐标", "Width": 100, "FieldType": szdwGv.fieldType.Decimal, "Digits": 6 },
							{ "Field": "Latitude", "Text": "维度坐标", "Width": 100, "FieldType": szdwGv.fieldType.Decimal, "Digits": 6 }
	];
	szdwGv.cellCssJson = {
        "Id": { "text-align": "left", "font-size": "samll", "font-family": "宋体" },
		"Name": { "text-align": "left", "font-size": "small", "font-family": "宋体" },
		"ShortName": { "text-align": "left", "font-size": "small", "font-family": "宋体" },
		"Pinyin": { "text-align": "left", "font-size": "small", "font-family": "宋体" }
	};
}
//#endregion

//#region 增删改


function RefreshDataAfterInsert() {
	SzdwCommon.refreshDataAfterInsert(szdwGv);
}

function DeleteRegion(rowIndex) {
	var jsData = szdwGv.recordSetJson[rowIndex];
	var id = jsData.Id;
	var modifierId = xuserId;

	var objDataBind = szdwGv;
	var requestUrl = "RegionHandler.ashx";
	var paramJson = { id: id, modifierId: modifierId, MethodName: "DeleteRegion" };
	SzdwAjaxDataOperate.ajaxDelete(objDataBind, requestUrl, paramJson);
}

function UpdateRegion(rowIndex) {
    SzdwCommon.hideWin(document.body.exportWindow);
	//设置编辑行的样式（加底色）
	szdwGv.SetSelectedRow(szdwGv.bodyRows[rowIndex]);

	//弹出更新窗口
	var jsData = szdwGv.recordSetJson[rowIndex];
	var titleText = "编辑行政单位信息"
	var pageUrl = "RegionUpdate.html";
	var paramJson = {
        idd:jsData.Idd,
		id: jsData.Id,
		parentId: jsData.ParentId,
		parentName: ($("#ddlRegion").data("value") == "_") ? "" : $("#ddlRegion").val(),
		name: jsData.Name,
		shortName: jsData.ShortName,
		pinyin: jsData.Pinyin,
		cityCode: jsData.CityCode,
		zipCode: jsData.ZipCode,
		longitude: jsData.Longitude,
		latitude:jsData.Latitude,
		memo: jsData.Memo,
		xuserId: xuserId
	};
    var w = 350;
    var h = GetPanelX("dataPanel", "h");
    var x = bodyWidth - w - ml;
    var y = GetPanelX("dataPanel", "y");
    var oJson = { fnCloseCallBack: RecoverSelectedRow };
    document.body.popupWindow = SzdwCommon.openEditWindowAssignObj(document.body.popupWindow, pageUrl, paramJson, titleText, x, y, w, h, oJson);
}

//更新完毕后恢复行样式（无选中底色）
function RecoverSelectedRow() {
	szdwGv.RecoverSelectedRow();
}


//#region 数据操作提示信息面板
var opInfoPanel = null;
function CreateOperateInfoPanel() {
	opInfoPanel = SzdwCommon.createOperateInfoPanel({ backColor: themeColor, namingContainer: document.body });
	return opInfoPanel;
}
//#endregion 数据操作提示信息面板

//#endregion 数据操作：增删改