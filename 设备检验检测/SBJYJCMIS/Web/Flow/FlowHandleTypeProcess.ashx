<%@ WebHandler Language="C#" Class="FlowHandleTypeProcess" %>

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

public class FlowHandleTypeProcess : IHttpHandler
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

    #region FlowHandleTypeProcess(增删改）
    //插入用户信息
    public void FlowHandleTypeInsert(HttpContext context)
    {
        //获取数据;
        FlowHandleType FlowHandleTypeBll = new FlowHandleType();
        FlowHandleTypeInfo FlowHandleType = new FlowHandleTypeInfo(); //JsonConvert.DeserializeObject<GroupInfo>(jsonStr);        
        FlowHandleType.Name = Convert.ToString(context.Request["Name"]);
        FlowHandleType.FlowId = Convert.ToInt32(context.Request["FlowId"]);
        FlowHandleType.Memo = context.Request["Memo"];
        FlowHandleType.CreatorId = Convert.ToInt32(context.Request["CreatorId"]);

        ////插入数据
        bool isInserted = FlowHandleTypeBll.FlowHandleTypeInsert(FlowHandleType);

        //序列化后返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }

    //逻辑删除用户
    public void FlowHandleTypeDelete(HttpContext context)
    {
        //获取数据
        FlowHandleType FlowHandleTypeBll = new FlowHandleType();
        //获取数据
        int id = Convert.ToInt32(context.Request["Id"]);
        int modifierId = Convert.ToInt32(context.Request["ModifierId"]);

        //执行删除操作   
        JObject jsonObj = new JObject();
        bool isDeleted = FlowHandleTypeBll.FlowHandleTypeLogicDeleteById(id, modifierId);
        jsonObj.Add(new JProperty("isDeleted", isDeleted));

        //序列化后返回
        string jsonString = jsonObj.ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //更新用户信息
    public void FlowHandleTypeUpdate(HttpContext context)
    {
        //获取数据;
        FlowHandleType FlowHandleTypeBll = new FlowHandleType();
        FlowHandleTypeInfo FlowHandleType = new FlowHandleTypeInfo();
        FlowHandleType.Id = Convert.ToInt32(context.Request["Id"]);
        FlowHandleType.Name = Convert.ToString(context.Request["Name"]);
        FlowHandleType.FlowId = Convert.ToInt32(context.Request["FlowId"]);
        FlowHandleType.Memo = Convert.ToString(context.Request["Memo"]);
        FlowHandleType.ModifierId = Convert.ToInt32(context.Request["ModifierId"]);

        //插入数据
        bool isUpdated = FlowHandleTypeBll.FlowHandleTypeUpdateById(FlowHandleType);

        //序列化后返回
        context.Response.Write(isUpdated.ToString());
        context.Response.End();
    }
    #endregion 数据操作(增删改）

    #region 验证是否存在
    //验证是否存在
    public void FlowHandleTypeIsExisted(HttpContext context)
    {
        FlowHandleType FlowHandleTypeBll = new FlowHandleType();
        //获取参数
        string name = Convert.ToString(context.Request["name"]);
        int flowId = 1;

        //获取结果
        bool isExisted = FlowHandleTypeBll.FlowHandleTypeIsExisted(name, flowId);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
    #endregion 验证

    #region   验证FlowHandleType是否已存在(用于更新)
    public void FlowHandleTypeIsExistedByNewNameAndOldName(HttpContext context)
    {
        FlowHandleType FlowHandleTypeBll = new FlowHandleType();

        //获取参数
        string newName = Convert.ToString(context.Request["name"]);
        string oldName = Convert.ToString(context.Request["OldValue"]);

        //获取结果
        bool isExisted = FlowHandleTypeBll.FlowHandleTypeIsExistedByNewNameAndOldName(newName, oldName);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
    #endregion 验证InspectResultType是否已存在(用于更新)
}
