using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IFlowStatus
    {
        //插入、更新、删除FlowStatus新记录
        bool FlowStatusInsert(FlowStatusInfo flowStatus);
        bool FlowStatusUpdateById(FlowStatusInfo flowStatus);
        bool FlowStatusIsExistedByName(string name, int flowId);
        //根据名称验证节点名称是否存在（用在编辑）
        bool FlowStatusIsExistedByNewNameAndOldName(string newName, string oldName);

        //检测报告审核查询页面 过滤到记录隐含选项
        IList<FlowStatusListInfo> FlowStatusGetListExceptOne();
        //获取FlowStatus列表
        IList<FlowStatusListInfo> FlowStatusGetList(string name, int flowId, int flowOperationId,
                                bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);

        RecordCountInfo FlowStatusGetRecordCount(string name, int flowId,int flowOperationId);
        
    }
}
