//正则表达式控件输入验证数字和小数点
function keypress(e, obj) {
    e = e ? e : window.event ? event : null;
    var keyNum = event.keyCode;
    var keyChar = String.fromCharCode(keyNum);

    //验证数字 /\d/g
    var regDig = /^(?:\-?[1-9]\d*|0)$/
    if (regDig.test(keyChar) || keyChar == "") {
        return true;
    }

    //验证小数点
    var regDot = /\./g;
    if (regDot.test(keyChar) && obj.value != "" && !regDot.test(obj.value)) {
        return true;
    }

    //验证负号
    var regFh = /^-{1}/;
    if (!regFh.test(obj.value)) {
        return true;
    }
    return false;
}

//只允许输入数字与小数点(用于文本框的onkeydown事件)
function ValidateDecimal(obj, e) {
    var key = window.event ? e.keyCode : e.which;
    if ((key > 95 && key < 106) || (key > 47 && key < 60) || (key == 46) ||
        (key == 110 && obj.value.indexOf(".") < 0) || (key == 190 && obj.value.indexOf(".") < 0)) {

    } else if (key != 8) {
        if (window.event) //IE   
        {
            e.returnValue = false;   //event.returnValue=false 效果相同.   
        }
        else //Firefox   
        {
            e.preventDefault();
        }
    }
}

//数字范围
function DigitalRange(obj, min, max) {
    var d = obj.value;
    if (d.length > 0 && (d <= min || d >= max)) {
        alert("数值超出范围！应大于" + min + "且小于" + max + "。");
        //        obj.focus();
        //        obj.select();
    }
}

//当数值最后一位是"."是，自动补上指定个数的0
function CompleteDotZero(obj, zeroQuantity) {
    if (obj == null || obj.value.length == 0) return false;
    var strChar = obj.value;
    var strZero = "";

    if (strChar.indexOf(".") == 0) strChar = "0" + strChar;
    if (strChar.indexOf(".") < 0) strChar = strChar + ".00";

    var len = strChar.length;
    var dotIndex = strChar.indexOf(".");
    var q = len - 1 - dotIndex;
    if (strChar.length > 0 && zeroQuantity > 0 && q < zeroQuantity) {
        for (var i = q + 1; i <= zeroQuantity; i++) {
            strZero += "0";
        }
    }
    obj.value = strChar + strZero;
}

//当数值最后一位是"."是，自动补上指定个数的0
function CorrectDot(obj) {
    var strChar = obj.value;
    if (strChar.length > 0 && strChar.substr(strChar.length - 1, 1) == ".") {
        obj.value = strChar + "000000";
    }
}

function ValidateDigital(e) {
    e = e ? e : window.event ? event : null;
    if (e.keyCode < 48 || e.keyCode > 57) e.returnValue = false;
}

//日期格式验证
function ValidateDate(obj) {
    var date = obj.value;
    var dateformat = "YYYY-MM-DD";
    var separator = "-";
    dateValidate(date, dateformat, separator);
}

function dateValidate(date, dateformat, separator) {
    if (date == null || date == "")
        return false;
    var date_part_index = datePartIndex(dateformat, separator);
    var date_array = date.split(separator);
    var yearstr = date_array[date_part_index.y];
    var monthstr = date_array[date_part_index.m];
    var daystr = date_array[date_part_index.d];
    if (isNaN(yearstr))
        return false;
    if (isNaN(monthstr))
        return false;
    if (isNaN(daystr))
        return false;
    var year = parseInt(yearstr);
    var month = parseInt(monthstr) - 1;
    var day = parseInt(daystr);
    var date = new Date(year, month, day);
    var y = date.getFullYear();
    var m = date.getMonth();
    var d = date.getDate();
    if (y != year || m != month || d != day) {
        return false;
    }
    return true;
}

function datePartIndex(dateformat, separator) {
    var partIndex = {};
    var part_array = dateformat.split(separator);
    for (var i = 0; i < part_array.length; i++) {
        switch (part_array[i]) {
            case "YYYY":
                partIndex.y = i;
                break;
            case "MM":
                partIndex.m = i;
                break;
            case "DD":
                partIndex.d = i;
                break;
        }
    }
    return partIndex;
}