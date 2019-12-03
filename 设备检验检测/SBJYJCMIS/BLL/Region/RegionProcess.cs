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
    public class RegionProcess
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IRegionDao dal = RegionDataAccess.CreateRegion();

        #region 增删改
        public bool InsertRegion(RegionInfo ri)
        {
            int retVal = dal.InsertRegion(ri);
            return (retVal == 0) ? true : false;
        }
        public bool UpdateRegion(RegionInfo ri)
        {
            int retVal = dal.UpdateRegion(ri);
            return (retVal == 0) ? true : false;
        }
        public bool DeleteRegion(RegionInfo ri)
        {
            int retVal = dal.DeleteRegion(ri);
            return (retVal == 0) ? true : false;
        }
        #endregion
        #region 是否存在判断
        public bool IsExistedName(string name)
        {
            return dal.IsExistedName(name);
        }
        public bool IsExistedShortName(string name)
        {
            return dal.IsExistedShortName(name);
        }
        public bool IsExistedRegion(string id)
        {
            return dal.IsExistedRegion(id);
        }
        public bool IsExistedNewName(string name, int idd)
        {
            return dal.IsExistedNewName(name, idd);
        }
        public bool IsExistedNewShortName(string name, int idd)
        {
            return dal.IsExistedNewShortName(name, idd);
        }
        #endregion

        #region 单个查询
        public RegionInfo GetRegionByName(string name)
        {
             return dal.GetRegionByName(name);
        }
        public RegionInfo GetRegionById(string id)
        {
            return dal.GetRegionById(id);
        }
        #endregion

        #region 获取RegionList 有重载
        public IList<RegionInfo> GetAllList()
        {
            return dal.GetAllList();
        }
        public IList<RegionShortInfo> RegionGetList(string id, string name, string parentId, string pinYin, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.GetRegionList(id, name, parentId, pinYin, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        public IList<RegionShortInfo> GetRegionListPaged(string id, string name, string parentId, string pinYin, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.GetRegionList(id, name, parentId, pinYin, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        public IList<RegionShortInfo> GetRegionListUnPaged(string id, string name, string parentId, string pinYin, string orderFieldName, string orderType)
        {
            return dal.GetRegionList(id, name, parentId, pinYin, false, 1, 10, orderFieldName, orderType);
        }

        public int GetRegionListCount(string id, string name, string parentId, string pinYin)
        {
            return dal.GetRegionListCount(id, name, parentId, pinYin);
        }
        public IList<RegionShortInfo> GetProvinceList()
        {
            return dal.GetProvinceList();
        }
        public IList<RegionShortInfo> GetProvinceList(string sortField, string sortDirection)
        {
            IList<RegionShortInfo> list = new List<RegionShortInfo>();
            list = (List<RegionShortInfo>)GetProvinceList();
            SetSort<RegionShortInfo> listSort = new SetSort<RegionShortInfo>();
            listSort.SortDirection = sortDirection;
            listSort.SortField = sortField;
            ((List<RegionShortInfo>)list).Sort(listSort);

            return list;
        }
        public IList<RegionShortInfo> GetTopNLevelRegionList(int topNLevel)
        {
            return dal.GetTopNLevelRegionList(topNLevel);
        }
        public IList<RegionShortInfo> GetMunicipalList(string provinceId)
        {
            return dal.GetMunicipalList(provinceId);
        }
        public IList<RegionShortInfo> GetRegionListByShortId(string id, int length, int hasSelf)
        {
            return dal.GetRegionListByShortId(id, length, hasSelf);
        }

        public IList<RegionShortInfo> GetNextLevelRegionList(string parentId, int hasSelf)
        {
            return dal.GetNextLevelRegionList(parentId, hasSelf);
        }
        public IList<RegionShortInfo> GetSubRegionList(string id, int hasSelf)
        {
            return dal.GetSubRegionList(id, hasSelf);
        }
        
		#endregion
	}
}
