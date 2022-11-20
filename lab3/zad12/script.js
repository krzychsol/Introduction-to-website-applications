// ZOMBIES FUNCTIONS //
function animateZombie(el,speed){
    var offset = 200;
    var cur_bgpos = 0;
    var cur_pos = 0;
    var interval;

    switch(speed){
        case 1:
            interval=50;
            break;
        case 2:
            interval=40;
            break;
        case 3:
            interval=30;
            break;
        case 4:
            interval=20;
            break;
        case 5:
            interval=15;
            break;
        default:
            interval=50;
            break;
    }

    zombieRunTime[el.id] = setInterval(()=>{
        el.style.backgroundPosition = cur_bgpos+offset+"px 0px";
        el.style.left = 101-cur_pos+"vw";
        cur_bgpos -= offset;
        cur_pos++;
        if(cur_bgpos== -1800){
            cur_bgpos = 0;
        }
        if(cur_pos == 115){
            el.remove();
            score -= 6;
            health -= 1;
            updateScore();
            updateHealth();
            if(health <= 0){
                gameEnd();
            }
            clearInterval(zombieRunTime[el.id]);
        }
    },interval);
}


function spawnZombie(speed,top,size,start_pos){
    var elZombie = document.createElement("div");
    elZombie.classList.add("zombie");
    elZombie.setAttribute("id",idx);
    elZombie.addEventListener("click",zombieShot);
    elZombie.style.top = 20+top+"vh";
    elZombie.style.left = 100+start_pos+"vw";
    elZombie.style.transform = "scale("+size+")";
    board.appendChild(elZombie);
    idx++;
    animateZombie(elZombie,speed);
}

function generateZombie(){
    var speed = Math.round(Math.random()*5);
    var top = Math.round(Math.random()*30);
    var size = Math.round(((Math.random()*7+7)/10)*100)/100
    var start_pos = Math.round(Math.random()*20);
    spawnZombie(speed,top,size,start_pos);
}


// UPDATERS //
function updateScore(){
    elScore.textContent=score;
}
function updateHealth(){
    elHealth.textContent = "";
    for(var i = 0; i<health; i++){
        elHealth.textContent+="❤";
    }
}
// UPDATERS END //

// HANDLERS //
function boardShot(){
    score -= 6
    updateScore();
}

function zombieShot(){
    score += 12
    updateScore();
    clearInterval(zombieRunTime[this.el]);
    this.remove();
}

function followCursor(e){
    mouseCursor.style.top = e.pageY+"px";
    mouseCursor.style.left = e.pageX+"px";
}

function startgame2Handler(){
    elHs.style.transform = "translateY(-200%)";
    gameStart();
}

function startGameHandler(){
    var form = document.getElementById("username");
    var enteredUsername = form.value;
    if(!form.checkValidity()){
        return
    }
    elUserMenu.style.transform = "translateY(-200%)";
    elUserName.textContent = enteredUsername;
    userName = enteredUsername;
    gameStart();
}
// HANDLERS END //

// GAME //
function gameEnd(){
    clearInterval(gameRunning);
    Object.keys(zombieRunTime).forEach(function(key){
        clearInterval(zombieRunTime[key]);
    });
    board.removeEventListener("click",boardShot);
    window.removeEventListener("mousemove",followCursor);
    document.body.style.cursor = "default";
    highscoresPrompt();
}

function gameStart(){
    health = 3;
    score = 0;
    idx = 0;
    updateHealth();
    updateScore();
    document.body.style.cursor="none";
    board.addEventListener("click",boardShot);
    window.addEventListener("mousemove",followCursor);
    var zombies = document.querySelectorAll("div.zombie");
    for (var i=0;i<zombies.length;i++){
        zombies[i].remove();
    }
    
    gameRunning = setInterval( ()=>{
        generateZombie();
    },500);
}

function startGame(){
    elUserMenu.style.transform = "translateY(0%)";
    document.getElementById("startgame").addEventListener("click",startGameHandler);
}
// GAME END //

// UTILITY //
function cmpFn(a,b){
    if (a["score"]<b["score"]){
        return 1;
    }
    else return -1;
}
// UTILITY END //

// ASYNC FUNCTIONS //
async function highscoresPrompt(){
    elHs.style.transform = "translateY(0%)";
    var data = await fetch("https://jsonblob.com/1042571419824963584");
    var json = await data.json();
    updateHighscores(json);
    document.getElementById("startgame2").addEventListener("click",startgame2Handler);
}

async function updateHighscores(json){
    var today = new Date();
    var dd = String(today.getDate().padStart(2,'0'));
    var mm = String(today.getMonth()+1).padStart(2,'0');
    var yyyy = today.getFullYear();
    today = dd + '/'+ mm + '/' + yyyy;

    console.log(data)
    data = json["highscores"];
    console.log(data);
    data.push({"name": userName,"score":score,"date":today});
    data.sort(cmpFn);
    var entries = document.querySelectorAll("hs-list>li");
    for(var i=0;i<entries.length;i++){
        entries[i].remove();
    }
    var hsList = document.querySelector("#hs-list");
    for (var i=0;i<data.length;i++){
        if(i==7){
            break;
        }
        var entry = document.createElement("li");
        entry.textContent = data[i]["name"]+", pkt: "+data[i]["score"]+", data: "+data[i]["date"];
        hsList.appendChild(entry);
    }
    await sendScore("https://jsonblob.com/1042571419824963584", json);
}

async function sendScore(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: "same-origin",  
        credentials: "same-origin",
        headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(resp => {
        if (resp.status == 200) {
            return resp.json();
        } else {
            console.log("Status: " + resp.status);
        }
    }).then(dataJson => {
        dataReceived = JSON.parse(dataJson)
    }).catch(err => {
        if (err === "server") return
        console.log(err);
    });
    return response.json();
}

// GAME VARIABLES //
var idx = 0;
var board = document.querySelector("#board");
var zombieRunTime = {};
var elScore = document.querySelector("#score");
var elHealth = document.querySelector("#health");
var elUserMenu = document.querySelector("#userinfo-container");
var elUserName = document.querySelector("#login");
var elHs = document.querySelector("#hs-container");
var userName = "";
var score = 0;
var health = 3;
var gameRunning;
var mouseCursor = document.querySelector("#customcursor");
// GAME VARIABLES END //

// START GAME //
startGame();