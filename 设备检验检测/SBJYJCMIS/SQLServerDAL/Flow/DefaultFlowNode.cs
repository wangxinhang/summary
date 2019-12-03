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
    public class DefaultFlowNode : IDefaultFlowNode
    {
        #region 参数
        //参数 
        private const string PARM_Id = "@Id";
       
        private const string PARM_DepartmentId = "@DepartmentId";
        private const string PARM_FlowNodeId = "@FlowNodeId";
        private const string PARM_RoleId = "@RoleId";
        private const string PARM_XuserId = "@XuserId";
        private const string PARM_FlowId = "@FlowId";
        private const string PARM_DataStatusId = "@DataStatusId";
        private const string PARM_Memo = "@Memo";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_ModifierId = "@ModifierId";

        private const string PARM_FlowNode = "@FlowNode";
        private const string PARM_Role = "@Role";
        private const string PARM_Xuser = "@Xuser";

        private const string PARM_IsRecordSet = "@IsRecordSet";
        private const string PARM_IsPaged = "@IsPaged";
        private const string PARM_PageNumber = "@PageNumber";
        private const string PARM_PageSize = "@PageSize";
        private const string PARM_OrderFieldName = "@OrderFieldName";
        private const string PARM_OrderType = "@OrderType";
        #endregion 参数结束

        #region 数据记录操作（插入、更新、删除）
        //插入新记录
        public bool DefaultFlowNodeInsert(DefaultFlowNodeInfo flow)
        {
            SqlParameter[] parm = new SqlParameter[7];
            
            parm[0] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_FlowNodeId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_RoleId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_XuserId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[6] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);

            parm[0].Value = flow.DepartmentId;
            parm[1].Value = flow.FlowNodeId;
            parm[2].Value = flow.RoleId;
            parm[3].Value = flow.XuserId;
            parm[4].Value = flow.FlowId;
            parm[5].Value = flow.Memo;
            parm[6].Value = flow.CreatorId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proDefaultFlowNodeInsert", parm);
            return (retval > 0) ? true : false;
        }

        //更新记录
        public bool DefaultFlowNodeUpdateById(DefaultFlowNodeInfo flow)
        {
            SqlParameter[] parm = new SqlParameter[8];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_FlowNodeId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_RoleId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_XuserId, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[7] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = flow.Id;
            parm[1].Value = flow.DepartmentId;
            parm[2].Value = flow.FlowNodeId;
            parm[3].Value = flow.RoleId;
            parm[4].Value = flow.XuserId;
            parm[5].Value = flow.FlowId;
            parm[6].Value = flow.Memo;
            parm[7].Value = flow.ModifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proDefaultFlowNodeUpdateById", parm);
            return (retval > 0) ? true : false;
        }
        public bool DefaultFlowNodeUpdateDataStatusById(int id, int dataStatusId, int modifierId)
        {
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = id;
            parm[1].Value = dataStatusId;
            parm[2].Value = modifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proDefaultFlowNodeUpdateDataStatusIdById", parm);
            return (retval > 0) ? true : false;
        }
        #endregion 数据记录操作（插入、更新、删除）结束
        
        #region 获取DefaultFlowNode的列表
        //获取FlowNodeRole的列表
        public IList<DefaultFlowNodeInfo> DefaultFlowNodeGetList(int DepartmentId, string FlowNode, string Role, string Xuser, int flowId, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            SqlParameter[] parm = new SqlParameter[11];

            parm[0] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_FlowNode, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_Role, SqlDbType.NVarChar);
            parm[3] = new SqlParameter(PARM_Xuser, SqlDbType.NVarChar);
            parm[4] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_IsRecordSet, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[7] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[8] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[9] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[10] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = DepartmentId;
            parm[1].Value = FlowNode;
            parm[2].Value = Role;
            parm[3].Value = Xuser;
            parm[4].Value = flowId;
            parm[5].Value = 1;              //结果集还是统计记录数；1：结果集
            parm[6].Value = isPaged;
            parm[7].Value = pageNumber;
            parm[8].Value = pageSize;
            parm[9].Value = orderFieldName;
            parm[10].Value = orderType;

            IList<DefaultFlowNodeInfo> DefaultFlowNodeLists = new List<DefaultFlowNodeInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proDefaultFlowNodeGetList", parm))
            {
                while (rdr.Read())
                {
                    DefaultFlowNodeInfo DefaultFlowNodeList = new DefaultFlowNodeInfo();
                    DefaultFlowNodeList.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    DefaultFlowNodeList.Id = Convert.ToInt32(rdr["Id"]);
                    DefaultFlowNodeList.DepartmentId = Convert.ToInt32(rdr["DepartmentId"]);
                    DefaultFlowNodeList.Department = rdr["Department"].ToString();
                    DefaultFlowNodeList.FlowNodeId = Convert.ToInt32(rdr["FlowNodeId"]);
                    DefaultFlowNodeList.FlowNode = rdr["FlowNode"].ToString();
                    DefaultFlowNodeList.RoleId = Convert.ToInt32(rdr["RoleId"]);
                    DefaultFlowNodeList.Role = rdr["Role"].ToString();
                    DefaultFlowNodeList.XuserId = Convert.ToInt32(rdr["XuserId"]);
                    DefaultFlowNodeList.Xuser = rdr["Xuser"].ToString();
                    DefaultFlowNodeList.FlowId = Convert.ToInt32(rdr["FlowId"]);
                    DefaultFlowNodeList.Flow = rdr["Flow"].ToString();
                    DefaultFlowNodeList.Memo = rdr["Memo"].ToString();
                    DefaultFlowNodeLists.Add(DefaultFlowNodeList);
                }
                rdr.Close();
            }
            return DefaultFlowNodeLists;
        }

        //获取汇总统计
        public RecordCountInfo DefaultFlowNodeGetRecordCount(int DepartmentId, string FlowNode, string Role, string Xuser, int flowId)
        {
            SqlParameter[] parm = new SqlParameter[11];

            parm[0] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_FlowNode, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_Role, SqlDbType.NVarChar);
            parm[3] = new SqlParameter(PARM_Xuser, SqlDbType.NVarChar);
            parm[4] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_IsRecordSet, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[7] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[8] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[9] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[10] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = DepartmentId;
            parm[1].Value = FlowNode;
            parm[2].Value = Role;
            parm[3].Value = Xuser;
            parm[4].Value = flowId;
            parm[5].Value = 0;              //结果集还是统计记录数；0：数值字段汇总
            parm[6].Value = 0;
            parm[7].Value = 0;
            parm[8].Value = 0;
            parm[9].Value = null;
            parm[10].Value = null;

            RecordCountInfo RecordCountInfo = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proDefaultFlowNodeGetList", parm))
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