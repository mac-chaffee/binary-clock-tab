/*
 * Draws the binary clock for the given time
 */
function drawClock() {
  var now = new Date();
  document.getElementById('status').innerHTML = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}


document.addEventListener('DOMContentLoaded', function() {
  // Call drawClock right away to clear out the default text
  drawClock();
  // Call drawClock every second (1000 ms)
  window.setInterval(drawClock, 1000);
});
