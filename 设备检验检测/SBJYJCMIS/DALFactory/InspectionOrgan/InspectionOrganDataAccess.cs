using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.IDAL;
using System.Configuration;
using System.Reflection;


namespace SBJYJCMIS.DALFactory
{
    public sealed class InspectionOrganDataAccess
    {
        private static readonly string path = ConfigurationManager.AppSettings["WebDAL"];

        public static IInspectionOrgan CreateInspectionOrgan()
        {
            string className = path + ".InspectionOrgan";
            return (IInspectionOrgan)Assembly.Load(path).CreateInstance(className);
        }
    }
}
