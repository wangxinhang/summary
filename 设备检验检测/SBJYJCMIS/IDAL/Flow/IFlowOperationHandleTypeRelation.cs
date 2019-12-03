using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IFlowOperationHandleTypeRelation
    {
        //插入、更新、删除FlowOperationStatusRelation新记录
        bool FlowOperationHandleTypeRelationInsert(FlowOperationHandleTypeRelationInfo flowOperationHandleTypeRelation);
        bool FlowOperationHandleTypeRelationUpdateById(FlowOperationHandleTypeRelationInfo flowOperationHandleTypeRelation);
        bool FlowOperationHandleTypeRelationUpdateByIdTran(FlowOperationHandleTypeRelationInfo flowOperationHandleTypeRelation);
    }
}
