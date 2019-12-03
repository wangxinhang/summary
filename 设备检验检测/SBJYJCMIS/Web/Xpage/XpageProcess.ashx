<%@WebHandler Language="C#" Class="XpageProcess"%>

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

public class XpageProcess : IHttpHandler
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

    Xpage bllProcess = new Xpage();
    
    //获取数据列表
    public void XpageGetList(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);
        string pathName = Convert.ToString(context.Request["pathName"]);
        int relationType = Convert.ToInt32(context.Request["relationType"]);

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Name" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);
        
        //获取数据列表
        IList<XpageListInfo> recordList = new List<XpageListInfo>();
        recordList = bllProcess.XpageGetListPaged(name,pathName,relationType, pageNumber, pageSize, orderField, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = bllProcess.XpageGetListSum(name, pathName, relationType);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();

        context.Response.Write(jsonString);
        context.Response.End();
    }
}
