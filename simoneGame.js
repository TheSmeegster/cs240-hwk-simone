let numRounds = 0;
let sequence = [];
let clickedSequence = [];

//Sounds
let redSound = new Audio('sounds/red.wav');
let blueSound = new Audio('sounds/blue.wav');
let greenSound = new Audio('sounds/green.wav');
let yellowSound = new Audio('sounds/yellow.wav');

//Light sections
let startButton = document.getElementById("play");
let greenLight = document.getElementById("greenSq");
let redLight = document.getElementById("redSq");
let blueLight = document.getElementById("blueSq");
let yellowLight = document.getElementById("yellowSq");

startButton.addEventListener("click", runGame);
greenLight.addEventListener("click", () => {
    clickedSequence[clickedSequence.length] = 4;
});
redLight.addEventListener("click", () => {
    clickedSequence[clickedSequence.length] = 2;
});
blueLight.addEventListener("click", () => {
    clickedSequence[clickedSequence.length] = 3;
});
yellowLight.addEventListener("click", () => {
    clickedSequence[clickedSequence.length] = 4;
});

//Updates the number of rounds to play
function updateRounds(){
    numRounds = document.getElementById("rounds").value;
    console.log(numRounds);
}

//Runs the game
function runGame(){
    updateRounds();
    for(let round = 0; round < numRounds; round++){
        sequence[round] = Math.ceil(Math.random() * 4);
    }
    console.log(sequence);
    let greeting = new Promise((resolve, reject) => {
        resolve(greet());
        reject("Error, greeting failed");
    })
    greeting.then(() => {

        for(let round = 0; round < numRounds; round++){
            //console.log(sequence[round]);

            let sequenceRun = new Promise((resolve, reject) => {
                resolve(playSequence());
                reject("Error, displaying sequence failed");
            })
            sequenceRun.then(() => {
                clickedSequence = [];
                let waitForInput = new Promise((resolve, reject) => {
                    if(clickedSequence.length == round){
                        resolve();
                    }
                })
            })
            //Plays the sequence of colors
            async function playSequence(){
                let wait = await waitAMoment(4);
                //console.log("sequencing");
                for(let sequenceNum = 0; sequenceNum <= round; sequenceNum++){
                    //console.log(sequence);
                    if(sequence[sequenceNum] == 1){
                        //console.log("green");
                        greenLight.className = "lightgreen";
                        greenSound.play();
                    } else if (sequence[sequenceNum] == 2){
                        //console.log("red");
                        redLight.className = "lightred";
                        redSound.play();
                    } else if(sequence[sequenceNum] == 3){
                        //console.log("blue");
                        blueLight.className = "lightblue";
                        blueSound.play();
                    } else {
                        //console.log("yellow");
                        yellowLight.className = "lightyellow";
                        yellowSound.play();
                    }
                
                    wait = await waitAMoment(.15);

                    //Returns colors to original values
                    if(sequence[sequenceNum] == 1){
                        greenLight.className = "green";
                    } else if (sequence[sequenceNum] == 2){
                        redLight.className = "red";
                    } else if(sequence[sequenceNum] == 3){
                        blueLight.className = "blue";
                    } else {
                        yellowLight.className = "yellow";
                    }

                    wait = await waitAMoment(1);
                }
            }
        }
    })
}

//Plays a random sequence of 12 blinking lights to greet the user before playing
async function greet(){
    for(let num = 0; num < 12; num++){

        //Selects one of the random light colors
        let lightColor = Math.ceil(Math.random() * 4);
        let wait = await waitAMoment(.25);

        //Brightens selected color
        if(lightColor == 1){
            greenLight.className = "lightgreen";
            greenSound.play();
        } else if (lightColor == 2){
            redLight.className = "lightred";
            redSound.play();
        } else if(lightColor == 3){
            blueLight.className = "lightblue";
            blueSound.play();
        } else {
            yellowLight.className = "lightyellow";
            yellowSound.play();
        }

        wait = await waitAMoment(.15);

        //Returns colors to original values
        if(lightColor == 1){
            greenLight.className = "green";
        } else if (lightColor == 2){
            redLight.className = "red";
        } else if(lightColor == 3){
            blueLight.className = "blue";
        } else {
            yellowLight.className = "yellow";
        }
    }
}

//Waits the indicated amount of time
function waitAMoment(time = 1.0){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("resolved");
        }, time * 1000);
    })
}

function nextRound(){
    let nextRoundSound = 'sounds/nextRound.wav';
    nextRoundSound.play();
}

function lose(){
    let loseSound = 'sounds/lose.wav';
    loseSound.play();
}

function win(){
    let winSound = 'sounds/win.mp3';
    winSound.play();
}
