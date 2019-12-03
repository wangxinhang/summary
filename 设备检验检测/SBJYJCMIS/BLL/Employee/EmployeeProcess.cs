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
    public class EmployeeProcess
    {
        // Get an instance of the Menu DAL using the DALFactory   
        private static readonly IEmployeeDao dal = EmployeeDataAccess.CreateEmployee();

        #region 增删改
        //插入Employee信息
        public bool InsertEmployee(EmployeeInfo Employee)
        {
            if (Employee == null) return false;
            return dal.InsertEmployee(Employee);
        }

        //更新Employee信息
        public bool UpdateEmployee(EmployeeInfo Employee)
        {
            if (Employee == null) return false;
            return dal.UpdateEmployee(Employee);//执行更新命令
        }
       
        //逻辑删除
        public bool DeleteEmployee(EmployeeInfo Employee)
        {
            if (Employee == null) return false;
            return dal.DeleteEmployee(Employee);//执行删除命令
        }
        #endregion

        #region 是否存在判断
        public bool IsExistedByName(string name)
        {
            return dal.IsExistedByName(name);
        }
        public bool IsExistedByPinYin(string pinYin)
        {
            return dal.IsExistedByPinYin(pinYin);
        }
        public bool IsExistedByNewNameAndOldName(string newName, string oldName)
        {
            return dal.IsExistedByNewNameAndOldName(newName, oldName);
        }
        public bool IsExistedByNewPinYinAndOldPinYin(string newPinYin, string oldPinYin)
        {
            return dal.IsExistedByNewPinYinAndOldPinYin(newPinYin, oldPinYin);
        }

        #endregion
        #region 单个查询
        public EmployeeViewInfo GetEmployee(int id, bool isAccountId)
        {
            return dal.GetEmployee(id, isAccountId);
        }
        #endregion

        #region 统计查询
        //根据部门Id得到人员数;用于部门删除前判断
        public int GetEmployeeUnderDepartmentCount(int departmentId)
        {
            return dal.GetEmployeeUnderDepartmentCount(departmentId);
        }
        #endregion

        #region 根据条件获取记录

        //用于自动完成文本框的姓名列表
        //public IList<EmployeeInfo> GetEmployeeNameListByPartName(string partName)
        //{
        //    return dal.GetEmployeeNameListByPartName(partName);
        //}

        //获取权限部门人员信息
        public IList<EmployeeInfo> GetPermissionEmployeeListByXuserId(int xuserId, int departmentId)
        {
            return dal.GetPermissionEmployeeListByXuserId(xuserId, departmentId);
        }

        //根据人员Id获取人员其他信息  获取QueryResult分页数据；用于分页显示查询结果
        public IList<EmployeeViewInfo> GetEmployeeOtherListPaged(int employeeId, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.GetEmployeeOtherList(employeeId, true, pageNumber, pageSize, orderFieldName, orderType);
        }



        //获取QueryResult
        public IList<EmployeeViewInfo> GetEmployeeList(string name, string pinYin, int sex, int maritalStatus, int nationId, int educationId, int positionId, int departmentId,
                                                    int employeeStatusId, string dateOperator, DateTime? beginDate, DateTime? endDate, int xuserId, int departmentDataTypeId,
                                                    int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.GetEmployeeList(name, pinYin, sex, maritalStatus, nationId, educationId, positionId, departmentId,
                                       employeeStatusId, dateOperator, beginDate, endDate, xuserId, departmentDataTypeId, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取QueryResult分页数据；用于分页显示查询结果
        public IList<EmployeeViewInfo> GetEmployeeListPaged(string name, string pinYin, int sex, int maritalStatus, int nationId, int educationId, int positionId, int departmentId,
                                                    int employeeStatusId, string dateOperator, DateTime? beginDate, DateTime? endDate, int xuserId, int departmentDataTypeId,
                                                                int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.GetEmployeeList(name, pinYin, sex, maritalStatus, nationId, educationId, positionId, departmentId,
                                       employeeStatusId, dateOperator, beginDate, endDate, xuserId, departmentDataTypeId, true, pageNumber, pageSize, orderFieldName, orderType);
        }


        //获取QueryResult不分页数据；用于RDLC报表
        public IList<EmployeeViewInfo> GetEmployeeListUnPaged(string name, string pinYin, int sex, int maritalStatus, int nationId, int educationId, int positionId, int departmentId,
                                                    int employeeStatusId, string dateOperator, DateTime? beginDate, DateTime? endDate, int xuserId, int departmentDataTypeId,
                                                    object orderFieldName, object orderType)
        {
            return dal.GetEmployeeList(name, pinYin, sex, maritalStatus, nationId, educationId, positionId, departmentId,
                                       employeeStatusId, dateOperator, beginDate, endDate, xuserId, departmentDataTypeId, false, 1, 10, orderFieldName, orderType);
        }

        //获取汇总
        public int GetEmployeeListCount(string name, string pinYin, int sex, int maritalStatus, int nationId, int educationId, int positionId, int departmentId,
                                                    int employeeStatusId, string dateOperator, DateTime? beginDate, DateTime? endDate, int xuserId, int departmentDataTypeId)
        {
            return dal.GetEmployeeListCount(name, pinYin, sex, maritalStatus, nationId, educationId, positionId, departmentId,
                                       employeeStatusId, dateOperator, beginDate, endDate, xuserId, departmentDataTypeId);
        }

        public IList<EmployeeViewInfo> GetEmployeeNameListByDepartmentIdAndPartName(int xuserId, int departmentId,int departmentTypeId, string partName, string partPinYin, bool isMix, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.GetEmployeeNameListByDepartmentIdAndPartName(xuserId, departmentId, departmentTypeId, partName,partPinYin, isMix, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        public IList<EmployeeViewInfo> GetEmployeeNameListByDepartmentIdAndPartNamePaged(int xuserId, int departmentId, int departmentTypeId, string partName, string partPinYin,bool isMix, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.GetEmployeeNameListByDepartmentIdAndPartName(xuserId, departmentId, departmentTypeId, partName,partPinYin, isMix, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //根据部门Id、人员名称获取人员列表分页数据；
        public IList<EmployeeViewInfo> GetEmployeeNameListByDepartmentIdAndPartNameUnPaged(int xuserId, int departmentId, int departmentTypeId, string partName, string partPinYin, bool isMix, string orderFieldName, string orderType)
        {
            return dal.GetEmployeeNameListByDepartmentIdAndPartName(xuserId, departmentId, departmentTypeId, partName,partPinYin, isMix, false, 1, 10, orderFieldName, orderType);
        }
        //根据部门Id、人员名称获取人员列表汇总
        public int GetEmployeeNameListByDepartmentIdAndPartNameCount(int xuserId, int departmentId,int departmentTypeId, string partName, string partPinYin,bool isMix)
        {
            return dal.GetEmployeeNameListByDepartmentIdAndPartNameCount(xuserId, departmentId, departmentTypeId, partName, partPinYin,isMix);
        }
        public IList<EmployeeViewInfo> GetEmployeeListByDepartmentId(int xuserId,int departmentId, int departmentTypeId, bool ispaged,int pageNumber,int pageSize,string orderFieldName, string orderType)
        {
            return dal.GetEmployeeNameListByDepartmentIdAndPartName(xuserId,departmentId, departmentTypeId, "","", false, ispaged,pageNumber,pageSize,orderFieldName,orderType);
        }
        public IList<EmployeeViewInfo> GetEmployeeListByDepartmentId(int departmentId)
        {
            return this.GetEmployeeNameListByDepartmentIdAndPartNameUnPaged(0,departmentId, 0, "", "", false,"","");
        }
        #endregion

    }
}
