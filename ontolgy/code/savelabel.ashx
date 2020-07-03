<%@ WebHandler Language="C#" Class="savelabel" %>

using System;
using System.Web;
using System.Data;
public class savelabel : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        try
        {
            DBCnn db = new DBCnn();
            string sql = "";
           
            
            //--------------------- Data
            string[] sp = { "/--/" };
            string data = (context.Request["data"] != null) ? context.Request["data"] : "";
            string pagename = (context.Request["pagename"] != null) ? context.Request["pagename"] : "";

            sql = "select * from MenuItem where Url='"+pagename+"'";
            DataRow row = db.GetRow(sql);
            string pageid = "";
            if (row != null) pageid = row["ItemCode"].ToString();
            string[] all = data.Split(sp, StringSplitOptions.None);
            if (all.Length >= 0)
            {
                string[] sp1 = { "/++/" };
                string[] a1 = all[0].Split(sp1, StringSplitOptions.None);
                sql = "";
                for (int x = 0; x < a1.Length; x++)
                {
                    string[] sp11 = { "++" };
                    string[] item = a1[x].Split(sp11, StringSplitOptions.None);
                    if(item.Length>=2)
                        sql += " insert into pagelabel (lblname,pageid,ar,en) values('" + item[0] + "',N'" + pageid + "',N'" + item[1] + "',N'" + item[1] + "')";
                }
                db.Execute(sql);
            }
            //------------------------
            if (all.Length >= 1)
            {
                string[] sp2 = { "/++/" };
                string[] a2 = all[1].Split(sp2, StringSplitOptions.None);
                sql = "";
                for (int x = 0; x < a2.Length; x++)
                {
                    string[] sp21 = { "++" };
                    string[] item = a2[x].Split(sp21, StringSplitOptions.None);
                    if (item.Length >= 2)
                    sql += " insert into pagetext (txtname,pageid,ar,en,need) values('" + item[0] + "','" + pageid + "','" + item[1] + "','" + item[1] + "',0)";
                }
                db.Execute(sql);
            }

            db.close();
        }
        catch (Exception ex) { context.Response.Write(ex.Message); }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}