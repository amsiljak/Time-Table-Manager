const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt2018496","root","root",{host:"127.0.0.1",dialect:"mysql",logging:false});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//import modela
db.predmet = sequelize.import(__dirname+'/models/predmet.js');
db.grupa = sequelize.import(__dirname+'/models/grupa.js');
db.aktivnost = sequelize.import(__dirname+'/models/aktivnost.js');
db.dan = sequelize.import(__dirname+'/models/dan.js');
db.student = sequelize.import(__dirname+'/models/student.js');
db.tip = sequelize.import(__dirname+'/models/tip.js');

//relacije
// Veza 1-n vise knjiga se moze nalaziti u biblioteci
db.predmet.hasMany(db.grupa,{as:'grupePredmeta'},{foreignKey:{allowNull:false}});
db.predmet.hasMany(db.aktivnost,{as:'aktivnostiPredmeta'},{foreignKey:{allowNull:false}});
db.dan.hasMany(db.aktivnost,{as:'aktivnostiDana'},{foreignKey:{allowNull:false}});
db.tip.hasMany(db.aktivnost,{as:'aktivnostiTipa'},{foreignKey:{allowNull:false}});
db.grupa.hasMany(db.aktivnost,{as:'aktivnostiGrupe'});

// Veza n-m autor moze imati vise knjiga, a knjiga vise autora
db.studentGrupa=db.grupa.belongsToMany(db.student,{as:'studenti',through:'student_grupa',foreignKey:'grupaId'});
db.student.belongsToMany(db.grupa,{as:'grupe',through:'student_grupa',foreignKey:'studentId'});


module.exports=db;