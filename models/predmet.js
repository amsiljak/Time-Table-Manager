const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Predmet = sequelize.define("predmet",{
        naziv:Sequelize.STRING
    })
    return Predmet;
};