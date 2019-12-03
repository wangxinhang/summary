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
    public class FlowHandleType
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IFlowHandleType dal = FlowDataAccess.CreateFlowHandleType();

        #region 记录操作
        //插入FlowHandleType信息
        public bool FlowHandleTypeInsert(FlowHandleTypeInfo flowType)
        {
            if (flowType == null) return false;
            return dal.FlowHandleTypeInsert(flowType);
        }

        //更新FlowHandleType信息
        public bool FlowHandleTypeUpdateById(FlowHandleTypeInfo flowType)
        {
            if (flowType == null) return false;
            return dal.FlowHandleTypeUpdateById(flowType);
        }
        
        //1-0：更新FlowHandleType信息的DataStatus，有重载
        public bool FlowHandleTypeUpdateDataStatusById(int id, int dataStatusId, int modifierId)
        {
            if (id == 0 || dataStatusId == 0 || modifierId==0) return false;

            FlowHandleTypeInfo flowType = new FlowHandleTypeInfo();
            flowType.Id = id;
            flowType.DataStatusId = dataStatusId;
            flowType.ModifierId = modifierId;

            return dal.FlowHandleTypeUpdateById(flowType);//执行更新命令
        }

        //1-1：逻辑删除FlowHandleType信息（DataStatus=2），对1-0重载
        public bool FlowHandleTypeLogicDeleteById(int id, int modifierId)
        {
            if (id == 0 || modifierId == 0) return false;
            return FlowHandleTypeUpdateDataStatusById(id, 2, modifierId);//执行逻辑删除命令
        }

        #endregion 记录操作结束

        #region 验证FlowHandleType名称唯一性

        //检查Name是否已存在
        public bool FlowHandleTypeIsExisted(string name,int flowId)
        {
            return dal.FlowHandleTypeIsExistedByName(name, flowId);
        }
        //验证FlowNode是否已存在(用于更新)
        public bool FlowHandleTypeIsExistedByNewNameAndOldName(string newName, string oldName)
        {
            return dal.FlowHandleTypeIsExistedByNewNameAndOldName(newName, oldName);
        }
        #endregion 验证FlowHandleType名称唯一性 结束

        #region 获取FlowHandleTypeGetList列表

        //获取列表
        public IList<FlowHandleTypeListInfo> FlowHandleTypeGetList(string name, int flowId, int flowOperationId,
                                       bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.FlowHandleTypeGetList(name, flowId, flowOperationId, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表分页数据；用于分页显示查询结果
        public IList<FlowHandleTypeListInfo> FlowHandleTypeGetListPaged(string name, int flowId, int flowOperationId,
                                       int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.FlowHandleTypeGetList(name, flowId, flowOperationId, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表不分页数据；用于分页显示查询结果
        public IList<FlowHandleTypeListInfo> FlowHandleTypeGetListUnPaged(string name, int flowId, int flowOperationId, object orderFieldName, object orderType)
        {
            return dal.FlowHandleTypeGetList(name, flowId, flowOperationId, false, 0, 0, orderFieldName, orderType);
        }


        #endregion 获取FlowHandleTypeGetListByFlowId列表

        #region 获取FlowNodeOperation列表值汇总

        //获取列表
        public RecordCountInfo FlowHandleTypeGetRecordCount(string name, int flowId,int flowOperationId)
        {
            return dal.FlowHandleTypeGetRecordCount(name, flowId, flowOperationId);
        }
        #endregion 获取FlowNodeRole列表值汇总

    }
}
