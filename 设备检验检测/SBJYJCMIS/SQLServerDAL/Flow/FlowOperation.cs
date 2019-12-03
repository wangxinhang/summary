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
    public class FlowOperation : IFlowOperation
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
        private const string PARM_FlowNodeId = "@FlowNodeId";
        private const string PARM_XuserId = "@XuserId";

        private const string PARM_IsRecordSet = "@IsRecordSet";
        private const string PARM_IsPaged = "@IsPaged";
        private const string PARM_PageNumber = "@PageNumber";
        private const string PARM_PageSize = "@PageSize";
        private const string PARM_OrderFieldName = "@OrderFieldName";
        private const string PARM_OrderType = "@OrderType";
        #endregion 参数结束

        #region 数据记录操作（插入、更新、删除）
        //插入新记录
        public bool FlowOperationInsert(FlowOperationInfo flowRule)
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

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowOperationInsert", parm);
            return (retval > 0) ? true : false;
        }

        //更新记录
        public bool FlowOperationUpdateById(FlowOperationInfo flowRule)
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

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowOperationUpdateById", parm);
            return (retval > 0) ? true : false;
        }

        #endregion 数据记录操作（插入、更新、删除）结束

        #region 按条件读取记录

        //检验是否存在用户重名
        public bool FlowOperationIsExistedByName(string name, int flowId)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_FlowId, SqlDbType.Int);

            parm[0].Value = name;
            parm[1].Value = flowId;
            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proFlowOperationIsExistedByName", parm);
            return (obj == null) ? false : (bool)obj;
        }

        //根据用户Id获取流程动作list
        public IList<FlowOperationListInfo> FlowOperationGetListByXuserId(int xuserId)
        {
            SqlParameter[] parm = new SqlParameter[1];

            parm[0] = new SqlParameter(PARM_XuserId, SqlDbType.Int);
            parm[0].Value = xuserId;
            

            //根据参数获取数据
            IList<FlowOperationListInfo> recordList = new List<FlowOperationListInfo>();

            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowOperationGetListByXuserId", parm))
            {
                while (rdr.Read())
                {
                    FlowOperationListInfo record = new FlowOperationListInfo();

                    record.FlowOperationId = Convert.ToInt32(rdr["FlowOperationId"]);
                    record.FlowOperation = rdr["FlowOperation"].ToString();
                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }

        //根据名称验证规则名称是否存在(用于更新)
        public bool FlowOperationIsExistedByNewNameAndOldName(string newName, string oldName)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_OldName, SqlDbType.NVarChar);

            parm[0].Value = newName;
            parm[1].Value = oldName;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proFlowOperationIsExistedByNewNameAndOldName", parm);
            return obj == null ? false : (bool)obj;
        }
        #endregion 按条件读取记录结束

        #region 获取权限中角色可配置的操作权限列表

        //根据ResourceID获取RolePermission中的Operation列表
        public IList<FlowOperationListInfo> FlowNodeOperationGetListByFlowNodeId(int flowNodeId,int flowId)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_FlowNodeId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_FlowId, SqlDbType.Int);

            parm[0].Value = flowNodeId;
            parm[1].Value = flowId;

            //根据参数获取数据
            IList<FlowOperationListInfo> recordList = new List<FlowOperationListInfo>();

            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowNodeOperationGetListByFlowNodeId", parm))
            {
                while (rdr.Read())
                {
                    FlowOperationListInfo record = new FlowOperationListInfo();

                    record.FlowOperationId = Convert.ToInt32(rdr["FlowOperationId"]);
                    record.FlowOperation = rdr["FlowOperation"].ToString();
                    record.Permissable = Convert.ToBoolean(rdr["Permissable"]);

                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }
        //根据FlowNodeId 和FlowId 获取FlowOperationList
        public IList<FlowOperationListInfo> FlowOperationGetListByFlowNodeIdAndFlowId(int flowNodeId, int flowId)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_FlowNodeId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_FlowId, SqlDbType.Int);

            parm[0].Value = flowNodeId;
            parm[1].Value = flowId;

            //根据参数获取数据
            IList<FlowOperationListInfo> recordList = new List<FlowOperationListInfo>();

            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowOperationGetListByFlowNodeIdAndFlowId", parm))
            {
                while (rdr.Read())
                {
                    FlowOperationListInfo record = new FlowOperationListInfo();

                    record.FlowOperationId = Convert.ToInt32(rdr["FlowOperationId"]);
                    record.FlowOperation = rdr["FlowOperation"].ToString();
                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }

        #endregion 按条件读取记录结束

        #region 获取FlowOperation的列表
        //获取FlowNodeRole的列表
        public IList<FlowOperationListInfo> FlowOperationGetList(string name, int flowId,
                                       bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            SqlParameter[] parm = new SqlParameter[8];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_IsRecordSet, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[4] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[7] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);


            parm[0].Value = name;
            parm[1].Value = flowId;
            parm[2].Value = 1;              //结果集还是统计记录数；1：结果集
            parm[3].Value = isPaged;
            parm[4].Value = pageNumber;
            parm[5].Value = pageSize;
            parm[6].Value = orderFieldName;
            parm[7].Value = orderType;

            IList<FlowOperationListInfo> FlowOperationLists = new List<FlowOperationListInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowOperationGetList", parm))
            {
                while (rdr.Read())
                {
                    FlowOperationListInfo FlowOperationList = new FlowOperationListInfo();
                    FlowOperationList.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    FlowOperationList.Id = Convert.ToInt32(rdr["Id"]);
                    FlowOperationList.Name = rdr["Name"].ToString();
                    FlowOperationList.FlowId = Convert.ToInt32(rdr["FlowId"]);
                    FlowOperationList.Flow= rdr["Flow"].ToString();
                    FlowOperationList.Memo = rdr["Memo"].ToString();
                    FlowOperationLists.Add(FlowOperationList);
                }
                rdr.Close();
            }
            return FlowOperationLists;
        }

        //获取汇总统计
        public RecordCountInfo FlowOperationGetRecordCount(string name, int flowId)
        {
            SqlParameter[] parm = new SqlParameter[8];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_IsRecordSet, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[4] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[7] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);


            parm[0].Value = name;
            parm[1].Value = flowId;
            parm[2].Value = 0;              //结果集还是统计记录数；0：数值字段汇总
            parm[3].Value = 0;
            parm[4].Value = 0;
            parm[5].Value = 0;
            parm[6].Value = null;
            parm[7].Value = null;

            RecordCountInfo RecordCountInfo = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowOperationGetList", parm))
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