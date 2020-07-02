function getdata() {
    try {
        var div = document.getElementById("main");
//        var children = div.childNodes;
//        //alert(children.length);
//        for (var x = 0; x < children.length; x++) {
//            alert(children[x].nodeName + '  ' + children[x].text + '  ' + children[x].id + '  ' + children[x].nodeValue);

        //        }
        var labels = div.getElementsByClassName('read');
        //var txt = document.getElementsByTagName('input');
        alert(labels.length);
        for (var i = 0; i < labels.length; i++) {
            alert(labels[i].innerHTML + '  ' + labels[i].id );
            //labels[i].innerHTML = 'test test ';
        }
        
        //alert(txt.length);
    }
    catch (e) {alert(e); }

}

function testdata() {
    try {
        var id = document.getElementById("loginid").value;
        var pass = document.getElementById("loginpass").value;

        if (id == "") {
            showMessage("ادخل رقم المستخدم");
            return;
        }
        if (pass == "") {
            showMessage("ادخل كلمة المرور");
            return;
        }

        $.ajax({
            type: "GET",
            url: "code/Login.ashx",
            data: { id: id, pass: pass },
            success: function (text) {
                //alert(text);
                document.getElementById("loginid").value = "";
                document.getElementById("loginpass").value = "";
                if (text != "") {
                    var obj = JSON.parse(text);
                    storeValue("uid", id);
                    window.uname = obj[0].name;
                    window.pass = pass;
                    if (obj[0].pagename == 'ahome') storeValue("op", 1);

                    openpage(obj[0].pagename);
                }
                else { showMessage('رقم المستخدم او كلمة المرور غير صحيحة', 'alert'); }
            },
            error: function (text) { showMessage(text); }
        });
    } catch (e) { showMessage(e, 'alert'); }
}

//==================