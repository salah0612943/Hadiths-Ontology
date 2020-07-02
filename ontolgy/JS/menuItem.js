var obj
var chk = false;
var editchk = true;
var delchk = true;
$(function () {

    //clearBottom();
    showinfo('list');
    if (lang == 'ar') {
        getCombo("cmbm", "MenuCode,MenuName,MainMenu");
    }
    else {
        getCombo("cmbm", "MenuCode,Itemen,MainMenu");
    }

    //Find('menuItem');
});

function setRight(right) {
    try {

        for (var x = 0; x < right.length; x++) {
            if (right[x].command == 'add' && right[x].JobCode == '1') {
                var tool = document.getElementById('add');
                if (tool.className.indexOf("w3-hide") != -1) {
                    tool.className = tool.className.replace(" w3-hide", ""); ;
                }
            }
            if (right[x].command == 'edit' && right[x].JobCode == '1') editchk = true;
            if (right[x].command == 'delete' && right[x].JobCode == '1') delchk = true;
            if (right[x].command == 'search' && right[x].JobCode == '1') {
                tool = document.getElementById('search');
                if (tool.className.indexOf("w3-hide") != -1) {
                    tool.className = tool.className.replace(" w3-hide", ""); ;
                }
            }
        }
    }
    catch (e) { showMessage(e); }
}
function showinfo(mode) {
    try {
        var id = document.getElementById("id").value;
        var name = document.getElementById("name").value;
        var aname = document.getElementById("aname").value;
        var ename = document.getElementById("ename").value;
        var icon = document.getElementById("icon").value;
        var url = document.getElementById("url").value;
        var MenuCode = document.getElementById("cmbm").value;

        var con = document.getElementById("chk").checked;
        var chk = 0;
        if (con == true) chk = 1;

        var showlbl = document.getElementById("show").checked;
        var show = 0;
        if (showlbl == true) show = 1;
        var old = id;

        sort = document.getElementById("sortname").value;
        order = document.getElementById("sorttype").value;

        var sname = document.getElementById("sname").value;
        var sename = document.getElementById("sename").value;

        $.ajax({
            type: "GET",
            url: "code/menuItem.ashx",
            data: { id: id, name: name, ename: ename, aname: aname, icon: icon, url: url, chk: chk, show: show, MenuCode: MenuCode, old: old, ucode: getValue("uid"), sname: sname, sename: sename, mode: mode, page: page, rows: rows, sort: sort, order: order },
            success: function (text) {
                //alert(text);
                obj = JSON.parse(text);
                if (obj.msg != '') showMessage(obj.msg);
                var data = "";
                if (obj.rows.length == 0) {
                    data = "<p class='w3-large w3-text-red'><b>لا يوجد سجلات</b></p>"
                }
                else {
                    for (var x = 0; x < obj.rows.length; x++) {
                        data += " <li   class=' w3-padding w3-right-align' onclick='showdata(\"" + x + "\")'>";
                        data += " <div class='w3-row'>";
                        data += "<p class='w3-col l3 s6 m6 w3-right-align w3-right'>";
                        //data += "<input id='chk" + x + "' name='chk" + x + "' class='w3-check' type='checkbox'  onclick='chkclick()'/> ";
                        data += " " + obj.rows[x].ItemName + " </p> ";
                        data += " <p class='w3-col l3 s6 m6 w3-right-align w3-right'>" + obj.rows[x].MenuName + "</p>";
                        data += " <p class='w3-col l3 s6 m6 w3-left-align w3-right'>page : " + obj.rows[x].Url + "</p>";
                        data += " <p class='w3-col l3 s6 m6 w3-left-align w3-right'>Name : " + obj.rows[x].Itemen + "</p>";
                        data += "</div></li>";
                    }
                }
                //alert(data);
                document.getElementById("sdata").innerHTML = data;
                showFooter(obj, false);
            },
            error: function (text) { showMessage(text); }
        });
    } catch (e) { showMessage(e, 'alert'); }

}
//--------------------------------
function showSearch() {

    var x = document.getElementById("searchdiv");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

function search() {
    showSearch();
    showinfo();
}

//-------------------
function showSort() {

    var x = document.getElementById("sortdiv");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}
function sortshow() {
    showSort();
    showinfo('');
}
function testinput() {
    try {

        var name = document.getElementById("name").value;
        var aname = document.getElementById("aname").value;
        var ename = document.getElementById("ename").value;
        var icon = document.getElementById("icon").value;
        var url = document.getElementById("url").value;


        if (aname == "") {
            showMessage("ادخل اسم العربي");
            return;
        }
        if (ename == "") {
            showMessage("Input Title English");
            return;
        }
        document.getElementById('data').style.display = 'none';
        var x = document.getElementById('btnsave');
        if (x.className.indexOf("w3-hide") == -1) {
            x.className += " w3-hide";
        }
        showinfo(document.getElementById('mode').value);
    }
    catch (e) { showMessage(e); }
}
function add() {
    try {

        document.getElementById("id").value = "";
        document.getElementById("name").value = "";
        document.getElementById("aname").value = "";
        document.getElementById("ename").value = "";
        document.getElementById("url").value = "";
        document.getElementById("icon").value = "";
        document.getElementById("cmbm").value = "";
        document.getElementById("show").checked = false;
        document.getElementById("chk").checked = false;
        document.getElementById('data').style.display = 'block';
        var x = document.getElementById('btndelete');
        if (x.className.indexOf("w3-hide") == -1) {
            x.className += " w3-hide";
        }
        x = document.getElementById('btnsave');
        if (x.className.indexOf("w3-hide") != -1) {
            x.className = x.className.replace(" w3-hide", "");
        }
        document.getElementById('mode').value = "add";
    }
    catch (e) { showMessage(e); }
}
function chkclick() {
    chk = true;
}
function showdata(no) {
    try {
        if (chk == true) { chk = false; return; }
        row = obj.rows[no];
        document.getElementById("id").value = row.ItemCode;
        document.getElementById("name").value = row.ID;
        document.getElementById("ename").value = row.Itemen;
        document.getElementById("aname").value = row.ItemName;
        document.getElementById("icon").value = row.format;
        document.getElementById("cmbm").value = row.MenuCode;
        document.getElementById("url").value = row.Url;
        document.getElementById("chk").checked = false;
        document.getElementById("show").checked = false;

        var con = row.type;
        if (con == "1") document.getElementById("chk").checked = true;

        var show = row.show;
        if (show == "1") document.getElementById("show").checked = true;

        document.getElementById('data').style.display = 'block';
        if (delchk == true) {
            var x = document.getElementById('btndelete');
            if (x.className.indexOf("w3-hide") != -1) {
                x.className = x.className.replace(" w3-hide", "");
            }
        }
        if (editchk == true) {
            x = document.getElementById('btnsave');
            if (x.className.indexOf("w3-hide") != -1) {
                x.className = x.className.replace(" w3-hide", "");
            }

        }

        document.getElementById('mode').value = "edit";
    }
    catch (e) { showMessage(e); }
}
function del(no) {
    try {
        ans = confirm("هل انت متاكد من حذف البيانات ");
        if (ans) {
            document.getElementById('mode').value = "delete";
            document.getElementById('data').style.display = 'none';
            showinfo('delete');
        }
    }
    catch (e) { showMessage(e); }
}
//----------------

