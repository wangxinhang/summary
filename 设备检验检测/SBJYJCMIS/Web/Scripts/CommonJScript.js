//获取URL中参数值（QueryString）
function GetQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    }
    return null;
}


//获取当前控件的水平绝对位置
function GetAbsX(obj) {
    if (!obj) { return null; }
    var absObj = obj;
    var absLeft = absObj.offsetLeft;
    while (absObj != null && absObj.offsetParent != null && absObj.offsetParent.tagName != "BODY") {
        absLeft += absObj.offsetParent.offsetLeft;
        absObj = absObj.offsetParent;
    }
    return absLeft;
}

//获取当前控件的垂直绝对位置
function GetAbsY(obj) {
    if (!obj) { return null; }
    var absObj = obj;
    var absTop = absObj.offsetTop;
    while (absObj != null && absObj.offsetParent != null && absObj.offsetParent.tagName != "BODY") {
        absTop += absObj.offsetParent.offsetTop;
        absObj = absObj.offsetParent;
    }
    return absTop;
}

//获取当前控件的高度
function GetHeight(obj) {
    if (!obj) { return null; }
    return obj.offsetHeight;
}

//获取当前控件的宽度
function GetWidth(obj) {
    if (!obj) { return null; }
    return obj.offsetWidth;
}

//给页面全部select加title属性
function ShowSelectTitle()
{
    var el = document.getElementsByTagName("select");
    for (i = 0; i < el.length; i++) {
        ShowSelectItemTitle(el[i]);
        el[i].onmouseover = function () { this.title = this.options[this.selectedIndex].text;};        
    }
}

//将就需要加title属性的select传进来
function ShowSelectItemTitle(obj)
{
    for (j = 0; j < obj.options.length; j++) {
        obj.options[j].title = obj.options[j].text;
    }
}

function ShowTitle(obj) {
    if (obj[0]) obj = $(obj)[0];
    if (obj) obj.onmouseover = function () { this.title = this.value; };
}

//获取对象成员数量
function getJsonCount(json) {
    var c = 0;
    for (var i in json) {
        c++;
    }
    return c;
}

//===============限制文本框输入字数===============
//显示文本框输入剩余字数：onfocus事件
function ShowRemainingDiv(obj, maxLimit,showFlag) {
    if (obj[0]) obj = $(obj)[0];
    var d = document.getElementById("txtRemainingCount");
    if (showFlag == 0) {
        d.style.height = "0px";
        d.style.visibility = "hidden";
    } else {
        var p = obj.parentNode;
        var left = GetAbsX(p);
        var top = GetAbsY(p);
        var h = GetHeight(p);        
        d.style.left = left + "px";
        d.style.top = top + h + "px";
        d.style.fontWeight = "normal";
        d.style.lineHeight = obj.offsetHeight + 10 + "px";
        d.style.height = obj.offsetHeight + 10 + "px";
        d.style.width = obj.offsetWidth + "px";

        var c = obj.value.length;
        var r = maxLimit - c;
        d.innerHTML = "剩余可写 <font color='Red'>" + r + "</font> 个字";

        d.style.visibility = "visible";
    }
}

//限制输入字数：onkeyup
function ShowRemainingTextNum(obj, maxLimit) {
    if (obj[0]) obj = $(obj)[0];    
    var d = document.getElementById("txtRemainingCount");
    var c = obj.value.length;
    var r = maxLimit - c;
    if (r >= 0) d.innerHTML = "剩余可写 <font color='Red'>" + r + "</font> 个字";
    if (r < 0) obj.value = obj.value.substring(0, maxLimit);
}

//限制输入字数：设置光标位置
function SetCaretPosition(tObj, sPos) {
    if (tObj.setSelectionRange) {
        setTimeout(function () {
            tObj.setSelectionRange(sPos, sPos);
            tObj.focus();
        }, 0);
    } else if (tObj.createTextRange) {
        var rng = tObj.createTextRange();
        rng.move('character', sPos);
        rng.select();
    }
}
function JsonGet(parm) {
    var def = {
        url: ''
		, data: {}
		, success: function () { }
		, error: function () { }
    };
    def = $.extend(def, parm);
    $.ajax($.extend({
        type: "post"
		, dataType: "json"
    }, def));
}

//Array.prototype.deepquery = function (childstr, fullpath, separator) {
//    var arr = fullpath.split(separator)
//		, t = this;
//    for (var i = 0; i < arr.length; i++) {
//        if (i == 0) {
//            t = t[arr[i]];
//        }
//        else {
//            if (t[childstr]) {
//                if (t[childstr].constructor === Array) {
//                    t = t[childstr][arr[i]];
//                }
//                else {
//                    return undefined;
//                }
//            }
//            else {
//                return undefined;
//            }
//        }
//    }
//    return t;
//}

//获取用户Id
function GetXuserId() {
	return $.parseJSON(SzdwCommon.getUrlParam("paramJson")).xuserId;
}

//获取菜单ID:xMenuId
function GetXmenuId() {
	return $.parseJSON(SzdwCommon.getUrlParam("paramJson")).xmenuId;
}

//获取权限
function GetPermission() {
	var jsonList = $.parseJSON(SzdwCommon.getUrlParam("paramJson")).permissionJsonList;
	return SzdwCommon.getPermission(jsonList);
}

function GetPanelX(id, what) {
	what = what.toLowerCase();
	var $d = $("#" + id);
	var val = 0;
	switch (what) {
		case 'w':
		case 'width':
			val = ($d.css("display") == "none") ? 0 : $d.outerWidth(true);
			break;
		case 'h':
		case 'height':
			val = ($d.css("display") == "none") ? 0 : $d.outerHeight(true);
			break;
		case 't':
		case 'top':
		case 'y':
			val = ($d.css("display") == "none") ? 0 : $d.offset().top;
			break;
		case 'l':
		case 'left':
		case 'x':
			val = $d.offset().left;
			break;
	}
	return val;
}

function getYearList(beginYear) {
	var endYear = new Date().getFullYear();
	var jsonList = new Array();
	for(var i = endYear;i>=beginYear;i--){
		jsonList.push({Id:i,Name:i+"年"});
	}
	return jsonList;
}

function getMonthList() {
	var jsonList = new Array();
	for (var i = 1; i <= 12;i++){
		jsonList.push({Id:i,Name:i+"月"});
	}
	return jsonList;
}
function BindDdlYear(id, fnIni, maxHeight) {
	var jsonList = getYearList(2016);
	var paramDdl = { jsonList: jsonList, fnInitial: fnIni };
	if (maxHeight) {
		paramDdl["maxHeight"] = maxHeight;
	}
	$("#" + id).dropDownList(paramDdl);
	var d = new Date()
	var date = d.getDate();
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	//if (date <= 15) {
		if (month == 1) {
			year = year - 1;
		}
	//}
	$("#" + id).data("value", year).val(year + "年");
}

function BindDdlMonth(id,fnIni,maxHeight) {
	var jsonList = getMonthList();
	var paramDdl = { jsonList: jsonList, fnInitial: fnIni};
	if (maxHeight){
		paramDdl["maxHeight"] = maxHeight;
	}
	$("#"+id).dropDownList(paramDdl);
	var d = new Date()
	var date = d.getDate();
	var month = d.getMonth() + 1;

	//if (date <= 15) {
		if (month == 1) {
			month = 12;
		}
		else {
			month = month - 1;
		}
	//}
	$("#"+id).data("value", month).val(month + "月");
}

function isIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
    else
        return false;
}
function getVersion(){
    var ua = navigator.userAgent.toLowerCase();
    var s;
    if (isIE()) {
        s = (s = ua.match(/msie ([\d]+)/)) ? s[1] :
        (s = ua.match(/rv:([\d]+)/)) ? s[1] : 0;
    } else {
        s = (s = ua.match(/edge\/([\d]+)/)) ? s[1] :
        (s = ua.match(/firefox\/([\d]+)/)) ? s[1] :
        (s = ua.match(/chrome\/([\d]+)/)) ? s[1] :
        (s = ua.match(/opera.([\d]+)/)) ? s[1] :
        (s = ua.match(/version\/([\d]+).*safari/)) ? s[1] : 0;
    }
    return parseInt(s);
}
