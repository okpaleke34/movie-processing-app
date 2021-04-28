module.exports = (con,Sequelize) =>{
    const {STRING,TEXT,INTEGER} = Sequelize
    const Rating = con.define("rating",{
        mid:{
            type:INTEGER(11),
            allowNull:false
        },
        value:{
            type:STRING(10),
            allowNull:false
        },
        source:{
            type:STRING(265),
            allowNull:false
        }
    })
    return Rating
}