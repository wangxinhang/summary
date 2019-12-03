using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IGroup
    {
        //插入、更新、删除Group新记录
        bool GroupInsert(GroupInfo group);
        bool GroupUpdateById(GroupInfo group);
        bool GroupDeleteTranById(int id);

        //获取记录集和记录数
		IList<GroupListInfo> GroupOnlyGetList(string name, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType);

		GroupSumInfo GroupOnlyGetListSum(string name);

		IList<GroupListInfo> GroupGetListMerge(string name, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType);

		GroupSumInfo GroupGetListMergeSum(string name);

		IList<GroupListInfo> GroupGetList(string name, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType);
        GroupSumInfo GroupGetListSum(string name);

        //验证是否存在  
        bool GroupIsExistedByName(string name);
    }
}
