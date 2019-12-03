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
    public class Role:IRole
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
        private const string PARM_XuserId = "@XuserId";
        private const string PARM_RecordSetType = "@RecordSetType";
        private const string PARM_IsPaged = "@IsPaged";
        private const string PARM_PageNumber = "@PageNumber";
        private const string PARM_PageSize = "@PageSize";
        private const string PARM_OrderFieldName = "@OrderFieldName";
        private const string PARM_OrderType = "@OrderType";

        #endregion 参数结束

        #region 数据记录操作（插入、更新、删除）
        //插入新记录
        public bool RoleInsert(RoleInfo Role)
        {
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);

            parm[0].Value = Role.Name;
            parm[1].Value = Role.Memo;
            parm[2].Value = Role.CreatorId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proRoleInsert", parm);
            return (retval > 0) ? true : false;
        }

        //根据RoleId删除记录
        public bool RoleDeleteTranById(int id)
        {
            SqlParameter parm = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm.Value = id;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proRoleDeleteTranById", parm);
            return (retval > 0) ? true : false;
        }

        //更新记录
        public bool RoleUpdateById(RoleInfo Role)
        {
            SqlParameter[] parm = new SqlParameter[5];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[4] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = Role.Id;
            parm[1].Value = Role.Name;
            parm[2].Value = Role.DataStatusId;
            parm[3].Value = Role.Memo;
            parm[4].Value = Role.ModifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proRoleUpdateById", parm);
            return (retval > 0) ? true : false;
        }
        #endregion 数据记录操作（插入、更新、删除）结束

        #region 根据条件获取结果
        //验证是否存在
        public bool RoleIsExistedByName(string name)
        {
            SqlParameter parm = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm.Value = name;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proRoleIsExistedByName", parm);
            return obj == null ? false : (bool)obj;
        }
        #endregion 按条件读取记录结束

        #region 获取RoleList

        //获取录入后的信息或最近的N条信息
        public IList<RoleListInfo> RoleGetList(string name, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            SqlParameter[] parm = new SqlParameter[7];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);

            parm[1] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[3] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[6] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = name;

            parm[1].Value = 1;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总
            parm[2].Value = isPaged;
            parm[3].Value = pageNumber;
            parm[4].Value = pageSize;
            parm[5].Value = orderFieldName;
            parm[6].Value = orderType;

            IList<RoleListInfo> recordList = new List<RoleListInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proRoleGetList", parm))
            {
                while (rdr.Read())
                {
                    RoleListInfo record = new RoleListInfo();

                    record.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    record.Id = Convert.ToInt32(rdr["Id"]);
                    record.Name = rdr["Name"].ToString();
                    record.IsLocked = (bool)rdr["IsLocked"];
                    record.Memo = rdr["Memo"].ToString();

                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }

        //获取RoleListSum,记录总数和汇总值
        public RecordCountInfo RoleGetListSum(string name)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);

            parm[0].Value = name;
            parm[1].Value = 2;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总

            RecordCountInfo record = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proRoleGetList", parm))
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