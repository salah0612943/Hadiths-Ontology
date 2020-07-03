<%@ WebHandler Language="C#" Class="groupword" %>

using System;
using System.Web;
using System.Data;

public class groupword : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        try
        {
            DBCnn db = new DBCnn();
            string sql = "",msg;
        
          
            //--------------------- Data
            string id = (context.Request["id"] != null) ? context.Request["id"] : "";
            string name = (context.Request["name"] != null) ? context.Request["name"] : "";
            string ename = (context.Request["ename"] != null) ? context.Request["ename"] : "";
            string mode = (context.Request["mode"] != null) ? context.Request["mode"] : "";
           
            //------------ Add data
            if (mode == "add")
            {
                sql = "Insert into groupword(groupid,wordid,wordtype) Values('" + id + "',N'" + name + "',N'" + ename + "')";
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
                sql = "Delete From   groupword  where groupid='" + id + "' and wordid='"+name+"'";
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
            string condition = " where groupid="+id;

            sql = " SELECT * FROM worddata " + condition;
            DataTable tb = db.GetTable(sql);
            db.close();
            context.Response.Write(Json.json(tb));
           
           
        }
        catch (Exception ex) { context.Response.Write(ex.Message); }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}