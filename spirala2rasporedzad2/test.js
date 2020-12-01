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
            assert . equal (redovi[0].children[0].innerHTML, "8:00" , "Pocetni sat treba biti u prvom redu drugoj koloni" );
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
            assert . equal (redovi[1].firstChild.innerHTML, "Ponedjeljak" , "Posljednji dan treba biti u prvoj koloni drugom redu" );
        });
        it ( 'treba raspored u prvoj koloni posljednjem redu imati posljednji dan' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],8,22);
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[4].firstChild.innerHTML, "Četvrtak" , "Posljednji dan treba biti u prvoj koloni posljednjem redu" );
        });
    });
});
describe ( 'Iscrtaj' , function () {
    describe ( 'dodajAktivnost()' , function () {
        
        it ( 'treba raspored imati zapisan naziv aktivnosti' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],8,21);
            Iscrtaj.dodajAktivnost(okvir,"WT","predavanje",9,12,"Ponedjeljak");
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[1].children[3].innerHTML, "WTpredavanje" , "naziv aktivnosti treba biti u predviđenoj celiji" );
        });
        it ( 'treba aktivnost imati 6 celija za aktivnost od 3 sata' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],8,21);
            Iscrtaj.dodajAktivnost(okvir,"WT","predavanje",9,12,"Ponedjeljak");
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[1].children[4].innerHTML, "" , "Peta kolona treba biti prazna" );
            assert . equal (redovi[1].children[2].innerHTML, "" , "Treca kolona treba biti prazna" );
        });
        it ( 'treba celija imati colSpan velicine broja polusatnih perioda u aktivnosti' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],8,21);
            Iscrtaj.dodajAktivnost(okvir,"WT","predavanje",12,13.5,"Ponedjeljak");
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[1].children[9].colSpan, 3 , "Deveta kolona imati colSpan 3" );
        });
        it ( 'ne treba se kreirati aktivnost u zauzetom terminu' , function () {
            alert = function() {}; //dodano da ne iskacu alerti
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],8,21);
            Iscrtaj.dodajAktivnost(okvir,"WT","predavanje",12,13.5,"Ponedjeljak");
            Iscrtaj.dodajAktivnost(okvir,"WT","predavanje",12,14,"Ponedjeljak");
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[1].children[10].innerHTML, "" , "Deseta kolona treba biti prazna" );
        });
        it ( 'ne treba se kreirati aktivnost u zauzetom terminu' , function () {
            alert = function() {}; //dodano da ne iskacu alerti
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],8,21);
            Iscrtaj.dodajAktivnost(okvir,"WT","predavanje",12,13.5,"Ponedjeljak");
            Iscrtaj.dodajAktivnost(okvir,"WT","predavanje",11,12.5,"Ponedjeljak");
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[1].children[7].innerHTML, "" , "Sedma kolona treba biti prazna" );
        });
        it ( 'treba se ispravno kreirati aktivnost u posljednjem satu rasporeda' , function () {
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],8,21);
            Iscrtaj.dodajAktivnost(okvir,"WT","predavanje",20,21,"Ponedjeljak");
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[1].children[25].innerHTML, "WTpredavanje" , "Naziv aktivnosti treba biti u predviđenoj celiji" );
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
            assert . equal (redovi[1].children[1].innerHTML, "WTpredavanje", "naziv aktivnosti treba biti u predviđenoj celiji" );
            assert . equal (redovi[1].children[2].innerHTML, "OOIpredavanje", "naziv aktivnosti treba biti u predviđenoj celiji" );
            assert . equal (redovi[1].children[3].innerHTML, "OISpredavanje", "naziv aktivnosti treba biti u predviđenoj celiji" );
            assert . equal (redovi[1].children[4].innerHTML, "OISvjezba", "naziv aktivnosti treba biti u predviđenoj celiji" );
            assert.isUndefined(redovi[1].children[5], "Ne trebaju postojati kolone iza aktivnosti u posljednjem satu");
        });
        it ( 'ne treba se kreirati aktivnost sa neispravnim satom pocetka' , function () {
            alert = function() {}; //dodano da ne iskacu alerti
            let okvir = document.createElement("div");
            Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],8,21);
            Iscrtaj.dodajAktivnost(okvir,"WT","predavanje",12.2,13.5,"Ponedjeljak");
            let tabela = okvir.getElementsByTagName("table")[0];
            let redovi = tabela . getElementsByTagName ( "tr" );
            assert . equal (redovi[1].children[10].innerHTML, "" , "Deseta kolona treba biti prazna" );
            assert . equal (redovi[1].children[11].innerHTML, "" , "Jedanaesta kolona treba biti prazna" );
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
            assert . equal (redovi[3].children[1].innerHTML, "WTpredavanje", "naziv aktivnosti treba biti u predviđenoj celiji" );
            assert . equal (redovi[2].children[4].innerHTML, "WTvježba", "naziv aktivnosti treba biti u predviđenoj celiji" );
            assert . equal (redovi[1].children[13].innerHTML, "PWSpredavanje", "naziv aktivnosti treba biti u predviđenoj celiji" );
            assert . equal (redovi[1].children[14].innerHTML, "PWSvježba", "naziv aktivnosti treba biti u predviđenoj celiji" );
            assert . equal (redovi[2].children[15].innerHTML, "OISvježba", "naziv aktivnosti treba biti u predviđenoj celiji" );
            assert . equal (redovi[3].children[6].innerHTML, "RGvježba", "naziv aktivnosti treba biti u predviđenoj celiji" );
            assert . equal (redovi[4].children[7].innerHTML, "VVSpredavanje", "naziv aktivnosti treba biti u predviđenoj celiji" );
            assert . equal (redovi[4].children[8].innerHTML, "OOIpredavanje", "naziv aktivnosti treba biti u predviđenoj celiji" );
        });
    });
});




describe('dodajAktivnost()', function() {
    it('Kreiranje rasporeda i dodavanje aktivnosti iz postavke spirale', function() {
        var okvir = document.createElement("div");
        Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
        Modul.dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
        Modul.dodajAktivnost(okvir, "WT", "vježbe", 12, 13.5, "Ponedjeljak");
        Modul.dodajAktivnost(okvir, "RMA", "predavanje", 14, 17, "Ponedjeljak");
        Modul.dodajAktivnost(okvir, "RMA", "vježbe", 12.5, 14, "Utorak");
        Modul.dodajAktivnost(okvir, "DM", "tutorijal", 14 , 16, "Utorak");
        Modul.dodajAktivnost(okvir, "DM", "predavanje", 16, 19, "Utorak");
        Modul.dodajAktivnost(okvir, "OI", "predavanje", 12, 15, "Srijeda");
        var redovi = okvir.getElementsByTagName("table")[0].getElementsByTagName("tr");
        assert.equal(redovi[1].cells[3].innerHTML, "WT" + "<br>" + "predavanje","Tekst treba biti WT predavanje");
        assert.equal(redovi[1].cells[4].innerHTML, "WT" + "<br>" + "vježbe", "Tekst treba biti WT vježbe");
        assert.equal(redovi[1].cells[6].innerHTML, "RMA" + "<br>" + "predavanje","Tekst treba biti RMA predavanje");
        assert.equal(redovi[2].cells[10].innerHTML, "RMA" + "<br>" + "vježbe","Tekst treba biti RMA vježbe");
        assert.equal(redovi[2].cells[11].innerHTML, "DM" + "<br>" + "tutorijal","Tekst treba biti DM tutorijal");
        assert.equal(redovi[2].cells[12].innerHTML, "DM" + "<br>" + "predavanje","Tekst treba biti DM predavanje");
        assert.equal(redovi[3].cells[9].innerHTML, "OI" + "<br>" + "predavanje","Tekst treba biti OI predavanje");
    });
    it('Kreiranje dva rasporeda i dodavanje aktivnosti', function() {
        var okvir = document.createElement("div");
        Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
        Modul.dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
        Modul.dodajAktivnost(okvir, "WT", "vježbe", 12, 13.5, "Ponedjeljak");
        Modul.dodajAktivnost(okvir, "RMA", "predavanje", 14, 17, "Ponedjeljak");
        Modul.dodajAktivnost(okvir, "RMA", "vježbe", 12.5, 14, "Utorak");
        Modul.dodajAktivnost(okvir, "DM", "tutorijal", 14 , 16, "Utorak");
        Modul.dodajAktivnost(okvir, "DM", "predavanje", 16, 19, "Utorak");
        Modul.dodajAktivnost(okvir, "OI", "predavanje", 12, 15, "Srijeda");
        var redovi = okvir.getElementsByTagName("table")[0].getElementsByTagName("tr");
        assert.equal(redovi[1].cells[3].innerHTML, "WT" + "<br>" + "predavanje","Tekst treba biti WT predavanje");
        assert.equal(redovi[1].cells[4].innerHTML, "WT" + "<br>" + "vježbe", "Tekst treba biti WT vježbe");
        assert.equal(redovi[1].cells[6].innerHTML, "RMA" + "<br>" + "predavanje","Tekst treba biti RMA predavanje");
        assert.equal(redovi[2].cells[10].innerHTML, "RMA" + "<br>" + "vježbe","Tekst treba biti RMA vježbe");
        assert.equal(redovi[2].cells[11].innerHTML, "DM" + "<br>" + "tutorijal","Tekst treba biti DM tutorijal");
        assert.equal(redovi[2].cells[12].innerHTML, "DM" + "<br>" + "predavanje","Tekst treba biti DM predavanje");
        assert.equal(redovi[3].cells[9].innerHTML, "OI" + "<br>" + "predavanje","Tekst treba biti OI predavanje");

        var okvir2 = document.createElement("div");
        Modul.iscrtajRaspored(okvir2, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 9, 21);
        Modul.dodajAktivnost(okvir2, "RG", "vježbe", 11, 13, "Ponedjeljak");
        Modul.dodajAktivnost(okvir2, "PWS", "predavanje", 15, 17, "Ponedjeljak");
        Modul.dodajAktivnost(okvir2, "PWS", "vježbe", 17, 18, "Ponedjeljak");
        Modul.dodajAktivnost(okvir2, "WT", "vježbe", 19, 20.5, "Ponedjeljak");
        Modul.dodajAktivnost(okvir2, "VVS", "vježbe", 9, 10.5, "Utorak");
        Modul.dodajAktivnost(okvir2, "OOI", "predavanje", 12, 15, "Utorak");
        Modul.dodajAktivnost(okvir2, "OIS", "predavanje", 15, 17, "Utorak");
        Modul.dodajAktivnost(okvir2, "OIS", "vježbe", 17, 18, "Utorak");
        Modul.dodajAktivnost(okvir2, "WT", "predavanje", 9 , 12, "Srijeda");
        Modul.dodajAktivnost(okvir2, "OOI", "vježbe", 13, 14, "Srijeda");
        Modul.dodajAktivnost(okvir2, "RG", "predavanje", 9, 11, "Četvrtak");
        Modul.dodajAktivnost(okvir2, "RG", "tutorijal", 11, 12, "Četvrtak");
        Modul.dodajAktivnost(okvir2, "VVS", "predavanje", 12, 15, "Četvrtak");
        Modul.dodajAktivnost(okvir2, "OOI", "tutorijal", 15, 16.5, "Četvrtak");

        var redovi2 = okvir2.getElementsByTagName("table")[0].getElementsByTagName("tr");
        assert.equal(redovi2[1].cells[5].innerHTML, "RG" + "<br>" + "vježbe","Tekst treba biti RG vježbe");
        assert.equal(redovi2[1].cells[10].innerHTML, "PWS" + "<br>" + "predavanje", "Tekst treba biti PWS predavanje");
        assert.equal(redovi2[1].cells[11].innerHTML, "PWS" + "<br>" + "vježbe","Tekst treba biti PWS vježbe");
        assert.equal(redovi2[1].cells[14].innerHTML, "WT" + "<br>" + "vježbe","Tekst treba biti WT vježbe");
        assert.equal(redovi2[2].cells[1].innerHTML, "VVS" + "<br>" + "vježbe","Tekst treba biti VVS vježbe");
        assert.equal(redovi2[2].cells[5].innerHTML, "OOI" + "<br>" + "predavanje","Tekst treba biti OOI predavanje");
        assert.equal(redovi2[2].cells[6].innerHTML, "OIS" + "<br>" + "predavanje","Tekst treba biti OIS predavanje");
        assert.equal(redovi2[2].cells[7].innerHTML, "OIS" + "<br>" + "vježbe","Tekst treba biti OIS vježbe");
        assert.equal(redovi2[3].cells[1].innerHTML, "WT" + "<br>" + "predavanje","Tekst treba biti WT predavanje");
        assert.equal(redovi2[3].cells[4].innerHTML, "OOI" + "<br>" + "vježbe","Tekst treba biti OOI vježbe");
        assert.equal(redovi2[4].cells[1].innerHTML, "RG" + "<br>" + "predavanje","Tekst treba biti RG predavanje");
        assert.equal(redovi2[4].cells[2].innerHTML, "RG" + "<br>" + "tutorijal","Tekst treba biti RG tutorijal");
        assert.equal(redovi2[4].cells[3].innerHTML, "VVS" + "<br>" + "predavanje","Tekst treba biti VVS predavanje");
        assert.equal(redovi2[4].cells[4].innerHTML, "OOI" + "<br>" + "tutorijal","Tekst treba biti OOI tutorijal");


    });
    it('Dodavanje jedne aktivnosti u prazan raspored', function() {
     var okvir = document.createElement("div");
     Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
     var redovi = okvir.getElementsByTagName("table")[0].getElementsByTagName("tr");
     Modul.dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
     assert.equal(redovi[1].cells[3].innerHTML, "WT" + "<br>" + "predavanje","Tekst treba biti WT predavanje");
    });
    it('Dodavanje dvije aktivnosti u isti dan, jedna poslije druge', function() {
        var okvir = document.createElement("div");
        Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
        var redovi = okvir.getElementsByTagName("table")[0].getElementsByTagName("tr");
        Modul.dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
        Modul.dodajAktivnost(okvir, "WT", "vježbe", 12, 13.5, "Ponedjeljak");
        assert.equal(redovi[1].cells[3].innerHTML, "WT" + "<br>" + "predavanje","Tekst treba biti WT predavanje");
        assert.equal(redovi[1].cells[4].innerHTML, "WT" + "<br>" + "vježbe","Tekst treba biti WT vježbe");
    });
    it('Dodavanje dvije aktivnosti u razlicite dane', function() {
        var okvir = document.createElement("div");
        Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
        var redovi = okvir.getElementsByTagName("table")[0].getElementsByTagName("tr");
        Modul.dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
        Modul.dodajAktivnost(okvir, "OI", "predavanje", 12, 15, "Srijeda");
        assert.equal(redovi[1].cells[3].innerHTML, "WT" + "<br>" + "predavanje","Tekst treba biti WT predavanje");
        assert.equal(redovi[3].cells[9].innerHTML, "OI" + "<br>" + "predavanje","Tekst treba biti OI predavanje");
    });
    it('Alert ako raspored nije kreiran', function() {
        var okvir = document.createElement("div");
        var returned = Modul.dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
        assert.equal(returned, true);
    });
    it('Alert ako je raspored null', function() {
        var okvir = null
        var returned = Modul.dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
        assert.equal(returned, true);
    });
    it('Alert vremena nevalidna', function() {
        var okvir = null
        var returned = Modul.dodajAktivnost(okvir, "WT", "predavanje", -5, 50, "Ponedjeljak");
        assert.equal(returned, true);
    });
    it('Alert termin se poklapa u potpunosti', function() {
        var okvir = document.createElement("div");
        Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
        Modul.dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
        var returned = Modul.dodajAktivnost(okvir, "OI", "predavanje", 9, 12, "Ponedjeljak");
        assert.equal(returned, true);
    });
    it('Alert termin se poklapa djelimicno', function() {
        var okvir = document.createElement("div");
        Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
        Modul.dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
        var returned = Modul.dodajAktivnost(okvir, "OI", "predavanje", 10, 12, "Ponedjeljak");
        assert.equal(returned, true);
    });
    it('Alert termin unutar postojeceg termina', function() {
        var okvir = document.createElement("div");
        Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
        Modul.dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
        var returned = Modul.dodajAktivnost(okvir, "OI", "predavanje", 10, 11, "Ponedjeljak");
        assert.equal(returned, true);
    });
 });