let assert = chai . assert ;
describe ( 'Iscrtaj' , function () {
    describe ( 'iscrtajRaspored()' , function () {
        it ( 'treba okvir imati kreiran raspored kao prvo dijete' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],8,22);
            assert.isDefined(okvir.children[0], "Okvir treba imati kreiran raspored kao prvo dijete");
        });
        it ( 'ne treba raspored biti kreiran kad je pocetni sat nevalidan' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],-8,21);
            assert.isUndefined(okvir.children[0], "Okvir treba biti bez djece");
        });
        it ( 'ne treba raspored biti kreiran kad je krajnji sat nevalidan' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],3,26);
            assert.isUndefined(okvir.children[0], "Okvir treba biti bez djece");
        });
        it ( 'ne treba raspored biti kreiran kad je pocetni sat manji od krajnjeg' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],7,3);
            assert.isUndefined(okvir.children[0], "Okvir treba biti bez djece");
        });
        it ( 'ne treba raspored biti kreiran kad je pocetni sat decimalan broj' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],7.5,3);
            assert.isUndefined(okvir.children[0], "Okvir treba biti bez djece");
        });
        it ( 'treba raspored imati 13 kolona kad je početni sat 8 a krajnji 14' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],8,14);
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            let kolone = redovi [1]. getElementsByTagName ( "td" );
            assert . equal ( kolone.length , 13 , "Broj kolona treba biti 13" );
        });
        it ( 'treba raspored imati 5 redova kada je broj dana 4' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],8,14);
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal ( redovi.length , 5 , "Broj redova treba biti 5" );
        });
        it ( 'treba raspored imati pocetni sat u prvom redu drugoj koloni' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],8,14);
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[0].children[0].innerHTML, "8:00" , "8:00 treba biti u prvom redu drugoj koloni" );
        });
        it ( 'treba raspored u prvom redu posljednjoj koloni imati krajnji sat - 2' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],8,14);
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[0].lastChild.innerHTML, "12:00" , "Krajnji sat - 2 treba biti u prvom redu posljednjoj koloni" );
        });
        it ( 'treba raspored u prvom redu posljednjoj koloni imati krajnji sat - 1' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],8,22);
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[0].lastChild.innerHTML, "21:00" , "Krajnji sat - 1 treba biti u prvom redu posljednjoj koloni" );
        });
        it ( 'treba raspored u prvoj koloni drugom redu imati prvi dan' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],8,22);
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[1].firstChild.innerHTML, "Ponedjeljak" , "Prvi dan treba biti u prvoj koloni drugom redu" );
        });
        it ( 'treba raspored u prvoj koloni posljednjem redu imati posljednji dan' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],8,22);
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[4].firstChild.innerHTML, "Četvrtak" , "Posljednji dan treba biti u prvoj koloni posljednjem redu" );
        });
    });
    describe ( 'dodajAktivnost()' , function () {
        alert = function() {}; //dodano da ne iskacu alerti
        it ( 'treba raspored imati zapisan naziv aktivnosti' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],8,21);
            Iscrtaj.dodajAktivnost(okvir,"WT","predavanje",9,12,"Ponedjeljak");
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[1].children[3].innerHTML, "WT<br><span class=\"tipTekst\">predavanje</span>", "naziv aktivnosti treba biti u predviđenoj celiji" );
        });
        it ( 'treba aktivnost imati 6 celija za aktivnost od 3 sata' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],8,21);
            Iscrtaj.dodajAktivnost(okvir,"WT","predavanje",9,12,"Ponedjeljak");
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[1].children[4].innerHTML, "" , "Peta kolona treba biti prazna" );
            assert . notEqual (redovi[1].children[3].innerHTML, "" , "Cetvrta kolona ne  treba biti prazna" );
            assert . equal (redovi[1].children[2].innerHTML, "" , "Treca kolona treba biti prazna" );
        });
        it ( 'treba celija imati colSpan velicine broja polusatnih perioda u aktivnosti' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],8,21);
            Iscrtaj.dodajAktivnost(okvir,"WT","predavanje",12,13.5,"Ponedjeljak");
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[1].children[9].colSpan, 3 , "Deseta kolona treba imati colSpan 3" );
        });
        it ( 'ne treba se kreirati aktivnost u zauzetom terminu' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],8,21);
            Iscrtaj.dodajAktivnost(okvir,"WT","predavanje",12,13.5,"Ponedjeljak");
            Iscrtaj.dodajAktivnost(okvir,"WT","predavanje",12,14,"Ponedjeljak");
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . notEqual (redovi[1].children[9].innerHTML, "" , "Deseta kolona treba imati aktivnost" );
            assert . equal (redovi[1].children[10].innerHTML, "" , "Jedanaesta kolona treba biti prazna" );
        });
        it ( 'ne treba se kreirati aktivnost u zauzetom terminu' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],8,21);
            Iscrtaj.dodajAktivnost(okvir,"WT","predavanje",12,13.5,"Ponedjeljak");
            Iscrtaj.dodajAktivnost(okvir,"WT","predavanje",11,12.5,"Ponedjeljak");
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . notEqual (redovi[1].children[9].innerHTML, "" , "Deseta kolona treba imati aktivnost" );
            assert . equal (redovi[1].children[7].innerHTML, "" , "Osma kolona treba biti prazna" );
        });
        it ( 'ne treba se kreirati aktivnost sa neispravnim satom pocetka' , function () {
            alert = function() {}; //dodano da ne iskacu alerti
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],8,21);
            Iscrtaj.dodajAktivnost(okvir,"WT","predavanje",12.2,13.5,"Ponedjeljak");
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[1].children[9].innerHTML, "" , "Deseta kolona treba biti prazna" );
            assert . equal (redovi[1].children[10].innerHTML, "" , "Jedanaesta kolona treba biti prazna" );
        });
        it ( 'ne treba se kreirati aktivnost sa satom pocetka vecim od sata kraja' , function () {
            alert = function() {}; //dodano da ne iskacu alerti
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],8,21);
            Iscrtaj.dodajAktivnost(okvir,"WT","predavanje",12,10,"Ponedjeljak");
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[1].children[9].innerHTML, "" , "Deseta kolona treba biti prazna" );
        });
        it ( 'ne treba se kreirati aktivnost sa satom kraja 25' , function () {
            alert = function() {}; //dodano da ne iskacu alerti
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],20,21);
            Iscrtaj.dodajAktivnost(okvir,"WT","predavanje",20,25,"Ponedjeljak");
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[1].children[1].innerHTML, "" , "Prva kolona treba biti prazna" );
        });
        it ( 'treba se ispravno kreirati aktivnost u posljednjem satu rasporeda' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],8,21);
            Iscrtaj.dodajAktivnost(okvir,"WT","predavanje",20,21,"Ponedjeljak");
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[1].children[25].innerHTML, "WT<br><span class=\"tipTekst\">predavanje</span>", "Naziv aktivnosti treba biti u predviđenoj celiji" );
        });
        it ( 'treba se ispravno pupuniti citav jedan dan' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],8,21);
            Iscrtaj.dodajAktivnost(okvir,"WT","predavanje",8,12,"Ponedjeljak");
            Iscrtaj.dodajAktivnost(okvir,"OOI","predavanje",12,15,"Ponedjeljak");
            Iscrtaj.dodajAktivnost(okvir,"OIS","predavanje",15,20,"Ponedjeljak");
            Iscrtaj.dodajAktivnost(okvir,"OIS","vjezba",20,21,"Ponedjeljak");
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[1].children[1].innerHTML, "WT<br><span class=\"tipTekst\">predavanje</span>", "naziv aktivnosti treba biti u predviđenoj celiji" );
            assert . equal (redovi[1].children[2].innerHTML, "OOI<br><span class=\"tipTekst\">predavanje</span>", "naziv aktivnosti treba biti u predviđenoj celiji" );
            assert . equal (redovi[1].children[3].innerHTML, "OIS<br><span class=\"tipTekst\">predavanje</span>", "naziv aktivnosti treba biti u predviđenoj celiji" );
            assert . equal (redovi[1].children[4].innerHTML, "OIS<br><span class=\"tipTekst\">vjezba</span>", "naziv aktivnosti treba biti u predviđenoj celiji" );
            assert.isUndefined(redovi[1].children[5], "Ne trebaju postojati kolone iza aktivnosti u posljednjem satu");
        });
        it ( 'treba se ispravno dodati veci broj aktivnosti u tabelu' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],9,21);
            Iscrtaj.dodajAktivnost(okvir,"WT","predavanje",9,12,"Srijeda");
            Iscrtaj.dodajAktivnost(okvir,"RG","vježba",14,16,"Srijeda");
            Iscrtaj.dodajAktivnost(okvir,"WT","vježba",10.5,12,"Utorak");
            Iscrtaj.dodajAktivnost(okvir,"OIS","vježba",17,19,"Utorak");
            Iscrtaj.dodajAktivnost(okvir,"PWS","predavanje",15,17,"Ponedjeljak");
            Iscrtaj.dodajAktivnost(okvir,"PWS","vježba",17,19,"Ponedjeljak");
            Iscrtaj.dodajAktivnost(okvir,"VVS","predavanje",12,15,"Četvrtak");
            Iscrtaj.dodajAktivnost(okvir,"OOI","predavanje",15,16,"Četvrtak");
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[3].children[1].innerHTML, "WT<br><span class=\"tipTekst\">predavanje</span>", "naziv aktivnosti treba biti u predviđenoj celiji" );
            assert . equal (redovi[2].children[4].innerHTML, "WT<br><span class=\"tipTekst\">vježba</span>", "naziv aktivnosti treba biti u predviđenoj celiji" );
            assert . equal (redovi[1].children[13].innerHTML, "PWS<br><span class=\"tipTekst\">predavanje</span>", "naziv aktivnosti treba biti u predviđenoj celiji" );
            assert . equal (redovi[1].children[14].innerHTML, "PWS<br><span class=\"tipTekst\">vježba</span>", "naziv aktivnosti treba biti u predviđenoj celiji" );
            assert . equal (redovi[2].children[15].innerHTML, "OIS<br><span class=\"tipTekst\">vježba</span>", "naziv aktivnosti treba biti u predviđenoj celiji" );
            assert . equal (redovi[3].children[6].innerHTML, "RG<br><span class=\"tipTekst\">vježba</span>", "naziv aktivnosti treba biti u predviđenoj celiji" );
            assert . equal (redovi[4].children[7].innerHTML, "VVS<br><span class=\"tipTekst\">predavanje</span>", "naziv aktivnosti treba biti u predviđenoj celiji" );
            assert . equal (redovi[4].children[8].innerHTML, "OOI<br><span class=\"tipTekst\">predavanje</span>", "naziv aktivnosti treba biti u predviđenoj celiji" );
        });
    });
});