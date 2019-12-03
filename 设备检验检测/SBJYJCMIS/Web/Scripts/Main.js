/// <reference path="jquery-1.11.1.js" />
var IsIE = (document.all) ? true : false; 

//==============================载入网页==============================//
var pd, ifr, la, imgLoader;
//创建网页层
function GetPageDiv(left, top, width, height) {
    var e = document.createElement("div");
    e.id = "RightContent";
    e.style.position = "absolute";
    e.style.display = "none";
    e.style.left = left + "px";
    e.style.top = top + "px";
    e.style.width = width + "px";
    e.style.height = height + "px";
    return e;
}

//创建网页层中的Iframe
function GetIframe(left, top, width, height) {
    var e = document.createElement("iframe");
    e.id = "iframePage";
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

function LoadPage(srcPage) {

    //获取网页对象及其宽高属性      
    var objPageHeader = document.getElementById("PageHeader");
    var objPageMiddle = document.getElementById("PageMiddle");
    var objLeftMenuBar = document.getElementById("LeftMenuBar");

    var w = document.body.clientWidth;
    var h = document.body.clientHeight;
    var h_PageHeader = parseInt(objPageHeader.offsetHeight);
    var h_PageMiddle = parseInt(objPageMiddle.offsetHeight);
    var w_LeftMenuBar = parseInt(objLeftMenuBar.offsetWidth);

    //计算Iframe对象位置及其宽高
    var left = w_LeftMenuBar;
    var top = h_PageHeader + h_PageMiddle;
    var width = w - w_LeftMenuBar;
    var height = h - h_PageHeader - h_PageMiddle;

    //动画图片,位置和高宽
    if (!imgLoader) {
        imgLoader = GetImgLoader();
    }

    var laWidth = $(imgLoader).width();
    var laHeight = $(imgLoader).height();
    var laLeft = (width - laWidth) / 2;
    var laTop = (height - laHeight) / 2;

    //载入网页
    if (pd) {
        if (ifr) ifr.src = srcPage;
        if (la) la.style.display = "block";
    } else {
        //创建网页层       
        pd = GetPageDiv(left, top, width, height);

        //创建Iframe 
        ifr = GetIframe(1, 1, width, height);
        ifr.src = srcPage;
        pd.appendChild(ifr);

        //创建加载动画
        la = LoadingAnimation(laLeft, laTop, laWidth, laHeight, imgLoader, ifr);
        pd.appendChild(la);

        //附加到document.body对象              
        document.body.appendChild(pd);
    }

    $(pd).fadeIn(1000);
}

function SetPage() {
    //获取网页对象及其宽高属性      
    var objPageHeader = document.getElementById("PageHeader");
    var objPageMiddle = document.getElementById("PageMiddle");
    var objLeftMenuBar = document.getElementById("LeftMenuBar");

    var w = document.body.clientWidth;
    var h = document.body.clientHeight;
    var h_PageHeader = parseInt(objPageHeader.offsetHeight);
    var h_PageMiddle = parseInt(objPageMiddle.offsetHeight);
    var w_LeftMenuBar = parseInt(objLeftMenuBar.offsetWidth);

    //计算Iframe对象位置及其宽高
    var left = w_LeftMenuBar;
    var top = h_PageHeader + h_PageMiddle;
    var width = w - w_LeftMenuBar;
    var height = h - h_PageHeader - h_PageMiddle;

    var ePage = $("#RightContent");
    if (ePage != null) {
        $(ePage).width(width);
        $(ePage).height(height);
    }

    var ifr = $("#iframePage");
    if (ifr != null) {
        $(ifr).width(width);
        $(ifr).height(height);
    }
}
//加载动画
function LoadingAnimation(left, top, width, height, imgLoader, ifr) {
    var e = document.createElement("div");
    e.style.position = "relative"; //relative
    e.style.left = left + "px";
    e.style.top = top + "px";
    e.style.width = width + "px";
    e.style.height = height + "px";
    e.style.zIndex = "1000";

    var t = document.createElement("div");
    t.style.marginTop = "10px";
    t.style.width = (width == 0 ? 200 : width) + "px";
    t.style.fontFamily = "微软雅黑";
    t.innerHTML = "网页努力加载中…";

    e.appendChild(imgLoader);
    e.appendChild(t);

    //加载完毕后，隐藏动画
    if (ifr[0]) ifr = $(ifr)[0];
    $(ifr).load(function () {
        e.style.display = "none";
    });

    return e;
}

//加载动画图片
function GetImgLoader() {
    var imgLoader = document.createElement("img");
    imgLoader.src = "Image/loader.gif";
    return imgLoader;
}

function UnloadPage() {
    var pd = (pd) ? pd : document.getElementById("RightContent");
    var ifr = (ifr) ? ifr : document.getElementById("iframePage");
    if (ifr) ifr.src = "";
    if (pd) $(pd).css("display", "none");
}
//==============================载入网页==============================//


//==========================菜单按钮鼠标悬停事件==========================//
function MenuItemMouseOver(obj) {
    obj.style.backgroundColor = "#CED4DF";
}

function MenuItemMouseOut(obj) {
    obj.style.backgroundColor = "";
}
//==========================菜单按钮鼠标悬停事件==========================//

//==========================左侧菜单栏伸缩事件==========================//
function ShowLeftMenu() {    
    var w = document.body.clientWidth;
    var h = document.body.clientHeight;

    var objTdLeftMainBar = document.getElementById("TdLeftMainBar");
    var objShowLeftMenu = document.getElementById("ShowLeftMenu");
    var objLeftMenuBar = document.getElementById("LeftMenuBar");
    var objShowLeftMenuImg = document.getElementById("ShowLeftMenuImg");
    var objRightContent = document.getElementById("RightContent");
    var objIframe = document.getElementById("iframePage");
    var ShowLeftMenuLeft = parseInt(objShowLeftMenu.offsetLeft);

    if (ShowLeftMenuLeft == 0) {
        objTdLeftMainBar.style.width = "312px";
        objLeftMenuBar.style.display = "block";
        objShowLeftMenu.style.left = "312px";
        objShowLeftMenuImg.style.top = "0px";

        if (objRightContent) {
            objRightContent.style.left = "313px";
            objRightContent.style.width = w - 313 - 1 + "px";
        }

        if (objIframe) objIframe.style.width = w - 313 - 1 + "px";
    } else {
        objTdLeftMainBar.style.width = "0px";
        objLeftMenuBar.style.display = "none";
        objShowLeftMenu.style.left = "0px";
        objShowLeftMenuImg.style.top = "-58px";

        if (objRightContent) {
            objRightContent.style.left = "0px";
            objRightContent.style.width = w + "px";
        }

        if (objIframe) objIframe.style.width = w + "px";

        //设置内容页高度
        var objPageHeader = document.getElementById("PageHeader");
        var objPageMiddle = document.getElementById("PageMiddle");
        var h_PageHeader = parseInt(objPageHeader.offsetHeight);
        var h_PageMiddle = parseInt(objPageMiddle.offsetHeight);
        var height = h - h_PageHeader - h_PageMiddle;
        if (objRightContent != null) {
            $(objRightContent).height(height);
        }
        if (objIframe != null) {
            $(objIframe).height(height);
        }

    }
}
//==========================左侧菜单栏伸缩事件==========================//