using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IFlowRule
    {
        //插入、更新、删除FlowRule新记录
        bool FlowRuleInsert(FlowRuleInfo flowRule);
        bool FlowRuleUpdateById(FlowRuleInfo flowRule);
        bool FlowRuleIsExistedByName(string name,int flowId);
        //根据名称验证节点名称是否存在（用在编辑）
        bool FlowRuleIsExistedByNewNameAndOldName(string newName, string oldName);

        //根据流程获取流程动作
        IList<FlowRuleInfo> FlowRuleGetList(string name, int flowId, int flowOperationId,
                                bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);

        RecordCountInfo FlowRuleGetRecordCount(string name, int flowId,int flowOperationId);
        
    }
}
