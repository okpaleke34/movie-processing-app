const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize")
const con = new Sequelize(dbConfig.DB,dbConfig.USER, dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases:false,
    pool:{
        max:dbConfig.pool.max,
        min:dbConfig.pool.min,
        acquire:dbConfig.pool.acquire,
        idle:dbConfig.pool.idle
    },
    logging:false
})

const db = {};

db.Sequelize = Sequelize;
db.con = con;

db.Rating = require("./Rating.js")(con,Sequelize)
db.Movie = require("./Movie.js")(con,Sequelize)


db.Rating.belongsTo(db.Movie,{targetKey:'id',foreignKey:'mid'})

db.Movie.hasMany(db.Rating,{foreignKey:'mid'})

module.exports = db;