let spritsheet;
let sx = 0;
let sy = 0;
let sw = 0;
let sh = 0;
let u = 0;
let v = 0;
let animeamtionLength = 9;
let currentFrame = 0;
let x = 200;
let moving = 0;
let xDirection = 1;
let walkingAnimation;
let walkingAnimation1;

let green;
let Cyclops;




function preload() {
    spritsheet = loadImage('assets/SpelunkyGuy.png');
    green = loadImage('assets/Green.png');
    Cyclops = loadImage('assets/Cyclops.png');
}

function setup() {
    createCanvas(400, 400);
    imageMode(CENTER);
    walkingAnimation = new WalkingAnimation(spritsheet, 80, 80, 200, 200, 9);
    walkingAnimation1 = new WalkingAnimation(green, 80, 80, 150, 100, 9);
    walkingAnimation2 = new WalkingAnimation(Cyclops, 80, 80, 150, 300, 9);


}



function draw() {
    background(220);
    walkingAnimation.draw();
    walkingAnimation1.draw();
    walkingAnimation2.draw();

}





function keyPressed() {
    walkingAnimation.keyPressed(RIGHT_ARROW, LEFT_ARROW);
    walkingAnimation1.keyPressed(LEFT_ARROW, RIGHT_ARROW);
    walkingAnimation2.keyPressed(LEFT_ARROW, RIGHT_ARROW);

}

function keyReleased() {
    walkingAnimation.keyReleased(RIGHT_ARROW, LEFT_ARROW);
    walkingAnimation1.keyReleased(LEFT_ARROW, RIGHT_ARROW);
    walkingAnimation2.keyReleased(LEFT_ARROW, RIGHT_ARROW);


}

class WalkingAnimation {
    constructor(spritsheet, sw, sh, dx, dy, animeamtionLength) {
        this.spritsheet = spritsheet;
        this.sw = sw;
        this.sh = sh;
        this.dx = dx;
        this.dy = dy;
        this.u = 0;
        this.v = 0;
        this.animeamtionLength = animeamtionLength;
        this.moving = 0;
        this.currentFrame = 0;
        this.xDirection = 1;


    }

    draw() {

        //for more than one object



        this.u = (this.moving != 0) ? this.currentFrame % this.animeamtionLength : 0;

        push();
        translate(this.dx, this.dy);
        scale(this.xDirection, 1);
        image(this.spritsheet, 0, 0, 80, 80, this.u * this.sw, this.v * this.sh, this.sw, this.sh);
        pop();
        if (frameCount % 6 == 0) {
            this.currentFrame++;
        }



        this.dx += this.moving;

    }

    keyPressed(left, right) {
        if (keyCode === right) {
            this.moving = 1;
            this.xDirection = 1;
            this.currentFrame = 1;
        } else if (keyCode === left) {
            this.moving = -1;
            this.xDirection = -1;
            this.currentFrame = 1;
        }
    }

    keyReleased(left, right) {
        if (keyCode === right || keyCode === left) {
            this.moving = 0;
        }
    }

}