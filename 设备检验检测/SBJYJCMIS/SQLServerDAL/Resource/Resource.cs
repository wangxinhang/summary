using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using SBJYJCMIS.BLL;
using SBJYJCMIS.IDAL;
using SBJYJCMIS.Model;
using SBJYJCMIS.DBUtility;

namespace SBJYJCMIS.SQLServerDAL
{
    public class Resource:IResource
    {
        #region 参数
        //参数        
        private const string PARM_Id = "@Id";
        private const string PARM_Name = "@Name";
        private const string PARM_ResourceTypeId = "@ResourceTypeId";
        private const string PARM_DataStatusId = "@DataStatusId";
        private const string PARM_Memo = "@Memo";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_ModifierId = "@ModifierId";

        //扩展参数 
        private const string PARM_ResourceObject = "@ResourceObject";
        private const string PARM_XuserId = "@XuserId";
        private const string PARM_RecordSetType = "@RecordSetType";
        private const string PARM_IsPaged = "@IsPaged";
        private const string PARM_PageNumber = "@PageNumber";
        private const string PARM_PageSize = "@PageSize";
        private const string PARM_OrderFieldName = "@OrderFieldName";
        private const string PARM_OrderType = "@OrderType";

        #endregion 参数结束

        #region 数据记录操作（插入、更新、删除）
        //插入新记录
        public bool ResourceInsertTran(ResourceInfo resource)
        {
            SqlParameter[] parm = new SqlParameter[5];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_ResourceTypeId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_ResourceObject, SqlDbType.NVarChar);
            parm[3] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[4] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);

            parm[0].Value = resource.Name;
            parm[1].Value = resource.ResourceTypeId;
            parm[2].Value = resource.ResourceObject;
            parm[3].Value = resource.Memo;
            parm[4].Value = resource.CreatorId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proResourceInsertTran", parm);
            return (retval > 0) ? true : false;
        }

        //根据ResourceId删除记录
        public bool ResourceDeleteTranById(int id,int resourceTypeId)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_ResourceTypeId, SqlDbType.Int);

            parm[0].Value = id;
            parm[1].Value = resourceTypeId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proResourceDeleteTranById", parm);
            return (retval > 0) ? true : false;
        }

        //更新记录
        public bool ResourceUpdateTranById(ResourceInfo resource)
        {
            SqlParameter[] parm = new SqlParameter[7];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_ResourceTypeId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_ResourceObject, SqlDbType.NVarChar);
            parm[4] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[6] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = resource.Id;
            parm[1].Value = resource.Name;
            parm[2].Value = resource.ResourceTypeId;
            parm[3].Value = resource.ResourceObject;
            parm[4].Value = resource.DataStatusId;
            parm[5].Value = resource.Memo;
            parm[6].Value = resource.ModifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proResourceUpdateTranById", parm);
            return (retval > 0) ? true : false;
        }
        #endregion 数据记录操作（插入、更新、删除）结束

        #region 根据条件获取结果
        //验证是否存在
        public bool ResourceIsExisted(string name, int resourceTypeId)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_ResourceTypeId, SqlDbType.Int);

            parm[0].Value = name;
            parm[1].Value = resourceTypeId;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proResourceIsExisted", parm);
            return obj == null ? false : (bool)obj;
        }
        #endregion 按条件读取记录结束

        #region 获取ResourceList

        //获取录入后的信息或最近的N条信息
        public IList<ResourceListInfo> ResourceGetList(string name,int resourceTypeId, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            SqlParameter[] parm = new SqlParameter[8];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_ResourceTypeId, SqlDbType.Int);

            parm[2] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[4] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[7] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = name;
            parm[1].Value = resourceTypeId;

            parm[2].Value = 1;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总
            parm[3].Value = isPaged;
            parm[4].Value = pageNumber;
            parm[5].Value = pageSize;
            parm[6].Value = orderFieldName;
            parm[7].Value = orderType;

            IList<ResourceListInfo> recordList = new List<ResourceListInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proResourceGetList", parm))
            {
                while (rdr.Read())
                {
                    ResourceListInfo record = new ResourceListInfo();

                    record.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    record.Id = Convert.ToInt32(rdr["Id"]);
                    record.Name = rdr["Name"].ToString();
                    record.Memo = rdr["Memo"].ToString();
                    record.ResourceTypeId = Convert.IsDBNull(rdr["ResourceTypeId"]) ? 0 : Convert.ToInt32(rdr["ResourceTypeId"]);
                    record.ResourceType = rdr["ResourceType"].ToString();
                    record.ResourceObject = rdr["ResourceObject"].ToString();

                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }

        //获取ResourceListSum,记录总数和汇总值
        public ResourceSumInfo ResourceGetListSum(string name, int resourceTypeId)
        {
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_ResourceTypeId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);

            parm[0].Value = name;
            parm[1].Value = resourceTypeId;
            parm[2].Value = 2;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总

            ResourceSumInfo record = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proResourceGetList", parm))
            {
                while (rdr.Read())
                {
                    record = new ResourceSumInfo();
                    record.RecordCount = Convert.IsDBNull(rdr["RecordCount"]) ? 0 : Convert.ToInt32(rdr["RecordCount"]);
                }
                rdr.Close();
            }
            return record;
        }
        #endregion 获取ResourceList

        #region 获取ResourceList：用于设置可配置权限

        //获取录入后的信息或最近的N条信息
        public IList<ResourceOperationListInfo> ResourceGetOperationList(string name, int resourceTypeId, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            SqlParameter[] parm = new SqlParameter[8];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_ResourceTypeId, SqlDbType.Int);

            parm[2] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[4] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[6] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[7] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = name;
            parm[1].Value = resourceTypeId;

            parm[2].Value = 1;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总
            parm[3].Value = isPaged;
            parm[4].Value = pageNumber;
            parm[5].Value = pageSize;
            parm[6].Value = orderFieldName;
            parm[7].Value = orderType;

            IList<ResourceOperationListInfo> recordList = new List<ResourceOperationListInfo>();
            Permission permission = new Permission();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proResourceGetList", parm))
            {
                while (rdr.Read())
                {
                    ResourceOperationListInfo record = new ResourceOperationListInfo();

                    record.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    record.Id = Convert.ToInt32(rdr["Id"]);
                    record.Name = rdr["Name"].ToString();
                    record.Memo = rdr["Memo"].ToString();
                    record.ResourceTypeId = Convert.IsDBNull(rdr["ResourceTypeId"]) ? 0 : Convert.ToInt32(rdr["ResourceTypeId"]);
                    record.ResourceType = rdr["ResourceType"].ToString();
                    record.ResourceObject = rdr["ResourceObject"].ToString();
                    record.OperationList = permission.PermissionGetOperationListByResourceId(record.Id, 2);

                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }

        //获取ResourceListSum,记录总数和汇总值
        public RecordCountInfo ResourceGetOperationListSum(string name, int resourceTypeId)
        {
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_ResourceTypeId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);

            parm[0].Value = name;
            parm[1].Value = resourceTypeId;
            parm[2].Value = 2;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总

            RecordCountInfo record = null;
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proResourceGetList", parm))
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
        #endregion 获取ResourceList：用于设置可配置权限
    }
}