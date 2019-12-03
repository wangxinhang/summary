using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IResource
    {
        //插入、更新、删除Resource新记录
        bool ResourceInsertTran(ResourceInfo resource);
        bool ResourceUpdateTranById(ResourceInfo resource);
        bool ResourceDeleteTranById(int id,int resourceTypeId);

        //获取记录集和记录数
        IList<ResourceListInfo> ResourceGetList(string name,int resourceTypeId, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType);
        ResourceSumInfo ResourceGetListSum(string name,int resourceTypeId);
        
        //获取资源及其可配置权限
        IList<ResourceOperationListInfo> ResourceGetOperationList(string name, int resourceTypeId, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType);
        RecordCountInfo ResourceGetOperationListSum(string name, int resourceTypeId);

        //验证是否存在  
        bool ResourceIsExisted(string name, int resourceTypeId);
    }
}
