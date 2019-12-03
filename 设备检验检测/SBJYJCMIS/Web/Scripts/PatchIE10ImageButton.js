
//为解决在IE10中点击updatepanel里面的imagebutton时出现的错误
Sys.WebForms.PageRequestManager.getInstance()._origOnFormActiveElement = Sys.WebForms.PageRequestManager.getInstance()._onFormElementActive;
Sys.WebForms.PageRequestManager.getInstance()._onFormElementActive = function (element, offsetX, offsetY) {
    if (element.tagName.toUpperCase() === 'INPUT' && element.type === 'image') {
        offsetX = Math.floor(offsetX);
        offsetY = Math.floor(offsetY);
    }
    this._origOnFormActiveElement(element, offsetX, offsetY);
};  