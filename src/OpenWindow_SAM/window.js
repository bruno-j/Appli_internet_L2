
// --- Model ---
var model = {
  fenetre : null
};

model.present = (data) => {
  console.log("> model.present(data)");
  data = data || {};

  if (data.ouvre) {
    console.log(">>> ouvre la fenêtre");
    model.fenetre = 1;
  }

  if (data.ferme) {
    console.log(">>> ferme la fenêtre");
    model.fenetre = null;
  }

  state.render(model);
};

// --- View ---
var view = {};

view.ready = (model, intents) => {
  console.log("> view.ready(model, intents)");
  var bOuvre = document.getElementById("bOuvre");
  var bFerme = document.getElementById("bFerme");

  bOuvre.addEventListener("click", actions.ouvre);
  bFerme.addEventListener("click", actions.ferme);

  console.log("> -- "+model.fenetre);

  if (model.fenetre === null) {
    bOuvre.disabled = false;
    bFerme.disabled = true;
  } else {
    bOuvre.disabled = true;
    bFerme.disabled = false;
  }
};

view.display = (representation) => {
  console.log("> view.display(representation)");
};

// --- State ---
var state = { view: view };

state.render = (model) => {
  console.log("> state.render(model)");
  state.representation(model);
  state.nextAction(model);
 };

state.representation = (model) => {
  console.log("> state.representation(model)");

  var representation = "empty representation";

  if (state.ready(model)) {
    representation = state.view.ready(model, actions.intents);
  };

  state.view.display(representation);
};

state.nextAction = (model) => {
  console.log("> state.nextAction(model)");
};

state.ready = (model) => {
  console.log("> state.ready(model)");
  return true;
};

// --- Actions ---

var actions = {};

actions.present = model.present;

actions.intents = {
  ouvre: actions.ouvre,
  ferme: actions.ferme
};

actions.ouvre = (data) => {
  console.log("> actions.ouvre(data)");
  console.log("> -- data : ", data);

  data = {ouvre: true};
  model.present(data);
};

actions.ferme = (data) => {
  console.log("> actions.ferme(data)");

  data = {ferme: true};
  model.present(data);
};

// --- Init ---
(function (window) {

  state.render(model)

})(window);
