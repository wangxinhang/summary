<%@WebHandler Language="C#" Class="RegionHandler"%>

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

public class RegionHandler : IHttpHandler
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

    RegionProcess bllProcess = new RegionProcess();
    #endregion 通用

    #region 查询结果集列表

    public void GetProvinceList(HttpContext context)
    {
        IList<RegionShortInfo> recordList = bllProcess.GetProvinceList();
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);
        context.Response.Write(jsonRecordSet);
        context.Response.End();
    }

    public void GetTopNLevelRegionList(HttpContext context)
    {
        IList<RegionShortInfo> recordList = bllProcess.GetTopNLevelRegionList(2);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);
        context.Response.Write(jsonRecordSet);
        context.Response.End();
    }

    //根据查询结果集RegionList
    public void GetRegionList(HttpContext context)
    {
        //获取参数
        string id = Convert.ToString(context.Request["id"]);
        string name = Convert.ToString(context.Request["name"]);
        string parentId = Convert.ToString(context.Request["parentId"]);
        string pinYin = Convert.ToString(context.Request["pinYin"]);

        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Name" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        IList<RegionShortInfo> recordList = bllProcess.GetRegionListUnPaged(id, name, parentId, pinYin,orderField, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        context.Response.Write(jsonRecordSet);
        context.Response.End();
    }

    public void GetRegionListByShortID(HttpContext context)
    {
        string id = Convert.ToString(context.Request["id"]);
        int length = Convert.ToInt32(context.Request["length"]);
        int hasSelf = Convert.ToInt32(context.Request["hasSelf"]);
        //获取数据列表
        IList<RegionShortInfo> recordList = bllProcess.GetRegionListByShortId(id, length, hasSelf);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);
        context.Response.Write(jsonRecordSet);
        context.Response.End();
    }

    public void GetNextLevelRegionList(HttpContext context)
    {
        string id = Convert.ToString(context.Request["id"]);
        int hasSelf = Convert.ToInt32(context.Request["hasSelf"]);
        //获取数据列表
        IList<RegionShortInfo> recordList = bllProcess.GetNextLevelRegionList(id, hasSelf);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);
        context.Response.Write(jsonRecordSet);
        context.Response.End();
    }

    public void GetSubRegionListByID(HttpContext context)
    {
        string id = Convert.ToString(context.Request["id"]);
        int hasSelf = Convert.ToInt32(context.Request["hasSelf"]);
        //获取数据列表
        IList<RegionShortInfo> recordList = bllProcess.GetSubRegionList(id, hasSelf);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);
        context.Response.Write(jsonRecordSet);
        context.Response.End();
    }

    public void GetNextLevelRegionListForGV(HttpContext context)
    {
        string id = Convert.ToString(context.Request["regionId"]);
        int hasSelf = Convert.ToInt32(context.Request["hasSelf"]);
        //获取数据列表
        IList<RegionShortInfo> recordList = bllProcess.GetNextLevelRegionList(id, hasSelf);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);
        RecordCountInfo recordSum = new RecordCountInfo();
        recordSum.RecordCount = recordList.Count;
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);
        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
    public void InsertRegion(HttpContext context)
    {
        string id = context.Request["id"].ToString();
        string parentId = context.Request["parentId"].ToString();
        string name = context.Request["name"].ToString();
        string shortName = context.Request["shortName"].ToString();
        string pinyin = context.Request["pinyin"].ToString();
        string cityCode = context.Request["cityCode"].ToString();
        string zipCode = context.Request["zipCode"].ToString();
        string longitudeStr = context.Request["longitude"].ToString();
        string latitudeStr = context.Request["latitude"].ToString();
        longitudeStr = longitudeStr == "" ? "0" : longitudeStr;
        latitudeStr = latitudeStr == "" ? "0" : latitudeStr;
        decimal longitude = Convert.ToDecimal(longitudeStr);
        decimal latitude =  Convert.ToDecimal(latitudeStr);
        RegionInfo ri = new RegionInfo();
        ri.Id = id;
        ri.ParentId = parentId;
        ri.Name = name;
        ri.ShortName = shortName;
        ri.Pinyin = pinyin;
        ri.CityCode = cityCode;
        ri.ZipCode = zipCode;
        ri.Longitude = longitude;
        ri.Latitude = latitude;
        bool isOk = bllProcess.InsertRegion(ri);
        context.Response.Write(JsonConvert.SerializeObject(isOk));
        context.Response.End();
    }

    public void UpdateRegion(HttpContext context)
    {
        int idd = Convert.ToInt32(context.Request["idd"].ToString());
        string id = context.Request["id"].ToString();
        string parentId = context.Request["parentId"].ToString();
        string name = context.Request["name"].ToString();
        string shortName = context.Request["shortName"].ToString();
        string pinyin = context.Request["pinyin"].ToString();
        string cityCode = context.Request["cityCode"].ToString();
        string zipCode = context.Request["zipCode"].ToString();
        string longitudeStr = context.Request["longitude"].ToString();
        string latitudeStr = context.Request["latitude"].ToString();
        longitudeStr = longitudeStr == "" ? "0" : longitudeStr;
        latitudeStr = latitudeStr == "" ? "0" : latitudeStr;
        decimal longitude = Convert.ToDecimal(longitudeStr);
        decimal latitude =  Convert.ToDecimal(latitudeStr);
        RegionInfo ri = new RegionInfo();
        ri.Idd = idd;
        ri.Id = id;
        ri.ParentId = parentId;
        ri.Name = name;
        ri.ShortName = shortName;
        ri.Pinyin = pinyin;
        ri.CityCode = cityCode;
        ri.ZipCode = zipCode;
        ri.Longitude = longitude;
        ri.Latitude = latitude;
        bool isOk = bllProcess.UpdateRegion(ri);
        context.Response.Write(JsonConvert.SerializeObject(isOk));
        context.Response.End();
    }

    public void DeleteRegion(HttpContext context)
    {
        int idd = Convert.ToInt32(context.Request["idd"].ToString());
        RegionInfo ri = new RegionInfo();
        ri.Idd = idd;
        bool isOk = bllProcess.DeleteRegion(ri);
        context.Response.Write(JsonConvert.SerializeObject(isOk));
        context.Response.End();
    }

    public void IsExistedNewName(HttpContext context)
    {
        int idd = Convert.ToInt32(context.Request["idd"]);
        string name = Convert.ToString(context.Request["name"]);
        bool isExisted = bllProcess.IsExistedNewName(name,idd);
        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    public void IsExistedNewShortName(HttpContext context)
    {
        int idd = Convert.ToInt32(context.Request["idd"]);
        string name = Convert.ToString(context.Request["name"]);
        bool isExisted = bllProcess.IsExistedNewShortName(name,idd);
        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
    public void IsExistedName(HttpContext context)
    {
        string name = Convert.ToString(context.Request["name"]);
        bool isExisted = bllProcess.IsExistedName(name);
        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    public void IsExistedShortName(HttpContext context)
    {
        string name = Convert.ToString(context.Request["name"]);
        bool isExisted = bllProcess.IsExistedShortName(name);
        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    public void IsExistedRegion(HttpContext context)
    {
        string id = Convert.ToString(context.Request["id"]);
        string parentId = Convert.ToString(context.Request["parentId"]);
        id = parentId + id;
        bool isExisted = bllProcess.IsExistedRegion(id);
        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
    public void GetRegionListByID(HttpContext context)
    {
        string id = Convert.ToString(context.Request["id"]);
        int hasSelf = Convert.ToInt32(context.Request["hasSelf"]);
        //获取数据列表

        IList<RegionShortInfo> recordList = bllProcess.GetSubRegionList(id, hasSelf);
        var jList = recordList.Select(t => new
        {
            Id = t.Id,
            Name = t.Name,
            ParentId=t.ParentId
        });

        //序列化后返回
        string jsonString = JsonConvert.SerializeObject(jList);
        context.Response.Write(jsonString);
        context.Response.End();
    }

    #endregion
}
