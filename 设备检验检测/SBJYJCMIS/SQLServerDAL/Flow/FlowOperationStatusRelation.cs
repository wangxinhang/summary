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
    public class FlowOperationStatusRelation : IFlowOperationStatusRelation
    {
        #region 参数
        //参数        
        private const string PARM_Id = "@Id";
        private const string PARM_FlowOperationId = "@FlowOperationId";
        private const string PARM_FlowStatusId = "@FlowStatusId";
        private const string PARM_FlowId = "@FlowId";
        private const string PARM_DataStatusId = "@DataStatusId";
        private const string PARM_Memo = "@Memo";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_ModifierId = "@ModifierId";

        #endregion 参数结束

        #region 数据记录操作（插入、更新、删除）
        //插入新记录
        public bool FlowOperationStatusRelationInsert(FlowOperationStatusRelationInfo flowOperationStatusRelation)
        {
            SqlParameter[] parm = new SqlParameter[5];

            parm[0] = new SqlParameter(PARM_FlowOperationId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_FlowStatusId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[4] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);

            parm[0].Value = flowOperationStatusRelation.FlowOperationId;
            parm[1].Value = flowOperationStatusRelation.FlowStatusId;
            parm[2].Value = flowOperationStatusRelation.FlowId;
            parm[3].Value = flowOperationStatusRelation.Memo;
            parm[4].Value = flowOperationStatusRelation.CreatorId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowOperationStatusRelationInsert", parm);
            return (retval > 0) ? true : false;
        }

        //更新记录
        public bool FlowOperationStatusRelationUpdateById(FlowOperationStatusRelationInfo flowOperationStatusRelation)
        {
            SqlParameter[] parm = new SqlParameter[7];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_FlowOperationId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_FlowStatusId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[6] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = flowOperationStatusRelation.Id;
            parm[1].Value = flowOperationStatusRelation.FlowOperationId;
            parm[2].Value = flowOperationStatusRelation.FlowStatusId;
            parm[3].Value = flowOperationStatusRelation.FlowId;
            parm[4].Value = flowOperationStatusRelation.DataStatusId;
            parm[5].Value = flowOperationStatusRelation.Memo;
            parm[6].Value = flowOperationStatusRelation.ModifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowOperationStatusRelationUpdateById", parm);
            return (retval > 0) ? true : false;
        }
        //更新记录
        public bool FlowOperationStatusRelationUpdateByIdTran(FlowOperationStatusRelationInfo flowOperationStatusRelation)
        {
            SqlParameter[] parm = new SqlParameter[6];

            parm[0] = new SqlParameter(PARM_FlowOperationId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_FlowStatusId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[5] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

          
            parm[0].Value = flowOperationStatusRelation.FlowOperationId;
            parm[1].Value = flowOperationStatusRelation.FlowStatusId;
            parm[2].Value = flowOperationStatusRelation.FlowId;
            parm[3].Value = flowOperationStatusRelation.DataStatusId;
            parm[4].Value = flowOperationStatusRelation.Memo;
            parm[5].Value = flowOperationStatusRelation.ModifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowOperationStatusRelationUpdateByIdTran", parm);
            return (retval > 0) ? true : false;
        }
        #endregion 数据记录操作（插入、更新、删除）结束

    }
}