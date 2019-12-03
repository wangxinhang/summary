
//获取月的最后一天
function getMonthFirstDay(year, month) {
    return year + "/" + month + "/01";
}

//获取月的最后一天
function getMonthLastDay(year, month) {
    var day = new Date(year, month, 0);
    return year + "/" + month + "/" + day.getDate();
}

//获取季度
function getQuarter(month) {
    switch (month) {
        case 1:
        case 2:
        case 3:
            return 1;
            break;
        case 4:
        case 5:
        case 6:
            return 2;
            break;
        case 7:
        case 8:
        case 9:
            return 3;
            break;
        case 10:
        case 11:
        case 12:
            return 4;
            break;
    }
}

//获取季度的第一天
function getQuarterFirstDay(year, quarter) {
    switch (quarter) {
        case 1:
            return year + "/" + 01 + "/01";
            break;
        case 2:
            return year + "/" + 04 + "/01";
            break;
        case 3:
            return year + "/" + 07 + "/01";
            break;
        case 4:
            return year + "/" + 10 + "/01";
            break;
        case 0:
            return year - 1 + "/" + 10 + "/01";
            break;
    }
}

//获取季度的第一天和最后一天
function getQuarterLastDay(year, quarter) {
    switch (quarter) {
        case 1:
            var day = new Date(year, 3, 0);
            return year + "/" + 03 + "/" + day.getDate(); //获取第一季度最后一天日期
            break;
        case 2:
            var day = new Date(year, 6, 0);
            return year + "/" + 06 + "/" + day.getDate(); //获取第二季度最后一天日期   
            break;
        case 3:
            var day = new Date(year, 9, 0);
            return year + "/" + 09 + "/" + day.getDate(); //获取第三季度最后一天日期
            break;
        case 4:
            var day = new Date(year, 12, 0);
            return year + "/" + 12 + "/" + day.getDate(); //获取第四季度最后一天日期
            break;
        case 0:
            var day = new Date(year - 1, 12, 0);
            return year - 1 + "/" + 12 + "/" + day.getDate(); //获取第四季度最后一天日期
            break;
    }
}

//日期格式化
Date.prototype.format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}