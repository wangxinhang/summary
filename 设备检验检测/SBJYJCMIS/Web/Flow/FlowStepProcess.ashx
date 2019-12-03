<%@WebHandler Language="C#" Class="FlowStepProcess"%>

using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Xml.Linq;
using System.IO;
using System.Web;
using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SBJYJCMIS.BLL;
using SBJYJCMIS.Model;
using SBJYJCMIS.DBUtility;

public class FlowStepProcess : IHttpHandler
{
   //处理请求
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        if (context.Request["MethodName"] != null)
        {
            string methodName = context.Request["MethodName"].ToString();
            System.Reflection.MethodInfo method = this.GetType().GetMethod(methodName);
            if (method != null)
            {
                method.Invoke(this, new object[] { context});
            }
        }        
    }
    
    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

    //获取流程节点角色设置
    public void FlowStepGetList(HttpContext context)
    {
        int xuserId = (context.Request["xuserId"] == null) ? 0 : Convert.ToInt32(context.Request["xuserId"]);
        int flowId = context.Request["flowId"] == null ? 0 : Convert.ToInt32(context.Request["flowId"]);
        int submitFlowNodeId = (context.Request["submitFlowNode"] == null) ? 0 : Convert.ToInt32(context.Request["submitFlowNode"]);
        int approvalFlowNodeId = (context.Request["approvalFlowNodeId"] == null) ? 0 : Convert.ToInt32(context.Request["approvalFlowNodeId"]);
        int flowRuleId = (context.Request["flowRuleId"] == null) ? 0 : Convert.ToInt32(context.Request["flowRuleId"]);
       
        //获取参数
        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 20 : Convert.ToInt32(context.Request["pageSize"]);
        string orderFieldName = "Id";
        string orderType = "ASC";

        //获取数据列表
        FlowStep recordBll = new FlowStep();
        IList<FlowStepListInfo> recordList = new List<FlowStepListInfo>();
        recordList = recordBll.FlowStepGetListPaged(flowId, submitFlowNodeId,approvalFlowNodeId,flowRuleId,pageNumber, pageSize, orderFieldName, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        //获取数据总记录数和值汇总
        RecordCountInfo recordSum = new RecordCountInfo();
        recordSum = recordBll.FlowStepGetRecordCount(flowId, submitFlowNodeId, approvalFlowNodeId, flowRuleId);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
    
    //添加发起申请人
    public void FlowStepInsert(HttpContext context)
    {
        //获取数据;
        int flowId = context.Request["FlowId"] == null ? 0 : Convert.ToInt32(context.Request["FlowId"]);
        int submitterId = context.Request["SubmitFlowNodeId"] == null ? 0 : Convert.ToInt32(context.Request["SubmitFlowNodeId"]);
        int approverId = context.Request["ApprovalFlowNodeId"] == null ? 0 : Convert.ToInt32(context.Request["ApprovalFlowNodeId"]);
        int flowRuleId = context.Request["FlowRuleId"] == null ? 0 : Convert.ToInt32(context.Request["FlowRuleId"]);
        int creatorId = Convert.ToInt32(context.Request["CreatorId"]);
        string memo = context.Request["Memo"].ToString();

        //插入数据
        FlowStep operateBll = new FlowStep();
        JObject jsonObj = new JObject();

        FlowStepInfo flowStep = new FlowStepInfo();
        flowStep.FlowId = flowId;
        flowStep.SubmitFlowNodeId = submitterId;
        flowStep.ApprovalFlowNodeId = approverId;
        flowStep.FlowRuleId = flowRuleId;
        flowStep.Memo = memo;
        flowStep.CreatorId = creatorId;
            
             ////插入数据
        bool isInserted = operateBll.FlowStepInsert(flowStep);
        jsonObj.Add(new JProperty("isInserted", isInserted));        

        //序列化后返回
        string jsonString = jsonObj.ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }    

    //逻辑删除流程节点
    public void FlowStepLogicDelete(HttpContext context)
    {
        FlowStep operateBll = new FlowStep();
        
        //获取数据
        int id = Convert.ToInt32(context.Request["Id"]);
        int modifierId = Convert.ToInt32(context.Request["ModifierId"]);

        //执行逻辑删除操作   
        bool isDeleted = operateBll.FlowStepLogicDeleteById(id, modifierId);

        //序列化后返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }
    //逻辑删除流程节点
    public void FlowStepUpdate(HttpContext context)
    {
        //获取数据
        int Id = Convert.ToInt32(context.Request["Id"]);
        //获取数据;
        int flowId = context.Request["FlowId"] == null ? 0 : Convert.ToInt32(context.Request["FlowId"]);
        int submitterId = context.Request["SubmitFlowNodeId"] == null ? 0 : Convert.ToInt32(context.Request["SubmitFlowNodeId"]);
        int approverId = context.Request["ApprovalFlowNodeId"] == null ? 0 : Convert.ToInt32(context.Request["ApprovalFlowNodeId"]);
        int flowRuleId = context.Request["FlowRuleId"] == null ? 0 : Convert.ToInt32(context.Request["FlowRuleId"]);
        string memo = context.Request["Memo"];
        int modifierId = Convert.ToInt32(context.Request["ModifierId"]);

        //插入数据
        FlowStep operateBll = new FlowStep();
        JObject jsonObj = new JObject();

        FlowStepInfo flowStep = new FlowStepInfo();
        flowStep.Id = Id;
        flowStep.FlowId = flowId;
        flowStep.SubmitFlowNodeId = submitterId;
        flowStep.ApprovalFlowNodeId = approverId;
        flowStep.FlowRuleId = flowRuleId;
        flowStep.Memo = memo;
        flowStep.ModifierId = modifierId;
            
        ////编辑数据
        bool isUpdated = operateBll.FlowStepUpdateById(flowStep);
        jsonObj.Add(new JProperty("isUpdated", isUpdated));        

        //序列化后返回
        string jsonString = jsonObj.ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
    //流程触发规则
    public void GetFlowNodeListByFlowId(HttpContext context)
    {
        //获取参数
        string name = "";
        int flowId = (context.Request["flowId"] == null) ? 0 : Convert.ToInt32(context.Request["flowId"]);

        //获取数据并序列化
        FlowNode teBll = new FlowNode();
        IList<FlowNodeInfo> teList = new List<FlowNodeInfo>();
        teList = teBll.FlowNodeGetListUnPaged(name, flowId, "Id", "DESC");
        var jList = teList.Select(t => new
        {
            Id = t.Id,
            Name = t.Name
        });

        string jsonString = JsonConvert.SerializeObject(jList);
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //流程触发规则
    public void GetFlowRuleListByFlowId(HttpContext context)
    {
        //获取参数
        int flowId = (context.Request["flowId"] == null) ? 0 : Convert.ToInt32(context.Request["flowId"]);

        //获取数据并序列化
        FlowRule teBll = new FlowRule();
        IList<FlowRuleInfo> teList = new List<FlowRuleInfo>();
        teList = teBll.FlowRuleGetListUnPaged(null, flowId,0,"Id","DESC");
        var jList = teList.Select(t => new
        {
            Id = t.Id,
            Name = t.Name
        });

        string jsonString = JsonConvert.SerializeObject(jList);
        context.Response.Write(jsonString);
        context.Response.End();
    }
    
}


