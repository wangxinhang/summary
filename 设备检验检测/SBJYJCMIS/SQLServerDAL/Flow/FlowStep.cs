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
    public class FlowStep : IFlowStep
    {
        #region 参数
        //参数 
        private const string PARM_Id = "@Id";
        private const string PARM_FlowId = "@FlowId";
        private const string PARM_SubmitFlowNodeId = "@SubmitFlowNodeId";
        private const string PARM_ApprovalFlowNodeId = "@ApprovalFlowNodeId";
        private const string PARM_FlowRuleId = "@FlowRuleId";
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

        #region 数据记录操作（插入、更新、删除）
        //插入新记录
        public bool FlowStepInsert(FlowStepInfo flow)
        {
            SqlParameter[] parm = new SqlParameter[6];

            parm[0] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_SubmitFlowNodeId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_ApprovalFlowNodeId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_FlowRuleId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[5] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);

            parm[0].Value = flow.FlowId;
            parm[1].Value = flow.SubmitFlowNodeId;
            parm[2].Value = flow.ApprovalFlowNodeId;
            parm[3].Value = flow.FlowRuleId;
            parm[4].Value = flow.Memo;
            parm[5].Value = flow.CreatorId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowStepInsert", parm);
            return (retval > 0) ? true : false;
        }

        //更新记录
        public bool FlowStepUpdateById(FlowStepInfo flow)
        {
            SqlParameter[] parm = new SqlParameter[8];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_SubmitFlowNodeId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_ApprovalFlowNodeId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_FlowRuleId, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[7] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = flow.Id;
            parm[1].Value = flow.FlowId;
            parm[2].Value = flow.SubmitFlowNodeId;
            parm[3].Value = flow.ApprovalFlowNodeId;
            parm[4].Value = flow.FlowRuleId;
            parm[5].Value = flow.DataStatusId;
            parm[6].Value = flow.Memo;
            parm[7].Value = flow.ModifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowStepUpdateById", parm);
            return (retval > 0) ? true : false;
        }

        #endregion 数据记录操作（插入、更新、删除）结束

        #region 根据条件获取结果集
        //获取FlowNodeRole的列表
        public IList<FlowStepListInfo> FlowStepGetSubmitFlowNodeIdList(int flowId)
        {
            SqlParameter[] parm = new SqlParameter[1];
            parm[0] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[0].Value = flowId;
          

            IList<FlowStepListInfo> FlowHandleResultLists = new List<FlowStepListInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowStepGetSubmitFlowNodeIdList", parm))
            {
                while (rdr.Read())
                {
                    FlowStepListInfo FlowHandleResultList = new FlowStepListInfo();
                    FlowHandleResultList.SubmitFlowNodeId = Convert.ToInt32(rdr["SubmitFlowNodeId"]);
                    FlowHandleResultList.SubmitFlowNode = rdr["SubmitFlowNode"].ToString();
                    FlowHandleResultLists.Add(FlowHandleResultList);
                }
                rdr.Close();
            }
            return FlowHandleResultLists;
        }
        //获取FlowNodeRole的列表
        public IList<FlowStepListInfo> FlowStepGetApprovalFlowNodeIdList(int flowId, int submitFlowNodeId)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_SubmitFlowNodeId, SqlDbType.Int);

            parm[0].Value = flowId;
            parm[1].Value = submitFlowNodeId;

            IList<FlowStepListInfo> FlowHandleResultLists = new List<FlowStepListInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowStepGetApprovalFlowNodeIdList", parm))
            {
                while (rdr.Read())
                {
                    FlowStepListInfo FlowHandleResultList = new FlowStepListInfo();
                    FlowHandleResultList.ApprovalFlowNodeId = Convert.ToInt32(rdr["ApprovalFlowNodeId"]);
                    FlowHandleResultList.ApprovalFlowNode = rdr["ApprovalFlowNode"].ToString();
                    FlowHandleResultLists.Add(FlowHandleResultList);
                }
                rdr.Close();
            }
            return FlowHandleResultLists;
        }
        #endregion

        #region 获取FlowStep的列表
        //获取FlowNodeRole的列表
        public IList<FlowStepListInfo> FlowStepGetList(int flowId, int submitFlowNodeId, int approvalFlowNodeId, int flowRuleId, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            SqlParameter[] parm = new SqlParameter[10];

            parm[0] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_SubmitFlowNodeId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_ApprovalFlowNodeId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_FlowRuleId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_IsRecordSet, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[6] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[7] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[8] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[9] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = flowId;
            parm[1].Value = submitFlowNodeId;
            parm[2].Value = approvalFlowNodeId;
            parm[3].Value = flowRuleId;
            parm[4].Value = 1;              //结果集还是统计记录数；1：结果集
            parm[5].Value = isPaged;
            parm[6].Value = pageNumber;
            parm[7].Value = pageSize;
            parm[8].Value = orderFieldName;
            parm[9].Value = orderType;

            IList<FlowStepListInfo> FlowHandleResultLists = new List<FlowStepListInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowStepGetList", parm))
            {
                while (rdr.Read())
                {
                    FlowStepListInfo FlowHandleResultList = new FlowStepListInfo();
                    FlowHandleResultList.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    FlowHandleResultList.Id = Convert.ToInt32(rdr["Id"]);
                    FlowHandleResultList.SubmitFlowNodeId = Convert.ToInt32(rdr["SubmitFlowNodeId"]);
                    FlowHandleResultList.SubmitFlowNode = rdr["SubmitFlowNode"].ToString();
                    FlowHandleResultList.ApprovalFlowNodeId = Convert.ToInt32(rdr["ApprovalFlowNodeId"]);
                    FlowHandleResultList.ApprovalFlowNode = rdr["ApprovalFlowNode"].ToString();
                    FlowHandleResultList.FlowRuleId = Convert.ToInt32(rdr["FlowRuleId"]);
                    FlowHandleResultList.FlowRule = rdr["FlowRule"].ToString();
                    FlowHandleResultList.FlowId = Convert.ToInt32(rdr["FlowId"]);
                    FlowHandleResultList.Flow = rdr["Flow"].ToString();
                    FlowHandleResultList.Memo = rdr["Memo"].ToString();
                    FlowHandleResultLists.Add(FlowHandleResultList);
                }
                rdr.Close();
            }
            return FlowHandleResultLists;
        }

        //获取汇总统计
        public RecordCountInfo FlowStepGetRecordCount(int flowId,int submitFlowNodeId, int approvalFlowNodeId, int flowRuleId)
        {
            SqlParameter[] parm = new SqlParameter[10];

            parm[0] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_SubmitFlowNodeId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_ApprovalFlowNodeId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_FlowRuleId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_IsRecordSet, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[6] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[7] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[8] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[9] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = flowId;
            parm[1].Value = submitFlowNodeId;
            parm[2].Value = approvalFlowNodeId;
            parm[3].Value = flowRuleId;

            parm[4].Value = 0;              //结果集还是统计记录数；0：数值字段汇总
            parm[5].Value = 0;
            parm[6].Value = 0;
            parm[7].Value = 0;
            parm[8].Value = null;
            parm[9].Value = null;

            RecordCountInfo RecordCountInfo = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowStepGetList", parm))
            {
                while (rdr.Read())
                {
                    RecordCountInfo = new RecordCountInfo();
                    RecordCountInfo.RecordCount = Convert.IsDBNull(rdr["RecordCount"]) ? 0 : Convert.ToInt32(rdr["RecordCount"]);
                }
                rdr.Close();
            }
            return RecordCountInfo;
        }

        #endregion 按条件读取记录结束
    }
}