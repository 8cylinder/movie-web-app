
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
  last_page: ''
};

var C = (function(pub, app) {

  console.log('creating C');
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

var set_page = (function(pub, config){

})({}, Config);

set_page = function() {


};
