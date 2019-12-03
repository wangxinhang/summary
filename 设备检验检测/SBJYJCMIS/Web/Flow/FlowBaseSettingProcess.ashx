<%@ WebHandler Language="C#" Class="FlowBaseSettingProcess" %>

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

public class FlowBaseSettingProcess : IHttpHandler
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

    //根据查询结果集InvestigationHandleResultType
    public void InvestigationHandleResultTypeGetList(HttpContext context)
    {
        FlowHandleType FlowHandleTypeBll = new FlowHandleType();
        //获取参数
        string name = Convert.ToString(context.Request["name"]);
        int flowOperationId = (context.Request["FlowOperationId"] == null) ? 0 : Convert.ToInt32(context.Request["FlowOperationId"]);
        int flowId = (context.Request["flowId"] == null) ? 0 : Convert.ToInt32(context.Request["flowId"]);

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Id" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        IList<FlowHandleTypeListInfo> recordList = FlowHandleTypeBll.FlowHandleTypeGetListPaged(name, 1,flowOperationId, pageNumber, pageSize, orderField, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = FlowHandleTypeBll.FlowHandleTypeGetRecordCount(name, 1, flowOperationId);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();

        context.Response.Write(jsonString);
        context.Response.End();
    }
    //根据查询结果集FlowHandleResult
    public void FlowHandleResultGetList(HttpContext context)
    {
        FlowHandleResult FlowHandleResultBll = new FlowHandleResult();
        //获取参数
        string name = Convert.ToString(context.Request["name"]);
        int flowOperationId = (context.Request["FlowOperationId"] == null) ? 0 : Convert.ToInt32(context.Request["FlowOperationId"]);
        int flowId = (context.Request["flowId"] == null) ? 0 : Convert.ToInt32(context.Request["flowId"]);

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Id" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        IList<FlowHandleResultListInfo> recordList = FlowHandleResultBll.FlowHandleResultGetListPaged(name,flowId, flowOperationId, pageNumber, pageSize, orderField, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = FlowHandleResultBll.FlowHandleResultGetRecordCount(name, flowId, flowOperationId);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();

        context.Response.Write(jsonString);
        context.Response.End();
    }
    //根据查询结果集FlowStatus
    public void FlowStatusGetList(HttpContext context)
    {
        FlowStatus FlowStatusBll = new FlowStatus();
        //获取参数
        string name = Convert.ToString(context.Request["name"]);
        int flowOperationId = (context.Request["FlowOperationId"] == null) ? 0 : Convert.ToInt32(context.Request["FlowOperationId"]);
        int flowId = (context.Request["flowId"] == null) ? 0 : Convert.ToInt32(context.Request["flowId"]);

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Id" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        IList<FlowStatusListInfo> recordList = FlowStatusBll.FlowStatusGetListPaged(name, flowId, flowOperationId,pageNumber, pageSize, orderField, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = FlowStatusBll.FlowStatusGetRecordCount(name, flowId, flowOperationId);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();

        context.Response.Write(jsonString);
        context.Response.End();
    }

    //根据查询结果集FlowRule
    public void FlowRuleGetList(HttpContext context)
    {
        FlowRule FlowRuleBll = new FlowRule();
        //获取参数
        string name = Convert.ToString(context.Request["name"]);
        int flowOperationId = (context.Request["FlowOperationId"] == null) ? 0 : Convert.ToInt32(context.Request["FlowOperationId"]);
        int flowId = (context.Request["flowId"] == null) ? 0 : Convert.ToInt32(context.Request["flowId"]);

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Id" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        IList<FlowRuleInfo> recordList = FlowRuleBll.FlowRuleGetListPaged(name, flowId, flowOperationId, pageNumber, pageSize, orderField, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = FlowRuleBll.FlowRuleGetRecordCount(name, flowId, flowOperationId);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();

        context.Response.Write(jsonString);
        context.Response.End();
    }
    //根据查询结果集FlowOperationList
    public void FlowOperationGetList(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);
        int flowId = (context.Request["flowId"] == null) ? 0 : Convert.ToInt32(context.Request["flowId"]);
        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Id" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        FlowOperation FlowOperationBll = new FlowOperation();
        IList<FlowOperationListInfo> recordList = FlowOperationBll.FlowOperationGetListPaged(name, flowId, pageNumber, pageSize, orderField, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = FlowOperationBll.FlowOperationGetRecordCount(name, flowId);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();

        context.Response.Write(jsonString);
        context.Response.End();
    }
        //根据查询结果集FlowHandleType
    public void FlowHandleTypeGetList(HttpContext context)
    {
        FlowHandleType FlowHandleTypeBll = new FlowHandleType();
        //获取参数
        string name = Convert.ToString(context.Request["name"]);
        int flowOperationId = (context.Request["FlowOperationId"] == null) ? 0 : Convert.ToInt32(context.Request["FlowOperationId"]);
        int flowId = (context.Request["flowId"] == null) ? 0 : Convert.ToInt32(context.Request["flowId"]);

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Id" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        IList<FlowHandleTypeListInfo> recordList = FlowHandleTypeBll.FlowHandleTypeGetListPaged(name,flowId, flowOperationId, pageNumber, pageSize, orderField, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = FlowHandleTypeBll.FlowHandleTypeGetRecordCount(name, flowId, flowOperationId);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();

        context.Response.Write(jsonString);
        context.Response.End();
    }

}
