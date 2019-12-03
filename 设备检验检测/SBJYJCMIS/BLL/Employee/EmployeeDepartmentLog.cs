using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.IDAL;
using SBJYJCMIS.DALFactory;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.BLL
{
    public class EmployeeDepartmentLog
    {
        private static readonly IEmployeeDepartmentLog dal = EmployeeDataAccess.CreateEmployeeDepartmentLog();

        #region 记录操作
        //插入EmployeeDepartmentLog信息
        public bool EmployeeDepartmentLogInsert(EmployeeDepartmentLogInfo EmployeeDepartmentLog)
        {
            if (EmployeeDepartmentLog == null) return false;
            return dal.EmployeeDepartmentLogInsert(EmployeeDepartmentLog);
        }
        //更新EmployeeDepartmentLog信息
        public bool EmployeeDepartmentLogUpdateById(EmployeeDepartmentLogInfo EmployeeDepartmentLog)
        {
            if (EmployeeDepartmentLog == null) return false;
            return dal.EmployeeDepartmentLogUpdateById(EmployeeDepartmentLog);//执行更新命令
        }

        //逻辑删除
        public bool EmployeeDepartmentLogUpdateDataStatusIdById(EmployeeDepartmentLogInfo EmployeeDepartmentLog)
        {
            if (EmployeeDepartmentLog == null) return false;
            return dal.EmployeeDepartmentLogUpdateDataStatusIdById(EmployeeDepartmentLog);//执行删除命令
        }

        #endregion

        #region 获取EmployeeDepartmentLogGetList

        //获取QueryResult
        public IList<EmployeeDepartmentLogListInfo> EmployeeDepartmentLogGetList(int employeeId, string employee, int oldDepartmentId, int newDepartmentId, string dateOperator, DateTime? beginDate, DateTime? endDate,
                                                          bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.EmployeeDepartmentLogGetList(employeeId, employee, oldDepartmentId, newDepartmentId, dateOperator, beginDate, endDate, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取QueryResult分页数据；用于分页显示查询结果
        public IList<EmployeeDepartmentLogListInfo> EmployeeDepartmentLogGetListPaged(int employeeId, string employee, int oldDepartmentId, int newDepartmentId, string dateOperator, DateTime? beginDate, DateTime? endDate, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.EmployeeDepartmentLogGetList(employeeId, employee, oldDepartmentId, newDepartmentId, dateOperator, beginDate, endDate, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取QueryResult不分页数据；用于RDLC报表
        public IList<EmployeeDepartmentLogListInfo> EmployeeDepartmentLogGetListUnPaged(int employeeId, string employee, int oldDepartmentId, int newDepartmentId, string dateOperator, DateTime? beginDate, DateTime? endDate,
                                                                                               object orderFieldName, object orderType)
        {
            return dal.EmployeeDepartmentLogGetList(employeeId, employee, oldDepartmentId, newDepartmentId, dateOperator, beginDate, endDate, false, 1, 10, orderFieldName, orderType);
        }

        #endregion 获取EmployeeDepartmentLogGetList 结束

        #region 获取EmployeeDepartmentLog汇总

        //获取汇总
        public RecordCountInfo EmployeeDepartmentLogGetListSum(int employeeId, string employee, int oldDepartmentId, int newDepartmentId, string dateOperator, DateTime? beginDate, DateTime? endDate)
        {
            return dal.EmployeeDepartmentLogGetListSum(employeeId, employee, oldDepartmentId, newDepartmentId, dateOperator, beginDate, endDate);
        }

        #endregion 获取EmployeeDepartmentLog汇总 结束
    }

}
