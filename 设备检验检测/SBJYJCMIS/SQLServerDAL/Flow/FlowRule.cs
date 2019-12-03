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
    public class FlowRule : IFlowRule
    {
        #region 参数
        //参数        
        private const string PARM_Id = "@Id";
        private const string PARM_Name = "@Name";
        private const string PARM_FlowId = "@FlowId";
        private const string PARM_DataStatusId = "@DataStatusId";
        private const string PARM_Memo = "@Memo";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_ModifierId = "@ModifierId";

        //扩展参数
        private const string PARM_OldName = "@OldName";
        private const string PARM_ApproverId = "@ApproverId";
        private const string PARM_FlowOperationId = "@FlowOperationId";

        private const string PARM_IsRecordSet = "@IsRecordSet";
        private const string PARM_IsPaged = "@IsPaged";
        private const string PARM_PageNumber = "@PageNumber";
        private const string PARM_PageSize = "@PageSize";
        private const string PARM_OrderFieldName = "@OrderFieldName";
        private const string PARM_OrderType = "@OrderType";
        #endregion 参数结束

        #region 数据记录操作（插入、更新、删除）
        //插入新记录
        public bool FlowRuleInsert(FlowRuleInfo flowRule)
        {
            SqlParameter[] parm = new SqlParameter[4];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[3] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);

            parm[0].Value = flowRule.Name;
            parm[1].Value = flowRule.FlowId;
            parm[2].Value = flowRule.Memo;
            parm[3].Value = flowRule.CreatorId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowRuleInsert", parm);
            return (retval > 0) ? true : false;
        }

        //更新记录
        public bool FlowRuleUpdateById(FlowRuleInfo flowRule)
        {
            SqlParameter[] parm = new SqlParameter[6];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[5] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = flowRule.Id;
            parm[1].Value = flowRule.Name;
            parm[2].Value = flowRule.FlowId;
            parm[3].Value = flowRule.DataStatusId;
            parm[4].Value = flowRule.Memo;
            parm[5].Value = flowRule.ModifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowRuleUpdateById", parm);
            return (retval > 0) ? true : false;
        }

        #endregion 数据记录操作（插入、更新、删除）结束

        #region 按条件读取记录

        //检验是否存在用户重名
        public bool FlowRuleIsExistedByName(string name,int flowId)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_FlowId, SqlDbType.Int);

            parm[0].Value = name;
            parm[1].Value = flowId;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proFlowRuleIsExistedByName", parm);
            return (obj == null) ? false : (bool)obj;
        }
        //根据名称验证规则名称是否存在(用于更新)
        public bool FlowRuleIsExistedByNewNameAndOldName(string newName, string oldName)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_OldName, SqlDbType.NVarChar);

            parm[0].Value = newName;
            parm[1].Value = oldName;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proFlowRuleIsExistedByNewNameAndOldName", parm);
            return obj == null ? false : (bool)obj;
        }
        #endregion 按条件读取记录结束

        #region 获取FlowRule的列表
        //获取FlowRule的列表
        public IList<FlowRuleInfo> FlowRuleGetList(string name, int flowId, int flowOperationId,
                                       bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            SqlParameter[] parm = new SqlParameter[9];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_FlowOperationId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_IsRecordSet, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[5] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[7] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[8] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);


            parm[0].Value = name;
            parm[1].Value = flowId;
            parm[2].Value = flowOperationId;
            parm[3].Value = 1;              //结果集还是统计记录数；1：结果集
            parm[4].Value = isPaged;
            parm[5].Value = pageNumber;
            parm[6].Value = pageSize;
            parm[7].Value = orderFieldName;
            parm[8].Value = orderType;

            IList<FlowRuleInfo> FlowRuleLists = new List<FlowRuleInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowRuleGetList", parm))
            {
                while (rdr.Read())
                {
                    FlowRuleInfo FlowRule = new FlowRuleInfo();
                    FlowRule.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    FlowRule.Id = Convert.ToInt32(rdr["Id"]);
                    FlowRule.Name = rdr["Name"].ToString();
                    FlowRule.FlowId = Convert.ToInt32(rdr["FlowId"]);
                    FlowRule.Flow = rdr["Flow"].ToString();
                    FlowRule.IsAssigned = Convert.ToBoolean(rdr["IsAssigned"]);
                    FlowRule.Memo = rdr["Memo"].ToString();
                    FlowRuleLists.Add(FlowRule);
                }
                rdr.Close();
            }
            return FlowRuleLists;
        }

        //获取汇总统计
        public RecordCountInfo FlowRuleGetRecordCount(string name, int flowId,int flowOperationId)
        {
            SqlParameter[] parm = new SqlParameter[9];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_FlowOperationId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_IsRecordSet, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[5] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[7] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[8] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);


            parm[0].Value = name;
            parm[1].Value = flowId;
            parm[2].Value = flowOperationId;
            parm[3].Value = 0;              //结果集还是统计记录数；0：数值字段汇总
            parm[4].Value = 0;
            parm[5].Value = 0;
            parm[6].Value = 0;
            parm[7].Value = null;
            parm[8].Value = null;

            RecordCountInfo RecordCountInfo = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowRuleGetList", parm))
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