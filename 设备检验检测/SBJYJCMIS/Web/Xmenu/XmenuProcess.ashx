<%@WebHandler Language="C#" Class="XmenuProcess"%>

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

public class XmenuProcess : IHttpHandler
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

    Xmenu bllProcess = new Xmenu();

    //更新数据
    public void XmenuInsertTran(HttpContext context)
    {        
         //获取数据;
        string jsonData = context.Request.Params["jsonData"];
        XmenuInfo record = JsonConvert.DeserializeObject<XmenuInfo>(jsonData);

        //执行更新
        bool isInserted = bllProcess.XmenuInsertTran(record);//该Insert在数据库后台根据情况判断是Insert还是Delete

        //序列化后返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }

    //更新数据
    public void XmenuUpdateById(HttpContext context)
    {
        //获取数据;
        string jsonData = context.Request.Params["jsonData"];
        XmenuInfo record = JsonConvert.DeserializeObject<XmenuInfo>(jsonData);
       
        ////执行更新
        bool isUpdated = bllProcess.XmenuUpdateById(record);//该Insert在数据库后台根据情况判断是Insert还是Delete

        //序列化后返回
        context.Response.Write(isUpdated.ToString());
        context.Response.End();
    }

    //更新数据
    public void XmenuUpdateTran(HttpContext context)
    {
        //获取数据;
        string jsonData = context.Request.Params["jsonData"];
        XmenuInfo record = JsonConvert.DeserializeObject<XmenuInfo>(jsonData);

        //执行更新
        bool isUpdated = bllProcess.XmenuUpdateTran(record);//该Insert在数据库后台根据情况判断是Insert还是Delete

        //序列化后返回
        context.Response.Write(isUpdated.ToString());
        context.Response.End();
    }

    //删除菜单项
    public void XmenuDeleteTranById(HttpContext context)
    {
        //获取数据;
        int xmenuId = Convert.ToInt32(context.Request["xmenuId"]);

        //执行更新
        bool isDeleted = bllProcess.XmenuDeleteTranById(xmenuId);

        //序列化后返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }
    
    //交换顺序
    public void XmenuSwapSequenceByXmenuId(HttpContext context)
    {
        //获取数据;
        int xmenuId = Convert.ToInt32(context.Request["xmenuId"]);
        int swapXmenuId = Convert.ToInt32(context.Request["swapXmenuId"]);
        int modifierId = Convert.ToInt32(context.Request["modifierId"]);

        //执行更新
        bool isSwaped = bllProcess.XmenuSwapSequenceByXmenuId(xmenuId, swapXmenuId, modifierId);

        //序列化后返回
        context.Response.Write(isSwaped.ToString());
        context.Response.End();
    }

    //获取数据列表
    public void XmenuGetList(HttpContext context)
    {
        //获取参数
        int xuserId = (context.Request["xuserId"] == null) ? 0 : Convert.ToInt32(context.Request["xuserId"]);
        int parentXmenuId = (context.Request["parentXmenuId"] == null) ? 0 : Convert.ToInt32(context.Request["parentXmenuId"]);

        //获取数据列表
        IList<XmenuListInfo> recordList = new List<XmenuListInfo>();
        recordList = bllProcess.XmenuGetListByXuserId(xuserId,parentXmenuId);

        string jsonString = JsonConvert.SerializeObject(recordList);
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //获取数据列表
    public void XmenuGetDropDownList(HttpContext context)
    {
        //获取数据列表
        IList<XmenuDropDownListInfo> recordList = new List<XmenuDropDownListInfo>();
        recordList = bllProcess.XmenuGetDropDownList();

        string jsonString = JsonConvert.SerializeObject(recordList);
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //获取数据列表
    public void XmenuGetDropDownListByParentId(HttpContext context)
    {
        //获取数据列表
        int parentId = context.Request["parentId"] == null ? 0 : Convert.ToInt32(context.Request["parentId"]);
        
        IList<XmenuDropDownListInfo> recordList = new List<XmenuDropDownListInfo>();
        recordList = bllProcess.XmenuGetDropDownListByParentId(parentId);

        string jsonString = JsonConvert.SerializeObject(recordList);
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //获取数据列表
    public void XmenuGetListWithPermission(HttpContext context)
    {
        //获取参数
        int xuserId = (context.Request["xuserId"] == null) ? 0 : Convert.ToInt32(context.Request["xuserId"]);
        int parentXmenuId = (context.Request["parentXmenuId"] == null) ? 0 : Convert.ToInt32(context.Request["parentXmenuId"]);

        //获取数据列表
        IList<XmenuListWithPermissionInfo> recordList = new List<XmenuListWithPermissionInfo>();
        recordList = bllProcess.XmenuGetListWithPermission(xuserId, parentXmenuId);

        string jsonString = JsonConvert.SerializeObject(recordList);
        context.Response.Write(jsonString);
        context.Response.End();
    }
}
