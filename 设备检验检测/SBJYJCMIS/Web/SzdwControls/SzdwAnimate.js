/// <reference path="../Scripts/jquery-1.11.1.js" />
//SzdwAnimate动画组件：
//spreadRight:向右伸展

$.fn.extend({
    //向右伸展
    spreadRight: function (distance, speed) {
        var e = this;
        var s = speed ? speed : 300;
        var x = $(e).position().left;
        $(e).css({ "display": "block" }).outerWidth(0);
        $(e).animate({ left: x, width: distance }, s);
    },

    //数字显示：累加显示
    //number:最终显示的数字；step:步长；speed;累加的速度；digits:小数位数
    numberAddup: function (number, step, speed, digits) {
        var e = this;
        var s = speed ? speed : 300;
        var d = digits ? digits : 0;
        var num = 0;
        var stepVal = step;
        if (step == 0 || step == null) {
            if (number <= 1) {
                stepVal = d > 0 ? 0.11 : 1;
            }

            if (number > 1) {
                stepVal = d > 0 ? 1.1111 : 1;
            }

            if (number > 500) {
                stepVal = d > 0 ? 11.1111 : 11;
            }

            if (number > 5000) {
                stepVal = d > 0 ? 111.1111 : 111;
            }

            if (number > 50000) {
                stepVal = d > 0 ? 1111.1111 : 1111;
            }

            if (number > 500000) {
                stepVal = d > 0 ? 11111.1111 : 11111;
            }
        }

        var t = setInterval(function () {
            $(e).text(num.toFixed(d));
            num += stepVal;
            if (num >= number) {
                $(e).text(eval(number).toFixed(d));
                clearInterval(t);
            }
        }, s);
    }
});