function isValid(){
    return document.getElementById('name').checkValidity() && document.getElementById('phone').checkValidity();
}

function addEntry() {
    
    if(!isValid()){
        return;
    }

    var formData = new FormData(document.querySelector('form'))
    var name = formData.get('name');
    var phone = formData.get('phone');

    var section = document.createElement('section');
    var section_left = document.createElement('div');
    section_left.classList.add('section-left');

    var section_left_h3 = document.createElement('h3');
    section_left_h3.textContent = name;

    var section_left_p = document.createElement('p');
    section_left_p.textContent = phone;
    section_left.appendChild(section_left_h3);
    section_left.appendChild(section_left_p);
    section.appendChild(section_left);

    var section_right = document.createElement('div');
    var section_right_icon = document.createElement('i');
    section_right.classList.add('section-right');
    section_right_icon.classList.add('gg-trash');
    
    section_right.addEventListener('click',deleteEntry);
    section.appendChild(section_right);
    section_right.appendChild(section_right_icon);

    document.getElementById('entries').appendChild(section);
}

function deleteEntry(){
    var parent = document.getElementById('entries');
    var index = Array.from(parent.children).indexOf(this.parentNode);
    parent.removeChild(parent.children[index]);
}

document.getElementById('add').addEventListener("click", addEntry);