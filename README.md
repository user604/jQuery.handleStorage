
#jQuery plugin to impliment HTML5 form storage

Supports HTML5 localStorage, sessionStorage or cookie support
for older browsers. Optional AES encryption support. Optional
degraded cookie support (with plug-in, see *requirements). Now
supports auto-save for form elements to prevent loss of work
prior to form submission.

  Fork me @ https://www.github.com/jas-/jQuery.handleStorage

## REQUIREMENTS:
* jQuery libraries (required - http://www.jquery.com)
* jQuery cookie plugin (optional - http://plugins.jquery.com/files/jquery.cookie.js.txt)
* Gibberish-AES libraries (optional - https://github.com/mdp/gibberish-aes)


## FEATURES:
* HTML5 localStorage support
* HTML5 sessionStorage support
* Cookie support
* AES encryption support

## OPTIONS:
* appID:   Unique application identifier
* storage: HTML5 localStorage, sessionStorage and cookies supported
* aes:     Use AES encryption for client storage objects

## NOTES:
If your paranoid about compromises to the newer HTML5 storage mechanisms usage of the
sessionStorage option will destroy client storage data as the browser is exited.

## EXAMPLES:

### localStorage examples:
The localStorage option within HTML5 allows for persistent client storage of
key/value pairs. This is the default method of client storage.

#### Default usage using HTML5 localStorage
The default use is simple and users persistent storage by implementing the HTML5
localStorage option

```javascript
$('#form').handleStorage();
```

#### Default usage using HTML5 localStorage with custom appID
By specifying the appID variable you can separate multiple forms as the default
use will combine all forms into sub-objects of the default appID

```javascript
$('#form').handleStorage({appID:'myWickedApp'});
```

#### Default usage using HTML5 localStorage with AES encryption
If you wish to use persistent storage and provide some additional security
to the saved form data a transparent AES-CBC encryption method is available.
This option does require the Gibberish-AES plug-in as noted above.

```javascript
$('#form').handleStorage({aes:true});
```

### sessionStorage examples:
Specifying the sessionStorage option allows for client storage of form data ONLY
while the users browser is open. This is the more secure option in terms of a
web application which requires authentication.

#### Default usage using HTML5 sessionStorage
An example of using the sessionStorage HTML5 option

```javascript
$('#form').handleStorage({storage:'sessionStorage'});
```

#### Default usage using HTML5 sessionStorage with custom appID
Here is an example of specifying the sessionStorage option with a custom
appID for client storage.

```javascript
$('#form').handleStorage({storage:'sessionStorage',appID:'myWickedApp'});
```

#### Default usage using HTML5 sessionStorage with AES encryption
This example provides the best security of client storage data as the client
closes their browser the data gets reset and while the users browser is open
the data is encrypted with the AES-CBC cipher

```javascript
$('#form').handleStorage({storage:'sessionStorage',aes:true});
```

### cookie storage examples:

#### Default usage using cookies for client storage
For those users that are still using older browsers option cookie storage is
available but requires the jquery cookie plugin (see above for URL)

```javascript
$('#form').handleStorage({storage:'cookies'});
```

#### Default usage using cookies for client storage with custom appID
An example using cookies with a custom appID (good for multiple forms if you
wish to segregate the storage objects)

```javascript
$('#form').handleStorage({storage:'cookies',appID:'myWickedApp'});
```

#### Default usage using cookies for client storage with AES encryption
An example using AES-CBC encryption with degraded cookie support.

```javascript
$('#form').handleStorage({storage:'cookies',aes:true});
```

 Author: Jason Gerfen
 Email: jason.gerfen@gmail.com
 Copyright: Jason Gerfen
 Last updated: 06.23.2011

 License: GPL
