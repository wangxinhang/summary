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
    public sealed class XmenuPageDataAccess
    {
        private static readonly string path = ConfigurationManager.AppSettings["WebDAL"];

        // Look up the DAL implementation we should be using
        private XmenuPageDataAccess() { } 

        //获取用户信息
        public static IXmenuPage CreateXmenuPage()
        {
            string className = path + ".XmenuPage";
            return (IXmenuPage)Assembly.Load(path).CreateInstance(className);
        }
    }
}
