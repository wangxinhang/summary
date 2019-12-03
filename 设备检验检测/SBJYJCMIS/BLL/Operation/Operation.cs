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
    public class Operation
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IOperation dal = OperationDataAccess.CreateOperation();

        #region 记录操作
        //插入Operation信息
        public bool OperationInsert(OperationInfo role)
        {
            if (role == null) return false;
            return dal.OperationInsert(role);
        }

        //删除Operation信息
        public bool OperationDeleteTranById(int id)
        {
            return dal.OperationDeleteTranById(id);
        }

        //更新Operation信息
        public bool OperationUpdateById(OperationInfo role)
        {
            if (role == null) return false;
            return dal.OperationUpdateById(role);
        }

        #endregion 记录操作结束

        #region 根据条件查询Operation记录

        //验证是否存在
        public bool OperationIsExistedByName(string name)
        {
            return dal.OperationIsExistedByName(name);
        }
        #endregion 根据条件查询Operation记录

        #region 获取OperationList 有重载

        //获取QueryResult
        public IList<OperationListInfo> OperationGetList(string name, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.OperationGetList(name, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取分页数据；用于分页显示查询结果
        public IList<OperationListInfo> OperationGetListPaged(string name, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.OperationGetList(name, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取不分页数据；用于RDLC报表
        public IList<OperationListInfo> OperationGetListUnPaged(string name, string orderFieldName, string orderType)
        {
            return dal.OperationGetList(name, false, 1, 10, orderFieldName, orderType);
        }

        #endregion 获取OperationList 结束

        #region 获取OperationList记录数

        //获取汇总
        public OperationSumInfo OperationGetListSum(string name)
        {
            return dal.OperationGetListSum(name);
        }

        #endregion 获取OperationList记录数 结束
    }
}
