//build: movie-app

jQuery(document).on('pagecontainershow', function(event, ui){
  //C.log('PC Show', ui.toPage[0].id); //ui.toPage, ui.prevPage);
  if (ui.toPage[0].id == Pages.details){
    Config.set_page(Pages.details);
    details.show_details();
  }
});

var details = (function(pub, $, hb, c, movies, config)
{
  pub.show_details = function() {
    var movie_id = config.get_details_id();
    var data = {'movie': movies.get_one(movie_id)};
    var source = $('#details_template').html();
    var template = hb.compile(source);
    var html = template(data);

    $('#details_content').html(html);

    //pub.bind_events();
  };

  pub.bind_events = function(){
    $('.itemcontainer').on('click', function(){
      c.log(this.id);
      var detail_id = this.id;
      window.location = Pages.details + '?' + detail_id;
    });
  };
  return pub;
})({}, jQuery, Handlebars, C, Movies, Config);
