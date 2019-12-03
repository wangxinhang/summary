
//获取URL中参数值（QueryString）
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    }
    return null;
}

//获取URL中参数值（QueryString）并写入数组
//适用于把多个参数拼接成一个参数传过来的情况
function getQueryStringToArray(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]).toString().split(",");
//        var str = decodeURI(r[2]);
//        //写入数组
//        var arrStr = new Array(); 
//        arrStr = str.toString().split(",");
        //        return arrStr;
    }
    return null;
}