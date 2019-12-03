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
    public sealed class DepartmentDataAccess
    {
        private static readonly string path = ConfigurationManager.AppSettings["WebDAL"];

        // Look up the DAL implementation we should be using
        private DepartmentDataAccess() { } 

        //获取用户信息
        public static IDepartmentDao CreateDepartment()
        {
            string className = path + ".DepartmentDao";
            return (IDepartmentDao)Assembly.Load(path).CreateInstance(className);
        }

        public static IDepartmentTypeDao CreateDepartmentType()
        {
            string className = path + ".DepartmentTypeDao";
            return (IDepartmentTypeDao)Assembly.Load(path).CreateInstance(className);
        }
    }
}
