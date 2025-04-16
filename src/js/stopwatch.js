const minutesEl = document.querySelector ("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");
const msEl = document.querySelector("[data-ms]");
const startButton = document.querySelector(".btn-start");
const stopButton = document.querySelector(".btn-stop");
const resetButton = document.querySelector(".btn-reset");

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

let timerInterval;
let elapsedTime;

function startTimer() {
    if (timerInterval) return;
    let startTime = Date.now();
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        const { minutes, seconds, milliseconds } = addLeadingZero(convertMs(elapsedTime));
        
        minutesEl.textContent = minutes;
        secondsEl.textContent = seconds;
        msEl.textContent = milliseconds;
    }, 10);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        return;
    } else if (elapsedTime) {
        let startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        const { minutes, seconds, milliseconds } = addLeadingZero(convertMs(elapsedTime));
        
        minutesEl.textContent = minutes;
        secondsEl.textContent = seconds;
        msEl.textContent = milliseconds;
    }, 10);
    }
}

function resetTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        elapsedTime = 0;
    }
    
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    msEl.textContent = "00";
}

function convertMs(ms) {
    const minutes = Math.floor(ms / 1000 / 60);
    const seconds = Math.floor((ms / 1000) % 60);
    const milliseconds = Math.floor((ms % 1000) / 10);
    
    return {
        minutes,
        seconds,
        milliseconds,
    };
}

function addLeadingZero(value) {
    for (const key of Object.keys(value)) {
        value[key] = value[key].toString().padStart(2, '0');
}
    return value;
}
