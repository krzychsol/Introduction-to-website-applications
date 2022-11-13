async function getData() {
    var res = await fetch("http://localhost:3000/cities");
    var json = await res.json();
    return json;
}

function fillData(filtered,id) {
    var cities = "";

    for (var prop in filtered) {
        if (!filtered.hasOwnProperty(prop)) {
            continue;
        }
        cities += filtered[prop].name + ", ";
    }
    cities = cities.substring(0, cities.length - 2);
    cities = cities + ".";
    document.getElementById(id).textContent = cities;
}

async function getA(data) {
    var json = data;
    var filtered = json.filter(function (entry) {
        return entry.province === "małopolskie";
    })

    fillData(filtered, 'ad-a');
}

function checkDoubleA(word) {
    var cnt = 0;
    for (var i = 0; i < word.length; i++){
        letter = word.charAt(i);
        if (letter == 'A' || letter == 'a') {
            cnt++;
        }
    }
    return cnt == 2;
}

async function getB(data) {
    var json = data;
    var filtered = json.filter(function (entry) {
        return checkDoubleA(entry.name);
    })

    fillData(filtered, 'ad-b');
}

async function getC(data) {
    var json = data;
    var cities_dentensity = new Array;

    for (var prop in json) {
        cities_dentensity.push([json[prop].name, json[prop].dentensity]);
    }

    cities_dentensity.sort(function (a, b) {
        if (a[1] < b[1]) {
            return 1
        }
        else if (a[1] > b[1]) {
            return -1
        }
        return 0;
    });

    document.getElementById('ad-c').textContent = cities_dentensity[4][0];
}

async function getD(data) {
    var json = data;
    var filtered = json.filter(function (entry) {
        return entry.people > 100000;
    })

    var cities = "";

    for (var prop in filtered) {
        if (!filtered.hasOwnProperty(prop)) {
            continue;
        }
        cities += filtered[prop].name + " city, ";
    }
    cities = cities.substring(0, cities.length - 2);
    cities = cities + ".";
    document.getElementById('ad-d').textContent = cities;
}

async function getE(data) {
    var json = data;
    var cntAbove = 0;
    var cntUnder = 0;

    for (var prop in json) {
        if (json[prop].people > 80000) {
            cntAbove++;
        }
        else {
            cntUnder++;
        }
    }
    var ad_e_1 = document.createElement('p');
    var ad_e_2 = document.createElement('p');
    var ad_e_3 = document.createElement('p');
    var ad_e = document.getElementById('ad-e');
    ad_e.appendChild(ad_e_1);
    ad_e.appendChild(ad_e_2);
    ad_e.appendChild(ad_e_3);

    ad_e_1.textContent = "Ilość miast powyżej 80 000 mieszkańców: " + cntAbove;
    ad_e_2.textContent = "Ilość miast poniżej 80 000 mieszkańców: " + cntUnder;
    if (cntAbove > cntUnder) {
        ad_e_3.textContent = "Więcej jest miast powyżej 80 000 mieszkańców.";
    }
    else {
        ad_e_3.textContent = "Więcej jest miast poniżej 80 000 mieszkańców.";
    }
}

async function getF(data) {

    var json = data;
    var sum_of_area = 0;
    var cities_cnt = 0;

    for (var prop in json) {
        if (json[prop].township.charAt(0) == 'P') {
            sum_of_area += json[prop].area;
            cities_cnt += 1;
        }
    }
    document.getElementById("ad-f").textContent = sum_of_area / cities_cnt;
}

async function getG(data) {
    var json = data;
    var filtered = json.filter(function (entry) {
        return entry.province === "pomorskie";
    })

    var answer = true;
    var cities_cnt = 0;
    console.log(filtered);
    for (var prop in filtered) {
        if (!json[prop].people > 5000) {
            answer = false;
            break;
        }
        else {
            cities_cnt += 1;
        }
    }
    if (answer) {
        document.getElementById('ad-g').textContent = "Tak, takich miast jest: " + cities_cnt;
    }
    else {
        document.getElementById('ad-g').textContent = "Nie wszystkie";
    }
}

async function loadSite() {
    var json = await getData();
    getA(json);
    getB(json);
    getC(json);
    getD(json);
    getE(json);
    getF(json);
    getG(json);
}

loadSite();