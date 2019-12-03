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
    public class DepartmentDao : IDepartmentDao
    {
        #region 参数
        private const string PARM_XuserId = "@XuserId";
        private const string PARM_Id = "@Id";
        private const string PARM_Name = "@Name";
		private const string PARM_ShortName = "ShortName";
		private const string PARM_ParentId = "@ParentId";
        private const string PARM_DepartmentTypeId = "@DepartmentTypeId";
        private const string PARM_PropertyId = "@PropertyId";
        private const string PARM_LeaderId = "@LeaderId";
        private const string PARM_RegionId = "@RegionId";
        private const string PARM_Memo = "@Memo";
        private const string PARM_DataStatusId = "@DataStatusId";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_DateCreated = "@DateCreated";
        private const string PARM_ModifierId = "@ModifierId";
        private const string PARM_DateModified = "@DateModified";

        private const string PARM_RecordSetType = "@RecordSetType";
        private const string PARM_IsPaged = "@IsPaged";
        private const string PARM_PageNumber = "@PageNumber";
        private const string PARM_PageSize = "@PageSize";
        private const string PARM_OrderFieldName = "@OrderFieldName";
        private const string PARM_OrderType = "@OrderType";
        private const string PARM_OldName = "@OldName";
        private const string PARM_OldShortName = "@OldShortName";
        private const string PARM_DeptId = "@DeptId";
        private const string PARM_Longitude = "@Longitude";
        private const string PARM_Latitude = "@Latitude";
        private const string PARM_HaveSelf = "@HaveSelf";
        private const string PARM_OldDepartmentId = "@OldDepartmentId";
        private const string PARM_NewDepartmentId = "@NewDepartmentId";
        #endregion 参数结束

        #region 增删改
        public bool InsertDepartment(DepartmentInfo Department)
        {
            SqlParameter[] parm = new SqlParameter[11];

            parm[0] = new SqlParameter(PARM_Name, Department.Name);
			parm[1] = new SqlParameter(PARM_ShortName, Department.ShortName);
            parm[2] = new SqlParameter(PARM_ParentId, Department.ParentId);
            parm[3] = new SqlParameter(PARM_DepartmentTypeId, Department.DepartmentTypeId);
            parm[4] = new SqlParameter(PARM_PropertyId, Department.PropertyId);
            parm[5] = new SqlParameter(PARM_LeaderId, Department.LeaderId);
            parm[6] = new SqlParameter(PARM_RegionId, Department.RegionId);
			parm[7] = new SqlParameter(PARM_Longitude, Department.Longitude);
			parm[8] = new SqlParameter(PARM_Latitude, Department.Latitude);
            parm[9] = new SqlParameter(PARM_Memo, Department.Memo);
            parm[10] = new SqlParameter(PARM_CreatorId, Department.CreatorId);
            int retval = SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proDepartmentInsert", parm);
            return (retval == 0) ? true : false;
        }

        //更新记录
        public bool UpdateDepartment(DepartmentInfo Department)
        {
            SqlParameter[] parm = new SqlParameter[12];

            parm[0] = new SqlParameter(PARM_Id, Department.Id);
            parm[1] = new SqlParameter(PARM_Name, Department.Name);
            parm[2] = new SqlParameter(PARM_ShortName, Department.ShortName);
            parm[3] = new SqlParameter(PARM_ParentId, Department.ParentId);
            parm[4] = new SqlParameter(PARM_DepartmentTypeId, Department.DepartmentTypeId);
            parm[5] = new SqlParameter(PARM_PropertyId, Department.PropertyId);
            parm[6] = new SqlParameter(PARM_LeaderId, Department.LeaderId);
            parm[7] = new SqlParameter(PARM_RegionId, Department.RegionId);
			parm[8] = new SqlParameter(PARM_Longitude, Department.Longitude);
			parm[9] = new SqlParameter(PARM_Latitude, Department.Latitude);
            parm[10] = new SqlParameter(PARM_Memo, Department.Memo);
            parm[11] = new SqlParameter(PARM_ModifierId, Department.ModifierId);

			int retval = SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proDepartmentUpdateById", parm);
            return (retval == 0) ? true : false;
        }

        //根据Id删除记录
        public bool DeleteDepartment(DepartmentInfo Department)
        {
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = Department.Id;
            parm[1].Value = Department.DataStatusId;
            parm[2].Value = Department.ModifierId;

            int retval = SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proDepartmentUpdateDataStatusById", parm);
            return (retval == 0) ? true : false;
        }
        #endregion

        #region 是否存在验证
        public bool IsExistedByName(string name, int parentId, int departmentTypeId)
        {
            SqlParameter[] parm = new SqlParameter[3];
            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_ParentId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_DepartmentTypeId, SqlDbType.Int);

            parm[0].Value = name;
            parm[1].Value = parentId;
            parm[2].Value = departmentTypeId;

            int ret = (int)SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proDepartmentIsExistedByName", parm);
            return ret == 1 ? true : false;
        }
        public bool IsExistedByNewNameAndOldName(string newName, string oldName, int parentId, int departmentTypeId)
        {
            SqlParameter[] parm = new SqlParameter[4];
            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_OldName, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_ParentId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_DepartmentTypeId, SqlDbType.Int);

            parm[0].Value = newName;
            parm[1].Value = oldName;
            parm[2].Value = parentId;
            parm[3].Value = departmentTypeId;

            int ret = (int)SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proDepartmentIsExistedByNewNameAndOldName", parm);
            return ret == 1 ? true : false;
        }

        public bool IsExistedByShortName(string name, int parentId, int departmentTypeId)
        {
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_ParentId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_DepartmentTypeId, SqlDbType.Int);

            parm[0].Value = name;
            parm[1].Value = parentId;
            parm[2].Value = departmentTypeId;

            int ret = (int)SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proDepartmentIsExistedByShortName", parm);
            return ret == 1 ? true : false;
        }
        public bool IsExistedByNewShortNameAndOldName(string newName, string oldName, int parentId, int departmentTypeId)
        {
            SqlParameter[] parm = new SqlParameter[4];
            parm[0] = new SqlParameter(PARM_Name, newName);
            parm[1] = new SqlParameter(PARM_OldName, oldName);
            parm[2] = new SqlParameter(PARM_ParentId, parentId);
            parm[3] = new SqlParameter(PARM_DepartmentTypeId, departmentTypeId);

            int ret = (int)SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proDepartmentIsExistedByNewShortNameAndOldName", parm);
            return ret == 1 ? true : false;
        }
        //根据名称获取部门的数据状态  用于判断数据是否存在
        public int GetDataStatusIdByNameAndParentId(string name, int parentId, int departmentTypeId)
        {
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_ParentId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_DepartmentTypeId, SqlDbType.Int);

            parm[0].Value = name;
            parm[1].Value = parentId;
            parm[2].Value = departmentTypeId;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proDepartmentExistedDataStatusIdByNameAndParentId", parm);
            return obj == null ? 0 : (int)obj;
        }

        //根据名称获取部门的数据状态  用于判断数据是否存在(排除原来部门名称，用于更新)
        public int GetDataStatusIdByNewNameAndOldName(string newName, string oldName, int parentId, int departmentTypeId)
        {
            SqlParameter[] parm = new SqlParameter[4];
            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_OldName, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_ParentId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_DepartmentTypeId, SqlDbType.Int);

            parm[0].Value = newName;
            parm[1].Value = oldName;
            parm[2].Value = parentId;
            parm[3].Value = departmentTypeId;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proDepartmentExistedDataStatusIdByNewNameAndOldName", parm);
            return obj == null ? 0 : (int)obj;
        }
        #endregion

        #region 获取单个部门信息
        public DepartmentInfo GetDepartment(int departmentId)
        {
            SqlParameter parm = new SqlParameter(PARM_Id, departmentId);
            DepartmentInfo dept = new DepartmentInfo();
            dept.Id = 0;
            using (SqlDataReader sdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proDepartmentGetById", parm))
            {
                while (sdr.Read())
                {
                    dept = TranslateFromDataReader(sdr,0);
                }
                sdr.Close();
            }
            return dept;
        }
        public DepartmentInfo GetDepartmentByXuserId(int xuserId)
        {
            SqlParameter parm = new SqlParameter(PARM_XuserId, xuserId);
            DepartmentInfo dept = new DepartmentInfo();
            dept.Id = 0;
            using (SqlDataReader sdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proDepartmentGetByXuserId", parm))
            {
                while (sdr.Read())
                {
                    dept = TranslateFromDataReader(sdr, 0);
                }
                sdr.Close();
            }
            return dept;
        }
        public DepartmentInfo GetDepartment(string name, int departmentTypeId, bool isShortName)
        {
            DepartmentInfo dept = new DepartmentInfo();
            dept.Id = 0;
            SqlParameter[] parm = new SqlParameter[3];
            parm[0] = new SqlParameter(PARM_Name, name);
            parm[1] = new SqlParameter(PARM_DepartmentTypeId, departmentTypeId);
            parm[2] = new SqlParameter("@IsShortName", isShortName);
            using (SqlDataReader sdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proDepartmentGetByNameAndTypeId", parm))
            {
                while (sdr.Read())
                {
                    dept = TranslateFromDataReader(sdr,0);
                }
                sdr.Close();
            }
            return dept;
        }
        public DepartmentInfo GetParentDepartment(int departmentId)
        {
            SqlParameter parm = new SqlParameter(PARM_DeptId, departmentId);
            DepartmentInfo dept = new DepartmentInfo();
            dept.Id = 0;
            using (SqlDataReader sdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proDepartmentGetParentDepartmentById", parm))
            {
                while (sdr.Read())
                {
                    dept = TranslateFromDataReader(sdr,0);
                }
                sdr.Close();
            }
            return dept;
        }
        #endregion

        private DepartmentInfo TranslateFromDataReader(SqlDataReader sdr,int i) {
            DepartmentInfo dept = new DepartmentInfo();
            if (sdr.GetSchemaTable().Select("ColumnName='RowNumber'").Length > 0)
            {
                dept.RowNumber = Convert.ToInt32(sdr["RowNumber"]);
            }
            else
            {
                dept.RowNumber = i;
            }
            dept.Id = (int)sdr["Id"];
            dept.Name = sdr["Name"].ToString();
            dept.ShortName = sdr["ShortName"].ToString();
            dept.DepartmentTypeId = (int)sdr["DepartmentTypeId"];
            dept.ParentId = (int)sdr["ParentId"];
            if (sdr.GetSchemaTable().Select("ColumnName='ParentName'").Length > 0)
            {
                dept.ParentName = sdr["ParentName"].ToString();
            }
            dept.RegionId = sdr["RegionId"].ToString();
            dept.Longitude = (decimal)sdr["Longitude"];
            dept.Latitude = (decimal)sdr["Latitude"];
            dept.Memo = sdr["Memo"].ToString();
            return dept;
        }

        #region 没有权限限制的部门查询
        public IList<DepartmentInfo> GetAllDepartmentList(string departmentTypeIds)
        {
            IList<DepartmentInfo> deptList = new List<DepartmentInfo>();
            SqlParameter parm = new SqlParameter("@DepartmentTypeIds", departmentTypeIds);
            using (SqlDataReader sdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proDepartmentGetListByTypeIds", parm))
            {
                while (sdr.Read())
                {
                    deptList.Add(TranslateFromDataReader(sdr,0));
                }
                sdr.Close();
            }
            return deptList;
        }
        public IList<DepartmentInfo> GetSubDepartmentList(int deptId,bool haveSelf)
        {
            IList<DepartmentInfo> departmentList = new List<DepartmentInfo>();
            SqlParameter[] parm = new SqlParameter[1];
            parm[0] = new SqlParameter(PARM_Id, deptId);
            parm[1] = new SqlParameter(PARM_HaveSelf, haveSelf);
            using (SqlDataReader sdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proDepartmentGetSubList", parm))
            {
                while (sdr.Read())
                {
                    departmentList.Add(TranslateFromDataReader(sdr,0));
                }
                sdr.Close();
            }
            return departmentList;
        }
        public IList<DepartmentInfo> GetNextLevelDepartmentList(int deptId)
        {
            IList<DepartmentInfo> deptList = new List<DepartmentInfo>();
            SqlParameter[] parm = new SqlParameter[1];
            parm[0] = new SqlParameter(PARM_ParentId, deptId);
            //parm[1] = new SqlParameter(PARM)

            using (SqlDataReader sdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proDepartmentGetNextLevelListByParentId", parm))
            {
                while (sdr.Read())
                {
                    deptList.Add(TranslateFromDataReader(sdr,0));
                }
                sdr.Close();
            }
            return deptList;
        }
        public IList<DepartmentInfo> GetParentDepartmentList(int departmentTypeId)
        {
            IList<DepartmentInfo> deptList = new List<DepartmentInfo>();
            SqlParameter parm = new SqlParameter("@DepartmentTypeId", departmentTypeId);
            using (SqlDataReader sdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proDepartmentGetParentList", parm))
            {
                while (sdr.Read())
                {
                    deptList.Add(TranslateFromDataReader(sdr, 0));
                }
                sdr.Close();
            }
            return deptList;
        }
        #endregion

        #region 综合查询

        public IList<DepartmentViewInfo> GetDepartmentList(int xuserId,string name, int parentId, int departmentTypeId, int propertyId,string leader, int dataStatusId, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            IList<DepartmentViewInfo> list = new List<DepartmentViewInfo>();
            SqlParameter[] parm = new SqlParameter[13];

            parm[0] = new SqlParameter("@XuserId", 0);
            parm[1] = new SqlParameter(PARM_Name, name);
            parm[2] = new SqlParameter(PARM_ParentId, parentId);
            parm[3] = new SqlParameter(PARM_DepartmentTypeId, departmentTypeId);
            parm[4] = new SqlParameter(PARM_PropertyId, propertyId);
            parm[5] = new SqlParameter("@Leader", leader);
            parm[6] = new SqlParameter(PARM_DataStatusId, dataStatusId);
            parm[7] = new SqlParameter(PARM_RecordSetType, 1);
            parm[8] = new SqlParameter(PARM_IsPaged, isPaged);
            parm[9] = new SqlParameter(PARM_PageNumber, pageNumber);
            parm[10] = new SqlParameter(PARM_PageSize, pageSize);
            parm[11] = new SqlParameter(PARM_OrderFieldName, orderFieldName);
            parm[12] = new SqlParameter(PARM_OrderType, orderType);

            using (SqlDataReader sdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proDepartmentGetListFull", parm))
            {
                while (sdr.Read())
                {
                    DepartmentViewInfo department = new DepartmentViewInfo();

                    department.RowNumber = Convert.ToInt32(sdr["RowNumber"]);
                    department.Id = Convert.ToInt32(sdr["Id"]);
                    department.Name = (sdr["Name"]).ToString();
                    department.ShortName = sdr["ShortName"].ToString();
                    department.ParentId = Convert.ToInt32(sdr["ParentId"]);
                    department.ParentDepartment = (sdr["ParentDepartment"]).ToString();
                    department.DepartmentTypeId = Convert.ToInt32(sdr["DepartmentTypeId"]);
                    department.DepartmentType = (sdr["DepartmentType"]).ToString();
                    department.LeaderId = Convert.ToInt32(sdr["LeaderId"]);
                    department.Leader = sdr["Leader"].ToString();
                    department.PropertyId = Convert.ToInt32(sdr["PropertyId"]);
                    department.Property = sdr["Property"].ToString();
                    department.RegionId = (sdr["RegionId"]).ToString();
                    department.Region = (sdr["Region"]).ToString();
                    department.FullName = (sdr["FullName"]).ToString();
                    department.IsLocked = (bool)sdr["IsLocked"];
                    department.Lock = department.IsLocked ? "锁定" : "";
                    department.Memo = sdr["Memo"].ToString();
                    department.DataStatusId = Convert.ToInt32(sdr["DataStatusId"]);
                    list.Add(department);
                }
                sdr.Close();
            }
            return list;
        }

        public int GetDepartmentListCount(int xuserId, string name, int parentId, int departmentTypeId, int propertyId,string leader, int dataStatusId)
        {
            SqlParameter[] parm = new SqlParameter[13];

            parm[0] = new SqlParameter("@XuserId", 0);
            parm[1] = new SqlParameter(PARM_Name, name);
            parm[2] = new SqlParameter(PARM_ParentId, parentId);
            parm[3] = new SqlParameter(PARM_DepartmentTypeId, departmentTypeId);
            parm[4] = new SqlParameter(PARM_PropertyId, propertyId);
            parm[5] = new SqlParameter("@Leader", leader);
            parm[6] = new SqlParameter(PARM_DataStatusId, dataStatusId);
            parm[7] = new SqlParameter(PARM_RecordSetType, 2);
            parm[8] = new SqlParameter(PARM_IsPaged, 0);
            parm[9] = new SqlParameter(PARM_PageNumber, 0);
            parm[10] = new SqlParameter(PARM_PageSize, 0);
            parm[11] = new SqlParameter(PARM_OrderFieldName, "");
            parm[12] = new SqlParameter(PARM_OrderType, "");
            return (int)SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proDepartmentGetListFull", parm);
        }

        //根据xuserId、oldDepartmentId、newDepartmentId获取用户权限下除原部门和现部门之外的部门列表（用于人员部门调动更新）
        public IList<DepartmentViewInfo> DepartmentGetListByOldDepartmentIdAndNewDepartmentId(int xuserId, int oldDepartmentId, int newDepartmentId)
        {
            IList<DepartmentViewInfo> Departments = new List<DepartmentViewInfo>();
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_XuserId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_OldDepartmentId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_NewDepartmentId, SqlDbType.Int);

            parm[0].Value = xuserId;
            parm[1].Value = oldDepartmentId;
            parm[2].Value = newDepartmentId;

            using (
                SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proDepartmentGetListByOldDepartmentIdAndNewDepartmentId", parm))
            {
                while (rdr.Read())
                {
                    DepartmentViewInfo Department = new DepartmentViewInfo();
                    Department.Id = Convert.ToInt32(rdr["Id"]);
                    Department.Name = rdr["Name"].ToString();
                    Department.ParentId = Convert.ToInt32(rdr["ParentId"]);
                    Department.DepartmentTypeId = Convert.ToInt32(rdr["DepartmentTypeId"]);
                    Department.DepartmentType = Convert.ToString(rdr["DepartmentType"]);
                    Departments.Add(Department);
                }
                rdr.Close();
            }
            return Departments;
        }
        #endregion

        public int GetDepartmentXuserCount(int departmentId)
        {
            SqlParameter[] parm = new SqlParameter[1];
            parm[0] = new SqlParameter("@DepartmentId", departmentId);
            return (int)SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proDepartmentXuserCount", parm);
        }
    }
}