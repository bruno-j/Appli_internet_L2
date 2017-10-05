"use strict";

/**
* Initialisation de l'application une fois le document chargé
*/
window.addEventListener("load", function() {

  tests(); // faire des tests d'accès et de modification du DOM

  abonnements(); // abonnenement aux événements
});

/**
 * Bon endroit pour faire des tests d'accès et de modification du DOM.
 * Utile pour lors de la phase de développement.
 */
function tests() {

  let elt = document.querySelector("h1");
  console.log("Contenu du titre : " + elt.textContent);

  // Affichage de tous les champs accessible depuis un élément
  console.log("Cliquez pour obtenir les détails sur l'élément : ", elt);

  // Modification d'un attribut de l'élément :
  elt.style.color = "red";
}

/**
 * Abonnements aux événements
 */
function abonnements() {

  let identifiantElt = document.getElementById("identifiant");
  identifiantElt.addEventListener("blur", valideIdentifiant);

  let ageElt = document.getElementById("age");
  ageElt.addEventListener("blur", valideAge);

  let mdp1Elt = document.getElementById("password");
  mdp1Elt.addEventListener("blur", valideMotDePasse);

  let mdp2Elt = document.getElementById("password_confirm");
  mdp2Elt.addEventListener("blur", valideMotDePasseIdentiques);

  let caseElt = document.getElementById("subscribe");
  caseElt.addEventListener("change", valideCGUAcceptées);

  let submitElt = document.getElementById("submit");
  submitElt.addEventListener("click", valideSoumission);
}

/**
 * valideIdentifiant
 * affiche un message d'erreur si un l'identifiant n'est pas conforme
 */
function valideIdentifiant() {

  let élément = document.getElementById("identifiant");

  // vérification de la conformité de l'identifiant
  let ok = vérifieIdentifant(élément);

  // Cache ou affiche le message d'erreur
  let errorLabel = document.getElementById('identifiantError');
  if (ok === true) {
    errorLabel.style.display = 'none'; // on cache le messsage d'erreur
  } else {
    errorLabel.style.display = 'block'; // on le révèle
  }
  return ok;
}

/**
 * Vérifie si l'idenfiant est composé d'au moins 12 lettres
 * minuscules ou majuscules
 * @return {boolean} vrai si l'identifiant est conforme.
 */
function vérifieIdentifant(élément) {
  let val = élément.value;
  let ok = true;

  // utilisation de la fonction test des expressions rationnelles :
  // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/RegExp/test
  ok = /^[a-zA-Z]{12,}$/.test(val);

  // retourne la valeur de ok pour faire savoir l'état de la vérification
  return ok;
}

/**
 * valideAge
 * affiche un message d'erreur si un l'age n'est pas conforme
 */
function valideAge() {

  let élément = document.getElementById("age");

  // vérification de la conformité de l'age
  let ok = vérifieAge(élément);

  // Cache ou affiche le message d'erreur
  let errorLabel = document.getElementById('ageError');
  if (ok === true) {
    errorLabel.style.display = 'none'; // on cache le messsage d'erreur
  } else {
    errorLabel.style.display = 'block'; // on le révèle
  }
  return ok;
}

/**
 * Vérifie si l'age est supérieur à 18 ans
 * @return {boolean} vrai si l'age est conforme.
 */
function vérifieAge(élément) {
  let val = élément.value;
  let ok = true;

  // alert("Vérification de l'age à programmer...");
  // ok = false;

  let age = parseInt(val);

  if (isNaN(age)) { // tester avec "vingt ans"
    ok = false;
  }

  if (age < 18) {
    ok = false;
  }

  return ok;
}

/**
 * valideMotDePasse
 * @return {boolean} [description]
 */
function valideMotDePasse() {
  let mdp = document.getElementById('password').value;
  let force = 0;

  force += vérifieMotDePasseLongueur(mdp);
  force += vérifieMotDePasseMinuscule(mdp);
  force += vérifieMotDePasseMajuscule(mdp);
  force += vérifieMotDePasseChiffre(mdp);
  force += vérifieMotDePasseAutreCaractère(mdp);

  var barre = document.getElementById("myBar");
  barre.style.width = force + '%';

  let errorLabel = document.getElementById('passError');
  if (force === 100) {
    errorLabel.style.display = 'none';
  } else {
    errorLabel.style.display = 'block';
  }

  return force === 100;
}

function vérifieMotDePasseLongueur(mdp) {
  return (mdp.length >= 8)
    ? 20
    : 1;
}

function vérifieMotDePasseMinuscule(mdp) {
  return (/[a-z]/.test(mdp))
    ? 20
    : 1;
}

function vérifieMotDePasseMajuscule(mdp) {
  return (/[A-Z]/.test(mdp))
    ? 20
    : 1;
}

function vérifieMotDePasseChiffre(mdp) {
  return (/[0-9]/.test(mdp))
    ? 20
    : 1;
}

function vérifieMotDePasseAutreCaractère(mdp) {
  return (/[^a-zA-Z0-9]/.test(mdp))
    ? 20
    : 1;
}

function valideMotDePasseIdentiques() {
  let mdp1 = document.getElementById('password').value;
  let mdp2 = document.getElementById('password_confirm').value;

  let ok = vérifieMotsDePasseIdentiques(mdp1, mdp2);

  let errorLabel = document.getElementById('passConfirmError');
  if (ok) {
    errorLabel.style.display = 'none'
  } else {
    errorLabel.style.display = 'block';
  }
  return ok;
}

/**
 * Vérifie si les deux mots de passe sont identiques
 * @return {boolean} [description]
 */
function vérifieMotsDePasseIdentiques(mdp1, mdp2) {

  if (mdp1 === "" || mdp2 === "") {
    return false;
  }

  return mdp1 === mdp2;
}


function valideCGUAcceptées() {
  let caseCGU = document.getElementById('subscribe');

  let ok = vérifieCaseCGU(caseCGU);

  let errorLabel = document.getElementById('CGUError');
  if (ok) {
    errorLabel.style.display = 'none'
  } else {
    errorLabel.style.display = 'block';
  }
  return ok;
}

/**
 * Vérifie si la case des CGU est cochée
 * @return {boolean} Vrai si case cochée
 */
function vérifieCaseCGU(caseCGU) {
  return caseCGU.checked;
}

function valideSoumission() {
  let ok = true;
  ok &= valideIdentifiant();
  ok &= valideAge();
  ok &= valideMotDePasse();
  ok &= valideMotDePasseIdentiques();
  ok &= valideCGUAcceptées();

  return ok;
}
