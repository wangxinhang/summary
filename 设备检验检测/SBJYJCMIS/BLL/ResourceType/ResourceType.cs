using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Security;
using SBJYJCMIS.IDAL;
using SBJYJCMIS.DALFactory;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.BLL
{
    public class ResourceType
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IResourceType dal = ResourceTypeDataAccess.CreateResourceType();

        #region 记录操作
        //插入ResourceType信息
        public bool ResourceTypeInsert(ResourceTypeInfo resourceType)
        {
            if (resourceType == null) return false;
            return dal.ResourceTypeInsert(resourceType);
        }

        //删除ResourceType信息
        public bool ResourceTypeLogicDeleteById(int id, int modifierId)
        {
            return dal.ResourceTypeLogicDeleteById(id, modifierId);//执行更新命令
        }

        //更新ResourceType信息
        public bool ResourceTypeUpdateById(ResourceTypeInfo resourceType)
        {
            if (resourceType == null) return false;
            return dal.ResourceTypeUpdateById(resourceType);//执行更新命令
        }

        #endregion 记录操作结束

        #region 根据条件查询ResourceType记录

        //验证是否存在
        public bool ResourceTypeIsExistedByName(string name)
        {
            return dal.ResourceTypeIsExistedByName(name);
        }
        #endregion 根据条件查询ResourceType记录

        #region 获取ResourceTypeList 有重载

        //获取QueryResult
        public IList<ResourceTypeListInfo> ResourceTypeGetList(string name, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.ResourceTypeGetList(name, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取分页数据；用于分页显示查询结果
        public IList<ResourceTypeListInfo> ResourceTypeGetListPaged(string name, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.ResourceTypeGetList(name, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取不分页数据；用于RDLC报表
        public IList<ResourceTypeListInfo> ResourceTypeGetListUnPaged(string name, string orderFieldName, string orderType)
        {
            return dal.ResourceTypeGetList(name, false, 1, 10, orderFieldName, orderType);
        }

        //获取不分页数据；用于RDLC报表
        public IList<ResourceTypeListInfo> ResourceTypeGetDropDownList(string name,string orderFieldName, string orderType)
        {
            return dal.ResourceTypeGetList(name, false, 1, 10, orderFieldName, orderType);
        }
        #endregion 获取ResourceTypeList 结束

        #region 获取ResourceTypeList记录数

        //获取汇总
        public RecordCountInfo ResourceTypeGetListSum(string name)
        {
            return dal.ResourceTypeGetListSum(name);
        }

        #endregion 获取ResourceTypeList记录数 结束
    }
}
