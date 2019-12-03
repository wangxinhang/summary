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
    public class FlowOperationHandleResultRelation : IFlowOperationHandleResultRelation
    {
        #region 参数
        //参数        
        private const string PARM_Id = "@Id";
        private const string PARM_FlowOperationId = "@FlowOperationId";
        private const string PARM_FlowHandleResultId = "@FlowHandleResultId";
        private const string PARM_FlowId = "@FlowId";
        private const string PARM_DataStatusId = "@DataStatusId";
        private const string PARM_Memo = "@Memo";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_ModifierId = "@ModifierId";

        //扩展参数
        private const string PARM_FlowOperation = "@FlowOperation";
        private const string PARM_FlowTypeId = "@FlowTypeId";
        private const string PARM_ApproverId = "@ApproverId";
        private const string PARM_AssignTypeId = "@AssignTypeId";

        private const string PARM_IsRecordSet = "@IsRecordSet";
        private const string PARM_IsPaged = "@IsPaged";
        private const string PARM_PageNumber = "@PageNumber";
        private const string PARM_PageSize = "@PageSize";
        private const string PARM_OrderFieldName = "@OrderFieldName";
        private const string PARM_OrderType = "@OrderType";
        #endregion 参数结束

        #region 数据记录操作（插入、更新、删除）
        //插入新记录
        public bool FlowOperationHandleResultRelationInsert(FlowOperationHandleResultRelationInfo flowOperationHandleResultRelation)
        {
            SqlParameter[] parm = new SqlParameter[5];

            parm[0] = new SqlParameter(PARM_FlowOperationId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_FlowHandleResultId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[4] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);

            parm[0].Value = flowOperationHandleResultRelation.FlowOperationId;
            parm[1].Value = flowOperationHandleResultRelation.FlowHandleResultId;
            parm[2].Value = flowOperationHandleResultRelation.FlowId;
            parm[3].Value = flowOperationHandleResultRelation.Memo;
            parm[4].Value = flowOperationHandleResultRelation.CreatorId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowOperationHandleResultRelationInsert", parm);
            return (retval > 0) ? true : false;
        }

        //更新记录
        public bool FlowOperationHandleResultRelationUpdateById(FlowOperationHandleResultRelationInfo flowOperationHandleResultRelation)
        {
            SqlParameter[] parm = new SqlParameter[7];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_FlowOperationId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_FlowHandleResultId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[6] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = flowOperationHandleResultRelation.Id;
            parm[1].Value = flowOperationHandleResultRelation.FlowOperationId;
            parm[2].Value = flowOperationHandleResultRelation.FlowHandleResultId;
            parm[3].Value = flowOperationHandleResultRelation.FlowId;
            parm[4].Value = flowOperationHandleResultRelation.DataStatusId;
            parm[5].Value = flowOperationHandleResultRelation.Memo;
            parm[6].Value = flowOperationHandleResultRelation.ModifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowOperationHandleResultRelationUpdateById", parm);
            return (retval > 0) ? true : false;
        }
        //插入新记录
        public bool FlowOperationHandleResultRelationUpdateByIdTran(FlowOperationHandleResultRelationInfo flowOperationHandleResultRelation)
        {
            SqlParameter[] parm = new SqlParameter[6];

            parm[0] = new SqlParameter(PARM_FlowOperationId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_FlowHandleResultId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[5] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = flowOperationHandleResultRelation.FlowOperationId;
            parm[1].Value = flowOperationHandleResultRelation.FlowHandleResultId;
            parm[2].Value = flowOperationHandleResultRelation.FlowId;
            parm[3].Value = flowOperationHandleResultRelation.DataStatusId;
            parm[4].Value = flowOperationHandleResultRelation.Memo;
            parm[5].Value = flowOperationHandleResultRelation.ModifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowOperationHandleResultRelationUpdateByIdTran", parm);
            return (retval > 0) ? true : false;
        }
        #endregion 数据记录操作（插入、更新、删除）结束

        #region 获取FlowOperationHandleResult的列表
        //获取FlowOperationHandleResult的列表
        public IList<FlowOperationHandleResultRelationListInfo> FlowOperationHandleResultGetList(string flowOperation, int flowId, int assignTypeId,
                                       bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            SqlParameter[] parm = new SqlParameter[9];

            parm[0] = new SqlParameter(PARM_FlowOperation, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_AssignTypeId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_IsRecordSet, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[5] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[7] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[8] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = flowOperation;
            parm[1].Value = flowId;
            parm[2].Value = assignTypeId;

            parm[3].Value = 1;              //结果集还是统计记录数；1：结果集
            parm[4].Value = isPaged;
            parm[5].Value = pageNumber;
            parm[6].Value = pageSize;
            parm[7].Value = orderFieldName;
            parm[8].Value = orderType;

            IList<FlowOperationHandleResultRelationListInfo> FlowOperationHandleResults = new List<FlowOperationHandleResultRelationListInfo>();
            FlowHandleResult FlowHandleResultBll = new FlowHandleResult();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowOperationHandleResultGetList", parm))
            {
                while (rdr.Read())
                {
                    FlowOperationHandleResultRelationListInfo FlowOperationHandleResult = new FlowOperationHandleResultRelationListInfo();
                    FlowOperationHandleResult.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    FlowOperationHandleResult.FlowOperationId= Convert.ToInt32(rdr["Id"]);
                    FlowOperationHandleResult.FlowOperation = rdr["Name"].ToString();
                    FlowOperationHandleResult.FlowId = Convert.ToInt32(rdr["FlowId"]);
                    FlowOperationHandleResult.FlowHandleResultList = FlowHandleResultBll.FlowHandleResultGetListByFlowOperationId(FlowOperationHandleResult.FlowOperationId, FlowOperationHandleResult.FlowId);
                    FlowOperationHandleResults.Add(FlowOperationHandleResult);
                }
                rdr.Close();
            }
            return FlowOperationHandleResults;
        }

        //获取汇总统计
        public RecordCountInfo FlowOperationHandleResultGetRecordCount(string flowOperation, int flowId, int assignTypeId)
        {
            SqlParameter[] parm = new SqlParameter[9];

            parm[0] = new SqlParameter(PARM_FlowOperation, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_AssignTypeId, SqlDbType.Int);

            parm[3] = new SqlParameter(PARM_IsRecordSet, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[5] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[7] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[8] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = flowOperation;
            parm[1].Value = flowId;
            parm[2].Value = assignTypeId;

            parm[3].Value = 0;              //结果集还是统计记录数；0：数值字段汇总
            parm[4].Value = 0;
            parm[5].Value = 0;
            parm[6].Value = 0;
            parm[7].Value = null;
            parm[8].Value = null;

            RecordCountInfo RecordCountInfo = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowOperationHandleResultGetList", parm))
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