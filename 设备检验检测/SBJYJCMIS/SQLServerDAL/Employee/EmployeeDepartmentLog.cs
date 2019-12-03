using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using SBJYJCMIS.IDAL;
using SBJYJCMIS.Model;
using SBJYJCMIS.DBUtility;

namespace SBJYJCMIS.SQLServerDAL
{
    public class EmployeeDepartmentLog : IEmployeeDepartmentLog
    {
        #region 参数

        //参数        
        private const string PARM_Id = "@Id";
        private const string PARM_EmployeeId = "@EmployeeId";
        private const string PARM_OldDepartmentId = "@OldDepartmentId";
        private const string PARM_NewDepartmentId = "@NewDepartmentId";
        private const string PARM_Reason = "@Reason";
        private const string PARM_Date = "@Date";
        private const string PARM_Memo = "@Memo";
        private const string PARM_DataStatusId = "@DataStatusId";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_DateCreated = "@DateCreated";
        private const string PARM_ModifierId = "@ModifierId";
        private const string PARM_DateModified = "@DateModified";


        private const string PARM_XuserId = "@XuserId";
        private const string PARM_Employee = "@Employee";
        private const string PARM_DateOperator = "@DateOperator";
        private const string PARM_BeginDate = "@BeginDate";
        private const string PARM_EndDate = "@EndDate";
        //扩展参数
        private const string PARM_TopN = "@TopN";
        private const string PARM_QueryCategory = "@QueryCategory";
        private const string PARM_RecordSetType = "@RecordSetType";
        private const string PARM_IsPaged = "@IsPaged";
        private const string PARM_PageNumber = "@PageNumber";
        private const string PARM_PageSize = "@PageSize";
        private const string PARM_OrderFieldName = "@OrderFieldName";
        private const string PARM_OrderType = "@OrderType";
        #endregion

        #region 数据记录操作（插入、更新、删除）
        //插入新记录
        public bool EmployeeDepartmentLogInsert(EmployeeDepartmentLogInfo EmployeeDepartmentLog)
        {
            SqlParameter[] parm = new SqlParameter[7];
            parm[0] = new SqlParameter(PARM_EmployeeId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_OldDepartmentId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_NewDepartmentId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_Reason, SqlDbType.NVarChar);
            parm[4] = new SqlParameter(PARM_Date, SqlDbType.Date);
            parm[5] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[6] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);


            parm[0].Value = EmployeeDepartmentLog.EmployeeId;
            parm[1].Value = EmployeeDepartmentLog.OldDepartmentId;
            parm[2].Value = EmployeeDepartmentLog.NewDepartmentId;
            parm[3].Value = EmployeeDepartmentLog.Reason;
            parm[4].Value = EmployeeDepartmentLog.Date;
            parm[5].Value = EmployeeDepartmentLog.Memo;
            parm[6].Value = EmployeeDepartmentLog.CreatorId;

            int retval = SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proEmployeeDepartmentLogInsertTran", parm);
            return (retval == 0) ? true : false;
        }
        //更新记录
        public bool EmployeeDepartmentLogUpdateById(EmployeeDepartmentLogInfo EmployeeDepartmentLog)
        {
            SqlParameter[] parm = new SqlParameter[6];
            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_NewDepartmentId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_Date, SqlDbType.Date);
            parm[3] = new SqlParameter(PARM_Reason, SqlDbType.NVarChar, 30);
            parm[4] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar, 256);
            parm[5] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = EmployeeDepartmentLog.Id;
            parm[1].Value = EmployeeDepartmentLog.NewDepartmentId;
            parm[2].Value = EmployeeDepartmentLog.Date;
            parm[3].Value = EmployeeDepartmentLog.Reason;
            parm[4].Value = EmployeeDepartmentLog.Memo;
            parm[5].Value = EmployeeDepartmentLog.ModifierId;
            int retval = SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proEmployeeDepartmentLogUpdateById", parm);
            return (retval == 0) ? true : false;
        }

        //根据Id删除记录
        public bool EmployeeDepartmentLogUpdateDataStatusIdById(EmployeeDepartmentLogInfo EmployeeDepartmentLog)
        {
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = EmployeeDepartmentLog.Id;
            parm[1].Value = EmployeeDepartmentLog.DataStatusId;
            parm[2].Value = EmployeeDepartmentLog.ModifierId;

            int retval = SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proEmployeeDepartmentLogUpdateDataStatusIdById", parm);
            return (retval == 0) ? true : false;
        }

        #endregion

        #region 获取EmployeeDepartmentLogGetList

        //根据条件获取EmployeeDepartmentLogGetList信息
        public IList<EmployeeDepartmentLogListInfo> EmployeeDepartmentLogGetList(int employeeId, string employee, int oldDepartmentId, int newDepartmentId, string dateOperator, DateTime? beginDate, DateTime? endDate,
                                                            bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            IList<EmployeeDepartmentLogListInfo> EmployeeDepartmentLogLists = new List<EmployeeDepartmentLogListInfo>();
            SqlParameter[] parm = new SqlParameter[13];


            parm[0] = new SqlParameter(PARM_EmployeeId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_Employee, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_OldDepartmentId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_NewDepartmentId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_DateOperator, SqlDbType.VarChar);
            parm[5] = new SqlParameter(PARM_BeginDate, SqlDbType.Date);
            parm[6] = new SqlParameter(PARM_EndDate, SqlDbType.Date);
            parm[7] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);
            parm[8] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[9] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[10] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[11] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[12] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = employeeId;
            parm[1].Value = employee;
            parm[2].Value = oldDepartmentId;
            parm[3].Value = newDepartmentId;
            parm[4].Value = dateOperator;
            parm[5].Value = beginDate;
            parm[6].Value = endDate;

            parm[7].Value = 1;
            parm[8].Value = isPaged;
            parm[9].Value = pageNumber;
            parm[10].Value = pageSize;
            parm[11].Value = orderFieldName;
            parm[12].Value = orderType;

            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure,
                                                            "proEmployeeDepartmentLogGetList", parm))
            {
                while (rdr.Read())
                {
                    EmployeeDepartmentLogListInfo EmployeeDepartmentLogList = new EmployeeDepartmentLogListInfo();

                    EmployeeDepartmentLogList.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    EmployeeDepartmentLogList.Id = Convert.ToInt32(rdr["Id"]);
                    EmployeeDepartmentLogList.Employee = (rdr["Employee"]).ToString();
                    EmployeeDepartmentLogList.EmployeeId = Convert.ToInt32(rdr["EmployeeId"]);
                    EmployeeDepartmentLogList.OldDepartment = (rdr["OldDepartment"]).ToString();
                    EmployeeDepartmentLogList.NewDepartment = (rdr["NewDepartment"]).ToString();
                    EmployeeDepartmentLogList.OldDepartmentId = Convert.ToInt32(rdr["OldDepartmentId"]);
                    EmployeeDepartmentLogList.NewDepartmentId = Convert.ToInt32(rdr["NewDepartmentId"]);
                    EmployeeDepartmentLogList.Reason = (rdr["Reason"]).ToString();
                    EmployeeDepartmentLogList.Date = Convert.IsDBNull(rdr["Date"]) ? null : (DateTime?)Convert.ToDateTime(rdr["Date"]);
                    EmployeeDepartmentLogList.AdjustmentProcedure = (rdr["AdjustmentProcedure"]).ToString();
                    EmployeeDepartmentLogList.Memo = (rdr["Memo"]).ToString();
                    EmployeeDepartmentLogList.IsCanUpdate = Convert.ToInt32(rdr["IsCanUpdate"]);
                    EmployeeDepartmentLogLists.Add(EmployeeDepartmentLogList);
                }
                rdr.Close();
            }
            return EmployeeDepartmentLogLists;
        }

        #endregion 获取EmployeeDepartmentLogGetList 结束

        #region 获取EmployeeDepartmentLog汇总

        //获取EmployeeDepartmentLogListSum,记录总数和汇总值
        public RecordCountInfo EmployeeDepartmentLogGetListSum(int employeeId, string employee, int oldDepartmentId, int newDepartmentId, string dateOperator, DateTime? beginDate, DateTime? endDate)
        {
            SqlParameter[] parm = new SqlParameter[8];

            parm[0] = new SqlParameter(PARM_EmployeeId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_Employee, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_OldDepartmentId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_NewDepartmentId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_DateOperator, SqlDbType.VarChar);
            parm[5] = new SqlParameter(PARM_BeginDate, SqlDbType.Date);
            parm[6] = new SqlParameter(PARM_EndDate, SqlDbType.Date);
            parm[7] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);

            parm[0].Value = employeeId;
            parm[1].Value = employee;
            parm[2].Value = oldDepartmentId;
            parm[3].Value = newDepartmentId;
            parm[4].Value = dateOperator;
            parm[5].Value = beginDate;
            parm[6].Value = endDate;
            parm[7].Value = 2;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总

            RecordCountInfo record = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proEmployeeDepartmentLogGetList", parm))
            {
                while (rdr.Read())
                {
                    record = new RecordCountInfo();
                    record.RecordCount = Convert.IsDBNull(rdr["RecordCount"]) ? 0 : Convert.ToInt32(rdr["RecordCount"]);
                }
                rdr.Close();
            }
            return record;
        }

        #endregion 获取EmployeeDepartmentLog汇总 结束
    }
}
