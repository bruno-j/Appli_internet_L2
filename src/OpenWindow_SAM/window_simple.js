
var fenetre = null;

// --- Init ---
(function (window) {

  var bOuvre = document.getElementById("bOuvre");
  var bFerme = document.getElementById("bFerme");

  bOuvre.addEventListener("click", ouvre);
  bFerme.addEventListener("click", ferme);

  bOuvre.disabled = false;
  bFerme.disabled = true;

})(window);



function ouvre() {
  if (!fenetre) {
    fenetre = 1;
    console.log("On ouvre la fenêtre");
    document.getElementById("bOuvre").disabled=true;
    document.getElementById("bFerme").disabled=false;
  }
}

function ferme() {
  if (fenetre) {
    fenetre = null;
    console.log("On ferme la fenêtre");
    document.getElementById("bOuvre").disabled=false;
    document.getElementById("bFerme").disabled=true;
  }
}
