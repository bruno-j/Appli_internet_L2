"use strict";

// Un tableau pour garder toutes les alarmes
let alarmesDeclenchees = [];

/**
* Initialisation de l'application une fois le document chargé
*/
window.addEventListener("load", function() {

  majHeure(); // faire des tests d'accès et de modification du DOM

  ajouterOptionsHeureMinutes(); // ajouter la liste déroulante des minutes et secondes

  abonnements(); // abonnenement aux événements d'alarme

});

/**
 * Abonnements aux événements
 */
function abonnements() {
  let ajouterAlarme = document.getElementById("ajouter");
  ajouterAlarme.addEventListener("click", ajouterLigne);

  abonnerAlarmes();
}

/**
 * Remplir le select des Heures et des minutes
 * @return {[type]} [description]
 */
function ajouterOptionsHeureMinutes(){
    // pour les heures
    ajouterOptions(23, 'selectHeure');

    // pour les minutes
    ajouterOptions(59, 'selectMinute');
}

/**
 * [ajouterOptions description]
 * @param  {[type]} max      [description]
 * @param  {[type]} selectId [description]
 * @return {[type]}          [description]
 */
function ajouterOptions(max, selectId){

    let selectElt = document.getElementById(selectId);

    // On va créer maintenant les noeuds options
    for ( let i = 0; i<=max; i++){
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i < 10 ? '0'+i : i;
        selectElt.appendChild(opt);
    }
}

/**
 * Fonction d'abonnement des alarmes
 * Elle se lance :
 *   - Au chargement de la page
 *   - A chaque ajout d'alarme
 * @return {[type]} [description]
 */
function abonnerAlarmes(){
    let alarmesElt = recupererAlarmes();

    for (let i = 0; i<alarmesElt.length ; i++){
        let alarmId = alarmesElt[i].getAttribute('id');
        let id = alarmesElt[i].getAttribute('id').slice(-1);

        let boutonSupprimer = alarmesElt[i].getElementsByTagName("button")[0];

        let checkboxElt = alarmesElt[i].getElementsByClassName("checkbox")[0];

        // On modifie l'id du bouton juste pour le fun
        let attId = document.createAttribute("id");
        attId.value = "supprimer" + id;
        boutonSupprimer.setAttributeNode(attId);

        // On met un id sur la checkbox
        let attId2 = document.createAttribute("id");
        attId2.value = "checkbox" + id ;
        checkboxElt.setAttributeNode(attId2);

        // On abonne un ecouteur pour virer cet élément
        boutonSupprimer.addEventListener("click", function(){
            supprimerAlarme(alarmId);
        });
        // On abonne aussi un event sur la checkbox
        checkboxElt.addEventListener('change', function(){
            // lancer l'alarme juste au cas où on passe à checked
            if ( checkboxElt.checked == true)
                declencherAlarme(attId2.value, alarmId);
            else
                retirerAlarme(alarmId);
        });
    }
}

/**
 * On va recuperer l'heure de l'alarme et l'heure courante
 * Et lancer un timeout qui va lancer l'alarme au terme de ce timeout
 * @param  {[type]} checkboxId [description] // pour desactiver après sonnerie
 * @param  {[type]} alarmId [description]
 * @return {[type]}            [description]
 */
function declencherAlarme(checkboxId, alarmId){
    // On recupère la ligne correspondant à l'alarme
    let alarmElt = document.getElementById("" + alarmId);

    //On recupère l'option selectionnée par le user
    let hourSelectElt = alarmElt.getElementsByClassName('heure')[0];
    let mmSelectElt = alarmElt.getElementsByClassName('minute')[0];

    // On recupère les valeurs pour l'heure
    let heure = parseInt(hourSelectElt.options[hourSelectElt.selectedIndex].value);
    let mm = parseInt(mmSelectElt.options[mmSelectElt.selectedIndex].value);

    // On recupère la date courante et la date définie
    let now = new Date();

    let alarme = new Date();
    alarme.setHours(heure);
    alarme.setMinutes(mm);
    alarme.setSeconds(0);

    // Si l'heure est passée paramétrer l'alarme pour le jour suivant
    if (format2chiffres(now.getHours()) > heure)
        alarme.setDate(alarme.getDate() + 1);

    // On va lancer l'alarme
    let timeOut = setTimeout(function(){
        lancerAlarme(alarmId)
    }, alarme - now);

    // On rajoute ce Time Out dans la liste
    alarmesDeclenchees[alarmId+''] = timeOut;
}

/**
 * [retirerAlarme description]
 * @param  {[type]} checkboxId [description]
 * @param  {[type]} alarmId    [description]
 * @return {[type]}            [description]
 */
function retirerAlarme (alarmId){
    console.log('On retire : ' + alarmesDeclenchees[alarmId+'']);
    clearTimeout(alarmesDeclenchees[alarmId+'']);
}

/**
 * [lancerAlarme description]
 * @param  {[type]} alarmId il permet de detecter le song à lancer à voir plutard
 * @return {[type]}         [description]
 */
function lancerAlarme(alarmId){
    // alert('Debout soulard !');
    playAlarme();
}

/**
 * Supprimer un element du DOM lorsque l'utilisateur clique sur un bouton
 * @param  {[type]} alarmId [description]
 * @return {[type]}         [description]
 */
function supprimerAlarme(alarmId){
    if (document.getElementsByClassName('alarm').length == 1){
        console.log('Vous ne pouvez pas me supprimer ;-) !');
        return ;
    }

    // on recupère le bloc contenant toutes les alarmes
    let alarmsElt = document.getElementById('alarmes');

    // On recupère l'alarme à supprimer
    let elt = document.getElementById(alarmId);

    // On élimine le listener avant de supprimer le noeud, attention fonction asynchrone donc pb à la console d'où le if
    if ( elt) {
        // On desabonne avant la suppression
        elt.removeEventListener("click", supprimerAlarme);

        // On regarde si un timeout existe et on le supprime
        if (alarmesDeclenchees[alarmId+''] != undefined)
            retirerAlarme(alarmId);

        // On retire complètemet le noeud
        alarmsElt.removeChild(elt);
    }

}

/**
 * Cette fonction rajoute une nouvelle alarme dans le DOM
 * @return {[type]} [description]
 */
function ajouterLigne(){

    // on recupère le bloc contenant toutes les alarmes
    let alarmsElt = document.getElementById('alarmes');

    // On recupère le dernier noeud sur l'arbre
    let last = recupererAlarmes()[recupererAlarmes().length-1];

    // On prend son index dans l'id
    let numero = isNaN(parseInt(last.getAttribute('id').slice(-1))) ?  1 : parseInt(last.getAttribute('id').slice(-1)) + 1;

    // On recupère la première alarme qui ne sera jamais éliminée
    let alarmElt = document.getElementById("alarme1");

    // On duplique le bloc associé
    let newAlarme = alarmElt.cloneNode(true);

    // On regarde si l'alarme est déclenchée auquel cas on la désactive
    newAlarme.getElementsByClassName('checkbox')[0].checked = false;

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
function recupererAlarmes(){
    return document.getElementsByClassName('alarm');
}

/**
 * format2chiffres - Forme une chaine de caractères contenant deux chiffres
 * et éventuellement commençant par 0.
 * @param {number} n Un nombre positif d'un ou deux chiffres
 * @returns {string} La chaine de caractère formatée.
 */
function format2chiffres(n) {
  if (n<10) {
    return "0"+n;
  } else {
    return ""+n;
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

/**
 * [playAlarme description]
 * @return {[type]} [description]
 */
function playAlarme(){
    let audio = document.getElementById("audio")
    audio.play();
}
