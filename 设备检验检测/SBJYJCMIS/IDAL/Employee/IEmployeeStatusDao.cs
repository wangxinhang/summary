using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IEmployeeStatusDao
    {

        #region 增删改
        //插入、更新、删除EmployeeStatus新纪录
        bool InsertEmployeeStatus(EmployeeStatusInfo EmployeeStatus);//插入EmployeeStatus新纪录
        bool UpdateEmployeeStatus(EmployeeStatusInfo EmployeeStatus);//更新EmployeeStatus纪录
        bool DeleteEmployeeStatus(EmployeeStatusInfo EmployeeStatus);//删除EmployeeStatus纪录
        #endregion

        #region 是否存在判断
        bool IsExistedByName(string name);//根据名称验证人员状态是否存在
        bool IsExistedByNewNameAndOldName(string newName, string oldName);//根据名称验证人员状态是否存在(排除原来人员状态名称，用于更新)
        #endregion

        #region 综合查询
        //根据条件获取结果
        IList<EmployeeStatusInfo> GetEmployeeStatusNameList();//获取EmployeeStatus列表
        //获取EmployeeStatusGetList记录集和记录数
        IList<EmployeeStatusListInfo> GetEmployeeStatusList(string name, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);
        int GetEmployeeStatusListCount(string name);
        #endregion
    }
}
