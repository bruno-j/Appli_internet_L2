"use strict";

let intervalID = null; // identifiant pour window.setInterval

/**
* Initialisation de l'application une fois le document chargé
*/
window.addEventListener("load", function() {

  afficheHeure();

  majHeure();  // lance la mise à jour régulière de l'heure

  abonnements(); // abonnenement aux événements

});

/**
 * Abonnements aux événements
 */
function abonnements() {

  let checkPauseElt = document.getElementById("checkPause");
  checkPauseElt.addEventListener("click", majHeure);

}

/**
 * format2chiffres - Forme une chaine de caractères contenant deux chiffres
 * et éventuellement commençant par 0.
 * @param {number} n Un nombre positif d'un ou deux chiffres
 * @returns {string} La chaine de caractère formatée.
 */
function format2chiffres(n) {
  if (n < 10) {
    return "0" + n;
  } else {
    return "" + n;
  }
}

function afficheHeure() {
  const date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  hh = format2chiffres(hh);
  mm = format2chiffres(mm);
  ss = format2chiffres(ss);
  const hhmmss = hh + ":" + mm + ":" + ss;
  document.getElementById("heure").textContent = hhmmss;
}

function majHeure() {
  afficheHeure();
  let pauseElt = document.getElementById("checkPause");
  if (pauseElt.checked) {
    if(intervalID) window.clearInterval(intervalID);
  } else {
    intervalID = window.setInterval(afficheHeure, 1000);
  }
}
