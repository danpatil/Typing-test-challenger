const testWrapper = document.querySelector('.test-container');
const testArea = document.querySelector('#textarea');
const theTimer = document.querySelector('.clock');
const resetButton = document.querySelector('#reset');
const originText = document.querySelector('.origin-text p').innerHTML;

let timer = [0,0,0,0];
let interval;
let timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero (time) {
    if (time <= 9) {
        time = '0'+time
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let timerString = leadingZero(timer[0]) + ':' + leadingZero(timer[1]) + ':' + leadingZero(timer[2]);
    theTimer.innerHTML = timerString;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);

    if (originText === textEntered) {;
        clearInterval(interval)
        testArea.style.backgroundColor = '#b6f7c1';
    } else {
        if (textEntered === originTextMatch) {
            testArea.style.backgroundColor = 'lightblue';
        } else {
            testArea.style.backgroundColor = 'lightcoral';
        }
    }

}

// Start the timer:
function start() {
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength == 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.value = '';
    testArea.style.backgroundColor = 'lightyellow';
    theTimer.innerHTML = '00:00:00';
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener('keypress', start);
testArea.addEventListener('keyup', spellCheck);
resetButton.addEventListener('click', reset);


