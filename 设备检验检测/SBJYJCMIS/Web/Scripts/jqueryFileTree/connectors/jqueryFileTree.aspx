<%@ Page Language="C#" AutoEventWireup="true"%>
<%
    //
    // jQuery File Tree ASP Connector
    //
    // Version 1.0
    //
    // Copyright (c)2008 Andrew Sweeny
    // asweeny@fit.edu
    // 24 March 2008
    //
    string dir;
    bool isUrl = false;
    bool isDirectory = false;
    if (Request.Form["isUrl"] == null || Request.Form["isUrl"].Length <= 0)
    {
        isUrl = false;
    }
    else {
        if (Request.Form["isUrl"].ToString().Trim() == "1")
        {
            isUrl = true;
        }
    }

    if (Request.Form["isDirectory"] == null || Request.Form["isDirectory"].Length <= 0)
    {
        isDirectory = false;
    }
    else {
        if (Request.Form["isDirectory"].ToString().Trim() == "1")
        {
            isDirectory = true;
        }
    }
    if (Request.Form["dir"] == null || Request.Form["dir"].Length <= 0)
    {
        dir = "/";
    }
    else
    {
        dir = Server.UrlDecode(Request.Form["dir"]);
    }

    string strDir=dir.Replace("\\","/");
    string upperDir = strDir.ToUpper();
    int index = upperDir.LastIndexOf("WEB");
    string virDir = index > 0 ? strDir.Substring(index + 3) : strDir;
    string lastChar = virDir.Substring(virDir.Length - 1);
    virDir = lastChar == "/" ? virDir : virDir + "/";
    //virDir = virDir.Substring(0, 1) == "~" ? virDir : "~" + virDir;

    dir = Server.MapPath(virDir);

    System.IO.DirectoryInfo di = new System.IO.DirectoryInfo(dir);
    Response.Write("<ul class=\"jqueryFileTree\" style=\"display: none;\">\n");
    foreach (System.IO.DirectoryInfo di_child in di.GetDirectories())
    {
        if (di_child.Name.ToUpper() != "BIN")
        {
            Response.Write("\t<li class=\"directory collapsed\"><a href=\"#\" rel=\"" + virDir + di_child.Name + "/\">" + di_child.Name + "</a></li>\n");
        }
    }
    if (!isDirectory)
    {
        foreach (System.IO.FileInfo fi in di.GetFiles())
        {
            string ext = "";
            if(fi.Extension.Length > 1)
                ext = fi.Extension.Substring(1).ToLower();
            if (isUrl)
            {
                Response.Write("\t<li class=\"file ext_" + ext + "\"><a href=\"" + virDir+fi.Name + "\" target=\"_blank\" rel=\"" + dir + fi.Name + "\">" + fi.Name + "</a></li>\n");
            }
            else {
                Response.Write("\t<li class=\"file ext_" + ext + isUrl + "\"><a href=\"#\" rel=\"" + dir + fi.Name + "\">" + fi.Name + "</a></li>\n");
            }

        }
    }

    Response.Write("</ul>");
 %>