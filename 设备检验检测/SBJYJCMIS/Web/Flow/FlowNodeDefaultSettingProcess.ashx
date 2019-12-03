<%@ WebHandler Language="C#" Class="FlowNodeDefaultSettingProcess" %>

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

public class FlowNodeDefaultSettingProcess : IHttpHandler
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
                method.Invoke(this, new object[] { context });
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
    public void FlowNodeDefaultSettingGetList(HttpContext context)
    {
        int flowId = context.Request["flowId"] == null ? 0 : Convert.ToInt32(context.Request["flowId"]);
        int submitFlowNodeId = (context.Request["submitFlowNodeId"] == null) ? 0 : Convert.ToInt32(context.Request["submitFlowNodeId"]);
        int approvalFlowNodeId = (context.Request["approvalFlowNodeId"] == null) ? 0 : Convert.ToInt32(context.Request["approvalFlowNodeId"]);
        int departmentId = (context.Request["departmentId"] == null) ? 0 : Convert.ToInt32(context.Request["departmentId"]);
        string role = Convert.ToString(context.Request["Role"]);
        string xuser = Convert.ToString(context.Request["Xuser"]);

        //获取参数
        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 20 : Convert.ToInt32(context.Request["pageSize"]);
        string orderFieldName = "Id";
        string orderType = "ASC";

        //获取数据列表
        FlowNodeDefaultSetting recordBll = new FlowNodeDefaultSetting();
        IList<FlowNodeDefaultSettingListInfo> recordList = new List<FlowNodeDefaultSettingListInfo>();
        recordList = recordBll.FlowNodeDefaultSettingGetListPaged(flowId, submitFlowNodeId, approvalFlowNodeId, departmentId, role, xuser, pageNumber, pageSize, orderFieldName, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        //获取数据总记录数和值汇总
        RecordCountInfo recordSum = new RecordCountInfo();
        recordSum = recordBll.FlowNodeDefaultSettingGetRecordCount(flowId, submitFlowNodeId, approvalFlowNodeId, departmentId, role, xuser);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //添加发起申请人
    public void FlowNodeDefaultSettingInsert(HttpContext context)
    {
        //获取数据;
        int flowId = context.Request["FlowId"] == null ? 0 : Convert.ToInt32(context.Request["FlowId"]);
        int submitFlowNodeId = (context.Request["SubmitFlowNodeId"] == null) ? 0 : Convert.ToInt32(context.Request["SubmitFlowNodeId"]);
        int approvalFlowNodeId = (context.Request["ApprovalFlowNodeId"] == null) ? 0 : Convert.ToInt32(context.Request["ApprovalFlowNodeId"]);
        
        int roleId = context.Request["RoleId"] == null ? 0 : Convert.ToInt32(context.Request["RoleId"]);
        int xuserId = context.Request["XuserId"] == null ? 0 : Convert.ToInt32(context.Request["XuserId"]);
        int creatorId = Convert.ToInt32(context.Request["CreatorId"]);
        string memo = context.Request["Memo"].ToString();

        //插入数据
        FlowNodeDefaultSetting operateBll = new FlowNodeDefaultSetting();
        JObject jsonObj = new JObject();

        FlowNodeDefaultSettingInfo flowNodeDefaultSetting = new FlowNodeDefaultSettingInfo();
        flowNodeDefaultSetting.SubmitFlowNodeId = submitFlowNodeId;
        flowNodeDefaultSetting.ApprovalFlowNodeId = approvalFlowNodeId;
        flowNodeDefaultSetting.RoleId = roleId;
        flowNodeDefaultSetting.XuserId = xuserId;
        flowNodeDefaultSetting.FlowId = flowId;
        flowNodeDefaultSetting.Memo = memo;
        flowNodeDefaultSetting.CreatorId = creatorId;

        ////插入数据
       // bool isInserted = operateBll.FlowNodeDefaultSettingInsert(flowNodeDefaultSetting);

        //序列化后返回
        //context.Response.Write(isInserted.ToString());
        //context.Response.End();

        ////插入数据
        bool isInserted = operateBll.FlowNodeDefaultSettingInsert(flowNodeDefaultSetting);
        jsonObj.Add(new JProperty("isInserted", isInserted));        

        //序列化后返回
        string jsonString = jsonObj.ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //逻辑删除流程节点
    public void FlowNodeDefaultSettingLogicDelete(HttpContext context)
    {
        FlowNodeDefaultSetting operateBll = new FlowNodeDefaultSetting();

        //获取数据
        int id = Convert.ToInt32(context.Request["Id"]);
        int modifierId = Convert.ToInt32(context.Request["ModifierId"]);

        //执行逻辑删除操作   
        bool isDeleted = operateBll.FlowNodeDefaultSettingLogicDeleteById(id, modifierId);

        //序列化后返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }
    //逻辑删除流程节点
    public void FlowNodeDefaultSettingUpdate(HttpContext context)
    {
        //获取数据
        int Id = Convert.ToInt32(context.Request["Id"]);
        //获取数据;
        int flowId = context.Request["FlowId"] == null ? 0 : Convert.ToInt32(context.Request["FlowId"]);
        int submitFlowNodeId = (context.Request["SubmitFlowNodeId"] == null) ? 0 : Convert.ToInt32(context.Request["SubmitFlowNodeId"]);
        int approvalFlowNodeId = (context.Request["ApprovalFlowNodeId"] == null) ? 0 : Convert.ToInt32(context.Request["ApprovalFlowNodeId"]);
        int roleId = context.Request["RoleId"] == null ? 0 : Convert.ToInt32(context.Request["RoleId"]);
        int xuserId = context.Request["XuserId"] == null ? 0 : Convert.ToInt32(context.Request["XuserId"]);
        string memo = context.Request["Memo"];
        int modifierId = Convert.ToInt32(context.Request["ModifierId"]);

        //插入数据
        FlowNodeDefaultSetting operateBll = new FlowNodeDefaultSetting();
        JObject jsonObj = new JObject();

        FlowNodeDefaultSettingInfo flowNodeDefaultSetting = new FlowNodeDefaultSettingInfo();
        flowNodeDefaultSetting.Id = Id;
        flowNodeDefaultSetting.SubmitFlowNodeId = submitFlowNodeId;
        flowNodeDefaultSetting.ApprovalFlowNodeId = approvalFlowNodeId;
        flowNodeDefaultSetting.RoleId = roleId;
        flowNodeDefaultSetting.XuserId = xuserId;
        flowNodeDefaultSetting.FlowId = flowId;
        flowNodeDefaultSetting.DataStatusId = 1;
        flowNodeDefaultSetting.Memo = memo;
        flowNodeDefaultSetting.ModifierId = modifierId;

        ////编辑数据
        bool isUpdated = operateBll.FlowNodeDefaultSettingUpdateById(flowNodeDefaultSetting);
        jsonObj.Add(new JProperty("isUpdated", isUpdated));        

        //序列化后返回
        string jsonString = jsonObj.ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
    //获取提交节点列表
    public void GetSubmitFlowNodeIdList(HttpContext context)
    {
        //获取参数
        int flowId = (context.Request["flowId"] == null) ? 0 : Convert.ToInt32(context.Request["flowId"]);
        
        //获取数据并序列化
        FlowStep teBll = new FlowStep();
        IList<FlowStepListInfo> teList = new List<FlowStepListInfo>();
        teList = teBll.FlowStepGetSubmitFlowNodeIdList(flowId);
        var jList = teList.Select(t => new
        {
            Id = t.SubmitFlowNodeId,
            Name = t.SubmitFlowNode
        });

        string jsonString = JsonConvert.SerializeObject(jList);
        context.Response.Write(jsonString);
        context.Response.End();
    }
    //获取审批机电列表
    public void GetApprovalFlowNodeIdList(HttpContext context)
    {
        //获取参数
        int flowId = (context.Request["flowId"] == null) ? 0 : Convert.ToInt32(context.Request["flowId"]);
        int submitFlowNodeId = (context.Request["submitFlowNodeId"] == null) ? 0 : Convert.ToInt32(context.Request["submitFlowNodeId"]);


        //获取数据并序列化
        FlowStep teBll = new FlowStep();
        IList<FlowStepListInfo> teList = new List<FlowStepListInfo>();
        teList = teBll.FlowStepGetApprovalFlowNodeIdList(flowId, submitFlowNodeId);
        var jList = teList.Select(t => new
        {
            Id = t.ApprovalFlowNodeId,
            Name = t.ApprovalFlowNode
        });

        string jsonString = JsonConvert.SerializeObject(jList);
        context.Response.Write(jsonString);
        context.Response.End();
    }
    //根据提交
    public void GetRoleList(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);
        int flowNodeId = (context.Request["flowNodeId"] == null) ? 0 : Convert.ToInt32(context.Request["flowNodeId"]);
        //获取数据并序列化
        FlowNodeRole teBll = new FlowNodeRole();
        IList<FlowNodeRoleInfo> teList = new List<FlowNodeRoleInfo>();
        teList = teBll.RoleListGetByFlowNodeId(flowNodeId);
        var jList = teList.Select(t => new
        {
            Id = t.RoleId,
            Name = t.RoleName
        });

        string jsonString = JsonConvert.SerializeObject(jList);
        context.Response.Write(jsonString);
        context.Response.End();
    }
    //流程节点
    public void GetXuserList(HttpContext context)
    {
        //获取参数
        int roleId = (context.Request["roleId"] == null) ? 0 : Convert.ToInt32(context.Request["roleId"]);
        //获取数据并序列化
        Xuser teBll = new Xuser();
        IList<XuserListInfo> teList = new List<XuserListInfo>();
        teList = teBll.XuserGetListByRoleId(null, roleId);
        var jList = teList.Select(t => new
        {
            Id = t.Id,
            Name = t.Employee
        });

        string jsonString = JsonConvert.SerializeObject(jList);
        context.Response.Write(jsonString);
        context.Response.End();
    }

}


