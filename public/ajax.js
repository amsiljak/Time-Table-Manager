var jsonPredmeti;
window.onload = function() {
    ucitajPredmete();
}
function ucitajPredmete() {
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "/predmeti", true);
    ajax . send () ;
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            jsonPredmeti = ajax.responseText;
        }
    }
}
function dodajPredmet(naziv) {
    ajax.open("POST", "/predmet", true);
    ajax.setRequestHeader ( "Content-Type" , "application/json" ) ;
    ajax.send("{\"naziv\":\"" + naziv + "\"}");
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            thetext = document.createTextNode("Aktivnst dodana uspješno");
            document . getElementById ( 'okvir' ).appendChild(thetext);
        }
        if (ajax.readyState == 4 && ajax.status == 404)
            document.getElementById("poruka").innerHTML = "Greska: nepoznat URL";
    }
}
function dodajAktivnost() {
    var ajax = new XMLHttpRequest();

    //provjera postojanja predmeta
    var predmetPostoji = false;
    for(i = 0; i < jsonPredmeti.length; i++) {
        if(jsonPredmeti[i].naziv == document . getElementById ( 'naziv' ). value) predmetPostoji = true;
    }
    if(!predmetPostoji) {
        dodajPredmet(document . getElementById ( 'naziv' ));
    }

    //dodavanje nove aktivnosti
    ajax.open("POST", "/aktivnost", true);
    ajax.setRequestHeader ( "Content-Type" , "application/json" ) ;
    console.log(document . getElementById ( 'naziv' ). value);
    var jsonString = "{\"naziv\":\"" + document . getElementById ( 'naziv' ). value + 
        "\",\"tip\":\"" + document . getElementById ( 'tip' ). value.toString() + 
        "\",\"pocetak\":" + document . getElementById ( 'pocetak' ). value.toString() + 
        ",\"kraj\":" + document . getElementById ( 'kraj' ). value.toString() + 
        ",\"dan\":\"" + document . getElementById ( 'dan' ). value.toString() +"\"}"; 
    ajax.send (jsonString);

    //provjera uspjesnosti
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            thetext = document.createTextNode("Aktivnost dodana uspješno");
            document . getElementById ( 'okvir' ).appendChild(thetext);
        }
        if (ajax.readyState == 4 && ajax.status == 404)
            document.getElementById("poruka").innerHTML = "Greska: nepoznat URL";
    }
    
}