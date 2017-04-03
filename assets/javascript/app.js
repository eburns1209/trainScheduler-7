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