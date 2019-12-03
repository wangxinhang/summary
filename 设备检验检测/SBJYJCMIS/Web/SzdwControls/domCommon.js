var domCommon = {
    SetOpacity: function (element, backColor, opacity) {
        var e = element;
        $(e).css({ "background-color": backColor });
        var IsIE9 = navigator.userAgent.indexOf("MSIE 9.0") > 0;
        if (!backColor || backColor.toUpperCase() == "TRANSPARENT") {
            return false;
        } else {
            var bgc = backColor.toUpperCase();
            if (bgc.indexOf("RGB") < 0 && bgc.indexOf("#") < 0) bgc = colorHash[bgc];
            if (bgc.indexOf("#") == 0) bgc = bgc.colorHexToRgb();

            var rgba = bgc.replace("RGB", "RGBA").replace(")", ",");
            var cssJson = { "-moz-opacity": opacity, "-khtml-opacity": opacity, "background-color": rgba + opacity + ")" };
            if (!IsIE9) { cssJson["filter"] = "Alpha(opacity = " + opacity * 100 + ")"; }
            $(e).css(cssJson);
        }
    },
    getMaxZIndex: function (container) {
        return maxZ = Math.max.apply(null, $.map($(container).find("*"), function (e, n) {
            if ($(e).css("position") == "absolute")
                return parseInt($(e).css("z-index")) || 1;
        }));
    },
    getMaxZIndexInBody: function () {
        return maxZ = Math.max.apply(null, $.map($("Body > *"), function (e, n) {
            if ($(e).css("position") == "absolute")
                return parseInt($(e).css("z-index")) || 1;
        }));
    },
    getMaxZIndexJs: function () {
        var divs = document.getElementsByTagName("div");
        for (var i = 0, max = 0; i < divs.length; i++) {
            max = Math.max(max, divs[i].style.zIndex || 0);
        }
        return max;
    }
}