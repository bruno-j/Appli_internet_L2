

var model = {
  id: 'rocketLaunch',
  states: [
    {
      id: 'ready',
      transitions: [
        {
          target: 'counting',
          event: 'click'
        }
      ]
    }, {
      id: 'counting',
      onEntry: function(event) {actions.counting(event)},
      transitions: [
        {
          target: 'aborted',
          event: 'abortClick'
        }, {
          target: 'launched',
          event: 'timerEnd'
        }
      ]
    }, {
      id: 'aborted',
      transitions: [
        {
          target: 'ready',
          event: 'restartClick'
        }
      ]
    }, {
      id: 'launched',
      transitions: [
        {
          target: 'ready',
          event: 'restartClick'
        }
      ]
    }
  ]
};

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

////////////////////////////////////////////////////////////////////////////////
// Actions
//

var actions = {};

actions.counting = function (event) {
  console.log("Counting ", event);
}

window.addEventListener("load", function() {

  var sc = new scion.Statechart(model);
  sc.start();

  function handleEvent(e) {
    console.log(e.type);
    e.preventDefault();
    sc.gen({name: e.type, data: e});
  }

  document.getElementById("start").addEventListener("click", handleEvent, true);

  console.log(sc.getConfiguration());
  console.log(sc.getConfiguration());

});
