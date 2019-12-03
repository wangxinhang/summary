using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IDefaultFlowNode
    {
        //插入、更新、删除DefaultFlowNode新记录
        bool DefaultFlowNodeInsert(DefaultFlowNodeInfo defaultFlowNode);
        bool DefaultFlowNodeUpdateById(DefaultFlowNodeInfo defaultFlowNode);
        bool DefaultFlowNodeUpdateDataStatusById(int id, int dataStatusId, int modifierId);
        //流程动作结果
        IList<DefaultFlowNodeInfo> DefaultFlowNodeGetList(int DepartmentId, string FlowNode, string Role, string Xuser,int flowId, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);

        RecordCountInfo DefaultFlowNodeGetRecordCount(int DepartmentId, string FlowNode, string Role, string Xuser, int flowId);
    }
}
