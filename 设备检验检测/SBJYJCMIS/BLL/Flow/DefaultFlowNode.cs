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
    public class DefaultFlowNode
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IDefaultFlowNode dal = FlowDataAccess.CreateDefaultFlowNode();

        #region 记录操作
        //插入DefaultFlowNode信息
        public bool DefaultFlowNodeInsert(DefaultFlowNodeInfo flowStep)
        {
            if (flowStep == null) return false;
            return dal.DefaultFlowNodeInsert(flowStep);
        }

        //更新DefaultFlowNode信息
        public bool DefaultFlowNodeUpdateById(DefaultFlowNodeInfo flowStep)
        {
            if (flowStep == null) return false;
            return dal.DefaultFlowNodeUpdateById(flowStep);
        }

        //1-0：更新DefaultFlowNode信息的DataStatus，有重载
        public bool DefaultFlowNodeUpdateDataStatusById(int id, int dataStatusId, int modifierId)
        {
            if (id == 0 || dataStatusId == 0 || modifierId == 0) return false;
            return dal.DefaultFlowNodeUpdateDataStatusById(id, dataStatusId, modifierId);
        }
        #endregion 记录操作结束
        
        #region 获取DefaultFlowNode列表

        //获取列表
        public IList<DefaultFlowNodeInfo> DefaultFlowNodeGetList(int departmentId, string flowNode, string role, string xuser, int flowId, bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.DefaultFlowNodeGetList(departmentId, flowNode, role, xuser, flowId, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表分页数据；用于分页显示查询结果
        public IList<DefaultFlowNodeInfo> DefaultFlowNodeGetListPaged(int departmentId, string flowNode, string role, string xuser, int flowId, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.DefaultFlowNodeGetList(departmentId, flowNode, role, xuser, flowId, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表不分页数据；用于分页显示查询结果
        public IList<DefaultFlowNodeInfo> DefaultFlowNodeGetListUnPaged(int departmentId, string flowNode, string role, string xuser, int flowId, object orderFieldName, object orderType)
        {
            return dal.DefaultFlowNodeGetList(departmentId, flowNode, role, xuser, flowId, false, 0, 0, orderFieldName, orderType);
        }


        #endregion 获取DefaultFlowNodeByFlowId列表

        #region 获取FlowNodeOperation列表值汇总

        //获取列表
        public RecordCountInfo DefaultFlowNodeGetRecordCount(int departmentId, string flowNode, string role, string xuser, int flowId)
        {
            return dal.DefaultFlowNodeGetRecordCount(departmentId, flowNode, role, xuser, flowId);
        }
        #endregion 获取FlowNodeRole列表值汇总
    }
}
