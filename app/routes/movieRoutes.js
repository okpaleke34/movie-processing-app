module.exports = app =>{
    // const { helpers, settings,investorAuth } = require("../middlewares/appMiddleware")
    const movie = require("../controllers/movieController.js")

    var router = require("express").Router();
    // middleware function
    const helpers = async (req,res,next)=>{
        res.locals.money = (money) => {
            return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(money)
        }    
        next()
    }
    router.use(helpers)
    // PAGE ROUTES
    router.get("/",movie.index);
    router.get("/saved/best-rated",movie.best_rated);
    router.get("/saved/highest-rated",movie.highest_rated);
    router.get("/saved/highest-grossing",movie.highest_grossing);
    router.get("/search/:title",movie.search_movie);
    
    
    router.post("/save-movie",movie.post_save_movie);
    router.post("/save-rating",movie.post_save_rating);

    app.use(router);
}