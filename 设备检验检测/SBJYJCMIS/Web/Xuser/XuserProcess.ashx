<%@WebHandler Language="C#" Class="XuserProcess"%>

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

public class XuserProcess : IHttpHandler
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

    Xuser bllProcess = new Xuser();

    #region 数据操作(增删改）
    //插入用户信息
    public void XuserInsert(HttpContext context)
    {
        //获取数据;
        XuserInfo xuser = new XuserInfo(); //JsonConvert.DeserializeObject<XuserInfo>(jsonStr);        
        xuser.Name = Convert.ToString(context.Request["Name"]);
        xuser.NameCN = Convert.ToString(context.Request["NameCN"]);
        xuser.DepartmentId = Convert.ToInt32(context.Request["DepartmentId"]);
        xuser.Memo = Convert.ToString(context.Request["Memo"]);
        xuser.CreatorId =  Convert.ToInt32(context.Request["CreatorId"]);
        //xuser.SignImg = Convert.ToString(context.Request["SignImg"]);
        bool isCreateEmployee = context.Request["isCreateEmployee"].ToString()=="1"?true:false;

        //插入数据
        bool isInserted = bllProcess.XuserInsert(xuser,isCreateEmployee);

        //序列化后返回
        context.Response.Write(isInserted.ToString());
        context.Response.End();
    }

    //逻辑删除用户
    public void XuserLogicDelete(HttpContext context)
    {
        //获取数据
        int id = Convert.ToInt32(context.Request["id"]);
        int modifierId = Convert.ToInt32(context.Request["modifierId"]);

        //执行逻辑删除操作   
        bool isDeleted = bllProcess.XuserLogicDeleteById(id, modifierId);

        //序列化后返回
        context.Response.Write(isDeleted.ToString());
        context.Response.End();
    }

    //更新用户信息
    public void XuserUpdate(HttpContext context)
    {
        //获取数据;
        XuserInfo xuser = new XuserInfo();
        xuser.Id = Convert.ToInt32(context.Request["id"]);
        xuser.Name = Convert.ToString(context.Request["name"]);
        xuser.NameCN = Convert.ToString(context.Request["nameCN"]);
        xuser.DepartmentId = context.Request["departmentId"] == null ? 0 : Convert.ToInt32(context.Request["departmentId"]);
        //xuser.SignImg = Convert.ToString(context.Request["SignImg"]);
        xuser.Memo = Convert.ToString(context.Request["memo"]);
        xuser.DataStatusId = 1;
        xuser.ModifierId = Convert.ToInt32(context.Request["modifierId"]);

        //插入数据
        bool isUpdated = bllProcess.XuserUpdateById(xuser);


        //序列化后返回
        context.Response.Write(isUpdated.ToString());
        context.Response.End();
    }

    //修改用户密码
    public void XuserModifyPassword(HttpContext context)
    {
        //获取数据
        int id = Convert.ToInt32(context.Request["xuserId"]);
        string password = Convert.ToString(context.Request["password"]);

        JObject jsonObj = new JObject();
        bool isModified = bllProcess.XuserUpdatePasswordById(id,password);
        //序列化后返回
        context.Response.Write(isModified.ToString());
        context.Response.End();
    }

    //重置用户密码
    public void XuserResetPassword(HttpContext context)
    {
        //获取数据
        int id = Convert.ToInt32(context.Request["id"]);
        int modifierId = Convert.ToInt32(context.Request["modifierId"]);

        //执行操作   
        JObject jsonObj = new JObject();
        bool isReseted = bllProcess.XuserResetPasswordById(id, modifierId);
        jsonObj.Add(new JProperty("isReseted", isReseted));

        //序列化后返回
        string jsonString = jsonObj.ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }
    #endregion 数据操作(增删改）

    #region 用户和密码验证
    //验证用户是否存在
    public void XuserIsExisted(HttpContext context)
    {
        //获取参数
        string userName = Convert.ToString(context.Request["userName"]);

        //获取数据列表
        bool isExisted = bllProcess.XuserIsExistedByName(userName);

        string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    //验证用户密码
    public void XuserPasswordIsValid(HttpContext context)
    {
        //获取参数
        string userName = Convert.ToString(context.Request["userName"]);
        string password = Convert.ToString(context.Request["password"]);

        //获取数据列表
        bool isValid = bllProcess.XuserPasswordIsValid(userName, password);

        string jsonString = new JObject(new JProperty("passValid", isValid)).ToString();
        context.Response.Write(jsonString);
        context.Response.End();
    }

    #endregion 用户和密码验证

#region 根据条件查询
//获取xuserId
public void XuserGetIdByName(HttpContext context)
{
    //获取参数
    string userName = Convert.ToString(context.Request["userName"]);

    //获取数据列表
    int xuserId = bllProcess.XuserGetIdByName(userName);

    string jsonString = new JObject(new JProperty("xuserId", xuserId)).ToString();
    context.Response.Write(jsonString);
    context.Response.End();
}

//获取xuserId
public void XuserGetIdByEmployeeId(HttpContext context)
{
    //获取参数
    int employeeId = Convert.ToInt32(context.Request["employeeId"]);

    //获取数据列表
    int xuserId = bllProcess.XuserGetIdByEmployeeId(employeeId);

    string jsonString = new JObject(new JProperty("xuserId", xuserId)).ToString();
    context.Response.Write(jsonString);
    context.Response.End();
}

//获取NameCN
public void XuserGetNameCNById(HttpContext context)
{
    //获取参数
    int id = Convert.ToInt32(context.Request["id"]);

    //获取数据列表
    string nameCN = bllProcess.XuserGetNameCNById(id);

    string jsonString = new JObject(new JProperty("nameCN", nameCN)).ToString();
    context.Response.Write(jsonString);
    context.Response.End();
}

//获取EmployeeId
public void XuserGetEmployeeIdById(HttpContext context)
{
    //获取参数
    int id = Convert.ToInt32(context.Request["id"]);

    //获取数据列表
    int employeeId = bllProcess.XuserGetEmployeeIdById(id);

    string jsonString = new JObject(new JProperty("employeeId", employeeId)).ToString();
    context.Response.Write(jsonString);
    context.Response.End();
}

//根据Md5获取XuserId
public void XuserGetListByMd5(HttpContext context)
{
    //获取参数
    string xuserIdMd5 = Convert.ToString(context.Request["xuserIdMd5"]);

    //获取数据列表
    IList<XuserForIdMd5Info> recordList = bllProcess.XuserGetListByIdMd5(xuserIdMd5);

    string jsonString = JsonConvert.SerializeObject(recordList);
    context.Response.Write(jsonString);
    context.Response.End();
}

//获取用户访问权限
public void XuserGetAccessPermission(HttpContext context)
{
    //获取参数
    string userName = Convert.ToString(context.Request["userName"]);
    //int xmenuId = (context.Request["xmenuId"] == null) ? 0 : Convert.ToInt32(context.Request["xmenuId"]);

    int xuserId = bllProcess.XuserGetIdByName(userName);
    if (xuserId == 0) { xuserId = -1; }

    Permission Permission = new Permission();

    bool accessPermission = Permission.XuserAccessPermissable(xuserId);
    //if (xmenuId > 0) { accessPermission = Permission.XUserMenuAccessPermissable(xuserId, xmenuId); }

    string jsonString = new JObject(new JProperty("accessPermission", accessPermission), new JProperty("xuserId", xuserId)).ToString();
    context.Response.Write(jsonString);
    context.Response.End();
}

//根据xuserId判断用户为处理安排人默认值
public void FlowNodeDefaultSettingIsExistedByXuserId(HttpContext context)
{
    //获取参数
    int xuserId = Convert.ToInt32(context.Request["xuserId"]);

    //获取数据列表
    bool isExisted = bllProcess.FlowNodeDefaultSettingIsExistedByXuserId(xuserId);

    string jsonString = new JObject(new JProperty("isExisted", isExisted)).ToString();
    context.Response.Write(jsonString);
    context.Response.End();
}

#endregion 根据条件查询

#region 查询结果：用户列表
public void XuserGetList(HttpContext context)
{
    //获取参数
    string name = Convert.ToString(context.Request["name"]);
    string nameCN = Convert.ToString(context.Request["nameCN"]);
    int departmentTypeId = context.Request["departmentTypeId"] == null ? 0 : Convert.ToInt32(context.Request["departmentTypeId"]);
    int departmentId = context.Request["departmentId"] == null ? 0 : Convert.ToInt32(context.Request["departmentId"]);

    int pageNumber = (context.Request["pageNumber"] == null) ? 1 : Convert.ToInt32(context.Request["pageNumber"]);
    int pageSize = (context.Request["pageSize"] == null) ? 10 : Convert.ToInt32(context.Request["pageSize"]);
    string orderField = (context.Request["orderField"] == null || context.Request["orderField"] == "") ? "Id" : Convert.ToString(context.Request["orderField"]);
    string orderType = (context.Request["orderType"] == null || context.Request["orderType"] == "") ? "ASC" : Convert.ToString(context.Request["orderType"]);

    //获取数据列表
    IList<XuserListInfo> recordList = bllProcess.XuserGetListMergePaged(name, nameCN, departmentId,departmentTypeId, pageNumber, pageSize, orderField, orderType);
    string jsonRecordSet = JsonConvert.SerializeObject(recordList);
    RecordCountInfo recordSum = new RecordCountInfo();
    recordSum.RecordCount = bllProcess.XuserGetListMergeCount(name, nameCN, departmentId, departmentTypeId);
    string jsonRecordSum = JsonConvert.SerializeObject(recordSum);

    string jsonString = new JObject(new JProperty("recordSet", jsonRecordSet), new JProperty("recordSum", jsonRecordSum)).ToString();

    context.Response.Write(jsonString);
    context.Response.End();
}

    #endregion 查询结果：用户列表
}
