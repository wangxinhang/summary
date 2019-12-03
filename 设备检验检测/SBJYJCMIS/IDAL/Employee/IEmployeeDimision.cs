using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IEmployeeDimision
    {
        #region 插入、更新、删除EmployeeDimision新纪录

        //插入、更新、删除Group新记录
        bool EmployeeDimisionInsert(EmployeeDimisionInfo EmployeeDimision);
        bool EmployeeDimisionUpdateById(EmployeeDimisionInfo EmployeeDimision);
        bool EmployeeDimisionUpdateDataStatusIdById(EmployeeDimisionInfo EmployeeDimision);

        #endregion 插入、更新、删除EmployeeDimision新纪录 结束

        #region 获取EmployeeDimision记录集和记录数

        //获取Detail记录集和记录数
        IList<EmployeeDimisionListInfo> EmployeeDimisionGetList(int employeeId, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);

        #endregion 获取EmployeeDimision记录集和记录数 结束

        #region 获取EmployeeDimision汇总

        RecordCountInfo EmployeeDimisionGetListSum(int employeeId);

        #endregion 获取EmployeeDimision汇总 结束

    }
}
