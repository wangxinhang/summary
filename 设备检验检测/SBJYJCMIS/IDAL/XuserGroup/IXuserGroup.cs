using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IXuserGroup
    {
        #region 记录操作
        //插入、更新、删除XuserGroup新记录
        bool XuserGroupInsert(XuserGroupInfo xuserGroup);
        bool XuserGroupDelete(int xuserId, int groupId);
        #endregion 记录操作

        #region 验证
        //根据条件获取结果    
        bool XuserGroupIsExisted(int xuserId, int groupId);
        #endregion 验证

        #region 获取XuserGroup记录集和记录数
        //获取XuserGroup记录集和记录数
        IList<XuserGroupListInfo> XuserGroupGetList(string name, string nameCN, int departmentId, int groupId, int assignType, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType);
        XuserGroupSumInfo XuserGroupGetListSum(string name, string nameCN, int departmentId, int groupId, int assignType);
        #endregion 获取XuserGroup记录集和记录数 
    }
}
