document.addEventListener("DOMContentLoaded", function () {
  var game = new Game();
  window.addEventListener('keydown', function (key) {
    key.preventDefault();
    if (key.which == "37")
      game.snake.direction = "left";
    else if (key.which == "39")
      game.snake.direction = "right";
    else if (key.which == "38")
      game.snake.direction = "up";
    else if (key.which == "40")
      game.snake.direction = "down";
  });
});

function Game() {
  var self = this;
  self.snake = new Snake();
  self.food = createFood();
  self.score = 0;
  self.reset = function() {
    self.snake = new Snake();
  };
  var interval = function () {
    drawBorder('#25A8B2');
    updateSnake(self.snake);
    checkFoodCollision(self.snake, self.food, self);
    checkBorderCollision(self.snake, self);
    drawSnake(self.snake);
    drawFood(self.food);
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
    context.fillRect(snake.snakeArray[i].x * pixelSize, snake.snakeArray[i].y * pixelSize, pixelSize, pixelSize);
    context.strokeStyle = '#FFF';
    context.strokeRect(snake.snakeArray[i].x * pixelSize, snake.snakeArray[i].y * pixelSize, pixelSize, pixelSize);
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

function createFood() {
  var canvas = document.getElementById('canvas');
  var pixelSize = canvas.width / 25;
  return {
    x: Math.round(Math.random() * (canvas.width - pixelSize) / pixelSize),
    y: Math.round(Math.random() * (canvas.height - pixelSize) / pixelSize)
  }
}

function drawFood(food) {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var pixelSize = canvas.width / 25;
  context.fillStyle = '#25A8B2';
  context.fillRect(food.x * pixelSize, food.y * pixelSize, pixelSize, pixelSize);
  context.strokeStyle = "white";
  context.strokeRect(food.x * pixelSize, food.y * pixelSize, pixelSize, pixelSize);
}

function checkFoodCollision(snake, food, game) {
  var headX = snake.snakeArray[0].x;
  var headY = snake.snakeArray[0].y;
  if (headX === food.x && headY === food.y) {
    game.food = createFood();
    game.score++;
    var tail = {};
    tail.x = game.snake.snakeArray[0].x;
    tail.y = game.snake.snakeArray[0].y;
    snake.snakeArray.unshift(tail);
  }
}

function checkBorderCollision(snake, game) {
  var canvas = document.getElementById('canvas');
  var headX = snake.snakeArray[0].x;
  var headY = snake.snakeArray[0].y;
  if (headX > (canvas.width / 25)) {
    game.reset();
  } else if (headX < 0) {
    game.reset();
  } else if (headY >= (canvas.height / 25)) {
    game.reset();
  } else if (headY < 0) {
    game.reset();
  }
}