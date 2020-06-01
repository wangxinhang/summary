<%@WebHandler Language="C#" Class="DepartmentProcess"%>

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
using SBJYJCMIS.Bll;
using SBJYJCMIS.Model;
using SBJYJCMIS.DBUtility;

public class DepartmentProcess : IHttpHandler
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

    //获取Department列表
    public void DepartmentGetList(HttpContext context)
    {
        //获取数据列表
        ContractDepartment recordBll = new ContractDepartment();
        IList<ContractDepartmentInfo> recordList = recordBll.ContractDepartmentGetList();

        string jsonString = JsonConvert.SerializeObject(recordList);
        context.Response.Write(jsonString);
        context.Response.End();
    }
}
