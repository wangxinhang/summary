
//设置Iframe弹窗页面文件和标题
function SetPopupPageAndTitle(ppTitle, ppIfrm, pageName, titleName) {
    if (ppTitle[0]) ppTitle = $(ppTitle)[0];
    if (ppIfrm[0]) ppIfrm = $(ppIfrm)[0];

    if (ppTitle) ppIfrm.src = pageName;
    if (ppIfrm) ppTitle.innerHTML = titleName;
}

//设置Iframe弹窗
function SetIframePopupPage(ppDiv, ppHeader, ppIfrm) {    
    //获取当前页面宽高，计算弹窗宽高
    var pw = parseInt(document.documentElement.clientWidth);
    var ph = parseInt(document.documentElement.clientHeight);
    var w = pw * 4 / 5;
    var h = ph * 3 / 4;
    var l = (pw - w) / 2;
    var t = (ph - h) / 2;

    //设置弹窗透明边框
    var ppBox = document.getElementById("ppBox");
    if (ppBox == null) {
        ppBox = document.createElement("div");
        ppBox.id = "ppBox";
        ppBox.style.position = "absolute";
        ppBox.style.display = "none";
        ppBox.style.backgroundColor = "black";
    }
    ppBox.style.top = t + "px";
    ppBox.style.left = l + "px";
    ppBox.style.width = w + "px";
    ppBox.style.height = h + "px";
    var ppBorderWidth = 8; //露出的边框宽度

    //设置弹窗内容框 
    if (ppDiv[0]) ppDiv = $(ppDiv)[0];
    ppDiv.style.top = t + "px";
    ppDiv.style.left = l + "px";
    ppDiv.style.width = w - ppBorderWidth * 2 + "px";
    ppDiv.style.height = h - ppBorderWidth * 2 + "px";
    ppDiv.style.margin = ppBorderWidth + "px";


    //设置弹窗内容frame 
    if (ppHeader[0]) ppHeader = $(ppHeader)[0];
    if (ppIfrm[0]) ppIfrm = $(ppIfrm)[0];
    var h_ppHeader = ppHeader == null ? 0 : parseInt($(ppHeader).css("height")) + parseInt($(ppHeader).css("borderBottomWidth"));
    
    ppIfrm.style.width = w - ppBorderWidth * 2 + "px";
    ppIfrm.style.height = h - h_ppHeader - ppBorderWidth * 2 + "px";
}

//显示Iframe弹窗        
function ShowIframePopupPage(ppDiv, ppHeader, ppIfrm) {
    if (ppIfrm[0]) ppIfrm = $(ppIfrm)[0];
    var m = document.getElementById("maskDiv");
    if (m == null) {
        //弹窗遮罩
        m = document.createElement("div");
        m.id = "maskDiv";
        m.style.position = "absolute";
        m.style.width = "100%";
        m.style.height = "100%";
        m.style.top = "0px";
        m.style.left = "0px";
        m.style.backgroundColor = "black";

        //弹窗透明边框
        var ppBox = document.createElement("div");
        ppBox.id = "ppBox";
        ppBox.style.position = "absolute";
        ppBox.style.display = "none";
        ppBox.style.backgroundColor = "black";

        //设置弹窗内容框 
        if (ppDiv[0]) ppDiv = $(ppDiv)[0];
        ppDiv.style.position = "absolute";
        ppDiv.style.display = "block";
        ppDiv.style.backgroundColor = "White";
        ppDiv.style.border = "0px";

        //加载显示并设置位置宽高等属性               
        document.body.appendChild(m);
        $(m).fadeTo(0, 0.1);

        document.body.appendChild(ppBox);
        document.body.appendChild(ppDiv);
        SetIframePopupPage(ppDiv, ppHeader, ppIfrm);
        $(ppBox).fadeTo(0, 0.3);

    } else {
        $(m).fadeIn(0);
        $("#ppBox").fadeIn(0);
        $(ppDiv).fadeIn(0);
    }
}

//关闭Iframe弹窗
function HideIframePopupPage(ppDiv, ppIfrm) {
    var pp = document.getElementById("maskDiv");
    if (pp) pp.style.display = "none";

    var ppBox = document.getElementById("ppBox");
    if (ppBox) ppBox.style.display = "none";

    if (ppDiv[0]) ppDiv = $(ppDiv)[0];
    if (ppDiv) ppDiv.style.display = "none";

    if (ppIfrm[0]) ppIfrm = $(ppIfrm)[0];
    if (ppIfrm) ppIfrm.src = "";
}

//设置ppDiv即弹窗的移动事件通过标题栏
function MovePopupPage(dragObj) {
    if (dragObj[0]) dragObj = $(dragObj)[0];//兼容Js和jQuery
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
    if (obj) obj.style.cursor = "auto";
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
    if (curDragObj) curDragObj.style.cursor = "auto";
}