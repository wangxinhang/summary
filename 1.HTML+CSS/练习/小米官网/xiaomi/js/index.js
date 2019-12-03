$(function () {
    // 设置购物车的下拉效果
    $(".site-topbar-cart").hover(function () {
        $(this).css({"background-color": "white","color": "orange"});
        $(".site-topbar-cart .gouwuche").slideDown();
    }, function () {
        $(".site-topbar-cart .gouwuche").css("z-index", "10000").slideUp(name1);
        function name1() {
            $(".site-topbar-cart").css({"background-color": "#424242","color": "white"});
        };
    });


    // 设置菜单为宽度100%的下拉效果
    $(".header-nav .set ").mouseenter(function () {
        $(".set .slide").css({"width":$("body").width() + "px","left":-$(".header-nav ul").offset().left+"px"}).slideDown();       
    }); 
    $(".header-nav .set ").mouseleave(function () {
        $(".slide").slideUp();
    });
    $(window).resize(function () {
        $(".slide").css({"left":-$(".header-nav ul").offset().left+"px","width":$("body").width() + "px"});      
    });
    $(".header-nav .set ul li").mouseenter(function () {
        $(".slide .container").eq($(this).index()).css("display","block").siblings().css("display","none"); 
    });
    
    

    var iNow  = 0;
    var timer = null;
    // 1.动态创建控制小图标
    $('.content-top-home-img .img a').each(function () {
        $(".slider-ctl-icon").append("<span></span>");
    });
    
    //   初始化
    $('.content-top-home-img .img a').eq(0).fadeIn().siblings().fadeOut();
    $(".slider-ctl-icon span").eq(0).addClass("icon-current").siblings().removeClass("icon-current");
    
    // 2.开启自动轮播   
    clearInterval(timer);
    timer = setInterval(autoPlay, 2000);

    //   3.监听鼠标移入移出事件
    $(".content-top-home-img .img").mouseenter(function () {
        clearInterval(timer);
    });
    $(".content-top-home-img .img").mouseleave(function () {
        clearInterval(timer);
        timer = setInterval(autoPlay, 2000);
    });

    // 4.监听向左向右按钮点击事件   
    $(".slider-ctl-btn span").eq(0).click(function () {
        clearInterval(timer);
        if (iNow == -1) {
            iNow = $('.content-top-home-img .img a').length - 1;
        }
        toshow();
        iNow--;
    });
    $(".slider-ctl-btn span").eq(1).click(function () {
        clearInterval(timer);
        autoPlay();
    });

    // 5.监听小图标点击事件   
    $(".slider-ctl-icon span").click(function () {
        iNow = $(this).index();
        toshow();
        $(this).css({
            "border": "2px solid orange"
        }).siblings().css({
            "border": "2px solid gray"
        });
    });
    
    $(".slider-ctl-icon").mouseleave(function () {
        $(".slider-ctl-icon span").css({
            "border": "2px solid gray"
        });
    });



    function autoPlay() {
        if (iNow == $('.content-top-home-img .img a').length) {
            iNow = 0;
        }
        toshow();
        iNow++;
    }

    function toshow() {
        $('.content-top-home-img .img a').eq(iNow).fadeIn().siblings().fadeOut();
        $(".slider-ctl-icon span").eq(iNow).addClass("icon-current").siblings().removeClass("icon-current");
    }
})