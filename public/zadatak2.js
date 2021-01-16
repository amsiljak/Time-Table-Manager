window.onload = function () {
    ucitajGrupe();
}
function ucitajGrupe() {
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "/v2/grupe", true);
    ajax . send () ;
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var response = JSON.parse(ajax.responseText);
            var jsonGrupe = [];
            response.forEach(s => {
                s.forEach(a => {
                    jsonGrupe.push(a);
                })
            })
            grupaSelect = document.getElementById("grupaSelect");
            jsonGrupe.forEach(grupa => {
                var opt = document.createElement('option');
                opt.value = grupa.id;
                opt.innerHTML = grupa.naziv;
                grupaSelect.appendChild(opt);
            })
        }
    }
}
function kreirajStudenta() {
    var nizJSON = [];
    csv = document.getElementById("studenti");
    var redovi = csv.value.split("\n");
    for(i = 0; i < redovi.length; i++) {
        grupaSelect = document.getElementById("grupaSelect");
        var kolona = redovi[i].split(",");
        var jsonString = "{\"ime\":\"" + kolona[0] + "\",\"index\":\"" + kolona[1] + "\",\"grupa\":\"" + grupaSelect.value + "\"}"; 
        nizJSON.push(jsonString);
    }

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/v2/studenti", true);
    ajax.setRequestHeader ( "Content-Type" , "application/json" ) ;
    ajax . send (JSON.stringify(nizJSON));
    ajax.onreadystatechange = function() {
        csv.value = ajax.responseText;
    }
}