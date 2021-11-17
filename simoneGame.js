let numRounds = 0;
let sequence = [];
let clickedSequence = [];
let lookingForInput = false;
let round = 0;

//Light sections
let startButton = document.getElementById("play");
let greenLight = document.getElementById("greenSq");
let redLight = document.getElementById("redSq");
let blueLight = document.getElementById("blueSq");
let yellowLight = document.getElementById("yellowSq");

startButton.addEventListener("click", getSolution);

greenLight.addEventListener("click", () => {
    clickedSequence[clickedSequence.length] = 1;
    getUserInput();
    console.log(clickedSequence);
});
redLight.addEventListener("click", () => {
    clickedSequence[clickedSequence.length] = 2;
    getUserInput();
    console.log(clickedSequence);
});
blueLight.addEventListener("click", () => {
    clickedSequence[clickedSequence.length] = 3;
    getUserInput();
    console.log(clickedSequence);
});
yellowLight.addEventListener("click", () => {
    clickedSequence[clickedSequence.length] = 4;
    getUserInput();
    console.log(clickedSequence);
});

//Updates the number of rounds to play
function updateRounds(){
    numRounds = document.getElementById("rounds").value;
    console.log(numRounds);
}

//Runs the game
function getSolution(){
    updateRounds();
    for(round = 0; round < numRounds; round++){
        sequence[round] = Math.ceil(Math.random() * 4);
    }
    round = 0;
    let greeting = new Promise((resolve, reject) => {
        resolve(start());
        //resolve(axios.get("http://cs.pugetsound.edu/~dchiu/cs240/api/simone/", "start"))
        reject("Error, greeting failed");
    });
    greeting.then(() => {
        runRounds();
        async function runRounds(){
            //let round = 0;
            let sequenceRun = new Promise((resolve, reject) => {
                resolve(playSequence(round));
                reject("Error, displaying sequence failed");
            });
            sequenceRun.then(() => {
                clickedSequence = [];
                let waitForInput = new Promise((resolve, reject) => {
                    if(clickedSequence.length == round){
                        resolve();
                    }
                })
            });
        }
    });
}
async function playSequence(){
    let wait = await waitAMoment(4);
    for(let sequenceNum = 0; sequenceNum <= round; sequenceNum++){
        if(sequence[sequenceNum] == 1){
            greenLight.className = "lightgreen";
            (new Audio("sounds/green.wav")).play();
        } else if (sequence[sequenceNum] == 2){
            redLight.className = "lightred";
            (new Audio("sounds/red.wav")).play();
        } else if(sequence[sequenceNum] == 3){
            blueLight.className = "lightblue";
            (new Audio("sounds/blue.wav")).play();
        } else {
            yellowLight.className = "lightyellow";
            (new Audio("sounds/yellow.wav")).play();
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

        wait = await waitAMoment(.25);
    }

    lookingForInput = true;
    clickedSequence = [];
    console.log("getting input");

    if(round < numRounds ){
        
        await getUserInput(round);
    } else {
        console.log("done");
    }
}

function getUserInput(){
    while(lookingForInput){
        console.log("inputting");
        return new Promise((resolve, reject) => {
            if(clickedSequence[clickedSequence.length - 1] != sequence[clickedSequence.length - 1]){
                console.log("Loss Resolution");
                lookingForInput = false;
                lose();
                resolve();
            }
            if(clickedSequence.length >= round){
                console.log("correct resolution");
                lookingForInput = false;
                round++;
                playSequence();
                resolve();
            }
        });
    }
}

//Plays a random sequence of 12 blinking lights to greet the user before playing
async function start(){
    for(let num = 0; num < 12; num++){

        //Selects one of the random light colors
        let lightColor = Math.ceil(Math.random() * 4);
        let wait = await waitAMoment(.06);

        //Brightens selected color
        if(lightColor == 1){
            greenLight.className = "lightgreen";
            (new Audio("sounds/green.wav")).play();
        } else if (lightColor == 2){
            redLight.className = "lightred";
            (new Audio("sounds/red.wav")).play();
        } else if(lightColor == 3){
            blueLight.className = "lightblue";
            (new Audio("sounds/blue.wav")).play();
        } else {
            yellowLight.className = "lightyellow";
            (new Audio("sounds/yellow.wav")).play();
        }

        wait = await waitAMoment(.06);

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

        wait = await waitAMoment(.12)
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
    (new Audio(nextRoundSound)).play();
}

function lose(){
    let loseSound = 'sounds/lose.wav';
    (new Audio(loseSound)).play();
}

function win(){
    let winSound = 'sounds/win.mp3';
    (new Audio(winSound)).play();
}
