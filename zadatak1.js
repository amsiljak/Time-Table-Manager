const express = require ( 'express' );
const fs = require ( 'fs' );
const bodyParser = require ( 'body-parser' );
const app = express ();

app . use ( bodyParser . json ());
app.use(express.static('public'));

const db = require('./db.js');
const { student, aktivnost, predmet } = require('./db.js');

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
app.get('/v1/predmet/:naziv/aktivnost/', function ( req , res ) {
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
app . delete ( '/v1/aktivnost/:naziv', function ( req , res ){
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
app . delete ( '/v1/predmet/:naziv', function ( req , res ){
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
app . delete ( '/v1/all', function ( req , res ){
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



//rute za read - svi objekti
app . get ( '/v2/predmeti', function ( req , res ){
    var promise = [];
    promise.push(
        db.predmet.findAll().then(function(resSet){
            return new Promise(function(resolve,reject){resolve(resSet);});
        })
    );
    Promise.all(promise).then(function (resSet) {
        let nizJSON = [];
        predmeti = [];
        resSet.forEach(s => {
            s.forEach(a => {
                predmeti.push(a);
            })
        })
        predmeti.forEach(predmet => {
            nizJSON.push(predmet);
        })
        res.json(nizJSON);
    }).catch(function(err){console.log("Greska "+err);});
});
app . get ( '/v2/tipovi', function ( req , res ){
    var promise = [];
    promise.push(
        db.tip.findAll().then(function(resSet){
            return new Promise(function(resolve,reject){resolve(resSet);});
        })
    );
    Promise.all(promise).then(function (resSet) {
        res.json(resSet);
    }).catch(function(err){console.log("Greska "+err);});
});
app . get ( '/v2/dani', function ( req , res ){
    var promise = [];
    promise.push(
        db.dan.findAll().then(function(resSet){
            return new Promise(function(resolve,reject){resolve(resSet);});
        })
    );
    Promise.all(promise).then(function (resSet) {
        res.json(resSet);
    }).catch(function(err){console.log("Greska "+err);});
});
app . get ( '/v2/studenti', function ( req , res ){
    var promise = [];
    promise.push(
        db.student.findAll().then(function(resSet){
            return new Promise(function(resolve,reject){resolve(resSet);});
        })
    );
    Promise.all(promise).then(function (resSet) {
        res.json(resSet);
    }).catch(function(err){console.log("Greska "+err);});
});
app . get ( '/v2/aktivnosti', function ( req , res ){
    var promise = [];
    promise.push(
        db.aktivnost.findAll().then(function(resSet){
            return new Promise(function(resolve,reject){resolve(resSet);});
        })
    );
    Promise.all(promise).then(function (resSet) {
        res.json(resSet);
    }).catch(function(err){console.log("Greska "+err);});
});
app . get ( '/v2/grupe', function ( req , res ){
    var promise = [];
    promise.push(
        db.grupa.findAll().then(function(resSet){
            return new Promise(function(resolve,reject){resolve(resSet);});
        })
    );
    Promise.all(promise).then(function (resSet) {
        res.json(resSet);
    }).catch(function(err){console.log("Greska "+err);});
});




//rute za read - jedan objekat
app . get ( '/v2/predmet/:id', function ( req , res ){
    var promise = [];
    promise.push(
        db.predmet.findOne( {where: {id:req.params.id} }).then(function(predmet){
            return new Promise(function(resolve,reject){resolve(predmet);});
        })
    );
    Promise.all(promise).then(function (predmet) {
        res.json(predmet);
    }).catch(function(err){console.log("Greska "+err);});
});
app . get ( '/v2/tip/:id', function ( req , res ){
    var promise = [];
    promise.push(
        db.tip.findOne( {where: {id:req.params.id} }).then(function(tip){
            return new Promise(function(resolve,reject){resolve(tip);});
        })
    );
    Promise.all(promise).then(function (tip) {
        res.json(tip);
    }).catch(function(err){console.log("Greska "+err);});
});
app . get ( '/v2/dan/:id', function ( req , res ){
    var promise = [];
    promise.push(
        db.dan.findOne( {where: {id:req.params.id} }).then(function(dan){
            return new Promise(function(resolve,reject){resolve(dan);});
        })
    );
    Promise.all(promise).then(function (dan) {
        res.json(dan);
    }).catch(function(err){console.log("Greska "+err);});
});
app . get ( '/v2/student/:id', function ( req , res ){
    var promise = [];
    promise.push(
        db.student.findOne( {where: {id:req.params.id} }).then(function(student){
            return new Promise(function(resolve,reject){resolve(student);});
        })
    );
    Promise.all(promise).then(function (student) {
        res.json(student);
    }).catch(function(err){console.log("Greska "+err);});
});
app . get ( '/v2/grupa/:id', function ( req , res ){
    var promise = [];
    promise.push(
        db.grupa.findOne( {where: {id:req.params.id} }).then(function(grupa){
            return new Promise(function(resolve,reject){resolve(grupa);});
        })
    );
    Promise.all(promise).then(function (grupa) {
        res.json(grupa);
    }).catch(function(err){console.log("Greska "+err);});
});
app . get ( '/v2/aktivnost/:id', function ( req , res ){
    var promise = [];
    promise.push(
        db.aktivnost.findOne( {where: {id:req.params.id} }).then(function(aktivnost){
            return new Promise(function(resolve,reject){resolve(aktivnost);});
        })
    );
    Promise.all(promise).then(function (aktivnost) {
        res.json(aktivnost);
    }).catch(function(err){console.log("Greska "+err);});
});



//rute za create
app.post('/v2/predmet', function(req,res) {
    var tijeloZahtjeva = req.body;
    
    var fja = [];
    fja.push(
        db.predmet.create({naziv:tijeloZahtjeva.naziv}).then(function(p){
            return new Promise(function(resolve,reject){resolve(p);});
        })
    )
    Promise.all(fja).then(function(s) {
        res . end ("{\"message\": \"Uspješno dodan predmet!\"}");
    }).catch(function(err){console.log("Greska "+err);});
});
app.post('/v2/tip', function(req,res) {
    var tijeloZahtjeva = req.body;
    
    var fja = [];
    fja.push(
        db.tip.create({naziv:tijeloZahtjeva.naziv}).then(function(p){
            return new Promise(function(resolve,reject){resolve(p);});
        })
    )
    Promise.all(fja).then(function(s) {
        res . end ("{\"message\": \"Uspješno dodan tip!\"}");
    }).catch(function(err){console.log("Greska "+err);});
});
app.post('/v2/dan', function(req,res) {
    var tijeloZahtjeva = req.body;
    
    var fja = [];
    fja.push(
        db.dan.create({naziv:tijeloZahtjeva.naziv}).then(function(p){
            return new Promise(function(resolve,reject){resolve(p);});
        })
    )
    Promise.all(fja).then(function(s) {
        res . end ("{\"message\": \"Uspješno dodan dan!\"}");
    }).catch(function(err){console.log("Greska "+err);});
});
app.post('/v2/student', function(req,res) {
    var tijeloZahtjeva = req.body;
    
    var fja = [];
    fja.push(
        db.student.create({ime:tijeloZahtjeva.ime,index:tijeloZahtjeva.index}).then(function(s){
            return new Promise(function(resolve,reject){resolve(s);});
        })
    )
    Promise.all(fja).then(function(s) {
        res . end ("{\"message\": \"Uspješno dodan student!\"}");  
    }).catch(function(err){console.log("Greska "+err);});
});
app.post('/v2/grupa', function(req,res) {
    var tijeloZahtjeva = req.body;
    
    if(tijeloZahtjeva.predmet) {
        var fja =[];
        fja.push(
            db.grupa.create({naziv:tijeloZahtjeva.naziv,predmetId:tijeloZahtjeva.predmet}).then(function(d){
                return new Promise(function(resolve,reject){resolve();});
            })
        );
        Promise.all(fja).then(function () {
            res . end ("{\"message\": \"Uspješno dodana grupa!\"}");
        }).catch(function(err){console.log("Greska "+err);});
    }
    else res . end ("{\"message\": \"Greška - grupa mora pripadati predmetu!\"}");
});
app.post('/v2/aktivnost', function(req,res) {
    var tijeloZahtjeva = req.body;
    var promise = [];
    var predmetId;

    //uslov za ako je poslan naziv predmeta a ne id
    if(tijeloZahtjeva.predmetNaziv != 'undefined' && tijeloZahtjeva.predmetNaziv) {
        console.log(tijeloZahtjeva.predmetNaziv);
        promise.push(
            db.predmet.findOne( {where: {naziv:tijeloZahtjeva.predmetNaziv} }).then(function(p){
                predmetId = p.id;
                return new Promise(function(resolve,reject){resolve();});
            })
        )    
    }
    else predmetId = tijeloZahtjeva.predmetId;
    Promise.all(promise).then(function() {
        var fja = [];
        fja.push(
            db.aktivnost.create({naziv:tijeloZahtjeva.naziv,pocetak:tijeloZahtjeva.pocetak,kraj:tijeloZahtjeva.kraj,
                predmetId:predmetId,danId:tijeloZahtjeva.dan,tipId:tijeloZahtjeva.tip,grupaId:tijeloZahtjeva.grupa}).then(function(s){
                return new Promise(function(resolve,reject){resolve(s);});
            })
        )
        Promise.all(fja).then(function(s) {
            res . end ("{\"message\": \"Uspješno dodana aktivnost!\"}");  
        }).catch(function(err){console.log("Greska "+err);});
    }).catch(function(err){console.log("Greska "+err);});
});
app.post('/v2/studenti', function(req,res) {
    var tijeloZahtjeva = req.body;
    var jsonStudenti = [];
    var nizOdgovora = [];
    var studentiListaPromisea = [];

    tijeloZahtjeva.forEach(student => {
        jsonStudenti.push(JSON.parse(student));
    })
    var fja = [];
    fja.push(
        db.student.findAll().then(function(resSet){
            return new Promise(function(resolve,reject){resolve(resSet);});
        })
    );
    Promise.all(fja).then(function (resSet) {
        var studentiBaze = [];
        resSet.forEach(s => {
            s.forEach(a => {
                studentiBaze.push(a);
            })
        })
        jsonStudenti.forEach(student => {
            trebaKreirati = true;
            studentiBaze.forEach(studentBaze => {
                if(studentBaze.ime != student.ime && studentBaze.index == student.index) {
                    trebaKreirati = false;
                    nizOdgovora.push("Student " + student.ime + " nije kreirean jer postoji student " + studentBaze.ime + " sa istim indexom " + studentBaze.index);
                }
                else if(studentBaze.ime == student.ime && studentBaze.index == student.index) {
                    var dohvatanjePredmeta = [];
                    var predmetNovogId;
                    var predmetPostojecegId;
                    var dohvatanje1 = [];
                    var novaGrupa;
                    
                    //trazenje predmeta grupe novododanog

                    dohvatanje1.push( 
                        db.grupa.findOne( {where: {id:student.grupa} }).then(function(grupa){
                            novaGrupa = grupa;
                            predmetNovogId = grupa.predmetId;
                            return new Promise(function(resolve,reject){resolve();});
                        })
                    )
                    Promise.all(dohvatanje1).then(function(){
                    // trazenje predmeta grupe studenta iz baze koji je jednak novododanom
                        dohvatanjePredmeta.push(
                            studentBaze.getGrupe().then(function(resSet){
                                resSet.forEach(s => {
                                    // s.forEach(a => {
                                        if(s.predmetId == predmetNovogId) {
                                            studentiListaPromisea.push(
                                                studentBaze.setGrupe([novaGrupa]).then(function(){
                                                    return new Promise(function(resolve,reject){resolve();});
                                                })
                                            )
                                        }
                                    // })
                                })
                                return new Promise(function(resolve,reject){resolve();});
                            })
                        );
                    })
                    trebaKreirati = false;
                }
            })
            if(trebaKreirati) {
                studentiListaPromisea.push(
                    db.student.create({ime:student.ime,index:student.index}).then(function(s){
                        s.setGrupe(student.grupa);
                        return new Promise(function(resolve,reject){resolve();});
                    })
                )
            }
        })
        Promise.all(studentiListaPromisea).then(function () {
            res.send(nizOdgovora);
        })
    })
});



//rute za update
app.put('/v2/dan/:id', function(req,res) {
    var tijeloZahtjeva = req.body;
    var id = req.params.id;
    var promisi = [];

    promisi.push(
        db.dan.update( { naziv:tijeloZahtjeva.naziv},
        { where: {id:id} }).then(function(d){
            return new Promise(function(resolve,reject){resolve(d);});
        })
    )
    Promise.all(promisi).then(function () {
        res . end ("{\"message\": \"Uspješno izmijenjen dan!\"}");
    })
});
app.put('/v2/predmet/:id', function(req,res) {
    var tijeloZahtjeva = req.body;
    var id = req.params.id;
    var promisi = [];

    promisi.push(
        db.predmet.update( { naziv:tijeloZahtjeva.naziv},
        { where: {id:id} }).then(function(d){
            return new Promise(function(resolve,reject){resolve(d);});
        })
    )
    Promise.all(promisi).then(function () {
        res . end ("{\"message\": \"Uspješno izmijenjen predmet!\"}");
    })
});
app.put('/v2/tip/:id', function(req,res) {
    var tijeloZahtjeva = req.body;
    var id = req.params.id;
    var promisi = [];

    promisi.push(
        db.tip.update( { naziv:tijeloZahtjeva.naziv},
        { where: {id:id} }).then(function(d){
            return new Promise(function(resolve,reject){resolve(d);});
        })
    )
    Promise.all(promisi).then(function () {
        res . end ("{\"message\": \"Uspješno izmijenjen tip!\"}");
    })
});
app.put('/v2/student/:id', function(req,res) {
    var tijeloZahtjeva = req.body;
    var id = req.params.id;
    var promisi = [];

    promisi.push(
        db.student.update( { ime:tijeloZahtjeva.ime, index:tijeloZahtjeva.index},
        { where: {id:id} }).then(function(d){
            return new Promise(function(resolve,reject){resolve();});
        })
    )
    Promise.all(promisi).then(function () {
        res . end ("{\"message\": \"Uspješno izmijenjen student!\"}");
    })
});
app.put('/v2/grupa/:id', function(req,res) {
    var tijeloZahtjeva = req.body;
    var id = req.params.id;
    var promisi = [];

    promisi.push(
        db.grupa.update( { ime:tijeloZahtjeva.ime},
        { where: {id:id} }).then(function(d){
            return new Promise(function(resolve,reject){resolve();});
        })
    )
    Promise.all(promisi).then(function () {
        res . end ("{\"message\": \"Uspješno izmijenjen predmet!\"}");
    }).catch(function(err){console.log("Greska "+err);});
});
app.put('/v2/aktivnost/:id', function(req,res) {
    var tijeloZahtjeva = req.body;
    var id = req.params.id;
    var promisi = [];

    promisi.push(
        db.aktivnost.update( { naziv:tijeloZahtjeva.naziv, pocetak:tijeloZahtjeva.pocetak,kraj:tijeloZahtjeva.kraj},
        { where: {id:id} }).then(function(d){
            return new Promise(function(resolve,reject){resolve();});
        })
    )
    Promise.all(promisi).then(function () {
        res . end ("{\"message\": \"Uspješno izmijenjena aktivnost!\"}");
    }).catch(function(err){console.log("Greska "+err);});
});


//rute za delete
app.delete('/v2/dan/:id', function(req,res) {
    var fja =[];
    fja.push(
        db.dan.destroy({where:{id:req.params.id}}).then(function(){
            return new Promise(function(resolve,reject){resolve();});
        })
    )
    Promise.all(fja).then(function () {
        res . end ("{\"message\": \"Uspješno obrisan dan!\"}");
    }).catch(function(err){console.log("Greska "+err);});
});
app.delete('/v2/predmet/:naziv', function(req,res) {
    var fja =[];
    fja.push(
        db.predmet.destroy({where:{id:req.params.naziv}}).then(function(){
            return new Promise(function(resolve,reject){resolve();});
        })
    )
    Promise.all(fja).then(function () {
        res . end ("{\"message\": \"Uspješno obrisan predmet!\"}");
    }).catch(function(err){console.log("Greska "+err);});
});
app.delete('/v2/tip/:id', function(req,res) {
    var fja =[];
    fja.push(
        db.tip.destroy({where:{id:req.params.id}}).then(function(){
            return new Promise(function(resolve,reject){resolve();});
        })
    )
    Promise.all(fja).then(function () {
        res . end ("{\"message\": \"Uspješno obrisan tip!\"}");
    }).catch(function(err){console.log("Greska "+err);});
});
app.delete('/v2/student/:id', function(req,res) {
    var fja =[];
    fja.push(
        db.student.destroy({where:{id:req.params.id}}).then(function(){
            return new Promise(function(resolve,reject){resolve();});
        })
    )
    Promise.all(fja).then(function () {
        res . end ("{\"message\": \"Uspješno obrisan student!\"}");
    }).catch(function(err){console.log("Greska "+err);});
});
app.delete('/v2/grupa/:id', function(req,res) {
    var fja =[];
    fja.push(
        db.grupa.destroy({where:{id:req.params.id}}).then(function(){
            return new Promise(function(resolve,reject){resolve();});
        })
    )
    Promise.all(fja).then(function () {
        res . end ("{\"message\": \"Uspješno obrisana grupa!\"}");
    }).catch(function(err){console.log("Greska "+err);});
});
app.delete('/v2/aktivnost/:id', function(req,res) {
    var fja =[];
    fja.push(
        db.aktivnost.destroy({where:{id:req.params.id}}).then(function(){
            return new Promise(function(resolve,reject){resolve();});
        })
    )
    Promise.all(fja).then(function () {
        res . end ("{\"message\": \"Uspješno obrisana aktivnost!\"}");
    }).catch(function(err){console.log("Greska "+err);});
});
module.exports = app . listen ( 3000 );