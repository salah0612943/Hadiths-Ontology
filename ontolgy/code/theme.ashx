<%@ WebHandler Language="C#" Class="theme" %>

using System;
using System.Web;
using System.Data;
using System.IO;
public class theme : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        try
        {
            String Path = context.Server.MapPath("~/theme");
            //String[] FileNames = Directory.GetFiles(Path);
            string data = "";
            foreach (var files in Directory.GetFiles(Path))
            {
                FileInfo info = new FileInfo(files);
                var fileName = info.Name.Substring(0,info.Name.IndexOf('.'));
                if (data == "") data = fileName; else data += "," + fileName;
            }
            context.Response.Write(data);
        }
        catch (Exception ex) { context.Response.Write(ex.Message); }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}