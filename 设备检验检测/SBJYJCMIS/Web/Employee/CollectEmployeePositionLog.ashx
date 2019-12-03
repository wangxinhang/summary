<%@ WebHandler Language="C#" Class="CollectEmployeePositionLog" %>

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

public class CollectEmployeePositionLog : IHttpHandler
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

    //获取人员职位调动列表
    public void EmployeePositionLogGetList(HttpContext context)
    {
        //获取参数
        int xuserId = (context.Request["xuserId"] == null) ? 0 : Convert.ToInt32(context.Request["xuserId"]);

        int employeeId = (context.Request["employeeId"] == null) ? 0 : Convert.ToInt32(context.Request["employeeId"]);
        int oldPositionId = (context.Request["oldPositionId"] == null) ? 0 : Convert.ToInt32(context.Request["oldPositionId"]);
        int newPositionId = (context.Request["newPositionId"] == null) ? 0 : Convert.ToInt32(context.Request["newPositionId"]);
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
        EmployeePositionLog EmployeePositionLogBll = new EmployeePositionLog();
        IList<EmployeePositionLogListInfo> recordList = new List<EmployeePositionLogListInfo>();
        recordList = EmployeePositionLogBll.EmployeePositionLogGetListPaged(employeeId, employee, oldPositionId, newPositionId, dateOperator, beginDate, endDate, pageNumber, pageSize, orderFieldName, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = EmployeePositionLogBll.EmployeePositionLogGetListSum(employeeId, employee, oldPositionId, newPositionId, dateOperator, beginDate, endDate);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //添加人员职位调动信息
    public void EmployeePositionLogInsert(HttpContext context)
    {
        //获取数据
        int employeeId = Convert.ToInt32(context.Request["employeeId"]);
        int oldPositionId = Convert.ToInt32(context.Request["oldPositionId"]);
        int newPositionId = Convert.ToInt32(context.Request["newPositionId"]);
        string reason = Convert.ToString(context.Request["reason"]);
        DateTime date = Convert.ToDateTime(context.Request["date"]);
        string Memo = Convert.ToString(context.Request["memo"]);
        int creatorId = Convert.ToInt32(context.Request["creatorId"]);

        //插入数据
        EmployeePositionLog EmployeePositionLogBll = new EmployeePositionLog();

        EmployeePositionLogInfo EmployeePositionLogInfo = new EmployeePositionLogInfo();
        EmployeeProcess EmployeeBll = new EmployeeProcess();
        EmployeePositionLogInfo.EmployeeId = employeeId;
        EmployeePositionLogInfo.OldPositionId = oldPositionId;
        EmployeePositionLogInfo.NewPositionId = newPositionId;
        EmployeePositionLogInfo.Reason = reason;
        EmployeePositionLogInfo.Date = date;
        EmployeePositionLogInfo.Memo = Memo;
        EmployeePositionLogInfo.CreatorId = creatorId;

        bool isInserted = EmployeePositionLogBll.EmployeePositionLogInsert(EmployeePositionLogInfo);

        //序列化后返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }

    //逻辑删除人员职位调动信息
    public void EmployeePositionLogDelete(HttpContext context)
    {
        //获取数据
        EmployeePositionLogInfo EmployeePositionLogInfo = new EmployeePositionLogInfo();
        EmployeePositionLogInfo.Id = Convert.ToInt32(context.Request["id"]);
        EmployeePositionLogInfo.DataStatusId = 2;
        EmployeePositionLogInfo.ModifierId = Convert.ToInt32(context.Request["modifierId"]);

        //执行逻辑删除操作     
        EmployeePositionLog EmployeePositionLogBll = new EmployeePositionLog();
        bool isDeleted = EmployeePositionLogBll.EmployeePositionLogUpdateDataStatusIdById(EmployeePositionLogInfo);

        //序列化后返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }

    //更新人员职位调动信息
    public void EmployeePositionLogUpdateById(HttpContext context)
    {
        //获取数据
        EmployeePositionLogInfo EmployeePositionLogInfo = new EmployeePositionLogInfo();

        EmployeePositionLogInfo.Id = Convert.ToInt32(context.Request["id"]);
        EmployeePositionLogInfo.NewPositionId = Convert.ToInt32(context.Request["newPositionId"]);
        EmployeePositionLogInfo.Date = Convert.ToDateTime(context.Request["date"]);
        EmployeePositionLogInfo.Reason = Convert.ToString(context.Request["reason"]);
        
        EmployeePositionLogInfo.Memo = Convert.ToString(context.Request["memo"]);
        EmployeePositionLogInfo.ModifierId = Convert.ToInt32(context.Request["modifierId"]);

        //执行逻辑删除操作     
        EmployeePositionLog EmployeePositionLogBll = new EmployeePositionLog();
        bool isUpdated = EmployeePositionLogBll.EmployeePositionLogUpdateById(EmployeePositionLogInfo);

        //序列化后返回
        context.Response.Write(isUpdated.ToString());
        context.Response.End();
    } 
}
