/**
 * Starts running drawClock every second as soon as the page loads
 */
document.addEventListener('DOMContentLoaded', function() {
  // Call drawClock right away to clear out the default text
  drawClock();
  // Call drawClock every second (1000 ms)
  window.setInterval(drawClock, 1000);
});

/**
 * Draws the binary clock
 */
function drawClock() {
  // Get the current time as a Date object
  var now = new Date();
  nowString = now.toLocaleTimeString('en-US', {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  });
  // Put that raw date in #time to help people out
  $("#time").html(nowString);
  // Convert each part of that time to binary
  allDotsToActivate = [convertToBinary(now.getHours()),
                       convertToBinary(now.getMinutes()),
                       convertToBinary(now.getSeconds())];
  // Get the 'dot' elements we need to activate/deactivate
  hourTensDots = document.getElementById('hour-tens').getElementsByClassName('dot');
  hourOnesDots = document.getElementById('hour-ones').getElementsByClassName('dot');
  minuteTensDots = document.getElementById('minute-tens').getElementsByClassName('dot');
  minuteOnesDots = document.getElementById('minute-ones').getElementsByClassName('dot');
  secondTensDots = document.getElementById('second-tens').getElementsByClassName('dot');
  secondOnesDots = document.getElementById('second-ones').getElementsByClassName('dot');
  activateDots(hourTensDots, allDotsToActivate[0][0]);
  activateDots(hourOnesDots, allDotsToActivate[0][1]);
  activateDots(minuteTensDots, allDotsToActivate[1][0]);
  activateDots(minuteOnesDots, allDotsToActivate[1][1]);
  activateDots(secondTensDots, allDotsToActivate[2][0]);
  activateDots(secondOnesDots, allDotsToActivate[2][1]);
}

/**
 * @param num a number to convert (0, 59)
 * @returns an array of powers of 2 corresponding to the dots that must
 * be activated to represent the given number in binary.
 * ex: convertToBinary(57) would need to activate 1 and 4 in the tens place (0th and 2nd power of 2)
 * and 1, 2, and 4 in the ones place (0th, 1st, and 2nd power of 2).
 * So it returns [[0,2],[0,1,2]].
 * You can then activate the dots like this: 3  -  -
 *                                           2  *  *
 *                                           1  -  *
 *                                           0  *  *   = 57
 */
function convertToBinary(num) {
  // Separate the ones place from the tens place (ex: '57' tens=5, ones=7)
  var ones = num % 10;
  var tens = (num - ones) / 10;
  // Create an array of powers of 2 that represent 'ones' and 'tens' in binary
  return [getPowersOfTwo(tens), getPowersOfTwo(ones)];
}

/**
 * @param num a number 0-9
 * @returns a list of powers of 2
 * that correspond to that number's binary representation.
 * ex: getPowersOfTwo(9) returns [3, 0] because (2^3) + (2^0) = 9
 */
function getPowersOfTwo(num) {
  // Create array to hold the return values
  var powers = [];
  // Push to powers of 2 to that array
  for (var i = 3; i >= 0; i--) {
    var binaryValue = 2**i; // Has to be 8, 4, 2, or 1
    if (num > binaryValue) {
      // Then we must activate the current bit and reduce num
      powers.push(i);
      num -= binaryValue;
      continue;
    } else if (num < binaryValue) {
      // Then skip this bit and try smaller ones
      continue;
    } else {
      // Then num === binaryValue and we're done once we acivate the current bit
      powers.push(i);
      return powers;
    }
  }
  // If we got here without returning, then num == 0 and we don't
  // need to activate any bits. 'powers' should be empty, so return it
  return powers;
}

/**
 * Given a list of 'dot' elements, activate the ones
 * specified in dotsToActivate.
 * @param elements a NodeList from .getElementsByClassName()
 * @param dotsToActivate Array returned from getPowersOfTwo()
 */
function activateDots(elements, dotsToActivate) {
  for (var i = 0; i < elements.length; i++) {
    // Note that elements[0] is actually the 8-bit (2^3 not 2^0).
    // So to activate elements[0], we need to know if 3 (reverseIndex) is in dotsToActivate
    reverseIndex = elements.length - 1 - i;
    if (dotsToActivate.indexOf(reverseIndex) === -1) {
      // Then deactivate the dot
      elements[i].className = 'dot';
    } else {
      // Activate the dot
      elements[i].className = 'dot dot-active';
    }
  }
}
