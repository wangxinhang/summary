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
    public class EducationDao : IEducationDao
    {

        #region 参数

        private const string PARM_Id = "@Id";
        private const string PARM_Name = "@Name";
        private const string PARM_Memo = "@Memo";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_DataStatusId = "@DataStatusId";
        private const string PARM_ModifierId = "@ModifierId";

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

        #endregion 参数结束

        #region 增删改

        public bool InsertEducation(EducationInfo Education)
        {
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);

            parm[0].Value = Education.Name;
            parm[1].Value = Education.Memo;
            parm[2].Value = Education.CreatorId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proEducationInsert", parm);
            return (retval > 0) ? true : false;
        }

        //更新记录
        public bool UpdateEducation(EducationInfo Education)
        {
            SqlParameter[] parm = new SqlParameter[4];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[3] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = Education.Id;
            parm[1].Value = Education.Name;
            parm[2].Value = Education.Memo;
            parm[3].Value = Education.ModifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proEducationUpdateById", parm);
            return (retval > 0) ? true : false;
        }

        //根据EducationId删除记录
        public bool DeleteEducation(EducationInfo Education)
        {
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = Education.Id;
            parm[1].Value = Education.DataStatusId;
            parm[2].Value = Education.ModifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proEducationUpdateDataStatusIdById", parm);
            return (retval > 0) ? true : false;
        }

        #endregion

        #region 是否存在判断
        public bool IsExistedByName(string name)
        {
            SqlParameter parm = new SqlParameter(PARM_Name, SqlDbType.VarChar);
            parm.Value = name;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proEducationIsExistedByName", parm);
            return obj == null ? false : (bool)obj;
        }

        //根据名称验证学历名称是否存在(排除原来学历名称，用于更新)
        public bool IsExistedByNewNameAndOldName(string newName, string oldName)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_OldName, SqlDbType.NVarChar);

            parm[0].Value = newName;
            parm[1].Value = oldName;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proEducationIsExistedByNewNameAndOldName", parm);
            return obj == null ? false : (bool)obj;
        }
        #endregion 

        #region 查询
        public IList<EducationInfo> GetEducationNameList()
        {
            IList<EducationInfo> Educations = new List<EducationInfo>();

            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proEducationGetNameList"))
            {
                while (rdr.Read())
                {
                    EducationInfo Education = new EducationInfo();
                    Education.Id = Convert.ToInt32(rdr["Id"]);
                    Education.Name = rdr["Name"].ToString();
                    Education.Memo = rdr["Memo"].ToString();
                    Educations.Add(Education);
                }
                rdr.Close();
            }
            return Educations;
        }
        //根据条件获取EducationGetList信息
        public IList<EducationListInfo> GetEducationList(string name, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            IList<EducationListInfo> EducationLists = new List<EducationListInfo>();
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
                                                            "proEducationGetList", parm))
            {
                while (rdr.Read())
                {
                    EducationListInfo EducationList = new EducationListInfo();

                    EducationList.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    EducationList.Id = Convert.ToInt32(rdr["Id"]);
                    EducationList.Name = (rdr["Name"]).ToString();
                    EducationList.Memo = (rdr["Memo"]).ToString();
                    EducationLists.Add(EducationList);

                }
                rdr.Close();
            }
            return EducationLists;
        }

        //获取EducationListSum,记录总数和汇总值
        public int GetEducationListCount(string name)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);

            parm[0].Value = name;
            parm[1].Value = 2;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总

            return (int)SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proEducationGetList", parm);
        }

        #endregion 获取Education汇总 结束

    }
}

