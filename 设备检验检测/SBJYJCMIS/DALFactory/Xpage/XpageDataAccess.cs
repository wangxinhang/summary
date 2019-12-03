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
    public sealed class XpageDataAccess
    {
        private static readonly string path = ConfigurationManager.AppSettings["WebDAL"];

        // Look up the DAL implementation we should be using
        private XpageDataAccess() { } 

        //获取用户信息
        public static IXpage CreateXpage()
        {
            string className = path + ".Xpage";
            return (IXpage)Assembly.Load(path).CreateInstance(className);
        }
    }
}
