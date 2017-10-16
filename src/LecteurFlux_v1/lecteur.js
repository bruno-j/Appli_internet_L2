"use strict";

/**
* Initialisation de l'application une fois le document chargé
*/
window.addEventListener("load", function() {

  tests(); // faire des tests d'accès et de modification du DOM

  abonnements(); // abonnenement aux événements

  init();
});

/**
 * Bon endroit pour faire des tests d'accès et de modification du DOM.
 * Utile pour lors de la phase de développement.
 */
function tests() {

  // let elt = document.querySelector("h1");
  // console.log("Contenu du titre : " + elt.textContent);
  //
  // // Affichage de tous les champs accessible depuis un élément
  // console.log("Cliquez pour obtenir les détails sur l'élément : ", elt);
  //
  // // Modification d'un attribut de l'élément :
  // elt.style.color = "red";
}

/**
 * Abonnements aux événements
 */
function abonnements() {

  // let identifiantElt = document.getElementById("identifiant");
  // identifiantElt.addEventListener("blur", valideIdentifiant);

}

function init() {

  let elt = document.getElementById("article_frame");
  elt.src = "http://linuxfr.org/news/quelques-nouvelles-de-luneos";
}
