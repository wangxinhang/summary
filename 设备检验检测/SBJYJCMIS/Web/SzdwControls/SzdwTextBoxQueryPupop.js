/// <reference path="../jquery-1.11.1.js" />
//文本框查询弹窗控件
function Szdw_TextBoxQueryPupop(position, x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    //控件容器
    this.panel = document.createElement("div");
    this.panel.style.position = position;
    this.panel.style.backgroundColor = "White";
    this.panel.style.border = "1px solid silver";
    this.panel.style.left = parseInt(x) + "px";
    this.panel.style.top = parseInt(y) + "px";
    $(this.panel).outerWidth(width);
    if (height > 0) {
        $(this.panel).outerHeight(height);
    }

    //查询按钮控件
    this.queryPanel = document.createElement("div");
    this.queryPanel.style.padding = "10px 10px 0px 10px";
    $(this.panel).append(this.queryPanel);

    //查询结果控件
    this.dataPanel = document.createElement("div");
    this.dataPanel.style.padding = "10px 10px 0px 10px";
    $(this.panel).append(this.dataPanel);

    //按钮组件
    this.buttonPanel = document.createElement("div");
    this.buttonPanel.style.position = "relative";
    this.buttonPanel.style.padding = "10px";
    $(this.buttonPanel).css({ "text-align": "right", "background-color": "#F5F5F5", "border-top": "1px solid #E0E0E0" });
    $(this.panel).append(this.buttonPanel);
    this.btnArray = new Array();
}

//创建按钮
Szdw_TextBoxQueryPupop.prototype.CreateButton = function (value) {
    var b = document.createElement("input");
    $(b).prop("type", "button");
    $(b).css({ "padding": "0px 5px 0px 5px", "min-width": "60px", "cursor": "pointer" });
    $(b).val(value);

    return b;
}