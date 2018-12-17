// Import the ORM to create functions that will interact with the database.
module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
        name: DataTypes.STRING,
        eaten: DataTypes.BOOLEAN
    });
    return Burger;
};