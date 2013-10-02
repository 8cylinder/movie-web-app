
$(document).delegate('#home', 'pageinit', function() {

  //c.init();
  c.log('home.js', Config);
  c.log('MovieList controller');

  jQuery.noConflict();

  home.init();
  home.build_template();

});


var home = (function(pub, $, hb, c) {

  pub.init = function() {
    c.log('ms.init()');
  };

  pub.generate_list = function() {
    var mlist = [];
    for (var i = 0; i < 5; i++) {
      var rand = Math.floor(Math.random() * 100000);
      for (var j = 0; j < 5; j++) {
        rand += rand + ' ';
      }
      mlist[mlist.length] = {
        'title': 'this is title',
        'name': rand
      };
    }
    return mlist;
  };

  pub.build_template = function() {
    var data = {
      'movies': pub.generate_list()
    };
    var source = $('#movie_list_template').html();
    var template = hb.compile(source);
    var html = template(data);

    //c.log(source, template, data, html);

    $('#content').html(html);
  };

  return pub;
})({}, jQuery, Handlebars, c);
