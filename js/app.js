//console log to ensure operation of js link
console.log("hello");

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDLIkLqrzyWYYaqgJpexa-LxI_5CpzuXWo",
    authDomain: "train-scheduler-4fd71.firebaseapp.com",
    databaseURL: "https://train-scheduler-4fd71.firebaseio.com",
    storageBucket: "train-scheduler-4fd71.appspot.com",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  let database = firebase.database();

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

  database.ref().on("child_added", function(snapshot, prevChildKey) {
      console.log(snapshot.val());

      let snapName = snapshot.val().name;
      let snapDestination = snapshot.val().destination;
      let snapFirstTrain = snapshot.val().firstTrain;
      let snapFrequency = snapshot. val().frequency;

      let timeArr = snapFirstTrain.split("#thatNewTime:");
      let trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);

      let maxMoment = moment.max(moment(), trainTime);
      let tMinutes;
      let tArrival;

      if (maxMoment === trainTime){
          tArrival = trainTime.format("hh:mm A");
          tMinutes = trainTime.diff(moment(), "minutes")
      } else {
        let diffTime = moment().diff(trainTime, "minutes");
        let tRemainder = diffTime % snapFrequency;
        tMinutes = snapFrequency - tRemainder;

        tArrival = moment().add(tMinutes, "m").format("hh:mm A");
      }

      console.log("tMinutes: ", tMinutes);
      console.log("tArrical: ", tArrival);

      $("#newTrainList").append(`
      <tr>
        <th scope="row"> ${snapName}</th>
        <td>${snapDestination}</td>
        <td>${snapFrequency}</td>
        <td>${tArrival}</td>
        <td>${tMinutes}</td>
      </tr>  
        `)

  });