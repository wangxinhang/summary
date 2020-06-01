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
    public class NewContractSubtotal : INewContractSubtotal
    {
        #region 参数
        //参数
        private const string PARM_XUserID = "@XUserID";
        private const string PARM_DateOperator = "@DateOperator";
        private const string PARM_BeginDate = "@BeginDate";
        private const string PARM_EndDate = "@EndDate";

        private const string PARM_ContractID = "@ContractID";
        private const string PARM_Contract = "@Contract";
        private const string PARM_ContactSpecialtyID = "@ContactSpecialtyID ";
        private const string PARM_ContactTypeID = "@ContactTypeID ";

        private const string PARM_AmountOperator = "@AmountOperator";
        private const string PARM_BeginAmount = "@BeginAmount";
        private const string PARM_EndAmount = "@EndAmount ";

        private const string PARM_DepartmentID = "@DepartmentID";
        private const string PARM_AdministrativeDivisionID = "@AdministrativeDivisionID";
        private const string PARM_TelecomOperatorID = "@TelecomOperatorID";
        private const string PARM_EntrustingUnitID = "@EntrustingUnitID";
        private const string PARM_ClearTypeID = "@ClearTypeID";

        private const string PARM_IsRecordSet = "@IsRecordSet";
        private const string PARM_IsPaged = "@IsPaged";
        private const string PARM_PageNumber = "@PageNumber";
        private const string PARM_PageSize = "@PageSize";
        private const string PARM_OrderFieldName = "@OrderFieldName";
        private const string PARM_OrderType = "@OrderType";

        #endregion 参数结束

        #region 获取QueryResult

        //获取QueryResult
        public IList<NewContractSubtotalInfo> ContractSubtotalGetList(int departmentId, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            SqlParameter[] parm = new SqlParameter[7];

            parm[0] = new SqlParameter(PARM_DepartmentID, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_IsRecordSet, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[3] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[6] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

         
            parm[0].Value = departmentId;
            parm[1].Value = 1;              //结果集还是统计记录数；1：结果集
            parm[2].Value = isPaged;
            parm[3].Value = pageNumber;
            parm[4].Value = pageSize;
            parm[5].Value = orderFieldName;
            parm[6].Value = orderType;

            IList<NewContractSubtotalInfo> NewContractSubtotals = new List<NewContractSubtotalInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proContractSubtotalGetList", parm))
            {
                while (rdr.Read())
                {
                    NewContractSubtotalInfo NewContractSubtotal = new NewContractSubtotalInfo();

                    NewContractSubtotal.ID = rdr["ID"].ToString();
                    NewContractSubtotal.Name =rdr["Name"].ToString();
                    NewContractSubtotal.Date = Convert.IsDBNull(rdr["Date"]) ? null : (DateTime?)Convert.ToDateTime(rdr["Date"]);
                    NewContractSubtotal.Amount = Convert.IsDBNull(rdr["Amount"]) ? 0 : Convert.ToDecimal(rdr["Amount"]);
                    NewContractSubtotal.Year = Convert.IsDBNull(rdr["Year"]) ? 0 : Convert.ToInt32(rdr["Year"]);
                    NewContractSubtotal.Month = Convert.IsDBNull(rdr["Month"]) ? 0 : Convert.ToInt32(rdr["Month"]);
                    NewContractSubtotal.QuarterID = Convert.IsDBNull(rdr["QuarterID"]) ? 0 : Convert.ToInt32(rdr["QuarterID"]);
                    NewContractSubtotal.Quarter = rdr["Quarter"].ToString();

                    NewContractSubtotal.DepartmentID = Convert.ToInt32(rdr["DepartmentID"]);
                    NewContractSubtotal.Department = rdr["Department"].ToString();
                    NewContractSubtotal.ParentDepartmentID = Convert.ToInt32(rdr["ParentDepartmentID"]);
                    NewContractSubtotal.ParentDepartment = rdr["ParentDepartment"].ToString();
                    NewContractSubtotal.GrandDepartmentID = Convert.ToInt32(rdr["GrandDepartmentID"]);
                    NewContractSubtotal.GrandDepartment = rdr["GrandDepartment"].ToString();
                    NewContractSubtotals.Add(NewContractSubtotal);
                }
                rdr.Close();
            }
            return NewContractSubtotals;
        }
        #endregion 获取QueryResult结束

        #region 获取QueryResult

        //获取QueryResult
        public IList<NewContractSubtotalInfo> ContractSubtotalGetListNew(int departmentId, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            SqlParameter[] parm = new SqlParameter[7];

            parm[0] = new SqlParameter(PARM_DepartmentID, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_IsRecordSet, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[3] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[6] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);


            parm[0].Value = departmentId;
            parm[1].Value = 1;              //结果集还是统计记录数；1：结果集
            parm[2].Value = isPaged;
            parm[3].Value = pageNumber;
            parm[4].Value = pageSize;
            parm[5].Value = orderFieldName;
            parm[6].Value = orderType;

            IList<NewContractSubtotalInfo> NewContractSubtotals = new List<NewContractSubtotalInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proContractSubtotalGetListNew", parm))
            {
                while (rdr.Read())
                {
                    NewContractSubtotalInfo NewContractSubtotal = new NewContractSubtotalInfo();
                    NewContractSubtotal.DepartmentID = Convert.ToInt32(rdr["DepartmentID"]);
                    NewContractSubtotal.Department = rdr["Department"].ToString();
                    NewContractSubtotal.ParentDepartmentID = Convert.ToInt32(rdr["ParentDepartmentID"]);
                    NewContractSubtotal.ParentDepartment = rdr["ParentDepartment"].ToString();
                    NewContractSubtotal.GrandDepartmentID = Convert.ToInt32(rdr["GrandDepartmentID"]);
                    NewContractSubtotal.GrandDepartment = rdr["GrandDepartment"].ToString();
                    NewContractSubtotal.Amount = Convert.IsDBNull(rdr["Amount"]) ? 0 : Convert.ToDecimal(rdr["Amount"]);
                    NewContractSubtotal.Month = Convert.IsDBNull(rdr["Month"]) ? 0 : Convert.ToInt32(rdr["Month"]);
                    NewContractSubtotals.Add(NewContractSubtotal);
                }
                rdr.Close();
            }
            return NewContractSubtotals;
        }
        #endregion 获取QueryResult结束
    }
}