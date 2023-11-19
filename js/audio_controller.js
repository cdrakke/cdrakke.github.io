var myAudio = document.getElementById("suiseinamba1");
const delay = ms => new Promise(res => setTimeout(res, ms));
myAudio.volume = 0.4;

window.onload = async function () {
    await delay(2500);
    if (myAudio.paused) {
        myAudio.play();
    }
}

function togglePlay(x) {
    if (myAudio.paused) {
        x.classList.toggle("bi-music-note-beamed")
        x.classList.toggle("bi-pause-circle-fill")
        myAudio.play();
        return;
    }
    else {
        x.classList.toggle("bi-pause-circle-fill")
        x.classList.toggle("bi-music-note-beamed")
        myAudio.pause();
        return;
    }
};

