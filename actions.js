var genCon = new Array(5);
var eduCer = new Array();
var eduExp = new Array();
var lang = new Array();


lettersRegex = /^[A-Za-z\s]*$/;

// name must not be empty and must not include numbers name + saves the value - genCon[0]
function validateName() {
    var name = document.getElementById("name").value;
    if(name == "") {
        alert("Name must be filled")
        return false;
    }
    else if(name.match(lettersRegex)) {
        genCon[0] = name;
        return true
    }
    alert("Name must only include letters")
    return false;
}

//gets gender and saves the value - genCon[1]
function getGender() {
    if(!document.getElementById("gMale").checked && !document.getElementById("gFemale").checked) {
        alert("You must select your gender");
        return false;
    }
    else {
        if(document.getElementById("gMale").checked)
            genCon[1] = "male"
        else
            genCon[1] = "female"
        return true;
    }

}

// Date must not be in future + saves the value - genCon[2]
function validateDate() {
    var date = new Date().getFullYear();
    var bDate = document.getElementById("bDate");
    if(!bDate.value) {
        alert("please enter your birth date");
        return false;
    }
    else {
        bDate = new Date(bDate.value);
        if((date - bDate.getFullYear()) >= 18) {
            bDate = document.getElementById("bDate").value;
            genCon[2] = bDate;    
            return true;
        }
        alert("you're too young to make a CV");
        return false;
    }
    

}

// Email must be validated + save the value - genCon[3]
function validateEmail() {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var email = document.getElementById("email").value;
    if(email.match(validRegex)) {
        genCon[3] = email;
        return true;
    }
    alert("your email is not valid")
    return false;
}

// starts with 05 and has ten numbers + saves the value - genCon[4]
function validatePhone() {
    var validRegex = /^05[0-9]{8}/
    var num = document.getElementById("phone").value;
    if(num.match(validRegex)) {
        genCon[4] = num;
        return true;
    }
    alert("invalid phone number (05xxxxxxxx)");
    return false;

}

//adds new certificate textfield in HTML and adds it's value to an array eduCer[]
function addCertificate() {
    var id = document.getElementById("addCer");
    if(id) {
        eduCer.push(id.value);
    }
    var createText = "<input type='text' id='addCer' /> <br />";
    document.getElementById("c").innerHTML = createText;
}

//adds new experience textfield in HTML and adds it's value to an array eduExp[]
function addExperience() {
    var id = document.getElementById("addExp");
    if(id) {
        eduExp.push(id.value);
    }
    var createText = "<input type='text' id='addExp' /> <br />";
    document.getElementById("e").innerHTML = createText;
}

//split the text area string and creates array of languages lang[]
function addlanguage() {
    var id = document.getElementById("addLan");
    if(id) {
        lang.push(id.value);
    }
    var createText = "<input type='text' id='addLan' /> <br />";
    document.getElementById("l").innerHTML = createText;
}

//generates the CV with a new page 
function createCV() {
    validateName();
    getGender();
    validateDate();
    validateEmail();
    validatePhone();

    sessionStorage.setItem("info", JSON.stringify(genCon))
    sessionStorage.setItem("cer", JSON.stringify(eduCer))
    sessionStorage.setItem("exp", JSON.stringify(eduExp))
    sessionStorage.setItem("lan", JSON.stringify(lang))
    
    window.open("CV.html");

    
}

function makeCV() {
    var sessionString = sessionStorage.getItem("info");
    var arr = JSON.parse(sessionString);
    document.getElementById("CVname").innerHTML = arr[0];
    document.getElementById("gBD").innerHTML = arr[1] + " | " + arr[2];
    document.getElementById("pEmail").innerHTML = arr[3] + " | " + arr[4];
    

    sessionString = sessionStorage.getItem("cer");
    arr = JSON.parse(sessionString);

    var str = "<strong>Certificates</strong> <br /> "
    for (var key in arr) {
        if(arr[key] == null)
            break;
        str += arr[key] + "<br />";
    }
    document.getElementById("certificates").innerHTML = str;
    
    sessionString = sessionStorage.getItem("exp");
    arr = JSON.parse(sessionString);

    var str = "<strong>Experiences</strong> <br /> "
    for (var key in arr) {
        if(arr[key] == null)
            break;
        str += arr[key] + "<br />";
    }
    document.getElementById("experience").innerHTML = str;

    sessionString = sessionStorage.getItem("lan");
    arr = JSON.parse(sessionString);

    var str = "<strong>Languages</strong> <br /> "
    for (var key in arr) {
        if(arr[key] == null)
            break;
        str += arr[key] + "<br />";
    }
    document.getElementById("languages").innerHTML = str;
}


