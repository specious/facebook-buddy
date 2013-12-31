//
// This script is designed to run in the background persistently.
//

chrome.runtime.onMessage.addListener(
  function( request, sender, sendResponse ) {
    if( request.request == "get-options" ) {
      sendResponse( { 'options': loadOptions() } );
    }
  }
);