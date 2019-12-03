using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IXmenu
    {
        //插入、更新、删除Role新记录
        bool XmenuInsertTran(XmenuInfo xmenu);
        bool XmenuUpdateTran(XmenuInfo xmenu);
        bool XmenuUpdateById(XmenuInfo xmenu);
        bool XmenuDeleteTranById(int xmenuId);
        bool XmenuSwapSequenceByXmenuId(int xmenuId, int swapXmenuId, int modifierId);

        //获取XmenuList列表
        IList<XmenuListInfo> XmenuGetListByXuserId(int xuserId, int parentXmenuId);

        //获取XmenuList列表：用于下拉框
        IList<XmenuDropDownListInfo> XmenuGetDropDownList();

        //获取XmenuList列表：用于角色权限的模块下拉框
        IList<XmenuDropDownListInfo> XmenuGetDropDownListByParentId(int parentId);

        //获取XmenuListWithPermission列表
        IList<XmenuListWithPermissionInfo> XmenuGetListWithPermission(int xuserId, int parentXmenuId);

    }
}
