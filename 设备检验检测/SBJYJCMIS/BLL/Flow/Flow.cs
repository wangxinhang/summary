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
    public class Flow
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IFlow dal = FlowDataAccess.CreateFlow();

        #region 记录操作
        //插入Flow信息
        public bool FlowInsert(FlowInfo flow)
        {
            if (flow == null) return false;
            return dal.FlowInsert(flow);
        }

        //更新Flow信息
        public bool FlowUpdateById(FlowInfo flow)
        {
            if (flow == null) return false;
            return dal.FlowUpdateById(flow);
        }

        //1-0：更新Flow信息的DataStatus，有重载
        public bool FlowUpdateDataStatusById(int id, int dataStatusId, int modifierId)
        {
            if (id == 0 || dataStatusId == 0 || modifierId == 0) return false;

            FlowInfo flow = new FlowInfo();
            flow.Id = id;
            flow.DataStatusId = dataStatusId;
            flow.ModifierId = modifierId;

            return dal.FlowUpdateById(flow);//执行更新命令
        }

        //1-1：逻辑删除Flow信息（DataStatus=2），对1-0重载
        public bool FlowLogicDeleteById(int id, int modifierId)
        {
            if (id == 0 || modifierId == 0) return false;
            return FlowUpdateDataStatusById(id, 2, modifierId);//执行逻辑删除命令
        }

        #endregion 记录操作结束

        #region 验证Flow名称唯一性

        //检查Name是否已存在
        public bool FlowIsExisted(string name)
        {
            return dal.FlowIsExistedByName(name);
        }
        //验证flow是否已存在(用于更新)
        public bool FlowIsExistedByNewNameAndOldName(string newName, string oldName)
        {
            return dal.FlowIsExistedByNewNameAndOldName(newName, oldName);
        }
        #endregion 验证Flow名称唯一性 结束

        #region 获取FlowList 有重载

        //获取QueryResult
        public IList<FlowInfo> FlowGetList(string name, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.FlowGetList(name, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取分页数据；用于分页显示查询结果
        public IList<FlowInfo> FlowGetListPaged(string name, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.FlowGetList(name, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取不分页数据；用于RDLC报表
        public IList<FlowInfo> FlowGetListUnPaged(string name, string orderFieldName, string orderType)
        {
            return dal.FlowGetList(name, false, 1, 10, orderFieldName, orderType);
        }

        #endregion 获取FlowList 结束

        #region 获取FlowList记录数

        //获取汇总
        public RecordCountInfo FlowGetListSum(string name)
        {
            return dal.FlowGetListSum(name);
        }

        #endregion 获取FlowList记录数 结束

    }
}
