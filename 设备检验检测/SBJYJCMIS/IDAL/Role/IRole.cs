using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IRole
    {
        //插入、更新、删除Role新记录
        bool RoleInsert(RoleInfo group);
        bool RoleUpdateById(RoleInfo group);
        bool RoleDeleteTranById(int id);

        //获取记录集和记录数
        IList<RoleListInfo> RoleGetList(string name, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType);
        RecordCountInfo RoleGetListSum(string name);

        //验证是否存在  
        bool RoleIsExistedByName(string name);
    }
}
