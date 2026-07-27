const sampleText = "The quick brown fox jumps over the lazy dog and runs quickly towards the finish line with great enthusiasm.";
const quoteElement = document.getElementById("quote");
const inputElement = document.getElementById("input-field");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");
const timerElement = document.getElementById("timer");
const restartBtn = document.getElementById("restart-btn");
const scoreForm = document.getElementById("score-form");
const hiddenWpm = document.getElementById("hidden-wpm");
const hiddenAccuracy = document.getElementById("hidden-accuracy");

let timeLeft = 30;
let timer = null;
let isTyping = false;
let charIndex = 0;
let mistakes = 0;

function loadQuote() {
    quoteElement.innerHTML = "";
    sampleText.split("").forEach(char => {
        let span = `<span>${char}</span>`;
        quoteElement.innerHTML += span;
    });
    quoteElement.querySelectorAll("span")[0].classList.add("active");
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerElement.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (30 - timeLeft) * 60);
        wpmElement.innerText = !isNaN(wpm) && wpm > 0 ? wpm : 0;
    } else {
        clearInterval(timer);
        inputElement.disabled = true;
        finishTest();
    }
}

inputElement.addEventListener("input", () => {
    let characters = quoteElement.querySelectorAll("span");
    let typedChar = inputElement.value.split("")[charIndex];

    if (!isTyping) {
        timer = setInterval(initTimer, 1000);
        isTyping = true;
    }

    if (typedChar == null) {
        if (charIndex > 0) {
            charIndex--;
            if (characters[charIndex].classList.contains("incorrect")) {
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect");
        }
    } else {
        if (characters[charIndex].innerText === typedChar) {
            characters[charIndex].classList.add("correct");
        } else {
            mistakes++;
            characters[charIndex].classList.add("incorrect");
        }
        charIndex++;
    }

    characters.forEach(span => span.classList.remove("active"));
    if (characters[charIndex]) {
        characters[Index].classList.add("active");
    }

    let correctChars = charIndex - mistakes;
    let totalTime = 30 - timeLeft;
    let accuracy = totalTime > 0 ? Math.round((correctChars / charIndex) * 100) : 100;
    accuracyElement.innerText = `${accuracy >= 0 ? accuracy : 100}%`;
});

function finishTest() {
    let finalWpm = wpmElement.innerText;
    let finalAcc = parseInt(accuracyElement.innerText);
    
    hiddenWpm.value = finalWpm;
    hiddenAccuracy.value = isNaN(finalAcc) ? 100 : finalAcc;
    scoreForm.style.display = "block";
}

restartBtn.addEventListener("click", () => {
    clearInterval(timer);
    timeLeft = 30;
    timerElement.innerText = timeLeft;
    inputElement.value = "";
    inputElement.disabled = false;
    charIndex = 0;
    mistakes = 0;
    isTyping = false;
    wpmElement.innerText = 0;
    accuracyElement.innerText = "100%";
    scoreForm.style.display = "none";
    loadQuote();
});

loadQuote();