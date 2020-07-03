<%@ WebHandler Language="C#" Class="getlabel" %>

using System;
using System.Web;
using System.Data;
public class getlabel : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        try
        {
            DBCnn db = new DBCnn();
            string sql = "";
           
            
            //--------------------- Data
            string[] sp = { "/--/" };
          
            string pagename = (context.Request["pagename"] != null) ? context.Request["pagename"] : "";

            sql = "select * from MenuItem where Url='"+pagename+"'";
            DataRow row = db.GetRow(sql);
            string pageid = "";
            if (row != null) pageid = row["ItemCode"].ToString();
            sql = "select * from pagelabel where pageid='" + pageid + "'";
            DataTable dt=db.GetTable(sql);
            db.close();
            context.Response.Write(Json.json(dt));
        }
        catch (Exception ex) { context.Response.Write(ex.Message); }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}