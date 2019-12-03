using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IDepartmentDao
    {
        #region 增删改
        bool InsertDepartment(DepartmentInfo Department);
        bool UpdateDepartment(DepartmentInfo Department);
        bool DeleteDepartment(DepartmentInfo Department);
        #endregion

        #region 获取单个部门信息
        DepartmentInfo GetDepartment(int departmentId);
        DepartmentInfo GetDepartmentByXuserId(int xuserId);
        DepartmentInfo GetDepartment(string name, int departmentTypeId,bool isShortName);
        DepartmentInfo GetParentDepartment(int departmentId);
        #endregion

        #region 没有权限限制的部门查询
        IList<DepartmentInfo> GetAllDepartmentList(string departmentTypeIds);
        IList<DepartmentInfo> GetSubDepartmentList(int deptId,bool haveSelf);
        IList<DepartmentInfo> GetNextLevelDepartmentList(int deptId);
        IList<DepartmentInfo> GetParentDepartmentList(int departmentTypeId);
        #endregion

        #region 是否存在验证
        bool IsExistedByName(string name, int parentId, int departmentTypeId);//根据名称验证部门是否存在
        bool IsExistedByNewNameAndOldName(string newName, string oldName, int parentId, int departmentTypeId);//根据部门名称验证部门是否存在(排除原来部门名称，用于更新)
        bool IsExistedByNewShortNameAndOldName(string newName, string oldName, int parentId, int departmentTypeId);
        bool IsExistedByShortName(string name, int parentId, int departmentTypeId);
        int GetDataStatusIdByNameAndParentId(string name, int parentId, int departmentTypeId);//根据名称验证部门是否存在
        int GetDataStatusIdByNewNameAndOldName(string newName, string oldName, int parentId, int departmentTypeId);//根据部门名称验证部门是否存在(排除原来部门名称，用于更新)
        #endregion

        #region 综合查询
        IList<DepartmentViewInfo> GetDepartmentList(int xuserId,string name, int parentId, int departmentTypeId,int propertyId,string leader, int dataStatusId, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType);
        int GetDepartmentListCount(int xuserId,string name, int parentId, int departmentTypeId, int propertyId,string leader, int dataStatusId);
        //IList<DepartmentViewInfo> GetSubDepartmentList(int xuserId,string name, int parentId, int departmentTypeId, int propertyId,string leader, int dataStatusId, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType);
        //int GetSubDepartmentListCount(int xuserId,string name, int parentId, int departmentTypeId, int propertyId,string leader, int dataStatusId);
        IList<DepartmentViewInfo> DepartmentGetListByOldDepartmentIdAndNewDepartmentId(int xuserId, int oldDepartmentId, int newDepartmentId);
        #endregion

        int GetDepartmentXuserCount(int departmentId);
    }
}
