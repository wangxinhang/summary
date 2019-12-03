using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using SBJYJCMIS.Model;
using SBJYJCMIS.DBUtility;
using SBJYJCMIS.IDAL;

namespace SBJYJCMIS.SQLServerDAL
{
    public class PositionDao : IPositionDao
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
        private const string PARM_OldPositionId = "@OldPositionId";
        private const string PARM_NewPositionId = "@NewPositionId";

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

        #region 增删改
        public bool InsertPosition(PositionInfo Position)
        {
            SqlParameter[] parm = new SqlParameter[3];
            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar, 30);
            parm[1] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar, 256);
            parm[2] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);

            //给参数附值
            parm[0].Value = Position.Name;
            parm[1].Value = Position.Memo;
            parm[2].Value = Position.CreatorId;
            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proPositionInsert", parm);
            return (retval > 0) ? true : false;
        }

        //更新记录
        public bool UpdatePosition(PositionInfo Position)
        {
            SqlParameter[] parm = new SqlParameter[4];
            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_Name, SqlDbType.NVarChar, 30);
            parm[2] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar, 256);
            parm[3] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = Position.Id;
            parm[1].Value = Position.Name;
            parm[2].Value = Position.Memo;
            parm[3].Value = Position.ModifierId;
            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proPositionUpdateById", parm);
            return (retval > 0) ? true : false;
        }

        //根据Id删除记录
        public bool DeletePosition(PositionInfo Position)
        {
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = Position.Id;
            parm[1].Value = Position.DataStatusId;
            parm[2].Value = Position.ModifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proPositionUpdateDataStatusIdById", parm);
            return (retval > 0) ? true : false;
        }
        #endregion

        #region 是否存在判断
        //根据名称验证人员职位是否存在
        public bool IsExistedByName(string name)
        {
            SqlParameter parm = new SqlParameter(PARM_Name, SqlDbType.VarChar);
            parm.Value = name;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proPositionIsExistedByName", parm);
            return obj == null ? false : (bool)obj;
        }
        
        //根据名称验证人员职位名称是否存在(排除原来人员职位名称，用于更新)
        public bool IsExistedByNewNameAndOldName(string newName, string oldName)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_OldName, SqlDbType.NVarChar);

            parm[0].Value = newName;
            parm[1].Value = oldName;

            object obj = SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, "proPositionIsExistedByNewNameAndOldName", parm);
            return obj == null ? false : (bool)obj;
        }

        #endregion 

        #region 综合查询
        //获取除原职位和现职位之外的职位列表（用于人员职位调动更新）
        public IList<PositionInfo> GetPositionListByOldPositionIdAndNewPositionId(int oldPositionId, int newPositionId)
        {
            IList<PositionInfo> Positions = new List<PositionInfo>();
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_OldPositionId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_NewPositionId, SqlDbType.Int);

            parm[0].Value = oldPositionId;
            parm[1].Value = newPositionId;

            using (
                SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proPositionGetListByOldPositionIdAndNewPositionId", parm))
            {
                while (rdr.Read())
                {
                    PositionInfo Position = new PositionInfo();
                    Position.Id = Convert.ToInt32(rdr["Id"]);
                    Position.Name = rdr["Name"].ToString();
                    Positions.Add(Position);
                }
                rdr.Close();
            }
            return Positions;
        }
        //获取人员岗位集合
        public IList<PositionInfo> GetPositionNameList()
        {
            IList<PositionInfo> Positions = new List<PositionInfo>();
            using (
                     SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure,
                                                "proPositionGetNameList"))
            {
                while (rdr.Read())
                {
                    PositionInfo Position = new PositionInfo();
                    Position.Id = Convert.ToInt32(rdr["Id"]);
                    Position.Name = rdr["Name"].ToString();
                    Positions.Add(Position);
                }
                rdr.Close();
            }
            return Positions;
        }
        //根据条件获取PositionGetList信息
        public IList<PositionListInfo> GetPositionList(string name, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            IList<PositionListInfo> PositionLists = new List<PositionListInfo>();
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
                                                            "proPositionGetList", parm))
            {
                while (rdr.Read())
                {
                    PositionListInfo PositionList = new PositionListInfo();

                    PositionList.RowNumber = Convert.ToInt32(rdr["RowNumber"]);
                    PositionList.Id = Convert.ToInt32(rdr["Id"]);
                    PositionList.Name = (rdr["Name"]).ToString();
                    PositionList.Memo = (rdr["Memo"]).ToString();
                    PositionLists.Add(PositionList);

                }
                rdr.Close();
            }
            return PositionLists;
        }

        //获取PositionListSum,记录总数和汇总值
        public int GetPositionListCount(string name)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_RecordSetType, SqlDbType.Int);

            parm[0].Value = name;
            parm[1].Value = 2;//RecordSetType:1表示结果集列表,2表示记录数和数据汇总
            return (int)SqlHelper.ExecuteScalar(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proPositionGetList", parm);
        }
        #endregion
    }
}
