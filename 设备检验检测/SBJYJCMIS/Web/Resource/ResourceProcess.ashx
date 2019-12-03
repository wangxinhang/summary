<%@WebHandler Language="C#" Class="ResourceProcess"%>

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

public class ResourceProcess : IHttpHandler
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

    Resource bllProcess = new Resource(); 
    #endregion 通用

    #region 数据操作(增删改）
    //插入用户信息
    public void ResourceInsert(HttpContext context)
    {
        //获取数据;
        ResourceInfo resource = new ResourceInfo();   
        resource.Name = Convert.ToString(context.Request["Name"]);
        resource.ResourceTypeId = Convert.ToInt32(context.Request["ResourceTypeId"]);
        resource.ResourceObject = Convert.ToString(context.Request["ResourceObject"]);
        resource.Memo = Convert.ToString(context.Request["Memo"]);
        resource.CreatorId =  Convert.ToInt32(context.Request["CreatorId"]);

        //插入数据
        bool isInserted = bllProcess.ResourceInsertTran(resource);

        //序列化后返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }
    
    //逻辑删除用户
    public void ResourceDelete(HttpContext context)
    {
        //获取数据
        int id = Convert.ToInt32(context.Request["Id"]);
        int resourceTypeId = Convert.ToInt32(context.Request["ResourceTypeId"]);

        //执行删除操作   
        bool isDeleted = bllProcess.ResourceDeleteTranById(id, resourceTypeId);
            
        //序列化后返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }   
     
    //更新用户信息
    public void ResourceUpdate(HttpContext context)
    {
        //获取数据;
        ResourceInfo resource = new ResourceInfo();
        resource.Id = Convert.ToInt32(context.Request["Id"]);
        resource.Name = Convert.ToString(context.Request["Name"]);
        resource.ResourceTypeId = Convert.ToInt32(context.Request["ResourceTypeId"]);
        resource.ResourceObject = Convert.ToString(context.Request["ResourceObject"]);
        resource.Memo = Convert.ToString(context.Request["Memo"]);
        resource.ModifierId = Convert.ToInt32(context.Request["ModifierId"]);
        
        //插入数据
        bool isUpdated = bllProcess.ResourceUpdateTranById(resource);

        //序列化后返回
        context.Response.Write(isUpdated.ToString());
        context.Response.End();
    }
    #endregion 数据操作(增删改）

    #region 验证是否存在
    //验证是否存在
    public void ResourceIsExisted(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);
        int resourceTypeId = context.Request["resourceTypeId"] == null ? 0 : Convert.ToInt32(context.Request["resourceTypeId"]); 

        //获取结果
        bool isExisted = bllProcess.ResourceIsExisted(name, resourceTypeId);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }    
    #endregion 用户和密码验证
    
    #region 查询结果集列表
    //根据查询结果集ResourceList
    public void ResourceGetList(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);
        int resourceTypeId = context.Request["resourceTypeId"] == null ? 0 : Convert.ToInt32(context.Request["resourceTypeId"]); 

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Id" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        IList<ResourceListInfo> recordList = bllProcess.ResourceGetListPaged(name,resourceTypeId, pageNumber, pageSize, orderField, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        ResourceSumInfo recordSum = bllProcess.ResourceGetListSum(name, resourceTypeId);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        
        context.Response.Write(jsonString);
        context.Response.End();
    }             
    #endregion 查询结果集列表

    #region 查询结果集列表:用于设置可配置权限
    //根据查询结果集ResourceList:用于设置可配置权限
    public void ResourceGetOperationList(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);
        int resourceTypeId = context.Request["resourceTypeId"] == null ? 0 : Convert.ToInt32(context.Request["resourceTypeId"]);

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Id" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        IList<ResourceOperationListInfo> recordList = bllProcess.ResourceGetOperationListPaged(name, resourceTypeId, pageNumber, pageSize, orderField, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = bllProcess.ResourceGetOperationListSum(name, resourceTypeId);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();

        context.Response.Write(jsonString);
        context.Response.End();
    }
    #endregion 查询结果集列表:用于设置可配置权限
}
