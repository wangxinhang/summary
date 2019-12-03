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
    public class Xuser:IXuser
    {
        #region 参数
        //参数        
        private const string PARM_Id = "@Id";
        private const string PARM_Name = "@Name";
        private const string PARM_Password = "@Password";
        private const string PARM_NameCN = "@NameCN";
        private const string PARM_FilePath = "@FilePath";
        private const string PARM_SignImg = "@SignImg";
        private const string PARM_IsConfirm = "@IsConfirm";
        private const string PARM_Mobile = "@Mobile";
        private const string PARM_Email = "@Email";
        private const string PARM_OfficePhone = "OfficePhone";
        private const string PARM_DepartmentId = "@DepartmentId";
        private const string PARM_DepartmentTypeId = "@DepartmentTypeId";
        private const string PARM_EmployeeId = "@EmployeeId";
        private const string PARM_DataStatusId = "@DataStatusId";
        private const string PARM_Memo = "@Memo";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_ModifierId = "@ModifierId";

        //扩展参数 
        private const string PARM_TradeTypeId = "@TradeTypeId";
        private const string PARM_XuserId = "@XuserId";
        private const string PARM_GroupId = "@GroupId";
        private const string PARM_RoleId = "@RoleId";
        private const string PARM_XuserIdMd5 = "@XuserIdMd5";
        private const string PARM_AssignGroupType = "@AssignGroupType";
        private const string PARM_RecordSetType = "@RecordSetType";
        private const string PARM_IsPaged = "@IsPaged";
        private const string PARM_PageNumber = "@PageNumber";
        private const string PARM_PageSize = "@PageSize";
        private const string PARM_OrderFieldName = "@OrderFieldName";
        private const string PARM_OrderType = "@OrderType";

		#endregion 参数结束

		#region 数据记录操作（插入、更新、删除）
		//插入新记录
		public bool XuserInsert(XuserInfo Xuser,bool isCreateEmployee)
		{
			SqlParameter[] parm = new SqlParameter[6];
			parm[0] = new SqlParameter(PARM_Name, SqlDbType.VarChar);
			parm[1] = new SqlParameter(PARM_NameCN, SqlDbType.NVarChar);
			parm[2] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
			parm[4] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);
            parm[5] = new SqlParameter("@IsCreateEmployee", SqlDbType.Bit);

			parm[0].Value = Xuser.Name;
			parm[1].Value = Xuser.NameCN;
			parm[2].Value = Xuser.DepartmentId;
            parm[3].Value = Xuser.Memo;
			parm[4].Value = Xuser.CreatorId;
            parm[5].Value = isCreateEmployee;

			int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proXuserInsert", parm);
			return (retval > 0) ? true : false;
		}

		//更新记录
		public bool XuserUpdateById(XuserInfo Xuser)
        {
            SqlParameter[] parm = new SqlParameter[8];

            parm[0] = new SqlParameter(PARM_Id, Xuser.Id);
            parm[1] = new SqlParameter(PARM_Name, Xuser.Name);
            parm[2] = new SqlParameter(PARM_Password, Xuser.Password);
            parm[3] = new SqlParameter(PARM_NameCN, Xuser.NameCN);
            parm[4] = new SqlParameter(PARM_DepartmentId, Xuser.DepartmentId);
            parm[5] = new SqlParameter(PARM_DataStatusId, Xuser.DataStatusId);
            parm[6] = new SqlParameter(PARM_Memo, Xuser.Memo);
            parm[7] = new SqlParameter(PARM_ModifierId, Xuser.ModifierId);

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proXuserUpdateById", parm);
            return (retval > 0) ? true : false;
        }
        
        //根据XuserId删除记录
        public bool XuserLogicDeleteById(int xuserId, int modifierId)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = xuserId;
            parm[1].Value = modifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proXuserLogicDeleteById", parm);
            return (retval > 0) ? true : false;
        }

        //根据XuserId重置密码
        public bool XuserResetPasswordById(int id, int modifierId)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = id;
            parm[1].Value = modifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proXuserResetPasswordById", parm);
            return (retval > 0) ? true : false;
        }

        public bool XuserUpdatePasswordById(int id, string password)
        {
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_Id, id);
            parm[1] = new SqlParameter(PARM_Password, password);
            parm[2] = new SqlParameter(PARM_ModifierId, id);

            int retval = SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proXuserUpdatePasswordById", parm);
            return (retval == 0) ? true : false;
        }
        #endregion 数据记录操作（插入、更新、删除）结束

        #region 用户和密码验证
        //验证用户是否存在
        public bool XuserIsExistedByName(string name)
        {
            SqlParameter parm = new SqlParameter(PARM_Name, SqlDbType.VarChar);
            parm.Value = name;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proXuserIsExistedByName", parm);
            return obj == null ? false : (bool)obj;
        }

        //根据Id获取密码,用于密码验证
        public string XuserGetPasswordById(int xuserId)
        {
            SqlParameter parm = new SqlParameter(PARM_XuserId, SqlDbType.Int);
            parm.Value = xuserId;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proXuserGetPasswordById", parm);
            return (obj == null) ? null : (string)obj;
        }

        //根据Name获取密码，用于密码验证
        public string XuserGetPasswordByName(string name)
        {
            SqlParameter parm = new SqlParameter(PARM_Name, SqlDbType.VarChar);
            parm.Value = name;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proXuserGetPasswordByName", parm);
            return (obj == null) ? null : (string)obj;
        }
        //验证用户是否是超级管理员
        public bool IsExistedAdministrateRoleIdByXuserId(int xuserId)
        {
            SqlParameter parm = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm.Value = xuserId;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proIsExistedAdministrateRoleIdByXuserId", parm);
            return obj == null ? false : (bool)obj;
        }
        #endregion 用户和密码验证

        #region 根据条件获取结果
        //根据Name获取XuserId
        public int XuserGetIdByName(string name)
        {
            SqlParameter parm = new SqlParameter(PARM_Name, SqlDbType.VarChar);
            parm.Value = name;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proXuserGetIdByName", parm);
            return (obj == null) ? 0 : (int)obj;
        }

        //根据XuserId获取中文姓名（NameCN）
        public string XuserGetNameCNById(int xuserId)
        {
            SqlParameter parm = new SqlParameter(PARM_XuserId, SqlDbType.Int);
            parm.Value = xuserId;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proXuserGetNameCNById", parm);
            return (obj == null) ? null : obj.ToString();
        }

        //根据Id获取员工Id
        public int XuserGetEmployeeIdById(int xuserId)
        {
            SqlParameter parm = new SqlParameter(PARM_XuserId, SqlDbType.Int);
            parm.Value = xuserId;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proXuserGetEmployeeIdById", parm);
            return (obj == null) ? 0 : (int)obj;
        }

        //根据EmployeeId得到XuserId
        public int XuserGetIdByEmployeeId(int employeeId)
        {
            SqlParameter parm = new SqlParameter(PARM_EmployeeId, SqlDbType.Int);
            parm.Value = employeeId;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proXuserGetIdByEmployeeId", parm);
            return (obj == null) ? 0 : (int)obj;
        }

        //根据XuserIdMd5获取XuserId ,Name,NameCN
        public IList<XuserForIdMd5Info> XuserGetListByIdMd5(string xuserIdMd5)
        {
            SqlParameter parm = new SqlParameter(PARM_XuserIdMd5, SqlDbType.VarChar);
            parm.Value = xuserIdMd5;

            IList<XuserForIdMd5Info> recordList = new List<XuserForIdMd5Info>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proXuserGetListByMd5", parm))
            {
                while (rdr.Read())
                {
                    XuserForIdMd5Info record = new XuserForIdMd5Info();
                    record.Id = Convert.ToInt32(rdr["Id"]);
                    record.Name = Convert.ToString(rdr["Name"]);
                    record.NameCN = Convert.ToString(rdr["NameCN"]);
                    record.DepartmentId = Convert.IsDBNull(rdr["DepartmentId"]) ? 0 : Convert.ToInt32(rdr["DepartmentId"]);
                    record.EmployeeId = Convert.IsDBNull(rdr["EmployeeId"]) ? 0 : Convert.ToInt32(rdr["EmployeeId"]);
                    record.Department = Convert.ToString(rdr["Department"]);
                    record.DepartmentTypeId = Convert.IsDBNull(rdr["DepartmentTypeId"]) ? 0 : Convert.ToInt32(rdr["DepartmentTypeId"]);
					record.Position = Convert.ToString(rdr["Position"]);
					record.PropertyId = Convert.IsDBNull(rdr["PropertyId"]) ? 0 : Convert.ToInt32(rdr["PropertyId"]);
                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }
        //根据RoleId获取XuserList
        public IList<XuserListInfo> XuserGetListByRoleId(string name, int roleId)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_RoleId, SqlDbType.Int);

            parm[0].Value = name;
            parm[1].Value = roleId;

            IList<XuserListInfo> recordList = new List<XuserListInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proXuserGetListByRoleId", parm))
            {
                while (rdr.Read())
                {
                    XuserListInfo record = new XuserListInfo();
                    record.Id = Convert.ToInt32(rdr["Id"]);
                    record.Employee = Convert.ToString(rdr["Employee"]);
                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }

        //根据xuserId判断用户为处理安排人默认值
        public bool FlowNodeDefaultSettingIsExistedByXuserId(int xuserId)
        {
            SqlParameter parm = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm.Value = xuserId;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proFlowNodeDefaultSettingIsExistedByXuserId", parm);
            return obj == null ? false : (bool)obj;
        }

		#endregion 按条件读取记录结束

		#region 获取XuserList

		//获取录入后的信息或最近的N条信息
		public IList<XuserListInfo> XuserGetList(string name, string nameCN, int departmentId, int departmentTypeId, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
		{
			SqlParameter[] parm = new SqlParameter[10];

			parm[0] = new SqlParameter(PARM_Name, SqlDbType.VarChar);
			parm[1] = new SqlParameter(PARM_NameCN, SqlDbType.NVarChar);
			parm[2] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
			parm[3] = new SqlParameter(PARM_DepartmentTypeId, SqlDbType.Int);

			parm[4] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);
			parm[5] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
			parm[6] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
			parm[7] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
			parm[8] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
			parm[9] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

			parm[0].Value = name;
			parm[1].Value = nameCN;
			parm[2].Value = departmentId;
			parm[3].Value = departmentTypeId;

			parm[4].Value = 1;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总
			parm[5].Value = isPaged;
			parm[6].Value = pageNumber;
			parm[7].Value = pageSize;
			parm[8].Value = orderFieldName;
			parm[9].Value = orderType;

			IList<XuserListInfo> recordList = new List<XuserListInfo>();
			XuserListInfo record = new XuserListInfo();
			record.Name = "";
			using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proXuserGetList", parm))
			{
				while (rdr.Read())
				{
                    if (record.Id == Convert.ToInt32(rdr["Id"]))
                    {
                            record.GroupName = record.GroupName + rdr["GroupName"].ToString()+",";
                            record.Role = record.Role + rdr["Role"].ToString()+",";                        
                    }
                    else
                    {
                        if (record.Name != "") {
                            record.GroupName = record.GroupName.Substring(1, record.GroupName.Length - 2);
                            record.Role = record.Role.Substring(1, record.Role.Length - 2);
                            recordList.Add(record);
						}
						record = new XuserListInfo();
						record.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
						record.Id = Convert.ToInt32(rdr["Id"]);
						record.Name = rdr["Name"].ToString();
						record.NameCN = rdr["NameCN"].ToString();
                        //record.SignImg = rdr["SignImg"].ToString();
						record.DepartmentId = Convert.IsDBNull(rdr["DepartmentId"]) ? 0 : Convert.ToInt32(rdr["DepartmentId"]);
						record.Department = rdr["Department"].ToString();
						record.FullDepartment = rdr["DepartmentFullName"].ToString();
						record.EmployeeId = Convert.IsDBNull(rdr["EmployeeId"]) ? 0 : Convert.ToInt32(rdr["EmployeeId"]);
                        record.DepartmentTypeId = Convert.ToInt32(rdr["DepartmentTypeId"]);
                        record.DepartmentType = rdr["DepartmentType"].ToString();
                        record.Memo = rdr["Memo"].ToString();
						//record.GroupId = Convert.IsDBNull(rdr["GroupId"]) ? 0 : Convert.ToInt32(rdr["GroupId"]);
						record.GroupName = "," + rdr["GroupName"].ToString() + ",";
						//record.RoleId = Convert.IsDBNull(rdr["RoleId"]) ? 0 : Convert.ToInt32(rdr["RoleId"]);
						record.Role = "," + rdr["Role"].ToString() + ",";
					}
                }
                rdr.Close();
                if (record.Name != "")
                {
                    record.GroupName = record.GroupName.Substring(1, record.GroupName.Length - 2);
                    record.Role = record.Role.Substring(1, record.Role.Length - 2);
                }
                recordList.Add(record);
			}
			return recordList;
		}

		//获取XuserListSum,记录总数和汇总值
		public int XuserGetListMergeCount(string name, string nameCN, int departmentId, int departmentTypeId)
		{
			SqlParameter[] parm = new SqlParameter[5];

			parm[0] = new SqlParameter(PARM_Name, SqlDbType.VarChar);
			parm[1] = new SqlParameter(PARM_NameCN, SqlDbType.NVarChar);
			parm[2] = new SqlParameter(PARM_DepartmentId, SqlDbType.Int);
			parm[3] = new SqlParameter(PARM_DepartmentTypeId, SqlDbType.Int);

			parm[4] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);
			//parm[4] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
			//parm[5] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
			//parm[6] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
			//parm[7] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
			//parm[8] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

			parm[0].Value = name;
			parm[1].Value = nameCN;
			parm[2].Value = departmentId;
			parm[3].Value = departmentTypeId;

			parm[4].Value = 2;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总
							  //parm[4].Value = 0;
							  //parm[5].Value = 1;
							  //parm[6].Value = 10;
							  //parm[7].Value = null;
							  //parm[8].Value = null;

            return (int)SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proXuserGetList", parm);
		}
		#endregion 获取XuserList

    }
}