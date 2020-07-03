<%@ WebHandler Language="C#" Class="change" %>

using System;
using System.Web;
using System.Data;
using System.IO;
public class change : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        try
        {
            string id = (context.Request["id"] != null) ? context.Request["id"] : "green";
            var ucode = (context.Request["ucode"] != null) ? context.Request["ucode"] : ""; 
            String Path1 = context.Server.MapPath("~/theme");
            String Path2 = context.Server.MapPath("~/css");
            if (!Directory.Exists(context.Server.MapPath("~/css/theme.css"))) 
            {
                File.Delete(context.Server.MapPath("~/css/theme.css"));
                File.Copy(context.Server.MapPath("~/theme/"+id+".css"), context.Server.MapPath("~/css/theme.css"));
            }
                

            //3.Copy the file with the new name
            
            context.Response.Write("good");
        }
        catch (Exception ex) { context.Response.Write(ex.Message); }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}