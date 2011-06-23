/**
 *
 * jQuery plugin to impliment local storage with optional AES
 * encryption support via the Gibberish-AES libraries
 *
 * Fork me @ https://www.github.com/jas-/jQuery.handleStorage
 *
 * FEATURES:
 * - HTML5 localStorage support
 * - HTML5 sessionStorage support
 * - Cookie support
 * - AES encryption support
 *
 * REQUIREMENTS:
 * - jQuery libraries (required - http://www.jquery.com)
 * - jQuery cookie plugin (optional - http://plugins.jquery.com/files/jquery.cookie.js.txt)
 * - Gibberish-AES libraries (optional - https://github.com/mdp/gibberish-aes)
 *
 * OPTIONS:
 * - appID:   Unique identifier used as storage object key
 * - storage: HTML5 localStorage, sessionStorage and cookies supported
 * - aes:     Use AES encryption for local storage
 * - uuid:    Random RFC-4122 string used as AES password
 *
 * Author: Jason Gerfen
 * Email: jason.gerfen@gmail.com
 * Copyright: Jason Gerfen
 *
 * License: GPL
 *
 */

(function($){

 /**
  * @function jQuery.handleStorage
  * @abstract Plug-in used to assist in client storage items
  * @param method string Method to employ for form ID DOM object
  *                      init (transparent getting and setting of
  *                      form elements)
  * @param options object Options object for specific operations
  *                       appID, storage, aes
  */
 $.fn.handleStorage = function(method) {

  /**
   * @object defaults
   * @abstract Default set of options for plug-in
   */
  var defaults = {
   appID:   'jQuery.handleStorage',  // Application ID, used as index
   storage: 'localStorage',          // Storage type localStorage || sessionStorage || cookie (cookie storage requires jQuery cookie plugin)
   aes:     false,                   // Use AES encryption? (true or false)
   uuid:    '',                      // Random RFC-4122 string used as AES password
   form:    $(this).attr('id'),      // Place holder for form ID
   data:    {}                       // Place holder for existing form storage objects
  };

  /**
   * @object methods
   * @abstract Plug-in methods
   */
  var methods = {

   /**
    * @function init
    * @abstract Default plug-in method. Provides transparent client storage
    *           of form data using HTML5 client storage or cookies with
    *           optional AES encryption support
    */
   init: function(options){
    var opts = $.extend({}, defaults, options);
    if (validateOptions(opts)){
     handleKey(opts);
     opts.data[opts.appID] = (existing(opts)) ? existing(opts) : {};
     var orig = getStorage(opts);
     if ((typeof orig==='object')&&(sizeChk(orig)>0)){
      setForm(opts, orig);
     }
     $('#'+opts.form).live('submit', function(e){
      saveForm(opts);
     });
     return true;
    } else {
     return false;
    }
   }
  };

  /**
   * @function sizeChk
   * @abstract Performs a check on object sizes
   */
  var sizeChk = function(obj) {
   var n = 0;
   $.each(obj, function(k, v){
    if (obj.hasOwnProperty(k)) n++;
   });
   return n;
  }

  /**
   * @function setItem
   * @abstract Proxy function for setting data with specified client storage
   *           option
   */
  var setItem = function(type, k, v) {
   var x = false;
   type = (validateStorage(type)) ? type : 'cookie';
   switch(type) {
    case 'localStorage':
     x = setLocal(k, v);
     break;
    case 'sessionStorage':
     x = setSession(k, v);
     break;
    case 'cookie':
     x = setCookie(k, v);
     break;
    default:
     x = setLocal(k, v);
     break;
   }
   return x;
  }

  /**
   * @function getItem
   * @abstract Proxy function for getting data with specified client storage
   *           option
   */
  var getItem = function(type, k) {
   var x = false;
   type = (validateStorage(type)) ? type : 'cookie';
   switch(type) {
    case 'localStorage':
     x = getLocal(k);
     break;
    case 'sessionStorage':
     x = getSession(k);
     break;
    case 'cookie':
     x = getCookie(k);
     break;
    default:
     x = getLocal(k);
     break;
   }
   return x;
  }

  /**
   * @function setLocal
   * @abstract Function used to set localStorage items
   */
  var setLocal = function(k, v) {
   return (localStorage.setItem(k, v)) ? false : true;
  }

  /**
   * @function setSession
   * @abstract Function used to set sessionStorage items
   */
  var setSession = function(k, v) {
   return (sessionStorage.setItem(k, v)) ? false : true;
  }

  /**
   * @function setCookie
   * @abstract Function used to set cookie items
   */
  var setCookie = function(k, v) {
   if (typeof $.cookie === 'function') {
    return ($.cookie(k, v, {expires: 7})) ? true : false;
   } else {
    return false;
   }
  }

  /**
   * @function getLocal
   * @abstract Function used to get localStorage items
   */
  var getLocal = function(k) {
   return (localStorage.getItem(k)) ? localStorage.getItem(k) : false;
  }

  /**
   * @function getSession
   * @abstract Function used to get sessionStorage items
   */
  var getSession = function(k) {
   return (sessionStorage.getItem(k)) ? sessionStorage.getItem(k) : false;
  }

  /**
   * @function setCookie
   * @abstract Function used to get cookie items
   */
  var getCookie = function(name) {
   if (typeof $.cookie === 'function') {
    return ($.cookie(name)) ? $.cookie(name) : false;
   } else {
    return false;
   }
  }

  /**
   * @function existing
   * @abstract Function used to return configured storage items
   *           as JSON object
   */
  var existing = function(options) {
   return (getItem(options.storage, options.appID)) ?
    JSON.parse(getItem(options.storage, options.appID)) : false;
  }

  /**
   * @function getStorage
   * @abstract Function to compare and decrypt if necessary, existing
   *           storage items to configured form input elements
   */
  var getStorage = function(options) {
   var ret={}, x;
   if (validateString(options.data[options.appID][options.form])){
    $.each($('#'+options.form+' :text, :password, :file, input:hidden, input:checkbox:checked, input:radio:checked, textarea, input[type="email"], input[type="url"], input[type="number"], input[type="range"], input[type="date"], input[type="month"], input[type="week"], input[type="time"], input[type="datetime"], input[type="datetime-local"], input[type="search"], input[type="color"]'), function(k, v){
     if ((validateString(v.name)!==false)&&
         (validateString(options.data[options.appID][options.form][v.name])!==false)){
      ret[v.name] = ((options.aes)&&(options.key)&&(x!==false)) ?
       GibberishAES.dec(options.data[options.appID][options.form][v.name], options.uuid) :
       options.data[options.appID][options.form][v.name];
     }
    });
   }
   return ret;
  }

  /**
   * @function setForm
   * @abstract Sets input values within configured form
   */
  var setForm = function(options, arg){
   $.each(arg, function(a, b){
    if (($('#'+options.form+' input[name='+a+']').attr('name')===a)&&
        (validateString(b)!==false)){
     $('#'+options.form+' input[name='+a+']').val(b);
    }
   });
  }

  /**
   * @function saveForm
   * @abstract Saves non-null form elements to configured client storage
   *           mechanism, encrypting if configured as a nested JSON object
   */
  var saveForm = function(options) {
   var x={}; x[options.form]={};
   $.each($('#'+options.form+' :text, :password, :file, input:hidden, input:checkbox:checked, input:radio:checked, textarea, input[type="email"], input[type="url"], input[type="number"], input[type="range"], input[type="date"], input[type="month"], input[type="week"], input[type="time"], input[type="datetime"], input[type="datetime-local"], input[type="search"], input[type="color"]'), function(k, v){
    if ((validateString(v.value)!==false)&&(validateString(v.name)!==false)){
     x[options.form][v.name] = ((options.aes)&&(options.key)) ?
      GibberishAES.enc(v.value, options.uuid) : v.value;
    }
   });
   options.data[options.appID] = (sizeChk(options.data[options.appID])>0) ?
    $.extend({}, options.data[options.appID], x) : x;
   setItem(options.storage, options.appID, JSON.stringify(options.data[options.appID]));
  }

  /**
   * @function validateString
   * @abstract Verifies string integrity
   */
  var validateString = function(string){
   if (string){
    return ((string===false)||(string.length===0)||(!string)||(string===null)||
            (string==='')||(typeof string==='undefined')) ? false : true;
   } else {
    return false;
   }
  }

  /**
   * @function validateStorage
   * @abstract Ensures configured storage mechanism is available for the
   *           browser engine
   */
  var validateStorage = function(type){
   try {
    return ((type in window)&&(window[type])) ? true : false;
   } catch (e) {
    return false;
   }
  }

  /**
   * @function validateOptions
   * @abstract Tests configured options vs. available functionality
   */
  var validateOptions = function(opts){
   var ret = true;
   if (opts.aes){
    if (!$.isFunction(GibberishAES.enc)){
     console.log('AES use specified but required libraries not available.'+
                 'Please include the Gibberish-AES libs...');
     ret = false;
    }
   }
   if (opts.storage==='cookie'){
    if (!$.isFunction($.cookie)){
     console.log('Cookie use specified but required libraries not available.'+
                 'Please include the jQuery cookie plugin...');
     ret = false;
    }
   }
   return ret;
  }

  /**
   * @function genUUID
   * @abstract Generates a valid RFC-4122 UUID
   */
  var genUUID = function(len){
   var chars = '0123456789abcdef'.split('');
   var uuid = [], rnd = Math.random, r;
   uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
   uuid[14] = '4';
   for (var i = 0; i < 36; i++){
    if (!uuid[i]){
     r = 0 | rnd()*16;
     uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
    }
   }
   return (len!==null) ?
    uuid.join('').replace(/-/g, '').split('',len).join('') : uuid.join('');
  }

  /**
   * @function handleKey
   * @abstract Performs key generation or retrieval
   */
  var handleKey = function(options) {
   if (options.aes) {
    options.key = (getItem(options.storage, 'uuid')) ?
     getItem(options.storage, 'uuid') : genUUID(null);
    setItem(options.storage, 'uuid', options.key);
   }
  }

  /**
   * @function __recurse
   * @abstract Function used help debug objects recursively
   */
  var __recurse = function(obj){
   $.each(obj, function(x,y){
    if (typeof y==='object'){
     __recurse(y);
    } else {
     console.log(x+' => '+y);
    }
   });
  }

  /* robot, do something */
  if (methods[method]){
   return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
  } else if ((typeof method==='object')||(!method)){
   return methods.init.apply(this, arguments);
  } else {
   $.error('Method '+method+' does not exist on '+opts.name);
  }
 };
})(jQuery);
