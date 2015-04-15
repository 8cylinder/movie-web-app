//build: movie-app
//themoviedb: ccf0b7283975ef925e9a69db90d20340
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

    // DVD release dates
    if (movie.release_dates.dvd === undefined ||
        movie.release_dates.dvd === "Unreleased"){
      movie.release_dates.dvd = 'Unreleased';
    } else {
      var movie_dvd = movie.release_dates.dvd;
      var pretty = moment(movie_dvd, 'YYYY-MM-DD');
      pretty = pretty.format('MMM D, YYYY');
      movie.release_dates.dvd = pretty;
    }
    // Theater release dates
    var theater_date = movie.release_dates.theater;
    var theater_pretty = moment(theater_date, 'YYYY-MM-DD');
    theater_pretty = theater_pretty.format('MMM D, YYYY');
    movie.release_dates.theater = theater_pretty;

    // ratings
    if (movie.ratings.critics_score == '-1'){
      //movie.ratings.critics_score = 'Not rated yet';
      movie.ratings.fancy = '<i>Not rated yet</i>';
    } else {
      var ratings = '<span class="rt_image __"></span>__/100, __';
      if (movie.ratings.critics_rating == 'Rotten')
      {
        movie.ratings.fancy = ratings.merge([
          'rotten',
          movie.ratings.critics_score,
          movie.ratings.critics_rating
        ]);
      }
      else if (movie.ratings.critics_rating == 'Fresh' ||
               movie.ratings.critics_rating == 'Certified Fresh')
      {
        movie.ratings.fancy = ratings.merge([
          'fresh',
          movie.ratings.critics_score,
          movie.ratings.critics_rating
        ]);
      }
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
  pub.removeItem = function(index){
    localStorage.removeItem(index);
  };

  return pub;
})({/*public object*/});


var moviesort = function(method, direction){
  var sort_order = 1;
  return function(a, b){
    var aa, bb;
    if (direction == 'up'){
      //swap the a, b variables to reverse the sort
      var c=a, a=b, b=c;
    }
    switch(method){
      case 'title':
        aa = a.title.toLowerCase();
        bb = b.title.toLowerCase();
        aa = aa.replace("the ", '');
        bb = bb.replace("the ", '');
      break;
      case 'dvd':
        aa = a.release_dates.dvd || '9999-99-99';
        bb = b.release_dates.dvd || '9999-99-99';
      break;
      case 'theater':
        aa = a.release_dates.theater || '9999-99-99';
        bb = b.release_dates.theater || '9999-99-99';
      break;
      case 'rt_score':
        aa = parseInt(a.ratings.critics_score);
        bb = parseInt(b.ratings.critics_score);
      break;
      case 'manual':
        aa = bb = a; //a do nothing sort
      break;
    }
    //console.log('sort', aa, bb)
    if (aa < bb)
      return -1;
    if (aa > bb)
      return 1;
    else
      return 0;
  };
};

var listsort = function(method){
  return function(a, b){
    var aa, bb;
    switch(method){
      case 'title':
        aa = a.title.toLowerCase();
        bb = b.title.toLowerCase();
      break;
      case 'id':
        aa = a.id;
        bb = b.id;
      break;
    }
    if (aa < bb)
      return -1;
    if (aa > bb)
      return 1;
    else
      return 0;
  };
};

var Movies = (function(pub, c, store, rt, clean, movielists)
{
  pub.get_all = function(list_id) {
    var movies = store.get('movies') || [];
    var filtered_movies = [];
    if (list_id){
      // get list that matches list_id
      // for each movie in list, do pub.get_one
      var list = MovieLists.get_one(list_id);
      // if the list requested does not exist, then
      // return all movies instead
      if (list.length == 0){
        return movies;
      }
      for (var i=0; i<movies.length; i++){
        for (var j=0; j<list.movies.length; j++){
          if (movies[i].id == list.movies[j]){
            filtered_movies[filtered_movies.length] = movies[i];
          }
        }
      }
      movies = filtered_movies;
      movies.sort(moviesort(list.sort_method, list.sort_direction));
    }

    for (var i=0; i<movies.length; i++){
      var fixed = clean.one(movies[i]);
      movies[i] = fixed;
    }
    //movies.sort(moviesort('title'));
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
    return clean.one(movie);
  };
  pub.add = function(rt_data) {
    var movies = store.get('movies') || [];
    // look for duplicate movies
    var new_id = rt_data.id;
    for (var i = 0; i < movies.length; i++){
      if (new_id === movies[i].id){
        c.log('Movie already in db: ' + new_id);
        return false;
      }
    }
    // delete the synopsis since it takes up a lot
    // of space.  It will get pulled from RT when
    // viewing the details page.
    rt_data.synopsis = '';

    movies[movies.length] = rt_data;
    store.put('movies', movies);

    // add all new movies to the main list
    MovieLists.add_movie('0', rt_data.id);

    return true;
  };
  pub.delete_single = function(movie_id) {
    // remove the movie from all lists
    var lists = MovieLists.get_all();
    for (var i=0; i<lists.length; i++){
      MovieLists.remove_movie(lists[i].id, movie_id);
    }

    var data = store.get('movies');
    // find the matching id
    for (var i=0; i<data.length; i++){
      if (movie_id == data[i].id){
        data.splice(i,1);
      }
    }
    store.put('movies', data);
  };

  return pub;
})({}, console, Store, RT, Clean, MovieLists);


var MovieLists = (function(pub, c, store)
{
  var get_all = function(){
    var alists = store.get('lists') || [];

    for (var i=0; i<alists.length; i++){
      var list_count = alists[i].movies.length;
      alists[i].count = list_count;
    }
    alists.sort(listsort('id'));
    return alists;
  };
  pub.get_all = function(){
    var lists = get_all();
    return lists;
  };
  pub.get_all_but_0 = function(){
    var lists = get_all();
    lists.shift();
    return lists;
  };
  pub.get_one = function(list_id){
    var lists = get_all();
    var data = [];
    for (var i=0; i<lists.length; i++){
      if (lists[i].id == list_id){
        data = lists[i];
      }
    }
    return data;
  };
  pub.create = function(list_name, description, list_id){
    if (! list_id){
      list_id = Date.now();
      var rand = Math.floor(Math.random() * (100000 - 999999) + 999999);
      list_id = list_id + '-' + rand;
    }
    var date_created = Date.now();
    var sort_method = 'title';
    var sort_direction = 'up';
    var manual_sort = [];
    var movies = [];

    var list = {
        'id': list_id,
        'title': list_name,
        'description': description,
        'date_created': date_created,
        'sort_method': sort_method,
        'sort_direction': sort_direction,
        'manual_sort': manual_sort,
        'movies': movies
    };

    //var lists = store.get('lists') || [];
    var lists = get_all();
    lists[lists.length] = list;
    store.put('lists', lists);
  };
  pub.update = function(id, list_name, description){
    var lists = get_all();
    for (var i=0; i<lists.length; i++){
      if (lists[i].id == id){
        lists[i].title = list_name;
        lists[i].description = description;
      }
    }
    store.put('lists', lists);
  };
  pub.remove = function(id){
    var lists = get_all();
    for (var i=0; i<lists.length; i++){
      var list_id = lists[i].id;
      if (list_id == id){
        lists.splice(i, 1);
      }
    }
    store.put('lists', lists);
  };
  pub.add_movie = function(list_id, movie_id){
    var lists = get_all();
    for (var i=0; i<lists.length; i++){
      var l = lists[i];
      if (l.id == list_id){
        l.movies[l.movies.length] = movie_id;
        lists[i].movies = l.movies;
      }
    }
    store.put('lists', lists);
  };
  pub.remove_movie = function(list_id, movie_id){
    var lists = get_all();
    for (var i=0; i<lists.length; i++){
      var l = lists[i];
      if (l.id == list_id){
        var index = l.movies.indexOf(movie_id);
        l.movies.splice(index, 1);
        lists[i].movies = l.movies;
      }
    }
    store.put('lists', lists);
  };
  pub.set_sort = function(list_id, method, direction){
    var lists = get_all();
    for (var i=0; i<lists.length; i++){
      if (lists[i].id == list_id){
        lists[i].sort_method = method;
        lists[i].sort_direction = direction;
      }
    }
    store.put('lists', lists);
  };
  return pub;
})({}, console, Store);