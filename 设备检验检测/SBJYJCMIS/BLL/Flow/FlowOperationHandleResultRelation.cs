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
    public class FlowOperationHandleResultRelation
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IFlowOperationHandleResultRelation dal = FlowDataAccess.CreateFlowOperationHandleResultRelation();

        #region 记录操作
        //插入FlowOperationHandleResultRelation信息
        public bool FlowOperationHandleResultRelationInsert(FlowOperationHandleResultRelationInfo flowOperationHandleResultRelation)
        {
            if (flowOperationHandleResultRelation == null) return false;
            return dal.FlowOperationHandleResultRelationInsert(flowOperationHandleResultRelation);
        }

        //更新FlowOperationHandleResultRelation信息
        public bool FlowOperationHandleResultRelationUpdateByIdTran(FlowOperationHandleResultRelationInfo flowOperationHandleResultRelation)
        {
            if (flowOperationHandleResultRelation == null) return false;
            return dal.FlowOperationHandleResultRelationUpdateByIdTran(flowOperationHandleResultRelation);
        }

        //更新FlowOperationHandleResultRelation信息
        public bool FlowOperationHandleResultRelationUpdateById(FlowOperationHandleResultRelationInfo flowOperationHandleResultRelation)
        {
            if (flowOperationHandleResultRelation == null) return false;
            return dal.FlowOperationHandleResultRelationUpdateById(flowOperationHandleResultRelation);
        }
        
        //1-0：更新FlowOperationHandleResultRelation信息的DataStatus，有重载
        public bool FlowOperationHandleResultRelationUpdateDataStatusById(int id, int dataStatusId, int modifierId)
        {
            if (id == 0 || dataStatusId == 0 || modifierId==0) return false;

            FlowOperationHandleResultRelationInfo flowOperationHandleResultRelation = new FlowOperationHandleResultRelationInfo();
            flowOperationHandleResultRelation.Id = id;
            flowOperationHandleResultRelation.DataStatusId = dataStatusId;
            flowOperationHandleResultRelation.ModifierId = modifierId;

            return dal.FlowOperationHandleResultRelationUpdateById(flowOperationHandleResultRelation);//执行更新命令
        }

        //1-1：逻辑删除FlowOperationHandleResultRelation信息（DataStatus=2），对1-0重载
        public bool FlowOperationHandleResultRelationLogicDeleteById(int id, int modifierId)
        {
            if (id == 0 || modifierId == 0) return false;
            return FlowOperationHandleResultRelationUpdateDataStatusById(id, 2, modifierId);//执行逻辑删除命令
        }

        #endregion 记录操作结束

        #region 获取FlowOperationHandleResult列表

        //获取列表
        public IList<FlowOperationHandleResultRelationListInfo> FlowOperationHandleResultGetList(string roleName, int flowId, int assignTypeId, 
                                       bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.FlowOperationHandleResultGetList(roleName, flowId, assignTypeId,
                   isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表分页数据；用于分页显示查询结果
        public IList<FlowOperationHandleResultRelationListInfo> FlowOperationHandleResultGetListPaged(string roleName, int flowId, int assignTypeId,
                                       int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.FlowOperationHandleResultGetList(roleName, flowId, assignTypeId,
                   true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表不分页数据；用于分页显示查询结果
        public IList<FlowOperationHandleResultRelationListInfo> FlowOperationHandleResultGetListUnPaged(string roleName, int flowId, int assignTypeId,
                                       object orderFieldName, object orderType)
        {
            return dal.FlowOperationHandleResultGetList(roleName, flowId, assignTypeId, false, 0, 0, orderFieldName, orderType);
        }


        #endregion 获取FlowOperationHandleResult列表

        #region 获取FlowOperationHandleResult列表值汇总

        //获取列表
        public RecordCountInfo FlowOperationHandleResultGetRecordCount(string roleName, int flowId, int assignTypeId)
        {
            return dal.FlowOperationHandleResultGetRecordCount(roleName, flowId, assignTypeId);
        }
        #endregion 获取FlowNodeRole列表值汇总

    }
}
