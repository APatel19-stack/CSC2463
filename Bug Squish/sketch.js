let spriteSheet;
let chronoSheet;

let walkingAnimation;
let walkingAnimation2;
let chronoAnimation;

let spriteSheetFilenames = ["SpelunkyGuy.png", "Green.png", "Cyclops.png"];
let spriteSheets = [];
let animations = [];


const GameState = {
    Start: "Start",
    Playing: "Playing",
    GameOver: "GameOver"
};


let game = { score: 0, maxScore: 0, maxTime: 30, elapsedTime: 0, totalSprites: 15, state: GameState.Start, targetSprite: 2 };

function preload() {
    for (let i = 0; i < spriteSheetFilenames.length; i++) {
        spriteSheets[i] = loadImage("assets/" + spriteSheetFilenames[i]);
    }
}

function setup() {
    createCanvas(400, 400);
    imageMode(CENTER);
    angleMode(DEGREES);

    reset();
}

function reset() {
    game.elapsedTime = 0;
    game.score = 0;
    game.totalSprites = random(20, 30);

    animations = [];
    for (let i = 0; i < game.totalSprites; i++) {
        animations[i] = new WalkingAnimation(random(spriteSheets), 80, 80, random(50, 380), random(50, 380), 9, random(0.5, 1), 15, random([0, 1]));
    }
}

function draw() {
    switch (game.state) {
        case GameState.Playing:
            background(220);

            for (let i = 0; i < animations.length; i++) {
                animations[i].draw();
            }
            fill(0);
            textSize(40);
            text(game.score, 30, 40);
            let currentTime = game.maxTime - game.elapsedTime;
            text(ceil(currentTime), 300, 40);
            game.elapsedTime += deltaTime / 1000;

            if (currentTime < 28 & currentTime > 15) {
                for (let i = 0; i < animations.length; i++) {
                    animations[i].updateSpeed();
                }
            }

            if (currentTime < 0) {

                game.state = GameState.GameOver;
            }
            break;
        case GameState.GameOver:
            game.maxScore = max(game.score, game.maxScore);

            background(0);
            fill(255);
            textSize(40);
            textAlign(CENTER);
            text("Game Over!", 200, 200);
            textSize(35);
            text("Score: " + game.score, 200, 270);
            text("Max Score: " + game.maxScore, 200, 320);
            break;
        case GameState.Start:
            background(0);
            fill(255);
            textSize(50);
            textAlign(CENTER);
            text("Bug Squish Game", 200, 200);
            textSize(30);
            text("Press Any Key to Start", 200, 300);
            break;
    }

}

function keyPressed() {
    switch (game.state) {
        case GameState.Start:
            game.state = GameState.Playing;
            break;
        case GameState.GameOver:
            reset();
            game.state = GameState.Playing;
            break;
    }
}

function mousePressed() {
    switch (game.state) {
        case GameState.Playing:

            for (let i = 0; i < animations.length; i++) {
                let contains = animations[i].contains(mouseX, mouseY);
                if (contains) {
                    if (animations[i].moving != 0) {
                        animations[i].stop();
                        if (animations[i].spritesheet === spriteSheets[game.targetSprite]) {
                            game.score += 1;
                            animations.splice(i, 1);
                            animations.push(new WalkingAnimation(spriteSheets[2], 80, 80, random(50, 380), random(50, 380), 9, random(0.5, 1), 15, random([0, 1])));
                        } else {
                            game.score -= 1;
                            animations.splice(i, 1);
                            if (animations[i].spritesheet === spriteSheets[0]) {
                                animations.push(new WalkingAnimation(spriteSheets[0], 80, 80, random(50, 380), random(50, 380), 9, random(0.5, 1), 15, random([0, 1])));
                            } else {
                                animations.push(new WalkingAnimation(spriteSheets[1], 80, 80, random(50, 380), random(50, 380), 9, random(0.5, 1), 15, random([0, 1])));
                            }
                        }
                    }
                }
            }

            break;
    }

}

class WalkingAnimation {
    constructor(spritesheet, sw, sh, dx, dy, animationLength, speed, framerate, vertical = false, offsetX = 0, offsetY = 0) {
        this.spritesheet = spritesheet;
        this.sw = sw;
        this.sh = sh;
        this.dx = dx;
        this.dy = dy;
        this.u = 0;
        this.v = 0;
        this.animationLength = animationLength;
        this.currentFrame = 0;
        this.moving = 1;
        this.xDirection = 1;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.speed = speed;
        this.framerate = framerate * speed;
        this.vertical = vertical;
    }

    updateSpeed() {
        this.speed += 0.005;
    }



    draw() {

        // if (this.moving != 0)
        //   this.u = this.currentFrame % this.animationLength;
        // else
        //   this.u = 0;

        this.u = (this.moving != 0) ? this.currentFrame % this.animationLength : this.u = 7;
        push();
        translate(this.dx, this.dy);
        if (this.vertical)
            rotate(90);
        scale(this.xDirection, 1);


        //rect(-26,-35,50,70);

        image(this.spritesheet, 0, 0, this.sw, this.sh, this.u * this.sw + this.offsetX, this.v * this.sh + this.offsetY, this.sw, this.sh);
        pop();
        let proportionalFramerate = round(frameRate() / this.framerate);
        if (frameCount % proportionalFramerate == 0) {
            this.currentFrame++;
        }

        if (this.vertical) {
            this.dy += this.moving * this.speed;
            this.move(this.dy, this.sw / 4, height - this.sw / 4);
        } else {
            this.dx += this.moving * this.speed;
            this.move(this.dx, this.sw / 4, width - this.sw / 4);
        }


    }



    move(position, lowerBounds, upperBounds) {
        if (position > upperBounds) {
            this.moveLeft();
        } else if (position < lowerBounds) {
            this.moveRight();
        }
    }

    moveRight() {
        this.moving = 1;
        this.xDirection = 1;
        this.v = 0;
    }

    moveLeft() {
        this.moving = -1;
        this.xDirection = -1;
        this.v = 0;
    }



    contains(x, y) {
        //rect(-26,-35,50,70);
        let insideX = x >= this.dx - 26 && x <= this.dx + 25;
        let insideY = y >= this.dy - 35 && y <= this.dy + 35;
        return insideX && insideY;
    }

    stop() {
        this.moving = 0;
        this.u = 7;
        this.v = 8;
    }
}