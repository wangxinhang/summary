<%@ Page Language="C#"  AutoEventWireup="true" CodeFile="ContractMonthReport.aspx.cs"
    Inherits="SBJYJCMIS.Web.ContractMonthReport" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"
    Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<title></title>
<link href="../Styles/ReportPanel.css" rel="stylesheet" type="text/css" />
<script src="../Scripts/jquery-1.11.1.js" type="text/javascript"></script> 
<script src="../SzdwControls/SzdwCommon.js" type="text/javascript"></script>
<script src="../Scripts/CommonJScript.js" type="text/javascript"></script> 
<script type="text/javascript">
    /*#region 网页加载时事件*/
    $(document).ready(function () {
        //初始化设置报表
        InitialReport();

        //窗口调整大小
        $(window).resize(function () {
            ResizeReport();
        });
    });

    //初始化设置报表
    function InitialReport() {
        var p = $("#ReportPanel");
        var c = document.body;
        var h = parent.szdwChart.height;
        var mc = parent.szdwChart.panel;
        if (h) { $(c).height(h); }
        SzdwCommon.setReport(p, c);
        SzdwCommon.showReportExportBar(p, mc);
    }

    //重设报表尺寸
    function ResizeReport() {
        var p = $("#ReportPanel");
        var c = document.body;
        var h = parent.szdwChart.height;
        SzdwCommon.reSizeReport(p, c, h);
    }
    /*#endregion 网页加载时事件*/
    </script> 
</head>

<body>
<form id="form1" runat="server">         
<asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>                
<div id="ReportPanel" style="border:0px;text-align:center;">    
    <rsweb:ReportViewer ID="rptQuery" runat="server" Font-Names="Verdana" Font-Size="10pt"
        InteractiveDeviceInfos="(集合)" WaitMessageFont-Names="Verdana" Width="100%" 
        WaitMessageFont-Size="10pt" PageCountMode="Actual">
    </rsweb:ReportViewer>
</div> 
</form>
</body>
</html>
