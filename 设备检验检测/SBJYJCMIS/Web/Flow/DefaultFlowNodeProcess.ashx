<%@WebHandler Language="C#" Class="DefaultFlowNodeProcess"%>

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

public class DefaultFlowNodeProcess : IHttpHandler
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
    public void DefaultFlowNodeGetList(HttpContext context)
    {
        int departmentId = (context.Request["departmentId"] == null) ? 0 : Convert.ToInt32(context.Request["departmentId"]);
        string flowNode = context.Request["flowNode"] == null ? null : context.Request["flowNode"].ToString();
        string role = context.Request["role"] == null ? null : context.Request["role"].ToString();
        string xuser = context.Request["xuser"] == null ? null : context.Request["xuser"].ToString();
        int flowId = context.Request["flowId"] == null ? 1: Convert.ToInt32(context.Request["flowId"]);

        //获取参数
        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 20 : Convert.ToInt32(context.Request["pageSize"]);
        string orderFieldName = "Id";
        string orderType = "ASC";

        //获取数据列表
        DefaultFlowNode recordBll = new DefaultFlowNode();
        IList<DefaultFlowNodeInfo> recordList = new List<DefaultFlowNodeInfo>();
        recordList = recordBll.DefaultFlowNodeGetListPaged(departmentId, flowNode,role,xuser,flowId,pageNumber, pageSize, orderFieldName, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        //获取数据总记录数和值汇总
        RecordCountInfo recordSum = new RecordCountInfo();
        recordSum = recordBll.DefaultFlowNodeGetRecordCount(departmentId, flowNode,role,xuser,flowId);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //添加发起申请人
    public void DefaultFlowNodeInsert(HttpContext context)
    {
        //获取数据;
        int departmentId = context.Request["DepartmentId"] == null ? 0 : Convert.ToInt32(context.Request["DepartmentId"]);
        int flowNodeId = context.Request["FlowNodeId"] == null ? 0 : Convert.ToInt32(context.Request["FlowNodeId"]);
        int roleId = context.Request["RoleId"] == null ? 0 : Convert.ToInt32(context.Request["RoleId"]);
        int xuserId = context.Request["XuserId"] == null ? 0 : Convert.ToInt32(context.Request["XuserId"]);
        int flowId = context.Request["FlowId"] == null ? 0 : Convert.ToInt32(context.Request["FlowId"]);
        int creatorId = Convert.ToInt32(context.Request["CreatorId"]);
        string memo = context.Request["Memo"].ToString();


        //插入数据
        DefaultFlowNode operateBll = new DefaultFlowNode();
        JObject jsonObj = new JObject();

        DefaultFlowNodeInfo defaultFlowNode = new DefaultFlowNodeInfo();
        defaultFlowNode.DepartmentId = departmentId;
        defaultFlowNode.FlowNodeId = flowNodeId;
        defaultFlowNode.RoleId = roleId;
        defaultFlowNode.XuserId = xuserId;
        defaultFlowNode.FlowId = flowId;
        defaultFlowNode.Memo = memo;
        defaultFlowNode.CreatorId = creatorId;

        ////插入数据
        bool isInserted = operateBll.DefaultFlowNodeInsert(defaultFlowNode);
        jsonObj.Add(new JProperty("isInserted", isInserted));

        //序列化后返回
        string jsonString = jsonObj.ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //逻辑删除流程节点
    public void DefaultFlowNodeLogicDelete(HttpContext context)
    {
        DefaultFlowNode operateBll = new DefaultFlowNode();

        //获取数据
        int id = Convert.ToInt32(context.Request["Id"]);
        int dataStatusId =2;
        int modifierId = Convert.ToInt32(context.Request["ModifierId"]);
        //执行逻辑删除操作   
        bool isDeleted = operateBll.DefaultFlowNodeUpdateDataStatusById(id, dataStatusId, modifierId);

        //序列化后返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }
    //逻辑删除流程节点
    public void DefaultFlowNodeUpdate(HttpContext context)
    {
        //获取数据
        int Id = Convert.ToInt32(context.Request["Id"]);
        //获取数据;
          int departmentId = context.Request["DepartmentId"] == null ? 0 : Convert.ToInt32(context.Request["DepartmentId"]);
         int flowNodeId = context.Request["FlowNodeId"] == null ? 0 : Convert.ToInt32(context.Request["FlowNodeId"]);
        int roleId = context.Request["RoleId"] == null ? 0 : Convert.ToInt32(context.Request["RoleId"]);
        int xuserId = context.Request["XuserId"] == null ? 0 : Convert.ToInt32(context.Request["XuserId"]);
        int flowId = context.Request["FlowId"] == null ? 0 : Convert.ToInt32(context.Request["FlowId"]);
        string memo = context.Request["Memo"];
        int modifierId = Convert.ToInt32(context.Request["ModifierId"]);

        //插入数据
        DefaultFlowNode operateBll = new DefaultFlowNode();
        JObject jsonObj = new JObject();

        DefaultFlowNodeInfo defaultFlowNode = new DefaultFlowNodeInfo();
        defaultFlowNode.Id = Id;
        defaultFlowNode.DepartmentId = departmentId;
        defaultFlowNode.FlowNodeId = flowNodeId;
        defaultFlowNode.RoleId = roleId;
        defaultFlowNode.XuserId = xuserId;
        defaultFlowNode.FlowId = flowId;
        defaultFlowNode.Memo = memo;
        defaultFlowNode.ModifierId = modifierId;

        ////编辑数据
        bool isUpdated = operateBll.DefaultFlowNodeUpdateById(defaultFlowNode);
        jsonObj.Add(new JProperty("isUpdated", isUpdated));

        //序列化后返回
        string jsonString = jsonObj.ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

}


