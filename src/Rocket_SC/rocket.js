

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

  var stateMachine = {
    states: [
      {
        id: 'ready',
        transitions: [
          {
            target: 'counting',
            event: 'clickStart'
          }
        ]
      }, {
        id: 'counting',
        onEntry: function(event) {
          actions.counting(event)
        },
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
    <input type="button" value="Start" onClick="handleEvent('clickStart',model)">`;

    return representation;
  }

  // State representation of the counting state
  view.counting = function(model) {

    let representation = `
    <p>Count down: ${model.counter} </p>
		<input type="button" value="Abort" onClick="actions.abort({})">`;

    return representation;
  }

  //display the state representation
  view.display = function(representation) {
    let stateRepresentation = document.getElementById("representation");
    stateRepresentation.innerHTML = representation;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Actions
  //

  var actions = {};

  actions.counting = function(event) {
    console.log("Counting ", event);
  }

  var sc = new scion.Statechart(stateMachine);
  sc.start();

  function handleEvent(type, data) {
    sc.gen({name: type, data: data});
  }

window.addEventListener("load", function() {

  // Display initial state
  view.display(view.init(model));

  //document.getElementById("start").addEventListener("click", handleEvent, true);

  console.log(sc.getConfiguration());

});
