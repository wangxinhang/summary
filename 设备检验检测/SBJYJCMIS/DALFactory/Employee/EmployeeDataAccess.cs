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
    public sealed class EmployeeDataAccess
    {
        // Look up the DAL implementation we should be using
        private static readonly string path = ConfigurationManager.AppSettings["WebDAL"];

        private EmployeeDataAccess() { }

        //create the SQLServerDAL.Shop implementation 

        #region 人员管理相关

        //public static IAdministrativeDivision CreateAdministrativeDivision()
        //{
        //    string className = path + ".AdministrativeDivision";
        //    return (IAdministrativeDivision)Assembly.Load(path).CreateInstance(className);
        //}

        public static IEmployeeDao CreateEmployee()
        {
            string className = path + ".EmployeeDao";
            return (IEmployeeDao)Assembly.Load(path).CreateInstance(className);
        }
        public static IEmployeeDepartmentLog CreateEmployeeDepartmentLog()
        {
            string className = path + ".EmployeeDepartmentLog";
            return (IEmployeeDepartmentLog)Assembly.Load(path).CreateInstance(className);
        }

        public static IEmployeePositionLog CreateEmployeePositionLog()
        {
            string className = path + ".EmployeePositionLog";
            return (IEmployeePositionLog)Assembly.Load(path).CreateInstance(className);
        }

        public static IEmployeeDimision CreateEmployeeDimision()
        {
            string className = path + ".EmployeeDimision";
            return (IEmployeeDimision)Assembly.Load(path).CreateInstance(className);
        }

        public static IEmployeeStatusDao CreateEmployeeStatus()
        {
            string className = path + ".EmployeeStatusDao";
            return (IEmployeeStatusDao)Assembly.Load(path).CreateInstance(className);
        }

        public static IPositionDao CreatePosition()
        {
            string className = path + ".PositionDao";
            return (IPositionDao)Assembly.Load(path).CreateInstance(className);
        }

        public static IDimisionType CreateDimisionType()
        {
            string className = path + ".DimisionType";
            return (IDimisionType)Assembly.Load(path).CreateInstance(className);
        }

        public static INationDao CreateNation()
        {
            string className = path + ".NationDao";
            return (INationDao)Assembly.Load(path).CreateInstance(className);
        }

        public static IEducationDao CreateEducation()
        {
            string className = path + ".EducationDao";
            return (IEducationDao)Assembly.Load(path).CreateInstance(className);
        }

        
        #endregion 人员管理相关 结束
    }
}
