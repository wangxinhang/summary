<%@ WebHandler Language="C#" Class="DepartmentTypeHandle" %>

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

public class DepartmentTypeHandle : IHttpHandler
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

    //获取单位类别列表
    public void DepartmentTypeGetList(HttpContext context)
    {
        //获取参数
        int xuserId = (context.Request["xuserId"] == null) ? 0 : Convert.ToInt32(context.Request["xuserId"]);
        string name = (context.Request["name"] == null) ? null : (context.Request["name"]);
        int parentId = (context.Request["parentId"] == null) ? 10000 : Convert.ToInt32(context.Request["parentId"]);
        int dataStatusId = (context.Request["dataStatusId"] == null) ? 1 : Convert.ToInt32(context.Request["dataStatusId"]);

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 20 : Convert.ToInt32(context.Request["pageSize"]);
        string orderFieldName = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? null : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? null : Convert.ToString(context.Request["orderType"]);
        //string orderFieldName = "ID";
        //string orderType = "DESC";

        //获取数据列表
        DepartmentTypeProcess departmentTypeBll = new DepartmentTypeProcess();
        IList<DepartmentTypeViewInfo> recordList = new List<DepartmentTypeViewInfo>();
        recordList = departmentTypeBll.GetDepartmentTypeListPaged(name,parentId, pageNumber, pageSize, orderFieldName, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = new RecordCountInfo();
        recordSum.RecordCount = departmentTypeBll.GetDepartmentTypeListCount(name,parentId);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //添加单位类别信息
    public void DepartmentTypeInsert(HttpContext context)
    {
        //获取数据
        string name = Convert.ToString(context.Request["Name"]);
        int parentId = (context.Request["ParentId"] == null) ? 0 : Convert.ToInt32(context.Request["ParentId"]);
        string Memo = Convert.ToString(context.Request["Memo"]);
        int creatorId = Convert.ToInt32(context.Request["CreatorId"]);

        //插入数据
        DepartmentTypeProcess departmentTypeBll = new DepartmentTypeProcess();

        DepartmentTypeViewInfo dtvi = new DepartmentTypeViewInfo();
        dtvi.Name = name;
        dtvi.ParentId = parentId;
        dtvi.Memo = Memo;
        dtvi.CreatorId = creatorId;

        bool isInserted = departmentTypeBll.InsertDepartmentType(dtvi);

        //返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }

    //逻辑删除单位类别信息
    public void DepartmentTypeDelete(HttpContext context)
    {
        //获取数据
        DepartmentTypeViewInfo dtvi = new DepartmentTypeViewInfo();
        dtvi.Id = Convert.ToInt32(context.Request["id"]);
        dtvi.DataStatusId = 2;
        dtvi.ModifierId = Convert.ToInt32(context.Request["modifierId"]);

        //执行逻辑删除操作     
        DepartmentTypeProcess departmentTypeBll = new DepartmentTypeProcess();
        bool isDeleted = departmentTypeBll.DeleteDepartmentType(dtvi);

        //返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }

    //更新单位类别信息
    public void DepartmentTypeUpdateById(HttpContext context)
    {
        //获取数据
        DepartmentTypeViewInfo dtvi = new DepartmentTypeViewInfo();

        dtvi.Id = Convert.ToInt32(context.Request["Id"]);
        dtvi.Name = Convert.ToString(context.Request["Name"]);
        dtvi. ParentId = (context.Request["ParentId"] == null) ? 0 : Convert.ToInt32(context.Request["ParentId"]);
        dtvi.Memo = Convert.ToString(context.Request["Memo"]);
        dtvi.ModifierId = Convert.ToInt32(context.Request["ModifierId"]);

        //执行逻辑删除操作     
        DepartmentTypeProcess departmentTypeBll = new DepartmentTypeProcess();
        bool isUpdated = departmentTypeBll.UpdateDepartmentType(dtvi);

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
        //bool isExisted = bllProcess.ResourceTypeIsExistedByName(name);
        DepartmentTypeProcess departmentTypeBll = new DepartmentTypeProcess();
        bool isExisted = departmentTypeBll.IsExistedByName(name);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //验证DepartmentType是否已存在(排除原来单位类别名称，用于更新)
    public void IsExistedByNewNameAndOldName(HttpContext context)
    {
        //获取参数
        string newName = Convert.ToString(context.Request["name"]);
        string oldName = Convert.ToString(context.Request["OldValue"]);

        //获取结果
        DepartmentTypeProcess departmentTypeBll = new DepartmentTypeProcess();
        bool isExisted = departmentTypeBll.IsExistedByNewNameAndOldName(newName, oldName);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //获取单位类别列表
    public void GetDepartmentTypeNameList(HttpContext context)
    {
        //获取数据并序列化
        DepartmentTypeProcess departmentTypeBll = new DepartmentTypeProcess();
        IList<DepartmentTypeViewInfo> list = departmentTypeBll.GetDepartmentTypeList();
        var jList = list.Select(t => new
        {
            Id = t.Id,
            Name = t.Name
        });

        string jsonString = JsonConvert.SerializeObject(jList);
        context.Response.Write(jsonString);
        context.Response.End();
    }
    //获取用户权限下所欲所属单位类别列表
    //public void ParentDepartmentTypeGetList(HttpContext context)
    //{
    //    //获取数据列表
    //    DepartmentType departmentTypeBll = new DepartmentType();
    //    IList<DepartmentTypeInfo> DepartmentList = new List<DepartmentTypeInfo>();
    //    DepartmentList = departmentTypeBll.DepartmentTypeGetParentList();
    //    var jList = DepartmentList.Select(t => new
    //    {
    //        Id = t.Id,
    //        Name = t.Name
    //    });

    //    //序列化后返回
    //    string jsonString = JsonConvert.SerializeObject(jList);
    //    context.Response.Write(jsonString);
    //    context.Response.End();
    //}

}
