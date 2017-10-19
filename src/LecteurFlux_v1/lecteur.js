"use strict";

let feedStruct = {
  title : "",
  link  : "",
  items : [ {title : "", link : "", description : ""} ],
};

let feed1 = {
  title : "Nom d'une couture",
  link  : "http://nomdunecouture.com/feed",
  items : [ {title : "", link : ""} ],
};
let feed2 = {
  title : "Couture Débutant",
  link  : "http://couturedebutant.fr/feed/",
  items : [],
};
let feed3 = {
  title : "Mouna le blog",
  link  : "https://www.mounaleblog.com/fr/feed/",
  items : [],
};

let feedApp = {
  feeds : [feed1, feed2, feed3],
  state : {
    feedIndex  : 0,
    itemIndex : 0,
  },
};


/**
* Initialisation de l'application une fois le document chargé
*/
window.addEventListener("load", function() {

  tests(); // faire des tests d'accès et de modification du DOM

  subscribeToEvent(); // abonnenement aux événements

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

  // sendTheAJAX();

  // let url =  "http://linuxfr.org/news.atom";
  // let xhr = createCORSRequest('GET', url);
  // if (!xhr) {
  //   throw new Error('CORS not supported');
  // }

}


function init() {

  // Fill interface with appData
  updateFeeds(feedApp.feeds)
}

function updateFeeds(feeds) {
  let ulElt = document.createElement("ul");

  feeds.forEach((feed, index) => {
    let liElt = document.createElement("li");
    liElt.setAttribute("name", index);
    liElt.textContent = feed.title;
    ulElt.appendChild(liElt);
  });

  // fill the list of feeds
  let feedsUlElt = document.querySelectorAll("aside.feeds ul")[0];
  feedsUlElt.innerHTML = ulElt.innerHTML;

  // subscribe ul items to click event
  for (let liElt of feedsUlElt.childNodes) {
    console.log(liElt.textContent);
    liElt.addEventListener("click", feedItemClicked);
  }
}

// Module CORS Everywhere pour Firefox :
// https://addons.mozilla.org/fr/firefox/addon/cors-everywhere/

function sendTheAJAX() {
var url = "http://linuxfr.org/news.atom";
var req = new XMLHttpRequest();

req.open("GET", url, true);

req.onerror = function() { console.log("Échec de chargement "+req.status+" "+url); };

req.onload  = function() {
    if (req.status === 200 || req.status === 304) {
      console.log(req.responseXML);
      document.getElementById('article_content').textContent = req.responseText;
  }};

req.send();
}

function requestFeed(url) {
  console.log("updateFeed",url);
  let req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.onerror = function() { console.log("Échec de chargement " + url); };
  req.onload  = function() {
      if (req.status === 200 || req.status === 304) {
        console.log(req.responseXML);
        // document.getElementById('article_content').textContent = req.responseText;
        feedLoaded(req.responseXML);
    } else {console.log(req.status);}
  };
  req.send();
}

/**
 * Abonnements aux événements
 */
function subscribeToEvent() {

  // let identifiantElt = document.getElementById("identifiant");
  // identifiantElt.addEventListener("blur", valideIdentifiant);

  let lis = document.querySelectorAll("aside.flux li");
  for (let li of lis) {
    console.log(li.textContent);
    li.addEventListener("click", feedItemClicked);
  }
  // identifiantElt.addEventListener("blur", valideIdentifiant);
}

function feedItemClicked() {
  feedApp.state.feedIndex = this.getAttribute("name");
  let url = feedApp.feeds[ feedApp.state.feedIndex ].link;
  console.log(url);
  requestFeed(url);
}

function feedLoaded(rssFeed) {
  let itemArray = [];
  let items = rssFeed.getElementsByTagName("item");
  for (let item of items) {
    let title = item.getElementsByTagName("title"      )[0].textContent
    let link  = item.getElementsByTagName("link"       )[0].textContent;
    let desc  = item.getElementsByTagName("description")[0].textContent;
    itemArray.push({"title" : title, "link" : link, "description" : desc});
  }
  feedApp.feeds[feedApp.state.feedIndex].items = itemArray;
  ui_updateTitles();
}

function ui_updateTitles() {
  let itemArray = feedApp.feeds[feedApp.state.feedIndex].items;
  let ulElt = document.createElement("ul");
  itemArray.forEach( (item, index) => {
    let liElt = document.createElement("li");
    liElt.textContent = item.title;
    liElt.setAttribute("name", index);
    ulElt.appendChild(liElt);
  });
  // replace "titres" ul list
  let titresUlElt = document.querySelectorAll("aside.titles ul")[0];
  titresUlElt.innerHTML = ulElt.innerHTML;

  // subscribe ul items to click event
  for (let liElt of titresUlElt.childNodes) {
    liElt.addEventListener("click", titleItemClicked);
    // console.log(liElt.textContent);
  }
}

function titleItemClicked() {
  feedApp.state.itemIndex = this.getAttribute("name");
  let titleItem = feedApp.feeds[feedApp.state.feedIndex].items[feedApp.state.itemIndex];
  // document.getElementById("article_frame").src = titleItem.link;
  document.getElementById("article_content").innerHTML = titleItem.description;
}
