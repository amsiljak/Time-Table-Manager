function init(){
    //primjer iz postavke
    let okvir=document.getElementById("okvir1");
    iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],8,21);
    dodajAktivnost(okvir,"WT","predavanje",9,12,"Ponedjeljak");
    dodajAktivnost(okvir,"WT","vježbe",12,13.5,"Ponedjeljak");
    dodajAktivnost(okvir,"RMA","predavanje",14,17,"Ponedjeljak");
    dodajAktivnost(okvir,"RMA","vježbe",12.5,14,"Utorak");
    dodajAktivnost(okvir,"DM","tutorijal",14,16,"Utorak");
    dodajAktivnost(okvir,"DM","predavanje",16,19,"Utorak");
    dodajAktivnost(okvir,"OI","predavanje",12,15,"Srijeda");

    //moj raspored sa validnim podacima
    okvir=document.getElementById("okvir2");
    iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],9,19);
    dodajAktivnost(okvir,"WT","predavanje",9,12,"Srijeda");
    dodajAktivnost(okvir,"WT","vježba",10.5,12,"Utorak");
    dodajAktivnost(okvir,"PWS","predavanje",15,17,"Ponedjeljak");
    dodajAktivnost(okvir,"PWS","vježba",17,19,"Ponedjeljak");
    dodajAktivnost(okvir,"VVS","vježba",9,10.5,"Utorak");
    dodajAktivnost(okvir,"OOI","predavanje",12,15,"Utorak");
    dodajAktivnost(okvir,"OIS","predavanje",15,17,"Utorak");
    dodajAktivnost(okvir,"OIS","vježba",17,19,"Utorak");
    dodajAktivnost(okvir,"OOI","vježba",13,14,"Srijeda");
    dodajAktivnost(okvir,"RG","vježba",14,16,"Srijeda");
    dodajAktivnost(okvir,"RG","predavanje",9,11,"Četvrtak");
    dodajAktivnost(okvir,"RG","vježba",11,12,"Četvrtak");
    dodajAktivnost(okvir,"VVS","predavanje",12,15,"Četvrtak");
    dodajAktivnost(okvir,"OOI","predavanje",15,16,"Četvrtak");




    //slučajevi sa greškama pri pozivu funkcije iscrtajRaspored

    okvir = document.getElementById("okvir3");
    iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],-8,21);
    iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],21,5);
    iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],4,30);





    //slučajevi sa greškama pri pozivu funkcije dodajAktivnost 
    //zakomentarisani oni koji bacaju alert, zamisljeno da bude otkomentarisan samo jedan istvremeno 

    okvir = document.getElementById("okvir4");
    // dodajAktivnost(okvir,"WT","predavanje",9,12,"Srijeda"); //slucaj sa nekreiranim rasporedom
    // dodajAktivnost(null,"WT","predavanje",9,12,"Srijeda");  //slucaj sa rasporedom koji je null

    iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak"],9,24); //raspored se kreira

    // dodajAktivnost(okvir,"WT","predavanje",-9,12,"Srijeda"); //neispravan pocetak
    // dodajAktivnost(okvir,"WT","vježba",10.2,12,"Utorak");//neispravan pocetak
    // dodajAktivnost(okvir,"PWS","predavanje",17,14,"Ponedjeljak");//neispravan pocetak
    // dodajAktivnost(okvir,"PWS","predavanje",17,26,"Ponedjeljak");//neispravan kraj

    dodajAktivnost(okvir,"PWS","vježba",17,19,"Ponedjeljak");
    // dodajAktivnost(okvir,"PWS","vježba",17.5,19.5,"Ponedjeljak");//preklapanje termina
    // dodajAktivnost(okvir,"PWS","vježba",18,21,"Ponedjeljak");//preklapanje termina
    // dodajAktivnost(okvir,"PWS","vježba",16.5,19,"Ponedjeljak");//preklapanje termina
}