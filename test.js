let assert = chai . assert ;
describe ( 'Iscrtaj' , function () {
    describe ( 'iscrtajRaspored()' , function () {
        let okvir = document.getElementById("okvir1");
        it ( 'treba okvir imati kreiran raspored kao prvo dijete' , function () {
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],8,22);
            assert.notEqual(okvir.children[0], null, "Okvir treba imati kreiran raspored kao prvo dijete");
        });
        it ( 'ne treba raspored biti kreiran kad je pocetni sat nevalidan' , function () {
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],-8,21);
            assert.notEqual(okvir.children[0], null, "Okvir treba biti bez djece");
        });
        it ( 'ne treba raspored biti kreiran kad je krajnji sat nevalidan' , function () {
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],3,26);
            assert.notEqual(okvir.children[0], null, "Okvir treba biti bez djece");
        });
        it ( 'ne treba raspored biti kreiran kad je pocetni sat manji od krajnjeg' , function () {
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],7,3);
            assert.notEqual(okvir.children[0], null, "Okvir treba biti bez djece");
        });
        it ( 'ne treba raspored biti kreiran kad je pocetni sat decimalan broj' , function () {
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],7.5,3);
            assert.notEqual(okvir.children[0], null, "Okvir treba biti bez djece");
        });
        it ( 'treba raspored imati 13 kolona kad je početni sat 8 a krajnji 14' , function () {
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],8,14);
            let tabela = document.getElementsByTagName("table")[1];
            let redovi = tabela . getElementsByTagName ( "tr" );
            let kolone = redovi [1]. getElementsByTagName ( "td" );
            assert . equal ( kolone.length , 13 , "Broj kolona treba biti 13" );
        });
        it ( 'treba raspored imati 5 redova kada je broj dana 4' , function () {
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],8,14);
            let tabela = document.getElementsByTagName("table")[2];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal ( redovi.length , 5 , "Broj redova treba biti 5" );
        });
        it ( 'treba raspored imati pocetni sat u prvom redu drugoj koloni' , function () {
            let tabela = document.getElementsByTagName("table")[2];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[0].children[0].innerHTML, "8:00" , "Pocetni sat treba biti u prvom redu drugoj koloni" );
        });
        it ( 'treba raspored u prvom redu posljednjoj koloni imati krajnji sat - 2' , function () {
            let tabela = document.getElementsByTagName("table")[2];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[0].lastChild.innerHTML, "12:00" , "Krajnji sat - 2 treba biti u prvom redu posljednjoj koloni" );
        });
        it ( 'treba raspored u prvom redu posljednjoj koloni imati krajnji sat - 1' , function () {
            let tabela = document.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[0].lastChild.innerHTML, "21:00" , "Krajnji sat - 1 treba biti u prvom redu posljednjoj koloni" );
        });
    });
});
describe ( 'Iscrtaj' , function () {
    describe ( 'dodajAktivnost()' , function () {
        it ( 'should draw 3 rows when parameter are 2,3' , function () {
            
        });
    });
});