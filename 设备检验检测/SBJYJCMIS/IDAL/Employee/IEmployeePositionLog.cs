using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IEmployeePositionLog
    {
        #region 插入、更新、删除EmployeePositionLog新纪录

        //插入、更新、删除Group新记录
        bool EmployeePositionLogInsert(EmployeePositionLogInfo EmployeePositionLog);
        bool EmployeePositionLogUpdateById(EmployeePositionLogInfo EmployeePositionLog);
        bool EmployeePositionLogUpdateDataStatusIdById(EmployeePositionLogInfo EmployeePositionLog);

        #endregion 插入、更新、删除EmployeePositionLog新纪录 结束

        #region 获取EmployeePositionLog记录集和记录数

        //获取QueryResult记录集和记录数
        IList<EmployeePositionLogListInfo> EmployeePositionLogGetList(int employeeId, string employee, int oldPositionId, int newPositionId, string dateOperator, DateTime? beginDate, DateTime? endDate,
                                             bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);

        #endregion 获取EmployeePositionLog记录集和记录数 结束

        #region 获取EmployeePositionLog汇总

        RecordCountInfo EmployeePositionLogGetListSum(int employeeId, string employee, int oldPositionId, int newPositionId, string dateOperator, DateTime? beginDate, DateTime? endDate);

        #endregion 获取EmployeePositionLog汇总 结束
    }
}
