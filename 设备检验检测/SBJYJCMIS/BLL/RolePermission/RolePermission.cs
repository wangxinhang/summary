using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.IDAL;
using SBJYJCMIS.DALFactory;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.BLL
{
    public class RolePermission
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IRolePermission dal = RolePermissionDataAccess.CreateRolePermission();

        #region 记录操作
        //Insert an new RolePermission record
        public bool RolePermissionOperate(RolePermissionInfo rp)
        {
            if (rp == null) return false;
            return dal.RolePermissionOperate(rp);
        }
        #endregion 记录操作结束
        
        #region 获取角色配置的权限
        //根据ResourceID获取Permission中的Operation列表
        public IList<RolePermissionOperationListInfo> RolePermissionGetOperationList(int roleId, int resourceId)
        {
            return dal.RolePermissionGetOperationList(roleId, resourceId);
        }

        #endregion 获取角色配置的权限

        #region RoleDepartment记录操作
        //Insert an new RoleDepartment record
        public bool RoleDepartmentOperate(RoleDepartmentInfo rp)
        {
            if (rp == null) return false;
            return dal.RoleDepartmentOperate(rp);
        }
        #endregion RoleDepartment记录操作结束
    }
}
