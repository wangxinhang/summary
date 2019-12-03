<%@WebHandler Language="C#" Class="XuserGroupProcess"%>

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

public class XuserGroupProcess : IHttpHandler
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

    XuserGroup bllProcess = new XuserGroup();      
    
    #region 数据操作(增删改）
    //插入用户信息
    public void XuserGroupInsert(HttpContext context)
    {
        //获取数据;
        XuserGroupInfo XuserGroup = new XuserGroupInfo();
        XuserGroup.XuserId = Convert.ToInt32(context.Request["xuserId"]);
        XuserGroup.GroupId = Convert.ToInt32(context.Request["groupId"]);
        XuserGroup.Memo = Convert.ToString(context.Request["memo"]);
        XuserGroup.CreatorId =  Convert.ToInt32(context.Request["creatorId"]);
 
        ////插入数据
        bool isInserted = bllProcess.XuserGroupInsert(XuserGroup);

        //序列化后返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }
    
    //逻辑删除用户
    public void XuserGroupDelete(HttpContext context)
    {
        //获取参数
        int xuserId = Convert.ToInt32(context.Request["xuserId"]);
        int groupId = Convert.ToInt32(context.Request["groupId"]);

        //执行删除操作   
        bool isDeleted = bllProcess.XuserGroupDelete(xuserId, groupId);

        //序列化后返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }   
    #endregion 数据操作(增删改）

    #region 验证
    //验证用户是否存在
    public void XuserGroupIsExisted(HttpContext context)
    {
        //获取参数
        int xuserId = Convert.ToInt32(context.Request["xuserId"]);
        int groupId = Convert.ToInt32(context.Request["groupId"]);

        //获取验证
        bool isExisted = bllProcess.XuserGroupIsExisted(xuserId, groupId);

        //序列化后返回
        context.Response.Write(isExisted.ToString());
        context.Response.End();
    }    
    #endregion 验证

    #region 查询结果
    //获取为组添加用户的查询结果集
    public void XuserGroupGetList(HttpContext context)
    {
        //获取参数
        string name = Convert.ToString(context.Request["name"]);
        string nameCN = Convert.ToString(context.Request["nameCN"]);
        int departmentId = context.Request["departmentId"] == null ? 0 : Convert.ToInt32(context.Request["departmentId"]);
        int groupId = context.Request["groupId"] == null ? 0 : Convert.ToInt32(context.Request["groupId"]);
        int assignType = context.Request["assignType"] == null ? 0 : Convert.ToInt32(context.Request["assignType"]);

        int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
        int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
        string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "XuserName" : Convert.ToString(context.Request["orderField"]);
        string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

        //获取数据
        IList<XuserGroupListInfo> recordList = bllProcess.XuserGroupGetListPaged(name, nameCN, departmentId, groupId, assignType, pageNumber, pageSize, orderField, orderType);  
        string jsonRecordSet = JsonConvert.SerializeObject(recordList);

        XuserGroupSumInfo recordSum = bllProcess.XuserGroupGetListSum(name, nameCN, departmentId, groupId, assignType);
        string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

        //序列化后返回
        string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
             
    #endregion 查询结果：用户列表
}
