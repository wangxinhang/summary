/**
 * 开关按钮组件
 * @param {number} width 
 * @param {number} height 
 * @param {string} position 
 * @param {number} x 
 * @param {number} y 
 */
function Switch(width , height, position , x, y ) {

    //定义各种属性,目的：暴露属性接口，方便实例化后进行属性更改
    // 定义通用属性
    this.width = width || 50;
    this.height = height || 25;
    this.position = position || "absolute";
    this.x = x || 0;
    this.y = y || 0;
    this.onText = "开";//定义按钮打开时,文本块默认显示的文本内容
    this.offText = "关";//定义按钮关闭时，文本块默认显示的文本内容
    this.bgColorOn = "green";//定义按钮打开时默认的背景颜色
    this.bgColorOff = "red";//定义按钮关闭时默认的背景颜色
    this.parentContainer = "body"; //定义默认父容器
    this.speed = 400; //定义滑块移动速度,单位:毫秒
    this.fnClickCallBack = null;//单击时执行的外部回调函数
    this.value = true; //定义一个布尔值，用于滑块移动及文本内容的切换

    //定义按钮属性
    this.box = document.createElement("div"); //定义按钮
    this.boxClassName = null; //定义按钮类名
    this.boxCssJson = null; //定义按钮样式

    //定义文本块属性
    this.textPanel = document.createElement("div"); //定义文本块
    this.textValue = false; //定义默认文本块显示的文本
    this.textPanelClassName = null; //定义文本块类名
    this.textPanelCssJson = null; //定义文本块样式

    //定义小滑块属性
    this.slider = document.createElement("div"); //定义小滑块
    this.sliderText = null;//定义小滑块文中的本内容
    this.sliderClassName = null; //定义小滑块类名 
    this.sliderCssJson = null; //定义小滑块样式
};
//创建按钮
Switch.prototype.createBox = function () {
    var box = this.box;
    var boxClassName = this.boxClassName;
    var boxCssJson = this.boxCssJson;
    var val = this.value;
    var width = this.width;
    var height = this.height;
    var bgColor = val ? this.bgColorOff : this.bgColorOn;//默认按钮为关闭状态，颜色为红色
    var cssJson = {//设置按钮的基础样式
        "width": width  + "px",
        "height": height + "px",
        "borderRadius": height+"px",
        "boxSizing": "border-box",
        "padding": "2px",
        "fontSize": "20px",
        "lineHeight": height + "px",
        "position": "relative",
        "backgroundColor":bgColor
    };
    $(box).css(cssJson); //加载按钮css样式
    this.setStyleByClassName(box,boxClassName);//加载由类名添加的css样式
    this.setStyleByCssJson(box,boxCssJson);//加载由类名添加的css样式
}
//创建文本块
Switch.prototype.createTextPanel = function () {
    var box = this.box;
    var textPanel = this.textPanel;
    var val = this.textValue;
    var textPanelClassName = this.textPanelClassName;
    var textPanelCssJson = this.textPanelCssJson;
    var text = val ? this.onText : this.offText; //设置默认显示文本
    var w = $(box).width() / 2;
    var h = $(box).height();
    var cssJson = { //设置文本块的基础样式
        "width":w + "px",
        "height":h + "px",
        "lineHeight":h + "px",
        "textAlign": "center",
        "float": "right",
        "fontFamily": "微软雅黑",
        "fontSize": "10px",
        "color": "white"
    };
    $(textPanel).css(cssJson).text(text); //加载文本块样式
    this.setStyleByClassName(textPanel,textPanelClassName);//加载由类名添加的css样式
    this.setStyleByCssJson(textPanel,textPanelCssJson);//加载由类名添加的css样式
}
//创建小滑块
Switch.prototype.createSlider = function () {
    var slider = this.slider;
    var box = this.box;    
    var text = this.sliderText ? this.sliderText : "";
    var sliderClassName = this.sliderClassName;
    var sliderCssJson = this.sliderCssJson;
    var w = $(box).width() / 2;
    var h = $(box).height();
    var padding = parseInt($(box).css("padding"));
    var cssJson = {//设置小滑块的基础样式
        "width":w + "px",
        "height":h + "px",
        "borderRadius": h + "px",
        "backgroundColor": "white",
        "lineHeight":h + "px",
        "textAlign": "center",
        "position": "absolute",
        "left":padding + "px",
        "top":padding + "px"
    };
    $(slider).css(cssJson).text(text); //加载小滑块样式
    this.setStyleByClassName(slider,sliderClassName);//加载由类名添加的css样式
    this.setStyleByCssJson(slider,sliderCssJson);//加载由类名添加的css样式
}
//创建按钮组件
Switch.prototype.create = function () {
    var textPanel = this.textPanel;
    var slider = this.slider;
    var box = this.box;
    var fn = this.fnClickCallBack;    
    var Switch = this;  //注意：因点击事件需要执行value及sliderMove()函数，要指定Switch为当前对象Switch
    $(box).append(slider); //将小滑块添加到按钮中
    $(box).append(textPanel); //将按钮文本块添加到按钮中
    //给按钮组件添加点击事件
    $(box).click(function (e) {
        Switch.sliderMove();
        Switch.value = !Switch.value;//通过切换value值来改变滑块移动及文本内容
        if(fn){//判断点击事件后是否有外部回调函数
            fn();    
        };
        e.stopPropagation();//阻止事件冒泡
    });
}
//滑块移动及文本内容切换函数
Switch.prototype.sliderMove = function () { 
    var textPanel = this.textPanel;
    var slider = this.slider;
    var box = this.box;
    var val = this.value;
    var speed = this.speed;
    var padding = parseInt($(box).css("paddingLeft"));
    var w = $(slider).width();

    //根据val的值切换滑块移动及文本内容切换函数
    var fl = val ? "left" : "right";
    var text = val ? this.onText : this.offText;
    var x = val ? w + padding : padding;
    var bgColor = val ? this.bgColorOn : this.bgColorOff;
    $(textPanel).fadeOut(speed);//文本块淡出
    $(slider).animate({"left": x + "px"}, speed ,function () {  //小滑块移动
        $(textPanel).css({"float":fl}).text(text).fadeIn(speed); //文本块切换浮动方向、内容然后再淡入
        $(box).css({"backgroundColor":bgColor}); //按钮背景颜色切换，注意：颜色无法做出淡入淡出效果
    });
} 
//将按钮组件添加到父容器中
Switch.prototype.appendToParentContainer = function () {
    var box = this.box;
    var position = this.position;
    var x = this.x;
    var y = this.y;
    var parentContainer = this.parentContainer;
    $(parentContainer).append(box); //将按钮添加到父容器中
    $(box).css({ "position": position, "left": x +"px", "top": y +"px" });
}
//初始化加载按钮组件
Switch.prototype.load = function () {
    this.createBox();
    this.createTextPanel();
    this.createSlider();
    this.create(); 
    //方法执行顺序很重要，create方法要先于appendToParentContainer()方法执行。
    //此后，appendToParentContainer()方法里面的box对象才是整个组件对象而不是单个box对象  
    this.appendToParentContainer();
};
//通过className进行设置元素样式
Switch.prototype.setStyleByClassName = function (element, className) {
    if (className) {
        $(element).addClass(className);
    }
};
//通过cssJson进行设置元素样式
Switch.prototype.setStyleByCssJson = function (element, cssJson) {
    if (cssJson) {
        $(element).css(cssJson);
    }
};