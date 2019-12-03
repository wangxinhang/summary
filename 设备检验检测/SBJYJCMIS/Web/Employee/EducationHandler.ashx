<%@ WebHandler Language="C#" Class="EducationHandler" %>

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

public class EducationHandler : IHttpHandler
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

    //获取学历列表
    public void GetEducationList(HttpContext context)
    {
        //获取参数
        int xuserId = (context.Request["xuserId"] == null) ? 0 : Convert.ToInt32(context.Request["xuserId"]);
        string name = (context.Request["name"] == null) ? null : (context.Request["name"]);
        int dataStatusId = (context.Request["dataStatusId"] == null) ? 1 : Convert.ToInt32(context.Request["dataStatusId"]);

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 20 : Convert.ToInt32(context.Request["pageSize"]);
        string orderFieldName = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? null : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? null : Convert.ToString(context.Request["orderType"]);
        //string orderFieldName = "ID";
        //string orderType = "DESC";

        //获取数据列表
        Education EducationBll = new Education();
        IList<EducationListInfo> recordList = new List<EducationListInfo>();
        recordList = EducationBll.GetEducationListPaged(name, pageNumber, pageSize, orderFieldName, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = new RecordCountInfo();
        recordSum.RecordCount = EducationBll.GetEducationListCount(name);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //添加学历信息
    public void InsertEducation(HttpContext context)
    {
        //获取数据
        string name = Convert.ToString(context.Request["name"]);
        string Memo = Convert.ToString(context.Request["memo"]);
        int creatorId = Convert.ToInt32(context.Request["creatorId"]);

        //插入数据
        Education EducationBll = new Education();

        EducationInfo EducationInfo = new EducationInfo();
        EducationInfo.Name = name;
        EducationInfo.Memo = Memo;
        EducationInfo.CreatorId = creatorId;

        bool isInserted = EducationBll.EducationInsert(EducationInfo);

        //返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }

    //逻辑删除学历信息
    public void DeleteEducation(HttpContext context)
    {
        //获取数据
        EducationInfo EducationInfo = new EducationInfo();
        EducationInfo.Id = Convert.ToInt32(context.Request["id"]);
        EducationInfo.DataStatusId = 2;
        EducationInfo.ModifierId = Convert.ToInt32(context.Request["modifierId"]);

        //执行逻辑删除操作     
        Education EducationBll = new Education();
        bool isDeleted = EducationBll.EducationUpdateDataStatusIdById(EducationInfo);

        //返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }

    //更新学历信息
    public void UpdateEducationById(HttpContext context)
    {
        //获取数据
        EducationInfo EducationInfo = new EducationInfo();

        EducationInfo.Id = Convert.ToInt32(context.Request["id"]);
        EducationInfo.Name = Convert.ToString(context.Request["name"]);
        EducationInfo.Memo = Convert.ToString(context.Request["memo"]);
        EducationInfo.ModifierId = Convert.ToInt32(context.Request["modifierId"]);

        //执行逻辑删除操作     
        Education EducationBll = new Education();
        bool isUpdated = EducationBll.EducationUpdateById(EducationInfo);

        //返回
        context.Response.Write(isUpdated.ToString());
        context.Response.End();
    }

    //验证是否名称存在
    public void EducationIsExisted(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);

        //获取结果
        Education EducationBll = new Education();
        bool isExisted = EducationBll.IsExistedByName(name);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //验证Education是否已存在(排除原来学历名称，用于更新)
    public void EducationIsExistedByNewNameAndOldName(HttpContext context)
    {
        //获取参数
        string newName = Convert.ToString(context.Request["name"]);
        string oldName = Convert.ToString(context.Request["OldValue"]);

        //获取结果
        Education EducationBll = new Education();
        bool isExisted = EducationBll.IsExistedByNewNameAndOldName(newName, oldName);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //获取学历列表
    public void GetEducationNameList(HttpContext context)
    {
        //获取数据并序列化
        Education EducationBll = new Education();
        IList<EducationInfo> dataList = new List<EducationInfo>();
        dataList = EducationBll.GetEducationNameList();
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
