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
    public class EmployeeDao : IEmployeeDao
    {

        #region 参数
        //参数        
        private const string PARM_Id = "@Id";
        private const string PARM_Name = "@Name";
        private const string PARM_PinYin = "@PinYin";
        private const string PARM_SimplePinYin = "@SimplePinYin";
        private const string PARM_Sex = "@Sex";
        private const string PARM_NationId = "@NationId";
        private const string PARM_MaritalStatus = "@MaritalStatus";
        private const string PARM_Tel = "@Tel";
        private const string PARM_Mobile = "@Mobile";
        private const string PARM_OfficePhone = "@OfficePhone";
        private const string PARM_Email = "@Email";
        private const string PARM_Address = "@Address";
        private const string PARM_IDNumber = "@IDNumber";
        private const string PARM_EmergencyMan = "@EmergencyMan";
        private const string PARM_EmergencyTel = "@EmergencyTel";
        private const string PARM_EducationId = "@EducationId";
        private const string PARM_PositionId = "@PositionId";
        private const string PARM_CompanyTime = "@CompanyTime";
        private const string PARM_DepartmentId = "@DepartmentId";
        private const string PARM_EmployeeStatusId = "@EmployeeStatusId";
        private const string PARM_Memo = "@Memo";
        private const string PARM_DataStatusId = "@DataStatusId";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_DateCreated = "@DateCreated";
        private const string PARM_ModifierId = "@ModifierId";
        private const string PARM_DateModified = "@DateModified";

        //扩展参数 
        private const string PARM_Department = "@Department";
        private const string PARM_DateOperator = "@DateOperator";
        private const string PARM_BeginDate = "@BeginDate";
        private const string PARM_EndDate = "@EndDate";
        private const string PARM_XuserId = "@XuserId";
        private const string PARM_EmployeeId = "@EmployeeId";
        private const string PARM_OldName = "@OldName";
        private const string PARM_OldPinYin = "@OldPinYin";
        private const string PARM_DepartmentDataTypeId = "@DepartmentDataTypeId";

        private const string PARM_TopN = "@TopN";
        private const string PARM_QueryCategory = "@QueryCategory";
        private const string PARM_RecordSetType = "@RecordSetType";
        private const string PARM_IsPaged = "@IsPaged";
        private const string PARM_PageNumber = "@PageNumber";
        private const string PARM_PageSize = "@PageSize";
        private const string PARM_OrderFieldName = "@OrderFieldName";
        private const string PARM_OrderType = "@OrderType";

        private const string PARM_PartName = "@PartName";
        private const string PARM_PartPinYin = "@PartPinYin";
        private const string PARM_FlowOperationId = "@FlowOperationId";

        #endregion 参数结束

        #region 增删改
        //插入新记录
        public bool InsertEmployee(EmployeeInfo Employee)
        {
            SqlParameter[] parm = new SqlParameter[21];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_PinYin, SqlDbType.VarChar);
            parm[2] = new SqlParameter(PARM_SimplePinYin, SqlDbType.VarChar);
            parm[3] = new SqlParameter(PARM_Sex, SqlDbType.Bit);
            parm[4] = new SqlParameter(PARM_NationId, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_MaritalStatus, SqlDbType.Bit);
            parm[6] = new SqlParameter(PARM_Tel, SqlDbType.VarChar);
            parm[7] = new SqlParameter(PARM_Mobile, SqlDbType.VarChar);
            parm[8] = new SqlParameter(PARM_OfficePhone, SqlDbType.VarChar);
            parm[9] = new SqlParameter(PARM_Email, SqlDbType.VarChar);
            parm[10] = new SqlParameter(PARM_Address, SqlDbType.NVarChar);
            parm[11] = new SqlParameter(PARM_IDNumber, SqlDbType.NVarChar);
            parm[12] = new SqlParameter(PARM_EmergencyMan, SqlDbType.NVarChar);
            parm[13] = new SqlParameter(PARM_EmergencyTel, SqlDbType.VarChar);
            parm[14] = new SqlParameter(PARM_EducationId, SqlDbType.Int);
            parm[15] = new SqlParameter(PARM_PositionId, SqlDbType.Int);
            parm[16] = new SqlParameter(PARM_CompanyTime, SqlDbType.Date);
            parm[17] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
            parm[18] = new SqlParameter(PARM_EmployeeStatusId, SqlDbType.Int);
            parm[19] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[20] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);

            parm[0].Value = Employee.Name;
            parm[1].Value = Employee.PinYin;
            parm[2].Value = Employee.SimplePinYin;
            parm[3].Value = Employee.Sex;
            parm[4].Value = Employee.NationId;
            parm[5].Value = Employee.MaritalStatus;
            parm[6].Value = Employee.Tel;
            parm[7].Value = Employee.Mobile;
            parm[8].Value = Employee.OfficePhone;
            parm[9].Value = Employee.Email;
            parm[10].Value = Employee.Address;
            parm[11].Value = Employee.IDNumber;
            parm[12].Value = Employee.EmergencyMan;
            parm[13].Value = Employee.EmergencyTel;
            parm[14].Value = Employee.EducationId;
            parm[15].Value = Employee.PositionId;
            parm[16].Value = Employee.CompanyTime;
            parm[17].Value = Employee.DepartmentId;
            parm[18].Value = Employee.EmployeeStatusId;
            parm[19].Value = Employee.Memo;
            parm[20].Value = Employee.CreatorId;

            int retval = SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proEmployeeInsert", parm);
            return (retval == 0) ? true : false;
        }
        //更新记录
        public bool UpdateEmployee(EmployeeInfo Employee)
        {
            SqlParameter[] parm = new SqlParameter[21];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_PinYin, SqlDbType.NVarChar);
            parm[3] = new SqlParameter(PARM_SimplePinYin, SqlDbType.VarChar);
            parm[4] = new SqlParameter(PARM_Sex, SqlDbType.Bit);
            parm[5] = new SqlParameter(PARM_NationId, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_MaritalStatus, SqlDbType.Bit);
            parm[7] = new SqlParameter(PARM_Tel, SqlDbType.VarChar);
            parm[8] = new SqlParameter(PARM_Mobile, SqlDbType.VarChar);
            parm[9] = new SqlParameter(PARM_OfficePhone, SqlDbType.VarChar);
            parm[10] = new SqlParameter(PARM_Email, SqlDbType.VarChar);
            parm[11] = new SqlParameter(PARM_Address, SqlDbType.NVarChar);
            parm[12] = new SqlParameter(PARM_IDNumber, SqlDbType.NVarChar);
            parm[13] = new SqlParameter(PARM_EmergencyMan, SqlDbType.NVarChar);
            parm[14] = new SqlParameter(PARM_EmergencyTel, SqlDbType.VarChar);
            parm[15] = new SqlParameter(PARM_EducationId, SqlDbType.Int);
            parm[16] = new SqlParameter(PARM_PositionId, SqlDbType.Int);
            parm[17] = new SqlParameter(PARM_CompanyTime, SqlDbType.Date);
            parm[18] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
            parm[19] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[20] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = Employee.Id;
            parm[1].Value = Employee.Name;
            parm[2].Value = Employee.PinYin;
            parm[3].Value = Employee.SimplePinYin;
            parm[4].Value = Employee.Sex;
            parm[5].Value = Employee.NationId;
            parm[6].Value = Employee.MaritalStatus;
            parm[7].Value = Employee.Tel;
            parm[8].Value = Employee.Mobile;
            parm[9].Value = Employee.OfficePhone;
            parm[10].Value = Employee.Email;
            parm[11].Value = Employee.Address;
            parm[12].Value = Employee.IDNumber;
            parm[13].Value = Employee.EmergencyMan;
            parm[14].Value = Employee.EmergencyTel;
            parm[15].Value = Employee.EducationId;
            parm[16].Value = Employee.PositionId;
            parm[17].Value = Employee.CompanyTime;
            parm[18].Value = Employee.DepartmentId;
            parm[19].Value = Employee.Memo;
            parm[20].Value = Employee.ModifierId;

            int retval = SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proEmployeeUpdateById", parm);
            return (retval == 0) ? true : false;
        }
        //根据EmployeeId更新数据状态Id
        public bool DeleteEmployee(EmployeeInfo Employee)
        {
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = Employee.Id;
            parm[1].Value = Employee.DataStatusId;
            parm[2].Value = Employee.ModifierId;

            int retval = SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proEmployeeUpdateDataStatusIdById", parm);
            return (retval == 0) ? true : false;
        }
        #endregion

        #region 是否存在判断
        public bool IsExistedByName(string name)
        {
            SqlParameter parm = new SqlParameter(PARM_Name, SqlDbType.VarChar);
            parm.Value = name;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proEmployeeIsExistedByName", parm);
            return obj == null ? false : (bool)obj;
        }
        //根据人员拼音验证人员是否存在
        public bool IsExistedByPinYin(string pinYin)
        {
            SqlParameter parm = new SqlParameter(PARM_PinYin, SqlDbType.VarChar);
            parm.Value = pinYin;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proEmployeeIsExistedByPinYin", parm);
            return obj == null ? false : (bool)obj;
        }

        //根据名称验证人员是否存在(排除原来姓名，用于更新)
        public bool IsExistedByNewNameAndOldName(string newName, string oldName)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_OldName, SqlDbType.NVarChar);

            parm[0].Value = newName;
            parm[1].Value = oldName;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proEmployeeIsExistedByNewNameAndOldName", parm);
            return obj == null ? false : (bool)obj;
        }

        //根据人员拼音验证人员是否存在(排除原来姓名拼音，用于更新)
        public bool IsExistedByNewPinYinAndOldPinYin(string newPinYin, string oldPinYin)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = new SqlParameter(PARM_PinYin, SqlDbType.VarChar);
            parm[1] = new SqlParameter(PARM_OldPinYin, SqlDbType.VarChar);

            parm[0].Value = newPinYin;
            parm[1].Value = oldPinYin;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proEmployeeIsExistedByNewPinYinAndOldPinYin", parm);
            return obj == null ? false : (bool)obj;
        }

        #endregion

        #region 单个查询
        public EmployeeViewInfo GetEmployee(int id, bool isAccountId)
        {
            EmployeeViewInfo employee = new EmployeeViewInfo();
            employee.Id = 0;
            if (id == 0) {
                return employee;
            }
            SqlParameter[] parm = new SqlParameter[1];
            parm[0] = new SqlParameter(PARM_Id, id);
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proEmployeeGetById", parm))
            {
                while (rdr.Read())
                {
                    employee.Id = Convert.ToInt32(rdr["Id"]);
                    employee.Name = (rdr["Name"]).ToString();
                    employee.PinYin = (rdr["PinYin"]).ToString();
                    employee.SimplePinYin = (rdr["SimplePinYin"]).ToString();
                    employee.SexName = (rdr["SexName"]).ToString();
                    employee.Sex = Convert.ToInt32(rdr["Sex"]);
                    employee.Nation = (rdr["Nation"]).ToString();
                    employee.NationId = Convert.ToInt32(rdr["NationId"]);
                    employee.MaritalStatusName = (rdr["MaritalStatusName"]).ToString();
                    employee.MaritalStatus = Convert.ToInt32(rdr["MaritalStatus"]);
                    employee.Tel = rdr["Tel"].ToString();
                    employee.Mobile = rdr["Mobile"].ToString();
                    employee.OfficePhone = (rdr["OfficePhone"]).ToString();
                    employee.Email = (rdr["Email"]).ToString();
                    employee.Address = (rdr["Address"]).ToString();
                    employee.IDNumber = (rdr["IDNumber"]).ToString();
                    employee.EmergencyMan = (rdr["EmergencyMan"]).ToString();
                    employee.EmergencyTel = (rdr["EmergencyTel"]).ToString();
                    employee.Education = (rdr["Education"] == Convert.DBNull) ? "" : rdr["Education"].ToString();
                    employee.EducationId = Convert.ToInt32(rdr["EducationId"]);
                    employee.Position = (rdr["Position"]).ToString();
                    employee.PositionId = Convert.ToInt32(rdr["PositionId"]);
                    employee.CompanyTime = (rdr["CompanyTime"] == Convert.DBNull) ? null : ((DateTime?)rdr["CompanyTime"]);
                    employee.Department = (rdr["Department"]).ToString();
                    employee.DepartmentId = Convert.ToInt32((rdr["DepartmentId"]));
                    employee.EmployeeStatus = (rdr["EmployeeStatus"]).ToString();
                    employee.EmployeeStatusId = Convert.ToInt32(rdr["EmployeeStatusId"]);
                    employee.Memo = (rdr["Memo"]).ToString();
                }
                rdr.Close();
            }
            return employee;
        }
        #endregion

        #region 统计查询
        public int GetEmployeeUnderDepartmentCount(int departmentId)
        {
            SqlParameter[] parm = new SqlParameter[1];
            parm[0] = new SqlParameter(PARM_DepartmentId, departmentId);
            return (int)SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proEmployeeUnderDepartmentCount", parm);
        }
        #endregion

        //用于自动完成文本框的姓名列表
        //public IList<EmployeeInfo> GetEmployeeNameList(int xuserId, int departmentTypeId,int departmentId,string partName)
        //{
        //    SqlParameter[] parm = new SqlParameter[4];

        //    parm[0] = new SqlParameter(PARM_XuserId, xuserId);
        //    parm[1] = new SqlParameter("@DepartmentTypeId", departmentTypeId);
        //    parm[2] = new SqlParameter("@DepartmentId", departmentId);
        //    parm[3] = new SqlParameter("@Name", partName);

        //    IList<EmployeeInfo> list = new List<EmployeeInfo>();
        //    using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proEmployeeGetNameListByDepartmentPartName", parm))
        //    {
        //        while (rdr.Read())
        //        {
        //            EmployeeInfo employee = new EmployeeInfo();
        //            employee.Id = Convert.ToInt32(rdr["Id"]);
        //            employee.Name = rdr["Name"].ToString();
        //            employee.PinYin = rdr["PinYin"].ToString();
        //            employee.Department = rdr["Department"].ToString();
        //            employee.DepartmentId = (int)rdr["DepartmentId"];
        //            list.Add(employee);
        //        }
        //        rdr.Close();
        //    }
        //    return list;
        //}

        public int GetEmployeeIdByName(string name)
        {
            SqlParameter parm = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm.Value = name;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proEmployeeGetIdByName", parm);
            return (obj == null) ? 0 : (int)obj;
        }

        //根据人员Id获取人员其他信息
        public IList<EmployeeViewInfo> GetEmployeeOtherList(int employeeId, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            IList<EmployeeViewInfo> Employees = new List<EmployeeViewInfo>();

            SqlParameter[] parm = new SqlParameter[7];

            parm[0] = new SqlParameter(PARM_EmployeeId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[3] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[6] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = employeeId;

            parm[1].Value = 1;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总
            parm[2].Value = isPaged;
            parm[3].Value = pageNumber;
            parm[4].Value = pageSize;
            parm[5].Value = orderFieldName;
            parm[6].Value = orderType;

            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proEmployeeGetEmployeeOtherList", parm))
            {
                while (rdr.Read())
                {
                    EmployeeViewInfo Employee = new EmployeeViewInfo();
                    Employee.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    Employee.Id = Convert.ToInt32(rdr["Id"]);
                    Employee.Name = (rdr["Name"]).ToString();
                    Employee.PinYin = (rdr["PinYin"]).ToString();
                    Employee.SimplePinYin = (rdr["SimplePinYin"]).ToString();
                    Employee.SexName = (rdr["SexName"]).ToString();
                    Employee.Sex = Convert.ToInt32(rdr["Sex"]);
                    Employee.Nation = (rdr["Nation"]).ToString();
                    Employee.NationId = Convert.ToInt32(rdr["NationId"]);
                    Employee.MaritalStatusName = (rdr["MaritalStatusName"]).ToString();
                    Employee.MaritalStatus = Convert.ToInt32(rdr["MaritalStatus"]);
                    Employee.Tel = (rdr["Tel"]).ToString();
                    Employee.Mobile = (rdr["Mobile"]).ToString();
                    Employee.OfficePhone = (rdr["OfficePhone"]).ToString();
                    Employee.Email = (rdr["Email"]).ToString();
                    Employee.Address = (rdr["Address"]).ToString();
                    Employee.IDNumber = (rdr["IDNumber"]).ToString();
                    Employee.EmergencyMan = (rdr["EmergencyMan"]).ToString();
                    Employee.EmergencyTel = (rdr["EmergencyTel"]).ToString();
                    Employee.Education = (rdr["Education"]).ToString();
                    Employee.EducationId = Convert.ToInt32(rdr["EducationId"]);
                    Employee.Position = (rdr["Position"]).ToString();
                    Employee.PositionId = Convert.ToInt32(rdr["PositionId"]);
                    Employee.CompanyTime = Convert.IsDBNull(rdr["CompanyTime"]) ? null : (DateTime?)Convert.ToDateTime(rdr["CompanyTime"]);
                    Employee.Department = (rdr["Department"]).ToString();
                    Employee.DepartmentId = Convert.ToInt32((rdr["DepartmentId"]));
                    Employee.EmployeeStatus = (rdr["EmployeeStatus"]).ToString();
                    Employee.EmployeeStatusId = Convert.ToInt32(rdr["EmployeeStatusId"]);
                    Employee.Memo = (rdr["Memo"]).ToString();

                    Employees.Add(Employee);
                }
                rdr.Close();
            }
            return Employees;
        }

        //根据部门Id、人员名称获取人员列表
        public IList<EmployeeViewInfo> GetEmployeeNameListByDepartmentIdAndPartName(int xuserId, int departmentId, int departmentTypeId, string partName, string partPinYin,bool isMix, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            IList<EmployeeViewInfo> list = new List<EmployeeViewInfo>();

            SqlParameter[] parm = new SqlParameter[12];
            parm[0] = new SqlParameter(PARM_XuserId, xuserId);
            parm[1] = new SqlParameter(PARM_DepartmentId, departmentId);
            parm[2] = new SqlParameter("@DepartmentTypeId", departmentTypeId);
            parm[3] = new SqlParameter(PARM_PartName, partName);
            parm[4] = new SqlParameter(PARM_PartPinYin, partPinYin);
            parm[5] = new SqlParameter("@IsMix",isMix);
            parm[6] = new SqlParameter(PARM_RecordSetType, 1);
            parm[7] = new SqlParameter(PARM_IsPaged, isPaged);
            parm[8] = new SqlParameter(PARM_PageNumber, pageNumber);
            parm[9] = new SqlParameter(PARM_PageSize, pageSize);
            parm[10] = new SqlParameter(PARM_OrderFieldName, orderFieldName);
            parm[11] = new SqlParameter(PARM_OrderType, orderType);

            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proEmployeeGetNameListByDepartmentIdAndPartName", parm))
            {
                while (rdr.Read())
                {
                    EmployeeViewInfo employee = new EmployeeViewInfo();
                    employee.Id = Convert.ToInt32(rdr["Id"]);
                    employee.Name = rdr["Name"].ToString();
                    employee.PinYin = rdr["PinYin"].ToString();
                    employee.Department = rdr["Department"].ToString();
                    employee.DepartmentId = (int)rdr["DepartmentId"];

                    list.Add(employee);
                }
                rdr.Close();
            }
            return list;
        }

        //获取EmployeeListSum,记录总数和汇总值
        public int GetEmployeeNameListByDepartmentIdAndPartNameCount(int xuserId, int departmentId, int departmentTypeId, string partName, string partPinYin,bool isMix)
        {
            SqlParameter[] parm = new SqlParameter[12];
            parm[0] = new SqlParameter(PARM_XuserId, xuserId);
            parm[1] = new SqlParameter(PARM_DepartmentId, departmentId);
            parm[2] = new SqlParameter("@DepartmentTypeId", departmentTypeId);
            parm[3] = new SqlParameter(PARM_PartName, partName);
            parm[4] = new SqlParameter(PARM_PartPinYin, partPinYin);
            parm[5] = new SqlParameter("@IsMix", isMix);
            parm[6] = new SqlParameter(PARM_RecordSetType, 2);
            parm[7] = new SqlParameter(PARM_IsPaged, 1);
            parm[8] = new SqlParameter(PARM_PageNumber, 1);
            parm[9] = new SqlParameter(PARM_PageSize, 1);
            parm[10] = new SqlParameter(PARM_OrderFieldName, "");
            parm[11] = new SqlParameter(PARM_OrderType, "");

            return (int)SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proEmployeeGetNameListByDepartmentIdAndPartName", parm);
        }


        //获取录入后的信息或最近的N条信息
        public IList<EmployeeViewInfo> GetEmployeeList(string name, string pinYin, int sex, int maritalStatus, int nationId, int educationId, int positionId, int departmentId,
                                                    int employeeStatusId, string dateOperator, DateTime? beginDate, DateTime? endDate, int xuserId, int departmentDataTypeId,
                                                    bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {


            SqlParameter[] parm = new SqlParameter[20];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_PinYin, SqlDbType.VarChar);
            parm[2] = new SqlParameter(PARM_Sex, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_MaritalStatus, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_NationId, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_EducationId, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_PositionId, SqlDbType.Int);
            parm[7] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
            parm[8] = new SqlParameter(PARM_EmployeeStatusId, SqlDbType.Int);
            parm[9] = new SqlParameter(PARM_DateOperator, SqlDbType.VarChar);
            parm[10] = new SqlParameter(PARM_BeginDate, SqlDbType.Date);
            parm[11] = new SqlParameter(PARM_EndDate, SqlDbType.Date);
            parm[12] = new SqlParameter(PARM_XuserId, SqlDbType.Int);
            parm[13] = new SqlParameter(PARM_DepartmentDataTypeId, SqlDbType.Int);

            parm[14] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);
            parm[15] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[16] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[17] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[18] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[19] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);


            parm[0].Value = name;
            parm[1].Value = pinYin;
            parm[2].Value = sex;
            parm[3].Value = maritalStatus;
            parm[4].Value = nationId;
            parm[5].Value = educationId;
            parm[6].Value = positionId;
            parm[7].Value = departmentId;
            parm[8].Value = employeeStatusId;
            parm[9].Value = dateOperator;
            parm[10].Value = beginDate;
            parm[11].Value = endDate;
            parm[12].Value = xuserId;
            parm[13].Value = departmentDataTypeId;

            parm[14].Value = 1;
            parm[15].Value = isPaged;
            parm[16].Value = pageNumber;
            parm[17].Value = pageSize;
            parm[18].Value = orderFieldName;
            parm[19].Value = orderType;

            IList<EmployeeViewInfo> list = new List<EmployeeViewInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proEmployeeGetList", parm))
            {
                while (rdr.Read())
                {
                    EmployeeViewInfo employee = new EmployeeViewInfo();
                    employee.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    employee.Id = Convert.ToInt32(rdr["Id"]);
                    employee.Name = (rdr["Name"]).ToString();
                    employee.PinYin = (rdr["PinYin"]).ToString();
                    employee.SimplePinYin = (rdr["SimplePinYin"]).ToString();
                    employee.Sex = Convert.ToInt32(rdr["Sex"]);
                    employee.SexName = employee.Sex==1?"男":"女";
                    employee.Nation = (rdr["Nation"]).ToString();
                    employee.NationId = Convert.ToInt32(rdr["NationId"]);
                    employee.MaritalStatus = Convert.ToInt32(rdr["MaritalStatus"]);
                    employee.MaritalStatusName = employee.MaritalStatus==1?"已婚":"未婚";
                    employee.Tel = (rdr["Tel"]).ToString();
                    employee.Mobile = (rdr["Mobile"]).ToString();
                    employee.OfficePhone = (rdr["OfficePhone"]).ToString();
                    employee.Email = (rdr["Email"]).ToString();
                    employee.Address = (rdr["Address"]).ToString();
                    employee.IDNumber = (rdr["IDNumber"]).ToString();
                    employee.EmergencyMan = (rdr["EmergencyMan"]).ToString();
                    employee.EmergencyTel = (rdr["EmergencyTel"]).ToString();
                    employee.Education = (rdr["Education"]).ToString();
                    employee.EducationId = Convert.ToInt32(rdr["EducationId"]);
                    employee.Position = (rdr["Position"]).ToString();
                    employee.PositionId = Convert.ToInt32(rdr["PositionId"]);
                    employee.CompanyTime = Convert.IsDBNull(rdr["CompanyTime"]) ? null : (DateTime?)Convert.ToDateTime(rdr["CompanyTime"]);
                    employee.Department = (rdr["Department"]).ToString();
                    employee.DepartmentId = Convert.ToInt32((rdr["DepartmentId"]));
                    employee.EmployeeStatus = (rdr["EmployeeStatus"]).ToString();
                    employee.EmployeeStatusId = Convert.ToInt32(rdr["EmployeeStatusId"]);
                    employee.Memo = (rdr["Memo"]).ToString();
                    employee.EmployeeDepartmentLogIsExisted = Convert.ToInt32(rdr["EmployeeDepartmentLogIsExisted"]);
                    employee.EmployeePositionLogIsExisted = Convert.ToInt32(rdr["EmployeePositionLogIsExisted"]);
                    list.Add(employee);
                }
                rdr.Close();
            }
            return list;
        }


        //获取EmployeeListSum,记录总数和汇总值
        public int GetEmployeeListCount(string name, string pinYin, int sex, int maritalStatus, int nationId, int educationId, int positionId, int departmentId,
                                                    int employeeStatusId, string dateOperator, DateTime? beginDate, DateTime? endDate, int xuserId, int departmentDataTypeId)
        {
            SqlParameter[] parm = new SqlParameter[15];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_PinYin, SqlDbType.VarChar);
            parm[2] = new SqlParameter(PARM_Sex, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_MaritalStatus, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_NationId, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_EducationId, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_PositionId, SqlDbType.Int);
            parm[7] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
            parm[8] = new SqlParameter(PARM_EmployeeStatusId, SqlDbType.Int);
            parm[9] = new SqlParameter(PARM_DateOperator, SqlDbType.VarChar);
            parm[10] = new SqlParameter(PARM_BeginDate, SqlDbType.Date);
            parm[11] = new SqlParameter(PARM_EndDate, SqlDbType.Date);
            parm[12] = new SqlParameter(PARM_XuserId, SqlDbType.Int);
            parm[13] = new SqlParameter(PARM_DepartmentDataTypeId, SqlDbType.Int);

            parm[14] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);

            parm[0].Value = name;
            parm[1].Value = pinYin;
            parm[2].Value = sex;
            parm[3].Value = maritalStatus;
            parm[4].Value = nationId;
            parm[5].Value = educationId;
            parm[6].Value = positionId;
            parm[7].Value = departmentId;
            parm[8].Value = employeeStatusId;
            parm[9].Value = dateOperator;
            parm[10].Value = beginDate;
            parm[11].Value = endDate;
            parm[12].Value = xuserId;
            parm[13].Value = departmentDataTypeId;

            parm[14].Value = 2;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总
            return (int)SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proEmployeeGetList", parm);
        }

 
        //根据用户ID获取权限部门找出权限部门内的人员列表
        public IList<EmployeeInfo> GetPermissionEmployeeListByXuserId(int XUserID, int DepartmentId)
        {
            IList<EmployeeInfo> Employees = new List<EmployeeInfo>();

            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = new SqlParameter(PARM_XuserId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
            parm[0].Value = XUserID;
            parm[1].Value = DepartmentId;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proGetPermissionEmployeeListByXuserIdAndDepartmentId", parm))
            {
                while (rdr.Read())
                {
                    EmployeeInfo Employee = new EmployeeInfo();
                    Employee.Id = Convert.ToInt32(rdr["Id"]);
                    Employee.Name = rdr["Name"].ToString();
                    Employees.Add(Employee);
                }
                rdr.Close();
            }
            return Employees;
        }

        //根据部门ID获取人员列表
        //public IList<EmployeeViewInfo> GetEmployeeListByDepartmentId(int DepartmentId)
        //{
        //    IList<EmployeeViewInfo> Employees = new List<EmployeeViewInfo>();

        //    SqlParameter[] parm = new SqlParameter[1];
        //    parm[0] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
        //    parm[0].Value = DepartmentId;
        //    using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proGetEmployeeListByDepartmentId", parm))
        //    {
        //        while (rdr.Read())
        //        {
        //            EmployeeViewInfo Employee = new EmployeeViewInfo();
        //            Employee.Id = Convert.ToInt32(rdr["Id"]);
        //            Employee.Name = rdr["Name"].ToString();
        //            Employees.Add(Employee);
        //        }
        //        rdr.Close();
        //    }
        //    return Employees;
        //}
        
    }
}
