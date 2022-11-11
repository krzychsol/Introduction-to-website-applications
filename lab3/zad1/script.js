function sayHello(){
    var name = prompt("Podaj swoje imie:");
    if (name[name.length-1] == 'a'){
        document.getElementById('name').innerHTML = "Witam Panią: "+name;
    }
    else{
        document.getElementById('name').innerHTML = "Witam Pana: "+name;
    }
}