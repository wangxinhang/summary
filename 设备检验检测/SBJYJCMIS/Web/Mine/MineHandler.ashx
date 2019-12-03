<%@WebHandler Language="C#" Class="MineHandler"%>

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

public class MineHandler : IHttpHandler
{
    #region 通用
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

    Mine bllProcess = new Mine();

    #endregion 通用

    #region 获取Mine查询结果集及记录总数
    public void MineGetList(HttpContext context)
    {
        //获取参数
        string MKBM = Convert.ToString(context.Request["MKBM"]);   
        int SJQYId = Convert.ToInt32(context.Request["SJQYId"]);   
        int JCBMId = Convert.ToInt32(context.Request["JCBMId"]);   
        int SZQYId = Convert.ToInt32(context.Request["SZQYId"]);   

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderFieldName = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Id" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);
        
        //获取Mine查询结果集
        IList<MineInfo> recordList = bllProcess.MineGetList(MKBM, SJQYId, JCBMId, SZQYId, true, pageNumber, pageSize, orderFieldName, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        //获取记录总数
        RecordCountInfo recordSum = bllProcess.MineGetListSum(MKBM, SJQYId, JCBMId, SZQYId);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet",jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();

        context.Response.Write(jsonString);

        context.Response.End();
    }
    #endregion

    #region 获取煤矿企业下拉列表
    public void SJQYGetList(HttpContext context)
    { 
        IList<DepartmentInfo> recordList = bllProcess.SJQYGetList();
        string jsonString = JsonConvert.SerializeObject(recordList);

        context.Response.Write(jsonString);

        context.Response.End();
    }
    #endregion

    #region 获取监察部门下拉列表
    public void JCBMGetList(HttpContext context)
    { 
        IList<DepartmentInfo> recordList = bllProcess.JCBMGetList();
        string jsonString = JsonConvert.SerializeObject(recordList);

        context.Response.Write(jsonString);

        context.Response.End();
    }
    #endregion

    #region 获取所在区域下拉列表
    public void SZQYGetList(HttpContext context)
    { 
        IList<RegionInfo> recordList = bllProcess.SZQYGetList();
        string jsonString = JsonConvert.SerializeObject(recordList);

        context.Response.Write(jsonString);

        context.Response.End();
    }
    #endregion
}
