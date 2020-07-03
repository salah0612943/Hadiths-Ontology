<%@ WebHandler Language="C#" Class="subjectWord" %>

using System;
using System.Web;
using System.Data;
using System.Data.SqlClient;
public class subjectWord : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        try
        {
            DBCnn db = new DBCnn();
            string sql = "";
            
            string id = (context.Request["id"] != null) ? context.Request["id"] : "";
            string sid = (context.Request["sid"] != null) ? context.Request["sid"] : "";
            string fword = (context.Request["fword"] != null) ? context.Request["fword"] : "";
            string lword = (context.Request["lword"] != null) ? context.Request["lword"] : "";
            string txtar = (context.Request["txtar"] != null) ? context.Request["txtar"] : "";
            string txten = (context.Request["txten"] != null) ? context.Request["txten"] : "";
            string mode = (context.Request["mode"] != null) ? context.Request["mode"] : "";
            //--------------------- Search 
            string msg = "";
            //------------ Add data
            if (mode == "add")
            {
                sql = "Insert into subjectword(sid,startw,endw,relationAr,relationEn) Values('" + sid + "','" + fword + "','" + lword + "',N'" + txtar + "',N'" + txten + "')";
               
                
                if (db.Execute(sql))
                {
                    msg = " تمت إضافة البيانات بنجاح the Recoed is Added";
                   
                }
                else
                {
                    msg = "فشلت عملية الاضافة Can not add Record";
                  
                }
            }
           
            //------------ delete data
            if (mode == "delete")
            {
                sql = "Delete From   subjectword  where rid='" + id + "'";
                if (db.Execute(sql))
                {
                    msg = "تمت حذف البيانات بنجاح The Record Deleted";
                 
                }
                else
                {
                    msg = "فشلت عملية الحذف Can not Delete Record ";
                  
                }
            }

           
            //====================== find display rows
            sql = " SELECT * from subjectworddata where sid=" + sid;
            DataTable tb = db.GetTable(sql);

            //------------------------------
          
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