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
    public class RegionDao:IRegionDao
    {
        #region 参数
        //参数
        private const string PARM_Idd = "@Idd";
        private const string PARM_Id = "@Id";
        private const string PARM_Name = "@Name";
        private const string PARM_ParentId = "@ParentId";
		private const string PARM_ShortName = "@ShortName";
		private const string PARM_LevelType = "@LevelType";
		private const string PARM_CityCode = "@CityCode";
		private const string PARM_ZipCode = "@ZipCode";
		private const string PARM_ExtendInfo = "@ExtendInfo";
		private const string PARM_Longitude = "@Longitude";
		private const string PARM_Latitude = "@Latitude";
        private const string PARM_PinYin = "@PinYin";
        private const string PARM_DataStatusId = "@DataStatusId";
        private const string PARM_Memo = "@Memo";
        private const string PARM_CreatorId = "@CreatorId";
		private const string PARM_ModifierId = "@ModifierId";
		private const string PARM_RegionId = "@RegionId";
		//扩展参数 
		private const string PARM_XuserId = "@XuserId";
        private const string PARM_RecordSetType = "@regionSetType";
        private const string PARM_IsPaged = "@IsPaged";
        private const string PARM_PageNumber = "@PageNumber";
        private const string PARM_PageSize = "@PageSize";
        private const string PARM_OrderFieldName = "@OrderFieldName";
        private const string PARM_OrderType = "@OrderType";

        private const string PARM_Length = "@Length";
        private const string PARM_HasSelf = "@HasSelf";
		private const string PARM_DepartmentId = "@DepartmentId";
		private const string PARM_IsSecond = "@IsSecond";
		private const string PARM_Level = "@Level";
        private const string PARM_TopNLevel = "@TopNLevel";
        #endregion 参数结束

        #region 增删改
        public int InsertRegion(RegionInfo ri)
        {
            SqlParameter[] parm = new SqlParameter[10];
            parm[0] = new SqlParameter(PARM_Id, ri.Id);
            parm[1] = new SqlParameter(PARM_Name, ri.Name);
            parm[2] = new SqlParameter(PARM_ParentId, ri.ParentId);
            parm[3] = new SqlParameter(PARM_ShortName, ri.ShortName);
            parm[4] = new SqlParameter(PARM_CityCode, ri.CityCode);
            parm[5] = new SqlParameter(PARM_PinYin, ri.Pinyin);
            parm[6] = new SqlParameter(PARM_ZipCode, ri.ZipCode);
            parm[7] = new SqlParameter(PARM_Longitude, ri.Longitude);
            parm[8] = new SqlParameter(PARM_Latitude, ri.Latitude);
            parm[9] = new SqlParameter(PARM_XuserId, ri.CreatorId);
            return SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proRegionInsert", parm);
        }
        public int UpdateRegion(RegionInfo ri)
        {
            SqlParameter[] parm = new SqlParameter[11];
            parm[0] = new SqlParameter(PARM_Idd, ri.Idd);
            parm[1] = new SqlParameter(PARM_Id, ri.Id);
            parm[2] = new SqlParameter(PARM_Name, ri.Name);
            parm[3] = new SqlParameter(PARM_ParentId, ri.ParentId);
            parm[4] = new SqlParameter(PARM_ShortName, ri.ShortName);
            parm[5] = new SqlParameter(PARM_CityCode, ri.CityCode);
            parm[6] = new SqlParameter(PARM_PinYin, ri.Pinyin);
            parm[7] = new SqlParameter(PARM_ZipCode, ri.ZipCode);
            parm[8] = new SqlParameter(PARM_Longitude, ri.Longitude);
            parm[9] = new SqlParameter(PARM_Latitude, ri.Latitude);
            parm[10] = new SqlParameter(PARM_XuserId, ri.ModifierId);
            return SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proRegionUpdate", parm);
        }
        public int DeleteRegion(RegionInfo ri)
        {
            SqlParameter[] parm = new SqlParameter[1];
            parm[0] = new SqlParameter(PARM_Idd, ri.Idd);
            return SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proRegionDelete", parm);
        }
        #endregion

        #region 是否存在判断
        public bool IsExistedNewShortName(string name, int idd)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = new SqlParameter(PARM_Idd, idd);
            parm[1] = new SqlParameter(PARM_ShortName, name);
            int i = SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proRegionIsExistedNewShortName", parm);
            return (i == 1) ? true : false;
        }
        public bool IsExistedNewName(string name, int idd)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = new SqlParameter(PARM_Idd, idd);
            parm[1] = new SqlParameter(PARM_Name, name);
            int i = SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proRegionIsExistedNewName", parm);
            return (i == 1) ? true : false;
        }
        public bool IsExistedShortName(string name)
        {
            SqlParameter[] parm = new SqlParameter[1];
            parm[0] = new SqlParameter(PARM_ShortName, name);
            int i = SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proRegionIsExistedShortName", parm);
            return (i == 1) ? true : false;
        }
        public bool IsExistedName(string name)
        {
            SqlParameter[] parm = new SqlParameter[1];
            parm[0] = new SqlParameter(PARM_Name, name);
            int i = SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proRegionIsExistedName", parm);
            return (i == 1) ? true : false;
        }
        public bool IsExistedRegion(string id)
        {
            SqlParameter[] parm = new SqlParameter[1];
            parm[0] = new SqlParameter(PARM_Id, id);
            int i = SqlHelper.ExecuteProcedureReturnValue(SqlHelper.ConnectionString, "proRegionIsExisted", parm);
            return (i == 1) ? true : false;
        }
        #endregion

        #region 单个查询
        public RegionInfo GetRegionByName(string name)
        {
            RegionInfo region = new RegionInfo();
            SqlParameter parm = new SqlParameter(PARM_Name, name);
            using (SqlDataReader sdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, "proRegionGetByName", parm))
            {
                while (sdr.Read())
                {
                    region = TranslateRegionInfoFromDataReader(sdr);
                }
            }
            return region;
        }
        public RegionInfo GetRegionById(string id)
        {
            RegionInfo region = new RegionInfo();
            SqlParameter parm = new SqlParameter(PARM_Id, id);
            using (SqlDataReader sdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, "proRegionGetByName", parm))
            {
                while (sdr.Read())
                {
                    region = TranslateRegionInfoFromDataReader(sdr);
                }
            }
            return region;
        }

        private RegionInfo TranslateRegionInfoFromDataReader(SqlDataReader sdr)
        {
            RegionInfo region = new RegionInfo();
            region = new RegionInfo();
            region.Idd = (int)sdr["Idd"];
            region.Id = sdr["Id"].ToString();
            region.Name = sdr["Name"].ToString();
            region.ParentId = sdr["ParentId"].ToString();
            region.ShortName = sdr["ShortName"].ToString();
            region.LevelType = Convert.ToInt32(sdr["LevelType"]);
            region.CityCode = sdr["CityCode"].ToString();
            region.ZipCode = sdr["ZipCode"].ToString();
            region.Pinyin = sdr["Pinyin"].ToString();
            region.Longitude = (decimal)sdr["Longitude"];
            region.Latitude = (decimal)sdr["Latitude"];
            return region;
        }
        #endregion

        #region 获取RegionList
        public IList<RegionInfo> GetAllList()
        {
            IList<RegionInfo> regionList = new List<RegionInfo>();
            RegionInfo region = new RegionInfo();
            using (SqlDataReader sdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proRegionGetAll"))
            {
                while (sdr.Read())
                {
                     regionList.Add(TranslateRegionInfoFromDataReader(sdr));
                }
                sdr.Close();
            }
            return regionList;
        }

        //获取录入后的信息或最近的N条信息
        public IList<RegionShortInfo> GetRegionList(string id, string name, string parentId, string pinYin, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            SqlParameter[] parm = new SqlParameter[10];
            parm[0] = new SqlParameter(PARM_Id, SqlDbType.VarChar);
            parm[1] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_ParentId, SqlDbType.VarChar);
            parm[3] = new SqlParameter(PARM_PinYin, SqlDbType.VarChar);
            parm[4] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);
            parm[5] = new SqlParameter(PARM_IsPaged, SqlDbType.Bit);
            parm[6] = new SqlParameter(PARM_PageNumber, SqlDbType.Int);
            parm[7] = new SqlParameter(PARM_PageSize, SqlDbType.Int);
            parm[8] = new SqlParameter(PARM_OrderFieldName, SqlDbType.VarChar);
            parm[9] = new SqlParameter(PARM_OrderType, SqlDbType.VarChar);

            parm[0].Value = id;
            parm[1].Value = name;
            parm[2].Value = parentId;
            parm[3].Value = pinYin;
            parm[4].Value = 1;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总
            parm[5].Value = isPaged;
            parm[6].Value = pageNumber;
            parm[7].Value = pageSize;
            parm[8].Value = orderFieldName;
            parm[9].Value = orderType;

            IList<RegionShortInfo> regionList = new List<RegionShortInfo>();
            using (SqlDataReader sdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proRegionGetList", parm))
            {
                while (sdr.Read())
                {
                    regionList.Add(TranslateRegionShortInfoFromDataReader(sdr, 0));
                }
                sdr.Close();
            }
            return regionList;
        }

        //获取RegionListSum,记录总数和汇总值
        public int GetRegionListCount(string id, string name, string parentId, string pinYin)
        {
            SqlParameter[] parm = new SqlParameter[5];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.VarChar);
            parm[1] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_ParentId, SqlDbType.VarChar);
            parm[3] = new SqlParameter(PARM_PinYin, SqlDbType.VarChar);
            parm[4] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);

            parm[0].Value = id;
            parm[1].Value = name;
            parm[2].Value = parentId;
            parm[3].Value = pinYin;
            parm[4].Value = 2;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总

            return (int)SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proRegionGetList", parm);
        }

        public IList<RegionShortInfo> GetProvinceList()
        {
            IList<RegionShortInfo> regionList = new List<RegionShortInfo>();
            using (SqlDataReader sdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proRegionGetProvinceList"))
            {
                while (sdr.Read())
                {
                    regionList.Add(TranslateRegionShortInfoFromDataReader(sdr, 0));
                }
                sdr.Close();
            }
            return regionList;
        }

        public IList<RegionShortInfo> GetMunicipalList(string provinceId)
        {
            IList<RegionShortInfo> regionList = new List<RegionShortInfo>();
            SqlParameter[] parm = new SqlParameter[1];
            parm[0] = new SqlParameter(PARM_Id, provinceId);

            using (SqlDataReader sdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proRegionGetMunicipalListByProvinceId", parm))
            {
                while (sdr.Read())
                {
                    regionList.Add(TranslateRegionShortInfoFromDataReader(sdr, 0));
                }
                sdr.Close();
            }
            return regionList;
        }

        public IList<RegionShortInfo> GetTopNLevelRegionList(int topNLevel)
        {
            IList<RegionShortInfo> regionList = new List<RegionShortInfo>();
            SqlParameter[] parm = new SqlParameter[1];
            parm[0] = new SqlParameter(PARM_TopNLevel, topNLevel);
            using (SqlDataReader sdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proRegionTopNLevelList",parm))
            {
                while (sdr.Read())
                {
                    regionList.Add(TranslateRegionShortInfoFromDataReader(sdr, 0));
                }
                sdr.Close();
            }
            return regionList;
        }

        public IList<RegionShortInfo> GetRegionListByShortId(string id, int length, int hasSelf)
        {
            SqlParameter[] parm = new SqlParameter[3];
            parm[0] = new SqlParameter(PARM_Id, id);
            parm[1] = new SqlParameter(PARM_Length, length);
            parm[2] = new SqlParameter(PARM_HasSelf, hasSelf);

            IList<RegionShortInfo> regionList = new List<RegionShortInfo>();

            using (SqlDataReader sdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proRegionGetListByShortId", parm))
            {
                while (sdr.Read())
                {
                    regionList.Add(TranslateRegionShortInfoFromDataReader(sdr, 0));
                }
                sdr.Close();
            }
            return regionList;
        }
        public IList<RegionShortInfo> GetNextLevelRegionList(string parentId, int hasSelf)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = new SqlParameter(PARM_Id, parentId);
            parm[1] = new SqlParameter(PARM_HasSelf, hasSelf);

            IList<RegionShortInfo> regionList = new List<RegionShortInfo>();

            using (SqlDataReader sdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proRegionGetNextLevelListByParentId", parm))
            {
                while (sdr.Read())
                {
                    regionList.Add(TranslateRegionShortInfoFromDataReader(sdr,0));
                }
                sdr.Close();
            }
            return regionList;
        }
        public IList<RegionShortInfo> GetSubRegionList(string id, int hasSelf)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = new SqlParameter(PARM_Id, id);
            parm[1] = new SqlParameter(PARM_HasSelf, hasSelf);

            IList<RegionShortInfo> regionList = new List<RegionShortInfo>();

            using (SqlDataReader sdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proRegionGetSubListById", parm))
            {
                while (sdr.Read())
                {
                    regionList.Add(TranslateRegionShortInfoFromDataReader(sdr,0));
                }
                sdr.Close();
            }
            return regionList;
        }

        private RegionShortInfo TranslateRegionShortInfoFromDataReader(SqlDataReader sdr,int i)
        {
            RegionShortInfo region = new RegionShortInfo();
            
            if (sdr.GetSchemaTable().Select("ColumnName='RowNumber'").Length > 0)
            {
                region.RowNumber = Convert.ToInt32(sdr["RowNumber"]);
            }
            else
            {
                region.RowNumber = i;
            }
            region.Idd = (int)sdr["Idd"];
            region.Id = sdr["Id"].ToString();
            region.Name = sdr["Name"].ToString();
            region.ParentId = sdr["ParentId"].ToString();
            region.ShortName = sdr["ShortName"].ToString();
            region.Pinyin = sdr["Pinyin"].ToString();
            region.Longitude = (decimal)sdr["Longitude"];
            region.Latitude = (decimal)sdr["Latitude"];
            return region;
        }
        #endregion

    }
}