let numRounds = 0;
let startButton = document.getElementById("play");
startButton.addEventListener("click", runGame());

function updateRounds(){
    numRounds = document.getElementById("rounds").innerHTML;
}

function runGame(){
    updateRounds();
    console.log(numRounds);
}
