using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IFlowStep
    {
        //插入、更新、删除FlowStep新记录
        bool FlowStepInsert(FlowStepInfo flowStep);
        bool FlowStepUpdateById(FlowStepInfo flowStep);

        //获取提交节点列表
        IList<FlowStepListInfo> FlowStepGetSubmitFlowNodeIdList(int flowId);
        //获取审批节点列表
        IList<FlowStepListInfo> FlowStepGetApprovalFlowNodeIdList(int flowId, int submitFlowNodeId);

        //流程动作结果
        IList<FlowStepListInfo> FlowStepGetList(int flowId, int submitFlowNodeId, int approvalFlowNodeId, int flowRuleId, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);

        RecordCountInfo FlowStepGetRecordCount(int flowId, int submitFlowNodeId, int approvalFlowNodeId, int flowRuleId);
    }
}
