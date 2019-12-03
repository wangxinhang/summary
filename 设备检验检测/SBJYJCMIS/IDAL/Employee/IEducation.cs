using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IEducationDao
    {

        #region 增删改
        bool InsertEducation(EducationInfo Education);//插入Education新纪录
        bool UpdateEducation(EducationInfo Education);//更新Education纪录
        bool DeleteEducation(EducationInfo Education);//删除Education纪录

        #endregion

        #region 是否存在判断

        bool IsExistedByName(string name);//根据名称验证学历是否存在
        bool IsExistedByNewNameAndOldName(string newName, string oldName);//根据名称验证学历名称是否存在(排除原来学历名称，用于更新)

        #endregion

        #region 查询
        IList<EducationInfo> GetEducationNameList();
        //获取EducationGetList记录集和记录数
        IList<EducationListInfo> GetEducationList(string name, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);
        int GetEducationListCount(string name);

        #endregion 获取Education汇总 结束

    }
}
