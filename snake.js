document.addEventListener("DOMContentLoaded", function () {
  Game()
});

function Game() {
  var snake = new Snake();
  var interval = function () {
    drawBorder('#25A8B2');
    updateSnake(snake);
    drawSnake(snake);
    setTimeout(function () {
      requestAnimationFrame(interval);
    }, 240);
  };
  interval();
}

var Snake = function () {
  var self = this;
  self.direction = 'right';
  self.snakeArray = [];
  self.length = 8;
  for (var i = self.length; i >= 0; i--) {
    self.snakeArray.push({x: i, y: 0});
  }
};

function drawBorder(color) {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = color;
  context.lineWidth = 1;
  context.strokeRect(0, 0, canvas.width, canvas.height);
}

function drawSnake(snake) {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var pixelSize = canvas.width / 25;
  for (var i = 0; i < snake.length; i++) {
    context.fillStyle = '#FFA16E';
    context.fillRect(snake.snakeArray[i].x * pixelSize, snake.snakeArray[i].y, pixelSize, pixelSize);
    context.strokeStyle = '#FFF';
    context.strokeRect(snake.snakeArray[i].x * pixelSize, snake.snakeArray[i].y, pixelSize, pixelSize);
  }
}

function updateSnake(snake) {
  var noseX = snake.snakeArray[0].x;
  var noseY = snake.snakeArray[0].y;
  if (snake.direction == "right") noseX++;
  else if (snake.direction == "left") noseX--;
  else if (snake.direction == "up") noseY--;
  else if (snake.direction == "down") noseY++;

  var tail = snake.snakeArray.pop();
  tail.x = noseX;
  tail.y = noseY;
  snake.snakeArray.unshift(tail);
}