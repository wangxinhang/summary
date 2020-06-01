using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;
using System.Reflection;
using SBJYJCMIS.IDAL;

namespace SBJYJCMIS.DALFactory
{
    /// <summary>
    /// This class is implemented following the Abstract Factory pattern to create the DAL implementation
    /// specified from the configuration file
    /// </summary>
    public sealed class ContractDataAccess
    {
        private static readonly string path = ConfigurationManager.AppSettings["WebDAL"];

        // Look up the DAL implementation we should be using
        private ContractDataAccess() { }
        //合同分类汇总
        public static INewContractSubtotal CreateNewContractSubtotal()
        {
            string className = path + ".NewContractSubtotal";
            return (INewContractSubtotal)Assembly.Load(path).CreateInstance(className);
        }
        public static IContractDepartment CreateContractDepartment()
        {
            string className = path + ".ContractDepartment";
            return (IContractDepartment)Assembly.Load(path).CreateInstance(className);
        }
    }
}
