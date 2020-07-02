$(function () { clearBottom(); showSMenu(); });

function logout() {
    storeValue("uid", 0);
    storeValue("op", 0);
    openpage('home');
}

//-------------------------
function showSMenu() {
    try {
        $.ajax({
            type: "GET",
            url: "code/outMenu.ashx",
            data: { MenuCode: 2 },
            success: function (text) {
                //alert(text);
                if (text != "") {
                    showMenuL(text);
                }
            },
            error: function (text) { showMessage(text); }
        });
    } catch (e) { }
}

//-------------------------------
function showMenuL(text) {
    try {
      
        var obj = JSON.parse(text);
        var data= "";

       
        for (var x = 0; x < obj.length; x++) {
               if (lang == 'ar') {
                    data += "<div class='w3-col  l3 m4 s4 w3-container w3-padding w3-right  w3-center'>";
                    data += "<a href='javascript:openpage(\"" + obj[x].Url + "\")'><i class='fa " + obj[x].format + " w3-xxxlarge '></i></a>";
                    data += "<p class='w3-large' ><a class='btnLine' href='javascript:openpage(\"" + obj[x].Url + "\")' id='" + obj[x].name + "'>" + obj[x].ar + "</a></p> </div> ";
                }
                else {
                    data += "<div class='w3-col  l3 m4 s4 w3-container w3-padding w3-left w3-center'>";
                    data += "<a href='javascript:openpage(\"" + obj[x].Url + "\")'><i class='fa " + obj[x].format + " w3-xxxlarge '></i></a>";
                    data += "<p class='w3-large' ><a class='btnLine' href='javascript:openpage(\"" + obj[x].Url + "\")' id='" + obj[x].name + "'>" + obj[x].en + "</a></p> </div> ";
                }
            }
            if (lang == 'ar') {
                data += "<div class='w3-col  l3 m4 s4 w3-container w3-padding w3-right w3-center '>";
                data += "<a href='javascript:logout()'><i class='fa  fa-sign-out w3-xxxlarge '></i></a>";
                data += " <p class='w3-large' ><a class='btnLine' href='javascript:logout()' >خروج</a></p> </div> ";
            }
            else {
                data += "<div class='w3-col  l3 m4 s4 w3-container w3-padding w3-left w3-center'>";
                data += "<a href='javascript:logout()'><i class='fa fa-sign-out w3-jumb w3-xxxlarge '></i></a>";
                data += "<p class='w3-large' ><a class='btnLine' href='javascript:logout()' >Logout</a></p> </div> ";
            }

            document.getElementById("mainmenu").innerHTML = data;
    } catch (e) { }
}