const axios = require("axios");
const { Rating,Movie } = require("../models");



exports.index = async (req,res)=>{    
    let movies = await Movie.findAll({include:[{model:Rating,attributes:["source","value"]}]})
    res.render("index",{title:"Saved movies",movies});    
}

exports.post_save_movie = async (req,res)=>{
    const { imdbid } = req.body;
    axios.get(`http://www.omdbapi.com/?apikey=6a5f52da&i=${imdbid}`)
    .then( async function (response) {
        let { data } = response
        // console.log(data);
        
        var result ={};
        Object.keys(data).map(oldKey=> {
            let newKey = oldKey.toLocaleLowerCase();
            result[newKey]=data[oldKey];
        });
        let saveMovie = await Movie.create(result)
        res.json({"status":true, "msg":"Movie saved successfully"})
    })
    .catch(function (error) {
        if(error.message == "Validation error"){
            res.json({"status":false, "msg":"Move has been saved to the database"})
        }
        else{
            console.log(error);
            res.json({"status":false, "msg":"Failed to save movie"})
        }
    })
}

exports.post_save_rating= async (req,res)=>{
    const { imdbid,mid } = req.body;
    axios.get(`http://www.omdbapi.com/?apikey=6a5f52da&i=${imdbid}`)
    .then( async function (response) {
        let { data } = response
        data.Ratings.map(rating =>{
            Rating.findOne({where:{mid,source:rating.Source}})
            .then(async result =>{
                if(result){
                    // rating exits, therefore update rating
                    await Rating.update({value:rating.Value},{where:{source:rating.Source,mid}})
                    res.json({"status":true, "msg":"Movie ratings updated successfully"})
                }
                else{
                    // rating does not exits, therefore create new rating
                    await Rating.create({source:rating.Source,value:rating.Value,mid})
                    res.json({"status":true, "msg":"Movie ratings saved successfully"})
                }
                
            })
            .catch(error =>{
                console.log({error});
                res.json({"status":false, "msg":"Failed to save movie rating"})
            })
        })
    })
    .catch(function (error) {
        if(error.message == "Validation error"){
            res.json({"status":true, "msg":"Move has been saved to the database"})
        }
        else{
            console.log(error);
            res.json({"status":false, "msg":"Failed to save movie"})
        }
    })
}

exports.best_rated = async (req,res)=>{    
    let movie = await Movie.findOne({include:[{model:Rating,attributes:["source","value"]}],order:[["imdbrating",'DESC']]})
    res.render("best_rated",{title:"Best rated IMDB",movie});
}

exports.highest_rated = async (req,res)=>{
    let rating = await Rating.findOne({where:{source:"Metacritic"},order:[["value",'DESC']]})
    if(rating){
        id = rating.dataValues.mid
        Movie.findByPk(id,{include:[{model:Rating,attributes:["source","value"]}]})
        .then(movie =>{
            res.render("highest_rated",{title:"Highest rated IMDB",movie});
        })
    }
    else{
        res.render("highest_rated",{title:"Best rated IMDB",movie:""});
    }
}

exports.highest_grossing = async (req,res)=>{
    let movie = await Movie.findOne({include:[{model:Rating,attributes:["source","value"]}],order:[["boxoffice",'DESC']]})
    res.render("highest_grossing",{title:"Highest grossing Movie",movie});
}


exports.search_movie = async (req,res)=>{
    const { title } = req.params
    axios.get(`http://www.omdbapi.com/?apikey=6a5f52da&t=${title}`)
    .then(function (response) {
        let { data } = response
        // console.log(data);
        res.render("search",{title:"Search results for: "+title,movie:data});
    })
    .catch(function (error) {
        // handle error
        console.log(error);
        res.render("search",{title:"Search results for: "+title,results:{"Response":"False","Error":"An error occured while trying to find movie!"}})
    })
}
