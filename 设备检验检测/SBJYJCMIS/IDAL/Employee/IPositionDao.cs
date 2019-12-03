using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IPositionDao
    {

        #region 增删改
        bool InsertPosition(PositionInfo Position);//插入Position新纪录
        bool UpdatePosition(PositionInfo Position);//更新Position纪录
        bool DeletePosition(PositionInfo Position);//删除Position纪录
        #endregion

        #region 是否存在判断
        bool IsExistedByName(string name);//根据名称验证人员职位是否存在
        bool IsExistedByNewNameAndOldName(string newName, string oldName);//根据名称验证人员职位是否存在(排除原来人员职位名称，用于更新)
        #endregion

        #region 综合查询
        IList<PositionInfo> GetPositionNameList();//获取Position列表
        IList<PositionInfo> GetPositionListByOldPositionIdAndNewPositionId(int oldPositionId, int newPositionId);
        IList<PositionListInfo> GetPositionList(string name, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);
        int GetPositionListCount(string name);
        #endregion
    }
}
