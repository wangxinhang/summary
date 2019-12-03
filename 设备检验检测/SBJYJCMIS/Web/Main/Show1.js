//#region 全局变量
var urlParm, xuserId, xmenuId, permission = null;
var strConsumption = "年累计电量";
var strCost = "年累计电费";
var strBase = "基站统计";
var strWarn = "异常用电基站";
var strYearSum = "年度用电分析";
var strTop10 = "用电Top10";
var strMonthSum = "用电量及电费统计";
var strAreaConsumption = "用电量及电费统计";
var strWarnListTitle = "异常用电基站Top10"
var color = ['#ef473a', '#336699', '#da70d6', '#32cd32', '#6495ed',
             '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
             '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
             '#6699FF', '#ff6666', '#3cb371', '#b8860b', '#30e0e0'
];

var panelMinWidth = 1110;
var chartPowerYear;
var chartTop10;
var chartPowerMonth12;
var deptId;
var administrativeDivisionId;
var thisYear, thisMonth, lastYear, lastMonth;
var theYear, theMonth, strMonth, firstMonth = 1;
var isThis = 1;
var permissionList;
var baseCount, warnCount;
var curI = 1;
var mask1l, mask1t;
var mask2l, mask2t;
var mask31l, mask31t, mask32l, mask32t, mask33l, mask33t, mask34l, mask34t;
var yearOk = false, deptOk = false;
var deptList = [], deptList1 = [], deptList2 = [];
var abnormalYear,abnormalMonth;
var upDown = 1;
//#endregion 全局变量

$(function () {
    InitXuserInfo();
    var theDate = new Date();
    var date = theDate.getDate();
    thisMonth = theDate.getMonth() + 1;
    thisYear = theDate.getFullYear();

    if (thisMonth == 1) {
        lastMonth = 12;
        lastYear = thisYear - 1;
    }
    else {
        lastMonth = thisMonth - 1;
        lastYear = thisYear;
    }
    strMonth = lastYear.toString() + ((lastMonth.toString().length == 1) ? ("0" + lastMonth.toString()) : lastMonth.toString());
    theYear = lastYear;
    theMonth = lastMonth;
    chartTop10 = echarts.init(document.getElementById("chartTop10"));
    chartPowerMonth12 = echarts.init(document.getElementById("chartPowerMonth12"));
    setPanel();
    setYear();
    BindDdlTheMonth();
    BindDdlDepartment();
    //BindDdlAdministrativeDivision();
    
    $(window).resize(function () {
        setPanel();
    });
});

function InitXuserInfo() {
    urlParm = $.parseJSON(SzdwCommon.getUrlParam("paramJson"));
    xuserId = urlParm.xuserId;
    xmenuId = urlParm.xmenuId;
    permission = SzdwCommon.getPermission(urlParm.permissionJsonList);
    permissionList = parent.permissionList;
}

function setPanel() {
    var bodyWidth = $(document.body).width();
    var bodyHeight = $(document.body).height();
    var winWidth = $(window).width();
    var winHeight = $(window).height();
    var w = bodyWidth;
    var h = bodyHeight;
    $("#outPanel").width(winWidth).height(winHeight);
    winWidth = (winWidth > panelMinWidth) ? winWidth : panelMinWidth;
    //var w1 = Math.round((bodyWidth - 40) / 2);
	//$("#panel").width(w);
    $("#panel").width(winWidth).height(winHeight);
    if (chartPowerYear) {
    	chartPowerYear.resize();
    }
    if (chartTop10) {
    	chartTop10.resize();
    }
    if (chartPowerMonth12) {
    	chartPowerMonth12.resize();
    }
}

function setYear() {
	$.ajax({
		url: "../../Analyze/AnalyzeProcess.ashx",
		type: "post",
		data: {
			XuserId: xuserId,
			MethodName: "GetYears"
		},
		dataType: "json",
		success: function (jsData) {
			if ((jsData) && (jsData.length)) {
                var len = jsData.length;
                var jsonList = [];
				var html = "<ul >";
				for (var i = 0; i < len; i++) {
                    jsonList.push({Id:jsData[i],Name:jsData[i]+"年"});
					html += "<li id=\"lii" + i + "\" class=\"liYear ";
					if (jsData[i] == theYear) {
						html += " actived2 ";
					}
					html += "\" onclick=\"changeYear(" + i + "," + jsData[i] + ")\" ><div style=\"font-size:12px;text-align:center;\">" + jsData[i] + "</div></li>";
				}
				html += "</ul>";
                $("#divYear").html(html);
                var paramDdl = { jsonList: jsonList, fnInitial: InitialDdlYear };
                $("#ddlYear").dropDownList(paramDdl);
                $("#ddlYear").val(lastYear + "年").data("value", lastYear);
                var paramDdl2 = { jsonList: jsonList, fnInitial: InitialDdlYear2 };
                $("#ddlYear2").dropDownList(paramDdl2);
                $("#ddlYear2").val(lastYear + "年").data("value", lastYear);
                yearOk = true;
                if (yearOk && deptOk) {
                	refreshPage();
                }
			}
		}
	});
}

function InitialDdlYear(szdwDdl){
	szdwDdl.fnItemClick = function () {
		getChartTop10Data(chartTop10);
	}
}

function InitialDdlYear2(szdwDdl){
	szdwDdl.fnItemClick = function () {
		getConsumptionList();
	}
}

//#region 下拉框

//#region 部门列表下拉框
function BindDdlDepartment() {
	$.ajax({
		url: "../../Analyze/AnalyzeProcess.ashx",
		type: "post",
		data: {
			XuserId: xuserId,
			type: 1,
			MethodName: "GetDepartmentList"
		},
		dataType: "json",
		success: function (jsData) {
			if ((jsData) && (jsData instanceof Array)) {
				deptList.splice(0, deptList.length);
				var firstId=0, firstName="";
				var len = jsData.length;
				for (var i = 0; i < len; i++) {
					if (jsData[i].ParentId == 0) {
						firstId = jsData[i].Id;
						firstName = jsData[i].ShortName;
					}
					deptList.push({ Id: jsData[i].Id, Name: jsData[i].ShortName, ParentId: jsData[i].ParentId });
				}
				if ((firstId == 0)&&(jsData.length>0)) {
					firstId = jsData[0].Id;
					firstName = jsData[0].ShortName
				}
				var paramDdl = { jsonList: deptList, fnInitial: InitialDdlDepartment };
				$("#ddlDepartment").val(firstName).data("value", firstId);
				$("#ddlDepartment").dropDownList(paramDdl);
				deptId = firstId;
				var paramDdl1 = { jsonList: deptList, fnInitial: InitialDdlDepartment1 };
				$("#ddlDepartment1").val(firstName).data("value", firstId);
				$("#ddlDepartment1").dropDownList(paramDdl1);

				var paramDdl2 = { jsonList: deptList, fnInitial: InitialDdlDepartment2 };
				$("#ddlDepartment2").val(firstName).data("value", firstId);
				$("#ddlDepartment2").dropDownList(paramDdl2);
				deptOk = true;
				if (yearOk && deptOk) {
					refreshPage();
				}
			}
		}
	});
}
function InitialDdlDepartment(szdwDdl) {
	szdwDdl.nonCascadeItemLength = 20;
	szdwDdl.fnItemClick = function () {
		deptId = $("#ddlDepartment").data("value");
		$("#ddlDepartment1").data("value", deptId).val($("#ddlDepartment").val());
		$("#ddlDepartment2").data("value", deptId).val($("#ddlDepartment").val());
		refreshPage();
	}
}

function InitialDdlDepartment1(szdwDdl) {
	szdwDdl.nonCascadeItemLength = 20;
	szdwDdl.fnItemClick = function () {
		getChartTop10Data(chartTop10);
	}
}

function InitialDdlDepartment2(szdwDdl) {
	szdwDdl.nonCascadeItemLength = 20;
	szdwDdl.fnItemClick = function () {
		getConsumptionList();
	}
}
//#endregion

function BindDdlTheMonth() {
    var jsonList = getMonthList();
    jsonList.unshift({Id:0,Name:"全年"})
	var paramDdl = { jsonList: jsonList, fnInitial: InitialMonth };
	$("#ddlMonth").dropDownList(paramDdl);
    $("#ddlMonth").val("全年").data("value", 0);
    var paramDdl2 = { jsonList: jsonList, fnInitial: InitialMonth2 };
    $("#ddlMonth2").dropDownList(paramDdl2);
    $("#ddlMonth2").val("全年").data("value", 0);
}

function InitialMonth(szdwDdl) {
	szdwDdl.fnItemClick = function () {
		getChartTop10Data(chartTop10);
	}
}

function InitialMonth2(szdwDdl) {
	szdwDdl.fnItemClick = function () {
        getConsumptionList();
	}
}
//#endregion

function switchUpDown() {
	if (upDown == 1) {
		$("#imgUpDown").attr("src", "../../Image/UpDown/ArrowDown20B.png");
		$("#divPowerMonth12").hide();
		$("#divSumData").hide();
		upDown = 2;
	}
	else {
		$("#imgUpDown").attr("src", "../../Image/UpDown/ArrowUp20B.png");
		$("#divPowerMonth12").show();
		$("#divSumData").show();
		upDown = 1;
	}
}

function changeFirst(i) {
	curI = i;
	var id = "#Tabtab0" + i;
	$(id).parent().find('.textBox1').removeClass("actived1");
	$(id).addClass("actived1");
	getChartPowerMonth12Data(chartPowerMonth12);
}

function changeYear(i,year) {
	var id = "#lii" + i;
	$(id).parent().find('li').removeClass("actived2");
	$(id).addClass("actived2");
	theYear = year;
	getConsumptionSumData();
	getSummaryBaseCountData();
	getAbnormalCountData();
	getChartPowerMonth12Data(chartPowerMonth12);

}

function refreshPage(isFirst) {
	for (var i = 0; i < deptList.length; i++) {
		if (deptList[i].Id == deptId) {
			if (deptList[i].ParentId == 0) {
				$("#divConsumption").text("全省" + strConsumption);
				$("#divBase").text("全省" + strBase);
				$("#divCost").text("全省" + strCost);
				$("#divWarn").text("全省" + strWarn);
				$("#divYearSum").text("全省" + strYearSum);
				$("#divTop10").text("全省" + strTop10);
				$("#divMonthSum").text("全省" + strMonthSum);
				$("#divMonthSum").text("全省" + strMonthSum);
				$("#divAreaConsumption").text("全省" + strAreaConsumption);
			}
			else {
				$("#divConsumption").text("全市" + strConsumption);
				$("#divBase").text("全市" + strBase);
				$("#divCost").text("全市" + strCost);
				$("#divWarn").text("全市" + strWarn);
				$("#divYearSum").text("全市" + strYearSum);
				$("#divTop10").text("全市" + strTop10);
				$("#divMonthSum").text("全市" + strMonthSum);
				$("#divAreaConsumption").text("全市" + strAreaConsumption);
			}
		}
	}

    getConsumptionSumData(isFirst);
    getSummaryBaseCountData(isFirst);
    getAbnormalCountData(isFirst);

    getChartPowerMonth12Data(chartPowerMonth12, isFirst);
    getChartTop10Data(chartTop10, isFirst);
    getConsumptionList(isFirst);
    getTempWarnList(isFirst);
}

//#region 统计数字
function getConsumptionSumData(isFirst) {
	if (!isFirst) {
		//$("#task41").hide();
		//$("#task42").hide();
		$("#mask41").show();
		$("#mask42").show();
	}

    $.ajax({
        url: "../../Analyze/AnalyzeProcess.ashx",
        type: "post",
        data: {
            methodName: "QueryConsumptionSumList",
            deptId: deptId,
            theYear: theYear,
            isThis:1
        },
        dataType: "json",
        success: function (jsData) {
        	$("#task41").show();
        	$("#task42").show();
        	$("#mask41").hide();
        	$("#mask42").hide();
        	if ((jsData) && (jsData.length)) {
                //var consumption0, consumption1, consumption2;
                //var cost0, cost1, cost2;
                var len = jsData.length;
                var item1, item2;
                item1 = jsData[0];
                item2 = jsData[1];

                //#region 年累计电量
                var consumption0 = (item1.Consumption + item2.Consumption)/10000;//万度单位
                $("#divConsumption0").text(consumption0.toFixed(2));

                var spanConsumption1 = item1.Consumption / 10000;
                var spanConsumptionPercent1 = 0;
                if (consumption0 > 0) {
                	spanConsumptionPercent1 = spanConsumption1 / consumption0 * 100;
                }                
                var spanText1 = '直供电：' + spanConsumption1.toFixed(2) + ' 万度 , ' + spanConsumptionPercent1.toFixed(2) + "%";
                $("#spanConsumption1").text(spanText1);
                slideRight($('#zgdBar'), 0, spanConsumptionPercent1);

                var spanConsumption2 = item2.Consumption / 10000;
                var spanConsPercent2 = 0;
                if (consumption0 > 0) {
                	spanConsPercent2 = spanConsumption2 / consumption0 * 100;
                }                
                var spanText2 ='转供电：'+ spanConsumption2.toFixed(2) + ' 万度 , ' + spanConsPercent2.toFixed(2) + "%";
                $("#spanConsumption2").text(spanText2);
                //#endregion 年累计电量

                //#region 年累计电费
                var cost0 = (item1.Cost + item2.Cost) / 10000;//万度单位
                $("#divCost0").text(cost0.toFixed(2));

                var spanCost1 = item1.Cost / 10000;
                var spanCostPercent1 = 0;
                if (cost0 > 0) {
                	spanCostPercent1 = spanCost1 / cost0 * 100;
                }                
                var spanCostText1 = '直供电：' + spanCost1.toFixed(2) + ' 万元 , ' + spanCostPercent1.toFixed(2) + "%";
                $("#spanCost1").text(spanCostText1);
                slideRight($('#zgdCostBar'), 0, spanCostPercent1);

                var spanCost2 = item2.Cost / 10000;
                var spanCostPercent2 = 0;
                if (cost0 > 0) {
                	spanCostPercent2 = spanCost2 / cost0 * 100;
                }
                var spanCostText2 = '转供电：' + spanCost2.toFixed(2) + ' 万元 , ' + spanCostPercent2.toFixed(2) + "%";
                $("#spanCost2").text(spanCostText2);
            	//#endregion 年累计电费
            }
        }
    });
}

function slideRight(element, startWidth, endWidth) {
    var e = element;
    var w = startWidth;
    if (endWidth >= 0) {
        var w = 0;
        var t = setInterval(function () {
            $(e).css('width', w + '%');
            w++;
            if (w > endWidth) {
                clearInterval(t);
            }
        }, 10);
    }
    
}

function getSummaryBaseCountData(isFirst) {
	if (!isFirst) {
		$("#task43").hide();
		$("#mask43").show();
	}

    $.ajax({
        url: "../../Analyze/AnalyzeProcess.ashx",
        type: "post",
        data: {
            methodName: "QuerySummaryBaseCount",
            deptId: deptId,
            theYear: theYear,
            theMonth: theMonth
        },
        dataType: "json",
        success: function (jsData) {
        	$("#task43").show();
        	$("#mask43").hide();
			if (jsData) {
                var count = jsData.SumCount;
                $("#divBase0").text(count);

                var spanBase1 = jsData.DirectSupplyCount;
                var spanBasePercent1 = 0;
                if (count > 0) {
                	spanBasePercent1 = spanBase1 / count * 100;
                }                
                var spanBaseText1 = '直供电：' + spanBase1 + ' 个 , ' + spanBasePercent1.toFixed(2) + "%";
                $("#spanBase1").text(spanBaseText1);
                slideRight($('#zgdBaseBar'), 0, spanBasePercent1);

                var spanBase2 = jsData.IndirectSupplyCount;
                var spanBasePercent2 = 0;
                if (count > 0) {
                	spanBasePercent2 = spanBase2 / count * 100;
                }                
                var spanBaseText2 = '转供电：' + spanBase2 + ' 个 , ' + spanBasePercent2.toFixed(2) + "%";
                $("#spanBase2").text(spanBaseText2);

                //$("#spanUnpaidCount").text(jsData.SumCount - jsData.PaidCount);
                baseCount = count;
                if (warnCount > 0) {
                    var spanWarnPercent = warnCount / baseCount * 100;
                    var spanWarnText = '异常用电：' + warnCount + ' 个 , ' + spanWarnPercent.toFixed(2) + "%";
                    $("#spanWarn1").text(spanWarnText);
                    slideRight($('#zgdWarnBar'), 0, spanWarnPercent);
                }
            }
        }
    });
}
function getAbnormalCountData(isFirst) {
	if (!isFirst) {
		$("#task44").hide();
		$("#mask44").show();
	}

    $.ajax({
        url: "../../Analyze/AnalyzeProcess.ashx",
        type: "post",
        data: {
            methodName: "QueryAbnormalCount",
            deptId: deptId
        },
        dataType: "json",
        success: function (jsData) {
        	$("#task44").show();
        	$("#mask44").hide();
        	warnCount = jsData.AbnormalCount;
        	abnormalYear = jsData.Year;
        	abnormalMonth = jsData.Month;
            $("#divWarnCount").text(warnCount);
            var spanWarnPercent0 = 0;
            if (baseCount > 0) {
            	spanWarnPercent0 = warnCount / baseCount * 100;
            }
            var spanWarnText = '异常用电基站：' + warnCount + ' 个 , ' + spanWarnPercent0.toFixed(2) + "%";
            $("#spanWarn1").text(spanWarnText);
            slideRight($('#zgdWarnBar'), 0, spanWarnPercent0);
        }
    });
}
//#endregion

//#region 图表

//#region 图表 Top10 
function getChartTop10Data(chart, isFirst) {
	var deptId1 = $("#ddlDepartment1").data("value");
	var year = $("#ddlYear").data("value");//strMonth.substr(0, 4);
    var month0 = $("#ddlMonth").data("value");//strMonth.substr(4, 2);
    var month1 = month0;
    if (month0 == "0") {
    	month0 = 1;
        month1 = 12;
    }
    //if (!isFirst) {
		$("#mask2").show();
    //}
    $.ajax({
        url: "../../Analyze/AnalyzeProcess.ashx",
        type: "post",
        data: {
            methodName: "QueryConsumptionAvg0",
            deptId: deptId1,
			supplyTypeId:0,
            beginYear: year,
            beginMonth: month0,
            endYear: year,
            endMonth: month1,
			isLog:0,
            orderField: "Consumption",
            orderType: "DESC"
        },
        dataType: "json",
        success: function (jsData) {
			$("#mask2").hide();
			if ((jsData) && (jsData instanceof Array)) {
				var len = jsData.length;
				len = len > 10 ? 10 : len;
                var dataList = [];
                for (var i = 0; i < len; i++) {
                    dataList.push(jsData[i]);
                }
                refreshChartTop10(chart,dataList);
            }
        }
    });
}

function refreshChartTop10(chart,dataList) {
    var dataAxis = [];
    var data1 = { name: "电量", type: "bar", barMaxWidth:20, areaStyle: { normal: { opacity: 0.20 } }, smooth: true, data: [] };
    //var legendData = ["电量"];
    var len = dataList.length;

    if (len === 1) {
        data1.barMaxWidth = 40;
    }

    for (var i = len - 1; i >= 0; i--) {
        var item = dataList[i];
        dataAxis.push(item.DepartmentName);
        data1.data.push(Math.round(item.Consumption/10000*100)/100);
    }

    var option = {
		color:color,
        toolbox: {
            top:"10px",
            right: "45px",
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            top: "20px",
            left: '30px',
            right: '85px',
            bottom: '10px',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            padding: [0, 5, 0, 5]
        },
        //legend: {
        //	top: "5px",
        //	orient: 'horizontal',
        //	data: legendData
        //},
        xAxis: {
            name: "万度",
            type: "value"
        },
        yAxis: {
            type: 'category',
            boundaryGap: true,
            data: dataAxis
        },
        series: []
    };
    option.series.push(data1);
    //chartTop10.clear();
    //chartTop10.setOption(option);
    chart.clear();
    chart.setOption(option);
}
//#endregion

//#region 图表 月度用电
function getChartPowerMonth12Data(chart,isFirst) {
	//if (!isFirst) {
		$("#mask1").show();
	//}

    $.ajax({
        url: "../../Analyze/AnalyzeProcess.ashx",
        type: "post",
        data: {
        	methodName: "QueryConsumptionYear0",
        	deptId: deptId,
			SupplyTypeId:0,
			theYear: theYear,
			isLog:0
        },
        dataType: "json",
        success: function (jsData) {
        	if ((jsData) && (jsData.length)) {
				$("#mask1").hide();
            	refreshChartPowerMonth12(chart, jsData);
            }
        }
    });
}

function refreshChartPowerMonth12(chart, dataList) {
	var t;
	if (curI == 1) {
		t = 'line';
	}
	else {
		t = 'bar';
	}
    var dataAxis = [];
    var data1 = {
        name: "电量", type: t, areaStyle: { normal: { opacity: 0.20 } }, smooth: true, data: [],
        markLine: { data: [{ type: 'average', name: '平均值' }] },
        markPoint: { symbol: "pin", symbolSize: [150, 40], symbolRotate: "0", data: [{ name: '最小值', type: 'min' }, { name: '最大值', type: 'max' }] }
    };
    var data2 = {
        name: '电费', type: t, areaStyle: { normal: { opacity: 0.20 } }, smooth: true, data: [],
        markLine: {data: [{ type: 'average', name: '平均值' }]},
        markPoint: { symbol: "pin", symbolSize: [150, 40], symbolRotate: "0", data: [{ name: '最小值', type: 'min' }, { name: '最大值', type: 'max' }] }
    };
    var legendData = ["电量","电费"];
    var len = dataList.length;
			
    if (len === 1) {
        data1.barMaxWidth = 40;
        data2.barMaxWidth = 40;
    }

    for (var i=0;i<len-1;i++) {
        var item = dataList[i];
        dataAxis.push(item.CNMonth);
        data1.data.push(Math.round(item.Consumption/10000*100)/100);
        data2.data.push(Math.round(item.Cost/10000*100)/100);
    }

    var option = {
		color:color,
        toolbox: {
            top:"3px",
            right:"45px",
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            top: "40px",
            left: '20px',
            right: '80px',
            bottom: '10px',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            padding: [0, 5, 0, 5]
        },
        legend: {
        	top: "10px",
			right:"80px",
        	data: legendData
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            axisLabel:{interval:0},
            data: dataAxis
        },
        yAxis: {
            name: "万度/万元",
            type: "value"
        },
        series: []
    };
    option.series.push(data1);
    option.series.push(data2);
    chart.clear();
    chart.setOption(option);
	//chartPowerMonth12.clear();
    //chartPowerMonth12.setOption(option);
}
//#endregion

//#endregion 图表

//#region 列表

function getConsumptionList() {
	$("#mask3").show();
	var deptId = $("#ddlDepartment2").data("value");
    var year = $("#ddlYear2").data("value");
    var month0 = $("#ddlMonth2").data("value");
    var month1 = month0;
    if (month0 == "0") {
    	month0 = 1;
    	month1 = 12;
    }
    var paramJson = { xuserId: xuserId };
    paramJson["deptId"] = deptId;
    paramJson["beginYear"] = year;
    paramJson["beginMonth"] = month0;
    paramJson["endYear"] = year;
    paramJson["endMonth"] = month1;
    paramJson["isLog"] = 0;
    paramJson["MethodName"] = "QueryConsumptionMonthList0";
	
	$.ajax({
		url: "../../Analyze/AnalyzeProcess.ashx",
		type: "post",
		data: paramJson,
		dataType: "json",
		success: function (jsData) {
			$("#mask3").hide();
			if ((jsData) && (jsData.length)) {
				dataList = jsData;
				refreshData(deptId);

			}
		}
	});
}

function refreshData(deptId) {
	var list = dataList;
	var len = list.length;
	var strRet = "";
	var strHeader = "<div"
	if (list.length/3 <= 7) {
		strHeader += " class=\"table-body\" "
	}
	else {
		strHeader += " class=\"table-head\" "
	}
	strHeader += "style=\"height:60px;border-top:1px dotted #ccc;border-right:1px dotted #ccc;overflow-y:auto;\">"
	strHeader += "<table class='grid' style=\"margin-top:-3px;\">";
	strHeader += "<colgroup>";
	strHeader += "<col /><col style=\"width: 100px;\" /><col style=\"width: 100px;\" />";
	strHeader += "<col style=\"width: 100px;\" /><col style=\"width: 100px;\" /><col style=\"width: 100px;\" /><col style=\"width: 100px;\" />";
	strHeader += "</colgroup>";
	strHeader += "<tr><td style=\"text-align:center;\" rowspan=\"2\">单位</td><td colspan=\"2\" style=\"text-align:center;\">总用电</td>";
	strHeader += "<td colspan=\"2\" style=\"text-align:center;\">其中:直供电</td><td colspan=\"2\" style=\"text-align:center;\">其中:转供电</td></tr>";
	strHeader += "<tr>";
	strHeader += "<td width='100px' style=\"text-align:center;\">电量(万度)</td><td width='100px' style=\"text-align:center;\">电费(万元)</td>";
	strHeader += "<td width='100px' style=\"text-align:center;\">电量(万度)</td><td width='100px' style=\"text-align:center;\">电费(万元)</td>"
	strHeader += "<td width='100px' style=\"text-align:center;\">电量(万度)</td><td width='100px' style=\"text-align:center;\">电费(万元)</td>";
	strHeader += "</tr></table></div>";
	strHeader += "<div class=\"table-body\" style=\"height:220px;border-top:1px dotted #ccc;border-bottom:1px dotted #ccc;border-left:1px dotted #ccc;border-right:1px dotted #ccc;overflow-y:auto;\">"
	strHeader += "<table class='grid' style=\"margin-top:-3px;\">";
	strHeader += "<colgroup>";
	strHeader += "<col /><col style=\"width: 100px;\" /><col style=\"width: 100px;\" />";
	strHeader += "<col style=\"width: 100px;\" /><col style=\"width: 100px;\" /><col style=\"width: 100px;\" /><col style=\"width: 100px;\" />";
	strHeader += "</colgroup>";
	var str = "";
	var str0 = "";
	var str1 = "";
	var str2 = "";
	var strHJ0 = "";
	var strRise0 = "";
	var last = "0";
	var strSub = "";
	for (var i = 0; i < len; i++) {
		var item = list[i]
		if (item.DepartmentId != last) {
			if (last != "0") {
				if (last != deptId) {
					strSub += str + str0 + str1 + str2 + "</tr>";
					

				}
				else {
					strHeader += str + str0 + str1 + str2 + "</tr>";
				}
				str0 = "";
				str1 = "";
				str2 = "";
			}

			last = item.DepartmentId;
			str = "<tr><td><div style=\"padding-left:3px;\">" + item.DepartmentName + "</div></td>";
		}
		
		switch (item.SupplyTypeId) {
			case 0:
				str0 += "<td width='100px' style=\"text-align:right;\"><div style=\"padding-right:3px;\">" + Math.round(item.Consumption / 10000 * 100) / 100 + "</div></td>";
				str0 += "<td width='100px' style=\"text-align:right;\"><div style=\"padding-right:3px;\">" + Math.round(item.Cost / 10000 * 100) / 100 + "</div></td>";
				break;
			case 1:
				str1 += "<td width='100px' style=\"text-align:right;\"><div style=\"padding-right:3px;\">" + Math.round(item.Consumption / 10000 * 100) / 100 + "</div></td>";
				str1 += "<td width='100px' style=\"text-align:right;\"><div style=\"padding-right:3px;\">" + Math.round(item.Cost / 10000 * 100) / 100 + "</div></td>";
				break;
			case 2:
				str2 += "<td width='100px' style=\"text-align:right;\"><div style=\"padding-right:3px;\">" + Math.round(item.Consumption / 10000 * 100) / 100 + "</div></td>";
				str2 += "<td width='100px' style=\"text-align:right;\"><div style=\"padding-right:3px;\">" + Math.round(item.Cost / 10000 * 100) / 100 + "</div></td>";
				break;
		}
	}
	if (last != deptId) {
		strSub += str + str0 + str1 + str2 + "</tr>";
	}
	else {
		strHeader += str + str0 + str1 + str2 + "</tr>";
	}
	strHeader += strSub + "</table>"
	$("#divAreaConsumptionList").html(strHeader);
}

function getTempWarnList() {
	$.ajax({
		url: "../../Analyze/AnalyzeProcess.ashx",
		type: "post",
		data: {
			methodName: "QueryTempWarnList",
			deptId: deptId,
			topN: 0
		},
		dataType: "json",
		success: function (jsData) {
			if (jsData) {
				var html = "<div"
				if (jsData.length <= 10) {
					html += " class=\"table-body\" "
				}
				else {
					html += " class=\"table-head\" "
				}
				//var html = "<div class=\"table-body\" "
				html += "style=\"height:31px;border-top:1px dotted #ccc;border-right:1px dotted #ccc;overflow-y:auto;\">"
				html += "<table class='grid' style=\"margin-top:-3px;\">";
				html += "<colgroup>";
				html += "<col /><col style=\"width: 160px;\" /><col style=\"width: 80px;\" /><col style=\"width: 90px;\" />";
				html += "</colgroup>";
				html += "<tr><td style=\"text-align:center;\">站点名称</td><td style=\"text-align:center;width: 160px;\">站点编号</td>";
				html += "<td style=\"text-align:center;width: 80px;\">电量</td>";
				html += "<td style=\"text-align:center;width: 80px;\">单位</td><td style=\"text-align:center;width: 80px;\">月份</td></tr>";
				html += "</table></div>";
				html += "<div class=\"table-body\" style=\"height:155px;border-top:1px dotted #ccc;border-bottom:1px dotted #ccc;border-left:1px dotted #ccc;border-right:1px dotted #ccc;overflow-y:auto;\">";
				html += "<table class='grid' style=\"margin-top:-3px;\">";
				html += "<colgroup>";
				html += "<col /><col style=\"width: 160px;\" /><col style=\"width: 80px;\" /><col style=\"width: 90px;\" />";
				html += "</colgroup>";
				//html = "<div class=\"table-body\" style=\"height:345px;overflow:hidden;\">";
				//html += "<table class='grid' style='width:98%;margin:0 5px 0 5px;'>";
				//"<tr><td></td><td></td></tr>"
				//html += "<tbody>";
				for (var i = 0; i < jsData.length; i++) {
					html += "<tr onclick=\"openDetailsWin('PowerAbnormal.html','查看用电异常详情'," + jsData[i].Id + ",660,320)\">";// onclick=\"openDetailsWin('','查看用电异常详情',"+jsData.Id+")\">";
					html += "<td style=\"padding-left:10px;\">" + jsData[i].BaseStationName + "</td>";
					html += "<td width='160px'>" + jsData[i].BaseStationNumber + "</td>";
					html += "<td width='80px'>" + jsData[i].Consumption + "</td>";
					html += "<td width='80px'>" + jsData[i].DepartmentName + "</td>";
					html += "<td width='80px' style='text-align:center'>" + jsData[i].TheMonth + "</td>";
					html += "</tr>"
				}
				html += "</tbody>";
				html += "</table>";
				html += "</div>";
				$("#divWarnList").html(html);
			}
		}
	});
}

function openDetailsWin(pageUrl, titleText, id, width, height) {
    var paramJson = {id:id};
    var body = document.body
    var bw = $(body).width();
    var bh = $(body).height();
    var w = width;
    var h;
    if (height) {
        h = height;
    }
    else {
        h = bh / 5 * 3;
    }
			
    var x = (bw - w) / 2;
    var y = (bh - h) / 2;
    var oJson = {
        pagePanelBackColor: "White",
        hasLoadingAnimation: false,
        hasBtnMinimize: false,
        hasBtnWinsize: false
    };
    document.body.detailWindow = SzdwCommon.openViewWindowAssignObj(document.body.detailWindow, pageUrl, paramJson, titleText, x, y, w, h, oJson);
}

//#endregion

//#region 弹窗

function popWin(path,title) {
    var url = "FrameProcess.ashx";
    var paramJson = { "xuserId": xuserId, path: path, MethodName: "GetPageResourceIdByPath" };
    $.ajax({
        url: url
        , type: "post"
        , data: paramJson
        , dataType: "json"
        , success: function (data) {
            var permList = [];
            if (permissionList) {
                $.each(permissionList, function (index, item) {
                    if (item["ResourceId"] == data) {
                        permList.push(item);
                    }
                });
            }
            var pageUrl = "../" + path.replace("../", "").replace("/Web/", "").replace("Web/", "");
            var paramJson = {
            	year: abnormalYear,
				month:abnormalMonth,
                xuserId: parent.xuserId,
                xmenuId: 0,
                departmentId: parent.departmentId,
                department: parent.department,
                employeeId: parent.employeeId,
                xuserName: parent.xuserName,
                permissionJsonList: permList
            };
            var body = document.body;
            var bh = $(body).height();
            var wHeight = bh / 5 * 3;
            CreateWin(pageUrl, paramJson, title, 850, wHeight);
        }
    });
}

function CreateWin(pageUrl, paramJson, title, wWidth, wHeight) {
    var body = document.body
    var bw = $(body).width();
    var bh = $(body).height();
    var w = wWidth;
    var h = wHeight;;
    var x = (bw - w) / 2;
    var y = (bh - h) / 2;
    var oJson = {
        pagePanelBackColor: "White",
        hasLoadingAnimation: false,
        hasBtnMinimize: true,
        hasBtnWinsize: true
    };
    document.body.showWindow = SzdwCommon.openViewWindowAssignObj(document.body.showWindow, pageUrl, paramJson, title, x, y, w, h, oJson);
}
//#endregion