<%@ WebHandler Language="C#" Class="PositionHandler" %>

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

public class PositionHandler : IHttpHandler
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
    public void GetPositionList(HttpContext context)
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
    public void InsertPosition(HttpContext context)
    {
        //获取数据
        string name = Convert.ToString(context.Request["name"]);
        string Memo = Convert.ToString(context.Request["memo"]);
        int creatorId = Convert.ToInt32(context.Request["creatorId"]);

        //插入数据
        PositionProcess positionBll = new PositionProcess();

        PositionInfo positionInfo = new PositionInfo();
        positionInfo.Name = name;
        positionInfo.Memo = Memo;
        positionInfo.CreatorId = creatorId;

        bool isInserted = positionBll.InsertPosition(positionInfo);
        //返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }

    //逻辑删除人员职位信息
    public void DeletePosition(HttpContext context)
    {
        //获取数据
        PositionInfo positionInfo = new PositionInfo();
        positionInfo.Id = Convert.ToInt32(context.Request["id"]);
        positionInfo.DataStatusId = 2;
        positionInfo.ModifierId = Convert.ToInt32(context.Request["modifierId"]);

        //执行逻辑删除操作     
        PositionProcess PositionBll = new PositionProcess();
        bool isDeleted = PositionBll.DeletePosition(positionInfo);

        //返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }

    //更新人员职位信息
    public void UpdatePositionById(HttpContext context)
    {
        //获取数据
        PositionInfo positionInfo = new PositionInfo();

        positionInfo.Id = Convert.ToInt32(context.Request["id"]);
        positionInfo.Name = Convert.ToString(context.Request["name"]);
        positionInfo.Memo = Convert.ToString(context.Request["memo"]);
        positionInfo.ModifierId = Convert.ToInt32(context.Request["modifierId"]);

        //执行逻辑删除操作     
        PositionProcess positionBll = new PositionProcess();
        bool isUpdated = positionBll.UpdatePosition(positionInfo);

        //返回
        context.Response.Write(isUpdated.ToString());
        context.Response.End();
    }

    //验证是否名称存在
    public void IsExistedByName(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);

        //获取结果
        PositionProcess positionBll = new PositionProcess();
        bool isExisted =positionBll.IsExistedByName(name);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //验证Position是否已存在(排除原来人员职位名称，用于更新)
    public void IsExistedByNewNameAndOldName(HttpContext context)
    {
        //获取参数
        string newName = Convert.ToString(context.Request["name"]);
        string oldName = Convert.ToString(context.Request["OldValue"]);

        //获取结果
        PositionProcess positionBll = new PositionProcess();
        bool isExisted = positionBll.IsExistedByNewNameAndOldName(newName, oldName);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //获取人员职位列表
    public void GetPositionNameList(HttpContext context)
    {
        //获取数据并序列化
        PositionProcess positionBll = new PositionProcess();
        IList<PositionInfo> dataList = new List<PositionInfo>();
        dataList = positionBll.GetPositionNameList();
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

        PositionProcess positionBll = new PositionProcess();
        IList<PositionInfo> dataList = new List<PositionInfo>();
        dataList = positionBll.GetPositionListByOldPositionIdAndNewPositionId(oldPositionId,newPositionId);
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
