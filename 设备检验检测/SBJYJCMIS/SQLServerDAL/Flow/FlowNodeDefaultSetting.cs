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
    public class FlowNodeDefaultSetting : IFlowNodeDefaultSetting
    {
        #region 参数
        //参数 
        private const string PARM_Id = "@Id";
        private const string PARM_SubmitFlowNodeId = "@SubmitFlowNodeId";
        private const string PARM_ApprovalFlowNodeId = "@ApprovalFlowNodeId";
        private const string PARM_RoleId = "@RoleId";
        private const string PARM_XuserId = "@XuserId";
        private const string PARM_DepartmentId = "@DepartmentId";
        private const string PARM_EmployeeId = "@EmployeeId";
        private const string PARM_FlowId = "@FlowId";
        private const string PARM_DataStatusId = "@DataStatusId";
        private const string PARM_Memo = "@Memo";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_ModifierId = "@ModifierId";

        private const string PARM_Role = "@Role";
        private const string PARM_Employee = "@Employee";
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
        public bool FlowNodeDefaultSettingInsert(FlowNodeDefaultSettingInfo flowNodeDefaultSetting)
        {
            SqlParameter[] parm = new SqlParameter[7];
            parm[0] = new SqlParameter(PARM_SubmitFlowNodeId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_ApprovalFlowNodeId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_RoleId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_XuserId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[6] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);

            parm[0].Value = flowNodeDefaultSetting.SubmitFlowNodeId;
            parm[1].Value = flowNodeDefaultSetting.ApprovalFlowNodeId;
            parm[2].Value = flowNodeDefaultSetting.RoleId;
            parm[3].Value = flowNodeDefaultSetting.XuserId;
            parm[4].Value = flowNodeDefaultSetting.FlowId;
            parm[5].Value = flowNodeDefaultSetting.Memo;
            parm[6].Value = flowNodeDefaultSetting.CreatorId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowNodeDefaultSettingInsert", parm);
            return (retval > 0) ? true : false;
        }

        //更新记录
        public bool FlowNodeDefaultSettingUpdateById(FlowNodeDefaultSettingInfo flowNodeDefaultSetting)
        {
            SqlParameter[] parm = new SqlParameter[9];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_SubmitFlowNodeId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_ApprovalFlowNodeId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_RoleId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_XuserId, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[7] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[8] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = flowNodeDefaultSetting.Id;
            parm[1].Value = flowNodeDefaultSetting.SubmitFlowNodeId;
            parm[2].Value = flowNodeDefaultSetting.ApprovalFlowNodeId;
            parm[3].Value = flowNodeDefaultSetting.RoleId;
            parm[4].Value = flowNodeDefaultSetting.XuserId;
            parm[5].Value = flowNodeDefaultSetting.FlowId;
            parm[6].Value = flowNodeDefaultSetting.DataStatusId;
            parm[7].Value = flowNodeDefaultSetting.Memo;
            parm[8].Value = flowNodeDefaultSetting.ModifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proFlowNodeDefaultSettingUpdateById", parm);
            return (retval > 0) ? true : false;
        }



        #endregion 数据记录操作（插入、更新、删除）结束

        #region 按条件读取记录

        //检验是否存在用户重名
        public bool FlowNodeDefaultSettingIsExistedByFlowNodeId(int submitFlowNodeId, int approvalFlowNodeId, int flowNodeId)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = new SqlParameter(PARM_SubmitFlowNodeId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_ApprovalFlowNodeId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_FlowId, SqlDbType.Int);

            parm[0].Value = submitFlowNodeId;
            parm[1].Value = approvalFlowNodeId;
            parm[2].Value = flowNodeId;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proFlowNodeDefaultSettingIsExistedByFlowNodeId", parm);
            return (obj == null) ? false : (bool)obj;
        }
        //获取节点默认值
        public IList<FlowNodeDefaultSettingListInfo> GetFlowNodeSettingByFlowNodeIdFlowOperationId(int xuserId, int departmentId, int flowNodeId, int flowOperationId, int approvalFlowNodeId)
        {
            SqlParameter[] parm = new SqlParameter[5];

            parm[0] = new SqlParameter(PARM_XuserId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_SubmitFlowNodeId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_FlowOperationId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_ApprovalFlowNodeId, SqlDbType.Int);


            parm[0].Value = xuserId;
            parm[1].Value = departmentId;
            parm[2].Value = flowNodeId;
            parm[3].Value = flowOperationId;
            parm[4].Value = approvalFlowNodeId;

            IList<FlowNodeDefaultSettingListInfo> FlowNodeDefaultSettingLists = new List<FlowNodeDefaultSettingListInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proGetFlowNodeSettingByFlowNodeIdFlowOperationId", parm))
            {
                while (rdr.Read())
                {
                    FlowNodeDefaultSettingListInfo FlowNodeDefaultSettingList = new FlowNodeDefaultSettingListInfo();
                    FlowNodeDefaultSettingList.DepartmentId = Convert.IsDBNull(rdr["DepartmentId"]) ? 0 : Convert.ToInt32(rdr["DepartmentId"]);
                    FlowNodeDefaultSettingList.Department = rdr["Department"].ToString();
                    FlowNodeDefaultSettingList.EmployeeId = Convert.IsDBNull(rdr["EmployeeId"]) ? 0 : Convert.ToInt32(rdr["EmployeeId"]);
                    FlowNodeDefaultSettingList.Employee = rdr["Employee"].ToString();
                    FlowNodeDefaultSettingList.ApprovalFlowNodeId = Convert.IsDBNull(rdr["ApprovalFlowNodeId"]) ? 0 : Convert.ToInt32(rdr["ApprovalFlowNodeId"]);
                    FlowNodeDefaultSettingLists.Add(FlowNodeDefaultSettingList);
                }
                rdr.Close();
            }
            return FlowNodeDefaultSettingLists;
        }
        //获取节点默认值
        public IList<FlowNodeDefaultSettingListInfo> GetHiddenReportByXuserIdAndFlowOperationId(int xuserId, int departmentId, int flowOperationId, int approvalFlowNodeId)
        {
            SqlParameter[] parm = new SqlParameter[4];

            parm[0] = new SqlParameter(PARM_XuserId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_FlowOperationId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_ApprovalFlowNodeId, SqlDbType.Int);

            parm[0].Value = xuserId;
            parm[1].Value = departmentId;
            parm[2].Value = flowOperationId;
            parm[3].Value = approvalFlowNodeId;

            IList<FlowNodeDefaultSettingListInfo> FlowNodeDefaultSettingLists = new List<FlowNodeDefaultSettingListInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proGetHiddenReportByXuserIdAndFlowOperationId", parm))
            {
                while (rdr.Read())
                {
                    FlowNodeDefaultSettingListInfo FlowNodeDefaultSettingList = new FlowNodeDefaultSettingListInfo();
                    FlowNodeDefaultSettingList.DepartmentId = Convert.ToInt32(rdr["DepartmentId"]);
                    FlowNodeDefaultSettingList.Department = rdr["Department"].ToString();
                    FlowNodeDefaultSettingList.EmployeeId = Convert.IsDBNull(rdr["EmployeeId"]) ? 0 : Convert.ToInt32(rdr["EmployeeId"]);
                    FlowNodeDefaultSettingList.Employee = rdr["Employee"].ToString();
                    FlowNodeDefaultSettingList.ApprovalFlowNodeId = Convert.IsDBNull(rdr["ApprovalFlowNodeId"]) ? 0 : Convert.ToInt32(rdr["ApprovalFlowNodeId"]);
                    FlowNodeDefaultSettingLists.Add(FlowNodeDefaultSettingList);
                }
                rdr.Close();
            }
            return FlowNodeDefaultSettingLists;
        }

        #endregion 按条件读取记录结束

        #region 获取FlowNodeDefaultSetting的列表
        //获取FlowNodeRole的列表
        public IList<FlowNodeDefaultSettingListInfo> FlowNodeDefaultSettingGetList(int flowId, int submitFlowNodeId, int approvalFlowNodeId, int departmentId, string role, string employee, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            SqlParameter[] parm = new SqlParameter[12];

            parm[0] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_SubmitFlowNodeId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_ApprovalFlowNodeId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_Role, SqlDbType.NVarChar);
            parm[5] = new SqlParameter(PARM_Employee, SqlDbType.NVarChar);

            parm[6] = new SqlParameter(PARM_IsRecordSet, SqlDbType.Int);
            parm[7] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[8] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[9] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[10] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[11] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = flowId;
            parm[1].Value = submitFlowNodeId;
            parm[2].Value = approvalFlowNodeId;
            parm[3].Value = departmentId;
            parm[4].Value = role;
            parm[5].Value = employee;

            parm[6].Value = 1;              //结果集还是统计记录数；1：结果集
            parm[7].Value = isPaged;
            parm[8].Value = pageNumber;
            parm[9].Value = pageSize;
            parm[10].Value = orderFieldName;
            parm[11].Value = orderType;

            IList<FlowNodeDefaultSettingListInfo> FlowNodeDefaultSettingLists = new List<FlowNodeDefaultSettingListInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowNodeDefaultSettingGetList", parm))
            {
                while (rdr.Read())
                {
                    FlowNodeDefaultSettingListInfo FlowNodeDefaultSettingList = new FlowNodeDefaultSettingListInfo();
                    FlowNodeDefaultSettingList.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    FlowNodeDefaultSettingList.Id = Convert.ToInt32(rdr["Id"]);
                    FlowNodeDefaultSettingList.SubmitFlowNodeId = Convert.ToInt32(rdr["SubmitFlowNodeId"]);
                    FlowNodeDefaultSettingList.SubmitFlowNode = rdr["SubmitFlowNode"].ToString();
                    FlowNodeDefaultSettingList.ApprovalFlowNodeId = Convert.ToInt32(rdr["ApprovalFlowNodeId"]);
                    FlowNodeDefaultSettingList.ApprovalFlowNode = rdr["ApprovalFlowNode"].ToString();
                    FlowNodeDefaultSettingList.RoleId = Convert.ToInt32(rdr["RoleId"]);
                    FlowNodeDefaultSettingList.Role = rdr["Role"].ToString();
                    FlowNodeDefaultSettingList.XuserId = Convert.ToInt32(rdr["XuserId"]);
                    FlowNodeDefaultSettingList.DepartmentId = Convert.ToInt32(rdr["DepartmentId"]);
                    FlowNodeDefaultSettingList.Department = rdr["Department"].ToString();
                    FlowNodeDefaultSettingList.EmployeeId = Convert.ToInt32(rdr["EmployeeId"]);
                    FlowNodeDefaultSettingList.Employee = rdr["Employee"].ToString();
                    FlowNodeDefaultSettingList.FlowId = Convert.ToInt32(rdr["FlowId"]);
                    FlowNodeDefaultSettingList.Flow = rdr["Flow"].ToString();
                    FlowNodeDefaultSettingList.Memo = rdr["Memo"].ToString();
                    FlowNodeDefaultSettingLists.Add(FlowNodeDefaultSettingList);
                }
                rdr.Close();
            }
            return FlowNodeDefaultSettingLists;
        }

        //获取汇总统计
        public RecordCountInfo FlowNodeDefaultSettingGetRecordCount(int flowId, int submitFlowNodeId, int approvalFlowNodeId, int departmentId, string role, string employee)
        {
            SqlParameter[] parm = new SqlParameter[12];

            parm[0] = new SqlParameter(PARM_FlowId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_SubmitFlowNodeId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_ApprovalFlowNodeId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_Role, SqlDbType.NVarChar);
            parm[5] = new SqlParameter(PARM_Employee, SqlDbType.NVarChar);

            parm[6] = new SqlParameter(PARM_IsRecordSet, SqlDbType.Int);
            parm[7] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[8] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[9] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[10] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[11] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = flowId;
            parm[1].Value = submitFlowNodeId;
            parm[2].Value = approvalFlowNodeId;
            parm[3].Value = departmentId;
            parm[4].Value = role;
            parm[5].Value = employee;

            parm[6].Value = 0;              //结果集还是统计记录数；0：数值字段汇总
            parm[7].Value = 0;
            parm[8].Value = 0;
            parm[9].Value = 0;
            parm[10].Value = null;
            parm[11].Value = null;

            RecordCountInfo RecordCountInfo = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proFlowNodeDefaultSettingGetList", parm))
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