using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IXpage
    {
        int XpageGetIdByXmenuId(int xmenuId);

        //获取记录集和记录数
        IList<XpageListInfo> XpageGetList(string name, string pathName, int relationType, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType);
        RecordCountInfo XpageGetListSum(string name, string pathName, int relationType);
    }    
}
