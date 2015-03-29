//build: movie-app
jQuery(document).on('pagecontainershow', function(event, ui){
  C.log('!__!'.merge(ui.toPage[0].id))
  if (ui.toPage[0].id == Pages.sort){
    C.log('sort')
    Config.set_page(Pages.home);
  }
});
