using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IInspectionOrgan
    {
        //获取查询检测机构结果集及记录总数
        IList<InspectionOrganInfo> InspectionOrganGetList(string Name,int IsInner, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType);
        RecordCountInfo InspectionOrganGetSum(string Name, int IsInner);

        //新增检测机构信息
        bool InspectionOrganInsert(InspectionOrganInfo InspectionOrgan);

        //编辑检测机构信息
        bool InspectionOrganUpdate(InspectionOrganInfo InspectionOrgan);

        //删除检测机构信息
        bool InspectionOrganDelete(int Id);
    }
}
