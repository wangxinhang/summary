$(function () {


    // header上滑菜单效果
    $(".header-nav ul li:nth-child(4)").hover(function () {
        $(".header-nav ul li:nth-child(4) .box").show().animate({ "top": "82px"}, 300);
    }, function () {
        $(".header-nav ul li:nth-child(4) .box").hide().css({"top": "100px"});
    });
    $(".header-nav ul li:nth-child(4) .box").mouseleave(function () {
        $(this).hide();
    });


    // 轮播图效果
    // 1.动态生成小图标
    $(".banner").each(function () {
        $(".slider-ctl-icon").append("<span></span>");
    });
    // 2.初始化状态
    $(".slider-ctl-icon span").eq(0).addClass("current");
    // 3. 让滚动的内容归位(第一张在中间显示，其余都定位到右边显示)
    $(".banner").eq(0).siblings().css({ "left": "620px"});

    // 4.开启轮播
    var timer = null;
    clearInterval(timer);
    timer = setInterval(autoPlay, 2000);
    
    // 定义当前的图片索引
    var indexNow = 0;

    // 自动轮播函数
    function autoPlay() {
        // 1.先让当前的图片缓动到左边
        Animation($(".banner").eq(indexNow), -$(".banner").eq(0).outerWidth(false));
        // 2.当前索引值++
        indexNow++;
        // 判断当前图片索引是否大于最后一张图片的索引
        if (indexNow > $(".banner").length - 1) {
            indexNow = 0;
        }
        
        // 3.让下一个图片快速定位到右边
        $(".banner").eq(indexNow).css({"left": $(".banner").eq(0).outerWidth(false)+"px"});
        // 4.让下一个图缓动到当前
        Animation($(".banner").eq(indexNow),0);
        // 5.小图标也要跟着切换
        changeIndex();
    }
    // 缓动动画函数
    function Animation(obj, target) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            if (obj.position().left <= target) {
                clearInterval(obj.timer);
                obj.css("left",target+"px");
            } else {
                var speed = obj.position().left;
                // 缓动动画步长
                speed = Math.floor((target - speed) * 0.1);
                obj.css({"left": obj.position().left + speed + "px"});
            }
        }, 20);
    }
    // 小图标切换函数
    function changeIndex() {
        $(".slider-ctl-icon span").eq(indexNow).addClass("current").siblings().removeClass("current");
    }
    




    // article选项卡效果
    $(".tag-nav .nav ul li").eq(0).addClass("current").siblings().removeClass("current");
    $(".article-box").eq(0).css("display","block").siblings().css("display","none");
    $(".tag-nav .nav ul li").mouseenter(function () { 
        $(this).addClass("current").siblings().removeClass("current");
        $(".article-box").eq($(this).index()).css("display","block").siblings().css("display","none");
    });

})