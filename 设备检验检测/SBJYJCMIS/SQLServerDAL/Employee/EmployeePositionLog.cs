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
    public class EmployeePositionLog : IEmployeePositionLog
    {
        #region 参数

        //参数        
        private const string PARM_Id = "@Id";
        private const string PARM_EmployeeId = "@EmployeeId";
        private const string PARM_OldPositionId = "@OldPositionId";
        private const string PARM_NewPositionId = "@NewPositionId";
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
        public bool EmployeePositionLogInsert(EmployeePositionLogInfo EmployeePositionLog)
        {
            SqlParameter[] parm = new SqlParameter[7];
            parm[0] = new SqlParameter(PARM_EmployeeId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_OldPositionId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_NewPositionId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_Reason, SqlDbType.NVarChar);
            parm[4] = new SqlParameter(PARM_Date, SqlDbType.Date);
            parm[5] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[6] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);


            parm[0].Value = EmployeePositionLog.EmployeeId;
            parm[1].Value = EmployeePositionLog.OldPositionId;
            parm[2].Value = EmployeePositionLog.NewPositionId;
            parm[3].Value = EmployeePositionLog.Reason;
            parm[4].Value = EmployeePositionLog.Date;
            parm[5].Value = EmployeePositionLog.Memo;
            parm[6].Value = EmployeePositionLog.CreatorId;

            int retval = SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proEmployeePositionLogInsertTran", parm);
            return (retval > 0) ? false : true;
        }
        //更新记录
        public bool EmployeePositionLogUpdateById(EmployeePositionLogInfo EmployeePositionLog)
        {
            SqlParameter[] parm = new SqlParameter[6];
            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_NewPositionId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_Date, SqlDbType.Date);
            parm[3] = new SqlParameter(PARM_Reason, SqlDbType.NVarChar, 30);
            parm[4] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar, 256);
            parm[5] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = EmployeePositionLog.Id;
            parm[1].Value = EmployeePositionLog.NewPositionId;
            parm[2].Value = EmployeePositionLog.Date;
            parm[3].Value = EmployeePositionLog.Reason;
            parm[4].Value = EmployeePositionLog.Memo;
            parm[5].Value = EmployeePositionLog.ModifierId;
            int retval = SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proEmployeePositionLogUpdateById", parm);
            return (retval > 0) ? false : true;
        }

        //根据Id删除记录
        public bool EmployeePositionLogUpdateDataStatusIdById(EmployeePositionLogInfo EmployeePositionLog)
        {
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = EmployeePositionLog.Id;
            parm[1].Value = EmployeePositionLog.DataStatusId;
            parm[2].Value = EmployeePositionLog.ModifierId;

            int retval = SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proEmployeePositionLogUpdateDataStatusIdById", parm);
            return (retval > 0) ? false : true;
        }

        #endregion

        #region 获取EmployeePositionLogGetList

        //根据条件获取QueryResult信息
        public IList<EmployeePositionLogListInfo> EmployeePositionLogGetList(int employeeId, string employee, int oldPositionId, int newPositionId, string dateOperator, DateTime? beginDate, DateTime? endDate,
                                                            bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            IList<EmployeePositionLogListInfo> EmployeePositionLogLists = new List<EmployeePositionLogListInfo>();
            SqlParameter[] parm = new SqlParameter[13];


            parm[0] = new SqlParameter(PARM_EmployeeId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_Employee, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_OldPositionId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_NewPositionId, SqlDbType.Int);
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
            parm[2].Value = oldPositionId;
            parm[3].Value = newPositionId;
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
                                                            "proEmployeePositionLogGetList", parm))
            {
                while (rdr.Read())
                {
                    EmployeePositionLogListInfo EmployeePositionLogList = new EmployeePositionLogListInfo();

                    EmployeePositionLogList.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    EmployeePositionLogList.Id = Convert.ToInt32(rdr["Id"]);
                    EmployeePositionLogList.Employee = (rdr["Employee"]).ToString();
                    EmployeePositionLogList.EmployeeId = Convert.ToInt32(rdr["EmployeeId"]);
                    EmployeePositionLogList.OldPosition = (rdr["OldPosition"]).ToString();
                    EmployeePositionLogList.NewPosition = (rdr["NewPosition"]).ToString();
                    EmployeePositionLogList.OldPositionId = Convert.ToInt32(rdr["OldPositionId"]);
                    EmployeePositionLogList.NewPositionId = Convert.ToInt32(rdr["NewPositionId"]);
                    EmployeePositionLogList.Reason = (rdr["Reason"]).ToString();
                    EmployeePositionLogList.Date = Convert.IsDBNull(rdr["Date"]) ? null : (DateTime?)Convert.ToDateTime(rdr["Date"]);
                    EmployeePositionLogList.AdjustmentProcedure = (rdr["AdjustmentProcedure"]).ToString();
                    EmployeePositionLogList.Memo = (rdr["Memo"]).ToString();
                    EmployeePositionLogList.IsCanUpdate = Convert.ToInt32(rdr["IsCanUpdate"]);
                    EmployeePositionLogLists.Add(EmployeePositionLogList);
                }
                rdr.Close();
            }
            return EmployeePositionLogLists;
        }

        #endregion 获取EmployeePositionLogGetList 结束

        #region 获取EmployeePositionLog汇总

        //获取EmployeePositionLogListSum,记录总数和汇总值
        public RecordCountInfo EmployeePositionLogGetListSum(int employeeId, string employee, int oldPositionId, int newPositionId, string dateOperator, DateTime? beginDate, DateTime? endDate)
        {
            SqlParameter[] parm = new SqlParameter[8];

            parm[0] = new SqlParameter(PARM_EmployeeId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_Employee, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_OldPositionId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_NewPositionId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_DateOperator, SqlDbType.VarChar);
            parm[5] = new SqlParameter(PARM_BeginDate, SqlDbType.Date);
            parm[6] = new SqlParameter(PARM_EndDate, SqlDbType.Date);
            parm[7] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);

            parm[0].Value = employeeId;
            parm[1].Value = employee;
            parm[2].Value = oldPositionId;
            parm[3].Value = newPositionId;
            parm[4].Value = dateOperator;
            parm[5].Value = beginDate;
            parm[6].Value = endDate;
            parm[7].Value = 2;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总

            RecordCountInfo record = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proEmployeePositionLogGetList", parm))
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

        #endregion 获取EmployeePositionLog汇总 结束
    }
}
