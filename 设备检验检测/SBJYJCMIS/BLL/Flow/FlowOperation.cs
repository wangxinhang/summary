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
    public class FlowOperation
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IFlowOperation dal = FlowDataAccess.CreateFlowOperation();

        #region 记录操作
        //插入FlowOperation信息
        public bool FlowOperationInsert(FlowOperationInfo flowType)
        {
            if (flowType == null) return false;
            return dal.FlowOperationInsert(flowType);
        }

        //更新FlowOperation信息
        public bool FlowOperationUpdateById(FlowOperationInfo flowType)
        {
            if (flowType == null) return false;
            return dal.FlowOperationUpdateById(flowType);
        }
        
        //1-0：更新FlowOperation信息的DataStatus，有重载
        public bool FlowOperationUpdateDataStatusById(int id, int dataStatusId, int modifierId)
        {
            if (id == 0 || dataStatusId == 0 || modifierId==0) return false;

            FlowOperationInfo flowType = new FlowOperationInfo();
            flowType.Id = id;
            flowType.DataStatusId = dataStatusId;
            flowType.ModifierId = modifierId;

            return dal.FlowOperationUpdateById(flowType);//执行更新命令
        }

        //1-1：逻辑删除FlowOperation信息（DataStatus=2），对1-0重载
        public bool FlowOperationLogicDeleteById(int id, int modifierId)
        {
            if (id == 0 || modifierId == 0) return false;
            return FlowOperationUpdateDataStatusById(id, 2, modifierId);//执行逻辑删除命令
        }

        #endregion 记录操作结束

        #region 验证FlowOperation名称唯一性

        //检查Name是否已存在
        public bool FlowOperationIsExisted(string name,int flowId)
        {
            return dal.FlowOperationIsExistedByName(name, flowId);
        }
        //根据用户Id获取流程动作list
        public IList<FlowOperationListInfo> FlowOperationGetListByXuserId(int xuserId)
        {
            return dal.FlowOperationGetListByXuserId(xuserId);
        }
        //验证FlowOperation是否已存在(用于更新)
        public bool FlowOperationIsExistedByNewNameAndOldName(string newName, string oldName)
        {
            return dal.FlowOperationIsExistedByNewNameAndOldName(newName, oldName);
        }
        #endregion 验证FlowOperation名称唯一性 结束

        #region 获取FlowOperationGetList列表

        //获取列表
        public IList<FlowOperationListInfo> FlowOperationGetList(string name, int flowId, 
                                       bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.FlowOperationGetList(name, flowId, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表分页数据；用于分页显示查询结果
        public IList<FlowOperationListInfo> FlowOperationGetListPaged(string name, int flowId,
                                       int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.FlowOperationGetList(name, flowId, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表不分页数据；用于分页显示查询结果
        public IList<FlowOperationListInfo> FlowOperationGetListUnPaged(string name, int flowId, object orderFieldName, object orderType)
        {
            return dal.FlowOperationGetList(name, flowId, false, 0, 0, orderFieldName, orderType);
        }


        #endregion 获取FlowOperationGetListByFlowId列表

        #region 获取FlowNodeOperation列表值汇总

        //获取列表
        public RecordCountInfo FlowOperationGetRecordCount(string name, int flowId)
        {
            return dal.FlowOperationGetRecordCount(name, flowId);
        }
        #endregion 获取FlowNodeRole列表值汇总

    }
}
