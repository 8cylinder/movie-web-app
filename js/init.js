// pageinit


$(document).delegate('#init', 'pageinit', (function() {
  c.log('Page: #init');
  c.log('Config:', Config);

}));



var xms = (function() {

  // is this the first time?
  //    if so, build db
  //    set db version to 1
  // is this the correct schema?
  //    if not, alter table
  //    set db version to 2
  //
  // user click ok to continue to home

})();


var x = {
  somevar: 'x',

  /**
   * @param value  value to be logged
   */
  init: function(value) {
    c.log('cow');
  }
};


var c = (function(pub, app) {

  //pub.init = function() {

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
  //};
  return pub;
})({}, Config);
//c.init();
