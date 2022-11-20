var cnt = 0
var prop = true
var change = false

var blue = document.getElementById('blue');
var red = document.getElementById('red');
var yellow = document.getElementById('yellow');
var info = document.getElementById("info");
var points = document.getElementById('points');
var prop_btn = document.getElementById('propagation');
var reset_btn = document.getElementById('reset');
var change_btn = document.getElementById('change');

function update() {
    points.innerText = "Twój wynik to: " + cnt;
    if (cnt > 30) {
        red.classList.add('disabled');
        red.removeEventListener('click', addred, change);
    }
    if (cnt > 50) {
        yellow.classList.add('disabled');
        yellow.removeEventListener('click', addyellow, change);
    }
    if (prop) {
        prop_btn.innerText = "Stop propagation";
    }
    else {
        prop_btn.innerText = "Start propagation";
    }
}

function addblue(e){
    cnt += 1;
    update();
    info.innerHTML += "<p>nacisnąłeś niebieski o wartości 1</p";
    if (!prop) {
        e.stopPropagation();
    }
}

function addred(e) {
    cnt += 2;
    update();
    info.innerHTML += "<p>nacisnąłeś czerwony o wartości 2</p>";
    if (!prop) {
        e.stopPropagation();
    }
}

function addyellow(e) {
    cnt += 5;
    update();
    info.innerHTML += "<p>nacisnąłeś żółty o wartości 5</p>";
    if (!prop) {
        e.stopPropagation();
    }
}

function changeProp() {
    blue.removeEventListener("click",addblue,change);
    red.removeEventListener("click",addred,change);
    yellow.removeEventListener("click",addyellow,change);
    change=!change;
    start();
    update();
}

function switchProp() {
    prop = !prop;
    update();
}

function reset() {
    cnt = 0;
    points.innerText = cnt;
    start();
    update();
}

function start() {
    info.innerHTML = "";
    red.classList.remove('disabled');
    yellow.classList.remove('disabled');
    blue.addEventListener("click",addblue,change);
    red.addEventListener("click",addred,change);
    yellow.addEventListener("click", addyellow, change);
    prop_btn.addEventListener("click", switchProp);
    reset_btn.addEventListener("click", reset);
    change_btn.addEventListener("click", changeProp);
}

start();
update();