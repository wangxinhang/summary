using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IDimisionType
    {

        #region 插入、更新、删除DimisionType新纪录

        //插入、更新、删除DimisionType新纪录
        bool DimisionTypeInsert(DimisionTypeInfo DimisionType);//插入DimisionType新纪录
        bool DimisionTypeUpdateById(DimisionTypeInfo DimisionType);//更新DimisionType纪录
        bool DimisionTypeUpdateDataStatusIdById(DimisionTypeInfo DimisionType);//删除DimisionType纪录

        #endregion 插入、更新、删除DimisionType新纪录 结束

        #region 根据条件获取结果

        //根据条件获取结果
        IList<DimisionTypeInfo> DimisionTypeGetNameList();//获取DimisionType列表
        bool DimisionTypeIsExistedByName(string name);//根据名称验证离职类别是否存在
        bool DimisionTypeIsExistedByNewNameAndOldName(string newName, string oldName);//根据名称验证人员离职类别是否存在(排除原来人员离职类别名称，用于更新)
        #endregion 根据条件获取结果 结束

        #region 获取DimisionTypeGetList记录集和记录数

        //获取DimisionTypeGetList记录集和记录数
        IList<DimisionTypeListInfo> DimisionTypeGetList(string name, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType);

        #endregion 获取DimisionTypeGetList记录集和记录数 结束

        #region 获取DimisionType汇总

        RecordCountInfo DimisionTypeGetListSum(string name);

        #endregion 获取DimisionType汇总 结束

    }
}
