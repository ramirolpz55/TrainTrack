
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC-cpWnj-Ot26z1kfQQhj9wd_DHhVq_pbA",
    authDomain: "getontrack-5d07f.firebaseapp.com",
    databaseURL: "https://getontrack-5d07f.firebaseio.com",
    storageBucket: "getontrack-5d07f.appspot.com",
  };

  firebase.initializeApp(config);

  var dataRef = firebase.database();

  $('#submit').on("click", function() {

    // Code in the logic for storing and retrieving Train Information
    //Initial data to Firebase database.
    train = $('#trainSubmit').val().trim();
    destination = $('#destinationSubmit').val().trim();
    trainTime = $('#trainTimeSubmit').val().trim();
    frequency = $('#frequencySubmit').val().trim();
    

    // Code for the push to Firebase
    dataRef.ref().push({
        train: train,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
});

  dataRef.ref().on("child_added", function(childSnapshot) {
    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().train);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().trainTime);

    var train = childSnapshot.val().train;
    var destination = childSnapshot.val().destination
    var frequency = childSnapshot.val().frequency;
    var trainTime = childSnapshot.val().trainTime;

    //ITIME THE TRAIN ARRIVES AS A MOMENT OBJECT A DETAILED DATE OBJECT 
    var firstTimeConverted = moment(trainTime,"hh:mm");//.subtract(1, "years");
    //THE CURRENT TIME IT IS AT THE MOMENT 
    var currentTime = moment();
    //THIS IS THE DIFFERENCE BETWEEN THE TRAIN ARRIVES AND THE CURRENT MOMENT TIME
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    //THE TIME THAT HAS PASSED SINCE TRAIN LAST ARRIVED 
    var tRemainder = diffTime % frequency;
    //NUMBER OF MIN UNTIL THE NEXT TRAIN ARRIVES 
    var tMinutesTillTrain = frequency - tRemainder;
    //ADDS THE THE # OF MIN REMAIING UNTIL THE TRAIN ARRIVES TO THE CURRENT TIME.
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");


    // full list of items to the well
    $('#table-body').append("<tr> '<td>  "+childSnapshot.val().train+" </td> <td> "+ childSnapshot.val().destination+" </td> <td> "+childSnapshot.val().frequency+" </td> <td> "+nextTrain+" </td> <td> "+tMinutesTillTrain+" </td>' </tr>")

    // This handles the errors
    }, function(errorObject){
    console.log("Errors handled: " + errorObject.code)
});

// function nextArrival (frequency, trainTime) {
//     //ITIME THE TRAIN ARRIVES AS A MOMENT OBJECT A DETAILED DATE OBJECT 
//     var firstTimeConverted = moment(trainTime,"hh:mm").subtract(1, "years");
//     //THE CURRENT TIME IT IS AT THE MOMENT 
//     var currentTime = moment();
//     //THIS IS THE DIFFERENCE BETWEEN THE TRAIN ARRIVES AND THE CURRENT MOMENT TIME
//     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//     //THE TIME THAT HAS PASSED SINCE TRAIN LAST ARRIVED 
//     var tRemainder = diffTime % frequency;
//     //NUMBER OF MIN UNTIL THE NEXT TRAIN ARRIVES 
//     var tMinutesTillTrain = tFrequency - tRemainder;
//     //ADDS THE THE # OF MIN REMAIING UNTIL THE TRAIN ARRIVES TO THE CURRENT TIME.
//     var nextTrain = moment().add(tMinutesTillTrain, "minutes");

//     return nextTrain;
// }


