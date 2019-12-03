using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IRolePermission
    {
        //插入、更新、删除RolePermission新记录
        bool RolePermissionOperate(RolePermissionInfo rp);

        //插入、更新、删除RoleDepartment新记录
        bool RoleDepartmentOperate(RoleDepartmentInfo rd);

        //获取角色配置的权限
        IList<RolePermissionOperationListInfo> RolePermissionGetOperationList(int roleId, int resourceId);


    }
}
