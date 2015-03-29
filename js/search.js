//build: movie-app
jQuery(document).on('pagecontainershow', function(event, ui){
  //C.log('PC Show', ui.toPage[0].id); //ui.toPage, ui.prevPage);
  if (ui.toPage[0].id == Pages.search){
    Config.set_page(Pages.search);


    //jQuery(document).on("pagecreate", '#search', function(event){
    C.log('pagecreate search')


    Config.set_page(Pages.search);
    //jQuery('text#big_button').text('<');
    //jQuery('a#big_button_link').attr('xlink:href', 'javascript:history.back()');

    (function(pub, c, rt, $, search)
     {
       $('#search_form').submit (function(){
         var search_str = $('#search_input').val();
         $('#search_input').blur();
         //show_busy();
         rt.search (search_str, function(movies_data){
           search.build_list(movies_data);
         });
         return false; //so the submit doesn't reload page
       });

       $('#search_intheaters').click(function(){
         rt.in_theaters (function (movies_data){
           search.build_list(movies_data);
         });
       });
       $('#search_comingsoon').click(function(){
         rt.coming_soon (function (movies_data){
           search.build_list(movies_data);
         });
       });
     }({}, C, RT, jQuery, Search));
  }
});


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
        movies.add(rt_details);
        home.show_movies();
        $('body').pagecontainer('change', '#home');
      });
    });
  };
  return pub;
}({}, jQuery, Handlebars, C, RT, Movies, Pages, Clean));
