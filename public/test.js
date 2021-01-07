const chai = require("chai")
const chaiHttp = require("chai-http")
const fs = require ( 'fs' );
let server = require('../zadatak1.js');
const expect = chai.expect
chai.use(chaiHttp)

let assert = chai . assert ;
describe("GET /aktivnosti", () => {

	it("should return status 200", async () => {
    	let res = await chai
        	.request(server)
        	.get('/aktivnosti')
       
    	expect(res.status).to.equal(200)
       
	})

	// afterEach(async () => {
    // 	await Dog.deleteOne({name: "Charlie"})
	// })
})

// describe ( 'Iscrtaj' , function () {
//     describe ( 'iscrtajRaspored()' , function () {
//         it ( 'treba okvir imati kreiran raspored kao prvo dijete' , function () {
//             let okvir = document.createElement("div");
//             Iscrtaj.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],8,22);
//             assert.isDefined(okvir.children[0], "Okvir treba imati kreiran raspored kao prvo dijete");
//         });
//     });
// });