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
    public class Xpage : IXpage
    {
        #region 参数

        private const string PARM_Id = "@Id";
        private const string PARM_Name = "@Name";
        private const string PARM_PathName = "@PathName";
        private const string PARM_Memo = "@Memo";
        private const string PARM_InserterId = "@InserterId";
        private const string PARM_ModifierId = "@ModifierId";

        //扩展参数
        private const string PARM_XmenuId = "@XmenuId";
        private const string PARM_RelationType = "@RelationType";
        private const string PARM_RecordSetType = "@RecordSetType";
        private const string PARM_IsPaged = "@IsPaged";
        private const string PARM_PageNumber = "@PageNumber";
        private const string PARM_PageSize = "@PageSize";
        private const string PARM_OrderFieldName = "@OrderFieldName";
        private const string PARM_OrderType = "@OrderType";

        #endregion 参数结束

        #region 获取查询记录

        /// <summary>
        /// 根据XMenuID获取对应的XpageID
        /// </summary>	
        public int XpageGetIdByXmenuId(int xmenuId)
        {
            SqlParameter parm = new SqlParameter(PARM_XmenuId, SqlDbType.Int);
            parm.Value = xmenuId;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proXpageGetIdByXmenuId", parm);
            return (obj == null) ? 0 : Convert.ToInt32(obj);
        }
        #endregion 获取查询记录

        #region 获取查询记录列表
        /// <summary>
        /// 根据XpageList
        /// </summary>	
        public IList<XpageListInfo> XpageGetList(string name, string pathName, int relationType, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            SqlParameter[] parm = new SqlParameter[9];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_PathName, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_RelationType, SqlDbType.Int);

            parm[3] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[5] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[7] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[8] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = name;
            parm[1].Value = pathName;
            parm[2].Value = relationType;

            parm[3].Value = 1;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总
            parm[4].Value = isPaged;
            parm[5].Value = pageNumber;
            parm[6].Value = pageSize;
            parm[7].Value = orderFieldName;
            parm[8].Value = orderType;

            IList<XpageListInfo> recordList = new List<XpageListInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proXpageGetList", parm))
            {
                while (rdr.Read())
                {
                    XpageListInfo record = new XpageListInfo();
                    record.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    record.Id = Convert.ToInt32(rdr["Id"]);
                    record.Name = Convert.ToString(rdr["Name"]);
                    record.PathName = Convert.ToString(rdr["PathName"]);
                    record.Memo = Convert.ToString(rdr["Memo"]);

                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }

        //获取XpageListSum,记录总数和汇总值
        public RecordCountInfo XpageGetListSum(string name, string pathName, int relationType)
        {

            SqlParameter[] parm = new SqlParameter[4];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_PathName, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_RelationType, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);

            parm[0].Value = name;
            parm[1].Value = pathName;
            parm[2].Value = relationType;
            parm[3].Value = 2;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总

            RecordCountInfo record = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proXpageGetList", parm))
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

        #endregion 获取查询记录列表 结束
    }
}
