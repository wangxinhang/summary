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
    public class FlowNodeDefaultSetting
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IFlowNodeDefaultSetting dal = FlowDataAccess.CreateFlowNodeDefaultSetting();

        #region 记录操作
        //插入FlowNodeDefaultSetting信息
        public bool FlowNodeDefaultSettingInsert(FlowNodeDefaultSettingInfo flowNodeDefaultSetting)
        {
            if (flowNodeDefaultSetting == null) return false;
            return dal.FlowNodeDefaultSettingInsert(flowNodeDefaultSetting);
        }

        //更新FlowNodeDefaultSetting信息
        public bool FlowNodeDefaultSettingUpdateById(FlowNodeDefaultSettingInfo flowNodeDefaultSetting)
        {
            if (flowNodeDefaultSetting == null) return false;
            return dal.FlowNodeDefaultSettingUpdateById(flowNodeDefaultSetting);
        }
        
        //1-0：更新FlowNodeDefaultSetting信息的DataStatus，有重载
        public bool FlowNodeDefaultSettingUpdateDataStatusById(int id, int dataStatusId, int modifierId)
        {
            if (id == 0 || dataStatusId == 0 || modifierId == 0) return false;

            FlowNodeDefaultSettingInfo flowNodeDefaultSetting = new FlowNodeDefaultSettingInfo();
            flowNodeDefaultSetting.Id = id;
            flowNodeDefaultSetting.DataStatusId = dataStatusId;
            flowNodeDefaultSetting.ModifierId = modifierId;

            return dal.FlowNodeDefaultSettingUpdateById(flowNodeDefaultSetting);//执行更新命令
        }

        //1-1：逻辑删除FlowNodeDefaultSetting信息（DataStatus=2），对1-0重载
        public bool FlowNodeDefaultSettingLogicDeleteById(int id, int modifierId)
        {
            if (id == 0 || modifierId == 0) return false;
            return FlowNodeDefaultSettingUpdateDataStatusById(id, 2, modifierId);//执行逻辑删除命令
        }

        #endregion 记录操作结束

        #region 验证Flow名称唯一性

        //检查Name是否已存在
        public bool FlowNodeDefaultSettingIsExistedByFlowNodeId(int submitFlowNodeId, int approvalFlowNodeId, int flowNodeId)
        {
            return dal.FlowNodeDefaultSettingIsExistedByFlowNodeId(submitFlowNodeId, approvalFlowNodeId, flowNodeId);
        }

        #endregion 验证Flow名称唯一性 结束

        #region 根据条件获取数据
        public IList<FlowNodeDefaultSettingListInfo> GetFlowNodeSettingByFlowNodeIdFlowOperationId(int xuserId, int departmentId, int flowNodeId, int flowOperationId,int approvalFlowNodeId)
        {
            return dal.GetFlowNodeSettingByFlowNodeIdFlowOperationId(xuserId, departmentId, flowNodeId, flowOperationId,approvalFlowNodeId);
        }
        public IList<FlowNodeDefaultSettingListInfo> GetHiddenReportByXuserIdAndFlowOperationId(int xuserId, int departmentId, int flowOperationId, int approvalFlowNodeId)
        {
            return dal.GetHiddenReportByXuserIdAndFlowOperationId(xuserId, departmentId, flowOperationId, approvalFlowNodeId);
        }
        #endregion

        #region 获取FlowNodeDefaultSetting列表

        //获取列表
        public IList<FlowNodeDefaultSettingListInfo> FlowNodeDefaultSettingGetList(int flowId, int submitFlowNodeId,int approvalFlowNodeId, int departmentId, string role, string xuser, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.FlowNodeDefaultSettingGetList(flowId, submitFlowNodeId,approvalFlowNodeId, departmentId, role, xuser, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表分页数据；用于分页显示查询结果
        public IList<FlowNodeDefaultSettingListInfo> FlowNodeDefaultSettingGetListPaged(int flowId, int submitFlowNodeId, int approvalFlowNodeId, int departmentId, string role, string xuser, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.FlowNodeDefaultSettingGetList(flowId, submitFlowNodeId,approvalFlowNodeId, departmentId, role, xuser, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表不分页数据；用于分页显示查询结果
        public IList<FlowNodeDefaultSettingListInfo> FlowNodeDefaultSettingGetListUnPaged(int flowId, int submitFlowNodeId, int approvalFlowNodeId, int departmentId, string role, string xuser, object orderFieldName, object orderType)
        {
            return dal.FlowNodeDefaultSettingGetList(flowId, submitFlowNodeId,approvalFlowNodeId, departmentId, role, xuser, false, 0, 0, orderFieldName, orderType);
        }


        #endregion 获取FlowNodeDefaultSettingByFlowId列表

        #region 获取FlowNodeOperation列表值汇总

        //获取列表
        public RecordCountInfo FlowNodeDefaultSettingGetRecordCount(int flowId, int submitFlowNodeId, int approvalFlowNodeId, int departmentId, string role, string xuser)
        {
            return dal.FlowNodeDefaultSettingGetRecordCount(flowId, submitFlowNodeId,approvalFlowNodeId, departmentId, role, xuser);
        }
        #endregion 获取FlowNodeRole列表值汇总
    }
}
