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
    public class FlowNodeOperationRelation : IFlowNodeOperationRelation
    {
        #region 参数
        //参数        
        private const string PARM_Id = "@Id";
        private const string PARM_FlowNodeId = "@FlowNodeId";
        private const string PARM_FlowOperationId = "@FlowOperationId";
        private const string PARM_FlowId = "@FlowId";
        private const string PARM_DataStatusId = "@DataStatusId";
        private const string PARM_Memo = "@Memo";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_ModifierId = "@ModifierId";

        //扩展参数
        private const string PARM_Permissable = "@Permissable";
        private const string PARM_RoleName = "@RoleName";
        private const string PARM_FlowTypeId = "@FlowTypeId";
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
        public bool FlowNodeOperationRelationInsert(FlowNodeOperationRelationInfo flowRule)
        {
            SqlParameter[] parm = new SqlParameter[5];

            parm[0] = new SqlParameter(PARM_FlowNodeId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_FlowOperationId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[4] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);

            parm[0].Value = flowRule.FlowNodeId;
            parm[1].Value = flowRule.FlowOperationId;
            parm[2].Value = flowRule.FlowId;
            parm[3].Value = flowRule.Memo;
            parm[4].Value = flowRule.CreatorId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowNodeOperationRelationInsert", parm);
            return (retval > 0) ? true : false;
        }
        //插入新记录事物
        public bool FlowNodeOperationRelationInsertTran(FlowNodeOperationRelationInfo flowNodeOperationRelation)
        {
            SqlParameter[] parm = new SqlParameter[6];

            parm[0] = new SqlParameter(PARM_FlowNodeId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_FlowOperationId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_Permissable, SqlDbType.Bit);
            parm[4] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[5] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);

            parm[0].Value = flowNodeOperationRelation.FlowNodeId;
            parm[1].Value = flowNodeOperationRelation.FlowOperationId;
            parm[2].Value = flowNodeOperationRelation.FlowId;
            parm[3].Value = flowNodeOperationRelation.Permissable;
            parm[4].Value = flowNodeOperationRelation.Memo;
            parm[5].Value = flowNodeOperationRelation.CreatorId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowNodeOperationRelationInsertTran", parm);
            return (retval > 0) ? true : false;
        }
        //更新记录
        public bool FlowNodeOperationRelationUpdateById(FlowNodeOperationRelationInfo flowRule)
        {
            SqlParameter[] parm = new SqlParameter[7];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_FlowNodeId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_FlowOperationId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[6] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = flowRule.Id;
            parm[1].Value = flowRule.FlowNodeId;
            parm[2].Value = flowRule.FlowOperationId;
            parm[3].Value = flowRule.FlowId;
            parm[4].Value = flowRule.DataStatusId;
            parm[5].Value = flowRule.Memo;
            parm[6].Value = flowRule.ModifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowNodeOperationRelationUpdateById", parm);
            return (retval > 0) ? true : false;
        }

        #endregion 数据记录操作（插入、更新、删除）结束

        #region 按条件读取记录

        //检验是否存在用户重名
        public bool FlowNodeOperationRelationIsExisted(int flowNodeId, int flowOperationId, int flowId)
        {
            SqlParameter[] parm = new SqlParameter[3];
            parm[0] = new SqlParameter(PARM_FlowNodeId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_FlowOperationId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_FlowId, SqlDbType.Int);

            parm[0].Value = flowNodeId;
            parm[1].Value = flowOperationId;
            parm[2].Value = flowId;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proFlowNodeOperationRelationIsExisted", parm);
            return (obj == null) ? false : (bool)obj;
        }

        #endregion 按条件读取记录结束

        #region 获取FlowNodeRole的列表
        //获取FlowNodeRole的列表
        public IList<FlowNodeOperationRelationListInfo> FlowNodeOperationGetList(string roleName, int flowId, int assignTypeId,
                                       bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            SqlParameter[] parm = new SqlParameter[9];

            parm[0] = new SqlParameter(PARM_RoleName, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_AssignTypeId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_IsRecordSet, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[5] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[7] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[8] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = roleName;
            parm[1].Value = flowId;
            parm[2].Value = assignTypeId;

            parm[3].Value = 1;              //结果集还是统计记录数；1：结果集
            parm[4].Value = isPaged;
            parm[5].Value = pageNumber;
            parm[6].Value = pageSize;
            parm[7].Value = orderFieldName;
            parm[8].Value = orderType;

            IList<FlowNodeOperationRelationListInfo> FlowNodeOperations = new List<FlowNodeOperationRelationListInfo>();
            FlowOperation FlowOperationBll = new FlowOperation();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowNodeOperationGetList", parm))
            {
                while (rdr.Read())
                {
                    FlowNodeOperationRelationListInfo FlowNodeOperation = new FlowNodeOperationRelationListInfo();
                    FlowNodeOperation.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    FlowNodeOperation.FlowNodeId = Convert.ToInt32(rdr["Id"]);
                    FlowNodeOperation.Name = rdr["Name"].ToString();
                    FlowNodeOperation.FlowId = Convert.ToInt32(rdr["FlowId"]);
                    FlowNodeOperation.Flow = rdr["Flow"].ToString();
                    FlowNodeOperation.FlowOperationList = FlowOperationBll.FlowNodeOperationGetListByFlowNodeId(FlowNodeOperation.FlowNodeId, FlowNodeOperation.FlowId);
                    FlowNodeOperations.Add(FlowNodeOperation);
                }
                rdr.Close();
            }
            return FlowNodeOperations;
        }

        //获取汇总统计
        public RecordCountInfo FlowNodeOperationGetRecordCount(string roleName, int flowId, int assignTypeId)
        {
            SqlParameter[] parm = new SqlParameter[9];

            parm[0] = new SqlParameter(PARM_RoleName, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_AssignTypeId, SqlDbType.Int);

            parm[3] = new SqlParameter(PARM_IsRecordSet, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[5] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[7] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[8] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = roleName;
            parm[1].Value = flowId;
            parm[2].Value = assignTypeId;

            parm[3].Value = 0;              //结果集还是统计记录数；0：数值字段汇总
            parm[4].Value = 0;
            parm[5].Value = 0;
            parm[6].Value = 0;
            parm[7].Value = null;
            parm[8].Value = null;

            RecordCountInfo RecordCountInfo = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowNodeOperationGetList", parm))
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