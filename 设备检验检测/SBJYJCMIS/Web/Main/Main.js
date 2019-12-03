//#region 全局常量
themeColor = "#ef473a"; h_Header = 80; w_Menu = 160; //"#406406";017BBA;4C7608
var xuserId, xuser, xuserName, department, departmentId, position, propertyId, employeeId; loginPageUrl = "../login.html";
var permissionList = null; var sysName;
var warnJsonList = [];
var userInfo;
var infoType = -1;
var isInfoShow = false;
//#endregion 全局常量

/*#region 网页加载时事件*/
$(document).ready(function () {
    sysName = SzdwCommon.getUrlParam("sysName");
    CreateSysLoadingImg();

    //系统加载
    SystemLoad();
    //LoadPage("../Main/Navigation.html");

    //重设尺寸
    $(window).resize(function () {
        ResizeControls();
        RePositionPagePanel();
    });
});
//#endregion 网页加载时事件
$(document).click(function () {
    if ((document.body.infoWindow) && (isInfoShow)) {
        document.body.infoWindow.Hide();
        isInfoShow = false;
    }
});
//#region 系统加载

//加载
function SystemLoad() {
    GetXuserInfo();
    //GetXuserWarn();
    GetXuserPermissionListAndLoad();
}

//加载动画
function CreateSysLoadingImg() {
    var bw = $(document).width();
    var bh = $(document).height();
    var logoImg = "../Styles/image/sys/mkaq55.png";
    var name = "河南煤矿在用" + sysName; ;
    var loadingImg = "../SzdwControls/image/loading/loading.gif";
    var w = 520;

    //Logo
    var logo = document.createElement("div");
    var backImg = "url(" + logoImg + ") no-repeat center";
    var lw = 90;
    var lh = 64;
    $(logo).css({ "position": "relative", "float": "left", "background": backImg }).outerWidth(lw).outerHeight(lh);

    //LogoText
    var t = document.createElement("div");
    var tw = w - lw;
    var th = lh;
    $(t).css({ "position": "relative", "float": "left", "padding-top": "4px", "line-height": th + "px", "font-family": "微软雅黑", "font-size": "18pt" });
    $(t).outerWidth(tw).outerHeight(th).text(name);            

    //LogoBox
    var logoBox = document.createElement("div");
    $(logoBox).outerWidth(w).outerHeight(lh).append(logo).append(t);

    //加载动画gif
    var g = document.createElement("div");
    var gs = 64;
    var gImg = "url(" + loadingImg + ") no-repeat right ";
    $(g).css({ "position": "relative","float":"left", "background": gImg ,"width":"49%"}).outerHeight(gs);

    //加载时文字
    var gt = document.createElement("div");
    var gth = gs;
    $(gt).css({ "position": "relative", "float": "right", "width": "49%", "line-height": gth + "px", "font-family": "微软雅黑", "font-size": "14pt", "text-align": "left" })
    $(gt).text("加载中…").outerHeight(gth);

    //外框
    var e = document.createElement("div");
    e.id = "sysLoad";
    var h = lh + gs;
    var x = (bw - w) / 2;
    var y = (bh - h) / 2 - 20;
    $(e).css({ "position": "absolute", "left": x, "top": y }).outerWidth(w).outerHeight(h);            
    $(e).append(logoBox).append(g).append(gt).appendTo(document.body);
}

function UnLoadSysLoadingImg() {
    var e = $("#sysLoad");
    if (e) {
        $(e).fadeOut(500, null, function () { $(e).remove(); });
                
    }
}

//#endregion 系统加载

//#region 获取用户信息
function GetXuserInfo() {
    var xuserIdMd5 = SzdwCommon.getUrlParam("xui");
    if (xuserIdMd5) {
        var url = "../Xuser/XuserProcess.ashx";
        var paramJson = { xuserIdMd5: xuserIdMd5, MethodName: "XuserGetListByMd5" };
        $.ajax({ url: url, type: "post", data: paramJson, dataType: "json", async: false,
            success: function (jsonList) {
                var xuserJson = jsonList[0];
                if (xuserJson) {
                    xuserId = xuserJson.Id;
                    if (xuserId <= 0) { location.href = loginPageUrl; }
                    xuser = xuserJson.Name;
                    xuserName = xuserJson.NameCN;
                    departmentId = xuserJson.DepartmentId;
                    department = xuserJson.Department;
                    employeeId = xuserJson.EmployeeId;
                    position = xuserJson.Position;
                    propertyId = xuserJson.PropertyId;
                    userInfo = {};
                    userInfo["xuserId"] = xuserId;
                    userInfo["departmentId"] = departmentId;
                    userInfo["department"] = department;
                    userInfo["employeeId"] = employeeId;
                    userInfo["xuserName"] = xuserName;
                    userInfo["position"] = position;
                    userInfo["propertyId"] = propertyId;
                } else {
                    location.href = loginPageUrl;
                }
            },
            error: function () {
                location.href = loginPageUrl;
            }
        });
    } else {
        location.href = loginPageUrl;
    }
}

function GetXuserWarn() {
    var xuserIdMd5 = SzdwCommon.getUrlParam("xui");//"ea5d2f1c4608232e07d3aa3d998e5135";
    if (xuserIdMd5) {
        var url = "../WarnMessage/WarnMessage.ashx";
        var paramJson = {
            xuserIdMd5: xuserIdMd5,
            MethodName: "WarnMessageSimpleQueryListMd5"
        };
        $.ajax({
            url: url, type: "post", data: paramJson, dataType: "json", async: false,
            success: function (jsonList) {
                warnJsonList = jsonList;
            }
        });
    } else {
        location.href = loginPageUrl;
    }
}

function GetXuserPermissionListAndLoad() {
    var url = "../Permission/XuserPermissionProcess.ashx";
    var paramJson = { "xuserId": xuserId, MethodName: "XuserGetPagePermissionList" };
    $.ajax({
        url: url, type: "post", data: paramJson, dataType: "json",
        success: function (jsonList) {
            if (!$.isEmptyObject(jsonList)) {
                permissionList = jsonList;
                LoadMenu();
            }
        }
    });
}

function GetWarnDealPage(path,parm) {
    var url = "../Analyze/AnalyzeProcess.ashx";
    var paramJson = { "xuserId": xuserId, path: path, MethodName: "GetPageResourceIdByPath" };
    $.ajax({
        url: url, type: "post", data: paramJson, dataType: "json",
        success: function (data) {
            var permList = [];
            if (permissionList) {
                $.each(permissionList, function (index, item) {
                    if (item["ResourceId"] == data) {
                        permList.push(item);
                    }
                });
            }
            path = path + parm;
            szdwPage.pageUrl = "../" + path.replace("../", "").replace("/Web/", "").replace("Web/", "");;
            szdwPage.pageParamJson = {
                xuserId: userInfo.xuserId,
                xmenuId: 0,
                departmentId: userInfo.departmentId,
                department: userInfo.department,
                employeeId: userInfo.employeeId,
                xuserName: userInfo.xuserName,
                permissionJsonList: permList
            };
            szdwPage.Update();
        }
    });
}

//#endregion 获取XuserId

//#region 重设尺寸
function ResizeControls() {
    var w = $(document.body).width();
    var h = $(document.body).height();

    //重设header
    if (szdwHeader) {
        szdwHeader.width = w;
        szdwHeader.Resize();
    }

    //重设Menu
    if (szdwMenu) {
        var h_Header = szdwHeader ? szdwHeader.height : 0;
        szdwMenu.height = h - h_Header;
        szdwMenu.Resize();
    }

    //重设PagePanel尺寸
    ResizePagePanel();

    var pw = document.body.popupWindow;
    if (pw && szdwHeader) {
        var pw_w = 320;
        var pw_h = h - (szdwHeader ? szdwHeader.height : 0);
        if (pw.titleText == "修改个人信息") {
            pw.ReSize(pw_w, pw_h);
        }
    }
}

//重设PagePanel位置尺寸：szdwMenu动画伸缩时调用
function AnimateToResetPagePanel() {
    var bw = $(document.body).width();
    var m = szdwMenu.visualMode;
    var mw = m == 0 ? szdwMenu.minWidth : szdwMenu.width;
    var w = bw - mw;
    var x = mw;
    var p = szdwPage.panel;
    $(p).animate({ left: x, width: w }, 300, null, function () {
        szdwPage.x = x;
        szdwPage.width = w;
    });
}

//重设PagePanel位置
function RePositionPagePanel() {
    if (szdwPage) {
        var x = $(szdwMenu.panel).outerWidth();
        var y = $(szdwHeader.panel).outerHeight();
        szdwPage.RePosition(x, y);
    }
    var pw = document.body.popupWindow;
    if (pw) {
        pw_x = $(document.body).width() - 320;
        pw_y = $(szdwHeader.panel).outerHeight();
        pw.RePosition(pw_x,pw_y);
    }
    var iw = document.body.infoWindow;
    if (iw) {
        iw_x = $(document.body).width() - 320;
        iw_y = $(szdwHeader.panel).outerHeight();
        iw.RePosition(iw_x,iw_y);
    }
}

//重设PagePanel尺寸
function ResizePagePanel() {
    if (szdwPage) {
        var w = $(document.body).width();
        var h = $(document.body).height();
        var h_Header = szdwHeader ? szdwHeader.height : 0;
        var w_Menu = $(szdwMenu.panel).outerWidth();
        szdwPage.width = w - w_Menu;
        szdwPage.height = h - h_Header;
        szdwPage.Resize();
    }
}
//#endregion 重设尺寸

//#region 创建header

//#region 载入header 
function LoadHeader() {
    //获取父容器及其相关属性
    var c = document.body;
    var bw = $(c).width();
    var bh = $(c).height();
    var position = "absolute";
    var x = 0;
    var y = 0;
    var w = bw;
    var h = h_Header;

    //创建header并绑定数据
    CreateHeader(c, position, x, y, w, h);
}
//#endregion 单击按钮事件

//#region 创建Szdwheader并绑定数据
var szdwHeader = null;
function CreateHeader(namingContainer, position, x, y, width, height) {
    if (szdwHeader == null || typeof (szdwHeader) == "undefined") {
        //创建SzdwGridViewt实例
        szdwHeader = new SzdwPageHeader(position, x, y, width, height);
        szdwHeader.namingContainer = namingContainer;
        szdwHeader.fnInitial = InitialHeader(szdwHeader);
    }
    szdwHeader.Load();

    refreshNoticeCount();
}
//#endregion 创建Szdwheader并绑定数据

//#region 初始化header
function InitialHeader(szdwCtrol) {
    //分页设置
    szdwCtrol.panelCssJson["background-color"] = "Transparent";
    //szdwCtrol.panelCssJson["background"] = "url('../Image/headerBackGradualV20.png') repeat-x top white";

    szdwCtrol.logoPanelWidth = 420;
    szdwCtrol.logoImage = "../Styles/image/sys/mkaq55.png";
    szdwCtrol.logoImageWidth = 50;
    szdwCtrol.logoText = "河南煤矿在用" + sysName; ;
    szdwCtrol.logoPanelCssJson["opacity"] = 1;
    szdwCtrol.logoPanelCssJson["color"] = "#222222";

    var borderWidth = 5;
    szdwCtrol.logoPanelCssJson["border-bottom"] = borderWidth + "px solid " + themeColor;
    szdwCtrol.logoPanelHeight = h_Header - borderWidth;
    szdwCtrol.hasNotice = true;
    szdwCtrol.userPanelHeight = h_Header - borderWidth;
    szdwCtrol.userId = xuserId;
    szdwCtrol.userName = xuserName;
    szdwCtrol.userDepartment = department;
    szdwCtrol.userPosition = position;
    szdwCtrol.userItemCssJson["color"] = "#111111";
    szdwCtrol.userItemMouseOverCssJson = { "color": "#111111", "opacity": 1 };
    szdwCtrol.noticeItemImage = "../SzdwControls/image/pageHeader/info.png";
    szdwCtrol.userItemSignImage = "../SzdwControls/image/pageHeader/triangle16Red.png";
    szdwCtrol.userItemImage = "../SzdwControls/image/pageHeader/user20R.png";
    szdwCtrol.exitItemImage = "../SzdwControls/image/pageHeader/exit20R2.png";
 

    //事件
    //szdwCtrol.fn
    szdwCtrol.fnLogout = Logout;
    szdwCtrol.fnPass = PassModify;
    szdwCtrol.fnInfo = InfoModify;
    szdwCtrol.fnWarn = WarnView;
    szdwCtrol.fnWarnItem = WarnClick;
    szdwCtrol.fnNoticeItem = showInfoPanel;
    szdwCtrol.fnUserItem = UserClick;
    szdwCtrol.fnExitItem = ExitClick;
    szdwCtrol.warnJsonList = warnJsonList;
    //if (warnJsonList.length == 0) {
    //    szdwCtrol.userPanelWidth = 160;
    //}
    //else {
    var hw = 160;
    if (szdwCtrol.hasWarn) {
        hw = hw + szdwCtrol.warnItemWidth;
    }
    if (szdwCtrol.hasNotice) {
        hw = hw + szdwCtrol.noticeItemWidth
    }
    szdwCtrol.userPanelWidth = hw;
    //}

    var w = $(document.body).width();
    szdwCtrol.dataPanelWidth = szdwCtrol.width - szdwCtrol.logoPanelWidth - szdwCtrol.userPanelWidth;
    szdwCtrol.dataPanelHeight = h_Header - borderWidth;

    var borderBottom = borderWidth + "px solid #222222";
    szdwCtrol.dataPanelCssJson["border-bottom"] = borderBottom;
    szdwCtrol.userPanelCssJson["border-bottom"]= borderBottom ;
}

//注销登录
function Logout() {
	var paramJson = { xuserId: xuserId, MethodName: "Logout" };
	$.ajax({
		url: "../LogManagement/LoginLogProcess.ashx", type: "post", data: paramJson, async: false, dataType: "json"
	});
	location.href = loginPageUrl;
}

//修改密码
//function PassModify() {
//    $("#xuserId").attr("name", "xuserId").val(xuserId);
//    $("#mainForm").attr("target", "_blank").attr("method", "post").attr("action", "PassModify.aspx").submit();
//}
//#endregion 初始化header

//#endregion 创建header 

//#region 更新登录日志信息
function LoginLogUpdate() {
    //登录到系统
    var url = "../LogManagement/LoginLogProcess.ashx";
    var xx = xuserId;
    var paramJson = { XuserId: xuserId, MethodName: "LoginLogUpdateLoginOutDateTimeByXuserId" };
    $.ajax({
        url: url, type: "post", data: paramJson, async: false, dataType: "json"
    });
}
//#endregion 新增登录日志信息

//#region 创建Menu

//#region 载入Menu 
function LoadMenu() {
    //获取父容器及其相关属性
    var c = document.body;
    var bw = $(document).width();
    var bh = $(document).height();
    var position = "absolute";
    var x = 0;
    var y = h_Header;
    var w = w_Menu;
    var h = bh - y;

    //创建Menu并绑定数据
    CreateMenu(c, position, x, y, w, h);
}
//#endregion 单击按钮事件

//#region 创建SzdwMenu并绑定数据
var szdwMenu = null;
function CreateMenu(namingContainer, position, x, y, width, height) {
    if (szdwMenu == null || typeof (szdwMenu) == "undefined") {
        //创建SzdwGridViewt实例
        szdwMenu = new SzdwMenu(position, x, y, width, height);
        szdwMenu.namingContainer = namingContainer;
        szdwMenu.hasTitlePanel = true;
        szdwMenu.hasLoadingImg = false;
        szdwMenu.fnLoadPage = LoadPage;
        szdwMenu.fnCallback = LoadDefaultPage;
        szdwMenu.fnSwitchCallBack = AnimateToResetPagePanel;
        szdwMenu.itemSelectedBorderColor = "#ef473a"; //#017BBA
        szdwMenu.itemBackColorJson = { 0: "#393939", 1: "#ef473a" };
        szdwMenu.itemSelectedCssJson = {
            "border-left": "4px solid " + szdwMenu.itemSelectedBorderColor, "background-color": szdwMenu.itemBackColorJson["0"], //"#393939",
            "color": "White", "opacity": 1
        }; //#1B60C3,RGB(55,179,224)  
    }
    var fxMenuId = 0;
    var paramJson = { xuserId: xuserId, parentXmenuId: fxMenuId };
    paramJson["MethodName"] = "XmenuGetList"; //XmenuGetListWithPermission
    szdwMenu.requestUrl = "../Xmenu/XmenuProcess.ashx";
    szdwMenu.paramJson = paramJson;
    szdwMenu.panelCssJson["padding-right"] = "1px";
    szdwMenu.permissionJsonList = permissionList;
    szdwMenu.DataBind();

    var p = szdwMenu.listPanel;
    $(p).addClass("scrollBar").outerHeight($(szdwMenu.panel).height());
    $(p).mouseover(function () {
        $(this).css({ "overflow-y": "auto" });
    }).mouseleave(function () {
        $(this).css({ "overflow-y": "hidden" });
    });
}

//默认加载页面
function LoadDefaultPage() {
    UnLoadSysLoadingImg();
           
    LoadHeader();
    LoadPagePanel();

    var oJson = { "text": "我的首页" }; //我的首页
    szdwMenu.ExecItemClick(oJson);
}

//点击菜单载入页面函数
function LoadPage(pageUrl) {
    var permissionJsonList = szdwMenu.curPermissionJsonList ? szdwMenu.curPermissionJsonList : "undefined";
    szdwPage.pageUrl = pageUrl;
    szdwPage.pageParamJson = { xuserId: szdwHeader.userId, xmenuId: szdwMenu.value, departmentId: departmentId, department: department, employeeId: employeeId, xuserName: xuserName, propertyId: propertyId, permissionJsonList: permissionJsonList };
    szdwPage.Update();
}
function LoadPage0(pageUrl) {
    var permissionJsonList = szdwMenu.curPermissionJsonList ? szdwMenu.curPermissionJsonList : "undefined";
    szdwPage.pageUrl = pageUrl;
    szdwPage.pageParamJson = { xuserId: szdwHeader.userId, xmenuId: szdwMenu.value, departmentId: departmentId, department: department, employeeId: employeeId, xuserName: xuserName, permissionJsonList: permissionJsonList };
    szdwPage.Update();
}
//#endregion 创建SzdwMenu并绑定数据               

//#endregion 创建Menu 

//#region 页面面板

//载入页面
function LoadPagePanel() {
    //获取父容器及其相关属性
    var c = document.body;
    var bw = $(c).width();
    var bh = $(c).height();

    var position = "absolute";
    var y_Header = szdwHeader ? szdwHeader.y : 0;
    var h_Header = szdwHeader ? $(szdwHeader.panel).outerHeight() : 0;
    var x_Menu = szdwMenu ? szdwMenu.x : 0;
    var w_Menu = $(szdwMenu.panel).outerWidth(); //szdwMenu ? szdwMenu.width : w_Menu;
    var w = bw - w_Menu;
    var h = bh - h_Header;
    var x = x_Menu + w_Menu;
    var y = y_Header + h_Header;

    //创建页面面板
    CreatePagePanel(c, position, x, y, w, h)
}

//创建
var szdwPage = null;
function CreatePagePanel(namingContainer, position, x, y, width, height) {
    //创建
    if (szdwPage == null || typeof (szdwPage) == "undefined") {
        //创建SzdwGridViewt实例
        szdwPage = new SzdwPagePanel(position, x, y, width, height);
        szdwPage.namingContainer = namingContainer;
        szdwPage.fnPageDocument = PageDocumentEvent;
    }
    szdwPage.Load();
}

//页面Document对象事件
function PageDocumentEvent() {
    if (szdwHeader) {
        $(szdwHeader.userInfoPanel).slideUp(200);
        $(szdwHeader.warnInfoPanel).slideUp(200);
        szdwHeader.userInfoPanelVisible = false;
        szdwHeader.warnInfoPanelVisible = false;
    }

    if (szdwMenu) {
        szdwMenu.HideFloatChildItemPanel();
    }
}
//#endregion 内容区

//#region 个人信息
function InfoModify() {
    //var body = document.body;
    //var c = document.body;
    //var bw = $(c).width();
    //var bh = $(c).height();
    //var h_Header = szdwHeader ? $(szdwHeader.panel).outerHeight() : 0;
    //var pageUrl = "InfoModify.html";
    //var titleText = "修改个人信息";
    //var paramJson = { xuserId: xuserId, xuserName: xuser, xuserNameCN: xuserName };
    //var w = 320;
    //var h = bh - h_Header;//350; 
    //var x = bw - w;
    //var y = szdwPage.y;
    //var hasAnimation = false;
    //SzdwCommon.openPopupWindow(titleText, pageUrl, paramJson, x, y, w, h);

    var body = document.body;
    var bw = $(body).width();
    var bh = $(body).height();
    var titleText = "修改个人信息"
    var pageUrl = "InfoSet.html";
    var paramJson = { xuserId: xuserId, xuserName: xuser, xuserNameCN: xuserName };
    var h_Header = szdwHeader ? $(szdwHeader.panel).outerHeight() : 0;
    var w = 320;
    var h = 350;//bh-h_Header;
    var x = bw - w;
    var y = szdwPage.y;
    var oJson = {};
    document.body.popupWindow = SzdwCommon.openEditWindowAssignObj(document.body.popupWindow, pageUrl, paramJson, titleText, x, y, w, h, oJson);
}
//#endregion 个人信息

//#region 修改密码
function PassModify() {
    
    //var body = document.body;
    //var bw = $(body).width();
    //var bh = $(body).height();
    //var pageUrl = "PassModify.html";
    //var titleText = "修改密码";
    //var paramJson = { xuserId: xuserId, xuserName: xuser, xuserNameCN: xuserName };
    //var w = 320;
    //var h = 350;
    //var x = bw - w;
    //var y = szdwPage.y;
    //var hasAnimation = false;
    //SzdwCommon.openPopupWindow(titleText, pageUrl, paramJson, x, y, w, h);

    var body = document.body;
    var bw = $(body).width();
    var bh = $(body).height();
    var titleText = "修改密码"
    var pageUrl = "PassModify.html";
    var paramJson = { xuserId: xuserId, xuserName: xuser, xuserNameCN: xuserName };
    var w = 320;
    var h = 350;
    var x = bw - w;
    var y = szdwPage.y;
    var oJson = {};
    document.body.popupWindow = SzdwCommon.openEditWindowAssignObj(document.body.popupWindow, pageUrl, paramJson, titleText, x, y, w, h, oJson);

}
//#endregion 修改密码

function WarnView($this) {
    var id = $this.data("Id");
    var body = document.body;
    var bw = $(body).width();
    var bh = $(body).height();
    var pageUrl = "../WarnMessage/WarnView.html";
    var titleText = "查看提醒信息";
    var paramJson = {id:id, xuserId: xuserId};
    var w = 320;
    var h = 350;
    var x = bw - w;
    var y = szdwPage.y;
    var hasAnimation = false;
    SzdwCommon.openPopupWindow(titleText, pageUrl, paramJson, x, y, w, h);
}
function UserClick() {
    HidePopWin();
}
function ExitClick() {
    HidePopWin();
}
function WarnClick() {
    HidePopWin();
}
function NoticeClick() {
}
function HidePopWin() {
    pw = document.body.popupWindow;
    if (pw) {
        pw.Hide();
    }
    if ((document.body.infoWindow) && (isInfoShow)) {
        document.body.infoWindow.Hide();
        isInfoShow = false;
    }
}

function refreshNoticeCount() {
    $.ajax({
        url: "FrameProcess.ashx",
        type: "post",
        data: {
            xuserId: xuserId,
            MethodName: "GetNoticeCount"
        },
        dataType: "json",
        success: function (jsData) {
            var j = 0;
            var isHave = false;
            if (jsData instanceof Array) {
                for (var i = 0; i < jsData.length; i++) {
                    j += jsData[i].InfoCount;
                    if ((jsData[i].InfoCount != 0)&&(!isHave)) {
                        isHave = true;
                        infoType = jsData[i].InfoType;
                    }
                }
                $("#noticeItem").children(":eq(1)").text("(" + j + ")")
                if (j == 0) {
                    infoType = -1;
                }
            }
        }
    });
}

function showInfoPanel() {
    szdwHeader.HideUserInfoPanel();
    if (infoType > -1) {
        var body = document.body;
        var bw = $(body).width();
        var bh = $(body).height();
        var titleText = "提醒信息"
        var pageUrl = "InfoPanel.html";
        var paramJson = { xuserId: xuserId, xuserName: xuser, xuserNameCN: xuserName,infoType:infoType };
        var h_Header = szdwHeader ? $(szdwHeader.panel).outerHeight() : 0;
        var w = 320;
        var h = 400;//bh-h_Header;
        var x = bw - w;
        var y = szdwPage.y;
        var oJson = {
            movable: false,
            backOpacity: 0.7
        };
        document.body.infoWindow = SzdwCommon.openEditWindowAssignObj(document.body.infoWindow, pageUrl, paramJson, titleText, x, y, w, h, oJson);
        isInfoShow = true;
        //window.event ? window.event.cancelBubble = true : e.stopPropagation();
    }
    return false;
}

function openDetailsWin(pageUrl, titleText, paramJson, width, height) {
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