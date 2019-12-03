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
    public class NationDao:INationDao 
    {
        private const string PARM_Id = "@Id";
        private const string PARM_Name = "@Name";
        private const string PARM_Pinyin = "@Pinyin";

        public IList<NationInfo> GetNationNameList()
        {
            IList<NationInfo> Nations = new List<NationInfo>();

            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proNationGetNameList"))
            {
                while (rdr.Read())
                {
                    NationInfo Nation = new NationInfo();
                    Nation.Id = Convert.ToInt32(rdr["Id"]);
                    Nation.Name = rdr["Name"].ToString();
                    Nations.Add(Nation);
                }
                rdr.Close();
            }
            return Nations;
        }
    }
}
