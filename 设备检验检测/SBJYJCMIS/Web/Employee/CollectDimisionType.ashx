<%@ WebHandler Language="C#" Class="CollectDimisionType" %>

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

public class CollectDimisionType : IHttpHandler
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

    //获取离职类别列表
    public void DimisionTypeGetList(HttpContext context)
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
        DimisionType DimisionTypeBll = new DimisionType();
        IList<DimisionTypeListInfo> recordList = new List<DimisionTypeListInfo>();
        recordList = DimisionTypeBll.DimisionTypeGetListPaged(name, pageNumber, pageSize, orderFieldName, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = DimisionTypeBll.DimisionTypeGetListSum(name);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //添加离职类别信息
    public void DimisionTypeInsert(HttpContext context)
    {
        //获取数据
        string name = Convert.ToString(context.Request["name"]);
        string Memo = Convert.ToString(context.Request["memo"]);
        int creatorId = Convert.ToInt32(context.Request["creatorId"]);

        //插入数据
        DimisionType DimisionTypeBll = new DimisionType();

        DimisionTypeInfo DimisionTypeInfo = new DimisionTypeInfo();
        DimisionTypeInfo.Name = name;
        DimisionTypeInfo.Memo = Memo;
        DimisionTypeInfo.CreatorId = creatorId;

        bool isInserted = DimisionTypeBll.DimisionTypeInsert(DimisionTypeInfo);

        //返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }

    //逻辑删除离职类别信息
    public void DimisionTypeDelete(HttpContext context)
    {
        //获取数据
        DimisionTypeInfo DimisionTypeInfo = new DimisionTypeInfo();
        DimisionTypeInfo.Id = Convert.ToInt32(context.Request["id"]);
        DimisionTypeInfo.DataStatusId = 2;
        DimisionTypeInfo.ModifierId = Convert.ToInt32(context.Request["modifierId"]);

        //执行逻辑删除操作     
        DimisionType DimisionTypeBll = new DimisionType();
        bool isDeleted = DimisionTypeBll.DimisionTypeUpdateDataStatusIdById(DimisionTypeInfo);

        //返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }

    //更新离职类别信息
    public void DimisionTypeUpdateById(HttpContext context)
    {
        //获取数据
        DimisionTypeInfo DimisionTypeInfo = new DimisionTypeInfo();

        DimisionTypeInfo.Id = Convert.ToInt32(context.Request["id"]);
        DimisionTypeInfo.Name = Convert.ToString(context.Request["name"]);
        DimisionTypeInfo.Memo = Convert.ToString(context.Request["memo"]);
        DimisionTypeInfo.ModifierId = Convert.ToInt32(context.Request["modifierId"]);

        //执行逻辑删除操作     
        DimisionType DimisionTypeBll = new DimisionType();
        bool isUpdated = DimisionTypeBll.DimisionTypeUpdateById(DimisionTypeInfo);

        //返回
        context.Response.Write(isUpdated.ToString());
        context.Response.End();
    }

    //验证是否名称存在
    public void DimisionTypeIsExisted(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);

        //获取结果
        DimisionType DimisionTypeBll = new DimisionType();
        bool isExisted = DimisionTypeBll.DimisionTypeIsExistedByName(name);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
          
    //验证DimisionType是否已存在(排除原来人员离职类别名称，用于更新)
    public void DimisionTypeIsExistedByNewNameAndOldName(HttpContext context)
    {
        //获取参数
        string newName = Convert.ToString(context.Request["name"]);
        string oldName = Convert.ToString(context.Request["OldValue"]);

        //获取结果
        DimisionType DimisionTypeBll = new DimisionType();
        bool isExisted = DimisionTypeBll.DimisionTypeIsExistedByNewNameAndOldName(newName, oldName);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }  

    //获取离职类别列表
    public void DimisionTypeGetNameList(HttpContext context)
    {
        //获取数据并序列化
        DimisionType DimisionTypeBll = new DimisionType();
        IList<DimisionTypeInfo> dataList = new List<DimisionTypeInfo>();
        dataList = DimisionTypeBll.DimisionTypeGetNameList();
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
