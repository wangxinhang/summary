using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IDepartmentTypeDao
    {
        #region 增删改

        //插入、更新、删除DepartmentType新纪录
        bool InsertDepartmentType(DepartmentTypeViewInfo DepartmentType);//插入DepartmentType新纪录
        bool UpdateDepartmentType(DepartmentTypeViewInfo DepartmentType);//更新DepartmentType纪录
        bool DeleteDepartmentType(DepartmentTypeViewInfo DepartmentType);//删除DepartmentType纪录

        #endregion

        #region 是否存在判断
        bool IsExistedByName(string name);//根据名称验证部门类别是否存在
        bool IsExistedByNewNameAndOldName(string newName, string oldName);//根据名称验证部门类别是否存在(排除原来部门类别名称，用于更新)

        #endregion

        #region 查询
        //IList<DepartmentTypeViewInfo> GetDepartmentTypeParentList(); //获取ParentHiddenDangerType列表
        IList<DepartmentTypeViewInfo> GetDepartmentTypeList(string name, int parentId, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);
        int GetDepartmentTypeListCount(string name,int parentId);

        #endregion

    }
}
