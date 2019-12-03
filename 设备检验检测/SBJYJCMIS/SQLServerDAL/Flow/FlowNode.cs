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
    public class FlowNode:IFlowNode
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

        private const string PARM_XuserId = "@XuserId";
        private const string PARM_DepartmentId = "@DepartmentId";
        private const string PARM_OldName = "@OldName";
        private const string PARM_IsRecordSet = "@IsRecordSet";
        private const string PARM_RecordSetType = "@RecordSetType";
        private const string PARM_IsPaged = "@IsPaged";
        private const string PARM_PageNumber = "@PageNumber";
        private const string PARM_PageSize = "@PageSize";
        private const string PARM_OrderFieldName = "@OrderFieldName";
        private const string PARM_OrderType = "@OrderType";
        #endregion 参数结束

        #region 数据记录操作（插入、更新、删除）
        //插入新记录
        public bool FlowNodeInsert(FlowNodeInfo flowNode)
        {
            SqlParameter[] parm = new SqlParameter[4];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[3] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);

            parm[0].Value = flowNode.Name;
            parm[1].Value = flowNode.FlowId;
            parm[2].Value = flowNode.Memo;
            parm[3].Value = flowNode.CreatorId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowNodeInsert", parm);
            return (retval > 0) ? true : false;
        }

        //更新记录
        public bool FlowNodeUpdateById(FlowNodeInfo flowNode)
        {
            SqlParameter[] parm = new SqlParameter[6];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[5] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = flowNode.Id;
            parm[1].Value = flowNode.Name;
            parm[2].Value = flowNode.FlowId;
            parm[3].Value = flowNode.DataStatusId;
            parm[4].Value = flowNode.Memo;
            parm[5].Value = flowNode.ModifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowNodeUpdateById", parm);
            return (retval > 0) ? true : false;
        }

        #endregion 数据记录操作（插入、更新、删除）结束

        #region 按条件读取记录

        //检验是否存在用户重名
        public IList<FlowNodeInfo> GetFlowNodeIdByXuserId(int xuserId)
        {
            SqlParameter[] parm = new SqlParameter[1];
            parm[0] = new SqlParameter(PARM_XuserId, SqlDbType.Int);
            parm[0].Value = xuserId;

            IList<FlowNodeInfo> recordList = new List<FlowNodeInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proGetFlowNodeIdByXuserId", parm))
            {
                while (rdr.Read())
                {
                    FlowNodeInfo record = new FlowNodeInfo();
                    record.Id = Convert.ToInt32(rdr["Id"]);
                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }
        //检验是否存在用户重名
        public bool FlowNodeIsExistedByName(string name,int FlowId)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_FlowId, SqlDbType.Int);

            parm[0].Value = name;
            parm[1].Value = FlowId;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proFlowNodeIsExistedByName", parm);
            return (obj == null) ? false : (bool)obj;
        }

        //根据XuserId获取FlowNodeId及对应的FlowOperationList
        public IList<FlowNodeInfo> FlowOperationListByFlowNodeIdAndXuserId(int xuserId)
        {
            SqlParameter[] parm = new SqlParameter[1];
            parm[0] = new SqlParameter(PARM_XuserId, SqlDbType.Int);
            parm[0].Value = xuserId;

            IList<FlowNodeInfo> recordList = new List<FlowNodeInfo>();
            FlowOperation FlowOperationBll = new FlowOperation();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowOperationListByFlowNodeIdAndXuserId", parm))
            {
                while (rdr.Read())
                {
                    FlowNodeInfo record = new FlowNodeInfo();
                    record.Id = Convert.ToInt32(rdr["Id"]);
                    record.Name = rdr["Name"].ToString();
                    record.FlowOperationList = FlowOperationBll.FlowOperationGetListByFlowNodeIdAndFlowId(record.Id, 1);
                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }
        //根据名称验证节点名称是否存在(用于更新)
        public bool FlowNodeIsExistedByNewNameAndOldName(string newName, string oldName)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_OldName, SqlDbType.NVarChar);

            parm[0].Value = newName;
            parm[1].Value = oldName;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proFlwoNodeIsExistedByNewNameAndOldName", parm);
            return obj == null ? false : (bool)obj;
        }
        //根据departmentId 获取部门节点列表
        public IList<FlowNodeInfo> FlowNodeGetListByDepartmentId(int departmentId)
        {
            SqlParameter[] parm = new SqlParameter[1];
            parm[0] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
            parm[0].Value = departmentId;

            IList<FlowNodeInfo> recordList = new List<FlowNodeInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowNodeGetListByDepartmentId", parm))
            {
                while (rdr.Read())
                {
                    FlowNodeInfo record = new FlowNodeInfo();
                    record.Id = Convert.ToInt32(rdr["Id"]);
                    record.Name = rdr["Name"].ToString();
                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }
        #endregion 按条件读取记录结束

        #region  根据XuserId获取用户对应的节点信息
        //根据XuserId获取用户对应的节点Id，节点部门Id,节点部门名称、审批节点Id,审批节点部门Id,审批节点部门名称、审批人员Id,审批人员名称
        //一次性读取全部数据 可以解决操作节点列表、各个操作节点对应的部门列表和人员列表问题 以及下一个审批节点Id问题
        public IList<FlowNodeListInfo> FlowNodeGetDefaulInfoByXuserId(int xuserId)
        {
            SqlParameter[] parm = new SqlParameter[1];
            parm[0] = new SqlParameter(PARM_XuserId, SqlDbType.Int);
            parm[0].Value = xuserId;

            IList<FlowNodeListInfo> FlowNodeLists = new List<FlowNodeListInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowNodeGetDefaulInfoByXuserId", parm))
            {
                while (rdr.Read())
                {
                    FlowNodeListInfo FlowNodeList = new FlowNodeListInfo();
                    FlowNodeList.SubmitFlowNodeId = Convert.ToInt32(rdr["SubmitFlowNodeId"]);
                    FlowNodeList.SubmitDepartmentId = Convert.ToInt32(rdr["SubmitDepartmentId"]);
                    FlowNodeList.SubmitDepartment = rdr["SubmitDepartment"].ToString();
                    FlowNodeList.FlowOperationId = Convert.ToInt32(rdr["FlowOperationId"]);
                    FlowNodeList.FlowOperation = rdr["FlowOperation"].ToString();
                    FlowNodeList.ApprovalFlowNodeId = Convert.IsDBNull(rdr["ApprovalFlowNodeId"]) ? 0 : Convert.ToInt32(rdr["ApprovalFlowNodeId"]);
                    FlowNodeList.ApprovalDepartmentId = Convert.IsDBNull(rdr["ApprovalDepartmentId"]) ? 0 : Convert.ToInt32(rdr["ApprovalDepartmentId"]);
                    FlowNodeList.ApprovalDepartment = rdr["ApprovalDepartment"].ToString();
                    FlowNodeList.ApprovalEmployeeId = Convert.IsDBNull(rdr["ApprovalEmployeeId"]) ? 0 : Convert.ToInt32(rdr["ApprovalEmployeeId"]);
                    FlowNodeList.ApprovalEmployee = rdr["ApprovalEmployee"].ToString();
                    FlowNodeLists.Add(FlowNodeList);
                }
                rdr.Close();
            }
            return FlowNodeLists;
        }
        #endregion 根据XuserId获取用户对应的节点信息

        #region 获取FlowNode的列表

        //获取录入后的信息或最近的N条信息
        public IList<FlowNodeInfo> FlowNodeGetList(string name, int flowId, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            SqlParameter[] parm = new SqlParameter[8];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_FlowId, SqlDbType.Int);

            parm[2] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[4] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[7] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = name;
            parm[1].Value = flowId;

            parm[2].Value = 1;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总
            parm[3].Value = isPaged;
            parm[4].Value = pageNumber;
            parm[5].Value = pageSize;
            parm[6].Value = orderFieldName;
            parm[7].Value = orderType;

            IList<FlowNodeInfo> recordList = new List<FlowNodeInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowNodeGetList", parm))
            {
                while (rdr.Read())
                {
                    FlowNodeInfo record = new FlowNodeInfo();

                    record.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    record.Id = Convert.ToInt32(rdr["Id"]);
                    record.Name = rdr["Name"].ToString();
                    record.FlowId = Convert.ToInt32(rdr["FlowId"]);
                    record.Flow = rdr["Flow"].ToString();
                    record.Memo = rdr["Memo"].ToString();

                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }

        //获取RoleListSum,记录总数和汇总值
        public RecordCountInfo FlowNodeGetListSum(string name,int flowId)
        {
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);

            parm[0].Value = name;
            parm[1].Value = flowId;
            parm[2].Value = 2;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总

            RecordCountInfo record = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowNodeGetList", parm))
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
        #endregion 获取RoleList
    }
}