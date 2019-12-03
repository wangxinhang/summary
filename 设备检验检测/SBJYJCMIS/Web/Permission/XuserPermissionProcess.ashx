<%@WebHandler Language="C#" Class="XuserPermissionProcess"%>

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

    //获取用户权限
    public void XuserGetPermission(HttpContext context)
    {
        //获取参数
        int xuserId = (context.Request["xuserId"] == null) ? 0 : Convert.ToInt32(context.Request["xuserId"]);
        int xmenuId = (context.Request["xmenuId"] == null) ? 0 : Convert.ToInt32(context.Request["xmenuId"]);

        Permission Permission = new Permission();

        bool insertPermission = Permission.XuserInsertPermissableByXmenuId(xuserId, xmenuId);
        bool deletePermission = Permission.XuserDeletePermissableByXmenuId(xuserId, xmenuId);
        bool modifyPermission = Permission.XuserModifyPermissableByXmenuId(xuserId, xmenuId);
        bool exportPrintPermission = Permission.XuserExportPrintPermissableByXmenuId(xuserId, xmenuId);

        string jsonString = new JObject(new JProperty("insertPermission", insertPermission), new JProperty("deletePermission", deletePermission),
                                        new JProperty("modifyPermission", modifyPermission),new JProperty("exportPrintPermission", exportPrintPermission)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //获取用户页面权限
    public void XuserGetPagePermissionList(HttpContext context)
    {
        //获取参数
        int xuserId = (context.Request["xuserId"] == null) ? 0 : Convert.ToInt32(context.Request["xuserId"]);
        int xpageId = (context.Request["xpageId"] == null) ? 0 : Convert.ToInt32(context.Request["xpageId"]);

        Permission pmBll = new Permission();

        //获取数据列表
        IList<PermissionListInfo> recordList = new List<PermissionListInfo>();
        recordList = pmBll.PermissionGetListByXuserIdOperationIdResourceIdResourceTypeId(xuserId, 0, xpageId, 2);

        string jsonString = JsonConvert.SerializeObject(recordList);
        context.Response.Write(jsonString);
        context.Response.End();
    }
}
