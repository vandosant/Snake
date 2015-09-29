document.addEventListener("DOMContentLoaded", function () {
  var count = 0;
  var interval = function () {
    count++;
    if (count % 2 === 0) {
      drawBorder('#69F5FF')
    } else {
      drawBorder('#25A8B2')
    }
    setTimeout(function() {
      requestAnimationFrame(interval);
    }, 1000);
  };
  interval()
});

function drawBorder(color) {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  context.strokeStyle = color;
  context.lineWidth = 18;
  context.strokeRect(0, 0, canvas.width, canvas.height);
}