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
    public class FlowOperationHandleTypeRelation
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IFlowOperationHandleTypeRelation dal = FlowDataAccess.CreateFlowOperationHandleTypeRelation();

        #region 记录操作
        //插入FlowOperationHandleTypeRelation信息
        public bool FlowOperationHandleTypeRelationInsert(FlowOperationHandleTypeRelationInfo flowOperationHandleTypeRelation)
        {
            if (flowOperationHandleTypeRelation == null) return false;
            return dal.FlowOperationHandleTypeRelationInsert(flowOperationHandleTypeRelation);
        }

        //更新FlowOperationHandleTypeRelation信息
        public bool FlowOperationHandleTypeRelationUpdateByIdTran(FlowOperationHandleTypeRelationInfo flowOperationHandleTypeRelation)
        {
            if (flowOperationHandleTypeRelation == null) return false;
            return dal.FlowOperationHandleTypeRelationUpdateByIdTran(flowOperationHandleTypeRelation);
        }
        //更新FlowOperationHandleTypeRelation信息
        public bool FlowOperationHandleTypeRelationUpdateById(FlowOperationHandleTypeRelationInfo flowOperationHandleTypeRelation)
        {
            if (flowOperationHandleTypeRelation == null) return false;
            return dal.FlowOperationHandleTypeRelationUpdateById(flowOperationHandleTypeRelation);
        }

        //1-0：更新FlowOperationHandleTypeRelation信息的DataStatus，有重载
        public bool FlowOperationHandleTypeRelationUpdateDataStatusById(int id, int dataStatusId, int modifierId)
        {
            if (id == 0 || dataStatusId == 0 || modifierId==0) return false;

            FlowOperationHandleTypeRelationInfo flowOperationHandleResultRelation = new FlowOperationHandleTypeRelationInfo();
            flowOperationHandleResultRelation.Id = id;
            flowOperationHandleResultRelation.DataStatusId = dataStatusId;
            flowOperationHandleResultRelation.ModifierId = modifierId;

            return dal.FlowOperationHandleTypeRelationUpdateById(flowOperationHandleResultRelation);//执行更新命令
        }

        //1-1：逻辑删除FlowOperationHandleTypeRelation信息（DataStatus=2），对1-0重载
        public bool FlowOperationHandleTypeRelationLogicDeleteById(int id, int modifierId)
        {
            if (id == 0 || modifierId == 0) return false;
            return FlowOperationHandleTypeRelationUpdateDataStatusById(id, 2, modifierId);//执行逻辑删除命令
        }

        #endregion 记录操作结束

    }
}
