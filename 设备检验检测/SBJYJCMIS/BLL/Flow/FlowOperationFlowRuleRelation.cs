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
    public class FlowOperationFlowRuleRelation
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IFlowOperationFlowRuleRelation dal = FlowDataAccess.CreateFlowOperationFlowRuleRelation();

        #region 记录操作
        //插入FlowOperationFlowRuleRelation信息
        public bool FlowOperationFlowRuleRelationInsert(FlowOperationFlowRuleRelationInfo flowOperationFlowRuleRelation)
        {
            if (flowOperationFlowRuleRelation == null) return false;
            return dal.FlowOperationFlowRuleRelationInsert(flowOperationFlowRuleRelation);
        }
        //更新FlowOperationFlowRuleRelation信息
        public bool FlowOperationFlowRuleRelationUpdateByIdTran(FlowOperationFlowRuleRelationInfo flowOperationFlowRuleRelation)
        {
            if (flowOperationFlowRuleRelation == null) return false;
            return dal.FlowOperationFlowRuleRelationUpdateByIdTran(flowOperationFlowRuleRelation);
        }
        //更新FlowOperationFlowRuleRelation信息
        public bool FlowOperationFlowRuleRelationUpdateById(FlowOperationFlowRuleRelationInfo flowOperationFlowRuleRelation)
        {
            if (flowOperationFlowRuleRelation == null) return false;
            return dal.FlowOperationFlowRuleRelationUpdateById(flowOperationFlowRuleRelation);
        }

        //1-0：更新FlowOperationFlowRuleRelation信息的DataStatus，有重载
        public bool FlowOperationFlowRuleRelationUpdateDataStatusById(int id, int dataStatusId, int modifierId)
        {
            if (id == 0 || dataStatusId == 0 || modifierId==0) return false;

            FlowOperationFlowRuleRelationInfo flowOperationHandleResultRelation = new FlowOperationFlowRuleRelationInfo();
            flowOperationHandleResultRelation.Id = id;
            flowOperationHandleResultRelation.DataStatusId = dataStatusId;
            flowOperationHandleResultRelation.ModifierId = modifierId;

            return dal.FlowOperationFlowRuleRelationUpdateById(flowOperationHandleResultRelation);//执行更新命令
        }

        //1-1：逻辑删除FlowOperationFlowRuleRelation信息（DataStatus=2），对1-0重载
        public bool FlowOperationFlowRuleRelationLogicDeleteById(int id, int modifierId)
        {
            if (id == 0 || modifierId == 0) return false;
            return FlowOperationFlowRuleRelationUpdateDataStatusById(id, 2, modifierId);//执行逻辑删除命令
        }

        #endregion 记录操作结束

    }
}
