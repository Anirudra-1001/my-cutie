function startListening() {
    const recognition = new webkitSpeechRecognition();
    recognition.start();

    recognition.onresult = function(event) {
        let text = event.results[0][0].transcript;
        speak(text);
    }
}

function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.pitch = 1.2;
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
}
