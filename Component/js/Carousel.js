/**
 * 轮播组件：大容器包含两个容器： 1.图片层容器：包含图片及文本  2.控制图标层容器：包含左右按钮及小图标
 * @param {json} json 
 */
function Carousel(json) {
    //定义基本属性
    this.width = json.basicSetting.widthHeightPosition.width || 500;
    this.height = json.basicSetting.widthHeightPosition.height || 300;
    this.x = json.basicSetting.widthHeightPosition.x || 0;
    this.y = json.basicSetting.widthHeightPosition.y || 0;
    this.parentContainer = json.basicSetting.widthHeightPosition.parentContainer || "body"; //定义父容器，默认body，注意：使用时父容器必须设置绝对定位position:relative
    //定义轮播图属性
    this.pattern = json.basicSetting.carouselSetting.pattern || 1; //可传属性：1表示缓动轮播，2表示渐隐渐变轮播
    this.speedTime = json.basicSetting.carouselSetting.speedTime || 20; //可传属性：定义轮播图片移动速度，单位：毫秒
    this.intervalTime = json.basicSetting.carouselSetting.intervalTime || 2000; //可传属性：定义轮播图间隔时间，单位：毫秒 
    
    //1.定义整个大容器属性
    this.box = document.createElement("div"); //定义大容器      
    
    //2.定义图片层容器属性
    this.imgBox = document.createElement("div"); //定义图片容器
    //2.1定义imgSrc、pText、aHref、pCssJson的属性
    this.imgSrc = json.imgJson.imgSrc;//imgSrc为必传属性：定义存放图片路径的数组
    this.pText = json.imgJson.pText;//pText为可传属性：定义图片上的文本内容的数组
    this.aHref = json.imgJson.aHref;//aHref为可传属性：定义包含图片的a标签href属性值的数组
    this.pCssJson = json.imgJson.pCssJson;//pCssJson为可传属性：定义图片上的文本的css样式
    
    //3.定义控制图标层容器属性
    this.controlBox = document.createElement("div"); //定义控制图标层容器
    //3.1定义控制图标层容器中的左按钮图标容器的属性
    this.prevIcon = document.createElement("div");//定义左按钮图标容器
    this.prevIconClassName = json.ctrlIconJson.prevIcon.className;//必传属性(与下一个属性至少要传入一个，也可以都传，用于定义控制图标)：定义通过class类名添加的左按钮图标容器css样式, 注意：字体图标也是通过class类名添加到左按钮容器上的
    this.prevIconCssJson = json.ctrlIconJson.prevIcon.cssJson;//必传属性：定义通过cssJson添加的左按钮图标容器css样式, 注意：背景图片也是通过cssJson添加到左按钮容器上的
    this.prevIconMouseEnterCssJson = json.ctrlIconJson.prevIcon.mouseEnterCssJson;//可传属性：定义当鼠标移入左按钮图标后，改变的css样式
    //3.2定义控制图标层容器中的右按钮图标容器的属性
    this.nextIcon = document.createElement("div");//定义右按钮图标容器
    this.nextIconClassName = json.ctrlIconJson.nextIcon.className;//必传属性(与下一个属性至少要传入一个，也可以都传，用于定义控制图标)：定义通过class类名添加的右按钮图标容器css样式, 注意：字体图标也是通过class类名添加到右按钮容器上的
    this.nextIconCssJson = json.ctrlIconJson.nextIcon.cssJson;//必传属性：定义通过cssJson添加的右按钮图标容器css样式, 注意：背景图片也是通过cssJson添加到右按钮容器上的
    this.nextIconMouseEnterCssJson = json.ctrlIconJson.nextIcon.mouseEnterCssJson;//可传属性：定义当鼠标移入右按钮图标后，改变的css样式
    //3.3定义控制图标层容器中的小图标容器的属性
    this.iconBox = document.createElement("div");//定义小图标容器 
    this.iconBoxCssJson = json.ctrlIconJson.smallIcon.iconBoxCssJson;//可传属性：定义通过cssJson添加的小图标容器样式
    //3.3.1定义控制图标层容器中的小图标span标签的属性
    this.iconBaseDefalutCssJson = { //设置小图标的默认样式
        "display":"inline-block",
        "width":this.height/20 + "px",
        "height":this.height/20 + "px",
        "backgroundColor":"white",
        "borderRadius":"50%",
        "margin":this.height/80 + "px"
    };
    this.iconBaseSelectedCssJson = {//设置小图标的默认选中样式
        "backgroundColor":"orange"
    };
    this.iconCssJson = json.ctrlIconJson.smallIcon.iconCssJson;//可传属性：定义通过cssJson添加的小图标样式
    this.iconSelectedCssJson = json.ctrlIconJson.smallIcon.iconSelectedCssJson;//可传属性：定义通过cssJson添加的小图标选中样式   
    
    //初始化加载轮播组件
    this.load();
};
//创建图片img数组
Carousel.prototype.createImgArr = function () {
    var width = this.width;
    var height = this.height;
    var imgSrcArr = this.imgSrc;
    var imgArr = [];//声明一个空数组，用于接收创建的img标签
    var cssJson = { //设置单个图片的基础样式
        "width": width + "px",
        "height": height  + "px"
    };
    for (var i = 0; i < imgSrcArr.length; i++) {
        var singleImg = document.createElement("img");//创建img标签
        $(singleImg).css(cssJson); //加载单个图片基础css样式   
        $(singleImg).attr("src",imgSrcArr[i]);//将图片路径数组的路径赋值给img的src属性
        imgArr.push(singleImg);//将每一个图片img都放入图片数组中
    }  
    return imgArr;//返回img图片数组
};
//创建文本p数组:如果无设置文本则不会创建
Carousel.prototype.createPArr = function () {
    if (this.pText) {//如果传入有文本,则开始创建
        var pTextArr = this.pText;
        var pCssJson = this.pCssJson;
        var height = this.height;
        var pArr = [];//声明一个空数组，用于接收创建的p标签
        var cssJson = { //设置p便签的基础样式
            "fontFamily":"微软雅黑",
            "color":"white",
            "margin":0,
            "position":"absolute",
            "top":height*0.75 + "px",
            "left":"40%"
        };
        for (var i = 0; i < pTextArr.length; i++) {
            var singleP = document.createElement("p");//创建p标签
            $(singleP).css(cssJson).text(pTextArr[i]); //加载单个图片基础css样式并加载text文本内容
            this.setStyleByCssJson(singleP, pCssJson); //加载由外界cssJson添加的css样式      
            pArr.push(singleP);//将每一个p标签都放入文本p数组中
        }  
        return pArr;//返回p标签数组 
    }else{
        return false;//否则返回false
    }     
};
//创建一个a标签的href假链接数组
Carousel.prototype.createHrefArr = function () {  
    var imgArr = this.createImgArr();
    var hrefArr = [];//声明一个数组，用于存放a标签的假链接
    for (var i = 0; i < imgArr.length; i++) {
        hrefArr.push("javascript:;");//定义一个假链接
    };
    return hrefArr;//返回该数组
};
//创建一个包含对应图片img及文本p的a标签数组
Carousel.prototype.createAArr = function () {  
    var imgArr = this.createImgArr();
    var hrefArr = this.createHrefArr();
    var width = this.width;
    var height = this.height;
    var aHrefArr = this.aHref ? this.aHref : hrefArr;//判断href值外界是否定义，如果无，则默认假链接
    var aArr = [];//声明一个空数组，用于接收创建的a标签
    var cssJson = { //设置div标签的基础样式
        "display":"inline-block",
        "width": width + "px",
        "height": height  + "px"         
    };
    for (var i = 0; i < imgArr.length; i++) {
        var singleA = document.createElement("a");//创建div容器
        $(singleA).css(cssJson).attr("href",aHrefArr[i]).append(imgArr[i]); //加载单个a基础css样式以及href属性值并将对应的img放入其中
        if (this.createPArr()) {//如果文本p数组存在
            var pArr = this.createPArr();
            $(singleA).append(pArr[i]);//将对应的p放入其中
        }
        aArr.push(singleA);//将每一个div标签都放入div容器数组中
    };  
    return aArr;//返回a标签数组    
};
//创建包含a标签的div容器数组
Carousel.prototype.createBoxArr = function () {  
    var aArr = this.createAArr();
    var boxArr = [];//声明一个空数组，用于接收创建的div容器
    var cssJson = { //设置div标签的基础样式          
        "position":"absolute",
        "left":0,
        "top":0
    };
    for (var i = 0; i < aArr.length; i++) {
        var singleBox = document.createElement("div");//创建div容器
        $(singleBox).css(cssJson).append(aArr[i]); //加载单个div基础css样式并将对应的a放入其中
        boxArr.push(singleBox);//将每一个div标签都放入div容器数组中
    };
    return boxArr;//返回div容器数组    
};
//创建包含div容器数组的图片层容器
Carousel.prototype.createImgBox = function () {  
    var imgBox = this.imgBox;
    var width = this.width;
    var height = this.height;
    var boxArr = this.createBoxArr();
    var cssJson = { //设置图片层容器的基础样式
        "width": width + "px",
        "height": height  + "px",            
        "position":"absolute"
    };
    for (var i = 0; i < boxArr.length; i++) {
    $(imgBox).append(boxArr[i]);//将div容器数组添加到图片层容器中
    }
    $(imgBox).css(cssJson);//加载样式
};
//创建控制图标层容器中的小图标容器
Carousel.prototype.createIconBox = function () {  
    var iconBox = this.iconBox;
    var iconBoxCssJson = this.iconBoxCssJson;
    var cssJson = { //设置小图标容器的基础样式
        "position":"absolute",
        "left":"0",
        "bottom":"0",
        "z-index":10
    };
    $(iconBox).css(cssJson);//加载基础样式
    this.setStyleByCssJson(iconBox,iconBoxCssJson);//加载由cssJson定义的样式
};
//创建小图标
Carousel.prototype.createIcon = function () {  
    var imgArr = this.imgSrc;
    var iconBox = this.iconBox;
    var iconBaseDefalutCssJson = this.iconBaseDefalutCssJson;
    var iconBaseSelectedCssJson = this.iconBaseSelectedCssJson;
    var iconCssJson = this.iconCssJson;
    var iconSelectedCssJson = this.iconSelectedCssJson;

    for (var i = 0; i < imgArr.length; i++) {
        var icon = document.createElement("span");
        $(icon).css(iconBaseDefalutCssJson);//加载基础样式
        this.setStyleByCssJson(icon,iconCssJson);//加载由cssJson定义的样式
        $(iconBox).append(icon);//将小图标添加到小图标容器中
    }
    // 初始化：第一个小图标加载选中样式
    $(iconBox).children().eq(0).css(iconBaseSelectedCssJson);//加载小图标的基础默认选中样式
    this.setStyleByCssJson($(iconBox).children().eq(0),iconSelectedCssJson);//加载由外界定义的小图标的选中样式
};
//创建控制图标层容器的左按钮图标容器
Carousel.prototype.createPrevIcon = function () {  
    var prevIcon = this.prevIcon;
    var prevIconClassName = this.prevIconClassName;
    var prevIconCssJson = this.prevIconCssJson;
    var width = this.width;
    var height = this.height;
    var cssJson = { //设置左按钮图标容器的基础样式
        "width":width/10 + "px",
        "height":height/4 + "px",
        "textAlign":"center",
        "lineHeight":height/4 + "px",
        "position":"absolute",
        "top":"50%",
        "left":0,
        "marginTop": -height/4/2 + "px",
        "display":"none"
    };
    $(prevIcon).css(cssJson);//加载基础样式
    this.setStyleByClassName(prevIcon,prevIconClassName);//加载由className定义的样式    
    this.setStyleByCssJson(prevIcon,prevIconCssJson);//加载由cssJson定义的样式 
};
//创建控制图标层容器的右按钮图标容器
Carousel.prototype.createNextIcon = function () {  
    var nextIcon = this.nextIcon;
    var nextIconClassName = this.nextIconClassName;
    var nextIconCssJson = this.nextIconCssJson;
    var width = this.width;
    var height = this.height;
    var cssJson = { //设置右按钮图标容器的基础样式
        "width":width/10 + "px",
        "height":height/4 + "px",
        "textAlign":"center",
        "lineHeight":height/4 + "px",
        "position":"absolute",
        "top":"50%",
        "right":0,
        "marginTop": -height/4/2 + "px",
        "display":"none"
    };
    $(nextIcon).css(cssJson);//加载基础样式
    this.setStyleByClassName(nextIcon,nextIconClassName);//加载由className定义的样式    
    this.setStyleByCssJson(nextIcon,nextIconCssJson);//加载由cssJson定义的样式 
};
//创建控制图标层容器
Carousel.prototype.createcontrolBox = function () {  
    var controlBox = this.controlBox;
    var prevIcon = this.prevIcon;
    var nextIcon = this.nextIcon;
    var iconBox = this.iconBox;
    var cssJson = { //设置控制图标层容器的基础样式
        "cursor":"pointer"
    };    
    $(controlBox).css(cssJson).append(prevIcon).append(nextIcon).append(iconBox);//加载基础样式并将左右按钮以及小图标添加进来
};
//创建大容器
Carousel.prototype.createBox = function () {  
    var box = this.box;
    var width = this.width;
    var height = this.height;
    var cssJson = { //设置大容器的基础样式
        "width": width + "px",
        "height": height  + "px",
        "overflow":"hidden"
    };
    $(box).css(cssJson); //加载大容器基础css样式
};
//创建缓动轮播图组件并加载自动轮播效果及各种事件
Carousel.prototype.createSlow = function () { 
    //组装成轮播图组件
    var box = this.box;
    var imgBox = this.imgBox; 
    var controlBox = this.controlBox;
    $(box).append(imgBox).append(controlBox);//将图片层容器、控制图标层容器添加到大容器中
    
    //1.轮播前进行初始化
    var imgBoxArr = $(imgBox).children();//获取所有图片容器
    var indexNow = 0;// 定义当前的图片容器索引,即从第一张图片容器开始轮播
    var imgBoxWidth = $(imgBox).width();//获取图片层容器的宽度
    $(imgBoxArr).eq(0).siblings().css({ "left": imgBoxWidth+"px"});//除第一个图片容器在中间显示，其余都定位到右边

    //2.开启轮播
    var speedTime = this.speedTime;
    var intervalTime = this.intervalTime;
    var timer = null;
    clearInterval(timer);
    timer = setInterval(autoPlay, intervalTime);
    
    //3.监听左右按钮图标的鼠标点击事件
    var prevIcon = this.prevIcon;
    var nextIcon = this.nextIcon;
    //左按钮鼠标点击事件
    $(prevIcon).click(function () {
        // 1.先让当前的图片容器缓动到右边
        Animation($(imgBoxArr).eq(indexNow), imgBoxWidth);
        // 2.当前索引值--
        indexNow--;
        // 判断当前图片容器索引是否大于第一张图片容器的索引
        if (indexNow < 0) {
            indexNow = $(imgBoxArr).length - 1;
        };
        // 3.让下一个图片容器快速定位到左边
        $(imgBoxArr).eq(indexNow).css({"left": -imgBoxWidth+"px"});
        // 4.让下一个图片容器缓动到当前
        Animation($(imgBoxArr).eq(indexNow), 0);
        // 5.小图标也要跟着切换
        changeIndex();
    });
    //右按钮鼠标点击事件
    $(nextIcon).click(function () {
        if (Carousel.nextIconClickCssJson) {
            $(this).css(Carousel.nextIconClickCssJson);//点击后，左按钮样式是否发生改变
            $(Carousel.prevIcon).attr("style",prevIconStyle).css({"display":"block"});//点击后，左按钮样式是否发生改变
        };        
        autoPlay();//点击右按钮，相当于开启一次轮播
    });

    //4.监听左右按钮图标的鼠标移入移出事件
    var Carousel = this;//切换对象：重点，将当前对象Carousel用变量Carousel储存起来，后面要用
    var prevIconStyle = $(Carousel.prevIcon).attr("style");//储存左按钮已加载的样式，后面要用
    var nextIconStyle = $(Carousel.nextIcon).attr("style");//储存右按钮已加载的样式，后面要用
    //左按钮图标的鼠标移入移出事件
    $(prevIcon).hover(function () {  
        if (Carousel.prevIconMouseEnterCssJson) {
            $(this).css(Carousel.prevIconMouseEnterCssJson);//移入后，左按钮加载鼠标进入样式
        };
    },function () {  
        $(this).attr("style",prevIconStyle).css({"display":"block"});//移出后，左按钮加载原来样式
    });
    //左按钮图标的鼠标移入移出事件
    $(nextIcon).hover(function () {  
        if (Carousel.nextIconMouseEnterCssJson) {
            $(this).css(Carousel.nextIconMouseEnterCssJson);//移入后，左按钮加载鼠标进入样式
        };
    },function () {  
        $(this).attr("style",nextIconStyle).css({"display":"block"});//移出后，左按钮加载原来样式
    });

    //5.监听小图标的鼠标点击事件
    var icon = $(this.iconBox).children();
    //由于js异步编程的原因，第一种解决方案：需要将每一个i值对应的用icon[i]创造出来的一个无意义的index属性储存起来
    for (var i = 0; i < icon.length; i++) {
        icon[i].index = i;
        $(icon[i]).click(function () {
            if (this.index > indexNow) {//如果点击的图标的索引大于当前图片容器的索引，相当于点击了右按钮图标
                // 1.先让当前的图片容器缓动到左边
                Animation($(imgBoxArr).eq(indexNow), -imgBoxWidth);
                // 2.把小图标的索引值赋值给当前图片容器的索引
                indexNow = this.index;
                // 4.让索引为小图标索引值的图片容器快速定位到右边
                $(imgBoxArr).eq(indexNow).css({"left": imgBoxWidth + "px"});
                // 5.让索引为小图标索引值的图片容器缓动到当前
                Animation($(imgBoxArr).eq(indexNow),0);
                // 6.小图标也要跟着切换
                changeIndex();
            } else {//否则，相当于点击了左按钮图标
                // 1.先让当前的图片容器缓动到右边
                Animation($(imgBoxArr).eq(indexNow), imgBoxWidth);
                // 2.把小图标的索引值赋值给当前图片容器的索引
                indexNow = this.index;
                // 4.让索引为小图标索引值的图片容器快速定位到左边
                $(imgBoxArr).eq(indexNow).css({"left": -imgBoxWidth + "px"});
                // 5.让索引为小图标索引值的图片容器缓动到当前
                Animation($(imgBoxArr).eq(indexNow),0);
                // 6.小图标也要跟着切换
                changeIndex();
            };
        });
    };
    //第二种解决方案：利用闭包，和第一种原理一样
    // for (var i = 0; i < icon.length; i++) {
    //     (function (i) {  
    //         $(icon[i]).click(function () {
    //             if (i > indexNow) {//如果点击的图标的索引大于当前图片容器的索引，相当于点击了右按钮图标
    //                 // 1.先让当前的图片容器缓动到左边
    //                 Animation($(imgBoxArr).eq(indexNow), -imgBoxWidth);
    //                 // 2.把小图标的索引值赋值给当前图片容器的索引
    //                 indexNow = i;
    //                 // 4.让索引为小图标索引值的图片容器快速定位到右边
    //                 $(imgBoxArr).eq(indexNow).css({"left": imgBoxWidth + "px"});
    //                 // 5.让索引为小图标索引值的图片容器缓动到当前
    //                 Animation($(imgBoxArr).eq(indexNow),0);
    //                 // 6.小图标也要跟着切换
    //                 changeIndex();
    //             } else {//否则，相当于点击了左按钮图标
    //                 // 1.先让当前的图片容器缓动到右边
    //                 Animation($(imgBoxArr).eq(indexNow), imgBoxWidth);
    //                 // 2.把小图标的索引值赋值给当前图片容器的索引
    //                 indexNow = i;
    //                 // 4.让索引为小图标索引值的图片容器快速定位到左边
    //                 $(imgBoxArr).eq(indexNow).css({"left": -imgBoxWidth + "px"});
    //                 // 5.让索引为小图标索引值的图片容器缓动到当前
    //                 Animation($(imgBoxArr).eq(indexNow),0);
    //                 // 6.小图标也要跟着切换
    //                 changeIndex();
    //             };
    //         });
    //     })(i);
    // };    

    //6.监听鼠标移入移出轮播图事件
    $(box).hover(function () {//鼠标移入轮播暂停
        clearInterval(timer);
        $(Carousel.prevIcon).css({"display":"block"});
        $(Carousel.nextIcon).css({"display":"block"});
    },function () {//鼠标移出轮播重新启动
        timer = setInterval(autoPlay, intervalTime);
        $(Carousel.prevIcon).css({"display":"none"});
        $(Carousel.nextIcon).css({"display":"none"});        
    });

    // 自动轮播函数
    function autoPlay() {
        // 1.先让当前的图片容器缓动到左边
        Animation($(imgBoxArr).eq(indexNow), -imgBoxWidth);
        // 2.当前索引值++
        indexNow++;
        // 判断当前图片容器索引是否大于最后一张图片容器的索引
        if (indexNow > $(imgBoxArr).length - 1) {
            indexNow = 0;
        }
        // 3.让下一个图片容器快速定位到右边
        $(imgBoxArr).eq(indexNow).css({"left": imgBoxWidth+"px"});
        // 4.让下一个图片容器缓动到当前
        Animation($(imgBoxArr).eq(indexNow),0);
        // 5.小图标也要跟着切换
        changeIndex();
    };
    // 缓动动画函数
    function Animation(obj, target) {
        clearInterval(obj.timer);//使用定时器要符合“先关、后开、再关”的原则, 此处关闭的是前一个obj对象未关闭的定时器(虽然都关闭了，但以防万一)
        var begin = obj.position().left;//获取当前obj的left值作为判断条件
        obj.timer = setInterval(function () {
            //判断缓动是否到了目标值，分向左和向右缓动两种情况，注意：>、&&、||运算符之间的优先级
            if ( begin > target && obj.position().left <= target || target > begin && obj.position().left >= target ) {
                clearInterval(obj.timer);//关闭定时器
            } else {
                var speed = obj.position().left;//实时获取当前obj的left值，并将其作为新的缓动起始值
                speed = begin > target ? Math.floor((target - speed) * 0.1) : Math.ceil((target - speed) * 0.1);//如果向左运动，则向下取值；如果向右，则向上取值
                obj.css({"left": obj.position().left + speed + "px"});
            }                
        }, speedTime);
    };
    // 小图标切换函数
    var iconBox = this.iconBox;  //获取创建后的小图标容器
    var iconCssJson = this.iconCssJson ? this.iconCssJson : this.iconBaseDefalutCssJson;//判断外界是否定义小图标的基础样式
    var iconSelectedCssJson = this.iconSelectedCssJson ? this.iconSelectedCssJson : this.iconBaseSelectedCssJson;//判断外界是否定义小图标的选中样式
    function changeIndex() {
        $(iconBox).children().eq(indexNow).css(iconSelectedCssJson).siblings().css(iconCssJson);//小图标自动切换样式
    };
};
//创建渐隐渐变轮播图组件并加载自动轮播效果及各种事件
Carousel.prototype.createFade = function () { 
    //组装成轮播图组件
    var box = this.box;
    var imgBox = this.imgBox; 
    var controlBox = this.controlBox;
    $(box).append(imgBox).append(controlBox);//将图片层容器、控制图标层容器添加到大容器中
    
    //1.轮播前进行初始化
    var imgBoxArr = $(imgBox).children();//获取所有图片容器
    var iconArr = $(this.iconBox).children();//获取所有小图标
    var indexNow = 0;// 定义当前的图片容器索引,即从第一张图片容器开始轮播
    $(imgBoxArr).eq(0).fadeIn().siblings().fadeOut();

    //2.开启轮播
    var speedTime = this.speedTime;
    var intervalTime = this.intervalTime;
    var timer = null;
    clearInterval(timer);
    timer = setInterval(autoPlay, intervalTime);
    
    //3.监听左右按钮图标的鼠标点击事件
    var prevIcon = this.prevIcon;
    var nextIcon = this.nextIcon;
    //左按钮鼠标点击事件
    $(prevIcon).click(function () {
        clearInterval(timer);
        if (indexNow < 0) {
            indexNow = $(imgBoxArr).length - 1;
        };
        changeIndex();
        indexNow--;
    });
    //右按钮鼠标点击事件
    $(nextIcon).click(function () {
        clearInterval(timer);
        autoPlay();//点击右按钮，相当于开启一次轮播
    });

    //4.监听左右按钮图标的鼠标移入移出事件
    var Carousel = this;//切换对象：重点，将当前对象Carousel用变量Carousel储存起来，后面要用
    var prevIconStyle = $(Carousel.prevIcon).attr("style");//储存左按钮已加载的样式，后面要用
    var nextIconStyle = $(Carousel.nextIcon).attr("style");//储存右按钮已加载的样式，后面要用
    //左按钮图标的鼠标移入移出事件
    $(prevIcon).hover(function () {  
        if (Carousel.prevIconMouseEnterCssJson) {
            $(this).css(Carousel.prevIconMouseEnterCssJson);//移入后，左按钮加载鼠标进入样式
        };
    },function () {  
        $(this).attr("style",prevIconStyle).css({"display":"block"});//移出后，左按钮加载原来样式
    });
    //右按钮图标的鼠标移入移出事件
    $(nextIcon).hover(function () {  
        if (Carousel.nextIconMouseEnterCssJson) {
            $(this).css(Carousel.nextIconMouseEnterCssJson);//移入后，左按钮加载鼠标进入样式
        };
    },function () {  
        $(this).attr("style",nextIconStyle).css({"display":"block"});//移出后，左按钮加载原来样式
    });

    //5.监听小图标的鼠标点击事件
    var icon = $(this.iconBox).children();
    //由于js异步编程的原因，第一种解决方案：需要将每一个i值对应的用icon[i]创造出来的一个无意义的index属性储存起来
    for (var i = 0; i < icon.length; i++) {
        icon[i].index = i;
        $(icon[i]).click(function () {
                indexNow = this.index;
                changeIndex();
        });
    };  
    //第二种解决方案：利用闭包，和第一种原理一样
    // for (var i = 0; i < icon.length; i++) {
    //         (function (i) {  
    //             $(icon[i]).click(function () {
    //                 indexNow = i;
    //                 changeIndex();
    //         });
    //     })(i)
    // };  
    //6.监听鼠标移入移出轮播图事件
    $(box).hover(function () {//鼠标移入轮播暂停
        clearInterval(timer);
        $(Carousel.prevIcon).css({"display":"block"});
        $(Carousel.nextIcon).css({"display":"block"});
    },function () {//鼠标移出轮播重新启动
        timer = setInterval(autoPlay, intervalTime);
        $(Carousel.prevIcon).css({"display":"none"});
        $(Carousel.nextIcon).css({"display":"none"});        
    });

    // 自动轮播函数
    function autoPlay() {
        //判断当前图片容器索引是否大于第一张图片容器的索引
        if (indexNow > $(imgBoxArr).length - 1) {
            indexNow = 0;
        };
        changeIndex();
        indexNow++;
    };

    // 小图标及图片容器切换函数
    var iconCssJson = this.iconCssJson ? this.iconCssJson : this.iconBaseDefalutCssJson;//判断外界是否定义小图标的基础样式
    var iconSelectedCssJson = this.iconSelectedCssJson ? this.iconSelectedCssJson : this.iconBaseSelectedCssJson;//判断外界是否定义小图标的选中样式
    function changeIndex() {
        $(imgBoxArr).eq(indexNow).fadeIn(speedTime).siblings().fadeOut(speedTime);//图片容器自动渐隐渐变
        $(iconArr).eq(indexNow).css(iconSelectedCssJson).siblings().css(iconCssJson);//小图标自动切换样式
    };
};
//将轮播组件添加到父容器中
Carousel.prototype.appendToParentContainer = function () {
    var box = this.box;
    var x = this.x;
    var y = this.y;
    var parentContainer = this.parentContainer;
    $(parentContainer).append(box); //将轮播组件添加到父容器中
    $(box).css({"position": "absolute","left": x + "px","top": y + "px"});
};
//初始化加载轮播组件
Carousel.prototype.load = function () {
    var pattern = this.pattern;
    //加载图片层容器
    this.createImgBox();
    //加载控制图标层容器
    this.createIconBox();
    this.createIcon();
    this.createPrevIcon();
    this.createNextIcon();
    this.createcontrolBox();
    //加载大容器
    this.createBox();
    //加载轮播图组件
    if(pattern == 1){
        this.createSlow();
    }else{
        this.createFade();
    }
    //方法执行顺序很重要，create()方法要先于appendToParentContainer()方法执行,
    //此后，appendToParentContainer()方法里面的box对象才是整个组件对象而不是单个box对象  
    this.appendToParentContainer();
};
//通过className进行设置元素样式
Carousel.prototype.setStyleByClassName = function (element, className) {
    if (className) {
        $(element).addClass(className);
    }
};
//通过cssJson进行设置元素样式
Carousel.prototype.setStyleByCssJson = function (element, cssJson) {
    if (cssJson) {
        $(element).css(cssJson);
    }
};
