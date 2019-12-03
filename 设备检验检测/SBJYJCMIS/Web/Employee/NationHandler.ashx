<%@ WebHandler Language="C#" Class="NationHandler" %>
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

public class NationHandler : IHttpHandler {
    
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
    //获取民族列表
    public void GetNationNameList(HttpContext context)
    {
        //获取数据并序列化
        NationProcess nationBll = new NationProcess();
        IList<NationInfo> dataList = new List<NationInfo>();
        dataList = nationBll.GetNationNameList();
        var jList = dataList.Select(t => new
        {
            Id = t.Id,
            Name = t.Name
        });

        string jsonString = JsonConvert.SerializeObject(jList);
        context.Response.Write(jsonString);
        context.Response.End();
    }
}