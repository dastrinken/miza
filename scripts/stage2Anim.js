//endless scrolling, appends spacer if user reaches bottom of the page (working fine)
//useless for now unless we figure out how to recalculate endTrigger with increasing page size
/*
$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
        $("#mainContent").append("<div class='spacer-normal'></div>");
    }
})*/

//making the room "sticky"
$("#svg-wrapper").css("position", "fixed");

initStage = function(stage = 2) {
    if(stage == 2){
        if(getCookie("progress") < 2) {
            setCookie("progress", 2, 3);
        }
        showLoadingScreen(false);
        //cloud transition pauses global timeline
        if(gsap.globalTimeline.paused()) {
            gsap.globalTimeline.play();
        }
        setTimeout(function() {
            showTextbox(textObject["B4"], enableScrollTrigger);
        }, 1000);
        $(playerCharacter).css("visibility", "visible");
        $(playerCharacter).css("position", "fixed");
        //bugfix when entering from stage 5
        $(playerCharacter).css("left", "45%");
        $(playerCharacter).css("top", "40%");
        $(playerCharacter).css("transform", "none");
    }
}

//Defining timeline variables for global scope
var fallingItemsTL;
//building stage animations
buildTweens = function(stage, callback) {
    if(stage != 2) {
      return false;
    }
    //defining timeline and animations
    //items falling down
    fallingItemsTL = gsap.timeline({
        paused: true,
        onComplete: finalSection
    });
    fallingItemsTL
    .from(".fallingItem", {y: -500, autoAlpha: 0, stagger: 0.5});

    callback();
}

function enableScrollTrigger() {
    //arrow
    $("body").append("<div id='scrollArrow' class='d-flex flex-column'><p style='margin-bottom: -3%;'>SCROLL/SWIPE</p><i id='arrowAnimated' class='bi-caret-down-fill'></div>");
    arrowAnim = gsap.from("#arrowAnimated", {
        autoAlpha: 0,
        y: -20,
        repeat: -1,
        yoyo:true,
        duration: 1,
        ease: "power4.out",
        paused: true
    });
    arrowAnim.play();
    //appending spacer below
    $("#mainContent").append("<div class='spacer-normal'></div>");
    gsap.set("#scrollArrow", {autoAlpha: 1});
    //add scrolltrigger to timeline
    ScrollTrigger.create({
        animation: fallingItemsTL,
        trigger: "#mainContent",
        markers: false,
        start: "top top",
        scrub: true,
        endTrigger: ".spacer-normal",
        onEnter: function() {
            /* show scroll hint a little longer */
            setTimeout(function() {
                arrowAnim.pause();
                $("#scrollArrow").remove();
            }, 3000);
        }
    });
    //appending additional spacer below
    $("#mainContent").append("<div class='spacer-normal'></div>");
}

function finalSection() {
    fallingItemsTL.kill();
    setTimeout(function() {
        $(".spacer-normal").remove();
        showTextbox(textObject["B5"], showTextbox.bind(null, textObject["B6"], transitionStage3));
    }, 2000);
}

function transitionStage3() {
    gsap.to("#stage2", {
        opacity: 0,
        duration: 2.5,
        onStart: function() {
            gsap.to(characterSelector, {autoAlpha: 0, duration: 2});
        },
        onComplete: loadNext
    });
}

function loadNext() {
    showTextbox(textObject["C1"], setMaincontent.bind(null, null, 3));
}