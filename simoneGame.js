let numRounds = 0;
let sequence = [];
let clickedSequence = [];
let lookingForInput = false;
let round = 0;
let lost = false;
let won = false;

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
});
redLight.addEventListener("click", () => {
    clickedSequence[clickedSequence.length] = 2;
    getUserInput();
});
blueLight.addEventListener("click", () => {
    clickedSequence[clickedSequence.length] = 3;
    getUserInput();
});
yellowLight.addEventListener("click", () => {
    clickedSequence[clickedSequence.length] = 4;
    getUserInput();
});

greenLight.addEventListener("mouseover", () =>{
    greenLight.style.border = ".5px solid white";
});
greenLight.addEventListener("mouseout", () => {
    greenLight.style.border = "";
});
redLight.addEventListener("mouseover", () =>{
    redLight.style.border = ".5px solid white";
});
redLight.addEventListener("mouseout", () => {
    redLight.style.border = "";
});
blueLight.addEventListener("mouseover", () =>{
    blueLight.style.border = ".5px solid white";
});
blueLight.addEventListener("mouseout", () => {
    blueLight.style.border = "";
});
yellowLight.addEventListener("mouseover", () =>{
    yellowLight.style.border = ".5px solid white";
});
yellowLight.addEventListener("mouseout", () => {
    yellowLight.style.border = "";
});

//Updates the number of rounds to play
function updateRounds(){
    numRounds = document.getElementById("rounds").value;
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
        reject("Error, greeting failed");
    });
    greeting.then(() => {
        runRounds();
        async function runRounds(){
            let sequenceRun = new Promise((resolve, reject) => {
                resolve(playSequence());
                reject("Error, displaying sequence failed");
            });
        }
    });
}
async function playSequence(){
    lost = false;
    won = false;
    let wait = await waitAMoment(4);
    if(round < numRounds){
        console.log(round);
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
    }

    lookingForInput = true;
    clickedSequence = [];

    if(round < numRounds){
        if(!lost && !won){
            await getUserInput();
        } else {
            return;
        }
    }
}

function getUserInput(){
    while(lookingForInput){
        return new Promise((resolve, reject) => {
            if(clickedSequence[clickedSequence.length - 1] != sequence[clickedSequence.length - 1]){
                lookingForInput = false;
                lose();
                lost = true;
                resolve();
            } else if(clickedSequence.length >= round + 1){
                lookingForInput = false;
                round++;
                if(clickedSequence[0] == sequence[0] && clickedSequence[1] == sequence[1]){
                    console.log("won");
                    win();
                    won = true;
                } else {
                    nextRound();
                    playSequence();
                }
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
    console.log("in Win");
    let winSound = 'sounds/win.mp3';
    (new Audio(winSound)).play();
}
