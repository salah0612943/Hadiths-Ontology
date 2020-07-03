<%@ WebHandler Language="C#" Class="login" %>

using System;
using System.Web;
using System.Data;
public class login : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        try
        {
            DBCnn db = new DBCnn();
            string sql = "";
           
            
            //--------------------- Data
            string id = (context.Request["id"] != null) ? context.Request["id"] : "";
            string pass = (context.Request["pass"] != null) ? context.Request["pass"] : "";

            sql = "Select adminname as name,adminid as ucode, 'ahome' as pagename  from admin where adminid=N'" + id + "' and password ='" + pass + "' ";
            DataTable tb = db.GetTable(sql);
            db.close();
            if (tb != null && tb.Rows.Count > 0)
            {
                context.Response.Write(Json.json(tb));
            }
            else
            {
                context.Response.Write("");
            }
           
           
        }
        catch (Exception ex) { context.Response.Write(ex.Message); }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}