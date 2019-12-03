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
    public class RolePermission:IRolePermission
    {
        #region 参数
        //参数        
        private const string PARM_Id = "@Id";
        private const string PARM_XuserId = "@XuserId";
        private const string PARM_RoleId = "@RoleId";
        private const string PARM_OperationId = "@OperationId";
        private const string PARM_ResourceId = "@ResourceId";
        private const string PARM_Memo = "@Memo";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_ModifierId = "@ModifierId";

        private const string PARM_DepartmentId = "@DepartmentId";
        private const string PARM_IsIncludingChildren = "@IsIncludingChildren";
        private const string PARM_Permissable = "@Permissable";

        private const string PARM_ResourceTypeId = "@ResourceTypeId";
        private const string PARM_ResourceName = "@ResourceName";
        private const string PARM_XMenuId = "@XMenuId";
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
        public bool RolePermissionOperate(RolePermissionInfo rp)
        {
            SqlParameter[] parm = new SqlParameter[6];

            parm[0] = new SqlParameter(PARM_RoleId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_OperationId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_ResourceId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_Permissable, SqlDbType.Bit);
            parm[4] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[5] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);

            parm[0].Value = rp.RoleId; 
            parm[1].Value = rp.OperationId;
            parm[2].Value = rp.ResourceId;
            parm[3].Value = rp.Permissable;
            parm[4].Value = rp.Memo;
            parm[5].Value = rp.CreatorId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proRolePermissionOperate", parm);
            return (retval > 0) ? true : false;
        }  
        #endregion 数据记录操作（插入、更新、删除）结束
        
        #region 获取权限中角色可配置的操作权限列表 

        //根据ResourceID获取RolePermission中的Operation列表
        public IList<RolePermissionOperationListInfo> RolePermissionGetOperationList(int roleId, int resourceId)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_RoleId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_ResourceId, SqlDbType.Int);

            parm[0].Value = roleId;
            parm[1].Value = resourceId;

            //根据参数获取数据
            IList<RolePermissionOperationListInfo> recordList = new List<RolePermissionOperationListInfo>();

            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proRolePermissionGetOperationList", parm))
            {
                while (rdr.Read())
                {
                    RolePermissionOperationListInfo record = new RolePermissionOperationListInfo();

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
        
        #region RoleDepartment数据记录操作（插入、更新、删除）
        //插入新记录
        public bool RoleDepartmentOperate(RoleDepartmentInfo rd)
        {
            SqlParameter[] parm = new SqlParameter[5];

            parm[0] = new SqlParameter(PARM_RoleId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_Permissable, SqlDbType.Bit);
            parm[3] = new SqlParameter(PARM_IsIncludingChildren, SqlDbType.Bit);
            parm[4] = new SqlParameter(PARM_XuserId, SqlDbType.Int);

            parm[0].Value = rd.RoleId;
            parm[1].Value = rd.DepartmentId;
            parm[2].Value = rd.Permissable;
            parm[3].Value = rd.IsIncludingChildren;
            parm[4].Value = rd.CreatorId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proRoleDepartmentOperate", parm);
            return (retval > 0) ? true : false;
        }
        #endregion RoleDepartment数据记录操作（插入、更新、删除）结束

    }
}