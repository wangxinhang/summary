<%@ WebHandler Language="C#" Class="XuserHandler" %>
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

public class XuserHandler : IHttpHandler {
    
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
    
    public void GetDepartmentListByXuserId(HttpContext context)
    {
        int xuserId = (context.Request["xuserId"] == null) ? 0 : Convert.ToInt32(context.Request["xuserId"]);
        DepartmentProcess departmentProcess = new DepartmentProcess();
        IList<DepartmentViewInfo> recordList = new List<DepartmentViewInfo>();
        recordList = departmentProcess.GetDepartmentList(xuserId, "", 0, 0, 0, "", 1, false,1, 1, "", "");
        context.Response.Write(JsonConvert.SerializeObject(recordList));
        context.Response.End();
    }
}