using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IPermission
    {
        //插入、更新、删除Permission新记录
        bool PermissionInsert(PermissionInfo permission);
        bool PermissionDeleteById(int permissionId);
        bool PermissionDeleteByOperationIdAndResourceId(int operationId, int resourceId);
        
        //获取记录集和记录数
        IList<PermissionOperationListInfo> PermissionGetOperationListByResourceId(int resourceId, int permissionType);

        IList<PermissionListInfo> PermissionGetListByXuserIdOperationIdResourceIdResourceTypeId(int xuserId, int operationId, int resourceId, int resourceTypeId);

        //获取权限列表及角色可配置权限
        IList<PermissionRolePermissionListInfo> PermissionGetRolePermissionList(int roleId, int xmenuId, int assignType, int resourceTypeId, string resourceName, 
                                                                                bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType);
        RecordCountInfo PermissionGetRolePermissionListSum(int roleId, int xmenuId, int assignType, int resourceTypeId, string resourceName);

        //获取权限列表及角色的部门数据权限
        IList<PermissionRoleDepartmentListInfo> PermissionGetRoleDepartmentList(int roleId,  string departmentName,int assignType,
                                                                                bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType);
        RecordCountInfo PermissionGetRoleDepartmentListSum(int roleId, string departmentName,int assignType);

        #region 移动端App相关

        //获取用户AppMenu及其对应页面的访问权限
        IList<AppMenuPermissionListInfo> AppMenuGetPermissionList(int xuserId);

        #endregion 移动端App相关
    }
}
