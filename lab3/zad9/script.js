async function getJson() {
    try {
        var res = await fetch("pracownicy.json");
        var json = await res.json();
        return json;
    } catch (e) {
        console.log(e);
    }
    
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

async function loadSite() {
    var data = await getJson();
    data = data.pracownicy;
    var id = 0;
    var slide = document.querySelector(".slide");
    loadSlide(0, data);

    document.getElementById('left').addEventListener('click', function (e) {
        slide.style = "animation-name:leftOut;animation-duration:0.4s"
        id--;
        if (id < 0) {
            id += data.length;
        }
        setTimeout(() => {
            loadSlide(id % data.length, data);
            slide.style = "animation-name:rightIn;animation-duration:0.4s";
        }, 300);
    })

    document.getElementById('right').addEventListener('click', function (e) {
        slide.style = "animation-name:rightOut;animation-duration:0.4s";
        id++;
        setTimeout(() => {
            loadSlide(id % data.length, data);
            slide.style = "animation-name:leftIn;animation-duration:0.4s";
        }, 300);  
    })

    document.getElementById('random-photo-btn').addEventListener('click', function (e) {
        slide.style = "animation-name:rightOut;animation-duration:0.4s"
        id = Math.round(Math.random() * data.length);
        setTimeout(() => {
            loadSlide(id % data.length, data);
            slide.style = "animation-name:leftIn;animation-duration:0.4s";
        }, 300);
    })
}

loadSite();