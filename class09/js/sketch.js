//let sound1 = new Tone.Player("Sounds/ ..........");

let sounds = new Tone.Players({
    '01': 'Sounds/chicken.wav',
    '02': 'Sounds/water.mp3',
    '03': 'Sounds/ductTape.wav',
    '04': 'Sounds/trap_loop.mp3'


});

const delay = new Tone.FeedbackDelay("8n", 0.5);

let button1;
let button2;
let button3;
let SoundNames = ['01', '02', '03', '04'];
let buttons = [];

let dslider;
let fslider;


function setup() {
    createCanvas(400, 400);
    // sounds.toDestination();
    sounds.connect(delay);
    delay.toDestination();


    SoundNames.forEach((word, index) => {
        buttons[index] = createButton("Sound track: " + word);
        buttons[index].size(150, 25);
        buttons[index].position(index + 120, (index + 1) * 50);
        buttons[index].mousePressed(() => buttonSound(word));
    })

    dslider = createSlider(0, 1., 0.5, 0.05);
    dslider.mouseReleased(() => {
        delay.delayTime.value = dslider.value();
    })
    dslider.position(30, buttons.length * 72)


    fslider = createSlider(0, 1., 0.5, 0.05);
    fslider.mouseReleased(() => {
        delay.feedback.value = fslider.value();
    })
    fslider.position(230, buttons.length * 72)



}

function draw() {
    background(220);

    text("Press button for sound", 135, buttons.length * 60)
    text("Delay effect", 40, buttons.length * 70)
    text("Feedback effect", 240, buttons.length * 70)

}

function buttonSound(whichSound) {

    sounds.player(whichSound).start();
    //    sounds.player(whichSound).start();


}