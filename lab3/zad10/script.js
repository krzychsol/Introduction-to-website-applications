var board = document.getElementById("board");
var alert = document.getElementById('alert');
var ball = document.getElementById('ball');
board.appendChild(ball);

window.addEventListener('click', function (e) {
    var x = e.clientX-(ball.clientWidth/2);
    var y = e.clientY - (ball.clientHeight / 2);
    if (document.getElementById('board').contains(e.target)) {
        ball.style.left = x + "px";
        ball.style.top = y + "px";
        alert.textContent = "";
    }
    else {
        alert.textContent = "Kliknąłeś poza obszarem!";
        alert.style.left = e.clientX - (alert.clientWidth/2) + "px";
        alert.style.top = e.clientY-(alert.clientHeight/2) + "px";
    }
})

