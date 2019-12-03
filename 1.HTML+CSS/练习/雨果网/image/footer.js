//爆料
function BreakNews() {
    var regPhone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    var regEmail = /[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}/;
    var contactMsg = $.trim($('#baoliao_phone').val());
    var content = $('#baoliao_content').val();
    //判断联系方式
    if (!(regPhone.test(contactMsg) || regEmail.test(contactMsg))) {
        alert('请输入正确的邮箱或手机号')
        return false;
    } else {
        $('.contact-err-msg').hide();
    }
    //判断内容
    if (content.length <= 0) {
        return false;
    }

    // 读取 html
    var postData = {
        'content': content,
        'contact': contactMsg
    };
    $.ajax({
        url: '/tools/BreakNewsPost',
        type: 'POST',
        data: postData,
        success: function (result) {
            var res = $.parseJSON(result);
            alert(res['msgbox']);
            if (res.msg == 1) {
                $('.baoliao').hide();
            }
        },
        error: function () {
            alert('提交失败，请稍候重试');
            console.log("fail");
        }
    });
}

//建议、反馈
function Advice() {
    var content = $("#advice_content").val();
    var title = $("#advice_title").val();
    var contact = $("#advice_phone").val();
    var isPhone = /0?(13|14|15|17|18|19)[0-9]{9}/.test(contact);
    var isEmail = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(contact);
    if (!isEmail && !isPhone || contact == "您的电子邮件/电话") {
        alert("请填写正确的邮件或电话！")
        return false;
    }
    if (!title || !title.trim() || title == "标题") {
        alert("反馈标题不能为空！")
        // $.ligerDialog.warn("反馈信息不能为空！");
        return false;
    }
    if (!content || !content.trim()) {
        alert("反馈内容不能为空！")
        // $.ligerDialog.warn("反馈信息不能为空！");
        return false;
    }
    var attachment = ""; //附件的url
    $(".files ul li").each(function () {
        attachment = attachment + $(this).find("img").attr("src") + "|";
    });
    $.ajax({
        type: "POST",
        url: "/tools/submit_ajax.ashx?action=feedback_add",
        data: { "title": title, "content": content, "contact": contact, "attachment": attachment },
        dataType: "json",
        //timeout: 20000,
        success: function (data, textStatus) {
            if (data.msg == 1) {
                alert(data.msgbox)
                location.reload();
            } else {
                alert(data.msgbox)
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("状态：" + textStatus + "；出错提示：" + errorThrown)
        }

    });
}

//显示意见反馈框
function showAdvice() {
    $('.mask').removeClass('none');
    $('.layer.mes').removeClass('none');
}
//显示爆料框
function showBreakNews() {
    $('.mask').removeClass('none');
    $('.layer.baoliao').removeClass('none');
}
//显示弹框
function bindLayer(clickTarget,layer){

    $(clickTarget).on('click',function(e){
        e.preventDefault();
        $(layer+',.mask').removeClass('none')
    })
    $(layer).find('.btn_close').on('click',function(){
        $(layer+',.mask').addClass('none')
    })
}
bindLayer('.side_bar .item.mes','.layer.mes');
bindLayer('.side_bar .item.bl','.layer.baoliao');
bindLayer('.media .ic-ic_wechat','.layer.wx');
bindLayer('.media .ic-ic_applets','.layer.xcx');