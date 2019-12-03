<%@WebHandler Language="C#" Class="FlowNodeDepartmentProcess"%>

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

public class FlowNodeDepartmentProcess : IHttpHandler
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

    FlowNodeDepartment bllProcess = new FlowNodeDepartment();      
    
    #region 数据操作(增删改）
    //插入用户信息
    public void FlowNodeDepartmentInsert(HttpContext context)
    {
        //获取数据;
        FlowNodeDepartmentInfo FlowNodeDepartment = new FlowNodeDepartmentInfo();
        FlowNodeDepartment.FlowNodeId = Convert.ToInt32(context.Request["flowNodeId"]);
        FlowNodeDepartment.DepartmentId = Convert.ToInt32(context.Request["departmentId"]);
        FlowNodeDepartment.FlowId = Convert.ToInt32(context.Request["flowId"]);
        FlowNodeDepartment.Memo = Convert.ToString(context.Request["memo"]);
        FlowNodeDepartment.CreatorId = Convert.ToInt32(context.Request["creatorId"]);
 
        ////插入数据
        bool isInserted = bllProcess.FlowNodeDepartmentInsert(FlowNodeDepartment);

        //序列化后返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }
    
    //逻辑删除用户
    public void FlowNodeDepartmentDelete(HttpContext context)
    {
        //获取参数
        int flowNodeId = Convert.ToInt32(context.Request["flowNodeId"]);
        int departmentId = Convert.ToInt32(context.Request["departmentId"]);
        int flowId = Convert.ToInt32(context.Request["flowId"]);
        int xuserId = Convert.ToInt32(context.Request["xuserId"]);

        //执行删除操作   
        bool isDeleted = bllProcess.FlowNodeDepartmentUpdateDataStatusById(flowNodeId, departmentId, flowId, xuserId);
        //序列化后返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }   
    #endregion 数据操作(增删改）

    #region 验证
    //验证用户是否存在
    public void FlowNodeDepartmentIsExisted(HttpContext context)
    {
        //获取参数
        int flowNodeId = Convert.ToInt32(context.Request["flowNodeId"]);
        int departmentId = Convert.ToInt32(context.Request["departmentId"]);
        int flowId = Convert.ToInt32(context.Request["flowId"]);

        //获取验证
        bool isExisted = bllProcess.FlowNodeDepartmentIsExisted(flowNodeId, departmentId, flowId);

        //序列化后返回
        context.Response.Write(isExisted.ToString());
        context.Response.End();
    }    
    #endregion 验证

    #region 查询结果
    //获取为节点添加角色的查询结果集
    public void FlowNodeDepartmentGetList(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);
        int flowNodeId = context.Request["flowNodeId"] == null ? 0 : Convert.ToInt32(context.Request["flowNodeId"]);
        int flowId = context.Request["flowId"] == null ? 0 : Convert.ToInt32(context.Request["flowId"]);
        int assignType = context.Request["assignType"] == null ? 0 : Convert.ToInt32(context.Request["assignType"]);

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Department" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据
        IList<FlowNodeDepartmentInfo> recordList = bllProcess.FlowNodeDepartmentGetListPaged(name, flowNodeId, flowId, assignType, pageNumber, pageSize, orderField, orderType);  
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        RecordCountInfo recordSum = bllProcess.FlowNodeDepartmentGetSum(name, flowNodeId, flowId, assignType);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        //序列化后返回
        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
             
    #endregion 查询结果：用户列表
}
