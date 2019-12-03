using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;
using SBJYJCMIS.DBUtility;
using SBJYJCMIS.IDAL;
using System.Data;
using System.Data.SqlClient;

namespace SBJYJCMIS.SQLServerDAL
{
    public class DimisionType : IDimisionType
    {
        #region 参数

        private const string PARM_Id = "@Id";
        private const string PARM_Name = "@Name";
        private const string PARM_Memo = "@Memo";
        private const string PARM_DataStatusId = "@DataStatusId";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_DateCreated = "@DateCreated";
        private const string PARM_ModifierId = "@ModifierId";
        private const string PARM_DateModified = "@DateModified";

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

        #endregion

        #region 数据记录操作（插入、更新、删除）

        //插入DimisionType新纪录
        public bool DimisionTypeInsert(DimisionTypeInfo DimisionType)
        {
            SqlParameter[] parm = new SqlParameter[3];
            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar, 30);
            parm[1] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar, 256);
            parm[2] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);

            //给参数附值
            parm[0].Value = DimisionType.Name;
            parm[1].Value = DimisionType.Memo;
            parm[2].Value = DimisionType.CreatorId;
            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proDimisionTypeInsert", parm);
            return (retval > 0) ? true : false;
        }

        //更新记录
        public bool DimisionTypeUpdateById(DimisionTypeInfo DimisionType)
        {
            SqlParameter[] parm = new SqlParameter[4];
            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_Name, SqlDbType.NVarChar, 30);
            parm[2] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar, 256);
            parm[3] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = DimisionType.Id;
            parm[1].Value = DimisionType.Name;
            parm[2].Value = DimisionType.Memo;
            parm[3].Value = DimisionType.ModifierId;
            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proDimisionTypeUpdateById", parm);
            return (retval > 0) ? true : false;
        }

        //根据Id删除记录
        public bool DimisionTypeUpdateDataStatusIdById(DimisionTypeInfo DimisionType)
        {
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = DimisionType.Id;
            parm[1].Value = DimisionType.DataStatusId;
            parm[2].Value = DimisionType.ModifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proDimisionTypeUpdateDataStatusIdById", parm);
            return (retval > 0) ? true : false;
        }

        #endregion 数据记录操作（插入、更新、删除）结束

        #region 根据条件获取记录

        //获取离职类别集合
        public IList<DimisionTypeInfo> DimisionTypeGetNameList()
        {
            IList<DimisionTypeInfo> DimisionTypes = new List<DimisionTypeInfo>();
            using (
                     SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure,
                                                "proDimisionTypeGetNameList"))
            {
                while (rdr.Read())
                {
                    DimisionTypeInfo DimisionType = new DimisionTypeInfo();
                    DimisionType.Id = Convert.ToInt32(rdr["Id"]);
                    DimisionType.Name = rdr["Name"].ToString();
                    DimisionTypes.Add(DimisionType);
                }
                rdr.Close();
            }
            return DimisionTypes;
        }

        //根据名称验证离职类别是否存在
        public bool DimisionTypeIsExistedByName(string name)
        {
            SqlParameter parm = new SqlParameter(PARM_Name, SqlDbType.VarChar);
            parm.Value = name;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proDimisionTypeIsExistedByName", parm);
            return obj == null ? false : (bool)obj;
        }

        //根据名称验证人员离职类别名称是否存在(排除原来人员离职类别名称，用于更新)
        public bool DimisionTypeIsExistedByNewNameAndOldName(string newName, string oldName)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_OldName, SqlDbType.NVarChar);

            parm[0].Value = newName;
            parm[1].Value = oldName;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proDimisionTypeIsExistedByNewNameAndOldName", parm);
            return obj == null ? false : (bool)obj;
        }

        #endregion  根据条件获取记录

        #region 获取DimisionTypeGetList

        //根据条件获取DimisionTypeGetList信息
        public IList<DimisionTypeListInfo> DimisionTypeGetList(string name, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            IList<DimisionTypeListInfo> DimisionTypeLists = new List<DimisionTypeListInfo>();
            SqlParameter[] parm = new SqlParameter[7];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[3] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[6] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = name;

            parm[1].Value = 1;
            parm[2].Value = isPaged;
            parm[3].Value = pageNumber;
            parm[4].Value = pageSize;
            parm[5].Value = orderFieldName;
            parm[6].Value = orderType;

            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure,
                                                            "proDimisionTypeGetList", parm))
            {
                while (rdr.Read())
                {
                    DimisionTypeListInfo DimisionTypeList = new DimisionTypeListInfo();

                    DimisionTypeList.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    DimisionTypeList.Id = Convert.ToInt32(rdr["Id"]);
                    DimisionTypeList.Name = (rdr["Name"]).ToString();
                    DimisionTypeList.Memo = (rdr["Memo"]).ToString();
                    DimisionTypeLists.Add(DimisionTypeList);

                }
                rdr.Close();
            }
            return DimisionTypeLists;
        }

        #endregion 获取DimisionTypeGetList 结束

        #region 获取DimisionType汇总

        //获取DimisionTypeListSum,记录总数和汇总值
        public RecordCountInfo DimisionTypeGetListSum(string name)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);

            parm[0].Value = name;
            parm[1].Value = 2;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总

            RecordCountInfo record = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proDimisionTypeGetList", parm))
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

        #endregion 获取DimisionType汇总 结束

    }
}
