<%@ Page Language="C#" AutoEventWireup="true" CodeFile="XmenuIcon.aspx.cs" Inherits="SBJYJCMIS.Web.XMenuManagement" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="../Scripts/jquery-1.8.3.js"></script>
</head>
<body>
    <form id="form1" runat="server">    
        <div id="divIconPopupContent" class="divPopupContent" style="border:0px solid green">
            <asp:UpdatePanel ID="UpIconResult" runat="server">
            <ContentTemplate>                 
                <div id="divIconDir" style="width:100%;margin-top:3px;height:20px;border:1px solid silver;padding-top:2px">
                    <asp:DropDownList ID="ddlIconDir" runat="server" AutoPostBack="True"  CssClass="QueryDropDown">           
                    </asp:DropDownList>
                </div>        
                <div id="divIconList" style="width:100%;margin-top:3px;height:220px;border:1px solid gray; overflow:auto">
                    <asp:DataList ID="dlIcon" CssClass="IconTabList" ItemStyle-CssClass="IconTab" CellPadding="2"
                        SelectedItemStyle-CssClass="IconSelectedTab" RepeatDirection="Horizontal" 
                        RepeatColumns="7" CellSpacing="2" runat="server">
                        <ItemTemplate> 
                            <asp:Image ID="imgIcon" runat="server" Width="64px" Height="64px" ImageUrl='<%# Container.DataItem %>' />
                        </ItemTemplate>
                    </asp:DataList>
                </div>
            </ContentTemplate> 
            </asp:UpdatePanel> 
        </div>            
        <div id="divIconPopupFooter" class="divPopupFooter">
            <asp:Button ID="btnConfirm" runat="server" Text="确定" Height="25px" Width="80px" 
                Enabled="false"/>
            <asp:Button ID="btnCancel" runat="server" Text="取消" Height="25px" Width="80px"  />    
        </div>
    </form>
</body>
</html>
