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
    public class Role
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IRole dal = RoleDataAccess.CreateRole();

        #region 记录操作
        //插入Role信息
        public bool RoleInsert(RoleInfo role)
        {
            if (role == null) return false;
            return dal.RoleInsert(role);
        }

        //删除Role信息
        public bool RoleDeleteTranById(int id)
        {
            return dal.RoleDeleteTranById(id);
        }

        //更新Role信息
        public bool RoleUpdateById(RoleInfo role)
        {
            if (role == null) return false;
            return dal.RoleUpdateById(role);
        }

        #endregion 记录操作结束

        #region 根据条件查询Role记录

        //验证是否存在
        public bool RoleIsExistedByName(string name)
        {
            return dal.RoleIsExistedByName(name);
        }
        #endregion 根据条件查询Role记录

        #region 获取RoleList 有重载

        //获取QueryResult
        public IList<RoleListInfo> RoleGetList(string name, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.RoleGetList(name, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取分页数据；用于分页显示查询结果
        public IList<RoleListInfo> RoleGetListPaged(string name, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.RoleGetList(name, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取不分页数据；用于RDLC报表
        public IList<RoleListInfo> RoleGetListUnPaged(string name, string orderFieldName, string orderType)
        {
            return dal.RoleGetList(name, false, 1, 10, orderFieldName, orderType);
        }

        #endregion 获取RoleList 结束

        #region 获取RoleList记录数

        //获取汇总
        public RecordCountInfo RoleGetListSum(string name)
        {
            return dal.RoleGetListSum(name);
        }

        #endregion 获取RoleList记录数 结束
    }
}
