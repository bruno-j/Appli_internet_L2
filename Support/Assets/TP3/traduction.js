var traductionsLocales = null;

window.addEventListener("load", function() {

  abonnements();

  chargerTraductionsLocales();
});

function abonnements() {
  let submitElt = document.getElementById("bouton");
  submitElt.addEventListener("click", traduire);
}

function chargerTraductionsLocales() {

  if (localStorage.getItem('traductions') === null) {
    traductionsLocales = [];
  } else {
    traductionsLocales = JSON.parse(localStorage.getItem('traductions'));
    for (let i = 0; i < traductionsLocales.length; i++) {
      console.log(traductionsLocales[i]);
    }
  }
}

function traduire() {
  let expression = document.getElementById("expression").value;
  let langSrc = "fr";
  let langDst = "en"

  appelGoogleTraduction(expression, langSrc, langDst);
}

function appelGoogleTraduction(expression, langueSource, langueDestination) {

  var url = "https://translate.googleapis.com/translate_a/single?client=gtx";
  url += "&sl=" + langueSource;
  url += "&tl=" + langueDestination;
  url += "&dt=t";
  url += "&q=" + escape(expression);

  var requete = new XMLHttpRequest();

  requete.open("GET", url, true);

  requete.onerror = function() {
    console.log("Échec de chargement " + url);
  };

  requete.onload = function() {
    if (requete.status === 200 || requete.status === 304) {
      let responseJSON = JSON.parse(requete.responseText);
      let expressionTraduite = responseJSON[0][0][0];

      stockerLocalement(langueSource, expression, langueDestination, expressionTraduite);

      afficherTraduction(expressionTraduite);
    };
  };

  requete.send();
}

function stockerLocalement(langSrc, expression, langDst, exprTraduite) {

  let traduction = {
    'lsrc': langSrc,
    'expr': expression,
    'ldst': langDst,
    'trad': exprTraduite
  };

  traductionsLocales.push(traduction);

  localStorage.setItem('traductions', JSON.stringify(traductionsLocales));
}

function afficherTraduction(exprTraduite) {
  document.getElementById("expressionTraduite").textContent = exprTraduite;
}
