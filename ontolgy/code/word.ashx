<%@ WebHandler Language="C#" Class="word" %>

using System;
using System.Web;
using System.Data;

public class word : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        try
        {
            DBCnn db = new DBCnn();
            string sql = "";
            int page = (context.Request["page"] != null) ? Int32.Parse(context.Request["page"]) : 1;
            int rows = (context.Request["rows"] != null) ? Int32.Parse(context.Request["rows"]) : 10;
            var sort = (context.Request["sort"] != null) ? context.Request["sort"] : "";
            var sorttype = (context.Request["order"] != null) ? context.Request["order"] : "";
            
            var ucode = (context.Request["ucode"] != null) ? context.Request["ucode"] : "";
            //--------------------- Data
            string id = (context.Request["id"] != null) ? context.Request["id"] : "";
            string name = (context.Request["name"] != null) ? context.Request["name"] : "";
            string ename = (context.Request["ename"] != null) ? context.Request["ename"] : "";
            
            string wordtypear = (context.Request["wordtypear"] != null) ? context.Request["wordtypear"] : "";
            string wordtypeen = (context.Request["wordtypeen"] != null) ? context.Request["wordtypeen"] : "";
            
                
            string mode = (context.Request["mode"] != null) ? context.Request["mode"] : "";
            //--------------------- Search 
            string sid = (context.Request["sid"] != null) ? context.Request["sid"] : "";
            string sname = (context.Request["sname"] != null) ? context.Request["sname"] : "";
            string sename = (context.Request["sename"] != null) ? context.Request["sename"] : "";
            string msg = "";
            //------------ Add data
            if (mode == "add")
            {
                sql = "Insert into word(wordar,worden,wordtypear ,wordtypeen) Values(N'" + name + "','" + ename + "','" + wordtypear + "','" + wordtypeen + "')";
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
            if (mode == "edit")
            {
                sql = "Update  word set wordar=N'" + name + "' ,worden='" + ename + "' ,wordtypear=N'" + wordtypear + "', wordtypeen='"+wordtypeen+"' where wordid='" + id + "'";
                if (db.Execute(sql))
                {
                    msg = "تمت تعديل البيانات بنجاح Record Update";
                    
                }
                else
                {
                    msg = "فشلت عملية التعديل Can not Update Record";
                   
                }
            }
            //------------ Edit data
            if (mode == "delete")
            {
                sql = "Delete From   word  where wordid='" + id + "'";
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
            string condition = " where wordid!=0";
            if (sid != "") condition += " and wordid like '%" + sid + "%'";
            if (sname != "") condition += " and wordar like N'%" + sname + "%'";
            if (sename != "") condition += " and worden like '%" + sename + "%'";
            ////========================= sort option
            string orderby =  " order by wordid";
            if (sort != "") orderby = " order by " + sort + "  " + sorttype; 
                
            //---------------- find all rows
            sql = "Select isnull(count(wordid),0) as no from word " + condition;
            DataRow row = db.GetRow(sql);
            string total = "0";
            try { total = row["no"].ToString(); }
            catch { }
            int all = Int32.Parse(total);
            if (page > all / rows + 1) page = 1;
            //====================== find display rows
            sql = " SELECT * FROM (SELECT ROW_NUMBER() OVER (" + orderby + ") AS Row,";
            sql += " wordid,wordar ,worden ,wordtypear,wordtypeen  FROM word " + condition + ") ";
            sql += "  AS RowNumbers where  Row > " + ((page - 1) * rows) + " AND Row <=" + (page * rows);
            DataTable tb = db.GetTable(sql);

            //------------------------------
            db.close();
            int pageno = all / rows;
            if (all % rows > 0) pageno++;
            context.Response.Write(Json.json(pageno.ToString(), total, page.ToString(), tb, msg));
           
           
        }
        catch (Exception ex) { context.Response.Write(ex.Message); }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}