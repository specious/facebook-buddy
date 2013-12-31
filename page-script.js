//
// This script is designed to run inside a Facebook tab.
//
// More information:
//   http://developer.chrome.com/extensions/content_scripts.html
//

function simulateClick( element ) {
  var e = document.createEvent( 'MouseEvents' );
  e.initEvent( "click", true, true );
  e.preventDefault();
  element.dispatchEvent( e );
}

function forEachInClass( className, func ) {
  var items = document.getElementsByClassName( className );

  for( var i = 0; i < items.length; i++ )
    func( items[i] );
}

//
// Expand contents of long comments
//
function expandComments() {
  forEachInClass( "_5v47", function( e ) {
    simulateClick( e );
  } );
}

//
// Expand long inline media preview descriptions
//
function expandPreviews() {
  forEachInClass( "text_exposed_link", function( e ) {
    if( window.getComputedStyle( e ).display !== 'none' )
      simulateClick( e.getElementsByTagName( "a" )[0] );
  } );
}

var options = {};

//
// Receive option updates from extension
//
chrome.runtime.onMessage.addListener(
  function( request, sender ) {
    if( request.options )
      options = request.options;
  }
);

//
// Load option settings from persistent background process
//
chrome.runtime.sendMessage( { request: "get-options" },
  function( response ) {
    options = response.options;

    window.setInterval( function() {
      if( options["expand-comments"] )
        expandComments();

      if( options["expand-previews"] )
        expandPreviews();
    }, 2600 );
  }
);