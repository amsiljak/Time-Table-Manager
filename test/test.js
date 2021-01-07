const chai = require("chai")
const chaiHttp = require("chai-http");
const fs = require ( 'fs' );
let server = require('../zadatak1.js');
const expect = chai.expect;
chai.use(chaiHttp);
chai.should();

function napraviTestove(testoviFajl) {
	describe("rute", () => {
		var testniSlucajevi = testoviFajl.split("\r\n");
		for(let l = 0; l < testniSlucajevi.length; l++) {
			it("treba da rezultat odgovara posljednjoj koloni iz testnog fajla", (done) => {
				var kolone = testniSlucajevi[l].split(",");
				var posljednjaKolona;
				
				//slucaj kada get vraca vise json objekata
				posljednjaKolona = kolone[3];
				for(j = 4; j < kolone.length; j++) {
					posljednjaKolona += "," + kolone[j];
				}
					
				//slucaj kada se u postu salje vise json atributa
				podaciZaPost = kolone[2];
				for(j = 3; j < kolone.length - 1; j++) {
					podaciZaPost += "," + kolone[j];
				}

				if(kolone[0] == "GET") {
					chai.request(server)
					.get(kolone[1])
					.end((err,response) => {
						response.text.should.be.eq(posljednjaKolona)
					done();
					})
				}
				else if(kolone[0] == "DELETE") {
					chai.request(server)
					.delete(kolone[1])
					.end((err,response) => {
						response.text.should.be.eq(kolone[3])
					done();
					})
				}
				else if(kolone[0] == "POST") {
					chai.request(server)
					.post(kolone[1])
					.send(JSON.parse(podaciZaPost))
					.end((err,response) => {
						response.text.should.be.eq(kolone[kolone.length - 1])
					done();
					})
				}
			})
		}
	});
}
napraviTestove(fs.readFileSync('testniPodaci.txt', 'utf-8'));