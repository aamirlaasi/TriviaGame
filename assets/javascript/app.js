// JavaScript function that wraps everything
$(document).ready(function() {

// Create the global arrays and variables that are needed 
// for the game
// -------------------------------------------------------
// Create an object of questions, answers, and answer 
// choices.

var triviaArrays = {
	// Array of questions
	questions : ["What colour jersey is worn by the winners of each stage of the Tour De France?",
				"Name the only heavyweight boxing champion to finish his career of 49 fights without ever having been defeated?",
				"Which sport does Constantino Rocca play?",
				"Name the country where you would find the Cresta Run",
				"How many times was the Men's Tennis Singles at Wimbledon won by Bjorn Borg?",
				"In 2011, which country hosted a Formula 1 race for the first time?",
				"Name the game played on a lawn called a 'crown green'.",
				"Which chess piece can only move diagonally?",
				"Name the only soccer player to have played for Liverpool, Everton, Manchester City and Manchester United.",
				"In soccer, who was nicknamed 'The Divine Ponytail'?"],

	// Array of correct answers
	answers : ["Yellow",
			   "Rocky Marciano",
			   "Golf",
			   "Switzerland",
			   "Five",
			   "India",
			   "Bowls",
			   "Bishop",
			   "Peter Beardsley",
			   "Roberto Baggio"],
	
	// Array of answer choices
	answerChoices : [["Yellow", "Orange", "Red", "White"],
					 ["Muhammed Ali", "Mike Tyson", "Rocky Marciano", "Sugar Ray Leonard"],
					 ["Baseball", "Golf", "Basketball", "Soccer"],
					 ["Switzerland","France","Italy", "Spain"],
					 ["Three", "Two", "Ten", "Five"],
					 ["Thailand", "Congo", "India", "Belgium"],
					 ["Bocci","Bowls", "Cups", "kabadi"],
					 ["King","Pawn", "Bishop", "Queen"],
					 ["Romelu Lukaku","Leonel Messi", "Pele", "Peter Beardlay"],
					 ["George Best", "Roberto Baggio", "Lev Yashin", "Zico"]]

}

// Keep track of results
var wins = 0;
var losses = 0;
var unanswered = 0;


// Create all the functions required for the game
// ------------------------------------------------------------
// Create an object for the game with the timer. Taken from
// class activity.

//  Variable that will hold our setInterval that runs the timer
var intervalId;

//prevents the clock from being sped up unnecessarily
var clockRunning = false;

// Keep track of questionNumber
var questionNumber = 0;

// Timer variables
var time;


  // Start timing when a new question is displayed
function start() {
	// Set time at 30 seconds
	time = 31;
	// delete the start button
	$("#intro").html("");
	// Load a question from the array
	$("#question").html("<h2>" + triviaArrays.questions[questionNumber] + "</h2>");
	// Load the answers from the array
	$("#answer1").html("<button type='button' class='btn btn-default'>" + triviaArrays.answerChoices[questionNumber][0] + "</button>");
	$("#answer2").html("<button type='button' class='btn btn-default'>" + triviaArrays.answerChoices[questionNumber][1] + "</button>");
	$("#answer3").html("<button type='button' class='btn btn-default'>" + triviaArrays.answerChoices[questionNumber][2] + "</button>");
	$("#answer4").html("<button type='button' class='btn btn-default'>" + triviaArrays.answerChoices[questionNumber][3] + "</button>");


	// DONE: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
        intervalId = setInterval(count, 1000);
        clockRunning = true;      	
    }

  };

//  Stop timing if time runs out
function stop() {

	    // DONE: Use clearInterval to stop the count here and set the clock to not be running.
	    clearInterval(intervalId);
	    clockRunning = false;
	    // Increment question 
	    questionNumber++;
	};
  

function count() {

	if(time > 0) {
	    // DONE: decrement time by 1, remember we cant use "this" here.
	    time--;
	    // DONE: Use the variable we just created to show the time in the "display" div.    
	    $("#display").html("<h3> Time Remaining : " + time + " seconds </h3>");
  	}
  	else {
  		// stop the timer
  		stop();
  		// Record unanswered
  		unanswered++;
  		// Show time out message

  		// go to the next question if necessary
  		check();
  	}
  };

function check() {
	if(questionNumber===10) {
		stop();
		// Empty out Divs for questions and answers and time
		$("#display").empty();
		$("#question").empty();
		$(".answer").empty();
		// Record results
		$("#results").html("<h1> Correct: " + wins + "</h1> <h1> Incorrect: " + losses + "</h1> <h1> Unanswered: " + unanswered + "</h1>");
		// Show button to restart the game
		$("#restart").html('<button type="button" class="btn btn-default">PLAY AGAIN!</button>');
	}
	else {
		// show the next question
		start();
	};
};

function reset() {
	// Set all variables to zero and empty out divs
	wins = 0;
	losses = 0;
	unanswered = 0;
	clockRunning = false;
	questionNumber = 0;
	$("#results").empty();
	$("#restart").empty();
};

// I need another function to show result in between questions
// but I ran out of time.

// ---------------------------------------------------------

// Create the onclick events for the game in this section
// ---------------------------------------------------------

// Activate the start button
$("#start").on("click", start);

// Execute the following when an answer is selected
$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	selectedAnswer = $(this).text();

	if(selectedAnswer === triviaArrays.answers[questionNumber]) {
		// Add to wins
		wins++; 
		// Show that the correct answer was selected
		// $("#message").html("<h1> You got it right!</h1> <h1> " + triviaArrays.answers[questionNumber] + "</h1>");
	}
	else {
		// Add to losses 
		losses++;
		// Show that the wrong answer was selected
		// $("#message").html("<h1> You got it wrong!</h1> <h1> " + triviaArrays.answers[questionNumber] + "</h1>");
	}

	// stop timer
	stop();
	// check if all the questions have been posed and select new question
	check();
});

// Execute the following if the user wants to play again
$("body").on("click", ".play", function (event) {
	reset();
	start();
});

});


















