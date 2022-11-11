var points = 0
var clicked = false
var propagation = true

var blue_clicked = false
var red_clicked = false
var yellow_clicked = false

function clear_info(){
    document.getElementById('info1').textContent = "";
    document.getElementById('info2').textContent = "";
    document.getElementById('info3').textContent = "";
}

function reset_btns(){
    yellow_clicked = false;
    red_clicked = false;
    blue_clicked = false;
}

function show_info(){
    document.getElementById('info1').textContent = "";
    document.getElementById('info2').textContent = "";
    document.getElementById('info3').textContent = "";
    if(blue_clicked){
        document.getElementById('info1').textContent = "Nacisnąłeś niebieski o wartości 1"
    }
    if(red_clicked){
        document.getElementById('info2').textContent = "Nacisnąłeś czerwony o wartości 2"
    }
    if(yellow_clicked){
        document.getElementById('info3').textContent = "Nacisnąłeś żółty o wartości 5"
    }
}

function points_add(points){
    document.getElementById('points').textContent = points;
    this.points = points;
}

function click_reset_event(){
    clicked = false;
}

function reset(){
    points = 0;
    points_add(points);
    clicked = false;
    document.getElementById('red').classList.remove('disabled');
    document.getElementById('yellow').classList.remove('disabled');
    clear_info();
    reset_btns();
    document.getElementById('info1').textContent = "";
    document.getElementById('info2').textContent = "";
    document.getElementById('info3').textContent = "";
}

function propagation_event(){
    if(this.classList.contains("stop")){
        propagation = false;
        this.classList.remove("stop");
        this.classList.add("start");
        this.textContent = "Start Propagation";
    }
    else if(this.classList.contains("start")){
        propagation = true;
        this.classList.remove("start");
        this.classList.add("stop");
        this.textContent = "Stop Propagation";
    }
    return;
}

function click_yellow(){
    if (points > 50 || document.getElementById('yellow').classList.contains('disabled')){
        return;
    }else{
        points_add(points+5);
        yellow_clicked = true;
        if(!propagation){
            show_info();
            reset_btns();
        }
    }
}

function click_red(){
    if(points > 30 || document.getElementById('red').classList.contains('disabled')){
        return;
    }
    red_clicked = true;
    if(!propagation){
        show_info();
        reset_btns();
    }
    points_add(points+2);
}

function click_blue(){
    if(document.getElementById('blue').classList.contains('disabled')){
        return;
    }
    points_add(points+1);
    blue_clicked = true;
    show_info();
    reset_btns();
}

function click_event(id){
    if(!clicked){
        switch(id){
            case "blue":
                click_blue();
                break;
            case "red":
                click_red();
                break;
            case "yellow":
                click_yellow();
                break;
        }

        if(points > 30){
            document.getElementById('red').classList.add('disabled');
        }
        if(points > 50){
            document.getElementById('yellow').classList.add('disabled');
        }
    }
    if(!propagation){
        clicked = true;
    }
}

document.getElementById('yellow').onclick = function(){
    click_event(this.id);
}

document.getElementById('red').onclick = function(){
    click_event(this.id);
}

document.getElementById('blue').onclick = function(){
    click_event(this.id);
    click_reset_event();
}

document.getElementById('reset').onclick = reset;
document.getElementById('propagation').onclick = propagation_event;



