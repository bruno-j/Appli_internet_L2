////////////////////////////////////////////////////////////////////////////////
// Model
//
const COUNTER_MAX = 10;

var model = {
  counter: COUNTER_MAX,
  started: false,
  launched: false,
  aborted: false
};

model.present = function(data) {

  if (state.counting(model)) {
    if (model.counter === 0) {
      model.launched = data.launched || false;
    } else {
      model.aborted = data.aborted || false;
      if (data.counter !== undefined) {
        model.counter = data.counter;
      }
    }
  } else {
    if (state.ready(model)) {
      model.started = data.started || false;
    }
  }
  state.render(model);
}

////////////////////////////////////////////////////////////////////////////////
// View
//
var view = {};

// Initial state representation
view.init = function(model) {
  let representation = view.ready(model);
  return representation;
}

// State representation of the ready state
view.ready = function(model) {

  let representation = `
    <p>Counter : ${model.counter}</p>
    <input type="button" value="Start" onClick="actions.start({})">`;

  return representation;
}

// State representation of the counting state
view.counting = function(model) {

  let representation = `
    <p>Count down: ${model.counter} </p>
		<input type="button" value="Abort" onClick="actions.abort({})">`;

  return representation;
}

// State representation of the aborted state
view.aborted = function(model) {

  let representation = `
    <p>Aborted at Counter: ${model.counter}</p>
    <input type="button" value="continue" onClick="actions.continue({})">`;

  return representation;
}

// State representation of the launched state
view.launched = function(model) {

  let representation = `<p>Launched</p>`;

  return representation;
}

//display the state representation
view.display = function(representation) {
  let stateRepresentation = document.getElementById("representation");
  stateRepresentation.innerHTML = representation;
}

// Display initial state
view.display(view.init(model));

////////////////////////////////////////////////////////////////////////////////
// State
//
var state = {
  view: view
};

model.state = state;

// Derive the state representation as a function of the systen
// control state
state.representation = function(model) {
  var representation = 'oops... something went wrong, the system is in an invalid state';

  if (state.ready(model)) {
    representation = state.view.ready(model);
  }

  if (state.counting(model)) {
    representation = state.view.counting(model);
  }

  if (state.launched(model)) {
    representation = state.view.launched(model);
  }

  if (state.aborted(model)) {
    representation = state.view.aborted(model);
  }

  state.view.display(representation);
}

// Derive the current state of the system
state.ready = function(model) {
  return ((model.counter === COUNTER_MAX) && !model.started && !model.launched && !model.aborted);
}

state.counting = function(model) {
  var status = ((model.counter <= COUNTER_MAX) && (model.counter >= 0) && model.started && !model.launched && !model.aborted);
  return status;
}

state.launched = function(model) {
  return ((model.counter == 0) && model.started && model.launched && !model.aborted);
}

state.aborted = function(model) {
  return ((model.counter <= COUNTER_MAX) && (model.counter >= 0) && model.started && !model.launched && model.aborted);
}

// Next action predicate, derives whether
// the system is in a (control) state where
// an action needs to be invoked

state.nextAction = function(model) {
  if (state.counting(model)) {
    if (model.counter > 0) {
      actions.decrement({
        counter: model.counter
      }, model.present);
    }

    if (model.counter === 0) {
      actions.launch({}, model.present);
    }
  }
}

state.render = function(model) {
  state.representation(model)
  state.nextAction(model);
}

////////////////////////////////////////////////////////////////////////////////
// Actions
//

var actions = {};

actions.start = function(data, present) {
  present = present || model.present;
  data.started = true;
  present(data);
  return false;
}

actions.decrement = function(data, present) {
  present = present || model.present;
  data = data || {};
  data.counter = data.counter || 10;
  var d = data;
  var p = present;
  setTimeout(function() {
    d.counter = d.counter - 1;
    p(d);
  }, 1000);
}

actions.launch = function(data, present) {
  present = present || model.present;
  data.launched = true;
  present(data);
}

actions.abort = function(data, present) {
  present = present || model.present;
  data.aborted = true;
  present(data);
  return false;
}

actions.continue = function(data, present) {
  present = present || model.present;
  data.started = true;
  data.arborted = false;
  console.log(data);
  present(data);
}
