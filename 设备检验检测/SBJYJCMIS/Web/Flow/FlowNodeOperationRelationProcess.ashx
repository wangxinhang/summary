<%@WebHandler Language="C#" Class="FlowNodeOperationRelationProcess"%>

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

public class FlowNodeOperationRelationProcess : IHttpHandler
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

    //获取流程节点角色设置
    public void FlowNodeOperationGetList(HttpContext context)
    {
        //int xuserId = (context.Request["xuserId"] == null) ? 0 : Convert.ToInt32(context.Request["xuserId"]);
        //获取参数
        string flowNode = context.Request["flowNode"] == null ? null : context.Request["flowNode"].ToString();
        int flowId = (context.Request["flowId"] == null) ? 0 : Convert.ToInt32(context.Request["flowId"]);
        int assignTypeId = (context.Request["assignTypeId"] == null) ? 0 : Convert.ToInt32(context.Request["assignTypeId"]);
        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 20 : Convert.ToInt32(context.Request["pageSize"]);
        string orderFieldName = "Name";
        string orderType = "ASC";

        //获取数据列表
        FlowNodeOperationRelation fnrBll = new FlowNodeOperationRelation();
        IList<FlowNodeOperationRelationListInfo> fnrList = new List<FlowNodeOperationRelationListInfo>();
        fnrList = fnrBll.FlowNodeOperationGetListPaged(flowNode, flowId, assignTypeId, pageNumber, pageSize, orderFieldName, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(fnrList);

        //获取数据总记录数和值汇总
        RecordCountInfo fnrSum = new RecordCountInfo();
        fnrSum = fnrBll.FlowNodeOperationGetRecordCount(flowNode, flowId, assignTypeId);
        string jsonRecordSum = JsonConvert.SerializeObject(fnrSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
    
    //添加流程节点动作关联信息
    public void FlowNodeOperationRelationInsert(HttpContext context)
    {
        //获取数据
        FlowNodeOperationRelation FlowNodeOperationRelationBll = new FlowNodeOperationRelation();
        string jsonList = context.Request.Params["jsonList"];
        IList<FlowNodeOperationRelationInfo> recordList = JsonConvert.DeserializeObject<List<FlowNodeOperationRelationInfo>>(jsonList);

        bool isInserted = false;
        for (int i = 0; i < recordList.Count; i++)
        {
            FlowNodeOperationRelationInfo FlowNodeOperationRelationItem = new FlowNodeOperationRelationInfo();
            FlowNodeOperationRelationItem.FlowOperationId = recordList[i].FlowOperationId;
            FlowNodeOperationRelationItem.FlowNodeId = recordList[i].FlowNodeId;
            FlowNodeOperationRelationItem.FlowId = recordList[i].FlowId;
            FlowNodeOperationRelationItem.Permissable = recordList[i].Permissable;
            FlowNodeOperationRelationItem.Memo = "";
            FlowNodeOperationRelationItem.CreatorId = recordList[i].CreatorId; ;

            isInserted = FlowNodeOperationRelationBll.FlowNodeOperationRelationInsertTran(FlowNodeOperationRelationItem);
        }

        //插入数据
        JObject jsonObj = new JObject();
        jsonObj.Add(new JProperty("isInserted", isInserted));

        //序列化后返回
        string jsonString = jsonObj.ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }    

    //逻辑删除流程节点
    public void FlowNodeOperationRelationLogicDelete(HttpContext context)
    {
        //获取数据
        int id = Convert.ToInt32(context.Request["flowNodeOperationRelation"]);
        int modifierId = Convert.ToInt32(context.Request["xuserId"]);
        
        //执行逻辑删除操作     
        FlowNodeOperationRelation dataBll = new FlowNodeOperationRelation();
        JObject jsonObj = new JObject();
        bool isDeleted = dataBll.FlowNodeOperationRelationLogicDeleteById(id, modifierId);
        jsonObj.Add(new JProperty("IsDeleted", isDeleted));

        //序列化后返回
        string jsonString = jsonObj.ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    #region FlowOperation数据操作(增删改）
    //插入用户信息
    public void FlowOperationInsert(HttpContext context)
    {
        //获取数据;
        FlowOperation FlowOperationBll = new FlowOperation();
        FlowOperationInfo flowOperation = new FlowOperationInfo(); //JsonConvert.DeserializeObject<GroupInfo>(jsonStr);        
        flowOperation.Name = Convert.ToString(context.Request["Name"]);
        flowOperation.FlowId =Convert.ToInt32(context.Request["FlowId"]);
        flowOperation.Memo = "";
        flowOperation.CreatorId = Convert.ToInt32(context.Request["CreatorId"]);

        ////插入数据
        bool isInserted = FlowOperationBll.FlowOperationInsert(flowOperation);

        JObject jsonObj = new JObject();
        jsonObj.Add(new JProperty("isInserted", isInserted));

        //序列化后返回
        string jsonString = jsonObj.ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //逻辑删除用户
    public void FlowOperationDelete(HttpContext context)
    {
        //获取数据
        FlowOperation FlowOperationBll = new FlowOperation();
        //获取数据
        int id = Convert.ToInt32(context.Request["Id"]);
        int modifierId = Convert.ToInt32(context.Request["ModifierId"]);
      
        JObject jsonObj = new JObject();
        bool isDeleted = FlowOperationBll.FlowOperationLogicDeleteById(id, modifierId);
        jsonObj.Add(new JProperty("IsDeleted", isDeleted));

        //序列化后返回
        string jsonString = jsonObj.ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //更新用户信息
    public void FlowOperationUpdate(HttpContext context)
    {
        //获取数据;
        FlowOperation FlowOperationBll = new FlowOperation();
        FlowOperationInfo flowOperation = new FlowOperationInfo();
        flowOperation.Id = Convert.ToInt32(context.Request["Id"]);
        flowOperation.Name = Convert.ToString(context.Request["Name"]);
        flowOperation.Memo = Convert.ToString(context.Request["Memo"]);
        flowOperation.ModifierId = Convert.ToInt32(context.Request["ModifierId"]);

        //插入数据
        bool isUpdated = FlowOperationBll.FlowOperationUpdateById(flowOperation);

        //序列化后返回
        context.Response.Write(isUpdated.ToString());
        context.Response.End();
    }
    #endregion 数据操作(增删改）
    //获取流程动作列表
    public void FlowOperationGetList(HttpContext context)
    {
        //获取参数
        int flowId = (context.Request["flowId"] == null) ? 0 : Convert.ToInt32(context.Request["flowId"]);
        string name = "";
        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 20 : Convert.ToInt32(context.Request["pageSize"]);
        string orderFieldName = "Id";
        string orderType = "ASC";

        //获取数据列表
        FlowOperation fnrBll = new FlowOperation();
        IList<FlowOperationListInfo> fnrList = new List<FlowOperationListInfo>();
        fnrList = fnrBll.FlowOperationGetListPaged(name, flowId, pageNumber, pageSize, orderFieldName, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(fnrList);

        //获取数据总记录数和值汇总
        RecordCountInfo fnrSum = new RecordCountInfo();
        fnrSum = fnrBll.FlowOperationGetRecordCount(name, flowId);
        string jsonRecordSum = JsonConvert.SerializeObject(fnrSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
}
