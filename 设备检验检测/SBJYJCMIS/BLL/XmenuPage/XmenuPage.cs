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
    public class XmenuPage
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IXmenuPage dal = XmenuPageDataAccess.CreateXmenuPage();

        #region 记录操作
        //插入信息
        public bool XmenuPageInsert(XmenuPageInfo xp)
        {
            if (xp == null) return false;
            return dal.XmenuPageInsert(xp);
        }
        
        //删除信息
        public bool XmenuPageDeleteByXmenuIdXpageId(int xmenuId, int xpageId)
        {
            return dal.XmenuPageDeleteByXmenuIdXpageId(xmenuId, xpageId);
        }
        
        #endregion 记录操作结束
        
    }
}
