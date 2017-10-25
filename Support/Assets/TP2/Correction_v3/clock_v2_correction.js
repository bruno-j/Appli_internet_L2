"use strict";

let intervalID = null; // identifiant pour window.setInterval

/**
* Initialisation de l'application une fois le document chargé
*/
window.addEventListener("load", function() {

  afficheHeure();
  majHeure(); // lance la mise à jour régulière de l'heure
  remplirSelectsHeuresMinutes(); // ajouter la liste déroulante des heures et minutes
  abonnements(); // abonnenement aux événements
});

/**
 * Abonnements aux événements
 */
function abonnements() {

  let checkPauseElt = document.getElementById("checkPause");
  checkPauseElt.addEventListener("click", majHeure);

  let alarmeElts = document.getElementsByClassName("alarme");
  abonnerAlarmeElt(alarmeElts[0]);

  let ajouterElt = document.getElementsByClassName("ajouter")[0];
  ajouterElt.addEventListener("click", ajouterAlarme);
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
    if (intervalID)
      window.clearInterval(intervalID);
    }
  else {
    intervalID = window.setInterval(afficheHeure, 1000);
  }
}

/**
 * Remplir le select des Heures et des minutes
 */
function remplirSelectsHeuresMinutes() {
  // récupérer les deux selects de alarme
  let alarmeElts = document.getElementsByClassName("alarme");
  let selectElts = alarmeElts[0].getElementsByTagName("select");

  // ajouter les heures 0 à 23 au premier select
  ajouterOptionsAuSelect(23, selectElts[0]);

  // ajouter les minutes 0 à 59 au deuxième select
  ajouterOptionsAuSelect(59, selectElts[1]);
}

/**
 * ajoute des options numériques à un champ select
 * @param  {number} borneMax    ajoute les options 0 à borneMax
 * @param  {Object} selectElt   element select concerné
 */
function ajouterOptionsAuSelect(borneMax, selectElt) {

  // création des noeuds option
  let optionElt = null;

  // optionElt = document.createElement('option');
  // optionElt.value = "0";
  // optionElt.textContent = "00";
  // selectElt.appendChild(optionElt);
  //
  // optionElt = document.createElement('option');
  // optionElt.value = borneMax;
  // optionElt.textContent = borneMax;
  // selectElt.appendChild(optionElt);

  for (let i = 0; i <= borneMax; i++) {
    optionElt = document.createElement('option');
    // optionElt.value = i;
    optionElt.textContent = i < 10
      ? '0' + i
      : i;
    selectElt.appendChild(optionElt);
  }
}

/**
 * abonnerAlarmeElt - Réagir aux événements sur la checkbox et
 *                    le bouton "Enlever alarme" d'une alarme
 * @param {Object} alarmElt un élément div.alarme et son contenu
 *
 */
function abonnerAlarmeElt(alarmElt) {

  let checkboxElt = alarmElt.getElementsByTagName("input")[0];
  checkboxElt.addEventListener("click", enclencherAlarme);

  let boutonElt = alarmElt.getElementsByTagName("button")[0];
  boutonElt.addEventListener("click", enleverAlarme);
}

function enclencherAlarme(evenement) {

  let checkboxElt = evenement.target;
  let checked = checkboxElt.checked;

  console.log(checked);

  let parentNode = evenement.target.parentNode;
  let descriptionElt = parentNode.getElementsByTagName("input")[1];
  let selectElts = parentNode.getElementsByTagName("select");
  let selectHeures = selectElts[0];
  let selectMinutes = selectElts[1];

  if (checked) {
    let heures = selectHeures.options[selectHeures.selectedIndex].text;
    let minutes = selectMinutes.options[selectMinutes.selectedIndex].text;
    // console.log(heures+":"+minutes);
    // console.log(description);

    let dateAlarme = new Date();
    dateAlarme.setHours(heures);
    dateAlarme.setMinutes(minutes);
    dateAlarme.setSeconds(0);

    let dateCourante = new Date();
    if (dateAlarme < dateCourante) {
      dateAlarme.setDate(dateAlarme.getDate() + 1);
    }
    console.log(dateAlarme.toString());

    let tempsRestant = dateAlarme - dateCourante;
    let timeoutId = setTimeout(function() {
      alert(descriptionElt.value);
    }, tempsRestant);
    checkboxElt.value = timeoutId;
    selectHeures.disabled = true;
    selectMinutes.disabled = true;
    descriptionElt.disabled = true;
  } else {
    clearTimeout(checkboxElt.value);
    selectHeures.disabled = false;
    selectMinutes.disabled = false;
    descriptionElt.disabled = false;
  }
}

/**
 * enleverAlarme - Enlève le div.alarme contenant le bouton cliqué
 *                 mais seulement s'il reste plusieurs alarmes
 *
 * @param {Object} evenement l'événement qui a appelé cette fonction
 *
 */
function enleverAlarme(evenement) {

  let noeudDiv = evenement.target.parentNode;

  console.log("On veut supprimer ce ", noeudDiv);
  console.log("Il y a " + noeudDiv.parentNode.children.length + " alarme(s)");

  if (noeudDiv.parentNode.children.length > 1) {

    // désamorce l'éventuelle alarme
    let checkboxElt = noeudDiv.getElementsByTagName("input")[0];
    clearTimeout(checkboxElt.value);

    noeudDiv.remove();
  }
}

function ajouterAlarme() {
  console.log("Ajouter une nouvelle alarme");
  let alarmesElt = document.getElementById("alarmes");
  let nouvelleAlarmeElt = alarmesElt.children[0].cloneNode();
  nouvelleAlarmeElt.innerHTML = alarmesElt.children[0].innerHTML;

  // dégrise les éléments éventuellement grisés
  let children = Array.from(nouvelleAlarmeElt.children);
  children.forEach((element) => {
    element.disabled = false;
  });

  alarmesElt.appendChild(nouvelleAlarmeElt);

  abonnerAlarmeElt(nouvelleAlarmeElt);
}
