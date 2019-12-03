using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.IDAL;
using SBJYJCMIS.DALFactory;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.BLL
{
    public class DimisionType
    {
        private static readonly IDimisionType dal = EmployeeDataAccess.CreateDimisionType();

        #region 记录操作

        //插入DimisionType信息
        public bool DimisionTypeInsert(DimisionTypeInfo DimisionType)
        {
            if (DimisionType == null) return false;
            return dal.DimisionTypeInsert(DimisionType);
        }

        //更新DimisionType信息
        public bool DimisionTypeUpdateById(DimisionTypeInfo DimisionType)
        {
            if (DimisionType == null) return false;
            return dal.DimisionTypeUpdateById(DimisionType);//执行更新命令
        }

        //根据Id删除记录
        public bool DimisionTypeUpdateDataStatusIdById(DimisionTypeInfo DimisionType)
        {
            if (DimisionType == null) return false;
            return dal.DimisionTypeUpdateDataStatusIdById(DimisionType);//执行删除命令
        }

        #endregion 记录操作结束

        #region 获取记录集合

        //验证DimisionType是否已存在
        public bool DimisionTypeIsExistedByName(string name)
        {
            return dal.DimisionTypeIsExistedByName(name);
        }

        //获取DimisionType列表
        public IList<DimisionTypeInfo> DimisionTypeGetNameList()
        {
            return dal.DimisionTypeGetNameList();
        }

        //验证DimisionType是否已存在(排除原来人员离职类别名称，用于更新)
        public bool DimisionTypeIsExistedByNewNameAndOldName(string newName, string oldName)
        {
            return dal.DimisionTypeIsExistedByNewNameAndOldName(newName, oldName);
        }

        #endregion

        #region 获取DimisionTypeGetList

        //获取QueryResult
        public IList<DimisionTypeListInfo> DimisionTypeGetList(string name, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.DimisionTypeGetList(name, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取QueryResult分页数据；用于分页显示查询结果
        public IList<DimisionTypeListInfo> DimisionTypeGetListPaged(string name, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.DimisionTypeGetList(name, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取QueryResult不分页数据；用于RDLC报表
        public IList<DimisionTypeListInfo> DimisionTypeGetListUnPaged(string name, object orderFieldName, object orderType)
        {
            return dal.DimisionTypeGetList(name, false, 1, 10, orderFieldName, orderType);
        }

        #endregion 获取DimisionTypeGetList 结束

        #region 获取DimisionType汇总

        //获取汇总
        public RecordCountInfo DimisionTypeGetListSum(string name)
        {
            return dal.DimisionTypeGetListSum(name);
        }

        #endregion 获取DimisionType汇总 结束
    }
}
