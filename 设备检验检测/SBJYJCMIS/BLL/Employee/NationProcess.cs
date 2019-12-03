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
    public class NationProcess
    {
        private static readonly INationDao dal = EmployeeDataAccess.CreateNation();

        public IList<NationInfo> GetNationNameList()
        {
            return dal.GetNationNameList();
        }

    }
}
