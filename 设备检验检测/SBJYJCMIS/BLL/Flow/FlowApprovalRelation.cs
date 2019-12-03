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
    public class FlowApprovalRelation
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IFlowApprovalRelation dal = FlowDataAccess.CreateFlowApprovalRelation();

        #region 获取FlowApprovalRelation列表

        //获取列表
        public IList<FlowApprovalRelationInfo> FlowApprovalRelationGetList(int approverId, int flowTypeId, int assignType,
                                       bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.FlowApprovalRelationGetList(approverId, flowTypeId, assignType, 
                   isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表分页数据；用于分页显示查询结果
        public IList<FlowApprovalRelationInfo> FlowApprovalRelationGetListPaged(int approverId, int flowTypeId, int assignType,
                                       int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.FlowApprovalRelationGetList(approverId, flowTypeId, assignType,
                   true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表不分页数据；用于分页显示查询结果
        public IList<FlowApprovalRelationInfo> FlowApprovalRelationGetListUnPaged(int approverId, int flowTypeId, int assignType,
                                       object orderFieldName, object orderType)
        {
            return dal.FlowApprovalRelationGetList(approverId, flowTypeId, assignType, false, 0, 0, orderFieldName, orderType);
        }


        #endregion 获取FlowApprovalRelation列表

        #region 获取FlowApprovalRelation列表值汇总

        //获取列表
        public FlowApprovalRelationSumInfo FlowApprovalRelationGetSum(int approverId, int flowTypeId, int assignType)
        {
            return dal.FlowApprovalRelationGetSum(approverId, flowTypeId, assignType);
        }
        #endregion 获取FlowApprovalRelation列表值汇总

    }
}
