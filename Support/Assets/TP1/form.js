window.onload = main;

function init() {
  let elt = document.querySelector("h1");
  elt.style.color = "red";

  /*
  var str = elt.style.color;
  console.log("Couleur " + str);*/

  // Griser le button
  // document.getElementById('submit').disabled = true;

  // Recuprer le contenu du bouton de soumission
  // console.log(document.getElementById('submit').textContent)
}

function main() {
  init();
}

/**
 * Check if the age is conformed
 * @return {[type]} [description]
 */
function checkAge() {
    var age_elt = document.getElementById('age').value;
    if (age_elt==="")
        return false;

    var age = parseInt(age_elt);

    if ( isNaN(age))
        return false;

    if (age < 18)
        return false;

    return true;
}

/**
 * check if the identifer is conformed
 * @return {[type]} [description]
 */
function checkIdentifier(){
    var identifiant_elt = document.getElementById('identifiant').value;

    if (identifiant_elt === "")
        return false;

    if ( identifiant_elt.length < 12)
        return false;

    return /^[a-zA-Z]+$/.test(identifiant_elt);
}

/**
 * check if the two password are same
 * @return {[type]} [description]
 */
function checkPasswordIdentity() {
    var password = document.getElementById('password').value;
    var password_confirm = document.getElementById('password_confirm').value;

    if ( password === "" || password_confirm === "")
        return false;

    return password === password_confirm;
}

/**
 * check if the GCU is checked
 * @return {[type]} [description]
 */
function checkCGUBox(){
    return document.getElementById('subscribe').checked;
}


function passwordChange(){
    var pass = document.getElementById('password').value;
    if ( !cond1 && pass.length > 8){
        console.log("Pass contains lest than 8 characters");
        barLevel += 20;
        cond1 = true;
    }

    if ( !cond2 && /[a-z]/.test(pass)){
        console.log("Pass contains small character");
        barLevel += 20;
        cond2 = true;
    }

    if ( !cond3 && /[A-Z]/.test(pass)){
        console.log("Pass contains large character");
        barLevel += 20;
        cond3 = true;
    }

    if ( !cond4 && /[0-9]/.test(pass)){
        console.log("Pass contains digit");
        barLevel += 20;
        cond4 = true;
    }

    if ( !cond5 && pass.match(/[^A-Za-z0-9]/)){
        console.log("Pass contains not leter or digit");
        barLevel += 20;
        cond5 = true;
    }

    moveBar();

    if ( barLevel === 100){
        document.getElementById('passError').style.display = 'none'
    }
}

function identifiantChange(){
    if ( checkIdentifier()) {
        document.getElementById('identifiantError').style.display = 'none'
    }
}

function ageChange(){
    if ( checkAge()) {
        document.getElementById('ageError').style.display = 'none'
    }
}

function passwordConfChange() {
    if ( checkPasswordIdentity()) {
        document.getElementById('passConfirmError').style.display = 'none'
    }
}

function CGUChange() {
    if ( checkCGUBox()) {
        document.getElementById('CGUError').style.display = 'none'
    }
}

function moveBar(){
    var elem = document.getElementById("myBar");
    elem.style.width = barLevel + '%';

}

function clickHere() {
    // console.log("Vous avez cliqué ici !");
    // alert("Vous avez cliqué ici !");
    // console.log("Age is conformed ? " + checkAge());
    // console.log("Identifiant is conformed ? " + checkIdentifier());
    // console.log("Password identity ? " + checkPasswordIdentity());
    // console.log("CGU Checked ? " + checkCGUBox());

    if ( !checkAge()){
        document.getElementById('ageError').style.display = 'inline'
    }

    if ( !checkIdentifier()) {
        document.getElementById('identifiantError').style.display = 'inline'
    }

    if ( barLevel < 100){
        document.getElementById('passError').style.display = 'inline'
    }

    if ( !checkPasswordIdentity()) {
        document.getElementById('passConfirmError').style.display = 'inline'
    }

    if ( !checkCGUBox()) {
        document.getElementById('CGUError').style.display = 'inline'
    }

}
