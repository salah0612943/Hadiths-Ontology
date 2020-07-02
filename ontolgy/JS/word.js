var obj
var chk = false;
$(function () {
    clearBottom();
    showinfo('list');
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
        var wordtypear = document.getElementById('cmbar').value;
        var wordtypeen = document.getElementById('cmben').value;
        sort = document.getElementById("sortname").value;
        order = document.getElementById("sorttype").value;
        sname = document.getElementById("sname").value;
        sename = document.getElementById("sename").value;
        //alert(wordtypear);
        $.ajax({
            type: "GET",
            url: "code/word.ashx",
            data: { id: id, name: name, ename: ename,wordtypear: wordtypear ,wordtypeen:wordtypeen, sname: sname, sename: sename, mode: mode, page: page, rows: rows, sort: sort, order: order },
            success: function (text) {
                //alert(text);
                obj = JSON.parse(text);
                if (obj.msg != '') showMessage(obj.msg);
                var data = "";
                for (var x = 0; x < obj.rows.length; x++) {
                    data += " <li   class=' w3-padding w3-right-align' onclick='showdata(\"" + x + "\")'>";
                    data += " <div class='w3-row'>";
                    data += "<p class='w3-col l6 s12 m12 w3-right-align w3-right'>";
                    //data += "<input id='chk" + x + "' name='chk" + x + "' class='w3-check' type='checkbox'  onclick='chkclick()'/> ";
                    data += " " + obj.rows[x].wordar + " </p> ";
                    data += " <p class='w3-col l6 s12 m12 w3-left-align w3-right'>" + obj.rows[x].worden + "</p>";
                    data += "</div></li>";
                }
                document.getElementById("sdata").innerHTML = data;
                showFooter(obj, false);
            },
            error: function (text) { showMessage(text); }
        });
    } catch (e) { showMessage(e, 'alert');}

}

function testinput()
{
 try {
        var name =document.getElementById('name').value ;
        var ename = document.getElementById('ename').value;
        if (name == "") {
            showMessage("يجب ادخال الكلمة ");
            return;
        }
        if (ename == "") {
            showMessage("يجب ادخال   الكلمة انجليزي");
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
        document.getElementById('cmbar').value = "";
        document.getElementById('cmben').value = "";
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
        document.getElementById('name').value = obj.rows[no].wordar;
        document.getElementById('ename').value = obj.rows[no].worden;
        document.getElementById('id').value = obj.rows[no].wordid;
        document.getElementById('cmbar').value = obj.rows[no].wordtypear;
        document.getElementById('cmben').value = obj.rows[no].wordtypeen;
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

