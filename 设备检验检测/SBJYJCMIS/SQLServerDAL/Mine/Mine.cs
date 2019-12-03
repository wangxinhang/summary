using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using SBJYJCMIS.Model;
using SBJYJCMIS.IDAL;
using SBJYJCMIS.DBUtility;

namespace SBJYJCMIS.SQLServerDAL
{
    public class Mine:IMine
    {
        #region 参数
        //参数        
        private const string PARM_Id = "@Id";
        private const string PARM_SJQYId = "@SJQYId";
        private const string PARM_JCBMId = "@JCBMId";
        private const string PARM_SZQYId = "@SZQYId";
        private const string PARM_MKBH = "@MKBH";
        private const string PARM_MKBM = "@MKBM";
        private const string PARM_KJMC = "@KJMC";
        private const string PARM_KJJC = "@KJJC";
        private const string PARM_KJDZ = "@KJDZ";
        private const string PARM_SZSBM = "@SZSBM";
        private const string PARM_SZXBM = "@SZXBM";
        private const string PARM_JCBMBM = "@JCBMBM";
        private const string PARM_JGBMBM = "@JGBMBM";
        private const string PARM_LXR = "@LXR";
        private const string PARM_LXDH = "@LXDH";
        private const string PARM_SJQYBM = "@SJQYBM";
        private const string PARM_ZGZFBMJB = "@ZGZFBMJB";
        private const string PARM_AQSCXKZZT = "@AQSCXKZZT";
        private const string PARM_MKLX = "@MKLX";
        private const string PARM_JJLX = "@JJLX";
        private const string PARM_KJZK = "@KJZK";
        private const string PARM_SJ = "@SJ";
        private const string PARM_SZSName = "@SZSName";
        private const string PARM_SZXName = "@SZXName";
        private const string PARM_SJQYName = "@SJQYName";
        private const string PARM_JCBMName = "@JCBMName";
        private const string PARM_JGBMName = "@JGBMName";
        private const string PARM_DataStatusId = "@DataStatusId";
        private const string PARM_Memo = "@Memo";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_ModifierId = "@ModifierId";
        private const string PARM_DateCreated = "@DateCreated";
        private const string PARM_DateModified = "@DateModified";

        //扩展参数 
        private const string PARM_OldName = "@OldName";
        private const string PARM_XuserId = "@XuserId";
        private const string PARM_RecordSetType = "@RecordSetType";
        private const string PARM_IsPaged = "@IsPaged";
        private const string PARM_PageNumber = "@PageNumber";
        private const string PARM_PageSize = "@PageSize";
        private const string PARM_OrderFieldName = "@OrderFieldName";
        private const string PARM_OrderType = "@OrderType";

        #endregion 参数结束

        #region 获取Mine的结果集及记录总数

        //获取Mine的结果集
        public IList<MineInfo> MineGetList(string MKBM, int SJQYId, int JCBMId, int SZQYId, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            SqlParameter[] parm = new SqlParameter[10];

            parm[0] = new SqlParameter(PARM_MKBM, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_SJQYId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_JCBMId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_SZQYId, SqlDbType.Int);

            parm[4] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[6] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[7] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[8] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[9] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = MKBM;
            parm[1].Value = SJQYId;
            parm[2].Value = JCBMId;
            parm[3].Value = SZQYId;

            parm[4].Value = 1;  //RecordSetType:1表示结果集列表,2表示记录数和数据汇总
            parm[5].Value = isPaged;
            parm[6].Value = pageNumber;
            parm[7].Value = pageSize;
            parm[8].Value = orderFieldName;
            parm[9].Value = orderType;

            IList<MineInfo> recordList = new List<MineInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proMineGetMineList", parm))
            {
                while (rdr.Read())
                {
                    MineInfo record = new MineInfo();
                    record.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    record.Id = Convert.ToInt32(rdr["Id"]);
                    record.KJMC = rdr["KJMC"].ToString();
                    record.MKBM = rdr["MKBM"].ToString();
                    record.SJQYName = rdr["SJQYName"].ToString();
                    record.MKLX = rdr["MKLX"].ToString();
                    record.LXR = rdr["LXR"].ToString();
                    record.LXDH = rdr["LXDH"].ToString();
                    record.SJ = rdr["SJ"].ToString();
                    record.SZSName = rdr["SZSName"].ToString();
                    record.SZXName = rdr["SZXName"].ToString();
                    record.KJDZ = rdr["KJDZ"].ToString();
                    record.ZGZFBMJB = rdr["ZGZFBMJB"].ToString();
                    record.JJLX = rdr["JJLX"].ToString();
                    record.JCBMName = rdr["JCBMName"].ToString();
                    record.JGBMName = rdr["JGBMName"].ToString();
                    record.AQSCXKZZT = rdr["AQSCXKZZT"].ToString();
                    record.KJZK = rdr["KJZK"].ToString();
                    record.Memo = rdr["Memo"].ToString();

                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }

        //获取Mine的记录总数
        public RecordCountInfo MineGetListSum(string MKBM, int SJQYId, int JCBMId, int SZQYId)
        {
            SqlParameter[] parm = new SqlParameter[5];

            parm[0] = new SqlParameter(PARM_MKBM, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_SJQYId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_JCBMId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_SZQYId, SqlDbType.Int);

            parm[4] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);

            parm[0].Value = MKBM;
            parm[1].Value = SJQYId;
            parm[2].Value = JCBMId;
            parm[3].Value = SZQYId;

            parm[4].Value = 2;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总

            RecordCountInfo record = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proMineGetMineList", parm))
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

        #endregion

        #region 获取煤矿企业下拉列表
        public IList<DepartmentInfo> SJQYGetList()
        {
            IList<DepartmentInfo> recordList = new List<DepartmentInfo>();

            DepartmentInfo record = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proDepartmentTypeId2GetList"))
            {
                while (rdr.Read())
                {
                    record = new DepartmentInfo();
                    record.Id = Convert.ToInt32(rdr["Id"]);
                    record.Name = rdr["Name"].ToString();
                    record.ParentId = Convert.ToInt32(rdr["ParentId"]);

                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }
        #endregion

        #region 获取监察部门下拉列表
        public IList<DepartmentInfo> JCBMGetList()
        {
            IList<DepartmentInfo> recordList = new List<DepartmentInfo>();

            DepartmentInfo record = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proDepartmentTypeId4GetList"))
            {
                while (rdr.Read())
                {
                    record = new DepartmentInfo();
                    record.Id = Convert.ToInt32(rdr["Id"]);
                    record.Name = rdr["Name"].ToString();
                    record.ParentId = Convert.ToInt32(rdr["ParentId"]);

                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }
        #endregion

        #region 获取所在区域下拉列表
        public IList<RegionInfo> SZQYGetList()
        {
            IList<RegionInfo> recordList = new List<RegionInfo>();

            RegionInfo record = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proSZXSQYGetList"))
            {
                while (rdr.Read())
                {
                    record = new RegionInfo();
                    record.Idd = Convert.ToInt32(rdr["Id"]);
                    record.Name = rdr["Name"].ToString();
                    record.ParentIdd = Convert.ToInt32(rdr["ParentId"]);

                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }
        #endregion
    }
}
