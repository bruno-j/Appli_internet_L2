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

  // TODO la checkbox "checkPause" réagit à l'événement "click"

  let alarmeElts = document.getElementsByClassName("alarme");
  abonnerAlarmeElt(alarmeElts[0]);

  let ajouterElt = document.getElementsByClassName("ajouter")[0];
  ajouterElt.addEventListener("click", ajouterAlarme);
}

function afficheHeure() {
  let date = new Date();
  console.log(date.toString());

  let h = 10;
  let hhmmss = h + ":" + h + ":" + h;
  let heureElt = document.getElementById("heure");
  heureElt.textContent = hhmmss;
  // TODO
}

function majHeure() {
  // TODO
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

  // TODO remplacer tout ça par une boucle !
  optionElt = document.createElement('option');
  optionElt.value = "0";
  optionElt.textContent = "00";
  selectElt.appendChild(optionElt);

  optionElt = document.createElement('option');
  optionElt.value = borneMax;
  optionElt.textContent = borneMax;
  selectElt.appendChild(optionElt);
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

  console.log("Alarme enclenchée ? " + checked);

  let parentNode = evenement.target.parentNode;
  let selectElts = parentNode.getElementsByTagName("select");
  let selectHeures = selectElts[0];

  if (checked) {
    let heures = selectHeures.options[selectHeures.selectedIndex].text;
    console.log("Heures : " + heures);

    let dateAlarme = new Date();
    // À modifier : règle l'alarme dans 5 secondes ! TODO
    dateAlarme.setSeconds(dateAlarme.getSeconds() + 5);
    console.log("Alarme réglée à : " + dateAlarme.toString());

    let dateCourante = new Date();
    let tempsRestant = dateAlarme - dateCourante;
    let timeoutId = setTimeout(function() {
      alert("BOUM ! BADABOUM !"); //TODO
    }, tempsRestant);

    // range le timeoutId dans la value de checkbox
    checkboxElt.value = timeoutId;

    // grise les champs
    selectHeures.disabled = true;
    // TODO

  } else {
    // Annule l'enclenchement de l'alarme !
    // TODO

    // dégrise les champs
    // TODO
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

  // désamorce l'éventuelle alarme
  // TODO

  // enleve ce div.alarme
  noeudDiv.remove();
}

function ajouterAlarme() {
  console.log("Ajoute une nouvelle alarme");

  // Clone le premier fils de #alarmes
  let alarmesElt = document.getElementById("alarmes");
  let nouvelleAlarmeElt = alarmesElt.children[0].cloneNode();

  // Recopier le contenu HTML (innerHTML) dans nouvelleAlarmeElt
  // TODO

  // dégrise les éléments éventuellement grisés
  // TODO

  alarmesElt.appendChild(nouvelleAlarmeElt);

  abonnerAlarmeElt(nouvelleAlarmeElt);
}
