<%@WebHandler Language="C#" Class="FlowNodeProcess"%>

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

public class FlowNodeProcess : IHttpHandler
{
    #region 通用
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

    FlowNode bllProcess = new FlowNode(); 
    #endregion 通用

    #region 数据操作(增删改）
    //插入用户信息
    public void FlowNodeInsert(HttpContext context)
    {
        //获取数据;
        FlowNodeInfo FlowNode = new FlowNodeInfo();
        FlowNode.Name = Convert.ToString(context.Request["Name"]);
        FlowNode.FlowId = Convert.ToInt32(context.Request["FlowId"]);
        FlowNode.Memo = Convert.ToString(context.Request["Memo"]);
        FlowNode.CreatorId = Convert.ToInt32(context.Request["CreatorId"]);
 
        //插入数据
        bool isInserted = bllProcess.FlowNodeInsert(FlowNode);

        //序列化后返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }
    
    //逻辑删除用户
    public void FlowNodeDelete(HttpContext context)
    {
        //获取数据
        int id = Convert.ToInt32(context.Request["id"]);
        int modifierId = Convert.ToInt32(context.Request["modifierId"]);

        
        //执行逻辑删除操作   
        JObject jsonObj = new JObject();
        bool isDeleted = bllProcess.FlowNodeLogicDeleteById(id, modifierId);
        jsonObj.Add(new JProperty("isDeleted", isDeleted));

        //序列化后返回
        string jsonString = jsonObj.ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }   
     
    //更新流程节点名称
    public void FlowNodeUpdate(HttpContext context)
    {
        //获取数据;
        FlowNodeInfo flowNode = new FlowNodeInfo();
        flowNode.Id = Convert.ToInt32(context.Request["id"]);
        flowNode.FlowId = Convert.ToInt32(context.Request["FlowId"]);
        flowNode.Name = Convert.ToString(context.Request["name"]);
        flowNode.Memo = Convert.ToString(context.Request["memo"]);
        flowNode.ModifierId = Convert.ToInt32(context.Request["modifierId"]);
        
        //插入数据
        bool isUpdated = bllProcess.FlowNodeUpdateById(flowNode);
        //序列化后返回
        context.Response.Write(isUpdated.ToString());
        context.Response.End();
    }
    #endregion 数据操作(增删改）

    #region 验证是否存在
    //验证是否存在
    public void FlowNodeIsExisted(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);
        int flowId = 1;

        //获取结果
        bool isExisted = bllProcess.FlowNodeIsExisted(name, flowId);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }    
    #endregion 用户和密码验证
    
    #region 查询结果集列表
    //根据查询结果集RoleList
    public void FlowNodeGetList(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);
        int flowId = Convert.ToInt32(context.Request["flowId"]);

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Id" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        IList<FlowNodeInfo> recordList = bllProcess.FlowNodeGetList(name,flowId, true, pageNumber, pageSize, orderField, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = bllProcess.FlowNodeGetListSum(name, flowId);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        
        context.Response.Write(jsonString);
        context.Response.End();
    }             
    #endregion 查询结果集列表
    #region   根据XuserId获取用户对应的节点信息

    //根据XuserId获取用户对应的节点Id，节点部门Id,节点部门名称、审批节点Id,审批节点部门Id,审批节点部门名称、审批人员Id,审批人员名称
    //一次性读取全部数据 可以解决操作节点列表、各个操作节点对应的部门列表和人员列表问题 以及下一个审批节点Id问题

    public void GetFlowNodeInfoByXuserId(HttpContext context)
    {
        //获取参数
        int xuserId = context.Request["xuserId"] == null ? 0 : Convert.ToInt32(context.Request["xuserId"]);

        //获取数据列表
        FlowNode recordBll = new FlowNode();
        IList<FlowNodeListInfo> jList = new List<FlowNodeListInfo>();
        jList = recordBll.FlowNodeGetDefaulInfoByXuserId(xuserId);
        string jsonRecordSet = JsonConvert.SerializeObject(jList);
        context.Response.Write(jsonRecordSet);
        context.Response.End();
    }
    #endregion  根据XuserId获取用户对应的节点信息
   #region   验证FlowNode是否已存在(用于更新)
    public void FlowNodeIsExistedByNewNameAndOldName(HttpContext context)
    {
        //获取参数
        string newName = Convert.ToString(context.Request["name"]);
        string oldName = Convert.ToString(context.Request["OldValue"]);

        //获取结果
        bool isExisted = bllProcess.FlowNodeIsExistedByNewNameAndOldName(newName, oldName);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
  #endregion 验证InspectResultType是否已存在(用于更新)
}
