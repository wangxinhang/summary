<%@WebHandler Language="C#" Class="XuserPermissionProcess"%>

using System;
using System.Collections.Generic;
using System.Web;
using Newtonsoft.Json;
using SBJYJCMIS.BLL;
using SBJYJCMIS.Model;

public class XuserPermissionProcess : IHttpHandler
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

    //移动端App相关：获取用户AppMenu及其对应页面的访问权限
    public void AppMenuGetPermissionList(HttpContext context)
    {
        //获取参数
        int xuserId = (context.Request["xuserId"] == null) ? 0 : Convert.ToInt32(context.Request["xuserId"]);

        Permission pmBll = new Permission();

        //获取数据列表
        IList<AppMenuPermissionListInfo> recordList = new List<AppMenuPermissionListInfo>();
        recordList = pmBll.AppMenuGetPermissionList(xuserId);

        string jsonString = JsonConvert.SerializeObject(recordList);
        context.Response.Write(jsonString);
        context.Response.End();
    }
}
