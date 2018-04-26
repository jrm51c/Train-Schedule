$(document).ready(function () {
  // variables
  //=============================================================================================
  var train;
  var destination;
  var initialTime;
  var frequency;

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
  
  // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
  // Update train schedule to include new train information
  database.ref().on("child_added", function (childSnapshot) {
    // Log everything that's coming out of snapshot
    //console.log("key: ",childSnapshot.key);
    //console.log("val: ", childSnapshot.val());
    /*console.log(childSnapshot.val().train);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().initialTime);
    console.log(childSnapshot.val().frequency);*/

    var tBody = $("tbody");
    var tRow = $("<tr>");
    // Methods run on jQuery selectors return the selector they we run on
    // This is why we can create and save a reference to a td in the same statement we update its text
    var tName = $("<td>").text(childSnapshot.val().train);
    var tDestination = $("<td>").text(childSnapshot.val().destination);
    //var tTime = $("<td>").text(initialTime);
    var tFrequency = $("<td>").text(childSnapshot.val().frequency);
    // Append the newly created table data to the table row
    //tRow.append(name, destination, time, frequency);
    tRow.append(tName, tDestination, tFrequency);
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

  // update train schedule with user input
  /*function updateSchedule() {
    var tBody = $("tbody");
    var tRow = $("<tr>");
    // Methods run on jQuery selectors return the selector they we run on
    // This is why we can create and save a reference to a td in the same statement we update its text
    var tName = $("<td>").text(train);
    var tDestination = $("<td>").text(destination);
    //var tTime = $("<td>").text(initialTime);
    var tFrequency = $("<td>").text(frequency);
    // Append the newly created table data to the table row
    //tRow.append(name, destination, time, frequency);
    tRow.append(tName, tDestination, tFrequency);
    // Append the table row to the table body
    tBody.append(tRow);
  }*/

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
      frequency: frequency,
    };
    // Push to database
    database.ref().push(newTrain);
    // Update train schedule
    //updateSchedule();
    // Clear input fields
    setTimeout(calculateArrivals(), 2000);
    clear();
  });

  function calculateArrivals() {
    console.log(initialTime);
    console.log(frequency);
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(initialTime, "HH:mm").subtract(1, "years");
    console.log("Converted " + firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log("time apart " + tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    /*for (i=0; i<=24; i++) {
      var nextArrival = (initialTime + frequency)
      console.log("next" + nextArrival);
  }*/
  }



});