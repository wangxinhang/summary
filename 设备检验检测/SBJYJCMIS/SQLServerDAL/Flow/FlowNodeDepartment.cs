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
    public class FlowNodeDepartment : IFlowNodeDepartment
    {
        #region 参数
        //参数        
        private const string PARM_DepartmentId = "@DepartmentId";
        private const string PARM_Department = "@Department";
        private const string PARM_FlowNodeId = "@FlowNodeId";
        private const string PARM_FlowId = "@FlowId";
        private const string PARM_AssignType = "@AssignType";
        private const string PARM_DataStatusId = "@DataStatusId";
        private const string PARM_Memo = "@Memo";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_ModifierId = "@ModifierId";

        private const string PARM_Name = "@Name";
        private const string PARM_RecordSetType = "@RecordSetType";
        private const string PARM_IsRecordSet = "@IsRecordSet";
        private const string PARM_IsPaged = "@IsPaged";
        private const string PARM_PageNumber = "@PageNumber";
        private const string PARM_PageSize = "@PageSize";
        private const string PARM_OrderFieldName = "@OrderFieldName";
        private const string PARM_OrderType = "@OrderType";
        #endregion 参数结束

        #region 数据记录操作（插入、更新、删除）
        //插入新记录
        public bool FlowNodeDepartmentInsert(FlowNodeDepartmentInfo FlowNodeDepartment)
        {
            SqlParameter[] parm = new SqlParameter[5];

            parm[0] = new SqlParameter(PARM_FlowNodeId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[4] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);

            parm[0].Value = FlowNodeDepartment.FlowNodeId;
            parm[1].Value = FlowNodeDepartment.DepartmentId;
            parm[2].Value = FlowNodeDepartment.FlowId;
            parm[3].Value = FlowNodeDepartment.Memo;
            parm[4].Value = FlowNodeDepartment.CreatorId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowNodeDepartmentInsert", parm);
            return (retval > 0) ? true : false;
        }
        //插入新记录
        public bool FlowNodeDepartmentInsertTran(FlowNodeDepartmentInfo FlowNodeDepartment)
        {
            SqlParameter[] parm = new SqlParameter[5];

            parm[0] = new SqlParameter(PARM_FlowNodeId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[4] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);

            parm[0].Value = FlowNodeDepartment.FlowNodeId;
            parm[1].Value = FlowNodeDepartment.DepartmentId;
            parm[2].Value = FlowNodeDepartment.FlowId;
            parm[3].Value = FlowNodeDepartment.Memo;
            parm[4].Value = FlowNodeDepartment.CreatorId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowNodeDepartmentInsertTran", parm);
            return (retval > 0) ? true : false;
        }

        //删除记录
        public bool FlowNodeDepartmentUpdateDataStatusById(int flowNodeId, int departmentId, int flowId, int modifierId)
        {
            SqlParameter[] parm = new SqlParameter[4];

            parm[0] = new SqlParameter(PARM_FlowNodeId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = flowNodeId;
            parm[1].Value = departmentId;
            parm[2].Value = flowId;
            parm[3].Value = modifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowNodeDepartmentUpdateDataStatusById", parm);
            return (retval > 0) ? true : false;
        }
        #endregion 数据记录操作（插入、更新、删除）结束

        #region 验证
        //验证用户是否存在
        public bool FlowNodeDepartmentIsExisted(int flowNodeId, int departmentId, int flowId)
        {
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_FlowNodeId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_FlowId, SqlDbType.Int);

            parm[0].Value = flowNodeId;
            parm[1].Value = departmentId;
            parm[2].Value = flowId;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proFlowNodeDepartmentIsExisted", parm);
            return obj == null ? false : (bool)obj;
        }
        #endregion 验证

        #region 获取FlowNodeDepartmentList
        //获取用户列表：用于为组指派用户
        public IList<FlowNodeDepartmentInfo> FlowNodeDepartmentGetList(string name, int flowNodeId, int flowId, int assignType, bool isPaged, int pageNumber, int pageSize,
                                                                             object orderFieldName, object orderType)
        {
            SqlParameter[] parm = new SqlParameter[10];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.VarChar);
            parm[1] = new SqlParameter(PARM_FlowNodeId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_AssignType, SqlDbType.Int);

            parm[4] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[6] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[7] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[8] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[9] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = name;
            parm[1].Value = flowNodeId;
            parm[2].Value = flowId;
            parm[3].Value = assignType;
          
            parm[4].Value = 1;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总
            parm[5].Value = isPaged;
            parm[6].Value = pageNumber;
            parm[7].Value = pageSize;
            parm[8].Value = orderFieldName;
            parm[9].Value = orderType;

            IList<FlowNodeDepartmentInfo> recordList = new List<FlowNodeDepartmentInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowNodeDepartmentGetList", parm))
            {
                while (rdr.Read())
                {
                    FlowNodeDepartmentInfo record = new FlowNodeDepartmentInfo();

                    record.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    record.DepartmentId = Convert.ToInt32(rdr["DepartmentId"]);
                    record.Department = rdr["Department"].ToString();
                    record.Memo = rdr["Memo"].ToString();
                    record.FlowNodeId = Convert.IsDBNull(rdr["FlowNodeId"]) ? 0 : Convert.ToInt32(rdr["FlowNodeId"]);
                    record.FlowNode = rdr["FlowNode"].ToString();
                    record.FlowId = Convert.IsDBNull(rdr["FlowId"]) ? 0 : Convert.ToInt32(rdr["FlowId"]);
                    record.IsAssigned = Convert.ToBoolean(rdr["IsAssigned"]);

                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }

        //获取用户列表记录数：用于为组指派用户
        public RecordCountInfo FlowNodeDepartmentGetSum(string name, int flowNodeId, int flowId, int assignType)
        {
            SqlParameter[] parm = new SqlParameter[10];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.VarChar);
            parm[1] = new SqlParameter(PARM_FlowNodeId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_AssignType, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);

            parm[0].Value = name;
            parm[1].Value = flowNodeId;
            parm[2].Value = flowId;
            parm[3].Value = assignType;
            parm[4].Value = 2;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总

            RecordCountInfo record = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowNodeDepartmentGetList", parm))
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
        #endregion 获取FlowNodeDepartmentList


    }
}