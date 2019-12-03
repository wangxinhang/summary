using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.IDAL;
using SBJYJCMIS.DALFactory;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.BLL
{
    public class EmployeeStatusProcess
    {
        private static readonly IEmployeeStatusDao dal = EmployeeDataAccess.CreateEmployeeStatus();

        #region 增删改
        //插入EmployeeStatus信息
        public bool InsertEmployeeStatus(EmployeeStatusInfo EmployeeStatus)
        {
            if (EmployeeStatus == null) return false;
            return dal.InsertEmployeeStatus(EmployeeStatus);
        }

        //更新EmployeeStatus信息
        public bool UpdateEmployeeStatus(EmployeeStatusInfo EmployeeStatus)
        {
            if (EmployeeStatus == null) return false;
            return dal.UpdateEmployeeStatus(EmployeeStatus);//执行更新命令
        }

        //根据Id删除记录
        public bool DeleteEmployeeStatus(EmployeeStatusInfo EmployeeStatus)
        {
            if (EmployeeStatus == null) return false;
            return dal.DeleteEmployeeStatus(EmployeeStatus);
        }
        #endregion

        #region 是否存在判断
        //验证EmployeeStatus是否已存在
        public bool IsExistedByName(string name)
        {
            return dal.IsExistedByName(name);
        }

        //验证EmployeeStatus是否已存在(排除原来人员状态名称，用于更新)
        public bool IsExistedByNewNameAndOldName(string newName, string oldName)
        {
            return dal.IsExistedByNewNameAndOldName(newName, oldName);
        }
        #endregion

        #region 综合查询

        //获取人员状态集合
        public IList<EmployeeStatusInfo> GetEmployeeStatusNameList()
        {
            return dal.GetEmployeeStatusNameList();
        }
        //获取QueryResult
        public IList<EmployeeStatusListInfo> GetEmployeeStatusList(string name, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.GetEmployeeStatusList(name, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取QueryResult分页数据；用于分页显示查询结果
        public IList<EmployeeStatusListInfo> GetEmployeeStatusListPaged(string name, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.GetEmployeeStatusList(name, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取QueryResult不分页数据；用于RDLC报表
        public IList<EmployeeStatusListInfo> GetEmployeeStatusListUnPaged(string name, object orderFieldName, object orderType)
        {
            return dal.GetEmployeeStatusList(name, false, 1, 10, orderFieldName, orderType);
        }

        //获取汇总
        public int GetEmployeeStatusListCount(string name)
        {
            return dal.GetEmployeeStatusListCount(name);
        }

        #endregion 获取EmployeeStatus汇总 结束
        
    }
}
