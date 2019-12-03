<%@WebHandler Language="C#" Class="InspectionOrganProcess"%>

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

public class InspectionOrganProcess : IHttpHandler
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

    InspectionOrgan bllProcess = new InspectionOrgan();
    #endregion 通用


    #region 获取查询检测机构查询结果集列表及记录总数

    //获取查询检测机构结果集及记录总数
    public void InspectionOrganGetList(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["Name"]);
        int isInner = Convert.ToInt32(context.Request["IsInner"]);

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Id" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        IList<InspectionOrganInfo> recordList = bllProcess.InspectionOrganGetList(name,isInner, true, pageNumber, pageSize, orderField, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = bllProcess.InspectionOrganGetSum(name,isInner);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();

        context.Response.Write(jsonString);
        context.Response.End();
    }
    #endregion 查询结果集列表


    #region 新增检测机构信息
    public void InspectionOrganInsert(HttpContext context)
    {
        //获取Ajax传入的数据
        InspectionOrganInfo InspectionOrgan = new InspectionOrganInfo();

        //InspectionOrgan.Id = Convert.ToInt32(context.Request["id"]);
        InspectionOrgan.Name = Convert.ToString(context.Request["Name"]);
        InspectionOrgan.ShortName = Convert.ToString(context.Request["ShortName"]);
        InspectionOrgan.IsInner = Convert.ToInt32(context.Request["IsInner"]);
        InspectionOrgan.Address = Convert.ToString(context.Request["Address"]);
        InspectionOrgan.Tel = Convert.ToString(context.Request["Tel"]);
        InspectionOrgan.Contact = Convert.ToString( context.Request["Contact"]);
        InspectionOrgan.Qualification = Convert.ToString(context.Request["Qualification"]);
        InspectionOrgan.Memo = Convert.ToString(context.Request["Memo"]);

        //获取返回值
        bool isInserted = bllProcess.InspectionOrganInsert(InspectionOrgan);

        context.Response.Write(isInserted.ToString());

        context.Response.End();
    }
    #endregion 新增检测机构信息


    #region 编辑检测机构信息
    public void InspectionOrganUpdate(HttpContext context)
    {
        //获取Ajax传入的数据
        InspectionOrganInfo InspectionOrgan = new InspectionOrganInfo();

        InspectionOrgan.Id = Convert.ToInt32(context.Request["id"]);
        InspectionOrgan.Name = Convert.ToString(context.Request["Name"]);
        InspectionOrgan.ShortName = Convert.ToString(context.Request["ShortName"]);
        InspectionOrgan.IsInner = Convert.ToInt32(context.Request["IsInner"]);
        InspectionOrgan.Address = Convert.ToString(context.Request["Address"]);
        InspectionOrgan.Tel = Convert.ToString(context.Request["Tel"]);
        InspectionOrgan.Contact = Convert.ToString( context.Request["Contact"]);
        InspectionOrgan.Qualification = Convert.ToString(context.Request["Qualification"]);
        InspectionOrgan.Memo = Convert.ToString(context.Request["Memo"]);

        //获取返回值
        bool isUpdated = bllProcess.InspectionOrganUpdate(InspectionOrgan);

        context.Response.Write(isUpdated.ToString());

        context.Response.End();
    }
    #endregion 编辑检测机构信息


    #region 删除检测机构信息
    public void InspectionOrganDelete(HttpContext context)
    {
        //获取Ajax传入的数据
        int Id = Convert.ToInt32(context.Request["Id"]);

        //获取返回值
        bool isDeleted = bllProcess.InspectionOrganDelete(Id);

        context.Response.Write(isDeleted.ToString());

        context.Response.End();
    }
    #endregion 删除检测机构信息







}
