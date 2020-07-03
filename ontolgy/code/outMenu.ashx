
<%@ WebHandler Language="C#" Class="outMenu" %>

using System;
using System.Web;
using System.Data;
using System.Text;
using System.Web.Script.Serialization;
using System.Collections;
using System.Collections.Generic;
using System.Dynamic;
public class outMenu : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{
    
    public void ProcessRequest (HttpContext context) {
        try
        {
            context.Response.ContentType = "text/plain";
            //var job = (context.Request["jobcode"] != null) ? Int32.Parse(context.Request["jobcode"]) : 0;
                DBCnn db = new DBCnn();
                string sql = "";
                string MenuCode = (context.Request["MenuCode"] != null) ? context.Request["MenuCode"] : "0";
                sql = "SELECT ItemCode, MenuCode,ItemName as ar ,Itemen as en, Url,ID as name,[Moption] ,format,type from MenuItem  WHERE MenuCode='" + MenuCode + "' and show=1";
             
                DataTable tb = db.GetTable(sql);
                db.close();
                context.Response.Write(Json.json(tb));
            
        }
        catch (Exception ex) { context.Response.Write(ex.Message); }
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
    //======================

}