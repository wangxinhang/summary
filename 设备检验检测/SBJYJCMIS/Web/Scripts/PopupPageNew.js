//引用颜色转换JS
document.write("<script language=javascript src='Scripts/ColorConverter.js'></script>");

//弹出页面：PopupPage
//参数| left, top, width, height,winBorderWidth,titleHeight:整数，若输入“auto”表示系统自动设置
//参数| winBackColor, winBackOpacity, titleColor:整数，若输入“auto”表示系统自动设置;颜色应为颜色名称或十六进制：比如“Black”或“#00FFEE”
//参数| title: 标题文字信息；loadFullPathPage：要加载的具有完全路径的页面文件
//参数| closeFunction:点击关闭按钮是执行的函数：写函数名时不要加引号和后面的括号；加引号就意味着不执行，比如"auto"或'auto'或者不写参数;
//参数| moveable:是否在标题栏按下鼠标时可拖动窗体，1表示可拖动，0表示不能拖动，"auto"表示系统自动设置
//参数| maskable:是否显示遮罩，1表示显示，0表示不显示,"auto"表示系统自动设置

//全局变量：loadedPage-加载的页面，m-遮罩，pw-窗体(透明边框)，pt-标题栏，pc页面内容iframe
//全局变量：b-关闭按钮,la-加载动画,imgLoader-动画图片
var loadedPage, m, pw, pt, pc, b, la, imgLoader;
function GetPopupPage(left, top, width, height, winBorderWidth, winBackColor, winBackOpacity, titleHeight, titleColor, title, loadFullPathPage,closeFunction,
                      moveable, maskable) {
    //当left,top,width,height为auto时，
    //窗体宽度高度为父页面的2/3，水平垂直居中
    //窗体的宽度高度最大为父页面的4/5
    var w = $(document.body).width();
    var h = $(parent.document.body).find("iframe").height();
    var maxWidth = w * 4 / 5;
    var maxHeight = h * 6 / 7;

    var width = (width == "auto" || width.toString().length == 0) ? maxWidth : width;
    width = (width > maxWidth) ? maxWidth : width;
    var height = (height == "auto" || height.toString().length == 0) ? maxHeight : height;
    height = (height > maxHeight) ? maxHeight : height;
    var top = (top == "auto" || top.toString().length == 0) ? (h - height) / 2 : top;
    var left = (left == "auto" || left.toString().length == 0) ? (w - width) / 2 : left;

    //窗体边框宽度、标题背景色、背景透明度为auto时的默认值
    //边框宽度:8px;背景色:Black;背景透明度:0.5
    var winBorderWidth = (winBorderWidth == "auto" || winBorderWidth.toString().length == 0) ? 8 : winBorderWidth;
    var winBackColor = (winBackColor == "auto" || winBackColor.toString().length == 0) ? "Black" : winBackColor;
    var winBackOpacity = (winBackOpacity == "auto" || winBackOpacity.toString().length == 0) ? 50 : winBackOpacity;
    
    //标题高度前景色为auto时的默认值
    //高度：32px；前景色：White
    var titleHeight = (titleHeight == "auto" || titleHeight.toString().length == 0) ? 32 : titleHeight;
    var titleColor = (titleColor == "auto" || titleColor.toString().length == 0) ? "White" : titleColor;

    //窗体moveable为auto时的默认值：1
    var moveable = (moveable == "auto" || moveable.toString().length == 0) ? 1 : moveable;

    //窗体有无遮罩为auto时的默认值：1
    var maskable = (maskable == "auto" || moveable.toString().length == 0) ? 1 : maskable;
    
    //加载遮罩层，并使之透明    
    if (maskable == 1) {
        if (!m) {
            m = GetMaskDiv();
            document.body.appendChild(m);
        }
        $(m).fadeTo(0, 0.1);
    }
    
    //加载弹出页面窗体
    var bw = winBorderWidth; //窗体透明边框宽度
    var w = width - bw * 2; //窗体透明框内宽度
    var h = height - bw; //窗体透明框内高度：顶端因标题栏故不计算边框
    var btnw = 28; //标题按钮宽度
    var btnh = 22; //标题按钮高度度
    btnh = (btnh > titleHeight) ? titleHeight : btnh;

    var btnl = width - bw - btnw;  //标题按钮宽度
    var th = titleHeight; //标题高度
    var tw = w - btnw; //标题高度
    var ch = h - th; //内容高度

    //动画图片,位置和高宽
    if (!imgLoader) {
        imgLoader = GetImgLoader();
    }

    var laWidth = $(imgLoader).width();
    var laHeight = $(imgLoader).height();
    var laLeft = (w - laWidth) / 2;
    var laTop = (ch - laHeight) / 2;
    
    if (pw) {
        //同一页面如果弹窗曾经打开过，重新设置其位置宽高
        SetElementLTWH(pw, left, top, width, height);
        if (pt) SetElementLTWH(pt, bw, 0, tw, th);
        if (b) SetElementLTWH(b, btnl, 0, btnw, btnh);

        if (pc) {
            SetElementLTWH(pc, bw, th, w, ch);
            pc.src = loadFullPathPage;
        }

        if (la) {
            SetElementLTWH(la, laLeft, laTop, laWidth, laHeight);
            la.style.display = "block";
        }
    } else {  
        //创建窗体层（透明边框）      
        pw = GetPopupWindowDiv(left, top, width, height, winBackColor, winBackOpacity);

        //创建标题层
        pt = GetTitleDiv(bw, 0, tw, th, title, titleColor);
        if (moveable == 1) {
            pt.style.cursor = "move";
            pt.onmousemove = function () { MovePopupPage(this); };
        }
        pw.appendChild(pt);

        //创建内容层
        pc = GetContentDiv(bw, th, w, ch); 
        pc.src = loadFullPathPage;
        pw.appendChild(pc);

        //创建关闭按钮
        var img = "Image/CloseW.png";
        b = GetButtonCloseDiv(btnl, 0, btnw, btnh, img);
        b.id = "btnPwClose";
        pw.appendChild(b);

        //创建加载动画
        la = LoadingAnimation(laLeft, laTop, laWidth, laHeight, imgLoader, pc);
        pw.appendChild(la);        
        
        //附加到document.body对象        
        document.body.appendChild(pw);        
    }

    //弹出窗体并设置加载页面、标题内容、标题Tip和关闭按钮事件
    $(pw).css("display", "block");
    pt.innerHTML = title;
    pt.title = title;
    b.onclick = function () { HidePopupPage(m, pw, pc); if (typeof (closeFunction) == "function") closeFunction(); };        
}

//弹窗重载之一：默认设置弹窗
//参数| title, loadFullPathPage,closeFunction
function GetPopupPageDefault(title, loadFullPathPage, closeFunction) {
    GetPopupPageWH( "auto", "auto", title, loadFullPathPage, closeFunction);
}

//弹窗重载之二：设置窗体的宽高
//参数| width,height,title, loadFullPathPage,closeFunction
function GetPopupPageWH(width, height, title, loadFullPathPage, closeFunction) {
    GetPopupPageLTWH("auto", "auto", width, height, title, loadFullPathPage, closeFunction);
}

//弹窗重载之三：设置窗体的位置和宽高
//参数| width,height,title, loadFullPathPage,closeFunction
function GetPopupPageLTWH(left,top,width, height, title, loadFullPathPage, closeFunction) {
    GetPopupPage(left, top, width, height, "auto", "auto", "auto", "auto", "auto", title, loadFullPathPage, closeFunction, "auto", "auto");
}

//弹窗重载之四：设置窗体的位置和宽高，固定：不可移动，没有遮罩
//参数| width,height,title, loadFullPathPage,closeFunction
function GetPopupPageFixed(left, top, width, height, title, loadFullPathPage, closeFunction) {
    GetPopupPage(left, top, width, height, "auto", "auto", "auto", "auto", "auto", title, loadFullPathPage, closeFunction, 0, 0);
}

//遮罩层
function GetMaskDiv() {
    var e = document.createElement("div");
    e.style.position = "absolute";
    e.style.left = "0px";
    e.style.top = "0px";
    e.style.width = "100%";
    e.style.height = "100%";
    e.style.backgroundColor = "black";
    e.style.display = "none";

    return e;
}

//加载动画
function LoadingAnimation(left, top, width, height, imgLoader, objParent) {
    var e = document.createElement("div");
    e.style.position = "relative"; //relative
    e.style.left = left + "px";
    e.style.top = top + "px";
    e.style.width = width + "px";
    e.style.height = height + "px";
    e.appendChild(imgLoader);

    //加载完毕后，隐藏动画
    if (objParent[0]) objParent = $(objParent)[0];
    $(objParent).load(function () {
        e.style.display = "none";
    });

    //此种方法Chrome下不起作用
//    objParent.onreadystatechange = function () {
//        if (this.readyState == "loaded" || this.readyState == "complete") {
//            e.style.display = "none";
//        }
//    }

    return e;
}

//加载动画图片
function GetImgLoader() {
    var imgLoader = document.createElement("img");
    imgLoader.src = "Image/loading.gif";
    return imgLoader;
}

//设置元素对象的位置和宽高属性
//参数|e:元素对象；left, top, width, height:左右宽高的数值
function SetElementLTWH(e,left, top, width, height) {
    if (e[0]) e = $(e)[0];
    e.style.left = left + "px";
    e.style.top = top + "px";
    e.style.width = width + "px";
    e.style.height = height + "px";
}

//背景边框层（窗体层）
function GetPopupWindowDiv(left,top,width,height,winBackColor, winBackOpacity) {
    var e = document.createElement("div");
    e.style.position = "absolute";
    e.style.display = "none"; 
    e.style.left = left + "px";   
    e.style.top = top + "px";
    e.style.width = width + "px";
    e.style.height = height + "px";

    var IsIE8 = navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i) == "8.";   
    if (IsIE8) {
        e.style.backgroundColor = winBackColor;
        e.style.filter = "Alpha(opacity = " + winBackOpacity + ")";
    } else {
        var bgc = winBackColor.toUpperCase();
        if (bgc.indexOf("RGB") < 0 && bgc.indexOf("#") < 0) bgc = colorHash[bgc];
        if (bgc.indexOf("#") == 0) bgc = bgc.colorHexToRgb();

        var rgba = bgc.replace("RGB", "RGBA").replace(")", ",");
        $(e).css("backgroundColor", rgba + winBackOpacity / 100 + ")");
    }
        
    return e;
}

//标题层
function GetTitleDiv(left, top, width, height,text,textColor) {
    var e = document.createElement("div");
    e.style.position = "relative"; //relative
    e.style.left = left + "px";
    e.style.top = top + "px";
    e.style.width = width + "px";
    e.style.height = height + "px";
    e.style.cursor = "default";
    e.style.fontFamily = "微软雅黑";
    e.style.fontSize = "11pt";

    var textColor = (textColor.length == 0 || textColor == "auto") ? "White" : textColor;
    e.style.color = textColor;

    e.style.lineHeight = height + "px";
    e.style.textOverflow = "ellipsis";
    e.style.whiteSpace = "nowrap";
    e.style.overflow = "hidden";
    e.innerHTML = text;
    e.title = text;
    return e;
}

//标题层：标题关闭按钮层
function GetButtonCloseDiv(left, top, width, height, fullPathImage) {
    var e = document.createElement("div");
    e.style.position = "absolute";
    e.style.overflow = "hidden";
    e.style.left = left + "px";
    e.style.top = top + "px";
    e.style.width = width + "px";
    e.style.height = height + "px";
    e.style.cursor = "hand";
    e.onmouseover = function () { this.style.backgroundColor = "Red"; };
    e.onmouseout = function () { this.style.backgroundColor = ""; };

    var img = document.createElement("img");
    var size = height - 6;
    img.style.position = "relative";
    img.style.left = (width - size) / 2 + "px";
    img.style.top = (height - size) / 2 + "px";
    img.style.width = size + "px";
    img.style.height = size + "px";
    img.src = fullPathImage;
    e.appendChild(img);

    return e;
}

//关闭按钮单击事件
function HidePopupPage(objMask, objWin, objIfrm) {
    $(objMask).css("display", "none");
    $(objWin).css("display", "none");

    if (objIfrm[0]) objIfrm = $(objIfrm)[0];
    if (objIfrm) objIfrm.src = "";
}

//内容层
function GetContentDiv(left, top, width, height) {
    var e = document.createElement("iframe");
    e.style.position = "absolute";
    e.style.backgroundColor = "White";
    e.style.left = left + "px";
    e.style.top = top + "px";
    e.style.width = width + "px";
    e.style.height = height + "px";
    e.style.cursor = "hand";
    e.frameBorder = "0px";
    e.scrolling = "no";
    e.marginHeight = "0px";
    e.marginWidth = "0px";

    return e;
}

//设置弹窗的移动事件（通过标题栏）
function MovePopupPage(dragObj) {
    if (dragObj[0]) dragObj = $(dragObj)[0]; //兼容Js和jQuery
    if (dragObj) {
        dragObj.onmousedown = function () { mousedown(event, this) };
        dragObj.onmouseup = function () { mouseup(this) };
    }
}

////====================以下为弹窗拖曳代码====================////
var posX;
var posY;
var ppDiv;
var curDragObj;
//按下鼠标
function mousedown(e, obj) {
    e = e ? e : window.event ? event : null;
    if (obj[0]) obj = $(obj)[0];
    if (obj) {
        curDragObj = obj;
        obj.style.cursor = "move";
        ppDiv = obj.parentNode;
        posX = e.clientX - parseInt(ppDiv.style.left);
        posY = e.clientY - parseInt(ppDiv.style.top);
        document.onmousemove = mousemove;
    }
}

function mouseup(obj) {
    if (obj[0]) obj = $(obj)[0];
    if (obj) obj.style.cursor = "default";
}

//鼠标拖曳
function mousemove(e) {
    e = e ? e : window.event ? event : null;
    ppDiv.style.left = (e.clientX - posX) + "px";
    ppDiv.style.top = (e.clientY - posY) + "px";
    var ppBox = document.getElementById("ppBox");
    if (ppBox) {
        ppBox.style.left = (e.clientX - posX) + "px";
        ppBox.style.top = (e.clientY - posY) + "px";
    }
}

//松开鼠标
document.onmouseup = function () {
    document.onmousemove = null;
    if (curDragObj) curDragObj.style.cursor = "default";
}