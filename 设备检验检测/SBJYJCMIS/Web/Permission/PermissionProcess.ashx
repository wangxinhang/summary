<%@WebHandler Language="C#" Class="PermissionProcess"%>

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

public class PermissionProcess : IHttpHandler
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

    Permission bllProcess = new Permission();
    
    //插入信息
    public void PermissionInsert(HttpContext context)
    {
        //获取数据;
        string jsonList = context.Request.Params["jsonList"];        
        IList<PermissionInfo> recordList = JsonConvert.DeserializeObject<List<PermissionInfo>>(jsonList);

        ////插入数据
        bool isInserted = true;
        foreach (PermissionInfo p in recordList)
        {
            var result = bllProcess.PermissionInsert(p);//该Insert在数据库后台根据情况判断是Insert还是Delete
            isInserted = isInserted && result;
        }

        //序列化后返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }

    //删除
    public void PermissionDelete(HttpContext context)
    {
        //获取数据
        int id = Convert.ToInt32(context.Request["Id"]);

        //执行删除操作   
        bool isDeleted = bllProcess.PermissionDeleteById(id);

        //序列化后返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }

    //删除
    public void PermissionDeleteByOperationIdAndResourceId(HttpContext context)
    {
        //获取数据
        int operationId = Convert.ToInt32(context.Request["operationId"]);
        int resourceId = Convert.ToInt32(context.Request["resourceId"]);

        //执行删除操作   
        bool isDeleted = bllProcess.PermissionDeleteByOperationIdAndResourceId(operationId, resourceId);

        //序列化后返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }   
    
    //根据查询结果列表
    public void PermissionGetOperationListByResourceId(HttpContext context)
    {
        //获取参数
        int resourceId = Convert.ToInt32(context.Request["resourceId"]);
        int permissionType = Convert.ToInt32(context.Request["permissionType"]);

        //获取数据列表
        IList<PermissionOperationListInfo> recordList = bllProcess.PermissionGetOperationListByResourceId(resourceId, permissionType);       
        string jsonString = JsonConvert.SerializeObject(recordList);
        context.Response.Write(jsonString);
        context.Response.End();
    }
    
    //获取权限列表及角色可配置权限
    public void PermissionGetRolePermissionList(HttpContext context)
    {
        //获取参数int roleId, int xmenuId, int assignType, int resourceTypeId, string resourceName
        int roleId = Convert.ToInt32(context.Request["roleId"]);
        int xmenuId = Convert.ToInt32(context.Request["xmenuId"]);
        int assignType = Convert.ToInt32(context.Request["assignType"]);
        int resourceTypeId = Convert.ToInt32(context.Request["resourceTypeId"]);
        string resourceName = Convert.ToString(context.Request["resourceName"]);
        
        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "ResourceId" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        IList<PermissionRolePermissionListInfo> recordList = bllProcess.PermissionGetRolePermissionListPaged(roleId, xmenuId, assignType, resourceTypeId, resourceName, 
                                                                                                             pageNumber, pageSize, orderField, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = bllProcess.PermissionGetRolePermissionListSum(roleId, xmenuId, assignType, resourceTypeId, resourceName);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();

        context.Response.Write(jsonString);
        context.Response.End();
    }    
    
    //获取角色可配置部门权限列表
    public void PermissionGetRoleDepartmentList(HttpContext context)
    {
        //获取参数int roleId, int xmenuId, int assignType, int resourceTypeId, string resourceName
        int roleId = Convert.ToInt32(context.Request["roleId"]);
        string departmentName = Convert.ToString(context.Request["departmentName"]);
        int assignType = Convert.ToInt32(context.Request["assignType"]);
        
        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "DepartmentId" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        IList<PermissionRoleDepartmentListInfo> recordList = bllProcess.PermissionGetRoleDepartmentListPaged(roleId, departmentName, assignType,
                                                                                                             pageNumber, pageSize, orderField, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = bllProcess.PermissionGetRoleDepartmentListSum(roleId, departmentName, assignType);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();

        context.Response.Write(jsonString);
        context.Response.End();
    }        
}
