using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Security;
using SBJYJCMIS.IDAL;
using SBJYJCMIS.DALFactory;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.BLL
{
    public class Xmenu
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IXmenu dal = XmenuDataAccess.CreateXmenu();

        #region 记录操作
        //新增Xmenu信息
        public bool XmenuInsertTran(XmenuInfo xmenu)
        {
            if (xmenu == null) return false;
            return dal.XmenuInsertTran(xmenu);
        }

        //更新Xmenu信息
        public bool XmenuUpdateById(XmenuInfo xmenu)
        {
            if (xmenu == null) return false;
            return dal.XmenuUpdateById(xmenu);
        }

        //更新Xmenu信息
        public bool XmenuUpdateTran(XmenuInfo xmenu)
        {
            if (xmenu == null) return false;
            return dal.XmenuUpdateTran(xmenu);
        }

        //更新Xmenu信息
        public bool XmenuDeleteTranById(int xmenuId)
        {
            return dal.XmenuDeleteTranById(xmenuId);
        }

        //Xmenu交换顺序
        public bool XmenuSwapSequenceByXmenuId(int xmenuId, int swapXmenuId, int modifierId)
        {
            return dal.XmenuSwapSequenceByXmenuId(xmenuId, swapXmenuId, modifierId);
        }

        #endregion 记录操作结束

        #region 获取XmenuList列表

        //获取列表
        public IList<XmenuListInfo> XmenuGetListByXuserId(int xuserId, int parentXmenuId)
        {
            return dal.XmenuGetListByXuserId(xuserId, parentXmenuId);
        }

        #endregion 获取XmenuList列表

        #region 获取XmenuDropDownList

        //获取列表
        public IList<XmenuDropDownListInfo> XmenuGetDropDownList()
        {
            return dal.XmenuGetDropDownList();
        }

        //获取列表
        public IList<XmenuDropDownListInfo> XmenuGetDropDownListByParentId(int parentId)
        {
            return dal.XmenuGetDropDownListByParentId(parentId);
        }
        #endregion 获取XmenuDropDownList

        #region 获取XmenuListWithPermission列表

        //获取列表
        public IList<XmenuListWithPermissionInfo> XmenuGetListWithPermission(int xuserId, int parentXmenuId)
        {
            return dal.XmenuGetListWithPermission(xuserId, parentXmenuId);
        }

        #endregion 获取XmenuListWithPermission列表

    }
}
