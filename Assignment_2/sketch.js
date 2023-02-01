let c = 'black';

function setup() {

    //define canvas properties
    createCanvas(screen.width, screen.height - 210);
    background('white');
    setupCanvas();
}


function draw() {

    noStroke();
    //draw a menu bar
    fill('#d3d3d3');
    rect(0, 0, screen.width, 100);


    //Check if mouse is pressed and draw the lines and stuff
    if (mouseIsPressed && mouseY > 100) {
        stroke(c);
        strokeWeight(10);
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}



function setupCanvas() {
    noStroke();

    //Button for color
    //red
    Red_button = createButton('');
    Red_button.size(50, 50);
    Red_button.style('background-color', 'red');
    Red_button.position(25, 23);
    Red_button.mouseClicked(set_red);
    //Orange
    Orange_Button = createButton('');
    Orange_Button.size(50, 50);
    Orange_Button.style('background-color', 'Orange');
    Orange_Button.position(80, 23);
    Orange_Button.mouseClicked(set_orange);
    //Yellow
    Yellow_Button = createButton('');
    Yellow_Button.size(50, 50);
    Yellow_Button.style('background-color', 'yellow');
    Yellow_Button.position(135, 23);
    Yellow_Button.mouseClicked(set_yellow);
    //Green
    Green_Button = createButton('');
    Green_Button.size(50, 50);
    Green_Button.style('background-color', 'green');
    Green_Button.position(190, 23);
    Green_Button.mouseClicked(set_green);
    //Light Blue
    LightBlue_Button = createButton('');
    LightBlue_Button.size(50, 50);
    LightBlue_Button.style('background-color', 'cyan');
    LightBlue_Button.position(245, 23);
    LightBlue_Button.mouseClicked(set_cyan);
    //Blue
    Blue_Button = createButton('');
    Blue_Button.size(50, 50);
    Blue_Button.style('background-color', 'blue');
    Blue_Button.position(300, 23);
    Blue_Button.mouseClicked(set_blue);
    //Purple
    Purple_Button = createButton('');
    Purple_Button.size(50, 50);
    Purple_Button.style('background-color', 'magenta');
    Purple_Button.position(355, 23);
    Purple_Button.mouseClicked(set_magenta);
    //Brown
    Brown_Button = createButton('');
    Brown_Button.size(50, 50);
    Brown_Button.style('background-color', 'brown');
    Brown_Button.position(410, 23);
    Brown_Button.mouseClicked(set_brown);
    //white
    White_Button = createButton('');
    White_Button.size(50, 50);
    White_Button.style('background-color', 'white');
    White_Button.position(465, 23);
    White_Button.mouseClicked(set_white);
    //Black
    Black_Button = createButton('');
    Black_Button.size(50, 50);
    Black_Button.style('background-color', 'black');
    Black_Button.position(520, 23);
    Black_Button.mouseClicked(set_black);


    //Eraser
    Eraser = createButton('Eraser');
    Eraser.size(75, 25);
    Eraser.style('background-color', 'White');
    Eraser.position(600, 35);
    Eraser.mouseClicked(set_white);

    //Clean background
    Eraser = createButton('Reset');
    Eraser.size(75, 25);
    Eraser.style('background-color', 'White');
    Eraser.position(700, 35);
    Eraser.mouseClicked(clearBG);

    //Save Image
    save_img = createButton('Save');
    save_img.size(75, 25);
    save_img.style('background-color', 'White');
    save_img.position(800, 35);
    save_img.mouseClicked(SaveImage);


}



function set_red() {
    c = 'red';
}

function set_orange() {
    c = 'orange';
}

function set_yellow() {
    c = 'yellow';
}

function set_green() {
    c = 'green';
}

function set_cyan() {
    c = 'cyan';
}

function set_blue() {
    c = 'blue';
}

function set_magenta() {
    c = 'magenta';
}

function set_brown() {
    c = 'brown';
}

function set_white() {
    c = 'white';
}

function set_black() {
    c = 'black';
}


function clearBG() {
    //clear the background by filling everything with white
    fill(bgcolor);
    noStroke();
    rect(0, 100, width, height);
    //rect(0, 100, screen.width, screen.height - 100);
}

function SaveImage() {
    var to_save = get(0, 100, width, height - 100);
    to_save.save("canvas.png");
}
