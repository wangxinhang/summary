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
    public class XmenuPage:IXmenuPage
    {
        #region 参数
        //参数     
        private const string PARM_XmenuId = "@XmenuId";
        private const string PARM_XpageId = "@XpageId";
        private const string PARM_DataStatusId = "@DataStatusId";
        private const string PARM_Memo = "@Memo";
        private const string PARM_CreatorId = "@CreatorId";
        private const string PARM_ModifierId = "@ModifierId";

        //扩展参数 

        #endregion 参数结束

        #region 数据记录操作（插入、更新、删除）
        //插入新记录
        public bool XmenuPageInsert(XmenuPageInfo xmenuPage)
        {
            SqlParameter[] parm = new SqlParameter[4];

            parm[0] = new SqlParameter(PARM_XmenuId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_XpageId, SqlDbType.Int);
            parm[2] = new SqlParameter(PARM_Memo, SqlDbType.NVarChar);
            parm[3] = new SqlParameter(PARM_CreatorId,SqlDbType.Int);

            parm[0].Value = xmenuPage.XmenuId;
            parm[1].Value = xmenuPage.XpageId;
            parm[2].Value = xmenuPage.Memo;
            parm[3].Value = xmenuPage.CreatorId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proXmenuPageInsertTran", parm);
            return (retval > 0) ? true : false;
        }
                 
        //删除记录
        public bool XmenuPageDeleteByXmenuIdXpageId(int xmenuId, int xpageId)
        {
            SqlParameter[] parm = new SqlParameter[2];

            parm[0] = new SqlParameter(PARM_XmenuId, SqlDbType.Int);
            parm[1] = new SqlParameter(PARM_XpageId, SqlDbType.Int);

            parm[0].Value = xmenuId;
            parm[1].Value = xpageId;

            int retval = SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, "proXmenuPageDeleteByXmenuIdXpageId", parm);
            return (retval > 0) ? true : false;
        }
        #endregion 数据记录操作（插入、更新、删除）结束

    }
}