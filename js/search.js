//build: movie-app

var search_init = (function(pub, c, rt, $)
{
  pub.setup_events = function(){
    $('#search_form').submit (function(){
      var search_str = $('#search_input').val();
      $('#search_input').blur();
      //show_busy();
      rt.search (search_str, function(movies_data){
        Search.build_list(movies_data);
      });
      return false; //so the submit doesn't reload page
    });

    $('#search_intheaters').click(function(){
      rt.in_theaters (function (movies_data){
        Search.build_list(movies_data);
      });
    });
    $('#search_comingsoon').click(function(){
      rt.coming_soon (function (movies_data){
        Search.build_list(movies_data);
      });
    });
  };
  return pub;
}({}, console, RT, jQuery));

var Search = (function(pub, $, hb, c, rt, movies, pages, clean)
{
  pub.build_list = function(data){
    var formated = clean.list(data);
    var source = $('#search_list_template').html();
    var template = hb.compile(source);
    var html = template(data);
    $('#search_content').html(html);

    pub.bind_event();
  };

  pub.bind_event = function(){
    $('.search_movie').on('tap', function(){
      rt.details(this.id, function(rt_details){
        if (movies.add(rt_details)){
          home.show_movies();
          $('body').pagecontainer('change', '#home');
        }else{
          alert('Movie already in list');
        }
      });
    });
  };
  return pub;
}({}, jQuery, Handlebars, console, RT, Movies, Pages, Clean));
