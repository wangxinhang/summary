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
    public class FlowStep
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IFlowStep dal = FlowDataAccess.CreateFlowStep();

        #region 记录操作
        //插入FlowStep信息
        public bool FlowStepInsert(FlowStepInfo flowStep)
        {
            if (flowStep == null) return false;
            return dal.FlowStepInsert(flowStep);
        }

        //更新FlowStep信息
        public bool FlowStepUpdateById(FlowStepInfo flowStep)
        {
            if (flowStep == null) return false;
            return dal.FlowStepUpdateById(flowStep);
        }

        //1-0：更新FlowStep信息的DataStatus，有重载
        public bool FlowStepUpdateDataStatusById(int id, int dataStatusId, int modifierId)
        {
            if (id == 0 || dataStatusId == 0 || modifierId == 0) return false;

            FlowStepInfo flowStep = new FlowStepInfo();
            flowStep.Id = id;
            flowStep.DataStatusId = dataStatusId;
            flowStep.ModifierId = modifierId;

            return dal.FlowStepUpdateById(flowStep);//执行更新命令
        }

        //1-1：逻辑删除FlowStep信息（DataStatus=2），对1-0重载
        public bool FlowStepLogicDeleteById(int id, int modifierId)
        {
            if (id == 0 || modifierId == 0) return false;
            return FlowStepUpdateDataStatusById(id, 2, modifierId);//执行逻辑删除命令
        }

        #endregion 记录操作结束

        #region 根据条件获取FlowStep列表
        //获取提交节点列表
        public IList<FlowStepListInfo> FlowStepGetSubmitFlowNodeIdList(int flowId)
        {
            return dal.FlowStepGetSubmitFlowNodeIdList(flowId);
        }
        //获取审批节点列表
        public IList<FlowStepListInfo> FlowStepGetApprovalFlowNodeIdList(int flowId, int submitFlowNodeId)
        {
            return dal.FlowStepGetApprovalFlowNodeIdList(flowId, submitFlowNodeId);
        }
        #endregion 根据条件获取FlowStep列表

        #region 获取FlowStep列表

        //获取列表
        public IList<FlowStepListInfo> FlowStepGetList(int flowId, int submitFlowNodeId, int approvalFlowNodeId, int flowRuleId, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.FlowStepGetList(flowId,submitFlowNodeId,approvalFlowNodeId,flowRuleId, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表分页数据；用于分页显示查询结果
        public IList<FlowStepListInfo> FlowStepGetListPaged(int flowId, int submitFlowNodeId, int approvalFlowNodeId, int flowRuleId, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.FlowStepGetList(flowId,submitFlowNodeId,approvalFlowNodeId,flowRuleId, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表不分页数据；用于分页显示查询结果
        public IList<FlowStepListInfo> FlowStepGetListUnPaged(int flowId, int submitFlowNodeId, int approvalFlowNodeId, int flowRuleId, object orderFieldName, object orderType)
        {
            return dal.FlowStepGetList(flowId,submitFlowNodeId,approvalFlowNodeId,flowRuleId, false, 0, 0, orderFieldName, orderType);
        }


        #endregion 获取FlowStepByFlowId列表

        #region 获取FlowNodeOperation列表值汇总

        //获取列表
        public RecordCountInfo FlowStepGetRecordCount(int flowId, int submitFlowNodeId, int approvalFlowNodeId, int flowRuleId)
        {
            return dal.FlowStepGetRecordCount(flowId,submitFlowNodeId,approvalFlowNodeId,flowRuleId);
        }
        #endregion 获取FlowNodeRole列表值汇总
    }
}
