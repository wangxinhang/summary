<%@ WebHandler Language="C#" Class="CollectEmployeeBaseSet" %>

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

public class CollectEmployeeBaseSet : IHttpHandler
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

    //获取人员职位列表
    public void PositionGetList(HttpContext context)
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
        PositionProcess positionBll = new PositionProcess();
        IList<PositionListInfo> recordList = new List<PositionListInfo>();
        recordList = positionBll.GetPositionListPaged(name, pageNumber, pageSize, orderFieldName, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = new RecordCountInfo();
        recordSum.RecordCount = positionBll.GetPositionListCount(name);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //添加人员职位信息
    public void PositionInsert(HttpContext context)
    {
        //获取数据
        string name = Convert.ToString(context.Request["name"]);
        string Memo = Convert.ToString(context.Request["memo"]);
        int creatorId = Convert.ToInt32(context.Request["creatorId"]);

        //插入数据
        PositionProcess PositionBll = new PositionProcess();

        PositionInfo PositionInfo = new PositionInfo();
        PositionInfo.Name = name;
        PositionInfo.Memo = Memo;
        PositionInfo.CreatorId = creatorId;

        bool isInserted = PositionBll.InsertPosition(PositionInfo);

        //返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }

    //逻辑删除人员职位信息
    public void PositionDelete(HttpContext context)
    {
        //获取数据
        PositionInfo PositionInfo = new PositionInfo();
        PositionInfo.Id = Convert.ToInt32(context.Request["id"]);
        PositionInfo.DataStatusId = 2;
        PositionInfo.ModifierId = Convert.ToInt32(context.Request["modifierId"]);

        //执行逻辑删除操作     
        PositionProcess PositionBll = new PositionProcess();
        bool isDeleted = PositionBll.DeletePosition(PositionInfo);

        //返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }

    //更新人员职位信息
    public void PositionUpdateById(HttpContext context)
    {
        //获取数据
        PositionInfo PositionInfo = new PositionInfo();

        PositionInfo.Id = Convert.ToInt32(context.Request["id"]);
        PositionInfo.Name = Convert.ToString(context.Request["name"]);
        PositionInfo.Memo = Convert.ToString(context.Request["memo"]);
        PositionInfo.ModifierId = Convert.ToInt32(context.Request["modifierId"]);

        //执行逻辑删除操作     
        PositionProcess PositionBll = new PositionProcess();
        bool isUpdated = PositionBll.UpdatePosition(PositionInfo);

        //返回
        context.Response.Write(isUpdated.ToString());
        context.Response.End();
    }

    //验证是否名称存在
    public void PositionIsExisted(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);

        //获取结果
        PositionProcess PositionBll = new PositionProcess();
        bool isExisted = PositionBll.IsExistedByName(name);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //验证Position是否已存在(排除原来人员职位名称，用于更新)
    public void PositionIsExistedByNewNameAndOldName(HttpContext context)
    {
        //获取参数
        string newName = Convert.ToString(context.Request["name"]);
        string oldName = Convert.ToString(context.Request["OldValue"]);

        //获取结果
        PositionProcess PositionBll = new PositionProcess();
        bool isExisted = PositionBll.IsExistedByNewNameAndOldName(newName, oldName);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //获取人员职位列表
    public void PositionGetNameList(HttpContext context)
    {
        //获取数据并序列化
        PositionProcess PositionBll = new PositionProcess();
        IList<PositionInfo> dataList = new List<PositionInfo>();
        dataList = PositionBll.GetPositionNameList();
        var jList = dataList.Select(t => new
        {
            Id = t.Id,
            Name = t.Name
        });

        string jsonString = JsonConvert.SerializeObject(jList);
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //获取人员职位列表
    public void PositionGetListByOldPositionIdAndNewPositionId(HttpContext context)
    {
        //获取数据并序列化
        int oldPositionId = (context.Request["oldPositionId"] == null) ? 0 : Convert.ToInt32(context.Request["oldPositionId"]);
        int newPositionId = (context.Request["newPositionId"] == null) ? 0 : Convert.ToInt32(context.Request["newPositionId"]);

        PositionProcess PositionBll = new PositionProcess();
        IList<PositionInfo> dataList = new List<PositionInfo>();
        dataList = PositionBll.GetPositionListByOldPositionIdAndNewPositionId(oldPositionId,newPositionId);
        var jList = dataList.Select(t => new
        {
            Id = t.Id,
            Name = t.Name
        });

        string jsonString = JsonConvert.SerializeObject(jList);
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //获取学历列表
    public void EducationGetList(HttpContext context)
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
    public void EducationInsert(HttpContext context)
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
    public void EducationDelete(HttpContext context)
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
    public void EducationUpdateById(HttpContext context)
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
    public void EducationGetNameList(HttpContext context)
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
