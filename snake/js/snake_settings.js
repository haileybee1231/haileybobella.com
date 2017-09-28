$(document).ready(function() {
  //Canvas stuff
  var canvas = $('#canvas')[0];
  var ctx = canvas.getContext('2d')
  var w = $('#canvas').width()
  var h = $('#canvas').height();
  var cw = 10;
  var direction;
  var food;
  var mine;
  var mine2;
  var score;



  //Snake stuff
  var snake_array;

  function init() {
    delete_mine();
    direction = 'right';
    create_snake();
    create_food();
    score = 0;

    if(typeof game_loop != 'undefined') clearInterval(game_loop);
    game_loop = setInterval(paint, 60);
  }

  init();

  function create_snake() {
    var length = 5;
    snake_array = [];
    for(var i = length - 1 ; i > 0 ; i--) {
      snake_array.push({x: i, y: 0});
    }
  }

  function create_food() {
    food = {
      x: Math.round(Math.random() * (w - cw)/cw),
      y: Math.round(Math.random() * (h - cw)/cw)
    }
  }

  function create_mine() {
    mine = {
      x: Math.round(Math.random() * (w - cw)/cw),
      y: Math.round(Math.random() * (w - cw)/cw)
    }
  }

  function create_mine2() {
    mine2 = {
      x: Math.round(Math.random() * (w - cw)/cw),
      y: Math.round(Math.random() * (w - cw)/cw)
    }
  }

  function delete_mine() {
    mine = {
    }
    mine2 = {
    }
  }

  function paint() {

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, w, h);

    var nx = snake_array[0].x;
    var ny = snake_array[0].y;

    if (direction == 'right') nx++;
    else if (direction == 'left') nx--;
    else if (direction == 'up') ny--;
    else if (direction == 'down') ny++;

    if (nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || check_collision(nx, ny, snake_array))
    {
      init();
      return;
    }

    if (nx == food.x && ny == food.y) {
      var tail = {x: nx, y: ny};
      score += 10;
      create_food();
      if (score >= 10) {
        create_mine();
      }
      if (score >= 100) {
        create_mine2();
      }
    } else {
      var tail = snake_array.pop();
      tail.x = nx;
      tail.y = ny;
    }

    snake_array.unshift(tail);

    for (var i = 0 ; i < snake_array.length ; i++) {
      var c = snake_array[i];
      paint_cell(c.x, c.y);
    }


    if (mine) {
      paint_mine(mine.x, mine.y);
    }
    if (mine2) {
      paint_mine(mine2.x, mine2.y);
    }
    paint_cell(food.x, food.y);

    var score_text = 'Score: ' + score;
    ctx.fillText(score_text, 5, h-5);

    if (snake_array[0].x == mine.x && snake_array[0].y == mine.y) {
      init();
      return;
    }

    if (snake_array[0].x == mine2.x && snake_array[0].y == mine2.y) {
      init();
      return;
    }

  }

  function paint_cell(x, y) {
    ctx.fillStyle = 'hotpink';
    ctx.fillRect(x * cw, y * cw, cw, cw);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(x * cw, y * cw, cw, cw);
  }

  function paint_mine(x, y) {
    ctx.fillStyle = 'red';
    if (score < 50) {
        ctx.fillRect(x * cw, y * cw, cw, cw);
      } else if (score >= 50) {
        ctx.fillRect(x * cw, y * cw, cw * 2, cw * 2);
    }

    ctx.strokeStyle = 'white';
    if (score < 50) {
        ctx.strokeRect(x * cw, y * cw, cw, cw);
      } else if (score >= 50) {
        ctx.strokeRect(x * cw, y * cw, cw * 2, cw * 2);
      }
  }

  function check_collision(x, y, array) {
    for (var i = 0 ; i < array.length ; i++) {
      if (array[i].x == x && array[i].y == y)
      return true;
    }
    return false;
  }




  $(document).keydown(function(e) {
    var key = e.which;
    if (key == '37' && direction != 'right') direction = 'left';
    else if (key == '38' && direction != 'down') direction = 'up';
    else if (key == '39' && direction != 'left') direction = 'right';
    else if (key == '40' && direction != 'up') direction = 'down';
    e.preventDefault();
    return false;
  });

});
