<%@WebHandler Language="C#" Class="OperationProcess"%>

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

public class OperationProcess : IHttpHandler
{
    #region 通用
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

    Operation bllProcess = new Operation();
    #endregion 通用

    #region 数据操作(增删改）
    //插入用户信息
    public void OperationInsert(HttpContext context)
    {
        //获取数据;
        OperationInfo operation = new OperationInfo(); //JsonConvert.DeserializeObject<OperationInfo>(jsonStr);        
        operation.Name = Convert.ToString(context.Request["Name"]);
        operation.Memo = Convert.ToString(context.Request["Memo"]);
        operation.CreatorId =  Convert.ToInt32(context.Request["CreatorId"]);

        //插入数据
        bool isInserted = bllProcess.OperationInsert(operation);

        //序列化后返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }

    //逻辑删除用户
    public void OperationDelete(HttpContext context)
    {
        //获取数据
        int id = Convert.ToInt32(context.Request["id"]);

        //执行逻辑删除操作   
        bool isDeleted = bllProcess.OperationDeleteTranById(id);

        //序列化后返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }

    //更新用户信息
    public void OperationUpdate(HttpContext context)
    {
        //获取数据;
        OperationInfo operation = new OperationInfo();
        operation.Id = Convert.ToInt32(context.Request["id"]);
        operation.Name = Convert.ToString(context.Request["name"]);
        operation.Memo = Convert.ToString(context.Request["memo"]);
        operation.ModifierId = Convert.ToInt32(context.Request["modifierId"]);

        //插入数据
        bool isUpdated = bllProcess.OperationUpdateById(operation);

        //序列化后返回
        context.Response.Write(isUpdated.ToString());
        context.Response.End();
    }
    #endregion 数据操作(增删改）

    #region 验证是否存在
    //验证是否存在
    public void OperationIsExisted(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);

        //获取结果
        bool isExisted = bllProcess.OperationIsExistedByName(name);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
    #endregion 用户和密码验证

    #region 查询结果集列表
    //根据查询结果集OperationList
    public void OperationGetList(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Id" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        IList<OperationListInfo> recordList = bllProcess.OperationGetListPaged(name, pageNumber, pageSize, orderField, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        OperationSumInfo recordSum = bllProcess.OperationGetListSum(name);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();

        context.Response.Write(jsonString);
        context.Response.End();
    }
    #endregion 查询结果集列表
}
