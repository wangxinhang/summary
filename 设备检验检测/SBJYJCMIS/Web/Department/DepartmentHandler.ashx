<%@ WebHandler Language="C#" Class="DepartmentHandler" %>
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

public class DepartmentHandler : IHttpHandler{
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

    //获取部门列表
    public void GetDepartmentList(HttpContext context)
    {
        //获取参数
        int xuserId = (context.Request["xuserId"] == null) ? 0 : Convert.ToInt32(context.Request["xuserId"]);
        int parentId = (context.Request["parentId"] == null) ? 0 : Convert.ToInt32(context.Request["parentId"]);
        string leader = (context.Request["leader"] == null) ? "" : (context.Request["leader"].ToString());
        string name = (context.Request["name"] == null) ? "" : (context.Request["name"].ToString());
        int departmentTypeId = (context.Request["departmentTypeId"] == null) ? 0 : Convert.ToInt32(context.Request["departmentTypeId"]);
        int propertyId = (context.Request["propertyId"] == null) ? 0 : Convert.ToInt32(context.Request["propertyId"]);
        int dataStatusId = (context.Request["dataStatusId"] == null) ? 1 : Convert.ToInt32(context.Request["dataStatusId"]);
        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 20 : Convert.ToInt32(context.Request["pageSize"]);
        string orderFieldName = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "" : Convert.ToString(context.Request["orderType"]);
        //获取数据列表
        DepartmentProcess departmentProcess = new DepartmentProcess();
        IList<DepartmentViewInfo> recordList = new List<DepartmentViewInfo>();
        recordList = departmentProcess.GetDepartmentListPaged(xuserId,name, parentId,  departmentTypeId, propertyId,leader, dataStatusId, pageNumber, pageSize, orderFieldName, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = new RecordCountInfo();
        recordSum.RecordCount = departmentProcess.GetDepartmentListCount(xuserId,name, parentId,  departmentTypeId, propertyId,leader, dataStatusId);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //public void GetSubDepartmentList(HttpContext context)
    //{
    //    //获取参数
    //    int xuserId = (context.Request["xuserId"] == null) ? 0 : Convert.ToInt32(context.Request["xuserId"]);
    //    int parentId = (context.Request["parentId"] == null) ? 0 : Convert.ToInt32(context.Request["parentId"]);
    //    string leader = (context.Request["leader"] == null) ? null : (context.Request["leader"]);
    //    string name = (context.Request["name"] == null) ? null : (context.Request["name"]);
    //    int departmentTypeId = (context.Request["departmentTypeId"] == null) ? 0 : Convert.ToInt32(context.Request["departmentTypeId"]);
    //    int propertyId = (context.Request["propertyId"] == null) ? 0 : Convert.ToInt32(context.Request["propertyId"]);
    //    int dataStatusId = (context.Request["dataStatusId"] == null) ? 1 : Convert.ToInt32(context.Request["dataStatusId"]);
    //    int hasPermission = (context.Request["hasPermission"] == null) ? 0 : Convert.ToInt32(context.Request["hasPermission"]);
    //    int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
    //    int pageSize = (context.Request["pageSize"] == null) ? 20 : Convert.ToInt32(context.Request["pageSize"]);
    //    string orderFieldName = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? null : Convert.ToString(context.Request["orderField"]);
    //    string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? null : Convert.ToString(context.Request["orderType"]);
    //    //string orderFieldName = "ID";
    //    //string orderType = "DESC";

    //    //获取数据列表
    //    DepartmentProcess departmentBll = new DepartmentProcess();
    //    IList<DepartmentViewInfo> recordList = new List<DepartmentViewInfo>();
    //    recordList = departmentBll.GetDepartmentSubListPaged(name, parentId, departmentTypeId, propertyId,leader, dataStatusId, pageNumber, pageSize, orderFieldName, orderType);
    //    string jsonRecordSet = JsonConvert.SerializeObject(recordList);

    //    RecordCountInfo recordSum = new RecordCountInfo();
    //    recordSum.RecordCount = departmentBll.GetSubDepartmentListCount(name, parentId, departmentTypeId, propertyId,leader, dataStatusId);
    //    string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

    //    string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
    //    context.Response.Write(jsonString);
    //    context.Response.End();
    //}

    public void GetSubDepartmentListSimple(HttpContext context)
    {
        //获取参数
        int deptId = (context.Request["parentId"] == null) ? 0 : Convert.ToInt32(context.Request["parentId"]);

        //获取数据列表
        DepartmentProcess departmentBll = new DepartmentProcess();
        IList<DepartmentInfo> departmentList = new List<DepartmentInfo>();
        departmentList = departmentBll.GetSubDepartmentList(deptId,true);
        var jList = departmentList.Select(t => new
        {
            Id = t.Id,
            Name = t.Name,
            ParentId = t.ParentId
        });
        context.Response.Write(JsonConvert.SerializeObject(jList));
        context.Response.End();
    }

    //添加部门信息
    public void InsertDepartment(HttpContext context)
    {
        //获取数据
        int parentDepartmentId = Convert.ToInt32(context.Request["parentDepartmentId"]);
        int leaderId = Convert.ToInt32(context.Request["leaderId"]);
        int departmentTypeId = Convert.ToInt32(context.Request["departmentTypeId"]);
        string regionId = Convert.ToString(context.Request["regionId"]);
        string name = Convert.ToString(context.Request["name"]);
        string shortName = Convert.ToString(context.Request["shortName"]);
        int propertyId = Convert.ToInt32(context.Request["propertyId"]);
        string memo = Convert.ToString(context.Request["memo"]);
        int creatorId = Convert.ToInt32(context.Request["creatorId"]);
        decimal longitude = (context.Request["longitude"] == null) ? 0 : Convert.ToDecimal(context.Request["longitude"]);
        decimal latitude = (context.Request["latitude"] == null) ? 0 : Convert.ToDecimal(context.Request["latitude"]);

        //插入数据
        DepartmentProcess departmentBll = new DepartmentProcess();

        DepartmentInfo departmentInfo = new DepartmentInfo();
        departmentInfo.LeaderId = leaderId;
        departmentInfo.DepartmentTypeId = departmentTypeId;
        departmentInfo.RegionId = regionId;
        departmentInfo.Name = name;
        departmentInfo.ShortName = shortName;
        departmentInfo.ParentId = parentDepartmentId;
        departmentInfo.PropertyId = propertyId;
        departmentInfo.Memo = memo;
        departmentInfo.CreatorId = creatorId;
        departmentInfo.Longitude = longitude;
        departmentInfo.Latitude = latitude;


        bool isInserted = departmentBll.InsertDepartment(departmentInfo);
        string jsonString=new JObject(new JProperty("isInserted", isInserted)).ToString();
        //返回
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //验证是否存在
    public void IsExistedByName(HttpContext context)
    {
        DepartmentProcess departmentBll = new DepartmentProcess();
        //获取参数
        string name = Convert.ToString(context.Request["name"]);
        int parentId = Convert.ToInt32(context.Request["parentId"]);
        int departmentTypeId = Convert.ToInt32(context.Request["departmentTypeId"]);

        //获取结果
        bool isExisted = departmentBll.IsExistedByName(name, parentId, departmentTypeId);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //根据部门名称验证部门是否存在(排除原来部门名称，用于更新)
    public void IsExistedByNewNameAndOldName(HttpContext context)
    {
        DepartmentProcess departmentBll = new DepartmentProcess();
        //获取参数
        string newName = Convert.ToString(context.Request["name"]);
        string oldName = Convert.ToString(context.Request["OldValue"]);
        int parentId = Convert.ToInt32(context.Request["parentId"]);
        int departmentTypeId = Convert.ToInt32(context.Request["departmentTypeId"]);

        //获取结果
        bool isExisted = departmentBll.IsExistedByNewNameAndOldName(newName, oldName, parentId, departmentTypeId);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }


    //验证是否名称存在
    public void GetDataStatusIdByNameAndParentId(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);
        int parentId = Convert.ToInt32(context.Request["parentId"]);
        int departmentTypeId = Convert.ToInt32(context.Request["departmentTypeId"]);
        //获取结果
        DepartmentProcess departmentBll = new DepartmentProcess();
        int dataStatusId = departmentBll.GetDataStatusIdByNameAndParentId(name, parentId, departmentTypeId);
        bool dataStatusId1 = Convert.ToBoolean(dataStatusId);

        string jsonString = new JObject(new JProperty("isExisted", dataStatusId1)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //验证Department是否已存在(排除原来部门名称，用于更新)
    public void GetDataStatusIdByNewNameAndOldName(HttpContext context)
    {
        //获取参数
        string newName = Convert.ToString(context.Request["name"]);
        string oldName = Convert.ToString(context.Request["oldName"]);
        int parentId = Convert.ToInt32(context.Request["parentId"]);
        int departmentTypeId = Convert.ToInt32(context.Request["departmentTypeId"]);

        //获取结果
        DepartmentProcess departmentBll = new DepartmentProcess();
        int dataStatusId = departmentBll.GetDataStatusIdByNewNameAndOldName(newName, oldName, parentId,departmentTypeId);

        string jsonString = new JObject(new JProperty("dataStatusId", dataStatusId)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //逻辑删除部门信息
    public void DeleteDepartment(HttpContext context)
    {
        //获取数据
        DepartmentInfo DepartmentInfo = new DepartmentInfo();
        DepartmentInfo.Id = Convert.ToInt32(context.Request["id"]);
        DepartmentInfo.DataStatusId = 2;
        DepartmentInfo.ModifierId = Convert.ToInt32(context.Request["modifierId"]);

        //执行逻辑删除操作     
        DepartmentProcess departmentBll = new DepartmentProcess();
        bool isDeleted = departmentBll.DeleteDepartment(DepartmentInfo);

        //返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }

    //更新部门信息
    public void UpdateDepartment(HttpContext context)
    {
        decimal longitude = ((context.Request["longitude"] == null)||(context.Request["longitude"] == "")) ? 0 : Convert.ToDecimal(context.Request["longitude"]);
        decimal latitude = ((context.Request["latitude"] == null)||(context.Request["latitude"] == "")) ? 0 : Convert.ToDecimal(context.Request["latitude"]);
        //获取数据
        DepartmentInfo DepartmentInfo = new DepartmentInfo();

        DepartmentInfo.Id = Convert.ToInt32(context.Request["Id"]);
        DepartmentInfo.ParentId = Convert.ToInt32(context.Request["ParentId"]);
        DepartmentInfo.LeaderId = Convert.ToInt32(context.Request["LeaderId"]); ;
        DepartmentInfo.RegionId = Convert.ToString(context.Request["RegionId"]);
        DepartmentInfo.Name = Convert.ToString(context.Request["Name"]);
        DepartmentInfo.ShortName = Convert.ToString(context.Request["ShortName"]);
        DepartmentInfo.DepartmentTypeId = Convert.ToInt32(context.Request["DepartmentTypeId"]);
        //DepartmentInfo.DepartmentTypeId = 0;
        DepartmentInfo.PropertyId = Convert.ToInt32(context.Request["PropertyId"]);
        DepartmentInfo.Memo = Convert.ToString(context.Request["Memo"]);
        DepartmentInfo.ModifierId = Convert.ToInt32(context.Request["ModifierId"]);
        DepartmentInfo.Longitude = longitude;
        DepartmentInfo.Latitude = latitude;
        //执行逻辑删除操作     
        DepartmentProcess departmentBll = new DepartmentProcess();
        bool isUpdated = departmentBll.UpdateDepartment(DepartmentInfo);

        string jsonString=new JObject(new JProperty("isUpdated", isUpdated)).ToString();
        //序列化后返回
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //获取用户权限下上级部门列表
    public void GetParentDepartmentList(HttpContext context)
    {
        //获取数据列表
        int departmentTypeId = (context.Request["DepartmentTypeId"] == null) ? 0 : Convert.ToInt32(context.Request["DepartmentTypeId"]);
        DepartmentProcess departmentBll = new DepartmentProcess();
        IList<DepartmentInfo> list = new List<DepartmentInfo>();
        list = departmentBll.GetParentDepartmentList(departmentTypeId);
        var jList = list.Select(t => new
        {
            Id = t.Id,
            Name = t.Name,
            ParentId = t.ParentId
        });

        //序列化后返回
        string jsonString = JsonConvert.SerializeObject(jList);
        context.Response.Write(jsonString);
        context.Response.End();
    }

    ////根据查询结果集AdministrativeDivisionList
    //public void AdministrativeDivisionGetList(HttpContext context)
    //{
    //    //获取参数
    //    string id = Convert.ToString(context.Request["id"]);
    //    string name = Convert.ToString(context.Request["name"]);
    //    string parentId = Convert.ToString(context.Request["parentId"]);
    //    string pinYin = Convert.ToString(context.Request["pinYin"]);
    //    string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Name" : Convert.ToString(context.Request["orderField"]);
    //    string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

    //    //获取数据列表
    //    AdministrativeDivision bllProcess = new AdministrativeDivision();
    //    IList<AdministrativeDivisionListInfo> recordList = bllProcess.AdministrativeDivisionGetListUnPaged(id, name, parentId, pinYin, orderField, orderType);
    //    var jList = recordList.Select(t => new
    //    {
    //        Id = t.Id,
    //        Name = t.Name
    //    });
    //    string jsonString = JsonConvert.SerializeObject(jList);
    //    context.Response.Write(jsonString);
    //    context.Response.End();
    //}

    //根据部门类别获取部门列表
    public void GetDepartmentListByDepartmentTypeId(HttpContext context)
    {
        //获取数据列表
        DepartmentProcess departmentBll = new DepartmentProcess();
        IList<DepartmentInfo> DepartmentList = new List<DepartmentInfo>();
        string departmentTypeId = (context.Request["departmentTypeId"] == null) ? "0" : context.Request["departmentTypeId"].ToString();
        DepartmentList = departmentBll.GetAllDepartmentList(departmentTypeId);
        var jList = DepartmentList.Select(t => new
        {
            Id = t.Id,
            Name = t.Name,
            ParentId = t.ParentId
        });

        //序列化后返回
        string jsonString = JsonConvert.SerializeObject(jList);
        context.Response.Write(jsonString);
        context.Response.End();
    }

    public void GetDepartmentListByDepartmentTypeIdForGV(HttpContext context)
    {
        //获取数据列表
        DepartmentProcess departmentBll = new DepartmentProcess();
        IList<DepartmentInfo> DepartmentList = new List<DepartmentInfo>();
        string departmentTypeId = (context.Request["departmentTypeId"] == null) ? "0" : context.Request["departmentTypeId"].ToString();
        DepartmentList = departmentBll.GetAllDepartmentList(departmentTypeId);
        var jList = DepartmentList.Select(t => new
        {
            Id = t.Id,
            Name = t.Name,
            ParentId = t.ParentId,
            ParentName = t.ParentName
        });

        //序列化后返回
        string jsonRecordSet = JsonConvert.SerializeObject(jList);
        RecordCountInfo recordSum = new RecordCountInfo();
        recordSum.RecordCount = jList.ToList().Count;
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();

    }

    //根据上级部门Id获取子部门权限部门列表
    //public void DepartmentGetNameListByParentId(HttpContext context)
    //{
    //    //获取数据列表
    //    Department departmentBll = new Department();
    //    IList<DepartmentInfo> DepartmentList = new List<DepartmentInfo>();
    //    int xuserId = (context.Request["XuserId"] == null) ? 0 : Convert.ToInt32(context.Request["XuserId"]);
    //    int parentId = (context.Request["ParentId"] == null) ? 0 : Convert.ToInt32(context.Request["ParentId"]);
    //    DepartmentList = departmentBll.DepartmentGetNameListByParentId(xuserId, parentId);
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

    ////获取部门名称列表
    //public void DepartmentGetNameList(HttpContext context)
    //{
    //    //获取数据列表
    //    Department departmentBll = new Department();
    //    IList<DepartmentInfo> DepartmentList = new List<DepartmentInfo>();
    //    DepartmentList = departmentBll.DepartmentGetNameList();
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

    ////获取用户权限范围内的部门列表
    //public void GetDepartmentList(HttpContext context)
    //{
    //    //获取参数
    //    int xuserId = (context.Request["xuserId"] == null) ? 0 : Convert.ToInt32(context.Request["xuserId"]);

    //    //获取数据并序列化
    //    Department departmentBll = new Department();
    //    IList<DepartmentViewInfo> jList = new List<DepartmentViewInfo>();
    //    jList = departmentBll.DepartmentGetListByXuserId(xuserId, 0);

    //    string jsonString = JsonConvert.SerializeObject(jList);
    //    context.Response.Write(jsonString);
    //    context.Response.End();
    //}

    public void DepartmentGetListByOldDepartmentIdAndNewDepartmentId(HttpContext context)
    {
        //获取参数
        int xuserId = (context.Request["xuserId"] == null) ? 0 : Convert.ToInt32(context.Request["xuserId"]);
        int oldDepartmentId = (context.Request["oldDepartmentId"] == null) ? 0 : Convert.ToInt32(context.Request["oldDepartmentId"]);
        int newDepartmentId = (context.Request["newDepartmentId"] == null) ? 0 : Convert.ToInt32(context.Request["newDepartmentId"]);

        //获取数据并序列化
        DepartmentProcess departmentBll = new DepartmentProcess();
        IList<DepartmentViewInfo> DepartmentList = new List<DepartmentViewInfo>();
        DepartmentList = departmentBll.DepartmentGetListByOldDepartmentIdAndNewDepartmentId(xuserId, oldDepartmentId, newDepartmentId);

        string jsonString = JsonConvert.SerializeObject(DepartmentList);
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //逻辑删除频率信息
    public void DeleteDepartmentById(HttpContext context)
    {
        //获取数据
        DepartmentInfo DepartmentInfo = new DepartmentInfo();
        DepartmentInfo.Id = Convert.ToInt32(context.Request["id"]);
        DepartmentInfo.DataStatusId = Convert.ToInt32(context.Request["dataStatusId"]);
        DepartmentInfo.ModifierId = Convert.ToInt32(context.Request["modifierId"]);

        //执行逻辑删除操作     
        DepartmentProcess departmentBll = new DepartmentProcess();
        bool isReseted = departmentBll.DeleteDepartment(DepartmentInfo);

        string jsonString = new JObject(new JProperty("isReseted", isReseted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    ////获取用户权限范围内的部门列表
    //public void RoleListByXuserIdAndDepartmentId(HttpContext context)
    //{
    //    //获取参数
    //    int xuserId = (context.Request["xuserId"] == null) ? 0 : Convert.ToInt32(context.Request["xuserId"]);
    //    int departmentId = (context.Request["departmentId"] == null) ? 0 : Convert.ToInt32(context.Request["departmentId"]);
    //    int tradeTypeId = (context.Request["tradeTypeId"] == null) ? 0 : Convert.ToInt32(context.Request["tradeTypeId"]);
    //    int departmentDataTypeId = (context.Request["departmentDataTypeId"] == null) ? 1 : Convert.ToInt32(context.Request["departmentDataTypeId"]);

    //    //获取数据并序列化
    //    Department departmentBll = new Department();
    //    IList<DepartmentViewInfo> DepartmentList = new List<DepartmentViewInfo>();

    //    DepartmentList = departmentBll.RoleListByXuserIdAndDepartmentId(xuserId, departmentId, tradeTypeId, departmentDataTypeId);
    //    var jList = DepartmentList.Select(t => new
    //    {
    //        Id = t.RoleId,
    //        Name = t.Role
    //    });

    //    //序列化后返回
    //    string jsonString = JsonConvert.SerializeObject(jList);
    //    context.Response.Write(jsonString);
    //    context.Response.End();
    //}

    ////根据用户Id获取权限部门数量
    //public void DepartmentGetPermissionDepartmentCountByXuserId(HttpContext context)
    //{
    //    //获取参数
    //    int xuserId = Convert.ToInt32(context.Request["xuserId"]);

    //    //获取结果
    //    Department departmentBll = new Department();
    //    int departmentCount = departmentBll.DepartmentGetPermissionDepartmentCountByXuserId(xuserId);

    //    string jsonString = new JObject(new JProperty("departmentCount", departmentCount)).ToString();
    //    context.Response.Write(jsonString);
    //    context.Response.End();
    //}

    #region 部门树列表 2017-7-17
    //public void DepartmentGetTypeTreeList(HttpContext context)
    //{
    //    //获取参数
    //    int xuserId = (context.Request["xuserId"] == null) ? 0 : Convert.ToInt32(context.Request["xuserId"]);
    //    int departmentId = (context.Request["departmentId"] == null) ? 0 : Convert.ToInt32(context.Request["departmentId"]);
    //    string departmentTypeId = (context.Request["departmentTypeId"] == null) ? "" : context.Request["departmentTypeId"].ToString();
    //    int hasPermission = (context.Request["hasPermission"] == null) ? 0 : Convert.ToInt32(context.Request["hasPermission"]);
    //    if (departmentTypeId.Trim() == "0") {
    //        departmentTypeId = "";
    //    }
    //    //获取数据列表
    //    Department departmentBll = new Department();
    //    IList<TreeViewInfo> departmentList = new List<TreeViewInfo>();
    //    departmentList = departmentBll.DepartmentGetTypeTreeList(xuserId, departmentId, departmentTypeId, hasPermission);
    //    context.Response.Write(JsonConvert.SerializeObject(departmentList));
    //    context.Response.End();
    //}

    public void GetDepartmentListByTypes(HttpContext context)
    {
        string departmentTypeIds = (context.Request["departmentTypeId"] == null) ? "" : context.Request["departmentTypeId"].ToString();

        DepartmentProcess departmentBll = new DepartmentProcess();
        IList<DepartmentInfo> departmentList = new List<DepartmentInfo>();
        departmentList = departmentBll.GetAllDepartmentList(departmentTypeIds);
        context.Response.Write(JsonConvert.SerializeObject(departmentList));
        context.Response.End();
    }

    #endregion

    //public void GetPermissionParentDepartmentListByXuserId(HttpContext context)
    //{
    //    //获取参数
    //    int xuserId = Convert.ToInt32(context.Request["xuserId"]);

    //    //获取结果
    //    Department departmentBll = new Department();
    //    IList<DepartmentViewInfo> DepartmentList = new List<DepartmentViewInfo>();

    //    DepartmentList = departmentBll.GetPermissionParentDepartmentListByXuserId(xuserId);
    //    var jList = DepartmentList.Select(t => new
    //    {
    //        Id = t.Id,
    //        Name = t.Name,
    //        ParentId=t.ParentId
    //    });

    //    string jsonString = JsonConvert.SerializeObject(jList);
    //    context.Response.Write(jsonString);
    //    context.Response.End();
    //}

    public void IsExistedByShortName(HttpContext context)
    {
        string name = Convert.ToString(context.Request["name"]);
        int parentId = Convert.ToInt32(context.Request["parentId"]);
        int departmentTypeId = Convert.ToInt32(context.Request["departmentTypeId"]);
        DepartmentProcess bll = new DepartmentProcess();
        bool isExisted = bll.IsExistedByShortName(name, parentId, departmentTypeId);
        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    public void IsExistedByNewShortNameAndOldName(HttpContext context)
    {
        string newName = Convert.ToString(context.Request["name"]);
        string oldName = Convert.ToString(context.Request["oldValue"]);
        int parentId = Convert.ToInt32(context.Request["parentId"]);
        int departmentTypeId = Convert.ToInt32(context.Request["departmentTypeId"]);

        DepartmentProcess bll = new DepartmentProcess();
        bool isExisted = bll.IsExistedByNewShortNameAndOldName(newName, oldName, parentId, departmentTypeId);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
    /// <summary>
    /// 判断部门下是否有人员
    /// </summary>
    /// <param name="context"></param>
    public void IsExistedXUserUnderDepartment(HttpContext context)
    {
        int id = Convert.ToInt32(context.Request["id"]);
        DepartmentProcess employeeBll = new DepartmentProcess();
        int employeeCount = employeeBll.GetDepartmentXuserCount(id);
        bool isExisted = employeeCount == 0 ? false : true;
        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

}
