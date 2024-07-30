var myAudio = document.getElementById("suiseinamba1");
var toggle_image_text = document.querySelector("#toggle-image-text")
var toggle_image = document.querySelector("#toggle-image");
const delay = ms => new Promise(res => setTimeout(res, ms));
myAudio.volume = 0.4;

window.onload = async function () {
    await delay(2500);
    if (myAudio.paused) {
        toggle_image.classList.toggle("bi-music-note-beamed");
        toggle_image.classList.toggle("bi-pause-circle-fill");
        toggle_image_text.textContent = "Now playing: Blue Archive Theme 228";
        myAudio.play();
    }
}

function togglePlay(x) {
    if (myAudio.paused) {
        x.classList.toggle("bi-music-note-beamed");
        x.classList.toggle("bi-pause-circle-fill");
        toggle_image_text.textContent = "Now playing: Blue Archive Theme 228";
        myAudio.play();
        return;
    }
    else {
        x.classList.toggle("bi-pause-circle-fill");
        x.classList.toggle("bi-music-note-beamed");
        toggle_image_text.textContent = "Music paused!";
        myAudio.pause();
        return;
    }
};

