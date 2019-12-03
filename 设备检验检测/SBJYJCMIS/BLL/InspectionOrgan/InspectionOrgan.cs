using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.DALFactory;
using SBJYJCMIS.Model;
using SBJYJCMIS.IDAL;

namespace SBJYJCMIS.BLL
{
    public class InspectionOrgan
    {
        private static readonly IInspectionOrgan dal = InspectionOrganDataAccess.CreateInspectionOrgan();

        //获取检测机构查询结果集及记录总数
        public IList<InspectionOrganInfo> InspectionOrganGetList(string Name, int IsInner, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.InspectionOrganGetList(Name, IsInner, true, pageNumber, pageSize, orderFieldName, orderType);
        }
        public RecordCountInfo InspectionOrganGetSum(string Name, int IsInner)
        {
            return dal.InspectionOrganGetSum(Name, IsInner);
        }

        //新增检测机构信息
        public bool InspectionOrganInsert(InspectionOrganInfo InspectionOrgan)
        {
           return dal.InspectionOrganInsert(InspectionOrgan);
        }

        //编辑检测机构信息
        public bool InspectionOrganUpdate(InspectionOrganInfo InspectionOrgan)
        {
            return dal.InspectionOrganUpdate(InspectionOrgan);
        }

        //删除检测机构信息
        public bool InspectionOrganDelete(int Id)
        {
            return dal.InspectionOrganDelete(Id);
        }




    }
}
