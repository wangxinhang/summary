using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.IDAL;
using SBJYJCMIS.DALFactory;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.BLL
{
    public class Xpage
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IXpage dal = XpageDataAccess.CreateXpage();

        #region 根据条件获取记录
        // 根据XMenuID获取相应的XpageID
        public int XpageGetIdByXmenuId(int xmenuId) //IList
        {
            return dal.XpageGetIdByXmenuId(xmenuId);
        }

        #endregion 根据XMenuID获取记录 结束

        #region 获取Xpage列表
        // 获取Xpage列表
        public IList<XpageListInfo> XpageGetList(string name, string pathName, int relationType, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType) //IList
        {
            return dal.XpageGetList(name, pathName, relationType,isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取分页数据；用于分页显示查询结果
        public IList<XpageListInfo> XpageGetListPaged(string name, string pathName, int relationType, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.XpageGetList(name, pathName, relationType, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取不分页数据；用于RDLC报表
        public IList<XpageListInfo> XpageGetListUnPaged(string name, string pathName, int relationType, string orderFieldName, string orderType)
        {
            return dal.XpageGetList(name, pathName, relationType, false, 1, 10, orderFieldName, orderType);
        }

        #endregion 获取Xpage列表 结束

        #region 获取XpageList记录数

        //获取汇总
        public RecordCountInfo XpageGetListSum(string name, string pathName, int relationType)
        {
            return dal.XpageGetListSum(name, pathName, relationType);
        }

        #endregion 获取XpageList记录数 结束

    }
}
