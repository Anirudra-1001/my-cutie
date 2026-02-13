let questions = [
    {
        question: "2, 4, 8, 16, ?",
        options: ["24", "32", "20"],
        answer: "32"
    }
];

let current = 0;
let score = 0;
let timeLeft = 10;
let timer;

function startQuiz() {
    score = 0;
    current = 0;
    showQuestion();
}

function showQuestion() {
    timeLeft = 10;
    document.getElementById("timer").innerText = "Time: " + timeLeft;

    let q = questions[current];
    document.getElementById("question").innerText = q.question;

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach(option => {
        let btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = function() { checkAnswer(option); };
        optionsDiv.appendChild(btn);
    });

    startTimer();
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timer").innerText = "Time: " + timeLeft;

        if (timeLeft <= 0) {
            nextQuestion();
        }
    }, 1000);
}

function checkAnswer(selected) {
    if (selected === questions[current].answer) {
        score++;
        speak("Yay! Correct answer!");
    } else {
        speak("Oops! Try again next time!");
    }
    nextQuestion();
}

function nextQuestion() {
    clearInterval(timer);
    current++;

    if (current < questions.length) {
        showQuestion();
    } else {
        document.getElementById("question").innerText = "Game Over!";
        document.getElementById("options").innerHTML = "";
        document.getElementById("score").innerText = "Your Score: " + score;
    }
}

function talk() {
    const recognition = new webkitSpeechRecognition();
    recognition.start();

    recognition.onresult = function(event) {
        let text = event.results[0][0].transcript;
        speak(text);
    }
}

function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
}
