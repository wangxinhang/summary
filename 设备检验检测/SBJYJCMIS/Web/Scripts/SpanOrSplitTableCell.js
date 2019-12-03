
var objFlag = new Array();
//合并单元格   
function SpanTableCell(objTable, rowIndex, colIndex, colSpan, operatorIndex) {
    var row = objTable.rows[rowIndex];
    var endColIndex = colIndex + colSpan - 1;  //合并的最后一个单元格的index

    //设置运算符的名称
    var s = row.cells[1].getElementsByTagName("select")[0];
    s.selectedIndex = operatorIndex;

    //合并或拆分单元格
    objFlag[rowIndex] = false;
    SpanOrSplitTableCell(s, colSpan);
}

//合并或拆分单元格
function SpanOrSplitTableCell(objOperator, colSpan) {
    var text = objOperator.options[objOperator.selectedIndex].text; //下拉框的选中文本
    var row = objOperator.parentNode.parentNode; //所在行
    var colIndex = objOperator.parentNode.cellIndex + 1;  //第一个单元格的index +1
    var beginTextBox = row.cells[colIndex].getElementsByTagName("input")[0]; //第一个单元格中的文本框对象
    var endColIndex = objOperator.parentNode.cellIndex + colSpan; //合并的最后一个单元格的index;
    var oldWidth = parseInt((document.all) ? beginTextBox.currentStyle.width : document.defaultView.getComputedStyle(beginTextBox, null).width);
    var ratio = 2.5; //beginTextBox长短变化倍率

    if (text == "介于") {
        //取消单元格合并
        row.cells[colIndex].colSpan = 1;

        //恢复beginTextBox宽度
        beginTextBox.style.width = oldWidth / ratio + "px";

        //恢复被合并的单元格 
        for (var i = colIndex + 1; i <= endColIndex; i++) {            
            row.cells[i].style.display = "table-cell";
            var endTextBox = row.cells[i].getElementsByTagName("input")[0];
            if (endTextBox) endTextBox.innerText = beginTextBox.value;
        }
        objFlag[row.rowIndex] = false;
    } else {
        if (!objFlag[row.rowIndex]) {
            //合并单元格
            row.cells[colIndex].colSpan = colSpan;

            //设定beginTextBox宽度
            beginTextBox.style.width = oldWidth * ratio + "px";

            //隐藏被合并的单元格      
            for (var i = colIndex + 1; i <= endColIndex; i++) {
                row.cells[i].style.display = "none";

                var endTextBox = row.cells[i].getElementsByTagName("input")[0];
                if (endTextBox) endTextBox.innerText = "";
            }           
           
            objFlag[row.rowIndex] = true;
        }
    }
}