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
    public class FlowNodeDepartment
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IFlowNodeDepartment dal = FlowDataAccess.CreateFlowNodeDepartment();

        #region 记录操作
        //插入FlowNodeDepartment信息
        public bool FlowNodeDepartmentInsert(FlowNodeDepartmentInfo flowNodeDepartment)
        {
            if (flowNodeDepartment == null) return false;
            return dal.FlowNodeDepartmentInsert(flowNodeDepartment);
        }
        //插入FlowNodeDepartment信息
        public bool FlowNodeDepartmentInsertTran(FlowNodeDepartmentInfo flowNodeDepartment)
        {
            if (flowNodeDepartment == null) return false;
            return dal.FlowNodeDepartmentInsertTran(flowNodeDepartment);
        }
        public bool FlowNodeDepartmentUpdateDataStatusById(int flowNodeId, int roleId, int flowId, int modifierId)
        {
            if (flowNodeId == 0 || roleId == 0 || flowId == 0) return false;
            return dal.FlowNodeDepartmentUpdateDataStatusById(flowNodeId, roleId, flowId, modifierId);//执行逻辑删除命令
        }

        #endregion 记录操作结束

        #region 验证

        //验证节点角色是否存在
        public bool FlowNodeDepartmentIsExisted(int flowNodeId, int departmentId, int flowId)
        {
            return dal.FlowNodeDepartmentIsExisted(flowNodeId, departmentId, flowId);
        }

        #endregion 验证

        #region 获取FlowNodeDepartment列表

        //获取列表
        public IList<FlowNodeDepartmentInfo> FlowNodeDepartmentGetList(string name, int flowNodeId, int flowId, int assignType,
                                       bool isPaged, int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.FlowNodeDepartmentGetList(name, flowNodeId, flowId, assignType, 
                   isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表分页数据；用于分页显示查询结果
        public IList<FlowNodeDepartmentInfo> FlowNodeDepartmentGetListPaged(string name, int flowNodeId, int flowId, int assignType,
                                       int pageNumber, int pageSize, object orderFieldName, object orderType)
        {
            return dal.FlowNodeDepartmentGetList(name, flowNodeId, flowId, assignType, 
                   true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取列表不分页数据；用于分页显示查询结果
        public IList<FlowNodeDepartmentInfo> FlowNodeDepartmentGetListUnPaged(string name, int flowNodeId, int flowId, int assignType,
                                       object orderFieldName, object orderType)
        {
            return dal.FlowNodeDepartmentGetList(name, flowNodeId, flowId, assignType, false, 0, 0, orderFieldName, orderType);
        }


        #endregion 获取FlowNodeDepartment列表

        #region 获取FlowNodeDepartment列表值汇总

        //获取列表
        public RecordCountInfo FlowNodeDepartmentGetSum(string name, int flowNodeId, int flowId, int assignType)
        {
            return dal.FlowNodeDepartmentGetSum(name, flowNodeId, flowId, assignType);
        }
        #endregion 获取FlowNodeDepartment列表值汇总

    }
}
