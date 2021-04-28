This application enables users to search  and process movies information.

There is a search box in the right side of the nav bar search any movie of their choice and click on the search button to go to the search result page.

On this search result page the user can see all the information about the movie and use the save button at the bottom of the movie card to save the movie to the database.

The homepage shows all the movies saved in the database and there is a buttom at the bottom of every card that a user can use to save the ratings of a movie or update the value of already saved  ratings

Highest grossing movies fetch the movie with the highest box office from the saved movies

Highest rated page fetch the highest rated movie according to Metacritic rating

Best rated IMDB fetch the highest rated movie using the imdbrating



GET  http://localhost:4000/

- Fetch all the saved movies

GET http://localhost:4000/saved/best-rated

- Fetch the best rated IMDB of saved movie

GET http://localhost:4000/saved/highest-rated

- Fetch the highest rated saved movies by user

GET http://localhost:4000/saved/highest-grossing

- Fetch the movie with highest box office

GET - http://localhost:4000/search/:title

- Search a movie in omdbapi using the title of the movie

GET - http://localhost:4000/save-movie

- save a movie to database


GET - http://localhost:4000/save-movie

- save/update rating of a movie to the database