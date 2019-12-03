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
    public class FlowHandleResult
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IFlowHandleResult dal = FlowDataAccess.CreateFlowHandleResult();

        #region 记录操作
        //插入FlowHandleResult信息
        public bool FlowHandleResultInsert(FlowHandleResultInfo flowType)
        {
            if (flowType == null) return false;
            return dal.FlowHandleResultInsert(flowType);
        }

        //更新FlowHandleResult信息
        public bool FlowHandleResultUpdateById(FlowHandleResultInfo flowType)
        {
            if (flowType == null) return false;
            return dal.FlowHandleResultUpdateById(flowType);
        }
        
        //1-0：更新FlowHandleResult信息的DataStatus，有重载
        public bool FlowHandleResultUpdateDataStatusById(int id, int dataStatusId, int modifierId)
        {
            if (id == 0 || dataStatusId == 0 || modifierId==0) return false;

            FlowHandleResultInfo flowType = new FlowHandleResultInfo();
            flowType.Id = id;
            flowType.DataStatusId = dataStatusId;
            flowType.ModifierId = modifierId;

            return dal.FlowHandleResultUpdateById(flowType);//执行更新命令
        }

        //1-1：逻辑删除FlowHandleResult信息（DataStatus=2），对1-0重载
        public bool FlowHandleResultLogicDeleteById(int id, int modifierId)
        {
            if (id == 0 || modifierId == 0) return false;
            return FlowHandleResultUpdateDataStatusById(id, 2, modifierId);//执行逻辑删除命令
        }

        #endregion 记录操作结束

        #region 验证FlowHandleResult名称唯一性

        //检查Name是否已存在
        public bool FlowHandleResultIsExisted(string name,int flowId)
        {
            return dal.FlowHandleResultIsExistedByName(name, flowId);
        }
        //验证FlowNode是否已存在(用于更新)
        public bool FlowHandleResultIsExistedByNewNameAndOldName(string newName, string oldName)
        {
            return dal.FlowHandleResultIsExistedByNewNameAndOldName(newName, oldName);
        }
        #endregion 验证FlowHandleResult名称唯一性 结束

        #region 获取FlowHandleResultGetList列表

        //获取列表
        public IList<FlowHandleResultListInfo> FlowHandleResultGetList(string name, int flowId, int flowOperationId,
                                       bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.FlowHandleResultGetList(name, flowId, flowOperationId, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表分页数据；用于分页显示查询结果
        public IList<FlowHandleResultListInfo> FlowHandleResultGetListPaged(string name, int flowId, int flowOperationId,
                                       int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.FlowHandleResultGetList(name, flowId, flowOperationId, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表不分页数据；用于分页显示查询结果
        public IList<FlowHandleResultListInfo> FlowHandleResultGetListUnPaged(string name, int flowId, int flowOperationId, object orderFieldName, object orderType)
        {
            return dal.FlowHandleResultGetList(name, flowId, flowOperationId, false, 0, 0, orderFieldName, orderType);
        }


        #endregion 获取FlowHandleResultGetListByFlowId列表

        #region 获取FlowNodeOperation列表值汇总

        //获取列表
        public RecordCountInfo FlowHandleResultGetRecordCount(string name, int flowId,int flowOperationId)
        {
            return dal.FlowHandleResultGetRecordCount(name, flowId, flowOperationId);
        }
        #endregion 获取FlowNodeRole列表值汇总

    }
}
