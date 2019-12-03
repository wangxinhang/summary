using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IFlowOperation
    {
        //插入、更新、删除FlowOperation新记录
        bool FlowOperationInsert(FlowOperationInfo flowOperation);
        bool FlowOperationUpdateById(FlowOperationInfo flowOperation);
        bool FlowOperationIsExistedByName(string name, int flowId);
        bool FlowOperationIsExistedByNewNameAndOldName(string newName, string oldName);

        //根据用户Id获取流程动作list
        IList<FlowOperationListInfo> FlowOperationGetListByXuserId(int xuserId);

        //根据流程获取流程动作
        IList<FlowOperationListInfo> FlowOperationGetList(string name, int flowId,
                                bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);

        RecordCountInfo FlowOperationGetRecordCount(string name, int flowId);
    }
}
