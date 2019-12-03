using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IFlow
    {
        //插入、更新、删除Flow新记录
        bool FlowInsert(FlowInfo flow);
        bool FlowUpdateById(FlowInfo flow);
        bool FlowIsExistedByName(string name);
        bool FlowIsExistedByNewNameAndOldName(string newName, string oldName);

        //获取记录集和记录数
        IList<FlowInfo> FlowGetList(string name, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType);
        RecordCountInfo FlowGetListSum(string name);

    }
}
