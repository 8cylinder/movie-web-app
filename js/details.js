//build: movie-app

var details = (function(pub, $, hb, c, movies, config, rt, movielists)
{
  pub.get_synopsis = function(movie_id){
    rt.details(movie_id, function(rt_details){
      var synopsis = rt_details.synopsis;
      $('#details_synopsis').html(synopsis);
    });
  };

  pub.show_details = function() {
    var movie_id = config.get_details_id();
    c.log('  2-', movie_id)

    var data = {'movie': movies.get_one(movie_id)};

    var source = $('#details_template').html();
    var template = hb.compile(source);
    var html = template(data);

    pub.get_synopsis(movie_id);

    $('#details_content').html(html);

    $('#details #footer_plus').text('<');
    $('#details #footer_plus').attr('href', '#home');
  };
  return pub;
})({}, jQuery, Handlebars, console, Movies, Config, RT, MovieLists);
