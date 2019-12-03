using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.IDAL;
using SBJYJCMIS.Model;
using SBJYJCMIS.DBUtility;
using System.Data;
using System.Data.SqlClient;

namespace SBJYJCMIS.SQLServerDAL
{
    public class InspectionOrgan: IInspectionOrgan
    {
        #region 参数
        private const string PARM_RowNumber = "@RowNumber";
        private const string PARM_Id = "@Id";
        private const string PARM_IsInner = "@IsInner";
        private const string PARM_Tel = "@Tel";
        private const string PARM_Address = "@Address";
        private const string PARM_Contact = "@Contact";
        private const string PARM_Qualification = "@Qualification";
        private const string PARM_IsLocked = "@IsLocked";
        private const string PARM_Name = "@Name";
        private const string PARM_ShortName = "@ShortName";
        private const string PARM_Area = "@Area";
        private const string PARM_LockStatus = "@LockStatus";
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
        #endregion

        //获取查询检测机构结果集及记录总数
        public IList<InspectionOrganInfo> InspectionOrganGetList(string Name, int IsInner, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            SqlParameter[] parm = new SqlParameter[8];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_IsInner, SqlDbType.Int);

            parm[2] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[4] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[7] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = Name;
            parm[1].Value = IsInner;

            parm[2].Value = 1;  //RecordSetType:1表示结果集列表,2表示记录数和数据汇总
            parm[3].Value = isPaged;
            parm[4].Value = pageNumber;
            parm[5].Value = pageSize;
            parm[6].Value = orderFieldName;
            parm[7].Value = orderType;

            IList<InspectionOrganInfo> recordList = new List<InspectionOrganInfo>();

            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proInspectionOrganGetList", parm))
            {
                while (rdr.Read())
                {
                    InspectionOrganInfo record = new InspectionOrganInfo();
                    record.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    record.Id = Convert.ToInt32(rdr["Id"]);
                    record.Name = rdr["Name"].ToString();
                    record.ShortName = rdr["ShortName"].ToString();
                    record.Area = rdr["Area"].ToString();
                    record.Address = rdr["Address"].ToString();
                    record.Tel = rdr["Tel"].ToString();
                    record.Contact = rdr["Contact"].ToString();
                    record.Qualification = rdr["Qualification"].ToString();
                    record.LockStatus = rdr["LockStatus"].ToString();
                    record.Memo = rdr["Memo"].ToString();

                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }

        public RecordCountInfo InspectionOrganGetSum(string Name, int IsInner)
        {
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_IsInner, SqlDbType.Int);

            parm[2] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);

            parm[0].Value = Name;
            parm[1].Value = IsInner;

            parm[2].Value = 2;  //RecordSetType:1表示结果集列表,2表示记录数和数据汇总

            RecordCountInfo record = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proInspectionOrganGetList", parm))
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

        //新增检测机构信息
        public bool InspectionOrganInsert(InspectionOrganInfo InspectionOrgan)
        {
            SqlParameter[] parm = new SqlParameter[8];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_ShortName, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_IsInner, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_Address, SqlDbType.NVarChar);
            parm[4] = new SqlParameter(PARM_Tel, SqlDbType.NVarChar);
            parm[5] = new SqlParameter(PARM_Contact, SqlDbType.NVarChar);
            parm[6] = new SqlParameter(PARM_Qualification, SqlDbType.NVarChar);
            parm[7] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);

            parm[0].Value = InspectionOrgan.Name;
            parm[1].Value = InspectionOrgan.ShortName;
            parm[2].Value = InspectionOrgan.IsInner;
            parm[3].Value = InspectionOrgan.Address;
            parm[4].Value = InspectionOrgan.Tel;
            parm[5].Value = InspectionOrgan.Contact;
            parm[6].Value = InspectionOrgan.Qualification;
            parm[7].Value = InspectionOrgan.Memo;

            int reader = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proInspectionOrganInsert", parm);

            return reader > 0 ? true : false;

        }

        //编辑检测机构信息
        public bool InspectionOrganUpdate(InspectionOrganInfo InspectionOrgan)
        {
            SqlParameter[] parm = new SqlParameter[9];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_ShortName, SqlDbType.NVarChar);
            parm[3] = new SqlParameter(PARM_IsInner, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_Address, SqlDbType.NVarChar);
            parm[5] = new SqlParameter(PARM_Tel, SqlDbType.NVarChar);
            parm[6] = new SqlParameter(PARM_Contact, SqlDbType.NVarChar);
            parm[7] = new SqlParameter(PARM_Qualification, SqlDbType.NVarChar);
            parm[8] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);

            parm[0].Value = InspectionOrgan.Id;
            parm[1].Value = InspectionOrgan.Name;
            parm[2].Value = InspectionOrgan.ShortName;
            parm[3].Value = InspectionOrgan.IsInner;
            parm[4].Value = InspectionOrgan.Address;
            parm[5].Value = InspectionOrgan.Tel;
            parm[6].Value = InspectionOrgan.Contact;
            parm[7].Value = InspectionOrgan.Qualification;
            parm[8].Value = InspectionOrgan.Memo;

            int reader = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proInspectionOrganUpdate", parm);

            return reader > 0 ? true : false;
        }

        //删除检测机构信息
        public bool InspectionOrganDelete(int Id)
        {
            SqlParameter[] parm = new SqlParameter[1];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);

            parm[0].Value = Id;

            int reader = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proInspectionOrganDelete", parm);

            return reader > 0 ? true : false;

        }




    }
}
