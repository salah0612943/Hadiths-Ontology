<%@ WebHandler Language="C#" Class="search" %>

using System;
using System.Web;
using System.Data;
using System.Data.SqlClient;
public class search : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        try
        {
            DBCnn db = new DBCnn();
            string sql = "";
            int page = (context.Request["page"] != null) ? Int32.Parse(context.Request["page"]) : 1;
            int rows = (context.Request["rows"] != null) ? Int32.Parse(context.Request["rows"]) : 10;
            var sword = (context.Request["sword"] != null) ? context.Request["sword"] : "";
            var ssee = (context.Request["ssee"] != null) ? context.Request["ssee"] : "";
            var schapter = (context.Request["schapter"] != null) ? context.Request["schapter"] : "";
            DataTable dt = null;
            string msg = "";

            string[] a = sword.Split(' ');
            ////-------------- Search Condition
            string condition = " where  sid!=0 ";
            if (ssee != "")
            {
                condition += " and (sname like N'%" + ssee + "%'";
                condition += " or sename like N'%" + ssee + "%' ";
                condition += " or pnamear like N'%" + ssee + "%'";
                condition += " or pnameen like N'%" + ssee + "%')";
            }
            if (schapter != "")
            {
                condition += " and (tnamear like N'%" + schapter + "%'";
                condition += " or tnameen like N'%" + schapter + "%') ";
            }
            if (sword != "")
            {

                sql = "select * from worddata where  wordar like N'%" + sword + "%' or worden like N'%" + sword + "%'";
                DataRow mrow = db.GetRow(sql);
               
                if (mrow != null)
                {
                    sql = "Select * From worddata where groupid='" + mrow["groupid"].ToString() + "'";
                    dt = db.GetTable(sql);
                }
               
               condition += " and (snamear like N'%" + a[0] + "%'";
               condition += " or snameen like N'%" + a[0] + "%'";
               if (dt != null)
                {
                    // condition += " and (";
                    for (int x = 0; x < dt.Rows.Count; x++)
                    {
                        condition += " or snamear like N'%" + dt.Rows[x]["wordar"].ToString() + "%'";
                        condition += " or snameen like N'%" + dt.Rows[x]["wordar"].ToString() + "%'";
                        condition += " or snamear like N'%" + dt.Rows[x]["worden"].ToString() + "%'";
                        condition += " or snameen like N'%" + dt.Rows[x]["worden"].ToString() + "%'";
                    }
                }
               condition += ")";
            }
            
            ////========================= sort option
            string orderby =  " order by sid";
          
                
            //---------------- find all rows
            sql = "Select isnull(count(sid),0) as no from allsubject " + condition;
            DataRow row = db.GetRow(sql);
            string total = "0";
            try { total = row["no"].ToString(); }
            catch { }
            int all = Int32.Parse(total);
            if (page > all / rows + 1) page = 1;
            //====================== find display rows
            sql = " SELECT * FROM (SELECT ROW_NUMBER() OVER (" + orderby + ") AS Row,";
            sql += " * FROM allsubject " + condition + ") ";
            sql += "  AS RowNumbers where  Row > " + ((page - 1) * rows) + " AND Row <=" + (page * rows);
            DataTable tb = db.GetTable(sql);

            //------------------------------
            db.close();
            int pageno = all / rows;
            if (all % rows > 0) pageno++;
            context.Response.Write(Json.json(pageno.ToString(), total, page.ToString(), tb, msg)+"/++/"+Json.json(dt));
           
           
        }
        catch (Exception ex) { context.Response.Write(ex.Message); }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}