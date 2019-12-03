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
    public sealed class XmenuDataAccess
    {
        private static readonly string path = ConfigurationManager.AppSettings["WebDAL"];

        // Look up the DAL implementation we should be using
        private XmenuDataAccess() { } 

        //流程类别（流程名称）
        public static IXmenu CreateXmenu(){
            string className = path + ".Xmenu";
            return (IXmenu)Assembly.Load(path).CreateInstance(className);
        }
    }
}
