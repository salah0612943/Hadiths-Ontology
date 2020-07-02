var obj;
var objsee;
var chk = false;
$(function () {
    if (lang == 'ar') {
        getCombo("cmbm", "pid,pnamear,person");
        getCombo("cmbp", "pid,pnamear,person");
        getCombo("cmbs", "tid,tnamear,topic");
        getCombo("cmbf", "wordid,wordar,word");
        getCombo("cmbl", "wordid,wordar,word");
    }
    else {
        getCombo("cmbm", "pid,pnameen,person");
        getCombo("cmbp", "pid,pnameen,person");
        getCombo("cmbs", "tid,tnameen,topic");
        getCombo("cmbf", "wordid,worden,word");
        getCombo("cmbl", "wordid,worden,word");
    }
   
    clearBottom();
    showinfo('list');
});
function deleteitem(item,id)
{
    item.parentElement.style.display = 'none';
    addword('delete', id);
}

function addword(mode,id) {
    try {
        
        var fword = document.getElementById("cmbf").value;
        var lword = document.getElementById("cmbl").value;
        var txtar = document.getElementById("txtar").value;
        var txten = document.getElementById("txten").value;
        var sid = document.getElementById('id').value;
        if (mode == 'add') {
            if (fword == "") {
                alert("select Start word");
                return
            }

            if (lword == "") {
                alert("select second word");
                return;
            }

            if (txtar == "") {
                alert("input relation word");
                return;
            }
        }
        //alert(mode);
        $.ajax({
            type: "POST",
            url: "code/subjectWord.ashx",
            data: { id: id, sid: sid, fword: fword, lword: lword, txtar: txtar, txten: txten, mode: mode },
            success: function (text) {
                //alert(text);
                obj1 = JSON.parse(text);
                if (obj1.Result != '') showMessage(obj1.Result);
                var data1 = '<ul class="w3-ul">';
                //alert(obj1.Records.length);
                for (var x = 0; x < obj1.Records.length; x++) {
                    if (lang == 'ar') {
                        data1 += '  <li class="w3-display-container">' + obj1.Records[x].fwordar + '- ' + obj1.Records[x].relationAr + '-' + obj1.Records[x].lwordar + ' <span onclick="deleteitem(this,' + obj1.Records[x].rid + ')"" class="w3-button w3-transparent w3-display-right">&times;</span></li>';
                    }
                    else {
                        data1 += '  <li class="w3-display-container">' + obj1.Records[x].fworden + '- ' + obj1.Records[x].relationEn + '-' + obj1.Records[x].lworden + ' <span onclick="deleteitem(this,' + obj1.Records[x].rid + ')"" class="w3-button w3-transparent w3-display-right">&times;</span></li>';
                    }
                }
                data1 += '</ul>';
                //alert(data1);
                document.getElementById("showli").innerHTML = data1;
                
            },
            error: function (text) { showMessage(text); }
        });
   }
   catch(e){alert(e);}
}
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
//-----------------
function word() {
    try {
        document.getElementById('data').style.display = 'none';
        document.getElementById('worddata').style.display = 'block';
        var selm = document.getElementById("cmbm");
        var sels = document.getElementById("cmbs");
        document.getElementById('seedata').innerHTML = selm.options[selm.selectedIndex].text;
        document.getElementById('chdata').innerHTML = sels.options[sels.selectedIndex].text;
        addword('', '');
    }
    catch (e) { showMessage(e); }
}
//==================
function showinfo(mode) {
    
    try {
        var name = document.getElementById('name').value;
        var ename = document.getElementById('ename').value;
        var pid = document.getElementById('cmbm').value;
        var tid = document.getElementById('cmbs').value;
        var id = document.getElementById('id').value;
        sort = document.getElementById("sortname").value;
        order = document.getElementById("sorttype").value;
        sname = document.getElementById("sname").value;
        sename = document.getElementById("sename").value;
       
        var data = new FormData();
        data.append('tid', tid);
        data.append('pid', pid);
        data.append('id', id);
        data.append('name', name);
        data.append('ename', ename);
        data.append('sort', sort);
        data.append('order', order);
        data.append('sname', sname);
        data.append('sename', sename);
        data.append('mode', mode);
        data.append('page', page);
        data.append('rows', rows);
        //alert('gg');
        $.ajax({
            type: "POST",
            url: "code/hadth.ashx",
            data: data,
            contentType: false,
            processData: false,
            success: function (text) {
                //alert(text);
                obj = JSON.parse(text);
                if(obj.msg!='')    showMessage(obj.msg);
                var data1 = "";
                for (var x = 0; x < obj.rows.length; x++) {
                    if (lang == 'ar') {
                        data1 += " <li   class=' w3-padding w3-right-align' onclick='showdata(\"" + x + "\")'>";
                        data1 += " <div class='w3-row'>";
                        data1 += "<p class='w3-col l6 s12 m12 w3-right-align w3-right'>الفصل : ";
                        //data1 += "<input id='chk" + x + "' name='chk" + x + "' class='w3-check' type='checkbox'  onclick='chkclick()'/> ";
                        data1 += " " + obj.rows[x].tnamear + " </p> ";
                        data1 += " <p class='w3-col l6 s12 m12 w3-right-align w3-right'> عن : " + obj.rows[x].pnamear + " <a href='javascript:showsee(" + x + ")'>(" + obj.rows[x].seeno + ")</a></p>";
                        data1 += " <p class='w3-col l6 s12 m12 w3-right-align w3-right'>" + obj.rows[x].snamear + "</p>";
                        data1 += "</div></li>";
                    }
                    else {
                        data1 += " <li   class=' w3-padding w3-left-align' onclick='showdata(\"" + x + "\")'>";
                        data1 += " <div class='w3-row'>";
                        data1 += "<p class='w3-col l6 s12 m12 w3-left-align w3-left'>Topic : ";
                        //data1 += "<input id='chk" + x + "' name='chk" + x + "' class='w3-check' type='checkbox'  onclick='chkclick()'/> ";
                        data1 += " " + obj.rows[x].tnameen + " </p> ";
                        data1 += " <p class='w3-col l6 s12 m12 w3-left-align w3-left'> about : " + obj.rows[x].pnameen + " <a href='javascript:showsee(" + x + ")'>(" + obj.rows[x].seeno + ")</a></p>";
                        data1 += " <p class='w3-col l6 s12 m12 w3-left-align w3-left'>" + obj.rows[x].snameen + "</p>";
                        data1 += "</div></li>";
                    }
                }
                document.getElementById("sdata").innerHTML = data1;
                showFooter(obj, false);
            },
            error: function (text) { showMessage(text); }
        });
    } catch (e) { showMessage(e, 'alert');}

}

function showsee(x) {
        try{
            document.getElementById('data').style.display = 'none';
            document.getElementById('see').style.display = 'block';
            document.getElementById("id").value = obj.rows[x].sid;
            sendsee('');
        } catch (e) { showMessage(e, 'alert'); }
    }

    function savesee() {
        try {
            var cmb = document.getElementById("cmbp").value;
            var rank = document.getElementById("rank").value;
            if (cmb == "") {
                showMessage("يجب تحدد الشخص");
                return;
            }
            if (rank == "") {
                showMessage("يجب تحدد الترتيب");
                return;
            }
            sendsee('add');
        } catch (e) { showMessage(e, 'alert'); }
    }

    function delsee() {
        try {
            var cmb = document.getElementById("cmbp").value;
            if (cmb == "") {
                showMessage("يجب تحدد الشخص");
                return;
            }
            ans = confirm("هل انت متاكد من حذف البيانات ");
            if (ans) { sendsee('delete'); }
        } catch (e) { showMessage(e, 'alert'); }
    }
    function sendsee(mode) {
        try {
            var pid = document.getElementById("cmbp").value;
            var rank = document.getElementById("rank").value;
            var id = document.getElementById("id").value;
            $.ajax({
                type: "GET",
                url: "code/see.ashx",
                data: { id: id, pid: pid, rank: rank, mode: mode },
                success: function (text) {
                    //alert(text);
                    objsee = JSON.parse(text);
                    var data1 = "";
                    
                    for (var x = 0; x < objsee.Records.length; x++) {
                        data1 += " <li   class=' w3-padding w3-right-align' onclick='showdsee(\"" + x + "\")'>";
                        data1 += " <p class='right-align'>" + objsee.Records[x].pnamear + " التريب : " + objsee.Records[x].rank + "</p>";
                        data1 += " </li>";
                    }
                   
                    document.getElementById("usee").innerHTML = data1;

                },
                error: function (text) { showMessage(text); }
            });
        } catch (e) { showMessage(e, 'alert'); }
    }
    //----------------
    function showdsee(no) {
        try {

            document.getElementById('cmbp').value = objsee.Records[no].pid;
            document.getElementById('rank').value = objsee.Records[no].rank;
           
        }
        catch (e) { showMessage(e); }

    }
function testinput()
{
    try {
        var pid = document.getElementById('cmbm').value;
        var tid = document.getElementById('cmbs').value;
        var name =document.getElementById('name').value ;
        var ename = document.getElementById('ename').value;
        if (pid == "") {
            showMessage("يجب ادخال اسم الشخص");
            return;
        }
        if (tid == "") {
            showMessage("يجب ادخال اسم الفصل");
            return;
        }
        if (name == "") {
            showMessage("يجب ادخال  الحديث");
            return;
        }
        if (ename == "") {
            showMessage("يجب ادخال  الحديث انجليزي");
            return;
        }
        document.getElementById('data').style.display = 'none';
        showinfo(document.getElementById('mode').value);
    }
    catch (e) { showMessage(e); }
}
function add() {
    try {
        document.getElementById('cmbm').value = "";
        document.getElementById('cmbs').value = "";
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
        
        if (chk == true) { chk = false; return; }
        document.getElementById('cmbm').value = obj.rows[no].pid;
        document.getElementById('cmbs').value = obj.rows[no].tid;
        document.getElementById('name').value = obj.rows[no].snamear;
        document.getElementById('ename').value = obj.rows[no].snameen;
        document.getElementById('id').value = obj.rows[no].sid;
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

