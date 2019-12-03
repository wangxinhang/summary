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
    public class Xmenu:IXmenu
    {
        #region 参数 
        private const string PARM_Id = "@Id";
        private const string PARM_Name = "@Name";
        private const string PARM_ParentId = "@ParentId";
        private const string PARM_IconUrl = "@IconUrl";
        private const string PARM_Sequence = "@Sequence";
        private const string PARM_DataStatusId = "@DataStatusId";
        private const string PARM_Memo = "@Memo";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_ModifierId = "@ModifierId";
        private const string PARM_XuserId = "@XuserId";
        private const string PARM_XmenuParentId = "@XmenuParentId";
        private const string PARM_ResourceId = "@ResourceId";
        private const string PARM_XmenuId = "@XmenuId";
        private const string PARM_SwapXmenuId = "@SwapXmenuId";
        private const string PARM_XpageId = "@XpageId";
        #endregion 参数结束

        #region 数据记录操作（插入、更新、删除）
        // 更新Xmenu
        public bool XmenuInsertTran(XmenuInfo xmenu)
        {
            SqlParameter[] parm = new SqlParameter[6];

            parm[0] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[1] = new SqlParameter(PARM_IconUrl, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_ParentId, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_XpageId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[5] = new SqlParameter(PARM_CreatorId, SqlDbType.Int);

            parm[0].Value = xmenu.Name;
            parm[1].Value = xmenu.IconUrl;
            parm[2].Value = xmenu.ParentId;
            parm[3].Value = xmenu.XpageId;
            parm[4].Value = xmenu.Memo;
            parm[5].Value = xmenu.CreatorId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proXmenuInsertTran", parm);
            return (retval > 0) ? true : false;
        }

        // 更新Xmenu
        public bool XmenuUpdateById(XmenuInfo xmenu)
        {
            SqlParameter[] parm = new SqlParameter[6];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_IconUrl, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_Sequence, SqlDbType.Int);
            parm[3] = new SqlParameter(PARM_DataStatusId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[5] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = xmenu.Id;
            parm[1].Value = xmenu.IconUrl;
            parm[2].Value = xmenu.Sequence;
            parm[3].Value = xmenu.DataStatusId;
            parm[4].Value = xmenu.Memo;
            parm[5].Value = xmenu.ModifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proXmenuUpdateById", parm);
            return (retval > 0) ? true : false;
        }

        /// <summary>
        /// 更新Resource、Xmenu、XmenuRelation表数据的事务
        /// </summary>
        public bool XmenuUpdateTran(XmenuInfo xmenu)
        {
            SqlParameter[] parm = new SqlParameter[6];

            parm[0] = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_Name, SqlDbType.NVarChar);
            parm[2] = new SqlParameter(PARM_IconUrl, SqlDbType.NVarChar);
            parm[3] = new SqlParameter(PARM_ParentId, SqlDbType.Int);
            parm[4] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[5] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = xmenu.Id;
            parm[1].Value = xmenu.Name;
            parm[2].Value = xmenu.IconUrl;
            parm[3].Value = xmenu.ParentId;
            parm[4].Value = xmenu.Memo;
            parm[5].Value = xmenu.ModifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proXmenuUpdateTran", parm);
            return (retval > 0) ? true : false;
        }

        public bool XmenuDeleteTranById(int xmenuId)
        {
            SqlParameter parm = new SqlParameter(PARM_Id, SqlDbType.Int);
            parm.Value = xmenuId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proXmenuDeleteTranByXmenuId", parm);
            return (retval > 0) ? true : false;
        }

        public bool XmenuSwapSequenceByXmenuId(int xmenuId, int swapXmenuId, int modifierId)
        {
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = new SqlParameter(PARM_XmenuId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_SwapXmenuId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_ModifierId, SqlDbType.Int);

            parm[0].Value = xmenuId;
            parm[1].Value = swapXmenuId;
            parm[2].Value = modifierId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proXmenuSwapSequenceByXmenuId", parm);
            return (retval > 0) ? true : false;
        }
        #endregion 数据记录操作（插入、更新、删除）

        #region 获取XmenuList
        //获取记录集
        public IList<XmenuListInfo> XmenuGetListByXuserId(int xuserId, int parentXmenuId)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_XuserId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_XmenuParentId, SqlDbType.Int);

            parm[0].Value = xuserId;
            parm[1].Value = parentXmenuId;

            IList<XmenuListInfo> recordList = new List<XmenuListInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proXmenuGetListByXuserId", parm))
            {
                while (rdr.Read())
                {
                    XmenuListInfo record = new XmenuListInfo();
                    record.Id = Convert.ToInt32(rdr["Id"]);
                    record.Name = Convert.ToString(rdr["Name"]);
                    record.IconUrl = Convert.ToString(rdr["IconUrl"]);
                    record.Sequence = Convert.ToInt32(rdr["Sequence"]);
                    record.PageUrl = Convert.ToString(rdr["PageUrl"]);
                    record.ParentId = Convert.ToInt32(rdr["ParentId"]);
                    record.Memo = Convert.ToString(rdr["Memo"]);
                    record.XpageId = Convert.IsDBNull(rdr["XpageId"]) ? 0 : Convert.ToInt32(rdr["XpageId"]);

                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }
        #endregion 获取XmenuList

        #region 获取XmenuDropDownList
        //获取记录集
        public IList<XmenuDropDownListInfo> XmenuGetDropDownList()
        {
            IList<XmenuDropDownListInfo> recordList = new List<XmenuDropDownListInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proXmenuGetDropDownList",null))
            {
                while (rdr.Read())
                {
                    XmenuDropDownListInfo record = new XmenuDropDownListInfo();
                    record.Id = Convert.ToInt32(rdr["Id"]);
                    record.Name = Convert.ToString(rdr["Name"]);
                    //record.ParentId = Convert.ToInt32(rdr["ParentId"]);

                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }        
        
        //获取记录集
        public IList<XmenuDropDownListInfo> XmenuGetDropDownListByParentId(int parentId)
        {
            SqlParameter parm = new SqlParameter(PARM_ParentId, SqlDbType.Int);
            parm.Value = parentId;

            IList<XmenuDropDownListInfo> recordList = new List<XmenuDropDownListInfo>();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proXmenuGetDropDownListByParentId", parm))
            {
                while (rdr.Read())
                {
                    XmenuDropDownListInfo record = new XmenuDropDownListInfo();
                    record.Id = Convert.ToInt32(rdr["Id"]);
                    record.Name = Convert.ToString(rdr["Name"]);
                    //record.ParentId = Convert.ToInt32(rdr["ParentId"]);

                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }
        #endregion 获取XmenuDropDownList

        #region 获取XmenuListWithPermission
        //获取记录集
        public IList<XmenuListWithPermissionInfo> XmenuGetListWithPermission(int xuserId, int parentXmenuId)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_XuserId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_XmenuParentId, SqlDbType.Int);

            parm[0].Value = xuserId;
            parm[1].Value = parentXmenuId;

            IList<XmenuListWithPermissionInfo> recordList = new List<XmenuListWithPermissionInfo>();
            Permission pmBll = new Permission();
            using (SqlDataReader rdr = SqlHelper.ExecuteReader(SqlHelper.ConnectionString, CommandType.StoredProcedure, "proXmenuGetListByXuserId", parm))
            {
                while (rdr.Read())
                {
                    XmenuListWithPermissionInfo record = new XmenuListWithPermissionInfo();
                    record.Id = Convert.ToInt32(rdr["Id"]);
                    record.Name = Convert.ToString(rdr["Name"]);
                    record.IconUrl = Convert.ToString(rdr["IconUrl"]);
                    record.Sequence = Convert.ToInt32(rdr["Sequence"]);
                    record.PageUrl = Convert.ToString(rdr["PageUrl"]);
                    record.ParentId = Convert.ToInt32(rdr["ParentId"]);
                    record.XpageId = Convert.IsDBNull(rdr["XpageId"]) ? 0 : Convert.ToInt32(rdr["XpageId"]);
                    if (record.XpageId > 0)
                    {
                        record.PermissionList = pmBll.PermissionGetListByXuserIdOperationIdResourceIdResourceTypeId(xuserId, 0, record.XpageId, 2);
                    }

                    recordList.Add(record);
                }
                rdr.Close();
            }
            return recordList;
        }
        #endregion 获取XmenuListWithPermission
    }
}