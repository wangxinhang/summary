<%@WebHandler Language="C#" Class="FlowProcess"%>

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

public class FlowProcess : IHttpHandler
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

    Flow bllProcess = new Flow(); 
    #endregion 通用

    #region 数据操作(增删改）
    //插入用户信息
    public void FlowInsert(HttpContext context)
    {
        //获取数据;
        FlowInfo flow = new FlowInfo();
        flow.Name = Convert.ToString(context.Request["Name"]);
        flow.Memo = Convert.ToString(context.Request["Memo"]);
        flow.CreatorId = Convert.ToInt32(context.Request["CreatorId"]);
 
        //插入数据
        bool isInserted = bllProcess.FlowInsert(flow);

        //序列化后返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }
    
    //逻辑删除用户
    public void FlowDelete(HttpContext context)
    {
        //获取数据
        int id = Convert.ToInt32(context.Request["id"]);
        int modifierId = Convert.ToInt32(context.Request["modifierId"]);

        
        //执行逻辑删除操作   
        JObject jsonObj = new JObject();
        bool isDeleted = bllProcess.FlowLogicDeleteById(id, modifierId);
        jsonObj.Add(new JProperty("isDeleted", isDeleted));

        //序列化后返回
        string jsonString = jsonObj.ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }   
     
    //更新检查结果类别
    public void FlowUpdate(HttpContext context)
    {
        //获取数据;
         FlowInfo flow = new FlowInfo();
        flow.Id = Convert.ToInt32(context.Request["id"]);
        flow.Name = Convert.ToString(context.Request["name"]);
        flow.Memo = Convert.ToString(context.Request["memo"]);
        flow.ModifierId = Convert.ToInt32(context.Request["modifierId"]);
        
        //插入数据
        bool isUpdated = bllProcess.FlowUpdateById(flow);
        //序列化后返回
        context.Response.Write(isUpdated.ToString());
        context.Response.End();
    }
    #endregion 数据操作(增删改）

    #region 验证是否存在
    //验证是否存在
    public void FlowIsExisted(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);

        //获取结果
        bool isExisted = bllProcess.FlowIsExisted(name);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }    
    #endregion 用户和密码验证
    
    #region 查询结果集列表
    //根据查询结果集RoleList
    public void FlowGetList(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);   

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Id" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        IList<FlowInfo> recordList = bllProcess.FlowGetList(name, true, pageNumber, pageSize, orderField, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = bllProcess.FlowGetListSum(name);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        
        context.Response.Write(jsonString);
        context.Response.End();
    }             
    #endregion 查询结果集列表

  #region   Flow(用于更新)
    public void FlowIsExistedByNewNameAndOldName(HttpContext context)
    {
        //获取参数
        string newName = Convert.ToString(context.Request["name"]);
        string oldName = Convert.ToString(context.Request["OldValue"]);

        //获取结果
        bool isExisted = bllProcess.FlowIsExistedByNewNameAndOldName(newName, oldName);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
  #endregion 验证InspectResultType是否已存在(用于更新)
}
