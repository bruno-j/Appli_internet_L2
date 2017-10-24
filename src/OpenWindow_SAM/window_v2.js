
// --- Model ---
var model = {
  fenetre : null
};

model.present = (data) => {
  console.log("> model.present(data)");
  data = data || {};

  // Make evolve model based on data

  

  state.render(model);
};

// --- View ---
var view = {};

view.ready = (model, intents) => {
  console.log("> view.ready(model,intents)");

  // Modify UI for this state

};

view.display = (representation) => {
  console.log("> view.display(representation)");

  // modify each component of the representation

};

// --- State ---
var state = {};

state.render = (model) => {
  console.log("> state.render(model)");
  state.representation(model);
  state.nextAction(model);
 };

state.representation = (model) => {
  console.log("> state.representation(model)");

  var representation = "empty representation";

  if (state.ready(model)) {
    representation = view.ready(model, actions.intents);
  };

  view.display(representation);
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
