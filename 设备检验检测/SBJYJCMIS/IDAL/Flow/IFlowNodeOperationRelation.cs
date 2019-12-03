using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IFlowNodeOperationRelation
    {
        //插入、更新、删除FlowNodeOperationRelation新记录
        bool FlowNodeOperationRelationInsert(FlowNodeOperationRelationInfo flowNodeOperationRelation);
        bool FlowNodeOperationRelationInsertTran(FlowNodeOperationRelationInfo flowNodeOperationRelationInfo);
        bool FlowNodeOperationRelationUpdateById(FlowNodeOperationRelationInfo flowNodeOperationRelation);
        bool FlowNodeOperationRelationIsExisted(int flowNodeId, int flowOperationId, int flowId);

        //获取流程节点角色设置列表
        IList<FlowNodeOperationRelationListInfo> FlowNodeOperationGetList(string roleName, int flowId, int assignTypeId,
                                bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);

        RecordCountInfo FlowNodeOperationGetRecordCount(string roleName, int flowId, int assignTypeId);
        
    }
}
