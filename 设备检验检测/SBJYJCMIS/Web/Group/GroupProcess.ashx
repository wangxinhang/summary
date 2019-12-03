<%@WebHandler Language="C#" Class="GroupProcess"%>

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

public class GroupProcess : IHttpHandler
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

    Group bllProcess = new Group(); 
    #endregion 通用

    #region 数据操作(增删改）
    //插入用户信息
    public void GroupInsert(HttpContext context)
    {
        //获取数据;
        GroupInfo group = new GroupInfo(); //JsonConvert.DeserializeObject<GroupInfo>(jsonStr);        
        group.Name = Convert.ToString(context.Request["Name"]);
        group.Memo = Convert.ToString(context.Request["Memo"]);
        group.CreatorId =  Convert.ToInt32(context.Request["CreatorId"]);
 
        ////插入数据
        bool isInserted = bllProcess.GroupInsert(group);
        
        //序列化后返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }
    
    //逻辑删除用户
    public void GroupDelete(HttpContext context)
    {
        //获取数据
        int id = Convert.ToInt32(context.Request["Id"]);

        //执行删除操作   
        bool isDeleted = bllProcess.GroupDeleteTranById(id);
            
        //序列化后返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }   
     
    //更新用户信息
    public void GroupUpdate(HttpContext context)
    {
        //获取数据;
        GroupInfo group = new GroupInfo();
        group.Id = Convert.ToInt32(context.Request["Id"]); 
        group.Name = Convert.ToString(context.Request["Name"]);
        group.Memo = Convert.ToString(context.Request["Memo"]);
        group.ModifierId = Convert.ToInt32(context.Request["ModifierId"]);
        
        //插入数据
        bool isUpdated = bllProcess.GroupUpdateById(group); 

        //序列化后返回
        context.Response.Write(isUpdated.ToString());
        context.Response.End();
    }
    #endregion 数据操作(增删改）

    #region 验证是否存在
    //验证是否存在
    public void GroupIsExisted(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);

        //获取结果
        bool isExisted = bllProcess.GroupIsExistedByName(name);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }    
    #endregion 用户和密码验证
    
    #region 查询结果集列表
    //根据查询结果集GroupList
    public void GroupGetList(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);   

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Id" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        IList<GroupListInfo> recordList = bllProcess.GroupGetListPaged(name, pageNumber, pageSize, orderField, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);
        
        GroupSumInfo recordSum = bllProcess.GroupGetListSum(name);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        
        context.Response.Write(jsonString);
        context.Response.End();
    }
    #endregion 查询结果集列表

	public void GroupOnlyGetList(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);   

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Id" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        IList<GroupListInfo> recordList = bllProcess.GroupOnlyGetListPaged(name, pageNumber, pageSize, orderField, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);
        
        GroupSumInfo recordSum = bllProcess.GroupOnlyGetListSum(name);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        
        context.Response.Write(jsonString);
        context.Response.End();
    }

    public void GroupGetListMerge(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);   

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Id" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据列表
        IList<GroupListInfo> recordList = bllProcess.GroupGetListMergePaged(name, pageNumber, pageSize, orderField, orderType);
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);
        
        GroupSumInfo recordSum = bllProcess.GroupGetListMergeSum(name);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        
        context.Response.Write(jsonString);
        context.Response.End();
    }
}
