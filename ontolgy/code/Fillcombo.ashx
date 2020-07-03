
<%@ WebHandler Language="C#" Class="Fillcombo" %>

using System;
using System.Web;
using System.Data;
using System.Text;
using System.Web.Script.Serialization;
using System.Collections;
using System.Collections.Generic;
using System.Dynamic;
public class Fillcombo : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{
    
    public void ProcessRequest (HttpContext context) {
        try
        {
            context.Response.ContentType = "text/plain";
          
                DBCnn db = new DBCnn();
                string sql = "";
                string info = (context.Request["data"] != null) ? context.Request["data"] : "";
                string[] ar = info.Split(',');
                              
                for (int x = 0; x < ar.Length; x++)
                {
                   ar[x]= ar[x].Replace(";", ",");
                }
                sql = " SELECT " + ar[0] + "," + ar[1] + " From " + ar[2];
                if (ar.Length > 3) sql+= " where "+ar[3]+"='"+ar[4]+"'";
                if (ar.Length > 5) sql += " and " + ar[5] + "='" + ar[6] + "'";
                if (ar.Length > 7) sql += " and " + ar[7] + "='" + ar[7] + "'";
                if (ar.Length > 9) sql += " and " + ar[9] + "='" + ar[10] + "'";
                DataTable tb = db.GetTable(sql);

                //------------------------------
                string data = "data";
                for (int x = 0; x < tb.Rows.Count; x++)
                {
                    data += ";" + tb.Rows[x][0].ToString() + "++\\" + tb.Rows[x][1].ToString();
                }
                db.close();
                context.Response.Write(data);
            
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