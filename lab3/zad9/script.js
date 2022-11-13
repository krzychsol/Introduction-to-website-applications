async function getJson() {
    var res = await fetch("pracownicy.json");
    var json = await res.json();
    return json;
}

function loadSlide(id, data) {
    var nameObj = document.getElementById('name');
    var titleObj = document.getElementById('title');
    var contentObj = document.getElementById('content');
    var imgObj = document.getElementById('img');

    var name = data[id].name;
    var title = data[id].title;
    var content = data[id].description;
    var img = data[id].img;

    nameObj.textContent = name;
    titleObj.textContent = title;
    contentObj.textContent = content;
    imgObj.srcset = "data/" + img;
}

var id = 0;

async function loadSite() {
    var data = await getJson();
    data = data.pracownicy;
    loadSlide(0, data);

    document.getElementById('left').addEventListener('click', function (e) {
        id--;
        loadSlide(id % data.length, data);
    })

    document.getElementById('right').addEventListener('click', function (e) {
        id++;
        loadSlide(id % data.length, data);
    })

    document.getElementById('random-photo-btn').addEventListener('click', function (e) {
        id = Math.round(Math.random() * data.length);
        loadSlide(id % data.length, data);
    })
}

loadSite();