<%@ WebHandler Language="C#" Class="see" %>

using System;
using System.Web;
using System.Data;

public class see : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        try
        {
            DBCnn db = new DBCnn();
            string sql = "";
            var ucode = (context.Request["ucode"] != null) ? context.Request["ucode"] : "";
            //--------------------- Data
            string id = (context.Request["id"] != null) ? context.Request["id"] : "1";
            string pid = (context.Request["pid"] != null) ? context.Request["pid"] : "";
            string rank = (context.Request["rank"] != null) ? context.Request["rank"] : "";
            string mode = (context.Request["mode"] != null) ? context.Request["mode"] : "";
            string msg = "";
            //------------ Add data
            if (mode == "add")
            {
                sql = "Insert into personsee(sid,pid,rank) Values('" + id + "','" + pid + "','"+rank+"')";
                if (db.Execute(sql))
                {
                    msg = " تمت إضافة البيانات بنجاح the Recoed is Added";
                  
                }
                else
                {
                    msg = "فشلت عملية الاضافة Can not add Record";
                 
                }
            }
            
            //------------ Edit data
            if (mode == "delete")
            {
                sql = "Delete From   personsee  where pid='" + pid + "' and sid='"+id+"'";
                if (db.Execute(sql))
                {
                    msg = "تمت حذف البيانات بنجاح The Record Deleted";
                   
                }
                else
                {
                    msg = "فشلت عملية الحذف Can not Delete Record ";
                   
                }
            }

            ////-------------- Search Condition
            string condition = " where sid="+id;
            
            ////========================= sort option
             
            //====================== find display rows
            sql = " SELECT *  FROM see " + condition + "   order by rank ";
           
            DataTable tb = db.GetTable(sql);

            //------------------------------
            db.close();
            context.Response.Write(Json.json(tb, msg));
           
           
        }
        catch (Exception ex) { context.Response.Write(ex.Message); }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}