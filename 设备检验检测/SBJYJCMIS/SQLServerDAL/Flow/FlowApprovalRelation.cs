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
    public class FlowApprovalRelation:IFlowApprovalRelation
    {
        #region 参数
        //参数 
        private const string PARM_FlowTypeId = "@FlowTypeId";
        private const string PARM_SubmitterId = "@SubmitterId";
        private const string PARM_ApproverId = "@ApproverId";
        private const string PARM_AssignType = "@AssignType";
        private const string PARM_DataStatusId = "@DataStatusId";
        private const string PARM_Memo = "@Memo";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_ModifierId = "@ModifierId";

        private const string PARM_IsRecordSet = "@IsRecordSet";
        private const string PARM_IsPaged = "@IsPaged";
        private const string PARM_PageNumber = "@PageNumber";
        private const string PARM_PageSize = "@PageSize";
        private const string PARM_OrderFieldName = "@OrderFieldName";
        private const string PARM_OrderType = "@OrderType";
        #endregion 参数结束

        #region 获取FlowApprovalRelation的列表
        //获取FlowApprovalRelation的列表
        public IList<FlowApprovalRelationInfo> FlowApprovalRelationGetList(int approverId, int flowTypeId, int assignType,
                                       bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            SqlParameter[] parm = new SqlParameter[9];

            parm[0] = new SqlParameter(PARM_ApproverId, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_FlowTypeId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_AssignType, SqlDbType.Int);

            parm[3] = new SqlParameter(PARM_IsRecordSet, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[5] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[7] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[8] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = approverId;
            parm[1].Value = flowTypeId;
            parm[2].Value = assignType;

            parm[3].Value = 1;              //结果集还是统计记录数；1：结果集
            parm[4].Value = isPaged;
            parm[5].Value = pageNumber;
            parm[6].Value = pageSize;
            parm[7].Value = orderFieldName;
            parm[8].Value = orderType;

            IList<FlowApprovalRelationInfo> fars = new List<FlowApprovalRelationInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowApprovalRelationGetList", parm))
            {
                while (rdr.Read())
                {
                    FlowApprovalRelationInfo far = new FlowApprovalRelationInfo();
                    far.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    far.FlowId = Convert.ToInt32(rdr["FlowId"]);
                    far.FlowNodeId = Convert.ToInt32(rdr["FlowNodeId"]);
                    far.FlowNode = rdr["FlowNode"].ToString();
                    far.RoleId = Convert.ToInt32(rdr["RoleId"]);
                    far.FlowNodeTypeId = Convert.ToInt32(rdr["FlowNodeTypeId"]);
                    far.ApproverId = Convert.ToInt32(rdr["ApproverId"]);
                    far.FlowTypeId = Convert.ToInt32(rdr["FlowTypeId"]);
                    far.IsAssigned = Convert.ToBoolean(rdr["IsAssigned"]);
                    far.AssignType = Convert.ToInt32(rdr["AssignType"]);
                    fars.Add(far);
                }
                rdr.Close();
            }
            return fars;
        }

        //获取汇总统计
        public FlowApprovalRelationSumInfo FlowApprovalRelationGetSum(int approverId, int flowTypeId, int assignType)
        {
            SqlParameter[] parm = new SqlParameter[9];

            parm[0] = new SqlParameter(PARM_ApproverId, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_FlowTypeId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_AssignType, SqlDbType.Int);

            parm[3] = new SqlParameter(PARM_IsRecordSet, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[5] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[7] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[8] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = approverId;
            parm[1].Value = flowTypeId;
            parm[2].Value = assignType;

            parm[3].Value = 0;              //结果集还是统计汇总；0：统计汇总
            parm[4].Value = 0;
            parm[5].Value = 0;
            parm[6].Value = 0;
            parm[7].Value = null;
            parm[8].Value = null;

            FlowApprovalRelationSumInfo farSum = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowApprovalRelationGetList", parm))
            {
                while (rdr.Read())
                {
                    farSum = new FlowApprovalRelationSumInfo();
                    farSum.RecordCount = Convert.IsDBNull(rdr["RecordCount"]) ? 0 : Convert.ToInt32(rdr["RecordCount"]);
                    
                }
                rdr.Close();
            }
            return farSum;
        }

        #endregion 按条件读取记录结束
    }
}