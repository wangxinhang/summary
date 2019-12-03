<%@ Page Language="C#"  AutoEventWireup="true" CodeFile="DataBackup.aspx.cs" Inherits="SBJYJCMIS.Web.DataBackUpInsert" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title> 
    <script type="text/javascript">
        var IsIE = (document.all) ? true : false;
        //页面是否合法载入：不再Ifarme中则转向登录页面
        function IsValidPageLoad() {
            if (self == top)
                window.location.href = "../login.html";
        }

        //客户端页面载入函数
        function PageLoad() {
            if (self == top)
                window.location.href = "../login.html";
        }
        //获取用户Id
        function GetXuserId() {
            var xuserId = parent.xuserId;
            var hx = document.getElementById("hiddenXuserId");
            hx.value = xuserId;
        }
        window.onload = function () {
            GetXuserId();
        };
    </script>   
</head>
<body >
<form id="form1" runat="server">
<div>
<asp:ScriptManager ID="SmAutoComplete" runat="server" EnableScriptGlobalization="true" /> 
<asp:HiddenField ID="hiddenXuserId" runat="server" /> 
<div id="InsertPanel" class="InsertPanel">    
<table id="InsertBox" align="center" class="InsertBox">
    <tr>
        <td rowspan="2" valign="top" align="center" width="90px">
             <asp:Image ID="ImageInfo" CssClass="PageImage" runat="server" ImageUrl="~/Styles/image/DataBackUp.png" />
            <asp:Label ID="Label1" Text="数据备份" CssClass="InsertTitle" runat="server"></asp:Label>
        </td>
        <td align="left" style="display:none;">
            <asp:CheckBoxList ID="chklDrivers" RepeatDirection="Vertical" CssClass="chklDrivers" runat="server" AutoPostBack="false" />
        </td>
    </tr>
    <tr>
        <td align="left" valign="bottom">
            <asp:Button ID="btnBackUp"  Text="一键备份数据库" Height="48px"  runat="server" CssClass="btnBackUp" onclick="btnBackUp_Click" />
        </td>       
    </tr>
</table>    
</div> 
<asp:UpdatePanel ID="UpBackUp" runat="server">  
<Triggers>
    <asp:AsyncPostBackTrigger ControlID="btnBackUp" />
</Triggers>              
<ContentTemplate>
<table id="BackUpInfoBox" align="center" class="BackUpInfoBox" >
    <tr>
        <td >
            <asp:BulletedList ID="blstBackupInfo" BulletStyle="Numbered" style="line-height:30px;" runat="server" />
         </td>
    </tr>
</table>    
</ContentTemplate> 
</asp:UpdatePanel>   
<asp:UpdateProgress ID="UpdateProgress1" runat="server"  >
    <ProgressTemplate>
        <div style="top:50%;left:50%;position:absolute;text-align:center">
            <asp:Image ID="imgProgress" ImageUrl="~/SzdwControls/image/loading/loading.gif" runat="server" />
            <br /><br />
            <asp:Label ID="lblProgress" Text="正在备份" runat="server"></asp:Label>
        </div>
    </ProgressTemplate>
</asp:UpdateProgress>
</div>
<table id="Table1" align="center" class="BackUpInfoBox" >    
    <tr>
        <td >
            <asp:Button ID="btnDownloadData"  Text="下载数据备份文件到本地" Height="32px" runat="server" CssClass="btnBackUp"
                onclick="btnDownloadData_Click" style="visibility:hidden;"/>
         </td>
         <td >
            <asp:Button ID="btnDownloadLog"  Text="下载日志备份文件到本地" Height="32px" runat="server" CssClass="btnBackUp"
                onclick="btnDownloadLog_Click" style="visibility:hidden;"/>
         </td>
    </tr>
</table>          
</form>
</body>
</html>
