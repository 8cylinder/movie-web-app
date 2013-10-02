

/**
 * @return {string}  Creates a merged string.
 */
String.prototype.merge = function() {

  var rep_val = '__';
  var str_arr = this.split(rep_val);

  var new_str = '';
  var insert;

  for (var i = 0; i < str_arr.length - 1; i++)
  {
    insert = arguments[i];
    new_str = new_str + str_arr[i] + insert;
  }

  new_str = new_str + str_arr[i];
  return new_str;
};


/**
 * @param {Object} value  Anything that might be in an array.
 * @return {boolean}  Returns true if value is in the array.
 */
Array.prototype.contains = function(value) {

  var found = false;
  for (var i = 0; i < this.length; i++) {
    if (this[i] === value) {
      found = true;
      break;
    }
  }
  return found;
};


// /**
//  * @return {string} Creates a capitalized string.
//  */

//String.prototype.toCapitalCase = function() {
//
//  var re = /\s/;
//  var words = this.split(re);
//  re = /(\S)(\S+)/;
//  for (var i = words.length - 1; i >= 0; i--) {
//    re.exec(words[i]);
//    words[i] = RegExp.$1.toUpperCase() + RegExp.$2.toLowerCase();
//  }
//  return words.join(' ');
//};


/* <String>.supplant()
 * -------------------
 *
 * String.supplant() does variable substitution on the string. It
 * scans through the string looking for expressions enclosed in { }
 * braces. If an expression is found, use it as a key on the object,
 * and if the key has a string value or number value, it is
 * substituted for the bracket expression and it repeats. This is
 * useful for automatically fixing URLs.  So...
 *
 * param = {domain: 'valvion.com', media: 'http://media.{domain}/'};
 * url = "{media}logo.gif".supplant(param);
 *
 * produces a url containing "http://media.valvion.com/logo.gif".
 *
 */


/**
 * @param {Object} o Object to be merged with string.
 * @return {string} Creates a merged string.
 */
String.prototype.supplant = function(o) {

  var i, j, s = this, v;
  for (;;)
  {
    i = s.lastIndexOf('{');
    if (i < 0)
    {
      break;
    }
    j = s.indexOf('}', i);
    if (i + 1 >= j)
    {
      break;
    }
    v = o[s.substring(i + 1, j)];
    if (!U.isString(v) && !U.isNumber(v))
    {
      break;
    }
    s = s.substring(0, i) + v + s.substring(j + 1);
  }
  return s.toString();
};


/**
 * @class
 */
var U = {

  /*
   * U.is...
   * -------
   *
   * Various methods that return a boolian value to determine the
   * state of a variable
   *
   */

  /** @lends {U} */
  isAlien: function(a) {
    return U.isObject(a) && typeof a.constructor != 'function';
  },
  /** @lends {U} */
  isArray: function(a) {
    return U.isObject(a) && a.constructor == Array;
  },
  /** @lends {U} */
  isBoolean: function(a) {
    return typeof a == 'boolean';
  },
  /** @lends {U} */
  isEmptyObject: function(o) {
    var i, v;
    if (U.isObject(o))
    {
      for (i in o)
      {
        v = o[i];
        if (U.isUndefined(v) && U.isFunction(v))
        {
          return false;
        }
      }
    }
    return true;
  },
  /** @lends {U} */
  isFunction: function(a) {
    return typeof a == 'function';
  },
  /** @lends {U} */
  isNull: function(a) {
    return typeof a == 'object' && !a;
  },
  /** @lends {U} */
  isNumber: function(a) {
    return typeof a == 'number' && isFinite(a);
  },
  /** @lends {U} */
  isObject: function(a) {
    return (a && typeof a == 'object') || U.isFunction(a);
  },
  /** @lends {U} */
  isString: function(a) {
    return typeof a == 'string';
  },
  /** @lends {U} */
  isUndefined: function(a) {
    return typeof a == 'undefined';
  }

};
