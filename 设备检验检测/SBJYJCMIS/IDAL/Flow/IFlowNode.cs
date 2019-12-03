using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IFlowNode
    {
        //插入、更新、删除FlowNode新记录
        bool FlowNodeInsert(FlowNodeInfo flowNode);
        bool FlowNodeUpdateById(FlowNodeInfo flowNode);
        bool FlowNodeIsExistedByName(string name, int FlowId);
        //根据名称验证节点名称是否存在（用在编辑）
        bool FlowNodeIsExistedByNewNameAndOldName(string newName, string oldName);
        //根据用户Id获取FlowNodeId
        IList<FlowNodeInfo> GetFlowNodeIdByXuserId(int xuserId);
        IList<FlowNodeInfo> FlowOperationListByFlowNodeIdAndXuserId(int xuserId);
        //根据departmentId获取节点列表数据
        IList<FlowNodeInfo> FlowNodeGetListByDepartmentId(int departmentId);
        //根据XuserId获取用户对应的节点信息
        IList<FlowNodeListInfo> FlowNodeGetDefaulInfoByXuserId(int xuserId);

        //获取记录集和记录数
        IList<FlowNodeInfo> FlowNodeGetList(string name, int flowId, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType);
        RecordCountInfo FlowNodeGetListSum(string name,int flowId);

    }
}
