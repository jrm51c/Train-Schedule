$(document).ready(function () {
  // variables
  //=============================================================================================
  var trainName
  var trainDestination;
  var trainTime;
  var trainfrequency;

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
  
  // Function to clear user input fields
  function clear() {
    $(".form-control").val("");
  }

  // update train schedule with user input
  function updateSchedule() {
    var tBody = $("tbody");
    var tRow = $("<tr>");
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);
    // Methods run on jQuery selectors return the selector they we run on
    // This is why we can create and save a reference to a td in the same statement we update its text
    var tName = $("<td>").text(trainName);
    var tDestination = $("<td>").text(trainDestination);
    var tTime = $("<td>").text(trainTime);
    var tFrequency = $("<td>").text(trainFrequency);
    // Append the newly created table data to the table row
    //tRow.append(name, destination, time, frequency);
    tRow.append(tName, tDestination, tTime, tFrequency);
    // Append the table row to the table body
    tBody.append(tRow);
  }
  
  // Capture Button Click
  $("#add-train").on("click", function (event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();

    // Capture user inputs and store them into variables
    trainName = $("#train-name").val().trim();
    trainDestination = $("#destination").val().trim();
    trainTime = $("#initial-time").val().trim();
    trainFrequency = $("#frequency").val().trim();

    // Update train schedule
    updateSchedule();

    // Clear input fields
    clear();


    // Console log each of the user inputs to confirm we are receiving them


    // Replaces the content in the "recent-member" div with the new info
    /* $("#name-display").text(name);
     $("#email-display").text(email);
     $("#age-display").text(age);
     $("#comment-display").text(comment);
 
     // Clear localStorage
     localStorage.clear();
 
     // Store all content into localStorage
     localStorage.setItem("name", name);
     localStorage.setItem("email", email);
     localStorage.setItem("age", age);
     localStorage.setItem("comment", comment);*/
  });

  



});