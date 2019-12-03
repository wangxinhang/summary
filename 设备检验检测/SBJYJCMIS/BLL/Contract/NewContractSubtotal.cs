using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Security;
using SBJYJCMIS.IDAL;
using SBJYJCMIS.DALFactory;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.Bll
{
    public class NewContractSubtotal
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly INewContractSubtotal dal = ContractDataAccess.CreateNewContractSubtotal();

        #region NewContractSubtotal
        #region 获取QueryResult结果集 有重载

        //获取QueryResult
        public IList<NewContractSubtotalInfo> ContractSubtotalGetList(int departmentId, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.ContractSubtotalGetList(departmentId,isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取QueryResult分页数据；用于分页显示查询结果
        public IList<NewContractSubtotalInfo> ContractSubtotalGetListPaged(int departmentId, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.ContractSubtotalGetList(departmentId,true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取QueryResult不分页数据；用于RDLC报表
        public IList<NewContractSubtotalInfo> ContractSubtotalGetListUnPaged(int departmentId, object orderFieldName, object orderType)
        {
            return dal.ContractSubtotalGetList(departmentId,false, 0, 0, orderFieldName, orderType);
        }

        #endregion 获取QueryResult结果集 结束

        #region 获取QueryResult结果集 有重载

        //获取QueryResult
        public IList<NewContractSubtotalInfo> ContractSubtotalGetListNew(int departmentId, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.ContractSubtotalGetListNew(departmentId, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }
        //获取QueryResult不分页数据；用于RDLC报表
        public IList<NewContractSubtotalInfo> ContractSubtotalGetListNewUnPaged(int departmentId, object orderFieldName, object orderType)
        {
            return dal.ContractSubtotalGetListNew(departmentId, false, 0, 0, orderFieldName, orderType);
        }

        #endregion 获取QueryResult结果集 结束

        #endregion ContractSubtotal

    }
}
