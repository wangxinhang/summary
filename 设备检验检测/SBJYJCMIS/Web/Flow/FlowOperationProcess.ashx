<%@WebHandler Language="C#" Class="FlowOperationProcess"%>

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

public class FlowOperationProcess : IHttpHandler
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

    #region FlowOperation数据操作(增删改）
    //插入用户信息
    public void FlowOperationInsert(HttpContext context)
    {
        //获取数据;
        FlowOperation FlowOperationBll = new FlowOperation();
        FlowOperationInfo flowOperation = new FlowOperationInfo(); //JsonConvert.DeserializeObject<GroupInfo>(jsonStr);        
        flowOperation.Name = Convert.ToString(context.Request["Name"]);
        flowOperation.FlowId =Convert.ToInt32(context.Request["FlowId"]);
        flowOperation.Memo = context.Request["Memo"];
        flowOperation.CreatorId = Convert.ToInt32(context.Request["CreatorId"]);

        ////插入数据
        bool isInserted = FlowOperationBll.FlowOperationInsert(flowOperation);

        //序列化后返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }

    //逻辑删除用户
    public void FlowOperationDelete(HttpContext context)
    {
        //获取数据
        FlowOperation FlowOperationBll = new FlowOperation();
        //获取数据
        int id = Convert.ToInt32(context.Request["Id"]);
        int modifierId = Convert.ToInt32(context.Request["ModifierId"]);
      
        //执行逻辑删除操作   
        JObject jsonObj = new JObject();
        bool isDeleted = FlowOperationBll.FlowOperationLogicDeleteById(id, modifierId);
        jsonObj.Add(new JProperty("isDeleted", isDeleted));

        //序列化后返回
        string jsonString = jsonObj.ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //更新用户信息
    public void FlowOperationUpdate(HttpContext context)
    {
        //获取数据;
        FlowOperation FlowOperationBll = new FlowOperation();
        FlowOperationInfo flowOperation = new FlowOperationInfo();
        flowOperation.Id = Convert.ToInt32(context.Request["Id"]);
        flowOperation.Name = Convert.ToString(context.Request["Name"]);
        flowOperation.FlowId = Convert.ToInt32(context.Request["flowId"]);
        flowOperation.Memo = Convert.ToString(context.Request["Memo"]);
        flowOperation.ModifierId = Convert.ToInt32(context.Request["ModifierId"]);

        //插入数据
        bool isUpdated = FlowOperationBll.FlowOperationUpdateById(flowOperation);

        //序列化后返回
        context.Response.Write(isUpdated.ToString());
        context.Response.End();
    }
    #endregion 数据操作(增删改）
    #region   验证FlowNode是否已存在(用于更新)
    public void FlowOperationIsExistedByNewNameAndOldName(HttpContext context)
    {
        FlowOperation FlowOperationBll = new FlowOperation();
        //获取参数
        string newName = Convert.ToString(context.Request["name"]);
        string oldName = Convert.ToString(context.Request["OldValue"]);

        //获取结果
        bool isExisted = FlowOperationBll.FlowOperationIsExistedByNewNameAndOldName(newName, oldName);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
    #endregion 验证InspectResultType是否已存在(用于更新)

         #region 验证是否存在
    //验证是否存在
    public void FlowOperationIsExisted(HttpContext context)
    {
        FlowOperation FlowOperationBll = new FlowOperation();
        //获取参数
        string name = Convert.ToString(context.Request["name"]);
        int flowId = 1;

        //获取结果
        bool isExisted = FlowOperationBll.FlowOperationIsExisted(name, flowId);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
    #endregion 验证
}
