using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;
using SBJYJCMIS.DBUtility;
using SBJYJCMIS.IDAL;
using System.Data;
using System.Data.SqlClient;

namespace SBJYJCMIS.SQLServerDAL
{
    public class EmployeeStatusDao : IEmployeeStatusDao
    {
        #region 参数

        private const string PARM_Id = "@Id";
        private const string PARM_Name = "@Name";
        private const string PARM_Memo = "@Memo";
        private const string PARM_DataStatusId = "@DataStatusId";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_DateCreated = "@DateCreated";
        private const string PARM_ModifierId = "@ModifierId";
        private const string PARM_DateModified = "@DateModified";

        //扩展参数
        private const string PARM_TopN = "@TopN";
        private const string PARM_QueryCategory = "@QueryCategory";
        private const string PARM_RecordSetType = "@RecordSetType";
        private const string PARM_IsPaged = "@IsPaged";
        private const string PARM_PageNumber = "@PageNumber";
        private const string PARM_PageSize = "@PageSize";
        private const string PARM_OrderFieldName = "@OrderFieldName";
        private const string PARM_OrderType = "@OrderType";

        private const string PARM_OldName = "@OldName";

        #endregion

        #region 增删改

        //插入EmployeeStatus新纪录
        public bool InsertEmployeeStatus(EmployeeStatusInfo EmployeeStatus)
        {
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar, 20);
            parm[1] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar, 256);
            parm[2] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);

            //给参数附值
            parm[0].Value = EmployeeStatus.Name;
            parm[1].Value = EmployeeStatus.Memo;
            parm[2].Value = EmployeeStatus.CreatorId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proEmployeeStatusInsert", parm);
            return (retval > 0) ? true : false;
        }

        //更新记录
        public bool UpdateEmployeeStatus(EmployeeStatusInfo EmployeeStatus)
        {
            SqlParameter[] parm = new SqlParameter[4];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_Name, SqlDbType.NVarChar, 20);
            parm[2] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar, 256);
            parm[3] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = EmployeeStatus.Id;
            parm[1].Value = EmployeeStatus.Name;
            parm[2].Value = EmployeeStatus.Memo;
            parm[3].Value = EmployeeStatus.ModifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proEmployeeStatusUpdateById", parm);
            return (retval > 0) ? true : false;
        }

        //根据Id删除记录
        public bool DeleteEmployeeStatus(EmployeeStatusInfo EmployeeStatus)
        {
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = EmployeeStatus.Id;
            parm[1].Value = EmployeeStatus.DataStatusId;
            parm[2].Value = EmployeeStatus.ModifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proEmployeeStatusUpdateDataStatusIdById", parm);
            return (retval > 0) ? true : false;
        }

        #endregion

        #region 是否存在判断
        public bool IsExistedByName(string name)
        {
            SqlParameter parm = new SqlParameter(PARM_Name, SqlDbType.VarChar);
            parm.Value = name;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proEmployeeStatusIsExistedByName", parm);
            return obj == null ? false : (bool)obj;
        }

        //根据名称验证人员状态名称是否存在(排除原来人员状态名称，用于更新)
        public bool IsExistedByNewNameAndOldName(string newName, string oldName)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_OldName, SqlDbType.NVarChar);

            parm[0].Value = newName;
            parm[1].Value = oldName;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proEmployeeStatusIsExistedByNewNameAndOldName", parm);
            return obj == null ? false : (bool)obj;
        }
        //根据名称验证人员状态是否存在


        #endregion

        #region 综合查询
        //获取人员状态集合
        public IList<EmployeeStatusInfo> GetEmployeeStatusNameList()
        {
            IList<EmployeeStatusInfo> EmployeeStatuss = new List<EmployeeStatusInfo>();
            using (
                     SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proEmployeeStatusGetNameList"))
            {
                while (rdr.Read())
                {
                    EmployeeStatusInfo EmployeeStatus = new EmployeeStatusInfo();
                    EmployeeStatus.Id = Convert.ToInt32(rdr["Id"]);
                    EmployeeStatus.Name = rdr["Name"].ToString();
                    EmployeeStatuss.Add(EmployeeStatus);
                }
                rdr.Close();
            }
            return EmployeeStatuss;
        }
        //根据条件获取EmployeeStatusGetList信息
        public IList<EmployeeStatusListInfo> GetEmployeeStatusList(string name, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            IList<EmployeeStatusListInfo> EmployeeStatusLists = new List<EmployeeStatusListInfo>();
            SqlParameter[] parm = new SqlParameter[7];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[3] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[6] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = name;

            parm[1].Value = 1;
            parm[2].Value = isPaged;
            parm[3].Value = pageNumber;
            parm[4].Value = pageSize;
            parm[5].Value = orderFieldName;
            parm[6].Value = orderType;

            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure,
                                                            "proEmployeeStatusGetList", parm))
            {
                while (rdr.Read())
                {
                    EmployeeStatusListInfo EmployeeStatusList = new EmployeeStatusListInfo();

                    EmployeeStatusList.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    EmployeeStatusList.Id = Convert.ToInt32(rdr["Id"]);
                    EmployeeStatusList.Name = (rdr["Name"]).ToString();
                    EmployeeStatusList.Memo = (rdr["Memo"]).ToString();
                    EmployeeStatusLists.Add(EmployeeStatusList);

                }
                rdr.Close();
            }
            return EmployeeStatusLists;
        }

        //获取EmployeeStatusListSum,记录总数和汇总值
        public int GetEmployeeStatusListCount(string name)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);

            parm[0].Value = name;
            parm[1].Value = 2;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总

            return (int)SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proEmployeeStatusGetList", parm);
        }

        #endregion 获取EmployeeStatus汇总 结束

    }
}
