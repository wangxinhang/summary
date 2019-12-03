using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IEmployeeDepartmentLog
    {
        #region 插入、更新、删除EmployeeDepartmentLog新纪录

        //插入、更新、删除Group新记录
        bool EmployeeDepartmentLogInsert(EmployeeDepartmentLogInfo EmployeeDepartmentLog);
        bool EmployeeDepartmentLogUpdateById(EmployeeDepartmentLogInfo EmployeeDepartmentLog);
        bool EmployeeDepartmentLogUpdateDataStatusIdById(EmployeeDepartmentLogInfo EmployeeDepartmentLog);

        #endregion 插入、更新、删除EmployeeDepartmentLog新纪录 结束

        #region 获取EmployeeDepartmentLog记录集和记录数

        //获取QueryResult记录集和记录数
        IList<EmployeeDepartmentLogListInfo> EmployeeDepartmentLogGetList(int employeeId, string employee, int oldDepartmentId, int newDepartmentId, string dateOperator, DateTime? beginDate, DateTime? endDate,
                                             bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);

        #endregion 获取EmployeeDepartmentLog记录集和记录数 结束

        #region 获取EmployeeDepartmentLog汇总

        RecordCountInfo EmployeeDepartmentLogGetListSum(int employeeId, string employee, int oldDepartmentId, int newDepartmentId, string dateOperator, DateTime? beginDate, DateTime? endDate);

        #endregion 获取EmployeeDepartmentLog汇总 结束
    }
}
