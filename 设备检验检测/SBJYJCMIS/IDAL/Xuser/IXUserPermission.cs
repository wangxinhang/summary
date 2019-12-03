using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    interface IXUserDepartmentPermission
    {
        IList<DepartmentShortInfo> DepartmentGetByParentIdAndUserId(int deptId, int xuserId);
        IList<TreeViewInfo> DepartmentGetTypeTreeList(int xuserId, int departmentId, string departmentTypeIdList, int hasPermission);
        IList<TreeViewCoordinateInfo> DepartmentGetTypeTreeListAndCoordinate(int xuserId, int departmentId, int departmentTypeId, int hasPermission);
        IList<DepartmentViewInfo> DepartmentGetList(int xuserId, string name, int parentId, int departmentTypeId, int dataStatusId, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);
        IList<DepartmentViewInfo> DepartmentGetSubList(int xuserId, int hasPermission, string name, int parentId, int departmentTypeId, int dataStatusId, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);
        int DepartmentGetListCount(int xuserId, string name, int parentId, int departmentTypeId, int dataStatusId);
        int DepartmentGetSubListCount(int xuserId, int hasPermission, string name, int parentId, int departmentTypeId, int dataStatusId);
        IList<DepartmentInfo> DepartmentGetParentList(int xuserId);
        IList<DepartmentInfo> DepartmentGetNameListByParentId(int xuserId, int parentId);//根据parentId获取所属部门等于parentId的部门权限列表

        //通过用户权限范围内的部门列表
        IList<DepartmentViewInfo> DepartmentGetListByXuserId(int xuserId, int departmentTypeId);

        IList<DepartmentViewInfo> DepartmentGetListByOldDepartmentIdAndNewDepartmentId(int xuserId, int oldDepartmentId, int newDepartmentId);
    }
}
