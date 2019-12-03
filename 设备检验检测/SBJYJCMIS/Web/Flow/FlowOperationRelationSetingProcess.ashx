<%@ WebHandler Language="C#" Class="FlowOperationRelationSetingProcess" %>

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

public class FlowOperationRelationSetingProcess : IHttpHandler
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

    FlowOperation bllProcess = new FlowOperation();

    //根据查询结果集FlowOperationList
    public void FlowOperationGetList(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);
        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Id" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        IList<FlowOperationListInfo> recordList = bllProcess.FlowOperationGetListPaged(name, 1, pageNumber, pageSize, orderField, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = bllProcess.FlowOperationGetRecordCount(name, 1);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();

        context.Response.Write(jsonString);
        context.Response.End();
    }

    //根据查询结果集InvestigationHandleResultType
    public void InvestigationHandleResultTypeGetList(HttpContext context)
    {
        FlowHandleType FlowHandleTypeBll = new FlowHandleType();
        //获取参数
        string name = Convert.ToString(context.Request["itemName"]);
        int flowOperationId = (context.Request["FlowOperationId"] == null) ? 0 : Convert.ToInt32(context.Request["FlowOperationId"]);
        
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
        string name = Convert.ToString(context.Request["itemName"]);
        int flowOperationId = (context.Request["FlowOperationId"] == null) ? 0 : Convert.ToInt32(context.Request["FlowOperationId"]);

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Id" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        IList<FlowHandleResultListInfo> recordList = FlowHandleResultBll.FlowHandleResultGetListPaged(name,1, flowOperationId, pageNumber, pageSize, orderField, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = FlowHandleResultBll.FlowHandleResultGetRecordCount(name, 1, flowOperationId);
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
        string name = Convert.ToString(context.Request["itemName"]);
        int flowOperationId = (context.Request["FlowOperationId"] == null) ? 0 : Convert.ToInt32(context.Request["FlowOperationId"]);
        
        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Id" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        IList<FlowStatusListInfo> recordList = FlowStatusBll.FlowStatusGetListPaged(name, 1, flowOperationId,pageNumber, pageSize, orderField, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = FlowStatusBll.FlowStatusGetRecordCount(name, 1, flowOperationId);
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
        string name = Convert.ToString(context.Request["itemName"]);
        int flowOperationId = (context.Request["FlowOperationId"] == null) ? 0 : Convert.ToInt32(context.Request["FlowOperationId"]);

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Id" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        IList<FlowRuleInfo> recordList = FlowRuleBll.FlowRuleGetListPaged(name, 1, flowOperationId, pageNumber, pageSize, orderField, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = FlowRuleBll.FlowRuleGetRecordCount(name, 1, flowOperationId);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();

        context.Response.Write(jsonString);
        context.Response.End();
    }
         //插入用户信息
    public void FlowOperationRuleRelationInsert(HttpContext context)
    {
        //获取数据;
        int flowOperationId = (context.Request["flowOperationId"] == null) ? 0 : Convert.ToInt32(context.Request["flowOperationId"]);
        int Id = (context.Request["Id"] == null) ? 0 : Convert.ToInt32(context.Request["Id"]);
        int creatorId = (context.Request["creatorId"] == null) ? 0 : Convert.ToInt32(context.Request["creatorId"]);
        int flowId = (context.Request["flowId"] == null) ? 0 : Convert.ToInt32(context.Request["flowId"]);;
        bool isInserted = false;
        //流程动作触发规则关联表
        FlowOperationFlowRuleRelation FlowOperationFlowRuleRelation = new FlowOperationFlowRuleRelation();
        FlowOperationFlowRuleRelationInfo FlowOperationFlowRuleRelationNew = new FlowOperationFlowRuleRelationInfo();
        FlowOperationFlowRuleRelationNew.FlowOperationId = flowOperationId;
        FlowOperationFlowRuleRelationNew.FlowRuleId = Id;
        FlowOperationFlowRuleRelationNew.FlowId = flowId;
        FlowOperationFlowRuleRelationNew.Memo = "";
        FlowOperationFlowRuleRelationNew.CreatorId = creatorId;
        ////插入数据
        isInserted = FlowOperationFlowRuleRelation.FlowOperationFlowRuleRelationInsert(FlowOperationFlowRuleRelationNew);
        
        //序列化后返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }
         //插入用户信息
    public void FlowOperationRuleRelationDelete(HttpContext context)
    {
        //获取数据;
        int flowOperationId = (context.Request["flowOperationId"] == null) ? 0 : Convert.ToInt32(context.Request["flowOperationId"]);
        int Id = (context.Request["Id"] == null) ? 0 : Convert.ToInt32(context.Request["Id"]);
        int modifierId = (context.Request["modifierId"] == null) ? 0 : Convert.ToInt32(context.Request["modifierId"]);
        int flowId = (context.Request["flowId"] == null) ? 0 : Convert.ToInt32(context.Request["flowId"]);
        int dataStatusId = 2;
        //流程动作触发规则关联表
        FlowOperationFlowRuleRelation FlowOperationFlowRuleRelation = new FlowOperationFlowRuleRelation();
        FlowOperationFlowRuleRelationInfo FlowOperationFlowRuleRelationNew = new FlowOperationFlowRuleRelationInfo();
        FlowOperationFlowRuleRelationNew.FlowOperationId = flowOperationId;
        FlowOperationFlowRuleRelationNew.FlowRuleId = Id;
        FlowOperationFlowRuleRelationNew.FlowId = flowId;
        FlowOperationFlowRuleRelationNew.DataStatusId = dataStatusId;
        FlowOperationFlowRuleRelationNew.Memo = "";
        FlowOperationFlowRuleRelationNew.ModifierId = modifierId;
        ////插入数据
        bool isDeleted = FlowOperationFlowRuleRelation.FlowOperationFlowRuleRelationUpdateByIdTran(FlowOperationFlowRuleRelationNew);
        
        //序列化后返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();

    }
    //流程操作与流程状态关联
    public void FlowOperationStatusRelationInsert(HttpContext context)
    {
        //获取数据;
        int flowOperationId = (context.Request["flowOperationId"] == null) ? 0 : Convert.ToInt32(context.Request["flowOperationId"]);
        int Id = (context.Request["Id"] == null) ? 0 : Convert.ToInt32(context.Request["Id"]);
        int creatorId = (context.Request["creatorId"] == null) ? 0 : Convert.ToInt32(context.Request["creatorId"]);
        int flowId = (context.Request["flowId"] == null) ? 0 : Convert.ToInt32(context.Request["flowId"]);
        bool isInserted = false;
        //流程动作触发规则关联表
        FlowOperationStatusRelation FlowOperationStatusRelation = new FlowOperationStatusRelation();
        FlowOperationStatusRelationInfo FlowOperationStatusRelationNew = new FlowOperationStatusRelationInfo();
        FlowOperationStatusRelationNew.FlowOperationId = flowOperationId;
        FlowOperationStatusRelationNew.FlowStatusId = Id;
        FlowOperationStatusRelationNew.FlowId = flowId;
        FlowOperationStatusRelationNew.Memo = "";
        FlowOperationStatusRelationNew.CreatorId = creatorId;
        ////插入数据
        isInserted = FlowOperationStatusRelation.FlowOperationStatusRelationInsert(FlowOperationStatusRelationNew);
        
        //序列化后返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }
    //删除流程操作与流程状态
    public void FlowOperationStatusRelationDelete(HttpContext context)
    {
        //获取数据;
        int flowOperationId = (context.Request["flowOperationId"] == null) ? 0 : Convert.ToInt32(context.Request["flowOperationId"]);
        int Id = (context.Request["Id"] == null) ? 0 : Convert.ToInt32(context.Request["Id"]);
        int modifierId = (context.Request["modifierId"] == null) ? 0 : Convert.ToInt32(context.Request["modifierId"]);
        int flowId = (context.Request["flowId"] == null) ? 0 : Convert.ToInt32(context.Request["flowId"]);
        int dataStatusId = 2;
        //流程动作触发规则关联表
        FlowOperationStatusRelation FlowOperationStatusRelation = new FlowOperationStatusRelation();
        FlowOperationStatusRelationInfo FlowOperationStatusRelationUpdate = new FlowOperationStatusRelationInfo();
        FlowOperationStatusRelationUpdate.FlowOperationId = flowOperationId;
        FlowOperationStatusRelationUpdate.FlowStatusId = Id;
        FlowOperationStatusRelationUpdate.FlowId = flowId;
        FlowOperationStatusRelationUpdate.DataStatusId = dataStatusId;
        FlowOperationStatusRelationUpdate.Memo = "";
        FlowOperationStatusRelationUpdate.ModifierId = modifierId;
        ////插入数据
        bool isDeleted = FlowOperationStatusRelation.FlowOperationStatusRelationUpdateByIdTran(FlowOperationStatusRelationUpdate);
        
        //序列化后返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }
    //新增流程操作与处理类别关联
    public void FlowOperationRectificationTypeRelationInsert(HttpContext context)
    {
        //获取数据;
        int flowOperationId = (context.Request["flowOperationId"] == null) ? 0 : Convert.ToInt32(context.Request["flowOperationId"]);
        int Id = (context.Request["Id"] == null) ? 0 : Convert.ToInt32(context.Request["Id"]);
        int creatorId = (context.Request["creatorId"] == null) ? 0 : Convert.ToInt32(context.Request["creatorId"]);
       int flowId = (context.Request["flowId"] == null) ? 0 : Convert.ToInt32(context.Request["flowId"]);
        bool isInserted = false;
        //流程动作触发规则关联表
        FlowOperationHandleTypeRelation FlowOperationHandleTypeRelation = new FlowOperationHandleTypeRelation();
        FlowOperationHandleTypeRelationInfo FlowOperationHandleTypeRelationNew = new FlowOperationHandleTypeRelationInfo();
        FlowOperationHandleTypeRelationNew.FlowOperationId = flowOperationId;
        FlowOperationHandleTypeRelationNew.FlowHandleTypeId = Id;
        FlowOperationHandleTypeRelationNew.FlowId = flowId;
        FlowOperationHandleTypeRelationNew.Memo = "";
        FlowOperationHandleTypeRelationNew.CreatorId = creatorId;

         //插入数据
         isInserted = FlowOperationHandleTypeRelation.FlowOperationHandleTypeRelationInsert(FlowOperationHandleTypeRelationNew);
        
        //序列化后返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }
    //删除新增流程操作与处理类别关联
    public void FlowOperationRectificationTypeRelationDelete(HttpContext context)
    {
        //获取数据;
        int flowOperationId = (context.Request["flowOperationId"] == null) ? 0 : Convert.ToInt32(context.Request["flowOperationId"]);
        int Id = (context.Request["Id"] == null) ? 0 : Convert.ToInt32(context.Request["Id"]);
        int modifierId = (context.Request["modifierId"] == null) ? 0 : Convert.ToInt32(context.Request["modifierId"]);
       int flowId = (context.Request["flowId"] == null) ? 0 : Convert.ToInt32(context.Request["flowId"]);
        int dataStatusId = 2;

        //流程动作触发规则关联表
         FlowOperationHandleTypeRelation FlowOperationHandleTypeRelation = new FlowOperationHandleTypeRelation();
        FlowOperationHandleTypeRelationInfo FlowOperationHandleTypeRelationUpdate = new FlowOperationHandleTypeRelationInfo();
        FlowOperationHandleTypeRelationUpdate.FlowOperationId = flowOperationId;
        FlowOperationHandleTypeRelationUpdate.FlowHandleTypeId = Id;
        FlowOperationHandleTypeRelationUpdate.FlowId = flowId;
        FlowOperationHandleTypeRelationUpdate.DataStatusId = dataStatusId;
        FlowOperationHandleTypeRelationUpdate.Memo = "";
        FlowOperationHandleTypeRelationUpdate.ModifierId = modifierId;
        ////插入数据
        bool isDeleted = FlowOperationHandleTypeRelation.FlowOperationHandleTypeRelationUpdateByIdTran(FlowOperationHandleTypeRelationUpdate);
        
        //序列化后返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }
 //新增流程操作与处理类别关联
    public void FlowOperationHandleResultRelationInsert(HttpContext context)
    {
        //获取数据;
        int flowOperationId = (context.Request["flowOperationId"] == null) ? 0 : Convert.ToInt32(context.Request["flowOperationId"]);
        int Id = (context.Request["Id"] == null) ? 0 : Convert.ToInt32(context.Request["Id"]);
        int creatorId = (context.Request["creatorId"] == null) ? 0 : Convert.ToInt32(context.Request["creatorId"]);
        int flowId = (context.Request["flowId"] == null) ? 0 : Convert.ToInt32(context.Request["flowId"]);
        bool isInserted = false;
        //流程动作触发规则关联表
        FlowOperationHandleResultRelation FlowOperationHandleResultRelation = new FlowOperationHandleResultRelation();
        FlowOperationHandleResultRelationInfo FlowOperationHandleResultRelationNew = new FlowOperationHandleResultRelationInfo();
        FlowOperationHandleResultRelationNew.FlowOperationId = flowOperationId;
        FlowOperationHandleResultRelationNew.FlowHandleResultId = Id;
        FlowOperationHandleResultRelationNew.FlowId = flowId;
        FlowOperationHandleResultRelationNew.Memo = "";
        FlowOperationHandleResultRelationNew.CreatorId = creatorId;

        ////插入数据
        isInserted = FlowOperationHandleResultRelation.FlowOperationHandleResultRelationInsert(FlowOperationHandleResultRelationNew);
        
        //序列化后返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }
    //删除新增流程操作与处理结果关联
    public void FlowOperationHandleResultRelationDelete(HttpContext context)
    {
        //获取数据;
        int flowOperationId = (context.Request["flowOperationId"] == null) ? 0 : Convert.ToInt32(context.Request["flowOperationId"]);
        int Id = (context.Request["Id"] == null) ? 0 : Convert.ToInt32(context.Request["Id"]);
        int modifierId = (context.Request["modifierId"] == null) ? 0 : Convert.ToInt32(context.Request["modifierId"]);
        int flowId = (context.Request["flowId"] == null) ? 0 : Convert.ToInt32(context.Request["flowId"]);
        int dataStatusId = 2;

        FlowOperationHandleResultRelation FlowOperationHandleResultRelation = new FlowOperationHandleResultRelation();
        FlowOperationHandleResultRelationInfo FlowOperationHandleResultRelationUpdate = new FlowOperationHandleResultRelationInfo();
        FlowOperationHandleResultRelationUpdate.FlowOperationId = flowOperationId;
        FlowOperationHandleResultRelationUpdate.FlowHandleResultId = Id;
        FlowOperationHandleResultRelationUpdate.FlowId = flowId;
        FlowOperationHandleResultRelationUpdate.DataStatusId = dataStatusId;
        FlowOperationHandleResultRelationUpdate.Memo = "";
        FlowOperationHandleResultRelationUpdate.ModifierId = modifierId;

        //删除数据
       bool isDeleted = FlowOperationHandleResultRelation.FlowOperationHandleResultRelationUpdateByIdTran(FlowOperationHandleResultRelationUpdate);
        
        //序列化后返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }

}
