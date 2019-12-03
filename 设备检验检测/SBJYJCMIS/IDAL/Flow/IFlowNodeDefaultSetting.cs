using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IFlowNodeDefaultSetting
    {
        //插入、更新、删除FlowStep新记录
        bool FlowNodeDefaultSettingInsert(FlowNodeDefaultSettingInfo flowNodeDefaultSetting);
        bool FlowNodeDefaultSettingUpdateById(FlowNodeDefaultSettingInfo flowNodeDefaultSetting);
        bool FlowNodeDefaultSettingIsExistedByFlowNodeId(int submitFlowNodeId, int approvalFlowNodeId, int flowNodeId);
        //获取节点默认值
        IList<FlowNodeDefaultSettingListInfo> GetFlowNodeSettingByFlowNodeIdFlowOperationId(int xuserId, int departmentId, int flowNodeId, int flowOperationId, int approvalFlowNodeId);
        IList<FlowNodeDefaultSettingListInfo> GetHiddenReportByXuserIdAndFlowOperationId(int xuserId, int departmentId, int flowOperationId, int approvalFlowNodeId);

        //流程动作结果
        IList<FlowNodeDefaultSettingListInfo> FlowNodeDefaultSettingGetList(int flowId, int submitFlowNodeId, int approvalFlowNodeId, int departmentId, string role,string xuser, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);

        RecordCountInfo FlowNodeDefaultSettingGetRecordCount(int flowId, int submitFlowNodeId, int approvalFlowNodeId, int departmentId, string role,string xuser);
    }
}
