var greskaPredmet = false;
var jsonPredmeti;
var jsonAktivnosti;
window.onload = function() {
    ucitajPredmete();
    ucitajAktivnosti();
    ucitajTipove();
    ucitajDane();
}
function ucitajTipove() {
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "/v2/tipovi", true);
    ajax . send () ;
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var jsonTipovi = [];
            var response = JSON.parse(ajax.responseText);
            response.forEach(s => {
                s.forEach(a => {
                    jsonTipovi.push(a);
                })
            })
            tipSelect = document.getElementById("tip");
            jsonTipovi.forEach(tip => {
                var opt = document.createElement('option');
                opt.value = tip.id;
                opt.innerHTML = tip.naziv;
                tipSelect.appendChild(opt);
            })
        }
    }
}
function ucitajDane() {
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "/v2/dani", true);
    ajax . send () ;
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var jsonDani = [];
            var response = JSON.parse(ajax.responseText);
            response.forEach(s => {
                s.forEach(a => {
                    jsonDani.push(a);
                })
            })
            danSelect = document.getElementById("dan");
            jsonDani.forEach(tip => {
                var opt = document.createElement('option');
                opt.value = tip.id;
                opt.innerHTML = tip.naziv;
                danSelect.appendChild(opt);
            })
        }
    }
}
function ucitajPredmete() {
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "/v2/predmeti", true);
    ajax . send () ;
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            jsonPredmeti = JSON.parse(ajax.responseText);
        }
    }
}
function ucitajAktivnosti() {
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "/v2/aktivnosti", true);
    ajax . send () ;
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            jsonAktivnosti = JSON.parse(ajax.responseText);
        }
    }
}
function dodajPredmet(naziv) {
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/v2/predmet", true);
    ajax.setRequestHeader ( "Content-Type" , "application/json" ) ;
    ajax.send("{\"naziv\":\"" + naziv + "\"}");
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status != 200) {
            greskaPredmet = true;
        }
        return new Promise(function(resolve,reject){resolve();});
    }
}
function obrisiPredmet(predmet) {
    var ajax = new XMLHttpRequest();
    ajax.open("DELETE", "/v2/predmet/" + predmet, true);
    ajax . send () ;
}
function dodajAktivnost() {
    var ajax = new XMLHttpRequest();
    var predmetId;
    var predmetNaziv;

    //provjera postojanja predmeta
    var predmetPostoji = false;
    for(i = 0; i < jsonPredmeti.length; i++) {
        if(jsonPredmeti[i].naziv == document . getElementById ( 'naziv' ). value) 
        {
            predmetPostoji = true;
            predmetId = jsonPredmeti[i].id;        
        }
    }
    var fje = [];
    if(!predmetPostoji) {
        fje.push (
            dodajPredmet(document . getElementById ( 'naziv' ).value)
        );
        predmetNaziv = document . getElementById ( 'naziv' ).value;
    }
    Promise.all(fje).then(function () {
        
        //dodavanje nove aktivnosti
        ajax.open("POST", "/v2/aktivnost", true);
        ajax.setRequestHeader ( "Content-Type" , "application/json" ) ;
        var jsonString = "{\"naziv\":\"" + document . getElementById ( 'nazivAktivnosti' ).value + 
            "\",\"predmetId\":" + predmetId + 
            ",\"predmetNaziv\":\"" + predmetNaziv + 
            "\",\"tip\":" + document . getElementById ( 'tip' ). value + 
            ",\"pocetak\":" + document . getElementById ( 'pocetak' ). value.toString() + 
            ",\"kraj\":" + document . getElementById ( 'kraj' ). value.toString() + 
            ",\"dan\":" + document . getElementById ( 'dan' ).value +"}"; 
        ajax.send (jsonString);
        ajax.onreadystatechange = function() {
            if(!greskaPredmet) {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    alert("Aktivnost dodana uspješno!");
                }
                else if (ajax.readyState == 4) {
                    obrisiPredmet(document . getElementById ( 'naziv' ).value);
                }
            }
        }
    }).catch(function(err){console.log("Greska "+err);});
}