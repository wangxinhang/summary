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
    public class DepartmentProcess
    {
    
        private static readonly IDepartmentDao dal = DepartmentDataAccess.CreateDepartment();

        #region 增删改
        //插入Department信息
        public bool InsertDepartment(DepartmentInfo Department)
        {
            if (Department == null) return false;
            return dal.InsertDepartment(Department);
        }

        //更新Department信息
        public bool UpdateDepartment(DepartmentInfo Department)
        {
            if (Department == null) return false;
            return dal.UpdateDepartment(Department);//执行更新命令
        }

        //逻辑删除
        public bool DeleteDepartment(DepartmentInfo Department)
        {
            if (Department == null) return false;
            return dal.DeleteDepartment(Department);//执行删除命令
        }

        #endregion
        
        #region 获取单个部门信息

        public DepartmentInfo GetDepartment(int departmentId)
        {
            return dal.GetDepartment(departmentId);
        }
        public DepartmentInfo GetDepartmentByXuserId(int xuserId)
        {
            return dal.GetDepartment(xuserId);
        }

        public DepartmentInfo GetDepartment(string name, int departmentTypeId, bool isShortName)
        {
            return dal.GetDepartment(name, departmentTypeId, isShortName);
        }
        public DepartmentInfo GetParentDepartment(int departmentId)
        {
            return dal.GetParentDepartment(departmentId);
        }
        #endregion

        #region 没有权限限制的部门查询
        public IList<DepartmentInfo> GetAllDepartmentList(string departmentTypeIds)
        {
            return dal.GetAllDepartmentList(departmentTypeIds);
        }
        public IList<DepartmentInfo> GetSubDepartmentList(int deptId, bool haveSelf)
        {
            return dal.GetSubDepartmentList(deptId, haveSelf);
        }
        public IList<DepartmentInfo> GetNextLevelDepartmentList(int deptId)
        {
            return dal.GetNextLevelDepartmentList(deptId);
        }
        public IList<DepartmentInfo> GetParentDepartmentList(int departmentTypeId)
        {
            return dal.GetParentDepartmentList(departmentTypeId);
        }
        #endregion

        #region 是否存在验证
        public bool IsExistedByName(string name, int parentId, int departmentTypeId)
        {
            return dal.IsExistedByName(name, parentId, departmentTypeId);
        }
        //根据部门名称验证部门是否存在(排除原来部门名称，用于更新)
        public bool IsExistedByNewNameAndOldName(string newName, string oldName, int parentId, int departmentTypeId)
        {
            return dal.IsExistedByNewNameAndOldName(newName, oldName, parentId, departmentTypeId);
        }
        public bool IsExistedByShortName(string name, int parentId, int departmentTypeId)
        {
            return dal.IsExistedByShortName(name, parentId, departmentTypeId);
        }
        public bool IsExistedByNewShortNameAndOldName(string newName, string oldName, int parentId, int departmentTypeId)
        {
            return dal.IsExistedByNewShortNameAndOldName(newName, oldName, parentId, departmentTypeId);
        }
        //验证Department是否已存在
        public int GetDataStatusIdByNameAndParentId(string name, int parentId, int departmentTypeId)
        {
            return dal.GetDataStatusIdByNameAndParentId(name, parentId, departmentTypeId);
        }

        //根据部门名称验证部门是否存在(排除原来部门名称，用于更新)
        public int GetDataStatusIdByNewNameAndOldName(string newName, string oldName, int parentId, int departmentTypeId)
        {
            return dal.GetDataStatusIdByNewNameAndOldName(newName, oldName, parentId, departmentTypeId);
        }
        #endregion

        #region 综合查询

        public IList<DepartmentViewInfo> GetDepartmentList(int xuserId,string name, int parentId, int departmentTypeId, int propertyId,string leader, int dataStatusId, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.GetDepartmentList(xuserId,name, parentId, departmentTypeId, propertyId, leader, dataStatusId, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }
        public IList<DepartmentViewInfo> GetDepartmentListPaged(int xuserId,string name, int parentId, int departmentTypeId, int propertyId, string leader, int dataStatusId, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.GetDepartmentList(xuserId,name, parentId, departmentTypeId, propertyId, leader, dataStatusId, true, pageNumber, pageSize, orderFieldName, orderType);
        }
        public IList<DepartmentViewInfo> GetDepartmentListUnPaged(int xuserId,string name, int parentId, int departmentTypeId, int propertyId, string leader, int dataStatusId, string orderFieldName, string orderType)
        {
            return dal.GetDepartmentList(xuserId,name, parentId, departmentTypeId, propertyId, leader, dataStatusId, false, 1, 10, orderFieldName, orderType);
        }
        public int GetDepartmentListCount(int xuserId,string name, int parentId, int departmentTypeId, int propertyId, string leader, int dataStatusId)
        {
            return dal.GetDepartmentListCount(xuserId,name, parentId, departmentTypeId, propertyId, leader, dataStatusId);
        }
        //public IList<DepartmentViewInfo> GetDepartmentSubListPaged(string name, int parentId, int departmentTypeId, int propertyId, string leader, int dataStatusId, int pageNumber, int pageSize, string orderFieldName, string orderType)
        //{
        //    return dal.GetSubDepartmentList(name, parentId, departmentTypeId, propertyId, leader, dataStatusId, true, pageNumber, pageSize, orderFieldName, orderType);
        //}
        //public int GetSubDepartmentListCount(string name, int parentId, int departmentTypeId, int propertyId, string leader, int dataStatusId)
        //{
        //    return dal.GetSubDepartmentListCount(name, parentId, departmentTypeId, propertyId, leader, dataStatusId);
        //}

        public IList<DepartmentViewInfo> DepartmentGetListByOldDepartmentIdAndNewDepartmentId(int xuserId, int oldDepartmentId, int newDepartmentId)
        {
            return dal.DepartmentGetListByOldDepartmentIdAndNewDepartmentId(xuserId, oldDepartmentId, newDepartmentId);
        }

        #endregion

        public int GetDepartmentXuserCount(int departmentId)
        {
            return dal.GetDepartmentXuserCount(departmentId);
        }
    }
}
