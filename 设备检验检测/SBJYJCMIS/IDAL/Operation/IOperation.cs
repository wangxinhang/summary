using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IOperation
    {
        //插入、更新、删除Operation新记录
        bool OperationInsert(OperationInfo group);
        bool OperationUpdateById(OperationInfo group);
        bool OperationDeleteTranById(int id);

        //获取记录集和记录数
        IList<OperationListInfo> OperationGetList(string name, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType);
        OperationSumInfo OperationGetListSum(string name);

        //验证是否存在  
        bool OperationIsExistedByName(string name);
    }
}
