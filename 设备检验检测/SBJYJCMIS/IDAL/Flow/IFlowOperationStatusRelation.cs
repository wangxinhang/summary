using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IFlowOperationStatusRelation
    {
        //插入、更新、删除FlowOperationHandleTypeRelation新记录
        bool FlowOperationStatusRelationInsert(FlowOperationStatusRelationInfo flowOperationStatusRelationInfo);
        bool FlowOperationStatusRelationUpdateById(FlowOperationStatusRelationInfo flowOperationStatusRelationInfo);
        bool FlowOperationStatusRelationUpdateByIdTran(FlowOperationStatusRelationInfo flowOperationStatusRelationInfo);
    }
}
