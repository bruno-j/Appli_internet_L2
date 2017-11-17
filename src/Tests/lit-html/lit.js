
import {html, render} from "./node_modules/lit-html/lit-html.js";

const helloTemplate = (name) => html`<div>Hello ${name}!</div>`;
const helloTemplate2 = (name) => `<div>Hello ${name}!</div>`;

window.addEventListener("load", function() {
  init();

});

function init() {
  let appElt =  document.getElementById("app");
  render(helloTemplate('Steve'), appElt);
  appElt.innerHTML = helloTemplate2("Bruno");
  render2(helloTemplate2("Louise") + helloTemplate2("Élise"), appElt);
}

function render2(template, element) {
  element.innerHTML = template;
}
