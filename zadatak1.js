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
        var redovi = csv.split("\n");
        for(i = 0; i < redovi.length - 1; i++) {
            var jsonString = "{\"naziv\":\"" + redovi[i] + "\"}"; 
            nizJSON.push(JSON.parse(jsonString));
        }
        res.json(nizJSON);
    });
});
app . get ( '/aktivnosti', function ( req , res ){
});
app . post ( '/predmet', function ( req , res ){
    var tijeloZahtjeva = req.body;
    var predmetPostoji = false;
    fs.readFile('predmeti.txt', 'utf-8', function (err, data) {
        if (err) return console.error(err);
        csv = data.toString();
        
        var redovi = csv.split("\n");
        for(i = 0; i < redovi.length; i++) {
            if(redovi[i] == tijeloZahtjeva.naziv.toString()) {
                predmetPostoji = true;
                res . end ("{message: \"Naziv predmeta postoji!\"}");
                break;
            }
        }
        if(i == redovi.length) {
            fs . appendFile ( 'predmeti.txt' , tijeloZahtjeva.naziv + "\n", function ( err ){
                if ( err ) throw err ;
                res . end ("{message: \"Uspješno dodan predmet!\"}");
            });
        }
    });
});
app . post ( '/aktivnost', function ( req , res ){
});
app . delete ( '/aktivnost', function ( req , res ){
});
app . delete ( '/predmet', function ( req , res ){
});
app . delete ( '/all', function ( req , res ){
});
app . listen ( 3000 );