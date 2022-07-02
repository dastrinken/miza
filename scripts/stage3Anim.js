//global bool val for draggable path
initStage = function(stage) {
    if(stage == 3) {    
        if(getCookie("progress") < 3) {
            setCookie("progress", 3, 3);
        }
        showLoadingScreen(false);
        //cloud transition pauses global timeline
        if(gsap.globalTimeline.paused()) {
            gsap.globalTimeline.play();
        }
        $(playerCharacter).css("visibility", "visible");
    }
}

//Defining timeline variables for global scope
var fadeOut;
var splitRoom;
var moveCharTL;
var moveCharTL2;
var avTL;
var wmTL;
var gdTL;
//Animation variables for global scope
var cabinet;
var hintPath1, hintPath2;
//building stage animations
buildTweens = function(stage, callback) {
    if(stage != 3) {
        return false;
    }
    //Animated paths for draggable
    hintPath1 = gsap.from("#charMovePath", {
        autoAlpha: 0,
        onComplete: function() {
            gsap.to("#charMovePath", {
                strokeWidth: ".5px",
                strokeDashoffset: -10,
                repeat:-1,
                duration: .5,
                ease:Linear.easeNone
            })
        },
        paused: true
    });
    gsap.set("#charMovePathTwo", {autoAlpha: 0});

    //C1 - C2 fading in and out
    gsap.from("#stage3", {autoAlpha: 0, duration: 1.5, onComplete: function() {
        showTextbox(textObject["C2"], startTimeline.bind(null, splitRoom));
    } });
    //C2 - C4 split room and hovering labels
    splitRoom = gsap.timeline({
        paused: true,
        onComplete: function() {
            moveCharTimeline = moveCharTL;
            charDraggable(0, -300);
            hintPath1.play();
        }
    });
    //splitting
    splitRoom
    .from("#splitLine", {duration: 1.5, scaleY: 0, ease: "expo.out"})
    //lettering hover
    .set("#headlines", {
        autoAlpha: 1
    })
    .to("#headlineMP", {autoAlpha: 1, duration: 0.5})
    .to("#headlineMP", {
        scaleX: 1.03,
        scaleY: 1.03,
        yoyo: true,
        repeat: 1,
        duration: .5,
        ease: "circ.out"
    })
    .to("#headlineWM", {autoAlpha: 1, duration: 0.5})
    .to("#headlineWM", {
        scaleX: 1.03,
        scaleY: 1.03,
        y: -2,
        x: -10,
        yoyo: true,
        repeat: 1,
        duration: .5,
        ease: "circ.out"
    });

    // empty timeline, for which animation? Still need this? 
    pulseCharTL = gsap.timeline({

    });

    //C5 moving player?
    moveCharTL = gsap.timeline({
        paused: true,
        onComplete: function() {
            dragMe[0].disable();
            cabinet.play();
            hintPath1.pause();
            hintPath1.progress(0);
        }
    });
    moveCharTL.to(characterSelector, {
        motionPath: {
            path: "#charMovePath",
            align: "#charMovePath",
            alignOrigin: [0.5, 0.5]
            },
            transformOrigin: "50% 50%"
        }
    );
    moveCharTL.progress(0.01);
    gsap.to(characterSelector, {delay: 1, autoAlpha: 1, duration: 2});

    //C6 - D2 cabinet and books falling down
    cabinet = gsap.from("#general", {
        autoAlpha: 0,
        duration: 1,
        stagger: 0.3,
        paused: true,
        onComplete: function() {
            movingBooks.play();
            $(".movingBooks").on("click", function() {
                avTL.play();
                movingBooks.pause();
                movingBooks.progress(0.01);
            });
        }
    });
    //D2 moving booksdesk
    let movingBooks = gsap.to(".movingBooks", {
        //moving animation
        repeat: -1,
        scaleX: 1.2,
        scaleY: 1.2,
        yoyo: true,
        paused: true
    });
    //D3 - D5 (AV)
    avTL = gsap.timeline({
        paused: true,
        onComplete: function() {
            movingAVMonitor.play();
            $(".movingAVMonitor").on("click", function() {
                playAVMovie.play();
                movingAVMonitor.pause();
                movingAVMonitor.progress(0);
            });
        }
    });
    avTL.from("#deskAV", {
        autoAlpha: 0,
        duration: 2,
        ease: "sine.out"
    })
    .from("#imageBoard", {
        y: -20,
        autoAlpha: 0,
        duration: 3,
        ease: "sine.out"
    },"<")
    .from(".avItem", {
        y: -250,
        autoAlpha: 0,
        duration: 3,
        stagger: 0.3,
        ease: "expo.out"
    },"<")
    //D3 moving monitor
    let movingAVMonitor = gsap.to(".movingAVMonitor", {
        //moving animation
        repeat: -1,
        scaleX: 1.2,
        scaleY: 1.2,
        yoyo: true,
        paused: true,
        zIndex: 200
    });
    //D4 AV movieclip
    let playAVMovie = gsap.from(".avSlides", {
        autoAlpha: 0,
        duration: 2,
        stagger: 1,
        paused: true,
        onComplete: function() {
            showTextbox(textObject["D5"], startTimeline.bind(null, wmTL));
        }
    });
    
    //D6 - E2 (W&M)Programming
    wmTL = gsap.timeline({
        paused: true,
        onComplete: function() {
            movingWMMonitor.play();
            $("#smartphoneDisplay").on("click", function() {
                gsap.set(".avSlides", {
                    autoAlpha: 0
                });
                playWMMovie.play();
                movingWMMonitor.pause();
                movingWMMonitor.progress(0);
            });
        }
    });
    wmTL.from("#Programming_Desk", {
        autoAlpha: 0,
        duration: 2,
        ease: "sine.out"
    })
    .from(".wmItem", {
        y: -250,
        autoAlpha: 0,
        duration: 3,
        stagger: 0.3,
        ease: "expo.out"
    }, "<")
    .from("#networkSecurity", {
        x: -20,
        autoAlpha: 0,
        duration: 1.5,
        ease: "expo.out"
    }, "<2")
    //E1 moving WM monitor
    let movingWMMonitor = gsap.to("#smartphoneDisplay", {
        //moving animation
        repeat: -1,
        scaleX: 1.2,
        scaleY: 1.2,
        yoyo: true,
        paused: true,
        zIndex: 200
    });
    //E1 - E2 WM movieclip (between E1 and E2 in storyboard)
    let playWMMovie = gsap.from(".webSlides", {
        autoAlpha: 0,
        duration: 2,
        stagger: 3,
        paused: true,
        onComplete: function() {
            showTextbox(textObject["E2"], startTimeline.bind(null, rubberduck));
        }
    });

    //E3
    let rubberduck = gsap.from("#rubberduck", {
        y: -500,
        autoAlpha: 0,
        duration: 3,
        ease: "bounce.out",
        paused: true,
        onComplete: function() {
            showTextbox(textObject["E3"], startTimeline.bind(null, gdTL));
        }
    })
    //E4 - E5 (3D)
    gdTL = gsap.timeline({
        paused: true,
        onComplete: function() {
            movingGDMonitor.play();
            $("#monitor").on("click", function() {
                gsap.set(".webSlides", {
                    autoAlpha: 0
                });
                showTextbox(textObject["E4"], startTimeline.bind(null, playGDMovie));
                movingGDMonitor.pause();
                movingGDMonitor.progress(0);
            });
        }
    })
    gdTL.from("#desk3D", {
        autoAlpha: 0,
        duration: 2,
        ease: "sine.out"
    })
    .from("._3dItem", {
        y: -250,
        autoAlpha: 0,
        duration: 3,
        stagger: 0.3,
        ease: "sine.out"
    }, "<")
    .from("#_3D_Symbol", {
        x: 50,
        y: 50,
        autoAlpha: 0,
        duration: 1,
        ease: "sine.out"
    })

    //E5 - E6
    let movingGDMonitor = gsap.to("#monitor", {
        //moving animation
        repeat: -1,
        scaleX: 1.2,
        scaleY: 1.2,
        yoyo: true,
        paused: true,
        zIndex: 200
    });
    //E6 GD movieclip
    let playGDMovie = gsap.from(".gdSlides", {
        autoAlpha: 0,
        duration: 2,
        stagger: 3,
        paused: true,
        onComplete: function() {
            showTextbox(textObject["E6"], startTimeline.bind(null, moveCharBack));
        }
    });
    //F1 move player character
    let moveCharBack = gsap.to(characterSelector, {
        motionPath: {
            path: "#charMovePathTwo",
            align: "#charMovePathTwo",
            alignOrigin: [0.5, 0.5]
            },
            transformOrigin: "50% 50%",
            duration: 2,
            paused: true,
            onStart: function() {
                seminarTL.play();
            }
        }
    );
    //F1 - F3 (center table and fade out)
    seminarTL = gsap.timeline({
        paused: true,
        onComplete: function() {
            gsap.to(characterSelector, {autoAlpha: 0, duration: 4});
            showTextbox(textObject["F3"], setMaincontent.bind(null, null, 4));
        }
    });
    seminarTL.from("#seminar", {
        y: -500,
        autoAlpha: 0,
        duration: 3
    })
    
    callback();
}

//Transitions
function startTimeline(timeline) {
    timeline.play();
}