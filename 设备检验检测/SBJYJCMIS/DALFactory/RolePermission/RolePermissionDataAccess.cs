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
    public sealed class RolePermissionDataAccess
    {
        private static readonly string path = ConfigurationManager.AppSettings["WebDAL"];

        // Look up the DAL implementation we should be using
        private RolePermissionDataAccess() { } 

        //获取用户信息
        public static IRolePermission CreateRolePermission()
        {
            string className = path + ".RolePermission";
            return (IRolePermission)Assembly.Load(path).CreateInstance(className);
        }
    }
}
