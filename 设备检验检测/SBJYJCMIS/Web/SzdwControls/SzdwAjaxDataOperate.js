/// <reference path="../Scripts/jquery-1.11.1.js" />
var SzdwAjaxDataOperate = {    
    //添加数据
    ajaxInsert: function (objDataBind, requestUrl, paramJson, fnCallBack) {
        this.ajaxDataOperate(objDataBind, requestUrl, paramJson, fnCallBack);
    },

    //删除数据
    ajaxDelete: function (objDataBind, requestUrl, paramJson, fnCallBack) {
        this.ajaxDataOperate(objDataBind, requestUrl, paramJson, fnCallBack);
    },

    //编辑数据
    ajaxUpdate: function (objDataBind, requestUrl, paramJson, fnCallBack) {
        this.ajaxDataOperate(objDataBind, requestUrl, paramJson, fnCallBack);
    },

    //操作数据
    ajaxDataOperate: function (objDataBind, requestUrl, paramJson, fnCallBack) {
        $.ajax({ url: requestUrl, type: "post", data: paramJson, dataType: "text",
            success: function (strData) {
                var strOperation = strData.toLowerCase();
                var isSuccessed = strOperation === "true" || strOperation === "1" ? true : false;
                if (isSuccessed) {
                    if (objDataBind) { objDataBind.DataBind(); }
                    if (typeof (fnCallBack) == "function") { fnCallBack(); }
                }
            }
        });
    },

    //操作数据：不管返回值如何
    ajaxDataOperateIgnoreReturnValue: function (objDataBind, requestUrl, paramJson, fnCallBack) {
        $.ajax({ url: requestUrl, type: "post", data: paramJson, dataType: "text",
            success: function (strData) {
                if (!$.isEmptyObject(strData)) {
                    if (objDataBind) { objDataBind.DataBind(); }
                    if (typeof (fnCallBack) == "function") { fnCallBack(); }
                }
            }
        });
    }
}