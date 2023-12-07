var turnsElement = document.getElementById("totalTurns");
var timeElement = document.getElementById("totalTime");
var scoreElement = document.getElementById("score");
var highscoreElement = document.getElementById("highscore");

var successAudio = new Audio('audios/success.mp3');
var soundSwitch = document.getElementById("soundSwitch");

var turnsTotal = 0;
var turnsSuccess = 0;
var flipsTotal = 0;

var score = 0;

let minute = 0;
let second = 0;
let millisecond = 0;
let cron;

let highscore  = localStorage.getItem("highscore");
if(highscore == null){
    localStorage.setItem("highscore", 0);
    highscore = 0;
}else{
    highscore = parseInt(highscore);
}
highscoreElement.innerHTML = highscore;

let sound = true;

function addFlip(){
    if(flipsTotal == 0){
        startTimer();
    }
    flipsTotal++;
    if(flipsTotal % 2 == 0){
        turnsTotal++;
        turnsElement.innerHTML = turnsTotal;
    }
}

function addSuccessTurn(){
    if(sound){
        successAudio.pause();
        successAudio.currentTime = 0;
        successAudio.play();
    }

    let timeInSeconds = parseInt(second) + parseInt(minute) * 60; 
    if(timeInSeconds > 90){
        score += 10;
    }else if(timeInSeconds == 0){
        score += 500;
    }else{
        score += Math.round(500 / (timeInSeconds / 2));
    }
    scoreElement.innerHTML = score;

    turnsSuccess++;
    return turnsSuccess;
}

function resetTurns(){
    turnsTotal = 0;
    flipsTotal = 0;
    turnsSuccess = 0;
    score = 0;
    turnsElement.innerHTML = turnsTotal;
    scoreElement.innerHTML = score;
}

function startTimer() {
    pauseTimer();
    cron = setInterval(() => { timer(); }, 10);
}
  
function pauseTimer() {
    clearInterval(cron);
    timeElement.innerHTML = returnData(minute) + ":" + returnData(second) + ":" + returnData(millisecond);
}
  
function resetTimer() {
    pauseTimer();
    minute = 0;
    second = 0;
    millisecond = 0;
    timeElement.innerHTML = "00:00:00";
}

function timer() {
    if ((millisecond += 1) == 100) {
      millisecond = 0;
      second++;
    }
    if (second == 60) {
      second = 0;
      minute++;
    }
    if (minute == 60) {
      minute = 0;
    }
    timeElement.innerHTML = returnData(minute) + ":" + returnData(second) + ":" + returnData(millisecond);
}
  
function returnData(input) {
    return input >= 10 ? input : `0${input}`;
}

function finishGame(){
    pauseTimer();
    
    if(score > highscore){
        highscore = score;
        localStorage.setItem("highscore", highscore);
        highscoreElement.innerHTML = highscore;
    }
}

function switchSound(){
    if(sound){
        sound = false;
        soundSwitch.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-mute-fill" viewBox="0 0 16 16"><path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/></svg>';
    }else{
        sound = true;
        soundSwitch.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-up-fill" viewBox="0 0 16 16"><path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/><path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89z"/><path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/></svg>';
    }
}