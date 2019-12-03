using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.IDAL;
using SBJYJCMIS.DALFactory;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.BLL
{
    public class EmployeeDimision
    {
        private static readonly IEmployeeDimision dal = EmployeeDataAccess.CreateEmployeeDimision();

        #region 记录操作

        //插入EmployeeDimision信息
        public bool EmployeeDimisionInsert(EmployeeDimisionInfo EmployeeDimision)
        {
            if (EmployeeDimision == null) return false;
            return dal.EmployeeDimisionInsert(EmployeeDimision);
        }

        //更新EmployeeDimision信息
        public bool EmployeeDimisionUpdateById(EmployeeDimisionInfo EmployeeDimision)
        {
            if (EmployeeDimision == null) return false;
            return dal.EmployeeDimisionUpdateById(EmployeeDimision);//执行更新命令
        }

        //逻辑删除
        public bool EmployeeDimisionUpdateDataStatusIdById(EmployeeDimisionInfo EmployeeDimision)
        {
            if (EmployeeDimision == null) return false;
            return dal.EmployeeDimisionUpdateDataStatusIdById(EmployeeDimision);
        }

        #endregion 记录操作 结束

        #region 获取明细记录数

        //获取EmployeeDimisionGetList
        public IList<EmployeeDimisionListInfo> EmployeeDimisionGetList(int employeeId,bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.EmployeeDimisionGetList(employeeId, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取QueryResult分页数据；用于分页显示查询结果
        public IList<EmployeeDimisionListInfo> EmployeeDimisionGetListPaged(int employeeId, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.EmployeeDimisionGetList(employeeId, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取QueryResult不分页数据；用于RDLC报表
        public IList<EmployeeDimisionListInfo> EmployeeDimisionGetListUnPaged(int employeeId, object orderFieldName, object orderType)
        {
            return dal.EmployeeDimisionGetList(employeeId, false, 1, 10, orderFieldName, orderType);
        }

        #endregion 获取EmployeeDimisionGetList 结束

        #region 获取EmployeeDimision汇总

        //获取汇总
        public RecordCountInfo EmployeeDimisionGetListSum(int employeeId)
        {
            return dal.EmployeeDimisionGetListSum(employeeId);
        }

        #endregion 获取EmployeeDimision汇总 结束
    }
}
