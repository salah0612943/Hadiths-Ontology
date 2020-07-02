var obj
var chk = false;
$(function () {

  
    clearBottom();
     changeLang('en');
});

  //---------------------------

  function setlabel() {
 
}

function search() {
    try {

        var sword = document.getElementById("sword").value;
        var ssee = document.getElementById("ssee").value;
        var schapter = document.getElementById("schapter").value;
        if (sword == "" && ssee == "" && schapter == "") {
            clearBottom();
            return;
        }
        $.ajax({
            type: "GET",
            url: "code/search.ashx",
            data: { sword: sword, ssee: ssee, schapter: schapter },
            success: function (text) {
                // alert(text);
                var arr = text.split("/++/");
                obj = JSON.parse(arr[0]);

                var ar = "";
                var en = "";
                if (arr[1] != "") {
                    obj1 = JSON.parse(arr[1]);
                    for (var y = 0; y < obj1.length; y++) {
                        var type1 = "المرادف";
                        var type2 = "like";
                        if (obj1[y].wordtype == "2") { type1 = "الضد"; type2 = "opposite"; }
                        ar += "<p  class='w3-col l6 s12 m12 w3-right-align w3-right'> " + obj1[y].wordar + " - " + obj1[y].wordtypear + " - " + type1 + "</p>";
                        en += "<p  class='w3-col l6 s12 m12 w3-left-align w3-left'> " + obj1[y].worden + " - " + obj1[y].wordtypeen + " - " + type2 + "</p>";
                    }
                }
                //alert(ar + " hhh");
                var data1 = "";
                for (var x = 0; x < obj.rows.length; x++) {
                    if (lang == 'ar') {
                        data1 += " <li   class=' w3-padding w3-right-align ' >";
                        data1 += " <div class='w3-row'>";
                        data1 += "<p class='w3-col l6 s12 m12 w3-right-align w3-right'>الفصل : ";
                        //data1 += "<input id='chk" + x + "' name='chk" + x + "' class='w3-check' type='checkbox'  onclick='chkclick()'/> ";
                        data1 += " " + obj.rows[x].tnamear + " ";
                        data1 += " <a href='javascript:showword(" + obj.rows[x].sid + ")'>الكلمات</a></p>";
                        data1 += " <p class='w3-col l6 s12 m12 w3-right-align w3-right'> عن : " + obj.rows[x].pnamear;
                        if (obj.rows[x].rid != 0) data1 += " - " + obj.rows[x].sname
                        data1 += " <a href='javascript:showsee(" + x + ")'>(" + obj.rows[x].seeno + ")</a></p>";
                        data1 += " <p class=' w3-right ' style='text-align:justify '>" + obj.rows[x].snamear + "</p>";
                        data1 += ar;
                        data1 += "</div></li>";
                    }
                    else {
                        data1 += " <li   class=' w3-padding w3-left-align ' style='direction:ltr'>";
                        data1 += " <div class='w3-row' style='direction:ltr'>";
                        data1 += "<p class='w3-col l6 s12 m12 w3-left-align w3-left'>chapter : ";
                        //data1 += "<input id='chk" + x + "' name='chk" + x + "' class='w3-check' type='checkbox'  onclick='chkclick()'/> ";
                        data1 += " " + obj.rows[x].tnameen + "  ";
                        data1 += " <a href='javascript:showword(" + obj.rows[x].sid + ")'>Words</a></p>";
                        data1 += " <p class='w3-col l6 s12 m12 w3-left-align w3-left'> about : " + obj.rows[x].pnameen;
                        if (obj.rows[x].rid != 0) data1 += " - " + obj.rows[x].sename
                        data1 += " <a href='javascript:showsee(" + x + ")'>("+ obj.rows[x].seeno +")</a></p>";
                        data1 += " <p class=' w3-left ' style='text-left:justify '>" + obj.rows[x].snameen + "</p>";
                        data1 += en;
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
function showword(x) {
    try {

        document.getElementById('wordshow').style.display = 'block';
        $.ajax({
            type: "POST",
            url: "code/subjectWord.ashx",
            data: { sid: x, mode: '' },
            success: function (text) {
                var data1 = "";
                if (text != "") {
                    obj1 = JSON.parse(text);

                    document.getElementById("words").innerHTML = "";
                    for (var x = 0; x < obj1.Records.length; x++) {
                        if (lang == 'ar') {
                            //alert(obj1.Records[x].fwordar);
                            data1 += " <li   class=' w3-padding w3-right-align' >";
                            data1 += " <p class='w3-right-align '>  " + obj1.Records[x].fwordar + ' - ' + obj1.Records[x].relationAr + ' - ' + obj1.Records[x].lwordar + "</p>";
                            data1 += " </li>";
                        }
                        else {
                            data1 += " <li   class=' w3-padding w3-left-align' >";
                            data1 += " <p class='w3-left-align'>  " + obj1.Records[x].fworden + '- ' + obj1.Records[x].relationEn + '-' + obj1.Records[x].lworden + "</p>";
                            data1 += " </li>";

                        }
                    }
                }

                document.getElementById("words").innerHTML = data1;



            },
            error: function (text) { showMessage(text); }
        });
        
    } catch (e) { showMessage(e, 'alert'); }
}
function showsee(x) {
        try{
           
            document.getElementById('see').style.display = 'block';
            document.getElementById("old").value = obj.rows[x].sid;
            if (lang == 'ar') {
                document.getElementById("per").value = obj.rows[x].pnamear;
            }
            else {
                document.getElementById("per").value = obj.rows[x].pnameen;
            }
            document.getElementById("usee").innerHTML = "";
            sendsee('');
        } catch (e) { showMessage(e, 'alert'); }
    }

    //==================
    function sendsee(mode) {
        try {
            var id = document.getElementById("old").value;
            $.ajax({
                type: "GET",
                url: "code/see.ashx",
                data: { id: id },
                success: function (text) {
                    //alert(text);
                    var data1 = "";
                    if (text != "") {
                        objsee = JSON.parse(text);

                        document.getElementById("usee").innerHTML = "";
                        for (var x = 0; x < objsee.Records.length; x++) {
                            if (lang == 'ar') {
                                data1 += " <li   class=' w3-padding w3-right-align' >";
                                data1 += " <p class='right-align'> عن " + objsee.Records[x].pnamear + "</p>";
                                data1 += " </li>";
                            }
                            else {
                                data1 += " <li   class=' w3-padding w3-left-align' >";
                                data1 += " <p class='left-align'> about " + objsee.Records[x].pnameen + "</p>";
                                data1 += " </li>";

                            }
                        }
                    }
                    //-----------------------------
                    if (lang == 'ar') {
                        data1 += " <li   class=' w3-padding w3-right-align' >";
                        data1 += " <p class='right-align'> عن " + document.getElementById("per").value + "</p>";
                        data1 += " </li>";
                    }
                    else {
                        data1 += " <li   class=' w3-padding w3-left-align' >";
                        data1 += " <p class='left-align'> about " + document.getElementById("per").value + "</p>";
                        data1 += " </li>";

                    }

                    document.getElementById("usee").innerHTML = data1;

                },
                error: function (text) { showMessage(text); }
            });
        } catch (e) { showMessage(e, 'alert'); }
    }