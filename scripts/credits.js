initStage = function(stage) {
    if(stage == 6) {    
        if(getCookie("progress") < 6) {
            setCookie("progress", 6, 3);
        }
        //remove Player character
        $(characterSelector).css("visibility", "hidden");
        //remove Player character (hopefully)
        $(".playerCharacter").css("visibility", "hidden");
        //hide loading screen
        showLoadingScreen(false);
        //cloud transition pauses global timeline
        if(gsap.globalTimeline.paused()) {
            gsap.globalTimeline.play();
        }
        creditsTL.play();
    }
}

var creditsTL = gsap.timeline({paused: true});
buildTweens = function(stage, callback) {
    if(stage != 6) {
        return false;
    }
    //remove d-flex from svg-wrapper (for credits wrapper sizing)
     $("#svg-wrapper").removeClass("d-flex");
    //console.log("building tweens for stage 6");
    getCreditsHeights();
    $("#svg-wrapper").css("overflow", "hidden");
    let characters = gsap.utils.toArray(".creditsCharacter");
    randomizeCharacters(characters);
    creditsTL
    .to("#svg-wrapper", {background: "#000", duration: 1.5})
    .fromTo("#creditsWrapper", 
    {
        y: windowBounding.height
    },
    {
        y: - (windowBounding.height + wrapperBounding.height),
        duration: 45,
        ease: "none",
        onComplete: includeRubberduck
    })
    .to("#svg-wrapper", {background: "white", duration: 1.5})
    .to(characters, {
        autoAlpha: 1,
        duration: 1.5,
        stagger: {
            each: 4,
            onComplete: function() {
                gsap.to(this.targets()[0], {
                    delay: 1.5,
                    autoAlpha: 0,
                    duration: 1.5
                });
            }
        }
    }, 2);
    callback();
}

function randomizeCharacters(characterArray) {
    for (let i = 0; i < characterArray.length; i++) {
        var random = Math.floor(Math.random() * 40);
        const element = characterArray[i];
        if(i % 2 == 0) {
            $(characterArray[i]).toggleClass("flipCharacter");
            $(characterArray[i]).css("left", random+"%");
            $(characterArray[i]).css("top", random+"%");
        } else {
            $(characterArray[i]).css("right", random+"%");
            $(characterArray[i]).css("bottom", random+"%");
        }
    }
}

function includeRubberduck() {
    $.ajax({
        url: "./resources/images/character/rubberduckCredits.svg",
        dataType: 'html'})
        .done(function(data) {
            $("#creditsEnte").html(data);
            let rubberDuckTl = gsap.timeline();
            gsap.set("#quackText", {
                autoAlpha: 0, 
                scaleX: 1,
                scaleY: 1
            });
            let speechBubble = gsap.fromTo("#quackText", 
            {
                scaleX: 0,
                scaleY: 0
            },
            {
                paused: true,
                x: "random(-50, 80)",
                y: "random(-50, 80)",
                scaleX: 1,
                scaleY: 1,
                autoAlpha: 1,
                duration: 1.5,
                transformOrigin: "50% 50%",
                ease: "elastic.out(1, 0.3)"

            });
            rubberDuckTl.from(".duck", {
                scaleX: .1,
                scaleY: .1,
                autoAlpha: 0,
                y: -2000,
                duration: 3,
                ease: "bounce.out",
                onComplete: function() {
                    speechBubble.play();
                    $("#duckAnimated").click("click", function(){
                        speechBubble.invalidate();
                        speechBubble.restart();
                        gsap.from("#duckAnimated", {
                            scaleX: .8,
                            scaleY: .8,
                            transformOrigin: "50% 50%"
                        });
                    });                
                } 
            });
        });
}

var wrapperBounding, windowBounding;
function getCreditsHeights() {
    wrapperBounding = $("#creditsWrapper")[0].getBoundingClientRect();
    windowBounding = $("body")[0].getBoundingClientRect();
}

/* zu Testzwecken
var counter = 1;
function pauseCredits() {
    if(counter == 1) {
        //pause
        creditsTL.pause();
        counter = 2;
    } else {
        //play
        creditsTL.play();
        counter = 1;
    }
}
*/