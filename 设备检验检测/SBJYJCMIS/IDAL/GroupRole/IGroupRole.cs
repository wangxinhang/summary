using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IGroupRole
    {
        #region 记录操作
        //插入、更新、删除GroupRole新记录
        bool GroupRoleInsert(GroupRoleInfo groupRole);
        bool GroupRoleDelete(int groupId, int roleId);
        #endregion 记录操作

        #region 验证
        //根据条件获取结果    
        bool GroupRoleIsExisted(int groupId, int roleId);
        #endregion 验证

        #region 获取GroupRole记录集和记录数
        //获取GroupRole记录集和记录数
        IList<GroupRoleListInfo> GroupRoleGetList(string name,int roleId, int assignType, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType);
        RecordCountInfo GroupRoleGetListSum(string name, int roleId, int assignType);
        #endregion 获取GroupRole记录集和记录数 
    }
}
