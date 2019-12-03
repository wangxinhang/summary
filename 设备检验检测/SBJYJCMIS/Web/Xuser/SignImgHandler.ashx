<%@ WebHandler Language="C#" Class="SignImgHandler" %>

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

public class SignImgHandler : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
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

    public bool IsReusable {
        get {
            return false;
        }
    }

    public void UploadFile(HttpContext context)
    {
        HttpPostedFile _upfile = context.Request.Files["filDoc"];
        bool isOk = false;
        string filePath = "../SignImgs/";
        string fileName = "";
        if (_upfile != null)//上传出错
        {
            fileName = _upfile.FileName;//全文件名
            fileName = fileName.Substring(fileName.LastIndexOf("."));
            fileName = Guid.NewGuid().ToString() + fileName;
            _upfile.SaveAs(HttpContext.Current.Server.MapPath(filePath + fileName));//保存文件
            isOk = true;
        }
        var o = new
        {
            IsOk = isOk,
            FilePath = filePath,
            FileName = fileName
        };
        //序列化后返回
        context.Response.Write(JsonConvert.SerializeObject(o));
        context.Response.End();
    }

}