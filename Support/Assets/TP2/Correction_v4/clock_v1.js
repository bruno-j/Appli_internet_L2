"use strict";

let intervalID = null; // identifiant pour window.setInterval et clearInterval

// Initialisation de l'application une fois le document chargé
window.addEventListener("load", function() {

  afficheHeure();

  majHeure();  // lance la mise à jour régulière de l'heure

  abonnements(); // abonnenement aux événements

});

function abonnements() {

  // la checkbox réagit à l'événement "click"

}

function afficheHeure() {
  let date = new Date();
  console.log(date.toString());

  let h = 10;
  let hhmmss = h+":"+h+":"+h;
  let heureElt = document.getElementById("heure");
  heureElt.textContent = hhmmss;
}

function majHeure() {
}
