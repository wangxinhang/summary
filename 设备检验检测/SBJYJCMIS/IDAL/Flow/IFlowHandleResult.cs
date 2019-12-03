using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IFlowHandleResult
    {
        //插入、更新、删除FlowHandleResult新记录
        bool FlowHandleResultInsert(FlowHandleResultInfo flowHandleResult);
        bool FlowHandleResultUpdateById(FlowHandleResultInfo flowHandleResult);
        bool FlowHandleResultIsExistedByName(string name, int flowId);
        //根据名称验证节点名称是否存在（用在编辑）
        bool FlowHandleResultIsExistedByNewNameAndOldName(string newName, string oldName);

        //流程动作结果
        IList<FlowHandleResultListInfo> FlowHandleResultGetList(string name, int flowId, int flowOperationId,
                                bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);

        RecordCountInfo FlowHandleResultGetRecordCount(string name, int flowId,int flowOperationId);
        
    }
}
