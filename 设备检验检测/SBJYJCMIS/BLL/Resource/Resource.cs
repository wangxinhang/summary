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
    public class Resource
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IResource dal = ResourceDataAccess.CreateResource();

        #region 记录操作
        //插入Resource信息
        public bool ResourceInsertTran(ResourceInfo resource)
        {
            if (resource == null) return false;
            return dal.ResourceInsertTran(resource);
        }

        //删除Resource信息
        public bool ResourceDeleteTranById(int id, int resourceTypeId)
        {
            return dal.ResourceDeleteTranById(id, resourceTypeId);
        }

        //更新Resource信息
        public bool ResourceUpdateTranById(ResourceInfo resource)
        {
            if (resource == null) return false;
            return dal.ResourceUpdateTranById(resource);//执行更新命令
        }

        #endregion 记录操作结束

        #region 根据条件查询Resource记录

        //验证是否存在
        public bool ResourceIsExisted(string name, int resourceTypeId)
        {
            return dal.ResourceIsExisted(name, resourceTypeId);
        }
        #endregion 根据条件查询Resource记录

        #region 获取ResourceList 有重载

        //获取QueryResult
        public IList<ResourceListInfo> ResourceGetList(string name, int resourceTypeId, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.ResourceGetList(name, resourceTypeId, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取分页数据；用于分页显示查询结果
        public IList<ResourceListInfo> ResourceGetListPaged(string name, int resourceTypeId, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.ResourceGetList(name, resourceTypeId, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取不分页数据；用于RDLC报表
        public IList<ResourceListInfo> ResourceGetListUnPaged(string name, int resourceTypeId, string orderFieldName, string orderType)
        {
            return dal.ResourceGetList(name, resourceTypeId, false, 1, 10, orderFieldName, orderType);
        }

        #endregion 获取ResourceList 结束

        #region 获取ResourceList记录数

        //获取汇总
        public ResourceSumInfo ResourceGetListSum(string name, int resourceTypeId)
        {
            return dal.ResourceGetListSum(name, resourceTypeId);
        }

        #endregion 获取ResourceList记录数 结束

        #region 获取ResourceList：用于设置可配置权限 有重载

        //获取QueryResult
        public IList<ResourceOperationListInfo> ResourceGetOperationList(string name, int resourceTypeId, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.ResourceGetOperationList(name, resourceTypeId, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取分页数据；用于分页显示查询结果
        public IList<ResourceOperationListInfo> ResourceGetOperationListPaged(string name, int resourceTypeId, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.ResourceGetOperationList(name, resourceTypeId, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取不分页数据；用于RDLC报表
        public IList<ResourceOperationListInfo> ResourceGetOperationListUnPaged(string name, int resourceTypeId, string orderFieldName, string orderType)
        {
            return dal.ResourceGetOperationList(name, resourceTypeId, false, 1, 10, orderFieldName, orderType);
        }

        #endregion 获取ResourceList：用于设置可配置权限 结束

        #region 获取ResourceList记录数:用于设置可配置权限

        //获取汇总
        public RecordCountInfo ResourceGetOperationListSum(string name, int resourceTypeId)
        {
            return dal.ResourceGetOperationListSum(name, resourceTypeId);
        }

        #endregion 获取ResourceList记录数：用于设置可配置权限
    }
}
