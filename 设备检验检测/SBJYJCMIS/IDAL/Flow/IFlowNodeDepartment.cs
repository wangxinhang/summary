using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IFlowNodeDepartment
    { //插入、更新、删除FlowNodeRole新记录
        bool FlowNodeDepartmentInsert(FlowNodeDepartmentInfo FlowNodeDepartment);
        bool FlowNodeDepartmentInsertTran(FlowNodeDepartmentInfo FlowNodeDepartment);
        bool FlowNodeDepartmentUpdateDataStatusById(int flowNodeId, int departmentId, int flowId, int modifierId);

        //验证节点角色是否存在
        bool FlowNodeDepartmentIsExisted(int flowNodeId, int departmentId, int flowId);

        //获取流程节点角色设置列表
        IList<FlowNodeDepartmentInfo> FlowNodeDepartmentGetList(string name, int flowNodeId, int flowId, int assignType,
                                bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);

        RecordCountInfo FlowNodeDepartmentGetSum(string name, int flowNodeId, int flowId, int assignType);
        
    }
}
