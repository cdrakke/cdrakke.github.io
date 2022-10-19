
var myAudio = document.getElementById("suiseinamba1");
myAudio.volume = 0.4;
myAudio.play();

function togglePlay() {
    return myAudio.paused ? myAudio.play() : myAudio.pause();
};