using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IFlowApprovalRelation
    {      

        //获取流程节点角色设置列表
        IList< FlowApprovalRelationInfo> FlowApprovalRelationGetList(int approverId, int flowTypeId, int assignType,
                                bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);

         FlowApprovalRelationSumInfo FlowApprovalRelationGetSum(int approverId, int flowTypeId, int assignType);
        
    }
}
