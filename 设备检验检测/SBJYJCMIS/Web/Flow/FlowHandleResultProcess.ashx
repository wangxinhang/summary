<%@ WebHandler Language="C#" Class="FlowHandleResultProcess" %>

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

public class FlowHandleResultProcess : IHttpHandler
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

    #region FlowHandleResultProcess(增删改）
    //插入用户信息
    public void FlowHandleResultInsert(HttpContext context)
    {
        //获取数据;
        FlowHandleResult FlowHandleResultBll = new FlowHandleResult();
        FlowHandleResultInfo flowHandleResult = new FlowHandleResultInfo(); //JsonConvert.DeserializeObject<GroupInfo>(jsonStr);        
        flowHandleResult.Name = Convert.ToString(context.Request["Name"]);
        flowHandleResult.FlowId = Convert.ToInt32(context.Request["FlowId"]);
        flowHandleResult.Memo = context.Request["Memo"];
        flowHandleResult.CreatorId = Convert.ToInt32(context.Request["CreatorId"]);

        ////插入数据
        bool isInserted = FlowHandleResultBll.FlowHandleResultInsert(flowHandleResult);

        //序列化后返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }

    //逻辑删除用户
    public void FlowHandleResultDelete(HttpContext context)
    {
        //获取数据
        FlowHandleResult FlowHandleResultBll = new FlowHandleResult();
        //获取数据
        int id = Convert.ToInt32(context.Request["Id"]);
        int modifierId = Convert.ToInt32(context.Request["ModifierId"]);

        //执行删除操作   
        JObject jsonObj = new JObject();
        bool isDeleted = FlowHandleResultBll.FlowHandleResultLogicDeleteById(id, modifierId);
        jsonObj.Add(new JProperty("isDeleted", isDeleted));

        //序列化后返回
        string jsonString = jsonObj.ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //更新用户信息
    public void FlowHandleResultUpdate(HttpContext context)
    {
        //获取数据;
        FlowHandleResult FlowHandleResultBll = new FlowHandleResult();
        FlowHandleResultInfo flowHandleResult = new FlowHandleResultInfo();
        flowHandleResult.Id = Convert.ToInt32(context.Request["Id"]);
        flowHandleResult.Name = Convert.ToString(context.Request["Name"]);
        flowHandleResult.FlowId = Convert.ToInt32(context.Request["FlowId"]);
        flowHandleResult.Memo = Convert.ToString(context.Request["Memo"]);
        flowHandleResult.ModifierId = Convert.ToInt32(context.Request["ModifierId"]);

        //插入数据
        bool isUpdated = FlowHandleResultBll.FlowHandleResultUpdateById(flowHandleResult);

        //序列化后返回
        context.Response.Write(isUpdated.ToString());
        context.Response.End();
    }
    #endregion 数据操作(增删改）

    #region 验证是否存在
    //验证是否存在
    public void FlowHandleResultIsExisted(HttpContext context)
    {
       FlowHandleResult FlowHandleResultBll = new FlowHandleResult();
        //获取参数
        string name = Convert.ToString(context.Request["name"]);
        int flowId = 1;

        //获取结果
        bool isExisted = FlowHandleResultBll.FlowHandleResultIsExisted(name, flowId);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
    #endregion 验证

    #region   验证FlowHandleResult是否已存在(用于更新)
    public void FlowHandleResultIsExistedByNewNameAndOldName(HttpContext context)
    {
        FlowHandleResult FlowHandleResultBll = new FlowHandleResult();

        //获取参数
        string newName = Convert.ToString(context.Request["name"]);
        string oldName = Convert.ToString(context.Request["OldValue"]);

        //获取结果
        bool isExisted = FlowHandleResultBll.FlowHandleResultIsExistedByNewNameAndOldName(newName, oldName);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
    #endregion 验证InspectResultType是否已存在(用于更新)
}
