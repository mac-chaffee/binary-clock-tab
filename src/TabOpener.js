/*
 * This script is always running in the background. It adds an event listener
 * to the extension button that opens a tab when it's clicked
 */
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('running');
  chrome.tabs.create({url: 'clock.html'});
  console.log('running');
});
