
var myAudio = document.getElementById("suiseinamba1");
const delay = ms => new Promise(res => setTimeout(res, ms));
myAudio.volume = 0.4;

window.onload = async function () {
    await delay(2500);
    if (myAudio.paused) {
        myAudio.play();
    }
}

function togglePlay() {
    return myAudio.paused ? myAudio.play() : myAudio.pause();
};

