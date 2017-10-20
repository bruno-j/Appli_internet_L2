"use strict";

let intervalID = null; // identifiant pour window.setInterval et clearInterval

// Initialisation de l'application une fois le document chargé
window.addEventListener("load", function() {

  afficheHeure();

  majHeure();  // lance la mise à jour régulière de l'heure

  abonnements(); // abonnenement aux événements

});

function abonnements() {

}

function afficheHeure() {
  let date = new Date();
  let hhmmss = date.toString();
  console.log(hhmmss);;
}

function majHeure() {
}
