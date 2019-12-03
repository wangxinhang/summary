using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;
using System.Reflection;
using SBJYJCMIS.IDAL;

namespace SBJYJCMIS.DALFactory
{
    public sealed class MineDataAccess
    {
        private static readonly string path = ConfigurationManager.AppSettings["WebDAL"];

        public static IMine CreateMine()
        {
            string className = path + ".Mine";
            return (IMine)Assembly.Load(path).CreateInstance(className);
        }
    }
}
