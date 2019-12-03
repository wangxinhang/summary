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
    public class FlowNode
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IFlowNode dal = FlowDataAccess.CreateFlowNode();

        #region 记录操作
        //插入FlowNode信息
        public bool FlowNodeInsert(FlowNodeInfo flowNode)
        {
            if (flowNode == null) return false;
            return dal.FlowNodeInsert(flowNode);
        }

        //更新FlowNode信息
        public bool FlowNodeUpdateById(FlowNodeInfo flowNode)
        {
            if (flowNode == null) return false;
            return dal.FlowNodeUpdateById(flowNode);
        }
        
        //1-0：更新FlowNode信息的DataStatus，有重载
        public bool FlowNodeUpdateDataStatusById(int id, int dataStatusId, int modifierId)
        {
            if (id == 0 || dataStatusId == 0 || modifierId==0) return false;

            FlowNodeInfo flowNode = new FlowNodeInfo();
            flowNode.Id = id;
            flowNode.DataStatusId = dataStatusId;
            flowNode.ModifierId = modifierId;

            return dal.FlowNodeUpdateById(flowNode);//执行更新命令
        }

        //1-1：逻辑删除FlowNode信息（DataStatus=2），对1-0重载
        public bool FlowNodeLogicDeleteById(int id, int modifierId)
        {
            if (id == 0 || modifierId == 0) return false;
            return FlowNodeUpdateDataStatusById(id, 2, modifierId);//执行逻辑删除命令
        }

        #endregion 记录操作结束

        #region 流程节点操作

        //根据用户Id获取FlowNodeId
        public IList<FlowNodeInfo> GetFlowNodeIdByXuserId(int xuserId)
        {
            return dal.GetFlowNodeIdByXuserId(xuserId);
        }

        //根据XuserId获取FlowNodeId及对应的FlowOperationList
        public IList<FlowNodeInfo> FlowOperationListByFlowNodeIdAndXuserId(int xuserId)
        {
            return dal.FlowOperationListByFlowNodeIdAndXuserId(xuserId);
        }
        //根据departmentId获取节点列表数据
        public IList<FlowNodeInfo> FlowNodeGetListByDepartmentId(int departmentId)
        {
            return dal.FlowNodeGetListByDepartmentId(departmentId);
        }
        #endregion 

        #region 验证FlowNode名称唯一性

        //检查Name是否已存在
        public bool FlowNodeIsExisted(string name, int FlowId)
        {
            return dal.FlowNodeIsExistedByName(name, FlowId);
        }
        //验证FlowNode是否已存在(用于更新)
        public bool FlowNodeIsExistedByNewNameAndOldName(string newName, string oldName)
        {
            return dal.FlowNodeIsExistedByNewNameAndOldName(newName, oldName);
        }
        #endregion 验证FlowNode名称唯一性 结束

        #region 根据XuserId获取用户对应的节点信息
        //根据XuserId获取用户对应的节点Id，节点部门Id,节点部门名称、审批节点Id,审批节点部门Id,审批节点部门名称、审批人员Id,审批人员名称
        //一次性读取全部数据 可以解决操作节点列表、各个操作节点对应的部门列表和人员列表问题 以及下一个审批节点Id问题
        public IList<FlowNodeListInfo> FlowNodeGetDefaulInfoByXuserId(int xuserId)
        {
            return dal.FlowNodeGetDefaulInfoByXuserId(xuserId);
        }

        #endregion 根据XuserId获取用户对应的节点信息

        #region 获取FlowNodeList 有重载

        //获取QueryResult
        public IList<FlowNodeInfo> FlowNodeGetList(string name,int flowId, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.FlowNodeGetList(name, flowId, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取分页数据；用于分页显示查询结果
        public IList<FlowNodeInfo> FlowNodeGetListPaged(string name, int flowId, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.FlowNodeGetList(name, flowId, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取不分页数据；用于RDLC报表
        public IList<FlowNodeInfo> FlowNodeGetListUnPaged(string name, int flowId, string orderFieldName, string orderType)
        {
            return dal.FlowNodeGetList(name, flowId, false, 1, 10, orderFieldName, orderType);
        }

        #endregion 获取FlowNodeList 结束

        #region 获取FlowNodeList记录数

        //获取汇总
        public RecordCountInfo FlowNodeGetListSum(string name, int flowId)
        {
            return dal.FlowNodeGetListSum(name, flowId);
        }

        #endregion 获取FlowNodeList记录数 结束
    }
}
