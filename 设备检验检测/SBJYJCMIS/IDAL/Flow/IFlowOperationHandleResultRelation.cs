using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IFlowOperationHandleResultRelation
    {
        //插入、更新、删除FlowNodeOperationRelation新记录
        bool FlowOperationHandleResultRelationInsert(FlowOperationHandleResultRelationInfo flowOperationHandleResultRelation);
        bool FlowOperationHandleResultRelationUpdateById(FlowOperationHandleResultRelationInfo flowOperationHandleResultRelation);
        bool FlowOperationHandleResultRelationUpdateByIdTran(FlowOperationHandleResultRelationInfo flowOperationHandleResultRelation);
        //获取流程节点角色设置列表
        IList<FlowOperationHandleResultRelationListInfo> FlowOperationHandleResultGetList(string roleName, int flowId, int assignTypeId,
                                bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);

        RecordCountInfo FlowOperationHandleResultGetRecordCount(string roleName, int flowId, int assignTypeId);
    }
}
