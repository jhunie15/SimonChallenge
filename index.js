
var buttonColours = ["green","red","yellow","blue"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var gameHasStarted = false;

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  var pattern = gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);


  $("h1").text("Level " + level);
  level++;
}

$(".btn").click(function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColour){
  var animation = document.querySelector("." + currentColour);
  animation.classList.add("pressed");
  setTimeout(function(){
    animation.classList.remove("pressed");
  }, 100);
}

$("h1").click(function(){
  if(!gameHasStarted){
    nextSequence();
      gameHasStarted = true;
}
});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
  if (gamePattern.length === userClickedPattern.length){
    setTimeout(function(){
      nextSequence();
    }, 1000);
    userClickedPattern = [];
}}
else{
  playSound("wrong");
  $("body").addClass("game-over");
  $("h1").text("Game-over click me to Start again.");

  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
  startOver();
}

}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameHasStarted = false;
}
