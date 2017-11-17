window.addEventListener("load", function() {
  init();

  window.location.hash = "#tutu";
  window.location.hash = "#tata";


});

function init() {
  // window.addEventListener("hashchange", function(event) {
  //   console.log(event.newURL);
  // });
  window.addEventListener("hashchange", router);
}

function router(event) {
  // let route = event.newURL.split("#")[1];
  // console.log(route);
  console.log(window.location.hash.substr(1));
}

let html =
  <p>C'est <b>Fou !</b>.</p>;

console.log(html);
