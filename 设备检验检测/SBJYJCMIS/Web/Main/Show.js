//#region 全局变量
var urlParm, xuserId, xmenuId, permission = null;
var color = ['#ef473a', '#336699', '#da70d6', '#32cd32', '#6495ed',
             '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
             '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
             '#6699FF', '#ff6666', '#3cb371', '#b8860b', '#30e0e0'
];

var panelMinWidth = 800;
var chartReport;
var thisYear,theYear;
var isThis = 1;
var permissionList;
var curAnalyze=0,curType = 0;
var mask1l, mask1t;
var mask2l, mask2t;
var mask31l, mask31t, mask32l, mask32t, mask33l, mask33t, mask34l, mask34t;
var upDown = 1,upDown0=0;
var bodyWidth, bodyHeight;
var set;
//#endregion 全局变量

$(function () {
    //bodyWidth = Math.max($(document.body).width(), minWidth);
    //bodyHeight = Math.max($(document.body).height(), minHeight);
    bodyWidth = $(document.body).width();
    bodyHeight = $(document.body).height();
    InitXuserInfo();

    var theDate = new Date();
    var date = theDate.getDate();
    thisYear = theDate.getFullYear();
    theYear = thisYear;
    getSetting();
    chartReport = echarts.init(document.getElementById("chartReport"));
    setPanel();

    $(window).resize(function () {
        //bodyWidth = Math.max($(document.body).width(), minWidth);
        //bodyHeight = Math.max($(document.body).height(), minHeight);
        bodyWidth = $(document.body).width();
        bodyHeight = $(document.body).height();
        setPanel();
        ResizeControls();
        RepositionControls();
    });
});

function RepositionControls() {
    var t = document.body;
    var ww = t.warnWindow;
    var nw = t.noticeWindow;
    var wx, wy;
    if (ww) {
        wx = ww.x;
        //if (ww.x + ww.width >= bodyWidth) {
            wx = bodyWidth - ww.width;
        //}
        wy = ww.y;
        if ((ww.y + ww.height >= bodyHeight) || (wx >= bodyWidth - ww.width)) {
            if (nw) {
                wy = bodyHeight - ww.height-nw.height;
            }
        }
        ww.RePosition(wx, wy);
    }
    
    var nx, ny;
    if (nw) {
        nx = nw.x;
        //if (nw.x + nw.width >= bodyWidth) {
            nx = bodyWidth - nw.width;
        //}
        ny = nw.y;
        if ((nw.y + nw.height >= bodyHeight) || (nx >= bodyWidth - nw.width)) {
            ny = bodyHeight - nw.height;
        }
        nw.RePosition(nx, ny);
    }
}
function ResizeControls() {
    var t = document.body;
    var ww = t.warnWindow;
    var www, wwh;
    if (ww) {
        www = ww.width;
        wwh = ww.height;
        if (www > bodyWidth) {
            www = bodyWidth;
        }
        if (wwh > bodyHeight) {
            wwh = bodyHeight;
        }
        ww.ReSize(www, wwh);
    }
    var nw = t.noticeWindow;
    var nww, nwh;
    if (nw) {
        nww = nw.width;
        nwh = nw.height;
        if (nww > bodyWidth) {
            nww = bodyWidth;
        }
        if (nwh > bodyHeight) {
            nwh = bodyHeight;
        }
        nw.ReSize(nww, nwh);
    }
}
function InitXuserInfo() {
    urlParm = $.parseJSON(SzdwCommon.getUrlParam("paramJson"));
    xuserId = urlParm.xuserId;
    xmenuId = urlParm.xmenuId;
    permission = SzdwCommon.getPermission(urlParm.permissionJsonList);
    permissionList = parent.permissionList;
}

function getSetting() {
    $.ajax({
        url: "../Setting/SettingHandler.ashx",
        type: "post",
        data: {
            xuserId: xuserId,
            MethodName: "GetSetting"
        },
        dataType: "json",
        success: function (jsData) {
            if (jsData) {
                set = jsData;
                getTheYearList();
                var body = document.body
                var bw = $(body).width();
                var bh = $(body).height();
                var paramJson = { xuserId: xuserId };
                var w = 550;
                var wh = 0,nh = 0;
                var x = bw;
                var y = 0;

                if (set.IsWarnWin) {
                    wh = jsData.IsMinWarnWin ? 120 : bh / 2;
                    y = bh - wh;
                    CreateWarnWin("expirealert1.html", paramJson, "检验报告到期预警", bw, x, y, w, wh);
                }                
                if (set.IsNoticeWin) {
                    nh = jsData.IsMinNoticeWin ? 120 : bh / 2;
                    y = bh - nh;
                    if (set.IsWarnWin) {
                        $(document.body.warnWindow.panel).animate({ "top": y - wh }, 500, null, null);
                    }
                    CreateNoticeWin("NoticeList.html", paramJson, "公告通知", bw, x, y, w, nh);
                }
                getExpireEquipment();
                getNoticeList();
                if (!(set.IsWarnWin && set.IsNoticeWin)) {
                    $("#divList").show();
                    upDown0 = 1;
                    switchUpDown0(upDown0);
                }
            }
        }
    });
}

function getTheYearList() {
    $.ajax({
        url: "../Analyze/AnalyzeHandler.ashx",
        type: "post",
        data: {
            XuserId: xuserId,
            MethodName: "GetAnalyzeYearList"
        },
        dataType: "json",
        success: function (jsData) {
            if ((jsData) && (jsData instanceof Array)) {
                var isActive = false;
                var len = jsData.length;
                var jsonList = [];
                var html0 = "", html1 = "";
                
                for (var i = 0; i < len; i++) {
                    jsonList.push({ Id: jsData[i], Name: jsData[i] + "年" });
                    html1 += "<li id=\"lii" + (i+1) + "\" class=\"liYear ";
                    if (jsData[i] == thisYear) {
                        html1 += " actived2 ";
                        isActive = true;
                    }
                    html1 += "\" onclick=\"changeYear(" + i + "," + jsData[i] + ")\" ><div style=\"font-size:12px;text-align:center;\">" + jsData[i] + "</div></li>";
                }

                html0 += "<li id=\"lii0\" class=\"liYear ";
                if (!isActive) {
                    html0 += " actived2";
                    theYear = 0;
                }
                html0 += "\" onclick=\"changeYear(0,0)\" ><div style=\"font-size:12px;text-align:center;\">全部</div></li>";;

                $("#divYear").html("<ul>" + html0 + html1 + "</ul>");

                showData();
            }
        }
    });
}

function changeYear(i, year) {
    var id = "#lii" + i;
    $(id).parent().find('li').removeClass("actived2");
    $(id).addClass("actived2");
    theYear = year;
    showData();
}

function showData() {
    getAnalyzeCountInfo();
    showChart();
}

function showChart() {
    if (curAnalyze == 0) {
        $.ajax({
            url: "../Analyze/AnalyzeHandler.ashx",
            type: "post",
            data: {
                theYear:theYear,
                MethodName:"GetAnalyzeByEquipmentType"
            },
            dataType: "json",
            success: function (jsData) {
                if ((jsData) && (jsData instanceof Array)) {
                    var len = jsData.length;
                    var list = [];
                    for (var i = 0; i < len; i++) {
                        list.push(jsData[i]);
                    }
                    refreshEquipmentTypeChart(list);
                }
            }
        });
    }
    else {
        $.ajax({
            url: "../Analyze/AnalyzeHandler.ashx",
            type: "post",
            data: {
                theYear:theYear,
                MethodName: "GetAnalyzeByJC"
            },
            dataType: "json",
            success: function (jsData) {
                if ((jsData) && (jsData instanceof Array)) {
                    var len = jsData.length;
                    var list = [];
                    for (var i = 0; i < len; i++) {
                        list.push(jsData[i]);
                    }
                    refreshJCChart(list);
                }
            }
        });
    }
}

function refreshEquipmentTypeChart(list) {
    var t
    if (curType == 0) {
        t = 'bar';
    }
    else {
        t = 'line';
    }
    var dataAxis = [];
    var data1 = { name: '报告个数', type: t, areaStyle: { normal: { opacity: 0.20 } }, smooth: true, data: [] };
    var len = list.length;
    if (len == 1) {
        data1.barMaxWidth = 40;
    }
    for (var i = 0; i < len; i++) {
        var item = list[i];
        dataAxis.push(item.ItemName);
        data1.data.push(item.Count);
    }

    var option = {
        color: ['#3398DB'],
        toolbox: {
            top: "10px",
            right: "45px",
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '20px',
            right: '30px',
            bottom: '20px',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            padding: [0, 5, 0, 5]
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: dataAxis
        },
        //配置y轴
        yAxis: {
            type: 'value',
            name: "个"
        },
        series: []
    };

    option.series.push(data1);
    chartReport.clear();
    chartReport.setOption(option);
    //$("#mask2").hide();
}

function refreshJCChart(list) {
    var t
    if (curType == 0) {
        t = 'bar';
    }
    else {
        t = 'line';
    }
    var dataAxis = [];
    var data1 = { name: '报告个数', type: t, areaStyle: { normal: { opacity: 0.20 } }, smooth: true, data: [] };
    var len = list.length;

    for (var i = 0; i < len; i++) {
        var item = list[i];
        dataAxis.push(item.ItemName);
        data1.data.push(item.Count);
    }

    var option = {
        color: ['#3398DB'],
        toolbox: {
            top: "10px",
            right: "45px",
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '20px',
            right: '30px',
            bottom: '20px',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            padding: [0, 5, 0, 5]
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: dataAxis
        },
        //配置y轴
        yAxis: {
            type: 'value',
            name: "个"
        },
        series: []
    };
    option.series.push(data1);
    chartReport.clear();
    chartReport.setOption(option);
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
    if (chartReport) {
        chartReport.resize();
    }
}

function switchUpDown() {
	if (upDown == 1) {
		$("#imgUpDown").attr("src", "../Styles/image/button/arrowDown20B.png");
		$("#divSumData").hide();
		upDown = 2;
	}
	else {
		$("#imgUpDown").attr("src", "../Styles/image/button/arrowUp20B.png");
		$("#divSumData").show();
		upDown = 1;
	}
}

function switchUpDown0(i) {
    if (i) {
        upDown0 = 1 - i;
    }
    
    if (upDown0 == 1) {
        $(".imgUpDown0").attr("src", "../Styles/image/button/arrowDown20B.png");
        $("#divExpire").hide();
        $("#divNotice").hide();
        upDown0 = 2;
    }
    else {
        $(".imgUpDown0").attr("src", "../Styles/image/button/arrowUp20B.png");
        $("#divExpire").show();
        $("#divNotice").show();
        upDown0 = 1;
    }
}

function changeType(i) {
    var list = $(".tabPanel").children();
    list.removeClass("tabActived");
    $(list[i]).addClass("tabActived");
	curType = i;
	//var id = "#tabType0" + i;
	//$(id).parent().find('.textBox1').removeClass("actived1");
	//$(id).addClass("actived1");
	showChart();
}

function changeAnalyze(i) {
    var list = $(".tabPanel1").children();
    list.removeClass("tabActived");
    $(list[i]).addClass("tabActived");
    curAnalyze = i;
    //var id = "#tabAnalyze0" + i;
    //$(id).parent().find('.textBox1').removeClass("actived1");
    //$(id).addClass("actived1");
    showChart();
}

//#region 统计数字
function getAnalyzeCountInfo(isFirst) {
	if (!isFirst) {
		//$("#task41").hide();
		//$("#task42").hide();
		$("#mask41").show();
		$("#mask42").show();
		$("#mask43").show();
	}

    $.ajax({
        url: "../../Analyze/AnalyzeHandler.ashx",
        type: "post",
        data: {
            theYear:theYear,
            methodName: "GetAnalyzeCountInfo"
        },
        dataType: "json",
        success: function (jsData) {
        	$("#task41").show();
        	$("#task42").show();
        	$("#task43").show();
        	$("#mask41").hide();
        	$("#mask42").hide();
        	$("#mask43").hide();
        	if (jsData) {
                var sumCount = jsData.SumCount;
                $("#divSumCount").text(sumCount);

                var spanUseCountPercent = 0;
                if (sumCount > 0) {
                    spanUseCountPercent = jsData.UseCount / sumCount * 100;
                }                
                var spanText1 = '在用设备总数：' + jsData.UseCount + ' 个 , ' + spanUseCountPercent.toFixed(0) + "%";
                $("#spanUseCount").text(spanText1);
                slideRight($('#zgdSumBar'), 0, spanUseCountPercent);

                var spanNotUseCountPercent = 0;
                if (sumCount > 0) {
                    spanNotUseCountPercent = (sumCount - jsData.UseCount) / sumCount * 100;
                }                
                var spanText2 = '未用设备总数：' + (sumCount - jsData.UseCount) + ' 个 , ' + spanNotUseCountPercent.toFixed(0) + "%";
                $("#spanNotUseCount").text(spanText2);
                //#endregion

        	    //#region 年累计电费
                $("#divUseCount").text(jsData.UseCount);

                var spanReportCountPercent = 0;
                if (jsData.UseCount > 0) {
                    spanReportCountPercent = jsData.ReportCount / jsData.UseCount * 100;
                }                
                var spanReportCountText = '有效期内设备总数：' + jsData.ReportCount + ' 个 , ' + spanReportCountPercent.toFixed(0) + "%";
                $("#spanReportCount").text(spanReportCountText);
                slideRight($('#zgdReportBar'), 0, spanReportCountPercent);

                var spanNotReportCostPercent = 0;
                if (jsData.UseCount > 0) {
                    spanNotReportCountPercent = (jsData.UseCount - jsData.ReportCount) / jsData.UseCount * 100;
                }
                var spanNotReportCountText = '超期设备总数：' + (jsData.UseCount - jsData.ReportCount) + ' 个 , ' + spanNotReportCountPercent.toFixed(0) + "%";
                $("#spanNotReportCount").text(spanNotReportCountText);
        	    //#endregion 年累计电费

        	    //#region 总报告数
                var sumCount = jsData.InnerCount + jsData.OuterCount;
                $("#divSumReportCount").text(sumCount);

                var spanRegionCount0Percent = 0;
                if (sumCount > 0) {
                    spanInnerCountPercent = jsData.InnerCount / sumCount * 100;
                }
                var spanInnerCountText = '省内机构检测数量：' + jsData.InnerCount + ' 个 , ' + spanInnerCountPercent.toFixed(0) + "%";
                $("#spanInnerCount").text(spanInnerCountText);

                slideRight($('#zgdRegionBar'), 0, spanInnerCountPercent);

                var spanOuterCountPercent = 0;
                if (sumCount > 0) {
                    spanOuterCountPercent = jsData.OuterCount / sumCount * 100;
                }
                var spanOuterCountText = '省外机构检测数量：' + jsData.OuterCount + ' 个 , ' + spanOuterCountPercent.toFixed(0) + "%";
                $("#spanOuterCount").text(spanOuterCountText);
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
//#endregion
//#region 列表
function getExpireEquipment() {
    $.ajax({
        url: "../Analyze/AnalyzeHandler.ashx",
        type: "post",
        data: {
            xuserId:0,
            MethodName: "GetExpireEquipment"
        },
        dataType: "json",
        success: function (jsData) {
            if (jsData instanceof Array) {
                refreshData(jsData);
            }
        }
    });
}
function refreshData(list) {
    var len = list.length;
    var s = "";
	var strHeader = "<div"
	if (list.length <= 7) {
	    strHeader += " class=\"table-body\" "
	    if (list.length == 0) {
	        strHeader += "style=\"height:31px;border-top:1px dotted #ccc;border-right:1px dotted #ccc;overflow-y:none;overflow-x:none;\">"
	    } else {
	        strHeader += "style=\"height:31px;border-top:1px dotted #ccc;border-right:1px dotted #ccc;overflow-y:none;overflow-x:none;\">"
	    }
	} else {
	    strHeader += " class=\"table-head\" "
	    strHeader += "style=\"height:31px;border-top:1px dotted #ccc;border-right:1px dotted #ccc;overflow-y:none;overflow-x:none;\">"
	}

	strHeader += "<table class='grid' style=\"margin-top:-3px;\">";
	strHeader += "<colgroup>";
	strHeader += "<col style=\"width: 40px;\" /><col style=\"width: 140px;\" /><col style=\"width: 60px;\" /><col style=\"width: 80px;\" />";
	strHeader += "<col style=\"width: 80px;\" /><col style=\"width: 100px;\" /><col style=\"width: 80px;\" />";
	strHeader += "</colgroup>";
	strHeader += "<tr>";
	strHeader += "<td width='40px' style=\"text-align:center;\">序号</td><td width='140px' style=\"text-align:center;\">煤矿</td><td width='60px' style=\"text-align:center;\">预警状态</td><td width='80px' style=\"text-align:center;\">设备编号</td>";
	strHeader += "<td width='80px' style=\"text-align:center;\">设备类型</td><td width='100px' style=\"text-align:center;\">安装地点</td><td width='80px' style=\"text-align:center;\">有效期止</td>";
	strHeader += "</tr></table></div>";
	strHeader += "<div class=\"table-body\" style=\"height:250px;border-top:1px dotted #ccc;border-bottom:1px dotted #ccc;border-left:1px dotted #ccc;border-right:1px dotted #ccc;overflow-y:auto;\">"
	strHeader += "<table class='grid' style=\"margin-top:-3px;\">";
	strHeader += "<colgroup>";
	strHeader += "<col style=\"width: 40px;\" /><col style=\"width: 140px;\" /><col style=\"width: 60px;\" /><col style=\"width: 80px;\" />";
	strHeader += "<col style=\"width: 80px;\" /><col style=\"width: 100px;\" /><col style=\"width: 80px;\" />";
	strHeader += "</colgroup>";
	var str = "";
	for (var i = 0; i < len; i++) {
		var item = list[i]
		str  = "<tr>";
		str += "<td><div style=\"width:40px;text-align:center;\">" + item.RowNumber + "</div></td>";
		str += "<td><div style=\"width: 140px;\">" + item.MineName + "</div></td>";
		switch (item.RunStatus) {
		    case -1:
		        s = "<span style=\"color:red;\"><b>逾期</b></span>";
		        break;
		    case 0:
		        s = "<span style=\"color:green;\">正常</span>"
		        break;
		    case 1:
		        s = "<span style=\"color:orange;\">一级预警</span>"
		        break
		    case 2:
		        s = "<span style=\"color:orange;\">二级预警</span>"
		        break
		    case 3:
		        s = "<span style=\"color:orange;\">三级预警</span>"
		        break
		}
		str += "<td><div style=\"width: 60px;\">" + s + "</div></td>";
		str += "<td><div style=\"width: 80px;\">" + item.ModelNumber + "</div></td>";
		str += "<td><div style=\"width: 80px;\">" + item.EquipmentType + "</div></td>";
		str += "<td><div style=\"width: 100px;\">" + item.UsingLocation + "</div></td>";
		str += "<td><div style=\"width: 80px;\">" + item.ValidEndDate.substring(0, item.ValidEndDate.indexOf("T")) + "</div></td>";
		str += "</tr>";
		strHeader += str;
	}
	strHeader += "</table>"
	$("#divExpireEquipment").html(strHeader);
}
function getNoticeList() {
	$.ajax({
		url: "../Notice/NoticeHandler.ashx",
		type: "post",
		data: {
		    methodName: "GetNoticeTopNList",
		    xuserId: xuserId,
            theType:1,
			topN: 10
		},
		dataType: "json",
		success: function (jsData) {
			if (jsData) {
				var html = "<div"
				if (jsData.length <= 8) {
					html += " class=\"table-body\" "
				}
				else {
					html += " class=\"table-head\" "
				}
				//var html = "<div class=\"table-body\" "
				html += "style=\"height:31px;border-top:1px dotted #ccc;border-right:1px dotted #ccc;overflow-y:auto;\">"
				html += "<table class='grid' style=\"margin-top:-3px;\">";
				html += "<colgroup>";
				html += "<col style=\"width: 40px;\" /><col /><col style=\"width: 40px;\" /><col style=\"width: 80px;\" />";
				html += "</colgroup>";
				html += "<tr><td style=\"text-align:center;width: 40px;\">序号</td><td style=\"text-align:center;\">标题</td><td style=\"text-align:center;width: 40px;\">附件</td><td style=\"text-align:center;width: 80px;\">发布日期</td></tr>";
				html += "</table></div>";
				html += "<div class=\"table-body\" style=\"height:250px;border-top:1px dotted #ccc;border-bottom:1px dotted #ccc;border-left:1px dotted #ccc;border-right:1px dotted #ccc;overflow-y:auto;\">";
				html += "<table class='grid' style=\"margin-top:-3px;\">";
				html += "<colgroup>";
				html += "<col style=\"width: 40px;\" /><col /><col style=\"width: 40px;\" /><col style=\"width: 80px;\" />";
				html += "</colgroup>";
				//html = "<div class=\"table-body\" style=\"height:345px;overflow:hidden;\">";
				//html += "<table class='grid' style='width:98%;margin:0 5px 0 5px;'>";
				//"<tr><td></td><td></td></tr>"
				//html += "<tbody>";
				for (var i = 0; i < jsData.length; i++) {
				    var item = jsData[i];
				    html += "<tr onclick=\"openDetailsWin('ViewNotice.html','查看通知详情','" + item.Id + "',660,400)\">";// onclick=\"openDetailsWin('','查看用电异常详情',"+jsData.Id+")\">";
				    html += "<td style=\"text-align:center;width: 40px;\">" + item.RowNumber + "</td>";
				    html += "<td style=\"padding-left:10px;\">" + item.Title + "</td>";
				    if (item.HasAttachment) {
					    html += "<td width='40px' style=\"text-align:center;\"><img src=\"../Styles/image/attach.png\"></td>";
					}
					else{
					    html += "<td width='40px'></td>";
					}
				    html += "<td width='80px' style='text-align:center'>" + item.SendTime.substring(0, item.SendTime.indexOf("T")) + "</td>";
					html += "</tr>"
				}
				html += "</tbody>";
				html += "</table>";
				html += "</div>";
				$("#divNoticeList").html(html);
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
        hasBtnWinsize: false,
        movable:true
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
function CreateWarnWin(pageUrl, paramJson, title,bw, x, y, w, h) {
    var oJson = {
        borderWidth:1,
        pagePanelBackColor: "White",
        hasLoadingAnimation: false,
        hasBtnMinimize: true,
        hasBtnWinsize: true
    };
    document.body.warnWindow = SzdwCommon.openViewWindowAssignObj(document.body.warnWindow, pageUrl, paramJson, title, x, y, w, h, oJson);
    $(document.body.warnWindow.panel).animate({ "left": bw - w }, 1000, null, null);
}
function CreateNoticeWin(pageUrl, paramJson, title,bw, x, y, w, h) {
    var oJson = {
        borderWidth: 1,
        pagePanelBackColor: "White",
        hasLoadingAnimation: false,
        hasBtnMinimize: true,
        hasBtnWinsize: true
    };
    document.body.noticeWindow = SzdwCommon.openViewWindowAssignObj(document.body.noticeWindow, pageUrl, paramJson, title, x, y, w, h, oJson);
    $(document.body.noticeWindow.panel).animate({ "left": bw - w }, 1000, null, null);
}
//#endregion