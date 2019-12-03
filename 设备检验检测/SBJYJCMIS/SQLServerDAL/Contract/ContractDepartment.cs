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
    public class ContractDepartment : IContractDepartment
    {
        #region 参数
        private const string PARM_XuserId = "@XuserId";
        private const string PARM_DepartmentTypeId = "@DepartmentTypeId";
        #endregion 参数结束

        //通过用户权限范围内的部门列表
        public IList<ContractDepartmentInfo> ContractDepartmentGetList()
        {
            IList<ContractDepartmentInfo> ContractDepartments = new List<ContractDepartmentInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proContractDepartmentGetList"))
            {
                while (rdr.Read())
                {
                    ContractDepartmentInfo ContractDepartment = new ContractDepartmentInfo();
                    ContractDepartment.Id = Convert.ToInt32(rdr["ID"]);
                    ContractDepartment.Name = Convert.ToString(rdr["Name"]);
                    ContractDepartment.ParentId = Convert.ToInt32(rdr["ParentID"]);
                    ContractDepartments.Add(ContractDepartment);
                }
                rdr.Close();
            }
            return ContractDepartments;
        }

    }
}