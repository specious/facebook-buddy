//
// This script is designed to run when the Facebook Buddy
// popup dialog opens.
//

var options = loadOptions();

function saveOptions() {
  for( var key in options )
    storage[key] = options[key];
}

function applyOptions() {
  //
  // Send options to each browser tab in every window
  //
  chrome.windows.getAll( null, function ( windows ) {
    for( var w = 0; w < windows.length; w++ ) {
      chrome.tabs.getAllInWindow( windows[w].id, function( tabs ) {
        for( var t = 0; t < tabs.length; t++ ) {
          chrome.tabs.sendMessage( tabs[t].id, { 'options': options } );
        }
      } );
    }
  } );
}

window.onload = function() {
  var items = document.getElementsByClassName( "item" );

  for( var i = 0; i < items.length; i++ ) {
    var checkbox = items[i].children[0];
    checkbox.checked = options[checkbox.value];

    items[i].addEventListener( "click", function( e ) {
      if( e.target.tagName === "INPUT" ) {
        options[e.target.value] = e.target.checked;
        saveOptions();
        applyOptions();
      }
    } );
  }
}