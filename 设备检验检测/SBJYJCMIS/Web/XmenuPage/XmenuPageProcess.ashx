<%@WebHandler Language="C#" Class="XmenuPageProcess"%>

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

public class XmenuPageProcess : IHttpHandler
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

    XmenuPage bllProcess = new XmenuPage();      
    
    #region 数据操作(增删改）
    //插入用户信息
    public void XmenuPageInsert(HttpContext context)
    {   
        //获取数据;
        string jsonData = context.Request.Params["jsonData"];
        XmenuPageInfo record = JsonConvert.DeserializeObject<XmenuPageInfo>(jsonData);

        //插入数据
        bool isInserted = bllProcess.XmenuPageInsert(record);

        //序列化后返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }
    
    //逻辑删除用户
    public void XmenuPageDeleteByXmenuIdXpageId(HttpContext context)
    {
        //获取参数
        int xmenuId = Convert.ToInt32(context.Request["xmenuId"]);
        int xpageId = Convert.ToInt32(context.Request["xpageId"]);

        //执行删除操作   
        bool isDeleted = bllProcess.XmenuPageDeleteByXmenuIdXpageId(xmenuId, xpageId);

        //序列化后返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }   
    #endregion 数据操作(增删改）
        
}
