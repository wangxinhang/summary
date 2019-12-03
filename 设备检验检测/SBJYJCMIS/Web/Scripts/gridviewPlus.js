var IsIE = (document.all) ? true : false;
var dataTable = null;

//设置ResultControl的高度
function SetHeight() {
    var objPageBox = document.getElementById("PageBox");
    var objInsertPanel = document.getElementById("InsertPanel");
    var objResultPanel = document.getElementById("ResultPanel");
    var objResultTitle = document.getElementById("ResultTitle");
    var objResultControl = document.getElementById("ResultControl");
    var objResultFooter = document.getElementById("ResultFooter");

    var h_PageBox = parseInt(objPageBox.clientHeight);
    var h_InsertPanel = parseInt(objInsertPanel.clientHeight); //objInsertPanel.currentStyle.height
    var h_ResultTitle = parseInt(objResultTitle.clientHeight);
    var h_ResultFooter = parseInt(objResultFooter.clientHeight);
    var h_offsetValue = 60;

    objResultControl.style.height = h_PageBox - h_InsertPanel - h_ResultTitle - h_ResultFooter - h_offsetValue + "px";
}

//垂直滚动
function ScrollY(obj) {
    //alert(obj);
    var scrollDiv = obj;
    var rt = document.getElementById("ResultTitle");

    //定位当前垂直滚动位置
    var sy = document.getElementById("hidScrollTop");
    sy.value = scrollDiv.scrollTop;

    //左右滚动时同步滚动ResultTitle
    ScrollX(obj);
}

//水平滚动
function ScrollX(obj) {
    var scrollDiv = obj;
    var title = document.getElementById("ResultTitle");
    title.scrollLeft = scrollDiv.scrollLeft;

    //设置ResultTitle的宽度（等于ResultControl的可视宽度）
    if (title.clientWidth != scrollDiv.clientWidth)
        title.style.width = parseInt(scrollDiv.clientWidth) + "px";
    //return false;
}

//查询结果的尺寸改变事件
function rtResize(obj) {
    SetHeight();
    ScrollX(obj);
}

//设置查询结果的标题和脚行
function SetTitleFooter() {
    var t = document.getElementById("<%=gvResult.ClientID%>");
    var t2 = t.cloneNode(true);
    for (i = t2.rows.length - 1; i > 0; i--) {
        t2.deleteRow(i);
    }
    t2.style.textDecoration = "none";
    t.deleteRow(0);
    var rt = document.getElementById("ResultTitle");
    rt.appendChild(t2);

    //没有标题行的girdview表格
    dataTable = t;
}

//设置查询结果的垂直滚滚东位置
function SetScrollTop() {
    var rc = document.getElementById("ResultControl");
    var st = document.getElementById("hidScrollTop");
    rc.scrollTop = st.value;
}

//设置GridView列宽可以被拖动的函数
function DragHeaderMouseMove(objTableTd) {
    if (event.offsetX > objTableTd.offsetWidth - 10)
        objTableTd.style.cursor = "col-resize";
    else
        objTableTd.style.cursor = "default";
    colIndex = objTableTd.cellIndex;
    if (objTableTd.mouseDown != null && objTableTd.mouseDown == true) {
        if (objTableTd.oldWidth + (event.x - objTableTd.oldX) > 0)
            objTableTd.width = objTableTd.oldWidth + (event.x - objTableTd.oldX);
        objTableTd.style.width = objTableTd.width;
        objTableTd.style.cursor = "col-resize";

        //gridview的数据行跟随标题行的列宽而改变
        SetColumnWidth(dataTable, colIndex, objTableTd.width);
    }
}

//获取鼠标按下时的列宽
function DragHeaderMouseDown(objTableTd) {
    if (event.offsetX > objTableTd.offsetWidth - 10) {
        objTableTd.mouseDown = true;
        objTableTd.oldX = event.x;
        objTableTd.oldWidth = objTableTd.offsetWidth;
    }
}

//设置行的列宽(跟随标题行的列宽而改变）
function SetColumnWidth(objTable, colIndex, NewWidth) {
    objTable.rows[0].cells[colIndex].style.width = NewWidth;
}