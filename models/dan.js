const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Dan = sequelize.define("dan",{
        naziv:Sequelize.STRING
    })
    return Dan;
};