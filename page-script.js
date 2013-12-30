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

expandComments();
expandPreviews();

window.setInterval( function() {
  expandComments();
  expandPreviews();
}, 1800 );