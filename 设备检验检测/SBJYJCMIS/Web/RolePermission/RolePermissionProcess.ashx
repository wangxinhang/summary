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

    RolePermission bllProcess = new RolePermission();

    //RolePermission功能权限数据操作
    public void RolePermissionOperate(HttpContext context)
    {
        //获取数据;
        string jsonList = context.Request.Params["jsonList"];
        IList<RolePermissionInfo> recordList = JsonConvert.DeserializeObject<List<RolePermissionInfo>>(jsonList);

        ////插入数据
        bool isInserted = true;
        foreach (RolePermissionInfo p in recordList)
        {
            bool result = bllProcess.RolePermissionOperate(p);//该Insert在数据库后台根据情况判断是Insert还是Delete
            isInserted = isInserted && result;
        }

        //序列化后返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }

    //RoleDepartment部门权限数据操作
    public void RoleDepartmentOperate(HttpContext context)
    {
        //获取数据
        string jsonData = context.Request.Params["jsonData"];
        RoleDepartmentInfo record = JsonConvert.DeserializeObject<RoleDepartmentInfo>(jsonData);

        //插入数据
        bool isOperated = bllProcess.RoleDepartmentOperate(record);

        //序列化后返回
        context.Response.Write(isOperated.ToString());
        context.Response.End();
    }
}
