//<%@ WebHandler Language="C#" Class="EmployeeHandler" %>

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

public class EmployeeHandler : IHttpHandler
{
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

    public void GetEmployeeList(HttpContext context)
    {
        int xuserId = (context.Request["xuserId"] == null) ? 0 : Convert.ToInt32(context.Request["xuserId"]);

        int departmentId = (context.Request["departmentId"] == null) ? 0 : Convert.ToInt32(context.Request["departmentId"]);
        string pinYin = (context.Request["pinYin"] == null) ? null : (context.Request["pinYin"]);
        int sex = (context.Request["sex"] == null) ? 2 : Convert.ToInt32(context.Request["sex"]);
        int maritalStatus = (context.Request["maritalStatus"] == null) ? 2 : Convert.ToInt32(context.Request["maritalStatus"]);
        string name = (context.Request["name"] == null) ? null : (context.Request["name"]);

        int positionId = (context.Request["positionId"] == null) ? 0 : Convert.ToInt32(context.Request["positionId"]);
        int nationId = (context.Request["nationId"] == null) ? 0 : Convert.ToInt32(context.Request["nationId"]);
        int educationId = (context.Request["educationId"] == null) ? 0 : Convert.ToInt32(context.Request["educationId"]);
        int employeeStatusId = (context.Request["employeeStatusId"] == null) ? 0 : Convert.ToInt32(context.Request["employeeStatusId"]);
        string dateOperator = context.Request["dateOperator"] == null ? null : context.Request["dateOperator"].ToString();
        DateTime? beginDate;
        string BeginDate = context.Request["beginDate"];
        if (BeginDate == null || BeginDate == "")
        {
            beginDate = null;
        }
        else
        {
            beginDate = (DateTime?)Convert.ToDateTime(BeginDate);
        }

        DateTime? endDate;
        string EndDate = context.Request["endDate"];
        if (EndDate == null || EndDate == "")
        {
            endDate = null;
        }
        else
        {
            endDate = (DateTime?)Convert.ToDateTime(EndDate);
        }

        int dataStatusId = (context.Request["dataStatusId"] == null) ? 1 : Convert.ToInt32(context.Request["dataStatusId"]);
        int departmentDataTypeId = (context.Request["departmentDataTypeId"] == null) ? 1 : Convert.ToInt32(context.Request["departmentDataTypeId"]);

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 20 : Convert.ToInt32(context.Request["pageSize"]);
        string orderFieldName = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? null : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? null : Convert.ToString(context.Request["orderType"]);
        //string orderFieldName = "ID";
        //string orderType = "DESC";

        //获取数据列表
        EmployeeProcess employeeBll = new EmployeeProcess();
        IList<EmployeeViewInfo> recordList = new List<EmployeeViewInfo>();
        recordList = employeeBll.GetEmployeeListPaged(name, pinYin, sex, maritalStatus, nationId, educationId, positionId, departmentId, employeeStatusId, dateOperator, beginDate, endDate, xuserId, departmentDataTypeId, pageNumber, pageSize, orderFieldName, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = new RecordCountInfo();
        recordSum.RecordCount = employeeBll.GetEmployeeListCount(name, pinYin, sex, maritalStatus, nationId, educationId, positionId, departmentId, employeeStatusId, dateOperator, beginDate, endDate, xuserId, departmentDataTypeId);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //添加人员信息
    public void InsertEmployee(HttpContext context)
    {
        //获取数据
        string name = Convert.ToString(context.Request["name"]);
        string pinYin = Convert.ToString(context.Request["pinYin"]);
        string simplePinYin = Convert.ToString(context.Request["simplePinYin"]);
        int positionId = Convert.ToInt32(context.Request["positionId"]);
        int sex = Convert.ToInt32(context.Request["sex"]);
        int nationId = Convert.ToInt32(context.Request["nationId"]);
        int maritalStatus = Convert.ToInt32(context.Request["maritalStatus"]);
        string tel = Convert.ToString(context.Request["tel"]);
        string mobile = Convert.ToString(context.Request["mobile"]);
        string officePhone = Convert.ToString(context.Request["officePhone"]);
        string email = Convert.ToString(context.Request["email"]);
        string address = Convert.ToString(context.Request["address"]);
        string idNumber = Convert.ToString(context.Request["idNumber"]);
        string emergencyMan = Convert.ToString(context.Request["emergencyMan"]);
        string emergencyTel = Convert.ToString(context.Request["emergencyTel"]);
        int educationId = Convert.ToInt32(context.Request["educationId"]);
        DateTime? companyTime;

        string CompanyTime = (context.Request["companyTime"]).ToString();
        if (CompanyTime == null || CompanyTime == "")
        {
            companyTime = Convert.ToDateTime("1900-01-01");
        }
        else
        {
            companyTime = Convert.ToDateTime(CompanyTime);
        }

        int departmentId = Convert.ToInt32(context.Request["departmentId"]==""?"0":context.Request["departmentId"]);
        string Memo = Convert.ToString(context.Request["memo"]);
        int creatorId = Convert.ToInt32(context.Request["creatorId"]);
        //插入数据
        EmployeeProcess employeeBll = new EmployeeProcess();
        EmployeeInfo employeeInfo = new EmployeeInfo();
        employeeInfo.Name = name;
        employeeInfo.PinYin = pinYin;
        employeeInfo.SimplePinYin = simplePinYin;
        employeeInfo.Sex = sex;
        employeeInfo.NationId = nationId;
        employeeInfo.MaritalStatus = maritalStatus;
        employeeInfo.Tel = tel;
        employeeInfo.Mobile = mobile;
        employeeInfo.OfficePhone = officePhone;
        employeeInfo.Email = email;
        employeeInfo.Address = address;
        employeeInfo.IDNumber = idNumber;
        employeeInfo.EmergencyMan = emergencyMan;
        employeeInfo.EmergencyTel = emergencyTel;
        employeeInfo.EducationId = educationId;
        employeeInfo.PositionId = positionId;
        employeeInfo.CompanyTime = companyTime;
        employeeInfo.DepartmentId = departmentId;
        employeeInfo.EmployeeStatusId = 1;
        employeeInfo.Memo = Memo;
        employeeInfo.CreatorId = creatorId;

        bool isInserted = employeeBll.InsertEmployee(employeeInfo);

        //string jsonString=new JObject(new JProperty("isInserted", isInserted)).ToString();
        ////序列化后返回
        //context.Response.Write(jsonString);
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }

    //逻辑删除人员信息
    public void DeleteEmployee(HttpContext context)
    {
        //获取数据
        EmployeeInfo employeeInfo = new EmployeeInfo();
        employeeInfo.Id = Convert.ToInt32(context.Request["id"]);
        employeeInfo.DataStatusId = 2;
        employeeInfo.ModifierId = Convert.ToInt32(context.Request["modifierId"]);

        //执行逻辑删除操作     
        EmployeeProcess employeeBll = new EmployeeProcess();
        bool isDeleted = employeeBll.DeleteEmployee(employeeInfo);

        //序列化后返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }

    //更新人员信息
    public void UpdateEmployee(HttpContext context)
    {
        //获取数据
        EmployeeInfo employeeInfo = new EmployeeInfo();

        employeeInfo.Id = Convert.ToInt32(context.Request["id"]);
        employeeInfo.Name = Convert.ToString(context.Request["name"]);
        employeeInfo.PinYin = Convert.ToString(context.Request["pinYin"]);
        employeeInfo.SimplePinYin = Convert.ToString(context.Request["simplePinYin"]);
        employeeInfo.Sex = Convert.ToInt32(context.Request["sex"]);
        employeeInfo.NationId = Convert.ToInt32(context.Request["nationId"]);
        employeeInfo.MaritalStatus = Convert.ToInt32(context.Request["maritalStatus"]);
        employeeInfo.Tel = Convert.ToString(context.Request["tel"]);
        employeeInfo.Mobile = Convert.ToString(context.Request["mobile"]);
        employeeInfo.OfficePhone = Convert.ToString(context.Request["officePhone"]);
        employeeInfo.Email = Convert.ToString(context.Request["email"]);
        employeeInfo.Address = Convert.ToString(context.Request["address"]);
        employeeInfo.IDNumber = Convert.ToString(context.Request["idNumber"]);
        employeeInfo.EmergencyMan = Convert.ToString(context.Request["emergencyMan"]);
        employeeInfo.EmergencyTel = Convert.ToString(context.Request["emergencyTel"]);
        employeeInfo.EducationId = Convert.ToInt32(context.Request["educationId"]);
        employeeInfo.PositionId = Convert.ToInt32(context.Request["positionId"]);
        employeeInfo.CompanyTime = Convert.ToDateTime(context.Request["companyTime"]);
        employeeInfo.DepartmentId = Convert.ToInt32(context.Request["departmentId"]);
        employeeInfo.Memo = Convert.ToString(context.Request["memo"]);
        employeeInfo.ModifierId = Convert.ToInt32(context.Request["modifierId"]);

        //执行更新操作     
        EmployeeProcess employeeBll = new EmployeeProcess();
        bool isUpdated = employeeBll.UpdateEmployee(employeeInfo);
        //string jsonString=new JObject(new JProperty("isUpdated", isUpdated)).ToString();
        ////序列化后返回
        //context.Response.Write(jsonString);
        //context.Response.End();
        context.Response.Write(isUpdated.ToString());
        context.Response.End();
    }

    //验证是否存在
    public void IsExistedByName(HttpContext context)
    {
        EmployeeProcess employeeBll = new EmployeeProcess();
        //获取参数
        string name = Convert.ToString(context.Request["name"]);

        //获取结果
        bool isExisted = employeeBll.IsExistedByName(name);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //根据人员拼音验证人员是否存在
    public void IsExistedByPinYin(HttpContext context)
    {
        EmployeeProcess employeeBll = new EmployeeProcess();
        //获取参数
        string pinYin = Convert.ToString(context.Request["pinYin"]);

        //获取结果
        bool isExisted = employeeBll.IsExistedByPinYin(pinYin);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //根据人员拼音验证人员是否存在(排除原来姓名拼音，用于更新)
    public void IsExistedByNewNameAndOldName(HttpContext context)
    {
        EmployeeProcess employeeBll = new EmployeeProcess();
        //获取参数
        string newName = Convert.ToString(context.Request["name"]);
        string oldName = Convert.ToString(context.Request["OldValue"]);

        //获取结果
        bool isExisted = employeeBll.IsExistedByNewNameAndOldName(newName, oldName);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //根据名称验证人员是否存在(排除原来姓名，用于更新)
    public void IsExistedByNewPinYinAndOldPinYin(HttpContext context)
    {
        string newPinYin = Convert.ToString(context.Request["pinYin"]);
        string oldPinYin = Convert.ToString(context.Request["OldValue"]);
        EmployeeProcess employeeBll = new EmployeeProcess();
        bool isExisted = employeeBll.IsExistedByNewPinYinAndOldPinYin(newPinYin, oldPinYin);
        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //获取民族列表
    //public void GetNationNameList(HttpContext context)
    //{
    //    //获取数据并序列化
    //    NationProcess nationBll = new NationProcess();
    //    IList<NationInfo> dataList = new List<NationInfo>();
    //    dataList = nationBll.GetNationNameList();
    //    var jList = dataList.Select(t => new
    //    {
    //        Id = t.Id,
    //        Name = t.Name
    //    });

    //    string jsonString = JsonConvert.SerializeObject(jList);
    //    context.Response.Write(jsonString);
    //    context.Response.End();
    //}

    //性别下拉框
    //public void GetSexList(HttpContext context)
    //{
    //    //序列化后返回
    //    string jsonString = "[{\"Id\":0,\"Name\":\"女\"},{\"Id\":1,\"Name\":\"男\"}]";
    //    context.Response.Write(jsonString);
    //    context.Response.End();
    //}

    //public void GetMaritalStatusList(HttpContext context)
    //{
    //    //序列化后返回
    //    string jsonString = "[{\"Id\":0,\"Name\":\"未婚\"},{\"Id\":1,\"Name\":\"已婚\"}]";
    //    context.Response.Write(jsonString);
    //    context.Response.End();
    //}


    //根据单位Id、人员名称获取权限人员名称结果集
    public void GetEmployeeNameListByDepartmentIdAndPartNamePaged(HttpContext context)
    {
        //获取数据列表
        int xuserId = Convert.ToInt32(context.Request["xuserId"]);
        int departmentId = (context.Request["departmentId"] == null) ? 0 : Convert.ToInt32(context.Request["departmentId"]);
        string partName = (context.Request["partName"] == null) ? null : (context.Request["partName"]);
        string partPinYin = (context.Request["partPinYin"] == null) ? null : (context.Request["partPinYin"]);

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 20 : Convert.ToInt32(context.Request["pageSize"]);
        string orderFieldName = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? null : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? null : Convert.ToString(context.Request["orderType"]);

        EmployeeProcess employeeBll = new EmployeeProcess();
        IList<EmployeeViewInfo> recordList = new List<EmployeeViewInfo>();
        recordList = employeeBll.GetEmployeeNameListByDepartmentIdAndPartNamePaged(xuserId, departmentId,0, partName,partPinYin,false, pageNumber, pageSize, orderFieldName, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = new RecordCountInfo();
        recordSum.RecordCount = employeeBll.GetEmployeeNameListByDepartmentIdAndPartNameCount(xuserId, departmentId,0, partName, partPinYin,false);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        //序列化后返回
        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //根据单位Id、人员名称获取权限人员名称结果集
    public void GetEmployeeNameListByDepartmentIdAndPartNameUnPaged(HttpContext context)
    {
        //获取数据列表
        int xuserId = Convert.ToInt32(context.Request["xuserId"]);
        int departmentId = (context.Request["departmentId"] == null) ? 0 : Convert.ToInt32(context.Request["departmentId"]);
        string partName = (context.Request["partName"] == null) ? null : (context.Request["partName"]);
        string partPinYin = (context.Request["partPinYin"] == null) ? null : (context.Request["partPinYin"]);
        string orderFieldName = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? null : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? null : Convert.ToString(context.Request["orderType"]);

        EmployeeProcess employeeBll = new EmployeeProcess();
        IList<EmployeeViewInfo> recordList = new List<EmployeeViewInfo>();
        recordList = employeeBll.GetEmployeeNameListByDepartmentIdAndPartNameUnPaged(xuserId, departmentId,0, partName, partPinYin,false, orderFieldName, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        JObject jsonRecordSum = new JObject();
        jsonRecordSum.Add(new JProperty("RecordCount", recordList.Count));

        //序列化后返回
        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum.ToString())).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    public void GetEmployeeNameByXuserId(HttpContext context)
    {
        int xuserId = Convert.ToInt32(context.Request["xuserId"]);
        EmployeeProcess employeeBll = new EmployeeProcess();
        EmployeeViewInfo employee = employeeBll.GetEmployee(xuserId,true);
        string employeeName = "";
        if (employee.Id == 0)
        {
            employeeName = employee.Name;
        }

        string jsonString = new JObject(new JProperty("employee", employeeName)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //获取人员Id根据xuserId
    public void GetEmployeeIdByXuserId(HttpContext context)
    {
        //获取参数
        int xuserId = Convert.ToInt32(context.Request["xuserId"]);
        EmployeeProcess employeeBll = new EmployeeProcess();
        EmployeeViewInfo employee = employeeBll.GetEmployee(xuserId,true);
        int employeeId = employee.Id;
        string jsonString = new JObject(new JProperty("employeeId", employeeId)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //根据单位Id、人员名称获取权限人员名称下拉框
    public void GetEmployeeNameListByDepartmentAndPartNameForGV(HttpContext context)
    {
        //获取数据列表
        int xuserId = Convert.ToInt32(context.Request["xuserId"]);
        int departmentId = (context.Request["departmentId"] == null) ? 0 : Convert.ToInt32(context.Request["departmentId"]);
        int departmentTypeId = (context.Request["departmentTypeId"] == null) ? 0 : Convert.ToInt32(context.Request["departmentTypeId"]);
        string partName = (context.Request["partName"] == null) ? "" : (context.Request["partName"]);
        string partPinYin = (context.Request["partPinYin"] == null) ? "" : (context.Request["partPinYin"]);
        bool isMix = ((context.Request["isMix"] == null) ? 0 : Convert.ToInt32(context.Request["isMix"]))==0?false:true;
        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 20 : Convert.ToInt32(context.Request["pageSize"]);
        string orderFieldName = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? null : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? null : Convert.ToString(context.Request["orderType"]);

        EmployeeProcess employeeBll = new EmployeeProcess();
        IList<EmployeeViewInfo> recordList = new List<EmployeeViewInfo>();
        recordList = employeeBll.GetEmployeeNameListByDepartmentIdAndPartNameUnPaged(xuserId, departmentId,departmentTypeId,partName,partPinYin,isMix,orderFieldName, orderType);
        var jList = recordList.Select(t => new
        {
            Id = t.Id,
            Name = t.Name,
            PinYin = t.PinYin,
            DepartmentId = t.DepartmentId,
            Department = t.Department
        });
        string jsonRecordSet = JsonConvert.SerializeObject(jList);
        RecordCountInfo recordSum = new RecordCountInfo();
        recordSum.RecordCount = employeeBll.GetEmployeeNameListByDepartmentIdAndPartNameCount(xuserId, departmentId,departmentTypeId,partName,partPinYin,isMix);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);
        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //获取人员列表其他信息列表
    public void GetEmployeeEmployeeOtherList(HttpContext context)
    {
        //获取参数
        int employeeId = (context.Request["employeeId"] == null) ? 0 : Convert.ToInt32(context.Request["employeeId"]);
        int dataStatusId = (context.Request["dataStatusId"] == null) ? 1 : Convert.ToInt32(context.Request["dataStatusId"]);

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 20 : Convert.ToInt32(context.Request["pageSize"]);
        string orderFieldName = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? null : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? null : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        EmployeeProcess employeeBll = new EmployeeProcess();
        IList<EmployeeViewInfo> recordList = new List<EmployeeViewInfo>();
        recordList = employeeBll.GetEmployeeOtherListPaged(employeeId, pageNumber, pageSize, orderFieldName, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        JObject jsonRecordSum = new JObject();
        jsonRecordSum.Add(new JProperty("RecordCount", recordList.Count));

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum.ToString())).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    public void GetEmployeeById(HttpContext context)
    {
        int xuserId = (context.Request["xuserId"] == null) ? 0 : Convert.ToInt32(context.Request["xuserId"].ToString());
        EmployeeProcess employeeBll = new EmployeeProcess();
        EmployeeViewInfo employee = employeeBll.GetEmployee(xuserId,true);
        string jsonString = JsonConvert.SerializeObject(employee);
        context.Response.Write(jsonString);
        context.Response.End();
    }
    /// <summary>
    /// 判断部门下是否有人员
    /// </summary>
    /// <param name="context"></param>
    public void IsExistedEmployeeUnderDepartment(HttpContext context)
    {
        int id = Convert.ToInt32(context.Request["id"]);
        EmployeeProcess employeeBll = new EmployeeProcess();
        int employeeCount = employeeBll.GetEmployeeUnderDepartmentCount(id);
        bool isExisted = employeeCount == 0 ? false : true;
        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
}
