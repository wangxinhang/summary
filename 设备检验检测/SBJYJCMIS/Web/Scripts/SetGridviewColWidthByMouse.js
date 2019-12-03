
    var tdOldX = null;
    var tdOldWidth = null;
    var tdMouseDownFlag = null;
    var tdWidth = null;

    //设置GridView列宽可以被拖动的函数
    function DragHeaderMouseMove(objTableTd, dataTable, arrColWidth) {
        if (event.offsetX > objTableTd.offsetWidth - 10)
            objTableTd.style.cursor = "col-resize";
        else
            objTableTd.style.cursor = "default";

        var colIndex = objTableTd.cellIndex;
        if (tdMouseDownFlag != null && tdMouseDownFlag == true) {
            if (tdOldWidth + (event.x - tdOldX) > 0)
                tdWidth = tdOldWidth + (event.x - tdOldX);
            objTableTd.style.width = tdWidth + "px";
            objTableTd.style.cursor = "col-resize";

            //gridview的数据行跟随标题行的列宽而改变
            SetColumnWidth(dataTable, colIndex, tdWidth, arrColWidth);
        }
    }

    //获取鼠标按下时的列宽
    function DragHeaderMouseDown(objTableTd) {
        if (event.offsetX > objTableTd.offsetWidth - 10) {
            tdMouseDownFlag = true;
            tdOldX = event.x;
            tdOldWidth = objTableTd.offsetWidth;
        }
    }

    //设置行的列宽(跟随标题行的列宽而改变）
    function SetColumnWidth(objTable, colIndex, NewWidth, arrColWidth) {
        var rows = objTable.rows.length;
        for (i = 0; i < rows; i++) {
            objTable.rows[i].cells[colIndex].style.width = NewWidth + "px";
        }
        //objTable.rows[0].cells[colIndex].style.width = NewWidth;
        //列新宽度写入数组
        arrColWidth[colIndex] = NewWidth;
    }