using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.IDAL;
using SBJYJCMIS.DALFactory;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.BLL
{
    public class PositionProcess
    {
        private static readonly IPositionDao dal = EmployeeDataAccess.CreatePosition();

        #region 增删改
        //插入Position信息
        public bool InsertPosition(PositionInfo Position)
        {
            if (Position == null) return false;
            return dal.InsertPosition(Position);
        }
        //更新Position信息
        public bool UpdatePosition(PositionInfo Position)
        {
            if (Position == null) return false;
            return dal.UpdatePosition(Position);//执行更新命令
        }
        //根据Id删除记录
        public bool DeletePosition(PositionInfo Position)
        {
            if (Position == null) return false;
            return dal.DeletePosition(Position);//执行删除命令
        }
        #endregion

        #region 是否存在判断

        //验证Position是否已存在
        public bool IsExistedByName(string name)
        {
            return dal.IsExistedByName(name);
        }
        //验证Position是否已存在(排除原来人员职位名称，用于更新)
        public bool IsExistedByNewNameAndOldName(string newName, string oldName)
        {
            return dal.IsExistedByNewNameAndOldName(newName, oldName);
        }

        #endregion

        #region 获取PositionGetList
        //获取Position列表
        public IList<PositionInfo> GetPositionNameList()
        {
            return dal.GetPositionNameList();
        }
        //获取Position列表
        public IList<PositionInfo> GetPositionListByOldPositionIdAndNewPositionId(int oldPositionId, int newPositionId)
        {
            return dal.GetPositionListByOldPositionIdAndNewPositionId(oldPositionId, newPositionId);
        }
        //获取QueryResult
        public IList<PositionListInfo> GetPositionList(string name, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.GetPositionList(name, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }
        //获取QueryResult分页数据；用于分页显示查询结果
        public IList<PositionListInfo> GetPositionListPaged(string name, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.GetPositionList(name, true, pageNumber, pageSize, orderFieldName, orderType);
        }
        //获取QueryResult不分页数据；用于RDLC报表
        public IList<PositionListInfo> GetPositionListUnPaged(string name, object orderFieldName, object orderType)
        {
            return dal.GetPositionList(name, false, 1, 10, orderFieldName, orderType);
        }
        //获取汇总
        public int GetPositionListCount(string name)
        {
            return dal.GetPositionListCount(name);
        }
        #endregion
    }
}
