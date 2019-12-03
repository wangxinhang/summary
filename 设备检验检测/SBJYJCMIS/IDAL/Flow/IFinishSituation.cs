using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IFinishSituation
    {
        //插入、更新、删除Flow新记录
        bool FinishSituationInsert(FinishSituationInfo flow);
        bool FinishSituationUpdateById(FinishSituationInfo flow);
        bool FinishSituationIsExistedByName(string name);
        bool FinishSituationIsExistedByNewNameAndOldName(string newName, string oldName);

        //获取记录集和记录数
        IList<FinishSituationInfo> FinishSituationGetList(string name, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType);
        RecordCountInfo FinishSituationGetListSum(string name);

    }
}
