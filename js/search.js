
jQuery(document).delegate('#home', 'pageinit', function() {

  C.log('search.js', Config);
  set_page("#search");

  //search.init();
  //search.build_template();
});


var search = (function(pub, $, hb, c){

  pub.somevar = 'x';
  pub.some_function = function(){

  };


  return pub;
})({}, jQuery, Handlebars, C);
