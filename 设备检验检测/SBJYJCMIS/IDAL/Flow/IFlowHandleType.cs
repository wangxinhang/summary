using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IFlowHandleType
    {
        //插入、更新、删除FlowHandleType新记录
        bool FlowHandleTypeInsert(FlowHandleTypeInfo FlowHandleType);
        bool FlowHandleTypeUpdateById(FlowHandleTypeInfo FlowHandleType);
        bool FlowHandleTypeIsExistedByName(string name, int flowId);
        //根据名称验证节点名称是否存在（用在编辑）
        bool FlowHandleTypeIsExistedByNewNameAndOldName(string newName, string oldName);

        //流程动作结果
        IList<FlowHandleTypeListInfo> FlowHandleTypeGetList(string name, int flowId, int flowOperationId,
                                bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);

        RecordCountInfo FlowHandleTypeGetRecordCount(string name, int flowId,int flowOperationId);
        
    }
}
