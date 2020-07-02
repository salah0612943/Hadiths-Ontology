var obj
var chk = false;
var curr = 0;
$(function () {
    clearBottom();
    showinfo('list');
    getCombo('opword', "wordid,worden+' '+wordar,word");
});
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

function getchk() {
    //var info = getcheck(obj.rows, 'pid');
    //alert(info);
}

function sortshow() {
    showSort();
    //alert("dfsd");
   showinfo('');
}
//==================
function showinfo(mode) {
    
    try {
        var name = document.getElementById('name').value;
        var ename = document.getElementById('ename').value;
        var id = document.getElementById('id').value;
        sort = document.getElementById("sortname").value;
        order = document.getElementById("sorttype").value;
        sname = document.getElementById("sname").value;
        sename = document.getElementById("sename").value;
        //alert(sort);
        $.ajax({
            type: "GET",
            url: "code/groupinfo.ashx",
            data: { id: id, name: name, ename: ename, sname: sname, sename: sename, mode: mode, page: page, rows: rows, sort: sort, order: order },
            success: function (text) {
                //alert(text);
                obj = JSON.parse(text);
                if (obj.msg != '') showMessage(obj.msg);
                var data = "";
                for (var x = 0; x < obj.rows.length; x++) {
                    data += " <li   class=' w3-padding w3-right-align' onclick='showdata(\"" + x + "\")'>";
                    data += " <div class='w3-row'>";
                    data += "<p class='w3-col l6 s12 m12 w3-right-align w3-right' onclick='showword(\"" + x + "\")' >";
                    //data += "<input id='chk" + x + "' name='chk" + x + "' class='w3-check' type='checkbox'  onclick='chkclick()'/> ";
                    data += " " + obj.rows[x].namear + " </p> ";
                    data += " <p class='w3-col l6 s12 m12 w3-left-align w3-right'>" + obj.rows[x].nameen + "</p>";
                    data += "</div></li>";
                }
                document.getElementById("sdata").innerHTML = data;
                showFooter(obj, false);
            },
            error: function (text) { showMessage(text); }
        });
    } catch (e) { showMessage(e, 'alert');}

}
function showword(x) {
    try {
        chk = true;
        curr = x;
        document.getElementById('data').style.display = 'none';
        document.getElementById('word').style.display = 'block';
        document.getElementById('lgid').innerHTML = obj.rows[x].namear + ' ' + obj.rows[x].nameen;
        var id = obj.rows[x].groupid;
        var name = document.getElementById('opword').value;
        var ename = document.getElementById('wordtype').value;
        var mode = document.getElementById('wmode').value;
        document.getElementById("lword").innerHTML = "";
       
       $.ajax({
            type: "GET",
            url: "code/groupword.ashx",
            data: { id: id, name: name, ename: ename, mode: mode },
            success: function (text) {
                //alert(text);
                var obj1 = JSON.parse(text);
                var data = "";
                for (var z = 0; z < obj1.length; z++) {
                    data += " <li   class=' w3-padding w3-right-align' >";
                    data += " <div class='w3-row'>";
                    data += "<p class='w3-col l6 s12 m12 w3-right-align w3-right'  >";
                    //data += "<input id='chk" + x + "' name='chk" + x + "' class='w3-check' type='checkbox'  onclick='chkclick()'/> ";
                    data += " " + obj1[z].wordar + " </p> ";
                    data += " <p class='w3-col l6 s12 m12 w3-left-align w3-right'>" + obj1[z].worden + "</p>";
                    data += "</div></li>";
                }
                document.getElementById("lword").innerHTML = data;
               
            },
            error: function (text) { showMessage(text); }
        });
 
 }
 catch (e) { showMessage(e); }
}
function addword() {
    var name = document.getElementById('opword').value;
    if (name == "") {
        showMessage('please select word');
        return;
    }
    document.getElementById('wmode').value = 'add';
    showword(curr);
}
function delwords() {
    var name = document.getElementById('opword').value;
    if (name == "") {
        showMessage('please select word');
        return;
    }
    document.getElementById('wmode').value = 'delete';
    showword(curr);
}
function testinput()
{
 try {
        var name =document.getElementById('name').value ;
        var ename = document.getElementById('ename').value;
        if (name == "") {
            showMessage("يجب ادخال اسم الموضوع");
            return;
        }
        if (ename == "") {
            showMessage("يجب ادخال اسم الموضوع انجليزي");
            return;
        }
        document.getElementById('data').style.display = 'none';
        showinfo(document.getElementById('mode').value);
    }
    catch (e) { showMessage(e); }
}
function add() {
    try {
        document.getElementById('name').value = "";
        document.getElementById('ename').value = "";
        document.getElementById('id').value = "";
        document.getElementById('data').style.display = 'block';
        var x = document.getElementById('btndelete');
        if (x.className.indexOf("w3-hide") == -1) {
            x.className += " w3-hide";
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
        if (chk == true) {chk = false;  return; }
        document.getElementById('name').value = obj.rows[no].namear;
        document.getElementById('ename').value = obj.rows[no].nameen;
        document.getElementById('id').value = obj.rows[no].groupid;
        document.getElementById('data').style.display = 'block';
        var x = document.getElementById('btndelete');
        if (x.className.indexOf("w3-hide") != -1) {
            x.className = x.className.replace(" w3-hide", "");
        }
        document.getElementById('mode').value = "edit";
    }
    catch (e) {showMessage(e);}
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
function myFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("sdata");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

//---------------

