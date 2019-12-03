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
    public class GroupRole:IGroupRole
    {
        #region 参数
        //参数        
        private const string PARM_Id = "@Id";
        private const string PARM_Name = "@Name";
        private const string PARM_DataStatusId = "@DataStatusId";
        private const string PARM_Memo = "@Memo";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_ModifierId = "@ModifierId";

        //扩展参数 
        private const string PARM_GroupId = "@GroupId";
        private const string PARM_RoleId = "@RoleId";
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
        public bool GroupRoleInsert(GroupRoleInfo GroupRole)
        {
            SqlParameter[] parm = new SqlParameter[4];

            parm[0] = new SqlParameter(PARM_GroupId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_RoleId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[3] = new SqlParameter(PARM_CreatorId,SqlDbType.Int);

            parm[0].Value = GroupRole.GroupId;
            parm[1].Value = GroupRole.RoleId;
            parm[2].Value = GroupRole.Memo;
            parm[3].Value = GroupRole.CreatorId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proGroupRoleInsert", parm);
            return (retval > 0) ? true : false;
        }
                 
        //删除记录
        public bool GroupRoleDelete(int groupId, int roleId)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_GroupId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_RoleId, SqlDbType.Int);

            parm[0].Value = groupId;
            parm[1].Value = roleId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proGroupRoleDelete", parm);
            return (retval > 0) ? true : false;
        }
        #endregion 数据记录操作（插入、更新、删除）结束

        #region 验证
        //验证用户是否存在
        public bool GroupRoleIsExisted(int groupId, int roleId)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_GroupId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_RoleId, SqlDbType.Int);

            parm[0].Value = groupId;
            parm[1].Value = roleId;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proGroupRoleIsExisted", parm);
            return obj == null ? false : (bool)obj;
        }
        #endregion 验证

        #region 获取GroupRoleList
        //获取用户列表：用于为组指派用户
        public IList<GroupRoleListInfo> GroupRoleGetList(string name, int roleId, int assignType, bool isPaged, int pageNumber, int pageSize, 
                                                         string orderFieldName, string orderType)
        {
            SqlParameter[] parm = new SqlParameter[9];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.VarChar);
            parm[1] = new SqlParameter(PARM_RoleId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_AssignType, SqlDbType.Int);

            parm[3] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[5] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[7] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[8] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = name;
            parm[1].Value = roleId;
            parm[2].Value = assignType;

            parm[3].Value = 1;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总
            parm[4].Value = isPaged;
            parm[5].Value = pageNumber;
            parm[6].Value = pageSize;
            parm[7].Value = orderFieldName;
            parm[8].Value = orderType;

            IList<GroupRoleListInfo> recordList = new List<GroupRoleListInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proGroupRoleGetList", parm))
            {
                while (rdr.Read())
                {
                    GroupRoleListInfo record = new GroupRoleListInfo();

                    record.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    record.GroupId = Convert.ToInt32(rdr["GroupId"]);
                    record.GroupName = rdr["GroupName"].ToString();
                    record.Memo = rdr["Memo"].ToString();
                    record.RoleId = Convert.IsDBNull(rdr["RoleId"]) ? 0 : Convert.ToInt32(rdr["RoleId"]);
                    record.RoleName = rdr["RoleName"].ToString();
                    record.IsAssigned = Convert.ToBoolean(rdr["IsAssigned"]);

                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }
                                                   
        //获取用户列表记录数：用于为组指派用户
        public RecordCountInfo GroupRoleGetListSum(string name,  int roleId, int assignType)
        {
            SqlParameter[] parm = new SqlParameter[4];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.VarChar);
            parm[1] = new SqlParameter(PARM_RoleId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_AssignType, SqlDbType.Int);

            parm[3] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);

            parm[0].Value = name;
            parm[1].Value = roleId;
            parm[2].Value = assignType;

            parm[3].Value = 2;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总

            RecordCountInfo record = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proGroupRoleGetList", parm))
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
        #endregion 获取GroupRoleList
    }
}