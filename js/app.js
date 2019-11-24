//console log to ensure operation of js link
console.log("hello");

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDLIkLqrzyWYYaqgJpexa-LxI_5CpzuXWo",
    authDomain: "train-scheduler-4fd71.firebaseapp.com",
    databaseURL: "https://train-scheduler-4fd71.firebaseio.com",
    projectId: "train-scheduler-4fd71",
    storageBucket: "train-scheduler-4fd71.appspot.com",
    messagingSenderId: "888050210280",
    appId: "1:888050210280:web:6b0389f4857b059ed2405d",
    measurementId: "G-2QWN5NHC28"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  var database = firebase.database();

  $("#newTrainAdd").on("click", function(event) {
    event.preventDefault();

    let trainName = $("#thatNewTrain")
    .val().trim();

    let destination = $("#thatNewDestination")
    .val().trim();

    let newTime = $("#thatNewTime")
    .val().trim();

    let frequency = $("#theNewFrequency")
    .val().trim();

    let tempTrain = {
        name: trainName,
        destination: destination,
        newTime: newTime,
        frequency: frequency
    };

    database.ref().push(tempTrain);

    console.log("Values were pushed to firebase");
    console.log(tempTrain.name);
    console.log(tempTrain.destination);
    console.log(tempTrain.firstTrain);
    console.log(tempTrain.frequency);

    alert("Train added");

    $("#thatNewTrain").val("");
    $("#thatNewDestination").val("");
    $("#thatNewTime").val("");
    $("#theNewFrequency").val("");
  });