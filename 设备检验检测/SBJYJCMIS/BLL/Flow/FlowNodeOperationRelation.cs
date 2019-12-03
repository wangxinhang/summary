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
    public class FlowNodeOperationRelation
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IFlowNodeOperationRelation dal = FlowDataAccess.CreateFlowNodeOperationRelation();

        #region 记录操作
        //插入FlowNodeOperationRelation信息
        public bool FlowNodeOperationRelationInsert(FlowNodeOperationRelationInfo flowNodeOperationRelationInfo)
        {
            if (flowNodeOperationRelationInfo == null) return false;
            return dal.FlowNodeOperationRelationInsert(flowNodeOperationRelationInfo);
        }
        //插入FlowNodeOperationRelation事物信息
        public bool FlowNodeOperationRelationInsertTran(FlowNodeOperationRelationInfo flowNodeOperationRelationInfo)
        {
            if (flowNodeOperationRelationInfo == null) return false;
            return dal.FlowNodeOperationRelationInsertTran(flowNodeOperationRelationInfo);
        }
        //更新FlowNodeOperationRelation信息
        public bool FlowNodeOperationRelationUpdateById(FlowNodeOperationRelationInfo flowNodeOperationRelationInfo)
        {
            if (flowNodeOperationRelationInfo == null) return false;
            return dal.FlowNodeOperationRelationUpdateById(flowNodeOperationRelationInfo);
        }
        
        //1-0：更新FlowNodeOperationRelation信息的DataStatus，有重载
        public bool FlowNodeOperationRelationUpdateDataStatusById(int id, int dataStatusId, int modifierId)
        {
            if (id == 0 || dataStatusId == 0 || modifierId==0) return false;

            FlowNodeOperationRelationInfo flowNodeOperationRelation = new FlowNodeOperationRelationInfo();
            flowNodeOperationRelation.Id = id;
            flowNodeOperationRelation.DataStatusId = dataStatusId;
            flowNodeOperationRelation.ModifierId = modifierId;

            return dal.FlowNodeOperationRelationUpdateById(flowNodeOperationRelation);//执行更新命令
        }

        //1-1：逻辑删除FlowNodeOperationRelation信息（DataStatus=2），对1-0重载
        public bool FlowNodeOperationRelationLogicDeleteById(int id, int modifierId)
        {
            if (id == 0 || modifierId == 0) return false;
            return FlowNodeOperationRelationUpdateDataStatusById(id, 2, modifierId);//执行逻辑删除命令
        }

        #endregion 记录操作结束

        #region 验证FlowNode名称唯一性

        //检查Name是否已存在
        public bool FlowNodeOperationRelationIsExisted(int flowNodeId,int flowOperationId, int flowId)
        {
            return dal.FlowNodeOperationRelationIsExisted(flowNodeId, flowOperationId, flowId);
        }

        #endregion 验证FlowNode名称唯一性 结束

        #region 获取FlowNodeOperation列表

        //获取列表
        public IList<FlowNodeOperationRelationListInfo> FlowNodeOperationGetList(string roleName, int flowId, int assignTypeId,
                                       bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.FlowNodeOperationGetList(roleName, flowId, assignTypeId,
                   isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表分页数据；用于分页显示查询结果
        public IList<FlowNodeOperationRelationListInfo> FlowNodeOperationGetListPaged(string roleName, int flowId, int assignTypeId,
                                       int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.FlowNodeOperationGetList(roleName, flowId, assignTypeId,
                   true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表不分页数据；用于分页显示查询结果
        public IList<FlowNodeOperationRelationListInfo> FlowNodeOperationGetListUnPaged(string roleName, int flowId, int assignTypeId,
                                       object orderFieldName, object orderType)
        {
            return dal.FlowNodeOperationGetList(roleName, flowId, assignTypeId, false, 0, 0, orderFieldName, orderType);
        }


        #endregion 获取FlowNodeOperation列表

        #region 获取FlowNodeOperation列表值汇总

        //获取列表
        public RecordCountInfo FlowNodeOperationGetRecordCount(string roleName, int flowId, int assignTypeId)
        {
            return dal.FlowNodeOperationGetRecordCount(roleName, flowId, assignTypeId);
        }
        #endregion 获取FlowNodeRole列表值汇总
       
    }
}
