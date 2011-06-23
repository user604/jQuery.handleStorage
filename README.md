

#jQuery plugin to impliment HTML5 form storage

Supports HTML5 localStorage, sessionStorage or cookie support
for older browsers. Optional AES encryption support.

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

## EXAMPLES:

### localStorage examples:
* Default usage using HTML5 localStorage
```$('#form').handleStorage();```

* Default usage using HTML5 localStorage with custom appID
```$('#form').handleStorage({appID:'myWickedApp'});```

* Default usage using HTML5 localStorage with AES encryption
```$('#form').handleStorage({aes:true});```

### sessionStorage examples:
* Default usage using HTML5 sessionStorage
```$('#form').handleStorage({storage:'sessionStorage'});```

* Default usage using HTML5 sessionStorage with custom appID
```$('#form').handleStorage({storage:'sessionStorage',appID:'myWickedApp'});```

* Default usage using HTML5 sessionStorage with AES encryption
```$('#form').handleStorage({storage:'sessionStorage',aes:true});```

### cookie storage examples:
* Default usage using cookies for client storage
```$('#form').handleStorage({storage:'cookies'});```

* Default usage using cookies for client storage with custom appID
```$('#form').handleStorage({storage:'cookies',appID:'myWickedApp'});```

* Default usage using cookies for client storage with AES encryption
```$('#form').handleStorage({storage:'cookies',aes:true});```

 Author: Jason Gerfen
 Email: jason.gerfen@gmail.com
 Copyright: Jason Gerfen
 Last updated: 05.03.2011

 License: GPL
