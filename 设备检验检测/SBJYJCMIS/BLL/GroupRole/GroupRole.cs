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
    public class GroupRole
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IGroupRole dal = GroupRoleDataAccess.CreateGroupRole();

        #region 记录操作
        //插入信息
        public bool GroupRoleInsert(GroupRoleInfo groupRole)
        {
            if (groupRole == null) return false;
            return dal.GroupRoleInsert(groupRole);
        }
        
        //删除信息
        public bool GroupRoleDelete(int groupId, int roleId)
        {
            return dal.GroupRoleDelete(groupId, roleId);
        }
        
        #endregion 记录操作结束

        #region 验证

        //验证用户是否存在
        public bool GroupRoleIsExisted(int groupId, int roleId)
        {
            return dal.GroupRoleIsExisted(groupId, roleId);
        }

        #endregion 验证

        #region 获取GroupRoleList 有重载

        //获取QueryResult，基础
        public IList<GroupRoleListInfo> GroupRoleGetList(string name, int roleId, int assignType, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.GroupRoleGetList(name,roleId, assignType, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取QueryResult分页数据；用于分页显示查询结果，重载1
        public IList<GroupRoleListInfo> GroupRoleGetListPaged(string name,int roleId, int assignType, int pageNumber, int pageSize,
                                                              string orderFieldName, string orderType)
        {
            return GroupRoleGetList(name, roleId, assignType, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取QueryResult不分页数据；用于RDLC报表，重载2
        public IList<GroupRoleListInfo> GroupRoleGetListUnPaged(string name, int roleId, int assignType, string orderFieldName, string orderType)
        {
            return GroupRoleGetList(name, roleId, assignType, false, 0, 0, orderFieldName, orderType);
        }

        #endregion 获取GroupRoleList 结束

        #region 获取GroupRoleList记录数

        //获取QueryResult记录数 
        public RecordCountInfo GroupRoleGetListSum(string name, int roleId, int assignType)
        {
            return dal.GroupRoleGetListSum(name, roleId, assignType);
        }

        #endregion 获取GroupRoleList记录数

    }
}
