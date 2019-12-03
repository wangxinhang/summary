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
    public class XuserGroup:IXuserGroup
    {
        #region 参数
        //参数        
        private const string PARM_Id = "@Id";
        private const string PARM_Name = "@Name";
        private const string PARM_NameCN = "@NameCN";
        private const string PARM_DepartmentId = "@DepartmentId";
        private const string PARM_EmployeeId = "@EmployeeId";
        private const string PARM_DataStatusId = "@DataStatusId";
        private const string PARM_Memo = "@Memo";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_ModifierId = "@ModifierId";

        //扩展参数 
        private const string PARM_XuserId = "@XuserId";
        private const string PARM_GroupId = "@GroupId";
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
        public bool XuserGroupInsert(XuserGroupInfo XuserGroup)
        {
            SqlParameter[] parm = new SqlParameter[4];

            parm[0] = new SqlParameter(PARM_XuserId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_GroupId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[3] = new SqlParameter(PARM_CreatorId,SqlDbType.Int);

            parm[0].Value = XuserGroup.XuserId;
            parm[1].Value = XuserGroup.GroupId;
            parm[2].Value = XuserGroup.Memo;
            parm[3].Value = XuserGroup.CreatorId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proXuserGroupInsert", parm);
            return (retval > 0) ? true : false;
        }
                 
        //删除记录
        public bool XuserGroupDelete(int xuserId, int groupId)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_XuserId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_GroupId, SqlDbType.Int);

            parm[0].Value = xuserId;
            parm[1].Value = groupId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proXuserGroupDelete", parm);
            return (retval > 0) ? true : false;
        }
        #endregion 数据记录操作（插入、更新、删除）结束

        #region 验证
        //验证用户是否存在
        public bool XuserGroupIsExisted(int xuserId, int groupId)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_XuserId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_GroupId, SqlDbType.Int);

            parm[0].Value = xuserId;
            parm[1].Value = groupId;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proXuserGroupIsExisted", parm);
            return obj == null ? false : (bool)obj;
        }
        #endregion 验证

        #region 获取XuserGroupList
        //获取用户列表：用于为组指派用户
        public IList<XuserGroupListInfo> XuserGroupGetList(string name, string nameCN, int departmentId, int groupId, int assignType, bool isPaged, int pageNumber, int pageSize,
                                                                             string orderFieldName, string orderType)
        {
            SqlParameter[] parm = new SqlParameter[11];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.VarChar);
            parm[1] = new SqlParameter(PARM_NameCN, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_GroupId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_AssignType, SqlDbType.Int);

            parm[5] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[7] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[8] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[9] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[10] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = name;
            parm[1].Value = nameCN;
            parm[2].Value = departmentId;
            parm[3].Value = groupId;
            parm[4].Value = assignType;

            parm[5].Value = 1;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总
            parm[6].Value = isPaged;
            parm[7].Value = pageNumber;
            parm[8].Value = pageSize;
            parm[9].Value = orderFieldName;
            parm[10].Value = orderType;

            IList<XuserGroupListInfo> recordList = new List<XuserGroupListInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proXuserGroupGetList", parm))
            {
                while (rdr.Read())
                {
                    XuserGroupListInfo record = new XuserGroupListInfo();

                    record.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    record.XuserId = Convert.ToInt32(rdr["XuserId"]);
                    record.XuserName = rdr["XuserName"].ToString();
                    record.XuserNameCN = rdr["XuserNameCN"].ToString();
                    record.DepartmentId = Convert.IsDBNull(rdr["DepartmentId"]) ? 0 : Convert.ToInt32(rdr["DepartmentId"]);
                    record.Department = rdr["Department"].ToString();
                    //record.EmployeeId = Convert.IsDBNull(rdr["EmployeeId"]) ? 0 : Convert.ToInt32(rdr["EmployeeId"]);
                    record.Memo = rdr["Memo"].ToString();
                    record.GroupId = Convert.IsDBNull(rdr["GroupId"]) ? 0 : Convert.ToInt32(rdr["GroupId"]);
                    record.GroupName = rdr["GroupName"].ToString();
                    record.IsAssigned = Convert.ToBoolean(rdr["IsAssigned"]);

                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }
                                                   
        //获取用户列表记录数：用于为组指派用户
        public XuserGroupSumInfo XuserGroupGetListSum(string name, string nameCN, int departmentId, int groupId, int assignType)
        {
            SqlParameter[] parm = new SqlParameter[6];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.VarChar);
            parm[1] = new SqlParameter(PARM_NameCN, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_GroupId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_AssignType, SqlDbType.Int);

            parm[5] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);

            parm[0].Value = name;
            parm[1].Value = nameCN;
            parm[2].Value = departmentId;
            parm[3].Value = groupId;
            parm[4].Value = assignType;

            parm[5].Value = 2;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总

            XuserGroupSumInfo record = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proXuserGroupGetList", parm))
            {
                while (rdr.Read())
                {
                    record = new XuserGroupSumInfo();
                    record.RecordCount = Convert.IsDBNull(rdr["RecordCount"]) ? 0 : Convert.ToInt32(rdr["RecordCount"]);
                }
                rdr.Close();
            }
            return record;
        }
        #endregion 获取XuserGroupList
    }
}