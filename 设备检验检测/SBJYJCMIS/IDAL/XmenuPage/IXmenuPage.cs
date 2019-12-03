using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IXmenuPage
    {
        #region 记录操作
        //插入、更新、删除XmenuPage新记录
        bool XmenuPageInsert(XmenuPageInfo xmenuPage);
        bool XmenuPageDeleteByXmenuIdXpageId(int xmenuId, int xpageId);
        #endregion 记录操作

    }
}
