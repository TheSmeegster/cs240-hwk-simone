let numRounds = 0;

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

//Updates the number of rounds to play
function updateRounds(){
    numRounds = document.getElementById("rounds").value;
    console.log(numRounds);
}

//Runs the game
function runGame(){
    updateRounds();
    greet();
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

function waitAMoment(time = 1.0){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("resolved");
        }, time * 1000);
    })
}
