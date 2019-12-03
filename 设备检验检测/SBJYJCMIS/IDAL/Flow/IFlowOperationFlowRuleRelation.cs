using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IFlowOperationFlowRuleRelation
    {
        //插入、更新、删除FlowOperationHandleTypeRelation新记录
        bool FlowOperationFlowRuleRelationInsert(FlowOperationFlowRuleRelationInfo flowOperationFlowRuleRelation);
        bool FlowOperationFlowRuleRelationUpdateById(FlowOperationFlowRuleRelationInfo flowOperationFlowRuleRelation);
        bool FlowOperationFlowRuleRelationUpdateByIdTran(FlowOperationFlowRuleRelationInfo flowOperationFlowRuleRelation);
       
    }
}
