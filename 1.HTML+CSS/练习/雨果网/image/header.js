$(function () {
    if (SSOApi.Config.isLogin()) {
        SSOApi.getPassPort();
        if (window.location.host === "www.cifnews.com" || window.location.host === "test.cifnews.com"|| window.location.host === "release.cifnews.com") {
            $.ajax({
                url: "/User/GetInfo",
                type: "POST",
                data: { info: "nameAndhead" },
                success: function (ret) {
                    if (ret && ret.result) {
                        $('#userHeadImg').attr('alt', ret.message.name).attr('src', ret.message.head);
                        $('#username').html('&nbsp;' + ret.message.name);
                        $('#notlogin').addClass('none');
                        $('#islogin').removeClass('none');

                        if (typeof LoginSuccess === "function") {
                            LoginSuccess();
                        }
                    } else {
                        console.log("获取用户信息失败 nameAndhead");
                    }
                },
                error: function (xhr, status) {
                    console.log(xhr);
                    console.log(status);
                    if (typeof LoginFaild === "function") {
                        LoginFaild();
                    }
                }
            });
            GetVipIcons();
        }
        else {
            if (typeof LoginFaild === "function") {
                LoginFaild();
            }
        }
    }
    else {
        console.log('未登录');
    }
    // 头部动态效果
    var hov_timer = 0;
    $('.hov_box,.site,.lnr .userbox,.mobile').hover(function () {
        var that = this;
        $(this).siblings().find('.hover_wrap').hide();
        clearTimeout(hov_timer);
        hov_timer = setTimeout(function () {
            $(that).find('.hover_wrap').css({
                opacity: 0,
                top: '130%'
            }).show().animate({
                opacity: 1,
                top: '90px'
            }, 200)
        }, 150)

    }, function () {
        clearTimeout(hov_timer);
        $(this).find('.hover_wrap').hide();
    })

    $('.header .hic_search .open').on('click', function () {
        $('#searchDiv,.header .hic_search .hic_close').removeClass('none');
        $('body').css('overflow', 'hidden');
        $('.header .hic_search .open').addClass('none')

    })
    $('#searchDiv .searchleft,#searchDiv .searchright,.header .hic_search .hic_close').on('click', function () {
        $('#searchDiv,.header .hic_search .hic_close').addClass('none');
        $('.header .hic_search .open').removeClass('none')
        $('body').css('overflow', 'scroll');
    });

    var direct = 'up',
        c_position = 0,
        prev_position = 0,
        flip_position = 0;
    if (typeof (isHomePage) === "undefined" || !isHomePage) {
        $(window).on('scroll', function () {
            c_position = $(window).scrollTop();
            if (c_position >= prev_position && direct == 'up') {
                direct = 'down';
                flip_position = c_position;
            } else if (c_position < prev_position && direct == 'down') {
                direct = 'up';
                flip_position = c_position;
            }
            prev_position = c_position;
            if (c_position - flip_position > 100) {
                $('.header').css('transform', 'translate3d(0px,-100%,0px)')
            } else {
                $('.header').css('transform', 'translate3d(0px,0px,0px)')
            }
        })
    }
});

//搜索
function SiteSearch() {
    var searchWord = document.getElementById('keywords').value;
    if (typeof cifnewsCounter != "undefined" && typeof cifnewsCounter.api != "undefined" && typeof cifnewsCounter.api.log == "function") {
        cifnewsCounter.api.log("search", searchWord, "search", null, null, searchWord);
    }
    window.open("https://www.cifnews.com/search?keyword=" + encodeURI(searchWord));
}

//回车事件
document.onkeydown = function (event) {
    var e = event || window.event;
    if (e && e.keyCode == 13 && $('#searchDiv').is(':visible')) { //回车键的键值为13
        SiteSearch(); //调用登录按钮的登录事件
    }
};

function GetVipIcons() {
    $.ajax({
        url: "/api/index/VipIcons",
        type: "GET",
        //data: {  },
        success: function (ret) {
            if (ret && ret != null && ret.badges != null) {
                var html = '';
                $.each(ret.badges, function (index, value) {
                    html += '<div class="member_icon"><a href="javascript:void(0)" target="_blank"><img src="' + value.icon + '" alt=""></a> </div>';
                })
                $('#islogin .username').append(html);
            }
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            if (typeof LoginFaild === "function") {
                LoginFaild();
            }
        }
    });
}


