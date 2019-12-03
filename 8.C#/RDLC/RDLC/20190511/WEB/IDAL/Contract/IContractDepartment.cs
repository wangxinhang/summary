using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IContractDepartment
    {
        //通过用户权限范围内的部门列表
        IList<ContractDepartmentInfo> ContractDepartmentGetList();      
        
    }
}
