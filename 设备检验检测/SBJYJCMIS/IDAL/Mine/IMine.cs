using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IMine
    {
        //获取煤矿企业查询结果集及记录总数
        IList<MineInfo> MineGetList(string MKBM, int SJQYId, int JCBMId, int SZQYId, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType);
        RecordCountInfo MineGetListSum(string MKBM, int SJQYId, int JCBMId, int SZQYId);

        //获取煤矿企业下拉列表
        IList<DepartmentInfo> SJQYGetList();

        //获取监察部门下拉列表
        IList<DepartmentInfo> JCBMGetList();

        //获取所在区域下拉列表
        IList<RegionInfo> SZQYGetList();
    }
}
