//build: movie-app
// pageinit


jQuery(document).delegate('#init', 'pageinit', (function() {
  C.log('Page: #init');
  C.log('Config:', Config);

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

}());


var x = {
  somevar: 'x',

  /**
   * @param value  value to be logged
   */
  init: function(value) {
    C.log('cow');
  }
};
