//let sound1 = new Tone.Player("Sounds/ ..........");

let sounds = new Tone.Player({
    "01": "sounds/01.mp3",
    "02": "sounds/02.mp3",
    "03": "sounds/03.mp3"

});

const delay = new Tone.FeedbackDelay("8n", 0.5);

let button1;
let button2;
let button3;
let SoundNames = ["01", "02", "03"];
let buttons = [];

let dslider;
let fslider;


function setup() {
    createCanvas(400, 400);
    sounds.connect(delay);
    delay.toDestination();


    SoundNames.forEach((word, index) => {
        buttons[index] = createButton(word);
        buttons[index].position(index, index * 58);
        buttons[index].mousePressed(() => buttonSound(word));

    })

    dslider = createSlider(0, 1., 0.5, 0.05);
    dslider.mouseReleased(() => {
        delay.delayTime.value = dslider.value();
    })

    fslider = createSlider(0, 1., 0.5, 0.05);
    fslider.mouseReleased(() => {
        delay.feedback.value = fslider.value();
    })



}

function draw() {
    background(220);

    text("Press button for sound", 0, 150)

    // button1 = creatButton("");
    // button1.position(50, 50);
    // //() => buffer functions
    // button1.mousePressed(() => buttonSound("Sound name"));

    // button2 = creatButton("");
    // button2.position(50, 50);
    // button2.mousePressed(() => buttonSound("Sound name"));

    // button3 = creatButton("");
    // button3.position(50, 50);
    // button3.mousePressed(() => buttonSound("Sound name"));

}

function buttonSound(whichSound) {

    sounds.player(whichSound).start();

    // if (whichSound === "i") {
    //     //sound1.playbackRate = ((mouseY / 200) + 0.01);
    //     sounds.player("Sound name").start();
    // } else if (whichSound === "i") {
    //     //sound1.playbackRate = ((mouseY / 200) + 0.01);
    //     sounds.player("Sound name").start();
    // } else if (whichSound === "i") {
    //     //sound1.playbackRate = ((mouseY / 200) + 0.01);
    //     sounds.player("Sound name").start();
    // }


}


// function keyPressed() {
//     if (key === "i") {
//         sound1.playbackRate = ((mouseY / 200) + 0.01);
//         sound1.start();
//     }

// }