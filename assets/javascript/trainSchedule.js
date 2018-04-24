$(document).ready(function () {
  // variables
  //=============================================================================================



  // functions
  //=============================================================================================
  // Function to empty out the articles
  function clear() {
    $(".form-control").val("");
  }

  // Capture Button Click
  $("#add-train").on("click", function (event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();

    // Capture user inputs and store them into variables
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var initialTime = $("#initial-time").val().trim();
    var frequency = $("#frequency").val().trim();

    // Clear form inputs
    clear();


    // Console log each of the user inputs to confirm we are receiving them
    console.log(trainName);
    console.log(destination);
    console.log(initialTime);
    console.log(frequency);

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