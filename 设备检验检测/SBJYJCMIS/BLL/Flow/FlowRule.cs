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
    public class FlowRule
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IFlowRule dal = FlowDataAccess.CreateFlowRule();

        #region 记录操作
        //插入FlowRule信息
        public bool FlowRuleInsert(FlowRuleInfo flowType)
        {
            if (flowType == null) return false;
            return dal.FlowRuleInsert(flowType);
        }

        //更新FlowRule信息
        public bool FlowRuleUpdateById(FlowRuleInfo flowType)
        {
            if (flowType == null) return false;
            return dal.FlowRuleUpdateById(flowType);
        }
        
        //1-0：更新FlowRule信息的DataStatus，有重载
        public bool FlowRuleUpdateDataStatusById(int id, int dataStatusId, int modifierId)
        {
            if (id == 0 || dataStatusId == 0 || modifierId==0) return false;

            FlowRuleInfo flowType = new FlowRuleInfo();
            flowType.Id = id;
            flowType.DataStatusId = dataStatusId;
            flowType.ModifierId = modifierId;

            return dal.FlowRuleUpdateById(flowType);//执行更新命令
        }

        //1-1：逻辑删除FlowRule信息（DataStatus=2），对1-0重载
        public bool FlowRuleLogicDeleteById(int id, int modifierId)
        {
            if (id == 0 || modifierId == 0) return false;
            return FlowRuleUpdateDataStatusById(id, 2, modifierId);//执行逻辑删除命令
        }

        #endregion 记录操作结束

        #region 验证FlowRule名称唯一性

        //检查Name是否已存在
        public bool FlowRuleIsExisted(string name,int flowId)
        {
            return dal.FlowRuleIsExistedByName(name, flowId);
        }
        //验证FlowRule是否已存在(用于更新)
        public bool FlowRuleIsExistedByNewNameAndOldName(string newName, string oldName)
        {
            return dal.FlowRuleIsExistedByNewNameAndOldName(newName, oldName);
        }
        #endregion 验证FlowRule名称唯一性 结束

        #region 获取FlowRule列表

        //获取列表
        public IList<FlowRuleInfo> FlowRuleGetList(string name, int flowId,int flowOperationId,
                                       bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.FlowRuleGetList(name, flowId, flowOperationId, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表分页数据；用于分页显示查询结果
        public IList<FlowRuleInfo> FlowRuleGetListPaged(string name, int flowId, int flowOperationId,
                                       int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.FlowRuleGetList(name, flowId, flowOperationId, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表不分页数据；用于分页显示查询结果
        public IList<FlowRuleInfo> FlowRuleGetListUnPaged(string name, int flowId,int flowOperationId, object orderFieldName, object orderType)
        {
            return dal.FlowRuleGetList(name, flowId,flowOperationId, false, 0, 0, orderFieldName, orderType);
        }


        #endregion 获取FlowRuleInfo列表

        #region 获取FlowRuleInfo列表值汇总

        //获取列表
        public RecordCountInfo FlowRuleGetRecordCount(string name, int flowId,int flowOperationId)
        {
            return dal.FlowRuleGetRecordCount(name, flowId, flowOperationId);
        }
        #endregion 获取FlowRuleInfo列表值汇总

    }
}
