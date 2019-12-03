using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.IDAL;
using SBJYJCMIS.DALFactory;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.BLL
{
    public class EmployeePositionLog
    {
        private static readonly IEmployeePositionLog dal = EmployeeDataAccess.CreateEmployeePositionLog();

        #region 记录操作
        //插入EmployeePositionLog信息
        public bool EmployeePositionLogInsert(EmployeePositionLogInfo EmployeePositionLog)
        {
            if (EmployeePositionLog == null) return false;
            return dal.EmployeePositionLogInsert(EmployeePositionLog);
        }
        //更新EmployeePositionLog信息
        public bool EmployeePositionLogUpdateById(EmployeePositionLogInfo EmployeePositionLog)
        {
            if (EmployeePositionLog == null) return false;
            return dal.EmployeePositionLogUpdateById(EmployeePositionLog);//执行更新命令
        }

        //逻辑删除
        public bool EmployeePositionLogUpdateDataStatusIdById(EmployeePositionLogInfo EmployeePositionLog)
        {
            if (EmployeePositionLog == null) return false;
            return dal.EmployeePositionLogUpdateDataStatusIdById(EmployeePositionLog);//执行删除命令
        }

        #endregion

        #region 获取EmployeePositionLogGetList

        //获取QueryResult
        public IList<EmployeePositionLogListInfo> EmployeePositionLogGetList(int employeeId, string employee, int oldDepartmentId, int newDepartmentId, string dateOperator, DateTime? beginDate, DateTime? endDate,
                                                          bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.EmployeePositionLogGetList(employeeId, employee, oldDepartmentId, newDepartmentId, dateOperator, beginDate, endDate, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取QueryResult分页数据；用于分页显示查询结果
        public IList<EmployeePositionLogListInfo> EmployeePositionLogGetListPaged(int employeeId, string employee, int oldDepartmentId, int newDepartmentId, string dateOperator, DateTime? beginDate, DateTime? endDate, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.EmployeePositionLogGetList(employeeId, employee, oldDepartmentId, newDepartmentId, dateOperator, beginDate, endDate, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取QueryResult不分页数据；用于RDLC报表
        public IList<EmployeePositionLogListInfo> EmployeePositionLogGetListUnPaged(int employeeId, string employee, int oldDepartmentId, int newDepartmentId, string dateOperator, DateTime? beginDate, DateTime? endDate,
                                                                                               object orderFieldName, object orderType)
        {
            return dal.EmployeePositionLogGetList(employeeId, employee, oldDepartmentId, newDepartmentId, dateOperator, beginDate, endDate, false, 1, 10, orderFieldName, orderType);
        }

        #endregion 获取EmployeePositionLogGetList 结束

        #region 获取EmployeePositionLog汇总

        //获取汇总
        public RecordCountInfo EmployeePositionLogGetListSum(int employeeId, string employee, int oldDepartmentId, int newDepartmentId, string dateOperator, DateTime? beginDate, DateTime? endDate)
        {
            return dal.EmployeePositionLogGetListSum(employeeId, employee, oldDepartmentId, newDepartmentId, dateOperator, beginDate, endDate);
        }

        #endregion 获取EmployeePositionLog汇总 结束
    }

}
