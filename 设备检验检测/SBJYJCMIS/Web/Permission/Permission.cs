using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.IDAL;
using SBJYJCMIS.DALFactory;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.BLL
{
    public class Permission
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IPermission dal = PermissionDataAccess.CreatePermission();

        #region 记录操作
        //Insert an new Permission record
        public bool PermissionInsert(PermissionInfo permission)
        {
            if (permission == null) return false;
            return dal.PermissionInsert(permission);
        }
        
        //根据ID删除一条Permission信息
        public bool PermissionDeleteById(int id)
        {
            if (id < 1) return false;
            return dal.PermissionDeleteById(id);//执行删除命令
        }

        //根据OperationID和ResourceID删除一条记录
        public bool PermissionDeleteByOperationIdAndResourceId(int operationId, int resourceId)
        {
            if (operationId < 1 || resourceId < 1) return false;
            return dal.PermissionDeleteByOperationIdAndResourceId(operationId, resourceId);//执行删除命令
        }
        
        #endregion 记录操作结束
        
        #region 根据ResourceID获取Permission中的Operation列表
        //根据ResourceID获取Permission中的Operation列表
        public IList<PermissionOperationListInfo> PermissionGetOperationListByResourceId(int resourceId, int permissionType)
        {
            return dal.PermissionGetOperationListByResourceId(resourceId, permissionType);
        }

        #endregion 根据ResourceID获取Permission中的Operation列表 结束

        #region 根据XUserID和XMenuID获取页面数据查询（访问读取）、添加、删除、修改权限

        //重载1-0：根据XUserID判断是否具有系统访问权限；
        //具体的菜单访问（显示）权限见XMenu相关资源
        public bool XuserAccessPermissable(int xuserId)
        {
            //OperationID=1表示访问读取权限，ResourceID=0表示所有资源，ResourceTypeID=1表示菜单
            int apCount = dal.PermissionGetListByXuserIdOperationIdResourceIdResourceTypeId(xuserId, 1, 0, 1).Count;
            if (apCount == 0)
                return false;
            else
                return true;
        }

        //重载1-1：根据XUserID和判断是否具有某菜单访问权限：这里的某个菜单的权限可能就是某个子系统的访问权限
        public bool XuserMenuAccessPermissable(int xuserId, int xmenuId)
        {
            //获取XMenuID对应的XpageID
            Xpage Xpage = new Xpage();
            int resourceId = xmenuId;//因为是获取某个菜单的可访问权限，因此菜单就是资源本身,菜单

            //OperationID=1表示访问读取(查询）权限，ResourceID=0表示所有资源，ResourceTypeID=1表示菜单
            int apCount = dal.PermissionGetListByXuserIdOperationIdResourceIdResourceTypeId(xuserId, 1, resourceId, 1).Count;
            if (apCount == 0)
                return false;
            else
                return true;
        }

        //重载2：根据XUserID判断是否具有页面添加数据权限
        public bool XuserInsertPermissableByXmenuId(int xuserId, int xmenuId)
        {
            //获取XMenuID对应的XpageID
            Xpage Xpage = new Xpage();
            int resourceId = Xpage.XpageGetIdByXmenuId(xmenuId);

            //OperationID=2表示添加数据权限，ResourceTypeID=2表示页面，resourceID为页面ID
            int apCount = dal.PermissionGetListByXuserIdOperationIdResourceIdResourceTypeId(xuserId, 2, resourceId, 2).Count;
            if (apCount == 0)
                return false;
            else
                return true;
        }

        //重载3：根据XUserID判断是否具有页面删除权限
        public bool XuserDeletePermissableByXmenuId(int xuserId, int xmenuId)
        {
            //获取XMenuID对应的XpageID
            Xpage Xpage = new Xpage();
            int resourceId = Xpage.XpageGetIdByXmenuId(xmenuId);

            //OperationID=3表示删除数据权限，ResourceTypeID=2表示页面，resourceID为页面ID
            int apCount = dal.PermissionGetListByXuserIdOperationIdResourceIdResourceTypeId(xuserId, 3, resourceId, 2).Count;
            if (apCount == 0)
                return false;
            else
                return true;
        }

        //重载4：根据XUserID判断是否具有页面修改权限
        public bool XuserModifyPermissableByXmenuId(int xuserId, int xmenuId)
        {
            //获取XMenuID对应的XpageID
            Xpage Xpage = new Xpage();
            int resourceId = Xpage.XpageGetIdByXmenuId(xmenuId);

            //OperationID=4表示编辑数据权限，ResourceTypeID=2表示页面，resourceID为页面ID
            int apCount = dal.PermissionGetListByXuserIdOperationIdResourceIdResourceTypeId(xuserId, 4, resourceId, 2).Count;
            if (apCount == 0)
                return false;
            else
                return true;
        }

        //重载5：根据XUserID判断是否具有页面导出打印权限
        public bool XuserExportPrintPermissableByXmenuId(int xuserId, int xmenuId)
        {
            //获取XMenuID对应的XpageID
            Xpage Xpage = new Xpage();
            int resourceId = Xpage.XpageGetIdByXmenuId(xmenuId);

            //OperationID=5表示导出打印权限，ResourceTypeID=2表示页面，resourceID为页面ID
            int apCount = dal.PermissionGetListByXuserIdOperationIdResourceIdResourceTypeId(xuserId, 5, resourceId, 2).Count;
            if (apCount == 0)
                return false;
            else
                return true;
        }
        #endregion 页面数据查询（读取）、添加、删除、修改权限 结束

        #region 功能权限
        #region 获取权限列表及角色可配置权限 有重载

        //获取QueryResult
        public IList<PermissionRolePermissionListInfo> PermissionGetRolePermissionList(int roleId, int xmenuId, int assignType, int resourceTypeId, string resourceName,
                                                                                bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.PermissionGetRolePermissionList(roleId, xmenuId, assignType, resourceTypeId, resourceName,isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取分页数据；用于分页显示查询结果
        public IList<PermissionRolePermissionListInfo> PermissionGetRolePermissionListPaged(int roleId, int xmenuId, int assignType, int resourceTypeId, string resourceName, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.PermissionGetRolePermissionList(roleId, xmenuId, assignType, resourceTypeId, resourceName, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取不分页数据；用于RDLC报表
        public IList<PermissionRolePermissionListInfo> PermissionGetRolePermissionListUnPaged(int roleId, int xmenuId, int assignType, int resourceTypeId, string resourceName, string orderFieldName, string orderType)
        {
            return dal.PermissionGetRolePermissionList(roleId, xmenuId, assignType, resourceTypeId, resourceName, false, 1, 10, orderFieldName, orderType);
        }

        #endregion 获取权限列表及角色可配置权限

        #region 获取权限列表及角色可配置权限 记录数

        //获取汇总
        public RecordCountInfo PermissionGetRolePermissionListSum(int roleId, int xmenuId, int assignType, int resourceTypeId, string resourceName)
        {
            return dal.PermissionGetRolePermissionListSum(roleId, xmenuId, assignType, resourceTypeId, resourceName);
        }

        #endregion 获取权限列表及角色可配置权限 记录数
        #endregion 功能权限

        #region 部门权限
        #region 获取权限列表及角色可配置的部门权限 有重载

        //获取QueryResult
        public IList<PermissionRoleDepartmentListInfo> PermissionGetRoleDepartmentList(int roleId, string departmentName, int assignType,
                                                                                bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.PermissionGetRoleDepartmentList(roleId, departmentName, assignType, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取分页数据；用于分页显示查询结果
        public IList<PermissionRoleDepartmentListInfo> PermissionGetRoleDepartmentListPaged(int roleId, string departmentName, int assignType, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.PermissionGetRoleDepartmentList(roleId, departmentName, assignType, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取不分页数据；用于RDLC报表
        public IList<PermissionRoleDepartmentListInfo> PermissionGetRoleDepartmentListUnPaged(int roleId, string departmentName, int assignType, string orderFieldName, string orderType)
        {
            return dal.PermissionGetRoleDepartmentList(roleId, departmentName, assignType, false, 1, 10, orderFieldName, orderType);
        }

        #endregion 获取权限列表及角色可配置的部门权限

        #region 获取权限列表及角色可配置的部门权限 记录数

        //获取汇总
        public RecordCountInfo PermissionGetRoleDepartmentListSum(int roleId, string departmentName, int assignType)
        {
            return dal.PermissionGetRoleDepartmentListSum(roleId, departmentName, assignType);
        }

        #endregion 获取权限列表及角色可配置的部门权限 记录数
        #endregion 部门权限
    }
}
