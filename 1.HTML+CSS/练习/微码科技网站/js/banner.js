$(function () {

    var iNow  = 0;
    var timer = null;
    var arr = ["华夏邮电咨询监理有限公司项目管理系统","华夏邮电咨询监理有限公司经营分析系统","华夏邮电咨询监理有限公司经营分析系统",
                "鲁山县安全生产管理平台","鲁山县安全生产管理平台","鲁山县安全生产管理平台",
                "河南铁塔公司基站电费管理平台","铁塔基站管理平台","河南铁塔公司基站电费管理平台",
                "煤矿隐患排查系统"];
    //   初始化
    $('.content-top-home-img .img a').eq(0).fadeIn().siblings().fadeOut();
    
    // 2.开启自动轮播   
    clearInterval(timer);
    timer = setInterval(autoPlay, 3000);

    //   3.监听鼠标移入移出事件
    $(".content-top-home-img .img").mouseenter(function () {
        clearInterval(timer);
    });
    $(".content-top-home-img .img").mouseleave(function () {
        clearInterval(timer);
        timer = setInterval(autoPlay, 3000);
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

    function autoPlay() {
        if (iNow == $('.content-top-home-img .img a').length) {
            iNow = 0;
        }
        toshow();
        iNow++;
    }
    function toshow() {
        $('.content-top-home-img .img a').eq(iNow).fadeIn().siblings().fadeOut();
        $(".case p").text(arr[iNow]);
    }
})