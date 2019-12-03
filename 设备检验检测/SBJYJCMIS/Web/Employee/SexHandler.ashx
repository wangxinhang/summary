//<%@ WebHandler Language="C#" Class="SexHandler" %>

using System;
using System.Web;

public class SexHandler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        context.Response.Write("Hello World");
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }
    public void GetSexList(HttpContext context)
    {
        //序列化后返回
        string jsonString = "[{\"Id\":0,\"Name\":\"女\"},{\"Id\":1,\"Name\":\"男\"}]";
        context.Response.Write(jsonString);
        context.Response.End();
    }
}