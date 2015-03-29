//build: movie-app

/*
global objects:
  jQuery
  Handlebars
  c
  Config
*/

jQuery.noConflict();


var Config = {
  debug: true,
  storage_version: 1,
  app_version: 1,
  this_page: '',
  last_page: '',
  set_page: function(page){
    Store.put('current_page', page);
  },
  get_page: function(){
    return Store.get('current_page');
  },
  set_details_id: function(id){
    Store.put('details_id', id);
  },
  get_details_id: function(){
    return Store.get('details_id');
  },
  set_current_list: function(name){
    Store.put('active_list', name);
  },
  get_current_list: function(){
    return Store.get('active_list');
  }

};
var Pages = {
  init: 'init',
  home: 'home',
  search: 'search',
  details: 'details'
};

var C = (function(pub, app)
{
  //console.log('creating C')
  var console_methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'profile',
    'profileEnd', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];

  for (var i = 0; i < console_methods.length; i++) {
    var method = console_methods[i];

    pub[method] = function() {
      if (app.debug == true) {
        console[method].apply(console, arguments);
      }
    };
  }
  return pub;
})({}, Config);
