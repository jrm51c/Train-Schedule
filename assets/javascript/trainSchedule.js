$(document).ready(function () {
  // variables
  //=============================================================================================
  var train;
  var destination;
  var initialTime;
  var frequency;
  var nextArrival;
  var minutesAway;

  /* global moment firebase */

  // Initialize Firebase
  // Make sure to match the configuration to the script version number in the HTML
  // (Ex. 3.0 != 3.7.0)        
  var config = {
    apiKey: "AIzaSyAZu-ItDA5KMAsWGfH9dIfrppQ4lvAbkfs",
    authDomain: "train-schedule-6290b.firebaseapp.com",
    databaseURL: "https://train-schedule-6290b.firebaseio.com",
    projectId: "train-schedule-6290b",
    storageBucket: "train-schedule-6290b.appspot.com",
    messagingSenderId: "879155300743"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();

  // functions
  //=============================================================================================
  
  // Firebase watcher + initial loader
  // Update train schedule to include new train information
  database.ref().on("child_added", function (childSnapshot) {
    // Calculate next arrival and minutes away
    calculateArrival();

    // Build table
    var tBody = $("tbody");
    var tRow = $("<tr>");
    var tName = $("<td>").text(childSnapshot.val().train);
    var tDestination = $("<td>").text(childSnapshot.val().destination);
    var tFrequency = $("<td>").text(childSnapshot.val().frequency);
    var tNextArrival = $("<td>").text(moment(nextArrival).format("HH:mm a"));
    var tMinutesAway = $("<td>").text(minutesAway);
    console.log("second" + nextArrival);
    // Append the newly created table data to the table row
    tRow.append(tName, tDestination, tFrequency, tNextArrival, tMinutesAway);
    // Append the table row to the table body
    tBody.append(tRow);

    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

  // Function to clear user input fields
  function clear() {
    $(".form-control").val("");
  }

  // Add new train to database on button click
  $("#add-train").on("click", function (event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();
    // Capture user inputs and store them into variables
    train = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    initialTime = $("#initial-time").val().trim();
    frequency = $("#frequency").val().trim();
    // Creates local "temporary" object for holding new train data
    var newTrain = {
      train: train,
      destination: destination,
      initialTime: initialTime,
      frequency: frequency
    };

    // Push to database
    database.ref().push(newTrain);

    // Clear input fields
    clear();
  });

function calculateArrival() {

  // Initial time (pushed back 1 year to make sure it comes before current time)
  var initialTimeConverted = moment(initialTime, "HH:mm").subtract(1, "years");
  // Current time
  var currentTime = moment();
  // Difference between the times
  var diffTime = moment().diff(moment(initialTimeConverted), "minutes");
  // Time apart (remainder)
  var remainderTime = diffTime % frequency;
  // Minutes until train arrives
  minutesAway = frequency - remainderTime;
  // Next Train
  nextArrival = moment().add(minutesAway, "minutes");
  }

});