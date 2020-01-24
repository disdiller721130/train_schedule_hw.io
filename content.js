var config = {
    apiKey: "AIzaSyCPFz8Jg6R6xgqzELupZG8OXovW9ulRtVI",
    authDomain: "eugene-jan-8.firebaseapp.com",
    databaseURL: "https://eugene-jan-8.firebaseio.com",
    projectId: "eugene-jan-8",
    storageBucket: "eugene-jan-8.appspot.com",
    messagingSenderId: "277025804929",
    appId: "1:277025804929:web:29e4f8388e19c6c07c3380",
    measurementId: "G-YXNYJV5B21"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

$("#add-train").on("click", function(event) {
    event.preventDefault();
    
    var TrainName = $("#train-name").val().trim();
    var TrainDestination = $("#destination").val().trim();
    var FirstTrain = $("#first-train").val().trim();
    var FirstTrainConvert = moment(FirstTrain, "HH:mm").subtract(1, "years");
    var TrainFreq = $("#train-freq").val().trim();
    
    var TimeDiff = moment().diff(moment(FirstTrainConvert), "minutes");
    var tRemainder = TimeDiff % TrainFreq;
    var tMinutesTillTrain = TrainFreq - tRemainder;
    var tNext = moment().add(tMinutesTillTrain, "minutes");
    var NextTrain = moment(tNext).format("hh:mmA");
    
    var TrainSummary = {
        tName: TrainName,
        tfreq: TrainFreq,
        timediff: TimeDiff,
        destination: TrainDestination,
        timeremain: tRemainder,
        mintilltrain: tMinutesTillTrain,
        nexttrain: NextTrain
    };
    
    database.ref().push(TrainSummary);
    alert("Train information are successfully added.")
    
    $("#train-name, #destination, #first-train, #train-freq").val("");
    
});

database.ref().on("child_added", function(snapshot) {
    var TrainName = snapshot.val().tName;
    var TrainDestination = snapshot.val().destination;
    var tFreq = snapshot.val().tfreq;
    var tNext = snapshot.val().nexttrain;
    var tMinAway = snapshot.val().mintilltrain;
    console.log(tNext);
    
    var newRow = $("<tr>").append(
        $("<td>").text(TrainName),
        $("<td>").text(TrainDestination),
        $("<td>").text(tFreq),
        $("<td>").text(tNext),
        $("<td>").text(tMinAway)
    );
    
    $("#train-schedule > tbody").append(newRow);
});