//#region 拖动
//设置弹窗的移动事件（通过标题栏）
function MovePopupWindow(dragObj) {
	if (dragObj[0]) dragObj = $(dragObj)[0]; //兼容Js和jQuery
	if (dragObj) {
		curDragObj = dragObj;
		dragObj.onmousedown = mousedown;
		dragObj.onmouseup = mouseup;
	}
}

////====================以下为弹窗拖曳代码====================////
var posX;
var posY;
var ppDiv;
var curDragObj;
//按下鼠标
function mousedown(e) {
	e = e ? e : window.event ? event : null;
	//if (obj[0]) obj = $(obj)[0];
	//if (obj) {
	//	curDragObj = obj;
		curDragObj.style.cursor = "move";
		ppDiv = curDragObj.parentNode;
		posX = e.clientX - parseInt(ppDiv.style.left);
		posY = e.clientY - parseInt(ppDiv.style.top);
		document.onmousemove = mousemove;
	//}
		return false;
}

function mouseup() {
	//if (obj[0]) obj = $(obj)[0];
	//if (obj) obj.style.cursor = "default";
	document.onmousemove = null;
	curDragObj.style.cursor = "default";
}

//鼠标拖曳
function mousemove(e) {
	e = e ? e : window.event ? event : null;
	var x = e.clientX - posX;
	var y = e.clientY - posY;
	if (x < 0) {
		x = 0;
	}
	else if (x > document.documentElement.clientWidth - ppDiv.offsetWidth) {
		x = document.documentElement.clientWidth - ppDiv.offsetWidth;
	}
	if (y < 0) {
		y = 0;
	}
	else if (y > document.documentElement.clientHeight - ppDiv.offsetHeight) {
		y = document.documentElement.clientHeight - ppDiv.offsetHeight;
	}
	ppDiv.style.left = x + "px";
	ppDiv.style.top = y + "px";
}

//松开鼠标
document.onmouseup = function () {
	document.onmousemove = null;
	if (curDragObj) curDragObj.style.cursor = "default";
}

//#endregion 拖动