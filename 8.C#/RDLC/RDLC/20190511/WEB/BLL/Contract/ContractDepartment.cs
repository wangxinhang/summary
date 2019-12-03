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
    public class ContractDepartment
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IContractDepartment dal = ContractDataAccess.CreateContractDepartment();

        //获取列表
        public IList<ContractDepartmentInfo> ContractDepartmentGetList()
        {
            return dal.ContractDepartmentGetList();
        }

    }    
}
