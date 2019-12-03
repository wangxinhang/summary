using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IFlowNodeRole
    { //插入、更新、删除FlowNodeRole新记录
        bool FlowNodeRoleInsert(FlowNodeRoleInfo FlowNodeRole);
        bool FlowNodeRoleInsertTran(FlowNodeRoleInfo FlowNodeRole);
        bool FlowNodeRoleUpdateDataStatusById(int flowNodeId, int roleId, int flowId, int modifierId);

        //验证节点角色是否存在
        bool FlowNodeRoleIsExisted(int flowNodeId, int roleId, int flowId);
        IList<FlowNodeRoleInfo> RoleListGetByFlowNodeId(int flowNodeId);

        //获取流程节点角色设置列表
        IList<FlowNodeRoleInfo> FlowNodeRoleGetList(string name, int flowNodeId, int flowId, int assignType,
                                bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);

        RecordCountInfo FlowNodeRoleGetSum(string name, int flowNodeId, int flowId, int assignType);
        
    }
}
