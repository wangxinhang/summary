<%@WebHandler Language="C#" Class="RoleProcess"%>

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

public class RoleProcess : IHttpHandler
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

    Role bllProcess = new Role(); 
    #endregion 通用

    #region 数据操作(增删改）
    //插入用户信息
    public void RoleInsert(HttpContext context)
    {
        //获取数据;
        RoleInfo role = new RoleInfo(); //JsonConvert.DeserializeObject<RoleInfo>(jsonStr);        
        role.Name = Convert.ToString(context.Request["Name"]);
        role.Memo = Convert.ToString(context.Request["Memo"]);
        role.CreatorId =  Convert.ToInt32(context.Request["CreatorId"]);
 
        //插入数据
        bool isInserted = bllProcess.RoleInsert(role);    

        //序列化后返回
        string jsonString = isInserted.ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
    
    //逻辑删除用户
    public void RoleDelete(HttpContext context)
    {
        //获取数据
        int id = Convert.ToInt32(context.Request["id"]);

        //执行逻辑删除操作   
        bool isDeleted = bllProcess.RoleDeleteTranById(id);
        
        //序列化后返回
        string jsonString = isDeleted.ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }   
     
    //更新用户信息
    public void RoleUpdate(HttpContext context)
    {
        //获取数据;
        RoleInfo role = new RoleInfo();
        role.Id = Convert.ToInt32(context.Request["id"]); 
        role.Name = Convert.ToString(context.Request["name"]);
        role.Memo = Convert.ToString(context.Request["memo"]);
        role.ModifierId = Convert.ToInt32(context.Request["modifierId"]);
        
        //插入数据
        bool isUpdated = bllProcess.RoleUpdateById(role);      

        //序列化后返回
        string jsonString = isUpdated.ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
    #endregion 数据操作(增删改）

    #region 验证是否存在
    //验证是否存在
    public void RoleIsExisted(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);

        //获取结果
        bool isExisted = bllProcess.RoleIsExistedByName(name);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }    
    #endregion 用户和密码验证
    
    #region 查询结果集列表
    //根据查询结果集RoleList
    public void RoleGetList(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);   

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Id" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        IList<RoleListInfo> recordList = bllProcess.RoleGetListPaged(name, pageNumber, pageSize, orderField, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = bllProcess.RoleGetListSum(name);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        
        context.Response.Write(jsonString);
        context.Response.End();
    }             
    #endregion 查询结果集列表
}
