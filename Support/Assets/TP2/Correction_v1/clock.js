

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
window.addEventListener("load", majHeure());
