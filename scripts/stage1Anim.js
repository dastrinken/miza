/* Textbox variables */
var textBox = $("#display");
var textItem = gsap.utils.toArray(".box-message");
var arrow = $("#text-arrow");

/**
 * @name initStage
 * @description startpoint of animation script
 * @param {int} stage current stage
 */
var initStage = function (stage = 1) {
  if(stage == 1){
    showLoadingScreen(false);
    if(getCookie("character") != "") {
      //user returns to stage 1
      $("#characterChoice").remove();
      placePlayerCharacter();
      stage1TL.play();
    } else {
      //first time visit
      showTextbox(textObject["A1"], triggerCharacterChoice);
    }
    if(getCookie("progress") < 1) {
      setCookie("progress", 1, 3);
    }
  }
}

function triggerCharacterChoice() {
  showTextbox(textObject["A4"], showCharacterChoice);
}

var characterChoice = null;
$(".choiceBtn").on('click', function(event) {
  //TODO: save character choice
  characterChoice = event.currentTarget.id;
  setCookie("character", characterChoice, 3); 
  //hide character choice
  gsap.to("#characterChoice", {
    autoAlpha: 0,
    duration: 0.5
  });
  //start room animation
  stage1TL.play();
  placePlayerCharacter(characterChoice);
});

function placePlayerCharacter(characterChoice = getCookie("character")) {  
  //place character into scene
  characterSelector = "#"+characterChoice;
  if(!characterPlaced) {
    playerCharacter = $("<img id='"+characterChoice+"' class='playerCharacter' src='./resources/images/character/"+characterChoice+".svg'>");
    $("#svg-container").append(playerCharacter);
    characterPlaced = true;
  } else {
    playerCharacter = $(characterSelector);
  }
  $(playerCharacter).css("visibility", "hidden");
}

var stage1TL = gsap.timeline({
  paused: true,
  delay: 0,
  onComplete: sleepAnim
});

var buildTweens = function (stage, callback) {
  if (stage != 1) {
      return false;
  }
  stage1TL
  .from("#roomBackground", {y: -1000, autoAlpha: 0, duration: 2})
  .from([".floor-item", ".wall-left-item"], {autoAlpha: 0, duration: 1, ease: "expo.out"})
  .fromTo("#zzz",{autoAlpha: 0},{duration: 1, autoAlpha: 1});

  callback();
}

floatingSleep = gsap.to("#zzz", {
  y: -5,
  duration: 2.5,
  repeat: -1,
  ease: "sine.out",
  yoyo: true,
  yoyoEase: "sine.out",
  paused: true
});

function sleepAnim() {
  floatingSleep.play();
  setTimeout(function() {
    finishStage1();
  }, 500);
}

function finishStage1 () {
  showTextbox(textObject["A5"], cloudTransition.bind(null, 2));
}