document.addEventListener("DOMContentLoaded", function () {
  Game()
});

function Game() {
  var interval = function () {
    drawSnake();
    drawBorder('#25A8B2');
    setTimeout(function () {
      requestAnimationFrame(interval);
    }, 240);
  };
  interval();
}

function drawBorder(color) {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  context.strokeStyle = color;
  context.lineWidth = 18;
  context.strokeRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  var length = 8;
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var pixelSize = canvas.width / 25;
  for (var i = 0; i < length; i++) {
    context.fillStyle = '#FFA16E';
    context.fillRect(i*pixelSize, 0, pixelSize, pixelSize);
    context.strokeStyle = '#FFF';
    context.strokeRect(i*pixelSize, 0, pixelSize, pixelSize);
  }
}