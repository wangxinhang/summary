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
    public class FlowOperationFlowRuleRelation : IFlowOperationFlowRuleRelation
    {
        #region 参数
        //参数        
        private const string PARM_Id = "@Id";
        private const string PARM_FlowOperationId = "@FlowOperationId";
        private const string PARM_FlowRuleId = "@FlowRuleId";
        private const string PARM_FlowId = "@FlowId";
        private const string PARM_DataStatusId = "@DataStatusId";
        private const string PARM_Memo = "@Memo";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_ModifierId = "@ModifierId";

        #endregion 参数结束

        #region 数据记录操作（插入、更新、删除）
        //插入新记录
        public bool FlowOperationFlowRuleRelationInsert(FlowOperationFlowRuleRelationInfo flowOperationFlowRuleRelation)
        {
            SqlParameter[] parm = new SqlParameter[5];

            parm[0] = new SqlParameter(PARM_FlowOperationId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_FlowRuleId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[4] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);

            parm[0].Value = flowOperationFlowRuleRelation.FlowOperationId;
            parm[1].Value = flowOperationFlowRuleRelation.FlowRuleId;
            parm[2].Value = flowOperationFlowRuleRelation.FlowId;
            parm[3].Value = flowOperationFlowRuleRelation.Memo;
            parm[4].Value = flowOperationFlowRuleRelation.CreatorId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowOperationFlowRuleRelationInsert", parm);
            return (retval > 0) ? true : false;
        }

        //更新记录
        public bool FlowOperationFlowRuleRelationUpdateById(FlowOperationFlowRuleRelationInfo flowOperationFlowRuleRelation)
        {
            SqlParameter[] parm = new SqlParameter[7];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_FlowOperationId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_FlowRuleId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[6] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = flowOperationFlowRuleRelation.Id;
            parm[1].Value = flowOperationFlowRuleRelation.FlowOperationId;
            parm[2].Value = flowOperationFlowRuleRelation.FlowRuleId;
            parm[3].Value = flowOperationFlowRuleRelation.FlowId;
            parm[4].Value = flowOperationFlowRuleRelation.DataStatusId;
            parm[5].Value = flowOperationFlowRuleRelation.Memo;
            parm[6].Value = flowOperationFlowRuleRelation.ModifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowOperationFlowRuleRelationUpdateById", parm);
            return (retval > 0) ? true : false;
        }
        //更新记录
        public bool FlowOperationFlowRuleRelationUpdateByIdTran(FlowOperationFlowRuleRelationInfo flowOperationFlowRuleRelation)
        {
            SqlParameter[] parm = new SqlParameter[6];
            parm[0] = new SqlParameter(PARM_FlowOperationId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_FlowRuleId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[5] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = flowOperationFlowRuleRelation.FlowOperationId;
            parm[1].Value = flowOperationFlowRuleRelation.FlowRuleId;
            parm[2].Value = flowOperationFlowRuleRelation.FlowId;
            parm[3].Value = flowOperationFlowRuleRelation.DataStatusId;
            parm[4].Value = flowOperationFlowRuleRelation.Memo;
            parm[5].Value = flowOperationFlowRuleRelation.ModifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowOperationFlowRuleRelationUpdateByIdTran", parm);
            return (retval > 0) ? true : false;
        }
        #endregion 数据记录操作（插入、更新、删除）结束

    }
}