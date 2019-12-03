<%@ WebHandler Language="C#" Class="CollectEmployeeDepartmentLog" %>

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

public class CollectEmployeeDepartmentLog : IHttpHandler
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

    //获取人员单位调动列表
    public void EmployeeDepartmentLogGetList(HttpContext context)
    {
        //获取参数
        int xuserId = (context.Request["xuserId"] == null) ? 0 : Convert.ToInt32(context.Request["xuserId"]);

        int employeeId = (context.Request["employeeId"] == null) ? 0 : Convert.ToInt32(context.Request["employeeId"]);
        int oldDepartmentId = (context.Request["oldDepartmentId"] == null) ? 0 : Convert.ToInt32(context.Request["oldDepartmentId"]);
        int newDepartmentId = (context.Request["newDepartmentId"] == null) ? 0 : Convert.ToInt32(context.Request["newDepartmentId"]);
        string employee = (context.Request["Employee"] == null) ? null : (context.Request["Employee"]);

        string dateOperator = context.Request["dateOperator"] == null ? null : context.Request["dateOperator"].ToString();
        DateTime? beginDate = context.Request["beginDate"] == null ? null : (DateTime?)Convert.ToDateTime(context.Request["beginDate"]);
        DateTime? endDate = context.Request["endDate"] == null ? null : (DateTime?)Convert.ToDateTime(context.Request["endDate"]);

        int dataStatusId = (context.Request["dataStatusId"] == null) ? 1 : Convert.ToInt32(context.Request["dataStatusId"]);

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 20 : Convert.ToInt32(context.Request["pageSize"]);
        string orderFieldName = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? null : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? null : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        EmployeeDepartmentLog EmployeeDepartmentLogBll = new EmployeeDepartmentLog();
        IList<EmployeeDepartmentLogListInfo> recordList = new List<EmployeeDepartmentLogListInfo>();
        recordList = EmployeeDepartmentLogBll.EmployeeDepartmentLogGetListPaged(employeeId, employee, oldDepartmentId, newDepartmentId, dateOperator, beginDate, endDate, pageNumber, pageSize, orderFieldName, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = EmployeeDepartmentLogBll.EmployeeDepartmentLogGetListSum(employeeId, employee, oldDepartmentId, newDepartmentId, dateOperator, beginDate, endDate);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //添加人员单位调动信息
    public void EmployeeDepartmentLogInsert(HttpContext context)
    {
        //获取数据
        int employeeId = Convert.ToInt32(context.Request["employeeId"]);
        int oldDepartmentId = Convert.ToInt32(context.Request["oldDepartmentId"]);
        int newDepartmentId = Convert.ToInt32(context.Request["newDepartmentId"]);
        string reason = Convert.ToString(context.Request["reason"]);
        DateTime date = Convert.ToDateTime(context.Request["date"]);
        string Memo = Convert.ToString(context.Request["memo"]);
        int creatorId = Convert.ToInt32(context.Request["creatorId"]);

        //插入数据
        EmployeeDepartmentLog EmployeeDepartmentLogBll = new EmployeeDepartmentLog();
        JObject jsonObj = new JObject();

        EmployeeDepartmentLogInfo EmployeeDepartmentLogInfo = new EmployeeDepartmentLogInfo();
        EmployeeProcess EmployeeBll = new EmployeeProcess();
        EmployeeDepartmentLogInfo.EmployeeId = employeeId;
        EmployeeDepartmentLogInfo.OldDepartmentId = oldDepartmentId;
        EmployeeDepartmentLogInfo.NewDepartmentId = newDepartmentId;
        EmployeeDepartmentLogInfo.Reason = reason;
        EmployeeDepartmentLogInfo.Date = date;
        EmployeeDepartmentLogInfo.Memo = Memo;
        EmployeeDepartmentLogInfo.CreatorId = creatorId;

        bool isInserted = EmployeeDepartmentLogBll.EmployeeDepartmentLogInsert(EmployeeDepartmentLogInfo);

        //序列化后返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }

    //逻辑删除人员单位调动信息
    public void EmployeeDepartmentLogDelete(HttpContext context)
    {
        //获取数据
        EmployeeDepartmentLogInfo EmployeeDepartmentLogInfo = new EmployeeDepartmentLogInfo();
        EmployeeDepartmentLogInfo.Id = Convert.ToInt32(context.Request["id"]);
        EmployeeDepartmentLogInfo.DataStatusId = 2;
        EmployeeDepartmentLogInfo.ModifierId = Convert.ToInt32(context.Request["modifierId"]);

        //执行逻辑删除操作     
        EmployeeDepartmentLog EmployeeDepartmentLogBll = new EmployeeDepartmentLog();
        bool isDeleted = EmployeeDepartmentLogBll.EmployeeDepartmentLogUpdateDataStatusIdById(EmployeeDepartmentLogInfo);

        //序列化后返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }

    //更新人员单位调动信息
    public void EmployeeDepartmentLogUpdateById(HttpContext context)
    {
        //获取数据
        EmployeeDepartmentLogInfo EmployeeDepartmentLogInfo = new EmployeeDepartmentLogInfo();

        EmployeeDepartmentLogInfo.Id = Convert.ToInt32(context.Request["id"]);
        EmployeeDepartmentLogInfo.NewDepartmentId = Convert.ToInt32(context.Request["newDepartmentId"]);
        EmployeeDepartmentLogInfo.Reason = Convert.ToString(context.Request["reason"]);
        EmployeeDepartmentLogInfo.Date = Convert.ToDateTime(context.Request["date"]);
      
        EmployeeDepartmentLogInfo.Memo = Convert.ToString(context.Request["memo"]);
        EmployeeDepartmentLogInfo.ModifierId = Convert.ToInt32(context.Request["modifierId"]);

        //执行逻辑删除操作     
        EmployeeDepartmentLog EmployeeDepartmentLogBll = new EmployeeDepartmentLog();
        bool isUpdated = EmployeeDepartmentLogBll.EmployeeDepartmentLogUpdateById(EmployeeDepartmentLogInfo);

        //序列化后返回
        context.Response.Write(isUpdated.ToString());
        context.Response.End();
    }
   
}
