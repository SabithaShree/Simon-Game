var gameStart = false;
var rndArr = [];
var usrArr = [];
var level = 0;

$(document).on("keypress", function() {
  gameStart = true;
  if (gameStart)
  {
    gameStart = false;

    goToNextLevel();

    // Capture user click

    $("div.btn").on("click", function() {
      
      var btnNumber = $(this).attr("number");
      animateButton(btnNumber);
      usrArr.push(btnNumber);

      var result = compareArray();

      if (result) {
        if(usrArr.length == rndArr.length) {
            goToNextLevel();
        }
      }
      else {
        gameOver();
      }

    });
  }
});


function goToNextLevel() {
  usrArr = [];

  // change title
  level++;
  $("#level-title").text("Level " + level);

  // Generate a random number and store in array A
  var rnd = Math.floor(Math.random() * 4 + 1);
  rndArr.push(rnd);

  // Toggle the corresponding button

  setTimeout(function() {
    animateButton(rnd);
  }, 800);
}

function animateButton(btnNumber)
{
  $("div[number=" + btnNumber + "]").addClass("pressed");
  setTimeout(function() {
    $("div[number=" + btnNumber + "]").removeClass("pressed");
  }, 100);

  playSound(btnNumber + "");
}

function playSound(btnNumber)
{
  switch (btnNumber) {
    case "1":
      var audio = new Audio("sounds/green.mp3");
      audio.play();
      break;
    case "2":
      var audio = new Audio("sounds/red.mp3");
      audio.play();
      break;
    case "3":
      var audio = new Audio("sounds/yellow.mp3");
      audio.play();
      break;
    case "4":
      var audio = new Audio("sounds/blue.mp3");
      audio.play();
      break;
    default:
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
    }
  }

function compareArray()
{
  var result = true;
  for (var i = 0; i < usrArr.length; i++) {
    if (rndArr[i] != usrArr[i])
    {
      return false;
    }
  }
  return result;
}

function gameOver ()
{
  $("body").addClass("red");
  setTimeout(function() {
    $("body").removeClass("red");
  },100);
  $("#level-title").text("Game Over ! Press any key to restart !");

  playSound("5");

  gameStart = true;
  rndArr = [];
  usrArr = [];
  level = 0;
}
