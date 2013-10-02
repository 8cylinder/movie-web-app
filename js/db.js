

/**
 * The main database interface between localstorage
 * and the the Movies, Lists, Settings objects
 * @class
 */
var Store = (function(pub) {
  /* pub is PUBLIC
   * pvt is PRIVATE
   */

  if (! localStorage) {
    throw 'LocalStorage not supported on this browser';
  }

  /**
   * @param {string} key  The field in the ini file.
   * @param {Object} obj  The object to serialize and put in localStorage.
   */
  pub.put = function(key, obj) {
    var data = JSON.stringify(obj);
    try {
      localStorage.setItem(key, data);
    } catch (e) {
      if (e == 'QUOTA_EXCEEDED_ERR') {
        alert('database quota exceeded');
      }
    }
  };

  /**
   * @param {string} key  The field in the ini file.
   */
  pub.get = function(key) {
    var data = localStorage.getItem(key);
    data = JSON.parse(data);

    /**
     * Returns the requested data from the store
     * @return {*} data
     */
    return data;
  };

  /**
   * Delete the entire table
   * @param {string} table  The name of the table to delete
   */
  pub.clearAll = function(table) {
    localStorage.clear();
  };

  return pub;
})({/*public object*/});


var Movies = (function(pub) {

  pub.getAll = function() {

  };
  pub.addNew = function() {

  };
  pub.deleteMovie = function() {

  };

})({/*public object*/});
