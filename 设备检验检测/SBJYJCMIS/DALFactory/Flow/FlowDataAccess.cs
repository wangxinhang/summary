using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;
using System.Reflection;
using SBJYJCMIS.IDAL;

namespace SBJYJCMIS.DALFactory
{
    /// <summary>
    /// This class is implemented following the Abstract Factory pattern to create the DAL implementation
    /// specified from the configuration file
    /// </summary>
    public sealed class FlowDataAccess
    {
        private static readonly string path = ConfigurationManager.AppSettings["WebDAL"];

        // Look up the DAL implementation we should be using
        private FlowDataAccess() { }

        //流程类别（流程名称）
        public static IFlow CreateFlow()
        {
            string className = path + ".Flow";
            return (IFlow)Assembly.Load(path).CreateInstance(className);
        }

        //流程状态（流程状态）
        public static IFlowStatus CreateFlowStatus()
        {
            string className = path + ".FlowStatus";
            return (IFlowStatus)Assembly.Load(path).CreateInstance(className);
        }

        //流程类别（流程名称）
        public static IFlowNode CreateFlowNode()
        {
            string className = path + ".FlowNode";
            return (IFlowNode)Assembly.Load(path).CreateInstance(className);
        }

        //流程节点动作关联表
        public static IFlowNodeOperationRelation CreateFlowNodeOperationRelation()
        {
            string className = path + ".FlowNodeOperationRelation";
            return (IFlowNodeOperationRelation)Assembly.Load(path).CreateInstance(className);
        }

        //流程步骤
        public static IFlowStep CreateFlowStep()
        {
            string className = path + ".FlowStep";
            return (IFlowStep)Assembly.Load(path).CreateInstance(className);
        }

        //流程动作结果关联
        public static IFlowOperationHandleResultRelation CreateFlowOperationHandleResultRelation()
        {
            string className = path + ".FlowOperationHandleResultRelation";
            return (IFlowOperationHandleResultRelation)Assembly.Load(path).CreateInstance(className);
        }

        //触发规则
        public static IFlowRule CreateFlowRule()
        {
            string className = path + ".FlowRule";
            return (IFlowRule)Assembly.Load(path).CreateInstance(className);
        }
        //流程动作
        public static IFlowOperation CreateFlowOperation()
        {
            string className = path + ".FlowOperation";
            return (IFlowOperation)Assembly.Load(path).CreateInstance(className);
        }
        //流程动作结果表
        public static IFlowHandleResult CreateFlowHandleResult()
        {
            string className = path + ".FlowHandleResult";
            return (IFlowHandleResult)Assembly.Load(path).CreateInstance(className);
        }
        //流程审批关系
        public static IFlowApprovalRelation CreateFlowApprovalRelation()
        {
            string className = path + ".FlowApprovalRelation";
            return (IFlowApprovalRelation)Assembly.Load(path).CreateInstance(className);
        }
        //流程审批关系
        public static IFlowNodeRole CreateFlowNodeRole()
        {
            string className = path + ".FlowNodeRole";
            return (IFlowNodeRole)Assembly.Load(path).CreateInstance(className);
        }

        //流程动作流程状态
        public static IFlowOperationStatusRelation CreateFlowOperationStatusRelation()
        {
            string className = path + ".FlowOperationStatusRelation";
            return (IFlowOperationStatusRelation)Assembly.Load(path).CreateInstance(className);
        }
        //流程动作流程规则
        public static IFlowOperationFlowRuleRelation CreateFlowOperationFlowRuleRelation()
        {
            string className = path + ".FlowOperationFlowRuleRelation";
            return (IFlowOperationFlowRuleRelation)Assembly.Load(path).CreateInstance(className);
        }
        //流程审批关系
        public static IFlowOperationHandleTypeRelation CreateFlowOperationHandleTypeRelation()
        {
            string className = path + ".FlowOperationHandleTypeRelation";
            return (IFlowOperationHandleTypeRelation)Assembly.Load(path).CreateInstance(className);
        }
        //流程节点部门设置
        public static IFlowNodeDepartment CreateFlowNodeDepartment()
        {
            string className = path + ".FlowNodeDepartment";
            return (IFlowNodeDepartment)Assembly.Load(path).CreateInstance(className);
        }
        //流程默认设置
        public static IFlowNodeDefaultSetting CreateFlowNodeDefaultSetting()
        {
            string className = path + ".FlowNodeDefaultSetting";
            return (IFlowNodeDefaultSetting)Assembly.Load(path).CreateInstance(className);
        }
        //流程完成情况
        public static IFinishSituation CreateFinishSituation()
        {
            string className = path + ".FinishSituation";
            return (IFinishSituation)Assembly.Load(path).CreateInstance(className);
        }
        //推送默认节点
        public static IDefaultFlowNode CreateDefaultFlowNode()
        {
            string className = path + ".DefaultFlowNode";
            return (IDefaultFlowNode)Assembly.Load(path).CreateInstance(className);
        }
        //推送默认节点
        public static IFlowHandleType CreateFlowHandleType()
        {
            string className = path + ".FlowHandleType";
            return (IFlowHandleType)Assembly.Load(path).CreateInstance(className);
        }
    }
}
