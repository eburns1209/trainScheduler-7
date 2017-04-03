// Initialize Firebase
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
  	var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
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

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
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

  //prettify the train start
  //time stored in unix and then formatted

  var trainTimePretty = moment.unix(trainTime).format("HH:mm:A");
  console.log(trainTimePretty);

  var nextArrival = moment().diff(moment.unix(trainTime, "X"), "time");
  console.log(nextArrival);

  // Calculate the months worked using hardcore math
  // To calculate the months worked??

  // Calculate when the next train will arrive

  //assumptions
  var tFrequency = 15;

  //time is 3:30 AM
  var firstTime = "03:30";

  //first time (pushed back 1 r to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

  //current time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm:"));

  //difference b/w times
 var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

  //time apart(remainder)

  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  //minute until train

  var tMinutesTillTrain = tFrequency - tRemainder;
  $("#minutes").append(tMinutesTillTrain);
  // console.log("Minutes till Train: " + tMinutesTillTrain);

  //Next train

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("Arrival time: " + moment(nextTrain).format("minutes"));
  $("#next-input").append(moment(nextTrain).format("minutes"));

  //add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainMinutes + "</td><td>" + trainTimePretty + "</td><td>" + trainTime + "</td><td>");
 });//close firebase event