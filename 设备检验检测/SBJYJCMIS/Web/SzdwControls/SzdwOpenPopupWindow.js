/// <reference path="../Scripts/jquery-1.11.1.js" />
document.write("<script language=javascript src='../SzdwControls/SzdwPopupWindow.js'></script>");
//oJson：{borderWidth, hasAnimation,fnCloseCallBack}
function OpenPopupWindow(titleText, pageUrl, paramJson, x, y, width, height, oJson) {
    var t = document.body;
    var pw = t.popupWindow;
    if (pw == null || typeof (pw) == "undefined") {
        pw = new SzdwPopupWindow("absolute", x, y, width, height);
    }
    pw.hasMask = false;
    pw.titleTextCssJson["padding-left"] = "10px";
    pw.titleText = titleText;
    pw.pageUrl = pageUrl;
    pw.pageParamJson = paramJson;
    pw.x = x;
    pw.y = y;
    pw.width = width;
    pw.height = height;

    if (!oJson) var oJson = {};
    pw.backColor = oJson.backColor == undefined ? "black" : oJson.backColor;
    pw.backOpacity = oJson.backOpacity == undefined ? 0.7 : oJson.backOpacity;
    pw.titleColor = oJson.titleColor == undefined ? "White" : oJson.titleColor;
    pw.pagePanelBackColor = oJson.pageBackColor == undefined ? "transparent" : oJson.pageBackColor;
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
}