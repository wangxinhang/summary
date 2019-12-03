using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Security;
using SBJYJCMIS.IDAL;
using SBJYJCMIS.DALFactory;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.BLL
{
    public class Education
    {
        private static readonly IEducationDao dal = EmployeeDataAccess.CreateEducation();

        #region 增删改

        //插入Education信息
        public bool EducationInsert(EducationInfo Education)
        {
            if (Education == null) return false;
            return dal.InsertEducation(Education);//执行插入命令
        }

        //更新Education信息
        public bool EducationUpdateById(EducationInfo Education)
        {
            if (Education == null) return false;
            return dal.UpdateEducation(Education);//执行更新命令
        }

        //删除Education信息
        public bool EducationUpdateDataStatusIdById(EducationInfo Education)
        {
            if (Education == null) return false;
            return dal.DeleteEducation(Education);//执行删除命令
        }

        #endregion

        #region 是否存在判断

        //验证Education是否已存在
        public bool IsExistedByName(string name)
        {
            return dal.IsExistedByName(name);
        }

        //验证Education是否已存在(排除原来学历名称，用于更新)
        public bool IsExistedByNewNameAndOldName(string newName, string oldName)
        {
            return dal.IsExistedByNewNameAndOldName(newName, oldName);
        }

        #endregion 根据条件查询Education记录

        #region 获取EducationGetList
        //获取Education列表
        public IList<EducationInfo> GetEducationNameList()
        {
            return dal.GetEducationNameList();
        }
        //获取QueryResult
        public IList<EducationListInfo> GetEducationList(string name, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.GetEducationList(name, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取QueryResult分页数据；用于分页显示查询结果
        public IList<EducationListInfo> GetEducationListPaged(string name, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.GetEducationList(name, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取QueryResult不分页数据；用于RDLC报表
        public IList<EducationListInfo> GetEducationListUnPaged(string name, object orderFieldName, object orderType)
        {
            return dal.GetEducationList(name, false, 1, 10, orderFieldName, orderType);
        }

        //获取汇总
        public int GetEducationListCount(string name)
        {
            return dal.GetEducationListCount(name);
        }

        #endregion 获取Education汇总 结束

    }
}
