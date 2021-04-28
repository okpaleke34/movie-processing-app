const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const { Op } = require("sequelize");
const db = require("./app/models");

const app = express();

var corsOptions = {
    origin:"http://localhost:4000"
}


// Middlewares

app.use(cors(corsOptions));

// default static files directory
app.use(express.static("app/public/"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));


// register view engine
app.set('view engine', 'ejs');

// set views to look into /app/views folder since views folder is not in the root directory
app.set("views","app/views"); 

db.con.sync({
    logging:false
});

app.use((req,res,next)=>{
    app.locals.url = req.url;
    next();
})
require("./app/routes/movieRoutes")(app)

// 404 Error page
app.use((req,res)=>{
    res.status(404).send("Page not found");
})

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

