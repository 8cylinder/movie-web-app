//build: movie-app
jQuery(document).on("pagecreate", '#home', function(event){
  C.log('pagecreate #home')

  home.show_movies();

  /* Does not work on mobile well.
   *
  jQuery('body').on(
  {'touchmove': function() {
     //C.log('in stick')
     var fix = '#home_list_title';
     var fix_class = 'sticky';

     var nav_height = 90; //jQuery(window).height() - 20;
     C.log(nav_height, jQuery(window).scrollTop())

     if (jQuery(window).scrollTop() > nav_height) {
       jQuery(fix).addClass(fix_class);
     } else {
       jQuery(fix).removeClass(fix_class);
      }
    }
  }); */

});
/*jQuery(document).on("pagecontainercreate", function(event, ui){
  C.log('PC Create', ui.toPage, ui.prevPage);
  //C.log('#home')
  //Config.set_page(Pages.home);
  //home.show_movies();
});*/

jQuery(document).on('pagecontainershow', function(event, ui){
  //C.log('PC Show', ui.toPage[0].id); //ui.toPage, ui.prevPage);
  if (ui.toPage[0].id == Pages.home){
    Config.set_page(Pages.home);
  }
  jQuery('#movieul').sortable({
    handle: '.handle',
    axis: 'y',
    //containment: "window",
    scrollSensitivity: 100
  });
  //jQuery('#movieul').disableSelection();
});



var home = (function(pub, $, hb, c, movies, config)
{
  pub.show_movies = function() {
    var data = movies.get_all();
    var source = $('#movie_list_template').html();
    var template = hb.compile(source);
    var html = template({'movies':data});
    //c.log(data, source, template, html)
    $('#home_content').html(html);

    pub.bind_events();
  };

  pub.bind_events = function(){
    $('.itemcontainer').on('tap', function(){
      c.log(this.id)
      var detail_id = this.id;
      config.set_details_id(detail_id);
      $('body').pagecontainer('change', '#details');
      //window.location = Pages.details + '?' + detail_id;
    });
  };
  return pub;
})({}, jQuery, Handlebars, C, Movies, Config);
