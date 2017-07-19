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
					 ["Romelu Lukaku","Leonel Messi", "Pele", "Peter Beardsley"],
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
	// DONE: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
        intervalId = setInterval(count, 1000);
        clockRunning = true;      	
    }
	// clear message
	$("#message").empty();
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
  };

//  Stop timing when this function is called
function stop() {
	    // DONE: Use clearInterval to stop the count here and set the clock to not be running.
	    clearInterval(intervalId);
	    clockRunning = false;
	    // Increment question 
	    questionNumber++;
	};
  
// This is the countdown for the timer
function count() {
	// If time hasn't run out then keep counting down and show time remaining
	if(time > 0) {
	    // decrement time by 1, remember we cant use "this" here.
	    time--;
	    // Show the time remaining
	    $("#display").html("<h3> Time Remaining : " + time + " seconds </h3>");
  	}
  	else {
  		// If time has run out then stop the timer
  		stop();
  		// Record unanswered
  		unanswered++;
  		// Show time out message
		$("#message").html("<h1> You ran out of Time!</h1> <h1> " + triviaArrays.answers[questionNumber] + "</h1>");
		// clear out other elements
		clear();
  		// go to the next question if necessary after 5 second delay
  		setTimeout(check,3000);
  	}
  };

// This function checks if all the questions in the array have been asked
function check() {
	// Check if you're at the last index of the question array
	if(questionNumber>9) {
		// Stop the timer (this may be need extraneous code)
		stop();
		// Empty out Divs for questions and answers and time
		$("#display").empty();
		$("#question").empty();
		$(".answer").empty();
		$("#message").empty();
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

// This function will clear out all the variables and the divs
function reset() {
	// Set all variables to zero and empty out divs
	wins = 0;
	losses = 0;
	unanswered = 0;
	clockRunning = false;
	questionNumber = 0;
	$("#results").empty();
	$("#restart").empty();
	$("#message").empty();
};

// Empty out Divs for questions and answers and time
function clear() {
	$("#display").empty();
	$("#question").empty();
	$(".answer").empty();
}

// ---------------------------------------------------------
// Create the onclick events for the game in this section
// ---------------------------------------------------------

// Activate the start button
$("#start").on("click", start);

// Execute the following when an answer is selected
$("body").on("click", ".answer", function(event){

	selectedAnswer = $(this).text();

	if(selectedAnswer === triviaArrays.answers[questionNumber]) {
		// Add to wins
		wins++; 
		// clear out other elements		
		clear();
		// Show that the correct answer was selected
		$("#message").html("<h1> You got it right!</h1> <h1> " + triviaArrays.answers[questionNumber] + "</h1>");
	}
	else {
		// Add to losses 
		losses++;
		// clear out other elements
		clear();
		// Show that the wrong answer was selected
		$("#message").html("<h1> You got it wrong!</h1> <h1> " + triviaArrays.answers[questionNumber] + "</h1>");
	}

	// stop timer
	stop();
	// check if all the questions have been posed and select new question
	// after 5 second delay showing message
	setTimeout(check, 3000);
});

// Execute the following if the user wants to play again
$("body").on("click", ".play", function (event) {
	reset();
	start();
});

});


















