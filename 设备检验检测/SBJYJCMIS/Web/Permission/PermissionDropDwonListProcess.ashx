<%@ WebHandler Language="C#" Class="PermissionDropDwonListProcess" %>

using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Xml.Linq;
using System.IO;
using System.Web;
using System.Web.UI.WebControls;
using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SBJYJCMIS.BLL;
using SBJYJCMIS.Model;
using SBJYJCMIS.DBUtility;

public class PermissionDropDwonListProcess : IHttpHandler
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

    //获取用户权限范围内的行政区划列表
    public void RegionGetList(HttpContext context)
    {
        //获取数据并序列化
        RegionProcess pdBll = new RegionProcess();
        IList<RegionShortInfo> euList = new List<RegionShortInfo>();
        euList = pdBll.GetRegionListUnPaged(null, null, null, null, "Id", "ASC");
        var jList = euList.Select(t => new
        {
            Id = t.Id,
            Name = t.Name,
        });

        string jsonString = JsonConvert.SerializeObject(jList);
        context.Response.Write(jsonString);
        context.Response.End();
    }
    //获取信息
    public void GetYearList(HttpContext context)
    {
        //获取年度列表并序列化
        JArray arrYear = new JArray();
        int endYear = DateTime.Now.Year;
        int beginYear = endYear - 3;
        for (int i = endYear; i >= beginYear; i--)
        {
            JObject yearList = new JObject();
            yearList.Add(new JProperty("Id", i));
            yearList.Add(new JProperty("Name", i));
            arrYear.Add(yearList);
        }

        string jsonString = arrYear.ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //获取权限内人员列表
    public void EmployeeGetList(HttpContext context)
    {
        //获取参数
        int xuserId = (context.Request["xuserId"] == null) ? 0 : Convert.ToInt32(context.Request["xuserId"]);
        int departmentId = (context.Request["departmentId"] == null) ? 0 : Convert.ToInt32(context.Request["departmentId"]);

        //获取数据并序列化
        EmployeeProcess pdBll = new EmployeeProcess();
        IList<EmployeeInfo> euList = new List<EmployeeInfo>();
        euList = pdBll.GetPermissionEmployeeListByXuserId(xuserId, departmentId);
        var jList = euList.Select(t => new
        {
            Id = t.Id,
            Name = t.Name,
        });

        string jsonString = JsonConvert.SerializeObject(jList);
        context.Response.Write(jsonString);
        context.Response.End();
    }
    
  
    //获取权限内人员列表
    public void GetEmployeeListByDepartmentId(HttpContext context)
    {
        //获取参数
        int departmentId = (context.Request["departmentId"] == null) ? 0 : Convert.ToInt32(context.Request["departmentId"]);

        //获取数据并序列化
        EmployeeProcess pdBll = new EmployeeProcess();
        IList<EmployeeViewInfo> euList = new List<EmployeeViewInfo>();
        euList = pdBll.GetEmployeeListByDepartmentId(departmentId);
        var jList = euList.Select(t => new
        {
            Id = t.Id,
            Name = t.Name,
        });

        string jsonString = JsonConvert.SerializeObject(jList);
        context.Response.Write(jsonString);
        context.Response.End();
    }
    //获取流行进度下拉列表
    public void FlowStatusGetList(HttpContext context)
    {
        //获取数据并序列化
        FlowStatus pdBll = new FlowStatus();
        IList<FlowStatusListInfo> euList = new List<FlowStatusListInfo>();
        euList = pdBll.FlowStatusGetListUnPaged(null, 1, 0, "Id", "ASC");
        var jList = euList.Select(t => new
        {
            Id = t.Id,
            Name = t.Name,
        });

        string jsonString = JsonConvert.SerializeObject(jList);
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //排查处理结果状态列表
    public void GetFlowHandleTypeGetList(HttpContext context)
    {
        //获取数据并序列化
        FlowHandleType teBll = new FlowHandleType();
        IList<FlowHandleTypeListInfo> teList = new List<FlowHandleTypeListInfo>();
        teList = teBll.FlowHandleTypeGetListUnPaged(null, 1, 0, "ID", "ASC");
        var jList = teList.Select(t => new
        {
            Id = t.Id,
            Name = t.Name
        });

        string jsonString = JsonConvert.SerializeObject(jList);//, Formatting.Indented, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
        context.Response.Write(jsonString);
        context.Response.End();
    }
    //获取流程类别列表
    public void GetFlowList(HttpContext context)
    {
        //获取数据并序列化
        Flow pdBll = new Flow();
        IList<FlowInfo> jList = new List<FlowInfo>();
        jList = pdBll.FlowGetListUnPaged(null, "ID", "ASC");

        string jsonString = JsonConvert.SerializeObject(jList);
        context.Response.Write(jsonString);
        context.Response.End();
    }

}

