
// the snake is divided into small segments, which are drawn and edited on each 'draw' call
let numSegments = 10;
let direction = 'right';
let obsticals_corr = [[200, 300], [500, 50]];
let free_pass = 1;
let tot_free_pass= 0;
const xStart = 0; //starting x coordinate for snake
const yStart = 250; //starting y coordinate for snake
const diff = 10;

let xCor = [];
let yCor = [];

let xFruit = 0;
let yFruit = 0;
let scoreElem;

function setup() {
  scoreElem = createDiv('Score = 0');
  scoreElem.position(20, 20);
  scoreElem.id = 'score';
  scoreElem.style('color', 'white');

  createCanvas(500, 500);
  frameRate(15);
  stroke(255);
  strokeWeight(10);
  updateFruitCoordinates();

  for (let i = 0; i < numSegments; i++) {
    xCor.push(xStart + i * diff);
    yCor.push(yStart);
  }
}

function draw() {
  background(0);
  for (let i = 0; i < numSegments - 1; i++) {
    line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
  }
  //console.log(obsticals_corr[0][1]);
  point(obsticals_corr[0][0], obsticals_corr[0][1]);
  updateSnakeCoordinates();
  checkGameStatus();
  checkForFruit();
}

/*
 The segments are updated based on the direction of the snake.
 All segments from 0 to n-1 are just copied over to 1 till n, i.e. segment 0
 gets the value of segment 1, segment 1 gets the value of segment 2, and so on,
 and this results in the movement of the snake.

 The last segment is added based on the direction in which the snake is going,
 if it's going left or right, the last segment's x coordinate is increased by a
 predefined value 'diff' than its second to last segment. And if it's going up
 or down, the segment's y coordinate is affected.
*/
function updateSnakeCoordinates() {
  for (let i = 0; i < numSegments - 1; i++) {
    xCor[i] = xCor[i + 1];
    yCor[i] = yCor[i + 1];
  }
  switch (direction) {
    case 'right':
      
      xCor[numSegments - 1] = xCor[numSegments - 2] + diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      console.log("right" + xCor);
      break;
    case 'up':
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] - diff;
      console.log("up" + xCor);

      break;
    case 'left':
      xCor[numSegments - 1] = xCor[numSegments - 2] - diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      console.log("left" + xCor);

      break;
    case 'down':
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] + diff;
      console.log("down" + xCor);

      break;
  }
}

/*
 I always check the snake's head position xCor[xCor.length - 1] and
 yCor[yCor.length - 1] to see if it touches the game's boundaries
 or if the snake hits itself.
*/
function checkGameStatus() {
  if (
    xCor[xCor.length - 1] > width ||
    xCor[xCor.length - 1] < 0 ||
    yCor[yCor.length - 1] > height ||
    yCor[yCor.length - 1] < 0 ||
    checkSnakeCollision() ||
    checkObsticalCollision()

  ) {
    noLoop();
    const scoreVal = parseInt(scoreElem.html().substring(8));
    scoreElem.html('Game ended! Your score was : ' + scoreVal);
  }
}

/*
 If the snake hits itself, that means the snake head's (x,y) coordinate
 has to be the same as one of its own segment's (x,y) coordinate.
*/
function checkSnakeCollision() {
  const snakeHeadX = xCor[xCor.length - 1];
  const snakeHeadY = yCor[yCor.length - 1];
  for (let i = 0; i < xCor.length - 1; i++) {
    if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
      return true;
    }
  }
}
function checkObsticalCollision() {
  const snakeHeadX = xCor[xCor.length - 1];
  const snakeHeadY = yCor[yCor.length - 1];
  for (let i = 0; i < obsticals_corr.length - 1; i++) {
    if (obsticals_corr[i][0] === snakeHeadX && obsticals_corr[i][1] === snakeHeadY) {
      if (free_pass && tot_free_pass < 2) {
        console.log("snakeHeadX and Y" + snakeHeadX + " " + snakeHeadY + " Obs-corr: " + obsticals_corr[i][1] + " " + obsticals_corr[i][0])
        tot_free_pass +=1;
        return false;
      }
      else {

        return true;
      }

    }
  }
}

/*
 Whenever the snake consumes a fruit, I increment the number of segments,
 and just insert the tail segment again at the start of the array (basically
 I add the last segment again at the tail, thereby extending the tail)
*/
function checkForFruit() {
  point(xFruit, yFruit);
  if (xCor[xCor.length - 1] === xFruit && yCor[yCor.length - 1] === yFruit) {
    const prevScore = parseInt(scoreElem.html().substring(8));
    scoreElem.html('Score = ' + (prevScore + 1));
    xCor.unshift(xCor[0]);
    yCor.unshift(yCor[0]);
    numSegments++;
    updateFruitCoordinates();
  }
}

function updateFruitCoordinates() {
  /*
    The complex math logic is because I wanted the point to lie
    in between 100 and width-100, and be rounded off to the nearest
    number divisible by 10, since I move the snake in multiples of 10.
  */

  xFruit = floor(random(10, (width - 100) / 10)) * 10;
  yFruit = floor(random(10, (height - 100) / 10)) * 10;
}

function keyPressed() {
  switch (keyCode) {
    case RIGHT_ARROW:
      if (direction !== 'right') {
        direction = 'right';
      }
      break;
    case LEFT_ARROW:
      if (direction !== 'left') {
        direction = 'left';
      }
      break;
    case UP_ARROW:
      if (direction !== 'down') {
        direction = 'up';
      }
      break;
    case DOWN_ARROW:
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
  }
}



//Two key (Left and Right) version working 
// function keyPressed() {
  
//   switch (keyCode) {
//     case RIGHT_ARROW: 
//       // if Dir = R and Act = R
//       if(direction === 'right'){
//         direction = 'down';
//       }
//       //if Dir = L and Act = R
//       else if(direction === 'left' ){
//         direction ='up';
//       }
//       //if Dir = U and Act = R
//       else if(direction === 'up'){
//         direction = 'right';
//       }
//       //if Dir = D and Act = R
//       else if(direction === 'down' ){
//         //or could be left depends on how easy it to navigate during game
//         direction ='right';
//       }
//       break;



//     case LEFT_ARROW:
//       //if Dir = R and Act = L
//       if(direction === 'right'){
//         direction = 'up';
//       }
//       //if Dir = L and Act = L
//       else if(direction === 'left' ){
//         direction ='down';
//       }
//       //if Dir = U and Act = L
//       else if(direction === 'up'){
//         direction = 'left';
//       }
//       //if Dir = D and Act = L
//       else if(direction === 'down' ){
//         direction ='left';
//       }
//       break;

//   }
// }



//Four Key(Left,Right,Up,Down) working version

// function keyPressed() {
//   switch (keyCode) {
//     case RIGHT_ARROW:
//       if (direction !== 'right') {
//         direction = 'right';
//       }
//       break;
//     case LEFT_ARROW:
//       if (direction !== 'left') {
//         direction = 'left';
//       }
//       break;
//     case UP_ARROW:
//       if (direction !== 'down') {
//         direction = 'up';
//       }
//       break;
//     case DOWN_ARROW:
//       if (direction !== 'up') {
//         direction = 'down';
//       }
//       break;
//   }
// }
