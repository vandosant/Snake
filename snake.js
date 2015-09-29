document.addEventListener("DOMContentLoaded", function () {
  drawBorder('#25A8B2')
});

function drawBorder(color) {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  context.strokeStyle = color;
  context.lineWidth = 18;
  context.strokeRect(0, 0, canvas.width, canvas.height);
}