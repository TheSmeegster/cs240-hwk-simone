let numRounds = 0;
let sequence = [];
let clickedSequence = [];
let lookingForInput = false;
let round = 0;
let lost = false;
let won = false;


let statusBar = document.getElementById("status");

let startButton = document.getElementById("play");

//Light sections
let greenLight = document.getElementById("greenSq");
let redLight = document.getElementById("redSq");
let blueLight = document.getElementById("blueSq");
let yellowLight = document.getElementById("yellowSq");

//Button to begin the game
startButton.addEventListener("click", getSolution);

//Click listeners for buttons
greenLight.addEventListener("click", () => {
    clickedSequence[clickedSequence.length] = 1;
    (new Audio("sounds/green.wav")).play();
    getUserInput();
});
redLight.addEventListener("click", () => {
    clickedSequence[clickedSequence.length] = 2;
    (new Audio("sounds/red.wav")).play();
    getUserInput();
});
blueLight.addEventListener("click", () => {
    clickedSequence[clickedSequence.length] = 3;
    (new Audio("sounds/blue.wav")).play();
    getUserInput();
});
yellowLight.addEventListener("click", () => {
    clickedSequence[clickedSequence.length] = 4;
    (new Audio("sounds/yellow.wav")).play();
    getUserInput();
});

//Mouseover and off listeners to display border opn buttons
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

    //Prepares the rounds and target sequence before the game starts
    updateRounds();
    for(round = 0; round < numRounds; round++){
        sequence[round] = Math.ceil(Math.random() * 4);
    }
    round = 0;

    //Runs the greeting sequence
    let greeting = new Promise((resolve, reject) => {
        resolve(start());
        reject("Error, greeting failed");
    });
    //Starts the game after greeting the user
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

//Runs the game and displays the sequence piece by piece
async function playSequence(){

    lost = false;
    won = false;

    let wait = await waitAMoment(4);
    statusBar.innerHTML = "Round " + (round + 1) + " of " + numRounds;

    //Plays the sequence based on what round it is and the max number of rounds
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

    //Confirms the game is waiting for input and clears the clicked sequence
    lookingForInput = true;
    clickedSequence = [];

    //Waits for more input if the game is not done
    if(round < numRounds){
        if(!lost && !won){
            await getUserInput();
        } else {
            return;
        }
    }
}

//Gets user input and processes it
function getUserInput(){
    while(lookingForInput){
        if(clickedSequence.length > 0){
            statusBar.innerHTML = "So far so good! " + (round - clickedSequence.length + 1) + " more to go!"
        }
        return new Promise((resolve, reject) => {
            if(clickedSequence[clickedSequence.length - 1] != sequence[clickedSequence.length - 1]){
                lookingForInput = false;
                lose();
                lost = true;
                resolve();
            } else if(clickedSequence.length >= round + 1){
                lookingForInput = false;
                round++;
                if(clickedSequence.length >= sequence.length){
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

//Plays the next round audio
function nextRound(){
    statusBar.innerHTML = "Good job! Prepare for next round";
    let nextRoundSound = 'sounds/nextRound.wav';
    (new Audio(nextRoundSound)).play();
}

//Plays the lose audio and changes background color to pink
function lose(){
    statusBar.innerHTML = "Incorrect! You lose!";
    let loseSound = 'sounds/lose.wav';
    document.body.style.background = "hotpink";
    (new Audio(loseSound)).play();
}

//Plays win audio and changes background color to DeepSkyBlue
function win(){
    statusBar.innerHTML = "Yay you win!";
    let winSound = 'sounds/win.mp3';
    document.body.style.background = "DeepSkyBlue";
    (new Audio(winSound)).play();
}
