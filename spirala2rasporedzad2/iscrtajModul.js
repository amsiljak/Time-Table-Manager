var Iscrtaj =( function (){
    var iscrtajRaspored = function (div,dani,satPocetak,satKraj){
        if (satPocetak >= satKraj || !(satPocetak >= 0 && satPocetak <= 24) || !(satKraj >= 0 && satKraj <= 24) ||
        !Number.isInteger(satPocetak) || !Number.isInteger(satKraj)) {
            div.appendChild(document.createTextNode("Greška"));   
        }
        else {
            var tbl  = document.createElement("table");

            var razlika = satKraj - satPocetak;

            var colgroup = document.createElement("colgroup");
            for (var i = 0; i < 2 * razlika + 1; i++) {
                var col = document.createElement("col");
                colgroup.appendChild(col); 
            }
            tbl.appendChild(colgroup);


            //red sa satima
            var tr = tbl.insertRow();

            td = tr.insertCell();
            td.className = "time";
            td.id = "prvi";
            td.colSpan =  "3";
            var thetext = document.createTextNode(satPocetak + ":00");
            td.appendChild(thetext);

            for(i = satPocetak + 2; i < satKraj; i += 2) {
                var td = tr.insertCell();
                td.className = "time";
                if(i == 14) {
                    td.colSpan =  "2";
                    i -= 1; //postavlja i na 13 kako bi u sljedecoj iteraciji bilo 15
                }
                else { 
                    td.colSpan =  "4";
                    thetext = document.createTextNode(i + ":00");
                    td.appendChild(thetext);
                } 
            }


            for (i = 0; i < dani.length; i++) {
                var tr = tbl.insertRow();
                tr.id = dani[i];

                var satId = satPocetak;
                for (var j = 0; j < 2 * razlika + 1; j++) {
                    if(j == 0) {
                        //ovdje se postavlja naziv dana
                        td = tr.insertCell();
                        td.className = "invisible";
                        thetext = document.createTextNode(dani[i]);
                        td.appendChild(thetext);
                    }
                    else {
                        td = tr.insertCell();
                        td.id = satId;
                        satId += 0.5; 
                    }
                }
            }
            div.appendChild(tbl);
        }
    }
    var dodajAktivnost = function(raspored, naziv, tip, vrijemePocetak, vrijemeKraj,dan) {
        if(raspored == null || raspored.children[0] == null) alert("Greška - raspored nije kreiran");
        else if (vrijemePocetak >= vrijemeKraj || !(vrijemePocetak >= 0 && vrijemePocetak <= 24) ||
            !(vrijemeKraj >= 0 && vrijemeKraj <= 24) ||
            !(Number.isInteger(vrijemePocetak) || Number.isInteger(vrijemePocetak + 0.5)) || 
            !(Number.isInteger(vrijemeKraj) || Number.isInteger(vrijemeKraj + 0.5)))  
            alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
        else {
            var red = raspored.children[0].children[1].children[dan];
            var razlika = vrijemeKraj - vrijemePocetak;

            var slobodan = 0;
            for(var i = 0; i < red.childElementCount; i++) {
                if(red.children[i].id == vrijemePocetak) {
                    red.children[i].id = "zauzeta"; // postavljamo novi id da se celija vise ne bi bila dostupna
                    var celijaNoveAktivnosti = red.children[i];
                    var indeksCelijeZaObrisati = i + 1;
                    slobodan = 1;
                    for(var j = i + 1; j < i + razlika * 2; j++) {
                        if(red.children[j].id == "zauzeta") slobodan = 0; //slucaj prve celije slobodne a neke od ostaluih zauzete 
                    }
                }
            }
            if(slobodan == 0) alert("Greška - već postoji termin u rasporedu u zadanom vremenu");
            else {
                celijaNoveAktivnosti.colSpan = razlika * 2;
                celijaNoveAktivnosti.className = "plavo";

                celijaNoveAktivnosti.innerHTML = naziv + "<br>" + "<span class=\"tipTekst\">"+ tip + "</span>";

                for(i = 0; i < razlika * 2 - 1; i++) {
                    red.removeChild(red.children[indeksCelijeZaObrisati]);
                }
            }
        }
    }
    return {
        iscrtajRaspored: iscrtajRaspored,
        dodajAktivnost: dodajAktivnost
    }
}());