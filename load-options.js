var storage = localStorage;

function loadOptions() {
  var options = {
    "expand-comments": false,
    "expand-previews": false
  }

  if( storage.length !== 0 ) {
    for( var key in options ) {
      if( storage[key] ) {
        options[key] = JSON.parse( storage[key] );
      }
    }
  }

  return options;
}