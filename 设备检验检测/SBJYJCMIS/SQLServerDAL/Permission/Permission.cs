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
    public class Permission:IPermission
    {
        #region 参数
        //参数        
        private const string PARM_Id = "@Id";
        private const string PARM_XuserId = "@XuserId";
        private const string PARM_OperationId = "@OperationId";
        private const string PARM_ResourceId = "@ResourceId";
        private const string PARM_Memo = "@Memo";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_ModifierId = "@ModifierId";

        //扩展参数
        private const string PARM_Permissable = "@Permissable";
        private const string PARM_ResourceTypeId = "@ResourceTypeId";
        private const string PARM_ResourceName = "@ResourceName";
        private const string PARM_DepartmentName = "@DepartmentName";
        private const string PARM_Name = "@Name";
        private const string PARM_PermissionType = "@PermissionType";
        private const string PARM_RoleId = "@RoleId";
        private const string PARM_XmenuId = "@XmenuId";
        private const string PARM_AssignType = "@AssignType";

        private const string PARM_RecordSetType = "@RecordSetType";
        private const string PARM_IsPaged = "@IsPaged";
        private const string PARM_PageNumber = "@PageNumber";
        private const string PARM_PageSize = "@PageSize";
        private const string PARM_OrderFieldName = "@OrderFieldName";
        private const string PARM_OrderType = "@OrderType";

        #endregion 参数结束

        #region 数据记录操作（插入、更新、删除）
        //插入新记录
        public bool PermissionInsert(PermissionInfo Permission)
        {
            SqlParameter[] parm = new SqlParameter[5];

            parm[0] = new SqlParameter(PARM_OperationId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_ResourceId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_Permissable, SqlDbType.Bit);
            parm[3] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[4] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);

            parm[0].Value = Permission.OperationId;
            parm[1].Value = Permission.ResourceId;
            parm[2].Value = Permission.Permissable;
            parm[3].Value = Permission.Memo;
            parm[4].Value = Permission.CreatorId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proPermissionInsert", parm);
            return (retval > 0) ? true : false;
        }
       
        /// <summary>
        /// 根据ID删除一条记录
        /// </summary>
        public bool PermissionDeleteById(int id)
        {
            SqlParameter parm = new SqlParameter(PARM_Id, SqlDbType.Int);

            //Bind the parameter
            parm.Value = id;
            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proPermissionDeleteById", parm);
            return (retval > 0) ? true : false;
        }

        /// <summary>
        /// 根据OperationID和ResourceID删除一条记录
        /// </summary>
        public bool PermissionDeleteByOperationIdAndResourceId(int operationId, int resourceId)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_OperationId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_ResourceId, SqlDbType.Int);

            parm[0].Value = operationId;
            parm[1].Value = resourceId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proPermissionDeleteByOperationIdAndResourceId", parm);
            return (retval > 0) ? true : false;
        }
        #endregion 数据记录操作（插入、更新、删除）结束
        
        #region 获取资源可配置的操作权限列表 

        //根据ResourceID获取Permission中的Operation列表
        public IList<PermissionOperationListInfo> PermissionGetOperationListByResourceId(int resourceId, int permissionType)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_ResourceId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_PermissionType, SqlDbType.Int);

            parm[0].Value = resourceId;
            parm[1].Value = permissionType;

            //根据参数获取数据
            IList<PermissionOperationListInfo> recordList = new List<PermissionOperationListInfo>();

            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proPermissionGetOperationListByResourceId", parm))
            {
                while (rdr.Read())
                {
                    PermissionOperationListInfo record = new PermissionOperationListInfo();

                    record.OperationId = Convert.ToInt32(rdr["OperationId"]);
                    record.Operation = rdr["Operation"].ToString();
                    record.Permissable = Convert.ToBoolean(rdr["Permissable"]);

                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }

        #endregion 按条件读取记录结束
        
        #region 获取PermissionList：用于设置角色可配置权限

        //获取录入后的信息或最近的N条信息
        public IList<PermissionRolePermissionListInfo> PermissionGetRolePermissionList(int roleId, int xmenuId, int assignType, int resourceTypeId, string resourceName,
                                                                                       bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            SqlParameter[] parm = new SqlParameter[11];

            parm[0] = new SqlParameter(PARM_RoleId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_XmenuId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_AssignType, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_ResourceTypeId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_ResourceName, SqlDbType.NVarChar);

            parm[5] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[7] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[8] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[9] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[10] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = roleId;
            parm[1].Value = xmenuId;
            parm[2].Value = assignType;
            parm[3].Value = resourceTypeId;
            parm[4].Value = resourceName;

            parm[5].Value = 1;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总
            parm[6].Value = isPaged;
            parm[7].Value = pageNumber;
            parm[8].Value = pageSize;
            parm[9].Value = orderFieldName;
            parm[10].Value = orderType;

            IList<PermissionRolePermissionListInfo> recordList = new List<PermissionRolePermissionListInfo>();
            RolePermission rpBll = new RolePermission();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proPermissionGetRolePermissionList", parm))
            {
                while (rdr.Read())
                {
                    PermissionRolePermissionListInfo record = new PermissionRolePermissionListInfo();

                    record.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    record.ResourceId = Convert.ToInt32(rdr["ResourceId"]);
                    record.Resource = rdr["Resource"].ToString();
                    record.ResourceTypeId = Convert.IsDBNull(rdr["ResourceTypeId"]) ? 0 : Convert.ToInt32(rdr["ResourceTypeId"]);
                    record.ResourceType = rdr["ResourceType"].ToString();
                    record.RolePermissionOperationList = rpBll.RolePermissionGetOperationList(roleId, record.ResourceId);

                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }

        //获取ResourceListSum,记录总数和汇总值
        public RecordCountInfo PermissionGetRolePermissionListSum(int roleId, int xmenuId, int assignType, int resourceTypeId, string resourceName)
        {
            SqlParameter[] parm = new SqlParameter[6];

            parm[0] = new SqlParameter(PARM_RoleId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_XmenuId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_AssignType, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_ResourceTypeId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_ResourceName, SqlDbType.NVarChar);

            parm[5] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);

            parm[0].Value = roleId;
            parm[1].Value = xmenuId;
            parm[2].Value = assignType;
            parm[3].Value = resourceTypeId;
            parm[4].Value = resourceName;
            parm[5].Value = 2;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总

            RecordCountInfo record = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proPermissionGetRolePermissionList", parm))
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
        #endregion 获取PermissionList：用于设置角色可配置权限
        
        #region 获取RoleDepartmentList：用于设置角色可配置的部门权限

        //获取RoleDepartmentList列表
        public IList<PermissionRoleDepartmentListInfo> PermissionGetRoleDepartmentList(int roleId, string departmentName, int assignType,
                                                                                bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            SqlParameter[] parm = new SqlParameter[9];

            parm[0] = new SqlParameter(PARM_RoleId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_DepartmentName, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_AssignType, SqlDbType.Int);

            parm[3] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[5] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[7] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[8] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = roleId;
            parm[1].Value = departmentName;
            parm[2].Value = assignType;

            parm[3].Value = 1;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总
            parm[4].Value = isPaged;
            parm[5].Value = pageNumber;
            parm[6].Value = pageSize;
            parm[7].Value = orderFieldName;
            parm[8].Value = orderType;

            IList<PermissionRoleDepartmentListInfo> recordList = new List<PermissionRoleDepartmentListInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proPermissionGetRoleDepartmentList", parm))
            {
                while (rdr.Read())
                {
                    PermissionRoleDepartmentListInfo record = new PermissionRoleDepartmentListInfo();

                    record.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    record.DepartmentId = Convert.ToInt32(rdr["DepartmentId"]);
                    record.Department = rdr["Department"].ToString();
                    record.RoleId = Convert.IsDBNull(rdr["RoleId"]) ? 0 : Convert.ToInt32(rdr["RoleId"]);
                    record.IsIncludingChildren = Convert.IsDBNull(rdr["IsIncludingChildren"]) ? false : Convert.ToBoolean(rdr["IsIncludingChildren"]);
                    record.Permissable = Convert.IsDBNull(rdr["Permissable"]) ? false : Convert.ToBoolean(rdr["Permissable"]);
                    record.AssignType = Convert.ToInt32(rdr["AssignType"]);

                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }

        //获取RoleDepartmentListSum,记录总数和汇总值
        public RecordCountInfo PermissionGetRoleDepartmentListSum(int roleId, string departmentName, int assignType)
        {
            SqlParameter[] parm = new SqlParameter[4];

            parm[0] = new SqlParameter(PARM_RoleId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_DepartmentName, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_AssignType, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);

            parm[0].Value = roleId;
            parm[1].Value = departmentName;
            parm[2].Value = assignType;
            parm[3].Value = 2;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总

            RecordCountInfo record = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proPermissionGetRoleDepartmentList", parm))
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
        #endregion 获取RoleDepartmentLis：用于设置角色可配置权限

        #region 按条件读取记录
        //获取Permission列表，用于列表控件的数据源绑定
        public IList<PermissionListInfo> PermissionGetListByXuserIdOperationIdResourceIdResourceTypeId(int xuserId, int operationId, int resourceId, int resourceTypeId)
        {
            //定义并传递参数数组
            SqlParameter[] parm = new SqlParameter[4];

            parm[0] = new SqlParameter(PARM_XuserId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_OperationId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_ResourceId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_ResourceTypeId, SqlDbType.Int);

            parm[0].Value = xuserId;
            parm[1].Value = operationId;
            parm[2].Value = resourceId;
            parm[3].Value = resourceTypeId;

            //根据参数获取数据
            IList<PermissionListInfo> recordList = new List<PermissionListInfo>();

            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proPermissionGetListByXuserIdOperationIdResourceIdResourceTypeId", parm))
            {
                while (rdr.Read())
                {
                    PermissionListInfo record = new PermissionListInfo();

                    record.Id = Convert.ToInt32(rdr["Id"]);
                    record.OperationId = Convert.ToInt32(rdr["OperationId"]);
                    record.ResourceId = Convert.ToInt32(rdr["ResourceId"]);

                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }
        #endregion 按条件读取记录

        #region 移动端App相关

        //获取用户AppMenu及其对应页面的访问权限
        public IList<AppMenuPermissionListInfo> AppMenuGetPermissionList(int xuserId)
        {
            //定义并传递参数数组
            SqlParameter parm = new SqlParameter(PARM_XuserId, SqlDbType.Int);

            //Bind the parameter
            parm.Value = xuserId;

            //根据参数获取数据
            IList<AppMenuPermissionListInfo> recordList = new List<AppMenuPermissionListInfo>();

            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proAppMenuGetPermissionList", parm))
            {
                while (rdr.Read())
                {
                    AppMenuPermissionListInfo record = new AppMenuPermissionListInfo();

                    record.ResourceId = Convert.ToInt32(rdr["ResourceId"]);
                    record.Name = rdr["Name"].ToString();
                    record.JianPin = rdr["JianPin"].ToString();
                    record.OperationId = Convert.IsDBNull(rdr["OperationId"]) ? 0 : Convert.ToInt32(rdr["OperationId"]);
                    record.Permission = Convert.ToBoolean(rdr["Permission"]);

                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }
        #endregion 移动端App相关
    }
}