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
    public class DepartmentTypeDao : IDepartmentTypeDao
    {

        #region 参数

        private const string PARM_Id = "@Id";
        private const string PARM_Name = "@Name";
        private const string PARM_ParentId = "@ParentId";
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

        #region 增删该

        //插入新记录
        public bool InsertDepartmentType(DepartmentTypeViewInfo DepartmentType)
        {
            SqlParameter[] parm = new SqlParameter[4];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_ParentId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[3] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);

            parm[0].Value = DepartmentType.Name;
            parm[1].Value = DepartmentType.ParentId;
            parm[2].Value = DepartmentType.Memo;
            parm[3].Value = DepartmentType.CreatorId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proDepartmentTypeInsert", parm);
            return (retval > 0) ? true : false;
        }

        //更新记录
        public bool UpdateDepartmentType(DepartmentTypeViewInfo DepartmentType)
        {
            SqlParameter[] parm = new SqlParameter[5];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_ParentId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[4] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = DepartmentType.Id;
            parm[1].Value = DepartmentType.Name;
            parm[2].Value = DepartmentType.ParentId;
            parm[3].Value = DepartmentType.Memo;
            parm[4].Value = DepartmentType.ModifierId;

            int retval = SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proDepartmentTypeUpdateTran", parm);
            return (retval > 0) ? true : false;
        }

        //根据DepartmentTypeId删除记录
        public bool DeleteDepartmentType(DepartmentTypeViewInfo DepartmentType)
        {
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = DepartmentType.Id;
            parm[1].Value = DepartmentType.DataStatusId;
            parm[2].Value = DepartmentType.ModifierId;

            int retval = SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proDepartmentTypeUpdateDataStatusIdTran", parm);
            return (retval > 0) ? true : false;
        }

        #endregion 数据记录操作（插入、更新、删除）结束

        #region 按条件读取记录

        //获取DepartmentType列表
        //根据名称验证部门类别是否存在
        public bool IsExistedByName(string name)
        {
            SqlParameter parm = new SqlParameter(PARM_Name, SqlDbType.VarChar);
            parm.Value = name;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proDepartmentTypeIsExistedByName", parm);
            return obj == null ? false : (bool)obj;
        }

        //根据名称验证部门类别名称是否存在(排除原来部门类别名称，用于更新)
        public bool IsExistedByNewNameAndOldName(string newName, string oldName)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_OldName, SqlDbType.NVarChar);

            parm[0].Value = newName;
            parm[1].Value = oldName;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proDepartmentTypeIsExistedByNewNameAndOldName", parm);
            return obj == null ? false : (bool)obj;
        }

        //public IList<DepartmentTypeViewInfo> GetDepartmentTypeParentList()
        //{
        //    IList<DepartmentTypeViewInfo> DepartmentTypes = new List<DepartmentTypeViewInfo>();

        //    using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proDepartmentTypeGetParentList"))
        //    {
        //        while (rdr.Read())
        //        {
        //            DepartmentTypeViewInfo DepartmentType = new DepartmentTypeViewInfo();
        //            DepartmentType.Id = Convert.ToInt32(rdr["Id"]);
        //            DepartmentType.Name = rdr["Name"].ToString();
        //            DepartmentTypes.Add(DepartmentType);
        //        }
        //        rdr.Close();
        //    }
        //    return DepartmentTypes;
        //}

        public IList<DepartmentTypeViewInfo> GetDepartmentTypeList(string name, int parentId, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            IList<DepartmentTypeViewInfo> list = new List<DepartmentTypeViewInfo>();
            SqlParameter[] parm = new SqlParameter[8];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_ParentId, SqlDbType.Int);

            parm[2] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[4] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[7] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = name;
            parm[1].Value = parentId;

            parm[2].Value = 1;
            parm[3].Value = isPaged;
            parm[4].Value = pageNumber;
            parm[5].Value = pageSize;
            parm[6].Value = orderFieldName;
            parm[7].Value = orderType;

            using (SqlDataReader sdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure,"proDepartmentTypeGetList", parm))
            {
                while (sdr.Read())
                {
                    list.Add(TranslateFromDataReader(sdr,0));
                    DepartmentTypeViewInfo DepartmentTypeList = new DepartmentTypeViewInfo();
                }
                sdr.Close();
            }
            return list;
        }

        private DepartmentTypeViewInfo TranslateFromDataReader(SqlDataReader sdr,int i)
        {
            DepartmentTypeViewInfo dtvi = new DepartmentTypeViewInfo();
            if (sdr.GetSchemaTable().Select("ColumnName='RowNumber'").Length > 0)
            {
                dtvi.RowNumber = Convert.ToInt32(sdr["RowNumber"]);
            }
            else
            {
                dtvi.RowNumber = i;
            }
            dtvi.Id = Convert.ToInt32(sdr["Id"]);
            dtvi.Name = sdr["Name"].ToString();
            dtvi.ParentId = Convert.IsDBNull(sdr["ParentId"]) ? 0 : Convert.ToInt32(sdr["ParentId"]);
            dtvi.ParentDepartmentType = sdr["ParentDepartmentType"].ToString();
            dtvi.Memo = sdr["Memo"].ToString();
            return dtvi;
        }

        //获取DepartmentTypeListSum,记录总数和汇总值
        public int GetDepartmentTypeListCount(string name, int parentId)
        {
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_ParentId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);

            parm[0].Value = name;
            parm[1].Value = parentId;
            parm[2].Value = 2;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总
            return (int)SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proDepartmentTypeGetList", parm);
        }

        #endregion 获取DepartmentType汇总 结束

    }
}

