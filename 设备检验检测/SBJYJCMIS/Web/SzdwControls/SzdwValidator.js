/// <reference path="domCommon.js" />
/// <reference path="../jquery-1.11.1.js" />
//引用颜色转换JS

//#region 验证控件：SzdwValidator
function SzdwValidator(position, x, y, width, height) {
    //#region 通用属性
    this.namingContainer = document.body; //命名容器即父容器
    this.position = position ? position : "absolute";
    this.x = x ? x : 0; //坐标x
    this.y = y ? y : 0; //坐标x
    this.width = width ? width : 0; //宽度
    this.height = height ? height : 0; //高度
    this.widthType = 1; //1:对象控件一半宽度；2:对象控件2/3宽度；3:对象控件3/4宽度；4:对象控件同样宽度；
    this.backColor = "Orange";
    this.backOpacity = 0.9;
    this.targetControl = null; //目标对象
    this.positionControl = null; //定位对象
    this.submitControl = null;//数据提交对象（比如“提交保存”按钮、“保存修改”按钮等）
    this.hasImage = true;//是否有指示性的图片
    this.showing = false;//当前显示状态
    this.showMode = 2; //显隐模式,0:淡入淡出；1:右滑显示、左滑隐藏;2:左滑显示、右滑隐藏;3：下滑显示、上滑隐藏;4：上滑显示、下滑隐藏;
    this.showSpeed = 300; //显隐速度：毫秒
    this.positionMode = 1; //相对于targetControl的位置模式：0/leftInside:内部左边；1/rightInside:内部右边；2/above:上面；3/below:下面；4/left:左面；5/right:右面； 
    this.offsetMode = 1;//获取匹配元素的相对偏移量计算模式，0:相对父元素的偏移量(比如position().top)；1:在当前窗口的相对偏移量(比如offset().top)；默认1
    this.fnCallBackBeforeVadidate = null;
    this.fnCallBackAfterVadidate = null;
    this.fnGetParm = null;
    //#endregion 通用属性

    //#region 校验规则
    this.isValid = true;
    this.isExisted = false;
    this.isMatched = false;
    this.ruleJson = { required: true };

    //存在性验证
    this.existenceRequestUrl = null;
    this.existenceRequestMethodName = null;
    this.existenceParamJson = {};
    this.existenceParamName = null;
    this.existenceParamNameOldValue = null;
    this.existencePropertyName = "isExisted";
    this.existingText = "正在验证…";

    //不存在验证
    this.inexistenceRequestUrl = null;
    this.inexistenceRequestMethodName = null;
    this.inexistenceParamJson = {};
    this.inexistenceParamName = null;
    this.inexistenceParamNameOldValue = null;
    this.inexistencePropertyName = "isExisted";
    this.nonexistingText = "正在验证…";
        
    //匹配性验证
    this.matchRequestUrl = null;
    this.matchRequestMethodName = null;
    this.matchParamJson = {};
    this.matchParamName = null;
    this.matchParamNameOldValue = null;
    this.matchPropertyName = "isMatched";
    this.matchingText = "正在验证…";

    //不匹配性验证
    this.unmatchRequestUrl = null;
    this.unmatchRequestMethodName = null;
    this.unmatchParamJson = {};
    this.unmatchParamName = null;
    this.unmatchParamNameOldValue = null;
    this.unmatchPropertyName = "isMatched";
    this.unmatchingText = "正在验证…";

    /*校验规则解释
    this.ruleJson={ required: true, date:true,datetime:true,time:true,integer:true,decimal:true,maxLength:5,minLength:10, rangeLength:[5,10],
                   max:5,min:10,range:[5,10],email:true, url:true,ip:true,mobile:true,postcode:true,idCard:true,chinese:true,english:true,
                   number:true,pinyin:true,pinyinNumber:true,englishNumber:true,englishNumberUnderline:true,uppercase:true,lowercase:true,
                   existence:true,inexistence:true,match:true,unmatch:true}
    
    required:true 必须输入的字段。 
    date:true 必须输入正确格式的日期。 
    dateTime:true 必须输入正确格式的日期时间。    
    number:true 必须输入合法的数字（负数，小数）。 
    digits:true 必须输入整数。
    maxlength:5 输入长度最多是 5 的字符串（汉字算一个字符）。 
    minlength:10 输入长度最小是 10 的字符串（汉字算一个字符）。 
    rangelength:[5,10] 输入长度必须介于 5 和 10 之间的字符串（汉字算一个字符）。 
    range:[5,10] 输入值必须介于 5 和 10 之间。 
    max:5 输入值不能大于 5。 
    min:10 输入值不能小于 10。
    email:true 必须输入正确格式的电子邮件。 
    url:true 必须输入正确格式的网址。  
    ip:true 必须输入正确格式的ip地址。 
    mobile:必须输入正确格式的手机号格式,
    postcode:必须输入正确格式的邮政编码,
    ID:必须输入正确格式的身份证：15位或18位,
    chinese:必须输入有中文,
    english:必须输入英文,
    number:必须输入数字,
    pinyin:必须输入拼音,
    pinyinNumber:必须输入拼音或数字
    englishNumber:必须输入英文数值
    englishNumberline:必须输入英文数值和下划线,
    uppercase:必须输入大写英文
    lowercase:必须输入小写英文
    existence:数据的存在性（重复性）验证：验证数据是否已经存在
    inexistence:数据的存在性（重复性）验证：验证数据是否不存在
    match:匹配性验证：验证数据是否匹配
    unmatch:匹配性验证：验证数据是否不匹配
    */
    
    //错误信息
    this.messageJson = {
        required: "必填",
        date: "日期错误",
        datetime: "日期时间错误",
        time: "时间错误",
        integer: "请输入整数",
        decimal: "请输入数值",
        maxLength: "最多",
        minLength: "最少",
        rangeLength: "字数应介于",
        range: "值应介于",
        max: "值应小于等于",
        min: "值应大于等于",
        email: "Email错误",
        url: "网址错误",
        ip: "IP地址错误",
        mobile: "手机号格式错误",
        postcode: "邮编错误",
        idCard: "身份证号错误",
        chinese: "必须有中文",
        english: "必须是英文",
        number: "必须是数字",
        pinyin: "必须是拼音",
        pinyinNumber: "必须是拼音或数字",
        englishNumber: "必须是英文或数字",
        englishNumberUnderline: "必须输入英文、数字或下划线",
        uppercase: "必须是大写英文",
        lowercase: "必须是小写英文",

        existence: "已经存在",
        inexistence: "不存在",
        match: "匹配",
        unmatch: "不匹配"
    }

    //正则表达式
    this.regularJson = {
        date: /((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/,
        datetime: /((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9]))|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9]))|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9]))|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29))|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29))|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29))|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29))|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29))|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29))|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29))|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)))(\s(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]))?)$/,
        time: /^(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]))?$/,
        integer: /^-?\d+$/,
        decimal: /^(-?\d+)(\.\d+)?$/,
        email: /\w@\w*\.\w/,
        //url: /^[a-zA-z]+:\/\/[^\s]*$/,
        url: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
        ip:/\d+\.\d+\.\d+\.\d+/,
        mobile: /^1[3|4|5|7|8][0-9]\d{8}$/,
        postcode: /^[0-9][0-9]{5}$/,
        idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
        chinese: /[\u4e00-\u9fa5]/,
        english: /^[A-Za-z]+$/,
        number: /^[0-9]+$/,
        pinyin: /^[A-Za-z]+$/,
        pinyinNumber: /^[A-Za-z0-9]+$/,
        englishNumber: /^[A-Za-z0-9]+$/,
        englishNumberUnderline: /^\w+$/,
        uppercase:/^[A-Z]+$/,
        lowercase:/^[a-z]+$/
    }
    //#endregion 校验规则

    //#region 外框
    this.panel = document.createElement("div");
    this.panelCssName = null;
    this.panelCssJson = { "font-family": "微软雅黑", "font-size": "small", "display": "none", "color": "White" };
    //#endregion 外框

    //#region 图片
    this.image = null;
    this.imageUrl = "/SzdwControls/image/validator/warnning21w2.png"; 
    this.imageWidth = 25;
    this.imageHeight = this.height;
    this.imageCssName = null;
    this.imageCssJson = { "margin-left": 5 };
    //#endregion 图片

    //#region 内容层
    this.content = null;
    this.contentText = "";
    this.contentWidth = 0;
    this.contentHeight = 0;
    this.contentCssName = null;
    this.contentCssJson = { "font-family": "微软雅黑", "fontSize": "10pt", "padding": "0px 5px 0px 5px", "cursor": "default" };
    //#endregion 图片
    
    //#region 初始化函数
    this.fnInitial = null;
    this.fnSuccess = null;
    //#endregion 初始化函数
}
//#endregion 验证控件：SzdwValidator

//#region 加载
SzdwValidator.prototype.Load = function () {   
    this.Create();
}

//将SzdwValidator加入父容器
SzdwValidator.prototype.AppendToNamingContainer = function () {
    var p = this.panel;
    var nc = this.namingContainer;
    if (nc != null && $(p).parent().length == 0) {
        $(p).appendTo(nc);
    }
}

//创建
SzdwValidator.prototype.Create = function () {   
    this.SetPanel();
    this.CreateImage();
    this.CreateContent();

    //载入父容器
    this.AppendToNamingContainer();
}

//#endregion 加载

//#region 更新
SzdwValidator.prototype.Update = function () {
    this.SetPosition();
    this.SetSize();

    this.contentText = this.Validate();
    this.SetContentSize();
    this.SetContentText();
}
//#endregion 更新

//#region 验证

//普通验证
SzdwValidator.prototype.Validate = function () {
    var t = this.targetControl;
    var rj = this.ruleJson;
    var mj = this.messageJson;
    var rej = this.regularJson;
    var value = $(t).val() ? $(t).val() : $(t).text();
    value = $.trim(value);
    var valLen = value.length;
    this.isValid = true;
    
    //验证前回调函数
    if (this.fnCallBackBeforeVadidate) {
        this.fnCallBackBeforeVadidate(this);
    }

    //#region 必填验证
    if (rj.required && valLen == 0) {
        this.isValid = false;
        return mj.required;
    }
    //#endregion 必填验证
    
    //#region 整数验证 
    if (rj.integer && valLen > 0) {
        var rei = rej.integer;
        if (!rei.test(value)) {
            this.isValid = false;
            return mj.integer;
        }
    }
    //#endregion 整数验证

    //#region 浮点（小数）验证
    if (rj.decimal && valLen > 0) {
        var ren = rej.decimal;
        if (!ren.test(value)) {
            this.isValid = false;
            return mj.decimal;
        }
    }
    //#endregion 浮点（小数）验证

    //#region 日期验证
    if (rj.date && valLen > 0) {
        var red = rej.date;
        if (!red.test(value)) {
            this.isValid = false;
            return mj.date;
        }
    }
    //#endregion 日期验证

    //#region 日期时间验证
    if (rj.datetime && valLen > 0) {
        var redtm = rej.datetime;
        if (!redtm.test(value)) {
            this.isValid = false;
            return mj.datetime;
        }
    }
    //#endregion 日期时间验证

    //#region 时间验证
    if (rj.time && valLen > 0) {
        var ret = rej.time;
        if (!ret.test(value)) {
            this.isValid = false;
            return mj.time;
        }
    }
    //#endregion 时间验证

    //#region Email验证
    if (rj.email && valLen > 0) {
        var ree = rej.email;
        if (!ree.test(value)) {
            this.isValid = false;
            return mj.email;
        }
    }
    //#endregion Email验证

    //#region url验证
    if (rj.url && valLen > 0) {
        var reurl = rej.url;
        if (!reurl.test(value)) {
            this.isValid = false;
            return mj.url;
        }
    }
    //#endregion url验证

    //#region ip地址验证
    if (rj.ip && valLen > 0) {
        var reIp = rej.ip;
        if (!reIp.test(value)) {
            this.isValid = false;
            return mj.ip;
        }
    }
    //#endregion ip地址验证

    //#region 身份证验证
    if (rj.idCard && valLen > 0) {
        var reId = rej.idCard;
        if (!reId.test(value)) {
            this.isValid = false;
            return mj.idCard;
        }
    }
    //#endregion 身份证验证

    //#region 手机号码验证
    if (rj.mobile && valLen > 0) {
        var rem = rej.mobile;
        if (!rem.test(value)) {
            this.isValid = false;
            return mj.mobile;
        }
    }
    //#endregion 手机号码验证

    //#region 邮编验证
    if (rj.postcode && valLen > 0) {
        var rep = rej.postcode;
        if (!rep.test(value)) {
            this.isValid = false;
            return mj.postcode;
        }
    }
    //#endregion 邮编验证

    //#region 最大字符数验证
    if (rj.maxLength && valLen > 0) {
        var ml = rj.maxLength;
        if (valLen>ml) {
            this.isValid = false;
            return mj.maxLength + ml+"个字符";
        }
    }
    //#endregion 最大字符数验证

    //#region 最小字符数验证
    if (rj.minLength && valLen > 0) {
        var minLen = rj.minLength;
        if (valLen < minLen) {
            this.isValid = false;
            return mj.minLength + minLen + "个字符";
        }
    }
    //#endregion 最小字符数验证

    //#region 字符数范围验证
    if (rj.rangeLength && valLen > 0) {
        var min = rj.rangeLength[0];
        var max = rj.rangeLength[1];
        if (valLen < min || valLen > max) {
            this.isValid = false;
            return mj.rangeLength + min + "和" + max;
        }
    }
    //#endregion 字符数范围验证

    //#region 数值最大值验证
    if (rj.max && valLen > 0) {
        var maxNum = rj.max;
        var fVal = parseFloat(value);
        if (fVal > maxNum) {
            this.isValid = false;
            return mj.max + maxNum;
        }
    }
    //#endregion 数值最大值验证

    //#region 数值最小值验证
    if (rj.min && valLen > 0) {
        var minNum = rj.min;
        var fVal = parseFloat(value);
        if (fVal < minNum) {
            this.isValid = false;
            return mj.min + minNum;
        }
    }
    //#endregion 数值最小值验证

    //#region 数值范围验证
    if (rj.range && valLen > 0) {
        var minNum = rj.range[0];
        var maxNum = rj.range[1];
        var fVal = parseFloat(value);
        if (fVal < minNum || fVal > maxNum) {
            this.isValid = false;
            return mj.range + minNum + "和" + maxNum;
        }
    }
    //#endregion 数值范围验证

    //#region 中文验证
    if (rj.chinese && valLen > 0) {
        var rechn = rej.chinese;
        if (!rechn.test(value)) {
            this.isValid = false;
            return mj.chinese;
        }
    }
    //#endregion 中文验证

    //#region 英文验证
    if (rj.english && valLen > 0) {
        var recEng = rej.english;
        if (!recEng.test(value)) {
            this.isValid = false;
            return mj.english;
        }
    }
    //#endregion 英文验证

    //#region 数字验证
    if (rj.number && valLen > 0) {
        var recNum = rej.number;
        if (!recNum.test(value)) {
            this.isValid = false;
            return mj.number;
        }
    }
    //#endregion 数字验证

    //#region 拼音验证
    if (rj.pinyin && valLen > 0) {
        var recPy = rej.pinyin;
        if (!recPy.test(value)) {
            this.isValid = false;
            return mj.pinyin;
        }
    }
    //#endregion 拼音验证

    //#region 拼音或数字验证
    if (rj.pinyinNumber && valLen > 0) {
        var recPyn = rej.pinyinNumber;
        if (!recPyn.test(value)) {
            this.isValid = false;
            return mj.pinyinNumber;
        }
    }
    //#endregion 拼音或数字验证

    //#region 英文或数字验证
    if (rj.englishNumber && valLen > 0) {
        var recEn = rej.englishNumber;
        if (!recEn.test(value)) {
            this.isValid = false;
            return mj.englishNumber;
        }
    }
    //#endregion 英文或数字验证

    //#region 英文或数字或下划线验证
    if (rj.englishNumberUnderline && valLen > 0) {
        var recEnu = rej.englishNumberUnderline;
        if (!recEnu.test(value)) {
            this.isValid = false;
            return mj.englishNumberUnderline;
        }
    }
    //#endregion 英文或数字或下划线验证

    //#region 大写英文验证
    if (rj.uppercase && valLen > 0) {
        var recUpp = rej.uppercase;
        if (!recUpp.test(value)) {
            this.isValid = false;
            return mj.uppercase;
        }
    }
    //#endregion 大写英文验证

    //#region 小写英文验证
    if (rj.lowercase && valLen > 0) {
        var recLow = rej.lowercase;
        if (!recLow.test(value)) {
            this.isValid = false;
            return mj.lowercase;
        }
    }
    //#endregion 小写英文验证
    
    //验证后回调函数
    if (this.fnCallBackAfterVadidate) {
        this.fnCallBackAfterVadidate(this);
    }
}

//存在性验证
SzdwValidator.prototype.ValidateExistence = function () {
    var t = this.targetControl;
    var rj = this.ruleJson;
    var value = $(t).val() ? $(t).val() : $(t).text();
    value = $.trim(value);
    var valLen = value.length;
    
    if (rj.existence && valLen > 0) {
        var st = this.submitControl;
        if (st) {
            $(st).attr("disabled", "disabled");           
        }

        this.contentText = this.existingText;
        this.SetContent();
        //this.Show();

        var requestUrl = this.existenceRequestUrl;
        var methodName = this.existenceRequestMethodName;
        var paramName = this.existenceParamName;
        var paramJson = this.existenceParamJson;//{};
        var parm = {};
        if (this.fnGetParm != null) {
            parm = this.fnGetParm();
        }
        paramJson["MethodName"] = methodName;
        paramJson[paramName] = value;
        paramJson["OldValue"] = this.existenceParamNameOldValue;
        paramJson = $.extend({}, paramJson, parm);
        var propertyName = this.existencePropertyName;
        
        //验证前回调函数
        if (this.fnCallBackBeforeVadidate) {
            this.fnCallBackBeforeVadidate(this);
        }

        //异步验证存在性
        var szdwCtrl = this;
        $.ajax({
            url: requestUrl, type: "post", data: paramJson, dataType: "json",
            success: function (jsData) {
                var mj = szdwCtrl.messageJson;
                var isExisted = jsData[propertyName];
                szdwCtrl.isExisted = !isExisted;
                szdwCtrl.contentText = isExisted ? mj.existence : "没问题";
                szdwCtrl.SetContentText();
                if (!isExisted) {
                    if (st) {
                        $(st).removeAttr("disabled");
                    }
                    $(szdwCtrl.panel).css({ "display": "none" });
                } else {
                    szdwCtrl.Show();
                }

                //验证后回调函数
                if (szdwCtrl.fnCallBackAfterVadidate) {
                    szdwCtrl.fnCallBackAfterVadidate(szdwCtrl);
                }
            }
        });
    }
}

//不存在验证
SzdwValidator.prototype.ValidateInexistence = function () {
    var t = this.targetControl;
    var rj = this.ruleJson;
    var value = $(t).val() ? $(t).val() : $(t).text();
    value = $.trim(value);
    var valLen = value.length;

    if (rj.inexistence && valLen > 0) {
        var st = this.submitControl;
        if (st) {
            $(st).attr("disabled", "disabled");
        }

        this.contentText = this.nonexistingText;
        this.SetContent();

        var requestUrl = this.inexistenceRequestUrl;
        var methodName = this.inexistenceRequestMethodName;
        var paramName = this.inexistenceParamName;
        var paramJson = this.inexistenceParamJson;//{};
        paramJson["MethodName"] = methodName;
        paramJson[paramName] = value;
        paramJson["OldValue"] = this.inexistenceParamNameOldValue;
        var propertyName = this.inexistencePropertyName;

        //验证前回调函数
        if (this.fnCallBackBeforeVadidate) {
            this.fnCallBackBeforeVadidate(this);
        }

        //异步验证不存在
        var szdwCtrl = this;
        $.ajax({
            url: requestUrl, type: "post", data: paramJson, dataType: "json",
            success: function (jsData) {
                var mj = szdwCtrl.messageJson;
                var isExisted = jsData[propertyName];
                szdwCtrl.isExisted = isExisted;
                szdwCtrl.contentText = !isExisted ? mj.inexistence : "没问题";
                szdwCtrl.SetContentText();
                if (isExisted) {
                    if (st) {
                        $(st).removeAttr("disabled");
                    }
                    $(szdwCtrl.panel).css({ "display": "none" });
                } else {
                    szdwCtrl.Show();
                }

                //验证后回调函数
                if (szdwCtrl.fnCallBackAfterVadidate) {
                    szdwCtrl.fnCallBackAfterVadidate(szdwCtrl);
                }
            }
        });
    }
}

//匹配性验证
SzdwValidator.prototype.ValidateMatch = function () {
    var t = this.targetControl;
    var rj = this.ruleJson;
    var value = $(t).val() ? $(t).val() : $(t).text();
    value = $.trim(value);
    var valLen = value.length;

    if (rj.match && valLen > 0) {
        var st = this.submitControl;
        if (st) {
            $(st).attr("disabled", "disabled");
        }

        this.contentText = this.matchingText;
        this.SetContent();
        //this.Show();

        var requestUrl = this.matchRequestUrl;
        var methodName = this.matchRequestMethodName;
        var paramName = this.matchParamName;
        var paramJson = this.matchParamJson;//{};
        paramJson["MethodName"] = methodName;
        paramJson[paramName] = value;
        paramJson["OldValue"] = this.matchParamNameOldValue;
        var propertyName = this.matchPropertyName;
        
        //验证前回调函数
        if (this.fnCallBackBeforeVadidate) {
            this.fnCallBackBeforeVadidate(this);
        }

        //异步验证匹配性
        var szdwCtrl = this;
        $.ajax({
            url: requestUrl, type: "post", data: paramJson, dataType: "json",
            success: function (jsData) {
                var mj = szdwCtrl.messageJson;
                var isMatched = jsData[propertyName];
                szdwCtrl.isMatched = !isMatched;
                szdwCtrl.contentText = isMatched ? mj.match : "没问题";
                szdwCtrl.SetContentText();

                if (!isMatched) {
                    if (st) {
                        $(st).removeAttr("disabled");
                    }
                    $(szdwCtrl.panel).css({ "display": "none" });
                } else {
                    szdwCtrl.Show();
                }

                //验证后回调函数
                if (szdwCtrl.fnCallBackAfterVadidate) {
                    szdwCtrl.fnCallBackAfterVadidate(szdwCtrl);
                }
            }
        });
    }
}

//不匹配验证
SzdwValidator.prototype.ValidateUnmatch = function () {
    var t = this.targetControl;
    var rj = this.ruleJson;
    var value = $(t).val() ? $(t).val() : $(t).text();
    value = $.trim(value);
    var valLen = value.length;

    if (rj.unmatch && valLen > 0) {
        var st = this.submitControl;
        if (st) {
            $(st).attr("disabled", "disabled");
        }

        this.contentText = this.unmatchingText;
        this.SetContent();
        //this.Show();

        var requestUrl = this.unmatchRequestUrl;
        var methodName = this.unmatchRequestMethodName;
        var paramName = this.unmatchParamName;
        var paramJson = this.unmatchParamJson;//{};
        paramJson["MethodName"] = methodName;
        paramJson[paramName] = value;
        paramJson["OldValue"] = this.unmatchParamNameOldValue;
        var propertyName = this.unmatchPropertyName;

        //验证前回调函数
        if (this.fnCallBackBeforeVadidate) {
            this.fnCallBackBeforeVadidate(this);
        }

        //异步验证不匹配
        var szdwCtrl = this;
        $.ajax({
            url: requestUrl, type: "post", data: paramJson, dataType: "json",
            success: function (jsData) {
                var mj = szdwCtrl.messageJson;
                var isMatched = jsData[propertyName];
                szdwCtrl.isMatched = isMatched;
                szdwCtrl.contentText = !isMatched ? mj.unmatch : "没问题";
                szdwCtrl.SetContentText();
                if (isMatched) {
                    if (st) {
                        $(st).removeAttr("disabled");
                    }
                    $(szdwCtrl.panel).css({ "display": "none" });
                } else {
                    szdwCtrl.Show();
                }

                //验证后回调函数
                if (szdwCtrl.fnCallBackAfterVadidate) {
                    szdwCtrl.fnCallBackAfterVadidate(szdwCtrl);
                }
            }
        });
    }
}

//#endregion 验证

//#region 显示隐藏

//显示消息面板
SzdwValidator.prototype.Show = function (speed) {
    var m = this.showMode;
    var s = speed ? speed : this.showSpeed;
    var p = this.panel;
    if (!this.showing) {
        switch (m) {
            case 1:
                $(p).css({ "display": "block" }).outerWidth(0);
                $(p).find("div").css({ "display": "block" });
                $(p).animate({ left: this.x, width: this.width }, s);
                break;
            case 2:
                $(p).css({ "display": "block", "left": this.x + this.width }).outerWidth(0);
                $(p).find("div").css({ "display": "block" });
                $(p).animate({ left: this.x, width: this.width }, s);
                break;
            case 3:
                $(p).slideDown(s);
                break;
            case 4:
                $(p).css({ "display": "block", "top": this.y + this.height }).outerHeight(0);
                $(p).find("div").css({ "display": "block" });
                $(p).animate({ top: this.y, height: this.height }, s);
                break;
            default:
                $(p).fadeIn(s);
                break;
        }
        this.showing = true;
    }
}

//隐藏消息面板
SzdwValidator.prototype.Hide = function (speed) {
    var m = this.showMode;
    var s = speed ? speed : this.showSpeed;
    var p = this.panel;
    if (this.showing) {
        var fnCallBack = function () { $(p).find("div").andSelf().css({ "display": "none" }); }
        switch (m) {
            case 1:
                $(p).animate({ left: this.x, width: 0 }, s, null, fnCallBack);
                break;
            case 2:
                $(p).animate({ left: this.x + this.width, width: 0 }, s, null, fnCallBack);
                break;
            case 3:
                $(p).slideUp(s);
                break;
            case 4:
                $(p).animate({ top: this.y + this.height, height: 0 }, s, null, fnCallBack);
                break;
            default:
                $(p).fadeOut(s);
                break;
        }
        this.showing = false;
    }
}
//#endregion 显示隐藏

//#region 容器面板

//设置容器面板
SzdwValidator.prototype.SetPanel = function () {
    var p = this.panel;
    var cssName = this.panelCssName;
    var cssJson = this.panelCssJson;

    //基本样式
    this.SetStyleByCssName(p, cssName);
    this.SetStyleByCssJson(p, cssJson);

    //位置尺寸    
    this.SetPosition();
    this.SetSize();

    //底色与透明度
    domCommon.SetOpacity(p, this.backColor, this.backOpacity);
}

//定位
SzdwValidator.prototype.SetPosition = function (x, y) {
    var t = this.positionControl ? this.positionControl : this.targetControl;
    if (t) {
        this.x = x ? x : this.GetX();
        this.y = y ? y : this.GetY();
    }
    var px = this.x;
    var py = this.y;

    var p = this.position;
    $(this.panel).css({ "position": p, "left": px, "top": py });
}

//尺寸
SzdwValidator.prototype.SetSize = function (width, height) {
    var t = this.positionControl ? this.positionControl : this.targetControl;
    if (t) {
        this.width = width ? width : this.GetWidth();
        this.height = height ? height : this.GetHeight();
    }
    var w = this.width;
    var h = this.height;

    $(this.panel).outerWidth(w).outerHeight(h);
}

//获取x
SzdwValidator.prototype.GetX = function () {
    var t = this.positionControl ? this.positionControl : this.targetControl;
    var m = this.positionMode;
    var tx = this.offsetMode ? $(t).offset().left : $(t).position().left;
    var tw = $(t).outerWidth();
    var w = this.GetWidth();
    var ncSl = $(this.namingContainer).scrollLeft();
    var x = 0;
    m = m.constructor == String ? m.toUpperCase() : m;
    switch (m) {
        case 1: case "RIGHTINSIDE":
            x = tx + tw - w;
            break
        case 4: case "LEFT":
            x = tx - w;
            break;
        case 5: case "RIGHT":
            x = tx + tw;
            break;
        default:
            x = tx;
            break;
    }

    return x + ncSl;
}

//获取y 
SzdwValidator.prototype.GetY = function () {
    var t = this.positionControl ? this.positionControl : this.targetControl;
    var m = this.positionMode;
    var ty = this.offsetMode ? $(t).offset().top : $(t).position().top;
    var th = $(t).outerHeight();
    var h = this.GetHeight();
    var ncSt = $(this.namingContainer).scrollTop();
    var y = 0;
    m = m.constructor == String ? m.toUpperCase() : m;
    switch (m) {
        case 2: case "ABOVE":
            y = ty - h;
            break
        case 3: case "BELOW":
            y = ty + th;
            break;
        default:
            y = ty;
            break;
    }

    return y + ncSt;
}

//获取高度 0/leftInside:内部左边；1/rightInside:内部右边；2/above:上面；3/below:下面；4/left:左面；5/right:右面；
SzdwValidator.prototype.GetWidth = function () {
    var t = this.positionControl ? this.positionControl : this.targetControl;
    var m = this.positionMode;
    var tw = $(t).outerWidth();
    var pt = 1;
    switch(this.widthType){
        case 1:
            pt = 0.5;
            break;
        case 2:
            pt = 2/3;
            break;
        case 3:
            pt = 3/4;
            break;
    }
       
    var w = this.width ? this.width : Math.round(tw * pt);

    m = m.constructor == String ? m.toUpperCase() : m;
    switch (m) {
        case 2: case "ABOVE": case 3: case "BELOW":
            w = tw;
            break
    }

    return w;
}
//获取高度 0/leftInside:内部左边；1/rightInside:内部右边；2/above:上面；3/below:下面；4/left:左面；5/right:右面；
SzdwValidator.prototype.GetHeight = function () {
    var t = this.positionControl ? this.positionControl : this.targetControl;
    var m = this.positionMode;
    var th = $(t).outerHeight();
    var h = this.height ? this.height : th;

    m = m.constructor == String ? m.toUpperCase() : m;
    switch (m) {
        case 0: case "LEFTINSIDE": case 1: case "RIGHTINSIDE":
            h = th;
            break       
    }

    return h;
}
//#endregion 容器面板

//#region 图片层
SzdwValidator.prototype.CreateImage = function () {
    if (this.hasImage) {
        var imgUrl = this.imageUrl;
        if (imgUrl) {
            //创建标题层
            var e = document.createElement("div");
            e.style.position = "absolute";
            $(e).appendTo(this.panel);
            this.image = e;

            //设置
            this.SetImage();
        }
    }
}

//设置标题
SzdwValidator.prototype.SetImage = function () {
    var e = this.image;
    if (this.hasImage) {
        $(e).show();
        var x = 0;
        var y = 0;
        var w = this.imageWidth ? this.imageWidth : this.GetHeight();
        var h = this.imageHeight ? this.imageHeight : this.GetHeight();
        var cssName = this.imageCssName;
        var cssJson = this.imageCssJson;
        this.SetStyleByCssName(e, cssName);
        this.SetStyleByCssJson(e, cssJson);
        $(e).outerWidth(w).outerHeight(h).css({ "left": x, "top": y });

        var img = this.imageUrl;
        var backImg = "url(" + img + ") no-repeat center";
        $(e).css({ "background": backImg });
    } else {
        $(e).hide();
    }
}
//#endregion 图片层

//#region 创建内容层
SzdwValidator.prototype.CreateContent = function () {
    //创建iframe
    var e = document.createElement("div");
    e.style.position = "absolute";

    //设置文字( 自动省略）
    e.style.textOverflow = "ellipsis";
    e.style.whiteSpace = "nowrap";
    e.style.overflow = "hidden";

    $(e).appendTo(this.panel);
    this.content = e;

    //设置
    this.SetContent();
}


//设置内容层
SzdwValidator.prototype.SetContent = function () {
    this.SetContentStyle();
    this.SetContentPosition();
    this.SetContentSize();
    this.SetContentText();
}

//设置内容层样式
SzdwValidator.prototype.SetContentStyle = function () {
    var e = this.content;
    var cssName = this.contentCssName;
    var cssJson = this.contentCssJson;
    this.SetStyleByCssName(e, cssName);
    this.SetStyleByCssJson(e, cssJson);
}

//设置Content位置
SzdwValidator.prototype.SetContentPosition = function () {
    var iw = this.image ? $(this.image).outerWidth() : 0;
    var x = iw;
    var y = 0;
    $(this.content).css({ "left": x, "top": y });
}

//设置Content尺寸
SzdwValidator.prototype.SetContentSize = function () {
    var w = this.GetContentWidth();
    var h = this.GetContentHeight();
    $(this.content).outerWidth(w).outerHeight(h).css({ "line-height": h + "px" });
}

//设置Contentw文字
SzdwValidator.prototype.SetContentText = function () {
    var text = this.contentText;
    $(this.content).text(text).attr("title", text);
}

//获取Content宽度
SzdwValidator.prototype.GetContentWidth = function () {
    var iw = this.image ? this.imageWidth : 0;
    var w = this.GetWidth() - iw;
    this.contentWidth = w;
    return w;
}

//获取Content高度
SzdwValidator.prototype.GetContentHeight = function () {
    var th = 0;
    var h = this.GetHeight() - th;
    this.contentHeight = h;
    return h;
}
//#endregion 创建层

//#region 设置样式

//根据CssName设置样式
SzdwValidator.prototype.SetStyleByCssName = function (element, cssName) {
    if (cssName) { $(element).addClass(cssName); }
}

//根据CssJson设置样式
SzdwValidator.prototype.SetStyleByCssJson = function (element, cssJson) {
    if (cssJson) { $(element).css(cssJson); }
}
//#endregion 设置样式

//#region 扩展函数加载到目标对象

//paramJson:json格式参数:{x:x,y:y,width:width;height:height;widthType:widthType,hasImage:true,imageUrl:imageUrl,contentText:contentText,positionMode:positionMode,
//                        showMode:showMode,showSpeed:showSpeed,backColor:backColor,backOpacity:backOpacity,fnInitial:fnInitial}

$.fn.extend({
    szdwValidate: function (paramJson) {
        //创建实例
        var c = this;

        if (!c.validator) {
            c.validator = new SzdwValidator();
            c.validator.targetControl = c;
            
            //#region 获取参数
            if (paramJson) {
                if (paramJson.x) {
                    c.validator.x = paramJson.x;
                }

                if (paramJson.y) {
                    c.validator.y = paramJson.y;
                }

                if (paramJson.width) {
                    c.validator.width = paramJson.width;
                } else {
                    if (paramJson.widthType) {
                        c.validator.widthType = paramJson.widthType;
                    }
                }

                if (paramJson.height) {
                    c.validator.height = paramJson.height;
                }
               
                if (paramJson.hasImage != null && paramJson.hasImage != undefined) {
                    c.validator.hasImage = paramJson.hasImage;
                }

                if (paramJson.imageUrl) {
                    c.validator.imageUrl = paramJson.imageUrl;
                }

                if (paramJson.contentText) {
                    c.validator.contentText = paramJson.contentText;
                }

                if (paramJson.positionMode) {
                    c.validator.positionMode = paramJson.positionMode;
                }

                if (paramJson.showMode) {
                    c.validator.showMode = paramJson.showMode;
                }

                if (paramJson.showSpeed) {
                    c.validator.showSpeed = paramJson.showSpeed;
                }

                if (paramJson.backColor) {
                    c.validator.backColor = paramJson.backColor;
                }
                if (paramJson.backOpacity) {
                    c.validator.backOpacity = paramJson.backOpacity;
                }

                if (paramJson.fnInitial) {
                    c.validator.fnInitial = paramJson.fnInitial(c.validator);
                }
				
				if (paramJson.fnSuccess) {
                	c.validator.fnSuccess = paramJson.fnSuccess;
                }
            }
            //#endregion 获取参数

            c.validator.Load();
            $(c).data("validator", c.validator).data("isValid", true).prop("validator", c.validator);
        }
        
        //绑定事件       
        var szdwCtrl = c.validator;
        $(c).blur(function () {
            if (szdwCtrl) {
                szdwCtrl.Update();
                if (szdwCtrl.isValid) {
                    $(c).data("isValid", true);

                    //存在性(重复)验证
                    szdwCtrl.ValidateExistence();

                    //不存在验证
                    szdwCtrl.ValidateInexistence();

                    //匹配性验证
                    szdwCtrl.ValidateMatch();

                    //不匹配验证
                    szdwCtrl.ValidateUnmatch();
					
					if (szdwCtrl.fnSuccess) {
                    	szdwCtrl.fnSuccess($(this[0]));
                    }

                } else {                    
                    szdwCtrl.Show();
                    $(c).data("isValid", false);
                }
            }
        }).focus(function () {
            if (szdwCtrl) {
                if (szdwCtrl.showing) {
                    szdwCtrl.Hide();
                }
            }
        });        
        
        if (szdwCtrl) {
            $(szdwCtrl.panel).click(function () {
                $(c).trigger("focus");
            });
        }
    }
});
//#endregion 扩展函数加载到目标对象
