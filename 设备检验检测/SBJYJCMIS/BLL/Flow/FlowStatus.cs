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
    public class FlowStatus
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IFlowStatus dal = FlowDataAccess.CreateFlowStatus();

        #region 记录操作
        //插入FlowStatus信息
        public bool FlowStatusInsert(FlowStatusInfo flowStatus)
        {
            if (flowStatus == null) return false;
            return dal.FlowStatusInsert(flowStatus);
        }

        //更新FlowStatus信息
        public bool FlowStatusUpdateById(FlowStatusInfo flowStatus)
        {
            if (flowStatus == null) return false;
            return dal.FlowStatusUpdateById(flowStatus);
        }

        //1-0：更新FlowStatus信息的DataStatus，有重载
        public bool FlowStatusUpdateDataStatusById(int id, int dataStatusId, int modifierId)
        {
            if (id == 0 || dataStatusId == 0 || modifierId == 0) return false;

            FlowStatusInfo flowStatus = new FlowStatusInfo();
            flowStatus.Id = id;
            flowStatus.DataStatusId = dataStatusId;
            flowStatus.ModifierId = modifierId;

            return dal.FlowStatusUpdateById(flowStatus);//执行更新命令
        }

        //1-1：逻辑删除FlowRule信息（DataStatus=2），对1-0重载
        public bool FlowStatusLogicDeleteById(int id, int modifierId)
        {
            if (id == 0 || modifierId == 0) return false;
            return FlowStatusUpdateDataStatusById(id, 2, modifierId);//执行逻辑删除命令
        }

        #endregion 记录操作结束

        #region 验证flowStatus名称唯一性

        //检查Name是否已存在
        public bool FlowStatusIsExisted(string name, int flowId)
        {
            return dal.FlowStatusIsExistedByName(name, flowId);
        }
        //检测报告审核查询页面 过滤到记录隐含选项
        public IList<FlowStatusListInfo> FlowStatusGetListExceptOne()
        {
            return dal.FlowStatusGetListExceptOne();
        }
        //验证FlowStatus是否已存在(用于更新)
        public bool FlowStatusIsExistedByNewNameAndOldName(string newName, string oldName)
        {
            return dal.FlowStatusIsExistedByNewNameAndOldName(newName, oldName);
        }
        #endregion 验证FlowRule名称唯一性 结束

        #region 获取FlowStatusGetList列表

        //获取列表
        public IList<FlowStatusListInfo> FlowStatusGetList(string name, int flowId,int flowOperationId,
                                       bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.FlowStatusGetList(name, flowId, flowOperationId, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表分页数据；用于分页显示查询结果
        public IList<FlowStatusListInfo> FlowStatusGetListPaged(string name, int flowId, int flowOperationId,
                                       int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.FlowStatusGetList(name, flowId, flowOperationId, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表不分页数据；用于分页显示查询结果
        public IList<FlowStatusListInfo> FlowStatusGetListUnPaged(string name, int flowId, int flowOperationId, object orderFieldName, object orderType)
        {
            return dal.FlowStatusGetList(name, flowId, flowOperationId, false, 0, 0, orderFieldName, orderType);
        }


        #endregion 获取FlowStatusGetListByFlowId列表

        #region 获取FlowNodeOperation列表值汇总

        //获取列表
        public RecordCountInfo FlowStatusGetRecordCount(string name, int flowId, int flowOperationId)
        {
            return dal.FlowStatusGetRecordCount(name, flowId, flowOperationId);
        }
        #endregion 获取FlowNodeRole列表值汇总

    }
}
