//build: movie-app
var Clean = (function(pub)
{
  pub.one = function(movie){
    // cast list
    var cast = movie.abridged_cast;
    var all_cast = [];
    for(var i=0; i<cast.length; i++){
      all_cast[i] = cast[i].name;
    }
    movie.formated_cast = all_cast.join(', ');

    // directors
    if (movie.abridged_directors){
      movie.formated_directors = movie.abridged_directors[0].name;
    }

    // release dates
    if (movie.release_dates.dvd === undefined){
      movie.release_dates.dvd = 'Unreleased';
    }

    // ratings
    if (movie.ratings.critics_score == '-1'){
      movie.ratings.critics_score = 'Not rated yet';
    } else {
      var score = movie.ratings.critics_score;
      score = score.toString();
      movie.ratings.critics_score = score + '/100';
      //movie.ratings.critics_score = '__/100'.merge([score]);
      //movie.ratings.critics_score = score;
    }
    return movie;

  };
  pub.list = function(movies){
    for (var i=0; i<movies.movies.length; i++){
      var fixed = pub.one(movies.movies[i]);
      movies.movies[i] = fixed;
    }
    return movies;
  };
  return pub;
})({});

/**
 * The main database interface between localstorage
 * and the the Movies, Lists, Settings objects
 * @class
 */
var Store = (function(pub)
{
  /* pub is PUBLIC
   * pvt is PRIVATE
   */

  if (! localStorage) {
    throw 'LocalStorage not supported on this browser';
  }

  /**
   * @param {string} key  The field in the ini file.
   * @param {Object} obj  The object to serialize and put in localStorage.
   */
  pub.put = function(key, obj) {
    var data = JSON.stringify(obj);
    try {
      localStorage.setItem(key, data);
    } catch (e) {
      if (e == 'QUOTA_EXCEEDED_ERR') {
        alert('database quota exceeded');
      }
    }
  };

  /**
   * @param {string} key  The field in the ini file.
   */
  pub.get = function(key) {
    var data = localStorage.getItem(key);
    data = JSON.parse(data);

    /**
     * Returns the requested data from the store
     * @return {*} data
     */
    return data;
  };

  /**
   * Delete the entire table
   * @param {string} table  The name of the table to delete
   */
  pub.clearAll = function(table) {
    localStorage.clear();
  };

  return pub;
})({/*public object*/});


var Movies = (function(pub, c, store, rt, clean)
{
  pub.get_all = function() {
    movies = store.get('movies') || [];
    for (var i=0; i<movies.length; i++){
      //var fixed = pub.format_movie(movies[i]);
      var fixed = clean.one(movies[i]);
      movies[i] = fixed;
    }
    return movies;
  };
  pub.get_one = function(movie_id){
    var data = store.get('movies');
    // find the matching id
    var movie = {'title': 'error'};
    for (var i=0; i<data.length; i++){
      if (movie_id == data[i].id){
        movie = data[i];
      }
    }
    //return pub.format_movie(movie);
    return clean.one(movie);
  };
  pub.add = function(rt_data) {
    var movies = store.get('movies') || [];
    // look for duplicate movies
    var new_id = rt_data.id;
    for (var i = 0; i < movies.length; i++){
      var list_id = movies[i].id;
      if (new_id === list_id){
        c.log('Movie already in db: ' + new_id);
        return;
      }
    }
    movies[movies.length] = rt_data;
    store.put('movies', movies);
  };
  pub.delete_single = function(movie_id) {

  };

  return pub;
})({/*public object*/}, C, Store, RT, Clean);
