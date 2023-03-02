const Duosynth = new Tone.DuoSynth();
const pluckysynth = new Tone.PluckSynth();
const polysynth = new Tone.PolySynth();
const delay = new Tone.FeedbackDelay("8n", 0.5);

let relese_time_slider;
let curr_synth = "";

let notes = {

    'a': 'C4',
    's': 'D4',
    'd': 'E4',
    'f': 'F4',
    'g': 'G4',
    'h': 'A4',
    'j': 'B4',
    'k': 'C5'

}

function setup() {
    createCanvas(400, 400);
    // if (curr_synth == "pluckysynth") {
    //     pluckysynth.toDestination();
    // } else if (curr_synth == "Duosynth") {
    //     Duosynth.toDestination();
    // } else if (curr_synth == "Polysynth") {
    //     polysynth.toDestination();
    // }

    dslider = createSlider(1, 10., 1., 1.);
    dslider.mouseReleased(() => {
        relese_time_slider = dslider.value();
    })
    dslider.position(30, 50)


    button1 = createButton("Duosynth");
    button1.size(84, 25);
    button1.position(50, 100);
    button1.mousePressed(() => buttonSound("Duosynth"));

    button2 = createButton("pluckysynth");
    button2.size(84, 25);
    button2.position(50, 200);
    button2.mousePressed(() => buttonSound("pluckysynth"));

    button3 = createButton("polysynth");
    button3.size(84, 25);
    button3.position(50, 300);
    button3.mousePressed(() => buttonSound("polysynth"));




}

function buttonSound(set_curr_synth) {
    console.log("set synth " + set_curr_synth);
    curr_synth = set_curr_synth;
}

function draw() {
    background(150);
    text("Key release time (1-10)", 45, 45);
}

function keyPressed() {
    console.log(key);


    let whatNote = notes[key]
    if (curr_synth == "Duosynth") {
        Duosynth.toDestination();
        Duosynth.harmonicity.value = 0.3;
        Duosynth.triggerAttackRelease(whatNote, relese_time_slider + "n");
    } else if (curr_synth == "pluckysynth") {
        pluckysynth.toDestination();
        pluckysynth.triggerAttackRelease(whatNote, relese_time_slider + "n");
    } else if (curr_synth == "polysynth") {
        polysynth.toDestination();
        polysynth.set({ detune: -1800 });
        polysynth.triggerAttackRelease(whatNote, relese_time_slider + "n");
    }

}