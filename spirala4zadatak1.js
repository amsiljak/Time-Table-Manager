const express = require ( 'express' );
const fs = require ( 'fs' );
const bodyParser = require ( 'body-parser' );
const app = express ();

app . use ( bodyParser . json ());
app.use(express.static('public'));

const db = require('./db');
db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

app . get ( '/v1/predmeti', function ( req , res ){
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
app . get ( '/v1/aktivnosti', function ( req , res ){
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
app . post ( '/v1/predmet', function ( req , res ){
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
app . post ( '/v1/aktivnost', function ( req , res ){
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