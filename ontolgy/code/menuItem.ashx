<%@ WebHandler Language="C#" Class="menuItem" %>

using System;
using System.Web;
using System.Data;
public class menuItem : IHttpHandler
{
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        try
        {
            DBCnn db = new DBCnn();
            string sql = "";
            //------------------------
            int page = (context.Request["page"] != null) ? Int32.Parse(context.Request["page"]) : 1;
            int rows = (context.Request["rows"] != null) ? Int32.Parse(context.Request["rows"]) : 10;
            var sort = (context.Request["sort"] != null) ? context.Request["sort"] : "";
            var sorttype = (context.Request["order"] != null) ? context.Request["order"] : "";
             
            string old = (context.Request["old"] != null) ? context.Request["old"] : "";
            string mode = (context.Request["mode"] != null) ? context.Request["mode"] : "";
            var ucode = (context.Request["ucode"] != null) ? context.Request["ucode"] : ""; 
            //--------------------- Data
            string id = (context.Request["id"] != null) ? context.Request["id"] : "";
            string name = (context.Request["name"] != null) ? context.Request["name"] : "";
            string aname = (context.Request["aname"] != null) ? context.Request["aname"] : "";
            string ename = (context.Request["ename"] != null) ? context.Request["ename"] : "";
            string icon = (context.Request["icon"] != null) ? context.Request["icon"] : "";
            string url = (context.Request["url"] != null) ? context.Request["url"] : "";
            string MenuCode = (context.Request["MenuCode"] != null) ? context.Request["MenuCode"] : "";
            string show = (context.Request["show"] != null) ? context.Request["show"] : "";
            string chk = (context.Request["chk"] != null) ? context.Request["chk"] : "";
           
            var cond = (context.Request["condition"] != null) ? context.Request["condition"] : "";
           
            //--------------------- Search 
            string sename = (context.Request["sename"] != null) ? context.Request["sename"] : "";
            string sname = (context.Request["sname"] != null) ? context.Request["sname"] : "";
           
            DataRow row;
            string msg = "";
            //------------ Add data
            if (mode == "add")
            {

                sql = "Insert Into MenuItem(MenuCode,ID,ItemName,Itemen,Url,format,show,type)";
                sql += " Values ('" + MenuCode + "','" + name + "',N'" + aname + "',N'" + ename + "','" + url + "','" + icon + "','" + show + "','" + chk + "')";
                if (db.Execute(sql))
                {
                    msg = "تمت إضافة البيانات بنجاح";
                   
                }
                else
                {
                    msg = "فشلت عملية الاضافة";
                    
                }
            }
            //------------ Edit data
            if (mode == "edit")
            {
                sql = "Update  MenuItem set MenuCode='" + MenuCode + "', ID='" + name + "',ItemName=N'" + aname + "',Itemen=N'" + ename + "',Url='" + url + "',format='" + icon + "',show='" + show + "',type='" + chk + "' where ItemCode='" + old + "'";
                if (db.Execute(sql))
                {
                    msg = "تمت تعديل البيانات بنجاح";
                 
                }
                else
                {
                    msg = "فشلت عملية التعديل";
                   
                }
            }
            //------------ Edit data
            if (mode == "delete")
            {
                sql = "Delete From   MenuItem  where ItemCode='" + old + "'";
                if (db.Execute(sql))
                {
                    msg = "تمت حذف البيانات بنجاح";
                   
                }
                else
                {
                    msg = "فشلت عملية الحذف";
                  
                }
            }

            ////-------------- Search Condition
            string condition = " where ItemCode!=''" + cond;
            if (sename != "") condition += " and ItemCode like '%" + sename + "%'";
            if (sname != "") condition += " and ItemName like N'%" + sname + "%'";
           
            ////========================= sort option

            string orderby = " order by ItemCode";
            if (sort != "") orderby = " order by " + sort + "  " + sorttype; 
            //---------------- find all rows
            sql = "Select isnull(count(ItemCode),0) as no from MenuItemData " + condition;
            row = db.GetRow(sql);
            string total = "0";
            try { total = row["no"].ToString(); }
            catch { }

            //====================== find display rows
            sql = " SELECT * FROM (SELECT ROW_NUMBER() OVER (" + orderby + ") AS Row,";
            sql += " * FROM MenuItemData " + condition + ") ";
            sql += "  AS RowNumbers where  Row > " + ((page - 1) * rows) + " AND Row <=" + (page * rows);
            DataTable tb = db.GetTable(sql);
            db.close();
            //------------------------------
            int all = Int32.Parse(total);
            if (page > all / rows + 1) page = 1;
            int pageno = all / rows;
            if (all % rows > 0) pageno++;
            context.Response.Write(Json.json(pageno.ToString(), total, page.ToString(), tb));

        }
            
        catch (Exception ex) { context.Response.Write(ex.Message); }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}