//1. Initialize Firebase
  var config = {
    apiKey: "AIzaSyBsAxfQKN185H7HafPVWmj7FBMj-1Z3F8U",
    authDomain: "trainschedule-6b07c.firebaseapp.com",
    databaseURL: "https://trainschedule-6b07c.firebaseio.com",
    projectId: "trainschedule-6b07c",
    storageBucket: "trainschedule-6b07c.appspot.com",
    messagingSenderId: "779938758197"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  	//grabs user input
  	var trainName = $("#train-name-input").val().trim();
  	var trainDestination = $("#destination-input").val().trim();
  	var trainTime = $("#time-input").val().trim();
  	var trainMinutes = $("#minutes").val().trim();


  	//creates temporary object for holding train data
  	var newTrain = {
  		name: trainName,
    	destination: trainDestination,
    	time: trainTime,
    	minutes: trainMinutes
	};

	//uploads train data to database
	database.ref().push(newTrain);

	//logs things to console
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.time);
	console.log(newTrain.minutes);

	//alert
	alert("Train successfully added");

	//clears all textboxes
	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#time-input").val("");
	$("#minutes").val("");

	//prevents moving to a new page
	return false;

});//close click event

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  //stores everything into a variable
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainMinutes = childSnapshot.val().minutes;

  //train info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainMinutes);

  //first time (pushed back 1 hr to make sure it comes before current time)
  var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");

  //current time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

  //difference b/w times
  var diffTime = moment().diff(moment(firstTimeConverted), "HH:mm");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  //time apart(remainder)

  var tRemainder = diffTime % trainMinutes;
  console.log(tRemainder);

  //minute until train

  var tMinutesTillTrain = trainMinutes - tRemainder;
  // $("#minutes").append(tMinutesTillTrain);
  console.log("Minutes till Train: " + tMinutesTillTrain);

  //Next train

  var nextTrain = moment(moment().add(tMinutesTillTrain, "minutes")).format("HH:mm");
  console.log("Arrival time: " + nextTrain);
 

  //add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainMinutes + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td><td>");


 });//close firebase event