using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IEmployeeDao
    {
        #region 增删改

        //插入、更新、删除Group新记录
        bool InsertEmployee(EmployeeInfo Employee);
        bool UpdateEmployee(EmployeeInfo Employee);
        bool DeleteEmployee(EmployeeInfo Employee);

        #endregion 增删改

        #region 单个查询
        EmployeeViewInfo GetEmployee(int id,bool isAccountId);
        #endregion

        #region 统计查询
        int GetEmployeeUnderDepartmentCount(int departmentId);
        #endregion

        #region 是否存在查询
        bool IsExistedByName(string name);//根据名称验证人员是否存在
        bool IsExistedByPinYin(string pinYin);//根据人员拼音验证人员是否存在
        bool IsExistedByNewNameAndOldName(string newName, string oldName);//根据名称验证人员是否存在(排除原来姓名，用于更新);
        bool IsExistedByNewPinYinAndOldPinYin(string newPinYin, string oldPinYin);//根据人员拼音验证人员是否存在(排除原来姓名拼音，用于更新);
        #endregion

        #region 根据条件获取结果
        //IList<EmployeeInfo> GetEmployeeNameList(int xuserId,int departmentTypeId, int departmentId, string partName);

        IList<EmployeeInfo> GetPermissionEmployeeListByXuserId(int xuserId,int departmentId);//获取权限部门人员信息
        
        //根据节点操作Id，当前用户Id获取人员结果集
        //根据人员Id获取人员其他信息
        IList<EmployeeViewInfo> GetEmployeeOtherList(int employeeId, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);
        #endregion 根据条件获取结果 结束

        #region 获取Department记录集和记录数

        IList<EmployeeViewInfo> GetEmployeeList(string name, string pinYin, int sex, int maritalStatus, int nationId, int educationId, int positionId, int departmentId, int employeeStatusId, string dateOperator, DateTime? beginDate, DateTime? endDate, int xuserId, int departmentDataTypeId,
                                                    bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);
        int GetEmployeeListCount(string name, string pinYin, int sex, int maritalStatus, int nationId, int educationId, int positionId, int departmentId, int employeeStatusId, string dateOperator, DateTime? beginDate, DateTime? endDate, int xuserId, int departmentDataTypeId);

       //根据部门Id、人员名称获取人员列表
        IList<EmployeeViewInfo> GetEmployeeNameListByDepartmentIdAndPartName(int xuserId, int departmentId,int departmentTypeId, string partName, string partPinYin,bool isMix, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType);

        int GetEmployeeNameListByDepartmentIdAndPartNameCount(int xuserId, int departmentId, int departmentTypeId, string partName, string partPinYin,bool isMix);

        //IList<EmployeeViewInfo> GetEmployeeListByDepartmentId(int departmentId);
        #endregion
    }
}
