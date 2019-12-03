

/**
 * 获取css的样式值
 * @param {object}obj
 * @param attr
 * @returns {*}
 */
function getCSSAttrValue(obj, attr) {
    if(obj.currentStyle){ // IE 和 opera
        return obj.currentStyle[attr];
    }else {
        return window.getComputedStyle(obj, null)[attr];
    }
}

/**
 * 缓动动画
 * @param obj
 * @param json
 * @param fn
 */
function buffer(obj, json, fn) {
    // 1.1 清除定时器
    clearInterval(obj.timer);

    // 1.2 设置定时器
    var begin = 0, target = 0, speed = 0;

        obj.timer = setInterval(function () {
        // 1.3.0 旗帜
        var flag = true;
        for(var k in json){
            // 1.3 获取初始值
            if("opacity" == k){ // 透明度
                begin  = Math.round(parseFloat(getCSSAttrValue(obj, k)) * 100) || 100;
                target = parseInt(json[k] * 100);
            }else if("scrollTop" == k){
                begin  = Math.ceil(obj.scrollTop);
                target = parseInt(json[k]);
            }else { // 其他情况
                begin  = parseInt(getCSSAttrValue(obj, k)) || 0;
                target = parseInt(json[k]);
            }

            // 1.4 求出步长
            speed = (target - begin) * 0.1;

            // 1.5 判断是否向上取整
            speed = (target > begin) ? Math.ceil(speed) : Math.floor(speed);

            // 1.6 动起来
            if("opacity" === k){ // 透明度
                // w3c的浏览器
                obj.style.opacity = (begin + speed) / 100;
                // ie 浏览器
                obj.style.filter = 'alpha(opacity:' + (begin + speed) +')';
            }else if("scrollTop" === k){
                obj.scrollTop = begin + speed;
            }else {
                obj.style[k] = begin + speed + "px";
            }

            // 1.5 判断
            if(begin != target){
                flag = false;
            }
        }

        // 1.3 清除定时器
        if(flag){
            clearInterval(obj.timer);
            // 判断有没有回调函数
            if(fn){
                fn();
            }
        }
    }, 20);
};
/**
 * 获取元素
 * @param  id 
 */
function $(id) {
    return typeof id === "string" ? document.getElementById(id): null;
}

/**
 * 轮播效果
 */
    // 1. 获取需要的标签
    var slider = $("slider");
    var slider_main = $("slider_main");
    var slider_main_img = slider_main.children;
    var slider_ctl = slider.children[1];
    var iNow = 0;
    
    // 2. 动态创建小图标
    for(var i=0; i<slider_main_img.length; i++){
        var span = document.createElement("span");
            span.className = "slider-ctl-icon";
            // span.innerText = slider_main_img.length - i - 1;
        slider_ctl.insertBefore(span, slider_ctl.children[1]);
    }

    // 3. 让第一个选中
    slider_ctl.children[1].className = "slider-ctl-icon current";

    // 4. 让滚动的内容归位
    var scroll_w = slider.offsetWidth;
    for(var j=1; j<slider_main_img.length; j++){
        slider_main_img[j].style.left = scroll_w + "px";
    }

    // 5. 遍历监听操作
    var slider_ctl_child = slider_ctl.children;
    for(var i=0; i<slider_ctl_child.length; i++){
        // 5.1 监听点击
        slider_ctl_child[i].onmousedown = function () {
            // 5.2 判断
            if(this.className === "slider-ctl-prev"){ // 左边
                /*
                 1.当前可视区域的图片快速右移;
                 2.上一张图片快速出现在可视区域的左边
                 3.让这张图片做动画进入
                */
                buffer(slider_main_img[iNow], {"left": scroll_w});
                iNow--;
                // 判断
                if(iNow < 0){
                    iNow = slider_main_img.length - 1;
                }
                slider_main_img[iNow].style.left = -scroll_w + 'px';
                buffer(slider_main_img[iNow], {"left": 0});

            }else if(this.className === "slider-ctl-next"){ // 右边
                autoPlay();
            }

            changeIndex();
        }
    }

    // 6. 切换索引
    function changeIndex() {
        for(var i=1; i<slider_ctl_child.length-1; i++){
            slider_ctl_child[i].className = "slider-ctl-icon";
        }

        slider_ctl_child[iNow+1].className = "slider-ctl-icon current";
    }

    // 7. 自动播放
    clearInterval(timer);
    var timer = setInterval(autoPlay, 3000);
    function autoPlay() {
        /*
         1.当前可视区域的图片快速左移;
         2.下一张图片快速出现在可视区域的右边
         3.让这张图片做动画进入
         */
        buffer(slider_main_img[iNow], {"left": -scroll_w});
        iNow++;
        // 判断
        if(iNow >= slider_main_img.length){
            iNow = 0;
        }
        slider_main_img[iNow].style.left = scroll_w + 'px';
        buffer(slider_main_img[iNow], {"left": 0});

        changeIndex()
    }

    // 8. 设置和清除定时器
    slider.onmouseover = function () {
        clearInterval(timer);
        
    };
    slider.onmouseout = function () {
         clearInterval(timer);
        timer = setInterval(autoPlay, 3000);
    };


