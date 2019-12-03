using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IRegionDao
    {
        #region 增删改
        int InsertRegion(RegionInfo ri);
        int UpdateRegion(RegionInfo ri);
        int DeleteRegion(RegionInfo ri);
        #endregion

        #region 是否存在判断
        bool IsExistedNewShortName(string name, int idd);
        bool IsExistedNewName(string name, int idd);
        bool IsExistedShortName(string name);
        bool IsExistedName(string name);
        bool IsExistedRegion(string id);
        #endregion

        #region 单个查询
        RegionInfo GetRegionByName(string name);
        RegionInfo GetRegionById(string id);
        #endregion

        #region 综合查询
        IList<RegionInfo> GetAllList();
        IList<RegionShortInfo> GetRegionList(string id, string name, string parentId, string pinYin, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType);
        int GetRegionListCount(string id, string name, string parentId, string pinYin);
        IList<RegionShortInfo> GetProvinceList();//获取省列表
        IList<RegionShortInfo> GetMunicipalList(string provinceId);//根据省Id获取市区列表
        IList<RegionShortInfo> GetTopNLevelRegionList(int topNLevel);
        IList<RegionShortInfo> GetRegionListByShortId(string id, int length, int hasSelf);
        IList<RegionShortInfo> GetNextLevelRegionList(string parentId, int hasSelf);
        IList<RegionShortInfo> GetSubRegionList(string id, int hasSelf);
		#endregion
	}
}
