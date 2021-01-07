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
			console.log(testniSlucajevi[l]);
			it("should return status 200", (done) => {
				var kolone = testniSlucajevi[l].split(",");
				var posljednjaKolona;
				
				posljednjaKolona = kolone[3];
				for(j = 4; j < kolone.length; j++) {
					posljednjaKolona += "," + kolone[j];
					if((kolone[j]).charAt(kolone[j].length - 1) == "]") break;
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
					.send(JSON.parse(kolone[2]))
					.end((err,response) => {
						response.text.should.be.eq(kolone[3])
					done();
					})
				}
			})
		}
	});
}
napraviTestove(fs.readFileSync('testniPodaci.txt', 'utf-8'))