using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IResourceType
    {
        //插入、更新、删除ResourceType新记录
        bool ResourceTypeInsert(ResourceTypeInfo resourceType);
        bool ResourceTypeUpdateById(ResourceTypeInfo resourceType);
        bool ResourceTypeLogicDeleteById(int id, int modifierId);

        //获取记录集和记录数
        IList<ResourceTypeListInfo> ResourceTypeGetList(string name, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType);
        RecordCountInfo ResourceTypeGetListSum(string name);

        //验证是否存在  
        bool ResourceTypeIsExistedByName(string name);
    }
}
