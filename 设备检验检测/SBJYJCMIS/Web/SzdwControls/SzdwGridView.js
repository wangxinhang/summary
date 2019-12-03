//数据表对象SzdwGridView
/// <reference path="../Scripts/jquery-1.11.1.js" />
/// <reference path="SzdwCommon.js" />

//#region 对象SzdwGridView
function SzdwGridView(position, x, y, width, height) {
    //#region 基本属性
    this.namingContainer = null; //命名容器即父容器
    this.position = position;//层定位
    this.zIndex = -1;//层索引
    this.x = x;//坐标x
    this.y = y; //坐标x
    this.width = width; //宽度
    this.height = height; //高度
    this.minWidth = 0; //最小宽度
    this.minHeight = 0; //最小高度
    this.allowSorting = true; //是否允许点击表头字段排序
    this.allowColumnWidening = true; //是否允许列鼠标拖动改变宽度
    this.allowRowClickEvent = false; //是否允许行单击事件
    this.allowRecoverRowStyleWhenDataBinding = true;//是否允许数据绑定时恢复行的初始样式
    this.hasTitle = false; //是否允许显示对象的标题
    this.hasButtonPanel = false; //是否允许显示对象的功能按钮面板
    this.hasSumRow = false; //是否允许显示对象的脚行
    this.hasPagination = true; //是否允许显示分页控件
    this.hasOperationColumn= true; //是否有数据操作列：编辑删除
    this.popupWindow = null; //弹出窗口
    this.freezeCols = 0;//冻结列的数量，从左侧开始按顺序计数，默认为0表示没有冻结列；
    this.freezeColBodyIsScrollingElement = false;//冻结列面板是否是响应鼠标滚动的当前元素
    this.scrollKeeingType = 0;//刷新后保持滚动位置的方式，0：不保持；1：保持水平和垂直滚动位置；2：仅保持水平滚动位置；3：仅保持垂直滚动位置
    //#endregion 基本属性

    //#region Ajax访问文件和参数

    this.requestUrl = null; //请求文件（含路径）
    this.paramJson = null; //Json格式参数
    this.deleteRequestUrl = null; //请求文件（含路径）
    this.deleteParamJson = null; //Json格式参数

    //#endregion Ajax访问文件和参数

    //#region 字段和数据
    this.pkField = "Id";
    this.fieldJsonData = null; //Json格式字段数据（可在其中嵌套包含Json格式CSS样式) 
    this.fieldType = { Integer: "Integer", Percentage: "Percentage", Decimal: "Decimal", Date: "Date", DateTime: "DateTime", String: "String" }; //Json格式字段类型枚举
    this.orderField = null; //排序字段：默认无
    this.orderType = "ASC"; //排序方式：默认升序
    this.localRecordJsonList = null;//数据表体body的本地数据集：格式为json对象数组
    this.recordSetJson = null; //数据表体body的分页数据：来自于Ajax异步从数据库获取的行列数据或本地分页数据
    this.recordCount = 0; //获取的数据记录的总行数
    this.recordSumJson = null; //获取Json格式的数据记录汇总值{Amount:100,fee:20}
    this.fnDataBindCallBack = null;

    /*fieldJsonData示例：
    [{ "Field": "ProjectName", "Text": "项目名称","Title": "提示信息", "Width": 350, "Style": { "text-align": "left" }, "OrderField": "ProjectName" },
    { "Field": "RevenueFinalAmount", "Text": "收入金额", "Width": 90, "FieldType": szdwGv.fieldType.Decimal, "Digits": 6, OrderField": "RevenueFinalAmount",
       HasFilter:false,"HasExpandor": true,FnShowExpandor:FnShowExpandor,FnControlColumn: FnControlColumn}]
       FnShowExpandor:控制扩展器是否显示的外部函数，返回值为布尔型，参数为rowJsonData(行json数据)和fieldName(字段名称),
       与HasExpandor一起出现，若没有此函数定义，则默认显示扩展器
       HasFilter:是否有数据筛选器
    fieldJsonData示例*/
    //#endregion 字段和数据

    //#region 数据操作列
    this.operationColumnIndex = -1;///数据操作列索引
    this.fnOperationColumnCreated = null;//数据操作列创建后调用的外部方法;参数：cell:当前单元格
    this.operationColumnWidth = 130; //数据操作列宽度
    this.operationColumnText = "操作"; //数据操作列宽度
    this.operationHeadCssName = null; //数据操作列样式名称
    this.operationHeadCssJson = null; //数据操作列Json格式样式定义
    this.operationCellCssName = null; //数据操作列样式名称
    this.operationCellCssJson = { "text-align": "center" };   //数据操作列Json格式样式定义
    this.permission = { modifyPermission: false, deletePermission: false }; //用户权限，json格式,比如：{modifyPermission:modifyPermission,deletePermission:deletePermission}
    

    //按钮
    this.fnDeleting = null; //删除时调用的外部方法
    this.fnEditing = null; //编辑时调用的外部方法
    this.operationBtnWidth = 0;// 60;
    this.operationBtnHeight = 25;
    this.operationBtnCssName = null;
    this.operationBtnCssJson = { "float": "left", "text-align": "center", "margin-left": "4px", "padding": "0px 2px 0px 0px", "background-color": "transparent", "border": "1px solid #D0D0D0", "color": "#1B60C3", "cursor": "pointer" };
    this.operationBtnHoverCssName = null;
    this.operationBtnHoverCssJson = { "background-color": "#E0E0E0", "border": "1px solid #D0D0D0", "color": "Red" };
    this.operationBtnDisabledCssName = null;
    this.operationBtnDisabledCssJson = { "float": "left", "text-align": "center", "margin-left": "4px", "padding": "0px 2px 0px 0px", "border": "1px solid #D0D0D0", "color": "silver" };
    this.hasOperationBtnText = true;    

    //按钮图片
    this.operationImageWidth = this.operationBtnHeight;
    this.operationImageHeight = this.operationBtnHeight;
    this.operationImageCssName = null;
    this.operationImageCssJson = { "border": "0px solid red" };
    this.editingImageUrl = "/SzdwControls/image/gridview/edit21b.png";
    this.deletingImageUrl = "/SzdwControls/image/gridview/delete21b.png";

    //按钮文字
    this.operationTextCssName = null;
    this.operationTextCssJson = { "text-align": "center", "padding": "0px 2px 0px 2px", "border": "0px solid #D0D0D0" };
    //#endregion 数据操作列

    //#region 外框：对象容器
    this.panel = document.createElement("div"); //对象容器：根对象，控制对象的显示的坐标、宽高、显隐
    this.panel.style.overflow = "hidden"; //对象容器默认没有滚动条
    this.panel.style.display = "none"; //对象容器默认隐藏：由函数控制显隐
    this.panel.style.padding = "0"; //对象容器对象内留白
    this.panel.style.margin = "0"; //对象容器对象外留白
    $(this.panel).css({ "position": position, "left": x, "top": y, "width": width, "height": height}); //对象容器定位方式、坐标、宽高
    this.panelCssName = null; //对象容器css样式表名称
    this.panelCssJson = null; //对象容器Json格式css数据
    //#endregion 外框：对象容器

    //#region 标题
    this.title = document.createElement("div"); //标题对象
    this.title.style.display = "none"; //标题对象默认隐藏
    this.titleWidth = width; //标题对象宽度：默认等于对象容器宽度
    this.titleHeight = 30; //标题对象高度：默认等于0
    this.titleCssName = null; //标题对象css样式表名称
    this.titleCssJson = { "font-size": "12pt", "font-family": "微软雅黑", "font-weight": "normal", "padding-left": 10 };  //标题对象Json格式css数据
    this.titleText = ""; //标题对象文字：默认为空
    this.panel.appendChild(this.title);
    this.span = null;
    this.spanCssName = null;
    this.spanCssJson = null;
    //#endregion 标题

    //#region 功能按钮容器面板buttonPanel
    this.buttonPanel = null; //功能按钮容器面板对象
    this.buttonPanelWidth = width; //功能按钮容器面板对象对象宽度：默认等于对象容器面板宽度
    this.buttonPanelHeight = 0; //功能按钮容器面板对象对象高度
    this.buttonPanelCssName = null; //功能按钮容器面板对象的css样式表名称
    this.buttonPanelCssJson = null; //功能按钮容器面板对象的Json格式css数据
    //#endregion 功能按钮容器面板buttonPanel

    //#region dataPanel数据框
    this.dataPanel = document.createElement("div"); //数据框对象：其子元素包括head、body、sumRow等
    this.dataPanel.style.overflow = "hidden"; //数据框对象默认没有滚动条
    this.dataPanel.style.padding = "0"; //数据框对象内留白
    this.dataPanel.style.margin = "0"; //数据框对象外留白
    this.dataPanelWidth = width; //数据框对象宽度：默认等于对象容器宽度
    this.dataPanelHeight = 0; //数据框对象高度：默认等于对象容器高度
    this.dataPanelCssName = null; //数据框对象css样式表名称
    this.dataPanelCssJson = { "border": "1px solid Silver" } ; //数据框对象Json格式css数据
    this.panel.appendChild(this.dataPanel);
    //#endregion 功能按钮容器面板buttonPanel

    //#region 表头
    this.head = null; //表头对象
    this.headCells = new Array();//表头对象的单元格集合
    this.headWidth = width; //表头对象宽度：默认等于对象容器宽度
    this.headHeight = 25; //表头对象高度：默认等于0
    this.headColor = null; //表头对象前景色
    this.headOverBackColor = "#EFEFEF";//null; //表头对象鼠标悬停背景色
    this.headCssName = "gridHead"; //表头对象css样式表名称
    this.headCssJson = null; //表头对象Json格式css数据
    this.headOrdered = null; //排序的表头单元格
    this.headOrderedColor = "Red"; //排序的表头单元格前景色：默认红色   
    this.headCursor = ""; //表头单元格鼠标悬停指针形状
    this.orderImg = { asc: '/SzdwControls/image/gridview/triangleUpRed.png', desc: '/SzdwControls/image/gridview/triangleDownRed.png' };

    this.overHead = null;//当前鼠标经过的表头单元格
    this.draggingHead = null;//当前要拖动改变列宽的进行拖动的表头单元格
    this.wideningHead = null;//当前需要改变列宽的表头单元格
    this.isDraggingToWidenCol = false;//是否正在拖动表头
    this.draggingHeahEvent = null;

    //#endregion 表头

    //#region 表体
    this.body = null; //表体对象
    this.bodyTable = null;//数据表体的表
    this.bodyWidth = width; //数据表体body的宽度：默认等于对象容器宽度
    this.bodyHeight = 0; //数据表体body的高度：默认等于0
    this.bodyRows = new Array();//数据表体body的行集
    this.bodyCssName = "gridBody"; //数据表体body的css样式表名称
    this.bodyCssJson = null; //数据表体body的Json格式css数据
    this.cellCssJson = null; //数据表体单元格的Json格式css数据
    this.cellCssJsonDefault = { "text-align": "center", "font-size": "small", "font-family": "宋体" }; //数据表体单元格的默认Json格式css数据
    this.alternateRowBackColor = "#F4F4F4"; //数据表体交替行颜色设置 "#F4F4F4";
    this.rowOverColor = "#CEE2FC"; //数据表体鼠标悬停时的行背景色
    this.rowOldBackColor = null; //数据表体原行背景色
    this.rowHeight = 33; //数据表体行高
    this.unusedRows = new Array();//存储删除的行

    /*cellCssJson示例
    cellCssJson = {  "RowNumber": { "text-align": "center", "font-size": "small", "font-family": "宋体"},
                     "ContractID": { "text-align": "center", "font-size": "small", "font-family": "宋体" }}
    cellCssJson示例*/
    //#endregion 表体

    //#region 行单击选择
    this.selectedRow = null;
    this.selectedRowIndex = -1;
    this.selectedRowBackColor = "#EFCF5F"; //选中行的背景色"#EFCF5F";"#CEE2FC"
    this.fnRowClick = null; //行单击时调用的外部方法
    this.fnRowDblClick = null;//行双击调用的外部方法
    //#endregion 行单击选择

    //#region 功能按钮扩展器

    //this.expandors = {}; //按照列名称存储每列的扩展器组：{field1:[],field2:[],field3:[],……}
    //this.freezeColExpandors = {}; //按照列名称存储冻结列的扩展器组：{field1:[],field2:[],field3:[],……}
    this.expandorWidth = 12; //功能按钮扩展器宽度
    this.expandorHeight = this.rowHeight; //功能按钮扩展器高度
    this.isExpandorBackColorSameAsTagetColor = false; //功能按钮扩展器背景色是否与目标控件前景色一致
    this.expandorBackColor = "Black"; //功能按钮扩展器背景色
    this.expandorOpacity = 0.1; //功能按钮扩展器透明度
    this.expandorMouseOverOpacity = 0.7; //功能按钮扩展器鼠标悬停时的透明度
    this.expandorRowIndex = -1; //当前操作的行索引
    this.expandorCellIndex = -1; //当前操作的行索引
    this.expandorRowJsonData = null; //当前操作的行记录Json数据
    this.fnExpandButtonGroup = null; //功能按钮组绑定事件的函数名称
    this.expandorBtnJsonList = null; //功能按钮的相关数据:格式[{Text:"编辑",Image:"../Image/Modify.png",Title:"编辑",FnClick:ModifyClick}]
    this.expandButtonGroups = new Array(); //用于存储与列对应的扩展按钮组,因为可能有多列存在扩展按钮组
    this.currentExpandor = null; //当前显示扩展按钮组的扩展按钮器
    this.wideningColsExpandors = new Array();//拖动改变列宽的列中的扩展器对象数组
    this.wideningFreezeColsExpandors = new Array();//拖动改变列宽的列中的扩展器对象数组

    /*expandorBtnJsonList示例
    [{Text:"编辑",Image:"../Image/Modify.png",Title:"编辑",FnClick:ModifyClick}]
    1.名称严格一致；2.顺序不必一致；3.Text:"编辑",Image:"../Image/Modify.png",Title:"编辑数据"，三者不必齐全，FnClick必须有（是按钮执行的事件）
    4.Text：按钮上显示的文字；Image：按钮的图标URL；Title：鼠标悬停时的按钮提示文字
    expandorBtnJsonList*/
    //#endregion 功能按钮扩展器

    //#region 选择列
    this.checkBoxHeadText = null; //选择列表头文字
    this.isCheckBox = false; //是否允许出现行选择框
    this.isCheckAll = false; //是否允许在表头出现全部选择框
    this.checkBoxAll = null; //表头的全部选择框对象
    this.checkBoxList = new Array(); //存储的选择框对象数组
    this.checkBoxMultiple = false; //是否允许行选择框多选数组
    this.checkedRowIndex = new Array();//存储的已选择的行的索引
    this.checkedRowBackColor = "#EFCF5F"; //选中行的背景色"#EFCF5F";"#CEE2FC"
    this.checkBoxCellWidth = 36; //选择框列的宽度
    this.checkedReturnJsonData = null; //选中行的行值Json格式数据对象
    this.fnCheckBoxClick = null; //单击时要执行的函数
    this.checkBoxDisabledField = null;//决定checkBox可用否的列
    this.checkBoxDataBindField = null;//决定是否选中的数据列
    //#endregion 选择列

    //#region 表汇总行
    this.sumRow = null; //表汇总行对象
    this.sumRowWidth = width; //表汇总行对象宽度：默认等于对象容器面板宽度
    this.sumRowHeight = 30; //表汇总行对象高度
    this.sumRowCssName = "gridSumRow"; //表汇总行对象的css样式表名称
    this.sumRowCssJson = { "font-weight": "bold" }; //表汇总行对象的Json格式css数据
    this.sumRowTableCssJson = { "border-collapse": "collapse", "border-spacing": "0px", "table-layout": "fixed", "width": 0 };
    this.sumRowPosition = 1; //表汇总行对象的css样式表名称：0：固定在数据表部上面;1:紧跟数据行;2：固定在数据表外部下面
    this.sumRowText = "总计"; //表汇总行的汇总文字
    //#endregion 表汇总行

    //#region 分页控件
    this.pagination = null; //分页控件
    this.paginationRowCount = 1; //分页控件行数
    this.paginationWidth = width; //分页控件高度
    this.paginationHeight = 25; //分页控件高度
    this.paginationCssName = null; //分页控件css样式表名称
    this.paginationCssJson = null; //分页控件Json格式css数据
    this.pageSize = 15; //每页记录数
    //#endregion 分页控件

    //#region 冻结列面板
    this.freezeColPanel = null;
    this.freezeColPanelCssName=null;
    this.freezeColPanelCssJson = {
        "position": "absolute", "overflow": "hidden", "left": 0, "top": 0, "border": "0px solid",
        "border-right": "1px solid #666666"//#999999
    };

    this.freezeColDataPanel = null;

    this.freezeColHead = null;
    this.freezeColHeadCells = new Array();
    this.freezeColHeadOrdered = null;//冻结列排序的表头单元格

    this.freezeColBody = null;
    this.freezeColBodyOffsetWidth = 30;
    this.freezeColBodyRows = new Array();
    this.freezeColLoadingImg = null;

    this.freezeColSumRow = null;
    this.freezeColSumRowCssName = null;
    this.freezeColSumRowCssJson = {
        "position": "absolute", "overflow": "hidden", "left": 0, "top": 0, "border": "0px solid",
        "border-right": "1px solid #999999"
    };

    //#endregion 冻结列面板

    //#region 数据筛选器
    this.filter = null;
    this.filterWidth = 200;
    this.filterHeight = 600;
    this.filterCssName = null; //css样式表名称
    this.filterCssJson = null; //Json格式css数据
    this.filterData = {};
    this.filterFnClick = null;//筛选器确定按钮外调函数

    this.filterMarkerWidth = 16;
    this.filterMarkerHeight = 0;
    this.filterMarkerMargin = 0;
    this.filterMarkerCssName = null;
    this.filterMarkerCssJson = {
        'position': 'absolute', 'border-left': '1px solid #D0D0D0', 'background-color': 'transparent',
        'display': 'none', 'z-index': 1
    }; //Json格式css数据
    this.filterMarkerMouseOverCssName = null;
    this.filterMarkerMouseOverCssJson = { 'background-color': '#D0D0D0', 'opacity': 0.9,'cursor':'pointer' }; //Json格式css数据
    this.filterMarkerMouseLeaveCssName = null;
    this.filterMarkerMouseLeaveCssJson = { 'background-color': 'transparent' }; //Json格式css数据

    this.filterMarkerImg = { filter: '/SzdwControls/image/gridview/triangle.png', filtered: '/SzdwControls/image/gridview/query.png' };
    this.filterMarkerPosition = 1;//0：左边，1：右边
    //filterData数据格式
    //{ Filed1: { },
    //  Filed2: { }
    //}

    //#endregion 数据筛选器

    //#region 初始化函数和事件
    this.fnInitial = null; //初始化函数：用于传入设置SzdwGridView对象属性的对象外函数
    //#endregion 初始化函数和事件

    //#region 无数据信息
    this.emptyDataInfo = null;
    this.emptyText = "没有符合条件的数据记录";
    //#endregion 无数据信息

    //#region 加载动画
    this.loadingImgUrl = "/SzdwControls/image/loading/loading.gif"; //加载动画gif文件的URL
    this.loadingImg = null;
    this.loadingImgWidth = 0; //加载动画gif文件的宽度
    this.loadingImgHeight = 0; //加载动画gif文件的高度

    //#endregion 加载动画   
}
//#endregion 对象SzdwGridView

//#region 数据绑定

SzdwGridView.prototype.DataBind = function () {
    //载入父容器
    this.AppendToNamingContainer();

    //恢复选定行行样式
    if (this.allowRecoverRowStyleWhenDataBinding) {
        this.RecoverSelectedRow();
    }

    //数据绑定
    if (this.localRecordJsonList) {
        //本地数据绑定
        this.recordCount = this.localRecordJsonList.length;
        this.LocalDataBind();
    } else {
        //异步远程数据绑定
        this.AjaxDataBind();
    }
}

//#region 本地数据绑定
SzdwGridView.prototype.LocalDataBind = function () {
    var hasSum = this.hasSumRow;
    if (this.recordCount > 0) {
        this.RemoveEmptyDataInfo();
        var recordSetJson = this.GetPageLocalData();
        if (this.recordSetJson == null) {
            this.recordSetJson = recordSetJson;
            this.Load();
        } else {
            this.UpdateBodyData(recordSetJson);
            this.UpdateSumRowData(this.recordSumJson)
        }
    } else {
        this.UnloadFreezeColPanel();
        this.ShowEmptyDataInfo();
    } 
}

//获取分页数据集
SzdwGridView.prototype.GetPageLocalData = function () {
    var p = this.pagination;
    var jsonList = this.localRecordJsonList;
    var pn = p ? p.pageNumber : 1;
    var ps = p ? p.pageSize : this.pageSize;
    var start = (pn - 1) * ps;
    var end = pn * ps;
    return jsonList.slice(start, end);
}
//#endregion 本地数据绑定

//#region 异步远程数据绑定

//异步远程数据绑定
SzdwGridView.prototype.AjaxDataBind = function () {
    //异步加载设置 
    this.CreateLoadingImg();
    this.ShowLoadingImg();
    var szdwGv = this;
    var p = this.pagination;
    var url = this.requestUrl;
    var paramJson = this.paramJson;

    if (p != null) {
        paramJson.pageNumber = p.pageNumber;
        paramJson.pageSize = p.pageSize;
    }
    //2017-7-31
    paramJson.orderField = szdwGv.orderField;
    paramJson.orderType = szdwGv.orderType;

    //ajax异步加载数据paramJson
    $.ajax({
        url: url, type: "post", data: paramJson, dataType: "json",
        success: function (jsonData) {
            szdwGv.AjaxSuccess(jsonData);
            if (szdwGv.fnDataBindCallBack) {
                szdwGv.fnDataBindCallBack();
            }
        },
        complete: function () {
            szdwGv.HideLoadingImg();
        }
    });

}

//ajax异步加载数据成功后执行的函数
SzdwGridView.prototype.AjaxSuccess = function (jsonData) {
    var hasSum = this.hasSumRow;
    var recordSumJson = jsonData.recordSum ? $.parseJSON(jsonData.recordSum) : null;
    var recordCount = recordSumJson.RecordCount ? recordSumJson.RecordCount : null;
    if (recordCount > 0) {
        this.RemoveEmptyDataInfo();
        this.recordCount = recordCount;
        var recordSetJson = $.parseJSON(jsonData.recordSet);
        if (this.recordSetJson == null) {
            this.recordSetJson = recordSetJson;
            if (hasSum) { this.recordSumJson = recordSumJson; }
            this.Load();
        } else {
            this.UpdateBodyData(recordSetJson);
            if (hasSum) { this.UpdateSumRowData(recordSumJson); }
        }
    } else {
        this.UnloadFreezeColPanel();
        this.ShowEmptyDataInfo();        
    }

    //横向滚动复位
    this.SetScrollDefault();
    
    //如果当前页大于总页数,回到最后页
    var p = this.pagination;
    if (p) {
        if (p.pageNumber > p.totalPageNumber) {
            $(p.btnLast).trigger("click");
        }
    }
}
//#endregion 异步远程数据绑定

//#endregion 数据绑定

//#region 载入
SzdwGridView.prototype.Load = function () {
    var permission = this.permission;
    if (this.hasOperationColumn) {
        this.hasOperationColumn = permission.modifyPermission || permission.deletePermission;
    }
    //设置相关属性
    this.SetTitle();
    this.CreateButtonPanel();
    this.CreatePagination();

    this.SetDataPanelCss();
    this.CreateHead();
    if (this.sumRowPosition == 0) {
        this.CreateSumRow();
    }
    this.CreateBody();
    if (this.sumRowPosition > 0) {
        this.CreateSumRow();
    }

    this.CreateFreezeColPanel();
    this.SetScroll();
}

//将SzdwGridView加入父容器
SzdwGridView.prototype.AppendToNamingContainer = function () {
    var p = this.panel;
    var nc = this.namingContainer;
    if (nc != null && $(p).parent().length == 0) {
        $(p).appendTo(nc);
        this.Show();
    }
}

//显示SzdwGridView
SzdwGridView.prototype.Show = function () {
    $(this.panel).fadeIn();
}

//隐藏SzdwGridView
SzdwGridView.prototype.Hide = function () {
    $(this.panel).fadeOut();
}

//隐藏SzdwGridView
SzdwGridView.prototype.SetZIndex = function () {
   // $(this.panel).css("z-index", this.zIndex);
}
//#endregion 载入

//#region 设置标题Title
//设置数据表标题Title
SzdwGridView.prototype.SetTitle = function () {
    if (this.hasTitle) {
        var width = this.titleWidth;
        var height = this.titleHeight;
        var titleCssName = this.titleCssName;
        var titleCssJson = this.titleCssJson;
        var titleText = this.titleText;
        var spanCssName = this.spanCssName;
        var spanCssJson = this.spanCssJson;

        //创建Title并设置尺寸样式
        var t = this.title;
        $(t).show();
        if (titleCssName) { $(t).addClass(titleCssName); }
        if (titleCssJson) { $(t).css(titleCssJson); }
        $(t).css({ "line-height": height + "px" }).outerWidth(width).outerHeight(height).text(titleText);
    } else {
        return false;
    }
}
//#endregion 设置标题Title

//#region 创建功能按钮面板buttonPanel:用于二次筛选、导出打印等
//创建功能按钮面板buttonPanel
SzdwGridView.prototype.CreateButtonPanel = function () {
    if (this.hasButtonPanel) {
        var width = this.buttonPanelWidth;
        var height = this.buttonPanelHeight;
        var buttonPanelCssName = this.buttonPanelCssName;
        var buttonPanelCssJson = this.buttonPanelCssJson;

        //创建buttonPanel并设置尺寸样式
        var p = document.createElement("div");
        $(p).outerWidth(width);
        $(p).outerHeight(height);
        if (buttonPanelCssName != null) { $(p).addClass(buttonPanelCssName); }
        if (buttonPanelCssJson != null) { $(p).css(buttonPanelCssJson); }

        this.buttonPanel = p;
        $(this.panel).append(p);
    }
}
//#endregion 设置标题buttonPanel

//#region 创建GridView表头标题行

//创建数据表表头
SzdwGridView.prototype.CreateHead = function () {
    if (this.head == null) {
        var jsonData = this.fieldJsonData;
        if (jsonData == null) { return false; }

        var width = this.headWidth;
        var height = this.headHeight;
        var headCssName = this.headCssName;
        var headCssJson = this.headCssJson;

        //创建Head并设置尺寸样式
        var gh = document.createElement("div");
        $(gh).width(width);
        $(gh).outerHeight(height);
        if (headCssName != null) { $(gh).addClass(headCssName); }
        if (headCssJson != null) { $(gh).css(headCssJson); }

        //绑定数据
        var tb = document.createElement("table");
        var thead = document.createElement("thead");
        var tr = document.createElement("tr");

        //创建checkBox
        var checkTh = this.CreateHeadCheckBox();
        if (checkTh != null) {
            $(tr).append(checkTh);
        }

        //创建字段标题
        var szdwGv = this;
        var hobc = this.headOverBackColor;
        $.each(jsonData, function (i, item) {
            //创建表头单元格th并绑定字段
            var th = document.createElement("th");
            $(th).text(item["Text"]);

            //禁止文本被选中
            th.onselectstart = function () { return false;}
           
            //表头单元格提示信息
            if (item["Title"]) { th.title = item["Title"]; }

            if (hobc != null) {
                $(th).data("oldBc", $(th).css("background-color"));
                $(th).mouseover(function (e) {
                    $(this).css("background-color", hobc);
                }).mouseleave(function () {    
                    $(this).css("background-color", $(this).data("oldBc"));
                });
            }

            //设置样式
            if (item["Style"]) { $(th).css(item["Style"]); }
            $(th).css({ "padding-left": "3px", "padding-right": "3px", "cursor": "default" });
            $(th).innerWidth(item["Width"]);
            $(th).innerHeight(height);
            $(th).data("field", item["Field"]);
            if (item["HasExpandor"]) {
                $(th).innerWidth(item["Width"] + szdwGv.expandorWidth);
            }

            //排序：获取字段
            if (typeof (item["OrderField"]) != "undefined") {
                $(th).data("orderField", item["OrderField"]);
            }

            //排序:单击表头列        
            if (szdwGv.allowSorting) {
                szdwGv.Sort(th);
            }

            //拖动改变列宽     
            if (szdwGv.allowColumnWidening) {
                szdwGv.DraggingToWidenColumn(th);
            }

            //筛选器标识
            if (item["HasFilter"]) {
                $(th).mouseover(function () {
                    if (!szdwGv.isDraggingToWidenCol) {
                        var marker = $(this).append(marker).data('marker');
                        if (!marker) {
                            var marker = szdwGv.CreateFilterMarker(this);
                            $(marker).attr('title', '在 "' + $(this).text() + '" 中筛选数据');
                            $(this).append(marker).data('marker', marker);
                        }
                        szdwGv.SetFilterMarkerY(marker);
                        $(marker).fadeIn();
                    }
                }).mouseleave(function () {
                    if (!szdwGv.isDraggingToWidenCol) {
                        var marker = $(this).append(marker).data('marker');
                        $(marker).fadeOut();
                    }
                });
            }

            //追加表头单元格至表表头行
            $(tr).append(th);
        })

        //创建数据操作列表头
        if (this.hasOperationColumn) {
            var oTh = this.CreateOperationHead();
            $(tr).append(oTh);

            //拖动改变列宽     
            if (szdwGv.allowColumnWidening) {
                szdwGv.DraggingToWidenColumn(oTh);
            }
        }

        $(thead).append(tr);
        $(tb).append(thead);
        $(gh).append(tb);
        this.head = gh;
        this.headCells = $("th", gh);
        
        var ghBox = document.createElement("div");
        $(ghBox).css({ "width": this.width, "background-color": $(gh).css("background-color") });
        $(ghBox).append(gh);
        $(this.dataPanel).append(ghBox);
    }
}

//创建表头CheckBox列
SzdwGridView.prototype.CreateHeadCheckBox = function () {
    if (this.isCheckBox) {
        var th = document.createElement("th");
        $(th).width(this.checkBoxCellWidth);
        if (this.isCheckAll) {
            var checkBox = document.createElement("input");
            $(checkBox).prop("type", "checkbox");
            $(th).append(checkBox);
            this.checkBoxAll = checkBox;
            var GridView = this;
            checkBox.onclick = function () { GridView.HeadCheckBoxMouseClick(this.checked); }
        } else {
            var text = this.checkBoxHeadText ? this.checkBoxHeadText : this.checkBoxMultiple ? "复选" : "单选";
            $(th).text(text);
        }
        return th;
    }
    return null;
}

SzdwGridView.prototype.HeadCheckBoxMouseClick = function (isChecked) {
    var cbList = $(this.bodyRows).find("input[type='checkbox']:enabled");
    $(cbList).prop("checked", isChecked);
    this.checkBoxList = cbList;

    //存储选中行索引
    if (isChecked) {
        for (var i = 0; i < this.checkBoxList.length; i++) {
            this.checkedRowIndex.push($(this.checkBoxList[i]).parents("tr")[0].rowIndex);
        }
    } else {
        this.checkedRowIndex.length = 0;
    }
}

//更新Head
SzdwGridView.prototype.UpdateHead = function () {
    var jsonData = this.fieldJsonData;
    if (jsonData == null) { return false; }

    //更新数据
    var th = $(this.head).find("th");
    $.each(jsonData, function (i, item) {
        $(th[i]).text(item["Text"]);
        $(th[i]).data("field", item["Field"]);
        if (typeof (item["OrderField"]) != "undefined") {
            $(th[i]).data("orderField", item["OrderField"]);
            $(th[i])[0].title = "单击排序";
            $(th[i]).css("cursor", "pointer");
        }
    })
}
//#endregion 创建GridView表头标题行

//#region 排序

//点击表头列字段：排序
SzdwGridView.prototype.Sort = function (sortHead) {
    var szdwGv = this;
    var th = sortHead;
    var orderField = $(th).data("orderField");

    //设置排序字段样式
    if (orderField) {
        th.title = th.title ? th.title + " ；单击排序" : th.title + "单击排序";
        $(th).css("cursor", "pointer");
    }

    //表头字段单击事件：排序        
    $(th).click(function (e) {
        var fCols = szdwGv.freezeCols;
        var isFreeze = $(this).data("isFreeze");
        var cellIndex = this.cellIndex;
        var ow = $(this).outerWidth();
        if (e.offsetX > ow - 5 || e.offsetX <10) {
            return false;
        }
        if (orderField && e.target == this) {
            
            //#region 恢复上一个排序表头设置
            szdwGv.headColor = $(this).css("color");

            //非冻结列
            var oHead = szdwGv.headOrdered;
            if (oHead != this) {
                $(oHead).css({ "color": szdwGv.headColor, 'background-image': '' });
            }
            
            //冻结列
            var oFcHead = szdwGv.freezeColHeadOrdered;
            if (isFreeze && $(oFcHead).text() != $(this).text()) {
                $(oFcHead).css({ "color": szdwGv.headColor, 'background-image': '' });
            }
            //#endregion 恢复上一个排序表头设置

            //#region 排序

            var orderType = szdwGv.orderType.toString().toUpperCase();
            szdwGv.orderType = orderType == "ASC" ? "DESC" : "ASC";

            var blnFlag = (isFreeze && $(oFcHead).text() != $(this).text()) || (!isFreeze && oHead != this);
            if (blnFlag) {szdwGv.orderType = "ASC";}

            
            //非冻结列
            var orderImg = szdwGv.orderType == "ASC" ? szdwGv.orderImg.asc : szdwGv.orderImg.desc;
            var backImg = "url(" + orderImg + ") no-repeat center 2px";
            $(this).css({ "color": szdwGv.headOrderedColor, 'background': backImg });
            
            //冻结列
            if (fCols && cellIndex < fCols) {
                var otherCell = isFreeze ? szdwGv.headCells[cellIndex] : szdwGv.freezeColHeadCells[cellIndex];
                $(otherCell).css({ "color": szdwGv.headOrderedColor, 'background': backImg } );
            }

            //$(szdwGv.headOrdered).data("color", $(oHead).css("color"));
            //if (szdwGv.freezeCols) {
            //    $(szdwGv.freezeColHeadOrdered).data("color", $(oHead).css("color"));//
            //}

            szdwGv.orderField = orderField;
            var cp = szdwGv.pagination;
            if (cp && cp.pageNumber > 1) {
                $(cp.btnFirst).trigger("click");
            } else {
                szdwGv.DataBind();
            }
            //#endregion 排序

            //#region 记录当前排序表头对象
            if (isFreeze) {
                szdwGv.freezeColHeadOrdered = this;
                szdwGv.headOrdered = szdwGv.headCells[cellIndex];
            } else {
                szdwGv.headOrdered = this;
                szdwGv.freezeColHeadOrdered = szdwGv.freezeColHeadCells[cellIndex];
            }
            //#endregion 记录当前排序表头对象  
        }
    });
}

//#endregion 排序

//#region 拖动表头列改变列宽

//拖动表头列改变列宽
SzdwGridView.prototype.DraggingToWidenColumn = function (headCell) {
    var szdwGv = this;
    var th = headCell;

    //显示可拖拉宽度指示
    $(th).data("cursor", $(th).css("cursor"));

    //mousemove事件：拖动改变列宽
    $(th).data("oldBc", $(th).css("background-color"));
    $(th).mousemove(function (e) {
        szdwGv.WidenCols(this, e);        
    });    

    //mousedown事件：进入拖动状态
    $(th).mousedown(function (e) {
        szdwGv.SetHeadDragging(this, e);       
    });

    //mousedup事件：解除拖动状态
    $(th).mouseup(function (e) {        
        szdwGv.UnSetHeadDragging(e);
        //e.stopPropagation();
    });
    
    $(document).mouseup(function (e) {
        szdwGv.UnSetHeadDragging(e);
    });
}

//改变列宽
SzdwGridView.prototype.WidenCols = function (headCell, e) {
    this.draggingHeahEvent = e;
    var szdwGv = this;    

    //设置拖动列表头背景色
    var headCells = szdwGv.freezeCols > 0 && headCell.cellIndex <= szdwGv.freezeCols ? szdwGv.freezeColHeadCells : szdwGv.headCells;
    var overHead = e.offsetX < 10 ? headCells[headCell.cellIndex - 1] : headCell;
    var hobc = szdwGv.headOverBackColor;
    if (e.offsetX < 10 && e.target == headCell) {
        $(overHead).css({ 'background-color': hobc });
        $(headCell).css({ 'background-color': $(headCell).data("oldBc") });
        szdwGv.overHead = overHead;
    } else {
        $(szdwGv.overHead).css({ 'background-color': $(headCell).data("oldBc") });
        $(headCell).css({ 'background-color': hobc });
    }

    //拖动改变列宽  
    if (e.target == headCell) {
        var draggingHead = szdwGv.draggingHead;
        var ow = $(headCell).outerWidth();
        if (e.offsetX > ow - 5 || e.offsetX < 10) {
            $(headCell).css("cursor", "col-resize");
        } else {
            $(headCell).css("cursor", $(headCell).data("cursor"));
        }


        var wideningHead = szdwGv.wideningHead;
        if (wideningHead && szdwGv.isDraggingToWidenCol) {
            var colIndex = wideningHead.cellIndex;
            var oldWidth = $(wideningHead).data("oldWidth");
            var oldPageX = $(draggingHead).data("oldPageX");
            var offsetWidth = e.pageX - oldPageX;
            var newWidth = oldWidth + offsetWidth;
            if (newWidth > 0) {
                $(wideningHead).innerWidth(newWidth);
            }

            //gridview的数据行跟随标题行的列宽而改变   
            var bodyRows = szdwGv.bodyRows;
            if (bodyRows) {
                var cell = bodyRows[0].cells[colIndex];
                $(cell).innerWidth(newWidth);
            }

            //更新filterMarkerY位置
            var marker = $(headCell).data('marker');
            szdwGv.SetFilterMarkerY(marker);
            
            //单元格中的扩展器随动
            szdwGv.SetExpandorsX(false);

            //改变冻结列及其面板列宽
            var isFreeze = $(wideningHead).data("isFreeze");
            if (isFreeze) {
                var wideningHeadCell = szdwGv.headCells[colIndex];
                $(wideningHeadCell).innerWidth(newWidth);
                
                var freezeColBodyRows = szdwGv.freezeColBodyRows;
                if (freezeColBodyRows) {
                    var freezeCell = freezeColBodyRows[0].cells[colIndex];
                    $(freezeCell).innerWidth(newWidth);
                }

                var fcpOldWidth = $(wideningHead).data("oldFreezeColPanelWidth");
                var fcpNewWidth = fcpOldWidth + offsetWidth;
                if (fcpNewWidth > 0 && szdwGv.freezeColPanel) {
                    $(szdwGv.freezeColPanel).innerWidth(fcpNewWidth);
                }
            }

        }
    }
}

//设置表头拖动状态
SzdwGridView.prototype.SetHeadDragging = function (headCell, e) {
    var szdwGv = this;
    var draggingHead = headCell;
    if (e.target == headCell) {
        var headCells = (szdwGv.freezeCols > 0 && headCell.cellIndex <= szdwGv.freezeCols) ? szdwGv.freezeColHeadCells : szdwGv.headCells;
        var wideningHead = e.offsetX < 10 ? headCells[headCell.cellIndex - 1] : headCell;
        var ow = $(wideningHead).innerWidth();
        if (e.offsetX > ow - 5 || e.offsetX < 10) {
            szdwGv.isDraggingToWidenCol = true;
            $(draggingHead).data("oldPageX", e.pageX);

            $(wideningHead).data("oldWidth", ow);
            $(wideningHead).data("oldFreezeColPanelWidth", $(szdwGv.freezeColPanel).innerWidth());

            //汇总行
            if (szdwGv.hasSumRow && szdwGv.sumRowPosition == 2) {
                $(wideningHead).data("oldfreezeColSumRowWidth", $(szdwGv.freezeColSumRow).innerWidth());
            }
        }

        szdwGv.draggingHead = draggingHead;
        szdwGv.wideningHead = wideningHead;
        szdwGv.wideningColsExpandors = szdwGv.GetWideningColsExpandors(false);
        szdwGv.wideningFreezeColsExpandors = szdwGv.GetWideningColsExpandors(true);
    }

    //设置文本不可选
    $(this.namingContainer).addClass('noTextSelect');
}

//获取改变宽度的列中的功能按钮扩展器对象并存入数组
SzdwGridView.prototype.GetWideningColsExpandors = function (isFreezeCol) {
    var colIndex = this.wideningHead.cellIndex;   
    var rows = isFreezeCol ? this.freezeColBodyRows : this.bodyRows;
    var expandors = new Array();
    $.each(rows, function (index,row) {
        var cell = row.cells[colIndex];
        var expandor = $(cell).find("div[id='expandor']")[0];
        expandors.push(expandor);
    });

    return expandors;
}

//表头拖动完毕，解除拖动状态
SzdwGridView.prototype.UnSetHeadDragging = function (e) {
    //改变冻结列数据面板、表体、汇总行列宽
    this.WidenFreezeColDataPanel();

    //解除拖动状态
    this.overHead = null;//重置当前鼠标经过的表头单元格
    this.draggingHead = null;//重置当前要拖动改变列宽的进行拖动的表头单元格
    this.wideningHead = null;//重置当前需要改变列宽的表头单元格
    this.isDraggingToWidenCol = false;//重置是否正在拖动表头
    this.wideningColsExpandors = new Array();//重置改变宽度的列中的功能按钮扩展器对象数组为空
    this.wideningFreezeColsExpandors = new Array();//重置改变宽度的冻结列中的功能按钮扩展器对象数组为空
    
    //恢复文本可选
    $(this.namingContainer).removeClass('noTextSelect');
}

//改变冻结列数据面板、表体、汇总行列宽
SzdwGridView.prototype.WidenFreezeColDataPanel = function () {
    var draggingHead = this.draggingHead;
    var wideningHead = this.wideningHead;
    var e = this.draggingHeahEvent;

    //改变冻结列及其面板列宽
    var isFreeze = $(wideningHead).data("isFreeze");    
    if (isFreeze) {
        var oldPageX = $(draggingHead).data("oldPageX");
        var offsetWidth = e.pageX - oldPageX;
        var fcpOldWidth = $(wideningHead).data("oldFreezeColPanelWidth");
        var fcpNewWidth = fcpOldWidth + offsetWidth;

        //单元格中的扩展器随动
        this.SetExpandorsX(true);

        if (fcpNewWidth > 0) {
            $(this.freezeColDataPanel).innerWidth(fcpNewWidth);
            $(this.freezeColBody).innerWidth(fcpNewWidth + this.freezeColBodyOffsetWidth);

            //汇总行
            if (this.hasSumRow && this.sumRowPosition == 2) {
                var fsrOldWidth = $(wideningHead).data("oldfreezeColSumRowWidth");
                var fsrNewWidth = fsrOldWidth + offsetWidth;
                if (fcpNewWidth > 0) {
                    $(this.freezeColSumRow).innerWidth(fsrNewWidth);
                }
            }
        }
    }
}

//拖动时改变列宽，功能按钮扩展器（若此列有）位置随动
SzdwGridView.prototype.SetExpandorsX = function (isFreezeCol) {
    var wideningHead = this.wideningHead;
    var expandors = isFreezeCol ? this.wideningFreezeColsExpandors : this.wideningColsExpandors;
    if (expandors) {
        var w = this.expandorWidth;
        var x = $(wideningHead).innerWidth() - w; 
        $(expandors).css('left', x);
    }
}

//#endregion 拖动表头列改变列宽

//#region 创建GridView表体数据行列

//创建数据表
SzdwGridView.prototype.CreateBody = function () {
    var jsonData = this.recordSetJson;
    if (jsonData == null) { return false; }

    var width = $(this.dataPanel).width();

    var sumRowHeight = this.sumRowPosition == 1 || !this.hasSumRow ? 0 : this.sumRowHeight;
    if (this.sumRowPosition == 0 && this.hasSumRow) {
        var p = $(this.sumRow).parent();
        sumRowHeight = p == null ? sumRowHeight : $(p).outerHeight();
    }

    var height = $(this.dataPanel).innerHeight() - $(this.head).outerHeight() - sumRowHeight;
    var rowHeight = this.rowHeight;
    var bodyCssName = this.bodyCssName;
    var bodyCssJson = this.bodyCssJson;

    //创建Body，并加载样式
    var gb = document.createElement("div");
    gb.id = "gridBody";
    if (bodyCssName != null) { $(gb).addClass(bodyCssName); }
    if (bodyCssJson != null) { $(gb).css(bodyCssJson); }
    $(gb).outerWidth(width).outerHeight(height - 1);

    //创建数据表
    var tb = document.createElement("table");
    $(tb).css("border-bottom", "1px solid #EEEEEE");
    var th = $(this.head).find("th");

    //创建数据行，绑定数据
    for (var i = 0; i < jsonData.length; i++) {
        //创建数据行列
        var tr = this.CreateBodyRow(i);
        this.CreateBodyCell(i, tr);
        $(tb).append(tr);
        this.bodyRows.push(tr);
    }

    gb.appendChild(tb);
    this.body = gb;
    this.bodyWidth = $(gb).outerWidth();
    this.bodyHeiht = $(gb).outerHeight();
    this.bodyTable = tb;
    //this.bodyRows = $(tb).find("tr");

    this.dataPanel.appendChild(gb);
}

//创建表体数据行bodyRow
SzdwGridView.prototype.CreateBodyRow = function (rowIndex) {
    var tr = document.createElement("tr");
    $(tr).innerHeight(this.rowHeight);
    if (rowIndex % 2 != 0) {
        $(tr).css("background-color", this.alternateRowBackColor);
    }
    this.SetRowMouseOverBackColor(tr, this.rowOverColor);

    //为行绑定事件
    this.BodyRowEventBind(tr);

    return tr;
}

//创建表体数据行的单元格Cell
SzdwGridView.prototype.CreateBodyCell = function (rowIndex, row) {
    var jsonData = this.recordSetJson;
    var fieldJsonData = this.fieldJsonData;
    var cellCssJson = this.cellCssJson;

    //创建checkBox列
    var checkBoxDisabledField = this.checkBoxDisabledField;
    var disabled = jsonData[rowIndex][checkBoxDisabledField];
    var checkBoxDataBindField = this.checkBoxDataBindField;
    var checked = jsonData[rowIndex][checkBoxDataBindField];
    var checkTd = this.CreateBodyCheckBox(row,disabled,checked);
    if (checkTd != null) {
        $(row).append(checkTd);        
    }

    //创建其他数据列    
    for (var i = 0; i < fieldJsonData.length; i++) {
        var td = document.createElement("td");
        //添加至row
        $(row).append(td);

        var jdField = fieldJsonData[i];
        var field = jdField.Field;
        var hasExpandor = jdField.HasExpandor;
        $(td).data("field", field);
        $(td).data("hasExpandor", hasExpandor);
        $(td).data("cellIndex", i);
        $(td).data("rowIndex", rowIndex);

        //样式
        var tdFieldCss = this.GetCellCssJsonByField(field);
        var plr = 3;
        $(td).css(tdFieldCss);
        $(td).css({ "padding-left": plr + "px", "padding-right": plr + "px" });
        $(td).outerWidth(jdField.Width);

        if (hasExpandor) {
            var pr = plr + this.expandorWidth;
            $(td).css("padding-right", pr + "px");
        }

        //填充数据
        this.CellDataBind(jsonData[rowIndex], jdField, td);

        //单元格扩展按钮
        var fnShow = jdField.FnShowExpandor;
        this.CreateButtonExpandor(td, fnShow, jsonData[rowIndex]);

        //控件列
        var fn = jdField.FnControlColumn;
        this.LoadControlColumn(td, fn);

        //设置单元格或当前行的样式
        var fnStyle = jdField.FnSetStyle;
        if (fnStyle) { fnStyle(td); }

    }

    //创建数据操作列    
    if (this.hasOperationColumn) {
        this.CreateBodyOperationColumn(rowIndex, row);
    }
}

//根据字段名称获取对应的单元格CSS
SzdwGridView.prototype.GetCellCssJsonByField = function (field) {
    var tdCssDefault = this.cellCssJsonDefault;
    var cellCssJson = this.cellCssJson;
    var tdCssField = cellCssJson == null || cellCssJson[field] == null ? tdCssDefault : cellCssJson[field];
    return tdCssField;
}

//数据行的单元格Cell绑定数据
SzdwGridView.prototype.CellDataBind = function (rowJsonData, fieldJsonData, cell) {
    var fieldType = this.fieldType;
    var field = $(cell).data("field");
    var fieldValue = rowJsonData[field];
    if (typeof (fieldValue) != "undefined") {
        switch (fieldJsonData.FieldType) {
            case fieldType.Integer:
                var value = fieldValue == null || fieldValue == 0 ? "" : fieldValue;
                $(cell).text(value);
                break;
            case fieldType.Decimal:
                var digits = fieldJsonData.Digits ? fieldJsonData.Digits : 6;
                var value = fieldValue == null || fieldValue == 0 ? "" : fieldValue.toFixed(digits);
                $(cell).text(value);
                break;
            case fieldType.Percentage:
                var digits = fieldJsonData.Digits ? fieldJsonData.Digits : 2;
                var value = fieldValue == null || fieldValue == 0 ? "" : (fieldValue * 100).toFixed(digits) + "%";
                $(cell).text(value);
                break;
            case fieldType.Date:
                var i = fieldValue.indexOf("T");
                var value = fieldValue.slice(0, i);
                var dateValue = value == "0001-01-01" || value == "1900-01-01" ? "" : value;
                $(cell).text(dateValue);
                break;
            case fieldType.DateTime:
                var ti = fieldValue.indexOf("T");
                var value = fieldValue.slice(0, ti);
                var isNaN = value == "0001-01-01" || value == "1900-01-01";
                if (isNaN) {
                    $(cell).text("");
                } else {
                    var i = fieldValue.indexOf(".");
                    var fValue = i >= 0 ? fieldValue.slice(0, i) : fieldValue.slice(0);
                    $(cell).text(fValue.replace("T", " "));
                }
                break;
            default:
                $(cell).text(fieldValue);
        }
    }
}
//#endregion 创建GridView表体数据行

//#region 行对象单击事件
SzdwGridView.prototype.BodyRowEventBind = function (row) {
    if (this.allowRowClickEvent) {
        var szdwCtrl = this;
        $(row).click(function () {
            szdwCtrl.SetSelectedRow(row);
            //单击时要执行的函数
            var rowIndex = row.rowIndex;
            if (szdwCtrl.fnRowClick) {
                szdwCtrl.fnRowClick(rowIndex);
            }
        });
        $(row).dblclick(function () {
            szdwCtrl.SetSelectedRow(row);
            //单击时要执行的函数
            var rowIndex = row.rowIndex;
            if (szdwCtrl.fnRowDblClick) {
                szdwCtrl.fnRowDblClick(rowIndex);
            }
        });
    }
}

SzdwGridView.prototype.SetSelectedRow = function (row) {
    var oldRow = this.selectedRow;
    var fRows = this.freezeCols ? this.freezeColBodyRows : null;

    if (oldRow && oldRow != row) {
        var i = oldRow.rowIndex;
        var rowBackColor = (i % 2 == 0) ? "" : this.alternateRowBackColor;
        $(oldRow).css("background-color", rowBackColor);

        if (this.freezeCols) {
            $(fRows[i]).css("background-color", rowBackColor);//+1
        }
    }

    //设置选中行背景
    var selectedRowBackColor = this.selectedRowBackColor;
    $(row).css("background-color", selectedRowBackColor);
    if (this.freezeCols) {
        var ri = row.rowIndex;
        $(fRows[ri]).css("background-color", selectedRowBackColor);
    }

    this.rowOldBackColor = this.selectedRowBackColor;
    this.selectedRow = row;
    this.selectedRowIndex = row.rowIndex;
}

SzdwGridView.prototype.RecoverSelectedRow = function () {
    //var i = this.selectedRowIndex;
    //if (i >= 0) {
    //    var row = this.bodyRows[i];
    //    var rowBackColor = (i % 2 == 0) ? "" : this.alternateRowBackColor;
    //    $(row).css("background-color", rowBackColor);
    //    this.selectedRowIndex = -1;
    //    this.selectedRow = null;
    //}

    var row = this.selectedRow;
    if (row) {
        var i = row.rowIndex;
        var rowBackColor = (i % 2 == 0) ? "" : this.alternateRowBackColor;
        $(row).css("background-color", rowBackColor);

        if (this.freezeCols) {
            var fRows =this.freezeColBodyRows;
            $(fRows[i]).css("background-color", rowBackColor);
        }

        this.selectedRow = null;
    }
}
//#endregion  行对象单击事件

//#region 表体CheckBox数据列

//创建表体CheckBox数据列
SzdwGridView.prototype.CreateBodyCheckBox = function (row,disabled,checked) {
    //创建checkBox列
    if (this.isCheckBox) {
        var td = document.createElement("td");
        $(td).width(this.checkBoxCellWidth);
        $(td).css("text-align", "center");
        var checkBox = document.createElement("input");
        $(checkBox).attr("type", "checkbox");
        $(td).append(checkBox);

        //可用性设置
        $(checkBox).attr("disabled", disabled).prop("checked", checked);
        var ri = row.rowIndex;
        this.BodyCheckBoxMouseClick(ri, checked);
        
        //单击事件
        var GridView = this;
        $(checkBox).click(function (e) {
            e.stopPropagation();
            var rowIndex = td.parentNode.rowIndex;
            GridView.BodyCheckBoxMouseClick(rowIndex, this.checked);

            //单击时要执行的函数
            if (GridView.fnCheckBoxClick) {
                $(td).data("rowIndex", rowIndex).data("checkBox", checkBox);
                GridView.fnCheckBoxClick(GridView, td);                
            }
        });

        this.checkBoxList.push(checkBox);

        $(row).append(td);
    }
}

SzdwGridView.prototype.BodyCheckBoxMouseClick = function (i, isChecked) {
    //设置选中行背景
    if (isChecked) {
        //设置选中行背景
        $(this.bodyRows[i]).css("background-color", this.checkedRowBackColor);
        this.rowOldBackColor = this.checkedRowBackColor;
    } else {
        var rowBackColor = (i % 2 == 0) ? "" : this.alternateRowBackColor;
        $(this.bodyRows[i]).css("background-color", rowBackColor);
        this.rowOldBackColor = rowBackColor;
    }

    //多选和单选的情况
    if (this.checkBoxMultiple) {
        if (isChecked) {
            //行索引添加至数组
            this.checkedRowIndex.push(i);
        } else {
            //行索引从数组中移除
           // var index = this.checkedRowIndex.indexOf(i);
            var checkedRow = this.checkedRowIndex;
            var index = jQuery.inArray(i, checkedRow);
            this.checkedRowIndex.splice(index, 1);
        }
    } else {
        var ri = this.checkedRowIndex[0];
        $(this.bodyRows[ri]).css("background-color", (ri % 2 == 0) ? "" : this.alternateRowBackColor);

        if (isChecked) {
            //行索引添加至数组
            this.checkedRowIndex.length = 1;
            this.checkedRowIndex[0] = i;
            var cbList = $(this.bodyRows).find("input[type='checkbox']");
            cbList.splice(i, 1);
            $(cbList).attr("checked", false);
            this.checkedReturnJsonData = this.recordSetJson[i];
        } else {
            //清空数组
            this.checkedRowIndex.length = 0;
            this.checkedReturnJsonData = null;
        }
    }
}
//#endregion 表体CheckBox数据列

//#region 单元格内扩展功能按钮

//创建单元格时一并创建
SzdwGridView.prototype.CreateButtonExpandor = function (targetCell, fnShow, rowJsonData) {
    var t = targetCell;
    var field = $(t).data("field");
    var visible = fnShow ? fnShow(rowJsonData, field) : true;
    var hasExpandor = $(t).data("hasExpandor");
    if (hasExpandor && visible) {
        var rowIndex = $(t).data("rowIndex");
        var cellIndex = $(t).data("cellIndex");

        var w = this.expandorWidth;
        var h = this.expandorHeight;
        var x = $(t).innerWidth() - w;
        var y = 0;
        var bc = this.isExpandorBackColorSameAsTagetColor ? $(t).css("color") : this.expandorBackColor;
        var op = this.expandorOpacity;
        var moOp = this.expandorMouseOverOpacity;

        $(t).css({ "position": "relative"});
        var b = document.createElement("div");//"left": x, "top": y,
        b.id = "expandor";// + rowIndex + cellIndex;
        $(b).css({ "position": "absolute", "left": x, "top": y, "background-color": bc, "opacity": op, "width": w, "height": h, "cursor": "pointer", "text-align": "center" });
        $(b).css({ "background-image": "url(/SzdwControls/image/gridview/expandor.png)", "background-position": "center", "background-repeat": "no-repeat" });
        $(t).append(b);
          
        //绑定事件
        var szdwGv = this;
        $(b).mouseover(function (e) {
            //获取当前扩展器所在的行索引和列索引
            var t = this.parentNode;
            szdwGv.expandorRowIndex = t.parentNode.rowIndex;
            szdwGv.expandorCellIndex = cellIndex;

            //存储当前扩展器对象
            $(this).data("rowIndex", szdwGv.expandorRowIndex);
            $(this).data("cellIndex", szdwGv.expandorCellIndex);
            szdwGv.currentExpandor = this;

            //获取创建扩展按钮组所需的数据
            szdwGv.GetDataForExpandButtonGroup();

            //创建扩展按钮组
            $(this).css("opacity", moOp);
            var namingContainer = szdwGv.panel;
            var targetControl = this;
            var position = "absolute";
            var wBody = szdwGv.bodyWidth;
            var tx = $(t).position().left;
            var ctx = Math.ceil(tx);
            var otx = ctx - tx;
            tx = otx == 0 ? tx + 1 : ctx;
            var x = tx + $(t).innerWidth();
            var y = $(t).position().top;
            var height = $(this).height();
            var g = szdwGv.expandButtonGroups[cellIndex];
            if (g == null) {
                //创建扩展按钮组对象并存入数组
                g = szdwGv.CreateExpandButtonGroup(namingContainer, targetControl, position, x, y, height);
                szdwGv.expandButtonGroups[cellIndex] = g;
            } else {
                g.targetControl = this;
                g.SetPosition(x, y);
                g.Show();
            }

            //自定义设置扩展按钮
            szdwGv.ExpandButtonSetting(g);
        }).mouseout(function (e) {
            var g = szdwGv.expandButtonGroups[cellIndex];
            var r = e.relatedTarget;
            if (r != null) {
                var i = (szdwGv.isCheckBox) ? r.parentNode.cellIndex - 1 : r.parentNode.cellIndex;
                if (r != g.panel && r.parentNode != g.panel && r.parentNode.parentNode != g.panel) {
                    $(this).css("opacity", op);
                    if (i != cellIndex) {
                        g.Hide();
                    }
                }
            }
        });
    }
}

//扩展按钮自定义设置
SzdwGridView.prototype.ExpandButtonSetting = function (ExpandButtonGroup) {
    var g = ExpandButtonGroup;
    var jl = g.btnJsonList;
    var arrBtn = g.arrBtn;
    var len = jl.length;
    for (var i = 0; i < len; i++) {
        var btn = arrBtn[i];
        if (jl[i].FnSetting) {
            jl[i].FnSetting(btn);
        }
    }
}

//扩展按钮事件绑定函数
SzdwGridView.prototype.CreateExpandButtonGroup = function (namingContainer, targetControl, positon, x, y, height) {
    var bc = this.isExpandorBackColorSameAsTagetColor ? $(targetControl).css("background-color") : this.expandorBackColor;
    var op = this.expandorOpacity;
    var moOp = this.expandorMouseOverOpacity;
    var g = new SzdwButtonGroup(positon, x, y, height);
    g.namingContainer = namingContainer;    
    g.targetControl = targetControl;
    g.btnHeight =  this.expandorHeight; //21;
    g.panelCssJson = { "font-family": "微软雅黑", "font-size": "small", "padding-right": "0px" };
    g.btnTextCssJson = { "position": "relative", "color": "White", "height": g.btnHeight, "line-height": g.btnHeight + "px", "cursor": "pointer", "padding": "0px 3px 0px 3px" };
    g.btnImageCssJson = { "position": "relative", "color": "White", "cursor": "pointer", "padding": "0px 3px 0px 3px"};
    g.backgroundColor = bc;
    g.opacity = moOp;
    g.btnJsonList = this.expandorBtnJsonList;
    g.Load();

    //绑定mouseleave事件
    $(g.panel).mouseleave(function (e) {
        if (e.relatedTarget != g.targetControl) {
            $(this).fadeOut();
            $(g.targetControl).css("opacity", op);
        }
    });

    return g;
}

//获取创建扩展按钮组所需的数据:按钮文字数组、图标数组、对应事件函数数组等
SzdwGridView.prototype.GetDataForExpandButtonGroup = function () {
    //获取所在列的字段和传入的对象外自定义的函数对象
    var field = this.fieldJsonData[this.expandorCellIndex].Field;
    var fn = this.fnExpandButtonGroup;

    //执行对象外自定义的函数
    //根据所对应字段的设置相应的按钮文字数组、图标数组、对应事件函数数组等
    fn(this, field);
}
//#endregion 单元格内扩展功能按钮

//#region 数据操作列

//创建数据操作列表头
SzdwGridView.prototype.CreateOperationHead = function () {
    var cssName = this.operationColumnCssName;
    var cssJson = this.operationColumnCssJson;

    var th = document.createElement("th");
    this.SetStyleByCssName(th, cssName);
    this.SetStyleByCssJson(th, cssJson);

    $(th).width(this.operationColumnWidth).text(this.operationColumnText);
    return th;
}

//创建表体数据操作列
SzdwGridView.prototype.CreateBodyOperationColumn = function (rowIndex, row) {
    //创建操作列
    var szdwCtrl = this;
    var td = document.createElement("td");
    $(row).append(td);
    this.operationColumnIndex = td.cellIndex;

    //样式
    var cssName = this.operationCellCssName;
    var cssJson = this.operationCellCssJson;
    this.SetStyleByCssName(td, cssName);
    this.SetStyleByCssJson(td, cssJson);
    $(td).width(this.operationColumnWidth).data("rowIndex", rowIndex).data("cellIndex", td.cellIndex);
    
    //创建编辑按钮
    var modifyPermission = this.permission.modifyPermission;    
    var editBtnJsonData = { image: this.editingImageUrl, text: "编辑", title: "编辑", permission: modifyPermission };
    var btnEdit = this.CreateBodyOperationButton(editBtnJsonData);
    $(td).append(btnEdit);

    //编辑按钮单击事件
    if (modifyPermission) {
        $(btnEdit).click(function (e) {
            if (!$(this).data("disabled")) {
                e.stopPropagation();
                var rowIndex = td.parentNode.rowIndex;
                $(this).data("rowIndex", rowIndex);

                //单击时要执行的函数
                if (szdwCtrl.fnEditing) { szdwCtrl.fnEditing(rowIndex); }
            }
        });
    }

    //创建删除按钮
    var deletePermission = this.permission.deletePermission;
    var deleteBtnJsonData = { image: this.deletingImageUrl, text: "删除", title: "删除", permission: deletePermission };
    var btnDelete = this.CreateBodyOperationButton(deleteBtnJsonData);
    $(td).append(btnDelete);

    //删除按钮单击事件
    if (deletePermission) {
        $(btnDelete).click(function (e) {
            if (!$(this).data("disabled")) {
                e.stopPropagation();

                //删除前确认
                if (!confirm("你确认要删除这条记录吗?")) {
                    return false;
                }

                var rowIndex = td.parentNode.rowIndex;
                $(this).data("rowIndex", rowIndex);
                //单击时要执行的函数
                if (szdwCtrl.fnDeleting) {
                    szdwCtrl.fnDeleting(rowIndex);
                } else {
                    szdwCtrl.Delete(rowIndex);
                }
            }
        });
    }

    //数据操作列创建后外部事件
    if (this.fnOperationColumnCreated) {
        this.fnOperationColumnCreated(td);
    }
    //return td;
}

//创建表体数据操作列按钮

//brnJsonData:{image:imageUrl,text:text,title:title,permission:permission}
SzdwGridView.prototype.CreateBodyOperationButton = function (btnJsonData) {
    var blnPermission = btnJsonData.permission;
    var width = this.operationBtnWidth;
    var height = this.operationBtnHeight;
    var cssName = blnPermission ? this.operationBtnCssName : this.operationBtnDisabledCssName;
    var cssJson = blnPermission ? this.operationBtnCssJson : this.operationBtnDisabledCssJson;
    var hoverCssName = this.operationBtnHoverCssName;
    var hoverCssJson = this.operationBtnHoverCssJson;

    //按钮
    var btn = document.createElement("div");
    this.SetStyleByCssName(btn, cssName);
    this.SetStyleByCssJson(btn, cssJson);
    if (width > 0) { $(btn).outerWidth(width); }
    if (height > 0) { $(btn).outerHeight(height); }
    $(btn).css({ "line-height": height + "px" }).data("disabled", !blnPermission).attr("onselectstart", "return false");
    if (btnJsonData.title) { btn.title = btnJsonData.title; }

    //按钮图标
    var image = btnJsonData.image;
    if (image) {
        var imageCssName = this.operationImageCssName;
        var imageCssJson = this.operationImageCssJson;

        var btnImage = document.createElement("div");
        btnImage.id = "btnImage";
        this.SetStyleByCssName(btnImage, imageCssName);
        this.SetStyleByCssJson(btnImage, imageCssJson);
        $(btnImage).outerWidth(this.operationImageWidth);
        $(btnImage).outerHeight(this.operationImageHeight);

        var img = image ? image.toString().replace("~", "..") : "";
        var backImg = "url(" + img + ") no-repeat center";
        $(btnImage).css({ "float": "left", "background": backImg, "border-left": "0px solid blue" });

        this.btnImage = btnImage;
        $(btn).append(btnImage);
    }

    //按钮文字
    var text = btnJsonData.text;
    if (this.hasOperationBtnText && text && $.trim(text).length > 0) {
        var textCssName = this.operationTextCssName;
        var textCssJson = this.operationTextCssJson;

        var btnText = document.createElement("div");
        btnText.id = "btnText";
        $(btnText).text(text);
        this.SetStyleByCssName(btnText, textCssName);
        this.SetStyleByCssJson(btnText, textCssJson);
        $(btnText).height(height);
        $(btnText).css({ "float": "left", "line-height": height + "px" });

        this.btnText = btnText;
        $(btn).append(btnText);
    }
   
    //绑定事件
    if (blnPermission) {
        var szdwCtrl = this;
        $(btn).mouseover(function () {
            if (!$(this).data("disabled")) {
                szdwCtrl.SetStyleByCssName(this, hoverCssName);
                szdwCtrl.SetStyleByCssJson(this, hoverCssJson);
            }
        }).mouseleave(function () {
            if (!$(this).data("disabled")) {
                szdwCtrl.SetStyleByCssName(this, cssName);
                szdwCtrl.SetStyleByCssJson(this, cssJson);
            }
        });
    }

    return btn;
}

//删除数据
SzdwGridView.prototype.Delete = function (rowIndex) {
    var szdwCtrl = this;
    var jsonData = this.recordSetJson[rowIndex];
    var url = this.deleteRequestUrl ? this.deleteRequestUrl : this.requestUrl;   
    var paramJson = this.deleteParamJson;
    paramJson[this.pkField] = jsonData.Id;
    $.ajax({ url: url, type: "post", data: paramJson, dataType: "text",
        success: function (strData) {
            var strDeleted = strData.toLowerCase();
            var isDeleted = strDeleted === "true" || strDeleted === "1" ? true : false;
            if (isDeleted) {
                szdwCtrl.DataBind();
            }
        }
    });
}
//#endregion 数据操作列

//#region 控件列：单元格内控件

//创建单元格时一并创建
SzdwGridView.prototype.LoadControlColumn = function (targetCell, fn) {
    var t = targetCell;
    var jsonList = this.recordSetJson;
    if (fn) {
        var c = fn(jsonList, targetCell);
        $(c).data("szdwControl", this);
        $(t).append(c);
    }
} 
//#endregion 控件列：单元格内控件

//#region 更新表体结果集数据

//更新数据表
SzdwGridView.prototype.UpdateBodyData = function (jsonData) {
    this.recordSetJson = jsonData;
    var pa = this.pagination;
    if (pa != null) {
        pa.UpdateInfo();
    }

    if ($.isEmptyObject(jsonData)) {
        $(this.bodyTable).hide();
        return false;
    } else {
        $(this.bodyTable).show();
    }

    var tb = this.bodyTable;
    var th = $(this.head).find("th");
    var tr = this.bodyRows;
    var trLen = tr.length;
    var jdLen = jsonData.length;
    var cellCssJson = this.cellCssJson;
    var fieldJsonData = this.fieldJsonData;
    var fieldType = this.fieldType;

    //更新数据
    var newLen = Math.min(trLen, jdLen);
    for (var i = 0; i < newLen; i++) {
        var td = $(tr[i]).find("td");
        var rowJsonData = jsonData[i];
        var isCheckBox = this.isCheckBox;

        //选择框更新
        if (this.checkBoxDisabledField) {
            $(this.checkBoxList[i]).attr("disabled", rowJsonData[this.checkBoxDisabledField]);
        }

        //选择框更新
        if (this.checkBoxDataBindField) {
            var checked = rowJsonData[this.checkBoxDataBindField];
            $(this.checkBoxList[i]).prop("checked", checked);
            this.BodyCheckBoxMouseClick(i, checked);
        }

        //数据更新
        for (var j = 0; j < fieldJsonData.length; j++) {
            var m = (isCheckBox) ? j + 1 : j;
            var cell = td[m];
            var jdField = fieldJsonData[j];

            //更新数据
            this.CellDataBind(rowJsonData, jdField, cell);

            //单元格扩展按钮
            var fnShow = jdField.FnShowExpandor;
            this.CreateButtonExpandor(cell, fnShow, rowJsonData);

            //控件列
            var fn = jdField.FnControlColumn;
            if (fn) {
                $(cell).empty();
                this.LoadControlColumn(cell, fn);
            }
            
            //设置单元格或当前行的样式
            var fnStyle = jdField.FnSetStyle;
            if (fnStyle) { fnStyle(cell); }
        }
        //数据操作列创建后外部事件
        if (this.fnOperationColumnCreated) {
            var colCell = td[this.operationColumnIndex];
            this.fnOperationColumnCreated(colCell);
        }
    }

    //新数据比原来行数少
    if (jdLen < trLen) {
        //删除多余的行和行中的CheckBox
        for (var i = trLen - 1; i >= jdLen; i--) {
            tb.deleteRow(i);
            this.unusedRows.push(this.bodyRows[i]);
            this.checkBoxList.splice(i, 1)
        }
    }

    /*//新数据比原来行数多    
    if (jdLen > trLen) {
    var ur = this.unusedRows;
    var urLen = ur.length;
    var diff = jdLen - trLen;
    if (diff <= ur.length) {
    for (var i = 0; i < diff; i++) {
    //恢复数据行
    var tr = ur.pop();
    $(tb).append(tr);
    }
    } else {
    //第一步:恢复其中已有的数据
    while (ur.length > 0) {
    //恢复数据行
    var tr = ur.pop();
    $(tb).append(tr);
    }

    //第二步:创建数据行
    var newRi = trLen + urLen;
    for (var i = newRi; i < jdLen; i++) {
    //创建数据行
    var tr = this.CreateBodyRow(i);
    this.CreateBodyCell(i, tr);
    $(tb).append(tr);
    this.bodyRows.push(tr);
    }
    }
    }*/

    //新数据比原来行数多    
    if (jdLen > trLen) {
        //创建新数据行
        for (var i = trLen; i < jdLen; i++) {
            //创建数据行
            var tr = this.CreateBodyRow(i);
            this.CreateBodyCell(i, tr);
            $(tb).append(tr);
        }
    }

    this.bodyRows = $(tb).find("tr");
    this.SetHeadBodySumRowSameWidth();

    //复制冻结列数据
    if (this.freezeCols) {
        if (!this.freezeColPanel) this.CreateFreezeColPanel();
        this.GetFreezeColData();
    }
    
}
//#endregion 更新表体结果集数据

//#region 创建数据汇总行sumRow

//创建数据汇总行
SzdwGridView.prototype.CreateSumRow = function () {
    if (this.hasSumRow) {
        var jsonData = this.recordSumJson;
        if (jsonData == null) { return false; }

        var width = this.sumRowWidth;
        var height = this.sumRowHeight;
        var sumRowCssName = this.sumRowCssName;
        var sumRowCssJson = this.sumRowCssJson;

        //创建Head并设置尺寸样式
        var gs = document.createElement("div");
        if (sumRowCssName != null) { $(gs).addClass(sumRowCssName); }
        if (sumRowCssJson != null) { $(gs).css(sumRowCssJson); }
        $(gs).width(width).outerHeight(height);

        //绑定数据
        var tr = document.createElement("tr");
        $(tr).outerHeight(height);

        //创建checkBox对应的列
        if (this.isCheckBox) {
            var td = document.createElement("td");
            $(td).width(this.checkBoxCellWidth);
            $(tr).append(td);
        }

        //创建其他数据列 
        var fieldJsonData = this.fieldJsonData;
        var cellCssJson = this.cellCssJson;
        var srp = this.sumRowPosition;
        for (var i = 0; i < fieldJsonData.length; i++) {
            var td = document.createElement("td");
            var field = fieldJsonData[i].Field;
            var fieldType = fieldJsonData[i].FieldType;
            var digits = fieldJsonData[i].Digits;
            $(td).data("cellIndex", i).data("field", field).data("fieldType", fieldType).data("digits", digits);

            //汇总行第一个单元格中显示类似"合计"字样
            if (i == 0) { $(td).text(this.sumRowText); }

            //样式
            var tdFieldCss = this.GetCellCssJsonByField(field);
            $(td).css(tdFieldCss);
            $(td).css({ "padding-left": "3px", "padding-right": "3px" });
            $(td).innerWidth(fieldJsonData[i].Width);

            if (fieldJsonData[i].HasExpandor) {
                if (i == 0) {
                    $(td).innerWidth(fieldJsonData[i].Width + this.expandorWidth);
                } else {
                    var pr = parseInt($(td).css("padding-right")) + this.expandorWidth;
                    $(td).css("padding-right", pr + "px");
                }
            }

            if (srp == 1) {
                var bc = $(td).css("background-color");
                $("#testInfo").val(bc);
                backColor = bc == null || bc == "" ? "transparent" : bc;
                $(td).css("border-right", "1px solid " + backColor);
            }

            //填充汇总数据
            if (fieldType == this.fieldType.Integer || fieldType == this.fieldType.Decimal || fieldType == this.fieldType.Percentage) {
                this.CellDataBind(jsonData, fieldJsonData[i], td);
            }
            $(tr).append(td);
        }

        //设定汇总行的位置和样式
        var tb = document.createElement("table");
        $(tb).css(this.sumRowTableCssJson);
        $(tb).append(tr);
        $(gs).append(tb);
        this.sumRow = gs;
        var dp = this.dataPanel;
        var bd = this.body;
        var hd = this.head;
        switch (srp) {
            case 0: //数据表外顶部
                var gsbox = document.createElement("div");
                $(gsbox).append(gs);
                $(gsbox).css({ "border-top": "1px solid " + $(hd).css("borderTopColor"), "background-color": $(gs).css("background-color") });
                $(gs).css("border", "0px");
                $(gsbox).innerWidth($(dp).innerWidth());
                $(dp).append(gsbox);
                break;
            case 1: //数据表内最后一行
                $(gs).css("background-color", "transparent");
                $(bd).append(gs);
                break;
            case 2: //数据表外底部
                $(dp).append(gs);
                $(bd).css({ "border-bottom": "1px solid " + $(dp).css("border-bottom-color") });
                break;
        }

    }
}

//更新汇总数据
SzdwGridView.prototype.UpdateSumRowData = function (jsonData) {
    if (this.hasSumRow) {
        var sr = this.sumRow;
        var flag = jsonData.RecordCount;
        if (flag) {
            var cells = $(sr).find("td");
            var len = cells.length;
            for (var i = 0; i < len; i++) {
                var cell = cells[i];
                var fieldType = $(cell).data("fieldType");
                var fieldJsonData = { "FieldType": fieldType };

                //更新汇总数据
                if (fieldType == this.fieldType.Integer || fieldType == this.fieldType.Decimal || fieldType == this.fieldType.Percentage) {
                    this.CellDataBind(jsonData, fieldJsonData, cell);
                }
            }
        }
    }
}

//汇总行显隐
SzdwGridView.prototype.ShowSumRow = function () {
    $(this.sumRow).toggle();
}
//#endregion 创建数据汇总行sumRow

//#region 创建分页控件pagination

//创建分页控件pagination
SzdwGridView.prototype.CreatePagination = function () {
    if (this.hasPagination) {
        var p = this.pagination;
        var pCssName = this.paginationCssName;
        var pCssJson = this.paginationCssJson;
        if (p == null || typeof (p) == "undefined") {
            //创建Paginationt实例
            var position = "relative";
            var width = this.paginationWidth;
            var height = this.paginationHeight;
            var x = 0;
            var y = 0;
            p = new SzdwPagination(position, x, y, width, height);
            p.namingContainer = this.panel;
            p.targetControl = this;
            p.rowCount = this.paginationRowCount;
            p.recordCount = this.recordCount;
            p.pageSize = this.pageSize;

            if (pCssName != null) {
                p.panelCssName = pCssName;
            }

            if (pCssJson != null) {
                p.panelCssJson = pCssJson;
            } else {
                p.panelCssJson["border-top"] = "0px";
            }

            this.pagination = p;
            p.Load();
        }
    }
}
//#endregion 创建分页控件pagination

//#region 冻结列面板

//创建冻结列面板
SzdwGridView.prototype.CreateFreezeColPanel = function () {
    var c = this.freezeCols;
    if (c) {
        var p = this.panel;
        var fcp = $("<div></div>");
        var cssName = this.freezeColPanelCssName;
        var cssJson = this.freezeColPanelCssJson;
        this.SetStyleByCssName(fcp, cssName);
        this.SetStyleByCssJson(fcp, cssJson);

        //冻结列面板尺寸
        var w = this.GetFreezeColPanelWidth();
        var h = this.GetFreezeColPanelHeight();
        $(fcp).outerWidth(w).outerHeight(h).appendTo(p);
        this.freezeColPanel = fcp;

        //复制冻结列数据
        this.GetFreezeColData();

        //当汇总行位置为2，即在数据表外底部时
        var isFreezeSumRow = this.hasSumRow && this.sumRowPosition == 2;
        if (isFreezeSumRow) {
            this.CreateFreezeColSumRow();
            this.GetFreezeColSumRowData();
        }
    }
}

//获取冻结列数据
SzdwGridView.prototype.GetFreezeColData = function () {
    var c=this.freezeCols;
    if (c) {
        //冻结列数据面板
        var fw = this.GetFreezeColPanelWidth();
        var fData = $(this.dataPanel).clone(true);
        $(fData).css({ "border-bottom":"0px" }).outerWidth(fw);
        this.freezeColDataPanel = fData;

        //冻结列表头单元格组
        var fHCells = $("th", fData);
        $(fHCells).data("isFreeze", true);       
        this.freezeColHeadCells = fHCells;

        //冻结列数据体
        var fBody = $("#gridBody", fData);
        var bch = this.body ? this.body.clientHeight : 0;
        var fcbOffsetWidth = this.freezeColBodyOffsetWidth;
        fBody.height(bch).outerWidth(fw + fcbOffsetWidth).css({ "overflow": "hidden" });
        this.freezeColBody = fBody;

        //冻结列数据行组
        var fRows = $("tr", fBody);
        $(fRows).data("isFreeze", true); 
        this.freezeColBodyRows = fRows;
        
        $(this.freezeColPanel).empty().append(fData);

        //设置冻结列面板滚动
        this.SetFreezeColPanelScroll();
    }
}

//获取冻结列面板宽度
SzdwGridView.prototype.GetFreezeColPanelWidth = function () {
    var w = parseInt($(this.dataPanel).css("border-left-width"));
    var rows = this.bodyRows;
    var cells = $("td", rows[0]);
    var c = this.freezeCols;
    for (var i = 0; i < c; i++) {
        w += $(cells[i]).outerWidth();
    }

    return w;
}

//获取冻结列面板高度
SzdwGridView.prototype.GetFreezeColPanelHeight = function () {
    var dp = this.dataPanel;
    var bw = parseInt($(dp).css("border-left-width"));
    var bh = parseInt($(dp).css("border-top-width")) + parseInt($(dp).css("border-bottom-width"));
    var bch = this.body ? this.body.clientHeight : 0;
    var sumRowH = this.hasSumRow && this.sumRowPosition == 0 ? $(this.sumRow).innerHeight() : 0;
    var h = $(this.head).innerHeight() + bch + bh + sumRowH;

    return h;
}

//创建汇总行冻结列面板:当汇总行位置为2，即在数据表外底部时
SzdwGridView.prototype.CreateFreezeColSumRow = function () {    
    var fsr = $("<div></div>");
    this.SetStyleByCssName(fsr, this.freezeColSumRowCssName);
    this.SetStyleByCssJson(fsr, this.freezeColSumRowCssJson);
    var backColor = $(this.dataPanel).css("background-color");

    var dp = this.dataPanel;
    var bw = parseInt($(dp).css("border-left-width"));
    var bh = parseInt($(dp).css("border-top-width")) + parseInt($(dp).css("border-bottom-width"));

    var sumRow = this.sumRow;
    var x = this.GetFreezeColSumRowX();
    var y = this.GetFreezeColSumRowY();
    var w = $(this.freezeColPanel).width() - bw;
    var h = this.sumRowHeight - bh;
    
    var cssPlus = { "left": x, "top": y, "background-color": backColor };
    $(fsr).width(w).height(h).css(cssPlus).appendTo($(sumRow).parent());
    this.freezeColSumRow = fsr;
}

//获取汇总行冻结列数据
SzdwGridView.prototype.GetFreezeColSumRowData = function () {
    var sumRow = this.sumRow;
    var fSumRow = $(sumRow).clone(true);
    $(this.freezeColSumRow).empty().append(fSumRow);
}

//获取汇总行冻结列横坐标
SzdwGridView.prototype.GetFreezeColSumRowX = function () {
    var x = parseInt($(this.dataPanel).css("border-left-width"));
    return x;
}

//获取汇总行冻结列纵坐标
SzdwGridView.prototype.GetFreezeColSumRowY = function () {
    var y = this.sumRow ? $(this.sumRow).position().top : 0;
    return y;
}

//加载冻结列面板：用于响应外部的按钮事件来临时创建冻结列面板
SzdwGridView.prototype.LoadFreezeColPanel = function (freezeColsCount) {
    if (freezeColsCount) {
        if (this.freezeColPanel) { this.UnloadFreezeColPanel(); }
        this.freezeCols = freezeColsCount;
        this.CreateFreezeColPanel();
    }
}

//卸载冻结列面板：用于响应外部的按钮事件来卸载冻结列面板
SzdwGridView.prototype.UnloadFreezeColPanel = function () {
    $(this.freezeColPanel).remove();

    this.freezeColPanel = null;
    this.freezeColDataPanel = null;
    this.freezeColHead = null;
    this.freezeColBody = null;
    this.freezeColBodyRows = new Array();
    this.freezeColLoadingImg = null;

    $(this.freezeColSumRow).remove();
    this.freezeColSumRow = null;
}

//#endregion 冻结列面板

//#region 改变宽高尺寸

//改变宽高尺寸
SzdwGridView.prototype.Reposition = function (x, y) {
    this.x = x;
    this.y = y;
    $(this.panel).css({ "left": x, "top": y });

    //重定位汇总行冻结列
    this.RepositionFreezeColSumRow();
}

//重定位汇总行冻结列
SzdwGridView.prototype.RepositionFreezeColSumRow = function () {
    var blnFlag=this.freezeCols && this.hasSumRow && this.sumRowPosition==2;
    if (blnFlag) {
        var fsrX = this.GetFreezeColSumRowX();
        var fsrY = this.GetFreezeColSumRowY();
        $(this.freezeColSumRow).css({ "left": fsrX, "top": fsrY });
    }
}

//重设尺寸
SzdwGridView.prototype.Resize = function (width, height) {
    var w = Math.max(width, this.minWidth);
    var h = Math.max(height, this.minHeight);

    this.width = w;
    this.height = h;

    //修正panel的宽度高度
    $(this.panel).outerWidth(w);
    $(this.panel).outerHeight(h);

    //修正headBox的宽度高度
    if (this.head) {
        var headBox = this.head.parentNode;
        $(headBox).innerWidth(w);
    }

    //修正dataPanel的宽度高度    
    this.dataPanelHeight = this.GetDataPanelHeight();
    $(this.dataPanel).outerWidth(w);
    $(this.dataPanel).outerHeight(this.dataPanelHeight);

    $(this.head).outerWidth(w);
    $(this.body).outerWidth($(this.dataPanel).innerWidth());
    var srh = this.sumRowPosition == 1 || !this.hasSumRow ? 0 : $(this.sumRow).outerHeight();
    var bodyHeight = $(this.dataPanel).innerHeight() - $(this.head).outerHeight() - srh;
    $(this.body).outerHeight(bodyHeight);

    //修正pagination的宽度
    if (this.pagination) { this.pagination.Resize(w); }

    //修正汇总行宽度
    if (this.sumRowPosition == 0 && this.sumRow != null) {
        var srBox = this.sumRow.parentNode;
        $(srBox).innerWidth(w);
    }

    this.SetHeadBodySumRowSameWidth();

    //修正加载动画的位置
    var left = (this.width - this.loadingImgWidth) / 2;
    var top = (this.height - this.loadingImgHeight) / 2;
    $(this.loadingImg).css({ "left": left, "top": top });

    //修正冻结列面板高度
    if (this.freezeCols) {
        var fcp = this.freezeColPanel;
        var fdp = this.freezeColDataPanel;
        var ph = this.GetFreezeColPanelHeight();
        $(fcp).outerHeight(ph);
        $(fdp).outerHeight(ph);

        var bch = this.body ? this.body.clientHeight : 0;
        var fcBody = this.freezeColBody;
        if (fcBody) { $(fcBody).innerHeight(bch); }

        //重定位汇总行冻结列
        this.RepositionFreezeColSumRow();
    }
}
//#endregion 改变宽高尺寸

//#region 设置dataPanel
SzdwGridView.prototype.SetDataPanelCss = function () {
    var p = this.dataPanel;
    var dataPanelCssName = this.dataPanelCssName;
    var dataPanelCssJson = this.dataPanelCssJson;
    if (dataPanelCssName != null) { $(p).addClass(dataPanelCssName); }
    if (dataPanelCssJson != null) { $(p).css(dataPanelCssJson); }

    this.dataPanelHeight = this.GetDataPanelHeight();
    $(p).outerWidth(this.dataPanelWidth);
    $(p).outerHeight(this.dataPanelHeight);
}

//计算dataPanel的高度
SzdwGridView.prototype.GetDataPanelHeight = function () {
    var ph = this.GetPaginationHeight();
    var th = this.hasTitle ? this.titleHeight : 0;
    return this.height - th - this.buttonPanelHeight - ph;
}

//计算Pagination的高度
SzdwGridView.prototype.GetPaginationHeight = function () {
    var p = this.pagination;
    var h = this.paginationHeight;
    var hasP = this.hasPagination;

    if (p == null) {
        return 0;
    } else {
        var v = p.visible;
        hasP = hasP && v;
        return hasP ? $(p.panel).outerHeight() : 0;
    }
}

//设置数据行替换色
SzdwGridView.prototype.SetRowMouseOverBackColor = function (row, color) {
    var GridView = this;
    $(row).mouseover(function () {
        GridView.rowOldBackColor = this.style.backgroundColor;
        this.style.backgroundColor = color;
        GridView.SetFreezeColPanelRowMouseOverBackColor(this, color);
    });

    $(row).mouseout(function () {
        var backColor = GridView.rowOldBackColor;
        this.style.backgroundColor = backColor;
        GridView.SetFreezeColPanelRowMouseOverBackColor(this, backColor);
    });
}

//设置冻结列面板的数据行替换色
SzdwGridView.prototype.SetFreezeColPanelRowMouseOverBackColor = function (mouseOverRow, backColor) {
    var row = mouseOverRow;
    if (this.freezeCols) {
        var isFreeze = $(row).data("isFreeze");
        var i = row.rowIndex;
        var fRows = isFreeze ? this.bodyRows : this.freezeColBodyRows;
        var fRow = fRows[i];
        $(fRow).css({ "background-color": backColor });
    }
}
//#endregion 设置dataPanel

//#region 标题行和数据行滚动

SzdwGridView.prototype.SetScrollDefault = function () {
    var gh = this.head;
    var gb = this.body;
    var gf = this.sumRow;

    var skt=this.scrollKeeingType;
    var isKeepingX = skt == 1 || skt == 2 ? true : false;
    var isKeepingY = skt == 1 || skt == 3 ? true : false;

    if (!isKeepingX) {
        if (gh) { $(gh).scrollLeft(0); }
        if (gb) { $(gb).scrollLeft(0); }
        if (gf) { $(gf).scrollLeft(0); }
    }

    if (!isKeepingY) {
        if (gb) { $(gb).scrollTop(0); }
    }
}

//设置标题行和数据行滚动一致
SzdwGridView.prototype.SetScroll = function () {
    var gh = this.head;
    var gb = this.body;
    var gf = this.sumRow;
    var szdwCtrl = this;

    var fcp = this.freezeColPanel;
    var fBody = $("#gridBody", fcp);

    if (gb == null) {
        return false;
    } else {
        this.SetHeadBodySumRowSameWidth();
        $(gb).scroll(function () {
            if (gh) { $(gh).scrollLeft($(gb).scrollLeft()); }
            if (gf) { $(gf).scrollLeft($(this).scrollLeft()); }
        });
    }
}

//设置冻结列与非冻结列同步滚动
SzdwGridView.prototype.SetFreezeColPanelScroll = function () {
    this.MarkScrollElement();

    var gb = this.body;
    var szdwCtrl = this;
    var fcp = this.freezeColPanel;
    var fBody = $("#gridBody", fcp);

    //初始滚动位置一致
    $(fBody).scrollTop($(gb).scrollTop());

    //同步滚动
    if (gb) {
        $(gb).scroll(function () {
            //冻结列面板同步垂直滚动
            var isScrolling = fBody && !szdwCtrl.freezeColBodyIsScrollingElement;
            if (isScrolling) {
                $(fBody).scrollTop($(this).scrollTop());
            }
        });
    }

    //冻结列面板滚动时，非冻结列同步垂直滚动   
    if (fBody) {
        var fData = this.freezeColDataPanel;
        $(fBody).css({ "overflow-y": "scroll" });
        $(fBody).scroll(function () {
            var isScrolling = gb && szdwCtrl.freezeColBodyIsScrollingElement;
            if (isScrolling) { $(gb).scrollTop($(this).scrollTop()); }
            if ($(this).scrollLeft() > 0) { $(this).scrollLeft(0); }
            if ($(fData).scrollLeft() > 0) { $(fData).scrollLeft(0); }
        });
    }
}

//标记当前滚动元素是冻结列还是非冻结列
SzdwGridView.prototype.MarkScrollElement = function () {
    if (this.freezeCols) {
        var szdwCtrl = this;
        var fcp = this.freezeColPanel;
        $(fcp).mouseover(function () {
            szdwCtrl.freezeColBodyIsScrollingElement = true;
        }).mouseleave(function () {
            szdwCtrl.freezeColBodyIsScrollingElement = false;
        });
    }
}

//设置标题行和数据行容器可视宽度一致，便于滚动一致
SzdwGridView.prototype.SetHeadBodySumRowSameWidth = function () {
    var gh = this.head;
    var gb = this.body;
    var gs = this.sumRow;

    if (gh == null) {
        return false;
    } else {
        if (gh && gb) { $(gh).innerWidth(gb.clientWidth); }
        if (gs) {
            if (this.sumRowPosition == 1) {
                $(gs).innerWidth($(this.bodyTable).innerWidth());
            } else {
                $(gs).innerWidth(gb.clientWidth);
            }

            if (this.sumRowPosition == 0) {
                var gsBox = $(gs).parent()[0];
                if (gsBox && gb) {
                    $(gsBox).attr("scrollWidth", gb.scrollWidth);
                }
            }
        }
    }
}

//#endregion 标题行和数据行滚动

//#region 设置数据加载动画
SzdwGridView.prototype.CreateLoadingImg = function () {
    if (this.loadingImg == null) {
        var div = document.createElement("div");
        div.id = "loadingImg";
        var img = document.createElement("img");
        img.src = this.loadingImgUrl;
        this.loadingImgWidth = $(img).width();
        this.loadingImgHeight = $(img).height();

        var left = (this.width - $(img).width()) / 2;
        var top = (this.height - $(img).height()) / 2;

        $(div).append(img).css({ "position": "absolute", "left": left, "top": top, "display": "block" });

        this.loadingImg = div;
    }
}

SzdwGridView.prototype.ShowLoadingImg = function () {
    $(this.loadingImg).appendTo(this.panel).show();
}

SzdwGridView.prototype.HideLoadingImg = function () {
    $(this.loadingImg).remove();
}
//#endregion 设置数据加载动画

//#region 显示无数据信息
//显示无数据信息
SzdwGridView.prototype.ShowEmptyDataInfo = function () {
    //标题
    this.SetTitle();

    //分页器
    var p = this.pagination;
    if (p != null) {
        p.Hide();
    }

    //数据面板
    var dp = this.dataPanel;
    if (dp != null) {
        var h = this.GetDataPanelHeight();
        $(dp).css(this.dataPanelCssJson);
        $(dp).outerHeight(h);
    }

    //表头
    this.CreateHead();
    var head = this.head;
    var headHeight = 0;
    if (head != null) {
        var bc = $(head).css("borderTopColor");
        $(head).css("border-bottom", "1px solid " + bc);
        headHeight = $(head).outerHeight();
    }

    //表体
    var body = this.body;
    if (body != null) {
        $(body).hide();
    }

    //汇总行
    var srp = this.sumRowPosition;
    var s = $(this.sumRow);
    if (s != null) {
        s = srp == 0 ? $(s).parent() : s;
        $(s).hide();
    }

    //创建空数据信息
    if (this.emptyDataInfo == null) {
        var emp = document.createElement("div");
        $(emp).text(this.emptyText);
        $(emp).css({ "position": "relative", "font-family": "微软雅黑", "font-size": "12pt", "color": "red", "text-align": "center", "display": "none" });
        this.emptyDataInfo = emp;
    }

    //加载显示空数据信息 
    $(dp).append(this.emptyDataInfo);
    $(this.emptyDataInfo).fadeIn();

    //设置空数据信息位置 
    var top = ($(dp).innerHeight() - headHeight - $(this.emptyDataInfo).innerHeight()) / 2;
    $(this.emptyDataInfo).css("top", top + "px");
}

//移除无数据信息，恢复数据显示
SzdwGridView.prototype.RemoveEmptyDataInfo = function () {
    //恢复分页器
    var p = this.pagination;
    if (p != null) {
        p.Show();
    }

    //数据面板
    var dp = this.dataPanel;
    if (dp != null) {
        var h = this.GetDataPanelHeight();
        $(dp).outerHeight(h);
        $(dp).css(this.dataPanelCssJson);
    }

    //表头
    var head = this.head;
    if (head != null) {
        $(head).css("border-bottom", "0px");
    }

    //表体
    var body = this.body;
    if (body != null) {
        $(body).show();
    }

    //恢复汇总行
    var srp = this.sumRowPosition;
    var s = $(this.sumRow);
    if (s != null) {
        s = srp == 0 ? $(s).parent() : s;
        $(s).show();
    }

    //移除空数据信息框
    var emp = this.emptyDataInfo;
    if (emp != null) {
        $(emp).remove();
        this.emptyDataInfo = null;
    }
}
//#endregion 显示无数据信息

//#region 设置样式

//根据CssName设置样式
SzdwGridView.prototype.SetStyleByCssName = function (element, cssName) {
    if (cssName) { $(element).addClass(cssName); }
}

//根据CssJson设置样式
SzdwGridView.prototype.SetStyleByCssJson = function (element, cssJson) {
    if (cssJson ) { $(element).css(cssJson); }
}
//#endregion 设置样式

//#region 数据筛选器
SzdwGridView.prototype.CreateFilter = function () {
    var f = $("<div><div/>");
    var w = this.filterWidth;
    var h = this.filterHeight;
    var cssName = this.filterCssName;
    var cssJson = this.filterCssJson;

    this.SetStyleByCssName(f, cssName);
    this.SetStyleByCssJson(f, cssJson);
    $(f).outerWidth(w).outerHeight(h);

    this.filter = f;
}

//标题栏中的筛选器标识
SzdwGridView.prototype.CreateFilterMarker = function (parent) {
    var p = parent;
    var pw = $(p).outerWidth();
    var ph = $(p).outerHeight();

    var margin = this.filterMarkerMargin;
    var posi = this.filterMarkerPosition;
    var w = this.filterMarkerWidth ? this.filterMarkerWidth : ph;
    var h = (this.filterMarkerHeight ? this.filterMarkerHeight : ph) - margin * 2;
    var x = posi ? $(p).position().left + pw - w - margin : $(p).position().left + margin;
    var y = $(p).position().top + margin ;
    var cssName = this.filterMarkerCssName;
    var cssJson = this.filterMarkerCssJson;
    var mouseOverCssName = this.filterMarkerMouseOverCssName;
    var mouseOverCssJson = this.filterMarkerMouseOverCssJson;
    var mouseLeaveCssName = this.filterMarkerMouseLeaveCssName;
    var mouseLeaveCssJson = this.filterMarkerMouseLeaveCssJson;
    var img = this.filterMarkerImg.filter;
    var backImg = "url(" + img + ") no-repeat center";
    
    var marker = $("<div/>");
    this.SetStyleByCssName(marker, cssName);
    this.SetStyleByCssJson(marker, cssJson);
    $(marker).outerWidth(w).outerHeight(h).css({ 'left': x, 'top': y ,"background": backImg });

    var szdwCtrl = this;
    $(marker).mouseover(function () {
        szdwCtrl.SetStyleByCssName(marker, mouseOverCssName);
        szdwCtrl.SetStyleByCssJson(marker, mouseOverCssJson);
    }).mouseleave(function (e) {
        szdwCtrl.SetStyleByCssName(marker, mouseLeaveCssName);
        szdwCtrl.SetStyleByCssJson(marker, mouseLeaveCssJson);
    });

    return marker;
}

SzdwGridView.prototype.SetFilterMarkerY = function (marker) {
    if (marker) {
        var p = $(marker).parent();
        var pw = $(p).outerWidth();
        var px = $(p).position().left;
        var margin = this.filterMarkerMargin;
        var posi = this.filterMarkerPosition;
        var w = this.filterMarkerWidth ? this.filterMarkerWidth : ph;
        var x = posi ? px + pw - w - margin : px + margin;
        $(marker).css({ 'left': x });
    }
}
//#endregion 数据筛选器
