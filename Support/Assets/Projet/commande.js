console.log(articles);
console.log(tarifs);

window.addEventListener("load", function() {
  fabriqueInterfaceGraphique(articles, tarifs);
});

function fabriqueInterfaceGraphique(articles, tarifs) {

  let dirImages = "./images/";

  let poivronsElt = document.getElementsByClassName('article')[1];
  let poivronImgStyle = poivronsElt.getElementsByClassName('img')[0].style;
  let poivronPhoto = articles[1].photos[0];
  poivronImgStyle.backgroundImage = "url('" + dirImages + poivronPhoto.url + "')";
  poivronImgStyle.backgroundPositionX = -poivronPhoto.x + "px";
  poivronImgStyle.backgroundPositionY = -poivronPhoto.y + "px";
  poivronImgStyle.width = poivronPhoto.w + "px";
  poivronImgStyle.height = poivronPhoto.h + "px";

  let fraisesElt = document.getElementsByClassName('article')[2];
  let fraiseImgStyle = fraisesElt.getElementsByClassName('img')[0].style;
  let fraisePhoto = articles[5].photos[0];
  fraiseImgStyle.backgroundImage = "url('" + dirImages + fraisePhoto.url + "')";
  fraiseImgStyle.backgroundPositionX = -fraisePhoto.x + "px";
  fraiseImgStyle.backgroundPositionY = -fraisePhoto.y + "px";
  fraiseImgStyle.width = fraisePhoto.w + "px";
  fraiseImgStyle.height = fraisePhoto.h + "px";

}
