document.addEventListener('DOMContentLoaded', function(event) {
    var dataText = ["Formerly CDrakke", "Drekyz"];

    function typeWriter(text, i, fnCallback) {
        if (i < (text.length)) {
            document.querySelector("h1").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
            setTimeout(function() {
                typeWriter(text, i + 1, fnCallback)
            }, 150);
      }
      else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 700);
      }
    }

    function StartTextAnimation(i) {
        if (typeof dataText[i] == 'undefined'){
            setTimeout(function() {
                StartTextAnimation(0);
            }, 5000);
        }
        try {
            if (i < dataText[i].length) {
                typeWriter(dataText[i], 0, function(){
                    StartTextAnimation(i + 1);
                });
            }
        } catch (TypeError) {
            
        }
    }
    StartTextAnimation(0);
  }
);

function on_development() {
    alert("Currently in development!")
}

function go_to_quizzer() {
    window.location.href = 'quizzer.html';
}