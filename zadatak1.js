const express = require ( 'express' );
const fs = require ( 'fs' );
const bodyParser = require ( 'body-parser' );
const app = express ();

app . use ( bodyParser . json ());
app.use(express.static('public'));

app . get ( '/predmeti', function ( req , res ){
    // res.writeHead (200, {'Content-Type':'application/json'});
    fs.readFile('predmeti.txt', 'utf-8', function (err, data) {
        if (err) return console.error(err);
        csv = data.toString();
        
        var nizJSON = [];

        if(csv.length != 0) {
            var redovi = csv.split("\n");
            for(i = 0; i < redovi.length; i++) {
                var kolona = redovi[i].split(",");
                var jsonString = "{\"naziv\":\"" + kolona[0] + "\"}"; 
                nizJSON.push(JSON.parse(jsonString));
            }
        }
        res.json(nizJSON);
    });
});
app . get ( '/aktivnosti', function ( req , res ){
    fs.readFile('aktivnosti.txt', 'utf-8', function (err, data) {
        if (err) return console.error(err);
        csv = data.toString();
        
        var nizJSON = [];
        if(csv.length != 0) {
            var redovi = csv.split("\n");
            for(i = 0; i < redovi.length; i++) {
                var kolone = redovi[i].split(",");
                var jsonString = "{\"naziv\":\"" + kolone[0] + "\",\"tip\":\"" + kolone[1] + "\",\"pocetak\":" + kolone[2] + ",\"kraj\":" + kolone[3] + ",\"dan\":\"" + kolone[4] +"\"}"; 
                nizJSON.push(JSON.parse(jsonString));
            }
        }
        res.json(nizJSON);
    });
});
app . post ( '/predmet', function ( req , res ){
    var tijeloZahtjeva = req.body;
    var predmetPostoji = false;
    var stringZaUpisati;
    fs.readFile('predmeti.txt', 'utf-8', function (err, data) {
        if (err) return console.error(err);
        if(data) {
            csv = data.toString();
            
            var redovi = csv.split("\n");
            for(i = 0; i < redovi.length; i++) {
                if(redovi[i] == tijeloZahtjeva.naziv.toString()) {
                    predmetPostoji = true;
                    res . end ("{\"message\": \"Naziv predmeta postoji!\"}");
                    break;
                }
            }
            stringZaUpisati = "\n" + tijeloZahtjeva.naziv;
        }
        else stringZaUpisati = tijeloZahtjeva.naziv;

        if(!predmetPostoji) {
            fs . appendFile ( 'predmeti.txt' , stringZaUpisati, function ( err ){
                if ( err ) throw err ;
                res . end ("{\"message\": \"Uspješno dodan predmet!\"}");
            });
        }
    });
});
app . post ( '/aktivnost', function ( req , res ){
    var tijeloZahtjeva = req.body;
    var vrijemePocetak = tijeloZahtjeva.pocetak;
    var vrijemeKraj = tijeloZahtjeva.kraj;
    var csv = "";

    var imaGreska = false;
    if (vrijemePocetak >= vrijemeKraj || !(vrijemePocetak >= 0 && vrijemePocetak <= 24) ||
        !(vrijemeKraj >= 0 && vrijemeKraj <= 24) ||
        !(Number.isInteger(vrijemePocetak) || Number.isInteger(vrijemePocetak + 0.5)) || 
        !(Number.isInteger(vrijemeKraj) || Number.isInteger(vrijemeKraj + 0.5)))  
            imaGreska = true;
    fs.readFile('aktivnosti.txt', 'utf-8', function (err, data) {
        if (err) return console.error(err);
        if(data) {
            csv = data.toString();
            
            var redovi = csv.split("\n");
            for(i = 0; i < redovi.length; i++) {
                var kolone = redovi[i].split(",");
                if(tijeloZahtjeva.dan == kolone[4] && ((vrijemePocetak >= kolone[2] && vrijemePocetak < kolone[3]) || (vrijemePocetak < kolone[2] && vrijemeKraj > kolone[2])))
                    imaGreska = true;
            }
        }
        if(imaGreska) res . end ("{\"message\": \"Aktivnost nije validna!\"}");
        else {
            var stringZaUpisati = tijeloZahtjeva.naziv + "," + tijeloZahtjeva.tip + "," + tijeloZahtjeva.pocetak + "," + tijeloZahtjeva.kraj + "," + tijeloZahtjeva.dan;
            if(csv.length != 0) stringZaUpisati = "\n" + stringZaUpisati;
    
            if(!imaGreska) {
                fs . appendFile ( 'aktivnosti.txt', stringZaUpisati, function ( err ){
                    if ( err ) throw err ;
                    res . end ("{\"message\": \"Uspješno dodana aktivnost!\"}");
                });
            }
        }
    });
});
app.get('/predmet/:naziv/aktivnost/', function ( req , res ) {
    fs.readFile('aktivnosti.txt', 'utf-8', function (err, data) {
        if (err) return console.error(err);
        csv = data.toString();
        var nazivPredmeta = req.params.naziv;

        var nizJSON = [];
        var redovi = csv.split("\n");
        for(i = 0; i < redovi.length; i++) {
            var kolone = redovi[i].split(",");
            if(nazivPredmeta == kolone[0]) {
                var jsonString = "{\"naziv\":\"" + kolone[0] + "\",\"tip\":\"" + kolone[1] + "\",\"pocetak\":" + kolone[2] + ",\"kraj\":" + kolone[3] + ",\"dan\":\"" + kolone[4] +"\"}"; 
                nizJSON.push(JSON.parse(jsonString));
            }
        }
        res.json(nizJSON);
    });
});
app . delete ( '/aktivnost/:naziv', function ( req , res ){
    fs.readFile('aktivnosti.txt', 'utf-8', function (err, data) {
        var sadrzajNoveDatoteke = "";
        if (err) return console.error(err);
        csv = data.toString();
        var naziv = req.params.naziv;

        var redovi = csv.split("\n");
        for(i = 0; i < redovi.length; i++) {
            var kolone = redovi[i].split(",");
            if(naziv != kolone[0]) {
                if(sadrzajNoveDatoteke.length != 0) sadrzajNoveDatoteke += "\n";
                sadrzajNoveDatoteke += kolone[0] + "," + kolone[1] + "," + kolone[2] + "," + kolone[3] + "," + kolone[4]; 
            }
        }
        fs . writeFile ( 'aktivnosti.txt' , sadrzajNoveDatoteke, function ( err ){
            if ( err ) res . end (JSON.parse("{\"message\": \"Greška - aktivnost nije obrisana!\"}"));
            res . end ("{\"message\": \"Uspješno obrisana aktivnost!\"}");
        });
    });
});
app . delete ( '/predmet/:naziv', function ( req , res ){
    fs.readFile('predmeti.txt', 'utf-8', function (err, data) {
        var sadrzajNoveDatoteke = "";
        if (err) return console.error(err);
        csv = data.toString();
        var naziv = req.params.naziv;

        var redovi = csv.split("\n");
        for(i = 0; i < redovi.length; i++) {
            if(naziv != redovi[i]) {
                if(sadrzajNoveDatoteke.length != 0) sadrzajNoveDatoteke += "\n";
                sadrzajNoveDatoteke += redovi[i]; 
            }
        }
        fs . writeFile ( 'predmeti.txt' , sadrzajNoveDatoteke, function ( err ){
            if ( err ) res . end (JSON.parse("{\"message\": \"Greška - predmet nije obrisan!\"}"));
            res . end ("{\"message\": \"Uspješno obrisan predmet!\"}");
        });
    });
});
app . delete ( '/all', function ( req , res ){
    var uspjesno = true;
    fs.writeFile('predmeti.txt', '', function(err){
        if(err) uspjesno = false;
    })
    fs.writeFile('aktivnosti.txt', '', function(err){
        if(err) uspjesno = false;
    })
    if(uspjesno) res . end ("{\"message\": \"Uspješno obrisan sadržaj datoteka!\"}");
    else res . end ("{\"message\": \"Greška - sadržaj datoteka nije moguće obrisati!\"}");
});
module.exports = app . listen ( 3000 );