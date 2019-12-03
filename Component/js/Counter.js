/**
 * 计数器组件
 * @param {number} width 
 * @param {number} height 
 * @param {string} position 
 * @param {number} x 
 * @param {number} y 
 */
function Counter(width , height, position, x, y) {
    //定义各种属性,目的：暴露属性接口，方便实例化后进行属性更改
    // 定义通用属性
    this.width = width || 90;
    this.height = height || 25;
    this.position = position || "absolute";
    this.x = x || 0;
    this.y = y || 0;
    this.parentContainer = "body"; //定义默认父容器
    this.fnClickCallBack = null;//定义输入框失去焦点时执行的外部回调函数
    this.closeClassName = null;//定义蒙版关闭按钮的图标

    //定义输入框属性
    this.inputBox = document.createElement("input"); //定义输入框
    this.inputClassName = null; //定义输入框类名
    this.inputCssJson = null; //定义输入框样式
    this.minValue = 0;//定义输入框默认最小值
    this.maxValue = 3;//定义输入框默认最大值
    this.defaultValue = 1;//定义输入框默认值
    this.step = 1;//定义输入框value值默认步长

    //定义减法按钮属性
    this.subBox = document.createElement("div"); //定义减法按钮
    this.subBoxClassName = null; //定义减法按钮类名
    this.subBoxCssJson = null; //定义减法按钮样式   
    this.subBoxText = "-"; //定义减法按钮默认文本内容   
    this.subBoxTextColor = "black"; //定义减法按钮默认文本颜色：黑色   

    //定义加法按钮属性
    this.addBox = document.createElement("div"); //定义加法按钮
    this.addBoxClassName = null; //定义加法按钮类名
    this.addBoxCssJson = null; //定义加法按钮样式
    this.addBoxText = "+"; //定义加法按钮默认文本内容  
    this.addBoxTextColor = "black"; //定义加法按钮默认文本颜色：黑色   

    //定义外框属性
    this.box = document.createElement("div"); //定义外框
    this.boxClassName = null; //定义外框类名
    this.boxCssJson = null; //定义外框样式
    
};
//创建输入框
Counter.prototype.createInputBox = function () {
    var inputBox = this.inputBox;
    var inputClassName = this.inputClassName;
    var inputCssJson = this.inputCssJson;
    var val = this.defaultValue;
    var width = this.width;
    var height = this.height;
    var cssJson = { //设置输入框的基础样式
        "float": "left",
        "width": width / 3 + "px",
        "height": height  + "px",
        "boxSizing": "border-box",
        "border": "solid 1px #cacbcb",
        "padding":"0px",
        "textAlign": "center",
        "outline": "none"
    };
    $(inputBox).css(cssJson).val(val); //加载输入框css样式
    this.setStyleByClassName(inputBox, inputClassName); //加载由类名添加的css样式
    this.setStyleByCssJson(inputBox, inputCssJson); //加载由类名添加的css样式   
}
//创建减法按钮
Counter.prototype.createSubBox = function () {
    var subBox = this.subBox;
    var subBoxClassName = this.subBoxClassName;
    var subBoxCssJson = this.subBoxCssJson;
    var text = this.subBoxText;
    var width = this.width;
    var height = this.height;
    var subBoxTextColor = this.subBoxTextColor;
    var cssJson = { //设置减法按钮的基础样式
        "float": "left",
        "width": width / 3 + "px",
        "height": height + "px",
        "boxSizing": "border-box",
        "color":subBoxTextColor,
        "lineHeight": height + "px",
        "fontSize" :"22px",
        "textAlign": "center",
        "cursor":"pointer",
        "user-select":"none"
    };
    $(subBox).css(cssJson).text(text); //加载减法按钮css样式及文本内容
    this.setStyleByClassName(subBox, subBoxClassName); //加载由类名添加的css样式
    this.setStyleByCssJson(subBox, subBoxCssJson); //加载由类名添加的css样式   
}
//创建加法按钮
Counter.prototype.createAddBox = function () {
    var addBox = this.addBox;
    var addBoxClassName = this.addBoxClassName;
    var addBoxCssJson = this.addBoxCssJson;
    var text = this.addBoxText;
    var width = this.width;
    var height = this.height;
    var addBoxTextColor = this.addBoxTextColor;
    var cssJson = { //设置加法按钮的基础样式
        "float": "right",
        "width": width / 3 + "px",
        "height": height + "px",
        "boxSizing": "border-box",
        "lineHeight": height + "px",
        "textAlign": "center",
        "color":addBoxTextColor,
        "fontSize" :"20px",
        "cursor":"pointer",
        "user-select":"none"
    };
    $(addBox).css(cssJson).text(text); //加载加法按钮css样式及文本内容
    this.setStyleByClassName(addBox, addBoxClassName); //加载由类名添加的css样式
    this.setStyleByCssJson(addBox, addBoxCssJson); //加载由类名添加的css样式   
}
//创建外框按钮
Counter.prototype.createBox = function () {
    var box = this.box;
    var boxClassName = this.boxClassName;
    var boxCssJson = this.boxCssJson;
    var width = this.width;
    var height = this.height;
    var cssJson = { //设置外框的基础样式
        "width": width  + "px",
        "height": height + "px"
    };
    $(box).css(cssJson); //加载外框css样式
    this.setStyleByClassName(box, boxClassName); //加载由类名添加的css样式
    this.setStyleByCssJson(box, boxCssJson); //加载由类名添加的css样式   
}
//创建计数器组件
Counter.prototype.create = function () {
    var inputBox = this.inputBox;
    var subBox = this.subBox;
    var addBox = this.addBox;
    var box = this.box;
    var minValue = this.minValue;
    var maxValue = this.maxValue;
    var step = this.step;
    var subBoxTextColor = this.subBoxTextColor;
    var addBoxTextColor = this.addBoxTextColor;
    var Counter = this; //注意：因点击事件需要执行fnBlur()及setStyleByCssJson()函数，要指定Counter为当前对象Counter
    $(box).append(subBox); //将减法按钮添加到外框中
    $(box).append(inputBox); //将输入框添加到外框中
    $(box).append(addBox); //将加法按钮添加到外框中

    //给输入框添加点击事件
    $(inputBox).blur(function () {
        Counter.fnBlur();
    });
    //给减法按钮添加点击事件
    $(subBox).click(function (e) {
        var val = parseInt($(inputBox).val());
        if (val<=minValue) { //判断当前输入框value值是否小于最小值
            Counter.setStyleByCssJson(subBox, {"color":"#e9e9e9"}); 
        }else{
            var value = val - step ;
            $(inputBox).val(value);
            Counter.setStyleByCssJson(addBox, {"color":addBoxTextColor}); //让加法按钮恢复原色
            if (value == minValue) { //判断当前输入框value值是否等于最小值
                Counter.setStyleByCssJson(subBox, {"color":"#e9e9e9"}); 
            }
        }
        e.stopPropagation();//阻止事件冒泡
    });
    //给加法按钮添加点击事件
    $(addBox).click(function (e) {
        var val = parseInt($(inputBox).val());
        if (val>=maxValue) {//判断当前输入框value值是否大于最大值
            Counter.setStyleByCssJson(addBox, {"color":"#e9e9e9"});    
        }else{
            var value = val + step ;
            $(inputBox).val(value);
            Counter.setStyleByCssJson(subBox, {"color":subBoxTextColor}); //让减法按钮恢复原色
            if (value == maxValue) {//判断当前输入框value值是否等于最大值
                Counter.setStyleByCssJson(addBox, {"color":"#e9e9e9"}); 
            }
        }
        e.stopPropagation();//阻止事件冒泡
    });
}
// 输入框失去焦点时默认执行的函数
Counter.prototype.fnBlur = function () { 
    var inputBox = this.inputBox;
    var fn = this.fnClickCallBack;
    var val = $(inputBox).val();
    // 判断value是否符合要求
    if (isNaN(val)) {
        this.maskBox("非法数字! 请重新输入...");
    }else if(parseInt(val) < this.minValue||parseInt(val) > this.maxValue){
        this.maskBox("不在有效范围! 请重新输入...");
    }else if(val==""){ 
        this.maskBox("请输入数字!");
    }else{
        if (fn) {//判断input失去焦点后，是否有回调函数
            fn();
        }
    };

}
//设置蒙版效果
Counter.prototype.maskBox = function (text) {  
    var mask = document.createElement("div");//设置蒙版
    var alert = document.createElement("div");//设置弹出框
    var txt = document.createElement("p");//设置弹出框的文本
    var close = document.createElement("div");//设置弹出框的关闭按钮
    var confirm = document.createElement("div");//设置弹出框的确定按钮
    var inputBox = this.inputBox;
    var closeClassName = this.closeClassName;
    $(txt).text(text);//将文本写入txt中
    $(confirm).text("确定");
    if(closeClassName){
        $(close).addClass(closeClassName);
    }
    $(alert).append(txt).append(close).append(confirm);//将确定按钮、关闭按钮以及警告文本放入弹出框中
    $("body").append(mask).append(alert);//将蒙版、弹出框放入body
    $(mask).css({//设置蒙版基础css样式
        "width": "100%",
        "height":"100%",
        "background":"rgba(0,0,0,0.2)",
        "position":"absolute",
        "left":"0",
        "top":"0"
    });
    $(alert).css({//设置弹出框基础css样式
        "width": "300px",
        "height":"150px",
        "background":"white",
        "borderRadius":"5px",
        "position":"fixed",
        "left":"50%",
        "marginLeft":"-150px",
        "top":"50%",
        "marginTop":"-75px"
    });
    $(txt).css({//设置弹出框文本基础css样式
        "marginTop": "50px",
        "textAlign": "center"
    });
    $(confirm).css({//设置确定按钮基础css样式
        "width": "80px",
        "height":"30px",
        "background":"red",
        "margin":"30px auto",
        "borderRadius":"5px",
        "textAlign": "center",
        "lineHeight": "30px",
        "color": "white",
        "cursor": "pointer"
    });
    $(close).css({//设置关闭按钮基础css样式
        "width": "30px",
        "height":"30px",
        "position":"absolute",
        "right":"0",
        "top":"0",
        "textAlign": "center",
        "lineHeight": "30px",
        "color": "grey",
        "cursor": "pointer"
    });
    //点击关闭按钮，取消蒙版和弹出框并使input恢复初始状态
    $(close).click(function () {  
        $(mask).css({"display":"none"});
        $(alert).css({"display":"none"});
        $(inputBox).val(1);
    });
    //点击确定按钮，取消蒙版和弹出框并使input恢复初始状态
    $(confirm).click(function () {  
        $(close).trigger("click");
    });        
}
//将计数器组件添加到父容器中
Counter.prototype.appendToParentContainer = function () {
    var box = this.box;
    var position = this.position;
    var x = this.x;
    var y = this.y;
    var parentContainer = this.parentContainer;
    $(parentContainer).append(box); //将计数器组件添加到父容器中
    $(box).css({"position": position,"left": x + "px","top": y + "px"});
}
//初始化加载按钮组件
Counter.prototype.load = function () {
    this.createInputBox();
    this.createSubBox();
    this.createAddBox();
    this.createBox();
    this.create();
    //方法执行顺序很重要，createCounter方法要先于appendToParentContainer()方法执行。
    //此后，appendToParentContainer()方法里面的box对象才是整个组件对象而不是单个box对象  
    this.appendToParentContainer();
};
//通过className进行设置元素样式
Counter.prototype.setStyleByClassName = function (element, className) {
    if (className) {
        $(element).addClass(className);
    }
};
//通过cssJson进行设置元素样式
Counter.prototype.setStyleByCssJson = function (element, cssJson) {
    if (cssJson) {
        $(element).css(cssJson);
    }
};