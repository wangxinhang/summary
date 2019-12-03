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
    public class FlowOperationStatusRelation
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IFlowOperationStatusRelation dal = FlowDataAccess.CreateFlowOperationStatusRelation();

        #region 记录操作
        //插入FlowOperationStatusRelation信息
        public bool FlowOperationStatusRelationInsert(FlowOperationStatusRelationInfo flowOperationStatusRelationInfo)
        {
            if (flowOperationStatusRelationInfo == null) return false;
            return dal.FlowOperationStatusRelationInsert(flowOperationStatusRelationInfo);
        }

        //更新FlowOperationStatusRelation信息
        public bool FlowOperationStatusRelationUpdateByIdTran(FlowOperationStatusRelationInfo flowOperationStatusRelationInfo)
        {
            if (flowOperationStatusRelationInfo == null) return false;
            return dal.FlowOperationStatusRelationUpdateByIdTran(flowOperationStatusRelationInfo);
        }
        //更新FlowOperationStatusRelation信息
        public bool FlowOperationStatusRelationUpdateById(FlowOperationStatusRelationInfo flowOperationStatusRelationInfo)
        {
            if (flowOperationStatusRelationInfo == null) return false;
            return dal.FlowOperationStatusRelationUpdateById(flowOperationStatusRelationInfo);
        }

        //1-0：更新FlowOperationStatusRelation信息的DataStatus，有重载
        public bool FlowOperationStatusRelationUpdateDataStatusById(int id, int dataStatusId, int modifierId)
        {
            if (id == 0 || dataStatusId == 0 || modifierId==0) return false;

            FlowOperationStatusRelationInfo flowOperationHandleResultRelation = new FlowOperationStatusRelationInfo();
            flowOperationHandleResultRelation.Id = id;
            flowOperationHandleResultRelation.DataStatusId = dataStatusId;
            flowOperationHandleResultRelation.ModifierId = modifierId;

            return dal.FlowOperationStatusRelationUpdateById(flowOperationHandleResultRelation);//执行更新命令
        }

        //1-1：逻辑删除FlowOperationStatusRelation信息（DataStatus=2），对1-0重载
        public bool FlowOperationStatusRelationLogicDeleteById(int id, int modifierId)
        {
            if (id == 0 || modifierId == 0) return false;
            return FlowOperationStatusRelationUpdateDataStatusById(id, 2, modifierId);//执行逻辑删除命令
        }

        #endregion 记录操作结束

    }
}
