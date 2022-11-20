
function changeVisibility(field_id,icon_id) {
    var field = document.getElementById(field_id);
    let type = field.type;

    if (type == 'text') {
        document.getElementById(icon_id).classList.remove('fa-eye');
        document.getElementById(icon_id).classList.add('fa-eye-slash');
        field.type = 'password';
    }
    else if (type === 'password') {
        document.getElementById(icon_id).classList.remove('fa-eye-slash');
        document.getElementById(icon_id).classList.add('fa-eye');
        field.type = 'text';
    }
}

function checkByPattern(currPass, pattern, req_num) {
    if (currPass.match(pattern)) {
        document.getElementById(req_num).classList.remove('gg-close-o');
        document.getElementById(req_num).classList.add('gg-check-o');
    }
    else {
        document.getElementById(req_num).classList.remove('gg-check-o');
        document.getElementById(req_num).classList.add('gg-close-o');
    }
}

function checkPassword() {
    var currPass = document.getElementById('pass').value;
    var capitalLetter = /[A-Z]/g;
    var digit = /[0-9]/g;
    var specialChar = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/g;

    if (currPass.length >= 8) {
        document.getElementById('req1').classList.remove('gg-close-o');
        document.getElementById('req1').classList.add('gg-check-o');
    }
    else {
        document.getElementById('req1').classList.remove('gg-check-o');
        document.getElementById('req1').classList.add('gg-close-o');
    }

    checkByPattern(currPass,specialChar, 'req2');
    checkByPattern(currPass,capitalLetter, 'req3');
    checkByPattern(currPass, digit, 'req4');

}

function comparePasswords() {
    var pass = document.getElementById('pass').value;
    var rep_pass = document.getElementById('rep-pass').value;

    if (pass === rep_pass) {
        return true;
    }
    return false;
}

document.getElementById('pass-eye').onclick = function () {
    changeVisibility('pass', 'pass-eye');
}

document.getElementById('rep-pass-eye').onclick = function () {
    changeVisibility('rep-pass', 'rep-pass-eye');
}

var compare_pass = false;

document.getElementById('pass').onkeyup = checkPassword;

window.addEventListener("keyup", function (e) {
    e.preventDefault();
    compare_pass = comparePasswords();
    if (e.key === 'Enter') {
        if (!compare_pass) {
            document.getElementById('alert').style.color = "red";
            document.getElementById('alert').textContent = "Password's are not the same!"
        }
        else {
            document.getElementById('alert').style.color = "green";
            document.getElementById('alert').textContent = "Your password has changed succesfully!";
        }
    }
})