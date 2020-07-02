var loading;
var lang = 'en';
var companyar = 'ألإنتولوجي';
var companyen = 'Ontology';
$(function () {
    storeValue("uid", 0);
    storeValue("op", 0);
    $("#main").empty();
    $("#main").load('Page/home.html');
    SetupSize();
});

$(document).ready(function () {
    try {
            $(document).ajaxStart(function () {
                loading = new showLoad();
                setTimeout(function () { loading.hideLoad(); }, 30000);
            })
       .ajaxStop(function () {
           loading.hideLoad();
       });
    }
   catch (e) { showMessage(e); }
});


window.onscroll = function () { myFunction() };
function myFunction() {
    var navbar = document.getElementById("MHeader");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.getElementById("MHeader").classList.add('w3-white');
        document.getElementById("MHeader").classList.add('w3-card');
        document.getElementById("MHeader").classList.add('w3-round-large');
    } else {
        document.getElementById("MHeader").classList.remove('w3-white');
        document.getElementById("MHeader").classList.remove('w3-card');
        document.getElementById("MHeader").classList.remove('w3-round-large');
    }
}


//---------------------------------
function storeValue(key, value) {
    if (localStorage) {
        localStorage.setItem(key, value);
    }
    else {
        $.cookies.set(key, value);
    }
}
//---------------------------
function getValue(key) {
    if (localStorage) {
        return localStorage.getItem(key);
    }
    else {
        return $.cookies.get(key);
    }
}
//------------------------------------

var showMessage = function (message, type) {
    $("#Attiah_message").remove();
    var color = 'w3-theme';
    if (type == 'success') {
        color = ' w3-green';
    }
    else if (type == 'alert') {
        color = ' w3-red ';
    }
    else {
        color = ' w3-theme ';
    }
    var msg = ' <div id="Attiah_message" class="w3-modal" style="display:none; ">';
    msg += ' <div style=" width:500px; height:60px;" class=" w3-modal-content  w3-display-container w3-card w3-round-xlarge w3-animate-opacity ' + color + '">';
    msg += ' <span onclick="document.getElementById(\'Attiah_message\').style.display = \'none\';"';
    msg += ' class="w3-button ' + color + ' w3-xlarge w3-display-left " style="padding-left:10px;">&times;</span>';
    msg += ' <p style="padding-top:10px;" class="w3-center w3-large ">' + message + '</p>';
    msg += ' </div></div> '; $('body').append(msg);
    document.getElementById('Attiah_message').style.display = 'block';
    setTimeout(function () {
        document.getElementById('Attiah_message').style.display = 'none';
    }, 1500);
};
//---------------------------------------------
var showLoad = function () {
    $("#Attiah_Load").remove();
    var color = 'w3-theme';
    var msg = ' <div id="Attiah_Load" class="w3-modal" style="display:none; "> <div style=" width:350px; height:50px;" class=" w3-modal-content w3-center w3-padding w3-large w3-display-container w3-card w3-round-xlarge w3-animate-opacity ' + color + '">Loading ..... جاري التحميل  &nbsp; <img  src="Image/sb_loading.gif" /> </div></div> ';
    $('body').append(msg); document.getElementById('Attiah_Load').style.display = 'block';
    this.hideLoad = function () {
        document.getElementById('Attiah_Load').style.display = 'none';
    };
};
//---------------------------------------------
function openMenu() {
    try {
        var op = getValue("op");
        //alert(op);
        if (op == 0) {
            openpage('outMenu');
        }
        if (op == 1) {
            openpage('ahome');
        }

    } catch (e) { showMessage(e); }
}

function openpage(pagename) {
    try {
        var page = "Page/" + pagename + ".html";
        document.getElementById("main").innerHTML = "";
        document.getElementById("curr").value = pagename;
        //alert(page);
        $.ajax({
            type: "GET",
            url: page,
            success: function (text) {
                if (text != "") {
                    $("#main").empty();
                    $("#main").html(text);
                    changepage();
                    findlabel();
                   
                }
                else { window.item = null; }
            },
            error: function (text) { showMessage(text); }
        });

    } catch (e) { alert(e); }
}

//------------------------------------

function SetupSize() {
    try {
        var myWidth = 0, myHeight = 0, top = 0, bottom = 0;
        top = document.getElementById('MHeader').clientHeight;
        bottom = document.getElementById('bottom').clientHeight;
        if (typeof (window.innerWidth) == 'number') {
            //Non-IE
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
            //top = document.getElementById('MHeader').style.height;
            //bottom = document.getElementById('bottom').style.height;
        } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            //IE 6+ in 'standards compliant mode'
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
            //top = document.getElementById('MHeader').clientHeight;
            //bottom = document.getElementById('bottom').clientHeight;
        } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
            //IE 4 compatible
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
            //top = document.getElementById('MHeader').clientHeight;
            //bottom = document.getElementById('bottom').clientHeight;
        }

        // alert(top + ' ' + bottom);
        document.getElementById("main").style.top = (top)  + "px";
        document.getElementById("main").style.bottom = (bottom) + "px";
        var h = (myHeight - (top + bottom));
        //alert(myHeight + ' ' + top + ' ' + bottom + ' ' + h);
        document.getElementById("main").style.minHeight = h + "px";
        //document.getElementById("main").style.height = (myHeight - (top + bottom) + 100) + "px";
        //alert('pppp');
    }
    catch (e) {alert(e);}
}

function reszie() {
    
    SetupSize();
}



//-----------------
function getCombo(toolname, data) {
    try {
        var obj = document.getElementById(toolname);

        var url = "code/Fillcombo.ashx";
        if (data.indexOf(".") != -1) {
            var ar = data.split("//");
            url = ar[0]; data = ar[1];
        }
        $.ajax({
            type: "GET",
            url: url,
            data: { data: data },
            success: function (text) {
                //alert(text);
                while (obj.options.length > 0) {
                    obj.options.remove(0);
                }
                var optdata = document.createElement("option");
                obj.options.add(optdata);
                optdata.text = "";
                optdata.value = "";
                var arr = text.split(";");
                var count = 1;
                while (count < arr.length) {
                    var ar = arr[count].split("++\\");
                    optdata = document.createElement("option");
                    obj.options.add(optdata);
                    optdata.text = ar[1];
                    optdata.value = ar[0];
                    count = count + 1;
                }
            }
                     , error: function (text) { showMessage(text); }
        });
    } catch (e) { }
}
//-------------------


window.oncontextmenu = function (e) {
    Readtools();
    e.preventDefault();
}


function Readtools() {
    try {
       // alert('start');
        var div = document.getElementById("main");
        var labels = div.getElementsByClassName('read');
        var data = "";
        for (var i = 0; i < labels.length; i++) {
            if (i == 0)
                data += labels[i].id + "++" + labels[i].innerHTML;
            else
                data +="/++/"+ labels[i].id + "++" + labels[i].innerHTML;
        }
        //alert(data);
        var txt = div.getElementsByTagName('input');
        data += "/--/";
       /* for ( i = 0; i < txt.length; i++){
            if (txt[i].id != 'old' && txt[i].id!='mode')
           {
              var title = txt[i].title;
               data += "/++/" + txt[i].id + "++" + title;
            }
       }*/
        var pagename = document.getElementById("curr").value;
        //alert(data+' '+pagename);
       $.ajax({
           type: "GET",
           url: "code/savelabel.ashx",
           data: { data: data, pagename: pagename },
           success: function (text) {
              if(text!="") showMessage(text);
              
           },
           error: function (text) { showMessage('fdgdfgdf '+text); }
       });
   }
    catch (e) { alert(e); }

}
//------------------------------
function findlabel() {
    try {

        var pagename = document.getElementById("curr").value;
        //alert(pagename);
        if (pagename == 'outMenu' || pagename == 'ahome') {showSMenu(); return; }
        $.ajax({
            type: "GET",
            url: "code/getlabel.ashx",
            data: { pagename: pagename },
            success: function (text) {
                if (text != null || text != '') {
                    try {
                        var obj = JSON.parse(text);
                        for (var x = 0; x < obj.length; x++) {
                            //alert(obj[x].name);
                            if (lang === 'ar') {
                                document.getElementById(obj[x].lblname).innerHTML = obj[x].ar;
                            }
                            else {
                                document.getElementById(obj[x].lblname).innerHTML = obj[x].en;
                            }
                        }

                    } catch (ee) { }
                }
            },
            error: function (text) { showMessage(text); }
        });
    } catch (e) { showMessage(e, 'alert'); }
}
//------------------------------
function checkUp() {
    try {
        var lang = getValue("lang");
        var text = getValue("pagelabel");
        //alert(text);
        obj = JSON.parse(text);

        if (obj != null) {
            try {
                for (var x = 0; x < obj.length; x++) {
                    var req = parseInt(obj[x].condition);
                    var mydata = "";
                    if (req == 1) {
                        var tool = document.getElementById(obj[x].text);
                        if (tool != null) { mydata = tool.value; }
                        if (mydata == "") {
                            if (state === 'ar') {
                                showMessage(obj[x].mar);
                                return false;
                            }
                            else {
                                showMessage(obj[x].men); ;
                                return false;
                            }
                        }
                    }
                }
                return true;
            } catch (ee) { return false; }
        }
        return true;
    } catch (e) { showMessage(e); return true; }
}

//--------------------------
function changeLang(mode) {
    try {
        lang = mode;
        setBarStyle();
        changepage();
        findlabel();
    }
    catch (e) { alert('kkk ' + e); }
}
//----------------------------
function changepage() {
    try {
        var dir1 = document.getElementsByClassName('dir1');
        var x = 0;
        for (x = 0; x < dir1.length; x++) {
            if (lang === 'ar') {
                dir1[x].classList.remove('w3-left');
                dir1[x].classList.add('w3-right');
            }
            else {
                dir1[x].classList.remove('w3-right');
                dir1[x].classList.add('w3-left');
            }
        }
        var dir2 = document.getElementsByClassName('dir2');
        //alert(dir2.length);
        for (x = 0; x < dir2.length; x++) {
            if (lang === 'ar') {
                dir2[x].classList.remove('w3-left-align');
                dir2[x].classList.add('w3-right-align');

            }
            else {
                dir2[x].classList.remove('w3-right-align');
                dir2[x].classList.add('w3-left-align');
            }
        }

        var dir3 = document.getElementsByClassName('dir3');
        //alert(dir3.length);
        for (x = 0; x < dir3.length; x++) {
            //alert(dir3[x].id);
            if (lang === 'ar') {
                dir3[x].setAttribute('dir', 'rtl');
            }
            else {
                dir3[x].setAttribute('dir', 'ltr');
            }
        }

        var dir4 = document.getElementsByClassName('dir4');
        //alert(dir2.length);
        for (x = 0; x < dir4.length; x++) {
            if (lang === 'ar') {
                dir4[x].classList.remove('w3-animate-left');
                dir4[x].classList.add('w3-animate-right');
                dir4[x].classList.remove('dir6');
                dir4[x].classList.add('dir5');

            }
            else {
                dir4[x].classList.remove('w3-animate-right');
                dir4[x].classList.add('w3-animate-left');
                dir4[x].classList.remove('dir5');
                dir4[x].classList.add('dir6');
            }
        }

        try { setlabel(); } catch (ex) { }
    }
    catch (e) { }
}

//--------------------------------
function setBarStyle() {
    try {

        var tmp = '';
        if (lang == 'ar') {
            tmp = "<i class='w3-opennav fa fa-th w3-right w3-xlarge ' style='padding-top:0px;' onclick='javascript:openMenu()'></i> "+companyar+" <a  href='javascript:changeLang(\"en\")' style='padding-top:0px;' class=' w3-left  w3-left-align btnLine w3-large w3-circle ' >EN</a> ";
            document.getElementById("head").innerHTML = tmp;
            document.body.setAttribute('dir', 'rtl');
        }
        else {
            tmp = "<i class='w3-opennav fa fa-th w3-left w3-xlarge ' style='padding-top:0px;' onclick='javascript:openMenu()'></i> "+companyen+" <a  href='javascript:changeLang(\"ar\")' style='padding-top:0px;' class=' w3-right  w3-right-align btnLine w3-large w3-circle ' >ع</a> ";
            document.getElementById("head").innerHTML = tmp;
            document.body.setAttribute('dir', 'ltr');
        }

    }
    catch (e) {
        showMessage(e);
    }
}     