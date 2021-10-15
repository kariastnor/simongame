
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

$(document).on("keypress", function() {
    if (started === false) {
        nextSequence();
        started = true;
    }   
});

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(200).fadeIn(200);
    playSound(randomChosenColour);
    $("h1").text("Level " + level);
    level++;
}

function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    var thisButton = $(this);
    thisButton.addClass("pressed");
    setTimeout(function() {
        thisButton.removeClass("pressed");
    }, 200);
    playSound(userChosenColour);
    checkAnswer();
});

function checkAnswer() {
    var userColour = userClickedPattern[userClickedPattern.length - 1];
    var gameColour = gamePattern[userClickedPattern.length - 1];

    if (userColour !== gameColour) {
        wrongAnswer();
        startOver();
    }
    else if (level === userClickedPattern.length && JSON.stringify(userClickedPattern) === JSON.stringify(gamePattern)) {
        setTimeout(function() {
            nextSequence();}, 800);
        userClickedPattern = [];
    }
}

function wrongAnswer() {
    $("h1").text("Game over! Press any key to re-start.");
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
}

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    level = 0;
}

//$(".btn").click(animatePress($(this)));

// function animatePress(currentColour) {
//     currentColour.removeClass("pressed");
//     // setTimeout(function(currentColour) {
//     //     currentColour.removeClass("pressed");
//     // }, 100);
// }

