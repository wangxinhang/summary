using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Security;
using SBJYJCMIS.IDAL;
using SBJYJCMIS.DALFactory;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.BLL
{
    public class XuserGroup
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IXuserGroup dal = XuserGroupDataAccess.CreateXuserGroup();

        #region 记录操作
        //插入信息
        public bool XuserGroupInsert(XuserGroupInfo xuserGroup)
        {
            if (xuserGroup == null) return false;
            return dal.XuserGroupInsert(xuserGroup);
        }
        
        //删除信息
        public bool XuserGroupDelete(int xuserId, int groupId)
        {
            return dal.XuserGroupDelete(xuserId, groupId);
        }
        
        #endregion 记录操作结束

        #region 验证

        //验证用户是否存在
        public bool XuserGroupIsExisted(int xuserId, int groupId)
        {
            return dal.XuserGroupIsExisted(xuserId, groupId);
        }

        #endregion 验证

        #region 获取XuserGroupList 有重载

        //获取QueryResult，基础
        public IList<XuserGroupListInfo> XuserGroupGetList(string name, string nameCN, int departmentId, int groupId, int assignType, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.XuserGroupGetList(name, nameCN, departmentId, groupId, assignType, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取QueryResult分页数据；用于分页显示查询结果，重载1
        public IList<XuserGroupListInfo> XuserGroupGetListPaged(string name, string nameCN, int departmentId, int groupId, int assignType, int pageNumber, int pageSize,
                                                                              string orderFieldName, string orderType)
        {
            return XuserGroupGetList(name, nameCN, departmentId, groupId, assignType, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取QueryResult不分页数据；用于RDLC报表，重载2
        public IList<XuserGroupListInfo> XuserGroupGetListUnPaged(string name, string nameCN, int departmentId, int groupId, int assignType, string orderFieldName, string orderType)
        {
            return XuserGroupGetList(name, nameCN, departmentId, groupId, assignType, false, 0, 0, orderFieldName, orderType);
        }

        #endregion 获取XuserGroupList 结束

        #region 获取XuserGroupList记录数

        //获取QueryResult记录数 
        public XuserGroupSumInfo XuserGroupGetListSum(string name, string nameCN, int departmentId, int groupId, int assignType)
        {
            return dal.XuserGroupGetListSum(name, nameCN, departmentId, groupId, assignType);
        }

        #endregion 获取XuserGroupList记录数

    }
}
