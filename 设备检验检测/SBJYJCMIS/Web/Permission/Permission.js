/// <reference path="../Scripts/jquery-1.11.1.js" />
var Permission = {
    //返回Json格式的Permission数据{"modifyPermission":"","deletePermission":"","exportPrintPermission":""}
    getPermission: function (xuserId, xmenuId) {
        var url = "../Permission/XuserPermissionProcess.ashx";
        var paramJson = { xUserId: xuserId, xMenuId: xmenuId, MethodName: "GetXUserPermission" };
        $.ajax({ url: url, type: "post", data: paramJson, dataType: "json", async: false,
            success: function (jsData) {
                if (!$.isEmptyObject(jsData)) {
                    return jsData;
                } else {
                    return null;
                }
            },
            error: function(){
                return null;
            }
        }); 
    }
}