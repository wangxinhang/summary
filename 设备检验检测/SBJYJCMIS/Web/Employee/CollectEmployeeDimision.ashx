<%@ WebHandler Language="C#" Class="CollectEmployeeDimision" %>

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

public class CollectEmployeeDimision : IHttpHandler
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

    //获取人员离职列表
    public void EmployeeDimisionGetList(HttpContext context)
    {
        //获取参数
        int xuserId = (context.Request["xuserId"] == null) ? 0 : Convert.ToInt32(context.Request["xuserId"]);

        int employeeId = (context.Request["employeeId"] == null) ? 0 : Convert.ToInt32(context.Request["employeeId"]);

        int dataStatusId = (context.Request["dataStatusId"] == null) ? 1 : Convert.ToInt32(context.Request["dataStatusId"]);

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 20 : Convert.ToInt32(context.Request["pageSize"]);
        string orderFieldName = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? null : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? null : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        EmployeeDimision EmployeeDimisionBll = new EmployeeDimision();
        IList<EmployeeDimisionListInfo> recordList = new List<EmployeeDimisionListInfo>();
        recordList = EmployeeDimisionBll.EmployeeDimisionGetListPaged(employeeId, pageNumber, pageSize, orderFieldName, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = EmployeeDimisionBll.EmployeeDimisionGetListSum(employeeId);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //添加人员离职信息
    public void EmployeeDimisionInsert(HttpContext context)
    {
        //获取数据
        int employeeId = Convert.ToInt32(context.Request["employeeId"]);
        int dimisionTypeId = Convert.ToInt32(context.Request["dimisionTypeId"]);
        string reason = Convert.ToString(context.Request["reason"]);
        DateTime date = Convert.ToDateTime(context.Request["date"]);
        string Memo = Convert.ToString(context.Request["memo"]);
        int creatorId = Convert.ToInt32(context.Request["creatorId"]);

        //插入数据
        EmployeeDimision EmployeeDimisionBll = new EmployeeDimision();
        JObject jsonObj = new JObject();

        EmployeeDimisionInfo EmployeeDimisionInfo = new EmployeeDimisionInfo();
        EmployeeProcess EmployeeBll = new EmployeeProcess();
        EmployeeDimisionInfo.EmployeeId = employeeId;
        EmployeeDimisionInfo.Reason = reason;
        EmployeeDimisionInfo.Date = date;
        EmployeeDimisionInfo.DimisionTypeId = dimisionTypeId;
        EmployeeDimisionInfo.Memo = Memo;
        EmployeeDimisionInfo.CreatorId = creatorId;

        bool isInserted = EmployeeDimisionBll.EmployeeDimisionInsert(EmployeeDimisionInfo);
        
        //序列化后返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }

    //逻辑删除人员离职信息
    public void EmployeeDimisionDelete(HttpContext context)
    {
        //获取数据
        EmployeeDimisionInfo EmployeeDimisionInfo = new EmployeeDimisionInfo();
        EmployeeDimisionInfo.Id = Convert.ToInt32(context.Request["id"]);
        EmployeeDimisionInfo.DataStatusId = 2;
        EmployeeDimisionInfo.ModifierId = Convert.ToInt32(context.Request["modifierId"]);

        //执行逻辑删除操作     
        EmployeeDimision EmployeeDimisionBll = new EmployeeDimision();
        bool isDeleted = EmployeeDimisionBll.EmployeeDimisionUpdateDataStatusIdById(EmployeeDimisionInfo);

        //序列化后返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }

    //更新人员离职信息
    public void EmployeeDimisionUpdateById(HttpContext context)
    {
        //获取数据
        EmployeeDimisionInfo EmployeeDimisionInfo = new EmployeeDimisionInfo();

        EmployeeDimisionInfo.Id = Convert.ToInt32(context.Request["id"]);
        EmployeeDimisionInfo.Reason = Convert.ToString(context.Request["reason"]);
        EmployeeDimisionInfo.Date = Convert.ToDateTime(context.Request["date"]);
        EmployeeDimisionInfo.DimisionTypeId = Convert.ToInt32(context.Request["dimisionTypeId"]);
        EmployeeDimisionInfo.Memo = Convert.ToString(context.Request["memo"]);
        EmployeeDimisionInfo.ModifierId = Convert.ToInt32(context.Request["modifierId"]);

        //执行逻辑删除操作     
        EmployeeDimision EmployeeDimisionBll = new EmployeeDimision();
        bool isUpdated = EmployeeDimisionBll.EmployeeDimisionUpdateById(EmployeeDimisionInfo);

        //序列化后返回
        context.Response.Write(isUpdated.ToString());
        context.Response.End();
    }
}
