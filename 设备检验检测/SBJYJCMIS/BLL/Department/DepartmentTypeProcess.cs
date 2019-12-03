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
    public class DepartmentTypeProcess
    {
        private static readonly IDepartmentTypeDao dal = DepartmentDataAccess.CreateDepartmentType();

        #region 增删改
        public bool InsertDepartmentType(DepartmentTypeViewInfo departmentType)
        {
            if (departmentType == null) return false;
            return dal.InsertDepartmentType(departmentType);//执行插入命令
        }
        public bool UpdateDepartmentType(DepartmentTypeViewInfo departmentType)
        {
            if (departmentType == null) return false;
            return dal.UpdateDepartmentType(departmentType);//执行更新命令
        }
        public bool DeleteDepartmentType(DepartmentTypeViewInfo departmentType)
        {
            if (departmentType == null) return false;
            return dal.DeleteDepartmentType(departmentType);//执行删除命令
        }

        #endregion

        #region 是否存在判断

        public bool IsExistedByName(string name)
        {
            return dal.IsExistedByName(name);
        }
        public bool IsExistedByNewNameAndOldName(string newName, string oldName)
        {
            return dal.IsExistedByNewNameAndOldName(newName, oldName);
        }
        #endregion

        #region 查询
        //public IList<DepartmentTypeViewInfo> DepartmentTypeGetParentList()
        //{
        //    return dal.DepartmentTypeGetParentList();
        //}
        //获取QueryResult
        public IList<DepartmentTypeViewInfo> GetDepartmentTypeList()
        {
            return dal.GetDepartmentTypeList("", 0, false, 0, 0, "", "");
        }
        public IList<DepartmentTypeViewInfo> GetDepartmentTypeList(string name, int parentId,bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.GetDepartmentTypeList(name, parentId,isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        public IList<DepartmentTypeViewInfo> GetDepartmentTypeListPaged(string name, int parentId, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.GetDepartmentTypeList(name, parentId, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        public IList<DepartmentTypeViewInfo> GetDepartmentTypeListUnPaged(string name, int parentId, object orderFieldName, object orderType)
        {
            return dal.GetDepartmentTypeList(name, parentId, false, 1, 10, orderFieldName, orderType);
        }

        public int GetDepartmentTypeListCount(string name, int parentId)
        {
            return dal.GetDepartmentTypeListCount(name, parentId);
        }

        #endregion 
    }
}
