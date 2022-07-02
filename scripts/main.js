/**
 * Main script to load and manage content of the main story.
 */
let progress = null;
$(document).ready(function() {
  setTimeout(function() {
    showLoadingScreen(false);
    //looking for saved progress
    if(getCookie("progress") != "") {
      progress = getCookie("progress");
    } else {
      progress = 0;
      setCookie("progress", progress, 3);
    }
  }, 500);
});

//TODO: load content based on progress value. enables navigation and "revisiting" already completed rooms
$("#mainContent").load("./content/intro.php", function () {
  $("#mainContent").toggleClass("h-100");
  $("#wrapper").toggleClass("overflow-hidden");
  $("#introWrapper").click(function () {
    $("#mainContent").toggleClass("h-100");
    tl.kill();
    showLoadingScreen(true);
    $.ajax({
      url: "./content/main_story.php",
    }).done(function (data) {
      $("#wrapper").toggleClass("overflow-hidden");
      initText();
      setMaincontent(data);
    });
  });
});

/**
 * @name setMaincontent
 * @description handles loaded html document, gsap animations and timeline.
 * @param {html} data html document (pass null if page is loaded already)
 * @param {int} stage story progress as an integer (optional, default = 1), decides which content (room) to load
 */
function setMaincontent(data = null, stage = 1) {
    let roomSVG = null, roomScript = null;
    switch(stage) {
      case 1:
        //1st room, loading html content...
        if(data != null) {
          $("#mainContent").html(data);
        }
        roomSVG = "./resources/images/rooms/stage1.svg";
        roomScript = "./scripts/stage1Anim.js";
        break;
      case 2:
        //...2nd room,...
        roomSVG = "./resources/images/rooms/stage2.svg";
        roomScript = "./scripts/stage2Anim.js";
        break;
      case 3:
        //...3rd room...
        roomSVG = "./resources/images/rooms/stage3.svg";
        roomScript = "./scripts/stage3Anim.js";
        break;
      case 4:
        //...and so on
        roomSVG = "./resources/images/rooms/stage4.svg";
        roomScript = "./scripts/stage4Anim.js";
        break;
      case 5:
        roomSVG = "./resources/images/rooms/stage5.svg";
        roomScript = "./scripts/stage5Anim.js";
        break;
      case 6:
        roomSVG = "./content/credits.php";
        roomScript = "./scripts/credits.js";
    }

    if(getCookie("currentStage") == 6) {
      gsap.to("#svg-wrapper", {
        background: "white",
        duration: 1.5
      });
    }
    //save current stage
    setCookie("currentStage", stage, 3);
    //remove all remaining event listeners
    window.onmousemove = null;
    //bugfix for stage 2
    $(".spacer-normal").remove();
    $("#scrollArrow").remove();
    //bugfix credits
    if(!$("#svg-wrapper").hasClass("d-flex")) {
      $("#svg-wrapper").addClass("d-flex");
    }
    //disable leftover draggables
    if(dragMe != undefined) {
      dragMe[0].disable();
    }
    //load next room, save progress
    nextRoom(roomSVG, roomScript, stage);
    progressManager();
}

/**
 * @name nextRoom
 * @description loads next stage of the main story
 * @param {string} roomSVG url of desired svg file
 * @param {string} roomScript url of matching script file
 */
function nextRoom(roomSVG, roomScript, stage) {
  //prüfen ob svg-wrapper empty? wenn ja, remove first child
  $("#svg-wrapper").find('svg').first().remove();
  $.ajax({
    url: roomSVG,
    dataType: 'html'
  }).done(function(returnedData) {
    $("#svg-wrapper").html(returnedData);
    $.getScript(roomScript, function() {
      buildTweens(stage, startStage);
    });
  });
}
function startStage() {
  var thisStage = getCookie("currentStage");
  initStage(thisStage);
}

var textObject;
function initText() {
  $.ajax({
    url: "./resources/text/text.json"
  }).done(function(data) {
    textObject = data;
  });
}

/**
 * @name showLoadingScreen
 * @description toggles loading screen based on given value
 * @param {boolean} state true = show loading screen / false = hide loading screen
 * @param {string} message optional message to be displayed below spinner
 */
function showLoadingScreen(state, message = "Deine Journey wird geladen...") {
  switch (state) {
    case true:
      $("#loader-wrapper").css("visibility", "visible");
      $("#loader-message").html(message);
      break;
    case false:
      $("#loader-wrapper").css("visibility", "hidden");
      break;
  }
}

var clickHint = null;
let clickHintKilled = false;
/**
 * @name showTextbox
 * @description displays and manages the textbox and its animations
 * @param {string} text plain text to be displayed
 */
function showTextbox(text, callback) {
  $('.box-message').scrollTop(0);
  $(textItem).html(text);
  let textboxTL = gsap.timeline({
    paused: true
  });
  /* hint to click the textbox, only displayed one time per visit */
  //box appears
  textboxTL.fromTo(textBox, {
    autoAlpha: 0,
    },
    {
    y: -10,
    autoAlpha: 1,
    duration: 1
  })
  //text appears
  .fromTo(textItem, {
    autoAlpha: 0
    },
    {
      autoAlpha: 1,
      duration: 0.5
  }, "<")
  //arrow appears
  .fromTo(arrow, {
    autoAlpha: 0
    },
    {
    y: 8,
    autoAlpha: 1,
    ease: "bounce.out",
    duration: 1,
    onComplete: function() {
      //arrow bounces
      gsap.from(arrow, {
        y: -8,
        autoAlpha: 0,
        ease: "bounce.out",
        duration: 1.2,
        repeat: -1,
        repeatDelay: 1
      });
    }
  });

  if(!clickHintKilled) {
    clickHint = gsap.from("#clickBadge", {
      delay: 6,
      autoAlpha: 0,
      duration: 1,
      repeat: -1,
      yoyo: true
    });
  }
  //animate textbox
  textboxTL.play();
  //removing old event handlers
  $("#display").off();
  //adding handler to close the textbox
  $("#display").on("click", function() {
    if(!clickHintKilled) {
      clickHint.kill();
      $("#clickBadge").remove();
      clickHintKilled = true;
    }
    if(hideTextbox()) {
      if(typeof callback !== 'undefined'){
        callback();
      }
    }
  });
}

/**
 * @name hideTextbox
 * @description hides textbox
 */
function hideTextbox() {
  let textBoxTL = gsap.timeline();  
  textBoxTL.to(textBox, {
    autoAlpha: 0,
    y: -20,
    duration: 0.5
  });
  return true;
}

let playerCharacter;
let characterPlaced = false;
function showCharacterChoice() {
  let choiceTL = gsap.timeline({
    paused: true
  });
  //show character choice box
  choiceTL.to("#characterChoice", {
    autoAlpha: 1,
    duration: 1
  });
  choiceTL.play();
}

//initializing new cloud timeline
var cloudTransitionTL = gsap.timeline({
  paused: true
});

/**
 * @name cloudTransition
 * @description starts cloud transition (transition first stage, transition sidebar menu)
 * @param {int} stage stage to be displayed next
 */
function cloudTransition(stage) {
  //stopping any remaining/playing animations
  gsap.globalTimeline.clear();
  gsap.to(textBox, {autoAlpha: 0, duration: 2});
  cloudTransitionTL
  .set(".cloudLeft", {
    scale: 4,
    transformOrigin: "center center"
  })
  .set(".cloudRight", {
    scale: 4,
    transformOrigin: "center center"
  })
  //display clouds
  .set("#cloudsSvg", {
    autoAlpha: 1
  })
  //clouds covering screen
  .from(".cloudLeft", {
    autoAlpha: 1,
    x: -2000,
    duration: 2,
    stagger: 0.3
  })
  .from(".cloudRight", {
    autoAlpha: 1,
    x: 2000,
    duration: 2,
    stagger: 0.3,
    onComplete: function() {
      setMaincontent(null, stage);
      gsap.globalTimeline.pause();
    }
  }, "<")
  //clouds disappear
  .to(".cloudLeft", {
    autoAlpha: 0,
    x: -2000,
    duration: 2.5,
    stagger: 0.3
  })
  .to(".cloudRight", {
    autoAlpha: 0,
    x: 2000,
    duration: 2.5,
    stagger: 0.3,
    onComplete: function() {
      gsap.set("#cloudsSvg", {
        autoAlpha: 0
      });
    }
  }, "<");
  cloudTransitionTL.play();
}

// Draggable
var dragMe;
var charMovePath;
function charDraggable (startX, endX) {
    var D = document.createElement("div");
    dragMe = Draggable.create(D, {
        trigger: ""+characterSelector,
        type: "x",
        bounds: {minX:startX, maxX:endX},
        liveSnap: {
          points: [{x: endX, y: 0}],
          radius: 200
        },
        onDrag: updateMoveChar 
    });
}
var moveCharTimeline;
function updateMoveChar() {
  moveCharTimeline.progress(Math.abs(this.x/300));
}

/**
 * @name loadingScreenTransition
 * @description extra transition, 'cause gsap is frustrating
 */
function loadingScreenTransition(stage) {
  showLoadingScreen(true);
  gsap.globalTimeline.clear();
  gsap.set("#display", {autoAlpha: 0});
  setMaincontent(null, stage);
}
/* Cookies */
/**
 * @name setCookie
 * @description Set a Cookie
 * @param {string} cname key
 * @param {any} cvalue value 
 * @param {int} exdays expiring time in nr. of days
 */
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";SameSite=Strict;path=/";
}
/**
 * @name getCookie
 * @description takes a cooke name (key) and returns its value
 * @param {string} cname 
 * @returns cookie value
 */
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/**
 * @name progressManager
 * @description hides menu overlays with increasing progress
 */
function progressManager() {
  var progressOverlays = $(".progressOverlay");
  for (let i = 0; i < progressOverlays.length; i++) {
    const element = progressOverlays[i];
    if(i < getCookie("progress")) {
      $(element).css("visibility", "hidden");
    }
  }
}