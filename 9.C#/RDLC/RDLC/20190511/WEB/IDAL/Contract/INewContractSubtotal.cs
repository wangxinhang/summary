using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface INewContractSubtotal
    {
        //获取ContractSubtotal列表
        IList<NewContractSubtotalInfo> ContractSubtotalGetList( int departmentId, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);
        IList<NewContractSubtotalInfo> ContractSubtotalGetListNew(int departmentId, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);
    }
}
