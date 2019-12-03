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
    public class EmployeeDimision : IEmployeeDimision
    {
        #region 参数

        //参数        
        private const string PARM_Id = "@Id";
        private const string PARM_EmployeeId = "@EmployeeId";
        private const string PARM_Reason = "@Reason";
        private const string PARM_Date = "@Date";
        private const string PARM_DimisionTypeId = "@DimisionTypeId";       
        private const string PARM_Memo = "@Memo";
        private const string PARM_DataStatusId = "@DataStatusId";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_DateCreated = "@DateCreated";
        private const string PARM_ModifierId = "@ModifierId";
        private const string PARM_DateModified = "@DateModified";

        private const string PARM_XuserId = "@XuserId";
        private const string PARM_EmployeeName = "@EmployeeName";
        private const string PARM_DateOperator = "@EmployeeDimisionType";
        private const string PARM_EmployeeStatusId = "@EmployeeStatusId";
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
        public bool EmployeeDimisionInsert(EmployeeDimisionInfo EmployeeDimision)
        {
            SqlParameter[] parm = new SqlParameter[7];
            parm[0] = new SqlParameter(PARM_EmployeeId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_Reason, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_Date, SqlDbType.Date);
            parm[3] = new SqlParameter(PARM_DimisionTypeId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[5] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_EmployeeStatusId, SqlDbType.Int);


            parm[0].Value = EmployeeDimision.EmployeeId;            
            parm[1].Value = EmployeeDimision.Reason;
            parm[2].Value = EmployeeDimision.Date;
            parm[3].Value = EmployeeDimision.DimisionTypeId;
            parm[4].Value = EmployeeDimision.Memo;
            parm[5].Value = EmployeeDimision.CreatorId;
            parm[6].Value = EmployeeDimision.EmployeeStatusId;

            int retval = SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proEmployeeDimisionInsertTran", parm);
            return (retval > 0) ? false : true;
        }
        //更新记录
        public bool EmployeeDimisionUpdateById(EmployeeDimisionInfo EmployeeDimision)
        {
            SqlParameter[] parm = new SqlParameter[6];
            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_DimisionTypeId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_Date, SqlDbType.DateTime);
            parm[3] = new SqlParameter(PARM_Reason, SqlDbType.NVarChar, 30);
            parm[4] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar, 256);
            parm[5] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = EmployeeDimision.Id;
            parm[1].Value = EmployeeDimision.DimisionTypeId;
            parm[2].Value = EmployeeDimision.Date;
            parm[3].Value = EmployeeDimision.Reason;
            parm[4].Value = EmployeeDimision.Memo;
            parm[5].Value = EmployeeDimision.ModifierId;
            int retval = SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proEmployeeDimisionUpdateById", parm);
            return (retval > 0) ? false : true;
        }

        //根据Id删除记录
        public bool EmployeeDimisionUpdateDataStatusIdById(EmployeeDimisionInfo EmployeeDimision)
        {
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = EmployeeDimision.Id;
            parm[1].Value = EmployeeDimision.DataStatusId;
            parm[2].Value = EmployeeDimision.ModifierId;

            int retval = SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proEmployeeDimisionUpdateDataStatusIdById", parm);
            return (retval > 0) ? false : true;
        }
        #endregion

        #region 获取EmployeeDimisionGetList

        //根据条件获取EmployeeDimisionGetList信息
        public IList<EmployeeDimisionListInfo> EmployeeDimisionGetList(int employeeId, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            IList<EmployeeDimisionListInfo> EmployeeDimisionLists = new List<EmployeeDimisionListInfo>();
            SqlParameter[] parm = new SqlParameter[7];


            parm[0] = new SqlParameter(PARM_EmployeeId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[3] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[6] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = employeeId;

            parm[1].Value = 1;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总
            parm[2].Value = isPaged;
            parm[3].Value = pageNumber;
            parm[4].Value = pageSize;
            parm[5].Value = orderFieldName;
            parm[6].Value = orderType;

            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure,
                                                            "proEmployeeDimisionGetList", parm))
            {
                while (rdr.Read())
                {
                    EmployeeDimisionListInfo EmployeeDimisionList = new EmployeeDimisionListInfo();

                    EmployeeDimisionList.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    EmployeeDimisionList.Id = Convert.ToInt32(rdr["Id"]);
                    EmployeeDimisionList.Employee = (rdr["Employee"]).ToString();
                    EmployeeDimisionList.Department = (rdr["Department"]).ToString();
                    EmployeeDimisionList.DimisionType = (rdr["DimisionType"]).ToString();
                    EmployeeDimisionList.Reason = (rdr["Reason"]).ToString();
                    EmployeeDimisionList.Date = Convert.IsDBNull(rdr["Date"]) ? null : (DateTime?)Convert.ToDateTime(rdr["Date"]);
                    string WorkYear = (rdr["WorkYear"]).ToString();
                    if (WorkYear == "0")
                        EmployeeDimisionList.WorkYear = "小于1";
                    else
                        EmployeeDimisionList.WorkYear = WorkYear;

                    EmployeeDimisionList.Memo = (rdr["Memo"]).ToString();

                    EmployeeDimisionLists.Add(EmployeeDimisionList);
                }
                rdr.Close();
            }
            return EmployeeDimisionLists;
        }

        #endregion 获取EmployeeDimisionGetList 结束

        #region 获取EmployeeDimision汇总

        //获取EmployeeDimisionListSum,记录总数和汇总值
        public RecordCountInfo EmployeeDimisionGetListSum(int employeeId)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_EmployeeId, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);

            parm[0].Value = employeeId;
            parm[1].Value = 2;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总

            RecordCountInfo record = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proEmployeeDimisionGetList", parm))
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

        #endregion 获取EmployeeDimision汇总 结束
    }
}
