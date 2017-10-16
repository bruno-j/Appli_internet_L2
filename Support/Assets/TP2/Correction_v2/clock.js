"use strict";

/**
* Initialisation de l'application une fois le document chargé
*/
window.addEventListener("load", function() {

  majHeure(); // faire des tests d'accès et de modification du DOM

  abonnements(); // abonnenement aux événements d'alarme

  tests();

});

function tests() {
  let timeAlarmString = "23:12:13";
  if (/^(([01][0-9])|(2[0-3])):[0-5][0-9]:[0-5][0-9]$/.test(timeAlarmString)) {
    let timeAlarmArray = timeAlarmString.split(':');
    console.log(timeAlarmArray);

    let timeAlarm = new Date();
    timeAlarm.setHours(timeAlarmArray[0], timeAlarmArray[1], timeAlarmArray[2]);
    console.log(timeAlarm.toString());

    let timeCurrentString = document.getElementById("heure").textContent;
    let timeCurrentArray = timeCurrentString.split(':');
    console.log(timeCurrentArray);

    let timeCurrent = new Date();
    timeCurrent.setHours(timeCurrentArray[0], timeCurrentArray[1], timeCurrentArray[2]);
    console.log("timeCurrent : " + timeCurrent.toString());

    if (timeCurrent - timeAlarm > 0) {
      console.log("toto");
      let t = timeAlarm;
      timeAlarm = new Date(t.getFullYear(), t.getMonth(), t.getDate() + 1, t.getHours(), t.getMinutes(), t.getSeconds());
    }

    console.log(timeAlarm.toString());


  } else {
    console.log("format incorrect");
  }

}

/**
 * Abonnements aux événements
 */
function abonnements() {
  let ajouterAlarme = document.getElementById("ajouter");
  ajouterAlarme.addEventListener("click", ajouterLigne);

  abonnerAlarmes();

}

/**
 * Fonction d'abonnement des alarmes
 * Elle se lance :
 *   - Au chargement de la page
 *   - A chaque ajout d'alarme
 * @return {[type]} [description]
 */
function abonnerAlarmes() {
  let alarmesElt = recupererAlarmes();

  for (let i = 0; i < alarmesElt.length; i++) {
    let alarmId = alarmesElt[i].getAttribute('id');
    let id = alarmesElt[i].getAttribute('id').slice(-1);

    let boutonSupprimer = alarmesElt[i].getElementsByTagName("button")[0];

    // On modifie l'id du bouton juste pour le fun
    let attId = document.createAttribute("id");
    attId.value = "supprimer" + id;
    boutonSupprimer.setAttributeNode(attId);

    // On abonne un ecouteur pour virer cet élément
    boutonSupprimer.addEventListener("click", function() {
      supprimerAlarme(alarmId);
    });
  }
}

/**
 * Supprimer un element du DOM lorsque l'utilisateur clique sur un bouton
 * @param  {[type]} alarmId [description]
 * @return {[type]}         [description]
 */
function supprimerAlarme(alarmId) {
  // console.log("On va supprimer : " + alarmId);

  // on recupère le bloc contenant toutes les alarmes
  let alarmsElt = document.getElementById('alarmes');

  // On recupère l'alarme à supprimer
  let elt = document.getElementById(alarmId);

  // On élimine le listener avant de supprimer le noeud, attention fonction asynchrone donc pb à la console d'où le if
  if (elt) {
    // On desabonne avant la suppression
    elt.removeEventListener("click", supprimerAlarme);

    alarmsElt.removeChild(elt);
  }

}

/**
 * Cette fonction rajoute une nouvelle alarme dans le DOM
 * @return {[type]} [description]
 */
function ajouterLigne() {

  // on recupère le bloc contenant toutes les alarmes
  let alarmsElt = document.getElementById('alarmes');

  // On recupère le dernier noeud sur l'arbre
  let last = recupererAlarmes()[recupererAlarmes().length - 1];

  // On prend son index dans l'id
  let numero = isNaN(parseInt(last.getAttribute('id').slice(-1)))
    ? 1
    : parseInt(last.getAttribute('id').slice(-1)) + 1;

  // On recupère la première alarme qui ne sera jamais éliminée
  let alarmElt = document.getElementById("alarme1");

  // On duplique le bloc associé
  let newAlarme = alarmElt.cloneNode(true);

  // On modifie l'attribut
  let attId = document.createAttribute("id");
  attId.value = "alarme" + numero;
  newAlarme.setAttributeNode(attId);

  // On remet cet attribut dans la liste
  alarmsElt.appendChild(newAlarme);

  abonnerAlarmes();
}

/**
 * Recuperer toutes les alarmes crées
 * Elles ont toutes la classe 'alarm'
 * On aura en sortie une NodeList du dom
 * @return {[type]} [description]
 */
function recupererAlarmes() {
  return document.getElementsByClassName('alarm');
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

/**
 * afficheHeure - Description
 *
 * @returns {type} Description
 */
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
  //window.setTimeout(afficheHeure, 1000);
}

/**
 * majHeure - Description
 *
 * @returns {type} Description
 */
function majHeure() {
  window.setInterval(afficheHeure, 1000);
}

function playAlarme() {
  let audio = document.getElementById("audio")
  audio.loop = true;
}
