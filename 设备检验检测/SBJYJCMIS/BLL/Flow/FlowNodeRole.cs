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
    public class FlowNodeRole
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IFlowNodeRole dal = FlowDataAccess.CreateFlowNodeRole();
        #region 记录操作
        //插入FlowNodeRole信息
        public bool FlowNodeRoleInsert(FlowNodeRoleInfo investigationHandleResultType)
        {
            if (investigationHandleResultType == null) return false;
            return dal.FlowNodeRoleInsert(investigationHandleResultType);
        }
        //插入FlowNodeRole信息
        public bool FlowNodeRoleInsertTran(FlowNodeRoleInfo investigationHandleResultType)
        {
            if (investigationHandleResultType == null) return false;
            return dal.FlowNodeRoleInsertTran(investigationHandleResultType);
        }
        public bool FlowNodeRoleUpdateDataStatusById(int flowNodeId, int roleId, int flowId, int modifierId)
        {
            if (flowNodeId == 0 || roleId == 0 || flowId == 0) return false;
            return dal.FlowNodeRoleUpdateDataStatusById(flowNodeId, roleId, flowId, modifierId);//执行逻辑删除命令
        }

        #endregion 记录操作结束

        #region 验证

        //验证节点角色是否存在
        public bool FlowNodeRoleIsExisted(int flowNodeId, int roleId, int flowId)
        {
            return dal.FlowNodeRoleIsExisted(flowNodeId, roleId, flowId);
        }

        #endregion 验证

        #region 根据条件获取列表
        //获取列表
        public IList<FlowNodeRoleInfo> RoleListGetByFlowNodeId(int flowNodeId)
        {
            return dal.RoleListGetByFlowNodeId(flowNodeId);
        }
        #endregion

        #region 获取FlowNodeRole列表

        //获取列表
        public IList<FlowNodeRoleInfo> FlowNodeRoleGetList(string name, int flowNodeId, int flowId, int assignType,
                                       bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.FlowNodeRoleGetList(name, flowNodeId, flowId, assignType, 
                   isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表分页数据；用于分页显示查询结果
        public IList<FlowNodeRoleInfo> FlowNodeRoleGetListPaged(string name, int flowNodeId, int flowId, int assignType,
                                       int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.FlowNodeRoleGetList(name, flowNodeId, flowId, assignType, 
                   true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表不分页数据；用于分页显示查询结果
        public IList<FlowNodeRoleInfo> FlowNodeRoleGetListUnPaged(string name, int flowNodeId, int flowId, int assignType,
                                       object orderFieldName, object orderType)
        {
            return dal.FlowNodeRoleGetList(name, flowNodeId, flowId, assignType, false, 0, 0, orderFieldName, orderType);
        }


        #endregion 获取FlowNodeRole列表

        #region 获取FlowNodeRole列表值汇总

        //获取列表
        public RecordCountInfo FlowNodeRoleGetSum(string name, int flowNodeId, int flowId, int assignType)
        {
            return dal.FlowNodeRoleGetSum(name, flowNodeId, flowId, assignType);
        }
        #endregion 获取FlowNodeRole列表值汇总

    }
}
