using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.DALFactory;
using SBJYJCMIS.IDAL;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.BLL
{
    public class Mine
    {
        private static readonly IMine dal = MineDataAccess.CreateMine();

        //获取Mine结果集
        public IList<MineInfo> MineGetList(string MKBM, int SJQYId, int JCBMId, int SZQYId, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.MineGetList(MKBM, SJQYId, JCBMId, SZQYId, true, pageNumber, pageSize, orderFieldName, orderType);
        }
        //获取Mine记录总数
        public RecordCountInfo MineGetListSum(string MKBM, int SJQYId, int JCBMId, int SZQYId)
        {
            return dal.MineGetListSum(MKBM, SJQYId, JCBMId, SZQYId);
        }
        //获取煤矿企业下拉列表
        public IList<DepartmentInfo> SJQYGetList()
        {
            return dal.SJQYGetList();
        }
        //获取监察部门下拉列表
        public IList<DepartmentInfo> JCBMGetList()
        {
            return dal.JCBMGetList();
        }
        //获取所在区域下拉列表
        public IList<RegionInfo> SZQYGetList()
        {
            return dal.SZQYGetList();
        }
    }
}
